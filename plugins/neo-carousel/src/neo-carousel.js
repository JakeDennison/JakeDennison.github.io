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
    `;
  }

}

customElements.define('neo-carousel', CarouselElement);