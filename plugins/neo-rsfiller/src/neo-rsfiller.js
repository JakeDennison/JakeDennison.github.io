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
          for (let i = 0; i < rsDataCount - 1; i++) {  // Subtract 1 because there is already a default section
            button.click();
            // You may need to add some delay or checking mechanism here to make sure the section is added before the next click
          }
  
          const waitForElement = async () => {
            while (!ntxSection.querySelectorAll('ntx-form-rows').length) {
              await new Promise(resolve => requestAnimationFrame(resolve));
            }
            return ntxSection.querySelectorAll('ntx-form-rows');
          }
  
          const ntxFormRowsArray = await waitForElement();  // Wait for all the ntx-form-rows to be available
  
          for (let i = 0; i < rsDataCount; i++) {
            console.log("Filling the section");
            const inputs = Array.from(ntxFormRowsArray[i].querySelectorAll('input'));  // Get all input elements in the i-th ntx-form-rows
            const dataValues = Object.values(rsDataItems[i]);  // Get all values from the i-th item of the JSON object
  
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
                  inputs[j].readOnly = false;  // Disable readOnly attribute
                  inputs[j].value = dataValues[j];  // Change the value
                  break;
                default:
                  inputs[j].value = dataValues[j];  // If not, set its value property
                  break;
              }
            }
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