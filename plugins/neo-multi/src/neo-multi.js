import { LitElement, html, css, eventOptions } from 'lit';

class neomulti extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-multi',
      fallbackDisableSubmit: false,
      description: 'Provide a multiple select dropdown based on a data source variable.',
      iconUrl: 'Lookup',
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
        },
      },
      events: ['ntx-value-change'],
      standardProperties: {
        fieldLabel: true,
        description: true,
      },
    };
  }

  static styles = css`
    .chosen-container {
      position: relative;
      display: inline-block;
      width: 100%;
    }

    .chosen-container .chosen-choices {
      background-color: #f2f2f2;
      border-radius: 4px;
      cursor: text;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 4px 8px;
      min-height: 32px;
    }

    .chosen-container .chosen-choices .chosen-choice {
      display: inline-block;
      padding: 2px 4px;
      margin: 2px;
      background-color: #dddddd;
      border-radius: 3px;
    }

    .chosen-container .chosen-choices .chosen-choice span {
      margin-right: 4px;
    }

    .chosen-container .chosen-choices .chosen-choice .chosen-close {
      cursor: pointer;
    }

    .chosen-container .chosen-single {
      display: block;
      background-color: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 4px;
      padding: 4px 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .chosen-container .chosen-single span {
      margin-right: 4px;
    }

    .chosen-container .chosen-drop {
      position: absolute;
      z-index: 9999;
      background-color: #ffffff;
      border: 1px solid #cccccc;
      border-top: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .chosen-container .chosen-results {
      max-height: 200px;
      overflow-y: auto;
    }

    .chosen-container .chosen-results li {
      padding: 4px 8px;
      cursor: pointer;
    }

    .chosen-container .chosen-results li.selected {
      background-color: #e8e8e8;
    }
  `;

  static properties = {
    dsvdata: { type: String },
    displayKey: { type: String },
    valueKey: { type: String },
    outputJSON: { type: String },
  };

  constructor() {
    super();
    this.dsvdata = '';
    this.displayKey = '';
    this.valueKey = '';
    this.outputJSON = '';
  }

  connectedCallback() {
    super.connectedCallback();

    const selects = Array.from(this.shadowRoot.querySelectorAll('select'));
    selects.forEach((select) => {
      select.addEventListener('change', this.onChange);
      Array.from(select.options).forEach((option) => {
        option.addEventListener('mousedown', this.onOptionMousedown);
      });
    });
  }

  disconnectedCallback() {
    const selects = Array.from(this.shadowRoot.querySelectorAll('select'));
    selects.forEach((select) => {
      select.removeEventListener('change', this.onChange);
      Array.from(select.options).forEach((option) => {
        option.removeEventListener('mousedown', this.onOptionMousedown);
      });
    });

    super.disconnectedCallback();
  }

  onChange(e) {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => ({
      displayValue: option.text,
      value: option.value,
    }));

    const outputJSON = JSON.stringify(selectedOptions);
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: outputJSON }));
  }

  onOptionMousedown(event) {
    event.preventDefault();

    const option = event.target;
    const select = option.closest('select');

    option.selected = !option.selected;

    const selectedOptions = Array.from(select.selectedOptions).map((selectedOption) => ({
      displayValue: selectedOption.text,
      value: selectedOption.value,
    }));

    const outputJSON = JSON.stringify(selectedOptions);
    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: outputJSON }));

    this.requestUpdate();
  }

  parseDataObject() {
    try {
      if (this.dsvdata.startsWith('[') && this.dsvdata.endsWith(']')) {
        // Parse as JSON array
        return JSON.parse(this.dsvdata);
      } else {
        // Parse as comma-separated values
        return this.dsvdata.split(',').map((item) => item.trim());
      }
    } catch (error) {
      console.error('Error parsing DSV data:', error);
      return null;
    }
  }

  renderDropdownOptions(data) {
    if (!data || data.length === 0) {
      return html``;
    }

    return data.map(
      (item) => html`
        <option value="${item[this.valueKey]}">${item[this.displayKey]}</option>
      `
    );
  }

  renderChoices(selectedItems) {
    return selectedItems.map(
      (item) => html`
        <span class="chosen-choice">
          <span>${item[this.displayKey]}</span>
          <span class="chosen-close" @click="${() => this.removeChoice(item)}">&#10005;</span>
        </span>
      `
    );
  }

  removeChoice(item) {
    const selectedItems = Array.from(this.shadowRoot.querySelectorAll('select')).reduce((result, select) => {
      return [...result, ...Array.from(select.selectedOptions).map((option) => option.value)];
    }, []);
    const index = selectedItems.indexOf(item);
    if (index > -1) {
      selectedItems.splice(index, 1);
    }
    this.updateSelectedItems(selectedItems);
  }

  updateSelectedItems(selectedItems) {
    const selects = Array.from(this.shadowRoot.querySelectorAll('select'));
    selects.forEach((select) => {
      Array.from(select.options).forEach((option) => {
        option.selected = selectedItems.includes(option.value);
      });
    });
    this.requestUpdate();

    const data = this.parseDataObject();
    const choices = selectedItems.map((item) => {
      const selectedItem = data.find((dataItem) => dataItem[this.valueKey] === item);
      return selectedItem ? selectedItem[this.displayKey] : null;
    });

    const selectedItemsArray = selectedItems.map((item) => {
      const selectedItem = data.find((dataItem) => dataItem[this.valueKey] === item);
      return selectedItem
        ? { [this.displayKey]: selectedItem[this.displayKey], [this.valueKey]: selectedItem[this.valueKey] }
        : null;
    });

    const outputJSON = JSON.stringify(selectedItemsArray.filter((item) => item !== null));
    this.outputJSON = outputJSON;

    this.dispatchEvent(new CustomEvent('ntx-value-change', { detail: outputJSON }));

    console.log('Selected Choices:', choices);
  }

  render() {
    const data = this.parseDataObject();

    if (!data || data.length === 0) {
      return html`
        <p>No Data Found</p>
      `;
    }

    const selectedItems = Array.from(this.shadowRoot.querySelectorAll('select')).reduce((result, select) => {
      return [...result, ...Array.from(select.selectedOptions).map((option) => option.value)];
    }, []);

    const dropdownOptions = this.renderDropdownOptions(data);
    const choices = this.renderChoices(selectedItems);

    return html`
      <div class="chosen-container">
        <div class="chosen-choices">
          ${choices}
          <select multiple>
            ${dropdownOptions}
          </select>
        </div>
      </div>
    `;
  }
}

customElements.define('neo-multi', neomulti);