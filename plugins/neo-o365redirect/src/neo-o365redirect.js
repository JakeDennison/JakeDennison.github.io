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
    const url = window.location.href;
    this.isDesignMode = url.includes('UFDesigner.aspx') || !url.includes('/runtime');
    console.log('Current page URL:', url);
  }
  
  updated(changedProperties) {
    console.log('Trigger value:', this.trigger);
    console.log('Target URL:', this.targetURL);
    if (changedProperties.has('trigger') && this.trigger) {
      this._handleRedirect();
    }
  }

  _validateURL(url) {
    try {
      const parsedURL = new URL(url);
      const isRuntimePath = parsedURL.pathname.includes('UFRuntime.aspx');
      const isCurrentPageRuntime = window.location.href.includes('/runtime');
      return isRuntimePath || isCurrentPageRuntime;
    } catch (e) {
      return false;
    }
  }

  _handleRedirect() {
    const isValidURL = this._validateURL(this.targetURL);
    console.log('Is valid URL:', isValidURL);
    console.log('Is design mode:', this.isDesignMode);
    if (isValidURL && !this.isDesignMode) {
      console.log('Redirecting to:', this.targetURL);
      window.top.location.href = this.targetURL;  // Ensure top-level navigation
    } else {
      console.log('Redirect not performed.');
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
