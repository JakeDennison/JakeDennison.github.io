import { LitElement, html, css } from 'lit';

class neobtnElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-btn',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "button",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        src: {
          type: 'string',
          title: 'URL for button link',
        },
        text: {
          type: 'string',
          title: 'Text on button',
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
      }
    `;
  }
  
  constructor() {
    super();
    this.src = '';
  }

  render() {''
  }
}

customElements.define('neo-btn', neobtnElement);
