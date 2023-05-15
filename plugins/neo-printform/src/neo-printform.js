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
        width:100%;
        background-color:#555;
      }
      .print-text,
      .print-icon {
        vertical-align: middle;
      }
      .btn {
        display: inline-block;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        font-weight: 400;
        color: #161718;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: .525rem .75rem;
        font-size: .875rem;
        line-height: 1;
        border-radius: 4px;
        transition: all .2s ease-in-out;
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

  firstUpdated() {
    super.firstUpdated();
    const floatingBar = this.shadowRoot.querySelector('.floating-bar');
    const nwcFormRuntimeRoot = document.getElementById('nwc-form-runtime-root');

    if (floatingBar && nwcFormRuntimeRoot) {
      nwcFormRuntimeRoot.insertAdjacentElement('beforebegin', floatingBar);
    }
  }

  render() {
    return html`
      <slot></slot>
      <div class="floating-bar">
        <button class='btn btn-medium ml-md-auto nx-theme-button-1 ng-star-inserted' @click="${this.handlePrintButtonClicked}">
          <img class="print-icon" src="https://jsdenintex.github.io/plugins/neo-printform/dist/printing-bl.svg" alt="Print Icon" width="20" height="20">
          <span class="print-text">Print</span>
        </button>
      </div>
    `;
  }
}

customElements.define('neo-printform', templateElement);
