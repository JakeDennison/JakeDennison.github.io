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
      groupName: 'Admin Tools',
      version: '1.0',
      properties: {
        printfunction: {
          title: 'Print function',
          type: 'string',
            enum: ['Print Button', 'Page break', 'Print Text'],
          description: 'Select from the dropdown the function you want for this control.',
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Button'
        },
        textAttr: {
          title: 'Print Text',
          description: 'Maximum 255 characters',
          type: 'string',
          maxLength: 255,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static get styles() {
    return css`
      .print-btn {
        display: inline-flex;
        align-items: center;
        font-family: Open Sans, Helvetica, Arial, sans-serif;
        font-weight: 400;
        color: #161718;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        user-select: none;
        border: 1px solid;
        padding: 0.4rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
      }
  
      .print-btn.hide-on-print {
        display: none;
      }
  
      .print-icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.25rem;
      }
  
      .print-text {
        display: inline-block;
        vertical-align: middle;
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
    this.printfunction = "Print Button"
  }

  render() {
    let printContent;
  
    switch (this.printfunction) {
      case 'Print Button':
        printContent = html`
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
        break;
  
      case 'Page break':
        printContent = html`
          <div style="page-break-after: always;"></div>
        `;
        break;
  
      case 'Print Text':
        printContent = html`
          <div>${this.textAttr}</div>
        `;
        break;
  
      default:
        printContent = html``;
        break;
    }
  
    return printContent;
  }
}

customElements.define('neo-printform', templateElement);


