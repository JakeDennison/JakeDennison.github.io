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

  printButtonClicked() {
    document.querySelectorAll('.d-none').forEach(element => element.classList.remove('d-none'));
    window.print();
  }
  
  constructor() {
    super();
  }

  render() {
    return html`
      <div id="grey-bar" style="background-color: grey; padding: 10px;">
        <button @click="${this.printButtonClicked}">
          <img src="${this.iconUrl}" alt="Print Icon" width="20" height="20">
        </button>
      </div>
      <div id="nx-form-container">
        <!-- Existing content of the nx-form-container -->
      </div>
    `;
  }
}

customElements.define('neo-printform', templateElement);