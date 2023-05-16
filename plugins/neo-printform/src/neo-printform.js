import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {
  static get properties() {
    return {
      showButton: { type: Boolean },
    };
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

  static get styles() {
    return css`
      .print-btn {
        display: inline-block;
        font-family: var(--ntx-form-theme-font-family, "Open Sans", "Helvetica", "Arial", sans-serif);
        font-weight: 400;
        background-color: var(--ntx-form-theme-color-primary, #006BD6;);
        color: var(--ntx-form-theme-color-input-background, #fff);
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        user-select: none;
        border: 1px solid;
        padding: 0.525rem 0.75rem;
        font-size: var(--ntx-form-theme-text-input-size, 14px);
        line-height: var(--ntx-form-control-line-height, 1.25);
        border-radius: var(--ntx-form-theme-border-radius, 4px);
        transition: all 0.2s ease-in-out;
        margin-left: 10px;
      }

      .print-btn.hide-on-print {
        display: none;
      }

      /* Print styles */
      @media print {
        .print-btn {
          display: none;
        }
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

    this.dispatchEvent(
      new CustomEvent('print-button-clicked', { bubbles: true, composed: true })
    );
  }

  constructor() {
    super();
    this.showButton = true; // Initialize the button visibility to true
  }

  render() {
    return html`
      <button
        class=${this.showButton ? 'print-btn' : 'print-btn hide-on-print'}
        @click=${this.handlePrintButtonClicked}
      >
        <img
          class="print-icon"
          src="https://jsdenintex.github.io/plugins/neo-printform/dist/printing-bl.svg"
          alt="Print Icon"
          width="20"
          height="20"
        />
        <span class="print-text">Print</span>
      </button>
    `;
  }
}

customElements.define('neo-printform', templateElement);