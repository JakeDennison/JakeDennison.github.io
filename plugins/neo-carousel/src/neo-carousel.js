import { html, LitElement } from 'lit';

class CarouselElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-carousel',
      fallbackDisableSubmit: false,
      description: 'Display images in a carousel',
      iconUrl: "image",
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

  static get styles() {
    return [];
  }

  constructor() {
    super();
    this.images = '';
  }

  render() {
    if (!this.images) {
      return html`<p>No images found</p>`;
    }

    this.imageList = this.images.split(';').filter(image => image.trim() !== '');

    return html`
      <link rel="stylesheet" href="https://jsdenintex.github.io/plugins/neo-carousel/dist/css/neo-carousel.scss">
      <div class="carousel">
        <input type="radio" name="slide" id="slide1" checked>
        ${this.imageList.map((image, index) => {
          return html`
            <input type="radio" name="slide" id="slide${index+2}">
            <div class="carousel__slide">
              <img src="${image}" alt="">
            </div>
          `;
        })}
        <div class="carousel__controls">
          ${this.imageList.map((image, index) => {
            return html`
              <label for="slide${index+1}"></label>
            `;
          })}
        </div>
      </div>
    `;
  }

}

customElements.define('neo-carousel', CarouselElement);