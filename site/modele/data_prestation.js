import { connexion, APIsql } from "../modele/connexion.js";
class UnPrestation {
    constructor(code_prest = '', lib_prest = '', tarif_ht = '') {
        this._codePrest = code_prest;
        this._libPrest = lib_prest;
        this._tarifHt = tarif_ht;
    }
    get codePrest() { return this._codePrest; }
    get libPrest() { return this._libPrest; }
    get tarifHt() { return this._tarifHt; }
    set codePrest(code_prest) { this._codePrest = code_prest; }
    set libPrest(lib_prest) { this._libPrest = lib_prest; }
    set tarifHt(tarif_ht) { this._tarifHt = tarif_ht; }
    toArray() {
        const tableau = { 'codePrest': this._codePrest, 'libPrest': this._libPrest, 'tarifHt': this._tarifHt.replace('.', ',') };
        return tableau;
    }
}
class LesPrestations {
    constructor() {
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnPrestation
        const prestations = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const prestation = new UnPrestation(item['code_prest'], item['lib_prest'], item['tarif_ht']);
            prestations[prestation.codePrest] = prestation; // clé d’un élément du tableau : codePrest
        }
        return prestations;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	prestation.code_prest AS 'code_prest', lib_prest, tarif_ht ";
        sql += " FROM	prestation ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byCodePrest(code_prest) {
        let prestation = new UnPrestation;
        const prestations = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("code_prest = ? "), [code_prest]));
        const lesCles = Object.keys(prestations);
        // affecte les clés du tableau associatif « prestations » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            prestation = prestations[lesCles[0]]; // récupérer le 1er élément du tableau associatif « prestations »
        }
        return prestation;
    }
    toArray(prestations) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        const T = [];
        for (let id in prestations) {
            T.push(prestations[id].toArray());
        }
        return T;
    }
}
// Classe représentant la relation « utilisation » 
// Le nom de la classe sera composée des noms des relations détail – maître,
// pour notre cas « UnPrestationByIntervention ». 
// Cela indique que l’accès aux données de la relation détail « prestation » 
// se fait par l’identifiant « num_interv » de la relation maître « intervention »
class UnPrestationByIntervention extends UnPrestation {
    constructor(code_prest = '', lib_prest = '', tarif_ht = '', qte_prest = '') {
        super(code_prest, lib_prest, tarif_ht);
        this._qtePrest = qte_prest;
        this._montant = (Number(this.tarifHt) * Number(this.qtePrest)).toFixed(2);
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get qtePrest() { return this._qtePrest; }
    get montant() { return this._montant; }
    set qtePrest(qte_prest) { this._qtePrest = qte_prest; }
    set montant(montant) { this._montant = montant; }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif 
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau = super.toArray(); // appel de la méthode « toArray » de « UnPrestation »
        tableau['qtePrest'] = this.qtePrest;
        tableau['montant'] = this.montant.replace('.', ',');
        return tableau;
    }
}
class LesPrestationsByIntervention {
    constructor() {
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnPrestationByIntervention
        const prestationsByIntervention = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const prestationByIntervention = new UnPrestationByIntervention(item['code_prest'], item['lib_prest'], item['tarif_ht'], item['qte_prest']);
            prestationsByIntervention[prestationByIntervention.codePrest] = prestationByIntervention;
        }
        return prestationsByIntervention;
    }
    prepare(where) {
        let sql;
        sql = "SELECT prestation.code_prest as code_prest, prestation.lib_prest as lib_prest, tarif_ht, qte_prest";
        sql += " FROM utilisation JOIN prestation ON utilisation.code_prest=prestation.code_prest";
        sql += " JOIN intervention ON utilisation.num_interv = intervention.num_interv";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNumInterv(num_interv) {
        // renvoie le tableau d’objets contenant toutes les presations de intervention num_interv
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("utilisation.num_interv = ?"), [num_interv]));
    }
    byNumIntervCodePrest(num_interv, code_prest) {
        // renvoie l’objet de code_prest contenu dans intervention num_interv
        let prestationByIntervention = new UnPrestationByIntervention;
        const prestationsByIntervention = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("utilisation.num_interv = ? and utilisation.code_prest = ?"), [num_interv, code_prest]));
        if (!prestationsByIntervention[0] === undefined) {
            prestationByIntervention = prestationsByIntervention[0];
        }
        return prestationByIntervention;
    }
    toArray(prestationsByIntervention) {
        const T = [];
        for (let id in prestationsByIntervention) {
            T.push(prestationsByIntervention[id].toArray());
        }
        return T;
    }
    delete(num_interv) {
        let sql;
        sql = "DELETE	FROM	utilisation	WHERE	num_interv = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_interv]); // requête de manipulation : utiliser SQLexec
    }
    insert(num_interv, prestations) {
        // requête d’ajout dans « utilisation » pour intervention num_interv
        let sql;
        let separateur = "";
        sql = "INSERT INTO utilisation(num_interv, code_prest, qte_prest) VALUES ";
        for (let cle in prestations) {
            sql += separateur + "('" + num_interv + "','" + prestations[cle].codePrest + "','" + prestations[cle].qtePrest + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    }
    getTotal(prestations) {
        let mt = 0;
        for (let id in prestations) {
            mt += Number(prestations[id].montant);
        }
        return mt;
    }
}
export { connexion };
export { UnPrestation };
export { LesPrestations };
export { UnPrestationByIntervention };
export { LesPrestationsByIntervention };
//# sourceMappingURL=data_prestation.js.map