import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class Placeholder extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      title: 'translate-legacy',
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

  render() {
    return html`
        <p>Translating from English to German</p>`;
  }

}

// Translations here
// Signature control ---
// Click to sign
const signhere = "Klicken Sie hier, um zu unterschreiben";

// Address control
// Enter an address
const enteradd = "Gib eine Adresse ein";
//Address finder is not enabled. Please manually enter an address.
const addnotenabled = "Die Adresssuche ist nicht aktiviert. Bitte geben Sie manuell eine Adresse ein."

// Translate Signature Field
function trSignature() {
  const elements = document.querySelectorAll('h5.d-print-none.ng-star-inserted');
  elements.forEach(element => {
    element.innerHTML = signhere;
  });
}

// Translate Address Field
function trAddressPH(className, placeholder) {
  var elements = document.getElementsByClassName(className);
  
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute("placeholder", placeholder);
  }
}

function trAddressError(className, text) {
  var element = document.getElementsByClassName(className)[0];
  element.textContent = text;
}


trSignature();
trAddressPH("nx-address-input", enteradd);
trAddressError("nx-address-input-panel",addnotenabled);

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);