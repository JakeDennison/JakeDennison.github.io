import { LitElement, html, css } from 'lit';

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
          title: 'Full contacts JSON',
          description: 'Data source variable of the contacts JSON'
        },
        images: {
          type: 'string',
          title: 'Images keyname',
          description: 'Keyname the images'
        },
        banners: {
          type: 'string',
          title: 'Banners keyname',
          description: 'Keyname of the images'
        },
        partners: {
          type: 'string',
          title: 'Partners keyname',
          description: 'Keyname of the partners'
        },
        names: {
          type: 'string',
          title: 'Names keyname',
          description: 'Keyname of the names'
        },
        titles: {
          type: 'string',
          title: 'Titles keyname',
          description: 'Keyname of the titles'
        },
        pronouns: {
          type: 'string',
          title: 'Pronouns keyname',
          description: 'Keyname of the pronouns'
        },
        descriptions: {
          type: 'string',
          title: 'Descriptions keyname',
          description: 'Keyname of the descriptions'
        },
        locations: {
          type: 'string',
          title: 'Locations keyname',
          description: 'Keyname of then locations'
        },
        linkedins: {
          type: 'string',
          title: 'linkedins keyname',
          description: 'Keyname of the linkedins'
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
    this.images = '';
    this.banners = '';
    this.partners = '';
    this.names = '';
    this.titles = '';
    this.pronouns = '';
    this.descriptions = '';
    this.locations = '';
    this.linkedins = '';
}


render() {
  let contactsData;
  try {
      contactsData = JSON.parse(this.contactsJSON);
  } catch (error) {
      console.error("Error parsing contactsJSON:", error);
      return html`<p>Error loading contacts.</p>`;
  }

  return html`
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <div class="card-group">
      ${contactsData.map(contact => html`
        <div class="card">
          <img src="${contact[this.images]}" class="card-img-top" alt="${contact[this.names]}">
          <div class="card-body">
              <h5 class="card-title">${contact[this.names]}</h5>
              <p class="card-text">${contact[this.descriptions]}</p>
          </div>
          <div class="card-footer">
              <a href="${contact[this.linkedins]}" target="_blank">
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
