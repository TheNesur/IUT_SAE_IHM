import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("http://localhost/IHM/SAE/site/vue/",
						"http://localhost/IHM/API/")
class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec votre nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('localhost','3306','mraitchko1u_ihm','pc','pc', 'utf8')
	}
}
let connexion = new Connexion;

export {connexion, APIsql}
