import { _ as _decorate, s, r, e, $, n } from './query-assigned-elements-214d6340.js';
import { i } from './style-map-0711c8b0.js';
import './directive-fc7549f4.js';

let _ = t => t,
    _t,
    _t2;
let ZwcIframe = _decorate([n('zwc-iframe')], function (_initialize, _LitElement) {
  class ZwcIframe extends _LitElement {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: ZwcIframe,
    d: [{
      kind: "field",
      static: true,
      key: "styles",

      value() {
        return r(_t || (_t = _`
    :host {
      height: 100%;
      width: 100%;
      display: block;
    }
    .frame {
      display: inline-block;
      height: 100%;
      width: 100%;
      background-color: transparent;
      border: none;
    }
  `));
      }

    }, {
      kind: "method",
      static: true,
      key: "getMetaConfig",
      value: // Define scoped styles right with your component, in plain CSS
      function getMetaConfig() {
        return import('./iframe.config-48600259.js').then(x => {
          return x.config;
        });
      }
    }, {
      kind: "field",
      decorators: [e()],
      key: "name",

      value() {
        return 'Hello';
      }

    }, {
      kind: "field",
      decorators: [e()],
      key: "title",

      value() {
        return 'Hello';
      }

    }, {
      kind: "field",
      decorators: [e()],
      key: "src",

      value() {
        return 'https://stackoverflow.com/';
      }

    }, {
      kind: "field",
      decorators: [e()],
      key: "height",

      value() {
        return '100%';
      }

    }, {
      kind: "method",
      key: "render",
      value: // Render the UI as a function of component state
      function render() {
        let styles = {
          height: this.height
        };
        return $(_t2 || (_t2 = _`<iframe
      class="frame"
      style=${0}
      .name=${0}
      allow="geolocation *; microphone; camera"
      .title=${0}
      src=${0}
    ></iframe>`), i(styles), this.name, this.title, this.src);
      }
    }]
  };
}, s);

export { ZwcIframe };