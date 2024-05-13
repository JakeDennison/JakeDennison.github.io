/*! For license information please see kbr-budgetcalc.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new r(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var l;const a=window,h=a.trustedTypes,d=h?h.emptyScript:"",u=a.reactiveElementPolyfillSupport,c={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const r=this[t];this[e]=i,this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=m){var i;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const n=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:c).toAttribute(e,s.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,r=i._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=i.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:c;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var g;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.1");const b=window,y=b.trustedTypes,$=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,_="?"+f,A=`<${_}>`,S=document,w=(t="")=>S.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,V=/>/g,j=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),U=/'/g,N=/"/g,H=/^(?:script|style|textarea|title)$/i,M=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),P=M(1),T=(M(2),Symbol.for("lit-noChange")),R=Symbol.for("lit-nothing"),k=new WeakMap,D=S.createTreeWalker(S,129,null,!1),I=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":"",o=C;for(let e=0;e<s;e++){const s=t[e];let l,a,h=-1,d=0;for(;d<s.length&&(o.lastIndex=d,a=o.exec(s),null!==a);)d=o.lastIndex,o===C?"!--"===a[1]?o=O:void 0!==a[1]?o=V:void 0!==a[2]?(H.test(a[2])&&(r=RegExp("</"+a[2],"g")),o=j):void 0!==a[3]&&(o=j):o===j?">"===a[0]?(o=null!=r?r:C,h=-1):void 0===a[1]?h=-2:(h=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?j:'"'===a[3]?N:U):o===N||o===U?o=j:o===O||o===V?o=C:(o=j,r=void 0);const u=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===C?s+A:h>=0?(i.push(l),s.slice(0,h)+"$lit$"+s.slice(h)+f+u):s+f+(-2===h?(i.push(void 0),e):u)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==$?$.createHTML(l):l,i]};class L{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[a,h]=I(t,e);if(this.el=L.createElement(a,s),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=D.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const s=h[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?q:"?"===e[1]?K:"@"===e[1]?Z:J})}else l.push({type:6,index:r})}for(const e of t)i.removeAttribute(e)}if(H.test(i.tagName)){const t=i.textContent.split(f),e=t.length-1;if(e>0){i.textContent=y?y.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],w()),D.nextNode(),l.push({type:2,index:++r});i.append(t[e],w())}}}else if(8===i.nodeType)if(i.data===_)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(f,t+1));)l.push({type:7,index:r}),t+=f.length-1}r++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function B(t,e,s=t,i){var r,n,o,l;if(e===T)return e;let a=void 0!==i?null===(r=s._$Co)||void 0===r?void 0:r[i]:s._$Cl;const h=E(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(n=null==a?void 0:a._$AO)||void 0===n||n.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,s,i)),void 0!==i?(null!==(o=(l=s)._$Co)&&void 0!==o?o:l._$Co=[])[i]=a:s._$Cl=a),void 0!==a&&(e=B(t,a._$AS(t,e.values),a,i)),e}class z{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);D.currentNode=r;let n=D.nextNode(),o=0,l=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new F(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new G(n,this,t)),this.u.push(e),a=i[++l]}o!==(null==a?void 0:a.index)&&(n=D.nextNode(),o++)}return r}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class F{constructor(t,e,s,i){var r;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(r=null==i?void 0:i.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=B(this,t,e),E(t)?t===R||null==t||""===t?(this._$AH!==R&&this._$AR(),this._$AH=R):t!==this._$AH&&t!==T&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>x(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==R&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=L.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.p(s);else{const t=new z(r,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=k.get(t.strings);return void 0===e&&k.set(t.strings,e=new L(t)),e}k(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new F(this.O(w()),this.O(w()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,r){this.type=1,this._$AH=R,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=B(this,t,e,0),n=!E(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{const i=t;let o,l;for(t=r[0],o=0;o<r.length-1;o++)l=B(this,i[s+o],e,o),l===T&&(l=this._$AH[o]),n||(n=!E(l)||l!==this._$AH[o]),l===R?t=R:t!==R&&(t+=(null!=l?l:"")+r[o+1]),this._$AH[o]=l}n&&!i&&this.j(t)}j(t){t===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class q extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===R?void 0:t}}const W=y?y.emptyScript:"";class K extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==R?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class Z extends J{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=B(this,t,e,0))&&void 0!==s?s:R)===T)return;const i=this._$AH,r=t===R&&i!==R||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==R&&(i===R||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class G{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){B(this,t)}}const Y=b.litHtmlPolyfillSupport;var Q,X;null==Y||Y(L,F),(null!==(g=b.litHtmlVersions)&&void 0!==g?g:b.litHtmlVersions=[]).push("2.6.1");class tt extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{var i,r;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let o=n._$litPart$;if(void 0===o){const t=null!==(r=null==s?void 0:s.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new F(e.insertBefore(w(),t),t,void 0,null!=s?s:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return T}}tt.finalized=!0,tt._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2"),customElements.define("kbr-budgetcalc",class extends tt{static get properties(){return{listitems:{type:String},itemname:{type:String},currentuser:{type:String},reviewmode:{type:Boolean},inputobj:{type:Object},outputobj:{type:Object},itemValues:{type:Object},statusColors:{type:Object}}}static getMetaConfig(){return{controlName:"kbr-budgetcalc",fallbackDisableSubmit:!1,description:"Yearly budget calculator",iconUrl:"",groupName:"KBR",version:"1.0",properties:{listitems:{type:"string",title:"List Items",description:"List of items to be budgeted"},itemname:{type:"string",title:"Item Name",description:"Singular Item Name such as Cost Center or Budget Code"},currentuser:{type:"string",title:"Context current user email",description:"Please enter the context current user email"},review:{title:"Enable Review Mode",type:"boolean",defaultValue:!1},inputjson:{type:"string",title:"Input JSON",description:"Enter the JSON from previous object here as a string"},dataobj:{type:"object",title:"Object Output",description:"this is for output only you do not need to use it",isValueField:!0,properties:{budgetItems:{type:"array",title:"Budget Items",items:{type:"object",properties:{itemName:{type:"string",title:"Item Name",description:"Name of the budget item"},monthlyValues:{type:"object",title:"Monthly Values",properties:{January:{type:"number",title:"January"},February:{type:"number",title:"February"},March:{type:"number",title:"March"},April:{type:"number",title:"April"},May:{type:"number",title:"May"},June:{type:"number",title:"June"},July:{type:"number",title:"July"},August:{type:"number",title:"August"},September:{type:"number",title:"September"},October:{type:"number",title:"October"},November:{type:"number",title:"November"},December:{type:"number",title:"December"}}},total:{type:"number",title:"Total",description:"Total amount for the budget item"},status:{type:"string",title:"Approval Status",enum:["Rejected","Approved",""],description:"Approval status of the budget item"},comment:{type:"string",title:"Latest Comment",description:"Last recorded comments or notes"},contextuser:{type:"string",title:"Approver Email",description:"Email of the approver"},lastUpdated:{type:"string",title:"Last Updated",description:"Date and time when the item was last updated"},history:{type:"object",title:"History",properties:{status:{type:"string",title:"Approval Status",enum:["Rejected","Approved",""],description:"Approval status of the budget item"},comment:{type:"string",title:"Comment",description:"Last recorded comments or notes"},contextuser:{type:"string",title:"Context user",description:"Email of the approver"},logtime:{type:"string",title:"Log time",description:"Date and time when the item was last updated"}}}}}}}}},events:["ntx-value-change"],standardProperties:{fieldLabel:!0,description:!0,readOnly:!0}}}static get styles(){return n`
      :host {
        display: block;
      }
      .card {
        margin-bottom: 0.5rem;
        width: 100%;
      }
      .currency-input {
        text-align: right;
      }
      .card-header {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
        padding: 0.5rem;
      }
      .badge {
        margin: 0 0.25rem;
      }
      .badge-left {
        grid-column: 1;
        justify-self: start;
      }
      .badge-center {
        grid-column: 2;
        justify-self: center;
      }
      .badge-right {
        grid-column: 3;
        justify-self: end;
      }
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
      }
      .btn-group {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
      }
      .comments-area {
        width: 100%;
        margin-top: 10px;
      }
      .comments-control {
        max-height: none;
        width: 100%;
        padding: .375rem .75rem;
        margin-top: 0.5rem;
        display: block;
      }
      .input-group {
        padding-bottom: 10px;
      }
      .history-area .card {
        width: 100%;
        margin-bottom: 0.5rem;
      }
      .history-area.mt-3 {
        width: 100%;
      }
      @media (max-width: 576px) {
        .month-input {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
      @media (min-width: 577px) and (max-width: 768px) {
        .month-input {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
      @media (min-width: 769px) and (max-width: 992px) {
        .month-input {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
      }
      @media (min-width: 993px) {
        .month-input {
          flex: 0 0 25%;
          max-width: 25%;
        }
      }
    `}constructor(){super(),this.listitems="",this.itemname="",this.reviewmode=!1,this.inputobj={},this.outputobj={},this.itemValues={},this.statusColors={},this.numberFormatter=new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}updated(t){(t.has("listitems")||t.has("inputobj"))&&this.syncDataWithInput()}syncDataWithInput(){const t=this.listitems.split(",").map((t=>t.trim()));Object.keys(this.itemValues).forEach((t=>{this.itemValues[t].displayed=!1})),t.forEach((t=>{if(this.itemValues[t])this.itemValues[t].displayed=!0;else{const e=this.inputobj.budgetItems?.find((e=>e.itemName===t));this.itemValues[t]=e?{...this.initializeMonthlyValues(),...e.monthlyValues,approval:e.approval,comments:e.comments,displayed:!0}:{...this.initializeMonthlyValues(),displayed:!0}}})),this.requestUpdate()}initializeMonthlyValues(){return["January","February","March","April","May","June","July","August","September","October","November","December"].reduce(((t,e)=>(t[e]=null,t)),{})}createHeader(t){const e=this.itemValues[t]?.approval,s=e?P`<div class="badge fs-6 rounded-pill ${"Approved"===e?"bg-success":"bg-danger"}">${e}</div>`:"";return P`
      <div class="card-header d-flex justify-content-between align-items-center">
        <div>
          <div class="badge fs-6 bg-dark">${this.itemname?this.itemname:"Item"}: ${t}</div>
        </div>
        <div>
          ${s}
          <div class="badge fs-6 rounded-pill bg-primary">Total: $${this.calculateTotalForItem(t)}</div>
        </div>
      </div>
    `}createBody(t){return P`
      <div class="card-body d-flex flex-wrap">
        ${this.createMonthInputs(t)}
      </div>
    `}createFooter(t){const e=this.statusColors[t]||{selectedStatus:""},s=(this.itemValues[t]?.comment,`comments-${t}`),i=this.itemValues[t]?.history||[],r=this.itemValues[t]?.showAllHistory||!1,n=this.itemValues[t]?.sortDescending??!0,o=[...i].sort(((t,e)=>n?new Date(e.logtime)-new Date(t.logtime):new Date(t.logtime)-new Date(e.logtime)));return P`
      <div class="card-footer">
        ${this.reviewmode?P`
        <div class="btn-group" role="group" aria-label="Approval Status">
          ${["Rejected","Approved"].map((s=>P`
            <button type="button"
                    class="${this.getButtonClass(s,e.selectedStatus)}"
                    @click="${()=>this.handleApprovalStatusChange(t,s)}">${s}</button>
          `))}
        </div>`:""}
        <div class="comments-area">
          <label for="${s}" class="form-label">Comments:</label>
          <textarea id="${s}" class="form-control comments-control active"
                    placeholder="Enter comments"></textarea>
          <button type="button" class="btn btn-primary mt-2"
                  @click="${()=>this.handleSaveComment(t)}">Save</button>
        </div>
        ${i.length?P`
        <div class="history-area mt-3 w-100">
          <label class="form-label">History:</label>
          ${o.slice(0,r?o.length:1).map((t=>{const e=new Date(t.logtime).toLocaleString("en-GB",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}),s="Approved"===t.status?"bg-success":"Rejected"===t.status?"bg-danger":"bg-info";return P`
              <div class="card mb-1">
                <div class="card-header">
                  <div class="badge fs-6 rounded-pill ${s} badge-left">${t.status}</div>
                  <div class="badge fs-6 bg-dark badge-center">${t.contextuser}</div>
                  <div class="badge fs-6 rounded-pill bg-primary badge-right">${e}</div>
                </div>
                <div class="card-body">
                    ${t.comment}
                </div>
              </div>
            `}))}
          ${i.length>1?P`
          <div class="d-flex justify-content-between align-items-center mt-2">
            <button type="button" class="btn btn-link"
                    @click="${()=>this.toggleHistory(t)}">
              ${r?"Show Less":"Show All History"}
            </button>
            <button type="button" class="btn btn-link"
                    @click="${()=>this.toggleSortOrder(t)}">
              Sort by: ${n?"Oldest First":"Newest First"}
            </button>
          </div>
          `:""}
        </div>
        `:""}
      </div>
    `}autoResize(t){t.target.style.height="auto",t.target.style.height=`${t.target.scrollHeight}px`}getButtonClass(t,e){const s="btn";return e===t?"Approved"===t?`${s} btn-success`:`${s} btn-danger`:"Approved"===t?`${s} btn-outline-success`:`${s} btn-outline-danger`}toggleSortOrder(t){this.itemValues[t].sortDescending=!this.itemValues[t].sortDescending,this.requestUpdate()}toggleHistory(t){this.itemValues[t].showAllHistory=!this.itemValues[t].showAllHistory,this.requestUpdate()}createMonthInputs(t){const e=["January","February","March","April","May","June","July","August","September","October","November","December"],s=this.itemValues[t]||this.initializeMonthlyValues();return P`
      ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(((i,r)=>P`
        <div class="mb-2 px-1 month-input">
          <label for="${i}-${t}" class="form-label">${e[r]}</label>
          <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="text" class="form-control currency-input" id="${i}-${t}"
              aria-label="Amount for ${e[r]}"
              ?disabled="${this.readOnly}"
              placeholder="0.00"
              .value="${null!==s[e[r]]?this.formatNumber(s[e[r]]):""}"
              @blur="${s=>this.handleValueChange(t,e[r],parseFloat(s.target.value.replace(/[^\d.-]/g,""))||null)}">
          </div>
        </div>
      `))}
    `}handleValueChange(t,e,s){this.itemValues[t]||(this.itemValues[t]=this.initializeMonthlyValues()),this.itemValues[t][e]=s,this.updateOutputObject(),this.requestUpdate()}handleApprovalStatusChange(t,e){this.statusColors[t]={borderColor:{Approved:"border-success",Rejected:"border-danger"}[e]||"border-primary",selectedStatus:e},this.itemValues[t]||(this.itemValues[t]=this.initializeMonthlyValues()),this.itemValues[t].status=e,this.itemValues[t].lastUpdated=(new Date).toISOString(),this.updateOutputObject(),this.requestUpdate()}handleSaveComment(t){const e=this.shadowRoot.getElementById(`comments-${t}`),s=e.value.trim();if(s){const i={status:"",comment:s,contextuser:this.currentuser,logtime:(new Date).toISOString()};this.itemValues[t].history||(this.itemValues[t].history=[]);const r=this.itemValues[t].history[this.itemValues[t].history.length-1];this.itemValues[t].status!==r?.status?i.status=this.itemValues[t].status||"":i.status="Update",this.itemValues[t].history.push(i),this.itemValues[t].comment=s,e.value="",this.updateOutputObject(),this.requestUpdate()}}updateOutputObject(){this.outputobj={budgetItems:Object.keys(this.itemValues).filter((t=>this.itemValues[t].displayed)).map((t=>({itemName:t,monthlyValues:this.itemValues[t],total:this.calculateTotalForItem(t),status:this.itemValues[t].status||"",comment:this.itemValues[t].comment||"",contextuser:this.currentuser,lastUpdated:(new Date).toISOString(),history:this.itemValues[t].history||[]})))};const t=new CustomEvent("ntx-value-change",{bubbles:!0,cancelable:!1,composed:!0,detail:this.outputobj});this.dispatchEvent(t)}getButtonClass(t,e){const s="btn";return e===t?"Approved"===t?`${s} btn-success`:`${s} btn-danger`:"Approved"===t?`${s} btn-outline-success`:`${s} btn-outline-danger`}calculateTotalForItem(t){if(!this.itemValues[t])return this.formatNumber(0);const e=Object.values(this.itemValues[t]).filter((t=>null!==t&&"number"==typeof t)).reduce(((t,e)=>t+(parseFloat(e)||0)),0);return this.formatNumber(e)}formatNumber(t){return this.numberFormatter.format(t)}render(){return P`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <div>
        ${this.listitems.split(",").map((t=>P`
          <div class="card">
            ${this.createHeader(t)}
            ${this.createBody(t)}
            ${this.createFooter(t)}
          </div>
        `))}
      </div>
    `}})})();