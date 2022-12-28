import {html, render} from 'lit-html';
import * as AR from 'ar.js';

class MyARComponent extends LitElement {
  static get properties() {
    return {
      arEnabled: { type: Boolean },
      arMarker: { type: String },
    };
  }

  static get styles() {
    return css`
      .ar-container {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.arEnabled = false;
    this.arMarker = '';
  }

  render() {
    return html`
      ${this.arEnabled ? html`
        <div class="ar-container" id="arContainer"></div>
      ` : ''}
    `;
  }

  firstUpdated() {
    if (this.arEnabled) {
      this.initAR();
    }
  }

  async initAR() {
    await AR.init(this.arMarker);

    const model = await AR.loadModel('/path/to/model.gltf');
    AR.add(model);
  }
}

customElements.define('my-ar-component', MyARComponent);