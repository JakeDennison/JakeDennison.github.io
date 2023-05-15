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

      @media print {
        .d-none {
          display: initial !important;
        }
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
    this.handlePrintButtonClicked = this.handlePrintButtonClicked.bind(this);
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

  handlePrintButtonClicked() {
    window.print();
  }

  handleAfterPrint() {
    const formContainer = this.shadowRoot.querySelector('#nx-form-container');
    formContainer.classList.remove('d-none');
  }

  render() {
    return html`
      <div id="floating-bar" class="floating-bar">
        <button @click="${this.handlePrintButtonClicked}">
          <img src="${this.iconUrl}" alt="Print Icon" width="20" height="20">
        </button>
      </div>
      <div id="nx-form-container">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('neo-printform', templateElement);
