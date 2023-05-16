import { LitElement, html, css } from 'lit';

class NeoPageHoldElement extends LitElement {

  static get properties() {
    return {
      applyhold: { type: Boolean }
    };
  }

  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-pagehold',
      fallbackDisableSubmit: false,
      description: 'Prevents page navigation until true',
      iconUrl: 'button',
      groupName: 'Admin Tools',
      version: '1.0',
      properties: {
        applyhold: {
          title: 'Apply hold?',
          type: 'boolean',
          defaultValue: true,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.stepHeaders = [];
    this.actionPanels = [];
  }

  firstUpdated() {
    this.stepHeaders = document.querySelectorAll('mat-step-header');
    this.actionPanels = document.querySelectorAll('div.nx-action-panel');
    this.updateVisibility();
    console.log("first update complete")
  }

  updated(changedProperties) {
    if (changedProperties.has('applyhold')) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    console.log("visibility running")
    console.log(this.applyhold)
    const displayValue = this.applyhold ? 'none' : '';
  
    this.stepHeaders.forEach((header) => {
      header.style.display = displayValue;
    });
  
    this.actionPanels.forEach((panel) => {
      let parent = panel;
      for (let i = 0; i < 7; i++) {
        parent = parent.parentElement;
        if(!parent) break; // avoid null parent if the hierarchy is less than 7
      }
      if(parent) parent.style.display = displayValue; // apply style only if parent is not null
    });
  }
  
  render() {
    return html`
    `;
  }
}

customElements.define('neo-pagehold', NeoPageHoldElement);
