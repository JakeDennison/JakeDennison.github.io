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
      <div id="floating-bar" class="floating-bar">
        <button @click="${this.handlePrintButtonClicked}">
          <img src="${this.iconUrl}" alt="Print Icon" width="20" height="20">
        </button>
      </div>

      <form>
        <input type="text" class="d-none" value="Hidden in print media">
        <input type="text" value="Visible in print media">
      </form>
    `;
  }
}

customElements.define('neo-printform', templateElement);
