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
// --- Click to sign
const signhere = "Klicken Sie hier, um zu unterschreiben";

// Address control
// --- Enter an address
const enteradd = "Gib eine Adresse ein";
//Address finder is not enabled. Please manually enter an address.
const addnotcurrent = "Address finder is not enabled. Please manually enter an address."
const addnotnew = "Die Adresssuche ist nicht aktiviert. Bitte geben Sie manuell eine Adresse ein."

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

// --- Address Control Not enabled
function trAddressNE(className, currentText, newText) {
  var elements = document.getElementsByClassName(className);
  
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].textContent === currentText) {
      elements[i].textContent = newText;
    }
  }
}

// Select the target node
var target = document.body;

// Create an observer instance
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // If a new element with the specified class name and current text is added to the page, change its text
    if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].classList.contains('nx-address-input-panel') && mutation.addedNodes[0].textContent === currentText) {
      mutation.addedNodes[0].textContent = newText;
    }
  });
});

// Configuration of the observer:
var config = { attributes: true, childList: true, subtree: true };

// Pass in the target node, as well as the observer options
observer.observe(target, config);

trSignature("h5.d-print-none.ng-star-inserted", signhere);
trAddressPH("nx-address-input", enteradd);
trAddressNE("nx-address-input-panel", addnotcurrent, addnotnew);

// END of translations

const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);