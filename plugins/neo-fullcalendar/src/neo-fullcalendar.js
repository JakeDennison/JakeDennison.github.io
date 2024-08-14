import { LitElement, html, css } from 'lit';
import '@fullcalendar/web-component/global'

class fullcalendarElement extends LitElement {
  static getMetaConfig() {
    // plugin contract information
    return {
      controlName: 'neo-fullcalendar',
      fallbackDisableSubmit: false,
      description: '',
      iconUrl: "date-picker",
      groupName: 'neo',
      version: '1.0',
      properties: {
        inputobj: {
          type: 'object',
          title: 'Calendar Object Input',
          description: 'Input calendar object if used before'
        },
        outputobj: {
          type: 'object',
          title: 'Calendar Output Input',
          description: 'Do not use',
          isValueField: true,
        },
      },
      events: ["ntx-value-change"],
      standardProperties: {
        fieldLabel: true,
        description: true,
      }
    };
  }

  static properties = {
    inputobj: { type: Object },
    outputobj: { type: Object },
  };

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      full-calendar {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;
  }

  constructor() {
    super();
    this.inputobj = {};
    this.outputobj = {};
  }

  firstUpdated() {
    // Check if inputobj has data before initializing the calendar
    if (this.inputobj && Object.keys(this.inputobj).length > 0) {
      this.updateCalendar(this.inputobj);
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('inputobj') && Object.keys(this.inputobj).length > 0) {
      this.updateCalendar(this.inputobj);
    }
  }

  updateCalendar(inputObj) {
    const calendar = this.shadowRoot.querySelector('full-calendar');
    if (calendar) {
      calendar.options = {
        initialView: 'dayGridMonth',
        events: inputObj.events || [],
        dateClick: this.handleDateClick.bind(this),
        eventClick: this.handleEventClick.bind(this),
        ...inputObj // Apply any additional inputObj settings
      };
    }
  }

  handleDateClick(info) {
    const detail = { date: info.dateStr };
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  handleEventClick(info) {
    const detail = { event: info.event };
    this.dispatchEvent(new CustomEvent('ntx-value-change', {
      detail,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <full-calendar></full-calendar>
    `;
  }
}

customElements.define('neo-fullcalendar', fullcalendarElement);
