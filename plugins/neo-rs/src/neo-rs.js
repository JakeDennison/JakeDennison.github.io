"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
// Define the contract information using @nintex/form-plugin-contract
const rsElementContract = {
    version: '1.0',
    fallbackDisableSubmit: false,
    controlName: 'neo-rs',
    description: 'Repeating section manipulator',
    iconUrl: 'repeating-section',
    groupName: 'Form Tools',
    properties: {
        rsnumber: {
            type: 'number',
            title: 'Number of sections by default',
            description: 'Please ensure the default value of sections is not changed from 1',
        },
        rstarget: {
            type: 'string',
            title: 'Target class',
            description: 'Class name used to target repeating section',
        },
    },
    standardProperties: {
        fieldLabel: true,
        description: true,
    },
};
class rsElement extends lit_1.LitElement {
    constructor() {
        super();
        this.rstarget = '';
        this.rsnumber = 0;
        this.rstarget = '';
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.runActions(); // Trigger actions on component load
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('rsnumber')) {
            this.runActions();
            this.requestUpdate(); // Manually trigger a re-render when rsnumber changes
        }
    }
    runActions() {
        console.log('runActions called');
        console.log('rsnumber:', this.rsnumber);
        // Construct the class selector based on this.rstarget
        const targetClassName = this.rstarget;
        // Select the repeating section with the dynamic target class
        const targetRepeatingSection = this.shadowRoot.querySelector(`.${targetClassName}`);
        if (targetRepeatingSection) {
            // Find the next sibling element (which should be the button)
            const button = targetRepeatingSection.nextElementSibling;
            if (button) {
                // Click the button
                for (let i = 0; i < this.rsnumber - 1; i++) {
                    button.click();
                }
            }
        }
    }
    render() {
        return (0, lit_1.html) `
      <div>rsNumber: ${this.rsnumber}</div>
    `;
    }
    // Include the contract information using @nintex/form-plugin-contract
    static getMetaConfig() {
        return rsElementContract;
    }
}
__decorate([
    (0, decorators_js_1.property)({ type: Number })
], rsElement.prototype, "rsnumber", void 0);
customElements.define('neo-rs', rsElement);
