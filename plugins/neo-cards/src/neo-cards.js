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
          type: 'Object',
          title: 'Data Object',
          description: 'Insert the data object you want to build the cards from'
        },
        outputobject: {
          type: 'Object',
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
          title: 'Card Background Style',
          type: 'string',
          description: 'Apply a custom card background style using the bootstrap 5 card styles, e.g. bg-secondary'
        },
        borderstyle: {
          title: 'Card Border Style',
          type: 'string',
          description: 'Apply a custom card border style using the bootstrap 5 card styles, e.g. bg-success'
        },
        cardLayout: {
          title: 'Choice field',
          type: 'string',
          enum: ['Grid', 'Group'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Grid',
        },
        cardRow:{
          title: 'Number of cards per row',
          description: 'From 1 - 6',
          type: 'integer',
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
    `;
  }

  constructor() {
    super();
    this.inputobject = [];
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
            <img src="${item[this.imgurl]}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item[this.header]}</h5>
              <p class="card-text">${item[this.body]}</p>
              <a href="${item[this.btnURL]}" class="btn btn-primary">${this.btnLabel}</a>
            </div>
            <div class="card-footer">
              <small class="text-muted">${item[this.footer]}</small>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('neo-cards', NeoCardsElement);
