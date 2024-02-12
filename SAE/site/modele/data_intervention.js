import { connexion, APIsql } from "../modele/connexion.js";
class UnIntervention {
    constructor(num_interv = '', num_cont = '', date_interv = '', objet_interv = '', obs_interv = '') {
        this._numInterv = num_interv;
        this._numCont = num_cont;
        this._dateInterv = date_interv;
        this._objetInterv = objet_interv;
        this._obsInterv = obs_interv;
    }
    get numInterv() { return this._numInterv; }
    get numCont() { return this._numCont; }
    get dateInterv() { return this._dateInterv; }
    get objetInterv() { return this._objetInterv; }
    get obsInterv() { return this._obsInterv; }
    set numInterv(num_interv) { this._numInterv = num_interv; }
    set numCont(num_cont) { this._numCont = num_cont; }
    set dateInterv(date_interv) { this._dateInterv = date_interv; }
    set objetInterv(objet_interv) { this._objetInterv = objet_interv; }
    set obsInterv(obs_interv) { this._obsInterv = obs_interv; }
    toArray() {
        let tableau = { 'numInterv': this._numInterv, 'numCont': this._numCont, 'dateInterv': this._dateInterv, 'objetInterv': this._objetInterv, 'obsInterv': this._obsInterv };
        return tableau;
    }
}
class LesInterventions {
    constructor() {
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnIntervention
        let interventions = {};
        for (let i = 0; i < result.length; i++) {
            let item = result[i];
            let intervention = new UnIntervention(item['num_interv'], item['num_cont'], item['date_interv'], item['objet_interv'], item['obs_interv']);
            interventions[intervention.numInterv] = intervention; // clé d’un élément du tableau : numInterv
        }
        return interventions;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	num_interv, num_cont, date_interv, objet_interv, obs_interv ";
        sql += " FROM	intervention";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNumInterv(num_interv) {
        let intervention = new UnIntervention;
        const interventions = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_interv = ?"), [num_interv]));
        const lesCles = Object.keys(interventions);
        // affecte les clés du tableau associatif « interventions » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            intervention = interventions[lesCles[0]]; // récupérer le 1er élément du tableau associatif « interventions »
        }
        return intervention;
    }
    byContratDate(num_contrat, date_interv) {
        let numero = "";
        const interventions = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_cont = ? AND date_interv = ?"), [num_contrat, date_interv]));
        const lesCles = Object.keys(interventions);
        if (lesCles.length > 0) {
            numero = interventions[lesCles[0]].numInterv;
        }
        return numero;
    }
    toArray(interventions) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        const T = [];
        for (let id in interventions) {
            T.push(interventions[id].toArray());
        }
        return T;
    }
    delete(num_interv) {
        let sql;
        sql = "DELETE	FROM	intervention	WHERE	num_interv = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_interv]); // requête de manipulation : utiliser SQLexec
    }
    insert(intervention) {
        let sql; // requête de manipulation : utiliser SQLexec
        sql = "INSERT	INTO	intervention (num_interv, num_cont, date_interv, objet_interv, obs_interv) VALUES (?, ?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [intervention.numInterv, intervention.numCont, intervention.dateInterv, intervention.objetInterv, intervention.obsInterv]);
    }
    update(intervention) {
        let sql;
        sql = "UPDATE intervention SET num_cont = ?, date_interv = ?, objet_interv = ?, obs_interv = ? ";
        sql += " WHERE	num_interv	= ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [intervention.numCont, intervention.dateInterv, intervention.objetInterv, intervention.obsInterv, intervention.numInterv]);
    }
    getNouveauNumero() {
        return APIsql.sqlWeb.SQLloadData("SELECT MAX(num_interv)+1 as num FROM intervention", [])[0]['num']; // première ligne, colonne "num"
    }
    listPrepare(where) {
        let sql;
        sql = "SELECT intervention.num_interv, DATE_FORMAT(date_interv, '%d/%m/%Y') as 'date_interv'";
        sql += ", CONCAT(intervention.num_cont,' - ',ville_site) as 'contrat'";
        sql += ", CONCAT(contrat.num_cli,' - ',nom_cli) as 'client'";
        sql += ", REPLACE(CONCAT(SUM(tarif_ht*qte_prest),' €'),'.',',') as 'montant'";
        sql += " FROM intervention JOIN contrat ON intervention.num_cont=contrat.num_cont";
        sql += " JOIN client ON contrat.num_cli=client.num_cli";
        sql += " JOIN utilisation ON utilisation.num_interv=intervention.num_interv";
        sql += " JOIN prestation ON prestation.code_prest=utilisation.code_prest";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        sql += " GROUP BY num_interv";
        sql += " ORDER BY intervention.date_interv DESC ";
        return sql;
    }
    listAll() {
        return APIsql.sqlWeb.SQLloadData(this.listPrepare(""), []);
    }
    listByIntervention(num_interv) {
        return APIsql.sqlWeb.SQLloadData(this.listPrepare("intervention.num_interv  = ?"), [num_interv]);
    }
    listByPeriode(id_date1, id_date2) {
        return APIsql.sqlWeb.SQLloadData(this.listPrepare("intervention.date_interv  BETWEEN  ? AND ?"), [id_date1, id_date2]);
    }
    listByContrat(no_contrat) {
        return APIsql.sqlWeb.SQLloadData(this.listPrepare("intervention.num_cont = ?"), [no_contrat]);
    }
    listByClient(no_client, nom_client) {
        return APIsql.sqlWeb.SQLloadData(this.listPrepare("client.nom_cli LIKE CONCAT('%', ?, '%') OR client.num_cli LIKE CONCAT('%', ?, '%') "), [nom_client, no_client]);
    }
}
export { connexion };
export { UnIntervention };
export { LesInterventions };
//# sourceMappingURL=data_intervention.js.map