import { LitElement, html, css } from 'lit';

class BudgetCalcElement extends LitElement {
  static get properties() {
    return {
      dataobj: { type: String },
      mode: { type: String, default: 'New' },
      listitems: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .card {
        margin-bottom: 20px; /* Space between cards */
      }
      .input-group {
        padding-bottom: 10px; /* Space between input groups */
      }
      @media (max-width: 576px) { /* Smaller devices */
        .month-input {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      @media (min-width: 577px) and (max-width: 768px) { /* Medium devices */
        .month-input {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) { /* Large devices */
        .month-input {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
      @media (min-width: 993px) { /* Extra large devices */
        .month-input {
          flex: 0 0 16.66%;
          max-width: 16.66%;
        }
      }
    `;
  }
  static getMetaConfig() {
    return {
      controlName: 'kbr-budgetcalc',
      fallbackDisableSubmit: false,
      description: 'Yearly budget calculator',
      iconUrl: "",
      groupName: 'KBR',
      version: '1.0',
      properties: {
        listitems: {
          type: 'string',
          title: 'List Items',
          description: 'List of items to be budgeted (best use output from multi-select control)'
        },
        mode: {
          title: 'Control Mode',
          type: 'string',
          enum: ['New', 'Approve', 'Read-only'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'New',
        },
        dataobj: {
          type: 'string',
          title: 'Calculator Data Object',
          description: 'Leave empty if you are filling from new, enter output from previous calculator if not new'
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  constructor() {
    super();
    this.dataobj = '';
    this.listitems = '';
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }); 
  }

  updated(changedProperties) {
    if (changedProperties.has('listitems')) {
      console.log('listitems changed:', this.listitems);
    }
  }

  formatCurrency(event) {
    const value = parseFloat(event.target.value.replace(/[^\d.-]/g, ''));
    if (!isNaN(value)) {
      event.target.value = this.numberFormatter.format(value);
    }
  }

  render() {
    // Split the listitems string by commas to create an array
    const items = this.listitems.split(',');

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        <h2>Budget Calculator</h2>
        <p>Mode: ${this.mode}</p>
        ${items.map(item => html`
          <div class="card">
            <div class="card-header">
              Item: ${item}
            </div>
            <div class="card-body d-flex flex-wrap">
              ${Array.from({ length: 12 }, (_, i) => html`
                <div class="input-group mb-3 px-1 month-input">
                  <span class="input-group-text">$</span>
                  <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)"
                    @blur="${this.formatCurrency}">
                </div>
              `)}
            </div>
            <div class="d-flex justify-content-end card-footer">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="${item}-approved">
                <label class="form-check-label" for="${item}-approved">Approved</label>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('kbr-budgetcalc', BudgetCalcElement);
