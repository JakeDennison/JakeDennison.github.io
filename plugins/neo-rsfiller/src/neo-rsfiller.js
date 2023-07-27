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
  
    let rsDataItems;
    try {
      rsDataItems = JSON.parse(this.rsdata);  // Validate and parse the rsdata string into a JSON object
    } catch(error) {
      console.error("Failed to parse rsdata: ", error);
      return;
    }
  
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
  
            const waitForElement = async (selector) => {
              while (!ntxSection.querySelector(selector)) {
                await new Promise(resolve => requestAnimationFrame(resolve));
              }
              return ntxSection.querySelector(selector);
            }
  
            const ntxFormRows = await waitForElement('ntx-form-rows');  // Wait for the ntx-form-rows element to be available
            const inputs = Array.from(ntxFormRows.querySelectorAll('input'));  // Get all input elements in the ntx-form-rows
            const dataValues = Object.values(rsDataItems[i]);  // Get all values from the JSON object
  
            for (let j = 0; j < inputs.length; j++) {
              switch (inputs[j].type) {
                case 'checkbox':
                case 'radio':
                  inputs[j].checked = dataValues[j];  // If it is a checkbox or radio, set its checked property
                  break;
                case 'file':
                  // File inputs require a more complex handling, you can't set the value directly due to security reasons.
                  // If you need to test with file inputs, consider using a testing framework that has file upload support.
                  break;
                case 'date':
                case 'time':
                  // For date and time, dataValues[j] should be in valid format
                  inputs[j].value = dataValues[j];
                  break;
                default:
                  inputs[j].value = dataValues[j];  // If not, set its value property
                  break;
              }
            }
  
            if (i < rsDataCount - 1) {  // Only click the button if there are more items to be filled
              console.log("Clicking the button");
              button.click();
              // Ensure that the new section has been added before we try to fill it
              await waitForElement(`div.${this.rstarget}`);
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