import { LitElement, html, css } from 'lit';

class templateElement extends LitElement {

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
      :host {
        display: block;
      }
      .floating-bar {
        position: sticky;
        top: 0;
        z-index: 9999;
        background-color: grey;
        padding: 10px;
        width:100%;
        background-color:#555;
      }
      .print-btn {
        display: inline-block;
        font-family: Open Sans,Helvetica,Arial,sans-serif;
        font-weight: 400;
        color: #161718;
        text-align: center;
        vertical-align: middle;
        -webkit-user-select: none;
        user-select: none;
        border: 1px solid;
        padding: .525rem .75rem;
        font-size: .875rem;
        line-height: 1;
        border-radius: 4px;
        transition: all .2s ease-in-out;
        margin-left:10px;
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

  constructor() {
    super();
  }

  firstUpdated() {
    super.firstUpdated();
    const floatingBar = this.shadowRoot.querySelector('.floating-bar');
    const nwcFormRuntimeRoot = document.getElementById('nwc-form-runtime-root');
  
    if (floatingBar && nwcFormRuntimeRoot) {
      const styles = window.getComputedStyle(floatingBar);
      const computedStyles = {};
  
      for (let i = 0; i < styles.length; i++) {
        const property = styles[i];
        computedStyles[property] = styles.getPropertyValue(property);
      }
  
      Object.keys(computedStyles).forEach(property => {
        this.style.setProperty(property, computedStyles[property]);
      });
  
      nwcFormRuntimeRoot.insertAdjacentElement('beforebegin', floatingBar);
    }
  }
  

  render() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      return html`
      `;
    }
    // Render the print button for non-iOS devices
    return html`
      <slot></slot>
      <div class="floating-bar">
        <button class='print-btn' @click="${this.handlePrintButtonClicked}">
          <!-- Print button content -->
        </button>
      </div>
    `;
  }
  
}

customElements.define('neo-printform', templateElement);