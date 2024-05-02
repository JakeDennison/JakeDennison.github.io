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
        border: 1px solid #ccc;
        border-radius: 8px;
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
        Listitems: {
          title: 'List Items',
          type: 'object',
          description: 'List of items to be budgeted',
          itemname: {
            name:{
              type: 'string',
              description: 'Item name',
              title: 'Name',
            }
          },
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
    this.listitems = '[]';
  }

  render() {
    // Convert the listitems JSON string to an array
    const items = JSON.parse(this.listitems);
    
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        <h2>Budget Calculator</h2>
        <p>Mode: ${this.mode}</p>
        <table class="table">
          <thead>
            <tr>
              <th>Item</th>
              ${Array.from({ length: 12 }, (_, i) => html`<th>${i + 1}</th>`)}
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => html`
              <tr>
                <td>${item}</td>
                ${Array.from({ length: 12 }, () => html`
                  <td>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                      </div>
                      <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                    </div>
                  </td>
                `)}
                <td><input type="checkbox"></td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('kbr-budgetcalc', BudgetCalcElement);