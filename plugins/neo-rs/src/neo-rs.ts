import { LitElement, html, css, property, PropertyValues } from 'lit';
import { PluginContract, PropType as PluginProperty } from '@nintex/form-plugin-contract';

// Define the contract information using @nintex/form-plugin-contract
const rsElementContract: PluginContract = {
  version: '1.0',
  fallbackDisableSubmit: false,
  controlName: 'neo-rs',
  description: 'Repeating section manipulator',
  iconUrl: 'repeating-section',
  groupName: 'Form Tools',
  properties: {
    rsnumber: {
      type: 'number',
      title: 'Number of sections by default',
      description: 'Please ensure the default value of sections is not changed from 1',
    },
    rstarget: {
      type: 'string',
      title: 'Target class',
      description: 'Class name used to target repeating section',
    },
  },
  standardProperties: {
    fieldLabel: true,
    description: true,
  },
};

class rsElement extends LitElement {
  @property({ type: Number }) rsnumber: number;
  rstarget: string = '';

  constructor() {
    super();
    this.rsnumber = 0;
    this.rstarget = '';
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this.runActions(); // Trigger actions on component load
  }

  updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('rsnumber')) {
      this.runActions();
      this.requestUpdate(); // Manually trigger a re-render when rsnumber changes
    }
  }

  private runActions() {
    console.log('actions running');
    const rsnumberCount = this.rsnumber;
    const ntxRepeatingSections = this.shadowRoot!.querySelectorAll('ntx-repeating-section');

    for (const ntxSection of ntxRepeatingSections) {
      const targetDiv = ntxSection.querySelector(`div.${this.rstarget}`);
      const button = ntxSection.querySelector("button.btn-repeating-section-new-row");

      if (button && targetDiv) {
        for (let i = 0; i < rsnumberCount - 1; i++) {
          button.click();
        }
      }
    }
  }

  render() {
    return html`
      <div>rsNumber: ${this.rsnumber}</div>
    `;
  }

  // Include the contract information using @nintex/form-plugin-contract
  static getMetaConfig(): PluginContract {
    return rsElementContract;
  }
}

customElements.define('neo-rs', rsElement);