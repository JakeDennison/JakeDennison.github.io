import { LitElement, html, css } from 'lit';

class rsFillerElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-rsfiller',
      fallbackDisableSubmit: false,
      description: 'Repeating section filler',
      iconUrl: "repeating-section",
      groupName: 'Form Tools',
      version: '1.0',
      properties: {
        rstarget: {
          title: 'Target class',
          type: 'string',
          description: 'Class name used to target repeating section'
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
    this.rstarget = '';
  }

  firstUpdated() {
    // Find the ntx-repeating-section with the target class
    const ntxRepeatingSections = this.parentElement.querySelectorAll('ntx-repeating-section');
    for (const ntxSection of ntxRepeatingSections) {
      if (ntxSection.classList.contains(this.rstarget)) {
        // Found the correct ntx-repeating-section
        // Find the button inside it and click it
        const button = ntxSection.querySelector("button.btn-repeating-section-new-row");
        if (button) {
          button.click(); // Programmatically click the button
          break; // Stop searching after the first occurrence with the target class
        }
      }
    }
  }

  render() {
    console.log("Class is: " + this.rstarget);
    return html`<p>Class: ${this.rstarget}</p>`;
  }
}

customElements.define('neo-rsfiller', rsFillerElement);