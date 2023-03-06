import {html, LitElement} from 'lit';
import { Chart } from 'chart.js/auto';

class ChartComponent extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      data: { type: Object },
      options: { type: Object },
    };
  }

  render() {
    return html`<canvas></canvas>`;
  }

  updated() {
    this.updateChart();
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    const canvas = this.shadowRoot.querySelector('canvas');
    this.chart = new Chart(canvas, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
  }
}

customElements.define('chart-component', ChartComponent);