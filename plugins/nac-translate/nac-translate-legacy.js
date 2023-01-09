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
      properties: {
        dataobject: {
          type: 'string',
          title: 'Object',
          description: 'Test'
        },
      },
      standardProperties: {
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }
  
  static properties = {
    dataobject: 'test'
  }

  render() {
    return html`
        <p>Translating from English to German</p>`;
  }

}

function setInputValues() {
  const elements = document.querySelectorAll('h5.d-print-none.ng-star-inserted');
  elements.forEach(element => {
    element.innerHTML = 'Klicken Sie hier, um zu unterschreiben.';
  });
}

setInputValues();
const elementName = 'translate-legacy';
customElements.define('translate-legacy', Placeholder);