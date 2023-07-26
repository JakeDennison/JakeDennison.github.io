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
        rsdata: {
          title: 'Repeating section data',
          type: 'string',
          description: 'Enter repeating section data as a string'
        },
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
    this.rsdata = '';
    this.rstarget = '';
  }

  async firstUpdated() {
    console.log("firstUpdated is being called");
    
    const rsDataItems = JSON.parse(this.rsdata);  // Parse the rsdata string into a JSON object
    const rsDataCount = rsDataItems.length;  // Get the number of items in the rsdata JSON object
    
    console.log(`Expecting ${rsDataCount} items based on rsdata`);
  
    const ntxRepeatingSections = window.document.querySelectorAll('ntx-repeating-section');
    console.log("ntxRepeatingSections:", ntxRepeatingSections); 
    
    for (const ntxSection of ntxRepeatingSections) {
      const targetDiv = ntxSection.querySelector(`div.${this.rstarget}`);
      if (targetDiv) {
        console.log("Found a div with the target class");
    
        const button = ntxSection.querySelector("button.btn-repeating-section-new-row");
        console.log("Button:", button); 
  
        if (button) {
          let i = 0;  // Start from 0 since we will fill the default section first
          while (i < rsDataCount) {  // Keep clicking and filling until we have the same number of items as rsDataCount
            console.log("Filling the section");
            const inputs = Array.from(ntxSection.querySelectorAll('input'));  // Get all input elements in the section
            const dataValues = Object.values(rsDataItems[i]);  // Get all values from the JSON object
            
            for (let j = 0; j < inputs.length; j++) {
              if (inputs[j].type === 'checkbox') {  // Check if the input is a checkbox
                inputs[j].checked = dataValues[j];  // If it is, set its checked property
              } else {
                inputs[j].value = dataValues[j];  // If not, set its value property
              }
            }
  
            if (i < rsDataCount - 1) {  // Only click the button if there are more items to be filled
              console.log("Clicking the button");
              button.click();
  
              // Ensure that the new section has been added before we try to fill it
              // The actual delay needed here may vary depending on your application
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
            i++;
          }
          break;
        }
      }
    }
  }
  
  

  render() {
    console.log("Class is: " + this.rstarget);
    return html`
    <p>Class: ${this.rstarget}</p>
    <p>Version 1</p>`;
  }
}

customElements.define('neo-rsfiller', rsFillerElement);