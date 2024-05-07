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
      }
      .card {
        margin-bottom: 20px; /* Space between cards */
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
        flex-grow: 1; /* Allows the button group to use available space */
        transition: all 0.3s ease; /* Smooth transitions for button group adjustments */
        flex: 0 0 100%;
        max-width: 100%;
      }
      .comments-control {
        transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease, width 0.3s ease, margin 0.3s ease;
        max-height: 0; /* Ensures it collapses vertically */
        width: 0; /* Ensures it takes no horizontal space */
        opacity: 0; /* Fully invisible */
        visibility: hidden; /* Not visually perceivable */
        overflow: hidden; /* No content spills */
        padding: 0; /* No internal spacing */
        margin: 0; /* Ensures no external spacing */
        display: none;
      }

      .comments-control.active {
        max-height: 200px; /* Adjust as needed */
        opacity: 1;
        visibility: visible;
        width: 100%; /* Full width on active */
        padding: .375rem .75rem; /* Standard padding */
        margin-top: 0.5rem; /* Some top margin if needed */
        display: flex;
      }
      .btn-group {
          flex: 0 0 100%;
          max-width: 100%;
        }
        .comments-control.active {
          flex: 0 0 100%;
          max-width: 100%;
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
        itemname: {
            type: 'string',
            title: 'Item Name',
            description: 'Singular Item Name such as Cost Center or Budget Code'
        },
        mode: {
          title: 'Control Mode',
          type: 'string',
          enum: ['New', 'Review', 'Read-only'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'New',
        },
        outcomes:  {
          type: 'string',
          title: 'Custom outcomes',
          description: 'Enter comma separated values here will replace default outcomes of Approved and Rejected'
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
    this.itemname = '';
    this.numberFormatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    this.statusColors = {};
    this.itemValues = {};
    this.outcomes = '';
  }

  updated(changedProperties) {
    if (changedProperties.has('listitems')) {
      console.log('listitems changed:', this.listitems);
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
    // Add a method to recalculate totals here
    this.calculateTotalForItem(item);
  }

  formatNumber(value) {
    const numberFormatter = new Intl.NumberFormat('en-US', {
      style: 'decimal', // Change to 'currency' if you need currency symbol
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return numberFormatter.format(value);
  }
  
  calculateTotalForItem(item) {
    if (!this.itemValues[item]) {
      return this.formatNumber(0); // Format zero if no values have been entered yet
    }
    const total = this.itemValues[item].reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    return this.formatNumber(total); // Return the formatted total
  }
  
  updateValue(event, item, monthIndex) {
    const value = parseFloat(event.target.value.replace(/[^\d.-]/g, ''));
    if (!isNaN(value)) {
      event.target.value = this.numberFormatter.format(value);
      this.itemValues[item] = this.itemValues[item] || [];
      this.itemValues[item][monthIndex] = value; // Update the specific month's value
      this.requestUpdate(); // Trigger update to recalculate totals and update the view
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
            <input type="text" class="form-control currency-input" id="${shortMonth}-${item}"
              aria-label="Amount for ${fullMonths[index]}"
              @blur="${e => this.updateValue(e, item, index)}"
              @input="${e => this.updateValue(e, item, index)}">
          </div>
        </div>
      `)}
    `;
  }

  autoResize(e) {
    if (e.target.classList.contains('active')) {
      e.target.style.height = 'auto'; // Reset the height
      e.target.style.height = `${e.target.scrollHeight}px`; // Set to scroll height
    } else {
      e.target.style.height = '0'; // Collapse when not active
    }
  }
  
  createFooter(item) {
    const statusInfo = this.statusColors[item] || {};
    const defaultOutcomes = ['Rejected', 'Approved']; // Reorder as needed
    const customOutcomes = this.outcomes.split(',').map(outcome => outcome.trim()).filter(Boolean);

    const outcomes = customOutcomes.length > 0 ? customOutcomes : defaultOutcomes;
    const showInput = outcomes.includes('Rejected') && statusInfo.selectedStatus === 'Rejected';

    return html`
      <div class="card-footer">
        <div class="btn-group" role="group" aria-label="Approval Status">
          ${outcomes.map(outcome => html`
            <button type="button"
                    class="${this.getButtonClass(outcome, statusInfo.selectedStatus)}"
                    @click="${() => this.updateStatus(item, outcome)}">${outcome}</button>
          `)}
        </div>
        <textarea class="form-control comments-control ${showInput ? 'active' : ''}"
                  placeholder="Enter comments"
                  @input="${this.autoResize}"
                  style="height: auto; min-height: 38px;"></textarea>
      </div>
    `;
  } 

  updateStatus(item, status) {
    // Mapping outcomes to CSS classes if needed
    const colorMap = {
        'Approved': 'border-success',
        'Rejected': 'border-danger'
    };
    this.statusColors[item] = {
        borderColor: colorMap[status] || 'border-secondary', // Default to 'border-secondary' if no specific mapping
        selectedStatus: status
    };
    this.requestUpdate();
  }

  getButtonClass(outcome, selectedStatus) {
    if (outcome === 'Approved' && selectedStatus === 'Approved') {
        return 'btn btn-success'; // Green for approved
    } else if (outcome === 'Rejected' && selectedStatus === 'Rejected') {
        return 'btn btn-danger'; // Red for rejected
    } else if (outcome === 'Approved') {
        return 'btn btn-outline-success'; // Outline when not selected
    } else if (outcome === 'Rejected') {
        return 'btn btn-outline-danger'; // Outline when not selected
    }
    return 'btn btn-outline-secondary'; // Default for other custom statuses
  }

  render() {
    const items = this.listitems.split(',');
  
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${items.map(item => html`
          <div class="card ${this.statusColors[item]?.borderColor || ''}">
            ${this.createHeader(item)}
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
