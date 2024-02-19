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

        const dataInterventions = lesInterventions.all();

        for (let num in dataInterventions) {
            const unIntervention : UnIntervention = dataInterventions[num];


            const tr = this.form.tableSalle.insertRow();

            let balisae : HTMLAnchorElement;
            balisae = document.createElement("a");
            balisae.classList.add('img_visu'); // ajout de l'id relier à l'image
            balisae.onclick = function(): void {vueGestionInstallations.detailInterventionClick(unIntervention.numInterv); } // à completer
            tr.insertCell().appendChild(balisae); // cell balise 'a' pour détails


            // console.log(lesInterventions.all());
            

            
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

        this.trierTableauParDate();

    }

    trierTableauParDate() {
      const table = this.form.tableSalle;
      let rows: HTMLTableRowElement[] = Array.from(table.querySelectorAll('thead tr')); 
    
      const sortedRows = rows.sort((a, b) => {
        const dateAStr = a.cells[2].textContent.trim(); 
        const dateBStr = b.cells[2].textContent.trim();
        const dateA = new Date(dateAStr.split('/').reverse().join('/')); 
        const dateB = new Date(dateBStr.split('/').reverse().join('/'));
        return dateB.getTime() - dateA.getTime(); 
      });
    
      const thead = table.querySelector('thead'); 
      thead.innerHTML = ''; 
    
      sortedRows.forEach(row => {
        thead.appendChild(row); 
      });
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
