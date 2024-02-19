import * as APIsql from "../modele/sqlWeb.js";
APIsql.sqlWeb.init("http://localhost/IHM/SAE/site/vue/", "http://localhost/IHM/API/");
// APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~raitchko1u/IHM-SAE-FINAL/SAE/site/vue/",
// 						"https://devweb.iutmetz.univ-lorraine.fr/~raitchko1u/IHM-SAE-FINAL/API/")
class Connexion {
    constructor() {
        this.init();
    }
    init() {
        // à adapter avec votre nom de base et vos identifiants de connexion
        APIsql.sqlWeb.bdOpen('localhost', '3306', 'mraitchko1u_ihm', 'root', 'root', 'utf8');
        // APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','raitchko1u_ihm','raitchko1u_appli','32303650', 'utf8')
    }
}
let connexion = new Connexion;
export { connexion, APIsql };
//# sourceMappingURL=connexion.js.map