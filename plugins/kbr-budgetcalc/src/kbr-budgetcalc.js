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
      itemValues: { type: Object },
      statusColors: { type: Object }
    };
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
          description: 'List of items to be budgeted',
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
        },
        reviewmode: {
          title: 'Enable Review Mode',
          type: 'boolean',
          defaultValue: false,
        },
        inputobj: {
          type: 'object',
          title: 'Input Object',
          description: 'Enter the object from previous control here',
        },
        outputobj: {
          type: 'object',
          title: 'Object Output',
          description: 'this is for output only you do not need to use it',
          isValueField: true,
          properties: {
            budgetItems: {
              type: 'array',
              title: 'Budget Items',
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
                  approval: {
                    type: 'string',
                    title: 'Approval Status',
                    description: 'Approval status of the budget item'
                  },
                  comments: {
                    type: 'string',
                    title: 'Comments',
                    description: 'Additional comments or notes'
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
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .badge {
        margin: 0 0.25rem;
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

  constructor() {
    super();
    this.listitems = '';
    this.itemname = '';
    this.reviewmode = false;
    this.inputobj = {};
    this.outputobj = {};
    this.itemValues = {};
    this.statusColors = {};
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  updated(changedProperties) {
    if (changedProperties.has('listitems') || changedProperties.has('inputobj')) {
      this.syncDataWithInput();
    }
  }

  syncDataWithInput() {
    const items = this.listitems.split(',').map(item => item.trim());
  
    items.forEach(itemName => {
      const existingItem = this.inputobj.budgetItems?.find(budgetItem => budgetItem.itemName === itemName);
      if (existingItem) {
        this.itemValues[itemName] = {
          ...this.initializeMonthlyValues(),
          ...existingItem.monthlyValues,
          approval: existingItem.approval,
          comments: existingItem.comments,
        };
      } else {
        this.itemValues[itemName] = this.initializeMonthlyValues();
      }
    });
  
    // Remove items that are no longer in listitems
    Object.keys(this.itemValues).forEach(itemName => {
      if (!items.includes(itemName)) {
        delete this.itemValues[itemName];
      }
    });
  
    this.requestUpdate();
  }
  
  initializeMonthlyValues() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.reduce((acc, month) => {
      acc[month] = null;
      return acc;
    }, {});
  }

  createHeader(item) {
    const approvalStatus = this.itemValues[item]?.approval;
    const statusBadge = approvalStatus ? 
      html`<div class="badge fs-6 rounded-pill ${approvalStatus === 'Approved' ? 'bg-success' : 'bg-danger'}">${approvalStatus}</div>` : 
      '';
  
    return html`
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <div class="badge fs-6 bg-dark">${this.itemname ? this.itemname : 'Item'}: ${item}</div>
        </div>
        <div>
          ${statusBadge}
          <div class="badge fs-6 rounded-pill bg-primary">Total: $${this.calculateTotalForItem(item)}</div>
        </div>
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
    const statusInfo = this.statusColors[item] || { selectedStatus: '' };
    const outcomes = ['Rejected', 'Approved'];
    const showInput = statusInfo.selectedStatus === 'Rejected';
    const comments = this.itemValues[item]?.comments || '';
  
    if (this.reviewmode) {
      return html`
        <div class="card-footer">
          <div class="btn-group" role="group" aria-label="Approval Status">
            ${outcomes.map(outcome => html`
              <button type="button"
                      class="${this.getButtonClass(outcome, statusInfo.selectedStatus)}"
                      @click="${() => this.handleApprovalStatusChange(item, outcome)}">${outcome}</button>
            `)}
          </div>
          ${showInput ? html`
            <textarea class="form-control comments-control active"
                      placeholder="Enter comments"
                      @input="${e => this.handleCommentsChange(item, e.target.value)}"
                      @input="${this.autoResize}"
                      style="height: auto; min-height: 38px;"></textarea>
          ` : ''}
        </div>
      `;
    } else if (!this.reviewmode && this.readOnly && comments) {
      return html`
        <div class="card-footer">
          <textarea class="form-control comments-control active"
                    ?disabled="${this.readOnly}"
                    style="height: auto; min-height: 38px;">${comments}</textarea>
        </div>
      `;
    } else {
      return '';
    }
  }
  
  autoResize(e) {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }
  
  getButtonClass(outcome, selectedStatus) {
    const baseClass = 'btn';
    if (selectedStatus === outcome) {
      return outcome === 'Approved' ? `${baseClass} btn-success` : `${baseClass} btn-danger`;
    }
    return outcome === 'Approved' ? `${baseClass} btn-outline-success` : `${baseClass} btn-outline-danger`;
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
              .value="${itemMonthlyValues[fullMonths[index]] !== null ? this.formatNumber(itemMonthlyValues[fullMonths[index]]) : ''}"
              @blur="${e => this.handleValueChange(item, fullMonths[index], parseFloat(e.target.value.replace(/[^\d.-]/g, '')) || null)}">
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
    this.updateOutputObject();
    this.requestUpdate();
  }

  handleApprovalStatusChange(item, value) {
    const colorMap = {
      'Approved': 'border-success',
      'Rejected': 'border-danger'
    };
    this.statusColors[item] = {
      borderColor: colorMap[value] || 'border-primary',
      selectedStatus: value
    };
  
    if (!this.itemValues[item]) {
      this.itemValues[item] = this.initializeMonthlyValues();
    }
    this.itemValues[item].approval = value;
    this.itemValues[item].lastUpdated = new Date().toISOString();
  
    this.updateOutputObject();
    this.requestUpdate();
  }
  
  handleCommentsChange(item, value) {
    if (!this.itemValues[item]) {
      this.itemValues[item] = this.initializeMonthlyValues();
    }
    this.itemValues[item].comments = value;
    this.itemValues[item].lastUpdated = new Date().toISOString();
  
    this.updateOutputObject();
    this.requestUpdate();
  }

  updateOutputObject() {
    this.outputobj = {
      budgetItems: Object.keys(this.itemValues).map(item => ({
        itemName: item,
        monthlyValues: this.itemValues[item],
        total: this.calculateTotalForItem(item),
        approval: this.itemValues[item].approval || '',
        comments: this.itemValues[item].comments || '',
        lastUpdated: new Date().toISOString()
      }))
    };
  
    const event = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.outputobj
    });
    this.dispatchEvent(event);
  }

  getButtonClass(outcome, selectedStatus) {
    const baseClass = 'btn';
    if (selectedStatus === outcome) {
      return outcome === 'Approved' ? `${baseClass} btn-success` : `${baseClass} btn-danger`;
    }
    return outcome === 'Approved' ? `${baseClass} btn-outline-success` : `${baseClass} btn-outline-danger`;
  }
  
  calculateTotalForItem(item) {
    if (!this.itemValues[item]) {
      return this.formatNumber(0);
    }
    const total = Object.values(this.itemValues[item])
      .filter(val => val !== null && typeof val === 'number')
      .reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
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
