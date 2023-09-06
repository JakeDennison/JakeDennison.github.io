"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_1 = require("lit");
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
let rsElement = (() => {
    var _a;
    let _classSuper = lit_1.LitElement;
    let _instanceExtraInitializers = [];
    let _rsnumber_decorators;
    let _rsnumber_initializers = [];
    return _a = class rsElement extends _classSuper {
            constructor() {
                super();
                this.rsnumber = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _rsnumber_initializers, void 0));
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
                console.log('actions running');
                const rsnumberCount = this.rsnumber;
                const ntxRepeatingSections = this.shadowRoot.querySelectorAll('ntx-repeating-section');
                for (const ntxSection of ntxRepeatingSections) {
                    const targetDiv = ntxSection.querySelector(`div.${this.rstarget}`);
                    const button = ntxSection.querySelector("button.btn-repeating-section-new-row");
                    if (button && targetDiv) {
                        for (let i = 0; i < rsnumberCount - 1; i++) {
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
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _rsnumber_decorators = [(0, lit_1.property)({ type: Number })];
            __esDecorate(null, null, _rsnumber_decorators, { kind: "field", name: "rsnumber", static: false, private: false, access: { has: obj => "rsnumber" in obj, get: obj => obj.rsnumber, set: (obj, value) => { obj.rsnumber = value; } }, metadata: _metadata }, _rsnumber_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
customElements.define('neo-rs', rsElement);
