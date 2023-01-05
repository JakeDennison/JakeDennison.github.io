import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { translate } from '@google-cloud/translate';

class TranslateElement extends LitElement {
    static get properties() {
      return {
        language: { type: String },
        apiKey: { type: String },
      };
    }
  
    async translatePage() {
      const projectId = 'precise-bonus-373815';
      const translateClient = new translate({
        projectId: 'precise-bonus-373815',
        key: this.apiKey,
      });
  
      const [translations] = await translateClient.translate(
        document.body.innerText,
        this.language
      );
      document.body.innerText = translations;
    }
  
    render() {
      return html`
        <input type="text" placeholder="API key" @input=${(e) => (this.apiKey = e.target.value)} />
        <br />
        <select @change=${(e) => (this.language = e.target.value)}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <br />
        <button @click=${this.translatePage}>Translate</button>
      `;
    }
  }

customElements.define('translate-element', TranslateElement);