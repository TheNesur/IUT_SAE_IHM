import { vueGestionInstallations } from "./class_gestionInstallations.js";

vueGestionInstallations.init({
    btnAjouter: document.querySelector('[id=btn_salle_ajouter]'),
    tableSalle: document.querySelector('[id=table_salle]'),
})