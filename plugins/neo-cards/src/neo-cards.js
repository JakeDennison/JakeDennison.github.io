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
        flex: 1 1 calc(100% / 3);
        position: relative;
        overflow: hidden;
        background-color: #f8f9fa;
      }
      .card-img-top {
        width: 100%;
        height: auto;
        object-fit: cover;
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
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
      }
      .filter-dropdown {
        position: relative;
      }
      .filter-dropdown input {
        width: 200px;
      }
      .filter-dropdown .dropdown-menu {
        max-height: 200px;
        overflow-y: auto;
        padding: 10px;
      }
      .filter-dropdown .dropdown-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
      }
      .filter-dropdown .dropdown-item.selected {
        background-color: #007bff;
        color: white;
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

  firstUpdated() {
    this.renderFilters();
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="filter-bar">
        ${this.renderFilterDropdowns()}
      </div>
      <div class="${this.getCardLayoutClass()}">
        ${this.inputobject
          .filter(item => this.filterItem(item))
          .map(item => {
            const imageUrlString = this.interpolateTemplate(this.imgurl, item);
            const imageUrl = this.extractImageUrl(imageUrlString);
            const imageDescription = this.extractImageDescription(imageUrlString);
            const imageHeight = this.interpolateTemplate(this.imgheight, item);

            return html`
              <div class="card ${this.style} ${this.borderstyle}">
                ${imageUrl
                  ? html`
                      <img
                        src="${imageUrl}"
                        alt="${imageDescription}"
                        class="card-img-top"
                        style="${imageHeight ? `height: ${imageHeight};` : ''}"
                      />
                    `
                  : ''}
                <div class="card-body">
                  ${this.header
                    ? html`
                        <h5 class="card-title">
                          ${this.interpolateTemplate(this.header, item)}
                        </h5>
                      `
                    : ''}
                  ${this.body
                    ? html`
                        <p class="card-text">
                          ${this.interpolateTemplate(this.body, item)}
                        </p>
                      `
                    : ''}
                  ${this.btnURL
                    ? html`
                        <a
                          href="${this.interpolateTemplate(this.btnURL, item)}"
                          class="btn btn-primary"
                          >${this.btnLabel}</a
                        >
                      `
                    : ''}
                </div>
                ${this.footer
                  ? html`
                      <div class="card-footer">
                        <small class="text-muted">
                          ${this.interpolateTemplate(this.footer, item)}
                        </small>
                      </div>
                    `
                  : ''}
              </div>
            `;
          })}
      </div>
    `;
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
    const matches = imageUrlString.match(/src="([^"]+)"/);
    return matches ? matches[1] : '';
  }

  extractImageDescription(imageUrlString) {
    const matches = imageUrlString.match(/alt="([^"]+)"/);
    return matches ? matches[1] : '';
  }

  filterItem(item) {
    for (const key in this.selectedFilters) {
      if (item[key] !== this.selectedFilters[key]) {
        return false;
      }
    }
    return true;
  }

  renderFilters() {
    const filterTagsArray = this.filterTags.split(',').map(tag => tag.trim());
    filterTagsArray.forEach(tag => {
      this.selectedFilters[tag] = '';
    });
    this.requestUpdate();
  }

  renderFilterDropdowns() {
    const filterTagsArray = this.filterTags.split(',').map(tag => tag.trim());
    return filterTagsArray.map(
      tag => html`
        <div class="filter-dropdown dropdown">
          <input
            type="text"
            class="form-control"
            placeholder="Filter by ${tag}"
            @input="${e => this.filterDropdownOptions(e, tag)}"
            @click="${e => this.toggleDropdown(e)}"
          />
          <div class="dropdown-menu" id="dropdown-${tag}">
            ${this.getFilterOptions(tag).map(
              option => html`
                <div
                  class="dropdown-item ${this.selectedFilters[tag] === option ? 'selected' : ''}"
                  @click="${() => this.selectFilterOption(tag, option)}"
                >
                  ${option}
                </div>
              `
            )}
          </div>
        </div>
      `
    );
  }

  filterDropdownOptions(event, tag) {
    const query = event.target.value.toLowerCase();
    const dropdownMenu = this.shadowRoot.getElementById(`dropdown-${tag}`);
    const items = dropdownMenu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  toggleDropdown(event) {
    const dropdown = event.target.nextElementSibling;
    dropdown.classList.toggle('show');
  }

  getFilterOptions(tag) {
    const uniqueOptions = new Set();
    this.inputobject.forEach(item => {
      if (item.hasOwnProperty(tag)) {
        uniqueOptions.add(item[tag]);
      }
    });
    return Array.from(uniqueOptions);
  }

  selectFilterOption(tag, option) {
    this.selectedFilters[tag] = option;
    this.requestUpdate();
  }
}

customElements.define('neo-cards-element', NeoCardsElement);
