import { LitElement, html, css } from 'lit';
import Choices from 'choices.js';

class neomulti extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-multi',
      fallbackDisableSubmit: false,
      description: 'Provide a multiple select dropdown based on a data source variable.',
      iconUrl: 'data-lookup',
      groupName: 'Visual Data',
      version: '1.0',
      properties: {
        dsvdata: {
          type: 'string',
          title: 'JSON Input',
          description: 'Provide the data source variable as a JSON array.',
        },
        displayKey: {
          type: 'string',
          title: 'Display Key',
          description: 'Specify the key of the object to be displayed in the dropdown.',
        },
        valueKey: {
          type: 'string',
          title: 'Value Key',
          description: 'Specify the key of the object to be used as the value in the output JSON.',
        },
        outputJSON: {
          type: 'string',
          title: 'Output JSON',
          description: 'Provide the data source variable output as a string using a convert to string function variable',
          isValueField: true,
          returnAsValue: true,
        },
        defaultIDKey: {
          type: 'string',
          title: 'Default ID Key',
          description: 'Provide the JSON key containing the default value ID (e.g. ID or RecordID)',
        },
        defaultIDValue: {
          type: 'string',
          title: 'Default value unique identifiers',
          description: 'You can use the UIDs of the items you want to select by semi-colon separating them e.g. 2;4',
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static properties = {
    dsvdata: { type: String },
    displayKey: { type: String },
    valueKey: { type: String },
    outputJSON: { type: String },
    isOpen: { type: Boolean },
    selectedItems: { type: Object },
    selectedDisplayItems: { type: Array },
    defaultIDKey: { type: String },
    defaultIDValue: { type: String },
    removeToken: { type: Function },
  };


  constructor() {
    super();
    this.dsvdata = "";
    this.displayKey = "";
    this.valueKey = "";
    this.outputJSON = "";
    this.isOpen = false;
    this.selectedItems = [];
    this.selectedDisplayItems = [];
    this.defaultIDKey = ""
    this.defaultIDValue = ""
    console.log(this.defaultIDKey)
    console.log(this.defaultIDValue)
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        width: 100%;
      }
  
      .dropdown {
        display: none;
        position: absolute;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        background-color: var(--ntx-form-theme-color-field-and-modal, #fff);
        border: 1px solid var(--ntx-form-theme-color-border, #ced4da);
        border-radius: var(--ntx-form-theme-border-radius, .25rem);
        z-index: 1000;
        padding: 5px;
        box-sizing: border-box;
      }
  
      .dropdown.open {
        display: block;
      }
  
      .dropdown-item {
        display: flex;
        align-items: center;
        padding: 5px;
      }
  
      .dropdown-item input[type="checkbox"] {
        margin-right: 10px;
      }
  
      .selectinput {
        width: 100%;
        padding: 0 0.375rem;
        padding-bottom: 5px;
        font-size: var(--ntx-form-theme-text-input-size, 14px);
        line-height: 1.5;
        color: var(--ntx-form-theme-color-text-input, #495057);
        background-color: var(--ntx-form-theme-color-field-and-modal, #fff);
        background-clip: padding-box;
        border: 1px solid var(--ntx-form-theme-color-border, #ced4da);
        border-radius: var(--ntx-form-theme-border-radius, .25rem);
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        box-sizing: border-box;
        min-height: var(--ntx-form-theme-control-height, 40px);
      }
  
      .token {
        display: inline-block;
        line-height: 1.9;
        padding: 0px 10px;
        margin-top: 5px;
        color: var(--ntx-form-theme-color-form-background, #333);
        border: 1px solid var(--ntx-form-theme-color-primary, rgb(206, 212, 218));
        border-radius: 0.25rem;
        background-color: var(--ntx-form-theme-color-primary, rgb(233, 236, 239));
      }
  
      .remove-token {
        margin-left: 5px;
        cursor: pointer;
      }
      /* ===============================
=            Choices            =
=============================== */
.choices {
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  font-size: 16px;
}
.choices:focus {
  outline: none;
}
.choices:last-child {
  margin-bottom: 0;
}
.choices.is-open {
  overflow: visible;
}
.choices.is-disabled .choices__inner,
.choices.is-disabled .choices__input {
  background-color: #eaeaea;
  cursor: not-allowed;
  -webkit-user-select: none;
          user-select: none;
}
.choices.is-disabled .choices__item {
  cursor: not-allowed;
}
.choices [hidden] {
  display: none !important;
}

.choices[data-type*=select-one] {
  cursor: pointer;
}
.choices[data-type*=select-one] .choices__inner {
  padding-bottom: 7.5px;
}
.choices[data-type*=select-one] .choices__input {
  display: block;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  margin: 0;
}
.choices[data-type*=select-one] .choices__button {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDAwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==");
  padding: 0;
  background-size: 8px;
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
  margin-right: 25px;
  height: 20px;
  width: 20px;
  border-radius: 10em;
  opacity: 0.25;
}
.choices[data-type*=select-one] .choices__button:hover, .choices[data-type*=select-one] .choices__button:focus {
  opacity: 1;
}
.choices[data-type*=select-one] .choices__button:focus {
  box-shadow: 0 0 0 2px #00bcd4;
}
.choices[data-type*=select-one] .choices__item[data-value=""] .choices__button {
  display: none;
}
.choices[data-type*=select-one]::after {
  content: "";
  height: 0;
  width: 0;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
  border-width: 5px;
  position: absolute;
  right: 11.5px;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
}
.choices[data-type*=select-one].is-open::after {
  border-color: transparent transparent #333 transparent;
  margin-top: -7.5px;
}
.choices[data-type*=select-one][dir=rtl]::after {
  left: 11.5px;
  right: auto;
}
.choices[data-type*=select-one][dir=rtl] .choices__button {
  right: auto;
  left: 0;
  margin-left: 25px;
  margin-right: 0;
}

.choices[data-type*=select-multiple] .choices__inner,
.choices[data-type*=text] .choices__inner {
  cursor: text;
}
.choices[data-type*=select-multiple] .choices__button,
.choices[data-type*=text] .choices__button {
  position: relative;
  display: inline-block;
  margin-top: 0;
  margin-right: -4px;
  margin-bottom: 0;
  margin-left: 8px;
  padding-left: 16px;
  border-left: 1px solid #008fa1;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjEiIHZpZXdCb3g9IjAgMCAyMSAyMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yLjU5Mi4wNDRsMTguMzY0IDE4LjM2NC0yLjU0OCAyLjU0OEwuMDQ0IDIuNTkyeiIvPjxwYXRoIGQ9Ik0wIDE4LjM2NEwxOC4zNjQgMGwyLjU0OCAyLjU0OEwyLjU0OCAyMC45MTJ6Ii8+PC9nPjwvc3ZnPg==");
  background-size: 8px;
  width: 8px;
  line-height: 1;
  opacity: 0.75;
  border-radius: 0;
}
.choices[data-type*=select-multiple] .choices__button:hover, .choices[data-type*=select-multiple] .choices__button:focus,
.choices[data-type*=text] .choices__button:hover,
.choices[data-type*=text] .choices__button:focus {
  opacity: 1;
}

.choices__inner {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  background-color: #f9f9f9;
  padding: 7.5px 7.5px 3.75px;
  border: 1px solid #ddd;
  border-radius: 2.5px;
  font-size: 14px;
  min-height: 44px;
  overflow: hidden;
}
.is-focused .choices__inner, .is-open .choices__inner {
  border-color: #b7b7b7;
}
.is-open .choices__inner {
  border-radius: 2.5px 2.5px 0 0;
}
.is-flipped.is-open .choices__inner {
  border-radius: 0 0 2.5px 2.5px;
}

.choices__list {
  margin: 0;
  padding-left: 0;
  list-style: none;
}
.choices__list--single {
  display: inline-block;
  padding: 4px 16px 4px 4px;
  width: 100%;
}
[dir=rtl] .choices__list--single {
  padding-right: 4px;
  padding-left: 16px;
}
.choices__list--single .choices__item {
  width: 100%;
}

.choices__list--multiple {
  display: inline;
}
.choices__list--multiple .choices__item {
  display: inline-block;
  vertical-align: middle;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 3.75px;
  margin-bottom: 3.75px;
  background-color: #00bcd4;
  border: 1px solid #00a5bb;
  color: #fff;
  word-break: break-all;
  box-sizing: border-box;
}
.choices__list--multiple .choices__item[data-deletable] {
  padding-right: 5px;
}
[dir=rtl] .choices__list--multiple .choices__item {
  margin-right: 0;
  margin-left: 3.75px;
}
.choices__list--multiple .choices__item.is-highlighted {
  background-color: #00a5bb;
  border: 1px solid #008fa1;
}
.is-disabled .choices__list--multiple .choices__item {
  background-color: #aaaaaa;
  border: 1px solid #919191;
}

.choices__list--dropdown, .choices__list[aria-expanded] {
  visibility: hidden;
  z-index: 1;
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  top: 100%;
  margin-top: -1px;
  border-bottom-left-radius: 2.5px;
  border-bottom-right-radius: 2.5px;
  overflow: hidden;
  word-break: break-all;
  will-change: visibility;
}
.is-active.choices__list--dropdown, .is-active.choices__list[aria-expanded] {
  visibility: visible;
}
.is-open .choices__list--dropdown, .is-open .choices__list[aria-expanded] {
  border-color: #b7b7b7;
}
.is-flipped .choices__list--dropdown, .is-flipped .choices__list[aria-expanded] {
  top: auto;
  bottom: 100%;
  margin-top: 0;
  margin-bottom: -1px;
  border-radius: 0.25rem 0.25rem 0 0;
}
.choices__list--dropdown .choices__list, .choices__list[aria-expanded] .choices__list {
  position: relative;
  max-height: 300px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
}
.choices__list--dropdown .choices__item, .choices__list[aria-expanded] .choices__item {
  position: relative;
  padding: 10px;
  font-size: 14px;
}
[dir=rtl] .choices__list--dropdown .choices__item, [dir=rtl] .choices__list[aria-expanded] .choices__item {
  text-align: right;
}
@media (min-width: 640px) {
  .choices__list--dropdown .choices__item--selectable, .choices__list[aria-expanded] .choices__item--selectable {
    padding-right: 100px;
  }
  .choices__list--dropdown .choices__item--selectable::after, .choices__list[aria-expanded] .choices__item--selectable::after {
    content: attr(data-select-text);
    font-size: 12px;
    opacity: 0;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  [dir=rtl] .choices__list--dropdown .choices__item--selectable, [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable {
    text-align: right;
    padding-left: 100px;
    padding-right: 10px;
  }
  [dir=rtl] .choices__list--dropdown .choices__item--selectable::after, [dir=rtl] .choices__list[aria-expanded] .choices__item--selectable::after {
    right: auto;
    left: 10px;
  }
}
.choices__list--dropdown .choices__item--selectable.is-highlighted, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted {
  background-color: #f2f2f2;
}
.choices__list--dropdown .choices__item--selectable.is-highlighted::after, .choices__list[aria-expanded] .choices__item--selectable.is-highlighted::after {
  opacity: 0.5;
}

.choices__item {
  cursor: default;
}

.choices__item--selectable {
  cursor: pointer;
}

.choices__item--disabled {
  cursor: not-allowed;
  -webkit-user-select: none;
          user-select: none;
  opacity: 0.5;
}

.choices__heading {
  font-weight: 600;
  font-size: 12px;
  padding: 10px;
  border-bottom: 1px solid #f7f7f7;
  color: gray;
}

.choices__button {
  text-indent: -9999px;
  -webkit-appearance: none;
          appearance: none;
  border: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
.choices__button:focus {
  outline: none;
}

.choices__input {
  display: inline-block;
  vertical-align: baseline;
  background-color: #f9f9f9;
  font-size: 14px;
  margin-bottom: 5px;
  border: 0;
  border-radius: 0;
  max-width: 100%;
  padding: 4px 0 4px 2px;
}
.choices__input:focus {
  outline: 0;
}
.choices__input::-webkit-search-decoration, .choices__input::-webkit-search-cancel-button, .choices__input::-webkit-search-results-button, .choices__input::-webkit-search-results-decoration {
  display: none;
}
.choices__input::-ms-clear, .choices__input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
[dir=rtl] .choices__input {
  padding-right: 2px;
  padding-left: 0;
}

.choices__placeholder {
  opacity: 0.5;
}

/* =====  End of Choices  ====== */

    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.boundClickHandler = this.handleWindowClick.bind(this);
    window.addEventListener('click', this.boundClickHandler);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('dsvdata')) {
      let data = JSON.parse(this.dsvdata);
  
      let defaultValues = this.defaultIDValue.split(";").map(value => {
        let numericValue = Number(value);
        return !isNaN(numericValue) && Number.isInteger(numericValue) ? numericValue : value;
      });
  
      defaultValues.forEach(defaultValue => {
        let defaultItem = data.find(item => item[this.defaultIDKey] == defaultValue);
        if (defaultItem) {
          this.selectItem(defaultItem, false);
        }
      });
      // As we have updated selected items, request an update to make sure changes are reflected in the UI.
      this.requestUpdate();
    }
  }
  
  disconnectedCallback() {
    this.choices.destroy();
    super.disconnectedCallback();
  }

  handleWindowClick(e) {
    let target = e.target;
    while (target !== null) {
      if (target.getAttribute('data-ignore') === 'true' || target === this.shadowRoot.querySelector('.dropdown')) {
        return;
      }
      target = target.parentElement;
    }
  
    this.isOpen = false;
    this.requestUpdate();
  }
  
  handleCheckboxChange(e, item) {
    e.stopPropagation();
    e.preventDefault();
    this.selectItem(item, false);
  }

  selectItem(item, emitEvent = true) {
    const value = item[this.valueKey];
    const display = item[this.displayKey];
    if (this.selectedItems.includes(value)) {
      this.selectedItems = this.selectedItems.filter(i => i !== value);
      this.selectedDisplayItems = this.selectedDisplayItems.filter(i => i !== display);
    } else {
      this.selectedItems.push(value);
      this.selectedDisplayItems.push(display);
    }
  
    this.outputJSON = JSON.stringify(this.selectedItems.map(item => {
      return { [this.valueKey]: item };
    }));
  
    if (emitEvent) {
      const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.outputJSON,
      };
      const event = new CustomEvent('ntx-value-change', args);
      this.dispatchEvent(event);
    }
  
    this.requestUpdate();
  }
  
  removeToken(item) {
    const index = this.selectedDisplayItems.indexOf(item);
    if (index > -1) {
        this.selectedDisplayItems.splice(index, 1);
        this.selectedItems.splice(index, 1);
    }
    this.outputJSON = JSON.stringify(this.selectedItems.map(item => {
        return { [this.valueKey]: item };
    }));
    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: this.outputJSON,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);
}

firstUpdated() {
  // Create an instance of Choices on the select element
  this.choices = new Choices(this.shadowRoot.querySelector('.my-select'), {
    removeItemButton: true,  // To make it multi-select
    itemSelectText: '',      // Text for the option to add items
  });
}

render() {
  return html`
    <div @click="${(e) => e.stopPropagation()}">
      <select class="my-select" multiple>
        ${(JSON.parse(this.dsvdata) || []).map(item => html`
          <option value="${item[this.valueKey]}" 
                  ?selected="${this.selectedItems.includes(item[this.valueKey])}">
            ${item[this.displayKey]}
          </option>
        `)}
      </select>
    </div>
  `;
}
}

customElements.define('neo-multi', neomulti);