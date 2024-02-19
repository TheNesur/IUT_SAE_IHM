// Intervention
// Client
// Contrat

import {  LesInterventions, UnIntervention } from "../modele/data_intervention";
// import { LesClients, UnClient } from "../modele/data_client";
// import { LesContrats, UnContrat } from "../modele/data_contrat";
import { LesPrestationsByIntervention, TPrestationsByIntervention, UnPrestationByIntervention } from "../modele/data_prestation";
import { LesPrestations, UnPrestation } from "../modele/data_prestation";
import { LesContrats, UnContrat } from "../modele/data_contrat";
import { LesClients, UnClient } from "../modele/data_client";

type TStatutValeur = 'correct' | 'vide' | 'inconnu' | 'doublon';
type TErreur = { statut: TStatutValeur, msg: { [key in TStatutValeur]: string } };

type TModificationInstallationsForm = {
    divDetail: HTMLElement,
    divTitre: HTMLElement,
    edtNum: HTMLInputElement,
    edtDate: HTMLInputElement,
    edtMotif: HTMLInputElement,
    edtObserv: HTMLInputElement,
    edtCodeDept: HTMLInputElement,
    btnRetour: HTMLInputElement,
    btnValider: HTMLInputElement,
    btnAnnuler: HTMLInputElement,
    lblDetailDept: HTMLLabelElement,
    lblDetailDep2: HTMLLabelElement,
    lblNumErreur: HTMLLabelElement,
    lblEtageErreur: HTMLLabelElement,
    lblContErreur: HTMLLabelElement,
    lblEquiptErreur: HTMLLabelElement,
    divSalleEquipt: HTMLDivElement,
    divSalleEquiptEdit: HTMLDivElement,
    btnAjouterEquipt: HTMLInputElement,
    // lblTotal: HTMLLabelElement,
    lblHT : HTMLLabelElement,
    lblTVA : HTMLLabelElement,
    lblTTC : HTMLLabelElement,
    tableEquipement: HTMLTableElement,
    listeEquipt: HTMLSelectElement,
    edtQte: HTMLInputElement,
    btnValiderEquipt: HTMLInputElement,
    btnAnnulerEquipt: HTMLInputElement,
    lblSelectEquiptErreur: HTMLLabelElement,
    lblQteErreur: HTMLLabelElement
}



class VueModificationInstallations {
    private _form: TModificationInstallationsForm;
    private _params: string[];
    private _grille: TPrestationsByIntervention;
    private _erreur: {
        [key: string]: TErreur;
    }

    get form(): TModificationInstallationsForm { return this._form; }
    get params(): string[] { return this._params; }
    get grille(): TPrestationsByIntervention { return this._grille; }
    get erreur(): { [key: string]: TErreur } { return this._erreur; }


    // A changer
    initMsgErreur(): void {
        // les erreurs "champ vide", "valeur inconnue", "doublon" 
        //sont les trois principales erreurs dans un formulaire
        // pour chaque champ à contrôler (événement onChange), 
        //création des 3 messages d'erreur + message pour correct
        // avec chaîne vide si pas d'erreur générée pour un type d'erreur potentielle
        this._erreur = {
            edtNum: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Le numéro du contrat doit être renseigné."
                    , inconnu: "Le numéro ne peut contenir que des chiffres."
                    , doublon: "Le numéro de salle est déjà attribué."
                }
            }
            , edtMotif: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Le motif doit être renseigné."
                    , inconnu: ""
                    , doublon: ""
                }
            }
            , edtDate: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: ""
                    , inconnu: ""
                    , doublon: "Une intervention pour le contrat est déjà planifié à la même date d'intervention."
                }
            }
            , edtCodeDept: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Le numéro de contrat doit être renseigné."
                    , inconnu: "Numéro de contrat inconnu."
                    , doublon: "What the fuck"
                }
            }
            , equipt: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "L'intervention doit contenir au moins une prestations."
                    , inconnu: ""
                    , doublon: ""
                }
            }
            , listeEquipt: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "Aucune prestation choisi"
                    , inconnu: ""
                    , doublon: ""
                }
            }
            , edtQte: {
                statut: 'vide'
                , msg: {
                    correct: ""
                    , vide: "La quantité doit être un nombre entier supérieur à 0"
                    , inconnu: ""
                    , doublon: ""
                }
            }
        }
    }

    init(form: TModificationInstallationsForm) {
        this._form = form;
        this._params = location.search.substring(1).split('&');
        this.form.divSalleEquipt.hidden = true;
        this.initMsgErreur();

        let titre :string;
        switch (this.params[0]) {
            case 'suppr': titre = "Suppression d'une intervention"; break 
            case 'ajout': titre = "Nouvelle intervention"; break 
            case 'modif': titre = "Modification d'une intervention"; break 
            default: titre = "Détail d'une intervention"; break;
        }

        this.form.divTitre.textContent = titre;
        const lesInterventions = new LesInterventions;
        const affi = this.params[0] === 'affi';

            this.form.edtNum.readOnly = true;
        if (this.params[0] !== 'ajout') {
            const intervention = lesInterventions.byNumInterv(this._params[1]);
            this.form.edtNum.value = intervention.numInterv;
            this.form.edtDate.value = intervention.dateInterv;
            this.form.edtMotif.value = intervention.objetInterv;
            this.form.edtObserv.value = intervention.obsInterv;
            this.form.edtCodeDept.value = intervention.numCont;
        
            this.form.edtDate.readOnly = true;
            this.form.edtMotif.readOnly = affi;
            this.form.edtObserv.readOnly = affi;
            this.form.edtCodeDept.readOnly = affi;



            // let t = new Date(Date.now());
            // console.log("Test date1 : ", t.getTime());
            // console.log("Test date 2: ", this.form.edtDate.valueAsDate.getTime());
            // console.log("Diff time: ", ((t.getTime() - this.form.edtDate.valueAsDate.getTime()) / (1000*3600*24)).toFixed(0));


            // if (Number(((t.getTime() - this.form.edtDate.valueAsDate.getTime()) / (1000*3600*24)).toFixed(0)) > 1) console.log("Ok");
            this.erreur.edtNum.statut = "correct";

            this.detailContrat(intervention.numCont);
        } else {
            this.form.edtNum.value = lesInterventions.getNouveauNumero();

            let newDate = new Date();
            const lendemain = new Date(newDate);
            lendemain.setDate(newDate.getDate() + 1);
            
            // Formatage de la date du lendemain
            const annee = lendemain.getFullYear();
            const mois = (lendemain.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0, donc ajoutez 1 et formatez
            const jour = lendemain.getDate().toString().padStart(2, '0'); // Formatez le jour
            const dateLendemain = `${annee}-${mois}-${jour}`;
            
            this.form.edtDate.value = dateLendemain;
        }

        this.affiPrestations();
        if (this.params[0] === 'suppr') {
            // console.log("Test");
            setTimeout(() => {this.supprimer(this.params[1])}, 1000);
        }

        this.form.btnRetour.hidden = !affi;
        this.form.btnValider.hidden = affi;
        this.form.btnAnnuler.hidden = affi;
        this.form.btnAjouterEquipt.hidden = affi;

        this.form.edtCodeDept.onchange = function(): void {
            vueModificationInstallations.detailContrat(vueModificationInstallations.form.edtCodeDept.value);
        }

        this.form.btnRetour.onclick = function(): void { vueModificationInstallations.retourClick(); }
        this.form.btnAnnuler.onclick = function(): void { vueModificationInstallations.retourClick(); }
        this.form.btnValider.onclick = function(): void { vueModificationInstallations.validerClick(); }
        this.form.btnAjouterEquipt.onclick = function(): void { vueModificationInstallations.ajouterPrestaClick(); }
        this.form.btnValiderEquipt.onclick = function(): void { vueModificationInstallations.validerPrestaClick(); }
        this.form.btnAnnulerEquipt.onclick = function(): void { vueModificationInstallations.annulerPrestaClick(); }
    }

    /**
     * 
     * A completer
     * 
     */

    detailContrat(numCont: string): void { 
        // console.log("DetailContrat: " + numCont);
        const err = this.erreur.edtCodeDept;
        const lesConstrats = new LesContrats;
        const detail = this.form.lblDetailDept;
        const detail2 = this.form.lblDetailDep2;

        detail.textContent = "";
        detail2.textContent = "";
        err.statut = "correct";
        const chaine : string = String(numCont).trim();

        if (chaine.length > 0) {
            const contrat : UnContrat = lesConstrats.byNumCont(chaine);
            const client : UnClient = new LesClients().byNumCli(contrat.numCli);
            if (contrat.numCont != "") {

                const [year, month, day] = contrat.dateCont.split('-');
                const formattedDate = `${day}/${month}/${year}`;

                detail.textContent = // <i>Site protégé</i> a ajouter
                "site protégé" + "\r\n" 
                + "contrat crée le  " + formattedDate + "\r\n" 
                + contrat.adrSite + "\r\n"
                + contrat.cpSite + " " + contrat.villeSite + "\r\n"+ "\r\n" ;

                // console.log(client);
                
                detail2.textContent += // <i>Site protégé</i> a ajouter
                "client" + "\r\n" 
                + client.civCli + ' ' + client.nomCli + client.prenomCli + "\r\n" 
                + client.melCli + "\r\n"
                + client.telCli;

            } else {
                err.statut = 'inconnu';
                detail.textContent = err.msg.inconnu;
            }

        } else {
            err.statut = 'vide';
        }
        

        // A FINIR BORDEL

    }




    affiPrestations(): void {
        const lesPrestationsByIntervention = new LesPrestationsByIntervention();
        this._grille = lesPrestationsByIntervention.byNumInterv(this.params[1]);
        // console.log("Affipresta");
        this.affiGrillePrestations();
    }

    affiGrillePrestations(): void {
        while (this.form.tableEquipement.rows.length > 1) { this.form.tableEquipement.rows[1].remove(); }

        let ht = 0;
        for (let id in this._grille) {
            const unPrestationByIntervention : UnPrestationByIntervention = this.grille[id];
            const tr = this.form.tableEquipement.insertRow();
            tr.insertCell().textContent = unPrestationByIntervention.codePrest;
            tr.insertCell().textContent = unPrestationByIntervention.libPrest;
            tr.insertCell().textContent = unPrestationByIntervention.tarifHt;
            tr.insertCell().textContent = unPrestationByIntervention.qtePrest;
            tr.insertCell().textContent = unPrestationByIntervention.montant;

            const affi = this.params[0] === 'affi';

            if (!affi) {
                let balisea : HTMLAnchorElement;
                balisea = document.createElement("a");
                balisea.classList.add('img_modification');
                balisea.onclick = function(): void { vueModificationInstallations.modifierPrestaClick(id); }
                tr.insertCell().appendChild(balisea);
                
                balisea = document.createElement("a");
                balisea.classList.add('img_corbeille');
                balisea.onclick = function(): void { vueModificationInstallations.supprimerPrestaClick(id); }
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

    supprimer(numPrestation: string): void {
        // console.log("ban");
        if (confirm("Confirmez-vous la suppression de la prestation "+ numPrestation)) {
            let lesPrestationsByIntervention: LesPrestationsByIntervention = new LesPrestationsByIntervention();
            lesPrestationsByIntervention.delete(numPrestation);

            const lesInterventions = new LesInterventions();
            lesInterventions.delete(this._params[1]);
        }
        this.retourClick();
    }


    verifEdtNum(valeur: string): void {
        const lesInterventions = new LesInterventions;
        const err =this.erreur.edtNum;
        err.statut = "correct";

        const chaine: string = valeur.trim();
        if (chaine.length > 0) {
            if (!chaine.match(/^([0-9]+)$/)) this.erreur.edtNum.statut = 'doublon';
            else if ((this.params[0] === 'ajout') && (lesInterventions.byNumInterv(valeur).numInterv == valeur)) { // a vérifier
                this.erreur.edtNum.statut = 'doublon';
            }
        } else err.statut = 'vide';
    }

    verifEdtNumContrat(valeur: string): void {
        const lesContrats = new LesContrats;
        const err = this.erreur.edtCodeDept;
        err.statut = "correct";

        const chaine: string = valeur.trim();
        // console.log("OMG WHAT : ", chaine);
        if (chaine.length > 0) {
            if (!chaine.match(/^([0-9]+)$/)) this.erreur.edtCodeDept.statut = 'inconnu';
            else if ((this.params[0] === 'ajout') && (lesContrats.byNumCont(valeur).numCont != valeur)) {
                this.erreur.edtCodeDept.statut = 'inconnu';
            }
        } else
         err.statut = 'vide';
    }

    verifMotif(valeur: string): void {
        const err = this.erreur.edtMotif
        err.statut = "correct";
        const chaine: string = valeur.trim();
        if (chaine.length === 0) err.statut = 'vide';
    }

    verifDate(dateVal: string, numContrat: string): void {
        let err = this.erreur.edtDate;
        err.statut = 'correct';

        this.verifEdtNumContrat(this._form.edtCodeDept.value);
        if (!this.traiteErreur(this._erreur.edtCodeDept, this.form.lblContErreur)) return;


        let lesInterventions = new LesInterventions;
        if (lesInterventions.byContratDate(numContrat, dateVal) != '')
            err.statut = 'doublon';

        // console.log("Test doublon: ", this._erreur.edtDate.statut);
        // console.log("traiteErreur: ", lesInterventions.byContratDate(numContrat, dateVal));
    }
    
    traiteErreur(uneErreur: TErreur, zone: HTMLElement): boolean {
        let correct = true;
        zone.textContent = "";
        if (uneErreur.statut !== "correct") {
            // console.log("uneErreur :", uneErreur.msg[uneErreur.statut], " = ",uneErreur.statut);
            // console.log("zone :", zone);
            if (uneErreur.msg[uneErreur.statut] !== '') {
                zone.textContent = uneErreur.msg[uneErreur.statut];
                correct = false;
            }
        }
        return correct;
    }

    validerClick(): void {
        let correct = true;
        this.verifEdtNum(this._form.edtNum.value);
        this.verifEdtNumContrat(this._form.edtCodeDept.value); // normalement bon mais a vérifier
        this.verifMotif(this._form.edtMotif.value);
        
        if (this.params[0] !== 'modif') {
            this.verifDate(this._form.edtDate.value, this._form.edtCodeDept.value);
        }

        
        if (JSON.stringify(this.grille) === '{}') { this._erreur.equipt.statut = 'vide'}
        else this._erreur.equipt.statut = 'correct';

        correct = this.traiteErreur(this._erreur.edtNum, this.form.lblNumErreur) && correct;
        // console.log("test 1", correct);

        correct = this.traiteErreur(this._erreur.edtMotif, this.form.lblNumErreur) && correct;
        // console.log("test 2", correct);

        if (this.params[0] !== 'modif') {
            // console.log("Date new : ", this._erreur.edtDate.statut)
            correct = this.traiteErreur(this._erreur.edtDate, this.form.lblNumErreur) && correct; // a corriger
            // console.log("Date : ", correct);
        }

        correct = this.traiteErreur(this._erreur.edtCodeDept, this.form.lblContErreur) && correct; // a corriger // contrat
        // console.log("test 3", correct);

        correct = this.traiteErreur(this._erreur.equipt, this.form.lblEquiptErreur) && correct;
        // console.log("test 4", correct);

        const lesInterventions = new LesInterventions;
        const intervention = new UnIntervention;


        if (correct) {
            intervention.numInterv = this.form.edtNum.value;
            intervention.objetInterv = this.form.edtMotif.value;
            intervention.dateInterv = this.form.edtDate.value;
            intervention.numCont = this.form.edtCodeDept.value;

            if (this._params[0] === 'ajout') lesInterventions.insert(intervention);
            else lesInterventions.update(intervention);

            const lesPrestationsByIntervention : LesPrestationsByIntervention = new LesPrestationsByIntervention;
            lesPrestationsByIntervention.delete(intervention.numInterv);
            lesPrestationsByIntervention.insert(intervention.numInterv, this.grille);
            this.retourClick();
        }
    }

    retourClick(): void {
        location.href = "gestion-installations.html";
    }

    modifierPrestaClick(id: string): void {
        this.afficherPrestaEdit();
        
        const lesPrestations = new LesPrestations();
        const unPrestation: UnPrestation = lesPrestations.byCodePrest(id);


        this.form.listeEquipt.length = 0;
        this.form.listeEquipt.options.add(new Option(unPrestation.libPrest, id));
        this.form.listeEquipt.selectedIndex = 0;
        this.form.edtQte.value = this._grille[id].qtePrest;
    }

    ajouterPrestaClick(): void {
        this.afficherPrestaEdit();

        this.form.listeEquipt.length = 0;
        const lesPrestations = new LesPrestations;
        const data = lesPrestations.all();
        const idPrestas = [];

        for (let i in this._grille) {
            idPrestas.push(this._grille[i].codePrest);
        }

        for (let i in data) {
            const id = data[i].codePrest;
            if (idPrestas.indexOf(id) === -1)
                this._form.listeEquipt.options.add(new Option(data[i].libPrest, id));
        }
    }

    supprimerPrestaClick(id: string): void {
        if (confirm("Confirmez-vous le retrait de la prestation de l'intervention")) {
            delete(this._grille[id]);
            this.affiGrillePrestations();
        }
    }
    
    annulerPrestaClick(): void {
        this.cacherPrestaEdit();
    }

    verifListPresta(): void {
        const err = this._erreur.listeEquipt;
        err.statut = "correct";
        const cible = this._form.listeEquipt;
        if (cible.value === "") err.statut = 'vide';
    }

    verifQte(): void {
        const err = this._erreur.edtQte;
        err.statut = "correct";
        const valeur : string = this._form.edtQte.value;
        if (! ((Number.isInteger(Number(valeur))) && (Number(valeur) > 0))) err.statut = 'vide';
    }

    validerPrestaClick(): void {
        let correct = true;
        this.verifListPresta();
        this.verifQte();

        correct = this.traiteErreur(this._erreur.listeEquipt, this.form.lblSelectEquiptErreur) && correct;
        correct = this.traiteErreur(this._erreur.edtQte, this.form.lblQteErreur) && correct;

        if (correct) {
            const lesPrestations = new LesPrestations;
            const unPrestation : UnPrestation = lesPrestations.byCodePrest(this._form.listeEquipt.value);
            const unPrestationByIntervention : UnPrestationByIntervention 
                    = new UnPrestationByIntervention(
                        unPrestation.codePrest, 
                        unPrestation.libPrest, 
                        unPrestation.tarifHt,
                        this._form.edtQte.value
                    );

            // console.log("Code listePresta :", this._form.edtQte.value);
            // console.log(lesPrestations.all());
            // console.log(unPrestation);
            // console.log(unPrestationByIntervention);

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



    afficherPrestaEdit(): void {
        this.form.divSalleEquipt.hidden = false;
        // this.form.divDetail.style.pointerEvents = 'none';
        this.form.divSalleEquiptEdit.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = true;
        this.form.btnAnnuler.hidden = true;
        this.form.btnValider.hidden = true;
    }


    cacherPrestaEdit(): void {
        this.form.divSalleEquipt.hidden = true;
        this.form.divDetail.style.pointerEvents = 'auto';
        this.form.btnAjouterEquipt.hidden = false;
        this.form.btnAnnuler.hidden = false;
        this.form.btnValider.hidden = false;
    }




}

let vueModificationInstallations = new VueModificationInstallations();
export { vueModificationInstallations }
