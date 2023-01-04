import {css, html, LitElement, styleMap} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class MyElement extends LitElement {
    
    static getMetaConfig() {
        // plugin contract information
        return {
            title: 'bucket-mod',
            fallbackDisableSubmit: false,
            description: 'test on how data is transfered into js variables',
            iconUrl: "multiline-text",
            groupName: 'Translators',
            version: '1.0',
            properties: {
                value: {
                    type: 'string',
                    title: 'Select to sign',
                    description: 'value to replace'
                },
            },
            standardProperties: {
                readOnly: true,
                required: true,
                description: true,
            }
        };
    }
  
    static properties = {
        value: 'base'
    }

    constructor() {
        super();
        var myValue = $this.value
      }

    firstUpdated() {
      // Execute a JavaScript function when the element loads
      this.onLoad();
    }
  
    render() {
      return html`
        <div>My variable is: ${this.value}</div>
      `;
    }
  
    // Execute a JavaScript function when the value of `myValue` changes
    updated(changedProperties) {
      if (changedProperties.has('myValue')) {
        this.onmyValueChange();
      }
    }
  
    onLoad() {
      console.log('My element has loaded');
    }
  
    onmyValueChange() {
      console.log('The value of myValue has changed');
    }
  }

// registering the web component.

customElements.define('bucket-mod', MyElement);


