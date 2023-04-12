import { LitElement, html, css } from 'lit';

class autofillement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-autofill',
      fallbackDisableSubmit: false,
      description: 'Add autofill capability to Nintex data lookup control',
      iconUrl: "data-lookup",
      groupName: 'Admin tools',
      version: '1.0',
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  render() {
    return html`
  `;
  }
}

customElements.define('neo-autofill', autofillement);
