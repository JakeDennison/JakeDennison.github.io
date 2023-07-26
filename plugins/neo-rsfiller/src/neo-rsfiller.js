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
        RSJson: {
          title: 'Repeating section data',
          type: 'string',
          description: 'JSON containing repeating section data'
        },
        RSTarget: {
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

  static properties = {
  };
  
  constructor() {
    super();
    console.log("Class is: "+this.RSTarget)
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  connectedCallback() {
    // Find the ntx-repeating-section with the target class
    const ntxRepeatingSections = this.parentElement.querySelectorAll('ntx-repeating-section');
    for (const ntxSection of ntxRepeatingSections) {
      if (ntxSection.classList.contains(this.RSTarget)) {
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

  handleButtonClick() {
    // Your code here to handle the button click
    console.log("Button clicked");
  }

  render() {
    return `<p>Class: ${this.RSTarget}</p>`;
  }
}

customElements.define('neo-rsfiller', rsFillerElement);