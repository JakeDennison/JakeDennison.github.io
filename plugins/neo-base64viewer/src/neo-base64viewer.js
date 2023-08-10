import { LitElement, html, css } from 'lit';
import pdfjsLib from 'pdfjs-dist';
import '../node_modules/pdfjs-dist/web/pdf_viewer.css';

class base64viewerElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-base64viewer',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: `https://jsdenintex.github.io/plugins/neo-base64viewer/dist/files/icon.svg`,
      groupName: 'Visual',
      version: '1.0',
      properties: {
        base64Data: {
          type: 'string',
          title: 'File as Base64',
          description: 'Please convert the file into Base64 and enter the value here.'
        },
        pdfparam: {
          type: 'string',
          title: 'PDF parameters',
          description: 'https://tinytip.co/tips/html-pdf-params/ - e.g. zoom=FitH will fit the width of the document',
          defaultValue: 'zoom=FitH',
        },
        docheight: {
          type: 'string',
          title: 'Height',
          description: 'use standard HTML height values, 80%, 720px, 4vh etc.',
          defaultValue: '600px'
        },
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
        width: 100%;
      }
    `;
  }
  
  constructor() {
    super();
    this.base64Data = '';
    this.pdfparam = 'zoom=FitH';
    this.docheight = '600px';
  }

  firstUpdated() {
    if (!this.base64Data) {
      return;
    }

    const binaryString = atob(this.base64Data);
    const len = binaryString.length;
    const uint8Array = new Uint8Array(len);

    for (let i = 0; i < len; ++i) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    pdfjsLib.getDocument({ data: binaryData }).promise.then(pdfDocument => {
      const container = this.shadowRoot.querySelector('#pdfViewer');
      const viewer = new pdfjsLib.PDFViewer({
        container,
      });
    
      viewer.setDocument(pdfDocument);
    
      pdfDocument.getPage(1).then(page => {
        viewer.setInitialPage(page);
      });
    });
  }
  
  render() {
    if (!this.base64Data) {
      return html``;
    }

    const containerStyle = this.docheight
      ? `height: ${this.docheight};`
      : '';

    return html`
      <div style="${containerStyle}">
        <div id="pdfViewer" class="pdfViewer"></div>
      </div>
    `;
  }

  async renderPdf() {
    if (!this.base64Data) {
      return;
    }

    const uint8Array = this.base64ToUint8Array(this.base64Data);
    const loadingTask = pdfjsLib.getDocument(uint8Array);

    const pdfDocument = await loadingTask.promise;
    const pdfViewer = new pdfjsLib.PDFViewer({
      container: this.shadowRoot.querySelector('#pdfContainer'),
    });

    pdfViewer.setDocument(pdfDocument);
  }

  base64ToUint8Array(base64String) {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const uint8Array = new Uint8Array(len);

    for (let i = 0; i < len; ++i) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  }
}

customElements.define('neo-base64viewer', base64viewerElement);
