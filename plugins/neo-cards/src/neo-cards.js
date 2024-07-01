import { LitElement, html, css } from 'lit';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          title: 'Choice field',
          enum: ['Grid', 'Vertical Group', 'Horizontal Group'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Grid',
        },
        filterTags: {
          type: 'string',
          title: 'Filter Field Tags',
          description: 'Comma-separated list of fields to use for filtering'
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
      filterTags: { type: String },
      selectedFilters: { type: Object }
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
      .card-img-top {
        width: 100%;
        height: auto;
        object-fit: cover; /* Maintain aspect ratio */
      }
      .vertical-group .card {
        display: flex;
        flex-direction: row;
      }
      .vertical-group .card-img-top {
        width: 25%;
        height: 100%;
        object-fit: cover;
        border-top-right-radius: 0;
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
      .filter-bar {
        margin-bottom: 16px;
      }
      .filter-dropdown {
        margin-right: 8px;
      }
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
    this.filterTags = '';
    this.selectedFilters = {};
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/css/BsMultiSelect.min.css">
      <script src="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/js/BsMultiSelect.min.js"></script>
      <script type="module" src="https://cdn.jsdelivr.net/npm/@dashboardcode/bsmultiselect@1.1.18/dist/js/BsMultiSelect.esm.min.js"></script>
      
      <div class="filter-bar">
        ${this.renderFilterDropdowns()}
      </div>
      
      <div class="${this.getCardLayoutClass()}">
        ${this.filteredItems().map(item => {
          const imageUrlString = this.interpolateTemplate(this.imgurl, item);
          const imageUrl = this.extractImageUrl(imageUrlString);
          const imageDescription = this.extractImageDescription(imageUrlString);
          const imageHeight = this.interpolateTemplate(this.imgheight, item);
  
          return html`
            <div class="card ${this.style} ${this.borderstyle}">
              ${imageUrl ? html`
                <img src="${imageUrl}" alt="${imageDescription}" class="card-img-top" style="${imageHeight ? `height: ${imageHeight};` : ''}">
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
  

  renderFilterDropdowns() {
    if (!this.filterTags) return;
  
    const tags = this.filterTags.split(',').map(tag => tag.trim());
    const uniqueValues = this.getUniqueValuesForTags(tags);
  
    // Ensure unique IDs for each dropdown
    const dropdowns = tags.map((tag, index) => {
      const dropdownId = `filter-dropdown-${index}`;
  
      // Use BsMultiSelect initialization for each dropdown
      setTimeout(() => {
        const dropdown = new BsMultiSelect(document.getElementById(dropdownId), {
          dataSource: uniqueValues[tag].map(value => ({ text: value, value })),
          onChange: value => this.handleFilterChange({ target: { selectedOptions: value } }, tag),
          showSelected: true,
          getSelected: () => this.selectedFilters[tag] || [],
        });
        dropdown.init();
      });
  
      return html`
        <select id="${dropdownId}" multiple style="display: none;"></select>
      `;
    });
  
    return html`${dropdowns}`;
  }
  

  handleFilterChange(event, tag) {
    const selectedOptions = event.target.selectedOptions;
    const selectedValues = Array.from(selectedOptions).map(option => option.value);
    this.selectedFilters = { ...this.selectedFilters, [tag]: selectedValues };
    this.requestUpdate();
  }
  

  getUniqueValuesForTags(tags) {
    const uniqueValues = {};
    tags.forEach(tag => {
      uniqueValues[tag] = [...new Set(this.inputobject.map(item => item[tag]))];
    });
    return uniqueValues;
  }

  filteredItems() {
    if (!Object.keys(this.selectedFilters).length) return this.inputobject;

    return this.inputobject.filter(item => {
      return Object.keys(this.selectedFilters).every(tag => {
        if (!this.selectedFilters[tag].length) return true;
        return this.selectedFilters[tag].includes(item[tag]);
      });
    });
  }

  getCardLayoutClass() {
    switch (this.cardLayout) {
      case 'Vertical Group':
        return 'card-vertical-group vertical-group';
      case 'Horizontal Group':
        return 'card-group';
      case 'Grid':
      default:
        return 'card-grid';
    }
  }

  interpolateTemplate(template, data) {
    const regex = /\${(.*?)}/g;
    return template.replace(regex, (match, expression) => {
      const key = expression.trim();
      if (key.startsWith('$.')) {
        const nestedKeys = key.substring(2).split('.');
        let value = data;
        for (const nestedKey of nestedKeys) {
          if (value.hasOwnProperty(nestedKey)) {
            value = value[nestedKey];
          } else {
            return match;
          }
        }
        return value;
      } else {
        return data.hasOwnProperty(key) ? data[key] : match;
      }
    });
  }

  extractImageUrl(imageUrlString) {
    const parts = imageUrlString.split(',');
    const url = parts[0].trim();
    return this.isValidUrl(url) ? url : '';
  }

  extractImageDescription(imageUrlString) {
    const parts = imageUrlString.split(',');
    return parts.length > 1 ? parts[1].trim() : '';
  }

  isValidUrl(url) {
    return /^https?:\/\//.test(url);
  }
}

customElements.define('neo-cards', NeoCardsElement);
