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
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) { /* Large devices */
        .month-input {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
      }
      @media (min-width: 993px) { /* Extra large devices */
        .month-input {
          flex: 0 0 25%;
          max-width: 25%;
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    this.statusColors = {};
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

  createMonthInputs(item) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return html`
      ${months.map((shortMonth, index) => html`
        <div class="mb-2 px-1 month-input">
          <label for="${shortMonth}-${item}" class="form-label">${fullMonths[index]}</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control" id="${shortMonth}-${item}" aria-label="Amount for ${fullMonths[index]}" @blur="${this.formatCurrency}">
            <span class="input-group-text">.00</span>
          </div>
        </div>
      `)}
    `;
  }

  updateStatus(item, status) {
    const colorMap = {
      'Not Approved': 'bg-danger',
      'Review Required': 'bg-warning',
      'Approved': 'bg-success'
    };
    this.statusColors = { ...this.statusColors, [item]: colorMap[status] };
    this.requestUpdate();
  }


  render() {
    const items = this.listitems.split(',');

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        <h2>Budget Calculator</h2>
        <p>Mode: ${this.mode}</p>
        ${items.map(item => html`
          <div class="card ${this.statusColors[item] || ''}">
            <div class="card-header">
              Item: ${item}
            </div>
            <div class="card-body d-flex flex-wrap">
              ${this.createMonthInputs(item)}
            </div>
            <div class="d-flex justify-content-end card-footer">
              <div class="btn-group" role="group" aria-label="Approval Status">
                <button type="button" class="btn btn-danger" @click="${() => this.updateStatus(item, 'Not Approved')}">Not Approved</button>
                <button type="button" class="btn btn-warning" @click="${() => this.updateStatus(item, 'Review Required')}">Review Required</button>
                <button type="button" class="btn btn-success" @click="${() => this.updateStatus(item, 'Approved')}">Approved</button>
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

}

customElements.define('kbr-budgetcalc', BudgetCalcElement);
