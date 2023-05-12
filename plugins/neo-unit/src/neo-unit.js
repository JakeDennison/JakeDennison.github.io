import { LitElement, html, css } from 'lit';
import './neo-unit.css';

class unitElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-unit',
      fallbackDisableSubmit: false,
      description: 'Control for diplaying units of measurement',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",
      groupName: 'Custom controls',
      version: '1.0',
      properties: {
        unittype: {
          title: 'Choice field',
          type: 'string',
          enum: ['kg.', 'ltr.', 'km'],
          verticalLayout: true,
          defaultValue: 'kg.',
        },
        unitvalue: {
          type: 'number',
          title: 'Unit value',
          description: 'Decimal unit value',
          isValueField: true,
        },
        decimalplaces: {
          type: 'integer',
          title: 'Decimal place',
          description: 'enter -1 for none, 1 for .0, 2 for .01 etc.',
          isValueField: true,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
      events: ["ntx-value-change"],
    };
  }

  constructor() {
    super();
  }

  onChange(e) {
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: e.target.value,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
}

  render() {
    return html`
      <div class="neo-unit-control">
        <div class="input-unit-group-append">
          <button type="button" class="neo-btn-input-icon neo-unit-btn">
            <span>${this.unittype}</span>
          </button>
        </div>
        <div class="nx-zinc-control-input input-group">
          <ntx-simple-number>
            <input type="text" 
              data-simple-control="true"
              class="form-control nx-theme-input-1 ng-untouched ng-pristine ng-valid" 
              decimalplaces=${this.decimalplaces}
            >
          </ntx-simple-number>
        </div>
      </div>
    `;
  }
}

customElements.define('neo-unit', unitElement);
