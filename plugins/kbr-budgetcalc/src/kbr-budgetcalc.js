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
        border: 1px solid transparent; /* Initial border color */
        transition: border-color 0.3s ease; /* Smooth transition for border color */
      }
      .currency-input {
        text-align: right;
      }
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between; /* Maintain space between on large screens */
        transition: all 0.3s ease; /* Transition for footer layout changes */
      }
      .btn-group {
        width: 100%; /* Takes full width initially */
        transition: width 0.3s ease; /* Smooth transitions for width adjustments */
      }
      .comments-control {
        transition: max-height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease, width 0.3s ease;
        max-height: 0; /* Start with max-height at 0 to hide when not needed */
        opacity: 0; /* Start with an invisible input */
        visibility: hidden; /* Hide input initially */
        overflow: hidden; /* Prevent showing any overflow content */
        padding: 0;
        width: 0; /* Start with no width */
      }
      .comments-control.active {
        max-height: 200px; /* Large enough to accommodate expanded input */
        opacity: 1;
        visibility: visible; /* Make input visible */
        padding: .375rem .75rem; /* Standard padding for form control */
        width: 50%; /* Width of input when active on large screens */
      }
      @media (max-width: 992px) { /* Adjustments for smaller devices */
        .card-footer {
          flex-direction: column; /* Stack elements vertically */
        }
        .btn-group, .comments-control {
          width: 100%; /* Full width for small screens */
          justify-content: center; /* Center align the content */
        }
        .comments-control.active {
          margin-top: 10px; /* Additional top margin for better spacing */
        }
      }
      @media (min-width: 993px) { /* Adjustments for larger devices */
        .btn-group {
          width: 100%; /* Button group takes full width until active */
        }
        .comments-control.active {
          margin-left: .75rem; /* Margin left for spacing */
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
            <input type="text" class="form-control currency-input" id="${shortMonth}-${item}" aria-label="Amount for ${fullMonths[index]}" @blur="${this.formatCurrency}">
            <span class="input-group-text">.00</span>
          </div>
        </div>
      `)}
    `;
  }

  createFooter(item) {
    const statusInfo = this.statusColors[item] || {};
    const showInput = ['Not Approved', 'Review Required'].includes(statusInfo.selectedStatus);
    return html`
      <div class="card-footer">
        <div class="btn-group" role="group" aria-label="Approval Status">
          <button type="button"
                  class="${statusInfo.selectedStatus === 'Not Approved' ? 'btn btn-danger' : 'btn btn-outline-danger'}"
                  @click="${() => this.updateStatus(item, 'Not Approved')}">Not Approved</button>
          <button type="button"
                  class="${statusInfo.selectedStatus === 'Review Required' ? 'btn btn-warning' : 'btn btn-outline-warning'}"
                  @click="${() => this.updateStatus(item, 'Review Required')}">Review Required</button>
          <button type="button"
                  class="${statusInfo.selectedStatus === 'Approved' ? 'btn btn-success' : 'btn btn-outline-success'}"
                  @click="${() => this.updateStatus(item, 'Approved')}">Approved</button>
        </div>
        <input type="text" class="form-control comments-control ${showInput ? 'active' : ''}" placeholder="Enter comments">
      </div>
    `;
  }
  
  updateStatus(item, status) {
    const colorMap = {
      'Not Approved': 'border-danger',
      'Review Required': 'border-warning',
      'Approved': 'border-success'
    };
    // Store both the border color and the selected status
    this.statusColors[item] = {
      borderColor: colorMap[status],
      selectedStatus: status
    };
    this.requestUpdate();
  }

  render() {
    const items = this.listitems.split(',');

    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${items.map(item => html`
          <div class="card ${this.statusColors[item]?.borderColor || ''}">
            <div class="card-header ${this.statusColors[item]?.borderColor || ''}">
              Item: ${item}
            </div>
            <div class="card-body d-flex flex-wrap">
              ${this.createMonthInputs(item)}
            </div>
            ${this.createFooter(item)}
          </div>
        `)}
      </div>
    `;
  }

}

customElements.define('kbr-budgetcalc', BudgetCalcElement);
