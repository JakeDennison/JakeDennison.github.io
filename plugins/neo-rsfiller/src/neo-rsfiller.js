import { LitElement, html, css } from 'lit';
import flatpickr from 'flatpickr';

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
          console.log("ntxFormRowsArray:", ntxFormRowsArray);
          
          for (let i = 0; i < rsDataCount; i++) {
            console.log("Filling the section");
            const dataItem = rsDataItems[i]; // Get the i-th item of the JSON object
            console.log(`Data for section ${i}:`, dataItem);
  
            // Click before filling the section
            ntxFormRowsArray[i].click();
  
            // For each key in dataItem, find the div with this key as class and fill the input inside of it
            for (let key in dataItem) {
              const targetDiv = ntxFormRowsArray[i].querySelector(`div.${key}`);
              console.log(`Looking for div with class ${key} in section ${i}:`, targetDiv);
              
              if (targetDiv) {
                const input = targetDiv.querySelector('input, ntx-datetime-picker input');
                console.log(`Looking for input in div with class ${key}:`, input);
                
                if (input) {
                  switch (input.type) {
                    case 'checkbox':
                    case 'radio':
                      input.checked = dataItem[key];
                      break;
                    case 'file':
                      // handle file input
                      break;
                    case 'date':
                    case 'time':
                      let flatpickrInstance = input._flatpickr;
                      if(flatpickrInstance) {
                        flatpickrInstance.setDate(dataItem[key], true);
                      } else {
                        console.warn(`No flatpickr instance found for input ${input.name}`);
                      }
                      break;
                    default:
                      input.value = dataItem[key];
                      break;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  render() {
    console.log("Class is: " + this.rstarget);
    return html`
    <p>Class: ${this.rstarget}</p>
    <p>5</p>`;
  }
}

customElements.define('neo-rsfiller', rsFillerElement);