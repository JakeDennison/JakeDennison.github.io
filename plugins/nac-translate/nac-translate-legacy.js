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
// Signature control
const signhere = "Klicken Sie hier, um zu unterschreiben";
// Address control
const enteradd = "Gib eine Adresse ein";


// Translate Signature Field
function trSignature() {
  const elements = document.querySelectorAll('h5.d-print-none.ng-star-inserted');
  elements.forEach(element => {
    element.innerHTML = signhere;
  });
}

// Translate Address Field
function trAddressPH(className, placeholder) {
  // Get all elements with the specified class name
  var elements = document.getElementsByClassName(className);
  
  // Loop through all elements
  for (var i = 0; i < elements.length; i++) {
    // Set the placeholder attribute for each element
    elements[i].setAttribute("placeholder", placeholder);
  }
}


trSignature();
trAddressPH("nx-address-input", enteradd);
const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);