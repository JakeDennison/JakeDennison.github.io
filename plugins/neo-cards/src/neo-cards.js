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
        jsonInput: {
          type: 'string',
          title: 'JSON Input',
          description: 'Input JSON data to build the cards',
          format: 'textarea'
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
      jsonInput: { type: String },
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
      textarea {
        width: 100%;
        min-height: 100px;
        margin-bottom: 10px;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
    `;
  }

  constructor() {
    super();
    this.jsonInput = '';
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
      <textarea 
        placeholder="Enter JSON data here..."
        .value="${this.jsonInput}"
        @input="${this.handleJsonInputChange}"
      ></textarea>
      <div class="${this.cardLayout === 'Grid' ? 'card-grid' : 'card-group'}" style="--cards-per-row: ${this.cardRow}">
        ${this.parseJsonData().map(item => html`
          <div class="card ${this.style} ${this.borderstyle}">
            <img src="${item[this.imgurl]}" class="card-img-top" alt="...">
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
    `;
  }

  handleJsonInputChange(event) {
    this.jsonInput = event.target.value;
  }

  parseJsonData() {
    try {
      return JSON.parse(this.jsonInput) || [];
    } catch (error) {
      console.error('Error parsing JSON input:', error);
      return [];
    }
  }

  interpolateTemplate(template, data) {
    // Regular expression to find all occurrences of `${...}`
    const regex = /\${(.*?)}/g;
    // Replace each placeholder with its corresponding value from data
    return template.replace(regex, (match, expression) => {
      // Split expression by dot to handle nested properties
      const keys = expression.split('.');
      let value = data;

      // Traverse each key and resolve value from data
      for (const key of keys) {
        if (Array.isArray(value)) {
          // If value is an array, map over it and interpolate each item
          value = value.map(item => this.resolveKey(item, key)).join(', ');
        } else {
          // Otherwise, access property from object
          value = this.resolveKey(value, key);
        }
      }

      return value;
    });
  }

  // Function to resolve key in object or array
  resolveKey(obj, key) {
    if (Array.isArray(obj)) {
      // If object is an array, map over it to resolve each item's key
      return obj.map(item => this.resolveKey(item, key)).join(', ');
    } else if (obj && typeof obj === 'object') {
      // If object is an object, access key directly
      return obj[key];
    } else {
      return undefined; // Return undefined if key cannot be resolved
    }
  }
}

customElements.define('neo-cards', NeoCardsElement);
