import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class Placeholder extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'translate-german',
      fallbackDisableSubmit: false,
      description: 'provide a plugin to translate the form',
      iconUrl: "group-control",
      groupName: 'Languages',
      version: '1.3',
      standardProperties: {
        readOnly: true,
        description: true,
        thistranslation: {type:string}
      }
    };
  }

  render() {
    return html`
    <p>Translating from English to ${this.planet}</p>`;
  }

}

// Translations here

const signhere = "Klicken Sie hier, um zu unterschreiben";
const enteradd = "Gib eine Adresse ein";
const draghere = "Ziehen Sie Dateien hierher oder"
const uploadbutton = "Dateien auswählen"

// --- Translate Signature Field
function trSignature(targetClass, signText) {
  const elements = document.querySelectorAll(targetClass);
  elements.forEach(element => {
    element.innerHTML = signText;
  });
}

// Translate Address Field
// --- Placeholder
function trAddressPH(className, placeholder) {
  var elements = document.getElementsByClassName(className);
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute("placeholder", placeholder);
  }
}

// Translate file upload
// --- drag files here
function trFileUpload(targetClass, Dragheretxt) {
  const elements = document.querySelectorAll(targetClass);
  elements.forEach(element => {
    element.innerHTML = Dragheretxt;
  });
}
// --- select files button
function trUploadBtn(targetClass, btntext) {
  const elements = document.querySelectorAll(targetClass);
  elements.forEach(element => {
    element.innerHTML = btntext + element.innerHTML.slice(element.innerHTML.indexOf('<'));
  });
}

trSignature("h5.d-print-none.ng-star-inserted", signhere);
trAddressPH("nx-address-input", enteradd);
trFileUpload(".drag-file-label", draghere);
trUploadBtn(".nx-upload-button", uploadbutton);

// END of translations

const elementName = 'translate-german';
customElements.define('translate-german', Placeholder);