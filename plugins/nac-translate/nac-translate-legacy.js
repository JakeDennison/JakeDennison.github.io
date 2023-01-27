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
        choiceAttr: {
          title: 'Language',
          type: 'string',
        enum: ['English', 'German', 'Spanish', 'Dutch'],
          defaultValue: 'English',
        },
      },
      standardProperties: {
        readOnly: true,
        description: true,
      }
    };
  }

  static properties = {
    choiceAttr: 'English'
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

  constructor() {
    super();
    this.select = this.choiceAttr;
  }

  translate() {
    console.log(this.select.value);
    console.log("Translate is calling");
    if (this.select.value === "dutch") {
      // dutch translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_NL);
      trAddressPH("nx-address-input", enteradd_NL);
      trFileUpload(".drag-file-label", draghere_NL);
      trUploadBtn(".nx-upload-button", uploadbutton_NL);
    } else if (this.select.value === "german") {
      // german translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_DE);
      trAddressPH("nx-address-input", enteradd_DE);
      trFileUpload(".drag-file-label", draghere_DE);
      trUploadBtn(".nx-upload-button", uploadbutton_DE);
    } else if (this.select.value === "spanish") {
      // spanish translations
      trSignature("h5.d-print-none.ng-star-inserted", signhere_ES);
      trAddressPH("nx-address-input", enteradd_ES);
      trFileUpload(".drag-file-label", draghere_ES);
      trUploadBtn(".nx-upload-button", uploadbutton_ES);
    }
  };

  render() {
    return html`
    <p>Translate Mod</p>`;
  }

}

// Translations here
// German
const signhere_DE = "Klicken Sie hier, um zu unterschreiben";
const enteradd_DE = "Gib eine Adresse ein";
const draghere_DE = "Ziehen Sie Dateien hierher oder"
const uploadbutton_DE = "Dateien auswählen"

//Spanish
const signhere_ES = "Haga clic aquí para firmar";
const enteradd_ES = "Ingrese una dirección";
const draghere_ES = "Arrastre archivos aquí o";
const uploadbutton_ES = "Seleccionar archivos";

//Dutch
const signhere_NL = "Klik hier om te ondertekenen";
const enteradd_NL = "Voer een adres in";
const draghere_NL = "Sleep bestanden hierheen of"
const uploadbutton_NL = "Selecteer bestanden"

// END of translations

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);