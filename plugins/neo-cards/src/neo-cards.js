import { LitElement, html, css } from 'lit';

class NeoCardsElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-cards',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: 'group-control',
      groupName: 'neo',
      version: '1.0',
      properties: {
        inputobject: {
          type: 'object',
          title: 'Data Object',
          description: 'Insert the data object you want to build the cards from'
        },
        outputobject: {
          type: 'object',
          title: 'Output Object',
          description: 'Do not use',
          isValueField: true
        },
        imgurl: {
          type: 'string',
          title: 'Image URL Tag',
          description: 'Insert the header text including any key references'
        },
        header: {
          type: 'string',
          title: 'Card Header Content',
          description: 'Insert the header text including any key tags'
        },
        body: {
          type: 'string',
          title: 'Card Body Content',
          description: 'Insert the body of the text including any key tags',
          format: 'rich-text'
        },
        btnLabel: {
          type: 'string',
          title: 'Button Label',
          defaultValue: 'Click here',
          description: 'Name the button'
        },
        btnURL: {
          type: 'string',
          title: 'Button URL',
          description: 'URL tag for the button'
        },
        footer: {
          type: 'string',
          title: 'Card Footer Content',
          description: 'Insert the content for the card footer including any key tags'
        },
        style: {
          type: 'string',
          title: 'Card Background Style',
          description: 'Apply a custom card background style using the bootstrap 5 card styles, e.g. bg-secondary'
        },
        borderstyle: {
          type: 'string',
          title: 'Card Border Style',
          description: 'Apply a custom card border style using the bootstrap 5 card styles, e.g. bg-success'
        },
        cardLayout: {
          type: 'string',
          title: 'Choice field',
          enum: ['Grid', 'Group'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Grid',
        },
        cardRow: {
          type: 'integer',
          title: 'Number of cards per row',
          description: 'From 1 - 6',
          minimum: 1,
          maximum: 6,
          defaultValue: 1,
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get properties() {
    return {
      inputobject: { type: Object },
      imgurl: { type: String },
      header: { type: String },
      body: { type: String },
      btnLabel: { type: String },
      btnURL: { type: String },
      footer: { type: String },
      style: { type: String },
      borderstyle: { type: String },
      cardLayout: { type: String },
      cardRow: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .card-group {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
      .card {
        flex: 1 1 calc(100% / var(--cards-per-row) - 16px);
        max-width: calc(100% / var(--cards-per-row) - 16px);
      }
      .debug-section {
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 20px;
        white-space: pre-wrap;
      }
    `;
  }

  constructor() {
    super();
    this.inputobject = {};
    this.imgurl = '';
    this.header = '';
    this.body = '';
    this.btnLabel = 'Click here';
    this.btnURL = '';
    this.footer = '';
    this.style = '';
    this.borderstyle = '';
    this.cardLayout = 'Grid';
    this.cardRow = 1;
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="${this.cardLayout === 'Grid' ? 'card-grid' : 'card-group'}" style="--cards-per-row: ${this.cardRow}">
        ${this.inputobject.map(item => html`
          <div class="card ${this.style} ${this.borderstyle}">
            <img src="${this.interpolateTemplate(this.imgurl, item)}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${this.interpolateTemplate(this.header, item)}</h5>
              <p class="card-text">${this.interpolateTemplate(this.body, item)}</p>
              <a href="${this.interpolateTemplate(this.btnURL, item)}" class="btn btn-primary">${this.btnLabel}</a>
            </div>
            <div class="card-footer">
              <small class="text-muted">${this.interpolateTemplate(this.footer, item)}</small>
            </div>
          </div>
        `)}
      </div>
      <div class="debug-section">
        <h4>JSON Input:</h4>
        <pre>${JSON.stringify(this.inputobject, null, 2)}</pre>
      </div>
    `;
  }  

  interpolateTemplate(template, data) {
    // Regular expression to find all occurrences of `${...}`
    const regex = /\${(.*?)}/g;
    // Replace each placeholder with its corresponding value from data
    return template.replace(regex, (match, expression) => {
      // Trim whitespace from expression to handle cases like `${$.Title}`
      const key = expression.trim();
      // Check if the key starts with `$` for variable like `$.Title`
      if (key.startsWith('$.')) {
        // Evaluate the expression after the `$.` to get the nested property value
        const nestedKeys = key.substring(2).split('.');
        let value = data;
        for (const nestedKey of nestedKeys) {
          if (value.hasOwnProperty(nestedKey)) {
            value = value[nestedKey];
          } else {
            return match; // return the original placeholder if key is not found
          }
        }
        return value;
      } else {
        // If no `$` prefix, treat it directly as a property key in the current data item
        return data.hasOwnProperty(key) ? data[key] : match;
      }
    });
  }
  
  
}

customElements.define('neo-cards', NeoCardsElement);
