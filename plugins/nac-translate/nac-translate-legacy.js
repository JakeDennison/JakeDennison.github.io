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
      standardProperties: {
        readOnly: true,
        description: true,
      }
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

  constructor() {
    super();
    // German
    this.signhere_DE = "Klicken Sie hier, um zu unterschreiben";
    this.enteradd_DE = "Gib eine Adresse ein";
    this.draghere_DE = "Ziehen Sie Dateien hierher oder"
    this.uploadbutton_DE = "Dateien auswählen"

    //Spanish
    this.signhere_ES = "Haga clic aquí para firmar";
    this.enteradd_ES = "Ingrese una dirección";
    this.draghere_ES = "Arrastre archivos aquí o";
    this.uploadbutton_ES = "Seleccionar archivos";

    //Dutch
    this.signhere_NL = "Klik hier om te ondertekenen";
    this.enteradd_NL = "Voer een adres in";
    this.draghere_NL = "Sleep bestanden hierheen of"
    this.uploadbutton_NL = "Selecteer bestanden"
    this.select = "English"
    this.select = this.shadowRoot.querySelector("#language-select");
    this.select.addEventListener("change", this.translate.bind(this));
  }

  translate() {
    console.log(this.select.value);
    console.log("Translate is calling");
    if (this.select.value === "English") {
      // original translations
      trSignature("h5.d-print-none.ng-star-inserted", "Select to sign");
      trAddressPH("nx-address-input", "Enter an address");
      trFileUpload(".drag-file-label", "Drag files here or");
      trUploadBtn(".nx-upload-button", "Select files");
    } else if (this.select.value === "German") {
      // german translations
      trSignature("h5.d-print-none.ng-star-inserted", this.signhere_DE);
      trAddressPH("nx-address-input", this.enteradd_DE);
      trFileUpload(".drag-file-label", this.draghere_DE);
      trUploadBtn(".nx-upload-button", this.uploadbutton_DE);
    } else if (this.select.value === "Spanish") {
      // spanish translations
      trSignature("h5.d-print-none.ng-star-inserted", this.signhere_ES);
      trAddressPH("nx-address-input", this.enteradd_ES);
      trFileUpload(".drag-file-label", this.draghere_ES);
      trUploadBtn(".nx-upload-button", this.uploadbutton_ES);
    } else if (this.select.value === "Dutch") {
      // dutch translations
      trSignature("h5.d-print-none.ng-star-inserted", this.signhere_NL);
      trAddressPH("nx-address-input", this.enteradd_NL);
      trFileUpload(".drag-file-label", this.draghere_NL);
      trUploadBtn(".nx-upload-button", this.uploadbutton_NL);
    }
  };

  render() {
    return html`
    <label for="language-select">Select language:</label>
    <select id="language-select">
      <option value="english">English</option>
      <option value="german">German</option>
      <option value="spanish">Spanish</option>
      <option value="english">Dutch</option>
    </select>
    `;
  }

}


const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);