import { LitElement, html, css } from 'lit';

class sapocElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-sapoc',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "button",
      groupName: 'neo',
      version: '1.0',
      properties: {
        clientid: {
          type: 'string',
          title: 'Client ID',
          description: 'Provide client ID'
        },
        secret: {
          type: 'string',
          title: 'Secret',
          description: 'Provide Secret'
        },
        EmployeeNumber: {
          type: 'string',
          title: 'Employee Number',
          description: 'Unique identifier for the employee'
        },
        ActionReason: {
          type: 'string',
          title: 'Action reason',
          description: 'Code representing the reason for the change'
        },
        Operation: {
          type: 'string',
          title: 'Operation',
          description: 'Operation code to specify update type'
        },
        StartDate: {
          type: 'string',
          title: 'Start date',
          description: 'The effective start date of the change - Format as YYYYMMDD e.g. 20240419',
        },
        EmailAddress: {
          type: 'string',
          title: 'Email Address',
          description: 'New email address of the employee'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    clientid: '',
    secret: '',
    EmployeeNumber: '',
    ActionReason: '',
    Operation: '',
    StartDate: '',
    EmailAddress: '',
    apiResponse: { type: String },
    apiError: { type: String },
    submitting: { type: Boolean }
  };

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .sapoc-container{
        font-family:  var(--ntx-form-theme-font-family);
        font-size: var(--ntx-form-theme-text-input-size);

      }
      .sapoc-label{
        font-size: var(--ntx-form-theme-text-label-size)

      }
      .btn-sapoc{
        background-color: var(--ntx-form-theme-color-primary);
        color: #FFFFFF;
        border-radius: 4px;
      }
      .btn-sapoc:hover{
        background-color: var(--bs-btn-hover-bg);
        border-color: var(--bs-btn-hover-border-color);
        color: var(--bs-btn-hover-color);
        text-decoration: none;
      }
    `;
  }

  constructor() {
    super();
    this.clientid = '';
    this.secret = '';
    this.EmployeeNumber = '';
    this.ActionReason = '';
    this.Operation = '';
    this.StartDate = '';
    this.EmailAddress = '';
    this.apiResponse = '';
    this.apiError = '';
    this.submitting = false
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div class="sapoc-container">
        <button type="button" class="btn btn-sapoc" @click=${this.handleSubmit}>Change NAW</button>
        ${this.submitting ? html`<div class="sapoc-label spinner-border spinner-border-sm mx-2 text-primary" role="status"><span class="visually-hidden">Waiting...</span></div>` : ''}
        ${this.apiResponse ? this.renderApiResponse() : ''}
        ${this.apiError ? html`<div class="sapoc-label alert alert-danger">Error: ${this.apiError}</div>` : ''}
      </div>
    `;
  }

  renderApiResponse() {
    const responseObj = JSON.parse(this.apiResponse);
    const messages = responseObj.ChangeNAWResponse.Messages;
  
    const messageElements = messages.map(message => html`
      <div class="p-1 my-2 sapoc-label alert alert-success">
        Number: ${message.Number} Message: ${message.Message}
      </div>`);
  
    return html`${messageElements}`;
  }

  async getAuthToken() {
    const tokenUrl = 'https://prd-dev-nams.authentication.us20.hana.ondemand.com/oauth/token';

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${encodeURIComponent(this.clientid)}&client_secret=${encodeURIComponent(this.secret)}`
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve access token');
      }

      const data = await response.json();
      console.log('Access token:', data.access_token); // Logging the access token
      return data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }

  async handleSubmit() {
    this.submitting = true;
    const url = 'https://prd-dev-nams.prod.apimanagement.us20.hana.ondemand.com/https/changeNaw';
    const data = {
      ChangeNAW: {
        NawDetails: {
          EmployeeNumber: this.EmployeeNumber,
          ActionReason: this.ActionReason,
          Operation: this.Operation,
          StartDate: this.StartDate,
          EmailAddress: this.EmailAddress,
        }
      }
    };

    try {
      const authToken = await this.getAuthToken();
      if (!authToken) {
        throw new Error('Failed to obtain access token');
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to update employee information: ${response.statusText}`);
      }

      const responseBody = await response.json();
      this.apiResponse = JSON.stringify(responseBody, null, 2);
      this.apiError = '';
    } catch (error) {
      this.apiResponse = '';
      this.apiError = error.message;
    } finally {
      this.submitting = false;
    }
  }


}

customElements.define('neo-sapoc', sapocElement);