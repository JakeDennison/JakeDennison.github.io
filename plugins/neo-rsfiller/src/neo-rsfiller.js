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
      rsDataItems = JSON.parse(this.rsdata);
    } catch (error) {
      console.error("Failed to parse rsdata: ", error);
      return;
    }
  
    const rsDataCount = rsDataItems.length;
    console.log(`Expecting ${rsDataCount} items based on rsdata`);
  
    const ntxRepeatingSections = window.document.querySelectorAll('ntx-repeating-section');
    console.log("ntxRepeatingSections:", ntxRepeatingSections);
  
    const waitForElement = async (selector, root = window.document) => {
      while (!root.querySelector(selector)) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return root.querySelector(selector);
    }
  
    const fillSection = async (section, dataItem) => {
      for (let key in dataItem) {
        if (dataItem.hasOwnProperty(key)) {
          const targetInput = await waitForElement(`input.${key}`, section);
          if (targetInput) {
            switch (targetInput.type) {
              case 'checkbox':
              case 'radio':
                targetInput.checked = dataItem[key];
                break;
              case 'file':
                break;
              case 'date':
              case 'time':
                targetInput.value = dataItem[key];
                break;
              default:
                targetInput.value = dataItem[key];
                break;
            }
          }
        }
      }
    }
  
    for (const ntxSection of ntxRepeatingSections) {
      const targetDiv = ntxSection.querySelector(`div.${this.rstarget}`);
      if (targetDiv) {
        console.log("Found a div with the target class");
  
        const button = ntxSection.querySelector("button.btn-repeating-section-new-row");
        console.log("Button:", button);
  
        if (button) {
          let i = 0;
          while (i < rsDataCount) {
            console.log("Filling the section");
  
            // Wait for ntx-form-rows elements to be available and get all of them
            const ntxFormRows = await waitForElement('ntx-form-rows', ntxSection);
            const formRows = Array.from(ntxSection.querySelectorAll('ntx-form-rows'));
            const dataItem = rsDataItems[i];
  
            await fillSection(formRows[i], dataItem);
  
            if (i < rsDataCount - 1) {
              console.log("Clicking the button");
              button.click();
              // Ensure that the new section has been added before we try to fill it
              await new Promise(resolve => setTimeout(resolve, 1000));  // wait for a second or adjust the delay as needed
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