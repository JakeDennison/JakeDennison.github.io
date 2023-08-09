import { LitElement, html, css } from 'lit';

class base64viewerElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-base64viewer',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: `https://jsdenintex.github.io/plugins/neo-base64viewer/dist/icon.svg`,
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
          description: 'https://tinytip.co/tips/html-pdf-params/ - e.g. #zoom=FitH'
        },
        docheight: {
          type: 'string',
          title: 'Height',
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
    this.pdfparam = '';
    this.docheight = '';
  }

  render() {
    if (!this.base64Data) {
      return html``;
    }

    const pdfParams = this.pdfparam ? `#${this.pdfparam}` : '';
    const dataUrl = `data:application/pdf;base64,${this.base64Data}`;

    const iframeStyle = this.docheight
      ? `height: ${this.docheight};`
      : '';

    return html`
      <iframe
        src="${dataUrl}${pdfParams}"
        style="${iframeStyle}"
        width="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    `;
  }
}

customElements.define('neo-base64viewer', base64viewerElement);
