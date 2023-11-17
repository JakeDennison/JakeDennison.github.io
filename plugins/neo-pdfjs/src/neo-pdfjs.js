import { LitElement, html, css } from 'lit';
import {
  getDocument,
  PDFWorker,
  // ... other named exports you need
} from 'pdfjs-dist';


class pdfjsElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-pdfjs',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Visual',
      version: '1.0',
      properties: {
        src: {
          type: 'string',
          title: 'PDF Source',
          description: 'Please provide a link to the PDF file'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    src: '',
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
  }

  async loadPDF(pdfUrl) {
    try {
      const pdfDoc = await pdfjsLib.getDocument({ url: pdfUrl, worker: new PDFWorker() }).promise;
      const pdfPage = await pdfDoc.getPage(1);
      const canvas = this.shadowRoot.querySelector('canvas');
      const context = canvas.getContext('2d');
  
      const viewport = pdfPage.getViewport({ scale: 1.5 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
  
      await pdfPage.render({ canvasContext: context, viewport });
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }
  
  render() {
    return html`
      <canvas></canvas>
    `;
  }
}

customElements.define('neo-pdfjs', pdfjsElement);
