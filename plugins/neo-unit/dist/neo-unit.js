/*! For license information please see neo-unit.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const a=window,h=a.trustedTypes,d=h?h.emptyScript:"",c=a.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),b={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||b}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=b){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var v;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:f}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.1");const g=window,m=g.trustedTypes,$=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,y="?"+_,A=`<${y}>`,x=document,E=(t="")=>x.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,U=/>/g,P=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),H=/'/g,O=/"/g,N=/^(?:script|style|textarea|title)$/i,T=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=T(1),R=(T(2),Symbol.for("lit-noChange")),M=Symbol.for("lit-nothing"),z=new WeakMap,j=x.createTreeWalker(x,129,null,!1),D=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=C;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,d=0;for(;d<i.length&&(o.lastIndex=d,a=o.exec(i),null!==a);)d=o.lastIndex,o===C?"!--"===a[1]?o=k:void 0!==a[1]?o=U:void 0!==a[2]?(N.test(a[2])&&(n=RegExp("</"+a[2],"g")),o=P):void 0!==a[3]&&(o=P):o===P?">"===a[0]?(o=null!=n?n:C,h=-1):void 0===a[1]?h=-2:(h=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?P:'"'===a[3]?O:H):o===O||o===H?o=P:o===k||o===U?o=C:(o=P,n=void 0);const c=o===P&&t[e+1].startsWith("/>")?" ":"";r+=o===C?i+A:h>=0?(s.push(l),i.slice(0,h)+"$lit$"+i.slice(h)+_+c):i+_+(-2===h?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==$?$.createHTML(l):l,s]};class L{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[a,h]=D(t,e);if(this.el=L.createElement(a,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=j.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_)){const i=h[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(_),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?K:"@"===e[1]?Z:W})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(N.test(s.tagName)){const t=s.textContent.split(_),e=t.length-1;if(e>0){s.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],E()),j.nextNode(),l.push({type:2,index:++n});s.append(t[e],E())}}}else if(8===s.nodeType)if(s.data===y)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(_,t+1));)l.push({type:7,index:n}),t+=_.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function B(t,e,i=t,s){var n,r,o,l;if(e===R)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=S(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=B(t,a._$AS(t,e.values),a,s)),e}class I{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);j.currentNode=n;let r=j.nextNode(),o=0,l=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new V(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new G(r,this,t)),this.u.push(e),a=s[++l]}o!==(null==a?void 0:a.index)&&(r=j.nextNode(),o++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class V{constructor(t,e,i,s){var n;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),S(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==R&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>w(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==M&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=L.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new I(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new L(t)),e}k(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new V(this.O(E()),this.O(E()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,i,s,n){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=B(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==R,r&&(this._$AH=t);else{const s=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=B(this,s[i+o],e,o),l===R&&(l=this._$AH[o]),r||(r=!S(l)||l!==this._$AH[o]),l===M?t=M:t!==M&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!s&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}const J=m?m.emptyScript:"";class K extends W{constructor(){super(...arguments),this.type=4}j(t){t&&t!==M?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Z extends W{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=B(this,t,e,0))&&void 0!==i?i:M)===R)return;const s=this._$AH,n=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==M&&(s===M||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class G{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const Q=g.litHtmlPolyfillSupport;var X,Y;null==Q||Q(L,V),(null!==(v=g.litHtmlVersions)&&void 0!==v?v:g.litHtmlVersions=[]).push("2.6.1");class tt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new V(e.insertBefore(E(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return R}}tt.finalized=!0,tt._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.2.2"),customElements.define("neo-unit",class extends tt{static getMetaConfig(){return{controlName:"neo-unit",fallbackDisableSubmit:!1,description:"Control for diplaying units of measurement",iconUrl:"https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",groupName:"Custom controls",version:"1.0",properties:{unittype:{title:"Choice field",type:"string",enum:["kg.","ltr.","km"],verticalLayout:!0,defaultValue:"kg."},unitvalue:{type:"number",title:"Unit value",description:"Decimal unit value",isValueField:!0,staticProperties:!0},decimalplaces:{type:"integer",title:"Decimal place",description:"enter -1 for none, 1 for .0, 2 for .01 etc."}},standardProperties:{fieldLabel:!0,description:!0},events:["ntx-value-change"]}}constructor(){super(),this.unittype="kg.",this.unitvalue="",this.decimalplaces=""}static get styles(){const{cssRules:t}=document.styleSheets[0];return[r([Object.values(t).map((t=>t.cssText)).join("\n")]),r`
        :host {
          display: block;
        }
        .neo-unit-control {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-items: stretch;
          width: 100%;
        }
        
        .neo-unit-control .input-unit-group-append {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
          border-color: #898F94;
          background: #FFFFFF;
          font-size: 14px;
        }
        
        .neo-unit-control .input-unit-group-append .neo-btn-input-icon:last-child {
          border-bottom-left-radius: 4px;
          border-top-left-radius: 4px;
        }
        
        .neo-unit-control .neo-unit-btn-icon {
          color: #006BD6;
          font-size: 20px;
          padding-left: 7px;
          padding-right: 7px;
        }
        
        .neo-unit-control .input-unit-group-append > .neo-unit-btn:last-child {
          border-radius: 4px 0 0 4px;
          cursor: default;
          border-left: 1px solid;
          border-right: none;
          border-color: inherit;
          min-width: 36px;
          color: #006bd6;
          font-size: 20px;
          font-style: normal;
          overflow: hidden;
        }
        
        .neo-btn-input-icon {
          border-left: 1px solid;
          border-right: 1px solid;
          border-top: 1px solid;
          border-bottom: 1px solid;
          border-color: inherit;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 0;
          background-color: transparent;
          cursor: pointer;
        }
        
      .neo-unit-control .nx-zinc-control-input .input-group {
          display: flex;
          flex: 1;
      }

      .neo-unit-control > div.nx-zinc-control-input.input-group > ntx-simple-number > input{
        --bs-white: #fff;
        --bs-black: #000;
        --bs-red: #e10d11;
        --bs-orange: #e06e18;
        --bs-yellow: #ffcb00;
        --bs-green: #09894e;
        --bs-blue: #2070d0;
        --bs-teal: #5bc0de;
        --bs-pink: #ff5b77;
        --bs-purple: #613d7c;
        --bs-gray-100: #fafafa;
        --bs-gray-200: #e6e6e6;
        --bs-gray-300: #cbcbcb;
        --bs-gray-400: #949494;
        --bs-gray-500: #5b5b5b;
        --bs-gray-600: #404040;
        --bs-gray-700: #000;
        --bs-primary: #006bd6;
        --bs-secondary: #cbcbcb;
        --bs-success: #008738;
        --bs-inverse: #fff;
        --bs-info: #006bd6;
        --bs-warning: #ffcf1a;
        --bs-danger: #e60000;
        --bs-light: #fafafa;
        --bs-dark: #5b5b5b;
        --bs-primary-rgb: 0,107,214;
        --bs-secondary-rgb: 203,203,203;
        --bs-success-rgb: 0,135,56;
        --bs-inverse-rgb: 255,255,255;
        --bs-info-rgb: 0,107,214;
        --bs-warning-rgb: 255,207,26;
        --bs-danger-rgb: 230,0,0;
        --bs-light-rgb: 250,250,250;
        --bs-dark-rgb: 91,91,91;
        --bs-white-rgb: 255,255,255;
        --bs-black-rgb: 0,0,0;
        --bs-body-color-rgb: 22,23,24;
        --bs-body-bg-rgb: 241,241,241;
        --bs-font-sans-serif: "Open Sans",Helvetica,Arial,sans-serif;
        --bs-font-monospace: Menlo,Monaco,Consolas,"Courier New",monospace;
        --bs-gradient: linear-gradient(180deg,#ffffff26,#fff0);
        --bs-body-font-family: Open Sans,Helvetica,Arial,sans-serif;
        --bs-body-font-size: .875rem;
        --bs-body-font-weight: normal;
        --bs-body-line-height: 1.3;
        --bs-body-color: #161718;
        --bs-body-bg: #f1f1f1;
        --bs-border-width: 1px;
        --bs-border-style: solid;
        --bs-border-color: #e6e6e6;
        --bs-border-color-translucent: rgba(0,0,0,.175);
        --bs-border-radius: 4px;
        --bs-border-radius-sm: 2px;
        --bs-border-radius-lg: 6px;
        --bs-border-radius-xl: 1rem;
        --bs-border-radius-2xl: 2rem;
        --bs-border-radius-pill: 50rem;
        --bs-link-color: #006bd6;
        --bs-link-hover-color: #006bd6;
        --bs-code-color: #bd4147;
        --bs-highlight-bg: #ffcb00;
        --ntx-form-theme-font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
        --ntx-form-theme-color-primary: #006BD6;
        --ntx-form-theme-color-secondary: #161718;
        --ntx-form-theme-color-border: #898F94;
        --ntx-form-theme-color-input-background: #FFFFFF;
        --ntx-form-theme-color-page-background: #EFF0F0;
        --ntx-form-theme-color-form-background: #FFFFFF;
        --ntx-form-theme-border-radius: 4px;
        --ntx-form-theme-text-input-size: 14px;
        --ntx-form-theme-text-label-size: 14px;
        --ntx-form-control-line-height: 1.25;
        --ntx-form-color-error: #e60000;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        --bs-gutter-x: 30px;
        --bs-gutter-y: 0;
        word-break: break-word;
        user-select: none;
        box-sizing: border-box;
        margin: 0;
        appearance: none;
        display: block;
        font-weight: 400;
        line-height: 1;
        padding: .4375rem .75rem;
        transition: none;
        width: 100%;
        height: auto;
        border: 1px solid #898f94;
        text-align: right;
        caret-color: #161718;
        color: #161718;
        border-color: #898F94;
        font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
        background: #FFFFFF;
        font-size: 14px;
        border-radius: 0 4px 4px 0;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
      `]}onChange(t){const e=new CustomEvent("ntx-value-change",{bubbles:!0,cancelable:!1,composed:!0,detail:t.target.value});this.dispatchEvent(e)}render(){return F`
      <div class="neo-unit-control">
        <div class="input-unit-group-append">
          <button type="button" class="neo-btn-input-icon neo-unit-btn">
            <span>${this.unittype}</span>
          </button>
        </div>
        <div class="nx-zinc-control-input input-group">
          <ntx-simple-number>
            <input type="text" 
              data-simple-control="true"
              ntxmaskablenumberinputvalueaccessor=""
              class="form-control nx-theme-input-1 ng-untouched ng-pristine ng-valid"
              inputmode="decimal"
              decimalplaces=${this.decimalplaces}
              @blur=${this.onChange}
            >
          </ntx-simple-number>
        </div>
      </div>
    `}})})();