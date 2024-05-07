/*! For license information please see kbr-budgetcalc.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new r(i,t,s)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var a;const l=window,h=l.trustedTypes,d=h?h.emptyScript:"",c=l.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const o=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=i.getPropertyOptions(r),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=r,this[r]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var $;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.1");const g=window,f=g.trustedTypes,_=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,b="?"+y,A=`<${b}>`,S=document,E=(t="")=>S.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,U=/>/g,O=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),P=/'/g,R=/"/g,H=/^(?:script|style|textarea|title)$/i,T=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),M=T(1),k=(T(2),Symbol.for("lit-noChange")),j=Symbol.for("lit-nothing"),I=new WeakMap,F=S.createTreeWalker(S,129,null,!1),L=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":"",n=C;for(let e=0;e<s;e++){const s=t[e];let a,l,h=-1,d=0;for(;d<s.length&&(n.lastIndex=d,l=n.exec(s),null!==l);)d=n.lastIndex,n===C?"!--"===l[1]?n=N:void 0!==l[1]?n=U:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=O):void 0!==l[3]&&(n=O):n===O?">"===l[0]?(n=null!=r?r:C,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?O:'"'===l[3]?R:P):n===R||n===P?n=O:n===N||n===U?n=C:(n=O,r=void 0);const c=n===O&&t[e+1].startsWith("/>")?" ":"";o+=n===C?s+A:h>=0?(i.push(a),s.slice(0,h)+"$lit$"+s.slice(h)+y+c):s+y+(-2===h?(i.push(void 0),e):c)}const a=o+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==_?_.createHTML(a):a,i]};class D{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,h]=L(t,e);if(this.el=D.createElement(l,s),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=F.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(y)){const s=h[o++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(y),e=/([.?@])?(.*)/.exec(s);a.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?K:"@"===e[1]?Z:J})}else a.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split(y),e=t.length-1;if(e>0){i.textContent=f?f.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],E()),F.nextNode(),a.push({type:2,index:++r});i.append(t[e],E())}}}else if(8===i.nodeType)if(i.data===b)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(y,t+1));)a.push({type:7,index:r}),t+=y.length-1}r++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function V(t,e,s=t,i){var r,o,n,a;if(e===k)return e;let l=void 0!==i?null===(r=s._$Co)||void 0===r?void 0:r[i]:s._$Cl;const h=w(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,s,i)),void 0!==i?(null!==(n=(a=s)._$Co)&&void 0!==n?n:a._$Co=[])[i]=l:s._$Cl=l),void 0!==l&&(e=V(t,l._$AS(t,e.values),l,i)),e}class B{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);F.currentNode=r;let o=F.nextNode(),n=0,a=0,l=i[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new z(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new Y(o,this,t)),this.u.push(e),l=i[++a]}n!==(null==l?void 0:l.index)&&(o=F.nextNode(),n++)}return r}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class z{constructor(t,e,s,i){var r;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),w(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==k&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>x(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==j&&w(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=D.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(s);else{const t=new B(r,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new D(t)),e}k(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new z(this.O(E()),this.O(E()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,r){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=V(this,t,e,0),o=!w(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=V(this,i[s+n],e,n),a===k&&(a=this._$AH[n]),o||(o=!w(a)||a!==this._$AH[n]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const W=f?f.emptyScript:"";class K extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=V(this,t,e,0))&&void 0!==s?s:j)===k)return;const i=this._$AH,r=t===j&&i!==j||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==j&&(i===j||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const G=g.litHtmlPolyfillSupport;var Q,X;null==G||G(D,z),(null!==($=g.litHtmlVersions)&&void 0!==$?$:g.litHtmlVersions=[]).push("2.6.1");class tt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,r;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let n=o._$litPart$;if(void 0===n){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;o._$litPart$=n=new z(e.insertBefore(E(),t),t,void 0,null!=s?s:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return k}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2"),customElements.define("kbr-budgetcalc",class extends tt{static get properties(){return{dataobj:{type:String},mode:{type:String,default:"New"},listitems:{type:String}}}static get styles(){return o`
      :host {
        display: block;
      }
      .card {
        margin-bottom: 20px; /* Space between cards */
      }
      .currency-input {
        text-align: right;
      }
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        transition: all 0.3s ease;
      }
      .btn-group {
        flex-grow: 1; /* Allows the button group to use available space */
        transition: all 0.3s ease; /* Smooth transitions for button group adjustments */
        flex: 0 0 100%;
        max-width: 100%;
      }
      .comments-control {
        transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease, width 0.3s ease, margin 0.3s ease;
        max-height: 0; /* Ensures it collapses vertically */
        width: 0; /* Ensures it takes no horizontal space */
        opacity: 0; /* Fully invisible */
        visibility: hidden; /* Not visually perceivable */
        overflow: hidden; /* No content spills */
        padding: 0; /* No internal spacing */
        margin: 0; /* Ensures no external spacing */
        display: none;
      }

      .comments-control.active {
        max-height: 200px; /* Adjust as needed */
        opacity: 1;
        visibility: visible;
        width: 100%; /* Full width on active */
        padding: .375rem .75rem; /* Standard padding */
        margin-top: 0.5rem; /* Some top margin if needed */
        display: flex;
      }
      .btn-group {
          flex: 0 0 100%;
          max-width: 100%;
        }
        .comments-control.active {
          flex: 0 0 100%;
          max-width: 100%;
        }
      .input-group {
        padding-bottom: 10px; /* Space between input groups */
      }
      @media (max-width: 576px) { /* Smaller devices */
        .month-input {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
      @media (min-width: 577px) and (max-width: 768px) { /* Medium devices */
        .month-input {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) { /* Large devices */
        .month-input {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
      }
      @media (min-width: 993px) { /* Extra large devices */
        .month-input {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
    `}static getMetaConfig(){return{controlName:"kbr-budgetcalc",fallbackDisableSubmit:!1,description:"Yearly budget calculator",iconUrl:"",groupName:"KBR",version:"1.0",properties:{listitems:{type:"string",title:"List Items",description:"List of items to be budgeted (best use output from multi-select control)"},itemname:{type:"string",title:"Item Name",description:"Singular Item Name such as Cost Center or Budget Code"},mode:{title:"Control Mode",type:"string",enum:["Edit","Read-only"],showAsRadio:!0,verticalLayout:!0,defaultValue:"Edit"},review:{title:"Enable Review Mode",type:"boolean",defaultValue:!1},outcomes:{type:"string",title:"Outcomes",description:"Comma separated values for the outcomes",defaultValue:"Rejected, Approved"},dataobj:{type:"string",title:"Calculator Data Object",description:"Leave empty if you are filling from new, enter output from previous calculator if not new"}},standardProperties:{fieldLabel:!0,description:!0}}}constructor(){super(),this.dataobj="",this.listitems="",this.itemname="",this.mode="Edit",this.review=!1,this.numberFormatter=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),this.statusColors={},this.itemValues={},this.outcomes=""}updated(t){t.has("listitems")&&console.log("listitems changed:",this.listitems)}createHeader(t){const e=this.itemname.length>0?this.itemname:"Item:",s=this.calculateTotalForItem(t);return M`
      <div class="card-header">
        <div style="float: left;" class="badge fs-6 bg-dark">${e} ${t}</div>
        <div style="float: right;" class="badge fs-6 rounded-pill bg-primary">Total: $${s}</div>
      </div>
    `}formatCurrency(t,e){const s=parseFloat(t.target.value.replace(/[^\d.-]/g,""));isNaN(s)||(t.target.value=this.numberFormatter.format(s)),this.calculateTotalForItem(e)}formatNumber(t){return new Intl.NumberFormat("en-US",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}calculateTotalForItem(t){if(!this.itemValues[t])return this.formatNumber(0);const e=this.itemValues[t].reduce(((t,e)=>t+(parseFloat(e)||0)),0);return this.formatNumber(e)}updateValue(t,e,s){const i=t.target.value.replace(/[^\d.-]/g,""),r=parseFloat(i);isNaN(r)?""===i&&(this.itemValues[e][s]=0,this.requestUpdate()):(this.itemValues[e]=this.itemValues[e]||[],this.itemValues[e][s]=r,this.requestUpdate())}formatInput(t){const e=parseFloat(t.target.value);t.target.value=isNaN(e)?"":this.numberFormatter.format(e)}createMonthInputs(t){const e=["January","February","March","April","May","June","July","August","September","October","November","December"],s="Read-only"===this.mode;return M`
      ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(((i,r)=>M`
        <div class="mb-2 px-1 month-input">
          <label for="${i}-${t}" class="form-label">${e[r]}</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control currency-input" id="${i}-${t}"
              aria-label="Amount for ${e[r]}"
              ?disabled="${s}"  // Conditionally disable based on mode
              placeholder="0.00"
              @blur="${t=>this.formatInput(t)}"
              @input="${e=>this.updateValue(e,t,r)}">
          </div>
        </div>
      `))}
    `}autoResize(t){t.target.classList.contains("active")?(t.target.style.height="auto",t.target.style.height=`${t.target.scrollHeight}px`):t.target.style.height="0"}get processedOutcomes(){const t=this.outcomes.split(",").map((t=>t.trim()));return t.length?t:["Rejected","Approved"]}createFooter(t){const e=this.statusColors[t]||{selectedStatus:"Rejected"},s="Approved"!==e.selectedStatus;return M`
      <div class="card-footer">
        <div class="btn-group" role="group" aria-label="Approval Status">
          ${this.processedOutcomes.map((s=>M`
            <button type="button"
                    class="${this.getButtonClass(s,e.selectedStatus)}"
                    @click="${()=>this.updateStatus(t,s)}">${s}</button>
          `))}
        </div>
        ${s?M`
          <textarea class="form-control comments-control"
                    placeholder="Enter comments"
                    @input="${this.autoResize}"
                    style="height: auto; min-height: 38px;"></textarea>
        `:""}
      </div>
    `}updateStatus(t,e){this.statusColors[t]={selectedStatus:e},this.requestUpdate()}getBorderColor(t){const e={Approved:"border-success",Rejected:"border-danger",default:"border-primary"};return e[t]||e.default}getButtonClass(t,e){const s="btn";switch(t){case"Approved":return`${s} ${e===t?"btn-success":"btn-outline-success"}`;case"Rejected":return`${s} ${e===t?"btn-danger":"btn-outline-danger"}`;default:return`${s} ${e===t?"btn-primary":"btn-outline-primary"}`}}render(){const t=this.listitems.split(",");return M`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${t.map((t=>M`
          <div class="card ${this.statusColors[t]?.borderColor||""}">
            ${this.createHeader(t)}
            <div class="card-body d-flex flex-wrap">
              ${this.createMonthInputs(t)}
            </div>
            ${this.createFooter(t)}
          </div>
        `))}
      </div>
    `}})})();