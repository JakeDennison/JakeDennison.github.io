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
  }

  render() {
    return html`
    <button type="button" class="btn btn-info">Submit</button>
  `;
  }
}

customElements.define('neo-sapoc', sapocElement);
