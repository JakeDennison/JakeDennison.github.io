import { LitElement, html, css } from 'lit';
import * as pdfjsLib from 'pdfjs-dist';

class pdfjsElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-pdfjs',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "https://mozilla.github.io/pdf.js/images/logo.svg",
      groupName: 'Visual',
      version: '1.1',
      properties: {
        src: {
          type: 'string',
          title: 'PDF source',
          description: 'Please provide a URL to the PDF you wish to display'
        },
        height: {
          type: 'string',
          title: 'Canvas Height in px',
          description: 'i.e. 500 or 750',
          defaultValue: '500',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    src: { type: String },
    height: { type: String },
  };

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.src = '';
    this.height = '';
  }


  render() {
    return html`<div style="width:100%" height="${this.height}" id="pdf-container"></div>`;
  }
}

customElements.define('neo-pdfjs', pdfjsElement);
