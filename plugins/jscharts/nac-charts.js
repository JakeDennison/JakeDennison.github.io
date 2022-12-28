import { LitElement, html } from 'lit-element';
import { Chart } from 'chart.js';

export class ChartElement extends LitElement {
  // Declare any properties that your extension will use
  static get properties() {
    return {
      data: { type: Array },
      options: { type: Object }
    };
  }

  constructor() {
    super();
    // Set default values for properties
    this.data = [];
    this.options = {};
  }

  firstUpdated() {
    // Use Chart.js to create a new chart when the element is first updated
    this.chart = new Chart(this.shadowRoot.querySelector('canvas'), {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart'
            }
          }
        },
    });
  }

  render() {
    // Render a canvas element that will be used to draw the chart
    return html`
      <canvas></canvas>
    `;
  }

}

customElements.define('chart-element', ChartElement);