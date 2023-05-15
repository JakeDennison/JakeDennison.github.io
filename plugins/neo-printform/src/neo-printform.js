import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {
  static get styles() {
    return css`
      .floating-bar {
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: grey;
        padding: 10px;
      }
    `;
  }

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-printform',
      fallbackDisableSubmit: false,
      description: 'Display a print button on a bar at the top of the form',
      iconUrl: 'https://jsdenintex.github.io/plugins/neo-printform/dist/printing.svg',
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
    this.handleAfterPrint = this.handleAfterPrint.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('afterprint', this.handleAfterPrint);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('afterprint', this.handleAfterPrint);
  }

  handleAfterPrint() {
    document.querySelectorAll('.d-none').forEach(element => element.classList.remove('d-none'));
  }

  render() {
    return html`
      <div id="floating-bar" class="floating-bar">
        <button @click="${this.printButtonClicked}">
          <img src="${this.iconUrl}" alt="Print Icon" width="20" height="20">
        </button>
      </div>
      <ntx-form-runtime>
        <!-- Existing content of the ntx-form-runtime -->
      </ntx-form-runtime>
    `;
  }

  printButtonClicked() {
    window.print();
  }
}

customElements.define('neo-printform', templateElement);
