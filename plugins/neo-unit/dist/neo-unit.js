/*! For license information please see neo-unit.js.LICENSE.txt */
(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t;var l;const a=window,h=a.trustedTypes,u=h?h.emptyScript:"",c=a.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:p};class b extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:d).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:d;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var v;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:b}),(null!==(l=a.reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.6.1");const y=window,$=y.trustedTypes,f=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,_="?"+g,A=`<${_}>`,S=document,x=(t="")=>S.createComment(t),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,P=/>/g,T=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),M=/'/g,H=/"/g,O=/^(?:script|style|textarea|title)$/i,k=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),N=k(1),B=(k(2),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),R=new WeakMap,z=S.createTreeWalker(S,129,null,!1),L=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=w;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,u=0;for(;u<i.length&&(r.lastIndex=u,a=r.exec(i),null!==a);)u=r.lastIndex,r===w?"!--"===a[1]?r=U:void 0!==a[1]?r=P:void 0!==a[2]?(O.test(a[2])&&(n=RegExp("</"+a[2],"g")),r=T):void 0!==a[3]&&(r=T):r===T?">"===a[0]?(r=null!=n?n:w,h=-1):void 0===a[1]?h=-2:(h=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?T:'"'===a[3]?H:M):r===H||r===M?r=T:r===U||r===P?r=w:(r=T,n=void 0);const c=r===T&&t[e+1].startsWith("/>")?" ":"";o+=r===w?i+A:h>=0?(s.push(l),i.slice(0,h)+"$lit$"+i.slice(h)+g+c):i+g+(-2===h?(s.push(void 0),e):c)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==f?f.createHTML(l):l,s]};class I{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[a,h]=L(t,e);if(this.el=I.createElement(a,i),z.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=z.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?G:"@"===e[1]?J:q})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(g),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],x()),z.nextNode(),l.push({type:2,index:++n});s.append(t[e],x())}}}else if(8===s.nodeType)if(s.data===_)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(g,t+1));)l.push({type:7,index:n}),t+=g.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){var n,o,r,l;if(e===B)return e;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=E(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(o=null==a?void 0:a._$AO)||void 0===o||o.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Co)&&void 0!==r?r:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(e=K(t,a._$AS(t,e.values),a,s)),e}class j{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);z.currentNode=n;let o=z.nextNode(),r=0,l=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new D(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new Y(o,this,t)),this.u.push(e),a=s[++l]}r!==(null==a?void 0:a.index)&&(o=z.nextNode(),r++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var n;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),E(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==F&&E(this._$AH)?this._$AA.nextSibling.data=t:this.T(S.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new j(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new I(t)),e}k(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new D(this.O(x()),this.O(x()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=K(this,t,e,0),o=!E(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=K(this,s[i+r],e,r),l===B&&(l=this._$AH[r]),o||(o=!E(l)||l!==this._$AH[r]),l===F?t=F:t!==F&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}const W=$?$.emptyScript:"";class G extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==F?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class J extends q{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:F)===B)return;const s=this._$AH,n=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==F&&(s===F||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Y{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const Q=y.litHtmlPolyfillSupport;var Z,X;null==Q||Q(I,D),(null!==(v=y.litHtmlVersions)&&void 0!==v?v:y.litHtmlVersions=[]).push("2.6.1");class tt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new D(e.insertBefore(x(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return B}}tt.finalized=!0,tt._$litElement$=!0,null===(Z=globalThis.litElementHydrateSupport)||void 0===Z||Z.call(globalThis,{LitElement:tt});const et=globalThis.litElementPolyfillSupport;null==et||et({LitElement:tt}),(null!==(X=globalThis.litElementVersions)&&void 0!==X?X:globalThis.litElementVersions=[]).push("3.2.2");const it={"Meter (m)":{unit:"Meter",symbol:"m"},"Centimeter (cm)":{unit:"Centimeter",symbol:"cm"},"Kilometer (km)":{unit:"Kilometer",symbol:"km"},"Inch (in)":{unit:"Inch",symbol:"in"},"Foot (ft)":{unit:"Foot",symbol:"ft"},"Mile (mi)":{unit:"Mile",symbol:"mi"},"Kilogram (kg)":{unit:"Kilogram",symbol:"kg"},"Gram (g)":{unit:"Gram",symbol:"g"},"Pound (lb)":{unit:"Pound",symbol:"lb"},"Ounce (oz)":{unit:"Ounce",symbol:"oz"},"Second (s)":{unit:"Second",symbol:"s"},"Minute (min)":{unit:"Minute",symbol:"min"},"Hour (hr)":{unit:"Hour",symbol:"hr"},"Day (day)":{unit:"Day",symbol:"day"},"Liter (L)":{unit:"Liter",symbol:"L"},"Milliliter (mL)":{unit:"Milliliter",symbol:"mL"},"Cubic Meter (m³)":{unit:"Cubic Meter",symbol:"m³"},"Cubic Centimeter (cm³)":{unit:"Cubic Centimeter",symbol:"cm³"},"Cubic Inch (in³)":{unit:"Cubic Inch",symbol:"in³"},"Cubic Foot (ft³)":{unit:"Cubic Foot",symbol:"ft³"},"Cubic Yard (yd³)":{unit:"Cubic Yard",symbol:"yd³"},"Fluid Ounce (fl oz)":{unit:"Fluid Ounce",symbol:"fl oz"},"Pint (pt)":{unit:"Pint",symbol:"pt"},"Quart (qt)":{unit:"Quart",symbol:"qt"},"Gallon (gal)":{unit:"Gallon",symbol:"gal"},"Celsius (°C)":{unit:"Celsius",symbol:"°C"},"Fahrenheit (°F)":{unit:"Fahrenheit",symbol:"°F"},"Kelvin (K)":{unit:"Kelvin",symbol:"K"},"Square Meter (m²)":{unit:"Square Meter",symbol:"m²"},"Square Kilometer (km²)":{unit:"Square Kilometer",symbol:"km²"},"Square Centimeter (cm²)":{unit:"Square Centimeter",symbol:"cm²"},"Square Inch (in²)":{unit:"Square Inch",symbol:"in²"},"Square Foot (ft²)":{unit:"Square Foot",symbol:"ft²"},"Square Yard (yd²)":{unit:"Square Yard",symbol:"yd²"},"Acre (ac)":{unit:"Acre",symbol:"ac"},"Hectare (ha)":{unit:"Hectare",symbol:"ha"},"Metric Ton (t)":{unit:"Metric Ton",symbol:"t"},"Short Ton (US ton)":{unit:"Short Ton",symbol:"US ton"},"Long Ton (Imperial ton)":{unit:"Long Ton",symbol:"Imperial ton"},"Astronomical Unit (AU)":{unit:"Astronomical Unit",symbol:"AU"},"Bit (b)":{unit:"Bit",symbol:"b"},"Byte (B)":{unit:"Byte",symbol:"B"},"Kilobyte (KB)":{unit:"Kilobyte",symbol:"KB"},"Megabyte (MB)":{unit:"Megabyte",symbol:"MB"},"Gigabyte (GB)":{unit:"Gigabyte",symbol:"GB"},"Terabyte (TB)":{unit:"Terabyte",symbol:"TB"},"Joule (J)":{unit:"Joule",symbol:"J"},"Calorie (cal)":{unit:"Calorie",symbol:"cal"},"Kilowatt-hour (kWh)":{unit:"Kilowatt-hour",symbol:"kWh"},"Watt (W)":{unit:"Watt",symbol:"W"},"Kilowatt (kW)":{unit:"Kilowatt",symbol:"kW"},"Horsepower (hp)":{unit:"Horsepower",symbol:"hp"},"Pascal (Pa)":{unit:"Pascal",symbol:"Pa"},"Bar (bar)":{unit:"Bar",symbol:"bar"},"Atmosphere (atm)":{unit:"Atmosphere",symbol:"atm"},"Ampere (A)":{unit:"Ampere",symbol:"A"},"Volt (V)":{unit:"Volt",symbol:"V"},"Ohm (Ω)":{unit:"Ohm",symbol:"Ω"},"Electronvolt (eV)":{unit:"Electronvolt",symbol:"eV"},"British Thermal Unit (BTU)":{unit:"British Thermal Unit",symbol:"BTU"}};customElements.define("neo-unit",class extends tt{static getMetaConfig(){return{controlName:"neo-unit",fallbackDisableSubmit:!1,description:"Control for diplaying units of measurement",iconUrl:"https://jsdenintex.github.io/plugins/neo-unit/dist/unit-icon.svg",groupName:"Custom controls",version:"1.0",properties:{unittype:{title:"Choice field",type:"string",enum:Object.keys(it).map((t=>`${t}`)),verticalLayout:!0,defaultValue:"Meter (m)"},unitvalue:{type:"number",title:"Unit value",description:"Decimal unit value",isValueField:!0,staticProperties:!0},decimalplaces:{type:"integer",title:"Decimal places",description:"enter 0 for none, 1 for .0, 2 for .01 etc.",defaultValue:0}},standardProperties:{fieldLabel:!0,description:!0},events:["ntx-value-change"]}}static properties={unittype:"Meter (m)",unitvalue:"",decimalplaces:0};constructor(){super(),this.unittype="",this.unitvalue="",this.decimalplaces=0}static get styles(){const{cssRules:t}=document.styleSheets[0];return[o([Object.values(t).map((t=>t.cssText)).join("\n")]),o`
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
        
        .neo-unit-control .input-unit-group-append .neo-unit-btn {
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
          line-height: var(--bs-body-line-height); /* Add this line to inherit line-height */
          min-height:35px;
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
        
      .neo-unit-control .nx-zinc-control-input {
          flex: 1;
      }

      .neo-unit-control .ntx-simple-number {
        width: 100%; /* Set the width of ntx-simple-number to 100% */
        box-sizing: border-box; /* Ensure the box model includes padding and border */
        display: flex; /* Enable flex layout for ntx-simple-number */
      }

      .neo-unit-control > div.nx-zinc-control-input > ntx-simple-number > input{
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
        width: 100%; /* Set the width of the input to 100% */
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
      `]}onChange(t){const e=parseFloat(t.target.value),i=this.decimalplaces>=0?this.decimalplaces:0,s=isNaN(e)?"":e.toFixed(i);t.target.value=s;const n=new CustomEvent("ntx-value-change",{bubbles:!0,cancelable:!1,composed:!0,detail:e});this.dispatchEvent(n)}render(){const t=this.decimalplaces>=0?this.decimalplaces:0,e=parseFloat(0).toFixed(t),i=""!==this.unitvalue?parseFloat(this.unitvalue).toFixed(t):"";return N`
      <div class="neo-unit-control">
        <div class="input-unit-group-append">
          <button type="button" class="neo-btn-input-icon neo-unit-btn">
            <span>${it[this.unittype].symbol}</span>
          </button>
        </div>
        <div class="nx-zinc-control-input">
          <ntx-simple-number>
            <input type="text" 
              data-simple-control="true"
              ntxmaskablenumberinputvalueaccessor=""
              class="form-control nx-theme-input-1 ng-untouched ng-pristine ng-valid"
              inputmode="decimal"
              decimalplaces=${this.decimalplaces}
              placeholder=${e}
              value=${i}
              @blur=${this.onChange}
            >
          </ntx-simple-number>
        </div>
      </div>
    `}})})();