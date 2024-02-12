// Intervention
// Client
// Contrat

import { UnIntervention, LesInterventions } from "../modele/data_intervention";
// import { LesClients, UnClient } from "../modele/data_client";
// import { LesContrats, UnContrat } from "../modele/data_contrat";
// import { LesPrestationsByIntervention, TPrestationsByIntervention } from "../modele/data_prestation";
type TGestionInstallationsForm = {
    btnAjouter: HTMLInputElement,
    tableSalle: HTMLTableElement
}


class VueGestionInstallations {
    private _form : TGestionInstallationsForm;

    get form() : TGestionInstallationsForm { return this._form; }

    init(form: TGestionInstallationsForm ) {
        this._form = form;

        const lesInterventions = new LesInterventions;
        // const lesClients = new LesClients();
        // const lesContrats = new LesContrats();
        // const lesPrestationsByIntervention = new LesPrestationsByIntervention();

        const dataInterventions = lesInterventions.all();
        // const dataClients = lesClients;
        // const dataContrats = lesContrats;

        for (let num in dataInterventions) {
            const unIntervention : UnIntervention = dataInterventions[num];

            // let unContrats : UnContrat = lesContrats.byNumCont(unIntervention.numCont);
            // let unClient : UnClient = lesClients.byNumCli(unContrats.numCli);
            // let lesPrestations : TPrestationsByIntervention = lesPrestationsByIntervention.byNumInterv(unIntervention.numInterv);

            const tr = this.form.tableSalle.insertRow();

            let balisae : HTMLAnchorElement;
            balisae = document.createElement("a");
            balisae.classList.add('img_visu'); // ajout de l'id relier à l'image
            balisae.onclick = function(): void {vueGestionInstallations.detailInterventionClick(unIntervention.numInterv); } // à completer
            tr.insertCell().appendChild(balisae); // cell balise 'a' pour détails

            // tr.insertCell().textContent = unIntervention.numInterv;                              // cell num int
            // tr.insertCell().textContent = unIntervention.dateInterv;                             // cell date int
            // tr.insertCell().textContent = unContrats.numCont +  ' - ' + unContrats.villeSite; // cell ville contrat
            // tr.insertCell().textContent = unClient.numCli + ' - ' + unClient.nomCli;
            // tr.insertCell().textContent = Math.round(lesPrestationsByIntervention.getTotal(lesPrestations)*1.1) + ' €'; // à completer
            
            // let test = lesInterventions.listByIntervention(unIntervention.numInterv);
            tr.insertCell().textContent = lesInterventions.listByIntervention(unIntervention.numInterv)[0]['num_interv'];   
            tr.insertCell().textContent = lesInterventions.listByIntervention(unIntervention.numInterv)[0]['date_interv'];   
            tr.insertCell().textContent = lesInterventions.listByIntervention(unIntervention.numInterv)[0]['contrat'];  
            tr.insertCell().textContent = lesInterventions.listByIntervention(unIntervention.numInterv)[0]['client'];  
            tr.insertCell().textContent = lesInterventions.listByIntervention(unIntervention.numInterv)[0]['montant'];  



            


            // tr.insertCell().textContent = lesPrestations

            // Création balise edit
            balisae = document.createElement('a');
            balisae.classList.add('img_modification');
            balisae.onclick = function(): void { vueGestionInstallations.modifierInterventionClick(unIntervention.numInterv); }
            tr.insertCell().appendChild(balisae);

            // Création balise supp
            balisae = document.createElement('a');
            balisae.classList.add('img_corbeille');
            balisae.onclick = function(): void { vueGestionInstallations.supprimerInterventionClick(unIntervention.numInterv); }
            tr.insertCell().appendChild(balisae);
        }

        this.form.btnAjouter.onclick = function(): void { vueGestionInstallations.AjouterInterventionClick(); }
    }

    detailInterventionClick(num : string): void {
        location.href = "modification-installations.html?affi&" + encodeURIComponent(num);
    }

    modifierInterventionClick(num : string): void {
        location.href = "modification-installations.html?modif&" + encodeURIComponent(num);
    }

    supprimerInterventionClick(num : string): void {
        location.href = "modification-installations.html?suppr&" + encodeURIComponent(num);
    }

    AjouterInterventionClick(): void {
        location.href = "modification-installations.html?ajout"
    }
}

let vueGestionInstallations = new VueGestionInstallations();
export{ vueGestionInstallations }
