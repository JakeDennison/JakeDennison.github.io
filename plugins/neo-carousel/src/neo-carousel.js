import { LitElement, html, css } from 'lit';
import './css/carousel.css';
import './css/neo-carousel.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class CarouselElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-carousel',
      fallbackDisableSubmit: false,
      description: 'Display images in a carousel',
      iconUrl: 'image',
      groupName: 'Visual Data',
      version: '1.3',
      properties: {
        images: {
          type: 'string',
          title: 'Images',
          description: 'Please list image URLs semi-colon (;) separated'
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

  constructor() {
    super();
    this.images = '';
  }

  firstUpdated() {
    // Initialize the carousel using the "carousel" class
    const carousel = this.shadowRoot.querySelector('.carousel');
    $(carousel).carousel();
  }

  render() {
    if (!this.images) {
      return html`<p>No images found</p>`;
    }
  
    const imageUrls = this.images.split(';');
  
    return html`
      <div class="carousel">
        ${imageUrls.map(url => html`
          <img src="${url}" />
        `)}
      </div>
    `;
  }
}

customElements.define('neo-carousel', CarouselElement);
