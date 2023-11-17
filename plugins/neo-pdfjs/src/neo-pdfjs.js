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
  
  updated(changedProperties) {
    if (changedProperties.has('src')) {
      this.loadPdf();
    }
  }

  async loadPdf() {
    if (this.src) {
      const pdfContainer = this.shadowRoot.getElementById('pdf-container');
      // Clear the existing content
      pdfContainer.innerHTML = '';
      const loadingTask = pdfjsLib.getDocument(this.src);

      loadingTask.promise.then(function (pdfDocument) {
        // Fetch the first page of the PDF
        pdfDocument.getPage(1).then(function (pdfPage) {
          // Set the desired scale (e.g., 1.5 for 150% zoom)
          const scale = 1.0;
          const viewport = pdfPage.getViewport({ scale });

          // Prepare canvas using PDF page dimensions
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          pdfPage.render(renderContext).promise.then(function () {
            pdfContainer.appendChild(canvas);
          });
        });
      });
    }
  }

  render() {
    return html`<div style="width:100%" height="${this.height}" id="pdf-container"></div>`;
  }
}

customElements.define('neo-pdfjs', pdfjsElement);
