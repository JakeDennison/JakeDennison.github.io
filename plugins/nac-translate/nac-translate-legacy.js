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
        propLang: {
          title: 'Language',
          type: 'string',
        enum: ['English', 'German', 'Spanish', 'Dutch'],
          showAsRadio: false,
          verticalLayout: true,
          defaultValue: 'English',
        },
      },
      standardProperties: {
        readOnly: true,
        description: true,
      }
    };
  }

  static get properties() {
    return {
      // English
        signhere_EN: "Select to sign",
        enteradd_DE:"Enter an address",
        draghere_DE:"Drag files here or",
        uploadbutton_DE:"Select files",
      // German
        signhere_DE: "Klicken Sie hier, um zu unterschreiben",
        enteradd_DE:"Gib eine Adresse ein",
        draghere_DE:"Ziehen Sie Dateien hierher oder",
        uploadbutton_DE:"Dateien auswählen",
      //Spanish
        signhere_ES:"Haga clic aquí para firmar",
        enteradd_ES:"Ingrese una dirección",
        draghere_ES:"Arrastre archivos aquí o",
        uploadbutton_ES:"Seleccionar archivos",
      //Dutch
        signhere_NL:"Klik hier om te ondertekenen",
        enteradd_NL:"Voer een adres in",
        draghere_NL:"Sleep bestanden hierheen of",
        uploadbutton_NL:"Selecteer bestanden",
      //call language
        propLang: "English",
    };
  }

  trSignature(targetClass, signText) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = signText;
    });
  }

  trAddressPH(className, placeholder) {
    var elements = document.getElementsByClassName(className);
    
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute("placeholder", placeholder);
    }
  }

  trFileUpload(targetClass, Dragheretxt) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = Dragheretxt;
    });
  }

  trUploadBtn(targetClass, btntext) {
    const elements = document.querySelectorAll(targetClass);
    elements.forEach(element => {
      element.innerHTML = btntext + element.innerHTML.slice(element.innerHTML.indexOf('<'));
    });
  }

  _translate(selectLang) {
    console.log($.selectLang);
    console.log("Translate is calling");
    if (!selectLang) {
      selectLang = document.querySelector("#language-select");
    }
    if (selectLang === "English") {
      // original translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_EN);
      trAddressPH("nx-address-input", enteradd_EN);
      trFileUpload(".drag-file-label", draghere_EN);
      trUploadBtn(".nx-upload-button", uploadbutton_EN);
    } else if (selectLang === "German") {
      // german translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_DE);
      trAddressPH("nx-address-input", enteradd_DE);
      trFileUpload(".drag-file-label", draghere_DE);
      trUploadBtn(".nx-upload-button", uploadbutton_DE);
    } else if (selectLang === "Spanish") {
      // spanish translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_ES);
      trAddressPH("nx-address-input", enteradd_ES);
      trFileUpload(".drag-file-label", draghere_ES);
      trUploadBtn(".nx-upload-button", uploadbutton_ES);
    } else if (selectLang === "Dutch") {
      // dutch translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_NL);
      trAddressPH("nx-address-input", enteradd_NL);
      trFileUpload(".drag-file-label", draghere_NL);
      trUploadBtn(".nx-upload-button", uploadbutton_NL);
    }
  };

  constructor() {
    super();
    const select = this.propLang;
    this._translate();
    console.log(this.propLang);
  }
  _resetMessage;

  render() {
    return html`
    <label for="language-select">Translate Plugin</label>
    <select id="language-select" @change="${this._translate}">
      <option value="english">English</option>
      <option value="german">German</option>
      <option value="spanish">Spanish</option>
      <option value="dutch">Dutch</option>
    </select>
    `;
  }

}

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);