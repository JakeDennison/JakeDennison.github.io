import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class CarouselElement extends LitElement {
    static getMetaConfig() {
        // plugin contract information
        return {
          controlName: 'nac-carousel',
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
        this.index = 0;
    }

    handleNext() {
        this.index = this.index === this.imageList.length - 1 ? 0 : this.index + 1;
        this.requestUpdate();
    }

    handlePrev() {
        this.index = this.index === 0 ? this.imageList.length - 1 : this.index - 1;
        this.requestUpdate();
    }

    render() {
        if (!this.images) {
            return html`
            <p>No images found</p>
            `;
        }
        
        this.imageList = this.images.split(';').filter(image => image.trim() !== '');;

        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
        <style>
            .carousel-item {
                -webkit-transition: opacity 0.6s ease-in-out;
                -moz-transition: opacity 0.6s ease-in-out;
                -o-transition: opacity 0.6s ease-in-out;
                transition: opacity 0.6s ease-in-out;
            }
            img {
                object-fit: contain;
            }
        </style>

            <div id="carouselControls" class="carousel carousel-dark slide" data-bs-ride="true">
            <div class="carousel-inner">
                ${this.imageList.map((image, i) => {
                return html`
                    <div class="carousel-item w-100 ${i === this.index ? 'active' : ''}" style="transform: translateX(${i === this.index ? '0' : '100%'});">
                        <img src="${image}" class="d-block w-auto" width="800" height="500" preserveAspectRatio="xMidYMid slice" focusable="false" alt="">
                    </div>
                    `;
            })}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev" @click="${this.handlePrev}">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next" @click="${this.handleNext}">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        `;
    }
}

customElements.define('nac-carousel', CarouselElement);