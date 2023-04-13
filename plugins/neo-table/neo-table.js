import { css, html, LitElement, unsafeHTML } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyTable extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-table',
      fallbackDisableSubmit: false,
      description: 'Display object as a table',
      iconUrl: 'group-control',
      groupName: 'Visual Data',
      version: '1.4',
      properties: {
        dataobject: {
          type: 'string',
          title: 'Object',
          description: 'Test'
        },
      },
      standardProperties: {
        fieldLabel: true,
        readOnly: true,
        required: true,
        description: true,
      }
    };
  }

  static properties = {
    dataobject: ''
  }

  constructor() {
    super();
    this.showFullTable = false;
  }

  render() {
    if (!this.dataobject) {
      return html`
        <p>No Data Loaded</p>
      `;
    }

    const unicodeRegex = /_x([0-9A-F]{4})_/g;
    const data = JSON.parse(this.dataobject.replace(unicodeRegex, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    ));
    const rows = data.map((row) =>
      html`
        <tr>
          ${Object.values(row).map(
            (cell) => html`<td class="text-nowrap">${unsafeHTML(cell)}</td>`
          )}
        </tr>
      `
    );

    const headers = Object.keys(data[0]).map(
      (header) => html`<th class="text-nowrap">${header}</th>`
    );

    const showFullTableButton = html`
      <button type="button" class="btn btn-primary" @click="${this._showFullTable}">
        Show Full Table
      </button>
    `;

    const table = html`
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
    `;

    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      ${this.showFullTable
        ? html`
            <div class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
              <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Full Table</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ${table}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          `
        : ''}
      ${this.showFullTable ? '' : table}
      ${rows.length > 10 && !this.showFullTable ? showFullTableButton : ''}
    `;
  }

  _showFullTable() {
    this.showFullTable = true;

    // add event listener to hide the full table when the modal is closed
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.addEventListener('click', this._hideFullTable.bind(this));
    const modalCloseButton = document.querySelector('.modal .btn-close');
    modalCloseButton.addEventListener('click', this._hideFullTable.bind(this));
  }

  _hideFullTable() {
    this.showFullTable = false;

    // remove event listener
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.removeEventListener('click', this._hideFullTable.bind(this));
    const modalCloseButton = document.querySelector('.modal .btn-close');
    modalCloseButton.removeEventListener('click', this._hideFullTable.bind(this));
  }
}

customElements.define('neo-table', MyTable);
