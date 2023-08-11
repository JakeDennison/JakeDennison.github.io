import { LitElement, html, css } from 'lit';

class rsElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-rs',
      fallbackDisableSubmit: false,
      description: 'Repeating section manipulator',
      iconUrl: "repeating-section",
      groupName: 'Form Tools',
      version: '1.0',
      properties: {
        rsnumber: {
          title: 'Number of sections by default',
          type: 'number',
          description: 'Please ensure the default value of sections is not changed from 1'
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
    this.rsnumber = 0;
    this.rstarget = ''; 
  }

  async firstUpdated() {
    const rsnumberCount = this.rsnumber;

    const ntxRepeatingSections = window.document.querySelectorAll('ntx-repeating-section');
    console.log("ntxRepeatingSections:", ntxRepeatingSections);

    for (const ntxSection of ntxRepeatingSections) {
      const targetDiv = ntxSection.querySelector(`div.${this.rstarget}`);
      console.log("Target Div:", targetDiv);

      const button = ntxSection.querySelector("button.btn-repeating-section-new-row");
      console.log("Button:", button);

      if (button && targetDiv) {
        for (let i = 0; i < rsnumberCount - 1; i++) { 
          button.click();
        }
      }
    }
  }

  render() {
    return html``;
  }
}

customElements.define('neo-rs', rsElement);