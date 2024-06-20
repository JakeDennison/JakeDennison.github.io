import { LitElement, html, css } from 'lit';

class animalcardsElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-animalcards',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'Cards',
      version: '1.0',
      properties: {
        listname: {
          type: 'string',
          title: 'Listname',
          description: 'The name of the SharePoint list to retrieve data from.'
        },
        filtercolumn: {
          type: 'string',
          title: 'Filter column name',
          description: 'The name of the column in the list you want to filter on.'
        },
        filtervalue: {
          type: 'string',
          title: 'Filter value',
          description: 'The value used by the filter. Each item in the list is compared against this value, if empty all will be returned'
        },
        outputcolumns: {
          type: 'string',
          title: 'Output columns',
          description: 'The columns in the list from which you want to retrieve data, semi-colon separated'
        },
        siteurl: {
          type: 'string',
          title: 'Server Relative URL',
          description: 'The URL to retrieve data from a list in the site e.g. /sites/Sales/APAC'
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
      listname: { type: String },
      filtercolumn: { type: String },
      filtervalue: { type: String },
      outputcolumns: { type: String },
      siteurl: { type: String },
      items: { type: Array }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 8px;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
      }
    `;
  }

  constructor() {
    super();
    this.listname = '';
    this.filtercolumn = '';
    this.filtervalue = '';
    this.outputcolumns = '';
    this.siteurl = '';
    this.items = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchListData();
  }

  async fetchListData() {
    const filterQuery = this.filtervalue ? `&$filter=${this.filtercolumn} eq '${this.filtervalue}'` : '';
    const selectQuery = this.outputcolumns.split(';').map(col => col.trim()).join(',');

    const url = `${this.siteurl}/_api/web/lists/getbytitle('${this.listname}')/items?$select=${selectQuery}${filterQuery}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json;odata=verbose'
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.items = data.d.results;
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
      ${this.items.map(item => html`
        <div class="card">
          ${this.outputcolumns.split(';').map(column => html`
            <p><strong>${column.trim()}:</strong> ${item[column.trim()]}</p>
          `)}
        </div>
      `)}
    `;
  }
}

customElements.define('neo-animalcards', animalcardsElement);
