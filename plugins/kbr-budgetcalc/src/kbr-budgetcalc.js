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
    this.listitems = '';
    this.itemname = '';
    this.review = false;
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.statusColors = {};
    this.itemValues = {};
    console.log('Constructor dataobj:', this.dataobj);
}

  firstUpdated() {
    console.log('First updated dataobj:', this.dataobj);
    this.syncDataObjWithListItems();
  }
  
  updated(changedProperties) {
    if (changedProperties.has('listitems') || changedProperties.has('dataobj')) {
      this.syncDataObjWithListItems();
    }
  }

  syncDataObjWithListItems() {
    const listItemsArray = this.listitems.split(',').map(item => item.trim());
  
    // Initialize dataobj if it is not an object
    if (!this.dataobj || typeof this.dataobj !== 'object') {
      this.dataobj = { budgetItems: [] };
    }
  
    // Ensure dataobj.budgetItems is an array
    if (!Array.isArray(this.dataobj.budgetItems)) {
      this.dataobj.budgetItems = [];
    }
  
    // Create a map for easy lookup
    const dataObjMap = new Map(this.dataobj.budgetItems.map(item => [item.itemName, item]));
  
    // Check if dataobj is empty
    if (this.dataobj.budgetItems.length === 0) {
      // Initialize itemValues for each list item
      listItemsArray.forEach(itemName => {
        this.itemValues[itemName] = new Array(12).fill(0);
      });
    } else {
      // Filter and update existing items in dataobj
      const filteredDataObj = listItemsArray.map(itemName => {
        if (dataObjMap.has(itemName)) {
          const existingItem = dataObjMap.get(itemName);
          this.itemValues[itemName] = Object.values(existingItem.monthlyValues);
          return existingItem;
        } else {
          this.itemValues[itemName] = new Array(12).fill(0); // Initialize itemValues if not present in dataobj
          return {
            itemName: itemName,
            monthlyValues: {
              January: 0.00, February: 0.00, March: 0.00, April: 0.00, May: 0.00,
              June: 0.00, July: 0.00, August: 0.00, September: 0.00, October: 0.00,
              November: 0.00, December: 0.00
            },
            total: 0.00,
            outcome: '',
            notes: '',
            approver: '',
            lastUpdated: ''
          };
        }
      });
  
      // Assign the filtered and updated dataobj back
      this.dataobj.budgetItems = filteredDataObj;
    }
  
    console.log('Data object after sync:', this.dataobj);
  }
  
  
  onChange(e) {
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.dataobj,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
  }

  updateItemValuesFromDataObj() {
    if (this.dataobj && Array.isArray(this.dataobj.budgetItems)) {
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
    const value = rawValue === '' ? null : parseFloat(rawValue); // Store null if input is empty
    this.itemValues[item] = this.itemValues[item] || [];
    this.itemValues[item][monthIndex] = value === null ? null : (isNaN(value) ? 0 : value);
    this.updateDataObj(item);
    this.onChange();
    this.requestUpdate();
  }
  
  updateDataObj(item) {
    if (!Array.isArray(this.dataobj.budgetItems)) {
      this.dataobj.budgetItems = [];
    }
  
    const monthlyValues = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ].reduce((acc, month, index) => {
      acc[month] = this.itemValues[item][index] || 0;
      return acc;
    }, {});
  
    const existingItemIndex = this.dataobj.budgetItems.findIndex(budgetItem => budgetItem.itemName === item);
  
    if (existingItemIndex !== -1) {
      this.dataobj.budgetItems[existingItemIndex].monthlyValues = monthlyValues;
      this.dataobj.budgetItems[existingItemIndex].total = Object.values(monthlyValues).reduce((acc, val) => acc + val, 0);
      this.dataobj.budgetItems[existingItemIndex].lastUpdated = new Date().toISOString();
    } else {
      this.dataobj.budgetItems.push({
        itemName: item,
        monthlyValues: monthlyValues,
        total: Object.values(monthlyValues).reduce((acc, val) => acc + val, 0),
        outcome: '',
        notes: '',
        approver: '',
        lastUpdated: new Date().toISOString()
      });
    }
  }
  
  createMonthInputs(item) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Use itemValues instead of dataobj
    const itemMonthlyValues = this.itemValues[item] || new Array(12).fill(0);
  
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
              .value="${this.formatNumber(itemMonthlyValues[index])}"
              @blur="${e => { this.formatInput(e); this.updateValue(e, item, index); }}">
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
  }
  
  updateComments(event, item) {
    const existingItem = this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item);
    if (existingItem) {
      existingItem.notes = event.target.value;
      existingItem.lastUpdated = new Date().toISOString();
    }
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
    console.log('Render dataobj:', this.dataobj);
  
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${items.map(item => {
          const budgetItem = this.dataobj && Array.isArray(this.dataobj.budgetItems)
            ? this.dataobj.budgetItems.find(budgetItem => budgetItem.itemName === item) || {}
            : {};
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