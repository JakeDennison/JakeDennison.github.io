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
    const apiUrl = 'https://emea-webinars.workflowcloud.com/api/v1/workflow/published/89b7a400-29cd-4187-b271-cec4fd58c192/instances?token=EqxecSpNmiImHGy7ycYVNNl2rVerRyvyAoEgXXyNW3ICmGlsQIuWDmH4htr3XAeVAvPJdl';
    
    const data = {
      startData: {
        se_emailaddress: this.EmailAddress,
        se_startdate: this.StartDate,
        se_operation: this.Operation,
        se_actionreason: this.ActionReason,
        se_employeenumber: this.EmployeeNumber
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
}

customElements.define('neo-sapoc', sapocElement);
