import { LitElement, html, css } from 'lit';

class contactsElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-contacts',
      fallbackDisableSubmit: false,
      description: 'Display contact cards',
      iconUrl: "https://jsdenintex.github.io/plugins/neo-contacts/dist/contactico.svg",
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

      .card-banner {
        width: 100%;
        height: 150px;
        overflow: hidden;
        position: relative;
      }

      .card-banner img {
        width: 100%;
      }

      .card-img-top {
        width: 120px!important;
        height: 120px;
        border-radius: 50%;
        -webkit-border-radius: 50%; /* Safari and Chrome */
        -moz-border-radius: 50%;    /* Firefox */
        position: absolute;
        top: 10px;
        left: 25%;
        transform: translateX(-50%);
        border: 3px solid white;
        overflow: hidden; 
      }

      .card-body {
        padding-top: 20px;
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
          <div class="card-banner">
            <img src="${contact[this.banners]}" alt="Banner">
            <img src="${contact[this.images]}" class="card-img-top" alt="${contact[this.names]}">
          </div>
          <div class="card-body">
              <h5 class="card-title .fw-bold">${contact[this.names]} <span class="text-muted">${contact[this.pronouns]}</span></h5>
              <p class="card-text">${contact[this.descriptions]}</p>
              <p class="card-text"><strong>${contact[this.partner]}</strong></p>
              <p class="card-text">${contact[this.locations]}</p>
          </div>
          <div class="card-footer d-flex justify-content-end">
              <a href="${contact[this.linkedins]}" target="_blank">
                  <img src="https://jsdenintex.github.io/plugins/neo-contacts/dist/LinkedIn_Logo.svg" alt="LinkedIn" height="32">
              </a>
          </div>
        </div>
      `)}
    </div>
  `;
}

}

customElements.define('neo-contacts', contactsElement);
