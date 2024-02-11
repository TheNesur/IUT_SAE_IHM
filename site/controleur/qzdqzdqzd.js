class VueControl {
    // private _text: string;
    init(formData) {
        this._form = formData;
        this.form.btnAffichageAjouter.onclick = function () { vueControl.switchDisplayNewSalle(true); };
        this.form.btnAffichageRetirer.onclick = function () { vueControl.deleteRep(); };
        this.form.divValidNewRep.onclick = function () { vueControl.addNewRep(); };
        this.form.divAnnulNewRep.onclick = function () { vueControl.switchDisplayNewSalle(false); };
        this.form.divNewSalleInfo.onchange = function () { vueControl.onChangeCocheSalleInfo(); };
        this.form.divNewSalleNbrMachine.onkeydown = function (event) { vueControl.preventDecimalInput(event); };
        vueControl.onChangeNbrSalle();
    }
    get form() { return this._form; }
    preventDecimalInput(event) {
        // Empêcher la saisie manuelle de la virgule
        if (event.key === '.' || event.key === ',') {
            event.preventDefault();
        }
    }
    onChangeCocheSalleInfo() {
        console.log("Salle info : ", this.form.divNewSalleNbrMachine.disabled);
        if (this.form.divNewSalleInfo.checked)
            this.form.divNewSalleNbrMachine.disabled = false;
        else {
            this.form.divNewSalleNbrMachine.disabled = true;
            this.form.divNewSalleNbrMachine.style.borderColor = "none";
        }
    }
    onChangeNbrSalle() {
        this.form.pNbrSalleRep.textContent = "Nombre de salles répertoriées " + this.form.divSelectList.length;
    }
    switchDisplayNewSalle(stats) {
        if (stats) {
            this.form.divNewSalle.style.display = "block";
            this.form.divSelectList.disabled = true;
            this.form.btnAffichageAjouter.disabled = true;
            this.form.btnAffichageRetirer.disabled = true;
        }
        else {
            this.form.divNewSalle.style.display = "none";
            this.form.divSelectList.disabled = false;
            this.form.btnAffichageAjouter.disabled = false;
            this.form.btnAffichageRetirer.disabled = false;
        }
        // console.log("Text", stats);
        this.resetNewSalle();
    }
    resetNewSalle() {
        this.form.divNewSalleName.value = "";
        // console.log("SelectedOptions", this.form.selectBat);
        // Reset button batiment
        for (let i = 0; i < this.form.selectBat.length; i++) {
            // console.log()
            if (this.form.selectBat.options[i].selected)
                this.form.selectBat.options[i].selected = false;
        }
        // reset button radio Etage        
        this.getRadioButtonsEtage().forEach((radioButton) => {
            radioButton.checked = false;
        });
        // reset nbr machine
        this.form.divNewSalleNbrMachine.value = "";
        // reset check salle info
        this.form.divNewSalleInfo.checked = false;
    }
    addNewRep() {
        //A321, bât A, 3ième étage, salle informatique: 16 machines
        // nom salle, bat, etage, info? > nbr machine
        if (this.checkError()) {
            return;
        }
        // console.log(this._form.radioRDC.checked);
        let etage;
        let bat;
        // Permet d'ajouter/supprimer des salles dans le futur
        this.getRadioButtonsEtage().forEach((radioButton) => {
            const label = document.querySelector(`label[for="${radioButton.id}"]`);
            if (label) {
                if (radioButton.checked)
                    etage = label.textContent;
            }
        });
        for (let i = 0; i < this.form.selectBat.length; i++) {
            if (this.form.selectBat.options[i].selected)
                bat = this.form.selectBat.options[i].value;
        }
        const name = document.createElement("option");
        // Si l'utilisateur a coché "salle info"
        if (this._form.divNewSalleInfo.checked) {
            // Vérification que le nombre de machine est bien renseigné
            name.innerText = this._form.divNewSalleName.value + ", bât. " + bat + ", " + etage + " - salle informatique: " + this._form.divNewSalleNbrMachine.value.replace(/,/g, '') + (this._form.divNewSalleNbrMachine.value.replace(/,/g, '') < "2" ? " machine" : " machines");
        }
        else
            name.innerText = this._form.divNewSalleName.value + ", bât. " + bat + ", " + etage;
        this._form.divSelectList.append(name);
        this.switchDisplayNewSalle(false);
        this.onChangeNbrSalle();
    }
    getRadioButtonsEtage() {
        return Array.prototype.slice.call(document.querySelectorAll('.part3 input[type="radio"]'));
    }
    checkError() {
        let error = false;
        let mesError = "Vous n'avez pas rempli/sélectionné les champs suivants: \n";
        // Check Name salle
        if (this._form.divNewSalleName.value === "") {
            error = true;
            mesError += "- Salle\n";
        }
        // Check coche info and nbr machine
        if (this._form.divNewSalleNbrMachine.value == "" && this._form.divNewSalleInfo.checked) {
            error = true;
            mesError += "- Nombre de machine\n";
        }
        // Check select Bat
        for (let i = 0; i < this.form.selectBat.length; i++) {
            if (this.form.selectBat.options[i].selected)
                break;
            if (i === this.form.selectBat.length - 1) {
                error = true;
                mesError += "- Batiment\n";
            }
        }
        // Check select etage
        let etageSelected = false;
        this.getRadioButtonsEtage().forEach((radioButton) => {
            if (radioButton.checked)
                etageSelected = true;
        });
        if (!etageSelected) {
            error = true;
            mesError += "- Etage\n";
        }
        // Check nbr machine
        if (this._form.divNewSalleNbrMachine.value < "0" && this._form.divNewSalleNbrMachine.value != "") {
            error = true;
            mesError += "- Nombre de machine négatif\n";
        }
        if (error)
            window.alert(mesError + "\nVeuillez saisir correctement ces champs afin de pouvoir ajouter une nouvelle salle.");
        console.log("CheckError :  ", error);
        return error;
    }
    deleteRep() {
        if (window.confirm("Souhaitez-vous vraiment supprimer la salle ?")) {
            this.form.divSelectList.remove(this.form.divSelectList.selectedIndex);
            this.onChangeNbrSalle();
        }
    }
}
let vueControl = new VueControl();
export { vueControl };
//# sourceMappingURL=qzdqzdqzd.js.map