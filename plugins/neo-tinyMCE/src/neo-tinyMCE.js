import { LitElement, html, css } from 'lit';
import { render as initializeEditor } from './editor';

class tinyMCEElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-tinymce',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        htmlValue: {
          type: 'string',
          title: 'HTML value to be displayed in the editor',
          description: 'Provide a variable or stringified html'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  constructor() {
    super();
    this.htmlValue = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeTinyMCE();
  }

  initializeTinyMCE() {
    console.log("tinyMCE init")
    this.updateComplete.then(() => {
      initializeEditor(this.renderRoot.querySelector('#tiny-mce-editor'));
    });
  }

  render() {
    return html`<textarea id="tiny-mce-editor">${this.htmlValue}</textarea>`;
  }

  get value() {
    return this.htmlValue;
  }
  
  set value(val) {
    this.htmlValue = val;
    if (tinymce.get('tiny-mce-editor')) {
      tinymce.get('tiny-mce-editor').setContent(val);
    }
  }
}


customElements.define('neo-tinymce', tinyMCEElement);
