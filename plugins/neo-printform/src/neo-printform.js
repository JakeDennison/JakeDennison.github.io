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

      .print-icon path,
      .print-icon polygon,
      .print-icon circle,
      .print-icon rect {
        fill: black;
      }
    `;
  }

  handlePrintButtonClicked() {
    const elements = document.querySelectorAll('.d-none');
    elements.forEach((element) => {
      element.classList.toggle('d-print-block');
    });

    window.print();

    window.addEventListener('afterprint', () => {
      elements.forEach((element) => {
        element.classList.toggle('d-print-block');
      });
    });
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
      },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <slot></slot>
      <div class="floating-bar">
        <button @click="${this.handlePrintButtonClicked}">
          <img class="print-icon" src="https://jsdenintex.github.io/plugins/neo-printform/dist/printing.svg" alt="Print Icon" width="20" height="20">
        </button>
      </div>
    `;
  }
}

customElements.define('neo-printform', templateElement);
