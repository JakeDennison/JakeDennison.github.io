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

  firstUpdated() {
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
          let i = 1;  // Start from 1 as there is always a default value of 1 item showing
          while (i < rsDataCount) {  // Keep clicking until we have the same number of items as rsDataCount
            console.log("Clicking the button");
            button.click();
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