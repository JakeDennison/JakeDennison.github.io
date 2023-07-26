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
          type: 'string',
          title: 'Repeating section data',
          description: 'JSON containing repeating section data'
        },
        RSTarget: {
          type: 'string',
          title: 'Target class',
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
    this.RSJson = '';
    this.RSTarget = ''; // Initialize RSTarget with the target class name
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.addButtonProgrammatically();
  }

  addButtonProgrammatically() {
    // Find the parent repeating section with the value of this.RSTarget
    const parentRepeatingSection = this.findParentRepeatingSection();
    if (parentRepeatingSection) {
      console.log('Found parent repeating section:', parentRepeatingSection);
      console.log('this.RSTarget:', this.RSTarget);

      // Perform the action you want when the "Add new row" button of the correct repeating section is clicked
      // For example, programmatically click the button:
      const addButton = parentRepeatingSection.querySelector('.btn-repeating-section-new-row');
      if (addButton) {
        addButton.click();
      }
    } else {
      console.log('Parent repeating section with the value of this.RSTarget not found.');
    }
  }

  findParentRepeatingSection() {
    // Helper function to find the parent repeating section with the value of this.RSTarget
    const repeatingSections = this.shadowRoot.querySelectorAll('ntx-repeating-section');
    for (const section of repeatingSections) {
      if (section.classList.contains(this.RSTarget)) {
        return section;
      }
    }
    return null; // If no parent with the value of this.RSTarget is found
  }

  render() {
    // You can add the template for your web component here
  }
}

customElements.define('neo-rsfiller', rsFillerElement);