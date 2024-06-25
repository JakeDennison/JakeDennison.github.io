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
        imgwidth: {
          type: 'string',
          title: 'Image width',
          description: 'When the images are being stretched too far, apply an image max width'
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
          enum: ['Grid', 'Vertical Group', 'Horizontal Group'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Grid',
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
      imgwidth: { type: String },
      header: { type: String },
      body: { type: String },
      btnLabel: { type: String },
      btnURL: { type: String },
      footer: { type: String },
      style: { type: String },
      borderstyle: { type: String },
      cardLayout: { type: String }
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
      }
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
      .card-vertical-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .card {
        flex: 1 1 calc(100% / 3); /* Adjust to 3 cards per row in grid layout */
        position: relative;
        overflow: hidden;
        background-color: #f8f9fa; /* Default background color for the card */
      }
      .card-img-top-container {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .card-img-top {
        width: 100%;
        height: auto;
        object-fit: cover; /* Maintain aspect ratio */
      }
      .card-img-top.blurred::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        filter: blur(10px);
        z-index: -1;
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
    `;
  }

  constructor() {
    super();
    this.inputobject = [];
    this.imgurl = '';
    this.imgheight = '';
    this.imgwidth = '';
    this.header = '';
    this.body = '';
    this.btnLabel = 'Click here';
    this.btnURL = '';
    this.footer = '';
    this.style = '';
    this.borderstyle = '';
    this.cardLayout = 'Grid';
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="${this.getCardLayoutClass()}">
        ${this.inputobject.map(item => {
          const imageUrlString = this.interpolateTemplate(this.imgurl, item);
          const imageUrl = this.extractImageUrl(imageUrlString);
          const imageDescription = this.extractImageDescription(imageUrlString);
          const imageHeight = this.interpolateTemplate(this.imgheight, item);
          const imageWidth = this.interpolateTemplate(this.imgwidth, item);

          return html`
            <div class="card ${this.style} ${this.borderstyle}">
              ${imageUrl ? html`
                <div class="card-img-top-container ${imageWidth ? 'blurred' : ''}">
                  <img src="${imageUrl}" alt="${imageDescription}" class="card-img-top" style="${imageHeight ? `height: ${imageHeight};` : ''} ${imageWidth ? `max-width: ${imageWidth};` : ''}">
                </div>
              ` : ''}
              <div class="card-body">
                ${this.header ? html`
                  <h5 class="card-title">${this.interpolateTemplate(this.header, item)}</h5>
                ` : ''}
                ${this.body ? html`
                  <p class="card-text">${this.interpolateTemplate(this.body, item)}</p>
                ` : ''}
                ${this.btnURL ? html`
                  <a href="${this.interpolateTemplate(this.btnURL, item)}" class="btn btn-primary">${this.btnLabel}</a>
                ` : ''}
              </div>
              ${this.footer ? html`
                <div class="card-footer">
                  <small class="text-muted">${this.interpolateTemplate(this.footer, item)}</small>
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }

  getCardLayoutClass() {
    switch (this.cardLayout) {
      case 'Vertical Group':
        return 'card-vertical-group';
      case 'Horizontal Group':
        return 'card-group';
      case 'Grid':
      default:
        return 'card-grid';
    }
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

  extractImageUrl(imageUrlString) {
    // Split the combined string by `,`
    const parts = imageUrlString.split(',');
    // First part should be the URL, trim and return it if it's a valid URL
    const url = parts[0].trim();
    return this.isValidUrl(url) ? url : '';
  }

  extractImageDescription(imageUrlString) {
    // Split the combined string by `,`
    const parts = imageUrlString.split(',');
    // Second part (if exists) is the description, trim and return it, or empty string if not found
    return parts.length > 1 ? parts[1].trim() : '';
  }

  isValidUrl(url) {
    // Simple check for URL format
    return /^https?:\/\//.test(url);
  }
}

customElements.define('neo-cards', NeoCardsElement);
