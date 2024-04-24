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
    apiError: { type: String }  
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
    this.clientid = '';
    this.secret = '';
    this.EmployeeNumber = '';
    this.ActionReason = '';
    this.Operation = '';
    this.StartDate = '';
    this.EmailAddress = '';
    this.apiResponse = '';
    this.apiError = '';
  }

  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <button type="button" class="btn btn-info" @click=${this.handleSubmit}>Submit</button>
      ${this.apiResponse ? html`<div class="alert alert-success">Response: ${this.apiResponse}</div>` : ''}
      ${this.apiError ? html`<div class="alert alert-danger">Error: ${this.apiError}</div>` : ''}
    `;
  }
  

  async handleSubmit() {
    const url = 'https://prd-dev-nams.it-cpi009-rt.cfapps.us20.hana.ondemand.com/http/zhr_inf_employee_actions/change_naw';
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
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await this.getAuthToken()}`
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update employee information: ${response.statusText}`);
      }
  
      const responseBody = await response.json();
      this.apiResponse = JSON.stringify(responseBody, null, 2);
      this.apiError = '';  // Clear previous errors if the call was successful
    } catch (error) {
      this.apiResponse = '';  // Clear previous responses if the call failed
      this.apiError = error.message;
    }
  }
  

  async getAuthToken() {
    const tokenUrl = 'https://prd-dev-nams.authentication.us20.hana.ondemand.com/oauth/token';
    const credentials = base64Encode(`${this.clientid}:${this.secret}`);
  
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });
  
      if (!response.ok) {
        throw new Error('Failed to retrieve access token');
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return null;
    }
  }
}

customElements.define('neo-sapoc', sapocElement);