import { localize, translate } from '@lit/localize';
import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class MyTranslatedElement extends localize(LitElement) {
  static get translations() {
    return {
      en: {
        hello: 'Hello',
        goodbye: 'Goodbye'
      },
      fr: {
        hello: 'Bonjour',
        goodbye: 'Au revoir'
      }
    }
  }

  render() {
    return html`<p>${translate('hello')}</p>`;
  }
}

customElements.define('my-translated-element', MyTranslatedElement);

const element = document.querySelector('my-translated-element');
const btnEnglish = document.querySelector('#btn-english');
const btnFrench = document.querySelector('#btn-french');

btnEnglish.addEventListener('click', () => {
  element.lang = 'en';
});

btnFrench.addEventListener('click', () => {
  element.lang = 'fr';
});