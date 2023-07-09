/*! For license information please see neo-password.js.LICENSE.txt */
(()=>{var t={765:function(t,e,i){t=i.nmd(t),function(t,e,s){"use strict";var n=function(t,e,i){i=r.extend({},r.options,i);var s=r.runValidations(t,e,i);if(s.some((function(t){return r.isPromise(t.error)})))throw new Error("Use validate.async if you want support for promises");return n.processValidationResults(s,i)},r=n;r.extend=function(t){return[].slice.call(arguments,1).forEach((function(e){for(var i in e)t[i]=e[i]})),t},r.extend(n,{version:{major:0,minor:13,patch:1,metadata:null,toString:function(){var t=r.format("%{major}.%{minor}.%{patch}",r.version);return r.isEmpty(r.version.metadata)||(t+="+"+r.version.metadata),t}},Promise:"undefined"!=typeof Promise?Promise:null,EMPTY_STRING_REGEXP:/^\s*$/,runValidations:function(t,e,i){var s,n,o,a,l,u,h,c=[];for(s in(r.isDomElement(t)||r.isJqueryElement(t))&&(t=r.collectFormValues(t)),e)for(n in o=r.getDeepObjectValue(t,s),a=r.result(e[s],o,t,s,i,e)){if(!(l=r.validators[n]))throw h=r.format("Unknown validator %{name}",{name:n}),new Error(h);u=a[n],(u=r.result(u,o,t,s,i,e))&&c.push({attribute:s,value:o,validator:n,globalOptions:i,attributes:t,options:u,error:l.call(l,o,u,s,t,i)})}return c},processValidationResults:function(t,e){t=r.pruneEmptyErrors(t,e),t=r.expandMultipleErrors(t,e),t=r.convertErrorMessages(t,e);var i=e.format||"grouped";if("function"!=typeof r.formatters[i])throw new Error(r.format("Unknown format %{format}",e));return t=r.formatters[i](t),r.isEmpty(t)?void 0:t},async:function(t,e,i){var s=(i=r.extend({},r.async.options,i)).wrapErrors||function(t){return t};!1!==i.cleanAttributes&&(t=r.cleanAttributes(t,e));var n=r.runValidations(t,e,i);return new r.Promise((function(o,a){r.waitForResults(n).then((function(){var l=r.processValidationResults(n,i);l?a(new s(l,i,t,e)):o(t)}),(function(t){a(t)}))}))},single:function(t,e,i){return i=r.extend({},r.single.options,i,{format:"flat",fullMessages:!1}),r({single:t},{single:e},i)},waitForResults:function(t){return t.reduce((function(t,e){return r.isPromise(e.error)?t.then((function(){return e.error.then((function(t){e.error=t||null}))})):t}),new r.Promise((function(t){t()})))},result:function(t){var e=[].slice.call(arguments,1);return"function"==typeof t&&(t=t.apply(null,e)),t},isNumber:function(t){return"number"==typeof t&&!isNaN(t)},isFunction:function(t){return"function"==typeof t},isInteger:function(t){return r.isNumber(t)&&t%1==0},isBoolean:function(t){return"boolean"==typeof t},isObject:function(t){return t===Object(t)},isDate:function(t){return t instanceof Date},isDefined:function(t){return null!=t},isPromise:function(t){return!!t&&r.isFunction(t.then)},isJqueryElement:function(t){return t&&r.isString(t.jquery)},isDomElement:function(t){return!!t&&!(!t.querySelectorAll||!t.querySelector)&&(!(!r.isObject(document)||t!==document)||("object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName))},isEmpty:function(t){var e;if(!r.isDefined(t))return!0;if(r.isFunction(t))return!1;if(r.isString(t))return r.EMPTY_STRING_REGEXP.test(t);if(r.isArray(t))return 0===t.length;if(r.isDate(t))return!1;if(r.isObject(t)){for(e in t)return!1;return!0}return!1},format:r.extend((function(t,e){return r.isString(t)?t.replace(r.format.FORMAT_REGEXP,(function(t,i,s){return"%"===i?"%{"+s+"}":String(e[s])})):t}),{FORMAT_REGEXP:/(%?)%\{([^\}]+)\}/g}),prettify:function(t){return r.isNumber(t)?100*t%1==0?""+t:parseFloat(Math.round(100*t)/100).toFixed(2):r.isArray(t)?t.map((function(t){return r.prettify(t)})).join(", "):r.isObject(t)?r.isDefined(t.toString)?t.toString():JSON.stringify(t):(t=""+t).replace(/([^\s])\.([^\s])/g,"$1 $2").replace(/\\+/g,"").replace(/[_-]/g," ").replace(/([a-z])([A-Z])/g,(function(t,e,i){return e+" "+i.toLowerCase()})).toLowerCase()},stringifyValue:function(t,e){return(e&&e.prettify||r.prettify)(t)},isString:function(t){return"string"==typeof t},isArray:function(t){return"[object Array]"==={}.toString.call(t)},isHash:function(t){return r.isObject(t)&&!r.isArray(t)&&!r.isFunction(t)},contains:function(t,e){return!!r.isDefined(t)&&(r.isArray(t)?-1!==t.indexOf(e):e in t)},unique:function(t){return r.isArray(t)?t.filter((function(t,e,i){return i.indexOf(t)==e})):t},forEachKeyInKeypath:function(t,e,i){if(r.isString(e)){var s,n="",o=!1;for(s=0;s<e.length;++s)switch(e[s]){case".":o?(o=!1,n+="."):(t=i(t,n,!1),n="");break;case"\\":o?(o=!1,n+="\\"):o=!0;break;default:o=!1,n+=e[s]}return i(t,n,!0)}},getDeepObjectValue:function(t,e){if(r.isObject(t))return r.forEachKeyInKeypath(t,e,(function(t,e){if(r.isObject(t))return t[e]}))},collectFormValues:function(t,e){var i,s,n,o,a,l,u={};if(r.isJqueryElement(t)&&(t=t[0]),!t)return u;for(e=e||{},o=t.querySelectorAll("input[name], textarea[name]"),i=0;i<o.length;++i)if(n=o.item(i),!r.isDefined(n.getAttribute("data-ignored"))){var h=n.name.replace(/\./g,"\\\\.");l=r.sanitizeFormValue(n.value,e),"number"===n.type?l=l?+l:null:"checkbox"===n.type?n.attributes.value?n.checked||(l=u[h]||null):l=n.checked:"radio"===n.type&&(n.checked||(l=u[h]||null)),u[h]=l}for(o=t.querySelectorAll("select[name]"),i=0;i<o.length;++i)if(n=o.item(i),!r.isDefined(n.getAttribute("data-ignored"))){if(n.multiple)for(s in l=[],n.options)(a=n.options[s])&&a.selected&&l.push(r.sanitizeFormValue(a.value,e));else{var c=void 0!==n.options[n.selectedIndex]?n.options[n.selectedIndex].value:"";l=r.sanitizeFormValue(c,e)}u[n.name]=l}return u},sanitizeFormValue:function(t,e){return e.trim&&r.isString(t)&&(t=t.trim()),!1!==e.nullify&&""===t?null:t},capitalize:function(t){return r.isString(t)?t[0].toUpperCase()+t.slice(1):t},pruneEmptyErrors:function(t){return t.filter((function(t){return!r.isEmpty(t.error)}))},expandMultipleErrors:function(t){var e=[];return t.forEach((function(t){r.isArray(t.error)?t.error.forEach((function(i){e.push(r.extend({},t,{error:i}))})):e.push(t)})),e},convertErrorMessages:function(t,e){var i=[],s=(e=e||{}).prettify||r.prettify;return t.forEach((function(t){var n=r.result(t.error,t.value,t.attribute,t.options,t.attributes,t.globalOptions);r.isString(n)?("^"===n[0]?n=n.slice(1):!1!==e.fullMessages&&(n=r.capitalize(s(t.attribute))+" "+n),n=n.replace(/\\\^/g,"^"),n=r.format(n,{value:r.stringifyValue(t.value,e)}),i.push(r.extend({},t,{error:n}))):i.push(t)})),i},groupErrorsByAttribute:function(t){var e={};return t.forEach((function(t){var i=e[t.attribute];i?i.push(t):e[t.attribute]=[t]})),e},flattenErrorsToArray:function(t){return t.map((function(t){return t.error})).filter((function(t,e,i){return i.indexOf(t)===e}))},cleanAttributes:function(t,e){function i(t,e,i){return r.isObject(t[e])?t[e]:t[e]=!!i||{}}return r.isObject(e)&&r.isObject(t)?function t(e,i){if(!r.isObject(e))return e;var s,n,o=r.extend({},e);for(n in e)s=i[n],r.isObject(s)?o[n]=t(o[n],s):s||delete o[n];return o}(t,e=function(t){var e,s={};for(e in t)t[e]&&r.forEachKeyInKeypath(s,e,i);return s}(e)):{}},exposeModule:function(t,e,i,s,n){i?(s&&s.exports&&(i=s.exports=t),i.validate=t):(e.validate=t,t.isFunction(n)&&n.amd&&n([],(function(){return t})))},warn:function(t){"undefined"!=typeof console&&console.warn&&console.warn("[validate.js] "+t)},error:function(t){"undefined"!=typeof console&&console.error&&console.error("[validate.js] "+t)}}),n.validators={presence:function(t,e){if(!1!==(e=r.extend({},this.options,e)).allowEmpty?!r.isDefined(t):r.isEmpty(t))return e.message||this.message||"can't be blank"},length:function(t,e,i){if(r.isDefined(t)){var s,n=(e=r.extend({},this.options,e)).is,o=e.maximum,a=e.minimum,l=[],u=(t=(e.tokenizer||function(t){return t})(t)).length;return r.isNumber(u)?(r.isNumber(n)&&u!==n&&(s=e.wrongLength||this.wrongLength||"is the wrong length (should be %{count} characters)",l.push(r.format(s,{count:n}))),r.isNumber(a)&&u<a&&(s=e.tooShort||this.tooShort||"is too short (minimum is %{count} characters)",l.push(r.format(s,{count:a}))),r.isNumber(o)&&u>o&&(s=e.tooLong||this.tooLong||"is too long (maximum is %{count} characters)",l.push(r.format(s,{count:o}))),l.length>0?e.message||l:void 0):e.message||this.notValid||"has an incorrect length"}},numericality:function(t,e,i,s,n){if(r.isDefined(t)){var o,a,l=[],u={greaterThan:function(t,e){return t>e},greaterThanOrEqualTo:function(t,e){return t>=e},equalTo:function(t,e){return t===e},lessThan:function(t,e){return t<e},lessThanOrEqualTo:function(t,e){return t<=e},divisibleBy:function(t,e){return t%e==0}},h=(e=r.extend({},this.options,e)).prettify||n&&n.prettify||r.prettify;if(r.isString(t)&&e.strict){var c="^-?(0|[1-9]\\d*)";if(e.onlyInteger||(c+="(\\.\\d+)?"),c+="$",!new RegExp(c).test(t))return e.message||e.notValid||this.notValid||this.message||"must be a valid number"}if(!0!==e.noStrings&&r.isString(t)&&!r.isEmpty(t)&&(t=+t),!r.isNumber(t))return e.message||e.notValid||this.notValid||this.message||"is not a number";if(e.onlyInteger&&!r.isInteger(t))return e.message||e.notInteger||this.notInteger||this.message||"must be an integer";for(o in u)if(a=e[o],r.isNumber(a)&&!u[o](t,a)){var d="not"+r.capitalize(o),p=e[d]||this[d]||this.message||"must be %{type} %{count}";l.push(r.format(p,{count:a,type:h(o)}))}return e.odd&&t%2!=1&&l.push(e.notOdd||this.notOdd||this.message||"must be odd"),e.even&&t%2!=0&&l.push(e.notEven||this.notEven||this.message||"must be even"),l.length?e.message||l:void 0}},datetime:r.extend((function(t,e){if(!r.isFunction(this.parse)||!r.isFunction(this.format))throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");if(r.isDefined(t)){var i,s=[],n=(e=r.extend({},this.options,e)).earliest?this.parse(e.earliest,e):NaN,o=e.latest?this.parse(e.latest,e):NaN;return t=this.parse(t,e),isNaN(t)||e.dateOnly&&t%864e5!=0?(i=e.notValid||e.message||this.notValid||"must be a valid date",r.format(i,{value:arguments[0]})):(!isNaN(n)&&t<n&&(i=e.tooEarly||e.message||this.tooEarly||"must be no earlier than %{date}",i=r.format(i,{value:this.format(t,e),date:this.format(n,e)}),s.push(i)),!isNaN(o)&&t>o&&(i=e.tooLate||e.message||this.tooLate||"must be no later than %{date}",i=r.format(i,{date:this.format(o,e),value:this.format(t,e)}),s.push(i)),s.length?r.unique(s):void 0)}}),{parse:null,format:null}),date:function(t,e){return e=r.extend({},e,{dateOnly:!0}),r.validators.datetime.call(r.validators.datetime,t,e)},format:function(t,e){(r.isString(e)||e instanceof RegExp)&&(e={pattern:e});var i,s=(e=r.extend({},this.options,e)).message||this.message||"is invalid",n=e.pattern;if(r.isDefined(t))return r.isString(t)?(r.isString(n)&&(n=new RegExp(e.pattern,e.flags)),(i=n.exec(t))&&i[0].length==t.length?void 0:s):s},inclusion:function(t,e){if(r.isDefined(t)&&(r.isArray(e)&&(e={within:e}),e=r.extend({},this.options,e),!r.contains(e.within,t))){var i=e.message||this.message||"^%{value} is not included in the list";return r.format(i,{value:t})}},exclusion:function(t,e){if(r.isDefined(t)&&(r.isArray(e)&&(e={within:e}),e=r.extend({},this.options,e),r.contains(e.within,t))){var i=e.message||this.message||"^%{value} is restricted";return r.isString(e.within[t])&&(t=e.within[t]),r.format(i,{value:t})}},email:r.extend((function(t,e){var i=(e=r.extend({},this.options,e)).message||this.message||"is not a valid email";if(r.isDefined(t))return r.isString(t)&&this.PATTERN.exec(t)?void 0:i}),{PATTERN:/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i}),equality:function(t,e,i,s,n){if(r.isDefined(t)){r.isString(e)&&(e={attribute:e});var o=(e=r.extend({},this.options,e)).message||this.message||"is not equal to %{attribute}";if(r.isEmpty(e.attribute)||!r.isString(e.attribute))throw new Error("The attribute must be a non empty string");var a=r.getDeepObjectValue(s,e.attribute),l=e.comparator||function(t,e){return t===e},u=e.prettify||n&&n.prettify||r.prettify;return l(t,a,e,i,s)?void 0:r.format(o,{attribute:u(e.attribute)})}},url:function(t,e){if(r.isDefined(t)){var i=(e=r.extend({},this.options,e)).message||this.message||"is not a valid url",s=e.schemes||this.schemes||["http","https"],n=e.allowLocal||this.allowLocal||!1,o=e.allowDataUrl||this.allowDataUrl||!1;if(!r.isString(t))return i;var a="^(?:(?:"+s.join("|")+")://)(?:\\S+(?::\\S*)?@)?(?:",l="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";return n?l+="?":a+="(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})",a+="(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"+l+")(?::\\d{2,5})?(?:[/?#]\\S*)?$",o&&(a="(?:"+a+")|(?:^data:(?:\\w+\\/[-+.\\w]+(?:;[\\w=]+)*)?(?:;base64)?,[A-Za-z0-9-_.!~\\*'();\\/?:@&=+$,%]*$)"),new RegExp(a,"i").exec(t)?void 0:i}},type:r.extend((function(t,e,i,s,n){if(r.isString(e)&&(e={type:e}),r.isDefined(t)){var o,a=r.extend({},this.options,e),l=a.type;if(!r.isDefined(l))throw new Error("No type was specified");if(o=r.isFunction(l)?l:this.types[l],!r.isFunction(o))throw new Error("validate.validators.type.types."+l+" must be a function.");if(!o(t,a,i,s,n)){var u=e.message||this.messages[l]||this.message||a.message||(r.isFunction(l)?"must be of the correct type":"must be of type %{type}");return r.isFunction(u)&&(u=u(t,e,i,s,n)),r.format(u,{attribute:r.prettify(i),type:l})}}}),{types:{object:function(t){return r.isObject(t)&&!r.isArray(t)},array:r.isArray,integer:r.isInteger,number:r.isNumber,string:r.isString,date:r.isDate,boolean:r.isBoolean},messages:{}})},n.formatters={detailed:function(t){return t},flat:r.flattenErrorsToArray,grouped:function(t){var e;for(e in t=r.groupErrorsByAttribute(t))t[e]=r.flattenErrorsToArray(t[e]);return t},constraint:function(t){var e;for(e in t=r.groupErrorsByAttribute(t))t[e]=t[e].map((function(t){return t.validator})).sort();return t}},n.exposeModule(n,this,t,e,i.amdD)}.call(this,e,t,i.amdD)}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(r.exports,r,r.exports,i),r.loaded=!0,r.exports}i.amdD=function(){throw new Error("define cannot be used indirect")},i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=n.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(i,t,s)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t;var l;const u=window,h=u.trustedTypes,c=h?h.emptyScript:"",d=u.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),m={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:f};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=m){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||m}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{e?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((e=>{const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=m){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}var g;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==d||d({ReactiveElement:v}),(null!==(l=u.reactiveElementVersions)&&void 0!==l?l:u.reactiveElementVersions=[]).push("1.6.1");const y=window,b=y.trustedTypes,$=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,A="?"+_,E=`<${A}>`,x=document,w=(t="")=>x.createComment(t),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,O=/>/g,M=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),T=/'/g,R=/"/g,U=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),D=j(1),V=(j(2),Symbol.for("lit-noChange")),H=Symbol.for("lit-nothing"),z=new WeakMap,k=x.createTreeWalker(x,129,null,!1),L=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=P;for(let e=0;e<i;e++){const i=t[e];let a,l,u=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===P?"!--"===l[1]?o=N:void 0!==l[1]?o=O:void 0!==l[2]?(U.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=M):void 0!==l[3]&&(o=M):o===M?">"===l[0]?(o=null!=n?n:P,u=-1):void 0===l[1]?u=-2:(u=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?M:'"'===l[3]?R:T):o===R||o===T?o=M:o===N||o===O?o=P:(o=M,n=void 0);const c=o===M&&t[e+1].startsWith("/>")?" ":"";r+=o===P?i+E:u>=0?(s.push(a),i.slice(0,u)+"$lit$"+i.slice(u)+_+c):i+_+(-2===u?(s.push(void 0),e):c)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==$?$.createHTML(a):a,s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,u]=L(t,e);if(this.el=F.createElement(l,i),k.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=k.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(_)){const i=u[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(_),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?G:"?"===e[1]?W:"@"===e[1]?Z:K})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(U.test(s.tagName)){const t=s.textContent.split(_),e=t.length-1;if(e>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],w()),k.nextNode(),a.push({type:2,index:++n});s.append(t[e],w())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(_,t+1));)a.push({type:7,index:n}),t+=_.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){var n,r,o,a;if(e===V)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const u=S(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==u&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===u?l=void 0:(l=new u(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,s)),e}class q{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);k.currentNode=n;let r=k.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new B(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new X(r,this,t)),this.u.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=k.nextNode(),o++)}return n}p(t){let e=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class B{constructor(t,e,i,s){var n;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),S(t)?t===H||null==t||""===t?(this._$AH!==H&&this._$AR(),this._$AH=H):t!==this._$AH&&t!==V&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==H&&S(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.p(i);else{const t=new q(n,this),e=t.v(this.options);t.p(i),this.T(e),this._$AH=t}}_$AC(t){let e=z.get(t.strings);return void 0===e&&z.set(t.strings,e=new F(t)),e}k(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new B(this.O(w()),this.O(w()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,s,n){this.type=1,this._$AH=H,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=I(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=I(this,s[i+o],e,o),a===V&&(a=this._$AH[o]),r||(r=!S(a)||a!==this._$AH[o]),a===H?t=H:t!==H&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class G extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===H?void 0:t}}const J=b?b.emptyScript:"";class W extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==H?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Z extends K{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:H)===V)return;const s=this._$AH,n=t===H&&s!==H||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==H&&(s===H||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}const Y=y.litHtmlPolyfillSupport;var Q,tt;null==Y||Y(F,B),(null!==(g=y.litHtmlVersions)&&void 0!==g?g:y.litHtmlVersions=[]).push("2.6.1");class et extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new B(e.insertBefore(w(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return V}}et.finalized=!0,et._$litElement$=!0,null===(Q=globalThis.litElementHydrateSupport)||void 0===Q||Q.call(globalThis,{LitElement:et});const it=globalThis.litElementPolyfillSupport;null==it||it({LitElement:et}),(null!==(tt=globalThis.litElementVersions)&&void 0!==tt?tt:globalThis.litElementVersions=[]).push("3.2.2");var st=i(765),nt=i.n(st);customElements.define("neo-password",class extends et{static getMetaConfig(){return{controlName:"neo-password",fallbackDisableSubmit:!1,description:"",iconUrl:"https://jsdenintex.github.io/plugins/neo-password/dist/lock.svg",groupName:"Custom controls",version:"1.0",properties:{passMin:{title:"Minimum Password Length",description:"From 8 - 128",type:"integer",minimum:8,maximum:128,defaultValue:8},passMax:{title:"Maximum Password Length",description:"From 8 - 128",type:"integer",minimum:8,maximum:128,defaultValue:8},boolCaps:{title:"Require capital letters?",type:"boolean",defaultValue:!0},boolNum:{title:"Require Numbers?",type:"boolean",defaultValue:!0},boolSC:{title:"Require special characters?",type:"boolean",defaultValue:!0},passStr:{title:"Show password strength bar?",type:"boolean",defaultValue:!0},passVal:{title:"Password Output",description:"Maximum 255 characters",type:"string",maxLength:255,isValueField:!0}},events:["ntx-value-change"],standardProperties:{fieldLabel:!0,description:!0}}}static properties={passMin:"",passMax:"",boolCaps:!1,boolNum:!1,boolSC:!1,passStr:!1};constructor(){super(),this.passMin=8,this.passMax=128,this.boolCaps=!1,this.boolNum=!1,this.boolSC=!1,this.passStr=!1}static get styles(){return o`
      :host {
        display: block;
      }

      .strength-bar {
        height: 10px;
        background-color: #e6e6e6;
        margin-top: 5px;
      }

      .strength-level {
        height: 100%;
      }
    `}render(){return D`
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        class="form-control"
        minlength="${this.passMin}"
        maxlength="${this.passMax}"
        required
        @input="${this.handlePasswordInput}"
      />

      <div id="passwordHelpBlock" class="form-text">
        Your password must be at least ${this.passMin} characters long and contain
        ${this.boolCaps?"uppercase letters, ":""}
        ${this.boolCaps&&this.boolNum?"numbers, and ":""}
        ${this.boolNum?"numbers, ":""}
        ${this.boolNum&&this.boolSC?"special characters, and ":""}
        ${this.boolSC?"special characters":""}.
      </div>

      ${this.passStr?D`
        <div class="strength-bar">
          <div class="strength-level" style="width: ${this.calculatePasswordStrength()}%"></div>
        </div>
      `:""}
    `}calculatePasswordStrength(t){let e=0;t&&t.length>=this.passMin&&t.length<=this.passMax&&(e+=20);const i=[this.boolCaps,this.boolNum,this.boolSC],s=i.filter((t=>t)).length/i.length;return 1===s?e+=40:s>0&&(e+=20),e}handlePasswordInput(t){const e=t.target.value,i=this.calculatePasswordStrength(e);this.shadowRoot.querySelector(".strength-level").style.width=`${i}%`;const s=new CustomEvent("ntx-value-change",{bubbles:!0,cancelable:!1,composed:!0,detail:e});this.dispatchEvent(s)}validateForm(){const t=this.shadowRoot.querySelector("#password"),e=nt().single(t.value,{presence:!0,length:{minimum:this.passMin,maximum:this.passMax,tooShort:`Password must be at least ${this.passMin} characters long`,tooLong:`Password must be at most ${this.passMax} characters long`},...this.boolCaps&&{format:{pattern:"[A-Z]",message:"Password must contain at least one uppercase letter"}},...this.boolNum&&{format:{pattern:"[0-9]",message:"Password must contain at least one number"}},...this.boolSC&&{format:{pattern:"[!@#$%^&*]",message:"Password must contain at least one special character"}}});if(e){const i=e[0];t.setCustomValidity(i)}else t.setCustomValidity("")}firstUpdated(){this.shadowRoot.querySelector("#password").addEventListener("input",this.validateForm.bind(this))}})})()})();