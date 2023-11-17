import { LitElement, html, css } from 'lit';

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

  async connectedCallback() {
    super.connectedCallback();
    this.toggleSpinner(true);

    // Check if PDF.js script is already loaded
    if (!window.pdfjsLib) {
      console.log("PDF.js script being added");
      await this.loadPDFJSScript();
    }

    if (window.pdfjsLib) {
      // PDF.js is loaded, you can now use it
      this.loadPDF('your-pdf-url.pdf');
    }
  }

  loadPDFJSScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'; // Replace with your preferred CDN URL
      script.onload = () => {
        console.log('PDF.js script loaded');
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadPDF(pdfUrl) {
    const pdfjsLib = window.pdfjsLib;
    
    try {
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
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
