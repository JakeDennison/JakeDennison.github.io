import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export default class NacCards extends LitElement {
    static properties = {
        cardsData: { type: Array },
        darkMode: { type: Boolean },
        centerText: { type: Boolean }
    };

    static getMetaConfig() {
        return {
            controlName: 'nac-cards',
            fallbackDisableSubmit: false,
            description: 'Example of a visual card',
            groupName: 'Visual Data',
            version: '1.0',
            properties: {
                cardTitle: {
                    type: 'string',
                    title: 'Title'
                },
                cardText: {
                    type: 'string',
                    title: 'Text'
                },
                imageUrl: {
                    type: 'string',
                    title: 'Image URL',
                },
                link: {
                    type: 'string',
                    title: 'Link URL',
                },
                darkMode: {
                    type: 'boolean',
                    title: 'Dark mode'
                },
                centerText: {
                    type: 'boolean',
                    title: 'Center text'
                }
            },
            standardProperties: {
                fieldLabel: false,
                description: false,
                defaultValue: false,
                readOnly: false,
            },
        };
    }

    render() {
        let cardStyle = this.darkMode ? "text-white bg-dark" : "";
        let centerTextStyle = this.centerText ? "text-center" : "";
        return html`
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            ${this.cardsData.map(cardData => html`
                <div class="col">
                    <div class="card ${centerTextStyle} ${cardStyle} mb-3">
                        <h5 class="card-header">${cardData.cardTitle}</h5>
                        <img src="${cardData.imageUrl}" class="card-img-top p-3" alt=""/>
                        <div class="card-body">
                            <p class="card-text">${cardData.cardText}</p>
                            <a href="${cardData.link}" class="btn btn-primary">Go!</a>
                        </div>
                    </div>
                </div>
            `)}
        </div>
        `;
    }

    constructor() {
        super();
        this.darkMode = false;
        this.centerText = false;
        this.cardsData = [];
        fetch('https://jsdenintex.github.io/plugins/nac-cards/cards.json')
            .then(response => response.json())
            .then(data => {
                this.cardsData = data;
            });
    }
}

const elementName = 'nac-cards';
customElements.define(elementName, NacCards);