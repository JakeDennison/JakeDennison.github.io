import { LitElement, html, css } from 'lit';

class BudgetCalcElement extends LitElement {
  static get properties() {
    return {
      listitems: { type: String },
      itemname: { type: String },
      currentuser: { type: String },
      review: { type: Boolean },
      inputjson: { type: String },
      dataobj: { type: Object }
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
        review: {
          title: 'Enable Review Mode',
          type: 'boolean',
          defaultValue: false,
        },
        inputjson: {
          type: 'string',
          title: 'Input JSON',
          description: 'Enter the JSON from previous object here as a string',
        },
        dataobj: {
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
                  outcome: {
                    type: 'string',
                    title: 'Outcome',
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
    this.currentuser = '';
    this.review = false;
    this.inputjson = '';
    this.dataobj = { budgetItems: [] };
  }

  updated(changedProperties) {
    if (changedProperties.has('listitems') || changedProperties.has('inputjson')) {
      this.syncDataWithInput();
    }
  }

  syncDataWithInput() {
    const items = this.listitems.split(',').map(item => item.trim());
  
    if (this.inputjson && this.inputjson.trim() !== '') {
      const parsedJson = JSON.parse(this.inputjson);
  
      if (parsedJson.budgetItems) {
        this.dataobj = {
          budgetItems: parsedJson.budgetItems.filter(item => items.includes(item.itemName))
        };
  
        items.forEach(itemName => {
          if (!this.dataobj.budgetItems.some(item => item.itemName === itemName)) {
            this.dataobj.budgetItems.push({
              itemName: itemName,
              monthlyValues: this.initializeMonthlyValues(),
              total: 0,
              outcome: "",
              notes: "",
              approver: "",
              lastUpdated: ""
            });
          }
        });
      }
    } else {
      this.dataobj = {
        budgetItems: items.map(itemName => ({
          itemName: itemName,
          monthlyValues: this.initializeMonthlyValues(),
          total: 0,
          outcome: "",
          notes: "",
          approver: "",
          lastUpdated: ""
        }))
      };
    }
  }

  initializeMonthlyValues() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.reduce((acc, month) => {
      acc[month] = 0.00;
      return acc;
    }, {});
  }

  updateDataObj() {
    this.dataobj.lastUpdated = new Date().toISOString();
    const event = new CustomEvent('ntx-value-change', {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: this.dataobj
    });
    this.dispatchEvent(event);
  }

  handleValueChange(itemName, month, value) {
    const item = this.dataobj.budgetItems.find(item => item.itemName === itemName);
    if (item) {
      item.monthlyValues[month] = value;
      item.total = Object.values(item.monthlyValues).reduce((acc, val) => acc + val, 0);
      item.lastUpdated = new Date().toISOString();
      this.updateDataObj();
    }
  }

  handleApprovalStatusChange(itemName, status) {
    const item = this.dataobj.budgetItems.find(item => item.itemName === itemName);
    if (item) {
      item.outcome = status;
      item.lastUpdated = new Date().toISOString();
      this.updateDataObj();
    }
  }

  handleCommentsChange(itemName, comments) {
    const item = this.dataobj.budgetItems.find(item => item.itemName === itemName);
    if (item) {
      item.notes = comments;
      item.lastUpdated = new Date().toISOString();
      this.updateDataObj();
    }
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
    if (this.review) {
      return html`
        <div class="card-footer">
          <select @change="${() => this.handleApprovalStatusChange(item, event.target.value)}">
            <option value="">Select Approval Status</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <textarea @input="${() => this.handleCommentsChange(item, event.target.value)}"></textarea>
        </div>
      `;
    } else {
      return html``;
    }
  }

  render() {
    const items = this.listitems.split(',').map(item => item.trim());
  
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${items.map(item => {
          const currentItem = this.dataobj && this.dataobj.budgetItems ? this.dataobj.budgetItems.find(i => i.itemName === item) : null;
          return currentItem ? html`
            <div class="card">
              ${this.createHeader(item)}
              ${this.createBody(item)}
              ${this.createFooter(item)}
            </div>
          ` : '';
        })}
      </div>
    `;
  }
  
}


customElements.define('kbr-budgetcalc', BudgetCalcElement);