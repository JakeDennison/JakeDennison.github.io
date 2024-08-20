import { LitElement, html, css } from 'lit';

class fullcalendarElement extends LitElement {
  static properties = {
    days: { type: Array },
    startTime: { type: String },
    endTime: { type: String },
    interval: { type: Number },
    stringDays: { type: Array },
    selections: { type: Object },
    inputobj: { type: Object },
    outputobj: { type: Object },
  };

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

  constructor() {
    super();
    this.days = [0, 1, 2, 3, 4, 5, 6]; // Sun - Sat
    this.startTime = '08:00'; // HH:mm format
    this.endTime = '20:00'; // HH:mm format
    this.interval = 30; // minutes
    this.stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.selections = {};
    this.selectingStart = null;
    this.inputobj = {};
    this.outputobj = {};
  }

  static styles = css`
    .day-schedule-selector {
      width: 100%;
      border-collapse: collapse;
    }
    .schedule-table th, .schedule-table td {
      padding: 10px;
      text-align: center;
      border: 1px solid #ccc;
    }
    .time-slot[data-selected] {
      background-color: #007bff;
      color: white;
    }
    .time-slot[data-selecting] {
      background-color: #6c757d;
      color: white;
    }
    .time-slot[data-disabled] {
      pointer-events: none;
      opacity: 0.5;
    }
  `;

  render() {
    return html`
      <div class="day-schedule-selector">
        <table class="schedule-table">
          <thead class="schedule-header">
            <tr><th></th>${this.days.map(day => html`<th>${this.stringDays[day]}</th>`)}</tr>
          </thead>
          <tbody class="schedule-rows">
            ${this.generateDates(this.startTime, this.endTime, this.interval).map(time => html`
              <tr>
                <td class="time-label">${this.hmmAmPm(time)}</td>
                ${this.days.map(day => html`
                  <td 
                    class="time-slot" 
                    data-time="${this.hhmm(time)}" 
                    data-day="${day}" 
                    @click="${this.onSlotClick}"
                    @mouseover="${this.onSlotMouseOver}">
                  </td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  firstUpdated() {
    this.selections = this.deserialize(this.selections || {});
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.3.min.js';
    script.onload = () => {
      this.initializeScheduler();
    };
    this.shadowRoot.appendChild(script);
  }

  onSlotClick(e) {
    const slot = e.target;
    const day = slot.dataset.day;

    if (!this.isSelecting()) {
      if (slot.hasAttribute('data-selected')) {
        slot.removeAttribute('data-selected');
      } else {
        this.selectingStart = slot;
        slot.setAttribute('data-selecting', 'selecting');
        this.disableOtherDays(day);
      }
    } else if (day == this.selectingStart.dataset.day) {
      this.finishSelection(slot);
    }
  }

  onSlotMouseOver(e) {
    if (this.isSelecting()) {
      const slot = e.target;
      this.updateSelectionRange(this.selectingStart, slot);
    }
  }

  isSelecting() {
    return !!this.selectingStart;
  }

  finishSelection(slot) {
    this.clearSelecting();
    this.updateSelectionRange(this.selectingStart, slot, true);
    this.enableAllSlots();
    this.selectingStart = null;
    this.dispatchSelectionEvent();
  }

  updateSelectionRange(start, end, finalize = false) {
    const day = start.dataset.day;
    const slots = Array.from(this.shadowRoot.querySelectorAll(`.time-slot[data-day="${day}"]`));
    const startIndex = slots.indexOf(start);
    const endIndex = slots.indexOf(end);
    const [small, large] = [startIndex, endIndex].sort((a, b) => a - b);
    slots.forEach((slot, i) => {
      if (i >= small && i <= large) {
        if (finalize) {
          slot.setAttribute('data-selected', 'selected');
        } else {
          slot.setAttribute('data-selecting', 'selecting');
        }
      } else {
        slot.removeAttribute('data-selecting');
      }
    });
  }

  disableOtherDays(day) {
    const allSlots = this.shadowRoot.querySelectorAll('.time-slot');
    allSlots.forEach(slot => {
      if (slot.dataset.day !== day) {
        slot.setAttribute('data-disabled', 'disabled');
      }
    });
  }

  enableAllSlots() {
    const allSlots = this.shadowRoot.querySelectorAll('.time-slot');
    allSlots.forEach(slot => slot.removeAttribute('data-disabled'));
  }

  clearSelecting() {
    const allSlots = this.shadowRoot.querySelectorAll('.time-slot[data-selecting]');
    allSlots.forEach(slot => slot.removeAttribute('data-selecting'));
  }

  dispatchSelectionEvent() {
    this.dispatchEvent(new CustomEvent('selection-changed', {
      detail: { selections: this.serialize() }
    }));
  }

  serialize() {
    const selections = {};
    this.days.forEach(day => {
      const selectedSlots = [];
      const slots = Array.from(this.shadowRoot.querySelectorAll(`.time-slot[data-day="${day}"][data-selected]`));
      let start = null, end = null;
      slots.forEach(slot => {
        if (!start) {
          start = slot.dataset.time;
        }
        end = this.addInterval(slot.dataset.time);
        selectedSlots.push([start, end]);
      });
      selections[day] = selectedSlots;
    });
    return selections;
  }

  deserialize(schedule) {
    this.days.forEach(day => {
      const slots = schedule[day] || [];
      slots.forEach(range => {
        const [start, end] = range;
        const slotsToSelect = Array.from(this.shadowRoot.querySelectorAll(`.time-slot[data-day="${day}"]`))
          .filter(slot => slot.dataset.time >= start && slot.dataset.time < end);
        slotsToSelect.forEach(slot => slot.setAttribute('data-selected', 'selected'));
      });
    });
    return schedule;
  }

  generateDates(start, end, interval) {
    const startTime = this.hhmmToDate(start);
    const endTime = this.hhmmToDate(end);
    const dates = [];
    while (startTime < endTime) {
      dates.push(new Date(startTime));
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    return dates;
  }

  hmmAmPm(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}${ampm}`;
  }

  hhmm(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  hhmmToDate(hhmm) {
    const [hours, minutes] = hhmm.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  addInterval(hhmm) {
    const date = this.hhmmToDate(hhmm);
    date.setMinutes(date.getMinutes() + this.interval);
    return this.hhmm(date);
  }
}

customElements.define('neo-fullcalendar', fullcalendarElement);
