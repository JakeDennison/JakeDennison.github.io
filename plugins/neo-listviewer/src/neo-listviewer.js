import { LitElement, html, css } from 'lit';

class listviewElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-listviewer',
      fallbackDisableSubmit: false,
      description: 'Display a list of records',
      iconUrl: "group-control",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dataobject: {
          type: 'string',
          title: 'DSV Object JSON',
          description: 'Insert the DSV JSON string for your list of records.'
        },
        listURL: {
          type: 'string',
          title: 'List URL',
          description: 'The URL of the list used in the DSV, for this to work you need to ensure ID is returned in the DSV data'
        },
        pageItemLimit: {
          type: 'string',
          enum: ['5','10','15', '30', '50', '100'],
          title: 'Page Item Limit',
          description: 'Number of items to show per page',
          defaultValue: '5',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    dataobject: '',
    pageItemLimit: { type: Number },
    currentPage: { type: Number },
    sortOrder: { type: String },
    sortColumn: { type: String },
    searchQuery: { type: String },
  };

  static get properties() {
    return {
      itemsPerPage: { type: Number },
      currentPage: { type: Number },
    };
  }
  
  constructor() {
    super();
    this.dataobject = '';
    this.pageItemLimit = 5;
    this.currentPage = 1;
    this.sortOrder = 'asc'; // default sort order
    this.sortColumn = null; // default sort column
    this.searchQuery = '';
  }

  parseDataObject() {
    let data;

    try {
        data = JSON.parse(this.dataobject);
        data = this.replaceUnicodeRegex(data);
    } catch (e) {
        console.error(e);
        data = null;
    }

    return data;
}

replaceUnicodeRegex(input) {
  const unicodeRegex = /_x([0-9A-F]{4})_/g;
  return JSON.parse(JSON.stringify(input).replace(unicodeRegex, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
}


  sortAndFilterData(data) {
    // filter data
    if (this.searchQuery) {
      data = data.filter(row =>
        Object.values(row).some(val =>
          val.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    }

    // sort data
    if (this.sortColumn) {
      data.sort((a, b) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];
        let result = valA < valB ? -1 : valA > valB ? 1 : 0;
        return this.sortOrder === 'asc' ? result : -result;
      });
    }

    return data;
  }

  updateSort(column) {
    if (this.sortColumn === column) {
      // toggle sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // switch to new column and default to ascending order
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.requestUpdate();
  }

  changePage(newPage) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.requestUpdate();
    }
  }

  render() {
    const data = this.parseDataObject();

    if (!data || data.length === 0) {
        return html`
            <p>No Data Found</p>
        `;
    }

    const startIndex = (this.currentPage - 1) * parseInt(this.pageItemLimit, 10);
    const endIndex = startIndex + parseInt(this.pageItemLimit, 10);
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / parseInt(this.pageItemLimit, 10));
    this.totalPages = totalPages; // Assign to component property

    const rows = paginatedData.map(row => html`
        <tr>
            ${Object.keys(row).map(key => html`<td class="text-nowrap">${row[key]}</td>`)}
        </tr>
    `);

    const headers = Object.keys(data[0]).map(header => html`
        <th class="text-nowrap" @click="${() => this.updateSort(header)}">
            ${header}
            ${this.sortColumn === header ? (this.sortOrder === 'asc' ? '▲' : '▼') : ''}
        </th>
    `);

    // Calculate the range of pages to display
    const maxPagesToShow = 5;
    const pageRange = Math.min(totalPages, maxPagesToShow);
    let startPage = Math.max(1, this.currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);

    // Adjust startPage if it exceeds the valid range
    if (endPage - startPage + 1 < pageRange) {
        startPage = Math.max(1, endPage - pageRange + 1);
    }

    return html`
        <style>
            .page-txt-link {
                width: 100px;
                text-align:center;
            }
            .page-num-link {
                width: 45px;
                text-align:center;
            }
        </style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <div class="table-responsive-md overflow-auto">
            <table class="table table-striped">
                <thead>
                    <tr>
                        ${headers}
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
        <div class="row">
            ${totalPages > 1 ? html`
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                            <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(1)}">First</a>
                        </li>
                        <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                            <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(this.currentPage - 1)}">Previous</a>
                        </li>
                        ${Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map(page => html`
                            <li class="page-item ${page === this.currentPage ? 'active' : ''}">
                                <a class="page-link page-num-link" href="#" @click="${() => this.changePage(page)}">${page}</a>
                            </li>
                        `)}
                        <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                            <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(this.currentPage + 1)}">Next</a>
                        </li>
                        <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                            <a class="page-link page-txt-link" href="#" @click="${() => this.changePage(totalPages)}">Last</a>
                        </li>
                    </ul>
                </nav>
            ` : ''}
        </div>
    `;
}


}

customElements.define('neo-listviewer', listviewElement);
