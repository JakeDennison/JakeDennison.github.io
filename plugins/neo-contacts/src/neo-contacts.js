import { LitElement, html, css } from 'lit';
import { contacts as defaultContacts } from './contactsData.js';

class contactsElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-contacts',
      fallbackDisableSubmit: false,
      description: 'Display contact cards',
      iconUrl: "People",
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        contactsJSON: {
          type: 'string',
          title: 'Contacts data source',
          description: 'Data source variable of the contacts list'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }
  
  constructor() {
    super();
    this.contactsJSON = '';
  }

  render() {
    let contacts = [];

    try {
        if (this.contactsJSON) {
            const parsedContacts = JSON.parse(this.contactsJSON);
            if (Array.isArray(parsedContacts) && parsedContacts.length > 0) {
                contacts = parsedContacts;
            } else {
                contacts = defaultContacts;
            }
        } else {
            contacts = defaultContacts;
        }
    } catch (error) {
        contacts = defaultContacts;
    }

    return html`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
      <div class="card-group">
        ${contacts.map(contact => html`
          <div class="card">
            <img src="${contact.image}" class="card-img-top" alt="${contact.name}">
            <div class="card-body">
                <h5 class="card-title">${contact.name}</h5>
                <p class="card-text">${contact.description}</p>
            </div>
            <div class="card-footer">
                <a href="${contact.linkedin}" target="_blank">
                    <img src="path/to/linkedin-logo.svg" alt="LinkedIn" width="24" height="24">
                </a>
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('neo-contacts', contactsElement);
