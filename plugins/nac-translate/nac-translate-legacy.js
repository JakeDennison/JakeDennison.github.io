import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class Placeholder extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-legacy',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "group-control",
      groupName: 'Languages',
      version: '1.3',
      properties: {
        propLang: {title: 'Language',type: 'string',enum: ['English', 'German', 'Spanish', 'Dutch'],showAsRadio: false,verticalLayout: true,defaultValue: 'English',
        hasChanged(newLang, oldLang) {
          if (newLang > oldLang) {
            console.log(`${newLang} > ${oldLang}. hasChanged: true.`);
            return true;
          }
          else {
            console.log(`${newLang} <= ${oldLang}. hasChanged: false.`);
            return false;
          }
        }
      },
      },
      standardProperties: {
        readOnly: true,
        description: true,
      }
    };
  };

  static get properties(){ return {
      signhere_EN: {type: String},
      enteradd_EN: {type: String},
      draghere_EN: {type: String},
      uploadbutton_EN: {type: String},
      //
      signhere_DE: {type: String},
      enteradd_DE: {type: String},
      draghere_DE: {type: String},
      uploadbutton_DE: {type: String},
      //
      signhere_ES: {type: String},
      enteradd_ES: {type: String},
      draghere_ES: {type: String},
      uploadbutton_ES: {type: String},
      //
      signhere_NL: {type: String},
      enteradd_NL: {type: String},
      draghere_NL: {type: String},
      uploadbutton_NL: {type: String},
    };
  }

  trSignature(targetClass, signText) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = signText;
    });
  };

  _trAddressPH(className, placeholder) {
    var elements = document.getElementsByClassName(className);
    
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute("placeholder", placeholder);
    }
  };

  _trFileUpload(targetClass, Dragheretxt) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = Dragheretxt;
    });
  };

  _trUploadBtn(targetClass, btntext) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = btntext + element.innerHTML.slice(element.innerHTML.indexOf('<'));
    });
  };

  _translate(selectLang,onchange) {
    console.log("Translate is calling");
    console.log(this.selectLang);
    console.log(selectLang);
    if (onchange===true ){
      
    };
    
    // English
    const signhere_EN = 'Select to sign';
    const enteradd_EN = 'Enter an address';
    const draghere_EN = 'Drag files here or';
    const uploadbutton_EN = 'Select files';
    // German
    const signhere_DE = 'Klicken Sie hier; um zu unterschreiben';
    const enteradd_DE = 'Gib eine Adresse ein';
    const draghere_DE = 'Ziehen Sie Dateien hierher oder';
    const uploadbutton_DE = 'Dateien auswählen';
    //Spanish
    const signhere_ES = 'Haga clic aquí para firmar';
    const enteradd_ES = 'Ingrese una dirección';
    const draghere_ES = 'Arrastre archivos aquí o';
    const uploadbutton_ES = 'Seleccionar archivos';
    //Dutch
    const signhere_NL = 'Klik hier om te ondertekenen';
    const enteradd_NL = 'Voer een adres in';
    const draghere_NL = 'Sleep bestanden hierheen of';
    const uploadbutton_NL = 'Selecteer bestanden';

    console.log(selectLang);
    if (selectLang === "English") {
      // original translations
      this._trSignature("h5.d-print-none.ng-star-inserted", this.signhere_EN);
      this._trAddressPH("nx-address-input", this.enteradd_EN);
      this._trFileUpload(".drag-file-label", this.draghere_EN);
      this._trUploadBtn(".nx-upload-button", this.uploadbutton_EN);
    } else if (selectLang === "German") {
      // german translations
      this._trSignature("h5.d-print-none.ng-star-inserted", this.signhere_DE);
      this._trAddressPH("nx-address-input", this.enteradd_DE);
      this._trFileUpload(".drag-file-label", this.draghere_DE);
      this._trUploadBtn(".nx-upload-button", this.uploadbutton_DE);
    } else if (selectLang === "Spanish") {
      // spanish translations
      this._trSignature("h5.d-print-none.ng-star-inserted", this.signhere_ES);
      this._trAddressPH("nx-address-input", this.enteradd_ES);
      this._trFileUpload(".drag-file-label", this.draghere_ES);
      this._trUploadBtn(".nx-upload-button", this.uploadbutton_ES);
    } else if (selectLang === "Dutch") {
      // dutch translations
      this._trSignature("h5.d-print-none.ng-star-inserted", this.signhere_NL);
      this._trAddressPH("nx-address-input", this.enteradd_NL);
      this._trFileUpload(".drag-file-label", this.draghere_NL);
      this._trUploadBtn(".nx-upload-button", this.uploadbutton_NL);
    }
  };

  constructor() {
    super();
    this.propLang = "English";
    const select = this.propLang;
    this._translate(select);
  };
  _resetMessage;

  render() {
    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <label for="language-select">Translate Plugin - showing ${this.propLang}</label>
    <select class="form-select" aria-label="English" id="language-select" @change="${this.getNewVal}">
      <option selected>English</option>
      <option value="German">German</option>
      <option value="Spanish">Spanish</option>
      <option value="Dutch">Dutch</option>
    </select>
    `;
  };

  updated(){
    console.log('Language changed to '+this.propLang);
  }

  getNewVal(){
    let newLang = document.querySelector("#language-select");
    this.propLang = newLang;
  }

};

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);