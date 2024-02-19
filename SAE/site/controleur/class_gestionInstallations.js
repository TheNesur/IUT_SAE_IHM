// Intervention
// Client
// Contrat
import { LesInterventions } from "../modele/data_intervention";
class VueGestionInstallations {
    get form() { return this._form; }
    init(form) {
        this._form = form;
        const lesInterventions = new LesInterventions;
        const dataInterventions = lesInterventions.all();
        for (let num in dataInterventions) {
            const unIntervention = dataInterventions[num];
            const tr = this.form.tableSalle.insertRow();
            let balisae;
            balisae = document.createElement("a");
            balisae.classList.add('img_visu'); // ajout de l'id relier à l'image
            balisae.onclick = function () { vueGestionInstallations.detailInterventionClick(unIntervention.numInterv); }; // à completer
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
            balisae.onclick = function () { vueGestionInstallations.modifierInterventionClick(unIntervention.numInterv); };
            tr.insertCell().appendChild(balisae);
            // Création balise supp
            balisae = document.createElement('a');
            balisae.classList.add('img_corbeille');
            balisae.onclick = function () { vueGestionInstallations.supprimerInterventionClick(unIntervention.numInterv); };
            tr.insertCell().appendChild(balisae);
        }
        this.form.btnAjouter.onclick = function () { vueGestionInstallations.AjouterInterventionClick(); };
        this.trierTableauParDate();
    }
    trierTableauParDate() {
        const table = this.form.tableSalle;
        let rows = Array.from(table.querySelectorAll('thead tr')); // Sélectionnez les lignes du tbody, pas du thead
        const sortedRows = rows.sort((a, b) => {
            const dateAStr = a.cells[2].textContent.trim(); // Assurez-vous de supprimer les espaces vides autour de la date
            const dateBStr = b.cells[2].textContent.trim();
            const dateA = new Date(dateAStr.split('/').reverse().join('/')); // Convertissez les chaînes en objets Date pour une comparaison précise
            const dateB = new Date(dateBStr.split('/').reverse().join('/'));
            return dateB.getTime() - dateA.getTime(); // Tri décroissant des dates
        });
        const tbody = table.querySelector('thead'); // Sélectionnez le tbody, pas le thead
        tbody.innerHTML = ''; // Supprimez le contenu existant du tbody
        sortedRows.forEach(row => {
            tbody.appendChild(row); // Ajoutez les lignes triées au tbody
        });
    }
    /*
    trierTableauParDate() {
      const table = this.form.tableSalle;
      let rows: HTMLTableRowElement[] = Array.from(table.querySelectorAll('thead tr'));
    
      const dataRows = rows.slice(1);
    
      const sortedRows = dataRows.sort((a, b) => {
        const dateAStr = a.cells[2].textContent;
        const dateBStr = b.cells[2].textContent;
        console.log("dateAStr",dateAStr);
        console.log("dateBStr",dateBStr);
        console.log(dateBStr.localeCompare(dateAStr));
        return dateBStr.localeCompare(dateAStr);
      });
    
      const thead = table.querySelector('thead');
      thead.innerHTML = '';
      thead.appendChild(rows[0]);
    
      console.log(sortedRows);
      sortedRows.forEach(row => {
        const dateCell = row.cells[2];
        // console.log(row);
        if (dateCell.textContent.includes('-')) {
          const [year, month, day] = dateCell.textContent.trim().split('-');
          dateCell.textContent = `${day}/${month}/${year}`;
        }
        thead.appendChild(row);
      });
    }
    */
    detailInterventionClick(num) {
        location.href = "modification-installations.html?affi&" + encodeURIComponent(num);
    }
    modifierInterventionClick(num) {
        location.href = "modification-installations.html?modif&" + encodeURIComponent(num);
    }
    supprimerInterventionClick(num) {
        location.href = "modification-installations.html?suppr&" + encodeURIComponent(num);
    }
    AjouterInterventionClick() {
        location.href = "modification-installations.html?ajout";
    }
}
let vueGestionInstallations = new VueGestionInstallations();
export { vueGestionInstallations };
//# sourceMappingURL=class_gestionInstallations.js.map