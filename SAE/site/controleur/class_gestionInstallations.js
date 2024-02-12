// Intervention
// Client
// Contrat
import { LesInterventions } from "../modele/data_intervention";
class VueGestionInstallations {
    get form() { return this._form; }
    init(form) {
        this._form = form;
        const lesInterventions = new LesInterventions;
        // const lesClients = new LesClients();
        // const lesContrats = new LesContrats();
        // const lesPrestationsByIntervention = new LesPrestationsByIntervention();
        const dataInterventions = lesInterventions.all();
        // const dataClients = lesClients;
        // const dataContrats = lesContrats;
        for (let num in dataInterventions) {
            const unIntervention = dataInterventions[num];
            // let unContrats : UnContrat = lesContrats.byNumCont(unIntervention.numCont);
            // let unClient : UnClient = lesClients.byNumCli(unContrats.numCli);
            // let lesPrestations : TPrestationsByIntervention = lesPrestationsByIntervention.byNumInterv(unIntervention.numInterv);
            const tr = this.form.tableSalle.insertRow();
            let balisae;
            balisae = document.createElement("a");
            balisae.classList.add('img_visu'); // ajout de l'id relier à l'image
            balisae.onclick = function () { vueGestionInstallations.detailInterventionClick(unIntervention.numInterv); }; // à completer
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
            balisae.onclick = function () { vueGestionInstallations.modifierInterventionClick(unIntervention.numInterv); };
            tr.insertCell().appendChild(balisae);
            // Création balise supp
            balisae = document.createElement('a');
            balisae.classList.add('img_corbeille');
            balisae.onclick = function () { vueGestionInstallations.supprimerInterventionClick(unIntervention.numInterv); };
            tr.insertCell().appendChild(balisae);
        }
        this.form.btnAjouter.onclick = function () { vueGestionInstallations.AjouterInterventionClick(); };
    }
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