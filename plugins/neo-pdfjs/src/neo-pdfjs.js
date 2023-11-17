import { LitElement, html, css } from 'lit';
import { getDocument } from 'pdfjs-dist';

class pdfjsElement extends LitElement {
  static getMetaConfig() {
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
                description: 'Specify the height of the canvas, e.g., 500 or 750',
                defaultValue: '500',
            },
            pageNumber: {
                type: 'number',
                title: 'Page Number',
                description: 'Specify the page number of the PDF to display',
                defaultValue: 1,
            },
            scale: {
                type: 'number',
                title: 'Scale',
                description: 'Specify the scale for the PDF view (e.g., 1 for 100%, 1.5 for 150%)',
                defaultValue: 1.0,
            }
        },
        standardProperties: {
            fieldLabel: true,
            description: true,
        }
    };
}

  static get styles() {
    return css`
      :host {
        display: block;
      }
      canvas {
        width: 100%;
        height: auto;
      }
    `;
  }

  static properties = {
    src: { type: String },
    height: { type: String },
    pageNumber: { type: Number },
    scale: { type: Number }
  };

  constructor() {
    super();
    this.src = '';
    this.height = '500';
    this.pageNumber = 1;
    this.scale = 1.0;
  }

  firstUpdated() {
    this.loadPdf();
  }

  updated(changedProperties) {
    if (changedProperties.has('src')) {
        this.loadPdf();
    }
  }

  loadPdf() {
    if (!this.src) return;

    const pdfContainer = this.shadowRoot.getElementById('pdf-container');
    if (!pdfContainer) return;
    
    pdfContainer.innerHTML = ''; // Clear the existing content

    try {
        const pdfDocument = getDocument(this.src).promise;
        const pdfPage = pdfDocument.getPage(this.pageNumber);

        const scale = this.scale;
        const viewport = pdfPage.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };

        pdfPage.render(renderContext).promise;
        pdfContainer.appendChild(canvas);
    } catch (error) {
        console.error('Error loading PDF:', error);
        // Handle error (e.g., show a message to the user)
    }
  }


  render() {
    return html`<div style="width:100%" height="${this.height}px" id="pdf-container"></div>`;
  }
}

customElements.define('neo-pdfjs', pdfjsElement);
