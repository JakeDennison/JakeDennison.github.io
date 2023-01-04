import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class Placeholder extends LitElement {
  static async getMetaConfig() {
    return {
      title: 'ph-translate',
      fallbackDisableSubmit: false,
      version: '1.2',
    };
  }
  
  render() {
    return html`
    `;
  }
}

function setInputValues() {
  const elements = document.querySelectorAll('h5.d-print-none.ng-star-inserted');
  elements.forEach(element => {
    element.innerHTML = 'Klik hier om te ondertekenen';
  });
}

setInputValues();
const elementName = 'ph-translate';
customElements.define('ph-translate', Placeholder);