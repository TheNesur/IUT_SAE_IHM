// Intervention
// Client
// Contrat
import { LesInterventions, UnIntervention } from "../modele/data_intervention";
// import { LesClients, UnClient } from "../modele/data_client";
// import { LesContrats, UnContrat } from "../modele/data_contrat";
import { LesPrestationsByIntervention, UnPrestationByIntervention } from "../modele/data_prestation";
import { LesPrestations } from "../modele/data_prestation";
class VueModificationInstallations {
    get form() { return this._form; }
    get params() { return this._params; }
    get grille() { return this._grille; }
    get erreur() { return this._erreur; }
    // A changer
    initMsgErreur() {
        // les erreurs "champ vide", "valeur inconnue", "doublon" 
        //sont les trois principales erreurs dans un formulaire
        // pour chaque champ à contrôler (événement onChange), 
        //création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = {
            edtNum: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Le numéro du contrat doit être renseigné.",
                    inconnu: "Le numéro ne peut contenir que des chiffres.",
                    doublon: "Le numéro de salle est déjà attribué."
                }
            },
            edtMotif: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Le motif doit être renseigné.",
                    inconnu: "",
                    doublon: ""
                }
            },
            edtCodeDept: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Le numéro de contrat doit être renseigné.",
                    inconnu: "Numéro de contrat inconnu.",
                    doublon: ""
                }
            },
            equipt: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "L'intervention doit contenir au moins une prestations.",
                    inconnu: "",
                    doublon: ""
                }
            },
            listeEquipt: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "Aucune prestation choisi",
                    inconnu: "",
                    doublon: ""
                }
            },
            edtQte: {
                statut: 'vide',
                msg: {
                    correct: "",
                    vide: "La quantité doit être un nombre entier supérieur à 0",
                    inconnu: "",
                    doublon: ""
                }
            }
        };
    }
    init(form) {
        this._form = form;
        this._params = location.search.substring(1).split('&');
        this.form.divSalleEquipt.hidden = true;
        this.initMsgErreur();
        let titre;
        switch (this.params[0]) {
            case 'suppr':
                titre = "Suppression d'une intervention";
                break;
            case 'ajout':
                titre = "Nouvelle intervention";
                break;
            case 'modif':
                titre = "Modification d'une intervention";
                break;
            default:
                titre = "Détail d'une intervention";
                break;
        }
        this.form.divTitre.textContent = titre;
        const lesInterventions = new LesInterventions;
        const affi = this.params[0] === 'affi';
        if (this.params[0] !== 'ajout') {
            const intervention = lesInterventions.byNumInterv(this._params[1]);
            this.form.edtNum.value = intervention.numInterv;
            this.form.edtDate.value = intervention.dateInterv;
            this.form.edtMotif.value = intervention.objetInterv;
            this.form.edtObserv.value = intervention.obsInterv;
            this.form.edtCodeDept.value = intervention.numCont;
            this.form.edtNum.readOnly = true;
            this.form.edtMotif.readOnly = affi;
            this.form.edtObserv.readOnly = affi;
            this.form.edtCodeDept.readOnly = affi;
            this.form.edtDate.readOnly = affi;
            this.erreur.edtNum.statut = "correct";
            this.detailContrat(intervention.numCont);
        }
        this.affiPrestations();
        if (this.params[0] === 'suppr') {
            console.log("Test");
            setTimeout(() => { this.supprimer(this.params[1]); }, 1000);
        }
        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterEquipt.hidden = affi;
        this.form.edtCodeDept.onchange = function () {
            vueModificationInstallations.detailContrat(vueModificationInstallations.form.edtCodeDept.value);
        };
        this.form.btnRetour.onclick = function () { vueModificationInstallations.retourClick(); };
        this.form.btnAnnuler.onclick = function () { vueModificationInstallations.retourClick(); };
        this.form.btnValider.onclick = function () { vueModificationInstallations.validerClick(); };
        this.form.btnAjouterEquipt.onclick = function () { vueModificationInstallations.ajouterPrestaClick(); };
        this.form.btnValiderEquipt.onclick = function () { vueModificationInstallations.validerPrestaClick(); };
        this.form.btnAnnulerEquipt.onclick = function () { vueModificationInstallations.annulerPrestaClick(); };
    }
    /**
     *
     * A completer
     *
     */
    detailContrat(numCont) {
        console.log("DetailContrat: " + numCont);
    }
    affiPrestations() {
        const lesPrestationsByIntervention = new LesPrestationsByIntervention();
        this._grille = lesPrestationsByIntervention.byNumInterv(this.params[1]);
        console.log("Affipresta");
        this.affiGrillePrestations();
    }
    affiGrillePrestations() {
        while (this.form.tableEquipement.rows.length > 1) {
            this.form.tableEquipement.rows[1].remove();
        }
        let ht = 0;
        for (let id in this._grille) {
            const unPrestationByIntervention = this.grille[id];
            const tr = this.form.tableEquipement.insertRow();
            tr.insertCell().textContent = unPrestationByIntervention.codePrest;
            tr.insertCell().textContent = unPrestationByIntervention.libPrest;
            tr.insertCell().textContent = unPrestationByIntervention.tarifHt;
            tr.insertCell().textContent = unPrestationByIntervention.qtePrest;
            tr.insertCell().textContent = unPrestationByIntervention.montant;
            const affi = this.params[0] === 'affi';
            if (!affi) {
                let balisea;
                balisea = document.createElement("a");
                balisea.classList.add('img_modification');
                balisea.onclick = function () { vueModificationInstallations.modifierPrestaClick(id); };
                tr.insertCell().appendChild(balisea);
                balisea = document.createElement("a");
                balisea.classList.add('img_corbeille');
                balisea.onclick = function () { vueModificationInstallations.supprimerPrestaClick(id); };
                tr.insertCell().appendChild(balisea);
            }
            // tt += Number(unPrestationByIntervention.qtePrest);
            ht += Number(unPrestationByIntervention.montant);
        }
        // this.form.lblTotal.textContent = tt.toString();
        this.form.lblHT.textContent = ht.toFixed(2);
        this.form.lblTVA.textContent = (ht * 1.1 - ht).toFixed(2);
        this.form.lblTTC.textContent = (ht + ht * 1.1 - ht).toFixed(2);
    }
    supprimer(numPrestation) {
        console.log("ban");
        if (confirm("Confirmez-vous la suppression de la prestation " + numPrestation)) {
            let lesPrestationsByIntervention = new LesPrestationsByIntervention();
            lesPrestationsByIntervention.delete(numPrestation);
            const lesInterventions = new LesInterventions();
            lesInterventions.delete(this._params[1]);
        }
        this.retourClick();
    }
    verifNum(valeur) {
        const lesInterventions = new LesInterventions;
        const err = this.erreur.edtNum;
        err.statut = "correct";
        const chaine = valeur.trim();
        if (chaine.length > 0) {
            if (!chaine.match(/^([0-9]+)$/))
                this.erreur.edtNum.statut = 'doublon';
            else if ((this.params[0] === 'ajout') && (lesInterventions.listByIntervention(valeur))) {
                this.erreur.edtNum.statut = 'doublon';
            }
        }
        else
            err.statut = 'vide';
    }
    verifMotif(valeur) {
        const err = this.erreur.edtMotif;
        err.statut = "correct";
        const chaine = valeur.trim();
        if (chaine.length === 0)
            err.statut = 'vide';
    }
    traiteErreur(uneErreur, zone) {
        let correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") {
            if (uneErreur.msg[uneErreur.statut] !== '') {
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    }
    validerClick() {
        let correct = true;
        this.verifNum(this._form.edtNum.value);
        this.verifMotif(this._form.edtMotif.value);
        if (JSON.stringify(this.grille) === '{}') {
            this._erreur.equipt.statut = 'vide';
        }
        else
            this._erreur.equipt.statut = 'correct';
        console.log("Valider click: ", this._erreur.edtCodeDept);
        correct = this.traiteErreur(this._erreur.edtNum, this.form.lblNumErreur) && correct;
        // correct = this.traiteErreur(this._erreur.edtDate, this.form.lblNumErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtMotif, this.form.lblNumErreur) && correct;
        // correct = this.traiteErreur(this._erreur.edtCodeDept, this.form.lblContErreur) && correct; // a corriger
        correct = this.traiteErreur(this._erreur.equipt, this.form.lblEquiptErreur) && correct;
        const lesInterventions = new LesInterventions;
        const intervention = new UnIntervention;
        if (correct) {
            intervention.numInterv = this.form.edtNum.value;
            intervention.objetInterv = this.form.edtMotif.value;
            intervention.dateInterv = this.form.edtDate.value;
            intervention.numCont = this.form.edtCodeDept.value;
            if (this._params[0] === 'ajout')
                lesInterventions.insert(intervention);
            else
                lesInterventions.update(intervention);
            const lesPrestationsByIntervention = new LesPrestationsByIntervention;
            lesPrestationsByIntervention.delete(intervention.numInterv);
            lesPrestationsByIntervention.insert(intervention.numInterv, this.grille);
            this.retourClick();
        }
    }
    retourClick() {
        location.href = "gestion-installations.html";
    }
    modifierPrestaClick(id) {
        this.afficherPrestaEdit();
        const lesPrestations = new LesPrestations();
        const unPrestation = lesPrestations.byCodePrest(id);
        this.form.listeEquipt.length = 0;
        this.form.listeEquipt.options.add(new Option(unPrestation.libPrest, id));
        this.form.listeEquipt.selectedIndex = 0;
        this.form.edtQte.value = this._grille[id].qtePrest;
    }
    ajouterPrestaClick() {
        this.afficherPrestaEdit();
        this.form.listeEquipt.length = 0;
        const lesPrestations = new LesPrestations;
        const data = lesPrestations.all();
        const idPrestas = [];
        for (let i in this._grille) {
            idPrestas.push(this._grille[i].libPrest);
        }
        for (let i in data) {
            const id = data[i].codePrest;
            if (idPrestas.indexOf(id) === -1)
                this._form.listeEquipt.options.add(new Option(data[i].libPrest, id));
        }
    }
    supprimerPrestaClick(id) {
        if (confirm("Confirmez-vous le retrait de la prestation de l'intervention")) {
            delete (this._grille[id]);
            this.affiGrillePrestations();
        }
    }
    annulerPrestaClick() {
        this.cacherPrestaEdit();
    }
    verifListPresta() {
        const err = this._erreur.listeEquipt;
        err.statut = "correct";
        const cible = this._form.listeEquipt;
        if (cible.value === "")
            err.statut = 'vide';
    }
    verifQte() {
        const err = this._erreur.edtQte;
        err.statut = "correct";
        const valeur = this._form.edtQte.value;
        if (!((Number.isInteger(Number(valeur))) && (Number(valeur) > 0)))
            err.statut = 'vide';
    }
    validerPrestaClick() {
        let correct = true;
        this.verifListPresta();
        this.verifQte();
        correct = this.traiteErreur(this._erreur.listeEquipt, this.form.lblSelectEquiptErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;
        if (correct) {
            const lesPrestations = new LesPrestations;
            const unPrestation = lesPrestations.byCodePrest(this._form.listeEquipt.value);
            const unPrestationByIntervention = new UnPrestationByIntervention(unPrestation.codePrest, unPrestation.libPrest, unPrestation.tarifHt, this._form.edtQte.value);
            console.log("Code listePresta :", this._form.edtQte.value);
            console.log(lesPrestations.all());
            console.log(unPrestation);
            console.log(unPrestationByIntervention);
            this._grille[unPrestation.codePrest] = unPrestationByIntervention;
            this.affiGrillePrestations();
            this.annulerPrestaClick();
            /***
             *
             *  A FINIRRRRRR
             *
             *
             * **/
            this._form.edtQte.value = '';
        }
    }
    afficherPrestaEdit() {
        this.form.divSalleEquipt.hidden = false;
        // this.form.divDetail.style.pointerEvents = 'none';
        this.form.divSalleEquiptEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    }
    cacherPrestaEdit() {
        this.form.divSalleEquipt.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    }
}
let vueModificationInstallations = new VueModificationInstallations();
export { vueModificationInstallations };
//# sourceMappingURL=class_modificationInstallations.js.map