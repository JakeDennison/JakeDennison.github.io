/*! For license information please see kbr-budgetcalc.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new r(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var l;const a=window,h=a.trustedTypes,d=h?h.emptyScript:"",c=a.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var $;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.1");const g=window,f=g.trustedTypes,_=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,b="?"+y,A=`<${b}>`,S=document,w=(t="")=>S.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,U=/>/g,R=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),P=/'/g,H=/"/g,O=/^(?:script|style|textarea|title)$/i,T=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),M=T(1),j=(T(2),Symbol.for("lit-noChange")),k=Symbol.for("lit-nothing"),I=new WeakMap,F=S.createTreeWalker(S,129,null,!1),L=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=C;for(let e=0;e<s;e++){const s=t[e];let l,a,h=-1,d=0;for(;d<s.length&&(o.lastIndex=d,a=o.exec(s),null!==a);)d=o.lastIndex,o===C?"!--"===a[1]?o=N:void 0!==a[1]?o=U:void 0!==a[2]?(O.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=R):void 0!==a[3]&&(o=R):o===R?">"===a[0]?(o=null!=r?r:C,h=-1):void 0===a[1]?h=-2:(h=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?R:'"'===a[3]?H:P):o===H||o===P?o=R:o===N||o===U?o=C:(o=R,r=void 0);const c=o===R&&t[e+1].startsWith("/>")?" ":"";n+=o===C?s+A:h>=0?(i.push(l),s.slice(0,h)+"$lit$"+s.slice(h)+y+c):s+y+(-2===h?(i.push(void 0),e):c)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==_?_.createHTML(l):l,i]};class D{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[a,h]=L(t,e);if(this.el=D.createElement(a,s),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=F.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(y)){const s=h[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(y),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?K:"@"===e[1]?Z:J})}else l.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(O.test(i.tagName)){const t=i.textContent.split(y),e=t.length-1;if(e>0){i.textContent=f?f.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],w()),F.nextNode(),l.push({type:2,index:++r});i.append(t[e],w())}}}else if(8===i.nodeType)if(i.data===b)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(y,t+1));)l.push({type:7,index:r}),t+=y.length-1}r++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function B(t,e,s=t,i){var r,n,o,l;if(e===j)return e;let a=void 0!==i?null===(r=s._$Co)||void 0===r?void 0:r[i]:s._$Cl;const h=E(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=B(t,a._$AS(t,e.values),a,i)),e}class z{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);F.currentNode=r;let n=F.nextNode(),o=0,l=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new V(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new Y(n,this,t)),this.u.push(e),a=i[++l]}o!==(null==a?void 0:a.index)&&(n=F.nextNode(),o++)}return r}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class V{constructor(t,e,s,i){var r;this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),E(t)?t===k||null==t||""===t?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==j&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>x(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==k&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=D.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(s);else{const t=new z(r,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new D(t)),e}k(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new V(this.O(w()),this.O(w()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,r){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=k}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=B(this,t,e,0),n=!E(t)||t!==this._$AH&&t!==j,n&&(this._$AH=t);else{const i=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=B(this,i[s+o],e,o),l===j&&(l=this._$AH[o]),n||(n=!E(l)||l!==this._$AH[o]),l===k?t=k:t!==k&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!i&&this.j(t)}j(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===k?void 0:t}}const W=f?f.emptyScript:"";class K extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==k?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=B(this,t,e,0))&&void 0!==s?s:k)===j)return;const i=this._$AH,r=t===k&&i!==k||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==k&&(i===k||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const G=g.litHtmlPolyfillSupport;var Q,X;null==G||G(D,V),(null!==($=g.litHtmlVersions)&&void 0!==$?$:g.litHtmlVersions=[]).push("2.6.1");class tt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new V(e.insertBefore(w(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return j}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2"),customElements.define("kbr-budgetcalc",class extends tt{static get properties(){return{dataobj:{type:String},mode:{type:String,default:"New"},listitems:{type:String}}}static get styles(){return n`
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
    `}static getMetaConfig(){return{controlName:"kbr-budgetcalc",fallbackDisableSubmit:!1,description:"Yearly budget calculator",iconUrl:"",groupName:"KBR",version:"1.0",properties:{listitems:{type:"string",title:"List Items",description:"List of items to be budgeted (best use output from multi-select control)"},itemname:{type:"string",title:"Item Name",description:"Singular Item Name such as Cost Center or Budget Code"},mode:{title:"Control Mode",type:"string",enum:["New","Review","Read-only"],showAsRadio:!0,verticalLayout:!0,defaultValue:"New"},outcomes:{type:"string",title:"Custom outcomes",description:"Enter comma separated values here will replace default outcomes of Approved and Rejected"},dataobj:{type:"string",title:"Calculator Data Object",description:"Leave empty if you are filling from new, enter output from previous calculator if not new"}},standardProperties:{fieldLabel:!0,description:!0}}}constructor(){super(),this.dataobj="",this.listitems="",this.itemname="",this.numberFormatter=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),this.statusColors={},this.itemValues={},this.outcomes=""}updated(t){t.has("listitems")&&console.log("listitems changed:",this.listitems)}createHeader(t){const e=this.itemname.length>0?this.itemname:"Item:",s=this.calculateTotalForItem(t);return M`
      <div class="card-header">
        <div style="float: left;" class="badge fs-6 bg-dark">${e} ${t}</div>
        <div style="float: right;" class="badge fs-6 rounded-pill bg-primary">Total: $${s}</div>
      </div>
    `}formatCurrency(t,e){const s=parseFloat(t.target.value.replace(/[^\d.-]/g,""));isNaN(s)||(t.target.value=this.numberFormatter.format(s)),this.calculateTotalForItem(e)}formatNumber(t){return new Intl.NumberFormat("en-US",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}calculateTotalForItem(t){if(!this.itemValues[t])return this.formatNumber(0);const e=this.itemValues[t].reduce(((t,e)=>t+(parseFloat(e)||0)),0);return this.formatNumber(e)}updateValue(t,e,s){const i=t.target.value.replace(/[^\d.-]/g,""),r=parseFloat(i);isNaN(r)?""===i&&(this.itemValues[e][s]=0,this.requestUpdate()):(this.itemValues[e]=this.itemValues[e]||[],this.itemValues[e][s]=r,this.requestUpdate())}formatInput(t){const e=parseFloat(t.target.value);t.target.value=isNaN(e)?"":this.numberFormatter.format(e)}createMonthInputs(t){const e=["January","February","March","April","May","June","July","August","September","October","November","December"];return M`
      ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(((s,i)=>M`
        <div class="mb-2 px-1 month-input">
          <label for="${s}-${t}" class="form-label">${e[i]}</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control currency-input" id="${s}-${t}"
              aria-label="Amount for ${e[i]}"
              placeholder="0.00"
              @blur="${t=>this.formatInput(t)}"
              @input="${e=>this.updateValue(e,t,i)}">
          </div>
        </div>
      `))}
    `}autoResize(t){t.target.classList.contains("active")?(t.target.style.height="auto",t.target.style.height=`${t.target.scrollHeight}px`):t.target.style.height="0"}createFooter(t){const e=this.statusColors[t]||{},s=this.outcomes.split(",").map((t=>t.trim())).filter(Boolean),i=s.length>0?s:["Rejected","Approved"],r=i.includes("Rejected")&&"Rejected"===e.selectedStatus;return M`
      <div class="card-footer">
        <div class="btn-group" role="group" aria-label="Approval Status">
          ${i.map((s=>M`
            <button type="button"
                    class="${this.getButtonClass(s,e.selectedStatus)}"
                    @click="${()=>this.updateStatus(t,s)}">${s}</button>
          `))}
        </div>
        <textarea class="form-control comments-control ${r?"active":""}"
                  placeholder="Enter comments"
                  @input="${this.autoResize}"
                  style="height: auto; min-height: 38px;"></textarea>
      </div>
    `}updateStatus(t,e){this.statusColors[t]={borderColor:{Approved:"border-success",Rejected:"border-danger"}[e]||"border-secondary",selectedStatus:e},this.requestUpdate()}getButtonClass(t,e){return"Approved"===t&&"Approved"===e?"btn btn-success":"Rejected"===t&&"Rejected"===e?"btn btn-danger":"Approved"===t?"btn btn-outline-success":"Rejected"===t?"btn btn-outline-danger":"btn btn-outline-secondary"}render(){const t=this.listitems.split(",");return M`
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