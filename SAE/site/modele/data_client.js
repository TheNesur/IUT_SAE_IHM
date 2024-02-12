import { connexion, APIsql } from "../modele/connexion.js";
class UnClient {
    constructor(num_cli = '', civ_cli = '', nom_cli = '', prenom_cli = '', tel_cli = '', mel_cli = '') {
        this._numCli = num_cli;
        this._civCli = civ_cli;
        this._nomCli = nom_cli;
        this._prenomCli = prenom_cli;
        this._telCli = tel_cli;
        this._melCli = mel_cli;
    }
    get numCli() { return this._numCli; }
    get civCli() { return this._civCli; }
    get nomCli() { return this._nomCli; }
    get prenomCli() { return this._prenomCli; }
    get telCli() { return this._telCli; }
    get melCli() { return this._melCli; }
    set numCli(num_cli) { this._numCli = num_cli; }
    set civCli(civ_cli) { this._civCli = civ_cli; }
    set nomCli(nom_cli) { this._nomCli = nom_cli; }
    set prenomCli(prenom_cli) { this._prenomCli = prenom_cli; }
    set telCli(tel_cli) { this._telCli = tel_cli; }
    set melCli(mel_cli) { this._melCli = mel_cli; }
    toArray() {
        let tableau = { 'numCli': this._numCli, 'civCli': this._civCli, 'nomCli': this._nomCli, 'prenomCli': this._prenomCli, 'telCli': this._telCli, 'melCli': this._melCli };
        return tableau;
    }
}
class LesClients {
    constructor() {
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnClient
        let clients = {};
        for (let i = 0; i < result.length; i++) {
            let item = result[i];
            let client = new UnClient(item['num_cli'], item['civ_cli'], item['nom_cli'], item['prenom_cli'], item['tel_cli'], item['mel_cli']);
            clients[client.numCli] = client; // clé d’un élément du tableau : numCli
        }
        return clients;
    }
    prepare(where) {
        let sql;
        sql = "SELECT	num_cli, civ_cli, nom_cli, prenom_cli, tel_cli, mel_cli ";
        sql += " FROM	client";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byNumCli(num_cli) {
        let client = new UnClient;
        const clients = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_cli = ?"), [num_cli]));
        const lesCles = Object.keys(clients);
        // affecte les clés du tableau associatif « clients » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            client = clients[lesCles[0]]; // récupérer le 1er élément du tableau associatif « clients »
        }
        return client;
    }
    toArray(clients) {
        //	d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        const T = [];
        for (let id in clients) {
            T.push(clients[id].toArray());
        }
        return T;
    }
    delete(num_cli) {
        let sql;
        sql = "DELETE	FROM	client	WHERE	num_cli = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_cli]); // requête de manipulation : utiliser SQLexec
    }
    insert(client) {
        let sql; // requête de manipulation : utiliser SQLexec
        sql = "INSERT	INTO	client (num_cli, civ_cli, nom_cli, prenom_cli, tel_cli, mel_cli) VALUES (?, ?, ?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [client.numCli, client.civCli, client.nomCli, client.prenomCli, client.telCli, client.melCli]);
    }
    update(client) {
        let sql;
        sql = "UPDATE client SET civ_cli = ?, nom_cli = ?, prenom_cli = ?, tel_cli = ?, mel_cli = ? ";
        sql += " WHERE	num_cli	= ?"; // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [client.civCli, client.nomCli, client.prenomCli, client.telCli, client.melCli, client.numCli]);
    }
}
export { connexion };
export { UnClient };
export { LesClients };
//# sourceMappingURL=data_client.js.map