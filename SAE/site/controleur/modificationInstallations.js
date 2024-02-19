import { vueModificationInstallations } from "../controleur/class_modificationInstallations.js";
vueModificationInstallations.init({
    divDetail: document.querySelector('[id=div_salle_detail]'),
    edtNum: document.querySelector('[id=edt_salle_num]'),
    divTitre: document.querySelector('[id=div_salle_titre]'),
    edtDate: document.querySelector('[id=edt_salle_date]'),
    edtMotif: document.querySelector('[id=edt_salle_motif]'),
    edtObserv: document.querySelector('[id=edt_salle_observ]'),
    edtCodeDept: document.querySelector('[id=edt_salle_numContrat]'),
    btnRetour: document.querySelector('[id=btn_salle_retour]'),
    btnValider: document.querySelector('[id=btn_salle_valider]'),
    btnAnnuler: document.querySelector('[id=btn_salle_annuler]'),
    lblDetailDept: document.querySelector('[id=lbl_salle_detail_dept]'),
    lblDetailDep2: document.querySelector('[id=lbl_salle_detail2_dept]'),
    lblNumErreur: document.querySelector('[id=lbl_erreur_num]'),
    lblEtageErreur: document.querySelector('[id=lbl_erreur_etage]'),
    lblContErreur: document.querySelector('[id=lbl_erreur_cont]'),
    lblEquiptErreur: document.querySelector('[id=lbl_erreur_equipt]'),
    divSalleEquipt: document.querySelector('[id=div_salle_equipement]'),
    divSalleEquiptEdit: document.querySelector('[id=div_salle_equipement_edit]'),
    btnAjouterEquipt: document.querySelector('[id=btn_equipement_ajouter]')
    // ,lblTotal :document.querySelector('[id=lbl_equipement_HT]')qzdzq
    ,
    lblHT: document.querySelector('[id=lbl_equipement_HT]'),
    lblTVA: document.querySelector('[id=lbl_equipement_TVA]'),
    lblTTC: document.querySelector('[id=lbl_equipement_TTC]'),
    tableEquipement: document.querySelector('[id=table_equipement]'),
    listeEquipt: document.querySelector('[id=select_equipement]'),
    edtQte: document.querySelector('[id=edt_equipement_qte]'),
    btnValiderEquipt: document.querySelector('[id=btn_equipement_valider]'),
    btnAnnulerEquipt: document.querySelector('[id=btn_equipement_annuler]'),
    lblSelectEquiptErreur: document.querySelector('[id=lbl_erreur_select_equipement]'),
    lblQteErreur: document.querySelector('[id=lbl_erreur_qte]')
});
//# sourceMappingURL=modificationInstallations.js.map