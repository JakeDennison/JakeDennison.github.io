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
        images: {
          type: 'string',
          title: 'Collection of images',
          description: 'Data source variable of the images'
        },
        partners: {
          type: 'string',
          title: 'Collection of partners',
          description: 'Data source variable of the partners'
        },
        names: {
          type: 'string',
          title: 'Collection of names',
          description: 'Data source variable of the names'
        },
        titles: {
          type: 'string',
          title: 'Collection of titles',
          description: 'Data source variable of the titles'
        },
        descriptions: {
          type: 'string',
          title: 'Collection of descriptions',
          description: 'Data source variable of the descriptions'
        },
        linkedins: {
          type: 'string',
          title: 'Collection of ',
          description: 'Data source variable of the linkedins'
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
    this.images = '';
    this.partners = '';
    this.names = '';
    this.titles = '';
    this.descriptions = '';
    this.linkedins = '';
  }

  render() {
    const imagesArray = JSON.parse(this.images);
    const partnersArray = JSON.parse(this.partners);
    const namesArray = JSON.parse(this.names);
    const titlesArray = JSON.parse(this.titles);
    const descriptionsArray = JSON.parse(this.descriptions);
    const linkedinsArray = JSON.parse(this.linkedins);

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
