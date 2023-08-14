import { LitElement, html, css } from 'lit';

class base64viewerElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-base64viewer',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: `https://jsdenintex.github.io/plugins/neo-base64viewer/dist/files/icon.svg`,
      groupName: 'Visual',
      version: '1.1',
      properties: {
        base64Data: {
          type: 'string',
          title: 'Files as Base64',
          description: 'Please provide base64-encoded strings for the files or a base64 string for a single file.',
        },
        fileNames: {
          type: 'string',
          title: 'File Names',
          description: 'JSON array of file names corresponding to the base64Data. Required for navigation and multi-file display.',
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
          defaultValue: '600px',
        },
        freezeinput: {
          title: 'Freeze input',
          description: 'Enable to prevent refresh on base64 value change.',
          type: 'boolean',
          defaultValue: false,
        },
        docloaded: {
          title: 'Document displayed',
          description: 'Enable to prevent refresh on base64 value change.',
          type: 'boolean',
          defaultValue: false,
          isValueField: true,
        },
      },
      events: ["ntx-value-change"],
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
        width: 100%;
      }
    `;
  }
  
  constructor() {
    super();
    this.base64Data = '';
    this.base64store = '';
    this.fileNames = '';
    this.pdfparam = 'zoom=FitH';
    this.docheight = '600px';
    this.activeIndex = 0;
    this.freezeinput = false;
    this.docloaded = false;
    this.initialLoad = true;
    }

    updated(changedProperties) {
      if (changedProperties.has('base64Data')) {
        if (this.freezeinput && this.base64store === '') {
          this.base64store = this.base64Data;
        } else if (!this.freezeinput) {
          this.base64store = this.base64Data;
        }
      }
    }

    render() {
      if (!this.base64store) {
        return html``;
      }
    
      let base64Array = [];
      if (Array.isArray(this.base64store)) {
        base64Array = this.base64store;
      } else {
        base64Array = [this.base64store];
      }
    
      const pdfParams = this.pdfparam ? `#${this.pdfparam}` : '';
      const iframeStyle = this.docheight ? `height: ${this.docheight};` : '';
    
      if (base64Array.length > 1) {
        return html`
          <iframe
            src="${this.getPDFSrc(this.activeIndex, pdfParams, base64Array)}"
            style="${iframeStyle}"
            width="100%"
            frameborder="0"
            allowfullscreen
            @load="${this.handleDocumentLoad}"
          ></iframe>
          <nav>
            ${base64Array.map(
              (_, index) => html`
                <button
                  @click="${() => (this.activeIndex = index)}"
                  ?active="${index === this.activeIndex}"
                >
                  ${this.getFileName(index)}
                </button>
              `
            )}
          </nav>
        `;
      }
    
      const dataUrl = `data:application/pdf;base64,${base64Array[0]}`;

      return html`
        <iframe
          src="${dataUrl}${pdfParams}"
          style="${iframeStyle}"
          width="100%"
          frameborder="0"
          allowfullscreen
          @load="${this.handleDocumentLoad}"
        ></iframe>
      `;
    }
    
    
    handleDocumentLoad() {
      this.docloaded = true;
      const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.docloaded,
      };
      const event = new CustomEvent('ntx-value-change', args);
      this.dispatchEvent(event);
    }

  getPDFSrc(index, params, base64Array) {
    return `data:application/pdf;base64,${base64Array[index]}${params}`;
  }

  getFileName(index) {
    if (!this.fileNames) {
      return `File ${index + 1}`;
    }
    const names = JSON.parse(this.fileNames);
    return names[index] || `File ${index + 1}`;
  }
}

customElements.define('neo-base64viewer', base64viewerElement);
