import { LitElement, html, css } from 'lit';

class BudgetCalcElement extends LitElement {
  static get properties() {
    return {
      dataobj: { type: Object },
      listitems: { type: String },
      itemname: { type: String },
      review: { type: Boolean, default: false },
      currentuser: { type: String },
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
      .btn-group {
        flex-grow: 1;
        transition: all 0.3s ease;
        flex: 0 0 100%;
        max-width: 100%;
      }
      .comments-control {
        transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease, width 0.3s ease, margin 0.3s ease;
        max-height: 0;
        width: 0;
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
        padding: 0;
        margin: 0;
        display: none;
      }
      .comments-control.active {
        max-height: 200px;
        opacity: 1;
        visibility: visible;
        width: 100%;
        padding: .375rem .75rem;
        margin-top: 0.5rem;
        display: flex;
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
          description: 'List of items to be budgeted (best use output from multi-select control)',
          required: true
        },
        itemname: {
            type: 'string',
            title: 'Item Name',
            description: 'Singular Item Name such as Cost Center or Budget Code'
        },
        currentuser: {
          type: 'string',
          title: 'Context current user email',
          description: 'Please enter the context current user email',
          required: true
        },
        review: {
          title: 'Enable Review Mode',
          type: 'boolean',
          defaultValue: false,
        },
        dataobj: {
          type: 'object',
          title: 'Calculator Data Object',
          required: false,
          description: 'Leave empty if you are filling from new, enter output from previous calculator if not new',
          properties: {
            budgetItems: {
              type: 'array',
              title: 'Budget Items',
              isValueField: true,
              items: {
                type: 'object',
                properties: {
                  itemName: {
                    type: 'string',
                    title: 'Item Name',
                    description: 'Name of the budget item'
                  },
                  monthlyValues: {
                    type: 'object',
                    title: 'Monthly Values',
                    properties: {
                      January: { type: 'number', title: 'January' },
                      February: { type: 'number', title: 'February' },
                      March: { type: 'number', title: 'March' },
                      April: { type: 'number', title: 'April' },
                      May: { type: 'number', title: 'May' },
                      June: { type: 'number', title: 'June' },
                      July: { type: 'number', title: 'July' },
                      August: { type: 'number', title: 'August' },
                      September: { type: 'number', title: 'September' },
                      October: { type: 'number', title: 'October' },
                      November: { type: 'number', title: 'November' },
                      December: { type: 'number', title: 'December' }
                    }
                  },
                  total: {
                    type: 'number',
                    title: 'Total',
                    description: 'Total amount for the budget item'
                  },
                  outcome: {
                    type: 'string',
                    title: 'Outcome',
                    enum: ['Approved', 'Rejected'],
                    description: 'Approval outcome of the budget item'
                  },
                  notes: {
                    type: 'string',
                    title: 'Notes',
                    description: 'Additional notes or comments'
                  },
                  approver: {
                    type: 'string',
                    title: 'Approver Email',
                    description: 'Email of the approver'
                  },
                  lastUpdated: {
                    type: 'string',
                    title: 'Last Updated',
                    description: 'Date and time when the item was last updated',
                    format: 'date-time'
                  }
                }
              }
            }
          }
        }
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
        readOnly: true,
      }
    };
  }

  constructor() {
    super();
    this.dataobj = { budgetItems: [] };
    this.listitems = '';
    this.itemname = '';
    this.review = false;
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.statusColors = {};
    this.itemValues = {};
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

  updated(changedProperties) {
    if (changedProperties.has('listitems')) {
      console.log('listitems changed:', this.listitems);
      this.updateItemValuesFromDataObj();
    }
    if (changedProperties.has('dataobj')) {
      this.updateItemValuesFromDataObj();
    }
  }

  updateItemValuesFromDataObj() {
    if (this.dataobj && this.dataobj.budgetItems) {
      this.itemValues = {};
      this.dataobj.budgetItems.forEach(item => {
        this.itemValues[item.itemName] = Object.values(item.monthlyValues);
      });
    }
  }

  createHeader(item) {
    const itemnaming = this.itemname.length > 0 ? this.itemname : "Item:";
    const totalAmount = this.calculateTotalForItem(item);
    return html`
      <div class="card-header">
        <div style="float: left;" class="badge fs-6 bg-dark">${itemnaming} ${item}</div>
        <div style="float: right;" class="badge fs-6 rounded-pill bg-primary">Total: $${totalAmount}</div>
      </div>
    `;
  }

  formatCurrency(event, item) {
    const value = parseFloat(event.target.value.replace(/[^\d.-]/g, ''));
    if (!isNaN(value)) {
      event.target.value = this.numberFormatter.format(value);
    }
    this.calculateTotalForItem(item);
  }

  formatNumber(value) {
    return this.numberFormatter.format(value);
  }

  calculateTotalForItem(item) {
    if (!this.itemValues[item]) {
      return this.formatNumber(0);
    }
    const total = this.itemValues[item].reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return this.formatNumber(total);
  }

  updateValue(event, item, monthIndex) {
    const rawValue = event.target.value.replace(/[^\d.-]/g, '');
    const value = parseFloat(rawValue);
    this.itemValues[item] = this.itemValues[item] || [];
    this.itemValues[item][monthIndex] = isNaN(value) ? 0 : value;
    this.updateDataObj(item);
    this.requestUpdate();
  }

  updateDataObj(item) {
    const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
    if (existingItem) {
      const monthlyValues = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ].reduce((acc, month, index) => {
        acc[month] = this.itemValues[item][index] || 0;
        return acc;
      }, {});
      existingItem.monthlyValues = monthlyValues;
      existingItem.total = this.itemValues[item].reduce((acc, val) => acc + val, 0);
      existingItem.lastUpdated = new Date().toISOString();
    }
  }

  createMonthInputs(item) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
  
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
              .value="${existingItem ? this.formatNumber(existingItem.monthlyValues[fullMonths[index]]) : ''}"
              @blur="${e => { this.formatInput(e); this.updateValue(e, item, index); this.onChange(e); }}"
              @input="${e => this.formatCurrency(e, item)}">
          </div>
        </div>
      `)}
    `;
  }
  

  formatInput(event) {
    const value = parseFloat(event.target.value);
    event.target.value = isNaN(value) ? '' : this.numberFormatter.format(value);
  }

  autoResize(e) {
    e.target.style.height = e.target.classList.contains('active') ? 'auto' : '0';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  createFooter(item) {
    if (!this.review) {
      return '';
    }

    const statusInfo = this.statusColors[item] || { selectedStatus: '' };
    const outcomes = ['Rejected', 'Approved'];
    const showInput = statusInfo.selectedStatus === 'Rejected';

    return html`
      <div class="card-footer">
        <div class="btn-group" role="group" aria-label="Approval Status">
          ${outcomes.map(outcome => html`
            <button type="button"
                    class="${this.getButtonClass(outcome, statusInfo.selectedStatus)}"
                    @click="${() => this.updateStatus(item, outcome)}">${outcome}</button>
          `)}
        </div>
        ${showInput ? html`
          <textarea class="form-control comments-control active"
                    placeholder="Enter comments"
                    @input="${e => this.updateComments(e, item)}"
                    style="height: auto; min-height: 38px;"></textarea>
        ` : ''}
      </div>
    `;
  }

  updateStatus(item, status) {
    const colorMap = {
      'Approved': 'border-success',
      'Rejected': 'border-danger'
    };
    this.statusColors[item] = {
      borderColor: colorMap[status] || 'border-primary',
      selectedStatus: status
    };
    const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
    if (existingItem) {
      existingItem.outcome = status;
      existingItem.lastUpdated = new Date().toISOString();
    }
    this.requestUpdate();
    this.onChange(new CustomEvent('change', { target: { value: this.dataobj } })); // Dispatch event here
  }
  
  updateComments(event, item) {
    const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
    if (existingItem) {
      existingItem.notes = event.target.value;
      existingItem.lastUpdated = new Date().toISOString();
    }
    this.onChange(event); // Dispatch event here
  }

  getButtonClass(outcome, selectedStatus) {
    const baseClass = 'btn';
    if (selectedStatus === outcome) {
      return outcome === 'Approved' ? `${baseClass} btn-success` : `${baseClass} btn-danger`;
    }
    return outcome === 'Approved' ? `${baseClass} btn-outline-success` : `${baseClass} btn-outline-danger`;
  }

  render() {
    const items = this.listitems.split(',').map(item => item.trim());

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${items.map(item => {
          const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
          return html`
            <div class="card ${this.statusColors[item]?.borderColor || ''}">
              ${this.createHeader(item)}
              <div class="card-body d-flex flex-wrap">
                ${this.createMonthInputs(item)}
              </div>
              ${this.createFooter(item)}
            </div>
          `;
        })}
      </div>
    `;
  }
}

customElements.define('kbr-budgetcalc', BudgetCalcElement);