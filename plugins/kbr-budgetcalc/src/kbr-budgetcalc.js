import { LitElement, html, css } from 'lit';

class BudgetCalcElement extends LitElement {
  static get properties() {
    return {
      listitems: { type: String },
      itemname: { type: String },
      currentuser: { type: String },
      reviewmode: { type: Boolean },
      inputobj: { type: Object },
      outputobj: { type: Object },
      itemValues: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .card {
        margin-bottom: 20px;
      }
      .currency-input {
        text-align: right;
      }
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s ease;
      }
      .input-group {
        padding-bottom: 10px;
      }
      @media (max-width: 576px) {
        .month-input {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      @media (min-width: 577px) and (max-width: 768px) {
        .month-input {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) {
        .month-input {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
      }
      @media (min-width: 993px) {
        .month-input {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.listitems = '';
    this.itemname = '';
    this.reviewmode = false;
    this.inputobj = {};
    this.outputobj = {};
    this.itemValues = {};
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  initializeMonthlyValues() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.reduce((acc, month) => {
      acc[month] = 0.00;
      return acc;
    }, {});
  }

  createHeader(item) {
    return html`
      <div class="card-header">
        <div class="badge fs-6 bg-dark">${this.itemname ? this.itemname : 'Item'}: ${item}</div>
        <div class="badge fs-6 rounded-pill bg-primary">Total: $${this.calculateTotalForItem(item)}</div>
      </div>
    `;
  }

  createBody(item) {
    return html`
      <div class="card-body d-flex flex-wrap">
        ${this.createMonthInputs(item)}
      </div>
    `;
  }

  createFooter(item) {
    if (this.reviewmode) {
      return html`
        <div class="card-footer">
          <select @blur="${e => this.handleApprovalStatusChange(item, e.target.value)}">
            <option value="">Select Approval Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <textarea @blur="${e => this.handleCommentsChange(item, e.target.value)}"></textarea>
        </div>
      `;
    } else {
      return html``;
    }
  }

  createMonthInputs(item) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const itemMonthlyValues = this.itemValues[item] || this.initializeMonthlyValues();

    return html`
      ${months.map((shortMonth, index) => html`
        <div class="mb-2 px-1 month-input">
          <label for="${shortMonth}-${item}" class="form-label">${fullMonths[index]}</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control currency-input" id="${shortMonth}-${item}"
              aria-label="Amount for ${fullMonths[index]}"
              ?disabled="${this.readOnly}"
              placeholder="0.00"
              .value="${this.formatNumber(itemMonthlyValues[fullMonths[index]])}"
              @blur="${e => this.handleValueChange(item, fullMonths[index], parseFloat(e.target.value.replace(/[^\d.-]/g, '')) || 0)}">
          </div>
        </div>
      `)}
    `;
  }

  handleValueChange(item, month, value) {
    if (!this.itemValues[item]) {
      this.itemValues[item] = this.initializeMonthlyValues();
    }
    this.itemValues[item][month] = value;
    this.requestUpdate();
  }

  handleApprovalStatusChange(item, value) {
    // Handle approval status change logic
  }

  handleCommentsChange(item, value) {
    // Handle comments change logic
  }

  calculateTotalForItem(item) {
    if (!this.itemValues[item]) {
      return this.formatNumber(0);
    }
    const total = Object.values(this.itemValues[item]).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return this.formatNumber(total);
  }

  formatNumber(value) {
    return this.numberFormatter.format(value);
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${this.listitems.split(',').map((item) => html`
          <div class="card">
            ${this.createHeader(item)}
            ${this.createBody(item)}
            ${this.createFooter(item)}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('kbr-budgetcalc', BudgetCalcElement);
