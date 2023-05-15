import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-printform',
      fallbackDisableSubmit: false,
      description: 'Display a print button on a bar at the top of the form',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-printform/dist/printing.svg",
      groupName: 'Admin tools',
      version: '1.0',
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  
  constructor() {
    super();
  }

  render() {''
  }
}

customElements.define('neo-printform', templateElement);
