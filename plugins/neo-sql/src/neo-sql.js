import { LitElement, html, css } from 'lit';
import { PublicClientApplication } from '@azure/msal-browser';

class neoSQLElement extends LitElement {
  static getMetaConfig() {
    return {
      controlName: 'neo-sql',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "Lookup",
      groupName: 'Data',
      version: '1.0',
      properties: {
        sqlServer: {
          type: 'string',
          title: 'Server Address',
          description: 'Link to server address'
        },
        authType: {
          title: 'Authentication Type',
          type: 'string',
          enum: ['SQL Login', 'Azure AD Application', 'Microsoft Entra ID'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'SQL Login',
        },
        username: {
          type: 'string',
          title: 'SQL Username',
          description: 'SQL login username',
          isVisible: (context) => context.authType === 'SQL Login'
        },
        password: {
          type: 'string',
          title: 'SQL Password',
          description: 'SQL login password',
          isVisible: (context) => context.authType === 'SQL Login'
        },
        clientId: {
          type: 'string',
          title: 'Client ID',
          description: 'Azure AD Application Client ID',
          isVisible: (context) => context.authType !== 'SQL Login'
        },
        clientSecret: {
          type: 'string',
          title: 'Client Secret',
          description: 'Azure AD Application Client Secret',
          isVisible: (context) => context.authType === 'Azure AD Application'
        },
        tenantId: {
          type: 'string',
          title: 'Tenant ID',
          description: 'Azure AD Tenant ID',
          isVisible: (context) => context.authType !== 'SQL Login'
        },
        dbName: {
          type: 'string',
          title: 'Database name',
          description: 'Link to server address'
        },
        queryType: {
          title: 'Query Type',
          type: 'string',
          enum: ['Table', 'View'],
          showAsRadio: true,
          verticalLayout: true,
          defaultValue: 'Table',
        },
        itemLimit: {
          title: 'Item Limit',
          description: 'Maximum of 5,000 items',
          type: 'number',
          minimum: 1,
          maximum: 5000,
          defaultValue: 1000,
        },
        sortBy: {
          type: 'string',
          title: 'Column name to sort by',
          description: 'Enter the name of the column you want to sort by'
        },
        sortOrder: {
          title: 'Sort Order',
          type: 'string',
          enum: ['Ascending', 'Descending'],
          showAsRadio: false,
          verticalLayout: true
        },
        columnDisplayLabel: {
          type: 'string',
          title: 'Column Display Label',
          description: 'Column used for display labels in the dropdown'
        },
        columnValue: {
          type: 'string',
          title: 'Column Value',
          description: 'Column used for values stored from the dropdown'
        }
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    src: '',
    sqlServer: { type: String },
    authType: { type: String },
    username: { type: String },
    password: { type: String },
    clientId: { type: String },
    clientSecret: { type: String },
    tenantId: { type: String },
    dbName: { type: String },
    queryType: { type: String },
    itemLimit: { type: Number },
    sortBy: { type: String },
    sortOrder: { type: String },
    columnDisplayLabel: { type: String },
    columnValue: { type: String },
    items: { type: Array }
  };

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  
  constructor() {
    super();
    this.src = '';
    this.sqlServer = '';
    this.authType = 'SQL Login';
    this.username = '';
    this.password = '';
    this.clientId = '';
    this.clientSecret = '';
    this.tenantId = '';
    this.dbName = '';
    this.queryType = 'Table';
    this.itemLimit = 1000;
    this.sortBy = '';
    this.sortOrder = 'Ascending';
    this.columnDisplayLabel = '';
    this.columnValue = '';
    this.items = [];
    this.msalInstance = null;
  }

  firstUpdated() {
    if (this.authType !== 'SQL Login') {
      this.msalInstance = new PublicClientApplication({
        auth: {
          clientId: this.clientId,
          authority: `https://login.microsoftonline.com/${this.tenantId}`,
          redirectUri: window.location.href
        }
      });
    }
  }

  async getAccessToken() {
    if (this.authType === 'SQL Login') return null;

    try {
      const response = await this.msalInstance.acquireTokenSilent({
        scopes: ['https://database.windows.net/.default']
      });
      return response.accessToken;
    } catch (error) {
      const response = await this.msalInstance.loginPopup({
        scopes: ['https://database.windows.net/.default']
      });
      return response.accessToken;
    }
  }

  async queryDatabase() {
    const accessToken = await this.getAccessToken();
    const headers = {
      'Content-Type': 'application/json'
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`https://${this.sqlServer}.database.windows.net/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dbName: this.dbName,
        queryType: this.queryType,
        itemLimit: this.itemLimit,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
        username: this.username,
        password: this.password
      })
    });

    const data = await response.json();
    this.items = data.map(item => ({
      label: item[this.columnDisplayLabel],
      value: item[this.columnValue]
    }));
    this.requestUpdate();
  }

  render() {
    return html`
      <div>
        <button @click="${this.queryDatabase}">Query Database</button>
        <select>
          ${this.items.map(item => html`<option value="${item.value}">${item.label}</option>`)}
        </select>
      </div>
    `;
  }
}

customElements.define('neo-sql', neoSQLElement);
