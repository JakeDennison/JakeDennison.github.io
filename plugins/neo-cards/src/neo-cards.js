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
        imgheight: {
          type: 'string',
          title: 'Image height',
          description: 'Apply an image height value, e.g. 150px'
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
          title: 'Card Layout',
          enum: ['Grid', 'Horizontal Group', 'Vertical Group'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Grid',
        },
        cardStyle: {
          type: 'string',
          title: 'Card Custom Styles',
          description: 'Apply custom styles to the cards',
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
      imgheight: { type: String },
      header: { type: String },
      body: { type: String },
      btnLabel: { type: String },
      btnURL: { type: String },
      footer: { type: String },
      style: { type: String },
      borderstyle: { type: String },
      cardLayout: { type: String },
      cardStyle: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      .horizontal-group {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .horizontal-group .card {
        flex: 1 1 calc(50% - 8px);
        max-width: calc(50% - 8px);
      }
      .vertical-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .vertical-group .card {
        width: 100%;
      }
      .card {
        position: relative;
        overflow: hidden;
        background-color: #f8f9fa; /* Default background color for the card */
        margin-bottom: 16px; /* Add margin to bottom of each card */
      }
      .card-img-top {
        width: 100%;
        height: auto;
        object-fit: cover; /* Maintain aspect ratio */
      }
      .card-body {
        padding: 1rem;
      }
      .card-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .card-text {
        font-size: 1rem;
        color: #6c757d;
      }
      .btn {
        text-decoration: none;
      }
      .card-footer {
        padding: 0.75rem 1rem;
        background-color: #f8f9fa;
        border-top: 1px solid #dee2e6;
      }
      .text-muted {
        color: #6c757d;
      }
      .debug-section {
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 20px;
        white-space: pre-wrap;
      }
      /* Custom card styles */
    `;
  }

  constructor() {
    super();
    this.inputobject = [];
    this.imgurl = '';
    this.imgheight = '';
    this.header = '';
    this.body = '';
    this.btnLabel = 'Click here';
    this.btnURL = '';
    this.footer = '';
    this.style = '';
    this.borderstyle = '';
    this.cardLayout = 'Grid';
    this.cardStyle = '';
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="${this.getCardLayoutClass()}">
        ${this.inputobject.map(item => html`
          <div class="card ${this.style} ${this.borderstyle}">
            ${this.imgurl && this.renderImage(item)}
            <div class="card-body">
              <h5 class="card-title">${this.interpolateTemplate(this.header, item)}</h5>
              <p class="card-text">${this.interpolateTemplate(this.body, item)}</p>
              <a href="${this.interpolateTemplate(this.btnURL, item)}" class="btn btn-primary">${this.btnLabel}</a>
            </div>
            ${this.footer && html`
              <div class="card-footer">
                <small class="text-muted">${this.interpolateTemplate(this.footer, item)}</small>
              </div>
            `}
          </div>
        `)}
      </div>
      <div class="debug-section">
        <h4>JSON Input:</h4>
        <pre>${JSON.stringify(this.inputobject, null, 2)}</pre>
      </div>
    `;
  }

  getCardLayoutClass() {
    switch (this.cardLayout) {
      case 'Horizontal Group':
        return 'horizontal-group';
      case 'Vertical Group':
        return 'vertical-group';
      case 'Grid':
      default:
        return 'card-grid';
    }
  }

  renderImage(item) {
    const imageUrl = this.interpolateTemplate(this.imgurl, item);
    const imageDescription = this.getImageDescription(imageUrl);
    const imageStyle = this.imgheight ? `height: ${this.imgheight}; object-fit: cover;` : '';

    return html`
      <img src="${imageUrl}" class="card-img-top" alt="${imageDescription}" style="${imageStyle}">
    `;
  }

  getImageDescription(imageUrl) {
    const parts = imageUrl.split(',');
    if (parts.length > 1) {
      return parts[1].trim();
    }
    return '';
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
