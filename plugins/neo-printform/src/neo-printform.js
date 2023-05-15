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
    const floatingBar = this.shadowRoot.querySelector('.floating-bar');
    const elements = this.shadowRoot.querySelectorAll('.d-none');
    
    // Hide the floating bar
    floatingBar.style.display = 'none';
  
    // Toggle the 'd-print-block' class on elements
    elements.forEach((element) => {
      element.classList.toggle('d-print-block');
    });
  
    // Trigger print functionality
    window.print();
  
    // Restore the floating bar and elements after printing
    window.addEventListener('afterprint', () => {
      floatingBar.style.display = 'block';
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
          <img class="print-icon" src="https://jsdenintex.github.io/plugins/neo-printform/dist/printing-bl.svg" alt="Print Icon" width="20" height="20">
          Print
        </button>
      </div>
    `;
  }
}

customElements.define('neo-printform', templateElement);
