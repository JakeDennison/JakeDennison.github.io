import { LitElement, html, css } from 'lit';

class BudgetCalcElement extends LitElement {

  static get properties() {
    return {
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
    this.dataobj = {};
  }

  render() {
    const items = this.dataobj && this.dataobj.budgetItems ? this.dataobj.budgetItems : [];

    return html`
      <table border="1">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Total</th>
            <th>Outcome</th>
            <th>Notes</th>
            <th>Approver Email</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => html`
            <tr>
              <td>${item.itemName}</td>
              <td>${item.total}</td>
              <td>${item.outcome}</td>
              <td>${item.notes}</td>
              <td>${item.approver}</td>
              <td>${item.lastUpdated}</td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
  
}

customElements.define('kbr-budgetcalc', BudgetCalcElement);