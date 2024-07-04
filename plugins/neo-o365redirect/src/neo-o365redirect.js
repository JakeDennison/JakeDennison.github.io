import { LitElement, html, css } from 'lit';

class RedirectElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-o365redirect',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "",
      groupName: 'NEO',
      version: '1.0',
      properties: {
        targetURL: {
          type: 'string',
          title: 'Redirect Target URL',
          description: 'Please enter the URL of the Nintex Automation Cloud Form'
        },
        trigger: {
          title: 'Enable Redirect',
          type: 'boolean',
          defaultValue: false,
          description: 'Insert the is new form variable to trigger'
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static get properties() {
    return {
      targetURL: { type: String },
      trigger: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
      }
      .alert-danger {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
      }
    `;
  }

  constructor() {
    super();
    this.targetURL = '';
    this.trigger = false;
    this.isDesignMode = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.isDesignMode = window.location.href.includes('UFDesigner.aspx');
  }

  updated(changedProperties) {
    if (changedProperties.has('trigger') && this.trigger) {
      this._handleRedirect();
    }
  }

  _validateURL(url) {
    try {
      const parsedURL = new URL(url);
      return parsedURL.pathname.includes('UFRuntime.aspx');
    } catch (e) {
      return false;
    }
  }

  _handleRedirect() {
    if (this._validateURL(this.targetURL) && !this.isDesignMode) {
      window.location.href = this.targetURL;
    }
  }

  render() {
    if (this.isDesignMode) {
      return html`
        <div class="alert alert-danger">Redirect disabled in design mode</div>
      `;
    }
    return html``;
  }
}

customElements.define('neo-o365redirect', RedirectElement);
