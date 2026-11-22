(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function tN(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var uS={exports:{}},Cd={},cS={exports:{}},ue={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wu=Symbol.for("react.element"),nN=Symbol.for("react.portal"),rN=Symbol.for("react.fragment"),iN=Symbol.for("react.strict_mode"),sN=Symbol.for("react.profiler"),oN=Symbol.for("react.provider"),aN=Symbol.for("react.context"),lN=Symbol.for("react.forward_ref"),uN=Symbol.for("react.suspense"),cN=Symbol.for("react.memo"),hN=Symbol.for("react.lazy"),Ew=Symbol.iterator;function dN(n){return n===null||typeof n!="object"?null:(n=Ew&&n[Ew]||n["@@iterator"],typeof n=="function"?n:null)}var hS={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},dS=Object.assign,fS={};function oa(n,e,t){this.props=n,this.context=e,this.refs=fS,this.updater=t||hS}oa.prototype.isReactComponent={};oa.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};oa.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function pS(){}pS.prototype=oa.prototype;function Pg(n,e,t){this.props=n,this.context=e,this.refs=fS,this.updater=t||hS}var xg=Pg.prototype=new pS;xg.constructor=Pg;dS(xg,oa.prototype);xg.isPureReactComponent=!0;var Iw=Array.isArray,mS=Object.prototype.hasOwnProperty,Ng={current:null},gS={key:!0,ref:!0,__self:!0,__source:!0};function _S(n,e,t){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)mS.call(e,r)&&!gS.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(n&&n.defaultProps)for(r in a=n.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:wu,type:n,key:s,ref:o,props:i,_owner:Ng.current}}function fN(n,e){return{$$typeof:wu,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function bg(n){return typeof n=="object"&&n!==null&&n.$$typeof===wu}function pN(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Tw=/\/+/g;function ep(n,e){return typeof n=="object"&&n!==null&&n.key!=null?pN(""+n.key):e.toString(36)}function $c(n,e,t,r,i){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case wu:case nN:o=!0}}if(o)return o=n,i=i(o),n=r===""?"."+ep(o,0):r,Iw(i)?(t="",n!=null&&(t=n.replace(Tw,"$&/")+"/"),$c(i,e,t,"",function(c){return c})):i!=null&&(bg(i)&&(i=fN(i,t+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Tw,"$&/")+"/")+n)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Iw(n))for(var a=0;a<n.length;a++){s=n[a];var l=r+ep(s,a);o+=$c(s,e,t,l,i)}else if(l=dN(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=r+ep(s,a++),o+=$c(s,e,t,l,i);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function mc(n,e,t){if(n==null)return n;var r=[],i=0;return $c(n,r,"","",function(s){return e.call(t,s,i++)}),r}function mN(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var jt={current:null},qc={transition:null},gN={ReactCurrentDispatcher:jt,ReactCurrentBatchConfig:qc,ReactCurrentOwner:Ng};function yS(){throw Error("act(...) is not supported in production builds of React.")}ue.Children={map:mc,forEach:function(n,e,t){mc(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return mc(n,function(){e++}),e},toArray:function(n){return mc(n,function(e){return e})||[]},only:function(n){if(!bg(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};ue.Component=oa;ue.Fragment=rN;ue.Profiler=sN;ue.PureComponent=Pg;ue.StrictMode=iN;ue.Suspense=uN;ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=gN;ue.act=yS;ue.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var r=dS({},n.props),i=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Ng.current),e.key!==void 0&&(i=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)mS.call(e,l)&&!gS.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:wu,type:n.type,key:i,ref:s,props:r,_owner:o}};ue.createContext=function(n){return n={$$typeof:aN,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:oN,_context:n},n.Consumer=n};ue.createElement=_S;ue.createFactory=function(n){var e=_S.bind(null,n);return e.type=n,e};ue.createRef=function(){return{current:null}};ue.forwardRef=function(n){return{$$typeof:lN,render:n}};ue.isValidElement=bg;ue.lazy=function(n){return{$$typeof:hN,_payload:{_status:-1,_result:n},_init:mN}};ue.memo=function(n,e){return{$$typeof:cN,type:n,compare:e===void 0?null:e}};ue.startTransition=function(n){var e=qc.transition;qc.transition={};try{n()}finally{qc.transition=e}};ue.unstable_act=yS;ue.useCallback=function(n,e){return jt.current.useCallback(n,e)};ue.useContext=function(n){return jt.current.useContext(n)};ue.useDebugValue=function(){};ue.useDeferredValue=function(n){return jt.current.useDeferredValue(n)};ue.useEffect=function(n,e){return jt.current.useEffect(n,e)};ue.useId=function(){return jt.current.useId()};ue.useImperativeHandle=function(n,e,t){return jt.current.useImperativeHandle(n,e,t)};ue.useInsertionEffect=function(n,e){return jt.current.useInsertionEffect(n,e)};ue.useLayoutEffect=function(n,e){return jt.current.useLayoutEffect(n,e)};ue.useMemo=function(n,e){return jt.current.useMemo(n,e)};ue.useReducer=function(n,e,t){return jt.current.useReducer(n,e,t)};ue.useRef=function(n){return jt.current.useRef(n)};ue.useState=function(n){return jt.current.useState(n)};ue.useSyncExternalStore=function(n,e,t){return jt.current.useSyncExternalStore(n,e,t)};ue.useTransition=function(){return jt.current.useTransition()};ue.version="18.3.1";cS.exports=ue;var ne=cS.exports;const _N=tN(ne);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yN=ne,vN=Symbol.for("react.element"),wN=Symbol.for("react.fragment"),EN=Object.prototype.hasOwnProperty,IN=yN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,TN={key:!0,ref:!0,__self:!0,__source:!0};function vS(n,e,t){var r,i={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)EN.call(e,r)&&!TN.hasOwnProperty(r)&&(i[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:vN,type:n,key:s,ref:o,props:i,_owner:IN.current}}Cd.Fragment=wN;Cd.jsx=vS;Cd.jsxs=vS;uS.exports=Cd;var w=uS.exports,wS={exports:{}},an={},ES={exports:{}},IS={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(G,ee){var ie=G.length;G.push(ee);e:for(;0<ie;){var je=ie-1>>>1,Te=G[je];if(0<i(Te,ee))G[je]=ee,G[ie]=Te,ie=je;else break e}}function t(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var ee=G[0],ie=G.pop();if(ie!==ee){G[0]=ie;e:for(var je=0,Te=G.length,Ye=Te>>>1;je<Ye;){var Zn=2*(je+1)-1,er=G[Zn],tr=Zn+1,nr=G[tr];if(0>i(er,ie))tr<Te&&0>i(nr,er)?(G[je]=nr,G[tr]=ie,je=tr):(G[je]=er,G[Zn]=ie,je=Zn);else if(tr<Te&&0>i(nr,ie))G[je]=nr,G[tr]=ie,je=tr;else break e}}return ee}function i(G,ee){var ie=G.sortIndex-ee.sortIndex;return ie!==0?ie:G.id-ee.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,p=3,g=!1,I=!1,P=!1,x=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(G){for(var ee=t(c);ee!==null;){if(ee.callback===null)r(c);else if(ee.startTime<=G)r(c),ee.sortIndex=ee.expirationTime,e(l,ee);else break;ee=t(c)}}function V(G){if(P=!1,A(G),!I)if(t(l)!==null)I=!0,Y(F);else{var ee=t(c);ee!==null&&fe(V,ee.startTime-G)}}function F(G,ee){I=!1,P&&(P=!1,y(v),v=-1),g=!0;var ie=p;try{for(A(ee),d=t(l);d!==null&&(!(d.expirationTime>ee)||G&&!T());){var je=d.callback;if(typeof je=="function"){d.callback=null,p=d.priorityLevel;var Te=je(d.expirationTime<=ee);ee=n.unstable_now(),typeof Te=="function"?d.callback=Te:d===t(l)&&r(l),A(ee)}else r(l);d=t(l)}if(d!==null)var Ye=!0;else{var Zn=t(c);Zn!==null&&fe(V,Zn.startTime-ee),Ye=!1}return Ye}finally{d=null,p=ie,g=!1}}var M=!1,S=null,v=-1,C=5,k=-1;function T(){return!(n.unstable_now()-k<C)}function N(){if(S!==null){var G=n.unstable_now();k=G;var ee=!0;try{ee=S(!0,G)}finally{ee?R():(M=!1,S=null)}}else M=!1}var R;if(typeof E=="function")R=function(){E(N)};else if(typeof MessageChannel<"u"){var Vt=new MessageChannel,Dn=Vt.port2;Vt.port1.onmessage=N,R=function(){Dn.postMessage(null)}}else R=function(){x(N,0)};function Y(G){S=G,M||(M=!0,R())}function fe(G,ee){v=x(function(){G(n.unstable_now())},ee)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(G){G.callback=null},n.unstable_continueExecution=function(){I||g||(I=!0,Y(F))},n.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<G?Math.floor(1e3/G):5},n.unstable_getCurrentPriorityLevel=function(){return p},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(G){switch(p){case 1:case 2:case 3:var ee=3;break;default:ee=p}var ie=p;p=ee;try{return G()}finally{p=ie}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(G,ee){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var ie=p;p=G;try{return ee()}finally{p=ie}},n.unstable_scheduleCallback=function(G,ee,ie){var je=n.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?je+ie:je):ie=je,G){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=ie+Te,G={id:h++,callback:ee,priorityLevel:G,startTime:ie,expirationTime:Te,sortIndex:-1},ie>je?(G.sortIndex=ie,e(c,G),t(l)===null&&G===t(c)&&(P?(y(v),v=-1):P=!0,fe(V,ie-je))):(G.sortIndex=Te,e(l,G),I||g||(I=!0,Y(F))),G},n.unstable_shouldYield=T,n.unstable_wrapCallback=function(G){var ee=p;return function(){var ie=p;p=ee;try{return G.apply(this,arguments)}finally{p=ie}}}})(IS);ES.exports=IS;var SN=ES.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var AN=ne,rn=SN;function B(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var TS=new Set,Ol={};function Vs(n,e){bo(n,e),bo(n+"Capture",e)}function bo(n,e){for(Ol[n]=e,n=0;n<e.length;n++)TS.add(e[n])}var yr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Qp=Object.prototype.hasOwnProperty,CN=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Sw={},Aw={};function RN(n){return Qp.call(Aw,n)?!0:Qp.call(Sw,n)?!1:CN.test(n)?Aw[n]=!0:(Sw[n]=!0,!1)}function kN(n,e,t,r){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function PN(n,e,t,r){if(e===null||typeof e>"u"||kN(n,e,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Bt(n,e,t,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){Et[n]=new Bt(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];Et[e]=new Bt(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){Et[n]=new Bt(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){Et[n]=new Bt(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){Et[n]=new Bt(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){Et[n]=new Bt(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){Et[n]=new Bt(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){Et[n]=new Bt(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){Et[n]=new Bt(n,5,!1,n.toLowerCase(),null,!1,!1)});var Dg=/[\-:]([a-z])/g;function Vg(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Dg,Vg);Et[e]=new Bt(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Dg,Vg);Et[e]=new Bt(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Dg,Vg);Et[e]=new Bt(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){Et[n]=new Bt(n,1,!1,n.toLowerCase(),null,!1,!1)});Et.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){Et[n]=new Bt(n,1,!1,n.toLowerCase(),null,!0,!0)});function Og(n,e,t,r){var i=Et.hasOwnProperty(e)?Et[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(PN(e,t,i,r)&&(t=null),r||i===null?RN(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):i.mustUseProperty?n[i.propertyName]=t===null?i.type===3?!1:"":t:(e=i.attributeName,r=i.attributeNamespace,t===null?n.removeAttribute(e):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?n.setAttributeNS(r,e,t):n.setAttribute(e,t))))}var kr=AN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,gc=Symbol.for("react.element"),io=Symbol.for("react.portal"),so=Symbol.for("react.fragment"),Lg=Symbol.for("react.strict_mode"),Yp=Symbol.for("react.profiler"),SS=Symbol.for("react.provider"),AS=Symbol.for("react.context"),Mg=Symbol.for("react.forward_ref"),Jp=Symbol.for("react.suspense"),Xp=Symbol.for("react.suspense_list"),Fg=Symbol.for("react.memo"),Br=Symbol.for("react.lazy"),CS=Symbol.for("react.offscreen"),Cw=Symbol.iterator;function Ba(n){return n===null||typeof n!="object"?null:(n=Cw&&n[Cw]||n["@@iterator"],typeof n=="function"?n:null)}var $e=Object.assign,tp;function il(n){if(tp===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);tp=e&&e[1]||""}return`
`+tp+n}var np=!1;function rp(n,e){if(!n||np)return"";np=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){r=c}n.call(e.prototype)}else{try{throw Error()}catch(c){r=c}n()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{np=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?il(n):""}function xN(n){switch(n.tag){case 5:return il(n.type);case 16:return il("Lazy");case 13:return il("Suspense");case 19:return il("SuspenseList");case 0:case 2:case 15:return n=rp(n.type,!1),n;case 11:return n=rp(n.type.render,!1),n;case 1:return n=rp(n.type,!0),n;default:return""}}function Zp(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case so:return"Fragment";case io:return"Portal";case Yp:return"Profiler";case Lg:return"StrictMode";case Jp:return"Suspense";case Xp:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case AS:return(n.displayName||"Context")+".Consumer";case SS:return(n._context.displayName||"Context")+".Provider";case Mg:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Fg:return e=n.displayName||null,e!==null?e:Zp(n.type)||"Memo";case Br:e=n._payload,n=n._init;try{return Zp(n(e))}catch{}}return null}function NN(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Zp(e);case 8:return e===Lg?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function gi(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function RS(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function bN(n){var e=RS(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),r=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function _c(n){n._valueTracker||(n._valueTracker=bN(n))}function kS(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),r="";return n&&(r=RS(n)?n.checked?"true":"false":n.value),n=r,n!==t?(e.setValue(n),!0):!1}function mh(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function em(n,e){var t=e.checked;return $e({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Rw(n,e){var t=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;t=gi(e.value!=null?e.value:t),n._wrapperState={initialChecked:r,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function PS(n,e){e=e.checked,e!=null&&Og(n,"checked",e,!1)}function tm(n,e){PS(n,e);var t=gi(e.value),r=e.type;if(t!=null)r==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(r==="submit"||r==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?nm(n,e.type,t):e.hasOwnProperty("defaultValue")&&nm(n,e.type,gi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function kw(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function nm(n,e,t){(e!=="number"||mh(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var sl=Array.isArray;function yo(n,e,t,r){if(n=n.options,e){e={};for(var i=0;i<t.length;i++)e["$"+t[i]]=!0;for(t=0;t<n.length;t++)i=e.hasOwnProperty("$"+n[t].value),n[t].selected!==i&&(n[t].selected=i),i&&r&&(n[t].defaultSelected=!0)}else{for(t=""+gi(t),e=null,i=0;i<n.length;i++){if(n[i].value===t){n[i].selected=!0,r&&(n[i].defaultSelected=!0);return}e!==null||n[i].disabled||(e=n[i])}e!==null&&(e.selected=!0)}}function rm(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(B(91));return $e({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Pw(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(B(92));if(sl(t)){if(1<t.length)throw Error(B(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:gi(t)}}function xS(n,e){var t=gi(e.value),r=gi(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),r!=null&&(n.defaultValue=""+r)}function xw(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function NS(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function im(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?NS(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var yc,bS=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,r,i){MSApp.execUnsafeLocalFunction(function(){return n(e,t,r,i)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(yc=yc||document.createElement("div"),yc.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=yc.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Ll(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var pl={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},DN=["Webkit","ms","Moz","O"];Object.keys(pl).forEach(function(n){DN.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),pl[e]=pl[n]})});function DS(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||pl.hasOwnProperty(n)&&pl[n]?(""+e).trim():e+"px"}function VS(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=DS(t,e[t],r);t==="float"&&(t="cssFloat"),r?n.setProperty(t,i):n[t]=i}}var VN=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function sm(n,e){if(e){if(VN[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(B(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(B(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(B(61))}if(e.style!=null&&typeof e.style!="object")throw Error(B(62))}}function om(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var am=null;function Ug(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var lm=null,vo=null,wo=null;function Nw(n){if(n=Tu(n)){if(typeof lm!="function")throw Error(B(280));var e=n.stateNode;e&&(e=Nd(e),lm(n.stateNode,n.type,e))}}function OS(n){vo?wo?wo.push(n):wo=[n]:vo=n}function LS(){if(vo){var n=vo,e=wo;if(wo=vo=null,Nw(n),e)for(n=0;n<e.length;n++)Nw(e[n])}}function MS(n,e){return n(e)}function FS(){}var ip=!1;function US(n,e,t){if(ip)return n(e,t);ip=!0;try{return MS(n,e,t)}finally{ip=!1,(vo!==null||wo!==null)&&(FS(),LS())}}function Ml(n,e){var t=n.stateNode;if(t===null)return null;var r=Nd(t);if(r===null)return null;t=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(n=n.type,r=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!r;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(B(231,e,typeof t));return t}var um=!1;if(yr)try{var za={};Object.defineProperty(za,"passive",{get:function(){um=!0}}),window.addEventListener("test",za,za),window.removeEventListener("test",za,za)}catch{um=!1}function ON(n,e,t,r,i,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(h){this.onError(h)}}var ml=!1,gh=null,_h=!1,cm=null,LN={onError:function(n){ml=!0,gh=n}};function MN(n,e,t,r,i,s,o,a,l){ml=!1,gh=null,ON.apply(LN,arguments)}function FN(n,e,t,r,i,s,o,a,l){if(MN.apply(this,arguments),ml){if(ml){var c=gh;ml=!1,gh=null}else throw Error(B(198));_h||(_h=!0,cm=c)}}function Os(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function jS(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function bw(n){if(Os(n)!==n)throw Error(B(188))}function UN(n){var e=n.alternate;if(!e){if(e=Os(n),e===null)throw Error(B(188));return e!==n?null:n}for(var t=n,r=e;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return bw(i),n;if(s===r)return bw(i),e;s=s.sibling}throw Error(B(188))}if(t.return!==r.return)t=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===t){o=!0,t=i,r=s;break}if(a===r){o=!0,r=i,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,r=i;break}if(a===r){o=!0,r=s,t=i;break}a=a.sibling}if(!o)throw Error(B(189))}}if(t.alternate!==r)throw Error(B(190))}if(t.tag!==3)throw Error(B(188));return t.stateNode.current===t?n:e}function BS(n){return n=UN(n),n!==null?zS(n):null}function zS(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=zS(n);if(e!==null)return e;n=n.sibling}return null}var $S=rn.unstable_scheduleCallback,Dw=rn.unstable_cancelCallback,jN=rn.unstable_shouldYield,BN=rn.unstable_requestPaint,Je=rn.unstable_now,zN=rn.unstable_getCurrentPriorityLevel,jg=rn.unstable_ImmediatePriority,qS=rn.unstable_UserBlockingPriority,yh=rn.unstable_NormalPriority,$N=rn.unstable_LowPriority,GS=rn.unstable_IdlePriority,Rd=null,zn=null;function qN(n){if(zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(Rd,n,void 0,(n.current.flags&128)===128)}catch{}}var Rn=Math.clz32?Math.clz32:KN,GN=Math.log,WN=Math.LN2;function KN(n){return n>>>=0,n===0?32:31-(GN(n)/WN|0)|0}var vc=64,wc=4194304;function ol(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function vh(n,e){var t=n.pendingLanes;if(t===0)return 0;var r=0,i=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~i;a!==0?r=ol(a):(s&=o,s!==0&&(r=ol(s)))}else o=t&~i,o!==0?r=ol(o):s!==0&&(r=ol(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=r;0<e;)t=31-Rn(e),i=1<<t,r|=n[t],e&=~i;return r}function HN(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function QN(n,e){for(var t=n.suspendedLanes,r=n.pingedLanes,i=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-Rn(s),a=1<<o,l=i[o];l===-1?(!(a&t)||a&r)&&(i[o]=HN(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function hm(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function WS(){var n=vc;return vc<<=1,!(vc&4194240)&&(vc=64),n}function sp(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function Eu(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Rn(e),n[e]=t}function YN(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var r=n.eventTimes;for(n=n.expirationTimes;0<t;){var i=31-Rn(t),s=1<<i;e[i]=0,r[i]=-1,n[i]=-1,t&=~s}}function Bg(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var r=31-Rn(t),i=1<<r;i&e|n[r]&e&&(n[r]|=e),t&=~i}}var we=0;function KS(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var HS,zg,QS,YS,JS,dm=!1,Ec=[],ti=null,ni=null,ri=null,Fl=new Map,Ul=new Map,$r=[],JN="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Vw(n,e){switch(n){case"focusin":case"focusout":ti=null;break;case"dragenter":case"dragleave":ni=null;break;case"mouseover":case"mouseout":ri=null;break;case"pointerover":case"pointerout":Fl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(e.pointerId)}}function $a(n,e,t,r,i,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Tu(e),e!==null&&zg(e)),n):(n.eventSystemFlags|=r,e=n.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),n)}function XN(n,e,t,r,i){switch(e){case"focusin":return ti=$a(ti,n,e,t,r,i),!0;case"dragenter":return ni=$a(ni,n,e,t,r,i),!0;case"mouseover":return ri=$a(ri,n,e,t,r,i),!0;case"pointerover":var s=i.pointerId;return Fl.set(s,$a(Fl.get(s)||null,n,e,t,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Ul.set(s,$a(Ul.get(s)||null,n,e,t,r,i)),!0}return!1}function XS(n){var e=ss(n.target);if(e!==null){var t=Os(e);if(t!==null){if(e=t.tag,e===13){if(e=jS(t),e!==null){n.blockedOn=e,JS(n.priority,function(){QS(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Gc(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=fm(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var r=new t.constructor(t.type,t);am=r,t.target.dispatchEvent(r),am=null}else return e=Tu(t),e!==null&&zg(e),n.blockedOn=t,!1;e.shift()}return!0}function Ow(n,e,t){Gc(n)&&t.delete(e)}function ZN(){dm=!1,ti!==null&&Gc(ti)&&(ti=null),ni!==null&&Gc(ni)&&(ni=null),ri!==null&&Gc(ri)&&(ri=null),Fl.forEach(Ow),Ul.forEach(Ow)}function qa(n,e){n.blockedOn===e&&(n.blockedOn=null,dm||(dm=!0,rn.unstable_scheduleCallback(rn.unstable_NormalPriority,ZN)))}function jl(n){function e(i){return qa(i,n)}if(0<Ec.length){qa(Ec[0],n);for(var t=1;t<Ec.length;t++){var r=Ec[t];r.blockedOn===n&&(r.blockedOn=null)}}for(ti!==null&&qa(ti,n),ni!==null&&qa(ni,n),ri!==null&&qa(ri,n),Fl.forEach(e),Ul.forEach(e),t=0;t<$r.length;t++)r=$r[t],r.blockedOn===n&&(r.blockedOn=null);for(;0<$r.length&&(t=$r[0],t.blockedOn===null);)XS(t),t.blockedOn===null&&$r.shift()}var Eo=kr.ReactCurrentBatchConfig,wh=!0;function eb(n,e,t,r){var i=we,s=Eo.transition;Eo.transition=null;try{we=1,$g(n,e,t,r)}finally{we=i,Eo.transition=s}}function tb(n,e,t,r){var i=we,s=Eo.transition;Eo.transition=null;try{we=4,$g(n,e,t,r)}finally{we=i,Eo.transition=s}}function $g(n,e,t,r){if(wh){var i=fm(n,e,t,r);if(i===null)mp(n,e,r,Eh,t),Vw(n,r);else if(XN(i,n,e,t,r))r.stopPropagation();else if(Vw(n,r),e&4&&-1<JN.indexOf(n)){for(;i!==null;){var s=Tu(i);if(s!==null&&HS(s),s=fm(n,e,t,r),s===null&&mp(n,e,r,Eh,t),s===i)break;i=s}i!==null&&r.stopPropagation()}else mp(n,e,r,null,t)}}var Eh=null;function fm(n,e,t,r){if(Eh=null,n=Ug(r),n=ss(n),n!==null)if(e=Os(n),e===null)n=null;else if(t=e.tag,t===13){if(n=jS(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Eh=n,null}function ZS(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(zN()){case jg:return 1;case qS:return 4;case yh:case $N:return 16;case GS:return 536870912;default:return 16}default:return 16}}var Jr=null,qg=null,Wc=null;function e0(){if(Wc)return Wc;var n,e=qg,t=e.length,r,i="value"in Jr?Jr.value:Jr.textContent,s=i.length;for(n=0;n<t&&e[n]===i[n];n++);var o=t-n;for(r=1;r<=o&&e[t-r]===i[s-r];r++);return Wc=i.slice(n,1<r?1-r:void 0)}function Kc(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Ic(){return!0}function Lw(){return!1}function ln(n){function e(t,r,i,s,o){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ic:Lw,this.isPropagationStopped=Lw,this}return $e(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ic)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ic)},persist:function(){},isPersistent:Ic}),e}var aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gg=ln(aa),Iu=$e({},aa,{view:0,detail:0}),nb=ln(Iu),op,ap,Ga,kd=$e({},Iu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wg,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ga&&(Ga&&n.type==="mousemove"?(op=n.screenX-Ga.screenX,ap=n.screenY-Ga.screenY):ap=op=0,Ga=n),op)},movementY:function(n){return"movementY"in n?n.movementY:ap}}),Mw=ln(kd),rb=$e({},kd,{dataTransfer:0}),ib=ln(rb),sb=$e({},Iu,{relatedTarget:0}),lp=ln(sb),ob=$e({},aa,{animationName:0,elapsedTime:0,pseudoElement:0}),ab=ln(ob),lb=$e({},aa,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ub=ln(lb),cb=$e({},aa,{data:0}),Fw=ln(cb),hb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},db={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pb(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=fb[n])?!!e[n]:!1}function Wg(){return pb}var mb=$e({},Iu,{key:function(n){if(n.key){var e=hb[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Kc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?db[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wg,charCode:function(n){return n.type==="keypress"?Kc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Kc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),gb=ln(mb),_b=$e({},kd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Uw=ln(_b),yb=$e({},Iu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wg}),vb=ln(yb),wb=$e({},aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Eb=ln(wb),Ib=$e({},kd,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Tb=ln(Ib),Sb=[9,13,27,32],Kg=yr&&"CompositionEvent"in window,gl=null;yr&&"documentMode"in document&&(gl=document.documentMode);var Ab=yr&&"TextEvent"in window&&!gl,t0=yr&&(!Kg||gl&&8<gl&&11>=gl),jw=" ",Bw=!1;function n0(n,e){switch(n){case"keyup":return Sb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function r0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var oo=!1;function Cb(n,e){switch(n){case"compositionend":return r0(e);case"keypress":return e.which!==32?null:(Bw=!0,jw);case"textInput":return n=e.data,n===jw&&Bw?null:n;default:return null}}function Rb(n,e){if(oo)return n==="compositionend"||!Kg&&n0(n,e)?(n=e0(),Wc=qg=Jr=null,oo=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return t0&&e.locale!=="ko"?null:e.data;default:return null}}var kb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zw(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!kb[n.type]:e==="textarea"}function i0(n,e,t,r){OS(r),e=Ih(e,"onChange"),0<e.length&&(t=new Gg("onChange","change",null,t,r),n.push({event:t,listeners:e}))}var _l=null,Bl=null;function Pb(n){m0(n,0)}function Pd(n){var e=uo(n);if(kS(e))return n}function xb(n,e){if(n==="change")return e}var s0=!1;if(yr){var up;if(yr){var cp="oninput"in document;if(!cp){var $w=document.createElement("div");$w.setAttribute("oninput","return;"),cp=typeof $w.oninput=="function"}up=cp}else up=!1;s0=up&&(!document.documentMode||9<document.documentMode)}function qw(){_l&&(_l.detachEvent("onpropertychange",o0),Bl=_l=null)}function o0(n){if(n.propertyName==="value"&&Pd(Bl)){var e=[];i0(e,Bl,n,Ug(n)),US(Pb,e)}}function Nb(n,e,t){n==="focusin"?(qw(),_l=e,Bl=t,_l.attachEvent("onpropertychange",o0)):n==="focusout"&&qw()}function bb(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Pd(Bl)}function Db(n,e){if(n==="click")return Pd(e)}function Vb(n,e){if(n==="input"||n==="change")return Pd(e)}function Ob(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var bn=typeof Object.is=="function"?Object.is:Ob;function zl(n,e){if(bn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),r=Object.keys(e);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!Qp.call(e,i)||!bn(n[i],e[i]))return!1}return!0}function Gw(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Ww(n,e){var t=Gw(n);n=0;for(var r;t;){if(t.nodeType===3){if(r=n+t.textContent.length,n<=e&&r>=e)return{node:t,offset:e-n};n=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Gw(t)}}function a0(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?a0(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function l0(){for(var n=window,e=mh();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=mh(n.document)}return e}function Hg(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function Lb(n){var e=l0(),t=n.focusedElem,r=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&a0(t.ownerDocument.documentElement,t)){if(r!==null&&Hg(t)){if(e=r.start,n=r.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var i=t.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!n.extend&&s>r&&(i=r,r=s,s=i),i=Ww(t,s);var o=Ww(t,r);i&&o&&(n.rangeCount!==1||n.anchorNode!==i.node||n.anchorOffset!==i.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),n.removeAllRanges(),s>r?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Mb=yr&&"documentMode"in document&&11>=document.documentMode,ao=null,pm=null,yl=null,mm=!1;function Kw(n,e,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;mm||ao==null||ao!==mh(r)||(r=ao,"selectionStart"in r&&Hg(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),yl&&zl(yl,r)||(yl=r,r=Ih(pm,"onSelect"),0<r.length&&(e=new Gg("onSelect","select",null,e,t),n.push({event:e,listeners:r}),e.target=ao)))}function Tc(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var lo={animationend:Tc("Animation","AnimationEnd"),animationiteration:Tc("Animation","AnimationIteration"),animationstart:Tc("Animation","AnimationStart"),transitionend:Tc("Transition","TransitionEnd")},hp={},u0={};yr&&(u0=document.createElement("div").style,"AnimationEvent"in window||(delete lo.animationend.animation,delete lo.animationiteration.animation,delete lo.animationstart.animation),"TransitionEvent"in window||delete lo.transitionend.transition);function xd(n){if(hp[n])return hp[n];if(!lo[n])return n;var e=lo[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in u0)return hp[n]=e[t];return n}var c0=xd("animationend"),h0=xd("animationiteration"),d0=xd("animationstart"),f0=xd("transitionend"),p0=new Map,Hw="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Di(n,e){p0.set(n,e),Vs(e,[n])}for(var dp=0;dp<Hw.length;dp++){var fp=Hw[dp],Fb=fp.toLowerCase(),Ub=fp[0].toUpperCase()+fp.slice(1);Di(Fb,"on"+Ub)}Di(c0,"onAnimationEnd");Di(h0,"onAnimationIteration");Di(d0,"onAnimationStart");Di("dblclick","onDoubleClick");Di("focusin","onFocus");Di("focusout","onBlur");Di(f0,"onTransitionEnd");bo("onMouseEnter",["mouseout","mouseover"]);bo("onMouseLeave",["mouseout","mouseover"]);bo("onPointerEnter",["pointerout","pointerover"]);bo("onPointerLeave",["pointerout","pointerover"]);Vs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Vs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Vs("onBeforeInput",["compositionend","keypress","textInput","paste"]);Vs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Vs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Vs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var al="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),jb=new Set("cancel close invalid load scroll toggle".split(" ").concat(al));function Qw(n,e,t){var r=n.type||"unknown-event";n.currentTarget=t,FN(r,e,void 0,n),n.currentTarget=null}function m0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var r=n[t],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;Qw(i,a,c),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;Qw(i,a,c),s=l}}}if(_h)throw n=cm,_h=!1,cm=null,n}function Pe(n,e){var t=e[wm];t===void 0&&(t=e[wm]=new Set);var r=n+"__bubble";t.has(r)||(g0(e,n,2,!1),t.add(r))}function pp(n,e,t){var r=0;e&&(r|=4),g0(t,n,r,e)}var Sc="_reactListening"+Math.random().toString(36).slice(2);function $l(n){if(!n[Sc]){n[Sc]=!0,TS.forEach(function(t){t!=="selectionchange"&&(jb.has(t)||pp(t,!1,n),pp(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Sc]||(e[Sc]=!0,pp("selectionchange",!1,e))}}function g0(n,e,t,r){switch(ZS(e)){case 1:var i=eb;break;case 4:i=tb;break;default:i=$g}t=i.bind(null,e,t,n),i=void 0,!um||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?n.addEventListener(e,t,{capture:!0,passive:i}):n.addEventListener(e,t,!0):i!==void 0?n.addEventListener(e,t,{passive:i}):n.addEventListener(e,t,!1)}function mp(n,e,t,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=ss(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}US(function(){var c=s,h=Ug(t),d=[];e:{var p=p0.get(n);if(p!==void 0){var g=Gg,I=n;switch(n){case"keypress":if(Kc(t)===0)break e;case"keydown":case"keyup":g=gb;break;case"focusin":I="focus",g=lp;break;case"focusout":I="blur",g=lp;break;case"beforeblur":case"afterblur":g=lp;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Mw;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=ib;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=vb;break;case c0:case h0:case d0:g=ab;break;case f0:g=Eb;break;case"scroll":g=nb;break;case"wheel":g=Tb;break;case"copy":case"cut":case"paste":g=ub;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=Uw}var P=(e&4)!==0,x=!P&&n==="scroll",y=P?p!==null?p+"Capture":null:p;P=[];for(var E=c,A;E!==null;){A=E;var V=A.stateNode;if(A.tag===5&&V!==null&&(A=V,y!==null&&(V=Ml(E,y),V!=null&&P.push(ql(E,V,A)))),x)break;E=E.return}0<P.length&&(p=new g(p,I,null,t,h),d.push({event:p,listeners:P}))}}if(!(e&7)){e:{if(p=n==="mouseover"||n==="pointerover",g=n==="mouseout"||n==="pointerout",p&&t!==am&&(I=t.relatedTarget||t.fromElement)&&(ss(I)||I[vr]))break e;if((g||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,g?(I=t.relatedTarget||t.toElement,g=c,I=I?ss(I):null,I!==null&&(x=Os(I),I!==x||I.tag!==5&&I.tag!==6)&&(I=null)):(g=null,I=c),g!==I)){if(P=Mw,V="onMouseLeave",y="onMouseEnter",E="mouse",(n==="pointerout"||n==="pointerover")&&(P=Uw,V="onPointerLeave",y="onPointerEnter",E="pointer"),x=g==null?p:uo(g),A=I==null?p:uo(I),p=new P(V,E+"leave",g,t,h),p.target=x,p.relatedTarget=A,V=null,ss(h)===c&&(P=new P(y,E+"enter",I,t,h),P.target=A,P.relatedTarget=x,V=P),x=V,g&&I)t:{for(P=g,y=I,E=0,A=P;A;A=Hs(A))E++;for(A=0,V=y;V;V=Hs(V))A++;for(;0<E-A;)P=Hs(P),E--;for(;0<A-E;)y=Hs(y),A--;for(;E--;){if(P===y||y!==null&&P===y.alternate)break t;P=Hs(P),y=Hs(y)}P=null}else P=null;g!==null&&Yw(d,p,g,P,!1),I!==null&&x!==null&&Yw(d,x,I,P,!0)}}e:{if(p=c?uo(c):window,g=p.nodeName&&p.nodeName.toLowerCase(),g==="select"||g==="input"&&p.type==="file")var F=xb;else if(zw(p))if(s0)F=Vb;else{F=bb;var M=Nb}else(g=p.nodeName)&&g.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(F=Db);if(F&&(F=F(n,c))){i0(d,F,t,h);break e}M&&M(n,p,c),n==="focusout"&&(M=p._wrapperState)&&M.controlled&&p.type==="number"&&nm(p,"number",p.value)}switch(M=c?uo(c):window,n){case"focusin":(zw(M)||M.contentEditable==="true")&&(ao=M,pm=c,yl=null);break;case"focusout":yl=pm=ao=null;break;case"mousedown":mm=!0;break;case"contextmenu":case"mouseup":case"dragend":mm=!1,Kw(d,t,h);break;case"selectionchange":if(Mb)break;case"keydown":case"keyup":Kw(d,t,h)}var S;if(Kg)e:{switch(n){case"compositionstart":var v="onCompositionStart";break e;case"compositionend":v="onCompositionEnd";break e;case"compositionupdate":v="onCompositionUpdate";break e}v=void 0}else oo?n0(n,t)&&(v="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(v="onCompositionStart");v&&(t0&&t.locale!=="ko"&&(oo||v!=="onCompositionStart"?v==="onCompositionEnd"&&oo&&(S=e0()):(Jr=h,qg="value"in Jr?Jr.value:Jr.textContent,oo=!0)),M=Ih(c,v),0<M.length&&(v=new Fw(v,n,null,t,h),d.push({event:v,listeners:M}),S?v.data=S:(S=r0(t),S!==null&&(v.data=S)))),(S=Ab?Cb(n,t):Rb(n,t))&&(c=Ih(c,"onBeforeInput"),0<c.length&&(h=new Fw("onBeforeInput","beforeinput",null,t,h),d.push({event:h,listeners:c}),h.data=S))}m0(d,e)})}function ql(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Ih(n,e){for(var t=e+"Capture",r=[];n!==null;){var i=n,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ml(n,t),s!=null&&r.unshift(ql(n,s,i)),s=Ml(n,e),s!=null&&r.push(ql(n,s,i))),n=n.return}return r}function Hs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Yw(n,e,t,r,i){for(var s=e._reactName,o=[];t!==null&&t!==r;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=Ml(t,s),l!=null&&o.unshift(ql(t,l,a))):i||(l=Ml(t,s),l!=null&&o.push(ql(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var Bb=/\r\n?/g,zb=/\u0000|\uFFFD/g;function Jw(n){return(typeof n=="string"?n:""+n).replace(Bb,`
`).replace(zb,"")}function Ac(n,e,t){if(e=Jw(e),Jw(n)!==e&&t)throw Error(B(425))}function Th(){}var gm=null,_m=null;function ym(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var vm=typeof setTimeout=="function"?setTimeout:void 0,$b=typeof clearTimeout=="function"?clearTimeout:void 0,Xw=typeof Promise=="function"?Promise:void 0,qb=typeof queueMicrotask=="function"?queueMicrotask:typeof Xw<"u"?function(n){return Xw.resolve(null).then(n).catch(Gb)}:vm;function Gb(n){setTimeout(function(){throw n})}function gp(n,e){var t=e,r=0;do{var i=t.nextSibling;if(n.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){n.removeChild(i),jl(e);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);jl(e)}function ii(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function Zw(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var la=Math.random().toString(36).slice(2),Mn="__reactFiber$"+la,Gl="__reactProps$"+la,vr="__reactContainer$"+la,wm="__reactEvents$"+la,Wb="__reactListeners$"+la,Kb="__reactHandles$"+la;function ss(n){var e=n[Mn];if(e)return e;for(var t=n.parentNode;t;){if(e=t[vr]||t[Mn]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=Zw(n);n!==null;){if(t=n[Mn])return t;n=Zw(n)}return e}n=t,t=n.parentNode}return null}function Tu(n){return n=n[Mn]||n[vr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function uo(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(B(33))}function Nd(n){return n[Gl]||null}var Em=[],co=-1;function Vi(n){return{current:n}}function Ve(n){0>co||(n.current=Em[co],Em[co]=null,co--)}function Re(n,e){co++,Em[co]=n.current,n.current=e}var _i={},Dt=Vi(_i),Ht=Vi(!1),gs=_i;function Do(n,e){var t=n.type.contextTypes;if(!t)return _i;var r=n.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=e[s];return r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=i),i}function Qt(n){return n=n.childContextTypes,n!=null}function Sh(){Ve(Ht),Ve(Dt)}function eE(n,e,t){if(Dt.current!==_i)throw Error(B(168));Re(Dt,e),Re(Ht,t)}function _0(n,e,t){var r=n.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(B(108,NN(n)||"Unknown",i));return $e({},t,r)}function Ah(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||_i,gs=Dt.current,Re(Dt,n),Re(Ht,Ht.current),!0}function tE(n,e,t){var r=n.stateNode;if(!r)throw Error(B(169));t?(n=_0(n,e,gs),r.__reactInternalMemoizedMergedChildContext=n,Ve(Ht),Ve(Dt),Re(Dt,n)):Ve(Ht),Re(Ht,t)}var ar=null,bd=!1,_p=!1;function y0(n){ar===null?ar=[n]:ar.push(n)}function Hb(n){bd=!0,y0(n)}function Oi(){if(!_p&&ar!==null){_p=!0;var n=0,e=we;try{var t=ar;for(we=1;n<t.length;n++){var r=t[n];do r=r(!0);while(r!==null)}ar=null,bd=!1}catch(i){throw ar!==null&&(ar=ar.slice(n+1)),$S(jg,Oi),i}finally{we=e,_p=!1}}return null}var ho=[],fo=0,Ch=null,Rh=0,un=[],cn=0,_s=null,ur=1,cr="";function Yi(n,e){ho[fo++]=Rh,ho[fo++]=Ch,Ch=n,Rh=e}function v0(n,e,t){un[cn++]=ur,un[cn++]=cr,un[cn++]=_s,_s=n;var r=ur;n=cr;var i=32-Rn(r)-1;r&=~(1<<i),t+=1;var s=32-Rn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ur=1<<32-Rn(e)+i|t<<i|r,cr=s+n}else ur=1<<s|t<<i|r,cr=n}function Qg(n){n.return!==null&&(Yi(n,1),v0(n,1,0))}function Yg(n){for(;n===Ch;)Ch=ho[--fo],ho[fo]=null,Rh=ho[--fo],ho[fo]=null;for(;n===_s;)_s=un[--cn],un[cn]=null,cr=un[--cn],un[cn]=null,ur=un[--cn],un[cn]=null}var nn=null,tn=null,Le=!1,En=null;function w0(n,e){var t=hn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function nE(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,nn=n,tn=ii(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,nn=n,tn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=_s!==null?{id:ur,overflow:cr}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=hn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,nn=n,tn=null,!0):!1;default:return!1}}function Im(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Tm(n){if(Le){var e=tn;if(e){var t=e;if(!nE(n,e)){if(Im(n))throw Error(B(418));e=ii(t.nextSibling);var r=nn;e&&nE(n,e)?w0(r,t):(n.flags=n.flags&-4097|2,Le=!1,nn=n)}}else{if(Im(n))throw Error(B(418));n.flags=n.flags&-4097|2,Le=!1,nn=n}}}function rE(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;nn=n}function Cc(n){if(n!==nn)return!1;if(!Le)return rE(n),Le=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!ym(n.type,n.memoizedProps)),e&&(e=tn)){if(Im(n))throw E0(),Error(B(418));for(;e;)w0(n,e),e=ii(e.nextSibling)}if(rE(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(B(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){tn=ii(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}tn=null}}else tn=nn?ii(n.stateNode.nextSibling):null;return!0}function E0(){for(var n=tn;n;)n=ii(n.nextSibling)}function Vo(){tn=nn=null,Le=!1}function Jg(n){En===null?En=[n]:En.push(n)}var Qb=kr.ReactCurrentBatchConfig;function Wa(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(B(309));var r=t.stateNode}if(!r)throw Error(B(147,n));var i=r,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(B(284));if(!t._owner)throw Error(B(290,n))}return n}function Rc(n,e){throw n=Object.prototype.toString.call(e),Error(B(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function iE(n){var e=n._init;return e(n._payload)}function I0(n){function e(y,E){if(n){var A=y.deletions;A===null?(y.deletions=[E],y.flags|=16):A.push(E)}}function t(y,E){if(!n)return null;for(;E!==null;)e(y,E),E=E.sibling;return null}function r(y,E){for(y=new Map;E!==null;)E.key!==null?y.set(E.key,E):y.set(E.index,E),E=E.sibling;return y}function i(y,E){return y=li(y,E),y.index=0,y.sibling=null,y}function s(y,E,A){return y.index=A,n?(A=y.alternate,A!==null?(A=A.index,A<E?(y.flags|=2,E):A):(y.flags|=2,E)):(y.flags|=1048576,E)}function o(y){return n&&y.alternate===null&&(y.flags|=2),y}function a(y,E,A,V){return E===null||E.tag!==6?(E=Sp(A,y.mode,V),E.return=y,E):(E=i(E,A),E.return=y,E)}function l(y,E,A,V){var F=A.type;return F===so?h(y,E,A.props.children,V,A.key):E!==null&&(E.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Br&&iE(F)===E.type)?(V=i(E,A.props),V.ref=Wa(y,E,A),V.return=y,V):(V=eh(A.type,A.key,A.props,null,y.mode,V),V.ref=Wa(y,E,A),V.return=y,V)}function c(y,E,A,V){return E===null||E.tag!==4||E.stateNode.containerInfo!==A.containerInfo||E.stateNode.implementation!==A.implementation?(E=Ap(A,y.mode,V),E.return=y,E):(E=i(E,A.children||[]),E.return=y,E)}function h(y,E,A,V,F){return E===null||E.tag!==7?(E=fs(A,y.mode,V,F),E.return=y,E):(E=i(E,A),E.return=y,E)}function d(y,E,A){if(typeof E=="string"&&E!==""||typeof E=="number")return E=Sp(""+E,y.mode,A),E.return=y,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case gc:return A=eh(E.type,E.key,E.props,null,y.mode,A),A.ref=Wa(y,null,E),A.return=y,A;case io:return E=Ap(E,y.mode,A),E.return=y,E;case Br:var V=E._init;return d(y,V(E._payload),A)}if(sl(E)||Ba(E))return E=fs(E,y.mode,A,null),E.return=y,E;Rc(y,E)}return null}function p(y,E,A,V){var F=E!==null?E.key:null;if(typeof A=="string"&&A!==""||typeof A=="number")return F!==null?null:a(y,E,""+A,V);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case gc:return A.key===F?l(y,E,A,V):null;case io:return A.key===F?c(y,E,A,V):null;case Br:return F=A._init,p(y,E,F(A._payload),V)}if(sl(A)||Ba(A))return F!==null?null:h(y,E,A,V,null);Rc(y,A)}return null}function g(y,E,A,V,F){if(typeof V=="string"&&V!==""||typeof V=="number")return y=y.get(A)||null,a(E,y,""+V,F);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case gc:return y=y.get(V.key===null?A:V.key)||null,l(E,y,V,F);case io:return y=y.get(V.key===null?A:V.key)||null,c(E,y,V,F);case Br:var M=V._init;return g(y,E,A,M(V._payload),F)}if(sl(V)||Ba(V))return y=y.get(A)||null,h(E,y,V,F,null);Rc(E,V)}return null}function I(y,E,A,V){for(var F=null,M=null,S=E,v=E=0,C=null;S!==null&&v<A.length;v++){S.index>v?(C=S,S=null):C=S.sibling;var k=p(y,S,A[v],V);if(k===null){S===null&&(S=C);break}n&&S&&k.alternate===null&&e(y,S),E=s(k,E,v),M===null?F=k:M.sibling=k,M=k,S=C}if(v===A.length)return t(y,S),Le&&Yi(y,v),F;if(S===null){for(;v<A.length;v++)S=d(y,A[v],V),S!==null&&(E=s(S,E,v),M===null?F=S:M.sibling=S,M=S);return Le&&Yi(y,v),F}for(S=r(y,S);v<A.length;v++)C=g(S,y,v,A[v],V),C!==null&&(n&&C.alternate!==null&&S.delete(C.key===null?v:C.key),E=s(C,E,v),M===null?F=C:M.sibling=C,M=C);return n&&S.forEach(function(T){return e(y,T)}),Le&&Yi(y,v),F}function P(y,E,A,V){var F=Ba(A);if(typeof F!="function")throw Error(B(150));if(A=F.call(A),A==null)throw Error(B(151));for(var M=F=null,S=E,v=E=0,C=null,k=A.next();S!==null&&!k.done;v++,k=A.next()){S.index>v?(C=S,S=null):C=S.sibling;var T=p(y,S,k.value,V);if(T===null){S===null&&(S=C);break}n&&S&&T.alternate===null&&e(y,S),E=s(T,E,v),M===null?F=T:M.sibling=T,M=T,S=C}if(k.done)return t(y,S),Le&&Yi(y,v),F;if(S===null){for(;!k.done;v++,k=A.next())k=d(y,k.value,V),k!==null&&(E=s(k,E,v),M===null?F=k:M.sibling=k,M=k);return Le&&Yi(y,v),F}for(S=r(y,S);!k.done;v++,k=A.next())k=g(S,y,v,k.value,V),k!==null&&(n&&k.alternate!==null&&S.delete(k.key===null?v:k.key),E=s(k,E,v),M===null?F=k:M.sibling=k,M=k);return n&&S.forEach(function(N){return e(y,N)}),Le&&Yi(y,v),F}function x(y,E,A,V){if(typeof A=="object"&&A!==null&&A.type===so&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case gc:e:{for(var F=A.key,M=E;M!==null;){if(M.key===F){if(F=A.type,F===so){if(M.tag===7){t(y,M.sibling),E=i(M,A.props.children),E.return=y,y=E;break e}}else if(M.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Br&&iE(F)===M.type){t(y,M.sibling),E=i(M,A.props),E.ref=Wa(y,M,A),E.return=y,y=E;break e}t(y,M);break}else e(y,M);M=M.sibling}A.type===so?(E=fs(A.props.children,y.mode,V,A.key),E.return=y,y=E):(V=eh(A.type,A.key,A.props,null,y.mode,V),V.ref=Wa(y,E,A),V.return=y,y=V)}return o(y);case io:e:{for(M=A.key;E!==null;){if(E.key===M)if(E.tag===4&&E.stateNode.containerInfo===A.containerInfo&&E.stateNode.implementation===A.implementation){t(y,E.sibling),E=i(E,A.children||[]),E.return=y,y=E;break e}else{t(y,E);break}else e(y,E);E=E.sibling}E=Ap(A,y.mode,V),E.return=y,y=E}return o(y);case Br:return M=A._init,x(y,E,M(A._payload),V)}if(sl(A))return I(y,E,A,V);if(Ba(A))return P(y,E,A,V);Rc(y,A)}return typeof A=="string"&&A!==""||typeof A=="number"?(A=""+A,E!==null&&E.tag===6?(t(y,E.sibling),E=i(E,A),E.return=y,y=E):(t(y,E),E=Sp(A,y.mode,V),E.return=y,y=E),o(y)):t(y,E)}return x}var Oo=I0(!0),T0=I0(!1),kh=Vi(null),Ph=null,po=null,Xg=null;function Zg(){Xg=po=Ph=null}function e_(n){var e=kh.current;Ve(kh),n._currentValue=e}function Sm(n,e,t){for(;n!==null;){var r=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===t)break;n=n.return}}function Io(n,e){Ph=n,Xg=po=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&($t=!0),n.firstContext=null)}function pn(n){var e=n._currentValue;if(Xg!==n)if(n={context:n,memoizedValue:e,next:null},po===null){if(Ph===null)throw Error(B(308));po=n,Ph.dependencies={lanes:0,firstContext:n}}else po=po.next=n;return e}var os=null;function t_(n){os===null?os=[n]:os.push(n)}function S0(n,e,t,r){var i=e.interleaved;return i===null?(t.next=t,t_(e)):(t.next=i.next,i.next=t),e.interleaved=t,wr(n,r)}function wr(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var zr=!1;function n_(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function A0(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function gr(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function si(n,e,t){var r=n.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,wr(n,t)}return i=r.interleaved,i===null?(e.next=e,t_(r)):(e.next=i.next,i.next=e),r.interleaved=e,wr(n,t)}function Hc(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Bg(n,t)}}function sE(n,e){var t=n.updateQueue,r=n.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?i=s=e:s=s.next=e}else i=s=e;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function xh(n,e,t,r){var i=n.updateQueue;zr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=n.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=i.baseState;o=0,h=c=l=null,a=s;do{var p=a.lane,g=a.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:g,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var I=n,P=a;switch(p=e,g=t,P.tag){case 1:if(I=P.payload,typeof I=="function"){d=I.call(g,d,p);break e}d=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=P.payload,p=typeof I=="function"?I.call(g,d,p):I,p==null)break e;d=$e({},d,p);break e;case 2:zr=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else g={eventTime:g,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=g,l=d):h=h.next=g,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(h===null&&(l=d),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=h,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);vs|=o,n.lanes=o,n.memoizedState=d}}function oE(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var r=n[e],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(B(191,i));i.call(r)}}}var Su={},$n=Vi(Su),Wl=Vi(Su),Kl=Vi(Su);function as(n){if(n===Su)throw Error(B(174));return n}function r_(n,e){switch(Re(Kl,e),Re(Wl,n),Re($n,Su),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:im(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=im(e,n)}Ve($n),Re($n,e)}function Lo(){Ve($n),Ve(Wl),Ve(Kl)}function C0(n){as(Kl.current);var e=as($n.current),t=im(e,n.type);e!==t&&(Re(Wl,n),Re($n,t))}function i_(n){Wl.current===n&&(Ve($n),Ve(Wl))}var Be=Vi(0);function Nh(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yp=[];function s_(){for(var n=0;n<yp.length;n++)yp[n]._workInProgressVersionPrimary=null;yp.length=0}var Qc=kr.ReactCurrentDispatcher,vp=kr.ReactCurrentBatchConfig,ys=0,ze=null,nt=null,ct=null,bh=!1,vl=!1,Hl=0,Yb=0;function At(){throw Error(B(321))}function o_(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!bn(n[t],e[t]))return!1;return!0}function a_(n,e,t,r,i,s){if(ys=s,ze=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Qc.current=n===null||n.memoizedState===null?eD:tD,n=t(r,i),vl){s=0;do{if(vl=!1,Hl=0,25<=s)throw Error(B(301));s+=1,ct=nt=null,e.updateQueue=null,Qc.current=nD,n=t(r,i)}while(vl)}if(Qc.current=Dh,e=nt!==null&&nt.next!==null,ys=0,ct=nt=ze=null,bh=!1,e)throw Error(B(300));return n}function l_(){var n=Hl!==0;return Hl=0,n}function On(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?ze.memoizedState=ct=n:ct=ct.next=n,ct}function mn(){if(nt===null){var n=ze.alternate;n=n!==null?n.memoizedState:null}else n=nt.next;var e=ct===null?ze.memoizedState:ct.next;if(e!==null)ct=e,nt=n;else{if(n===null)throw Error(B(310));nt=n,n={memoizedState:nt.memoizedState,baseState:nt.baseState,baseQueue:nt.baseQueue,queue:nt.queue,next:null},ct===null?ze.memoizedState=ct=n:ct=ct.next=n}return ct}function Ql(n,e){return typeof e=="function"?e(n):e}function wp(n){var e=mn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=nt,i=r.baseQueue,s=t.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((ys&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:n(r,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=r):l=l.next=d,ze.lanes|=h,vs|=h}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=a,bn(r,e.memoizedState)||($t=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=l,t.lastRenderedState=r}if(n=t.interleaved,n!==null){i=n;do s=i.lane,ze.lanes|=s,vs|=s,i=i.next;while(i!==n)}else i===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Ep(n){var e=mn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=t.dispatch,i=t.pending,s=e.memoizedState;if(i!==null){t.pending=null;var o=i=i.next;do s=n(s,o.action),o=o.next;while(o!==i);bn(s,e.memoizedState)||($t=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,r]}function R0(){}function k0(n,e){var t=ze,r=mn(),i=e(),s=!bn(r.memoizedState,i);if(s&&(r.memoizedState=i,$t=!0),r=r.queue,u_(N0.bind(null,t,r,n),[n]),r.getSnapshot!==e||s||ct!==null&&ct.memoizedState.tag&1){if(t.flags|=2048,Yl(9,x0.bind(null,t,r,i,e),void 0,null),pt===null)throw Error(B(349));ys&30||P0(t,e,i)}return i}function P0(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function x0(n,e,t,r){e.value=t,e.getSnapshot=r,b0(e)&&D0(n)}function N0(n,e,t){return t(function(){b0(e)&&D0(n)})}function b0(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!bn(n,t)}catch{return!0}}function D0(n){var e=wr(n,1);e!==null&&kn(e,n,1,-1)}function aE(n){var e=On();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ql,lastRenderedState:n},e.queue=n,n=n.dispatch=Zb.bind(null,ze,n),[e.memoizedState,n]}function Yl(n,e,t,r){return n={tag:n,create:e,destroy:t,deps:r,next:null},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(r=t.next,t.next=n,n.next=r,e.lastEffect=n)),n}function V0(){return mn().memoizedState}function Yc(n,e,t,r){var i=On();ze.flags|=n,i.memoizedState=Yl(1|e,t,void 0,r===void 0?null:r)}function Dd(n,e,t,r){var i=mn();r=r===void 0?null:r;var s=void 0;if(nt!==null){var o=nt.memoizedState;if(s=o.destroy,r!==null&&o_(r,o.deps)){i.memoizedState=Yl(e,t,s,r);return}}ze.flags|=n,i.memoizedState=Yl(1|e,t,s,r)}function lE(n,e){return Yc(8390656,8,n,e)}function u_(n,e){return Dd(2048,8,n,e)}function O0(n,e){return Dd(4,2,n,e)}function L0(n,e){return Dd(4,4,n,e)}function M0(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function F0(n,e,t){return t=t!=null?t.concat([n]):null,Dd(4,4,M0.bind(null,e,n),t)}function c_(){}function U0(n,e){var t=mn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&o_(e,r[1])?r[0]:(t.memoizedState=[n,e],n)}function j0(n,e){var t=mn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&o_(e,r[1])?r[0]:(n=n(),t.memoizedState=[n,e],n)}function B0(n,e,t){return ys&21?(bn(t,e)||(t=WS(),ze.lanes|=t,vs|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,$t=!0),n.memoizedState=t)}function Jb(n,e){var t=we;we=t!==0&&4>t?t:4,n(!0);var r=vp.transition;vp.transition={};try{n(!1),e()}finally{we=t,vp.transition=r}}function z0(){return mn().memoizedState}function Xb(n,e,t){var r=ai(n);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},$0(n))q0(e,t);else if(t=S0(n,e,t,r),t!==null){var i=Ut();kn(t,n,r,i),G0(t,e,r)}}function Zb(n,e,t){var r=ai(n),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if($0(n))q0(e,i);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(i.hasEagerState=!0,i.eagerState=a,bn(a,o)){var l=e.interleaved;l===null?(i.next=i,t_(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}t=S0(n,e,i,r),t!==null&&(i=Ut(),kn(t,n,r,i),G0(t,e,r))}}function $0(n){var e=n.alternate;return n===ze||e!==null&&e===ze}function q0(n,e){vl=bh=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function G0(n,e,t){if(t&4194240){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Bg(n,t)}}var Dh={readContext:pn,useCallback:At,useContext:At,useEffect:At,useImperativeHandle:At,useInsertionEffect:At,useLayoutEffect:At,useMemo:At,useReducer:At,useRef:At,useState:At,useDebugValue:At,useDeferredValue:At,useTransition:At,useMutableSource:At,useSyncExternalStore:At,useId:At,unstable_isNewReconciler:!1},eD={readContext:pn,useCallback:function(n,e){return On().memoizedState=[n,e===void 0?null:e],n},useContext:pn,useEffect:lE,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Yc(4194308,4,M0.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Yc(4194308,4,n,e)},useInsertionEffect:function(n,e){return Yc(4,2,n,e)},useMemo:function(n,e){var t=On();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var r=On();return e=t!==void 0?t(e):e,r.memoizedState=r.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},r.queue=n,n=n.dispatch=Xb.bind(null,ze,n),[r.memoizedState,n]},useRef:function(n){var e=On();return n={current:n},e.memoizedState=n},useState:aE,useDebugValue:c_,useDeferredValue:function(n){return On().memoizedState=n},useTransition:function(){var n=aE(!1),e=n[0];return n=Jb.bind(null,n[1]),On().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var r=ze,i=On();if(Le){if(t===void 0)throw Error(B(407));t=t()}else{if(t=e(),pt===null)throw Error(B(349));ys&30||P0(r,e,t)}i.memoizedState=t;var s={value:t,getSnapshot:e};return i.queue=s,lE(N0.bind(null,r,s,n),[n]),r.flags|=2048,Yl(9,x0.bind(null,r,s,t,e),void 0,null),t},useId:function(){var n=On(),e=pt.identifierPrefix;if(Le){var t=cr,r=ur;t=(r&~(1<<32-Rn(r)-1)).toString(32)+t,e=":"+e+"R"+t,t=Hl++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=Yb++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},tD={readContext:pn,useCallback:U0,useContext:pn,useEffect:u_,useImperativeHandle:F0,useInsertionEffect:O0,useLayoutEffect:L0,useMemo:j0,useReducer:wp,useRef:V0,useState:function(){return wp(Ql)},useDebugValue:c_,useDeferredValue:function(n){var e=mn();return B0(e,nt.memoizedState,n)},useTransition:function(){var n=wp(Ql)[0],e=mn().memoizedState;return[n,e]},useMutableSource:R0,useSyncExternalStore:k0,useId:z0,unstable_isNewReconciler:!1},nD={readContext:pn,useCallback:U0,useContext:pn,useEffect:u_,useImperativeHandle:F0,useInsertionEffect:O0,useLayoutEffect:L0,useMemo:j0,useReducer:Ep,useRef:V0,useState:function(){return Ep(Ql)},useDebugValue:c_,useDeferredValue:function(n){var e=mn();return nt===null?e.memoizedState=n:B0(e,nt.memoizedState,n)},useTransition:function(){var n=Ep(Ql)[0],e=mn().memoizedState;return[n,e]},useMutableSource:R0,useSyncExternalStore:k0,useId:z0,unstable_isNewReconciler:!1};function vn(n,e){if(n&&n.defaultProps){e=$e({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Am(n,e,t,r){e=n.memoizedState,t=t(r,e),t=t==null?e:$e({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Vd={isMounted:function(n){return(n=n._reactInternals)?Os(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=ai(n),s=gr(r,i);s.payload=e,t!=null&&(s.callback=t),e=si(n,s,i),e!==null&&(kn(e,n,i,r),Hc(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=ai(n),s=gr(r,i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=si(n,s,i),e!==null&&(kn(e,n,i,r),Hc(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Ut(),r=ai(n),i=gr(t,r);i.tag=2,e!=null&&(i.callback=e),e=si(n,i,r),e!==null&&(kn(e,n,r,t),Hc(e,n,r))}};function uE(n,e,t,r,i,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!zl(t,r)||!zl(i,s):!0}function W0(n,e,t){var r=!1,i=_i,s=e.contextType;return typeof s=="object"&&s!==null?s=pn(s):(i=Qt(e)?gs:Dt.current,r=e.contextTypes,s=(r=r!=null)?Do(n,i):_i),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Vd,n.stateNode=e,e._reactInternals=n,r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=s),e}function cE(n,e,t,r){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,r),e.state!==n&&Vd.enqueueReplaceState(e,e.state,null)}function Cm(n,e,t,r){var i=n.stateNode;i.props=t,i.state=n.memoizedState,i.refs={},n_(n);var s=e.contextType;typeof s=="object"&&s!==null?i.context=pn(s):(s=Qt(e)?gs:Dt.current,i.context=Do(n,s)),i.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Am(n,e,s,t),i.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Vd.enqueueReplaceState(i,i.state,null),xh(n,t,i,r),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308)}function Mo(n,e){try{var t="",r=e;do t+=xN(r),r=r.return;while(r);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:i,digest:null}}function Ip(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Rm(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var rD=typeof WeakMap=="function"?WeakMap:Map;function K0(n,e,t){t=gr(-1,t),t.tag=3,t.payload={element:null};var r=e.value;return t.callback=function(){Oh||(Oh=!0,Mm=r),Rm(n,e)},t}function H0(n,e,t){t=gr(-1,t),t.tag=3;var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;t.payload=function(){return r(i)},t.callback=function(){Rm(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Rm(n,e),typeof r!="function"&&(oi===null?oi=new Set([this]):oi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function hE(n,e,t){var r=n.pingCache;if(r===null){r=n.pingCache=new rD;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(t)||(i.add(t),n=_D.bind(null,n,e,t),e.then(n,n))}function dE(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function fE(n,e,t,r,i){return n.mode&1?(n.flags|=65536,n.lanes=i,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=gr(-1,1),e.tag=2,si(t,e,1))),t.lanes|=1),n)}var iD=kr.ReactCurrentOwner,$t=!1;function Mt(n,e,t,r){e.child=n===null?T0(e,null,t,r):Oo(e,n.child,t,r)}function pE(n,e,t,r,i){t=t.render;var s=e.ref;return Io(e,i),r=a_(n,e,t,r,s,i),t=l_(),n!==null&&!$t?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Er(n,e,i)):(Le&&t&&Qg(e),e.flags|=1,Mt(n,e,r,i),e.child)}function mE(n,e,t,r,i){if(n===null){var s=t.type;return typeof s=="function"&&!y_(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Q0(n,e,s,r,i)):(n=eh(t.type,null,r,e,e.mode,i),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&i)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:zl,t(o,r)&&n.ref===e.ref)return Er(n,e,i)}return e.flags|=1,n=li(s,r),n.ref=e.ref,n.return=e,e.child=n}function Q0(n,e,t,r,i){if(n!==null){var s=n.memoizedProps;if(zl(s,r)&&n.ref===e.ref)if($t=!1,e.pendingProps=r=s,(n.lanes&i)!==0)n.flags&131072&&($t=!0);else return e.lanes=n.lanes,Er(n,e,i)}return km(n,e,t,r,i)}function Y0(n,e,t){var r=e.pendingProps,i=r.children,s=n!==null?n.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Re(go,en),en|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,Re(go,en),en|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:t,Re(go,en),en|=r}else s!==null?(r=s.baseLanes|t,e.memoizedState=null):r=t,Re(go,en),en|=r;return Mt(n,e,i,t),e.child}function J0(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function km(n,e,t,r,i){var s=Qt(t)?gs:Dt.current;return s=Do(e,s),Io(e,i),t=a_(n,e,t,r,s,i),r=l_(),n!==null&&!$t?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Er(n,e,i)):(Le&&r&&Qg(e),e.flags|=1,Mt(n,e,t,i),e.child)}function gE(n,e,t,r,i){if(Qt(t)){var s=!0;Ah(e)}else s=!1;if(Io(e,i),e.stateNode===null)Jc(n,e),W0(e,t,r),Cm(e,t,r,i),r=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=pn(c):(c=Qt(t)?gs:Dt.current,c=Do(e,c));var h=t.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==c)&&cE(e,o,r,c),zr=!1;var p=e.memoizedState;o.state=p,xh(e,r,o,i),l=e.memoizedState,a!==r||p!==l||Ht.current||zr?(typeof h=="function"&&(Am(e,t,h,r),l=e.memoizedState),(a=zr||uE(e,t,a,r,p,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),o.props=r,o.state=l,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,A0(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:vn(e.type,a),o.props=c,d=e.pendingProps,p=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=pn(l):(l=Qt(t)?gs:Dt.current,l=Do(e,l));var g=t.getDerivedStateFromProps;(h=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||p!==l)&&cE(e,o,r,l),zr=!1,p=e.memoizedState,o.state=p,xh(e,r,o,i);var I=e.memoizedState;a!==d||p!==I||Ht.current||zr?(typeof g=="function"&&(Am(e,t,g,r),I=e.memoizedState),(c=zr||uE(e,t,c,r,p,I,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,I,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,I,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=I),o.props=r,o.state=I,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),r=!1)}return Pm(n,e,t,r,s,i)}function Pm(n,e,t,r,i,s){J0(n,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&tE(e,t,!1),Er(n,e,s);r=e.stateNode,iD.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,n!==null&&o?(e.child=Oo(e,n.child,null,s),e.child=Oo(e,null,a,s)):Mt(n,e,a,s),e.memoizedState=r.state,i&&tE(e,t,!0),e.child}function X0(n){var e=n.stateNode;e.pendingContext?eE(n,e.pendingContext,e.pendingContext!==e.context):e.context&&eE(n,e.context,!1),r_(n,e.containerInfo)}function _E(n,e,t,r,i){return Vo(),Jg(i),e.flags|=256,Mt(n,e,t,r),e.child}var xm={dehydrated:null,treeContext:null,retryLane:0};function Nm(n){return{baseLanes:n,cachePool:null,transitions:null}}function Z0(n,e,t){var r=e.pendingProps,i=Be.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(i|=1),Re(Be,i&1),n===null)return Tm(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,n=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Md(o,r,0,null),n=fs(n,r,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Nm(t),e.memoizedState=xm,n):h_(e,o));if(i=n.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return sD(n,e,o,r,a,i,t);if(s){s=r.fallback,o=e.mode,i=n.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=li(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=li(a,s):(s=fs(s,o,t,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=n.child.memoizedState,o=o===null?Nm(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=xm,r}return s=n.child,n=s.sibling,r=li(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=t),r.return=e,r.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=r,e.memoizedState=null,r}function h_(n,e){return e=Md({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function kc(n,e,t,r){return r!==null&&Jg(r),Oo(e,n.child,null,t),n=h_(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function sD(n,e,t,r,i,s,o){if(t)return e.flags&256?(e.flags&=-257,r=Ip(Error(B(422))),kc(n,e,o,r)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Md({mode:"visible",children:r.children},i,0,null),s=fs(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Oo(e,n.child,null,o),e.child.memoizedState=Nm(o),e.memoizedState=xm,s);if(!(e.mode&1))return kc(n,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(B(419)),r=Ip(s,r,void 0),kc(n,e,o,r)}if(a=(o&n.childLanes)!==0,$t||a){if(r=pt,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,wr(n,i),kn(r,n,i,-1))}return __(),r=Ip(Error(B(421))),kc(n,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=n.child,e=yD.bind(null,n),i._reactRetry=e,null):(n=s.treeContext,tn=ii(i.nextSibling),nn=e,Le=!0,En=null,n!==null&&(un[cn++]=ur,un[cn++]=cr,un[cn++]=_s,ur=n.id,cr=n.overflow,_s=e),e=h_(e,r.children),e.flags|=4096,e)}function yE(n,e,t){n.lanes|=e;var r=n.alternate;r!==null&&(r.lanes|=e),Sm(n.return,e,t)}function Tp(n,e,t,r,i){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=t,s.tailMode=i)}function eA(n,e,t){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Mt(n,e,r.children,t),r=Be.current,r&2)r=r&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&yE(n,t,e);else if(n.tag===19)yE(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}if(Re(Be,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(t=e.child,i=null;t!==null;)n=t.alternate,n!==null&&Nh(n)===null&&(i=t),t=t.sibling;t=i,t===null?(i=e.child,e.child=null):(i=t.sibling,t.sibling=null),Tp(e,!1,i,t,s);break;case"backwards":for(t=null,i=e.child,e.child=null;i!==null;){if(n=i.alternate,n!==null&&Nh(n)===null){e.child=i;break}n=i.sibling,i.sibling=t,t=i,i=n}Tp(e,!0,t,null,s);break;case"together":Tp(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Jc(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Er(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),vs|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(B(153));if(e.child!==null){for(n=e.child,t=li(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=li(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function oD(n,e,t){switch(e.tag){case 3:X0(e),Vo();break;case 5:C0(e);break;case 1:Qt(e.type)&&Ah(e);break;case 4:r_(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;Re(kh,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(Re(Be,Be.current&1),e.flags|=128,null):t&e.child.childLanes?Z0(n,e,t):(Re(Be,Be.current&1),n=Er(n,e,t),n!==null?n.sibling:null);Re(Be,Be.current&1);break;case 19:if(r=(t&e.childLanes)!==0,n.flags&128){if(r)return eA(n,e,t);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Re(Be,Be.current),r)break;return null;case 22:case 23:return e.lanes=0,Y0(n,e,t)}return Er(n,e,t)}var tA,bm,nA,rA;tA=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};bm=function(){};nA=function(n,e,t,r){var i=n.memoizedProps;if(i!==r){n=e.stateNode,as($n.current);var s=null;switch(t){case"input":i=em(n,i),r=em(n,r),s=[];break;case"select":i=$e({},i,{value:void 0}),r=$e({},r,{value:void 0}),s=[];break;case"textarea":i=rm(n,i),r=rm(n,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(n.onclick=Th)}sm(t,r);var o;t=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ol.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ol.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Pe("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};rA=function(n,e,t,r){t!==r&&(e.flags|=4)};function Ka(n,e){if(!Le)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:r.sibling=null}}function Ct(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,r=0;if(e)for(var i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=n,i=i.sibling;else for(i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=n,i=i.sibling;return n.subtreeFlags|=r,n.childLanes=t,e}function aD(n,e,t){var r=e.pendingProps;switch(Yg(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ct(e),null;case 1:return Qt(e.type)&&Sh(),Ct(e),null;case 3:return r=e.stateNode,Lo(),Ve(Ht),Ve(Dt),s_(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(n===null||n.child===null)&&(Cc(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,En!==null&&(jm(En),En=null))),bm(n,e),Ct(e),null;case 5:i_(e);var i=as(Kl.current);if(t=e.type,n!==null&&e.stateNode!=null)nA(n,e,t,r,i),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(B(166));return Ct(e),null}if(n=as($n.current),Cc(e)){r=e.stateNode,t=e.type;var s=e.memoizedProps;switch(r[Mn]=e,r[Gl]=s,n=(e.mode&1)!==0,t){case"dialog":Pe("cancel",r),Pe("close",r);break;case"iframe":case"object":case"embed":Pe("load",r);break;case"video":case"audio":for(i=0;i<al.length;i++)Pe(al[i],r);break;case"source":Pe("error",r);break;case"img":case"image":case"link":Pe("error",r),Pe("load",r);break;case"details":Pe("toggle",r);break;case"input":Rw(r,s),Pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Pe("invalid",r);break;case"textarea":Pw(r,s),Pe("invalid",r)}sm(t,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ac(r.textContent,a,n),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ac(r.textContent,a,n),i=["children",""+a]):Ol.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Pe("scroll",r)}switch(t){case"input":_c(r),kw(r,s,!0);break;case"textarea":_c(r),xw(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Th)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=NS(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof r.is=="string"?n=o.createElement(t,{is:r.is}):(n=o.createElement(t),t==="select"&&(o=n,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):n=o.createElementNS(n,t),n[Mn]=e,n[Gl]=r,tA(n,e,!1,!1),e.stateNode=n;e:{switch(o=om(t,r),t){case"dialog":Pe("cancel",n),Pe("close",n),i=r;break;case"iframe":case"object":case"embed":Pe("load",n),i=r;break;case"video":case"audio":for(i=0;i<al.length;i++)Pe(al[i],n);i=r;break;case"source":Pe("error",n),i=r;break;case"img":case"image":case"link":Pe("error",n),Pe("load",n),i=r;break;case"details":Pe("toggle",n),i=r;break;case"input":Rw(n,r),i=em(n,r),Pe("invalid",n);break;case"option":i=r;break;case"select":n._wrapperState={wasMultiple:!!r.multiple},i=$e({},r,{value:void 0}),Pe("invalid",n);break;case"textarea":Pw(n,r),i=rm(n,r),Pe("invalid",n);break;default:i=r}sm(t,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?VS(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&bS(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Ll(n,l):typeof l=="number"&&Ll(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ol.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Pe("scroll",n):l!=null&&Og(n,s,l,o))}switch(t){case"input":_c(n),kw(n,r,!1);break;case"textarea":_c(n),xw(n);break;case"option":r.value!=null&&n.setAttribute("value",""+gi(r.value));break;case"select":n.multiple=!!r.multiple,s=r.value,s!=null?yo(n,!!r.multiple,s,!1):r.defaultValue!=null&&yo(n,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(n.onclick=Th)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ct(e),null;case 6:if(n&&e.stateNode!=null)rA(n,e,n.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(B(166));if(t=as(Kl.current),as($n.current),Cc(e)){if(r=e.stateNode,t=e.memoizedProps,r[Mn]=e,(s=r.nodeValue!==t)&&(n=nn,n!==null))switch(n.tag){case 3:Ac(r.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ac(r.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Mn]=e,e.stateNode=r}return Ct(e),null;case 13:if(Ve(Be),r=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Le&&tn!==null&&e.mode&1&&!(e.flags&128))E0(),Vo(),e.flags|=98560,s=!1;else if(s=Cc(e),r!==null&&r.dehydrated!==null){if(n===null){if(!s)throw Error(B(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(B(317));s[Mn]=e}else Vo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ct(e),s=!1}else En!==null&&(jm(En),En=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(r=r!==null,r!==(n!==null&&n.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(n===null||Be.current&1?st===0&&(st=3):__())),e.updateQueue!==null&&(e.flags|=4),Ct(e),null);case 4:return Lo(),bm(n,e),n===null&&$l(e.stateNode.containerInfo),Ct(e),null;case 10:return e_(e.type._context),Ct(e),null;case 17:return Qt(e.type)&&Sh(),Ct(e),null;case 19:if(Ve(Be),s=e.memoizedState,s===null)return Ct(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ka(s,!1);else{if(st!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Nh(n),o!==null){for(e.flags|=128,Ka(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=t,t=e.child;t!==null;)s=t,n=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return Re(Be,Be.current&1|2),e.child}n=n.sibling}s.tail!==null&&Je()>Fo&&(e.flags|=128,r=!0,Ka(s,!1),e.lanes=4194304)}else{if(!r)if(n=Nh(o),n!==null){if(e.flags|=128,r=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Ka(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Le)return Ct(e),null}else 2*Je()-s.renderingStartTime>Fo&&t!==1073741824&&(e.flags|=128,r=!0,Ka(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Je(),e.sibling=null,t=Be.current,Re(Be,r?t&1|2:t&1),e):(Ct(e),null);case 22:case 23:return g_(),r=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?en&1073741824&&(Ct(e),e.subtreeFlags&6&&(e.flags|=8192)):Ct(e),null;case 24:return null;case 25:return null}throw Error(B(156,e.tag))}function lD(n,e){switch(Yg(e),e.tag){case 1:return Qt(e.type)&&Sh(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Lo(),Ve(Ht),Ve(Dt),s_(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return i_(e),null;case 13:if(Ve(Be),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(B(340));Vo()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Ve(Be),null;case 4:return Lo(),null;case 10:return e_(e.type._context),null;case 22:case 23:return g_(),null;case 24:return null;default:return null}}var Pc=!1,Pt=!1,uD=typeof WeakSet=="function"?WeakSet:Set,H=null;function mo(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){Ke(n,e,r)}else t.current=null}function Dm(n,e,t){try{t()}catch(r){Ke(n,e,r)}}var vE=!1;function cD(n,e){if(gm=wh,n=l0(),Hg(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=n,p=null;t:for(;;){for(var g;d!==t||i!==0&&d.nodeType!==3||(a=o+i),d!==s||r!==0&&d.nodeType!==3||(l=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(g=d.firstChild)!==null;)p=d,d=g;for(;;){if(d===n)break t;if(p===t&&++c===i&&(a=o),p===s&&++h===r&&(l=o),(g=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=g}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(_m={focusedElem:n,selectionRange:t},wh=!1,H=e;H!==null;)if(e=H,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,H=n;else for(;H!==null;){e=H;try{var I=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var P=I.memoizedProps,x=I.memoizedState,y=e.stateNode,E=y.getSnapshotBeforeUpdate(e.elementType===e.type?P:vn(e.type,P),x);y.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var A=e.stateNode.containerInfo;A.nodeType===1?A.textContent="":A.nodeType===9&&A.documentElement&&A.removeChild(A.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(V){Ke(e,e.return,V)}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}return I=vE,vE=!1,I}function wl(n,e,t){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&n)===n){var s=i.destroy;i.destroy=void 0,s!==void 0&&Dm(e,t,s)}i=i.next}while(i!==r)}}function Od(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var r=t.create;t.destroy=r()}t=t.next}while(t!==e)}}function Vm(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function iA(n){var e=n.alternate;e!==null&&(n.alternate=null,iA(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Mn],delete e[Gl],delete e[wm],delete e[Wb],delete e[Kb])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function sA(n){return n.tag===5||n.tag===3||n.tag===4}function wE(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||sA(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Om(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Th));else if(r!==4&&(n=n.child,n!==null))for(Om(n,e,t),n=n.sibling;n!==null;)Om(n,e,t),n=n.sibling}function Lm(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(r!==4&&(n=n.child,n!==null))for(Lm(n,e,t),n=n.sibling;n!==null;)Lm(n,e,t),n=n.sibling}var yt=null,wn=!1;function Mr(n,e,t){for(t=t.child;t!==null;)oA(n,e,t),t=t.sibling}function oA(n,e,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(Rd,t)}catch{}switch(t.tag){case 5:Pt||mo(t,e);case 6:var r=yt,i=wn;yt=null,Mr(n,e,t),yt=r,wn=i,yt!==null&&(wn?(n=yt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):yt.removeChild(t.stateNode));break;case 18:yt!==null&&(wn?(n=yt,t=t.stateNode,n.nodeType===8?gp(n.parentNode,t):n.nodeType===1&&gp(n,t),jl(n)):gp(yt,t.stateNode));break;case 4:r=yt,i=wn,yt=t.stateNode.containerInfo,wn=!0,Mr(n,e,t),yt=r,wn=i;break;case 0:case 11:case 14:case 15:if(!Pt&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Dm(t,e,o),i=i.next}while(i!==r)}Mr(n,e,t);break;case 1:if(!Pt&&(mo(t,e),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){Ke(t,e,a)}Mr(n,e,t);break;case 21:Mr(n,e,t);break;case 22:t.mode&1?(Pt=(r=Pt)||t.memoizedState!==null,Mr(n,e,t),Pt=r):Mr(n,e,t);break;default:Mr(n,e,t)}}function EE(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new uD),e.forEach(function(r){var i=vD.bind(null,n,r);t.has(r)||(t.add(r),r.then(i,i))})}}function yn(n,e){var t=e.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:yt=a.stateNode,wn=!1;break e;case 3:yt=a.stateNode.containerInfo,wn=!0;break e;case 4:yt=a.stateNode.containerInfo,wn=!0;break e}a=a.return}if(yt===null)throw Error(B(160));oA(s,o,i),yt=null,wn=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){Ke(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)aA(e,n),e=e.sibling}function aA(n,e){var t=n.alternate,r=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(yn(e,n),Vn(n),r&4){try{wl(3,n,n.return),Od(3,n)}catch(P){Ke(n,n.return,P)}try{wl(5,n,n.return)}catch(P){Ke(n,n.return,P)}}break;case 1:yn(e,n),Vn(n),r&512&&t!==null&&mo(t,t.return);break;case 5:if(yn(e,n),Vn(n),r&512&&t!==null&&mo(t,t.return),n.flags&32){var i=n.stateNode;try{Ll(i,"")}catch(P){Ke(n,n.return,P)}}if(r&4&&(i=n.stateNode,i!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&PS(i,s),om(a,o);var c=om(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?VS(i,d):h==="dangerouslySetInnerHTML"?bS(i,d):h==="children"?Ll(i,d):Og(i,h,d,c)}switch(a){case"input":tm(i,s);break;case"textarea":xS(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?yo(i,!!s.multiple,g,!1):p!==!!s.multiple&&(s.defaultValue!=null?yo(i,!!s.multiple,s.defaultValue,!0):yo(i,!!s.multiple,s.multiple?[]:"",!1))}i[Gl]=s}catch(P){Ke(n,n.return,P)}}break;case 6:if(yn(e,n),Vn(n),r&4){if(n.stateNode===null)throw Error(B(162));i=n.stateNode,s=n.memoizedProps;try{i.nodeValue=s}catch(P){Ke(n,n.return,P)}}break;case 3:if(yn(e,n),Vn(n),r&4&&t!==null&&t.memoizedState.isDehydrated)try{jl(e.containerInfo)}catch(P){Ke(n,n.return,P)}break;case 4:yn(e,n),Vn(n);break;case 13:yn(e,n),Vn(n),i=n.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(p_=Je())),r&4&&EE(n);break;case 22:if(h=t!==null&&t.memoizedState!==null,n.mode&1?(Pt=(c=Pt)||h,yn(e,n),Pt=c):yn(e,n),Vn(n),r&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!h&&n.mode&1)for(H=n,h=n.child;h!==null;){for(d=H=h;H!==null;){switch(p=H,g=p.child,p.tag){case 0:case 11:case 14:case 15:wl(4,p,p.return);break;case 1:mo(p,p.return);var I=p.stateNode;if(typeof I.componentWillUnmount=="function"){r=p,t=p.return;try{e=r,I.props=e.memoizedProps,I.state=e.memoizedState,I.componentWillUnmount()}catch(P){Ke(r,t,P)}}break;case 5:mo(p,p.return);break;case 22:if(p.memoizedState!==null){TE(d);continue}}g!==null?(g.return=p,H=g):TE(d)}h=h.sibling}e:for(h=null,d=n;;){if(d.tag===5){if(h===null){h=d;try{i=d.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=DS("display",o))}catch(P){Ke(n,n.return,P)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(P){Ke(n,n.return,P)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break e;for(;d.sibling===null;){if(d.return===null||d.return===n)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:yn(e,n),Vn(n),r&4&&EE(n);break;case 21:break;default:yn(e,n),Vn(n)}}function Vn(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(sA(t)){var r=t;break e}t=t.return}throw Error(B(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Ll(i,""),r.flags&=-33);var s=wE(n);Lm(n,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=wE(n);Om(n,a,o);break;default:throw Error(B(161))}}catch(l){Ke(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function hD(n,e,t){H=n,lA(n)}function lA(n,e,t){for(var r=(n.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Pc;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||Pt;a=Pc;var c=Pt;if(Pc=o,(Pt=l)&&!c)for(H=i;H!==null;)o=H,l=o.child,o.tag===22&&o.memoizedState!==null?SE(i):l!==null?(l.return=o,H=l):SE(i);for(;s!==null;)H=s,lA(s),s=s.sibling;H=i,Pc=a,Pt=c}IE(n)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):IE(n)}}function IE(n){for(;H!==null;){var e=H;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Pt||Od(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Pt)if(t===null)r.componentDidMount();else{var i=e.elementType===e.type?t.memoizedProps:vn(e.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&oE(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}oE(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&jl(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}Pt||e.flags&512&&Vm(e)}catch(p){Ke(e,e.return,p)}}if(e===n){H=null;break}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}}function TE(n){for(;H!==null;){var e=H;if(e===n){H=null;break}var t=e.sibling;if(t!==null){t.return=e.return,H=t;break}H=e.return}}function SE(n){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Od(4,e)}catch(l){Ke(e,t,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){Ke(e,i,l)}}var s=e.return;try{Vm(e)}catch(l){Ke(e,s,l)}break;case 5:var o=e.return;try{Vm(e)}catch(l){Ke(e,o,l)}}}catch(l){Ke(e,e.return,l)}if(e===n){H=null;break}var a=e.sibling;if(a!==null){a.return=e.return,H=a;break}H=e.return}}var dD=Math.ceil,Vh=kr.ReactCurrentDispatcher,d_=kr.ReactCurrentOwner,dn=kr.ReactCurrentBatchConfig,ge=0,pt=null,tt=null,wt=0,en=0,go=Vi(0),st=0,Jl=null,vs=0,Ld=0,f_=0,El=null,zt=null,p_=0,Fo=1/0,or=null,Oh=!1,Mm=null,oi=null,xc=!1,Xr=null,Lh=0,Il=0,Fm=null,Xc=-1,Zc=0;function Ut(){return ge&6?Je():Xc!==-1?Xc:Xc=Je()}function ai(n){return n.mode&1?ge&2&&wt!==0?wt&-wt:Qb.transition!==null?(Zc===0&&(Zc=WS()),Zc):(n=we,n!==0||(n=window.event,n=n===void 0?16:ZS(n.type)),n):1}function kn(n,e,t,r){if(50<Il)throw Il=0,Fm=null,Error(B(185));Eu(n,t,r),(!(ge&2)||n!==pt)&&(n===pt&&(!(ge&2)&&(Ld|=t),st===4&&qr(n,wt)),Yt(n,r),t===1&&ge===0&&!(e.mode&1)&&(Fo=Je()+500,bd&&Oi()))}function Yt(n,e){var t=n.callbackNode;QN(n,e);var r=vh(n,n===pt?wt:0);if(r===0)t!==null&&Dw(t),n.callbackNode=null,n.callbackPriority=0;else if(e=r&-r,n.callbackPriority!==e){if(t!=null&&Dw(t),e===1)n.tag===0?Hb(AE.bind(null,n)):y0(AE.bind(null,n)),qb(function(){!(ge&6)&&Oi()}),t=null;else{switch(KS(r)){case 1:t=jg;break;case 4:t=qS;break;case 16:t=yh;break;case 536870912:t=GS;break;default:t=yh}t=gA(t,uA.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function uA(n,e){if(Xc=-1,Zc=0,ge&6)throw Error(B(327));var t=n.callbackNode;if(To()&&n.callbackNode!==t)return null;var r=vh(n,n===pt?wt:0);if(r===0)return null;if(r&30||r&n.expiredLanes||e)e=Mh(n,r);else{e=r;var i=ge;ge|=2;var s=hA();(pt!==n||wt!==e)&&(or=null,Fo=Je()+500,ds(n,e));do try{mD();break}catch(a){cA(n,a)}while(!0);Zg(),Vh.current=s,ge=i,tt!==null?e=0:(pt=null,wt=0,e=st)}if(e!==0){if(e===2&&(i=hm(n),i!==0&&(r=i,e=Um(n,i))),e===1)throw t=Jl,ds(n,0),qr(n,r),Yt(n,Je()),t;if(e===6)qr(n,r);else{if(i=n.current.alternate,!(r&30)&&!fD(i)&&(e=Mh(n,r),e===2&&(s=hm(n),s!==0&&(r=s,e=Um(n,s))),e===1))throw t=Jl,ds(n,0),qr(n,r),Yt(n,Je()),t;switch(n.finishedWork=i,n.finishedLanes=r,e){case 0:case 1:throw Error(B(345));case 2:Ji(n,zt,or);break;case 3:if(qr(n,r),(r&130023424)===r&&(e=p_+500-Je(),10<e)){if(vh(n,0)!==0)break;if(i=n.suspendedLanes,(i&r)!==r){Ut(),n.pingedLanes|=n.suspendedLanes&i;break}n.timeoutHandle=vm(Ji.bind(null,n,zt,or),e);break}Ji(n,zt,or);break;case 4:if(qr(n,r),(r&4194240)===r)break;for(e=n.eventTimes,i=-1;0<r;){var o=31-Rn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Je()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*dD(r/1960))-r,10<r){n.timeoutHandle=vm(Ji.bind(null,n,zt,or),r);break}Ji(n,zt,or);break;case 5:Ji(n,zt,or);break;default:throw Error(B(329))}}}return Yt(n,Je()),n.callbackNode===t?uA.bind(null,n):null}function Um(n,e){var t=El;return n.current.memoizedState.isDehydrated&&(ds(n,e).flags|=256),n=Mh(n,e),n!==2&&(e=zt,zt=t,e!==null&&jm(e)),n}function jm(n){zt===null?zt=n:zt.push.apply(zt,n)}function fD(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],s=i.getSnapshot;i=i.value;try{if(!bn(s(),i))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function qr(n,e){for(e&=~f_,e&=~Ld,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Rn(e),r=1<<t;n[t]=-1,e&=~r}}function AE(n){if(ge&6)throw Error(B(327));To();var e=vh(n,0);if(!(e&1))return Yt(n,Je()),null;var t=Mh(n,e);if(n.tag!==0&&t===2){var r=hm(n);r!==0&&(e=r,t=Um(n,r))}if(t===1)throw t=Jl,ds(n,0),qr(n,e),Yt(n,Je()),t;if(t===6)throw Error(B(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Ji(n,zt,or),Yt(n,Je()),null}function m_(n,e){var t=ge;ge|=1;try{return n(e)}finally{ge=t,ge===0&&(Fo=Je()+500,bd&&Oi())}}function ws(n){Xr!==null&&Xr.tag===0&&!(ge&6)&&To();var e=ge;ge|=1;var t=dn.transition,r=we;try{if(dn.transition=null,we=1,n)return n()}finally{we=r,dn.transition=t,ge=e,!(ge&6)&&Oi()}}function g_(){en=go.current,Ve(go)}function ds(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,$b(t)),tt!==null)for(t=tt.return;t!==null;){var r=t;switch(Yg(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Sh();break;case 3:Lo(),Ve(Ht),Ve(Dt),s_();break;case 5:i_(r);break;case 4:Lo();break;case 13:Ve(Be);break;case 19:Ve(Be);break;case 10:e_(r.type._context);break;case 22:case 23:g_()}t=t.return}if(pt=n,tt=n=li(n.current,null),wt=en=e,st=0,Jl=null,f_=Ld=vs=0,zt=El=null,os!==null){for(e=0;e<os.length;e++)if(t=os[e],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,s=t.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}t.pending=r}os=null}return n}function cA(n,e){do{var t=tt;try{if(Zg(),Qc.current=Dh,bh){for(var r=ze.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}bh=!1}if(ys=0,ct=nt=ze=null,vl=!1,Hl=0,d_.current=null,t===null||t.return===null){st=1,Jl=e,tt=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=wt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var g=dE(o);if(g!==null){g.flags&=-257,fE(g,o,a,s,e),g.mode&1&&hE(s,c,e),e=g,l=c;var I=e.updateQueue;if(I===null){var P=new Set;P.add(l),e.updateQueue=P}else I.add(l);break e}else{if(!(e&1)){hE(s,c,e),__();break e}l=Error(B(426))}}else if(Le&&a.mode&1){var x=dE(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),fE(x,o,a,s,e),Jg(Mo(l,a));break e}}s=l=Mo(l,a),st!==4&&(st=2),El===null?El=[s]:El.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var y=K0(s,l,e);sE(s,y);break e;case 1:a=l;var E=s.type,A=s.stateNode;if(!(s.flags&128)&&(typeof E.getDerivedStateFromError=="function"||A!==null&&typeof A.componentDidCatch=="function"&&(oi===null||!oi.has(A)))){s.flags|=65536,e&=-e,s.lanes|=e;var V=H0(s,a,e);sE(s,V);break e}}s=s.return}while(s!==null)}fA(t)}catch(F){e=F,tt===t&&t!==null&&(tt=t=t.return);continue}break}while(!0)}function hA(){var n=Vh.current;return Vh.current=Dh,n===null?Dh:n}function __(){(st===0||st===3||st===2)&&(st=4),pt===null||!(vs&268435455)&&!(Ld&268435455)||qr(pt,wt)}function Mh(n,e){var t=ge;ge|=2;var r=hA();(pt!==n||wt!==e)&&(or=null,ds(n,e));do try{pD();break}catch(i){cA(n,i)}while(!0);if(Zg(),ge=t,Vh.current=r,tt!==null)throw Error(B(261));return pt=null,wt=0,st}function pD(){for(;tt!==null;)dA(tt)}function mD(){for(;tt!==null&&!jN();)dA(tt)}function dA(n){var e=mA(n.alternate,n,en);n.memoizedProps=n.pendingProps,e===null?fA(n):tt=e,d_.current=null}function fA(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=lD(t,e),t!==null){t.flags&=32767,tt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{st=6,tt=null;return}}else if(t=aD(t,e,en),t!==null){tt=t;return}if(e=e.sibling,e!==null){tt=e;return}tt=e=n}while(e!==null);st===0&&(st=5)}function Ji(n,e,t){var r=we,i=dn.transition;try{dn.transition=null,we=1,gD(n,e,t,r)}finally{dn.transition=i,we=r}return null}function gD(n,e,t,r){do To();while(Xr!==null);if(ge&6)throw Error(B(327));t=n.finishedWork;var i=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(B(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(YN(n,s),n===pt&&(tt=pt=null,wt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||xc||(xc=!0,gA(yh,function(){return To(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=dn.transition,dn.transition=null;var o=we;we=1;var a=ge;ge|=4,d_.current=null,cD(n,t),aA(t,n),Lb(_m),wh=!!gm,_m=gm=null,n.current=t,hD(t),BN(),ge=a,we=o,dn.transition=s}else n.current=t;if(xc&&(xc=!1,Xr=n,Lh=i),s=n.pendingLanes,s===0&&(oi=null),qN(t.stateNode),Yt(n,Je()),e!==null)for(r=n.onRecoverableError,t=0;t<e.length;t++)i=e[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(Oh)throw Oh=!1,n=Mm,Mm=null,n;return Lh&1&&n.tag!==0&&To(),s=n.pendingLanes,s&1?n===Fm?Il++:(Il=0,Fm=n):Il=0,Oi(),null}function To(){if(Xr!==null){var n=KS(Lh),e=dn.transition,t=we;try{if(dn.transition=null,we=16>n?16:n,Xr===null)var r=!1;else{if(n=Xr,Xr=null,Lh=0,ge&6)throw Error(B(331));var i=ge;for(ge|=4,H=n.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(H=c;H!==null;){var h=H;switch(h.tag){case 0:case 11:case 15:wl(8,h,s)}var d=h.child;if(d!==null)d.return=h,H=d;else for(;H!==null;){h=H;var p=h.sibling,g=h.return;if(iA(h),h===c){H=null;break}if(p!==null){p.return=g,H=p;break}H=g}}}var I=s.alternate;if(I!==null){var P=I.child;if(P!==null){I.child=null;do{var x=P.sibling;P.sibling=null,P=x}while(P!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:wl(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,H=y;break e}H=s.return}}var E=n.current;for(H=E;H!==null;){o=H;var A=o.child;if(o.subtreeFlags&2064&&A!==null)A.return=o,H=A;else e:for(o=E;H!==null;){if(a=H,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Od(9,a)}}catch(F){Ke(a,a.return,F)}if(a===o){H=null;break e}var V=a.sibling;if(V!==null){V.return=a.return,H=V;break e}H=a.return}}if(ge=i,Oi(),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(Rd,n)}catch{}r=!0}return r}finally{we=t,dn.transition=e}}return!1}function CE(n,e,t){e=Mo(t,e),e=K0(n,e,1),n=si(n,e,1),e=Ut(),n!==null&&(Eu(n,1,e),Yt(n,e))}function Ke(n,e,t){if(n.tag===3)CE(n,n,t);else for(;e!==null;){if(e.tag===3){CE(e,n,t);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(oi===null||!oi.has(r))){n=Mo(t,n),n=H0(e,n,1),e=si(e,n,1),n=Ut(),e!==null&&(Eu(e,1,n),Yt(e,n));break}}e=e.return}}function _D(n,e,t){var r=n.pingCache;r!==null&&r.delete(e),e=Ut(),n.pingedLanes|=n.suspendedLanes&t,pt===n&&(wt&t)===t&&(st===4||st===3&&(wt&130023424)===wt&&500>Je()-p_?ds(n,0):f_|=t),Yt(n,e)}function pA(n,e){e===0&&(n.mode&1?(e=wc,wc<<=1,!(wc&130023424)&&(wc=4194304)):e=1);var t=Ut();n=wr(n,e),n!==null&&(Eu(n,e,t),Yt(n,t))}function yD(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),pA(n,t)}function vD(n,e){var t=0;switch(n.tag){case 13:var r=n.stateNode,i=n.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=n.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(e),pA(n,t)}var mA;mA=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Ht.current)$t=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return $t=!1,oD(n,e,t);$t=!!(n.flags&131072)}else $t=!1,Le&&e.flags&1048576&&v0(e,Rh,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Jc(n,e),n=e.pendingProps;var i=Do(e,Dt.current);Io(e,t),i=a_(null,e,r,n,i,t);var s=l_();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Qt(r)?(s=!0,Ah(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,n_(e),i.updater=Vd,e.stateNode=i,i._reactInternals=e,Cm(e,r,n,t),e=Pm(null,e,r,!0,s,t)):(e.tag=0,Le&&s&&Qg(e),Mt(null,e,i,t),e=e.child),e;case 16:r=e.elementType;e:{switch(Jc(n,e),n=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=ED(r),n=vn(r,n),i){case 0:e=km(null,e,r,n,t);break e;case 1:e=gE(null,e,r,n,t);break e;case 11:e=pE(null,e,r,n,t);break e;case 14:e=mE(null,e,r,vn(r.type,n),t);break e}throw Error(B(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:vn(r,i),km(n,e,r,i,t);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:vn(r,i),gE(n,e,r,i,t);case 3:e:{if(X0(e),n===null)throw Error(B(387));r=e.pendingProps,s=e.memoizedState,i=s.element,A0(n,e),xh(e,r,null,t);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Mo(Error(B(423)),e),e=_E(n,e,r,t,i);break e}else if(r!==i){i=Mo(Error(B(424)),e),e=_E(n,e,r,t,i);break e}else for(tn=ii(e.stateNode.containerInfo.firstChild),nn=e,Le=!0,En=null,t=T0(e,null,r,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Vo(),r===i){e=Er(n,e,t);break e}Mt(n,e,r,t)}e=e.child}return e;case 5:return C0(e),n===null&&Tm(e),r=e.type,i=e.pendingProps,s=n!==null?n.memoizedProps:null,o=i.children,ym(r,i)?o=null:s!==null&&ym(r,s)&&(e.flags|=32),J0(n,e),Mt(n,e,o,t),e.child;case 6:return n===null&&Tm(e),null;case 13:return Z0(n,e,t);case 4:return r_(e,e.stateNode.containerInfo),r=e.pendingProps,n===null?e.child=Oo(e,null,r,t):Mt(n,e,r,t),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:vn(r,i),pE(n,e,r,i,t);case 7:return Mt(n,e,e.pendingProps,t),e.child;case 8:return Mt(n,e,e.pendingProps.children,t),e.child;case 12:return Mt(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,Re(kh,r._currentValue),r._currentValue=o,s!==null)if(bn(s.value,o)){if(s.children===i.children&&!Ht.current){e=Er(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=gr(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),Sm(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(B(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),Sm(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Mt(n,e,i.children,t),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Io(e,t),i=pn(i),r=r(i),e.flags|=1,Mt(n,e,r,t),e.child;case 14:return r=e.type,i=vn(r,e.pendingProps),i=vn(r.type,i),mE(n,e,r,i,t);case 15:return Q0(n,e,e.type,e.pendingProps,t);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:vn(r,i),Jc(n,e),e.tag=1,Qt(r)?(n=!0,Ah(e)):n=!1,Io(e,t),W0(e,r,i),Cm(e,r,i,t),Pm(null,e,r,!0,n,t);case 19:return eA(n,e,t);case 22:return Y0(n,e,t)}throw Error(B(156,e.tag))};function gA(n,e){return $S(n,e)}function wD(n,e,t,r){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hn(n,e,t,r){return new wD(n,e,t,r)}function y_(n){return n=n.prototype,!(!n||!n.isReactComponent)}function ED(n){if(typeof n=="function")return y_(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Mg)return 11;if(n===Fg)return 14}return 2}function li(n,e){var t=n.alternate;return t===null?(t=hn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function eh(n,e,t,r,i,s){var o=2;if(r=n,typeof n=="function")y_(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case so:return fs(t.children,i,s,e);case Lg:o=8,i|=8;break;case Yp:return n=hn(12,t,e,i|2),n.elementType=Yp,n.lanes=s,n;case Jp:return n=hn(13,t,e,i),n.elementType=Jp,n.lanes=s,n;case Xp:return n=hn(19,t,e,i),n.elementType=Xp,n.lanes=s,n;case CS:return Md(t,i,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case SS:o=10;break e;case AS:o=9;break e;case Mg:o=11;break e;case Fg:o=14;break e;case Br:o=16,r=null;break e}throw Error(B(130,n==null?n:typeof n,""))}return e=hn(o,t,e,i),e.elementType=n,e.type=r,e.lanes=s,e}function fs(n,e,t,r){return n=hn(7,n,r,e),n.lanes=t,n}function Md(n,e,t,r){return n=hn(22,n,r,e),n.elementType=CS,n.lanes=t,n.stateNode={isHidden:!1},n}function Sp(n,e,t){return n=hn(6,n,null,e),n.lanes=t,n}function Ap(n,e,t){return e=hn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function ID(n,e,t,r,i){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=sp(0),this.expirationTimes=sp(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=sp(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function v_(n,e,t,r,i,s,o,a,l){return n=new ID(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=hn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},n_(s),n}function TD(n,e,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:io,key:r==null?null:""+r,children:n,containerInfo:e,implementation:t}}function _A(n){if(!n)return _i;n=n._reactInternals;e:{if(Os(n)!==n||n.tag!==1)throw Error(B(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Qt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(B(171))}if(n.tag===1){var t=n.type;if(Qt(t))return _0(n,t,e)}return e}function yA(n,e,t,r,i,s,o,a,l){return n=v_(t,r,!0,n,i,s,o,a,l),n.context=_A(null),t=n.current,r=Ut(),i=ai(t),s=gr(r,i),s.callback=e??null,si(t,s,i),n.current.lanes=i,Eu(n,i,r),Yt(n,r),n}function Fd(n,e,t,r){var i=e.current,s=Ut(),o=ai(i);return t=_A(t),e.context===null?e.context=t:e.pendingContext=t,e=gr(s,o),e.payload={element:n},r=r===void 0?null:r,r!==null&&(e.callback=r),n=si(i,e,o),n!==null&&(kn(n,i,o,s),Hc(n,i,o)),o}function Fh(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function RE(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function w_(n,e){RE(n,e),(n=n.alternate)&&RE(n,e)}function SD(){return null}var vA=typeof reportError=="function"?reportError:function(n){console.error(n)};function E_(n){this._internalRoot=n}Ud.prototype.render=E_.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(B(409));Fd(n,e,null,null)};Ud.prototype.unmount=E_.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;ws(function(){Fd(null,n,null,null)}),e[vr]=null}};function Ud(n){this._internalRoot=n}Ud.prototype.unstable_scheduleHydration=function(n){if(n){var e=YS();n={blockedOn:null,target:n,priority:e};for(var t=0;t<$r.length&&e!==0&&e<$r[t].priority;t++);$r.splice(t,0,n),t===0&&XS(n)}};function I_(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function jd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function kE(){}function AD(n,e,t,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=Fh(o);s.call(c)}}var o=yA(e,r,n,0,null,!1,!1,"",kE);return n._reactRootContainer=o,n[vr]=o.current,$l(n.nodeType===8?n.parentNode:n),ws(),o}for(;i=n.lastChild;)n.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=Fh(l);a.call(c)}}var l=v_(n,0,!1,null,null,!1,!1,"",kE);return n._reactRootContainer=l,n[vr]=l.current,$l(n.nodeType===8?n.parentNode:n),ws(function(){Fd(e,l,t,r)}),l}function Bd(n,e,t,r,i){var s=t._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=Fh(o);a.call(l)}}Fd(e,o,n,i)}else o=AD(t,e,n,i,r);return Fh(o)}HS=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=ol(e.pendingLanes);t!==0&&(Bg(e,t|1),Yt(e,Je()),!(ge&6)&&(Fo=Je()+500,Oi()))}break;case 13:ws(function(){var r=wr(n,1);if(r!==null){var i=Ut();kn(r,n,1,i)}}),w_(n,1)}};zg=function(n){if(n.tag===13){var e=wr(n,134217728);if(e!==null){var t=Ut();kn(e,n,134217728,t)}w_(n,134217728)}};QS=function(n){if(n.tag===13){var e=ai(n),t=wr(n,e);if(t!==null){var r=Ut();kn(t,n,e,r)}w_(n,e)}};YS=function(){return we};JS=function(n,e){var t=we;try{return we=n,e()}finally{we=t}};lm=function(n,e,t){switch(e){case"input":if(tm(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var r=t[e];if(r!==n&&r.form===n.form){var i=Nd(r);if(!i)throw Error(B(90));kS(r),tm(r,i)}}}break;case"textarea":xS(n,t);break;case"select":e=t.value,e!=null&&yo(n,!!t.multiple,e,!1)}};MS=m_;FS=ws;var CD={usingClientEntryPoint:!1,Events:[Tu,uo,Nd,OS,LS,m_]},Ha={findFiberByHostInstance:ss,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},RD={bundleType:Ha.bundleType,version:Ha.version,rendererPackageName:Ha.rendererPackageName,rendererConfig:Ha.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:kr.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=BS(n),n===null?null:n.stateNode},findFiberByHostInstance:Ha.findFiberByHostInstance||SD,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nc.isDisabled&&Nc.supportsFiber)try{Rd=Nc.inject(RD),zn=Nc}catch{}}an.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=CD;an.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!I_(e))throw Error(B(200));return TD(n,e,null,t)};an.createRoot=function(n,e){if(!I_(n))throw Error(B(299));var t=!1,r="",i=vA;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=v_(n,1,!1,null,null,t,!1,r,i),n[vr]=e.current,$l(n.nodeType===8?n.parentNode:n),new E_(e)};an.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(B(188)):(n=Object.keys(n).join(","),Error(B(268,n)));return n=BS(e),n=n===null?null:n.stateNode,n};an.flushSync=function(n){return ws(n)};an.hydrate=function(n,e,t){if(!jd(e))throw Error(B(200));return Bd(null,n,e,!0,t)};an.hydrateRoot=function(n,e,t){if(!I_(n))throw Error(B(405));var r=t!=null&&t.hydratedSources||null,i=!1,s="",o=vA;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=yA(e,null,n,1,t??null,i,!1,s,o),n[vr]=e.current,$l(n),r)for(n=0;n<r.length;n++)t=r[n],i=t._getVersion,i=i(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,i]:e.mutableSourceEagerHydrationData.push(t,i);return new Ud(e)};an.render=function(n,e,t){if(!jd(e))throw Error(B(200));return Bd(null,n,e,!1,t)};an.unmountComponentAtNode=function(n){if(!jd(n))throw Error(B(40));return n._reactRootContainer?(ws(function(){Bd(null,null,n,!1,function(){n._reactRootContainer=null,n[vr]=null})}),!0):!1};an.unstable_batchedUpdates=m_;an.unstable_renderSubtreeIntoContainer=function(n,e,t,r){if(!jd(t))throw Error(B(200));if(n==null||n._reactInternals===void 0)throw Error(B(38));return Bd(n,e,t,!1,r)};an.version="18.3.1-next-f1338f8080-20240426";function wA(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wA)}catch(n){console.error(n)}}wA(),wS.exports=an;var kD=wS.exports,EA,PE=kD;EA=PE.createRoot,PE.hydrateRoot;var xE={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IA={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z=function(n,e){if(!n)throw ua(e)},ua=function(n){return new Error("Firebase Database ("+IA.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TA=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},PD=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},T_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,h=s>>2,d=(s&3)<<4|a>>4;let p=(a&15)<<2|c>>6,g=c&63;l||(g=64,o||(p=64)),r.push(t[h],t[d],t[p],t[g])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(TA(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):PD(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const d=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||c==null||d==null)throw new xD;const p=s<<2|a>>4;if(r.push(p),c!==64){const g=a<<4&240|c>>2;if(r.push(g),d!==64){const I=c<<6&192|d;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class xD extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const SA=function(n){const e=TA(n);return T_.encodeByteArray(e,!0)},Uh=function(n){return SA(n).replace(/\./g,"")},jh=function(n){try{return T_.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ND(n){return AA(void 0,n)}function AA(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!bD(t)||(n[t]=AA(n[t],e[t]));return n}function bD(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DD(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VD=()=>DD().__FIREBASE_DEFAULTS__,OD=()=>{if(typeof process>"u"||typeof xE>"u")return;const n=xE.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},LD=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&jh(n[1]);return e&&JSON.parse(e)},zd=()=>{try{return VD()||OD()||LD()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},CA=n=>{var e,t;return(t=(e=zd())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},S_=n=>{const e=CA(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},RA=()=>{var n;return(n=zd())===null||n===void 0?void 0:n.config},kA=n=>{var e;return(e=zd())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Uh(JSON.stringify(t)),Uh(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function C_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function MD(){var n;const e=(n=zd())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function FD(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function UD(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function PA(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function jD(){const n=ot();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function BD(){return IA.NODE_ADMIN===!0}function xA(){return!MD()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function NA(){try{return typeof indexedDB=="object"}catch{return!1}}function zD(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $D="FirebaseError";class Yn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=$D,Object.setPrototypeOf(this,Yn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Au.prototype.create)}}class Au{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?qD(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Yn(i,a,r)}}function qD(n,e){return n.replace(GD,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const GD=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xl(n){return JSON.parse(n)}function rt(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bA=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=Xl(jh(s[0])||""),t=Xl(jh(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},WD=function(n){const e=bA(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},KD=function(n){const e=bA(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Uo(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Bm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Bh(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function yi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(NE(s)&&NE(o)){if(!yi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function NE(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ll(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ul(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HD{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)r[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const p=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(p<<1|p>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let d=0;d<80;d++){d<40?d<20?(c=a^s&(o^a),h=1518500249):(c=s^o^a,h=1859775393):d<60?(c=s&o|a&(s|o),h=2400959708):(c=s^o^a,h=3395469782);const p=(i<<5|i>>>27)+c+l+h+r[d]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=p}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function QD(n,e){const t=new YD(n,e);return t.subscribe.bind(t)}class YD{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");JD(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Cp),i.error===void 0&&(i.error=Cp),i.complete===void 0&&(i.complete=Cp);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function JD(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Cp(){}function R_(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XD=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,z(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},qd=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n){return n&&n._delegate?n._delegate:n}class Ir{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZD{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new $d;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(t1(e))try{this.getOrInitializeService({instanceIdentifier:Xi})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Xi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xi){return this.instances.has(e)}getOptions(e=Xi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:e1(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Xi){return this.component?this.component.multipleInstances?e:Xi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function e1(n){return n===Xi?void 0:n}function t1(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new ZD(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));const r1={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},i1=ae.INFO,s1={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},o1=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=s1[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gd{constructor(e){this.name=e,this._logLevel=i1,this._logHandler=o1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?r1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const a1=(n,e)=>e.some(t=>n instanceof t);let bE,DE;function l1(){return bE||(bE=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function u1(){return DE||(DE=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const DA=new WeakMap,zm=new WeakMap,VA=new WeakMap,Rp=new WeakMap,k_=new WeakMap;function c1(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ui(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&DA.set(t,n)}).catch(()=>{}),k_.set(e,n),e}function h1(n){if(zm.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});zm.set(n,e)}let $m={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return zm.get(n);if(e==="objectStoreNames")return n.objectStoreNames||VA.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ui(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function d1(n){$m=n($m)}function f1(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(kp(this),e,...t);return VA.set(r,e.sort?e.sort():[e]),ui(r)}:u1().includes(n)?function(...e){return n.apply(kp(this),e),ui(DA.get(this))}:function(...e){return ui(n.apply(kp(this),e))}}function p1(n){return typeof n=="function"?f1(n):(n instanceof IDBTransaction&&h1(n),a1(n,l1())?new Proxy(n,$m):n)}function ui(n){if(n instanceof IDBRequest)return c1(n);if(Rp.has(n))return Rp.get(n);const e=p1(n);return e!==n&&(Rp.set(n,e),k_.set(e,n)),e}const kp=n=>k_.get(n);function m1(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=ui(o);return r&&o.addEventListener("upgradeneeded",l=>{r(ui(o.result),l.oldVersion,l.newVersion,ui(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const g1=["get","getKey","getAll","getAllKeys","count"],_1=["put","add","delete","clear"],Pp=new Map;function VE(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Pp.get(e))return Pp.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=_1.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||g1.includes(t)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Pp.set(e,s),s}d1(n=>({...n,get:(e,t,r)=>VE(e,t)||n.get(e,t,r),has:(e,t)=>!!VE(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(v1(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function v1(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qm="@firebase/app",OE="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=new Gd("@firebase/app"),w1="@firebase/app-compat",E1="@firebase/analytics-compat",I1="@firebase/analytics",T1="@firebase/app-check-compat",S1="@firebase/app-check",A1="@firebase/auth",C1="@firebase/auth-compat",R1="@firebase/database",k1="@firebase/data-connect",P1="@firebase/database-compat",x1="@firebase/functions",N1="@firebase/functions-compat",b1="@firebase/installations",D1="@firebase/installations-compat",V1="@firebase/messaging",O1="@firebase/messaging-compat",L1="@firebase/performance",M1="@firebase/performance-compat",F1="@firebase/remote-config",U1="@firebase/remote-config-compat",j1="@firebase/storage",B1="@firebase/storage-compat",z1="@firebase/firestore",$1="@firebase/vertexai-preview",q1="@firebase/firestore-compat",G1="firebase",W1="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh="[DEFAULT]",K1={[qm]:"fire-core",[w1]:"fire-core-compat",[I1]:"fire-analytics",[E1]:"fire-analytics-compat",[S1]:"fire-app-check",[T1]:"fire-app-check-compat",[A1]:"fire-auth",[C1]:"fire-auth-compat",[R1]:"fire-rtdb",[k1]:"fire-data-connect",[P1]:"fire-rtdb-compat",[x1]:"fire-fn",[N1]:"fire-fn-compat",[b1]:"fire-iid",[D1]:"fire-iid-compat",[V1]:"fire-fcm",[O1]:"fire-fcm-compat",[L1]:"fire-perf",[M1]:"fire-perf-compat",[F1]:"fire-rc",[U1]:"fire-rc-compat",[j1]:"fire-gcs",[B1]:"fire-gcs-compat",[z1]:"fire-fst",[q1]:"fire-fst-compat",[$1]:"fire-vertex","fire-js":"fire-js",[G1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $h=new Map,H1=new Map,Gm=new Map;function LE(n,e){try{n.container.addComponent(e)}catch(t){Tr.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function vi(n){const e=n.name;if(Gm.has(e))return Tr.debug(`There were multiple attempts to register component ${e}.`),!1;Gm.set(e,n);for(const t of $h.values())LE(t,n);for(const t of H1.values())LE(t,n);return!0}function Ls(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Q1(n,e,t=zh){Ls(n,e).clearInstance(t)}function Un(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ci=new Au("app","Firebase",Y1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J1{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ir("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ci.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Li=W1;function OA(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:zh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw ci.create("bad-app-name",{appName:String(i)});if(t||(t=RA()),!t)throw ci.create("no-options");const s=$h.get(i);if(s){if(yi(t,s.options)&&yi(r,s.config))return s;throw ci.create("duplicate-app",{appName:i})}const o=new n1(i);for(const l of Gm.values())o.addComponent(l);const a=new J1(t,r,o);return $h.set(i,a),a}function Wd(n=zh){const e=$h.get(n);if(!e&&n===zh&&RA())return OA();if(!e)throw ci.create("no-app",{appName:n});return e}function fn(n,e,t){var r;let i=(r=K1[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tr.warn(a.join(" "));return}vi(new Ir(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X1="firebase-heartbeat-database",Z1=1,Zl="firebase-heartbeat-store";let xp=null;function LA(){return xp||(xp=m1(X1,Z1,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Zl)}catch(t){console.warn(t)}}}}).catch(n=>{throw ci.create("idb-open",{originalErrorMessage:n.message})})),xp}async function eV(n){try{const t=(await LA()).transaction(Zl),r=await t.objectStore(Zl).get(MA(n));return await t.done,r}catch(e){if(e instanceof Yn)Tr.warn(e.message);else{const t=ci.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tr.warn(t.message)}}}async function ME(n,e){try{const r=(await LA()).transaction(Zl,"readwrite");await r.objectStore(Zl).put(e,MA(n)),await r.done}catch(t){if(t instanceof Yn)Tr.warn(t.message);else{const r=ci.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Tr.warn(r.message)}}}function MA(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tV=1024,nV=30*24*60*60*1e3;class rV{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new sV(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=FE();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=nV}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Tr.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=FE(),{heartbeatsToSend:r,unsentEntries:i}=iV(this._heartbeatsCache.heartbeats),s=Uh(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Tr.warn(t),""}}}function FE(){return new Date().toISOString().substring(0,10)}function iV(n,e=tV){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),UE(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),UE(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class sV{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return NA()?zD().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await eV(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ME(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return ME(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function UE(n){return Uh(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oV(n){vi(new Ir("platform-logger",e=>new y1(e),"PRIVATE")),vi(new Ir("heartbeat",e=>new rV(e),"PRIVATE")),fn(qm,OE,n),fn(qm,OE,"esm2017"),fn("fire-js","")}oV("");function P_(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function FA(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const aV=FA,UA=new Au("auth","Firebase",FA());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh=new Gd("@firebase/auth");function lV(n,...e){qh.logLevel<=ae.WARN&&qh.warn(`Auth (${Li}): ${n}`,...e)}function th(n,...e){qh.logLevel<=ae.ERROR&&qh.error(`Auth (${Li}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(n,...e){throw N_(n,...e)}function Pn(n,...e){return N_(n,...e)}function x_(n,e,t){const r=Object.assign(Object.assign({},aV()),{[e]:t});return new Au("auth","Firebase",r).create(e,{appName:n.name})}function hi(n){return x_(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function uV(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&gn(n,"argument-error"),x_(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function N_(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return UA.create(n,...e)}function Z(n,e,...t){if(!n)throw N_(e,...t)}function hr(n){const e="INTERNAL ASSERTION FAILED: "+n;throw th(e),new Error(e)}function Sr(n,e){n||hr(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function cV(){return jE()==="http:"||jE()==="https:"}function jE(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(cV()||UD()||"connection"in navigator)?navigator.onLine:!0}function dV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e,t){this.shortDelay=e,this.longDelay=t,Sr(t>e,"Short delay should be less than long delay!"),this.isMobile=C_()||PA()}get(){return hV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(n,e){Sr(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jA{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;hr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;hr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;hr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pV=new Cu(3e4,6e4);function Ms(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Mi(n,e,t,r,i={}){return BA(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=ca(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},s);return FD()||(c.referrerPolicy="no-referrer"),jA.fetch()(zA(n,n.config.apiHost,t,a),c)})}async function BA(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},fV),e);try{const i=new gV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw bc(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw bc(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw bc(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw bc(n,"user-disabled",o);const h=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw x_(n,h,c);gn(n,h)}}catch(i){if(i instanceof Yn)throw i;gn(n,"network-request-failed",{message:String(i)})}}async function Kd(n,e,t,r,i={}){const s=await Mi(n,e,t,r,i);return"mfaPendingCredential"in s&&gn(n,"multi-factor-auth-required",{_serverResponse:s}),s}function zA(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?b_(n.config,i):`${n.config.apiScheme}://${i}`}function mV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class gV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Pn(this.auth,"network-request-failed")),pV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function bc(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Pn(n,e,r);return i.customData._tokenResponse=t,i}function BE(n){return n!==void 0&&n.enterprise!==void 0}class _V{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return mV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function yV(n,e){return Mi(n,"GET","/v2/recaptchaConfig",Ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vV(n,e){return Mi(n,"POST","/v1/accounts:delete",e)}async function $A(n,e){return Mi(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function wV(n,e=!1){const t=me(n),r=await t.getIdToken(e),i=D_(r);Z(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Tl(Np(i.auth_time)),issuedAtTime:Tl(Np(i.iat)),expirationTime:Tl(Np(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Np(n){return Number(n)*1e3}function D_(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return th("JWT malformed, contained fewer than 3 sections"),null;try{const i=jh(t);return i?JSON.parse(i):(th("Failed to decode base64 JWT payload"),null)}catch(i){return th("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function zE(n){const e=D_(n);return Z(e,"internal-error"),Z(typeof e.exp<"u","internal-error"),Z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eu(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Yn&&EV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function EV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Km{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Tl(this.lastLoginAt),this.creationTime=Tl(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gh(n){var e;const t=n.auth,r=await n.getIdToken(),i=await eu(n,$A(t,{idToken:r}));Z(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?qA(s.providerUserInfo):[],a=SV(n.providerData,o),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Km(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function TV(n){const e=me(n);await Gh(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function SV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function qA(n){return n.map(e=>{var{providerId:t}=e,r=P_(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function AV(n,e){const t=await BA(n,{},async()=>{const r=ca({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=zA(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",jA.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function CV(n,e){return Mi(n,"POST","/v2/accounts:revokeToken",Ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Z(e.idToken,"internal-error"),Z(typeof e.idToken<"u","internal-error"),Z(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zE(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Z(e.length!==0,"internal-error");const t=zE(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Z(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await AV(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new So;return r&&(Z(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Z(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Z(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new So,this.toJSON())}_performRefresh(){return hr("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fr(n,e){Z(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class dr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=P_(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new IV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Km(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await eu(this,this.stsTokenManager.getToken(this.auth,e));return Z(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return wV(this,e)}reload(){return TV(this)}_assign(e){this!==e&&(Z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new dr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Gh(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Un(this.auth.app))return Promise.reject(hi(this.auth));const e=await this.getIdToken();return await eu(this,vV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,l,c,h;const d=(r=t.displayName)!==null&&r!==void 0?r:void 0,p=(i=t.email)!==null&&i!==void 0?i:void 0,g=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,P=(a=t.tenantId)!==null&&a!==void 0?a:void 0,x=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,y=(c=t.createdAt)!==null&&c!==void 0?c:void 0,E=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:A,emailVerified:V,isAnonymous:F,providerData:M,stsTokenManager:S}=t;Z(A&&S,e,"internal-error");const v=So.fromJSON(this.name,S);Z(typeof A=="string",e,"internal-error"),Fr(d,e.name),Fr(p,e.name),Z(typeof V=="boolean",e,"internal-error"),Z(typeof F=="boolean",e,"internal-error"),Fr(g,e.name),Fr(I,e.name),Fr(P,e.name),Fr(x,e.name),Fr(y,e.name),Fr(E,e.name);const C=new dr({uid:A,auth:e,email:p,emailVerified:V,displayName:d,isAnonymous:F,photoURL:I,phoneNumber:g,tenantId:P,stsTokenManager:v,createdAt:y,lastLoginAt:E});return M&&Array.isArray(M)&&(C.providerData=M.map(k=>Object.assign({},k))),x&&(C._redirectEventId=x),C}static async _fromIdTokenResponse(e,t,r=!1){const i=new So;i.updateFromServerResponse(t);const s=new dr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Gh(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Z(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?qA(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new So;a.updateFromIdToken(r);const l=new dr({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Km(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $E=new Map;function fr(n){Sr(n instanceof Function,"Expected a class definition");let e=$E.get(n);return e?(Sr(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,$E.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GA{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}GA.type="NONE";const qE=GA;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(n,e,t){return`firebase:${n}:${e}:${t}`}class Ao{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=nh(this.userKey,i.apiKey,s),this.fullPersistenceKey=nh("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?dr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Ao(fr(qE),e,r);const i=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||fr(qE);const o=nh(r,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const d=dr._fromJSON(e,h);c!==s&&(a=d),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Ao(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new Ao(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GE(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(QA(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(WA(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(JA(e))return"Blackberry";if(XA(e))return"Webos";if(KA(e))return"Safari";if((e.includes("chrome/")||HA(e))&&!e.includes("edge/"))return"Chrome";if(YA(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function WA(n=ot()){return/firefox\//i.test(n)}function KA(n=ot()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function HA(n=ot()){return/crios\//i.test(n)}function QA(n=ot()){return/iemobile/i.test(n)}function YA(n=ot()){return/android/i.test(n)}function JA(n=ot()){return/blackberry/i.test(n)}function XA(n=ot()){return/webos/i.test(n)}function V_(n=ot()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function RV(n=ot()){var e;return V_(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function kV(){return jD()&&document.documentMode===10}function ZA(n=ot()){return V_(n)||YA(n)||XA(n)||JA(n)||/windows phone/i.test(n)||QA(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eC(n,e=[]){let t;switch(n){case"Browser":t=GE(ot());break;case"Worker":t=`${GE(ot())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Li}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xV(n,e={}){return Mi(n,"GET","/v2/passwordPolicy",Ms(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NV=6;class bV{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:NV,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DV{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new WE(this),this.idTokenSubscription=new WE(this),this.beforeStateQueue=new PV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=UA,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=fr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ao.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await $A(this,{idToken:e}),r=await dr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Un(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Gh(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=dV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Un(this.app))return Promise.reject(hi(this));const t=e?me(e):null;return t&&Z(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Un(this.app)?Promise.reject(hi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Un(this.app)?Promise.reject(hi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(fr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await xV(this),t=new bV(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Au("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await CV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&fr(e)||this._popupRedirectResolver;Z(t,this,"argument-error"),this.redirectPersistenceManager=await Ao.create(this,[fr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(Z(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eC(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&lV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Fs(n){return me(n)}class WE{constructor(e){this.auth=e,this.observer=null,this.addObserver=QD(t=>this.observer=t)}get next(){return Z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function VV(n){Hd=n}function tC(n){return Hd.loadJS(n)}function OV(){return Hd.recaptchaEnterpriseScript}function LV(){return Hd.gapiScript}function MV(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const FV="recaptcha-enterprise",UV="NO_RECAPTCHA";class jV{constructor(e){this.type=FV,this.auth=Fs(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{yV(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new _V(l);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function i(s,o,a){const l=window.grecaptcha;BE(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(UV)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&BE(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=OV();l.length!==0&&(l+=a),tC(l).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function KE(n,e,t,r=!1){const i=new jV(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function HE(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await KE(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await KE(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BV(n,e){const t=Ls(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(yi(s,e??{}))return i;gn(i,"already-initialized")}return t.initialize({options:e})}function zV(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(fr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function $V(n,e,t){const r=Fs(n);Z(r._canInitEmulator,r,"emulator-config-failed"),Z(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=nC(e),{host:o,port:a}=qV(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),GV()}function nC(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function qV(n){const e=nC(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:QE(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:QE(o)}}}function QE(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function GV(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return hr("not implemented")}_getIdTokenResponse(e){return hr("not implemented")}_linkToIdToken(e,t){return hr("not implemented")}_getReauthenticationResolver(e){return hr("not implemented")}}async function WV(n,e){return Mi(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KV(n,e){return Kd(n,"POST","/v1/accounts:signInWithPassword",Ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HV(n,e){return Kd(n,"POST","/v1/accounts:signInWithEmailLink",Ms(n,e))}async function QV(n,e){return Kd(n,"POST","/v1/accounts:signInWithEmailLink",Ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends O_{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new tu(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new tu(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return HE(e,t,"signInWithPassword",KV);case"emailLink":return HV(e,{email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return HE(e,r,"signUpPassword",WV);case"emailLink":return QV(e,{idToken:t,email:this._email,oobCode:this._password});default:gn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Co(n,e){return Kd(n,"POST","/v1/accounts:signInWithIdp",Ms(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YV="http://localhost";class Es extends O_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Es(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):gn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=P_(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Es(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Co(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Co(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Co(e,t)}buildRequest(){const e={requestUri:YV,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ca(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JV(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function XV(n){const e=ll(ul(n)).link,t=e?ll(ul(e)).deep_link_id:null,r=ll(ul(n)).deep_link_id;return(r?ll(ul(r)).link:null)||r||t||e||n}class L_{constructor(e){var t,r,i,s,o,a;const l=ll(ul(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,h=(r=l.oobCode)!==null&&r!==void 0?r:null,d=JV((i=l.mode)!==null&&i!==void 0?i:null);Z(c&&h&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=h,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=XV(e);try{return new L_(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(){this.providerId=ha.PROVIDER_ID}static credential(e,t){return tu._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=L_.parseLink(t);return Z(r,"argument-error"),tu._fromEmailAndCode(e,r.code,r.tenantId)}}ha.PROVIDER_ID="password";ha.EMAIL_PASSWORD_SIGN_IN_METHOD="password";ha.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru extends M_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr extends Ru{constructor(){super("facebook.com")}static credential(e){return Es._fromParams({providerId:Gr.PROVIDER_ID,signInMethod:Gr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gr.credentialFromTaggedObject(e)}static credentialFromError(e){return Gr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gr.credential(e.oauthAccessToken)}catch{return null}}}Gr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends Ru{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Es._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return lr.credential(t,r)}catch{return null}}}lr.GOOGLE_SIGN_IN_METHOD="google.com";lr.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr extends Ru{constructor(){super("github.com")}static credential(e){return Es._fromParams({providerId:Wr.PROVIDER_ID,signInMethod:Wr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Wr.credentialFromTaggedObject(e)}static credentialFromError(e){return Wr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Wr.credential(e.oauthAccessToken)}catch{return null}}}Wr.GITHUB_SIGN_IN_METHOD="github.com";Wr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr extends Ru{constructor(){super("twitter.com")}static credential(e,t){return Es._fromParams({providerId:Kr.PROVIDER_ID,signInMethod:Kr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Kr.credentialFromTaggedObject(e)}static credentialFromError(e){return Kr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Kr.credential(t,r)}catch{return null}}}Kr.TWITTER_SIGN_IN_METHOD="twitter.com";Kr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await dr._fromIdTokenResponse(e,r,i),o=YE(r);return new jo({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=YE(r);return new jo({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function YE(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh extends Yn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Wh.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Wh(e,t,r,i)}}function rC(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Wh._fromErrorAndOperation(n,s,e,r):s})}async function ZV(n,e,t=!1){const r=await eu(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return jo._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eO(n,e,t=!1){const{auth:r}=n;if(Un(r.app))return Promise.reject(hi(r));const i="reauthenticate";try{const s=await eu(n,rC(r,i,e,n),t);Z(s.idToken,r,"internal-error");const o=D_(s.idToken);Z(o,r,"internal-error");const{sub:a}=o;return Z(n.uid===a,r,"user-mismatch"),jo._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&gn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iC(n,e,t=!1){if(Un(n.app))return Promise.reject(hi(n));const r="signIn",i=await rC(n,r,e),s=await jo._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function tO(n,e){return iC(Fs(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nO(n){const e=Fs(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function rO(n,e,t){return Un(n.app)?Promise.reject(hi(n)):tO(me(n),ha.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&nO(n),r})}function iO(n,e,t,r){return me(n).onIdTokenChanged(e,t,r)}function sO(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function oO(n,e,t,r){return me(n).onAuthStateChanged(e,t,r)}function JE(n){return me(n).signOut()}const Kh="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sC{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Kh,"1"),this.storage.removeItem(Kh),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aO=1e3,lO=10;class oC extends sC{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ZA(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);kV()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,lO):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},aO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}oC.type="LOCAL";const uO=oC;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC extends sC{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}aC.type="SESSION";const lC=aC;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cO(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Qd(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(t.origin,s)),l=await cO(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Qd.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F_(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hO{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const c=F_("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const p=d;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(h),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(){return window}function dO(n){qn().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uC(){return typeof qn().WorkerGlobalScope<"u"&&typeof qn().importScripts=="function"}async function fO(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function pO(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function mO(){return uC()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cC="firebaseLocalStorageDb",gO=1,Hh="firebaseLocalStorage",hC="fbase_key";class ku{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Yd(n,e){return n.transaction([Hh],e?"readwrite":"readonly").objectStore(Hh)}function _O(){const n=indexedDB.deleteDatabase(cC);return new ku(n).toPromise()}function Hm(){const n=indexedDB.open(cC,gO);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Hh,{keyPath:hC})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Hh)?e(r):(r.close(),await _O(),e(await Hm()))})})}async function XE(n,e,t){const r=Yd(n,!0).put({[hC]:e,value:t});return new ku(r).toPromise()}async function yO(n,e){const t=Yd(n,!1).get(e),r=await new ku(t).toPromise();return r===void 0?null:r.value}function ZE(n,e){const t=Yd(n,!0).delete(e);return new ku(t).toPromise()}const vO=800,wO=3;class dC{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Hm(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>wO)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return uC()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Qd._getInstance(mO()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await fO(),!this.activeServiceWorker)return;this.sender=new hO(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||pO()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Hm();return await XE(e,Kh,"1"),await ZE(e,Kh),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>XE(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>yO(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ZE(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Yd(i,!1).getAll();return new ku(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),vO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}dC.type="LOCAL";const EO=dC;new Cu(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fC(n,e){return e?fr(e):(Z(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U_ extends O_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Co(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Co(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Co(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function IO(n){return iC(n.auth,new U_(n),n.bypassAuthState)}function TO(n){const{auth:e,user:t}=n;return Z(t,e,"internal-error"),eO(t,new U_(n),n.bypassAuthState)}async function SO(n){const{auth:e,user:t}=n;return Z(t,e,"internal-error"),ZV(t,new U_(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return IO;case"linkViaPopup":case"linkViaRedirect":return SO;case"reauthViaPopup":case"reauthViaRedirect":return TO;default:gn(this.auth,"internal-error")}}resolve(e){Sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Sr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AO=new Cu(2e3,1e4);async function CO(n,e,t){if(Un(n.app))return Promise.reject(Pn(n,"operation-not-supported-in-this-environment"));const r=Fs(n);uV(n,e,M_);const i=fC(r,t);return new ls(r,"signInViaPopup",e,i).executeNotNull()}class ls extends pC{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ls.currentPopupAction&&ls.currentPopupAction.cancel(),ls.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Z(e,this.auth,"internal-error"),e}async onExecution(){Sr(this.filter.length===1,"Popup operations only handle one event");const e=F_();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Pn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Pn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ls.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Pn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,AO.get())};e()}}ls.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RO="pendingRedirect",rh=new Map;class kO extends pC{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=rh.get(this.auth._key());if(!e){try{const r=await PO(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}rh.set(this.auth._key(),e)}return this.bypassAuthState||rh.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function PO(n,e){const t=bO(e),r=NO(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function xO(n,e){rh.set(n._key(),e)}function NO(n){return fr(n._redirectPersistence)}function bO(n){return nh(RO,n.config.apiKey,n.name)}async function DO(n,e,t=!1){if(Un(n.app))return Promise.reject(hi(n));const r=Fs(n),i=fC(r,e),o=await new kO(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VO=10*60*1e3;class OO{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!LO(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!mC(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Pn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=VO&&this.cachedEventUids.clear(),this.cachedEventUids.has(eI(e))}saveEventToCache(e){this.cachedEventUids.add(eI(e)),this.lastProcessedEventTime=Date.now()}}function eI(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function mC({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function LO(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return mC(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function MO(n,e={}){return Mi(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FO=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,UO=/^https?/;async function jO(n){if(n.config.emulator)return;const{authorizedDomains:e}=await MO(n);for(const t of e)try{if(BO(t))return}catch{}gn(n,"unauthorized-domain")}function BO(n){const e=Wm(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!UO.test(t))return!1;if(FO.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zO=new Cu(3e4,6e4);function tI(){const n=qn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function $O(n){return new Promise((e,t)=>{var r,i,s;function o(){tI(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{tI(),t(Pn(n,"network-request-failed"))},timeout:zO.get()})}if(!((i=(r=qn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=qn().gapi)===null||s===void 0)&&s.load)o();else{const a=MV("iframefcb");return qn()[a]=()=>{gapi.load?o():t(Pn(n,"network-request-failed"))},tC(`${LV()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw ih=null,e})}let ih=null;function qO(n){return ih=ih||$O(n),ih}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GO=new Cu(5e3,15e3),WO="__/auth/iframe",KO="emulator/auth/iframe",HO={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},QO=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function YO(n){const e=n.config;Z(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?b_(e,KO):`https://${n.config.authDomain}/${WO}`,r={apiKey:e.apiKey,appName:n.name,v:Li},i=QO.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ca(r).slice(1)}`}async function JO(n){const e=await qO(n),t=qn().gapi;return Z(t,n,"internal-error"),e.open({where:document.body,url:YO(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:HO,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Pn(n,"network-request-failed"),a=qn().setTimeout(()=>{s(o)},GO.get());function l(){qn().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XO={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ZO=500,eL=600,tL="_blank",nL="http://localhost";class nI{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function rL(n,e,t,r=ZO,i=eL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},XO),{width:r.toString(),height:i.toString(),top:s,left:o}),c=ot().toLowerCase();t&&(a=HA(c)?tL:t),WA(c)&&(e=e||nL,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[g,I])=>`${p}${g}=${I},`,"");if(RV(c)&&a!=="_self")return iL(e||"",a),new nI(null);const d=window.open(e||"",a,h);Z(d,n,"popup-blocked");try{d.focus()}catch{}return new nI(d)}function iL(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sL="__/auth/handler",oL="emulator/auth/handler",aL=encodeURIComponent("fac");async function rI(n,e,t,r,i,s){Z(n.config.authDomain,n,"auth-domain-config-required"),Z(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Li,eventId:i};if(e instanceof M_){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Bm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof Ru){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${aL}=${encodeURIComponent(l)}`:"";return`${lL(n)}?${ca(a).slice(1)}${c}`}function lL({config:n}){return n.emulator?b_(n,oL):`https://${n.authDomain}/${sL}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="webStorageSupport";class uL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=lC,this._completeRedirectFn=DO,this._overrideRedirectResult=xO}async _openPopup(e,t,r,i){var s;Sr((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await rI(e,t,r,Wm(),i);return rL(e,o,F_())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await rI(e,t,r,Wm(),i);return dO(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Sr(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await JO(e),r=new OO(e);return t.register("authEvent",i=>(Z(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(bp,{type:bp},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[bp];o!==void 0&&t(!!o),gn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=jO(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ZA()||KA()||V_()}}const cL=uL;var iI="@firebase/auth",sI="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function fL(n){vi(new Ir("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;Z(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eC(n)},c=new DV(r,i,s,l);return zV(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),vi(new Ir("auth-internal",e=>{const t=Fs(e.getProvider("auth").getImmediate());return(r=>new hL(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),fn(iI,sI,dL(n)),fn(iI,sI,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pL=5*60,mL=kA("authIdTokenMaxAge")||pL;let oI=null;const gL=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>mL)return;const i=t==null?void 0:t.token;oI!==i&&(oI=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function _L(n=Wd()){const e=Ls(n,"auth");if(e.isInitialized())return e.getImmediate();const t=BV(n,{popupRedirectResolver:cL,persistence:[EO,uO,lC]}),r=kA("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=gL(s.toString());sO(t,o,()=>o(t.currentUser)),iO(t,a=>o(a))}}const i=CA("auth");return i&&$V(t,`http://${i}`),t}function yL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}VV({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Pn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",yL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});fL("Browser");var aI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ps,gC;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,v){function C(){}C.prototype=v.prototype,S.D=v.prototype,S.prototype=new C,S.prototype.constructor=S,S.C=function(k,T,N){for(var R=Array(arguments.length-2),Vt=2;Vt<arguments.length;Vt++)R[Vt-2]=arguments[Vt];return v.prototype[T].apply(k,R)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(S,v,C){C||(C=0);var k=Array(16);if(typeof v=="string")for(var T=0;16>T;++T)k[T]=v.charCodeAt(C++)|v.charCodeAt(C++)<<8|v.charCodeAt(C++)<<16|v.charCodeAt(C++)<<24;else for(T=0;16>T;++T)k[T]=v[C++]|v[C++]<<8|v[C++]<<16|v[C++]<<24;v=S.g[0],C=S.g[1],T=S.g[2];var N=S.g[3],R=v+(N^C&(T^N))+k[0]+3614090360&4294967295;v=C+(R<<7&4294967295|R>>>25),R=N+(T^v&(C^T))+k[1]+3905402710&4294967295,N=v+(R<<12&4294967295|R>>>20),R=T+(C^N&(v^C))+k[2]+606105819&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(v^T&(N^v))+k[3]+3250441966&4294967295,C=T+(R<<22&4294967295|R>>>10),R=v+(N^C&(T^N))+k[4]+4118548399&4294967295,v=C+(R<<7&4294967295|R>>>25),R=N+(T^v&(C^T))+k[5]+1200080426&4294967295,N=v+(R<<12&4294967295|R>>>20),R=T+(C^N&(v^C))+k[6]+2821735955&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(v^T&(N^v))+k[7]+4249261313&4294967295,C=T+(R<<22&4294967295|R>>>10),R=v+(N^C&(T^N))+k[8]+1770035416&4294967295,v=C+(R<<7&4294967295|R>>>25),R=N+(T^v&(C^T))+k[9]+2336552879&4294967295,N=v+(R<<12&4294967295|R>>>20),R=T+(C^N&(v^C))+k[10]+4294925233&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(v^T&(N^v))+k[11]+2304563134&4294967295,C=T+(R<<22&4294967295|R>>>10),R=v+(N^C&(T^N))+k[12]+1804603682&4294967295,v=C+(R<<7&4294967295|R>>>25),R=N+(T^v&(C^T))+k[13]+4254626195&4294967295,N=v+(R<<12&4294967295|R>>>20),R=T+(C^N&(v^C))+k[14]+2792965006&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(v^T&(N^v))+k[15]+1236535329&4294967295,C=T+(R<<22&4294967295|R>>>10),R=v+(T^N&(C^T))+k[1]+4129170786&4294967295,v=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(v^C))+k[6]+3225465664&4294967295,N=v+(R<<9&4294967295|R>>>23),R=T+(v^C&(N^v))+k[11]+643717713&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^v&(T^N))+k[0]+3921069994&4294967295,C=T+(R<<20&4294967295|R>>>12),R=v+(T^N&(C^T))+k[5]+3593408605&4294967295,v=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(v^C))+k[10]+38016083&4294967295,N=v+(R<<9&4294967295|R>>>23),R=T+(v^C&(N^v))+k[15]+3634488961&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^v&(T^N))+k[4]+3889429448&4294967295,C=T+(R<<20&4294967295|R>>>12),R=v+(T^N&(C^T))+k[9]+568446438&4294967295,v=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(v^C))+k[14]+3275163606&4294967295,N=v+(R<<9&4294967295|R>>>23),R=T+(v^C&(N^v))+k[3]+4107603335&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^v&(T^N))+k[8]+1163531501&4294967295,C=T+(R<<20&4294967295|R>>>12),R=v+(T^N&(C^T))+k[13]+2850285829&4294967295,v=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(v^C))+k[2]+4243563512&4294967295,N=v+(R<<9&4294967295|R>>>23),R=T+(v^C&(N^v))+k[7]+1735328473&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^v&(T^N))+k[12]+2368359562&4294967295,C=T+(R<<20&4294967295|R>>>12),R=v+(C^T^N)+k[5]+4294588738&4294967295,v=C+(R<<4&4294967295|R>>>28),R=N+(v^C^T)+k[8]+2272392833&4294967295,N=v+(R<<11&4294967295|R>>>21),R=T+(N^v^C)+k[11]+1839030562&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^v)+k[14]+4259657740&4294967295,C=T+(R<<23&4294967295|R>>>9),R=v+(C^T^N)+k[1]+2763975236&4294967295,v=C+(R<<4&4294967295|R>>>28),R=N+(v^C^T)+k[4]+1272893353&4294967295,N=v+(R<<11&4294967295|R>>>21),R=T+(N^v^C)+k[7]+4139469664&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^v)+k[10]+3200236656&4294967295,C=T+(R<<23&4294967295|R>>>9),R=v+(C^T^N)+k[13]+681279174&4294967295,v=C+(R<<4&4294967295|R>>>28),R=N+(v^C^T)+k[0]+3936430074&4294967295,N=v+(R<<11&4294967295|R>>>21),R=T+(N^v^C)+k[3]+3572445317&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^v)+k[6]+76029189&4294967295,C=T+(R<<23&4294967295|R>>>9),R=v+(C^T^N)+k[9]+3654602809&4294967295,v=C+(R<<4&4294967295|R>>>28),R=N+(v^C^T)+k[12]+3873151461&4294967295,N=v+(R<<11&4294967295|R>>>21),R=T+(N^v^C)+k[15]+530742520&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^v)+k[2]+3299628645&4294967295,C=T+(R<<23&4294967295|R>>>9),R=v+(T^(C|~N))+k[0]+4096336452&4294967295,v=C+(R<<6&4294967295|R>>>26),R=N+(C^(v|~T))+k[7]+1126891415&4294967295,N=v+(R<<10&4294967295|R>>>22),R=T+(v^(N|~C))+k[14]+2878612391&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~v))+k[5]+4237533241&4294967295,C=T+(R<<21&4294967295|R>>>11),R=v+(T^(C|~N))+k[12]+1700485571&4294967295,v=C+(R<<6&4294967295|R>>>26),R=N+(C^(v|~T))+k[3]+2399980690&4294967295,N=v+(R<<10&4294967295|R>>>22),R=T+(v^(N|~C))+k[10]+4293915773&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~v))+k[1]+2240044497&4294967295,C=T+(R<<21&4294967295|R>>>11),R=v+(T^(C|~N))+k[8]+1873313359&4294967295,v=C+(R<<6&4294967295|R>>>26),R=N+(C^(v|~T))+k[15]+4264355552&4294967295,N=v+(R<<10&4294967295|R>>>22),R=T+(v^(N|~C))+k[6]+2734768916&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~v))+k[13]+1309151649&4294967295,C=T+(R<<21&4294967295|R>>>11),R=v+(T^(C|~N))+k[4]+4149444226&4294967295,v=C+(R<<6&4294967295|R>>>26),R=N+(C^(v|~T))+k[11]+3174756917&4294967295,N=v+(R<<10&4294967295|R>>>22),R=T+(v^(N|~C))+k[2]+718787259&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~v))+k[9]+3951481745&4294967295,S.g[0]=S.g[0]+v&4294967295,S.g[1]=S.g[1]+(T+(R<<21&4294967295|R>>>11))&4294967295,S.g[2]=S.g[2]+T&4294967295,S.g[3]=S.g[3]+N&4294967295}r.prototype.u=function(S,v){v===void 0&&(v=S.length);for(var C=v-this.blockSize,k=this.B,T=this.h,N=0;N<v;){if(T==0)for(;N<=C;)i(this,S,N),N+=this.blockSize;if(typeof S=="string"){for(;N<v;)if(k[T++]=S.charCodeAt(N++),T==this.blockSize){i(this,k),T=0;break}}else for(;N<v;)if(k[T++]=S[N++],T==this.blockSize){i(this,k),T=0;break}}this.h=T,this.o+=v},r.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var v=1;v<S.length-8;++v)S[v]=0;var C=8*this.o;for(v=S.length-8;v<S.length;++v)S[v]=C&255,C/=256;for(this.u(S),S=Array(16),v=C=0;4>v;++v)for(var k=0;32>k;k+=8)S[C++]=this.g[v]>>>k&255;return S};function s(S,v){var C=a;return Object.prototype.hasOwnProperty.call(C,S)?C[S]:C[S]=v(S)}function o(S,v){this.h=v;for(var C=[],k=!0,T=S.length-1;0<=T;T--){var N=S[T]|0;k&&N==v||(C[T]=N,k=!1)}this.g=C}var a={};function l(S){return-128<=S&&128>S?s(S,function(v){return new o([v|0],0>v?-1:0)}):new o([S|0],0>S?-1:0)}function c(S){if(isNaN(S)||!isFinite(S))return d;if(0>S)return x(c(-S));for(var v=[],C=1,k=0;S>=C;k++)v[k]=S/C|0,C*=4294967296;return new o(v,0)}function h(S,v){if(S.length==0)throw Error("number format error: empty string");if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(S.charAt(0)=="-")return x(h(S.substring(1),v));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var C=c(Math.pow(v,8)),k=d,T=0;T<S.length;T+=8){var N=Math.min(8,S.length-T),R=parseInt(S.substring(T,T+N),v);8>N?(N=c(Math.pow(v,N)),k=k.j(N).add(c(R))):(k=k.j(C),k=k.add(c(R)))}return k}var d=l(0),p=l(1),g=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-x(this).m();for(var S=0,v=1,C=0;C<this.g.length;C++){var k=this.i(C);S+=(0<=k?k:4294967296+k)*v,v*=4294967296}return S},n.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(I(this))return"0";if(P(this))return"-"+x(this).toString(S);for(var v=c(Math.pow(S,6)),C=this,k="";;){var T=V(C,v).g;C=y(C,T.j(v));var N=((0<C.g.length?C.g[0]:C.h)>>>0).toString(S);if(C=T,I(C))return N+k;for(;6>N.length;)N="0"+N;k=N+k}},n.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function I(S){if(S.h!=0)return!1;for(var v=0;v<S.g.length;v++)if(S.g[v]!=0)return!1;return!0}function P(S){return S.h==-1}n.l=function(S){return S=y(this,S),P(S)?-1:I(S)?0:1};function x(S){for(var v=S.g.length,C=[],k=0;k<v;k++)C[k]=~S.g[k];return new o(C,~S.h).add(p)}n.abs=function(){return P(this)?x(this):this},n.add=function(S){for(var v=Math.max(this.g.length,S.g.length),C=[],k=0,T=0;T<=v;T++){var N=k+(this.i(T)&65535)+(S.i(T)&65535),R=(N>>>16)+(this.i(T)>>>16)+(S.i(T)>>>16);k=R>>>16,N&=65535,R&=65535,C[T]=R<<16|N}return new o(C,C[C.length-1]&-2147483648?-1:0)};function y(S,v){return S.add(x(v))}n.j=function(S){if(I(this)||I(S))return d;if(P(this))return P(S)?x(this).j(x(S)):x(x(this).j(S));if(P(S))return x(this.j(x(S)));if(0>this.l(g)&&0>S.l(g))return c(this.m()*S.m());for(var v=this.g.length+S.g.length,C=[],k=0;k<2*v;k++)C[k]=0;for(k=0;k<this.g.length;k++)for(var T=0;T<S.g.length;T++){var N=this.i(k)>>>16,R=this.i(k)&65535,Vt=S.i(T)>>>16,Dn=S.i(T)&65535;C[2*k+2*T]+=R*Dn,E(C,2*k+2*T),C[2*k+2*T+1]+=N*Dn,E(C,2*k+2*T+1),C[2*k+2*T+1]+=R*Vt,E(C,2*k+2*T+1),C[2*k+2*T+2]+=N*Vt,E(C,2*k+2*T+2)}for(k=0;k<v;k++)C[k]=C[2*k+1]<<16|C[2*k];for(k=v;k<2*v;k++)C[k]=0;return new o(C,0)};function E(S,v){for(;(S[v]&65535)!=S[v];)S[v+1]+=S[v]>>>16,S[v]&=65535,v++}function A(S,v){this.g=S,this.h=v}function V(S,v){if(I(v))throw Error("division by zero");if(I(S))return new A(d,d);if(P(S))return v=V(x(S),v),new A(x(v.g),x(v.h));if(P(v))return v=V(S,x(v)),new A(x(v.g),v.h);if(30<S.g.length){if(P(S)||P(v))throw Error("slowDivide_ only works with positive integers.");for(var C=p,k=v;0>=k.l(S);)C=F(C),k=F(k);var T=M(C,1),N=M(k,1);for(k=M(k,2),C=M(C,2);!I(k);){var R=N.add(k);0>=R.l(S)&&(T=T.add(C),N=R),k=M(k,1),C=M(C,1)}return v=y(S,T.j(v)),new A(T,v)}for(T=d;0<=S.l(v);){for(C=Math.max(1,Math.floor(S.m()/v.m())),k=Math.ceil(Math.log(C)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),N=c(C),R=N.j(v);P(R)||0<R.l(S);)C-=k,N=c(C),R=N.j(v);I(N)&&(N=p),T=T.add(N),S=y(S,R)}return new A(T,S)}n.A=function(S){return V(this,S).h},n.and=function(S){for(var v=Math.max(this.g.length,S.g.length),C=[],k=0;k<v;k++)C[k]=this.i(k)&S.i(k);return new o(C,this.h&S.h)},n.or=function(S){for(var v=Math.max(this.g.length,S.g.length),C=[],k=0;k<v;k++)C[k]=this.i(k)|S.i(k);return new o(C,this.h|S.h)},n.xor=function(S){for(var v=Math.max(this.g.length,S.g.length),C=[],k=0;k<v;k++)C[k]=this.i(k)^S.i(k);return new o(C,this.h^S.h)};function F(S){for(var v=S.g.length+1,C=[],k=0;k<v;k++)C[k]=S.i(k)<<1|S.i(k-1)>>>31;return new o(C,S.h)}function M(S,v){var C=v>>5;v%=32;for(var k=S.g.length-C,T=[],N=0;N<k;N++)T[N]=0<v?S.i(N+C)>>>v|S.i(N+C+1)<<32-v:S.i(N+C);return new o(T,S.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,gC=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,ps=o}).apply(typeof aI<"u"?aI:typeof self<"u"?self:typeof window<"u"?window:{});var Dc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var _C,cl,yC,sh,Qm,vC,wC,EC;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,f,m){return u==Array.prototype||u==Object.prototype||(u[f]=m.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Dc=="object"&&Dc];for(var f=0;f<u.length;++f){var m=u[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function i(u,f){if(f)e:{var m=r;u=u.split(".");for(var _=0;_<u.length-1;_++){var D=u[_];if(!(D in m))break e;m=m[D]}u=u[u.length-1],_=m[u],f=f(_),f!=_&&f!=null&&e(m,u,{configurable:!0,writable:!0,value:f})}}function s(u,f){u instanceof String&&(u+="");var m=0,_=!1,D={next:function(){if(!_&&m<u.length){var L=m++;return{value:f(L,u[L]),done:!1}}return _=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}i("Array.prototype.values",function(u){return u||function(){return s(this,function(f,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(u){var f=typeof u;return f=f!="object"?f:u?Array.isArray(u)?"array":f:"null",f=="array"||f=="object"&&typeof u.length=="number"}function c(u){var f=typeof u;return f=="object"&&u!=null||f=="function"}function h(u,f,m){return u.call.apply(u.bind,arguments)}function d(u,f,m){if(!u)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,_),u.apply(f,D)}}return function(){return u.apply(f,arguments)}}function p(u,f,m){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function g(u,f){var m=Array.prototype.slice.call(arguments,1);return function(){var _=m.slice();return _.push.apply(_,arguments),u.apply(this,_)}}function I(u,f){function m(){}m.prototype=f.prototype,u.aa=f.prototype,u.prototype=new m,u.prototype.constructor=u,u.Qb=function(_,D,L){for(var q=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)q[Se-2]=arguments[Se];return f.prototype[D].apply(_,q)}}function P(u){const f=u.length;if(0<f){const m=Array(f);for(let _=0;_<f;_++)m[_]=u[_];return m}return[]}function x(u,f){for(let m=1;m<arguments.length;m++){const _=arguments[m];if(l(_)){const D=u.length||0,L=_.length||0;u.length=D+L;for(let q=0;q<L;q++)u[D+q]=_[q]}else u.push(_)}}class y{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function E(u){return/^[\s\xa0]*$/.test(u)}function A(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function V(u){return V[" "](u),u}V[" "]=function(){};var F=A().indexOf("Gecko")!=-1&&!(A().toLowerCase().indexOf("webkit")!=-1&&A().indexOf("Edge")==-1)&&!(A().indexOf("Trident")!=-1||A().indexOf("MSIE")!=-1)&&A().indexOf("Edge")==-1;function M(u,f,m){for(const _ in u)f.call(m,u[_],_,u)}function S(u,f){for(const m in u)f.call(void 0,u[m],m,u)}function v(u){const f={};for(const m in u)f[m]=u[m];return f}const C="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(u,f){let m,_;for(let D=1;D<arguments.length;D++){_=arguments[D];for(m in _)u[m]=_[m];for(let L=0;L<C.length;L++)m=C[L],Object.prototype.hasOwnProperty.call(_,m)&&(u[m]=_[m])}}function T(u){var f=1;u=u.split(":");const m=[];for(;0<f&&u.length;)m.push(u.shift()),f--;return u.length&&m.push(u.join(":")),m}function N(u){a.setTimeout(()=>{throw u},0)}function R(){var u=ee;let f=null;return u.g&&(f=u.g,u.g=u.g.next,u.g||(u.h=null),f.next=null),f}class Vt{constructor(){this.h=this.g=null}add(f,m){const _=Dn.get();_.set(f,m),this.h?this.h.next=_:this.g=_,this.h=_}}var Dn=new y(()=>new Y,u=>u.reset());class Y{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let fe,G=!1,ee=new Vt,ie=()=>{const u=a.Promise.resolve(void 0);fe=()=>{u.then(je)}};var je=()=>{for(var u;u=R();){try{u.h.call(u.g)}catch(m){N(m)}var f=Dn;f.j(u),100>f.h&&(f.h++,u.next=f.g,f.g=u)}G=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ye(u,f){this.type=u,this.g=this.target=f,this.defaultPrevented=!1}Ye.prototype.h=function(){this.defaultPrevented=!0};var Zn=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,f=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const m=()=>{};a.addEventListener("test",m,f),a.removeEventListener("test",m,f)}catch{}return u}();function er(u,f){if(Ye.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var m=this.type=u.type,_=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=f,f=u.relatedTarget){if(F){e:{try{V(f.nodeName);var D=!0;break e}catch{}D=!1}D||(f=null)}}else m=="mouseover"?f=u.fromElement:m=="mouseout"&&(f=u.toElement);this.relatedTarget=f,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:tr[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&er.aa.h.call(this)}}I(er,Ye);var tr={2:"touch",3:"pen",4:"mouse"};er.prototype.h=function(){er.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var nr="closure_listenable_"+(1e6*Math.random()|0),Sx=0;function Ax(u,f,m,_,D){this.listener=u,this.proxy=null,this.src=f,this.type=m,this.capture=!!_,this.ha=D,this.key=++Sx,this.da=this.fa=!1}function Ju(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function Xu(u){this.src=u,this.g={},this.h=0}Xu.prototype.add=function(u,f,m,_,D){var L=u.toString();u=this.g[L],u||(u=this.g[L]=[],this.h++);var q=bf(u,f,_,D);return-1<q?(f=u[q],m||(f.fa=!1)):(f=new Ax(f,this.src,L,!!_,D),f.fa=m,u.push(f)),f};function Nf(u,f){var m=f.type;if(m in u.g){var _=u.g[m],D=Array.prototype.indexOf.call(_,f,void 0),L;(L=0<=D)&&Array.prototype.splice.call(_,D,1),L&&(Ju(f),u.g[m].length==0&&(delete u.g[m],u.h--))}}function bf(u,f,m,_){for(var D=0;D<u.length;++D){var L=u[D];if(!L.da&&L.listener==f&&L.capture==!!m&&L.ha==_)return D}return-1}var Df="closure_lm_"+(1e6*Math.random()|0),Vf={};function Iv(u,f,m,_,D){if(Array.isArray(f)){for(var L=0;L<f.length;L++)Iv(u,f[L],m,_,D);return null}return m=Av(m),u&&u[nr]?u.K(f,m,c(_)?!!_.capture:!1,D):Cx(u,f,m,!1,_,D)}function Cx(u,f,m,_,D,L){if(!f)throw Error("Invalid event type");var q=c(D)?!!D.capture:!!D,Se=Lf(u);if(Se||(u[Df]=Se=new Xu(u)),m=Se.add(f,m,_,q,L),m.proxy)return m;if(_=Rx(),m.proxy=_,_.src=u,_.listener=m,u.addEventListener)Zn||(D=q),D===void 0&&(D=!1),u.addEventListener(f.toString(),_,D);else if(u.attachEvent)u.attachEvent(Sv(f.toString()),_);else if(u.addListener&&u.removeListener)u.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Rx(){function u(m){return f.call(u.src,u.listener,m)}const f=kx;return u}function Tv(u,f,m,_,D){if(Array.isArray(f))for(var L=0;L<f.length;L++)Tv(u,f[L],m,_,D);else _=c(_)?!!_.capture:!!_,m=Av(m),u&&u[nr]?(u=u.i,f=String(f).toString(),f in u.g&&(L=u.g[f],m=bf(L,m,_,D),-1<m&&(Ju(L[m]),Array.prototype.splice.call(L,m,1),L.length==0&&(delete u.g[f],u.h--)))):u&&(u=Lf(u))&&(f=u.g[f.toString()],u=-1,f&&(u=bf(f,m,_,D)),(m=-1<u?f[u]:null)&&Of(m))}function Of(u){if(typeof u!="number"&&u&&!u.da){var f=u.src;if(f&&f[nr])Nf(f.i,u);else{var m=u.type,_=u.proxy;f.removeEventListener?f.removeEventListener(m,_,u.capture):f.detachEvent?f.detachEvent(Sv(m),_):f.addListener&&f.removeListener&&f.removeListener(_),(m=Lf(f))?(Nf(m,u),m.h==0&&(m.src=null,f[Df]=null)):Ju(u)}}}function Sv(u){return u in Vf?Vf[u]:Vf[u]="on"+u}function kx(u,f){if(u.da)u=!0;else{f=new er(f,this);var m=u.listener,_=u.ha||u.src;u.fa&&Of(u),u=m.call(_,f)}return u}function Lf(u){return u=u[Df],u instanceof Xu?u:null}var Mf="__closure_events_fn_"+(1e9*Math.random()>>>0);function Av(u){return typeof u=="function"?u:(u[Mf]||(u[Mf]=function(f){return u.handleEvent(f)}),u[Mf])}function It(){Te.call(this),this.i=new Xu(this),this.M=this,this.F=null}I(It,Te),It.prototype[nr]=!0,It.prototype.removeEventListener=function(u,f,m,_){Tv(this,u,f,m,_)};function Ot(u,f){var m,_=u.F;if(_)for(m=[];_;_=_.F)m.push(_);if(u=u.M,_=f.type||f,typeof f=="string")f=new Ye(f,u);else if(f instanceof Ye)f.target=f.target||u;else{var D=f;f=new Ye(_,u),k(f,D)}if(D=!0,m)for(var L=m.length-1;0<=L;L--){var q=f.g=m[L];D=Zu(q,_,!0,f)&&D}if(q=f.g=u,D=Zu(q,_,!0,f)&&D,D=Zu(q,_,!1,f)&&D,m)for(L=0;L<m.length;L++)q=f.g=m[L],D=Zu(q,_,!1,f)&&D}It.prototype.N=function(){if(It.aa.N.call(this),this.i){var u=this.i,f;for(f in u.g){for(var m=u.g[f],_=0;_<m.length;_++)Ju(m[_]);delete u.g[f],u.h--}}this.F=null},It.prototype.K=function(u,f,m,_){return this.i.add(String(u),f,!1,m,_)},It.prototype.L=function(u,f,m,_){return this.i.add(String(u),f,!0,m,_)};function Zu(u,f,m,_){if(f=u.i.g[String(f)],!f)return!0;f=f.concat();for(var D=!0,L=0;L<f.length;++L){var q=f[L];if(q&&!q.da&&q.capture==m){var Se=q.listener,_t=q.ha||q.src;q.fa&&Nf(u.i,q),D=Se.call(_t,_)!==!1&&D}}return D&&!_.defaultPrevented}function Cv(u,f,m){if(typeof u=="function")m&&(u=p(u,m));else if(u&&typeof u.handleEvent=="function")u=p(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:a.setTimeout(u,f||0)}function Rv(u){u.g=Cv(()=>{u.g=null,u.i&&(u.i=!1,Rv(u))},u.l);const f=u.h;u.h=null,u.m.apply(null,f)}class Px extends Te{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:Rv(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ka(u){Te.call(this),this.h=u,this.g={}}I(ka,Te);var kv=[];function Pv(u){M(u.g,function(f,m){this.g.hasOwnProperty(m)&&Of(f)},u),u.g={}}ka.prototype.N=function(){ka.aa.N.call(this),Pv(this)},ka.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ff=a.JSON.stringify,xx=a.JSON.parse,Nx=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function Uf(){}Uf.prototype.h=null;function xv(u){return u.h||(u.h=u.i())}function Nv(){}var Pa={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function jf(){Ye.call(this,"d")}I(jf,Ye);function Bf(){Ye.call(this,"c")}I(Bf,Ye);var Gi={},bv=null;function ec(){return bv=bv||new It}Gi.La="serverreachability";function Dv(u){Ye.call(this,Gi.La,u)}I(Dv,Ye);function xa(u){const f=ec();Ot(f,new Dv(f))}Gi.STAT_EVENT="statevent";function Vv(u,f){Ye.call(this,Gi.STAT_EVENT,u),this.stat=f}I(Vv,Ye);function Lt(u){const f=ec();Ot(f,new Vv(f,u))}Gi.Ma="timingevent";function Ov(u,f){Ye.call(this,Gi.Ma,u),this.size=f}I(Ov,Ye);function Na(u,f){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},f)}function ba(){this.g=!0}ba.prototype.xa=function(){this.g=!1};function bx(u,f,m,_,D,L){u.info(function(){if(u.g)if(L)for(var q="",Se=L.split("&"),_t=0;_t<Se.length;_t++){var _e=Se[_t].split("=");if(1<_e.length){var Tt=_e[0];_e=_e[1];var St=Tt.split("_");q=2<=St.length&&St[1]=="type"?q+(Tt+"="+_e+"&"):q+(Tt+"=redacted&")}}else q=null;else q=L;return"XMLHTTP REQ ("+_+") [attempt "+D+"]: "+f+`
`+m+`
`+q})}function Dx(u,f,m,_,D,L,q){u.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+D+"]: "+f+`
`+m+`
`+L+" "+q})}function qs(u,f,m,_){u.info(function(){return"XMLHTTP TEXT ("+f+"): "+Ox(u,m)+(_?" "+_:"")})}function Vx(u,f){u.info(function(){return"TIMEOUT: "+f})}ba.prototype.info=function(){};function Ox(u,f){if(!u.g)return f;if(!f)return null;try{var m=JSON.parse(f);if(m){for(u=0;u<m.length;u++)if(Array.isArray(m[u])){var _=m[u];if(!(2>_.length)){var D=_[1];if(Array.isArray(D)&&!(1>D.length)){var L=D[0];if(L!="noop"&&L!="stop"&&L!="close")for(var q=1;q<D.length;q++)D[q]=""}}}}return Ff(m)}catch{return f}}var tc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Lv={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},zf;function nc(){}I(nc,Uf),nc.prototype.g=function(){return new XMLHttpRequest},nc.prototype.i=function(){return{}},zf=new nc;function Vr(u,f,m,_){this.j=u,this.i=f,this.l=m,this.R=_||1,this.U=new ka(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Mv}function Mv(){this.i=null,this.g="",this.h=!1}var Fv={},$f={};function qf(u,f,m){u.L=1,u.v=oc(rr(f)),u.m=m,u.P=!0,Uv(u,null)}function Uv(u,f){u.F=Date.now(),rc(u),u.A=rr(u.v);var m=u.A,_=u.R;Array.isArray(_)||(_=[String(_)]),Zv(m.i,"t",_),u.C=0,m=u.j.J,u.h=new Mv,u.g=_w(u.j,m?f:null,!u.m),0<u.O&&(u.M=new Px(p(u.Y,u,u.g),u.O)),f=u.U,m=u.g,_=u.ca;var D="readystatechange";Array.isArray(D)||(D&&(kv[0]=D.toString()),D=kv);for(var L=0;L<D.length;L++){var q=Iv(m,D[L],_||f.handleEvent,!1,f.h||f);if(!q)break;f.g[q.key]=q}f=u.H?v(u.H):{},u.m?(u.u||(u.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,f)):(u.u="GET",u.g.ea(u.A,u.u,null,f)),xa(),bx(u.i,u.u,u.A,u.l,u.R,u.m)}Vr.prototype.ca=function(u){u=u.target;const f=this.M;f&&ir(u)==3?f.j():this.Y(u)},Vr.prototype.Y=function(u){try{if(u==this.g)e:{const St=ir(this.g);var f=this.g.Ba();const Ks=this.g.Z();if(!(3>St)&&(St!=3||this.g&&(this.h.h||this.g.oa()||ow(this.g)))){this.J||St!=4||f==7||(f==8||0>=Ks?xa(3):xa(2)),Gf(this);var m=this.g.Z();this.X=m;t:if(jv(this)){var _=ow(this.g);u="";var D=_.length,L=ir(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wi(this),Da(this);var q="";break t}this.h.i=new a.TextDecoder}for(f=0;f<D;f++)this.h.h=!0,u+=this.h.i.decode(_[f],{stream:!(L&&f==D-1)});_.length=0,this.h.g+=u,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=m==200,Dx(this.i,this.u,this.A,this.l,this.R,St,m),this.o){if(this.T&&!this.K){t:{if(this.g){var Se,_t=this.g;if((Se=_t.g?_t.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(Se)){var _e=Se;break t}}_e=null}if(m=_e)qs(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Wf(this,m);else{this.o=!1,this.s=3,Lt(12),Wi(this),Da(this);break e}}if(this.P){m=!0;let _n;for(;!this.J&&this.C<q.length;)if(_n=Lx(this,q),_n==$f){St==4&&(this.s=4,Lt(14),m=!1),qs(this.i,this.l,null,"[Incomplete Response]");break}else if(_n==Fv){this.s=4,Lt(15),qs(this.i,this.l,q,"[Invalid Chunk]"),m=!1;break}else qs(this.i,this.l,_n,null),Wf(this,_n);if(jv(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),St!=4||q.length!=0||this.h.h||(this.s=1,Lt(16),m=!1),this.o=this.o&&m,!m)qs(this.i,this.l,q,"[Invalid Chunked Response]"),Wi(this),Da(this);else if(0<q.length&&!this.W){this.W=!0;var Tt=this.j;Tt.g==this&&Tt.ba&&!Tt.M&&(Tt.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),Xf(Tt),Tt.M=!0,Lt(11))}}else qs(this.i,this.l,q,null),Wf(this,q);St==4&&Wi(this),this.o&&!this.J&&(St==4?fw(this.j,this):(this.o=!1,rc(this)))}else Zx(this.g),m==400&&0<q.indexOf("Unknown SID")?(this.s=3,Lt(12)):(this.s=0,Lt(13)),Wi(this),Da(this)}}}catch{}finally{}};function jv(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function Lx(u,f){var m=u.C,_=f.indexOf(`
`,m);return _==-1?$f:(m=Number(f.substring(m,_)),isNaN(m)?Fv:(_+=1,_+m>f.length?$f:(f=f.slice(_,_+m),u.C=_+m,f)))}Vr.prototype.cancel=function(){this.J=!0,Wi(this)};function rc(u){u.S=Date.now()+u.I,Bv(u,u.I)}function Bv(u,f){if(u.B!=null)throw Error("WatchDog timer not null");u.B=Na(p(u.ba,u),f)}function Gf(u){u.B&&(a.clearTimeout(u.B),u.B=null)}Vr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(Vx(this.i,this.A),this.L!=2&&(xa(),Lt(17)),Wi(this),this.s=2,Da(this)):Bv(this,this.S-u)};function Da(u){u.j.G==0||u.J||fw(u.j,u)}function Wi(u){Gf(u);var f=u.M;f&&typeof f.ma=="function"&&f.ma(),u.M=null,Pv(u.U),u.g&&(f=u.g,u.g=null,f.abort(),f.ma())}function Wf(u,f){try{var m=u.j;if(m.G!=0&&(m.g==u||Kf(m.h,u))){if(!u.K&&Kf(m.h,u)&&m.G==3){try{var _=m.Da.g.parse(f)}catch{_=null}if(Array.isArray(_)&&_.length==3){var D=_;if(D[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<u.F)dc(m),cc(m);else break e;Jf(m),Lt(18)}}else m.za=D[1],0<m.za-m.T&&37500>D[2]&&m.F&&m.v==0&&!m.C&&(m.C=Na(p(m.Za,m),6e3));if(1>=qv(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Hi(m,11)}else if((u.K||m.g==u)&&dc(m),!E(f))for(D=m.Da.g.parse(f),f=0;f<D.length;f++){let _e=D[f];if(m.T=_e[0],_e=_e[1],m.G==2)if(_e[0]=="c"){m.K=_e[1],m.ia=_e[2];const Tt=_e[3];Tt!=null&&(m.la=Tt,m.j.info("VER="+m.la));const St=_e[4];St!=null&&(m.Aa=St,m.j.info("SVER="+m.Aa));const Ks=_e[5];Ks!=null&&typeof Ks=="number"&&0<Ks&&(_=1.5*Ks,m.L=_,m.j.info("backChannelRequestTimeoutMs_="+_)),_=m;const _n=u.g;if(_n){const pc=_n.g?_n.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(pc){var L=_.h;L.g||pc.indexOf("spdy")==-1&&pc.indexOf("quic")==-1&&pc.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(Hf(L,L.h),L.h=null))}if(_.D){const Zf=_n.g?_n.g.getResponseHeader("X-HTTP-Session-Id"):null;Zf&&(_.ya=Zf,ke(_.I,_.D,Zf))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-u.F,m.j.info("Handshake RTT: "+m.R+"ms")),_=m;var q=u;if(_.qa=gw(_,_.J?_.ia:null,_.W),q.K){Gv(_.h,q);var Se=q,_t=_.L;_t&&(Se.I=_t),Se.B&&(Gf(Se),rc(Se)),_.g=q}else hw(_);0<m.i.length&&hc(m)}else _e[0]!="stop"&&_e[0]!="close"||Hi(m,7);else m.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Hi(m,7):Yf(m):_e[0]!="noop"&&m.l&&m.l.ta(_e),m.v=0)}}xa(4)}catch{}}var Mx=class{constructor(u,f){this.g=u,this.map=f}};function zv(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function $v(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function qv(u){return u.h?1:u.g?u.g.size:0}function Kf(u,f){return u.h?u.h==f:u.g?u.g.has(f):!1}function Hf(u,f){u.g?u.g.add(f):u.h=f}function Gv(u,f){u.h&&u.h==f?u.h=null:u.g&&u.g.has(f)&&u.g.delete(f)}zv.prototype.cancel=function(){if(this.i=Wv(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function Wv(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let f=u.i;for(const m of u.g.values())f=f.concat(m.D);return f}return P(u.i)}function Fx(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(l(u)){for(var f=[],m=u.length,_=0;_<m;_++)f.push(u[_]);return f}f=[],m=0;for(_ in u)f[m++]=u[_];return f}function Ux(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(l(u)||typeof u=="string"){var f=[];u=u.length;for(var m=0;m<u;m++)f.push(m);return f}f=[],m=0;for(const _ in u)f[m++]=_;return f}}}function Kv(u,f){if(u.forEach&&typeof u.forEach=="function")u.forEach(f,void 0);else if(l(u)||typeof u=="string")Array.prototype.forEach.call(u,f,void 0);else for(var m=Ux(u),_=Fx(u),D=_.length,L=0;L<D;L++)f.call(void 0,_[L],m&&m[L],u)}var Hv=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function jx(u,f){if(u){u=u.split("&");for(var m=0;m<u.length;m++){var _=u[m].indexOf("="),D=null;if(0<=_){var L=u[m].substring(0,_);D=u[m].substring(_+1)}else L=u[m];f(L,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function Ki(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Ki){this.h=u.h,ic(this,u.j),this.o=u.o,this.g=u.g,sc(this,u.s),this.l=u.l;var f=u.i,m=new La;m.i=f.i,f.g&&(m.g=new Map(f.g),m.h=f.h),Qv(this,m),this.m=u.m}else u&&(f=String(u).match(Hv))?(this.h=!1,ic(this,f[1]||"",!0),this.o=Va(f[2]||""),this.g=Va(f[3]||"",!0),sc(this,f[4]),this.l=Va(f[5]||"",!0),Qv(this,f[6]||"",!0),this.m=Va(f[7]||"")):(this.h=!1,this.i=new La(null,this.h))}Ki.prototype.toString=function(){var u=[],f=this.j;f&&u.push(Oa(f,Yv,!0),":");var m=this.g;return(m||f=="file")&&(u.push("//"),(f=this.o)&&u.push(Oa(f,Yv,!0),"@"),u.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&u.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&u.push("/"),u.push(Oa(m,m.charAt(0)=="/"?$x:zx,!0))),(m=this.i.toString())&&u.push("?",m),(m=this.m)&&u.push("#",Oa(m,Gx)),u.join("")};function rr(u){return new Ki(u)}function ic(u,f,m){u.j=m?Va(f,!0):f,u.j&&(u.j=u.j.replace(/:$/,""))}function sc(u,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);u.s=f}else u.s=null}function Qv(u,f,m){f instanceof La?(u.i=f,Wx(u.i,u.h)):(m||(f=Oa(f,qx)),u.i=new La(f,u.h))}function ke(u,f,m){u.i.set(f,m)}function oc(u){return ke(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Va(u,f){return u?f?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Oa(u,f,m){return typeof u=="string"?(u=encodeURI(u).replace(f,Bx),m&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function Bx(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var Yv=/[#\/\?@]/g,zx=/[#\?:]/g,$x=/[#\?]/g,qx=/[#\?@]/g,Gx=/#/g;function La(u,f){this.h=this.g=null,this.i=u||null,this.j=!!f}function Or(u){u.g||(u.g=new Map,u.h=0,u.i&&jx(u.i,function(f,m){u.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}n=La.prototype,n.add=function(u,f){Or(this),this.i=null,u=Gs(this,u);var m=this.g.get(u);return m||this.g.set(u,m=[]),m.push(f),this.h+=1,this};function Jv(u,f){Or(u),f=Gs(u,f),u.g.has(f)&&(u.i=null,u.h-=u.g.get(f).length,u.g.delete(f))}function Xv(u,f){return Or(u),f=Gs(u,f),u.g.has(f)}n.forEach=function(u,f){Or(this),this.g.forEach(function(m,_){m.forEach(function(D){u.call(f,D,_,this)},this)},this)},n.na=function(){Or(this);const u=Array.from(this.g.values()),f=Array.from(this.g.keys()),m=[];for(let _=0;_<f.length;_++){const D=u[_];for(let L=0;L<D.length;L++)m.push(f[_])}return m},n.V=function(u){Or(this);let f=[];if(typeof u=="string")Xv(this,u)&&(f=f.concat(this.g.get(Gs(this,u))));else{u=Array.from(this.g.values());for(let m=0;m<u.length;m++)f=f.concat(u[m])}return f},n.set=function(u,f){return Or(this),this.i=null,u=Gs(this,u),Xv(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[f]),this.h+=1,this},n.get=function(u,f){return u?(u=this.V(u),0<u.length?String(u[0]):f):f};function Zv(u,f,m){Jv(u,f),0<m.length&&(u.i=null,u.g.set(Gs(u,f),P(m)),u.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],f=Array.from(this.g.keys());for(var m=0;m<f.length;m++){var _=f[m];const L=encodeURIComponent(String(_)),q=this.V(_);for(_=0;_<q.length;_++){var D=L;q[_]!==""&&(D+="="+encodeURIComponent(String(q[_]))),u.push(D)}}return this.i=u.join("&")};function Gs(u,f){return f=String(f),u.j&&(f=f.toLowerCase()),f}function Wx(u,f){f&&!u.j&&(Or(u),u.i=null,u.g.forEach(function(m,_){var D=_.toLowerCase();_!=D&&(Jv(this,_),Zv(this,D,m))},u)),u.j=f}function Kx(u,f){const m=new ba;if(a.Image){const _=new Image;_.onload=g(Lr,m,"TestLoadImage: loaded",!0,f,_),_.onerror=g(Lr,m,"TestLoadImage: error",!1,f,_),_.onabort=g(Lr,m,"TestLoadImage: abort",!1,f,_),_.ontimeout=g(Lr,m,"TestLoadImage: timeout",!1,f,_),a.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=u}else f(!1)}function Hx(u,f){const m=new ba,_=new AbortController,D=setTimeout(()=>{_.abort(),Lr(m,"TestPingServer: timeout",!1,f)},1e4);fetch(u,{signal:_.signal}).then(L=>{clearTimeout(D),L.ok?Lr(m,"TestPingServer: ok",!0,f):Lr(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(D),Lr(m,"TestPingServer: error",!1,f)})}function Lr(u,f,m,_,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),_(m)}catch{}}function Qx(){this.g=new Nx}function Yx(u,f,m){const _=m||"";try{Kv(u,function(D,L){let q=D;c(D)&&(q=Ff(D)),f.push(_+L+"="+encodeURIComponent(q))})}catch(D){throw f.push(_+"type="+encodeURIComponent("_badmap")),D}}function ac(u){this.l=u.Ub||null,this.j=u.eb||!1}I(ac,Uf),ac.prototype.g=function(){return new lc(this.l,this.j)},ac.prototype.i=function(u){return function(){return u}}({});function lc(u,f){It.call(this),this.D=u,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(lc,It),n=lc.prototype,n.open=function(u,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=f,this.readyState=1,Fa(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(f.body=u),(this.D||a).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ma(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Fa(this)),this.g&&(this.readyState=3,Fa(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ew(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function ew(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var f=u.value?u.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!u.done}))&&(this.response=this.responseText+=f)}u.done?Ma(this):Fa(this),this.readyState==3&&ew(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Ma(this))},n.Qa=function(u){this.g&&(this.response=u,Ma(this))},n.ga=function(){this.g&&Ma(this)};function Ma(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Fa(u)}n.setRequestHeader=function(u,f){this.u.append(u,f)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,u.push(m[0]+": "+m[1]),m=f.next();return u.join(`\r
`)};function Fa(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(lc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function tw(u){let f="";return M(u,function(m,_){f+=_,f+=":",f+=m,f+=`\r
`}),f}function Qf(u,f,m){e:{for(_ in m){var _=!1;break e}_=!0}_||(m=tw(m),typeof u=="string"?m!=null&&encodeURIComponent(String(m)):ke(u,f,m))}function We(u){It.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(We,It);var Jx=/^https?$/i,Xx=["POST","PUT"];n=We.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,f,m,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);f=f?f.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():zf.g(),this.v=this.o?xv(this.o):xv(zf),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(u),!0),this.B=!1}catch(L){nw(this,L);return}if(u=m||"",m=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var D in _)m.set(D,_[D]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const L of _.keys())m.set(L,_.get(L));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(m.keys()).find(L=>L.toLowerCase()=="content-type"),D=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(Xx,f,void 0))||_||D||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,q]of m)this.g.setRequestHeader(L,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{sw(this),this.u=!0,this.g.send(u),this.u=!1}catch(L){nw(this,L)}};function nw(u,f){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=f,u.m=5,rw(u),uc(u)}function rw(u){u.A||(u.A=!0,Ot(u,"complete"),Ot(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,Ot(this,"complete"),Ot(this,"abort"),uc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),uc(this,!0)),We.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?iw(this):this.bb())},n.bb=function(){iw(this)};function iw(u){if(u.h&&typeof o<"u"&&(!u.v[1]||ir(u)!=4||u.Z()!=2)){if(u.u&&ir(u)==4)Cv(u.Ea,0,u);else if(Ot(u,"readystatechange"),ir(u)==4){u.h=!1;try{const q=u.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var _;if(_=q===0){var D=String(u.D).match(Hv)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),_=!Jx.test(D?D.toLowerCase():"")}m=_}if(m)Ot(u,"complete"),Ot(u,"success");else{u.m=6;try{var L=2<ir(u)?u.g.statusText:""}catch{L=""}u.l=L+" ["+u.Z()+"]",rw(u)}}finally{uc(u)}}}}function uc(u,f){if(u.g){sw(u);const m=u.g,_=u.v[0]?()=>{}:null;u.g=null,u.v=null,f||Ot(u,"ready");try{m.onreadystatechange=_}catch{}}}function sw(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function ir(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<ir(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var f=this.g.responseText;return u&&f.indexOf(u)==0&&(f=f.substring(u.length)),xx(f)}};function ow(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Zx(u){const f={};u=(u.g&&2<=ir(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<u.length;_++){if(E(u[_]))continue;var m=T(u[_]);const D=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const L=f[D]||[];f[D]=L,L.push(m)}S(f,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ua(u,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[u]||f}function aw(u){this.Aa=0,this.i=[],this.j=new ba,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ua("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ua("baseRetryDelayMs",5e3,u),this.cb=Ua("retryDelaySeedMs",1e4,u),this.Wa=Ua("forwardChannelMaxRetries",2,u),this.wa=Ua("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new zv(u&&u.concurrentRequestLimit),this.Da=new Qx,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=aw.prototype,n.la=8,n.G=1,n.connect=function(u,f,m,_){Lt(0),this.W=u,this.H=f||{},m&&_!==void 0&&(this.H.OSID=m,this.H.OAID=_),this.F=this.X,this.I=gw(this,null,this.W),hc(this)};function Yf(u){if(lw(u),u.G==3){var f=u.U++,m=rr(u.I);if(ke(m,"SID",u.K),ke(m,"RID",f),ke(m,"TYPE","terminate"),ja(u,m),f=new Vr(u,u.j,f),f.L=2,f.v=oc(rr(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(f.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=f.v,m=!0),m||(f.g=_w(f.j,null),f.g.ea(f.v)),f.F=Date.now(),rc(f)}mw(u)}function cc(u){u.g&&(Xf(u),u.g.cancel(),u.g=null)}function lw(u){cc(u),u.u&&(a.clearTimeout(u.u),u.u=null),dc(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function hc(u){if(!$v(u.h)&&!u.s){u.s=!0;var f=u.Ga;fe||ie(),G||(fe(),G=!0),ee.add(f,u),u.B=0}}function eN(u,f){return qv(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=f.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=Na(p(u.Ga,u,f),pw(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const D=new Vr(this,this.j,u);let L=this.o;if(this.S&&(L?(L=v(L),k(L,this.S)):L=this.S),this.m!==null||this.O||(D.H=L,L=null),this.P)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var _=this.i[m];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(f+=_,4096<f){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=cw(this,D,f),m=rr(this.I),ke(m,"RID",u),ke(m,"CVER",22),this.D&&ke(m,"X-HTTP-Session-Id",this.D),ja(this,m),L&&(this.O?f="headers="+encodeURIComponent(String(tw(L)))+"&"+f:this.m&&Qf(m,this.m,L)),Hf(this.h,D),this.Ua&&ke(m,"TYPE","init"),this.P?(ke(m,"$req",f),ke(m,"SID","null"),D.T=!0,qf(D,m,null)):qf(D,m,f),this.G=2}}else this.G==3&&(u?uw(this,u):this.i.length==0||$v(this.h)||uw(this))};function uw(u,f){var m;f?m=f.l:m=u.U++;const _=rr(u.I);ke(_,"SID",u.K),ke(_,"RID",m),ke(_,"AID",u.T),ja(u,_),u.m&&u.o&&Qf(_,u.m,u.o),m=new Vr(u,u.j,m,u.B+1),u.m===null&&(m.H=u.o),f&&(u.i=f.D.concat(u.i)),f=cw(u,m,1e3),m.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),Hf(u.h,m),qf(m,_,f)}function ja(u,f){u.H&&M(u.H,function(m,_){ke(f,_,m)}),u.l&&Kv({},function(m,_){ke(f,_,m)})}function cw(u,f,m){m=Math.min(u.i.length,m);var _=u.l?p(u.l.Na,u.l,u):null;e:{var D=u.i;let L=-1;for(;;){const q=["count="+m];L==-1?0<m?(L=D[0].g,q.push("ofs="+L)):L=0:q.push("ofs="+L);let Se=!0;for(let _t=0;_t<m;_t++){let _e=D[_t].g;const Tt=D[_t].map;if(_e-=L,0>_e)L=Math.max(0,D[_t].g-100),Se=!1;else try{Yx(Tt,q,"req"+_e+"_")}catch{_&&_(Tt)}}if(Se){_=q.join("&");break e}}}return u=u.i.splice(0,m),f.D=u,_}function hw(u){if(!u.g&&!u.u){u.Y=1;var f=u.Fa;fe||ie(),G||(fe(),G=!0),ee.add(f,u),u.v=0}}function Jf(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=Na(p(u.Fa,u),pw(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,dw(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=Na(p(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Lt(10),cc(this),dw(this))};function Xf(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function dw(u){u.g=new Vr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var f=rr(u.qa);ke(f,"RID","rpc"),ke(f,"SID",u.K),ke(f,"AID",u.T),ke(f,"CI",u.F?"0":"1"),!u.F&&u.ja&&ke(f,"TO",u.ja),ke(f,"TYPE","xmlhttp"),ja(u,f),u.m&&u.o&&Qf(f,u.m,u.o),u.L&&(u.g.I=u.L);var m=u.g;u=u.ia,m.L=1,m.v=oc(rr(f)),m.m=null,m.P=!0,Uv(m,u)}n.Za=function(){this.C!=null&&(this.C=null,cc(this),Jf(this),Lt(19))};function dc(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function fw(u,f){var m=null;if(u.g==f){dc(u),Xf(u),u.g=null;var _=2}else if(Kf(u.h,f))m=f.D,Gv(u.h,f),_=1;else return;if(u.G!=0){if(f.o)if(_==1){m=f.m?f.m.length:0,f=Date.now()-f.F;var D=u.B;_=ec(),Ot(_,new Ov(_,m)),hc(u)}else hw(u);else if(D=f.s,D==3||D==0&&0<f.X||!(_==1&&eN(u,f)||_==2&&Jf(u)))switch(m&&0<m.length&&(f=u.h,f.i=f.i.concat(m)),D){case 1:Hi(u,5);break;case 4:Hi(u,10);break;case 3:Hi(u,6);break;default:Hi(u,2)}}}function pw(u,f){let m=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(m*=2),m*f}function Hi(u,f){if(u.j.info("Error code "+f),f==2){var m=p(u.fb,u),_=u.Xa;const D=!_;_=new Ki(_||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||ic(_,"https"),oc(_),D?Kx(_.toString(),m):Hx(_.toString(),m)}else Lt(2);u.G=0,u.l&&u.l.sa(f),mw(u),lw(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),Lt(2)):(this.j.info("Failed to ping google.com"),Lt(1))};function mw(u){if(u.G=0,u.ka=[],u.l){const f=Wv(u.h);(f.length!=0||u.i.length!=0)&&(x(u.ka,f),x(u.ka,u.i),u.h.i.length=0,P(u.i),u.i.length=0),u.l.ra()}}function gw(u,f,m){var _=m instanceof Ki?rr(m):new Ki(m);if(_.g!="")f&&(_.g=f+"."+_.g),sc(_,_.s);else{var D=a.location;_=D.protocol,f=f?f+"."+D.hostname:D.hostname,D=+D.port;var L=new Ki(null);_&&ic(L,_),f&&(L.g=f),D&&sc(L,D),m&&(L.l=m),_=L}return m=u.D,f=u.ya,m&&f&&ke(_,m,f),ke(_,"VER",u.la),ja(u,_),_}function _w(u,f,m){if(f&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=u.Ca&&!u.pa?new We(new ac({eb:m})):new We(u.pa),f.Ha(u.J),f}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function yw(){}n=yw.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function fc(){}fc.prototype.g=function(u,f){return new Zt(u,f)};function Zt(u,f){It.call(this),this.g=new aw(f),this.l=u,this.h=f&&f.messageUrlParams||null,u=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(u?u["X-WebChannel-Content-Type"]=f.messageContentType:u={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(u?u["X-WebChannel-Client-Profile"]=f.va:u={"X-WebChannel-Client-Profile":f.va}),this.g.S=u,(u=f&&f.Sb)&&!E(u)&&(this.g.m=u),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!E(f)&&(this.g.D=f,u=this.h,u!==null&&f in u&&(u=this.h,f in u&&delete u[f])),this.j=new Ws(this)}I(Zt,It),Zt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Zt.prototype.close=function(){Yf(this.g)},Zt.prototype.o=function(u){var f=this.g;if(typeof u=="string"){var m={};m.__data__=u,u=m}else this.u&&(m={},m.__data__=Ff(u),u=m);f.i.push(new Mx(f.Ya++,u)),f.G==3&&hc(f)},Zt.prototype.N=function(){this.g.l=null,delete this.j,Yf(this.g),delete this.g,Zt.aa.N.call(this)};function vw(u){jf.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var f=u.__sm__;if(f){e:{for(const m in f){u=m;break e}u=void 0}(this.i=u)&&(u=this.i,f=f!==null&&u in f?f[u]:void 0),this.data=f}else this.data=u}I(vw,jf);function ww(){Bf.call(this),this.status=1}I(ww,Bf);function Ws(u){this.g=u}I(Ws,yw),Ws.prototype.ua=function(){Ot(this.g,"a")},Ws.prototype.ta=function(u){Ot(this.g,new vw(u))},Ws.prototype.sa=function(u){Ot(this.g,new ww)},Ws.prototype.ra=function(){Ot(this.g,"b")},fc.prototype.createWebChannel=fc.prototype.g,Zt.prototype.send=Zt.prototype.o,Zt.prototype.open=Zt.prototype.m,Zt.prototype.close=Zt.prototype.close,EC=function(){return new fc},wC=function(){return ec()},vC=Gi,Qm={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},tc.NO_ERROR=0,tc.TIMEOUT=8,tc.HTTP_ERROR=6,sh=tc,Lv.COMPLETE="complete",yC=Lv,Nv.EventType=Pa,Pa.OPEN="a",Pa.CLOSE="b",Pa.ERROR="c",Pa.MESSAGE="d",It.prototype.listen=It.prototype.K,cl=Nv,We.prototype.listenOnce=We.prototype.L,We.prototype.getLastError=We.prototype.Ka,We.prototype.getLastErrorCode=We.prototype.Ba,We.prototype.getStatus=We.prototype.Z,We.prototype.getResponseJson=We.prototype.Oa,We.prototype.getResponseText=We.prototype.oa,We.prototype.send=We.prototype.ea,We.prototype.setWithCredentials=We.prototype.Ha,_C=We}).apply(typeof Dc<"u"?Dc:typeof self<"u"?self:typeof window<"u"?window:{});const lI="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ht=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ht.UNAUTHENTICATED=new ht(null),ht.GOOGLE_CREDENTIALS=new ht("google-credentials-uid"),ht.FIRST_PARTY=new ht("first-party-uid"),ht.MOCK_USER=new ht("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let da="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi=new Gd("@firebase/firestore");function eo(){return wi.logLevel}function vL(n){wi.setLogLevel(n)}function j(n,...e){if(wi.logLevel<=ae.DEBUG){const t=e.map(j_);wi.debug(`Firestore (${da}): ${n}`,...t)}}function Xe(n,...e){if(wi.logLevel<=ae.ERROR){const t=e.map(j_);wi.error(`Firestore (${da}): ${n}`,...t)}}function sn(n,...e){if(wi.logLevel<=ae.WARN){const t=e.map(j_);wi.warn(`Firestore (${da}): ${n}`,...t)}}function j_(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(n="Unexpected state"){const e=`FIRESTORE (${da}) INTERNAL ASSERTION FAILED: `+n;throw Xe(e),new Error(e)}function Q(n,e){n||K()}function wL(n,e){n||K()}function $(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Yn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class TC{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ht.UNAUTHENTICATED))}shutdown(){}}class EL{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class IL{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new mt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new mt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},a=l=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new mt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string"),new IC(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new ht(e)}}class TL{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class SL{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new TL(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class SC{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class AL{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Q(this.o===void 0);const r=s=>{s.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,j("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string"),this.R=t.token,new SC(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class CL{getToken(){return Promise.resolve(new SC(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RL(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=RL(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function te(n,e){return n<e?-1:n>e?1:0}function Bo(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function AC(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Fe.fromMillis(Date.now())}static fromDate(e){return Fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Fe(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?te(this.nanoseconds,e.nanoseconds):te(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new Fe(0,0))}static max(){return new J(new Fe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return nu.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof nu?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class he extends nu{construct(e,t,r){return new he(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new he(t)}static emptyPath(){return new he([])}}const kL=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class De extends nu{construct(e,t,r){return new De(e,t,r)}static isValidIdentifier(e){return kL.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),De.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new De(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new U(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new U(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new De(t)}static emptyPath(){return new De([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{constructor(e){this.path=e}static fromPath(e){return new W(he.fromString(e))}static fromName(e){return new W(he.fromString(e).popFirst(5))}static empty(){return new W(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new W(new he(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function Ym(n){return n.fields.find(e=>e.kind===2)}function Zi(n){return n.fields.filter(e=>e.kind!==2)}function PL(n,e){let t=te(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=xL(n.fields[r],e.fields[r]),t!==0)return t;return te(n.fields.length,e.fields.length)}zo.UNKNOWN_ID=-1;class ms{constructor(e,t){this.fieldPath=e,this.kind=t}}function xL(n,e){const t=De.comparator(n.fieldPath,e.fieldPath);return t!==0?t:te(n.kind,e.kind)}class $o{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new $o(0,on.min())}}function CC(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=J.fromTimestamp(r===1e9?new Fe(t+1,0):new Fe(t,r));return new on(i,W.empty(),e)}function RC(n){return new on(n.readTime,n.key,-1)}class on{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new on(J.min(),W.empty(),-1)}static max(){return new on(J.max(),W.empty(),-1)}}function z_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=W.comparator(n.documentKey,e.documentKey),t!==0?t:te(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class PC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fi(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==kC)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&K(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):b.reject(t)}static resolve(e){return new b((t,r)=>{t(e)})}static reject(e){return new b((t,r)=>{r(e)})}static waitFor(e){return new b((t,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=b.resolve(!1);for(const r of e)t=t.next(i=>i?b.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new b((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let l=0;l<s;l++){const c=l;t(e[c]).next(h=>{o[c]=h,++a,a===s&&r(o)},h=>i(h))}})}static doWhile(e,t){return new b((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new mt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Sl(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=$_(r.target.error);this.V.reject(new Sl(e,i))}}static open(e,t,r,i){try{return new Jd(t,e.transaction(i,r))}catch(s){throw new Sl(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(j("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new bL(t)}}class Gn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Gn.S(ot())===12.2&&Xe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return j("SimpleDb","Removing database:",e),ts(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!NA())return!1;if(Gn.v())return!0;const e=ot(),t=Gn.S(e),r=0<t&&t<10,i=xC(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(j("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Sl(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new U(O.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new U(O.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Sl(e,o))},i.onupgradeneeded=s=>{j("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{j("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=Jd.open(this.db,e,s?"readonly":"readwrite",r),l=i(a).next(c=>(a.g(),c)).catch(c=>(a.abort(c),b.reject(c))).toPromise();return l.catch(()=>{}),await a.m,l}catch(a){const l=a,c=l.name!=="FirebaseError"&&o<3;if(j("SimpleDb","Transaction failed with error:",l.message,"Retrying:",c),this.close(),!c)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function xC(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class NL{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return ts(this.B.delete())}}class Sl extends U{constructor(e,t){super(O.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Ui(n){return n.name==="IndexedDbTransactionError"}class bL{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(j("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(j("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),ts(r)}add(e){return j("SimpleDb","ADD",this.store.name,e,e),ts(this.store.add(e))}get(e){return ts(this.store.get(e)).next(t=>(t===void 0&&(t=null),j("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return j("SimpleDb","DELETE",this.store.name,e),ts(this.store.delete(e))}count(){return j("SimpleDb","COUNT",this.store.name),ts(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new b((o,a)=>{s.onerror=l=>{a(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(a,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new b((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){j("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,a)=>a.delete())}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new b((r,i)=>{t.onerror=s=>{const o=$_(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,t){const r=[];return new b((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const l=new NL(a),c=t(a.primaryKey,a.value,l);if(c instanceof b){const h=c.catch(d=>(l.done(),b.reject(d)));r.push(h)}l.isDone?i():l.K===null?a.continue():a.continue(l.K)}}).next(()=>b.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function ts(n){return new b((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=$_(r.target.error);t(i)}})}let uI=!1;function $_(n){const e=Gn.S(ot());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return uI||(uI=!0,setTimeout(()=>{throw r},0)),r}}return n}class DL{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){j("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{j("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Ui(t)?j("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Fi(t)}await this.X(6e4)})}}class VL{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const r=new Set;let i=t,s=!0;return b.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return j("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(a=>(j("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=RC(s);z_(o,r)>0&&(r=o)}),new on(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}qt.oe=-1;function Pu(n){return n==null}function ru(n){return n===0&&1/n==-1/0}function NC(n){return typeof n=="number"&&Number.isInteger(n)&&!ru(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=cI(e)),e=OL(n.get(t),e);return cI(e)}function OL(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function cI(n){return n+""}function jn(n){const e=n.length;if(Q(e>=2),e===2)return Q(n.charAt(0)===""&&n.charAt(1)===""),he.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&K(),n.charAt(o+1)){case"":const a=n.substring(s,o);let l;i.length===0?l=a:(i+=a,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:K()}s=o+2}return new he(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(n,e){return[n,Nt(e)]}function bC(n,e,t){return[n,Nt(e),t]}const LL={},ML=["prefixPath","collectionGroup","readTime","documentId"],FL=["prefixPath","collectionGroup","documentId"],UL=["collectionGroup","readTime","prefixPath","documentId"],jL=["canonicalId","targetId"],BL=["targetId","path"],zL=["path","targetId"],$L=["collectionId","parent"],qL=["indexId","uid"],GL=["uid","sequenceNumber"],WL=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],KL=["indexId","uid","orderedDocumentKey"],HL=["userId","collectionPath","documentId"],QL=["userId","collectionPath","largestBatchId"],YL=["userId","collectionGroup","largestBatchId"],DC=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],JL=[...DC,"documentOverlays"],VC=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],OC=VC,q_=[...OC,"indexConfiguration","indexState","indexEntries"],XL=q_,ZL=[...q_,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm extends PC{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function at(n,e){const t=$(n);return Gn.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dI(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function ji(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function LC(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function MC(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qe=class Xm{constructor(e,t){this.comparator=e,this.root=t||di.EMPTY}insert(e,t){return new Xm(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,di.BLACK,null,null))}remove(e){return new Xm(this.comparator,this.root.remove(e,this.comparator).copy(null,null,di.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vc(this.root,e,this.comparator,!0)}},Vc=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},di=class sr{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??sr.RED,this.left=i??sr.EMPTY,this.right=s??sr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new sr(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return sr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return sr.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,sr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,sr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}};di.EMPTY=null,di.RED=!0,di.BLACK=!1;di.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,i,s){return this}insert(e,t,r){return new di(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new fI(this.data.getIterator())}getIteratorFrom(e){return new fI(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class fI{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Qs(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new Gt([])}unionWith(e){let t=new Ee(De.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Bo(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FC extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eM(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new FC("Invalid base64 string: "+s):s}}(e);return new Ge(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return te(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ge.EMPTY_BYTE_STRING=new Ge("");const tM=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ar(n){if(Q(!!n),typeof n=="string"){let e=0;const t=tM.exec(n);if(Q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Oe(n.seconds),nanos:Oe(n.nanos)}}function Oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Cr(n){return typeof n=="string"?Ge.fromBase64String(n):Ge.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xd(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Zd(n){const e=n.mapValue.fields.__previous_value__;return Xd(e)?Zd(e):e}function iu(n){const e=Ar(n.mapValue.fields.__local_write_time__.timestampValue);return new Fe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nM{constructor(e,t,r,i,s,o,a,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class Ei{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ei("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ei&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ah={nullValue:"NULL_VALUE"};function Ii(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Xd(n)?4:UC(n)?9007199254740991:ef(n)?10:11:K()}function Kn(n,e){if(n===e)return!0;const t=Ii(n);if(t!==Ii(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return iu(n).isEqual(iu(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Ar(i.timestampValue),a=Ar(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Cr(i.bytesValue).isEqual(Cr(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Oe(i.geoPointValue.latitude)===Oe(s.geoPointValue.latitude)&&Oe(i.geoPointValue.longitude)===Oe(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Oe(i.integerValue)===Oe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Oe(i.doubleValue),a=Oe(s.doubleValue);return o===a?ru(o)===ru(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return Bo(n.arrayValue.values||[],e.arrayValue.values||[],Kn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(dI(o)!==dI(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!Kn(o[l],a[l])))return!1;return!0}(n,e);default:return K()}}function su(n,e){return(n.values||[]).find(t=>Kn(t,e))!==void 0}function Ti(n,e){if(n===e)return 0;const t=Ii(n),r=Ii(e);if(t!==r)return te(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return te(n.booleanValue,e.booleanValue);case 2:return function(s,o){const a=Oe(s.integerValue||s.doubleValue),l=Oe(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1}(n,e);case 3:return pI(n.timestampValue,e.timestampValue);case 4:return pI(iu(n),iu(e));case 5:return te(n.stringValue,e.stringValue);case 6:return function(s,o){const a=Cr(s),l=Cr(o);return a.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const a=s.split("/"),l=o.split("/");for(let c=0;c<a.length&&c<l.length;c++){const h=te(a[c],l[c]);if(h!==0)return h}return te(a.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const a=te(Oe(s.latitude),Oe(o.latitude));return a!==0?a:te(Oe(s.longitude),Oe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return mI(n.arrayValue,e.arrayValue);case 10:return function(s,o){var a,l,c,h;const d=s.fields||{},p=o.fields||{},g=(a=d.value)===null||a===void 0?void 0:a.arrayValue,I=(l=p.value)===null||l===void 0?void 0:l.arrayValue,P=te(((c=g==null?void 0:g.values)===null||c===void 0?void 0:c.length)||0,((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0);return P!==0?P:mI(g,I)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===Zr.mapValue&&o===Zr.mapValue)return 0;if(s===Zr.mapValue)return 1;if(o===Zr.mapValue)return-1;const a=s.fields||{},l=Object.keys(a),c=o.fields||{},h=Object.keys(c);l.sort(),h.sort();for(let d=0;d<l.length&&d<h.length;++d){const p=te(l[d],h[d]);if(p!==0)return p;const g=Ti(a[l[d]],c[h[d]]);if(g!==0)return g}return te(l.length,h.length)}(n.mapValue,e.mapValue);default:throw K()}}function pI(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return te(n,e);const t=Ar(n),r=Ar(e),i=te(t.seconds,r.seconds);return i!==0?i:te(t.nanos,r.nanos)}function mI(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Ti(t[i],r[i]);if(s)return s}return te(t.length,r.length)}function qo(n){return Zm(n)}function Zm(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Ar(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Cr(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return W.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Zm(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Zm(t.fields[o])}`;return i+"}"}(n.mapValue):K()}function lh(n){switch(Ii(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Zd(n);return e?16+lh(e):16;case 5:return 2*n.stringValue.length;case 6:return Cr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+lh(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return ji(r.fields,(s,o)=>{i+=s.length+lh(o)}),i}(n.mapValue);default:throw K()}}function Is(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function eg(n){return!!n&&"integerValue"in n}function ou(n){return!!n&&"arrayValue"in n}function gI(n){return!!n&&"nullValue"in n}function _I(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function uh(n){return!!n&&"mapValue"in n}function ef(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Al(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return ji(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Al(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Al(n.arrayValue.values[t]);return e}return Object.assign({},n)}function UC(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const jC={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function rM(n){return"nullValue"in n?ah:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Is(Ei.empty(),W.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?ef(n)?jC:{mapValue:{}}:K()}function iM(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Is(Ei.empty(),W.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?jC:"mapValue"in n?ef(n)?{mapValue:{}}:Zr:K()}function yI(n,e){const t=Ti(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function vI(n,e){const t=Ti(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.value=e}static empty(){return new vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!uh(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Al(t)}setAll(e){let t=De.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Al(o):i.push(a.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());uh(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Kn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];uh(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){ji(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new vt(Al(this.value))}}function BC(n){const e=[];return ji(n.fields,(t,r)=>{const i=new De([t]);if(uh(r)){const s=BC(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Gt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new be(e,0,J.min(),J.min(),J.min(),vt.empty(),0)}static newFoundDocument(e,t,r,i){return new be(e,1,t,J.min(),r,i,0)}static newNoDocument(e,t){return new be(e,2,t,J.min(),J.min(),vt.empty(),0)}static newUnknownDocument(e,t){return new be(e,3,t,J.min(),J.min(),vt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=vt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof be&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new be(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e,t){this.position=e,this.inclusive=t}}function wI(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),t.key):r=Ti(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function EI(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Kn(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e,t="asc"){this.field=e,this.dir=t}}function sM(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{}class de extends zC{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new oM(e,t,r):t==="array-contains"?new uM(e,r):t==="in"?new HC(e,r):t==="not-in"?new cM(e,r):t==="array-contains-any"?new hM(e,r):new de(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new aM(e,r):new lM(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ti(t,this.value)):t!==null&&Ii(this.value)===Ii(t)&&this.matchesComparison(Ti(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ve extends zC{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ve(e,t)}matches(e){return Go(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Go(n){return n.op==="and"}function tg(n){return n.op==="or"}function G_(n){return $C(n)&&Go(n)}function $C(n){for(const e of n.filters)if(e instanceof ve)return!1;return!0}function ng(n){if(n instanceof de)return n.field.canonicalString()+n.op.toString()+qo(n.value);if(G_(n))return n.filters.map(e=>ng(e)).join(",");{const e=n.filters.map(t=>ng(t)).join(",");return`${n.op}(${e})`}}function qC(n,e){return n instanceof de?function(r,i){return i instanceof de&&r.op===i.op&&r.field.isEqual(i.field)&&Kn(r.value,i.value)}(n,e):n instanceof ve?function(r,i){return i instanceof ve&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&qC(o,i.filters[a]),!0):!1}(n,e):void K()}function GC(n,e){const t=n.filters.concat(e);return ve.create(t,n.op)}function WC(n){return n instanceof de?function(t){return`${t.field.canonicalString()} ${t.op} ${qo(t.value)}`}(n):n instanceof ve?function(t){return t.op.toString()+" {"+t.getFilters().map(WC).join(" ,")+"}"}(n):"Filter"}class oM extends de{constructor(e,t,r){super(e,t,r),this.key=W.fromName(r.referenceValue)}matches(e){const t=W.comparator(e.key,this.key);return this.matchesComparison(t)}}class aM extends de{constructor(e,t){super(e,"in",t),this.keys=KC("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class lM extends de{constructor(e,t){super(e,"not-in",t),this.keys=KC("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function KC(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>W.fromName(r.referenceValue))}class uM extends de{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ou(t)&&su(t.arrayValue,this.value)}}class HC extends de{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&su(this.value.arrayValue,t)}}class cM extends de{constructor(e,t){super(e,"not-in",t)}matches(e){if(su(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!su(this.value.arrayValue,t)}}class hM extends de{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ou(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>su(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dM{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function rg(n,e=null,t=[],r=[],i=null,s=null,o=null){return new dM(n,e,t,r,i,s,o)}function Ts(n){const e=$(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ng(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Pu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>qo(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>qo(r)).join(",")),e.ue=t}return e.ue}function xu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!sM(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!qC(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!EI(n.startAt,e.startAt)&&EI(n.endAt,e.endAt)}function Qh(n){return W.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Yh(n,e){return n.filters.filter(t=>t instanceof de&&t.field.isEqual(e))}function II(n,e,t){let r=ah,i=!0;for(const s of Yh(n,e)){let o=ah,a=!0;switch(s.op){case"<":case"<=":o=rM(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=ah}yI({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];yI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function TI(n,e,t){let r=Zr,i=!0;for(const s of Yh(n,e)){let o=Zr,a=!0;switch(s.op){case">=":case">":o=iM(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=Zr}vI({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];vI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function QC(n,e,t,r,i,s,o,a){return new xr(n,e,t,r,i,s,o,a)}function fa(n){return new xr(n)}function SI(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function W_(n){return n.collectionGroup!==null}function Ro(n){const e=$(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Ee(De.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new au(s,r))}),t.has(De.keyField().canonicalString())||e.ce.push(new au(De.keyField(),r))}return e.ce}function bt(n){const e=$(n);return e.le||(e.le=JC(e,Ro(n))),e.le}function YC(n){const e=$(n);return e.he||(e.he=JC(e,n.explicitOrderBy)),e.he}function JC(n,e){if(n.limitType==="F")return rg(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new au(i.field,s)});const t=n.endAt?new Si(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Si(n.startAt.position,n.startAt.inclusive):null;return rg(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ig(n,e){const t=n.filters.concat([e]);return new xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Jh(n,e,t){return new xr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Nu(n,e){return xu(bt(n),bt(e))&&n.limitType===e.limitType}function XC(n){return`${Ts(bt(n))}|lt:${n.limitType}`}function to(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>WC(i)).join(", ")}]`),Pu(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>qo(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>qo(i)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function bu(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):W.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Ro(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,a,l){const c=wI(o,a,l);return o.inclusive?c<=0:c<0}(r.startAt,Ro(r),i)||r.endAt&&!function(o,a,l){const c=wI(o,a,l);return o.inclusive?c>=0:c>0}(r.endAt,Ro(r),i))}(n,e)}function ZC(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function eR(n){return(e,t)=>{let r=!1;for(const i of Ro(n)){const s=fM(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function fM(n,e,t){const r=n.field.isKeyField()?W.comparator(e.key,t.key):function(s,o,a){const l=o.data.field(s),c=a.data.field(s);return l!==null&&c!==null?Ti(l,c):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){ji(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return MC(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pM=new qe(W.comparator);function Wt(){return pM}const tR=new qe(W.comparator);function hl(...n){let e=tR;for(const t of n)e=e.insert(t.key,t);return e}function nR(n){let e=tR;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Bn(){return Cl()}function rR(){return Cl()}function Cl(){return new Nr(n=>n.toString(),(n,e)=>n.isEqual(e))}const mM=new qe(W.comparator),gM=new Ee(W.comparator);function re(...n){let e=gM;for(const t of n)e=e.add(t);return e}const _M=new Ee(te);function K_(){return _M}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H_(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ru(e)?"-0":e}}function iR(n){return{integerValue:""+n}}function sR(n,e){return NC(e)?iR(e):H_(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tf{constructor(){this._=void 0}}function yM(n,e,t){return n instanceof Wo?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Xd(s)&&(s=Zd(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof Ss?aR(n,e):n instanceof As?lR(n,e):function(i,s){const o=oR(i,s),a=AI(o)+AI(i.Pe);return eg(o)&&eg(i.Pe)?iR(a):H_(i.serializer,a)}(n,e)}function vM(n,e,t){return n instanceof Ss?aR(n,e):n instanceof As?lR(n,e):t}function oR(n,e){return n instanceof Ko?function(r){return eg(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Wo extends tf{}class Ss extends tf{constructor(e){super(),this.elements=e}}function aR(n,e){const t=uR(e);for(const r of n.elements)t.some(i=>Kn(i,r))||t.push(r);return{arrayValue:{values:t}}}class As extends tf{constructor(e){super(),this.elements=e}}function lR(n,e){let t=uR(e);for(const r of n.elements)t=t.filter(i=>!Kn(i,r));return{arrayValue:{values:t}}}class Ko extends tf{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function AI(n){return Oe(n.integerValue||n.doubleValue)}function uR(n){return ou(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{constructor(e,t){this.field=e,this.transform=t}}function wM(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Ss&&i instanceof Ss||r instanceof As&&i instanceof As?Bo(r.elements,i.elements,Kn):r instanceof Ko&&i instanceof Ko?Kn(r.Pe,i.Pe):r instanceof Wo&&i instanceof Wo}(n.transform,e.transform)}class EM{constructor(e,t){this.version=e,this.transformResults=t}}class Me{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Me}static exists(e){return new Me(void 0,e)}static updateTime(e){return new Me(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ch(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class nf{}function cR(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ma(n.key,Me.none()):new pa(n.key,n.data,Me.none());{const t=n.data,r=vt.empty();let i=new Ee(De.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new br(n.key,r,new Gt(i.toArray()),Me.none())}}function IM(n,e,t){n instanceof pa?function(i,s,o){const a=i.value.clone(),l=RI(i.fieldTransforms,s,o.transformResults);a.setAll(l),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof br?function(i,s,o){if(!ch(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=RI(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(hR(i)),l.setAll(a),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Rl(n,e,t,r){return n instanceof pa?function(s,o,a,l){if(!ch(s.precondition,o))return a;const c=s.value.clone(),h=kI(s.fieldTransforms,l,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof br?function(s,o,a,l){if(!ch(s.precondition,o))return a;const c=kI(s.fieldTransforms,l,o),h=o.data;return h.setAll(hR(s)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(d=>d.field))}(n,e,t,r):function(s,o,a){return ch(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function TM(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=oR(r.transform,i||null);s!=null&&(t===null&&(t=vt.empty()),t.set(r.field,s))}return t||null}function CI(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Bo(r,i,(s,o)=>wM(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class pa extends nf{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class br extends nf{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function hR(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function RI(n,e,t){const r=new Map;Q(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,vM(o,a,t[i]))}return r}function kI(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,yM(s,o,e))}return r}class ma extends nf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Q_ extends nf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&IM(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Rl(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Rl(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=rR();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const l=cR(o,a);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&Bo(this.mutations,e.mutations,(t,r)=>CI(t,r))&&Bo(this.baseMutations,e.baseMutations,(t,r)=>CI(t,r))}}class J_{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Q(e.mutations.length===r.length);let i=function(){return mM}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new J_(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X_{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SM{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,pe;function fR(n){switch(n){default:return K();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0}}function pR(n){if(n===void 0)return Xe("GRPC error has no .code"),O.UNKNOWN;switch(n){case et.OK:return O.OK;case et.CANCELLED:return O.CANCELLED;case et.UNKNOWN:return O.UNKNOWN;case et.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case et.INTERNAL:return O.INTERNAL;case et.UNAVAILABLE:return O.UNAVAILABLE;case et.UNAUTHENTICATED:return O.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case et.NOT_FOUND:return O.NOT_FOUND;case et.ALREADY_EXISTS:return O.ALREADY_EXISTS;case et.PERMISSION_DENIED:return O.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case et.ABORTED:return O.ABORTED;case et.OUT_OF_RANGE:return O.OUT_OF_RANGE;case et.UNIMPLEMENTED:return O.UNIMPLEMENTED;case et.DATA_LOSS:return O.DATA_LOSS;default:return K()}}(pe=et||(et={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xh=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mR(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AM=new ps([4294967295,4294967295],0);function PI(n){const e=mR().encode(n),t=new gC;return t.update(e),new Uint8Array(t.digest())}function xI(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ps([t,r],0),new ps([i,s],0)]}class Z_{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new dl(`Invalid padding: ${t}`);if(r<0)throw new dl(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new dl(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new dl(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ps.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(ps.fromNumber(r)));return i.compare(AM)===1&&(i=new ps([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=PI(e),[r,i]=xI(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new Z_(s,i,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ie===0)return;const t=PI(e),[r,i]=xI(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class dl extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vu{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Ou.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Vu(J.min(),i,new qe(te),Wt(),re())}}class Ou{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Ou(r,t,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class gR{constructor(e,t){this.targetId=e,this.me=t}}class _R{constructor(e,t,r=Ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class NI{constructor(){this.fe=0,this.ge=DI(),this.pe=Ge.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=re(),t=re(),r=re();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:K()}}),new Ou(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=DI()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class CM{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wt(),this.qe=bI(),this.Qe=new qe(te)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Qh(s))if(r===0){const o=new W(s.path);this.Ue(t,o,be.newNoDocument(o,J.min()))}else Q(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),l=a?this.Xe(a,e,o):1;if(l!==0){this.je(t);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,c)}Xh==null||Xh.et(function(h,d,p,g,I){var P,x,y,E,A,V;const F={localCacheCount:h,existenceFilterCount:d.count,databaseId:p.database,projectId:p.projectId},M=d.unchangedNames;return M&&(F.bloomFilter={applied:I===0,hashCount:(P=M==null?void 0:M.hashCount)!==null&&P!==void 0?P:0,bitmapLength:(E=(y=(x=M==null?void 0:M.bits)===null||x===void 0?void 0:x.bitmap)===null||y===void 0?void 0:y.length)!==null&&E!==void 0?E:0,padding:(V=(A=M==null?void 0:M.bits)===null||A===void 0?void 0:A.padding)!==null&&V!==void 0?V:0,mightContain:S=>{var v;return(v=g==null?void 0:g.mightContain(S))!==null&&v!==void 0&&v}}),F}(o,e.me,this.Le.tt(),a,l))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=Cr(r).toUint8Array()}catch(l){if(l instanceof FC)return sn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new Z_(o,i,s)}catch(l){return sn(l instanceof dl?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Qh(a.target)){const l=new W(a.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,be.newNoDocument(l,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let r=re();this.qe.forEach((s,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.Je(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new Vu(e,t,this.Qe,this.ke,r);return this.ke=Wt(),this.qe=bI(),this.Qe=new qe(te),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new NI,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ee(te),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new NI),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function bI(){return new qe(W.comparator)}function DI(){return new qe(W.comparator)}const RM={asc:"ASCENDING",desc:"DESCENDING"},kM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},PM={and:"AND",or:"OR"};class xM{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function sg(n,e){return n.useProto3Json||Pu(e)?e:{value:e}}function Ho(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yR(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function NM(n,e){return Ho(n,e.toTimestamp())}function Ze(n){return Q(!!n),J.fromTimestamp(function(t){const r=Ar(t);return new Fe(r.seconds,r.nanos)}(n))}function ey(n,e){return og(n,e).canonicalString()}function og(n,e){const t=function(i){return new he(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function vR(n){const e=he.fromString(n);return Q(PR(e)),e}function lu(n,e){return ey(n.databaseId,e.path)}function Wn(n,e){const t=vR(e);if(t.get(1)!==n.databaseId.projectId)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new W(IR(t))}function wR(n,e){return ey(n.databaseId,e)}function ER(n){const e=vR(n);return e.length===4?he.emptyPath():IR(e)}function ag(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function IR(n){return Q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function VI(n,e,t){return{name:lu(n,e),fields:t.value.mapValue.fields}}function TR(n,e,t){const r=Wn(n,e.name),i=Ze(e.updateTime),s=e.createTime?Ze(e.createTime):J.min(),o=new vt({mapValue:{fields:e.fields}}),a=be.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function bM(n,e){return"found"in e?function(r,i){Q(!!i.found),i.found.name,i.found.updateTime;const s=Wn(r,i.found.name),o=Ze(i.found.updateTime),a=i.found.createTime?Ze(i.found.createTime):J.min(),l=new vt({mapValue:{fields:i.found.fields}});return be.newFoundDocument(s,o,a,l)}(n,e):"missing"in e?function(r,i){Q(!!i.missing),Q(!!i.readTime);const s=Wn(r,i.missing),o=Ze(i.readTime);return be.newNoDocument(s,o)}(n,e):K()}function DM(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,h){return c.useProto3Json?(Q(h===void 0||typeof h=="string"),Ge.fromBase64String(h||"")):(Q(h===void 0||h instanceof Buffer||h instanceof Uint8Array),Ge.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const h=c.code===void 0?O.UNKNOWN:pR(c.code);return new U(h,c.message||"")}(o);t=new _R(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(n,r.document.name),s=Ze(r.document.updateTime),o=r.document.createTime?Ze(r.document.createTime):J.min(),a=new vt({mapValue:{fields:r.document.fields}}),l=be.newFoundDocument(i,s,o,a),c=r.targetIds||[],h=r.removedTargetIds||[];t=new hh(c,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(n,r.document),s=r.readTime?Ze(r.readTime):J.min(),o=be.newNoDocument(i,s),a=r.removedTargetIds||[];t=new hh([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(n,r.document),s=r.removedTargetIds||[];t=new hh([],s,i,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new SM(i,s),a=r.targetId;t=new gR(a,o)}}return t}function uu(n,e){let t;if(e instanceof pa)t={update:VI(n,e.key,e.value)};else if(e instanceof ma)t={delete:lu(n,e.key)};else if(e instanceof br)t={update:VI(n,e.key,e.data),updateMask:UM(e.fieldMask)};else{if(!(e instanceof Q_))return K();t={verify:lu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const a=o.transform;if(a instanceof Wo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Ss)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof As)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ko)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:NM(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(n,e.precondition)),t}function lg(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Me.updateTime(Ze(s.updateTime)):s.exists!==void 0?Me.exists(s.exists):Me.none()}(e.currentDocument):Me.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,a){let l=null;if("setToServerValue"in a)Q(a.setToServerValue==="REQUEST_TIME"),l=new Wo;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];l=new Ss(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];l=new As(h)}else"increment"in a?l=new Ko(o,a.increment):K();const c=De.fromServerFormat(a.fieldPath);return new Du(c,l)}(n,i)):[];if(e.update){e.update.name;const i=Wn(n,e.update.name),s=new vt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const c=l.fieldPaths||[];return new Gt(c.map(h=>De.fromServerFormat(h)))}(e.updateMask);return new br(i,s,o,t,r)}return new pa(i,s,t,r)}if(e.delete){const i=Wn(n,e.delete);return new ma(i,t)}if(e.verify){const i=Wn(n,e.verify);return new Q_(i,t)}return K()}function VM(n,e){return n&&n.length>0?(Q(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Ze(i.updateTime):Ze(s);return o.isEqual(J.min())&&(o=Ze(s)),new EM(o,i.transformResults||[])}(t,e))):[]}function SR(n,e){return{documents:[wR(n,e.path)]}}function rf(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=wR(n,i);const s=function(c){if(c.length!==0)return kR(ve.create(c,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:Hr(p.field),direction:LM(p.dir)}}(h))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=sg(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:t,parent:i}}function AR(n,e,t,r){const{_t:i,parent:s}=rf(n,e),o={},a=[];let l=0;return t.forEach(c=>{const h=r?c.alias:"aggregate_"+l++;o[h]=c.alias,c.aggregateType==="count"?a.push({alias:h,count:{}}):c.aggregateType==="avg"?a.push({alias:h,avg:{field:Hr(c.fieldPath)}}):c.aggregateType==="sum"&&a.push({alias:h,sum:{field:Hr(c.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function CR(n){let e=ER(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Q(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=function(d){const p=RR(d);return p instanceof ve&&G_(p)?p.getFilters():[p]}(t.where));let o=[];t.orderBy&&(o=function(d){return d.map(p=>function(I){return new au(no(I.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(p))}(t.orderBy));let a=null;t.limit&&(a=function(d){let p;return p=typeof d=="object"?d.value:d,Pu(p)?null:p}(t.limit));let l=null;t.startAt&&(l=function(d){const p=!!d.before,g=d.values||[];return new Si(g,p)}(t.startAt));let c=null;return t.endAt&&(c=function(d){const p=!d.before,g=d.values||[];return new Si(g,p)}(t.endAt)),QC(e,i,o,s,a,"F",l,c)}function OM(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function RR(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=no(t.unaryFilter.field);return de.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=no(t.unaryFilter.field);return de.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=no(t.unaryFilter.field);return de.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=no(t.unaryFilter.field);return de.create(o,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return de.create(no(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ve.create(t.compositeFilter.filters.map(r=>RR(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function LM(n){return RM[n]}function MM(n){return kM[n]}function FM(n){return PM[n]}function Hr(n){return{fieldPath:n.canonicalString()}}function no(n){return De.fromServerFormat(n.fieldPath)}function kR(n){return n instanceof de?function(t){if(t.op==="=="){if(_I(t.value))return{unaryFilter:{field:Hr(t.field),op:"IS_NAN"}};if(gI(t.value))return{unaryFilter:{field:Hr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(_I(t.value))return{unaryFilter:{field:Hr(t.field),op:"IS_NOT_NAN"}};if(gI(t.value))return{unaryFilter:{field:Hr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Hr(t.field),op:MM(t.op),value:t.value}}}(n):n instanceof ve?function(t){const r=t.getFilters().map(i=>kR(i));return r.length===1?r[0]:{compositeFilter:{op:FM(t.op),filters:r}}}(n):K()}function UM(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function PR(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(e,t,r,i,s=J.min(),o=J.min(),a=Ge.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new pr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new pr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new pr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new pr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xR{constructor(e){this.ct=e}}function jM(n,e){let t;if(e.document)t=TR(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=W.fromSegments(e.noDocument.path),i=Rs(e.noDocument.readTime);t=be.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return K();{const r=W.fromSegments(e.unknownDocument.path),i=Rs(e.unknownDocument.version);t=be.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new Fe(i[0],i[1]);return J.fromTimestamp(s)}(e.readTime)),t}function OI(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Zh(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:lu(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Ho(s,o.version.toTimestamp()),createTime:Ho(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Cs(e.version)};else{if(!e.isUnknownDocument())return K();r.unknownDocument={path:t.path.toArray(),version:Cs(e.version)}}return r}function Zh(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Cs(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Rs(n){const e=new Fe(n.seconds,n.nanoseconds);return J.fromTimestamp(e)}function ns(n,e){const t=(e.baseMutations||[]).map(s=>lg(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>lg(n.ct,s)),i=Fe.fromMillis(e.localWriteTimeMs);return new Y_(e.batchId,i,t,r)}function fl(n){const e=Rs(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Rs(n.lastLimboFreeSnapshotVersion):J.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return Q(s.documents.length===1),bt(fa(ER(s.documents[0])))}(n.query):function(s){return bt(CR(s))}(n.query),new pr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ge.fromBase64String(n.resumeToken))}function NR(n,e){const t=Cs(e.snapshotVersion),r=Cs(e.lastLimboFreeSnapshotVersion);let i;i=Qh(e.target)?SR(n.ct,e.target):rf(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ts(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function ty(n){const e=CR({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Jh(e,e.limit,"L"):e}function Dp(n,e){return new X_(e.largestBatchId,lg(n.ct,e.overlayMutation))}function LI(n,e){const t=e.path.lastSegment();return[n,Nt(e.path.popLast()),t]}function MI(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Cs(r.readTime),documentKey:Nt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BM{getBundleMetadata(e,t){return FI(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Rs(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return FI(e).put(function(i){return{bundleId:i.id,createTime:Cs(Ze(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return UI(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:ty(s.bundledQuery),readTime:Rs(s.readTime)}}(r)})}saveNamedQuery(e,t){return UI(e).put(function(i){return{name:i.name,readTime:Cs(Ze(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function FI(n){return at(n,"bundles")}function UI(n){return at(n,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new sf(e,r)}getOverlay(e,t){return Qa(e).get(LI(this.userId,t)).next(r=>r?Dp(this.serializer,r):null)}getOverlays(e,t){const r=Bn();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const a=new X_(t,o);i.push(this.ht(e,a))}),b.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(Nt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Qa(e).j("collectionPathOverlayIndex",a))}),b.waitFor(s)}getOverlaysForCollection(e,t,r){const i=Bn(),s=Nt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Qa(e).U("collectionPathOverlayIndex",o).next(a=>{for(const l of a){const c=Dp(this.serializer,l);i.set(c.getKey(),c)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=Bn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Qa(e).J({index:"collectionGroupOverlayIndex",range:a},(l,c,h)=>{const d=Dp(this.serializer,c);s.size()<i||d.largestBatchId===o?(s.set(d.getKey(),d),o=d.largestBatchId):h.done()}).next(()=>s)}ht(e,t){return Qa(e).put(function(i,s,o){const[a,l,c]=LI(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:c,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:uu(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Qa(n){return at(n,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zM{Pt(e){return at(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ge.fromUint8Array(r):Ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(Oe(e.integerValue));else if("doubleValue"in e){const r=Oe(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),ru(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=Ar(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Cr(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?UC(e)?this.dt(t,Number.MAX_SAFE_INTEGER):ef(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):K()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(Oe(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),W.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}rs.vt=new rs;function $M(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function jI(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=$M(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class qM{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=jI(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=jI(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class GM{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class WM{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Ya{constructor(){this.jt=new qM,this.Ht=new GM(this.jt),this.Jt=new WM(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new is(this.indexId,this.documentKey,this.arrayValue,r)}}function Ur(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=BI(n.arrayValue,e.arrayValue),t!==0?t:(t=BI(n.directionalValue,e.directionalValue),t!==0?t:W.comparator(n.documentKey,e.documentKey)))}function BI(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zI{constructor(e){this.Xt=new Ee((t,r)=>De.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(Q(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Ym(e);if(t!==void 0&&!this.sn(t))return!1;const r=Zi(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const l=r[s];if(!this.on(a,l)||!this._n(this.en[o++],l))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Ee(De.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new ms(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new ms(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new ms(r.field,r.dir==="asc"?0:1)));return new zo(zo.UNKNOWN_ID,this.collectionId,t,$o.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bR(n){var e,t;if(Q(n instanceof de||n instanceof ve),n instanceof de){if(n instanceof HC){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>de.create(n.field,"==",s)))||[];return ve.create(i,"or")}return n}const r=n.filters.map(i=>bR(i));return ve.create(r,n.op)}function KM(n){if(n.getFilters().length===0)return[];const e=hg(bR(n));return Q(DR(e)),ug(e)||cg(e)?[e]:e.getFilters()}function ug(n){return n instanceof de}function cg(n){return n instanceof ve&&G_(n)}function DR(n){return ug(n)||cg(n)||function(t){if(t instanceof ve&&tg(t)){for(const r of t.getFilters())if(!ug(r)&&!cg(r))return!1;return!0}return!1}(n)}function hg(n){if(Q(n instanceof de||n instanceof ve),n instanceof de)return n;if(n.filters.length===1)return hg(n.filters[0]);const e=n.filters.map(r=>hg(r));let t=ve.create(e,n.op);return t=ed(t),DR(t)?t:(Q(t instanceof ve),Q(Go(t)),Q(t.filters.length>1),t.filters.reduce((r,i)=>ny(r,i)))}function ny(n,e){let t;return Q(n instanceof de||n instanceof ve),Q(e instanceof de||e instanceof ve),t=n instanceof de?e instanceof de?function(i,s){return ve.create([i,s],"and")}(n,e):$I(n,e):e instanceof de?$I(e,n):function(i,s){if(Q(i.filters.length>0&&s.filters.length>0),Go(i)&&Go(s))return GC(i,s.getFilters());const o=tg(i)?i:s,a=tg(i)?s:i,l=o.filters.map(c=>ny(c,a));return ve.create(l,"or")}(n,e),ed(t)}function $I(n,e){if(Go(e))return GC(e,n.getFilters());{const t=e.filters.map(r=>ny(n,r));return ve.create(t,"or")}}function ed(n){if(Q(n instanceof de||n instanceof ve),n instanceof de)return n;const e=n.getFilters();if(e.length===1)return ed(e[0]);if($C(n))return n;const t=e.map(i=>ed(i)),r=[];return t.forEach(i=>{i instanceof de?r.push(i):i instanceof ve&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ve.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HM{constructor(){this.un=new ry}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(on.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(on.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class ry{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ee(he.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ee(he.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc=new Uint8Array(0);class QM{constructor(e,t){this.databaseId=t,this.cn=new ry,this.ln=new Nr(r=>Ts(r),(r,i)=>xu(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:r,parent:Nt(i)};return qI(e).put(s)}return b.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[AC(t),""],!1,!0);return qI(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(jn(o.parent))}return r})}addFieldIndex(e,t){const r=Ja(e),i=function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Js(e);return s.next(a=>{o.put(MI(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=Ja(e),i=Js(e),s=Ys(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Ja(e),r=Ys(e),i=Js(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return b.forEach(this.hn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new zI(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=Ys(e);let i=!0;const s=new Map;return b.forEach(this.hn(t),o=>this.Pn(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=re();const a=[];return b.forEach(s,(l,c)=>{j("IndexedDbIndexManager",`Using index ${function(A){return`id=${A.indexId}|cg=${A.collectionGroup}|f=${A.fields.map(V=>`${V.fieldPath}:${V.kind}`).join(",")}`}(l)} to execute ${Ts(t)}`);const h=function(A,V){const F=Ym(V);if(F===void 0)return null;for(const M of Yh(A,F.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(c,l),d=function(A,V){const F=new Map;for(const M of Zi(V))for(const S of Yh(A,M.fieldPath))switch(S.op){case"==":case"in":F.set(M.fieldPath.canonicalString(),S.value);break;case"not-in":case"!=":return F.set(M.fieldPath.canonicalString(),S.value),Array.from(F.values())}return null}(c,l),p=function(A,V){const F=[];let M=!0;for(const S of Zi(V)){const v=S.kind===0?II(A,S.fieldPath,A.startAt):TI(A,S.fieldPath,A.startAt);F.push(v.value),M&&(M=v.inclusive)}return new Si(F,M)}(c,l),g=function(A,V){const F=[];let M=!0;for(const S of Zi(V)){const v=S.kind===0?TI(A,S.fieldPath,A.endAt):II(A,S.fieldPath,A.endAt);F.push(v.value),M&&(M=v.inclusive)}return new Si(F,M)}(c,l),I=this.In(l,c,p),P=this.In(l,c,g),x=this.Tn(l,c,d),y=this.En(l.indexId,h,I,p.inclusive,P,g.inclusive,x);return b.forEach(y,E=>r.G(E,t.limit).next(A=>{A.forEach(V=>{const F=W.fromSegments(V.documentKey);o.has(F)||(o=o.add(F),a.push(F))})}))}).next(()=>a)}return b.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=KM(ve.create(e.filters,"and")).map(r=>rg(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),c=l/(t!=null?t.length:1),h=[];for(let d=0;d<l;++d){const p=t?this.dn(t[d/c]):Oc,g=this.An(e,p,r[d%c],i),I=this.Rn(e,p,s[d%c],o),P=a.map(x=>this.An(e,p,x,!0));h.push(...this.createRange(g,I,P))}return h}An(e,t,r,i){const s=new is(e,W.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new is(e,W.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new zI(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,t){let r=2;const i=this.hn(t);return b.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let c=new Ee(De.comparator),h=!1;for(const d of l.filters)for(const p of d.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?h=!0:c=c.add(p.field));for(const d of l.orderBy)d.field.isKeyField()||(c=c.add(d.field));return c.size+(h?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}Vn(e,t){const r=new Ya;for(const i of Zi(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);rs.vt.It(s,o)}return r.zt()}dn(e){const t=new Ya;return rs.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new Ya;return rs.vt.It(Is(this.databaseId,t),r.Yt(function(s){const o=Zi(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new Ya);let s=0;for(const o of Zi(e)){const a=r[s++];for(const l of i)if(this.fn(t,o.fieldPath)&&ou(a))i=this.gn(i,o,a);else{const c=l.Yt(o.kind);rs.vt.It(a,c)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const l=new Ya;l.seed(a.zt()),rs.vt.It(o,l.Yt(t.kind)),s.push(l)}return s}fn(e,t){return!!e.filters.find(r=>r instanceof de&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Ja(e),i=Js(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{const o=[];return b.forEach(s,a=>i.get([a.indexId,this.uid]).next(l=>{o.push(function(h,d){const p=d?new $o(d.sequenceNumber,new on(Rs(d.readTime),new W(jn(d.documentKey)),d.largestBatchId)):$o.empty(),g=h.fields.map(([I,P])=>new ms(De.fromServerFormat(I),P));return new zo(h.indexId,h.collectionGroup,g,p)}(a,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:te(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=Ja(e),s=Js(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(a=>b.forEach(a,l=>s.put(MI(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return b.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),b.forEach(a,l=>this.wn(e,i,l).next(c=>{const h=this.Sn(s,l);return c.isEqual(h)?b.resolve():this.bn(e,s,l,c,h)}))))})}Dn(e,t,r,i){return Ys(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return Ys(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=Ys(e);let s=new Ee(Ur);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},(o,a)=>{s=s.add(new is(r.indexId,t,a.arrayValue,a.directionalValue))}).next(()=>s)}Sn(e,t){let r=new Ee(Ur);const i=this.Vn(t,e);if(i==null)return r;const s=Ym(t);if(s!=null){const o=e.data.field(s.fieldPath);if(ou(o))for(const a of o.arrayValue.values||[])r=r.add(new is(t.indexId,e.key,this.dn(a),i))}else r=r.add(new is(t.indexId,e.key,Oc,i));return r}bn(e,t,r,i,s){j("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,c,h,d,p){const g=l.getIterator(),I=c.getIterator();let P=Qs(g),x=Qs(I);for(;P||x;){let y=!1,E=!1;if(P&&x){const A=h(P,x);A<0?E=!0:A>0&&(y=!0)}else P!=null?E=!0:y=!0;y?(d(x),x=Qs(I)):E?(p(P),P=Qs(g)):(P=Qs(g),x=Qs(I))}}(i,s,Ur,a=>{o.push(this.Dn(e,t,r,a))},a=>{o.push(this.vn(e,t,r,a))}),b.waitFor(o)}yn(e){let t=1;return Js(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,a)=>Ur(o,a)).filter((o,a,l)=>!a||Ur(o,l[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=Ur(o,e),l=Ur(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&l<0)i.push(o),i.push(o.Zt());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Oc,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Oc,[]];s.push(IDBKeyRange.bound(a,l))}return s}Cn(e,t){return Ur(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(GI)}getMinOffset(e,t){return b.mapArray(this.hn(t),r=>this.Pn(e,r).next(i=>i||K())).next(GI)}}function qI(n){return at(n,"collectionParents")}function Ys(n){return at(n,"indexEntries")}function Ja(n){return at(n,"indexConfiguration")}function Js(n){return at(n,"indexState")}function GI(n){Q(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;z_(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new on(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class kt{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new kt(e,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VR(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const l=r.J({range:o},(h,d,p)=>(a++,p.delete()));s.push(l.next(()=>{Q(a===1)}));const c=[];for(const h of t.mutations){const d=bC(e,h.key.path,t.batchId);s.push(i.delete(d)),c.push(h.key)}return b.waitFor(s).next(()=>c)}function td(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw K();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(41943040,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);class of{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){Q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new of(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return jr(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=ro(e),o=jr(e);return o.add({}).next(a=>{Q(typeof a=="number");const l=new Y_(a,t,r,i),c=function(g,I,P){const x=P.baseMutations.map(E=>uu(g.ct,E)),y=P.mutations.map(E=>uu(g.ct,E));return{userId:I,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:x,mutations:y}}(this.serializer,this.userId,l),h=[];let d=new Ee((p,g)=>te(p.canonicalString(),g.canonicalString()));for(const p of i){const g=bC(this.userId,p.key.path,a);d=d.add(p.key.path.popLast()),h.push(o.put(c)),h.push(s.put(g,LL))}return d.forEach(p=>{h.push(this.indexManager.addToCollectionParentIndex(e,p))}),e.addOnCommittedListener(()=>{this.Fn[a]=l.keys()}),b.waitFor(h).next(()=>l)})}lookupMutationBatch(e,t){return jr(e).get(t).next(r=>r?(Q(r.userId===this.userId),ns(this.serializer,r)):null)}Mn(e,t){return this.Fn[t]?b.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return jr(e).J({index:"userMutationsIndex",range:i},(o,a,l)=>{a.userId===this.userId&&(Q(a.batchId>=r),s=ns(this.serializer,a)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return jr(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return jr(e).U("userMutationsIndex",t).next(r=>r.map(i=>ns(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=oh(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return ro(e).J({range:i},(o,a,l)=>{const[c,h,d]=o,p=jn(h);if(c===this.userId&&t.path.isEqual(p))return jr(e).get(d).next(g=>{if(!g)throw K();Q(g.userId===this.userId),s.push(ns(this.serializer,g))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(te);const i=[];return t.forEach(s=>{const o=oh(this.userId,s.path),a=IDBKeyRange.lowerBound(o),l=ro(e).J({range:a},(c,h,d)=>{const[p,g,I]=c,P=jn(g);p===this.userId&&s.path.isEqual(P)?r=r.add(I):d.done()});i.push(l)}),b.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=oh(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Ee(te);return ro(e).J({range:o},(l,c,h)=>{const[d,p,g]=l,I=jn(p);d===this.userId&&r.isPrefixOf(I)?I.length===i&&(a=a.add(g)):h.done()}).next(()=>this.xn(e,a))}xn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(jr(e).get(s).next(o=>{if(o===null)throw K();Q(o.userId===this.userId),r.push(ns(this.serializer,o))}))}),b.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return VR(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),b.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ro(e).J({range:r},(s,o,a)=>{if(s[0]===this.userId){const l=jn(s[1]);i.push(l)}else a.done()}).next(()=>{Q(i.length===0)})})}containsKey(e,t){return OR(e,this.userId,t)}Nn(e){return LR(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function OR(n,e,t){const r=oh(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return ro(n).J({range:s,H:!0},(a,l,c)=>{const[h,d,p]=a;h===e&&d===i&&(o=!0),c.done()}).next(()=>o)}function jr(n){return at(n,"mutations")}function ro(n){return at(n,"documentMutations")}function LR(n){return at(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new ks(0)}static kn(){return new ks(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YM{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const r=new ks(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>J.fromTimestamp(new Fe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Xs(e).delete(t.targetId)).next(()=>this.qn(e)).next(r=>(Q(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return Xs(e).J((o,a)=>{const l=fl(a);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>b.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Xs(e).J((r,i)=>{const s=fl(i);t(s)})}qn(e){return KI(e).get("targetGlobalKey").next(t=>(Q(t!==null),t))}Qn(e,t){return KI(e).put("targetGlobalKey",t)}Kn(e,t){return Xs(e).put(NR(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Ts(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return Xs(e).J({range:i,index:"queryTargetsIndex"},(o,a,l)=>{const c=fl(a);xu(t,c.target)&&(s=c,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=Qr(e);return t.forEach(o=>{const a=Nt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),b.waitFor(i)}removeMatchingKeys(e,t,r){const i=Qr(e);return b.forEach(t,s=>{const o=Nt(s.path);return b.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=Qr(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Qr(e);let s=re();return i.J({range:r,H:!0},(o,a,l)=>{const c=jn(o[1]),h=new W(c);s=s.add(h)}).next(()=>s)}containsKey(e,t){const r=Nt(t.path),i=IDBKeyRange.bound([r],[AC(r)],!1,!0);let s=0;return Qr(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,a],l,c)=>{o!==0&&(s++,c.done())}).next(()=>s>0)}ot(e,t){return Xs(e).get(t).next(r=>r?fl(r):null)}}function Xs(n){return at(n,"targets")}function KI(n){return at(n,"targetGlobal")}function Qr(n){return at(n,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HI([n,e],[t,r]){const i=te(n,t);return i===0?te(e,r):i}class JM{constructor(e){this.Un=e,this.buffer=new Ee(HI),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();HI(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class MR{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){j("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Ui(t)?j("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Fi(t)}await this.Hn(3e5)})}}class XM{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return b.resolve(qt.oe);const r=new JM(t);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(WI)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),WI):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,l,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),i=this.params.maximumSequenceNumbersToCollect):i=d,o=Date.now(),this.nthSequenceNumber(e,i))).next(d=>(r=d,a=Date.now(),this.removeTargets(e,r,t))).next(d=>(s=d,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(d=>(c=Date.now(),eo()<=ae.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(l-a)+`ms
	Removed ${d} documents in `+(c-l)+`ms
Total Duration: ${c-h}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:d})))}}function FR(n,e){return new XM(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZM{constructor(e,t){this.db=e,this.garbageCollector=FR(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(r,i)=>t(i))}addReference(e,t,r){return Lc(e,r)}removeReference(e,t,r){return Lc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Lc(e,t)}nr(e,t){return function(i,s){let o=!1;return LR(i).Y(a=>OR(i,a,s).next(l=>(l&&(o=!0),b.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,a)=>{if(a<=t){const l=this.nr(e,o).next(c=>{if(!c)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,J.min()),Qr(e).delete(function(d){return[0,Nt(d.path)]}(o))))});i.push(l)}}).next(()=>b.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Lc(e,t)}tr(e,t){const r=Qr(e);let i,s=qt.oe;return r.J({index:"documentTargetsIndex"},([o,a],{path:l,sequenceNumber:c})=>{o===0?(s!==qt.oe&&t(new W(jn(i)),s),s=c,i=l):s=qt.oe}).next(()=>{s!==qt.oe&&t(new W(jn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Lc(n,e){return Qr(n).put(function(r,i){return{targetId:0,path:Nt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UR{constructor(){this.changes=new Nr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eF{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Qi(e).put(r)}removeEntry(e,t,r){return Qi(e).delete(function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],Zh(o),a[a.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.rr(e,r)))}getEntry(e,t){let r=be.newInvalidDocument(t);return Qi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Xa(t))},(i,s)=>{r=this.ir(t,s)}).next(()=>r)}sr(e,t){let r={size:0,document:be.newInvalidDocument(t)};return Qi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Xa(t))},(i,s)=>{r={document:this.ir(t,s),size:td(s)}}).next(()=>r)}getEntries(e,t){let r=Wt();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,t){let r=Wt(),i=new qe(W.comparator);return this._r(e,t,(s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,td(o))}).next(()=>({documents:r,ur:i}))}_r(e,t,r){if(t.isEmpty())return b.resolve();let i=new Ee(JI);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(Xa(i.first()),Xa(i.last())),o=i.getIterator();let a=o.getNext();return Qi(e).J({index:"documentKeyIndex",range:s},(l,c,h)=>{const d=W.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;a&&JI(a,d)<0;)r(a,null),a=o.getNext();a&&a.isEqual(d)&&(r(a,c),a=o.hasNext()?o.getNext():null),a?h.$(Xa(a)):h.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),Zh(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Qi(e).U(IDBKeyRange.bound(a,l,!0)).next(c=>{s==null||s.incrementDocumentReadCount(c.length);let h=Wt();for(const d of c){const p=this.ir(W.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);p.isFoundDocument()&&(bu(t,p)||i.has(p.key))&&(h=h.insert(p.key,p))}return h})}getAllFromCollectionGroup(e,t,r,i){let s=Wt();const o=YI(t,r),a=YI(t,on.max());return Qi(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(l,c,h)=>{const d=this.ir(W.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);s=s.insert(d.key,d),s.size===i&&h.done()}).next(()=>s)}newChangeBuffer(e){return new tF(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return QI(e).get("remoteDocumentGlobalKey").next(t=>(Q(!!t),t))}rr(e,t){return QI(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=jM(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(J.min())))return r}return be.newInvalidDocument(e)}}function jR(n){return new eF(n)}class tF extends UR{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Nr(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new Ee((s,o)=>te(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const l=OI(this.cr.serializer,o);i=i.add(s.path.popLast());const c=td(l);r+=c-a.size,t.push(this.cr.addEntry(e,s,l))}else if(r-=a.size,this.trackRemovals){const l=OI(this.cr.serializer,o.convertToNoDocument(J.min()));t.push(this.cr.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,r)),b.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function QI(n){return at(n,"remoteDocumentGlobal")}function Qi(n){return at(n,"remoteDocumentsV14")}function Xa(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function YI(n,e){const t=e.documentKey.path.toArray();return[n,Zh(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function JI(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=te(t[s],r[s]),i)return i;return i=te(t.length,r.length),i||(i=te(t[t.length-2],r[r.length-2]),i||te(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nF{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BR{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Rl(r.mutation,i,Gt.empty(),Fe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const i=Bn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=hl();return s.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Bn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=Wt();const o=Cl(),a=function(){return Cl()}();return t.forEach((l,c)=>{const h=r.get(c.key);i.has(c.key)&&(h===void 0||h.mutation instanceof br)?s=s.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),Rl(h.mutation,c,h.mutation.getFieldMask(),Fe.now())):o.set(c.key,Gt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((c,h)=>o.set(c,h)),t.forEach((c,h)=>{var d;return a.set(c,new nF(h,(d=o.get(c))!==null&&d!==void 0?d:null))}),a))}recalculateAndSaveOverlays(e,t){const r=Cl();let i=new qe((o,a)=>o-a),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=t.get(l);if(c===null)return;let h=r.get(l)||Gt.empty();h=a.applyToLocalView(c,h),r.set(l,h);const d=(i.get(a.batchId)||re()).add(l);i=i.insert(a.batchId,d)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,h=l.value,d=rR();h.forEach(p=>{if(!s.has(p)){const g=cR(t.get(p),r.get(p));g!==null&&d.set(p,g),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,d))}return b.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return W.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):W_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):b.resolve(Bn());let a=-1,l=s;return o.next(c=>b.forEach(c,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),s.get(h)?b.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{l=l.insert(h,p)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,l,c,re())).next(h=>({batchId:a,changes:nR(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new W(t)).next(r=>{let i=hl();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=hl();return this.indexManager.getCollectionParents(e,s).next(a=>b.forEach(a,l=>{const c=function(d,p){return new xr(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,c)=>{const h=c.getKey();o.get(h)===null&&(o=o.insert(h,be.newInvalidDocument(h)))});let a=hl();return o.forEach((l,c)=>{const h=s.get(l);h!==void 0&&Rl(h.mutation,c,Gt.empty(),Fe.now()),bu(t,c)&&(a=a.insert(l,c))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rF{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ze(i.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:ty(i.bundledQuery),readTime:Ze(i.readTime)}}(t)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iF{constructor(){this.overlays=new qe(W.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Bn();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),b.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const i=Bn(),s=t.length+1,o=new W(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new qe((c,h)=>c-h);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>r){let h=s.get(c.largestBatchId);h===null&&(h=Bn(),s=s.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const a=Bn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,h)=>a.set(c,h)),!(a.size()>=i)););return b.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new X_(t,r));let s=this.Ir.get(t);s===void 0&&(s=re(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sF{constructor(){this.sessionToken=Ge.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(){this.Tr=new Ee(ut.Er),this.dr=new Ee(ut.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ut(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ut(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new W(new he([])),r=new ut(t,e),i=new ut(t,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new W(new he([])),r=new ut(t,e),i=new ut(t,e+1);let s=re();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new ut(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ut{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return W.comparator(e.key,t.key)||te(e.wr,t.wr)}static Ar(e,t){return te(e.wr,t.wr)||W.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oF{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ee(ut.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Y_(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new ut(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ut(t,0),i=new ut(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const a=this.Dr(o.wr);s.push(a)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(te);return t.forEach(i=>{const s=new ut(i,0),o=new ut(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],a=>{r=r.add(a.wr)})}),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;W.isDocumentKey(s)||(s=s.child(""));const o=new ut(new W(s),0);let a=new Ee(te);return this.br.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(a=a.add(l.wr)),!0)},o),b.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(t.mutations,i=>{const s=new ut(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ut(t,0),i=this.br.firstAfterOrEqual(r);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aF{constructor(e){this.Mr=e,this.docs=function(){return new qe(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():be.newInvalidDocument(t))}getEntries(e,t){let r=Wt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():be.newInvalidDocument(i))}),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Wt();const o=t.path,a=new W(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:h}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||z_(RC(h),r)<=0||(i.has(h.key)||bu(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,r,i){K()}Or(e,t){return b.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new lF(this)}getSize(e){return b.resolve(this.size)}}class lF extends UR{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uF{constructor(e){this.persistence=e,this.Nr=new Nr(t=>Ts(t),xu),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new iy,this.targetCount=0,this.kr=ks.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new ks(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e,t){this.qr={},this.overlays={},this.Qr=new qt(0),this.Kr=!1,this.Kr=!0,this.$r=new sF,this.referenceDelegate=e(this),this.Ur=new uF(this),this.indexManager=new HM,this.remoteDocumentCache=function(i){return new aF(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new xR(t),this.Gr=new rF(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new iF,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new oF(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const i=new cF(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return b.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class cF extends PC{constructor(e){super(),this.currentSequenceNumber=e}}class af{constructor(e){this.persistence=e,this.Jr=new iy,this.Yr=null}static Zr(e){return new af(e)}get Xr(){if(this.Yr)return this.Yr;throw K()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,r=>{const i=W.fromPath(r);return this.ei(e,i).next(s=>{s||t.removeEntry(i,J.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class nd{constructor(e,t){this.persistence=e,this.ti=new Nr(r=>Nt(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=FR(this,t)}static Zr(e,t){return new nd(e,t)}zr(){}jr(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}Zn(e,t){return b.forEach(this.ti,(r,i)=>this.nr(e,r,i).next(s=>s?b.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,o=>this.nr(e,o,t).next(a=>{a||(r++,s.removeEntry(o,J.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),b.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=lh(e.data.value)),t}nr(e,t,r){return b.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return b.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hF{constructor(e){this.serializer=e}O(e,t,r,i){const s=new Jd("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",hI,{unique:!0}),l.createObjectStore("documentMutations")}(e),XI(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=b.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),XI(e)),o=o.next(()=>function(l){const c=l.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:J.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",h)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,c){return c.store("mutations").U().next(h=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",hI,{unique:!0});const d=c.store("mutations"),p=h.map(g=>d.put(g));return b.waitFor(p)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const c=l.createObjectStore("documentOverlays",{keyPath:HL});c.createIndex("collectionPathOverlayIndex",QL,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",YL,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const c=l.createObjectStore("remoteDocumentsV14",{keyPath:ML});c.createIndex("documentKeyIndex",FL),c.createIndex("collectionGroupIndex",UL)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:qL}).createIndex("sequenceNumberIndex",GL,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:WL}).createIndex("documentKeyIndex",KL,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=td(i)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>b.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(a=>b.forEach(a,l=>{Q(l.userId===s.userId);const c=ns(this.serializer,l);return VR(e,s.userId,c).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,a)=>{const l=new he(o),c=function(d){return[0,Nt(d)]}(l);s.push(t.get(c).next(h=>h?b.resolve():(d=>t.put({targetId:0,path:Nt(d),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>b.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:$L});const r=t.store("collectionParents"),i=new ry,s=o=>{if(i.add(o)){const a=o.lastSegment(),l=o.popLast();return r.put({collectionId:a,parent:Nt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,a)=>{const l=new he(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,a,l],c)=>{const h=jn(a);return s(h.popLast())}))}oi(e){const t=e.store("targets");return t.J((r,i)=>{const s=fl(i),o=NR(this.serializer,s);return t.put(o)})}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{const a=t.store("remoteDocumentsV14"),l=function(d){return d.document?new W(he.fromString(d.document.name).popFirst(5)):d.noDocument?W.fromSegments(d.noDocument.path):d.unknownDocument?W.fromSegments(d.unknownDocument.path):K()}(o).path.toArray(),c={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(c))}).next(()=>b.waitFor(i))}ai(e,t){const r=t.store("mutations"),i=jR(this.serializer),s=new sy(af.Zr,this.serializer.ct);return r.U().next(o=>{const a=new Map;return o.forEach(l=>{var c;let h=(c=a.get(l.userId))!==null&&c!==void 0?c:re();ns(this.serializer,l).keys().forEach(d=>h=h.add(d)),a.set(l.userId,h)}),b.forEach(a,(l,c)=>{const h=new ht(c),d=sf.lt(this.serializer,h),p=s.getIndexManager(h),g=of.lt(h,this.serializer,p,s.referenceDelegate);return new BR(i,g,d,p).recalculateAndSaveOverlaysForDocumentKeys(new Jm(t,qt.oe),l).next()})})}}function XI(n){n.createObjectStore("targetDocuments",{keyPath:BL}).createIndex("documentTargetsIndex",zL,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",jL,{unique:!0}),n.createObjectStore("targetGlobal")}const Vp="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class oy{constructor(e,t,r,i,s,o,a,l,c,h,d=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=c,this.li=h,this.hi=d,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=p=>Promise.resolve(),!oy.D())throw new U(O.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new ZM(this,i),this.Ai=t+"main",this.serializer=new xR(l),this.Ri=new Gn(this.Ai,this.hi,new hF(this.serializer)),this.$r=new zM,this.Ur=new YM(this.referenceDelegate,this.serializer),this.remoteDocumentCache=jR(this.serializer),this.Gr=new BM,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&Xe("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(O.FAILED_PRECONDITION,Vp);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new qt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Mc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Ui(e))return j("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return j("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Za(e).get("owner").next(t=>b.resolve(this.vi(t)))}Ci(e){return Mc(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=at(t,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return b.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?b.resolve(!0):Za(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new U(O.FAILED_PRECONDITION,Vp);return!1}}return!(!this.networkEnabled||!this.inForeground)||Mc(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&j("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new Jm(e,qt.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Mc(e).U().next(t=>this.xi(t,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return of.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new QM(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return sf.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){j("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?ZL:l===16?XL:l===15?q_:l===14?OC:l===13?VC:l===12?JL:l===11?DC:void K()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,a=>(o=new Jm(a,this.Qr?this.Qr.next():qt.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw Xe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new U(O.FAILED_PRECONDITION,kC);return r(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>r(o)))).then(a=>(o.raiseOnCommittedEvent(),a))}Ki(e){return Za(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(O.FAILED_PRECONDITION,Vp)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Za(e).put("owner",t)}static D(){return Gn.D()}bi(e){const t=Za(e);return t.get("owner").next(r=>this.vi(r)?(j("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):b.resolve())}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Xe(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;xA()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return j("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Xe("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Xe("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Za(n){return at(n,"owner")}function Mc(n){return at(n,"clientMetadata")}function ay(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=re(),i=re();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ly(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dF{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zR{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return xA()?8:xC(ot())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new dF;return this.Xi(e,t,o).next(a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)})}).next(()=>s.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(eo()<=ae.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",to(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(eo()<=ae.DEBUG&&j("QueryEngine","Query:",to(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(eo()<=ae.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",to(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):b.resolve())}Yi(e,t){if(SI(t))return b.resolve(null);let r=bt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Jh(t,null,"F"),r=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.Ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(l=>{const c=this.ts(t,a);return this.ns(t,c,o,l.readTime)?this.Yi(e,Jh(t,null,"F")):this.rs(e,c,t,l)}))})))}Zi(e,t,r,i){return SI(t)||i.isEqual(J.min())?b.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?b.resolve(null):(eo()<=ae.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),to(t)),this.rs(e,o,t,CC(i,-1)).next(a=>a))})}ts(e,t){let r=new Ee(eR(e));return t.forEach((i,s)=>{bu(e,s)&&(r=r.add(s))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return eo()<=ae.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",to(t)),this.Ji.getDocumentsMatchingQuery(e,t,on.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fF{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new qe(te),this._s=new Nr(s=>Ts(s),xu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new BR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function $R(n,e,t,r){return new fF(n,e,t,r)}async function qR(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let l=re();for(const c of i){o.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}for(const c of s){a.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(r,l).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:a}))})})}function pF(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(a,l,c,h){const d=c.batch,p=d.keys();let g=b.resolve();return p.forEach(I=>{g=g.next(()=>h.getEntry(l,I)).next(P=>{const x=c.docVersions.get(I);Q(x!==null),P.version.compareTo(x)<0&&(d.applyToRemoteDocument(P,c),P.isValidDocument()&&(P.setReadTime(c.commitVersion),h.addEntry(P)))})}),g.next(()=>a.mutationQueue.removeMutationBatch(l,d))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let l=re();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(l=l.add(a.batch.mutations[c].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function GR(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function mF(n,e){const t=$(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach((h,d)=>{const p=i.get(d);if(!p)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,d).next(()=>t.Ur.addMatchingKeys(s,h.addedDocuments,d)));let g=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(d)!==null?g=g.withResumeToken(Ge.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),i=i.insert(d,g),function(P,x,y){return P.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:y.addedDocuments.size+y.modifiedDocuments.size+y.removedDocuments.size>0}(p,g,h)&&a.push(t.Ur.updateTargetData(s,g))});let l=Wt(),c=re();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))}),a.push(WR(s,o,e.documentUpdates).next(h=>{l=h.Ps,c=h.Is})),!r.isEqual(J.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next(d=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(h)}return b.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,c)).next(()=>l)}).then(s=>(t.os=i,s))}function WR(n,e,t){let r=re(),i=re();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Wt();return t.forEach((a,l)=>{const c=s.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(a)),l.isNoDocument()&&l.version.isEqual(J.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):j("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function gF(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Qo(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ur.getTargetData(r,e).next(s=>s?(i=s,b.resolve(i)):t.Ur.allocateTargetId(r).next(o=>(i=new pr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function Yo(n,e,t){const r=$(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Ui(o))throw o;j("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function rd(n,e,t){const r=$(n);let i=J.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,c,h){const d=$(l),p=d._s.get(h);return p!==void 0?b.resolve(d.os.get(p)):d.Ur.getTargetData(c,h)}(r,o,bt(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next(l=>{s=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:J.min(),t?s:re())).next(a=>(QR(r,ZC(e),a),{documents:a,Ts:s})))}function KR(n,e){const t=$(n),r=$(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function HR(n,e){const t=$(n),r=t.us.get(e)||J.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,CC(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(QR(t,e,i),i))}function QR(n,e,t){let r=n.us.get(e)||J.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.us.set(e,r)}async function _F(n,e,t,r){const i=$(n);let s=re(),o=Wt();for(const c of t){const h=e.Es(c.metadata.name);c.document&&(s=s.add(h));const d=e.ds(c);d.setReadTime(e.As(c.metadata.readTime)),o=o.insert(h,d)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),l=await Qo(i,function(h){return bt(fa(he.fromString(`__bundle__/docs/${h}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",c=>WR(c,a,o).next(h=>(a.apply(c),h)).next(h=>i.Ur.removeMatchingKeysForTargetId(c,l.targetId).next(()=>i.Ur.addMatchingKeys(c,s,l.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(c,h.Ps,h.Is)).next(()=>h.Ps)))}async function yF(n,e,t=re()){const r=await Qo(n,bt(ty(e.bundledQuery))),i=$(n);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=Ze(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(Ge.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next(()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,r.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function ZI(n,e){return`firestore_clients_${n}_${e}`}function eT(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Op(n,e){return`firestore_targets_${n}_${e}`}class id{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new U(i.error.code,i.error.message))),o?new id(e,t,i.state,s):(Xe("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class kl{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new U(r.error.code,r.error.message))),s?new kl(e,r.state,i):(Xe("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class sd{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=K_();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=NC(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new sd(e,s):(Xe("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class uy{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new uy(t.clientId,t.onlineState):(Xe("SharedClientState",`Failed to parse online state: ${e}`),null)}}class dg{constructor(){this.activeTargetIds=K_()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Lp{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new qe(te),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=ZI(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new dg),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(ZI(this.persistenceKey,r));if(i){const s=sd.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Op(this.persistenceKey,e));if(i){const s=kl.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Op(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return j("SharedClientState","READ",e,t),t}setItem(e,t){j("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){j("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(j("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void Xe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=function(s){let o=qt.oe;if(s!=null)try{const a=JSON.parse(s);Q(typeof a=="number"),o=a}catch(a){Xe("SharedClientState","Failed to read sequence number from WebStorage",a)}return o}(t.newValue);r!==qt.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new id(this.currentUser,e,t,r),s=eT(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=eT(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=Op(this.persistenceKey,e),s=new kl(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return sd.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return id.Rs(new ht(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return kl.Rs(i,t)}Ls(e){return uy.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);j("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||a.push(l)}),this.syncEngine.io(o,a).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=K_();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class YR{constructor(){this.so=new dg,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new dg,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vF{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){j("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){j("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fc=null;function Mp(){return Fc===null?Fc=function(){return 268435456+Math.round(2147483648*Math.random())}():Fc++,"0x"+Fc.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wF={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EF{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="WebChannelConnection";class IF extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=Mp(),l=this.xo(t,r.toUriEncodedString());j("RestConnection",`Sending RPC '${t}' ${a}:`,l,i);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,s,o),this.No(t,l,c,i).then(h=>(j("RestConnection",`Received RPC '${t}' ${a}: `,h),h),h=>{throw sn("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",l,"request:",i),h})}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+da}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,r){const i=wF[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=Mp();return new Promise((o,a)=>{const l=new _C;l.setWithCredentials(!0),l.listenOnce(yC.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case sh.NO_ERROR:const h=l.getResponseJson();j(Rt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case sh.TIMEOUT:j(Rt,`RPC '${e}' ${s} timed out`),a(new U(O.DEADLINE_EXCEEDED,"Request time out"));break;case sh.HTTP_ERROR:const d=l.getStatus();if(j(Rt,`RPC '${e}' ${s} failed with status:`,d,"response text:",l.getResponseText()),d>0){let p=l.getResponseJson();Array.isArray(p)&&(p=p[0]);const g=p==null?void 0:p.error;if(g&&g.status&&g.message){const I=function(x){const y=x.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(y)>=0?y:O.UNKNOWN}(g.status);a(new U(I,g.message))}else a(new U(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new U(O.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{j(Rt,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(i);j(Rt,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",c,r,15)})}Bo(e,t,r){const i=Mp(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=EC(),a=wC(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const h=s.join("");j(Rt,`Creating RPC '${e}' stream ${i}: ${h}`,l);const d=o.createWebChannel(h,l);let p=!1,g=!1;const I=new EF({Io:x=>{g?j(Rt,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(p||(j(Rt,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),j(Rt,`RPC '${e}' stream ${i} sending:`,x),d.send(x))},To:()=>d.close()}),P=(x,y,E)=>{x.listen(y,A=>{try{E(A)}catch(V){setTimeout(()=>{throw V},0)}})};return P(d,cl.EventType.OPEN,()=>{g||(j(Rt,`RPC '${e}' stream ${i} transport opened.`),I.yo())}),P(d,cl.EventType.CLOSE,()=>{g||(g=!0,j(Rt,`RPC '${e}' stream ${i} transport closed`),I.So())}),P(d,cl.EventType.ERROR,x=>{g||(g=!0,sn(Rt,`RPC '${e}' stream ${i} transport errored:`,x),I.So(new U(O.UNAVAILABLE,"The operation could not be completed")))}),P(d,cl.EventType.MESSAGE,x=>{var y;if(!g){const E=x.data[0];Q(!!E);const A=E,V=A.error||((y=A[0])===null||y===void 0?void 0:y.error);if(V){j(Rt,`RPC '${e}' stream ${i} received error:`,V);const F=V.status;let M=function(C){const k=et[C];if(k!==void 0)return pR(k)}(F),S=V.message;M===void 0&&(M=O.INTERNAL,S="Unknown error status: "+F+" with message "+V.message),g=!0,I.So(new U(M,S)),d.close()}else j(Rt,`RPC '${e}' stream ${i} received:`,E),I.bo(E)}}),P(a,vC.STAT_EVENT,x=>{x.stat===Qm.PROXY?j(Rt,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===Qm.NOPROXY&&j(Rt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{I.wo()},0),I}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JR(){return typeof window<"u"?window:null}function dh(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(n){return new xM(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&j("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XR{constructor(e,t,r,i,s,o,a,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new cy(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(Xe(t.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new U(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return j("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(j("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class TF extends XR{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=DM(this.serializer,e),r=function(s){if(!("targetChange"in s))return J.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Ze(o.readTime):J.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=ag(this.serializer),t.addTarget=function(s,o){let a;const l=o.target;if(a=Qh(l)?{documents:SR(s,l)}:{query:rf(s,l)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=yR(s,o.resumeToken);const c=sg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(J.min())>0){a.readTime=Ho(s,o.snapshotVersion.toTimestamp());const c=sg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,e);const r=OM(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=ag(this.serializer),t.removeTarget=e,this.a_(t)}}class SF extends XR{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=VM(e.writeResults,e.commitTime),r=Ze(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=ag(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>uu(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AF extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,og(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(O.UNKNOWN,s.toString())})}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Lo(e,og(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(O.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class CF{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Xe(t),this.D_=!1):j("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RF{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{Bi(this)&&(j("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=$(l);c.L_.add(4),await ga(c),c.q_.set("Unknown"),c.L_.delete(4),await Mu(c)}(this))})}),this.q_=new CF(r,i)}}async function Mu(n){if(Bi(n))for(const e of n.B_)await e(!0)}async function ga(n){for(const e of n.B_)await e(!1)}function lf(n,e){const t=$(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),fy(t)?dy(t):ya(t).r_()&&hy(t,e))}function Jo(n,e){const t=$(n),r=ya(t);t.N_.delete(e),r.r_()&&ZR(t,e),t.N_.size===0&&(r.r_()?r.o_():Bi(t)&&t.q_.set("Unknown"))}function hy(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ya(n).A_(e)}function ZR(n,e){n.Q_.xe(e),ya(n).R_(e)}function dy(n){n.Q_=new CM({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),ya(n).start(),n.q_.v_()}function fy(n){return Bi(n)&&!ya(n).n_()&&n.N_.size>0}function Bi(n){return $(n).L_.size===0}function ek(n){n.Q_=void 0}async function kF(n){n.q_.set("Online")}async function PF(n){n.N_.forEach((e,t)=>{hy(n,e)})}async function xF(n,e){ek(n),fy(n)?(n.q_.M_(e),dy(n)):n.q_.set("Unknown")}async function NF(n,e,t){if(n.q_.set("Online"),e instanceof _R&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))}(n,e)}catch(r){j("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await od(n,r)}else if(e instanceof hh?n.Q_.Ke(e):e instanceof gR?n.Q_.He(e):n.Q_.We(e),!t.isEqual(J.min()))try{const r=await GR(n.localStore);t.compareTo(r)>=0&&await function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const h=s.N_.get(c);h&&s.N_.set(c,h.withResumeToken(l.resumeToken,o))}}),a.targetMismatches.forEach((l,c)=>{const h=s.N_.get(l);if(!h)return;s.N_.set(l,h.withResumeToken(Ge.EMPTY_BYTE_STRING,h.snapshotVersion)),ZR(s,l);const d=new pr(h.target,l,c,h.sequenceNumber);hy(s,d)}),s.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(r){j("RemoteStore","Failed to raise snapshot:",r),await od(n,r)}}async function od(n,e,t){if(!Ui(e))throw e;n.L_.add(1),await ga(n),n.q_.set("Offline"),t||(t=()=>GR(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Mu(n)})}function tk(n,e){return e().catch(t=>od(n,t,e))}async function _a(n){const e=$(n),t=Ai(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;bF(e);)try{const i=await gF(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,DF(e,i)}catch(i){await od(e,i)}nk(e)&&rk(e)}function bF(n){return Bi(n)&&n.O_.length<10}function DF(n,e){n.O_.push(e);const t=Ai(n);t.r_()&&t.V_&&t.m_(e.mutations)}function nk(n){return Bi(n)&&!Ai(n).n_()&&n.O_.length>0}function rk(n){Ai(n).start()}async function VF(n){Ai(n).p_()}async function OF(n){const e=Ai(n);for(const t of n.O_)e.m_(t.mutations)}async function LF(n,e,t){const r=n.O_.shift(),i=J_.from(r,e,t);await tk(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await _a(n)}async function MF(n,e){e&&Ai(n).V_&&await async function(r,i){if(function(o){return fR(o)&&o!==O.ABORTED}(i.code)){const s=r.O_.shift();Ai(r).s_(),await tk(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await _a(r)}}(n,e),nk(n)&&rk(n)}async function nT(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),j("RemoteStore","RemoteStore received new credentials");const r=Bi(t);t.L_.add(3),await ga(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Mu(t)}async function fg(n,e){const t=$(n);e?(t.L_.delete(2),await Mu(t)):e||(t.L_.add(2),await ga(t),t.q_.set("Unknown"))}function ya(n){return n.K_||(n.K_=function(t,r,i){const s=$(t);return s.w_(),new TF(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:kF.bind(null,n),Ro:PF.bind(null,n),mo:xF.bind(null,n),d_:NF.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),fy(n)?dy(n):n.q_.set("Unknown")):(await n.K_.stop(),ek(n))})),n.K_}function Ai(n){return n.U_||(n.U_=function(t,r,i){const s=$(t);return s.w_(),new SF(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:VF.bind(null,n),mo:MF.bind(null,n),f_:OF.bind(null,n),g_:LF.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await _a(n)):(await n.U_.stop(),n.O_.length>0&&(j("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new py(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function va(n,e){if(Xe("AsyncQueue",`${e}: ${n}`),Ui(n))return new U(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e){this.comparator=e?(t,r)=>e(t,r)||W.comparator(t.key,r.key):(t,r)=>W.comparator(t.key,r.key),this.keyedMap=hl(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new ko(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ko)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new ko;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(){this.W_=new qe(W.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):K():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Xo{constructor(e,t,r,i,s,o,a,l,c){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new Xo(e,t,ko.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Nu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FF{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class UF{constructor(){this.queries=iT(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=$(t),s=i.queries;i.queries=iT(),s.forEach((o,a)=>{for(const l of a.j_)l.onError(r)})})(this,new U(O.ABORTED,"Firestore shutting down"))}}function iT(){return new Nr(n=>XC(n),Nu)}async function my(n,e){const t=$(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new FF,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=va(o,`Initialization of query '${to(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&_y(t)}async function gy(n,e){const t=$(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function jF(n,e){const t=$(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&_y(t)}function BF(n,e,t){const r=$(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function _y(n){n.Y_.forEach(e=>{e.next()})}var pg,sT;(sT=pg||(pg={})).ea="default",sT.Cache="cache";class yy{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Xo(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Xo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==pg.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zF{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e){this.serializer=e}Es(e){return Wn(this.serializer,e)}ds(e){return e.metadata.exists?TR(this.serializer,e.document,!1):be.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return Ze(e)}}class $F{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=ik(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=he.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new oT(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||re()).add(s);t.set(o,a)}}return t}async complete(){const e=await _F(this.localStore,new oT(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await yF(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function ik(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sk{constructor(e){this.key=e}}class ok{constructor(e){this.key=e}}class ak{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=re(),this.mutatedKeys=re(),this.Aa=eR(e),this.Ra=new ko(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new rT,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((h,d)=>{const p=i.get(h),g=bu(this.query,d)?d:null,I=!!p&&this.mutatedKeys.has(p.key),P=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let x=!1;p&&g?p.data.isEqual(g.data)?I!==P&&(r.track({type:3,doc:g}),x=!0):this.ga(p,g)||(r.track({type:2,doc:g}),x=!0,(l&&this.Aa(g,l)>0||c&&this.Aa(g,c)<0)&&(a=!0)):!p&&g?(r.track({type:0,doc:g}),x=!0):p&&!g&&(r.track({type:1,doc:p}),x=!0,(l||c)&&(a=!0)),x&&(g?(o=o.add(g),s=P?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,d)=>function(g,I){const P=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return P(g)-P(I)}(h.type,d.type)||this.Aa(h.doc,d.doc)),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,c=l!==this.Ea;return this.Ea=l,o.length!==0||c?{snapshot:new Xo(this.query,e.Ra,s,o,e.mutatedKeys,l===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new rT,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=re(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new ok(r))}),this.da.forEach(r=>{e.has(r)||t.push(new sk(r))}),t}ba(e){this.Ta=e.Ts,this.da=re();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Xo.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class qF{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class GF{constructor(e){this.key=e,this.va=!1}}class WF{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Nr(a=>XC(a),Nu),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(W.comparator),this.Na=new Map,this.La=new iy,this.Ba={},this.ka=new Map,this.qa=ks.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function KF(n,e,t=!0){const r=uf(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await lk(r,e,t,!0),i}async function HF(n,e){const t=uf(n);await lk(t,e,!0,!1)}async function lk(n,e,t,r){const i=await Qo(n.localStore,bt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await vy(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&lf(n.remoteStore,i),a}async function vy(n,e,t,r,i){n.Ka=(d,p,g)=>async function(P,x,y,E){let A=x.view.ma(y);A.ns&&(A=await rd(P.localStore,x.query,!1).then(({documents:S})=>x.view.ma(S,A)));const V=E&&E.targetChanges.get(x.targetId),F=E&&E.targetMismatches.get(x.targetId)!=null,M=x.view.applyChanges(A,P.isPrimaryClient,V,F);return mg(P,x.targetId,M.wa),M.snapshot}(n,d,p,g);const s=await rd(n.localStore,e,!0),o=new ak(e,s.Ts),a=o.ma(s.documents),l=Ou.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),c=o.applyChanges(a,n.isPrimaryClient,l);mg(n,t,c.wa);const h=new qF(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),c.snapshot}async function QF(n,e,t){const r=$(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Nu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Yo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Jo(r.remoteStore,i.targetId),Zo(r,i.targetId)}).catch(Fi)):(Zo(r,i.targetId),await Yo(r.localStore,i.targetId,!0))}async function YF(n,e){const t=$(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Jo(t.remoteStore,r.targetId))}async function JF(n,e,t){const r=Ty(n);try{const i=await function(o,a){const l=$(o),c=Fe.now(),h=a.reduce((g,I)=>g.add(I.key),re());let d,p;return l.persistence.runTransaction("Locally write mutations","readwrite",g=>{let I=Wt(),P=re();return l.cs.getEntries(g,h).next(x=>{I=x,I.forEach((y,E)=>{E.isValidDocument()||(P=P.add(y))})}).next(()=>l.localDocuments.getOverlayedDocuments(g,I)).next(x=>{d=x;const y=[];for(const E of a){const A=TM(E,d.get(E.key).overlayedDocument);A!=null&&y.push(new br(E.key,A,BC(A.value.mapValue),Me.exists(!0)))}return l.mutationQueue.addMutationBatch(g,c,y,a)}).next(x=>{p=x;const y=x.applyToLocalDocumentSet(d,P);return l.documentOverlayCache.saveOverlays(g,x.batchId,y)})}).then(()=>({batchId:p.batchId,changes:nR(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,l){let c=o.Ba[o.currentUser.toKey()];c||(c=new qe(te)),c=c.insert(a,l),o.Ba[o.currentUser.toKey()]=c}(r,i.batchId,t),await Dr(r,i.changes),await _a(r.remoteStore)}catch(i){const s=va(i,"Failed to persist write");t.reject(s)}}async function uk(n,e){const t=$(n);try{const r=await mF(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?Q(o.va):i.removedDocuments.size>0&&(Q(o.va),o.va=!1))}),await Dr(t,r,e)}catch(r){await Fi(r)}}function aT(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const l=$(o);l.onlineState=a;let c=!1;l.queries.forEach((h,d)=>{for(const p of d.j_)p.Z_(a)&&(c=!0)}),c&&_y(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function XF(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new qe(W.comparator);o=o.insert(s,be.newNoDocument(s,J.min()));const a=re().add(s),l=new Vu(J.min(),new Map,new qe(te),o,a);await uk(r,l),r.Oa=r.Oa.remove(s),r.Na.delete(e),Iy(r)}else await Yo(r.localStore,e,!1).then(()=>Zo(r,e,t)).catch(Fi)}async function ZF(n,e){const t=$(n),r=e.batch.batchId;try{const i=await pF(t.localStore,e);Ey(t,r,null),wy(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Dr(t,i)}catch(i){await Fi(i)}}async function e2(n,e,t){const r=$(n);try{const i=await function(o,a){const l=$(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return l.mutationQueue.lookupMutationBatch(c,a).next(d=>(Q(d!==null),h=d.keys(),l.mutationQueue.removeMutationBatch(c,d))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,h,a)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>l.localDocuments.getDocuments(c,h))})}(r.localStore,e);Ey(r,e,t),wy(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Dr(r,i)}catch(i){await Fi(i)}}async function t2(n,e){const t=$(n);Bi(t.remoteStore)||j("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const a=$(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>a.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=va(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function wy(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Ey(n,e,t){const r=$(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function Zo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||ck(n,r)})}function ck(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Jo(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),Iy(n))}function mg(n,e,t){for(const r of t)r instanceof sk?(n.La.addReference(r.key,e),n2(n,r)):r instanceof ok?(j("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||ck(n,r.key)):K()}function n2(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(j("SyncEngine","New document in limbo: "+t),n.xa.add(r),Iy(n))}function Iy(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new W(he.fromString(e)),r=n.qa.next();n.Na.set(r,new GF(t)),n.Oa=n.Oa.insert(t,r),lf(n.remoteStore,new pr(bt(fa(t.path)),r,"TargetPurposeLimboResolution",qt.oe))}}async function Dr(n,e,t){const r=$(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((a,l)=>{o.push(r.Ka(l,e,t).then(c=>{var h;if((c||t)&&r.isPrimaryClient){const d=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(l.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(c){i.push(c);const d=ly.Wi(l.targetId,c);s.push(d)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(l,c){const h=$(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>b.forEach(c,p=>b.forEach(p.$i,g=>h.persistence.referenceDelegate.addReference(d,p.targetId,g)).next(()=>b.forEach(p.Ui,g=>h.persistence.referenceDelegate.removeReference(d,p.targetId,g)))))}catch(d){if(!Ui(d))throw d;j("LocalStore","Failed to update sequence numbers: "+d)}for(const d of c){const p=d.targetId;if(!d.fromCache){const g=h.os.get(p),I=g.snapshotVersion,P=g.withLastLimboFreeSnapshotVersion(I);h.os=h.os.insert(p,P)}}}(r.localStore,s))}async function r2(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){j("SyncEngine","User change. New user:",e.toKey());const r=await qR(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(a=>{a.forEach(l=>{l.reject(new U(O.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Dr(t,r.hs)}}function i2(n,e){const t=$(n),r=t.Na.get(e);if(r&&r.va)return re().add(r.key);{let i=re();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function s2(n,e){const t=$(n),r=await rd(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&mg(t,e.targetId,i.wa),i}async function o2(n,e){const t=$(n);return HR(t.localStore,e).then(r=>Dr(t,r))}async function a2(n,e,t,r){const i=$(n),s=await function(a,l){const c=$(a),h=$(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",d=>h.Mn(d,l).next(p=>p?c.localDocuments.getDocuments(d,p):b.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await _a(i.remoteStore):t==="acknowledged"||t==="rejected"?(Ey(i,e,r||null),wy(i,e),function(a,l){$($(a).mutationQueue).On(l)}(i.localStore,e)):K(),await Dr(i,s)):j("SyncEngine","Cannot apply mutation batch with id: "+e)}async function l2(n,e){const t=$(n);if(uf(t),Ty(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await lT(t,r.toArray());t.Qa=!0,await fg(t.remoteStore,!0);for(const s of i)lf(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(Zo(t,o),Yo(t.localStore,o,!0))),Jo(t.remoteStore,o)}),await i,await lT(t,r),function(o){const a=$(o);a.Na.forEach((l,c)=>{Jo(a.remoteStore,c)}),a.La.pr(),a.Na=new Map,a.Oa=new qe(W.comparator)}(t),t.Qa=!1,await fg(t.remoteStore,!1)}}async function lT(n,e,t){const r=$(n),i=[],s=[];for(const o of e){let a;const l=r.Ma.get(o);if(l&&l.length!==0){a=await Qo(r.localStore,bt(l[0]));for(const c of l){const h=r.Fa.get(c),d=await s2(r,h);d.snapshot&&s.push(d.snapshot)}}else{const c=await KR(r.localStore,o);a=await Qo(r.localStore,c),await vy(r,hk(c),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function hk(n){return QC(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function u2(n){return function(t){return $($(t).persistence).Qi()}($(n).localStore)}async function c2(n,e,t,r){const i=$(n);if(i.Qa)return void j("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await HR(i.localStore,ZC(s[0])),a=Vu.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ge.EMPTY_BYTE_STRING);await Dr(i,o,a);break}case"rejected":await Yo(i.localStore,e,!0),Zo(i,e,r);break;default:K()}}async function h2(n,e,t){const r=uf(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){j("SyncEngine","Adding an already active target "+i);continue}const s=await KR(r.localStore,i),o=await Qo(r.localStore,s);await vy(r,hk(s),o.targetId,!1,o.resumeToken),lf(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await Yo(r.localStore,i,!1).then(()=>{Jo(r.remoteStore,i),Zo(r,i)}).catch(Fi)}}function uf(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=uk.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=i2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=XF.bind(null,e),e.Ca.d_=jF.bind(null,e.eventManager),e.Ca.$a=BF.bind(null,e.eventManager),e}function Ty(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ZF.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=e2.bind(null,e),e}function d2(n,e,t){const r=$(n);(async function(s,o,a){try{const l=await o.getMetadata();if(await function(g,I){const P=$(g),x=Ze(I.createTime);return P.persistence.runTransaction("hasNewerBundle","readonly",y=>P.Gr.getBundleMetadata(y,I.id)).then(y=>!!y&&y.createTime.compareTo(x)>=0)}(s.localStore,l))return await o.close(),a._completeWith(function(g){return{taskState:"Success",documentsLoaded:g.totalDocuments,bytesLoaded:g.totalBytes,totalDocuments:g.totalDocuments,totalBytes:g.totalBytes}}(l)),Promise.resolve(new Set);a._updateProgress(ik(l));const c=new $F(l,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const p=await c.la(h);p&&a._updateProgress(p),h=await o.Ua()}const d=await c.complete();return await Dr(s,d.Ia,void 0),await function(g,I){const P=$(g);return P.persistence.runTransaction("Save bundle","readwrite",x=>P.Gr.saveBundleMetadata(x,I))}(s.localStore,l),a._completeWith(d.progress),Promise.resolve(d.Pa)}catch(l){return sn("SyncEngine",`Loading bundle failed with ${l}`),a._failWith(l),Promise.resolve(new Set)}})(r,e,t).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class Ci{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Lu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return $R(this.persistence,new zR,e.initialUser,this.serializer)}Ga(e){return new sy(af.Zr,this.serializer)}Wa(e){return new YR}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ci.provider={build:()=>new Ci};class f2 extends Ci{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){Q(this.persistence.referenceDelegate instanceof nd);const r=this.persistence.referenceDelegate.garbageCollector;return new MR(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new sy(r=>nd.Zr(r,t),this.serializer)}}class Sy extends Ci{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Ty(this.Ja.syncEngine),await _a(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return $R(this.persistence,new zR,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new MR(r,e.asyncQueue,t)}Ha(e,t){const r=new VL(t,this.persistence);return new DL(e.asyncQueue,r)}Ga(e){const t=ay(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new oy(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,JR(),dh(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new YR}}class dk extends Sy{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Lp&&(this.sharedClientState.syncEngine={no:a2.bind(null,t),ro:c2.bind(null,t),io:h2.bind(null,t),Qi:u2.bind(null,t),eo:o2.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await l2(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const t=JR();if(!Lp.D(t))throw new U(O.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=ay(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Lp(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class Ri{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>aT(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=r2.bind(null,this.syncEngine),await fg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new UF}()}createDatastore(e){const t=Lu(e.databaseInfo.databaseId),r=function(s){return new IF(s)}(e.databaseInfo);return function(s,o,a,l){return new AF(s,o,a,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,a){return new RF(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>aT(this.syncEngine,t,0),function(){return tT.D()?new tT:new vF}())}createSyncEngine(e,t){return function(i,s,o,a,l,c,h){const d=new WF(i,s,o,a,l,c);return h&&(d.Qa=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=$(i);j("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await ga(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ri.provider={build:()=>new Ri};function uT(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Xe("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p2{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new mt,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))},r=>this.metadata.reject(r))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new zF(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m2{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new U(O.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=$(i),a={documents:s.map(d=>lu(o.serializer,d))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,he.emptyPath(),a,s.length),c=new Map;l.forEach(d=>{const p=bM(o.serializer,d);c.set(p.key.toString(),p)});const h=[];return s.forEach(d=>{const p=c.get(d.toString());Q(!!p),h.push(p)}),h}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new ma(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const i=W.fromPath(r);this.mutations.push(new Q_(i,this.precondition(i)))}),await async function(r,i){const s=$(r),o={writes:i.map(a=>uu(s.serializer,a))};await s.Mo("Commit",s.serializer.databaseId,he.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw K();t=J.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new U(O.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(J.min())?Me.exists(!1):Me.updateTime(t):Me.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(J.min()))throw new U(O.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Me.updateTime(t)}return Me.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g2{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new cy(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new m2(this.datastore),t=this.cu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.lu(i)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const t=this.updateFunction(e);return!Pu(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!fR(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _2{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ht.UNAUTHENTICATED,this.clientId=B_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{j("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(j("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=va(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Fp(n,e){n.asyncQueue.verifyOperationInProgress(),j("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await qR(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function cT(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Ay(n);j("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>nT(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>nT(e.remoteStore,i)),n._onlineComponents=e}async function Ay(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j("FirestoreClient","Using user provided OfflineComponentProvider");try{await Fp(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;sn("Error using user provided cache. Falling back to memory cache: "+t),await Fp(n,new Ci)}}else j("FirestoreClient","Using default OfflineComponentProvider"),await Fp(n,new Ci);return n._offlineComponents}async function hf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j("FirestoreClient","Using user provided OnlineComponentProvider"),await cT(n,n._uninitializedComponentsProvider._online)):(j("FirestoreClient","Using default OnlineComponentProvider"),await cT(n,new Ri))),n._onlineComponents}function fk(n){return Ay(n).then(e=>e.persistence)}function wa(n){return Ay(n).then(e=>e.localStore)}function pk(n){return hf(n).then(e=>e.remoteStore)}function Cy(n){return hf(n).then(e=>e.syncEngine)}function mk(n){return hf(n).then(e=>e.datastore)}async function ea(n){const e=await hf(n),t=e.eventManager;return t.onListen=KF.bind(null,e.syncEngine),t.onUnlisten=QF.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=HF.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=YF.bind(null,e.syncEngine),t}function y2(n){return n.asyncQueue.enqueue(async()=>{const e=await fk(n),t=await pk(n);return e.setNetworkEnabled(!0),function(i){const s=$(i);return s.L_.delete(0),Mu(s)}(t)})}function v2(n){return n.asyncQueue.enqueue(async()=>{const e=await fk(n),t=await pk(n);return e.setNetworkEnabled(!1),async function(i){const s=$(i);s.L_.add(0),await ga(s),s.q_.set("Offline")}(t)})}function w2(n,e){const t=new mt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await function(c,h){const d=$(c);return d.persistence.runTransaction("read document","readonly",p=>d.localDocuments.getDocument(p,h))}(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new U(O.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const l=va(a,`Failed to get document '${s} from cache`);o.reject(l)}}(await wa(n),e,t)),t.promise}function gk(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new cf({next:p=>{h.Za(),o.enqueueAndForget(()=>gy(s,d));const g=p.docs.has(a);!g&&p.fromCache?c.reject(new U(O.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&p.fromCache&&l&&l.source==="server"?c.reject(new U(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new yy(fa(a.path),h,{includeMetadataChanges:!0,_a:!0});return my(s,d)}(await ea(n),n.asyncQueue,e,t,r)),r.promise}function E2(n,e){const t=new mt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await rd(i,s,!0),l=new ak(s,a.Ts),c=l.ma(a.documents),h=l.applyChanges(c,!1);o.resolve(h.snapshot)}catch(a){const l=va(a,`Failed to execute query '${s} against cache`);o.reject(l)}}(await wa(n),e,t)),t.promise}function _k(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new cf({next:p=>{h.Za(),o.enqueueAndForget(()=>gy(s,d)),p.fromCache&&l.source==="server"?c.reject(new U(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new yy(a,h,{includeMetadataChanges:!0,_a:!0});return my(s,d)}(await ea(n),n.asyncQueue,e,t,r)),r.promise}function I2(n,e,t){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>{try{const i=await mk(n);r.resolve(async function(o,a,l){var c;const h=$(o),{request:d,ut:p,parent:g}=AR(h.serializer,YC(a),l);h.connection.Fo||delete d.parent;const I=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,g,d,1)).filter(x=>!!x.result);Q(I.length===1);const P=(c=I[0].result)===null||c===void 0?void 0:c.aggregateFields;return Object.keys(P).reduce((x,y)=>(x[p[y]]=P[y],x),{})}(i,e,t))}catch(i){r.reject(i)}}),r.promise}function T2(n,e){const t=new cf(e);return n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.add(s),s.next()}(await ea(n),t)),()=>{t.Za(),n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.delete(s)}(await ea(n),t))}}function S2(n,e,t,r){const i=function(o,a){let l;return l=typeof o=="string"?mR().encode(o):o,function(h,d){return new p2(h,d)}(function(h,d){if(h instanceof Uint8Array)return uT(h,d);if(h instanceof ArrayBuffer)return uT(new Uint8Array(h),d);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),a)}(t,Lu(e));n.asyncQueue.enqueueAndForget(async()=>{d2(await Cy(n),i,r)})}function A2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){const s=$(r);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await wa(n),e))}function C2(n,e){return n.asyncQueue.enqueue(async()=>async function(r,i){const s=$(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",l=>o.getFieldIndexes(l).next(c=>function(d,p,g,I,P){d=[...d],p=[...p],d.sort(g),p.sort(g);const x=d.length,y=p.length;let E=0,A=0;for(;E<y&&A<x;){const V=g(d[A],p[E]);V<0?P(d[A++]):V>0?I(p[E++]):(E++,A++)}for(;E<y;)I(p[E++]);for(;A<x;)P(d[A++])}(c,i,PL,h=>{a.push(o.addFieldIndex(l,h))},h=>{a.push(o.deleteFieldIndex(l,h))})).next(()=>b.waitFor(a)))}(await wa(n),e))}function R2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){$(r).ss.zi=i}(await wa(n),e))}function k2(n){return n.asyncQueue.enqueue(async()=>function(t){const r=$(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await wa(n)))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yk(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ry(n,e,t){if(!t)throw new U(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function vk(n,e,t,r){if(e===!0&&r===!0)throw new U(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function dT(n){if(!W.isDocumentKey(n))throw new U(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function fT(n){if(W.isDocumentKey(n))throw new U(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function df(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function oe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=df(n);throw new U(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function wk(n,e){if(e<=0)throw new U(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}vk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=yk((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Fu{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pT({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pT(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new TC;switch(r.type){case"firstParty":return new SL(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=hT.get(t);r&&(j("ComponentProvider","Removing Datastore"),hT.delete(t),r.terminate())}(this),Promise.resolve()}}function Ek(n,e,t,r={}){var i;const s=(n=oe(n,Fu))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,l;if(typeof r.mockUserToken=="string")a=r.mockUserToken,l=ht.MOCK_USER;else{a=A_(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new U(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new ht(c)}n._authCredentials=new EL(new IC(a,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new gt(this.firestore,e,this._query)}}class Qe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Qe(this.firestore,e,this._key)}}class xn extends gt{constructor(e,t,r){super(e,t,fa(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Qe(this.firestore,null,new W(e))}withConverter(e){return new xn(this.firestore,e,this._path)}}function ky(n,e,...t){if(n=me(n),Ry("collection","path",e),n instanceof Fu){const r=he.fromString(e,...t);return fT(r),new xn(n,null,r)}{if(!(n instanceof Qe||n instanceof xn))throw new U(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return fT(r),new xn(n.firestore,null,r)}}function P2(n,e){if(n=oe(n,Fu),Ry("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new U(O.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new gt(n,null,function(r){return new xr(he.emptyPath(),r)}(e))}function Ea(n,e,...t){if(n=me(n),arguments.length===1&&(e=B_.newId()),Ry("doc","path",e),n instanceof Fu){const r=he.fromString(e,...t);return dT(r),new Qe(n,null,new W(r))}{if(!(n instanceof Qe||n instanceof xn))throw new U(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return dT(r),new Qe(n.firestore,n instanceof xn?n.converter:null,new W(r))}}function x2(n,e){return n=me(n),e=me(e),(n instanceof Qe||n instanceof xn)&&(e instanceof Qe||e instanceof xn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Py(n,e){return n=me(n),e=me(e),n instanceof gt&&e instanceof gt&&n.firestore===e.firestore&&Nu(n._query,e._query)&&n.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mT{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new cy(this,"async_queue_retry"),this.Vu=()=>{const r=dh();r&&j("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=dh();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=dh();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new mt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Ui(e))throw e;j("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw Xe("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=py.createAndSchedule(this,e,t,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&K()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function gg(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Ik{constructor(){this._progressObserver={},this._taskCompletionResolver=new mt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N2=-1;class Ie extends Fu{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new mT,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new mT(e),this._firestoreClient=void 0,await e}}}function b2(n,e,t){t||(t="(default)");const r=Ls(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(yi(s,e))return i;throw new U(O.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(O.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function Tk(n,e){const t=typeof n=="object"?n:Wd(),r=typeof n=="string"?n:e||"(default)",i=Ls(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=S_("firestore");s&&Ek(i,...s)}return i}function Ue(n){if(n._terminated)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Sk(n),n._firestoreClient}function Sk(n){var e,t,r;const i=n._freezeSettings(),s=function(a,l,c,h){return new nM(a,l,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,yk(h.experimentalLongPollingOptions),h.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new _2(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(a){const l=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(l),_online:l}}(n._componentsProvider))}function D2(n,e){sn("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Ak(n,Ri.provider,{build:r=>new Sy(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function V2(n){sn("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Ak(n,Ri.provider,{build:t=>new dk(t,e.cacheSizeBytes)})}function Ak(n,e,t){if((n=oe(n,Ie))._firestoreClient||n._terminated)throw new U(O.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new U(O.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Sk(n)}function O2(n){if(n._initialized&&!n._terminated)throw new U(O.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new mt;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Gn.D())return Promise.resolve();const i=r+"main";await Gn.delete(i)}(ay(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function L2(n){return function(t){const r=new mt;return t.asyncQueue.enqueueAndForget(async()=>t2(await Cy(t),r)),r.promise}(Ue(n=oe(n,Ie)))}function M2(n){return y2(Ue(n=oe(n,Ie)))}function F2(n){return v2(Ue(n=oe(n,Ie)))}function U2(n){return Q1(n.app,"firestore",n._databaseId.database),n._delete()}function j2(n,e){const t=Ue(n=oe(n,Ie)),r=new Ik;return S2(t,n._databaseId,e,r),r}function B2(n,e){return A2(Ue(n=oe(n,Ie)),e).then(t=>t?new gt(n,null,t.query):null)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Ck{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ki(Ge.fromBase64String(e))}catch(t){throw new U(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ki(Ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function z2(){return new zi("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ff{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return te(this._lat,e._lat)||te(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $2=/^__.*__$/;class q2{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new br(e,this.data,this.fieldMask,t,this.fieldTransforms):new pa(e,this.data,t,this.fieldTransforms)}}class Rk{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new br(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function kk(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class pf{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new pf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ad(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(kk(this.Cu)&&$2.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class G2{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Lu(e)}Qu(e,t,r,i=!1){return new pf({Cu:e,methodName:t,qu:r,path:De.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Us(n){const e=n._freezeSettings(),t=Lu(n._databaseId);return new G2(n._databaseId,!!e.ignoreUndefinedProperties,t)}function mf(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);Ly("Data must be an object, but it was:",o,r);const a=Nk(r,o);let l,c;if(s.merge)l=new Gt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const d of s.mergeFields){const p=cu(e,d,t);if(!o.contains(p))throw new U(O.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);Dk(h,p)||h.push(p)}l=new Gt(h),c=o.fieldTransforms.filter(d=>l.covers(d.field))}else l=null,c=o.fieldTransforms;return new q2(new vt(a),l,c)}class ju extends $i{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ju}}function Pk(n,e,t){return new pf({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class xy extends $i{_toFieldTransform(e){return new Du(e.path,new Wo)}isEqual(e){return e instanceof xy}}class Ny extends $i{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Pk(this,e,!0),r=this.Ku.map(s=>js(s,t)),i=new Ss(r);return new Du(e.path,i)}isEqual(e){return e instanceof Ny&&yi(this.Ku,e.Ku)}}class by extends $i{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Pk(this,e,!0),r=this.Ku.map(s=>js(s,t)),i=new As(r);return new Du(e.path,i)}isEqual(e){return e instanceof by&&yi(this.Ku,e.Ku)}}class Dy extends $i{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Ko(e.serializer,sR(e.serializer,this.$u));return new Du(e.path,t)}isEqual(e){return e instanceof Dy&&this.$u===e.$u}}function Vy(n,e,t,r){const i=n.Qu(1,e,t);Ly("Data must be an object, but it was:",i,r);const s=[],o=vt.empty();ji(r,(l,c)=>{const h=gf(e,l,t);c=me(c);const d=i.Nu(h);if(c instanceof ju)s.push(h);else{const p=js(c,d);p!=null&&(s.push(h),o.set(h,p))}});const a=new Gt(s);return new Rk(o,a,i.fieldTransforms)}function Oy(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[cu(e,r,t)],l=[i];if(s.length%2!=0)throw new U(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)a.push(cu(e,s[p])),l.push(s[p+1]);const c=[],h=vt.empty();for(let p=a.length-1;p>=0;--p)if(!Dk(c,a[p])){const g=a[p];let I=l[p];I=me(I);const P=o.Nu(g);if(I instanceof ju)c.push(g);else{const x=js(I,P);x!=null&&(c.push(g),h.set(g,x))}}const d=new Gt(c);return new Rk(h,d,o.fieldTransforms)}function xk(n,e,t,r=!1){return js(t,n.Qu(r?4:3,e))}function js(n,e){if(bk(n=me(n)))return Ly("Unsupported field value:",e,n),Nk(n,e);if(n instanceof $i)return function(r,i){if(!kk(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const a of r){let l=js(a,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return sR(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Fe.fromDate(r);return{timestampValue:Ho(i.serializer,s)}}if(r instanceof Fe){const s=new Fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ho(i.serializer,s)}}if(r instanceof ff)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ki)return{bytesValue:yR(i.serializer,r._byteString)};if(r instanceof Qe){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ey(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Uu)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw a.Bu("VectorValues must only contain numeric values.");return H_(a.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${df(r)}`)}(n,e)}function Nk(n,e){const t={};return MC(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ji(n,(r,i)=>{const s=js(i,e.Mu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function bk(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Fe||n instanceof ff||n instanceof ki||n instanceof Qe||n instanceof $i||n instanceof Uu)}function Ly(n,e,t){if(!bk(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=df(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function cu(n,e,t){if((e=me(e))instanceof zi)return e._internalPath;if(typeof e=="string")return gf(n,e);throw ad("Field path arguments must be of type string or ",n,!1,void 0,t)}const W2=new RegExp("[~\\*/\\[\\]]");function gf(n,e,t){if(e.search(W2)>=0)throw ad(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new zi(...e.split("."))._internalPath}catch{throw ad(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ad(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new U(O.INVALID_ARGUMENT,a+n+l)}function Dk(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Qe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new K2(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(_f("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class K2 extends hu{data(){return super.data()}}function _f(n,e){return typeof e=="string"?gf(n,e):e instanceof zi?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vk(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class My{}class Ia extends My{}function Ok(n,e,...t){let r=[];e instanceof My&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Bs).length,a=s.filter(l=>l instanceof Ta).length;if(o>1||o>0&&a>0)throw new U(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ta extends Ia{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ta(e,t,r)}_apply(e){const t=this._parse(e);return Fk(e._query,t),new gt(e.firestore,e.converter,ig(e._query,t))}_parse(e){const t=Us(e.firestore);return function(s,o,a,l,c,h,d){let p;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new U(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){_T(d,h);const g=[];for(const I of d)g.push(gT(l,s,I));p={arrayValue:{values:g}}}else p=gT(l,s,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||_T(d,h),p=xk(a,o,d,h==="in"||h==="not-in");return de.create(c,h,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function H2(n,e,t){const r=e,i=_f("where",n);return Ta._create(i,r,t)}class Bs extends My{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Bs(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ve.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const a=s.getFlattenedFilters();for(const l of a)Fk(o,l),o=ig(o,l)}(e._query,t),new gt(e.firestore,e.converter,ig(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Q2(...n){return n.forEach(e=>Uk("or",e)),Bs._create("or",n)}function Y2(...n){return n.forEach(e=>Uk("and",e)),Bs._create("and",n)}class yf extends Ia{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new yf(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new au(s,o)}(e._query,this._field,this._direction);return new gt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new xr(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function J2(n,e="asc"){const t=e,r=_f("orderBy",n);return yf._create(r,t)}class Bu extends Ia{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Bu(e,t,r)}_apply(e){return new gt(e.firestore,e.converter,Jh(e._query,this._limit,this._limitType))}}function Lk(n){return wk("limit",n),Bu._create("limit",n,"F")}function X2(n){return wk("limitToLast",n),Bu._create("limitToLast",n,"L")}class zu extends Ia{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new zu(e,t,r)}_apply(e){const t=Mk(e,this.type,this._docOrFields,this._inclusive);return new gt(e.firestore,e.converter,function(i,s){return new xr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function Z2(...n){return zu._create("startAt",n,!0)}function eU(...n){return zu._create("startAfter",n,!1)}class $u extends Ia{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new $u(e,t,r)}_apply(e){const t=Mk(e,this.type,this._docOrFields,this._inclusive);return new gt(e.firestore,e.converter,function(i,s){return new xr(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function tU(...n){return $u._create("endBefore",n,!1)}function nU(...n){return $u._create("endAt",n,!0)}function Mk(n,e,t,r){if(t[0]=me(t[0]),t[0]instanceof hu)return function(s,o,a,l,c){if(!l)throw new U(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const d of Ro(s))if(d.field.isKeyField())h.push(Is(o,l.key));else{const p=l.data.field(d.field);if(Xd(p))throw new U(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+d.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const g=d.field.canonicalString();throw new U(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${g}' (used as the orderBy) does not exist.`)}h.push(p)}return new Si(h,c)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Us(n.firestore);return function(o,a,l,c,h,d){const p=o.explicitOrderBy;if(h.length>p.length)throw new U(O.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const g=[];for(let I=0;I<h.length;I++){const P=h[I];if(p[I].field.isKeyField()){if(typeof P!="string")throw new U(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof P}`);if(!W_(o)&&P.indexOf("/")!==-1)throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${P}' contains a slash.`);const x=o.path.child(he.fromString(P));if(!W.isDocumentKey(x))throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${x}' is not because it contains an odd number of segments.`);const y=new W(x);g.push(Is(a,y))}else{const x=xk(l,c,P);g.push(x)}}return new Si(g,d)}(n._query,n.firestore._databaseId,i,e,t,r)}}function gT(n,e,t){if(typeof(t=me(t))=="string"){if(t==="")throw new U(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!W_(e)&&t.indexOf("/")!==-1)throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(he.fromString(t));if(!W.isDocumentKey(r))throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Is(n,new W(r))}if(t instanceof Qe)return Is(n,t._key);throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${df(t)}.`)}function _T(n,e){if(!Array.isArray(n)||n.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Fk(n,e){const t=function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Uk(n,e){if(!(e instanceof Ta||e instanceof Bs))throw new U(O.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Fy{convertValue(e,t="none"){switch(Ii(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Cr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return ji(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Oe(o.doubleValue));return new Uu(s)}convertGeoPoint(e){return new ff(Oe(e.latitude),Oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=Zd(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(iu(e));default:return null}}convertTimestamp(e){const t=Ar(e);return new Fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=he.fromString(e);Q(PR(r));const i=new Ei(r.get(1),r.get(3)),s=new W(r.popFirst(5));return i.isEqual(t)||Xe(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vf(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class rU extends Fy{constructor(e){super(),this.firestore=e}convertBytes(e){return new ki(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qe(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iU(n){return new ta("sum",cu("sum",n))}function sU(n){return new ta("avg",cu("average",n))}function jk(){return new ta("count")}function oU(n,e){var t,r;return n instanceof ta&&e instanceof ta&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function aU(n,e){return Py(n.query,e.query)&&yi(n.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ps extends hu{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Pl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(_f("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Pl extends Ps{data(e={}){return super.data(e)}}class xs{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new ei(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Pl(this._firestore,this._userDataWriter,r.key,r,new ei(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const l=new Pl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new ei(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const l=new Pl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new ei(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,h=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:lU(a.type),doc:l,oldIndex:c,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function lU(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}function uU(n,e){return n instanceof Ps&&e instanceof Ps?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof xs&&e instanceof xs&&n._firestore===e._firestore&&Py(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uy(n){n=oe(n,Qe);const e=oe(n.firestore,Ie);return gk(Ue(e),n._key).then(t=>jy(e,n,t))}class qi extends Fy{constructor(e){super(),this.firestore=e}convertBytes(e){return new ki(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qe(this.firestore,null,t)}}function cU(n){n=oe(n,Qe);const e=oe(n.firestore,Ie),t=Ue(e),r=new qi(e);return w2(t,n._key).then(i=>new Ps(e,r,n._key,i,new ei(i!==null&&i.hasLocalMutations,!0),n.converter))}function hU(n){n=oe(n,Qe);const e=oe(n.firestore,Ie);return gk(Ue(e),n._key,{source:"server"}).then(t=>jy(e,n,t))}function Bk(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new qi(e);return Vk(n._query),_k(t,n._query).then(i=>new xs(e,r,n,i))}function dU(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new qi(e);return E2(t,n._query).then(i=>new xs(e,r,n,i))}function fU(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new qi(e);return _k(t,n._query,{source:"server"}).then(i=>new xs(e,r,n,i))}function pU(n,e,t){n=oe(n,Qe);const r=oe(n.firestore,Ie),i=vf(n.converter,e,t);return Sa(r,[mf(Us(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Me.none())])}function mU(n,e,t,...r){n=oe(n,Qe);const i=oe(n.firestore,Ie),s=Us(i);let o;return o=typeof(e=me(e))=="string"||e instanceof zi?Oy(s,"updateDoc",n._key,e,t,r):Vy(s,"updateDoc",n._key,e),Sa(i,[o.toMutation(n._key,Me.exists(!0))])}function gU(n){return Sa(oe(n.firestore,Ie),[new ma(n._key,Me.none())])}function _U(n,e){const t=oe(n.firestore,Ie),r=Ea(n),i=vf(n.converter,e);return Sa(t,[mf(Us(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Me.exists(!1))]).then(()=>r)}function yU(n,...e){var t,r,i;n=me(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||gg(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(gg(e[o])){const d=e[o];e[o]=(t=d.next)===null||t===void 0?void 0:t.bind(d),e[o+1]=(r=d.error)===null||r===void 0?void 0:r.bind(d),e[o+2]=(i=d.complete)===null||i===void 0?void 0:i.bind(d)}let l,c,h;if(n instanceof Qe)c=oe(n.firestore,Ie),h=fa(n._key.path),l={next:d=>{e[o]&&e[o](jy(c,n,d))},error:e[o+1],complete:e[o+2]};else{const d=oe(n,gt);c=oe(d.firestore,Ie),h=d._query;const p=new qi(c);l={next:g=>{e[o]&&e[o](new xs(c,p,d,g))},error:e[o+1],complete:e[o+2]},Vk(n._query)}return function(p,g,I,P){const x=new cf(P),y=new yy(g,x,I);return p.asyncQueue.enqueueAndForget(async()=>my(await ea(p),y)),()=>{x.Za(),p.asyncQueue.enqueueAndForget(async()=>gy(await ea(p),y))}}(Ue(c),h,a,l)}function vU(n,e){return T2(Ue(n=oe(n,Ie)),gg(e)?e:{next:e})}function Sa(n,e){return function(r,i){const s=new mt;return r.asyncQueue.enqueueAndForget(async()=>JF(await Cy(r),i,s)),s.promise}(Ue(n),e)}function jy(n,e,t){const r=t.docs.get(e._key),i=new qi(n);return new Ps(n,i,e._key,r,new ei(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wU(n){return zk(n,{count:jk()})}function zk(n,e){const t=oe(n.firestore,Ie),r=Ue(t),i=LC(e,(s,o)=>new dR(o,s.aggregateType,s._internalFieldPath));return I2(r,n._query,i).then(s=>function(a,l,c){const h=new qi(a);return new Ck(l,h,c)}(t,n,s))}class EU{constructor(e){this.kind="memory",this._onlineComponentProvider=Ri.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=Ci.provider}toJSON(){return{kind:this.kind}}}class IU{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=$k(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class TU{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ci.provider}toJSON(){return{kind:this.kind}}}class SU{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new f2(e)}}toJSON(){return{kind:this.kind}}}function AU(){return new TU}function CU(n){return new SU(n==null?void 0:n.cacheSizeBytes)}function RU(n){return new EU(n)}function kU(n){return new IU(n)}class PU{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ri.provider,this._offlineComponentProvider={build:t=>new Sy(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class xU{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ri.provider,this._offlineComponentProvider={build:t=>new dk(t,e==null?void 0:e.cacheSizeBytes)}}}function $k(n){return new PU(n==null?void 0:n.forceOwnership)}function NU(){return new xU}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bU={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qk{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Us(e)}set(e,t,r){this._verifyNotCommitted();const i=Yr(e,this._firestore),s=vf(i.converter,t,r),o=mf(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Me.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Yr(e,this._firestore);let o;return o=typeof(t=me(t))=="string"||t instanceof zi?Oy(this._dataReader,"WriteBatch.update",s._key,t,r,i):Vy(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Me.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Yr(e,this._firestore);return this._mutations=this._mutations.concat(new ma(t._key,Me.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new U(O.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Yr(n,e){if((n=me(n)).firestore!==e)throw new U(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gk extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=Us(t)}get(t){const r=Yr(t,this._firestore),i=new rU(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return K();const o=s[0];if(o.isFoundDocument())return new hu(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new hu(this._firestore,i,r._key,null,r.converter);throw K()})}set(t,r,i){const s=Yr(t,this._firestore),o=vf(s.converter,r,i),a=mf(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=Yr(t,this._firestore);let a;return a=typeof(r=me(r))=="string"||r instanceof zi?Oy(this._dataReader,"Transaction.update",o._key,r,i,s):Vy(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=Yr(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Yr(e,this._firestore),r=new qi(this._firestore);return super.get(e).then(i=>new Ps(this._firestore,r,t._key,i._document,new ei(!1,!1),t.converter))}}function DU(n,e,t){n=oe(n,Ie);const r=Object.assign(Object.assign({},bU),t);return function(s){if(s.maxAttempts<1)throw new U(O.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,a){const l=new mt;return s.asyncQueue.enqueueAndForget(async()=>{const c=await mk(s);new g2(s.asyncQueue,c,a,o,l).au()}),l.promise}(Ue(n),i=>e(new Gk(n,i)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VU(){return new ju("deleteField")}function OU(){return new xy("serverTimestamp")}function LU(...n){return new Ny("arrayUnion",n)}function MU(...n){return new by("arrayRemove",n)}function FU(n){return new Dy("increment",n)}function UU(n){return new Uu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jU(n){return Ue(n=oe(n,Ie)),new qk(n,e=>Sa(n,e))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BU(n,e){const t=Ue(n=oe(n,Ie));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return sn("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(s){const o=typeof s=="string"?function(c){try{return JSON.parse(c)}catch(h){throw new U(O.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}}(s):s,a=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const c=yT(l,"collectionGroup"),h=[];if(Array.isArray(l.fields))for(const d of l.fields){const p=gf("setIndexConfiguration",yT(d,"fieldPath"));d.arrayConfig==="CONTAINS"?h.push(new ms(p,2)):d.order==="ASCENDING"?h.push(new ms(p,0)):d.order==="DESCENDING"&&h.push(new ms(p,1))}a.push(new zo(zo.UNKNOWN_ID,c,h,$o.empty()))}return a}(e);return C2(t,r)}function yT(n,e){if(typeof n[e]!="string")throw new U(O.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wk{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function zU(n){var e;n=oe(n,Ie);const t=vT.get(n);if(t)return t;if(((e=Ue(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new Wk(n);return vT.set(n,r),r}function $U(n){Kk(n,!0)}function qU(n){Kk(n,!1)}function GU(n){k2(Ue(n._firestore)).then(e=>j("deleting all persistent cache indexes succeeded")).catch(e=>sn("deleting all persistent cache indexes failed",e))}function Kk(n,e){R2(Ue(n._firestore),e).then(t=>j(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>sn(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const vT=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WU(n){var e;const t=(e=Ue(oe(n.firestore,Ie))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:rf(t,bt(n._query))._t}function KU(n,e){var t;const r=LC(e,(s,o)=>new dR(o,s.aggregateType,s._internalFieldPath)),i=(t=Ue(oe(n.firestore,Ie))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:AR(i,YC(n._query),r,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HU{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return By.instance.onExistenceFilterMismatch(e)}}class By{constructor(){this.Uu=new Map}static get instance(){return Uc||(Uc=new By,function(t){if(Xh)throw new Error("a TestingHooksSpi instance is already set");Xh=t}(Uc)),Uc}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let Uc=null;(function(e,t=!0){(function(i){da=i})(Li),vi(new Ir("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Ie(new IL(r.getProvider("auth-internal")),new AL(r.getProvider("app-check-internal")),function(c,h){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new U(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ei(c.options.projectId,h)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),fn(lI,"4.7.3",e),fn(lI,"4.7.3","esm2017")})();const zy=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Fy,AggregateField:ta,AggregateQuerySnapshot:Ck,Bytes:ki,CACHE_SIZE_UNLIMITED:N2,CollectionReference:xn,DocumentReference:Qe,DocumentSnapshot:Ps,FieldPath:zi,FieldValue:$i,Firestore:Ie,FirestoreError:U,GeoPoint:ff,LoadBundleTask:Ik,PersistentCacheIndexManager:Wk,Query:gt,QueryCompositeFilterConstraint:Bs,QueryConstraint:Ia,QueryDocumentSnapshot:Pl,QueryEndAtConstraint:$u,QueryFieldFilterConstraint:Ta,QueryLimitConstraint:Bu,QueryOrderByConstraint:yf,QuerySnapshot:xs,QueryStartAtConstraint:zu,SnapshotMetadata:ei,Timestamp:Fe,Transaction:Gk,VectorValue:Uu,WriteBatch:qk,_AutoId:B_,_ByteString:Ge,_DatabaseId:Ei,_DocumentKey:W,_EmptyAppCheckTokenProvider:CL,_EmptyAuthCredentialsProvider:TC,_FieldPath:De,_TestingHooks:HU,_cast:oe,_debugAssert:wL,_internalAggregationQueryToProtoRunAggregationQueryRequest:KU,_internalQueryToProtoQueryTarget:WU,_isBase64Available:eM,_logWarn:sn,_validateIsNotUsedTogether:vk,addDoc:_U,aggregateFieldEqual:oU,aggregateQuerySnapshotEqual:aU,and:Y2,arrayRemove:MU,arrayUnion:LU,average:sU,clearIndexedDbPersistence:O2,collection:ky,collectionGroup:P2,connectFirestoreEmulator:Ek,count:jk,deleteAllPersistentCacheIndexes:GU,deleteDoc:gU,deleteField:VU,disableNetwork:F2,disablePersistentCacheIndexAutoCreation:qU,doc:Ea,documentId:z2,enableIndexedDbPersistence:D2,enableMultiTabIndexedDbPersistence:V2,enableNetwork:M2,enablePersistentCacheIndexAutoCreation:$U,endAt:nU,endBefore:tU,ensureFirestoreConfigured:Ue,executeWrite:Sa,getAggregateFromServer:zk,getCountFromServer:wU,getDoc:Uy,getDocFromCache:cU,getDocFromServer:hU,getDocs:Bk,getDocsFromCache:dU,getDocsFromServer:fU,getFirestore:Tk,getPersistentCacheIndexManager:zU,increment:FU,initializeFirestore:b2,limit:Lk,limitToLast:X2,loadBundle:j2,memoryEagerGarbageCollector:AU,memoryLocalCache:RU,memoryLruGarbageCollector:CU,namedQuery:B2,onSnapshot:yU,onSnapshotsInSync:vU,or:Q2,orderBy:J2,persistentLocalCache:kU,persistentMultipleTabManager:NU,persistentSingleTabManager:$k,query:Ok,queryEqual:Py,refEqual:x2,runTransaction:DU,serverTimestamp:OU,setDoc:pU,setIndexConfiguration:BU,setLogLevel:vL,snapshotEqual:uU,startAfter:eU,startAt:Z2,sum:iU,terminate:U2,updateDoc:mU,vector:UU,waitForPendingWrites:L2,where:H2,writeBatch:jU},Symbol.toStringTag,{value:"Module"}));var QU="firebase",YU="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fn(QU,YU,"app");var wT={};const ET="@firebase/database",IT="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hk="";function Qk(n){Hk=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JU{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),rt(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Xl(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XU{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Pr(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yk=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new JU(e)}}catch{}return new XU},us=Yk("localStorage"),ZU=Yk("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Po=new Gd("@firebase/database"),ej=function(){let n=1;return function(){return n++}}(),Jk=function(n){const e=XD(n),t=new HD;t.update(e);const r=t.digest();return T_.encodeByteArray(r)},qu=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=qu.apply(null,r):typeof r=="object"?e+=rt(r):e+=r,e+=" "}return e};let xl=null,TT=!0;const tj=function(n,e){z(!0,"Can't turn on custom loggers persistently."),Po.logLevel=ae.VERBOSE,xl=Po.log.bind(Po)},xt=function(...n){if(TT===!0&&(TT=!1,xl===null&&ZU.get("logging_enabled")===!0&&tj()),xl){const e=qu.apply(null,n);xl(e)}},Gu=function(n){return function(...e){xt(n,...e)}},_g=function(...n){const e="FIREBASE INTERNAL ERROR: "+qu(...n);Po.error(e)},Rr=function(...n){const e=`FIREBASE FATAL ERROR: ${qu(...n)}`;throw Po.error(e),new Error(e)},Jt=function(...n){const e="FIREBASE WARNING: "+qu(...n);Po.warn(e)},nj=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Jt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Xk=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},rj=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},na="[MIN_NAME]",Ns="[MAX_NAME]",Aa=function(n,e){if(n===e)return 0;if(n===na||e===Ns)return-1;if(e===na||n===Ns)return 1;{const t=ST(n),r=ST(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},ij=function(n,e){return n===e?0:n<e?-1:1},el=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+rt(e))},$y=function(n){if(typeof n!="object"||n===null)return rt(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=rt(e[r]),t+=":",t+=$y(n[e[r]]);return t+="}",t},Zk=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function Xt(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const eP=function(n){z(!Xk(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let i,s,o,a,l;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=a+r,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const h=c.join("");let d="";for(l=0;l<64;l+=8){let p=parseInt(h.substr(l,8),2).toString(16);p.length===1&&(p="0"+p),d=d+p}return d.toLowerCase()},sj=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},oj=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function aj(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}const lj=new RegExp("^-?(0*)\\d{1,10}$"),uj=-2147483648,cj=2147483647,ST=function(n){if(lj.test(n)){const e=Number(n);if(e>=uj&&e<=cj)return e}return null},Ca=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Jt("Exception was thrown by user callback.",t),e},Math.floor(0))}},hj=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Nl=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dj{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Jt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fj{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(xt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Jt(e)}}class fh{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}fh.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy="5",tP="v",nP="s",rP="r",iP="f",sP=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,oP="ls",aP="p",yg="ac",lP="websocket",uP="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cP{constructor(e,t,r,i,s=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=us.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&us.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function pj(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function hP(n,e,t){z(typeof e=="string","typeof type must == string"),z(typeof t=="object","typeof params must == object");let r;if(e===lP)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===uP)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);pj(n)&&(t.ns=n.namespace);const i=[];return Xt(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mj{constructor(){this.counters_={}}incrementCounter(e,t=1){Pr(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return ND(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Up={},jp={};function Gy(n){const e=n.toString();return Up[e]||(Up[e]=new mj),Up[e]}function gj(n,e){const t=n.toString();return jp[t]||(jp[t]=e()),jp[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _j{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Ca(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AT="start",yj="close",vj="pLPCommand",wj="pRTLPCB",dP="id",fP="pw",pP="ser",Ej="cb",Ij="seg",Tj="ts",Sj="d",Aj="dframe",mP=1870,gP=30,Cj=mP-gP,Rj=25e3,kj=3e4;class _o{constructor(e,t,r,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gu(e),this.stats_=Gy(t),this.urlFn=l=>(this.appCheckToken&&(l[yg]=this.appCheckToken),hP(t,uP,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new _j(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(kj)),rj(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wy((...s)=>{const[o,a,l,c,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===AT)this.id=a,this.password=l;else if(o===yj)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[AT]="t",r[pP]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[Ej]=this.scriptTagHolder.uniqueCallbackIdentifier),r[tP]=qy,this.transportSessionId&&(r[nP]=this.transportSessionId),this.lastSessionId&&(r[oP]=this.lastSessionId),this.applicationId&&(r[aP]=this.applicationId),this.appCheckToken&&(r[yg]=this.appCheckToken),typeof location<"u"&&location.hostname&&sP.test(location.hostname)&&(r[rP]=iP);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){_o.forceAllow_=!0}static forceDisallow(){_o.forceDisallow_=!0}static isAvailable(){return _o.forceAllow_?!0:!_o.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!sj()&&!oj()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=rt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=SA(t),i=Zk(r,Cj);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[Aj]="t",r[dP]=e,r[fP]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=rt(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Wy{constructor(e,t,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ej(),window[vj+this.uniqueCallbackIdentifier]=e,window[wj+this.uniqueCallbackIdentifier]=t,this.myIFrame=Wy.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){xt("frame writing exception"),a.stack&&xt(a.stack),xt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||xt("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[dP]=this.myID,e[fP]=this.myPW,e[pP]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+gP+r.length<=mP;){const o=this.pendingSegs.shift();r=r+"&"+Ij+i+"="+o.seg+"&"+Tj+i+"="+o.ts+"&"+Sj+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(Rj)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{xt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pj=16384,xj=45e3;let ld=null;typeof MozWebSocket<"u"?ld=MozWebSocket:typeof WebSocket<"u"&&(ld=WebSocket);class Tn{constructor(e,t,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gu(this.connId),this.stats_=Gy(t),this.connURL=Tn.connectionURL_(t,o,a,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){const o={};return o[tP]=qy,typeof location<"u"&&location.hostname&&sP.test(location.hostname)&&(o[rP]=iP),t&&(o[nP]=t),r&&(o[oP]=r),i&&(o[yg]=i),s&&(o[aP]=s),hP(e,lP,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,us.set("previous_websocket_failure",!0);try{let r;BD(),this.mySock=new ld(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Tn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&ld!==null&&!Tn.forceDisallow_}static previouslyFailed(){return us.isInMemoryStorage||us.get("previous_websocket_failure")===!0}markConnectionHealthy(){us.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=Xl(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(z(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=rt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=Zk(t,Pj);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(xj))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Tn.responsesRequiredToBeHealthy=2;Tn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[_o,Tn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Tn&&Tn.isAvailable();let r=t&&!Tn.previouslyFailed();if(e.webSocketOnly&&(t||Jt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Tn];else{const i=this.transports_=[];for(const s of du.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);du.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}du.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nj=6e4,bj=5e3,Dj=10*1024,Vj=100*1024,Bp="t",CT="d",Oj="s",RT="r",Lj="e",kT="o",PT="a",xT="n",NT="p",Mj="h";class Fj{constructor(e,t,r,i,s,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gu("c:"+this.id+":"),this.transportManager_=new du(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Nl(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Vj?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Dj?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Bp in e){const t=e[Bp];t===PT?this.upgradeIfSecondaryHealthy_():t===RT?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===kT&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=el("t",e),r=el("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:NT,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:PT,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:xT,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=el("t",e),r=el("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=el(Bp,e);if(CT in e){const r=e[CT];if(t===Mj){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===xT){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Oj?this.onConnectionShutdown_(r):t===RT?this.onReset_(r):t===Lj?_g("Server Error: "+r):t===kT?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):_g("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),qy!==r&&Jt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),Nl(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Nj))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Nl(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(bj))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:NT,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(us.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _P{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yP{constructor(e){this.allowedEvents_=e,this.listeners_={},z(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){z(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud extends yP{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!C_()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ud}getInitialEvent(e){return z(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT=32,DT=768;class Ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ye(){return new Ae("")}function ce(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Pi(n){return n.pieces_.length-n.pieceNum_}function Ce(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new Ae(n.pieces_,e)}function vP(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Uj(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function wP(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function EP(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new Ae(e,0)}function it(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof Ae)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new Ae(t,0)}function le(n){return n.pieceNum_>=n.pieces_.length}function Ft(n,e){const t=ce(n),r=ce(e);if(t===null)return e;if(t===r)return Ft(Ce(n),Ce(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function IP(n,e){if(Pi(n)!==Pi(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function Sn(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(Pi(n)>Pi(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class jj{constructor(e,t){this.errorPrefix_=t,this.parts_=wP(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=qd(this.parts_[r]);TP(this)}}function Bj(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=qd(e),TP(n)}function zj(n){const e=n.parts_.pop();n.byteLength_-=qd(e),n.parts_.length>0&&(n.byteLength_-=1)}function TP(n){if(n.byteLength_>DT)throw new Error(n.errorPrefix_+"has a key path longer than "+DT+" bytes ("+n.byteLength_+").");if(n.parts_.length>bT)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+bT+") or object contains a cycle "+es(n))}function es(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ky extends yP{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Ky}getInitialEvent(e){return z(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=1e3,$j=60*5*1e3,VT=30*1e3,qj=1.3,Gj=3e4,Wj="server_kill",OT=3;class _r extends _P{constructor(e,t,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=_r.nextPersistentConnectionId_++,this.log_=Gu("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=tl,this.maxReconnectDelay_=$j,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ky.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ud.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(rt(s)),z(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const t=new $d,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),z(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;_r.warnOnListenWarnings_(l,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Pr(e,"w")){const r=Uo(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();Jt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||KD(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=VT)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=WD(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){const s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();const o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+rt(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):_g("Unrecognized action received from server: "+rt(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){z(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=tl,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=tl,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Gj&&(this.reconnectDelay_=tl),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*qj)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+_r.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(d){z(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?xt("getToken() completed but was canceled"):(xt("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,a=new Fj(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,g=>{Jt(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(Wj)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Jt(d),l())}}}interrupt(e){xt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){xt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Bm(this.interruptReasons_)&&(this.reconnectDelay_=tl,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>$y(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const r=new Ae(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){xt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=OT&&(this.reconnectDelay_=VT,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){xt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=OT&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Hk.replace(/\./g,"-")]=1,C_()?e["framework.cordova"]=1:PA()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ud.getInstance().currentlyOnline();return Bm(this.interruptReasons_)&&e}}_r.nextPersistentConnectionId_=0;_r.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new se(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new se(na,e),i=new se(na,t);return this.compare(r,i)!==0}minPost(){return se.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jc;class SP extends wf{static get __EMPTY_NODE(){return jc}static set __EMPTY_NODE(e){jc=e}compare(e,t){return Aa(e.name,t.name)}isDefinedOn(e){throw ua("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return se.MIN}maxPost(){return new se(Ns,jc)}makePost(e,t){return z(typeof e=="string","KeyIndex indexValue must always be a string."),new se(e,jc)}toString(){return".key"}}const xo=new SP;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class dt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??dt.RED,this.left=i??Kt.EMPTY_NODE,this.right=s??Kt.EMPTY_NODE}copy(e,t,r,i,s){return new dt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Kt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return Kt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}dt.RED=!0;dt.BLACK=!1;class Kj{copy(e,t,r,i,s){return this}insert(e,t,r){return new dt(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Kt{constructor(e,t=Kt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Kt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,dt.BLACK,null,null))}remove(e){return new Kt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,dt.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Bc(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Bc(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Bc(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Bc(this.root_,null,this.comparator_,!0,e)}}Kt.EMPTY_NODE=new Kj;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hj(n,e){return Aa(n.name,e.name)}function Hy(n,e){return Aa(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vg;function Qj(n){vg=n}const AP=function(n){return typeof n=="number"?"number:"+eP(n):"string:"+n},CP=function(n){if(n.isLeafNode()){const e=n.val();z(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Pr(e,".sv"),"Priority must be a string or number.")}else z(n===vg||n.isEmpty(),"priority of unexpected type.");z(n===vg||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let LT;class lt{constructor(e,t=lt.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,z(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),CP(this.priorityNode_)}static set __childrenNodeConstructor(e){LT=e}static get __childrenNodeConstructor(){return LT}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new lt(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:lt.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return le(e)?this:ce(e)===".priority"?this.priorityNode_:lt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:lt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=ce(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(z(r!==".priority"||Pi(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,lt.__childrenNodeConstructor.EMPTY_NODE.updateChild(Ce(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+AP(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=eP(this.value_):e+=this.value_,this.lazyHash_=Jk(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===lt.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof lt.__childrenNodeConstructor?-1:(z(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,i=lt.VALUE_TYPE_ORDER.indexOf(t),s=lt.VALUE_TYPE_ORDER.indexOf(r);return z(i>=0,"Unknown leaf type: "+t),z(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}lt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let RP,kP;function Yj(n){RP=n}function Jj(n){kP=n}class Xj extends wf{compare(e,t){const r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?Aa(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return se.MIN}maxPost(){return new se(Ns,new lt("[PRIORITY-POST]",kP))}makePost(e,t){const r=RP(e);return new se(t,new lt("[PRIORITY-POST]",r))}toString(){return".priority"}}const He=new Xj;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zj=Math.log(2);class e4{constructor(e){const t=s=>parseInt(Math.log(s)/Zj,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const cd=function(n,e,t,r){n.sort(e);const i=function(l,c){const h=c-l;let d,p;if(h===0)return null;if(h===1)return d=n[l],p=t?t(d):d,new dt(p,d.node,dt.BLACK,null,null);{const g=parseInt(h/2,10)+l,I=i(l,g),P=i(g+1,c);return d=n[g],p=t?t(d):d,new dt(p,d.node,dt.BLACK,I,P)}},s=function(l){let c=null,h=null,d=n.length;const p=function(I,P){const x=d-I,y=d;d-=I;const E=i(x+1,y),A=n[x],V=t?t(A):A;g(new dt(V,A.node,P,null,E))},g=function(I){c?(c.left=I,c=I):(h=I,c=I)};for(let I=0;I<l.count;++I){const P=l.nextBitIsOne(),x=Math.pow(2,l.count-(I+1));P?p(x,dt.BLACK):(p(x,dt.BLACK),p(x,dt.RED))}return h},o=new e4(n.length),a=s(o);return new Kt(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zp;const Zs={};class mr{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return z(Zs&&He,"ChildrenNode.ts has not been loaded"),zp=zp||new mr({".priority":Zs},{".priority":He}),zp}get(e){const t=Uo(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Kt?t:null}hasIndex(e){return Pr(this.indexSet_,e.toString())}addIndex(e,t){z(e!==xo,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=t.getIterator(se.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=cd(r,e.getCompare()):a=Zs;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new mr(h,c)}addToIndexes(e,t){const r=Bh(this.indexes_,(i,s)=>{const o=Uo(this.indexSet_,s);if(z(o,"Missing index implementation for "+s),i===Zs)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(se.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),cd(a,o.getCompare())}else return Zs;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new se(e.name,a))),l.insert(e,e.node)}});return new mr(r,this.indexSet_)}removeFromIndexes(e,t){const r=Bh(this.indexes_,i=>{if(i===Zs)return i;{const s=t.get(e.name);return s?i.remove(new se(e.name,s)):i}});return new mr(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nl;class X{constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&CP(this.priorityNode_),this.children_.isEmpty()&&z(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return nl||(nl=new X(new Kt(Hy),null,mr.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||nl}updatePriority(e){return this.children_.isEmpty()?this:new X(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?nl:t}}getChild(e){const t=ce(e);return t===null?this:this.getImmediateChild(t).getChild(Ce(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(z(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new se(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?nl:this.priorityNode_;return new X(i,o,s)}}updateChild(e,t){const r=ce(e);if(r===null)return t;{z(ce(e)!==".priority"||Pi(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Ce(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,i=0,s=!0;if(this.forEachChild(He,(o,a)=>{t[o]=a.val(e),r++,s&&X.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+AP(this.getPriority().val())+":"),this.forEachChild(He,(t,r)=>{const i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":Jk(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new se(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new se(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new se(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Wu?-1:0}withIndex(e){if(e===xo||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new X(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===xo||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(He),i=t.getIterator(He);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===xo?null:this.indexMap_.get(e.toString())}}X.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class t4 extends X{constructor(){super(new Kt(Hy),X.EMPTY_NODE,mr.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return X.EMPTY_NODE}isEmpty(){return!1}}const Wu=new t4;Object.defineProperties(se,{MIN:{value:new se(na,X.EMPTY_NODE)},MAX:{value:new se(Ns,Wu)}});SP.__EMPTY_NODE=X.EMPTY_NODE;lt.__childrenNodeConstructor=X;Qj(Wu);Jj(Wu);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n4=!0;function ft(n,e=null){if(n===null)return X.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),z(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new lt(t,ft(e))}if(!(n instanceof Array)&&n4){const t=[];let r=!1;if(Xt(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=ft(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),t.push(new se(o,l)))}}),t.length===0)return X.EMPTY_NODE;const s=cd(t,Hj,o=>o.name,Hy);if(r){const o=cd(t,He.getCompare());return new X(s,ft(e),new mr({".priority":o},{".priority":He}))}else return new X(s,ft(e),mr.Default)}else{let t=X.EMPTY_NODE;return Xt(n,(r,i)=>{if(Pr(n,r)&&r.substring(0,1)!=="."){const s=ft(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(ft(e))}}Yj(ft);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r4 extends wf{constructor(e){super(),this.indexPath_=e,z(!le(e)&&ce(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?Aa(e.name,t.name):s}makePost(e,t){const r=ft(e),i=X.EMPTY_NODE.updateChild(this.indexPath_,r);return new se(t,i)}maxPost(){const e=X.EMPTY_NODE.updateChild(this.indexPath_,Wu);return new se(Ns,e)}toString(){return wP(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i4 extends wf{compare(e,t){const r=e.node.compareTo(t.node);return r===0?Aa(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return se.MIN}maxPost(){return se.MAX}makePost(e,t){const r=ft(e);return new se(t,r)}toString(){return".value"}}const s4=new i4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PP(n){return{type:"value",snapshotNode:n}}function ra(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function fu(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function pu(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function o4(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qy{constructor(e){this.index_=e}updateChild(e,t,r,i,s,o){z(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(fu(t,a)):z(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ra(t,r)):o.trackChildChange(pu(t,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(He,(i,s)=>{t.hasChild(i)||r.trackChildChange(fu(i,s))}),t.isLeafNode()||t.forEachChild(He,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(pu(i,s,o))}else r.trackChildChange(ra(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?X.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e){this.indexedFilter_=new Qy(e.getIndex()),this.index_=e.getIndex(),this.startPost_=mu.getStartPost_(e),this.endPost_=mu.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,i,s,o){return this.matches(new se(t,r))||(r=X.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,i,s,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=X.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(X.EMPTY_NODE);const s=this;return t.forEachChild(He,(o,a)=>{s.matches(new se(o,a))||(i=i.updateImmediateChild(o,X.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a4{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{const r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new mu(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,i,s,o){return this.rangedFilter_.matches(new se(t,r))||(r=X.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,i,s,o):this.fullLimitUpdateChild_(e,t,r,s,o)}updateFullNode(e,t,r){let i;if(t.isLeafNode()||t.isEmpty())i=X.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=X.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(X.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,X.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(p,g)=>d(g,p)}else o=this.index_.getCompare();const a=e;z(a.numChildren()===this.limit_,"");const l=new se(t,r),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let p=i.getChildAfterChild(this.index_,c,this.reverse_);for(;p!=null&&(p.name===t||a.hasChild(p.name));)p=i.getChildAfterChild(this.index_,p,this.reverse_);const g=p==null?1:o(p,l);if(h&&!r.isEmpty()&&g>=0)return s!=null&&s.trackChildChange(pu(t,r,d)),a.updateImmediateChild(t,r);{s!=null&&s.trackChildChange(fu(t,d));const P=a.updateImmediateChild(t,X.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(s!=null&&s.trackChildChange(ra(p.name,p.node)),P.updateImmediateChild(p.name,p.node)):P}}else return r.isEmpty()?e:h&&o(c,l)>=0?(s!=null&&(s.trackChildChange(fu(c.name,c.node)),s.trackChildChange(ra(t,r))),a.updateImmediateChild(t,r).updateImmediateChild(c.name,X.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=He}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return z(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return z(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:na}hasEnd(){return this.endSet_}getIndexEndValue(){return z(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return z(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ns}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return z(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===He}copy(){const e=new Ef;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function l4(n){return n.loadsAllData()?new Qy(n.getIndex()):n.hasLimit()?new a4(n):new mu(n)}function MT(n){const e={};if(n.isDefault())return e;let t;if(n.index_===He?t="$priority":n.index_===s4?t="$value":n.index_===xo?t="$key":(z(n.index_ instanceof r4,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=rt(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=rt(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+rt(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=rt(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+rt(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function FT(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==He&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd extends _P{constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Gu("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(z(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=hd.getListenId_(e,r),a={};this.listens_[o]=a;const l=MT(e._queryParams);this.restRequest_(s+".json",l,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(s,d,!1,r),Uo(this.listens_,o)===a){let p;c?c===401?p="permission_denied":p="rest_error:"+c:p="ok",i(p,null)}})}unlisten(e,t){const r=hd.getListenId_(e,t);delete this.listens_[r]}get(e){const t=MT(e._queryParams),r=e._path.toString(),i=new $d;return this.restRequest_(r+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ca(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Xl(a.responseText)}catch{Jt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&Jt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u4{constructor(){this.rootNode_=X.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dd(){return{value:null,children:new Map}}function xP(n,e,t){if(le(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=ce(e);n.children.has(r)||n.children.set(r,dd());const i=n.children.get(r);e=Ce(e),xP(i,e,t)}}function wg(n,e,t){n.value!==null?t(e,n.value):c4(n,(r,i)=>{const s=new Ae(e.toString()+"/"+r);wg(i,s,t)})}function c4(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h4{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Xt(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UT=10*1e3,d4=30*1e3,f4=5*60*1e3;class p4{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new h4(e);const r=UT+(d4-UT)*Math.random();Nl(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;Xt(e,(i,s)=>{s>0&&Pr(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),Nl(this.reportStats_.bind(this),Math.floor(Math.random()*2*f4))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var An;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(An||(An={}));function NP(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Yy(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Jy(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=An.ACK_USER_WRITE,this.source=NP()}operationForChild(e){if(le(this.path)){if(this.affectedTree.value!=null)return z(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Ae(e));return new fd(ye(),t,this.revert)}}else return z(ce(this.path)===e,"operationForChild called for unrelated child."),new fd(Ce(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,t){this.source=e,this.path=t,this.type=An.LISTEN_COMPLETE}operationForChild(e){return le(this.path)?new gu(this.source,ye()):new gu(this.source,Ce(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=An.OVERWRITE}operationForChild(e){return le(this.path)?new bs(this.source,ye(),this.snap.getImmediateChild(e)):new bs(this.source,Ce(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=An.MERGE}operationForChild(e){if(le(this.path)){const t=this.children.subtree(new Ae(e));return t.isEmpty()?null:t.value?new bs(this.source,ye(),t.value):new _u(this.source,ye(),t)}else return z(ce(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new _u(this.source,Ce(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(le(e))return this.isFullyInitialized()&&!this.filtered_;const t=ce(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class m4{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function g4(n,e,t,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(o4(o.childName,o.snapshotNode))}),rl(n,i,"child_removed",e,r,t),rl(n,i,"child_added",e,r,t),rl(n,i,"child_moved",s,r,t),rl(n,i,"child_changed",e,r,t),rl(n,i,"value",e,r,t),i}function rl(n,e,t,r,i,s){const o=r.filter(a=>a.type===t);o.sort((a,l)=>y4(n,a,l)),o.forEach(a=>{const l=_4(n,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function _4(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function y4(n,e,t){if(e.childName==null||t.childName==null)throw ua("Should only compare child_ events.");const r=new se(e.childName,e.snapshotNode),i=new se(t.childName,t.snapshotNode);return n.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(n,e){return{eventCache:n,serverCache:e}}function bl(n,e,t,r){return If(new xi(e,t,r),n.serverCache)}function bP(n,e,t,r){return If(n.eventCache,new xi(e,t,r))}function pd(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ds(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $p;const v4=()=>($p||($p=new Kt(ij)),$p);class xe{constructor(e,t=v4()){this.value=e,this.children=t}static fromObject(e){let t=new xe(null);return Xt(e,(r,i)=>{t=t.set(new Ae(r),i)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ye(),value:this.value};if(le(e))return null;{const r=ce(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(Ce(e),t);return s!=null?{path:it(new Ae(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(le(e))return this;{const t=ce(e),r=this.children.get(t);return r!==null?r.subtree(Ce(e)):new xe(null)}}set(e,t){if(le(e))return new xe(t,this.children);{const r=ce(e),s=(this.children.get(r)||new xe(null)).set(Ce(e),t),o=this.children.insert(r,s);return new xe(this.value,o)}}remove(e){if(le(e))return this.children.isEmpty()?new xe(null):new xe(null,this.children);{const t=ce(e),r=this.children.get(t);if(r){const i=r.remove(Ce(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new xe(null):new xe(this.value,s)}else return this}}get(e){if(le(e))return this.value;{const t=ce(e),r=this.children.get(t);return r?r.get(Ce(e)):null}}setTree(e,t){if(le(e))return t;{const r=ce(e),s=(this.children.get(r)||new xe(null)).setTree(Ce(e),t);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new xe(this.value,o)}}fold(e){return this.fold_(ye(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(it(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,ye(),t)}findOnPath_(e,t,r){const i=this.value?r(t,this.value):!1;if(i)return i;if(le(e))return null;{const s=ce(e),o=this.children.get(s);return o?o.findOnPath_(Ce(e),it(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ye(),t)}foreachOnPath_(e,t,r){if(le(e))return this;{this.value&&r(t,this.value);const i=ce(e),s=this.children.get(i);return s?s.foreachOnPath_(Ce(e),it(t,i),r):new xe(null)}}foreach(e){this.foreach_(ye(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(it(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.writeTree_=e}static empty(){return new Nn(new xe(null))}}function Dl(n,e,t){if(le(e))return new Nn(new xe(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=Ft(i,e);return s=s.updateChild(o,t),new Nn(n.writeTree_.set(i,s))}else{const i=new xe(t),s=n.writeTree_.setTree(e,i);return new Nn(s)}}}function jT(n,e,t){let r=n;return Xt(t,(i,s)=>{r=Dl(r,it(e,i),s)}),r}function BT(n,e){if(le(e))return Nn.empty();{const t=n.writeTree_.setTree(e,new xe(null));return new Nn(t)}}function Eg(n,e){return zs(n,e)!=null}function zs(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ft(t.path,e)):null}function zT(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(He,(r,i)=>{e.push(new se(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new se(r,i.value))}),e}function fi(n,e){if(le(e))return n;{const t=zs(n,e);return t!=null?new Nn(new xe(t)):new Nn(n.writeTree_.subtree(e))}}function Ig(n){return n.writeTree_.isEmpty()}function ia(n,e){return DP(ye(),n.writeTree_,e)}function DP(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(z(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=DP(it(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(it(n,".priority"),r)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(n,e){return MP(e,n)}function w4(n,e,t,r,i){z(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=Dl(n.visibleWrites,e,t)),n.lastWriteId=r}function E4(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function I4(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);z(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&T4(a,r.path)?i=!1:Sn(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return S4(n),!0;if(r.snap)n.visibleWrites=BT(n.visibleWrites,r.path);else{const a=r.children;Xt(a,l=>{n.visibleWrites=BT(n.visibleWrites,it(r.path,l))})}return!0}else return!1}function T4(n,e){if(n.snap)return Sn(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Sn(it(n.path,t),e))return!0;return!1}function S4(n){n.visibleWrites=VP(n.allWrites,A4,ye()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function A4(n){return n.visible}function VP(n,e,t){let r=Nn.empty();for(let i=0;i<n.length;++i){const s=n[i];if(e(s)){const o=s.path;let a;if(s.snap)Sn(t,o)?(a=Ft(t,o),r=Dl(r,a,s.snap)):Sn(o,t)&&(a=Ft(o,t),r=Dl(r,ye(),s.snap.getChild(a)));else if(s.children){if(Sn(t,o))a=Ft(t,o),r=jT(r,a,s.children);else if(Sn(o,t))if(a=Ft(o,t),le(a))r=jT(r,ye(),s.children);else{const l=Uo(s.children,ce(a));if(l){const c=l.getChild(Ce(a));r=Dl(r,ye(),c)}}}else throw ua("WriteRecord should have .snap or .children")}}return r}function OP(n,e,t,r,i){if(!r&&!i){const s=zs(n.visibleWrites,e);if(s!=null)return s;{const o=fi(n.visibleWrites,e);if(Ig(o))return t;if(t==null&&!Eg(o,ye()))return null;{const a=t||X.EMPTY_NODE;return ia(o,a)}}}else{const s=fi(n.visibleWrites,e);if(!i&&Ig(s))return t;if(!i&&t==null&&!Eg(s,ye()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(Sn(c.path,e)||Sn(e,c.path))},a=VP(n.allWrites,o,e),l=t||X.EMPTY_NODE;return ia(a,l)}}}function C4(n,e,t){let r=X.EMPTY_NODE;const i=zs(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(He,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){const s=fi(n.visibleWrites,e);return t.forEachChild(He,(o,a)=>{const l=ia(fi(s,new Ae(o)),a);r=r.updateImmediateChild(o,l)}),zT(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=fi(n.visibleWrites,e);return zT(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function R4(n,e,t,r,i){z(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=it(e,t);if(Eg(n.visibleWrites,s))return null;{const o=fi(n.visibleWrites,s);return Ig(o)?i.getChild(t):ia(o,i.getChild(t))}}function k4(n,e,t,r){const i=it(e,t),s=zs(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){const o=fi(n.visibleWrites,i);return ia(o,r.getNode().getImmediateChild(t))}else return null}function P4(n,e){return zs(n.visibleWrites,e)}function x4(n,e,t,r,i,s,o){let a;const l=fi(n.visibleWrites,e),c=zs(l,ye());if(c!=null)a=c;else if(t!=null)a=ia(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),p=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let g=p.getNext();for(;g&&h.length<i;)d(g,r)!==0&&h.push(g),g=p.getNext();return h}else return[]}function N4(){return{visibleWrites:Nn.empty(),allWrites:[],lastWriteId:-1}}function md(n,e,t,r){return OP(n.writeTree,n.treePath,e,t,r)}function Xy(n,e){return C4(n.writeTree,n.treePath,e)}function $T(n,e,t,r){return R4(n.writeTree,n.treePath,e,t,r)}function gd(n,e){return P4(n.writeTree,it(n.treePath,e))}function b4(n,e,t,r,i,s){return x4(n.writeTree,n.treePath,e,t,r,i,s)}function Zy(n,e,t){return k4(n.writeTree,n.treePath,e,t)}function LP(n,e){return MP(it(n.treePath,e),n.writeTree)}function MP(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D4{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;z(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),z(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,pu(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,fu(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,ra(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,pu(r,e.snapshotNode,i.oldSnap));else throw ua("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V4{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const FP=new V4;class ev{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new xi(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Zy(this.writes_,e,r)}}getChildAfterChild(e,t,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ds(this.viewCache_),s=b4(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function O4(n){return{filter:n}}function L4(n,e){z(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),z(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function M4(n,e,t,r,i){const s=new D4;let o,a;if(t.type===An.OVERWRITE){const c=t;c.source.fromUser?o=Tg(n,e,c.path,c.snap,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!le(c.path),o=_d(n,e,c.path,c.snap,r,i,a,s))}else if(t.type===An.MERGE){const c=t;c.source.fromUser?o=U4(n,e,c.path,c.children,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Sg(n,e,c.path,c.children,r,i,a,s))}else if(t.type===An.ACK_USER_WRITE){const c=t;c.revert?o=z4(n,e,c.path,r,i,s):o=j4(n,e,c.path,c.affectedTree,r,i,s)}else if(t.type===An.LISTEN_COMPLETE)o=B4(n,e,t.path,r,s);else throw ua("Unknown operation type: "+t.type);const l=s.getChanges();return F4(e,o,l),{viewCache:o,changes:l}}function F4(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=pd(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(PP(pd(e)))}}function UP(n,e,t,r,i,s){const o=e.eventCache;if(gd(r,t)!=null)return e;{let a,l;if(le(t))if(z(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ds(e),h=c instanceof X?c:X.EMPTY_NODE,d=Xy(r,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const c=md(r,Ds(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=ce(t);if(c===".priority"){z(Pi(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const d=$T(r,t,h,l);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=Ce(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const p=$T(r,t,o.getNode(),l);p!=null?d=o.getNode().getImmediateChild(c).updateChild(h,p):d=o.getNode().getImmediateChild(c)}else d=Zy(r,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,h,i,s):a=o.getNode()}}return bl(e,a,o.isFullyInitialized()||le(t),n.filter.filtersNodes())}}function _d(n,e,t,r,i,s,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(le(t))c=h.updateFullNode(l.getNode(),r,null);else if(h.filtersNodes()&&!l.isFiltered()){const g=l.getNode().updateChild(t,r);c=h.updateFullNode(l.getNode(),g,null)}else{const g=ce(t);if(!l.isCompleteForPath(t)&&Pi(t)>1)return e;const I=Ce(t),x=l.getNode().getImmediateChild(g).updateChild(I,r);g===".priority"?c=h.updatePriority(l.getNode(),x):c=h.updateChild(l.getNode(),g,x,I,FP,null)}const d=bP(e,c,l.isFullyInitialized()||le(t),h.filtersNodes()),p=new ev(i,d,s);return UP(n,d,t,i,p,a)}function Tg(n,e,t,r,i,s,o){const a=e.eventCache;let l,c;const h=new ev(i,e,s);if(le(t))c=n.filter.updateFullNode(e.eventCache.getNode(),r,o),l=bl(e,c,!0,n.filter.filtersNodes());else{const d=ce(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),r),l=bl(e,c,a.isFullyInitialized(),a.isFiltered());else{const p=Ce(t),g=a.getNode().getImmediateChild(d);let I;if(le(p))I=r;else{const P=h.getCompleteChild(d);P!=null?vP(p)===".priority"&&P.getChild(EP(p)).isEmpty()?I=P:I=P.updateChild(p,r):I=X.EMPTY_NODE}if(g.equals(I))l=e;else{const P=n.filter.updateChild(a.getNode(),d,I,p,h,o);l=bl(e,P,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function qT(n,e){return n.eventCache.isCompleteForChild(e)}function U4(n,e,t,r,i,s,o){let a=e;return r.foreach((l,c)=>{const h=it(t,l);qT(e,ce(h))&&(a=Tg(n,a,h,c,i,s,o))}),r.foreach((l,c)=>{const h=it(t,l);qT(e,ce(h))||(a=Tg(n,a,h,c,i,s,o))}),a}function GT(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Sg(n,e,t,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;le(t)?c=r:c=new xe(null).setTree(t,r);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,p)=>{if(h.hasChild(d)){const g=e.serverCache.getNode().getImmediateChild(d),I=GT(n,g,p);l=_d(n,l,new Ae(d),I,i,s,o,a)}}),c.children.inorderTraversal((d,p)=>{const g=!e.serverCache.isCompleteForChild(d)&&p.value===null;if(!h.hasChild(d)&&!g){const I=e.serverCache.getNode().getImmediateChild(d),P=GT(n,I,p);l=_d(n,l,new Ae(d),P,i,s,o,a)}}),l}function j4(n,e,t,r,i,s,o){if(gd(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(le(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return _d(n,e,t,l.getNode().getChild(t),i,s,a,o);if(le(t)){let c=new xe(null);return l.getNode().forEachChild(xo,(h,d)=>{c=c.set(new Ae(h),d)}),Sg(n,e,t,c,i,s,a,o)}else return e}else{let c=new xe(null);return r.foreach((h,d)=>{const p=it(t,h);l.isCompleteForPath(p)&&(c=c.set(h,l.getNode().getChild(p)))}),Sg(n,e,t,c,i,s,a,o)}}function B4(n,e,t,r,i){const s=e.serverCache,o=bP(e,s.getNode(),s.isFullyInitialized()||le(t),s.isFiltered());return UP(n,o,t,r,FP,i)}function z4(n,e,t,r,i,s){let o;if(gd(r,t)!=null)return e;{const a=new ev(r,e,i),l=e.eventCache.getNode();let c;if(le(t)||ce(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=md(r,Ds(e));else{const d=e.serverCache.getNode();z(d instanceof X,"serverChildren would be complete if leaf node"),h=Xy(r,d)}h=h,c=n.filter.updateFullNode(l,h,s)}else{const h=ce(t);let d=Zy(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=l.getImmediateChild(h)),d!=null?c=n.filter.updateChild(l,h,d,Ce(t),a,s):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,X.EMPTY_NODE,Ce(t),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=md(r,Ds(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||gd(r,ye())!=null,bl(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $4{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Qy(r.getIndex()),s=l4(r);this.processor_=O4(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(X.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(X.EMPTY_NODE,a.getNode(),null),h=new xi(l,o.isFullyInitialized(),i.filtersNodes()),d=new xi(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=If(d,h),this.eventGenerator_=new m4(this.query_)}get query(){return this.query_}}function q4(n){return n.viewCache_.serverCache.getNode()}function G4(n){return pd(n.viewCache_)}function W4(n,e){const t=Ds(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!le(e)&&!t.getImmediateChild(ce(e)).isEmpty())?t.getChild(e):null}function WT(n){return n.eventRegistrations_.length===0}function K4(n,e){n.eventRegistrations_.push(e)}function KT(n,e,t){const r=[];if(t){z(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(t,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<n.eventRegistrations_.length;++s){const o=n.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return r}function HT(n,e,t,r){e.type===An.MERGE&&e.source.queryId!==null&&(z(Ds(n.viewCache_),"We should always have a full cache before handling merges"),z(pd(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,s=M4(n.processor_,i,e,t,r);return L4(n.processor_,s.viewCache),z(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,jP(n,s.changes,s.viewCache.eventCache.getNode(),null)}function H4(n,e){const t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(He,(s,o)=>{r.push(ra(s,o))}),t.isFullyInitialized()&&r.push(PP(t.getNode())),jP(n,r,t.getNode(),e)}function jP(n,e,t,r){const i=r?[r]:n.eventRegistrations_;return g4(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yd;class BP{constructor(){this.views=new Map}}function Q4(n){z(!yd,"__referenceConstructor has already been defined"),yd=n}function Y4(){return z(yd,"Reference.ts has not been loaded"),yd}function J4(n){return n.views.size===0}function tv(n,e,t,r){const i=e.source.queryId;if(i!==null){const s=n.views.get(i);return z(s!=null,"SyncTree gave us an op for an invalid query."),HT(s,e,t,r)}else{let s=[];for(const o of n.views.values())s=s.concat(HT(o,e,t,r));return s}}function zP(n,e,t,r,i){const s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=md(t,i?r:null),l=!1;a?l=!0:r instanceof X?(a=Xy(t,r),l=!1):(a=X.EMPTY_NODE,l=!1);const c=If(new xi(a,l,!1),new xi(r,i,!1));return new $4(e,c)}return o}function X4(n,e,t,r,i,s){const o=zP(n,e,r,i,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),K4(o,t),H4(o,t)}function Z4(n,e,t,r){const i=e._queryIdentifier,s=[];let o=[];const a=Ni(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(KT(c,t,r)),WT(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(KT(l,t,r)),WT(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!Ni(n)&&s.push(new(Y4())(e._repo,e._path)),{removed:s,events:o}}function $P(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function pi(n,e){let t=null;for(const r of n.views.values())t=t||W4(r,e);return t}function qP(n,e){if(e._queryParams.loadsAllData())return Sf(n);{const r=e._queryIdentifier;return n.views.get(r)}}function GP(n,e){return qP(n,e)!=null}function Ni(n){return Sf(n)!=null}function Sf(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vd;function eB(n){z(!vd,"__referenceConstructor has already been defined"),vd=n}function tB(){return z(vd,"Reference.ts has not been loaded"),vd}let nB=1;class QT{constructor(e){this.listenProvider_=e,this.syncPointTree_=new xe(null),this.pendingWriteTree_=N4(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function WP(n,e,t,r,i){return w4(n.pendingWriteTree_,e,t,r,i),i?Hu(n,new bs(NP(),e,t)):[]}function cs(n,e,t=!1){const r=E4(n.pendingWriteTree_,e);if(I4(n.pendingWriteTree_,e)){let s=new xe(null);return r.snap!=null?s=s.set(ye(),!0):Xt(r.children,o=>{s=s.set(new Ae(o),!0)}),Hu(n,new fd(r.path,s,t))}else return[]}function Ku(n,e,t){return Hu(n,new bs(Yy(),e,t))}function rB(n,e,t){const r=xe.fromObject(t);return Hu(n,new _u(Yy(),e,r))}function iB(n,e){return Hu(n,new gu(Yy(),e))}function sB(n,e,t){const r=rv(n,t);if(r){const i=iv(r),s=i.path,o=i.queryId,a=Ft(s,e),l=new gu(Jy(o),a);return sv(n,s,l)}else return[]}function KP(n,e,t,r,i=!1){const s=e._path,o=n.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||GP(o,e))){const l=Z4(o,e,t,r);J4(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(p=>p._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(s,(p,g)=>Ni(g));if(h&&!d){const p=n.syncPointTree_.subtree(s);if(!p.isEmpty()){const g=uB(p);for(let I=0;I<g.length;++I){const P=g[I],x=P.query,y=JP(n,P);n.listenProvider_.startListening(Vl(x),yu(n,x),y.hashFn,y.onComplete)}}}!d&&c.length>0&&!r&&(h?n.listenProvider_.stopListening(Vl(e),null):c.forEach(p=>{const g=n.queryToTagMap.get(Af(p));n.listenProvider_.stopListening(Vl(p),g)}))}cB(n,c)}return a}function HP(n,e,t,r){const i=rv(n,r);if(i!=null){const s=iv(i),o=s.path,a=s.queryId,l=Ft(o,e),c=new bs(Jy(a),l,t);return sv(n,o,c)}else return[]}function oB(n,e,t,r){const i=rv(n,r);if(i){const s=iv(i),o=s.path,a=s.queryId,l=Ft(o,e),c=xe.fromObject(t),h=new _u(Jy(a),l,c);return sv(n,o,h)}else return[]}function aB(n,e,t,r=!1){const i=e._path;let s=null,o=!1;n.syncPointTree_.foreachOnPath(i,(p,g)=>{const I=Ft(p,i);s=s||pi(g,I),o=o||Ni(g)});let a=n.syncPointTree_.get(i);a?(o=o||Ni(a),s=s||pi(a,ye())):(a=new BP,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=X.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((g,I)=>{const P=pi(I,ye());P&&(s=s.updateImmediateChild(g,P))}));const c=GP(a,e);if(!c&&!e._queryParams.loadsAllData()){const p=Af(e);z(!n.queryToTagMap.has(p),"View does not exist, but we have a tag");const g=hB();n.queryToTagMap.set(p,g),n.tagToQueryMap.set(g,p)}const h=Tf(n.pendingWriteTree_,i);let d=X4(a,e,t,h,s,l);if(!c&&!o&&!r){const p=qP(a,e);d=d.concat(dB(n,e,p))}return d}function nv(n,e,t){const i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=Ft(o,e),c=pi(a,l);if(c)return c});return OP(i,e,s,t,!0)}function lB(n,e){const t=e._path;let r=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const d=Ft(c,t);r=r||pi(h,d)});let i=n.syncPointTree_.get(t);i?r=r||pi(i,ye()):(i=new BP,n.syncPointTree_=n.syncPointTree_.set(t,i));const s=r!=null,o=s?new xi(r,!0,!1):null,a=Tf(n.pendingWriteTree_,e._path),l=zP(i,e,a,s?o.getNode():X.EMPTY_NODE,s);return G4(l)}function Hu(n,e){return QP(e,n.syncPointTree_,null,Tf(n.pendingWriteTree_,ye()))}function QP(n,e,t,r){if(le(n.path))return YP(n,e,t,r);{const i=e.get(ye());t==null&&i!=null&&(t=pi(i,ye()));let s=[];const o=ce(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=LP(r,o);s=s.concat(QP(a,l,c,h))}return i&&(s=s.concat(tv(i,n,r,t))),s}}function YP(n,e,t,r){const i=e.get(ye());t==null&&i!=null&&(t=pi(i,ye()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=LP(r,o),h=n.operationForChild(o);h&&(s=s.concat(YP(h,a,l,c)))}),i&&(s=s.concat(tv(i,n,r,t))),s}function JP(n,e){const t=e.query,r=yu(n,t);return{hashFn:()=>(q4(e)||X.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?sB(n,t._path,r):iB(n,t._path);{const s=aj(i,t);return KP(n,t,null,s)}}}}function yu(n,e){const t=Af(e);return n.queryToTagMap.get(t)}function Af(n){return n._path.toString()+"$"+n._queryIdentifier}function rv(n,e){return n.tagToQueryMap.get(e)}function iv(n){const e=n.indexOf("$");return z(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new Ae(n.substr(0,e))}}function sv(n,e,t){const r=n.syncPointTree_.get(e);z(r,"Missing sync point for query tag that we're tracking");const i=Tf(n.pendingWriteTree_,e);return tv(r,t,i,null)}function uB(n){return n.fold((e,t,r)=>{if(t&&Ni(t))return[Sf(t)];{let i=[];return t&&(i=$P(t)),Xt(r,(s,o)=>{i=i.concat(o)}),i}})}function Vl(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(tB())(n._repo,n._path):n}function cB(n,e){for(let t=0;t<e.length;++t){const r=e[t];if(!r._queryParams.loadsAllData()){const i=Af(r),s=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(s)}}}function hB(){return nB++}function dB(n,e,t){const r=e._path,i=yu(n,e),s=JP(n,t),o=n.listenProvider_.startListening(Vl(e),i,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(r);if(i)z(!Ni(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,d)=>{if(!le(c)&&h&&Ni(h))return[Sf(h).query];{let p=[];return h&&(p=p.concat($P(h).map(g=>g.query))),Xt(d,(g,I)=>{p=p.concat(I)}),p}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(Vl(h),yu(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ov(t)}node(){return this.node_}}class av{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=it(this.path_,e);return new av(this.syncTree_,t)}node(){return nv(this.syncTree_,this.path_)}}const fB=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},YT=function(n,e,t){if(!n||typeof n!="object")return n;if(z(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return pB(n[".sv"],e,t);if(typeof n[".sv"]=="object")return mB(n[".sv"],e);z(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},pB=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:z(!1,"Unexpected server value: "+n)}},mB=function(n,e,t){n.hasOwnProperty("increment")||z(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&z(!1,"Unexpected increment value: "+r);const i=e.node();if(z(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},gB=function(n,e,t,r){return lv(e,new av(t,n),r)},XP=function(n,e,t){return lv(n,new ov(e),t)};function lv(n,e,t){const r=n.getPriority().val(),i=YT(r,e.getImmediateChild(".priority"),t);let s;if(n.isLeafNode()){const o=n,a=YT(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new lt(a,ft(i)):n}else{const o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new lt(i))),o.forEachChild(He,(a,l)=>{const c=lv(l,e.getImmediateChild(a),t);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uv{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function cv(n,e){let t=e instanceof Ae?e:new Ae(e),r=n,i=ce(t);for(;i!==null;){const s=Uo(r.node.children,i)||{children:{},childCount:0};r=new uv(i,r,s),t=Ce(t),i=ce(t)}return r}function Ra(n){return n.node.value}function ZP(n,e){n.node.value=e,Ag(n)}function ex(n){return n.node.childCount>0}function _B(n){return Ra(n)===void 0&&!ex(n)}function Cf(n,e){Xt(n.node.children,(t,r)=>{e(new uv(t,n,r))})}function tx(n,e,t,r){t&&e(n),Cf(n,i=>{tx(i,e,!0)})}function yB(n,e,t){let r=n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Qu(n){return new Ae(n.parent===null?n.name:Qu(n.parent)+"/"+n.name)}function Ag(n){n.parent!==null&&vB(n.parent,n.name,n)}function vB(n,e,t){const r=_B(t),i=Pr(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,Ag(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Ag(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wB=/[\[\].#$\/\u0000-\u001F\u007F]/,EB=/[\[\].#$\u0000-\u001F\u007F]/,qp=10*1024*1024,nx=function(n){return typeof n=="string"&&n.length!==0&&!wB.test(n)},rx=function(n){return typeof n=="string"&&n.length!==0&&!EB.test(n)},IB=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),rx(n)},TB=function(n,e,t,r){hv(R_(n,"value"),e,t)},hv=function(n,e,t){const r=t instanceof Ae?new jj(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+es(r));if(typeof e=="function")throw new Error(n+"contains a function "+es(r)+" with contents = "+e.toString());if(Xk(e))throw new Error(n+"contains "+e.toString()+" "+es(r));if(typeof e=="string"&&e.length>qp/3&&qd(e)>qp)throw new Error(n+"contains a string greater than "+qp+" utf8 bytes "+es(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Xt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!nx(o)))throw new Error(n+" contains an invalid key ("+o+") "+es(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Bj(r,o),hv(n,a,r),zj(r)}),i&&s)throw new Error(n+' contains ".value" child '+es(r)+" in addition to actual children.")}},dv=function(n,e,t,r){if(!rx(t))throw new Error(R_(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},SB=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),dv(n,e,t)},ix=function(n,e){if(ce(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},AB=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!nx(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!IB(t))throw new Error(R_(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CB{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function sx(n,e){let t=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();t!==null&&!IP(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function Hn(n,e,t){sx(n,t),RB(n,r=>Sn(r,e)||Sn(e,r))}function RB(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const i=n.eventLists_[r];if(i){const s=i.path;e(s)?(kB(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function kB(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();xl&&xt("event: "+t.toString()),Ca(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PB="repo_interrupt",xB=25;class NB{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new CB,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=dd(),this.transactionQueueTree_=new uv,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function bB(n,e,t){if(n.stats_=Gy(n.repoInfo_),n.forceRestClient_||hj())n.server_=new hd(n.repoInfo_,(r,i,s,o)=>{JT(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>XT(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{rt(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new _r(n.repoInfo_,e,(r,i,s,o)=>{JT(n,r,i,s,o)},r=>{XT(n,r)},r=>{VB(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=gj(n.repoInfo_,()=>new p4(n.stats_,n.server_)),n.infoData_=new u4,n.infoSyncTree_=new QT({startListening:(r,i,s,o)=>{let a=[];const l=n.infoData_.getNode(r._path);return l.isEmpty()||(a=Ku(n.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),pv(n,"connected",!1),n.serverSyncTree_=new QT({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(a,l)=>{const c=o(a,l);Hn(n.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function DB(n){const t=n.infoData_.getNode(new Ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function fv(n){return fB({timestamp:DB(n)})}function JT(n,e,t,r,i){n.dataUpdateCount++;const s=new Ae(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){const l=Bh(t,c=>ft(c));o=oB(n.serverSyncTree_,s,l,i)}else{const l=ft(t);o=HP(n.serverSyncTree_,s,l,i)}else if(r){const l=Bh(t,c=>ft(c));o=rB(n.serverSyncTree_,s,l)}else{const l=ft(t);o=Ku(n.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=kf(n,s)),Hn(n.eventQueue_,a,o)}function XT(n,e){pv(n,"connected",e),e===!1&&MB(n)}function VB(n,e){Xt(e,(t,r)=>{pv(n,t,r)})}function pv(n,e,t){const r=new Ae("/.info/"+e),i=ft(t);n.infoData_.updateSnapshot(r,i);const s=Ku(n.infoSyncTree_,r,i);Hn(n.eventQueue_,r,s)}function ox(n){return n.nextWriteId_++}function OB(n,e,t){const r=lB(n.serverSyncTree_,e);return r!=null?Promise.resolve(r):n.server_.get(e).then(i=>{const s=ft(i).withIndex(e._queryParams.getIndex());aB(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Ku(n.serverSyncTree_,e._path,s);else{const a=yu(n.serverSyncTree_,e);o=HP(n.serverSyncTree_,e._path,s,a)}return Hn(n.eventQueue_,e._path,o),KP(n.serverSyncTree_,e,t,null,!0),s},i=>(Rf(n,"get for query "+rt(e)+" failed: "+i),Promise.reject(new Error(i))))}function LB(n,e,t,r,i){Rf(n,"set",{path:e.toString(),value:t,priority:r});const s=fv(n),o=ft(t,r),a=nv(n.serverSyncTree_,e),l=XP(o,a,s),c=ox(n),h=WP(n.serverSyncTree_,e,l,c,!0);sx(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(p,g)=>{const I=p==="ok";I||Jt("set at "+e+" failed: "+p);const P=cs(n.serverSyncTree_,c,!I);Hn(n.eventQueue_,e,P),UB(n,i,p,g)});const d=hx(n,e);kf(n,d),Hn(n.eventQueue_,d,[])}function MB(n){Rf(n,"onDisconnectEvents");const e=fv(n),t=dd();wg(n.onDisconnect_,ye(),(i,s)=>{const o=gB(i,s,n.serverSyncTree_,e);xP(t,i,o)});let r=[];wg(t,ye(),(i,s)=>{r=r.concat(Ku(n.serverSyncTree_,i,s));const o=hx(n,i);kf(n,o)}),n.onDisconnect_=dd(),Hn(n.eventQueue_,ye(),r)}function FB(n){n.persistentConnection_&&n.persistentConnection_.interrupt(PB)}function Rf(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),xt(t,...e)}function UB(n,e,t,r){e&&Ca(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function ax(n,e,t){return nv(n.serverSyncTree_,e,t)||X.EMPTY_NODE}function mv(n,e=n.transactionQueueTree_){if(e||Pf(n,e),Ra(e)){const t=ux(n,e);z(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&jB(n,Qu(e),t)}else ex(e)&&Cf(e,t=>{mv(n,t)})}function jB(n,e,t){const r=t.map(c=>c.currentWriteId),i=ax(n,e,r);let s=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];z(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=Ft(e,h.path);s=s.updateChild(d,h.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Rf(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let p=0;p<t.length;p++)t[p].status=2,h=h.concat(cs(n.serverSyncTree_,t[p].currentWriteId)),t[p].onComplete&&d.push(()=>t[p].onComplete(null,!0,t[p].currentOutputSnapshotResolved)),t[p].unwatcher();Pf(n,cv(n.transactionQueueTree_,e)),mv(n,n.transactionQueueTree_),Hn(n.eventQueue_,e,h);for(let p=0;p<d.length;p++)Ca(d[p])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{Jt("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}kf(n,e)}},o)}function kf(n,e){const t=lx(n,e),r=Qu(t),i=ux(n,t);return BB(n,i,r),r}function BB(n,e,t){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Ft(t,l.path);let h=!1,d;if(z(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,d=l.abortReason,i=i.concat(cs(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=xB)h=!0,d="maxretry",i=i.concat(cs(n.serverSyncTree_,l.currentWriteId,!0));else{const p=ax(n,l.path,o);l.currentInputSnapshot=p;const g=e[a].update(p.val());if(g!==void 0){hv("transaction failed: Data returned ",g,l.path);let I=ft(g);typeof g=="object"&&g!=null&&Pr(g,".priority")||(I=I.updatePriority(p.getPriority()));const x=l.currentWriteId,y=fv(n),E=XP(I,p,y);l.currentOutputSnapshotRaw=I,l.currentOutputSnapshotResolved=E,l.currentWriteId=ox(n),o.splice(o.indexOf(x),1),i=i.concat(WP(n.serverSyncTree_,l.path,E,l.currentWriteId,l.applyLocally)),i=i.concat(cs(n.serverSyncTree_,x,!0))}else h=!0,d="nodata",i=i.concat(cs(n.serverSyncTree_,l.currentWriteId,!0))}Hn(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}Pf(n,n.transactionQueueTree_);for(let a=0;a<r.length;a++)Ca(r[a]);mv(n,n.transactionQueueTree_)}function lx(n,e){let t,r=n.transactionQueueTree_;for(t=ce(e);t!==null&&Ra(r)===void 0;)r=cv(r,t),e=Ce(e),t=ce(e);return r}function ux(n,e){const t=[];return cx(n,e,t),t.sort((r,i)=>r.order-i.order),t}function cx(n,e,t){const r=Ra(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);Cf(e,i=>{cx(n,i,t)})}function Pf(n,e){const t=Ra(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,ZP(e,t.length>0?t:void 0)}Cf(e,r=>{Pf(n,r)})}function hx(n,e){const t=Qu(lx(n,e)),r=cv(n.transactionQueueTree_,e);return yB(r,i=>{Gp(n,i)}),Gp(n,r),tx(r,i=>{Gp(n,i)}),t}function Gp(n,e){const t=Ra(e);if(t){const r=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(z(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(z(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(cs(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?ZP(e,void 0):t.length=s+1,Hn(n.eventQueue_,Qu(e),i);for(let o=0;o<r.length;o++)Ca(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zB(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function $B(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Jt(`Invalid query segment '${t}' in query '${n}'`)}return e}const ZT=function(n,e){const t=qB(n),r=t.namespace;t.domain==="firebase.com"&&Rr(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&Rr("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||nj();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new cP(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new Ae(t.pathString)}},qB=function(n){let e="",t="",r="",i="",s="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(i=zB(n.substring(h,d)));const p=$B(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")t="localhost";else if(g.split(".").length<=2)t=g;else{const I=e.indexOf(".");r=e.substring(0,I).toLowerCase(),t=e.substring(I+1),s=r}"ns"in p&&(s=p.ns)}return{host:e,port:l,domain:t,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GB{constructor(e,t,r,i){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+rt(this.snapshot.exportVal())}}class WB{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KB{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return z(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return le(this._path)?null:vP(this._path)}get ref(){return new Jn(this._repo,this._path)}get _queryIdentifier(){const e=FT(this._queryParams),t=$y(e);return t==="{}"?"default":t}get _queryObject(){return FT(this._queryParams)}isEqual(e){if(e=me(e),!(e instanceof xf))return!1;const t=this._repo===e._repo,r=IP(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Uj(this._path)}}class Jn extends xf{constructor(e,t){super(e,t,new Ef,!1)}get parent(){const e=EP(this._path);return e===null?null:new Jn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class sa{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new Ae(e),r=wd(this.ref,e);return new sa(this._node.getChild(t),r,He)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new sa(i,wd(this.ref,r),He)))}hasChild(e){const t=new Ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function HB(n,e){return n=me(n),n._checkNotDeleted("ref"),e!==void 0?wd(n._root,e):n._root}function wd(n,e){return n=me(n),ce(n._path)===null?SB("child","path",e):dv("child","path",e),new Jn(n._repo,it(n._path,e))}function QB(n,e){n=me(n),ix("set",n._path),TB("set",e,n._path);const t=new $d;return LB(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function YB(n){n=me(n);const e=new KB(()=>{}),t=new gv(e);return OB(n._repo,n,t).then(r=>new sa(r,new Jn(n._repo,n._path),n._queryParams.getIndex()))}class gv{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const r=t._queryParams.getIndex();return new GB("value",this,new sa(e.snapshotNode,new Jn(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new WB(this,e,t):null}matches(e){return e instanceof gv?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}Q4(Jn);eB(Jn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JB="FIREBASE_DATABASE_EMULATOR_HOST",Cg={};let XB=!1;function ZB(n,e,t,r){n.repoInfo_=new cP(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),r&&(n.authTokenProvider_=r)}function dx(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||Rr("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),xt("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=ZT(s,i),a=o.repoInfo,l;typeof process<"u"&&wT&&(l=wT[JB]),l?(s=`http://${l}?ns=${a.namespace}`,o=ZT(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new fj(n.name,n.options,e);AB("Invalid Firebase Database URL",o),le(o.path)||Rr("Database URL must point to the root of a Firebase Database (not including a child path).");const h=tz(a,n,c,new dj(n.name,t));return new fx(h,n)}function ez(n,e){const t=Cg[e];(!t||t[n.key]!==n)&&Rr(`Database ${e}(${n.repoInfo_}) has already been deleted.`),FB(n),delete t[n.key]}function tz(n,e,t,r){let i=Cg[e.name];i||(i={},Cg[e.name]=i);let s=i[n.toURLString()];return s&&Rr("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new NB(n,XB,t,r),i[n.toURLString()]=s,s}class fx{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(bB(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Jn(this._repo,ye())),this._rootInternal}_delete(){return this._rootInternal!==null&&(ez(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rr("Cannot call "+e+" on a deleted database.")}}function px(n=Wd(),e){const t=Ls(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const r=S_("database");r&&mx(t,...r)}return t}function mx(n,e,t,r={}){n=me(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Rr("Cannot call useEmulator() after instance has already been initialized.");const i=n._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Rr('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new fh(fh.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:A_(r.mockUserToken,n.app.options.projectId);s=new fh(o)}ZB(i,e,t,s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nz(n){Qk(Li),vi(new Ir("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return dx(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),fn(ET,IT,n),fn(ET,IT,"esm2017")}_r.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};_r.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};nz();const gx=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:sa,Database:fx,_QueryImpl:xf,_QueryParams:Ef,_ReferenceImpl:Jn,_repoManagerDatabaseFromApp:dx,_setSDKVersion:Qk,_validatePathString:dv,_validateWritablePath:ix,child:wd,connectDatabaseEmulator:mx,get:YB,getDatabase:px,ref:HB,set:QB},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _x="firebasestorage.googleapis.com",rz="storageBucket",iz=2*60*1e3,sz=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends Yn{constructor(e,t,r=0){super(Wp(e),`Firebase Storage: ${t} (${Wp(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Xn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Wp(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Qn;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Qn||(Qn={}));function Wp(n){return"storage/"+n}function oz(){const n="An unknown error occurred, please check the error payload for server response.";return new Xn(Qn.UNKNOWN,n)}function az(){return new Xn(Qn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function lz(){return new Xn(Qn.CANCELED,"User canceled the upload/download.")}function uz(n){return new Xn(Qn.INVALID_URL,"Invalid URL '"+n+"'.")}function cz(n){return new Xn(Qn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function eS(n){return new Xn(Qn.INVALID_ARGUMENT,n)}function yx(){return new Xn(Qn.APP_DELETED,"The Firebase app was deleted.")}function hz(n){return new Xn(Qn.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Cn.makeFromUrl(e,t)}catch{return new Cn(e,"")}if(r.path==="")return r;throw cz(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(V){V.path.charAt(V.path.length-1)==="/"&&(V.path_=V.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(V){V.path_=decodeURIComponent(V.path)}const h="v[A-Za-z0-9_]+",d=t.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",g=new RegExp(`^https?://${d}/${h}/b/${i}/o${p}`,"i"),I={bucket:1,path:3},P=t===_x?"(?:storage.googleapis.com|storage.cloud.google.com)":t,x="([^?#]*)",y=new RegExp(`^https?://${P}/${i}/${x}`,"i"),A=[{regex:a,indices:l,postModify:s},{regex:g,indices:I,postModify:c},{regex:y,indices:{bucket:1,path:2},postModify:c}];for(let V=0;V<A.length;V++){const F=A[V],M=F.regex.exec(e);if(M){const S=M[F.indices.bucket];let v=M[F.indices.path];v||(v=""),r=new Cn(S,v),F.postModify(r);break}}if(r==null)throw uz(e);return r}}class dz{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fz(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function l(){return a===2}let c=!1;function h(...x){c||(c=!0,e.apply(null,x))}function d(x){i=setTimeout(()=>{i=null,n(g,l())},x)}function p(){s&&clearTimeout(s)}function g(x,...y){if(c){p();return}if(x){p(),h.call(null,x,...y);return}if(l()||o){p(),h.call(null,x,...y);return}r<64&&(r*=2);let A;a===1?(a=2,A=0):A=(r+Math.random())*1e3,d(A)}let I=!1;function P(x){I||(I=!0,p(),!c&&(i!==null?(x||(a=2),clearTimeout(i),d(0)):x||(a=1)))}return d(0),s=setTimeout(()=>{o=!0,P(!0)},t),P}function pz(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mz(n){return n!==void 0}function tS(n,e,t,r){if(r<e)throw eS(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw eS(`Invalid value for '${n}'. Expected ${t} or less.`)}function gz(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Ed;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Ed||(Ed={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _z(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yz{constructor(e,t,r,i,s,o,a,l,c,h,d,p=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=d,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((g,I)=>{this.resolve_=g,this.reject_=I,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new zc(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===Ed.NO_ERROR,l=s.getStatus();if(!a||_z(l,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Ed.ABORT;r(!1,new zc(!1,null,h));return}const c=this.successCodes_.indexOf(l)!==-1;r(!0,new zc(c,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());mz(l)?s(l):s()}catch(l){o(l)}else if(a!==null){const l=oz();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?yx():lz();o(l)}else{const l=az();o(l)}};this.canceled_?t(!1,new zc(!1,null,!0)):this.backoffId_=fz(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&pz(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class zc{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function vz(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function wz(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Ez(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Iz(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Tz(n,e,t,r,i,s,o=!0){const a=gz(n.urlParams),l=n.url+a,c=Object.assign({},n.headers);return Ez(c,e),vz(c,t),wz(c,s),Iz(c,r),new yz(l,n.method,c,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sz(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Az(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e,t){this._service=e,t instanceof Cn?this._location=t:this._location=Cn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Id(e,t)}get root(){const e=new Cn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Az(this._location.path)}get storage(){return this._service}get parent(){const e=Sz(this._location.path);if(e===null)return null;const t=new Cn(this._location.bucket,e);return new Id(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw hz(e)}}function nS(n,e){const t=e==null?void 0:e[rz];return t==null?null:Cn.makeFromBucketSpec(t,n)}function Cz(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:A_(i,n.app.options.projectId))}class Rz{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=_x,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=iz,this._maxUploadRetryTime=sz,this._requests=new Set,i!=null?this._bucket=Cn.makeFromBucketSpec(i,this._host):this._bucket=nS(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Cn.makeFromBucketSpec(this._url,e):this._bucket=nS(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){tS("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){tS("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Id(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new dz(yx());{const o=Tz(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const rS="@firebase/storage",iS="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vx="storage";function kz(n=Wd(),e){n=me(n);const r=Ls(n,vx).getImmediate({identifier:e}),i=S_("storage");return i&&Pz(r,...i),r}function Pz(n,e,t,r={}){Cz(n,e,t,r)}function xz(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Rz(t,r,i,e,Li)}function Nz(){vi(new Ir(vx,xz,"PUBLIC").setMultipleInstances(!0)),fn(rS,iS,""),fn(rS,iS,"esm2017")}Nz();const wx={apiKey:"AIzaSyAAm1ylv5H4McTNvOut_0UdgiAFdxBBumI",authDomain:"my-app-e7f8c.firebaseapp.com",projectId:"my-app-e7f8c",storageBucket:"my-app-e7f8c.firebasestorage.app",messagingSenderId:"622104139221",appId:"1:622104139221:android:294ad10f9eed7350acd95c",databaseURL:"https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app"},Rg="bangexx01@gmail.com",Yu=OA(wx),mi=_L(Yu),$s=Tk(Yu),bz=px(Yu),Dz=kz(Yu),_v=Object.freeze(Object.defineProperty({__proto__:null,PEMILIK:Rg,app:Yu,auth:mi,db:$s,firebaseConfig:wx,rtdb:bz,storage:Dz},Symbol.toStringTag,{value:"Module"})),Ex=[{grup:"HOME",isi:[["dashboard","▦","Dashboard"]]},{grup:"KELOLA",isi:[["user","👥","User"],["room","🎤","Room"],["gift","🎁","Gift"],["cashback","🎰","Cashback gift"],["frame","🖼️","Frame & banner"],["aset","✨","Aset & VIP"],["asetvps","🗃️","Aset di VPS"],["emote","😀","Emote room"],["kirim","🎁","Kirim ke user"],["staf","👥","Staf & seller"],["cs","💬","Customer Service"],["laporan","🚩","Laporan user"],["wallet","🪙","Coin & reset"],["cekin","📅","Cek in harian"],["vipharga","💎","Harga VIP"],["family","🏰","Family"]]},{grup:"GAME",isi:[["katalog","🎮","Katalog game"],["pasang","🔗","Pasang game"],["bet","🎲","Bet game"],["greedy","🎰","Greedy King"],["fruit","🍉","Crazy Fruit"],["roket","🚀","Hadiah roket"],["reward","🏆","Reward room"]]},{grup:"DATA",isi:[["database","🗄️","Database"],["latar","🖼️","Background tab"],["pengumuman","📢","Pengumuman resmi"],["log","📜","Log admin"]]},{grup:"CONFIG",isi:[["pengaturan","⚙️","Pengaturan"]]}],Vz=Ex.flatMap(n=>n.isi).reduce((n,[e,,t])=>({...n,[e]:t}),{}),Oz="modulepreload",Lz=function(n,e){return new URL(n,e).href},sS={},bi=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=Lz(c,r),c in sS)return;sS[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!r)for(let I=o.length-1;I>=0;I--){const P=o[I];if(P.href===c&&(!h||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const g=document.createElement("link");if(g.rel=h?"stylesheet":Oz,h||(g.as="script"),g.crossOrigin="",g.href=c,l&&g.setAttribute("nonce",l),document.head.appendChild(g),h)return new Promise((I,P)=>{g.addEventListener("load",I),g.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Mz=45e3,hs=new Map;async function Fz(n,e){return(await Bk(Ok(ky($s,n),Lk(e)))).docs.map(r=>({id:r.id,...r.data()}))}function oS(n,e=500){const t=n+"|"+e,r=hs.get(t);if(r!=null&&r.janji)return r.janji;if(r&&Date.now()-r.waktu<Mz)return Promise.resolve(r.isi);const i=Fz(n,e).then(s=>(hs.set(t,{isi:s,waktu:Date.now(),janji:null}),s)).catch(()=>r?r.isi:[]);return hs.set(t,{isi:(r==null?void 0:r.isi)||[],waktu:(r==null?void 0:r.waktu)||0,janji:i}),i}function Ln(n,e=500){const t=n+"|"+e,[r,i]=ne.useState(()=>{var a;return((a=hs.get(t))==null?void 0:a.isi)||[]}),[s,o]=ne.useState(!hs.get(t));return ne.useEffect(()=>{var l;let a=!0;return o(!((l=hs.get(t))!=null&&l.waktu)),oS(n,e).then(c=>{a&&(i(c),o(!1))}),()=>{a=!1}},[n,e]),{isi:r,memuat:s,segarkan:()=>(hs.delete(t),oS(n,e))}}const Ne=n=>new Intl.NumberFormat("id-ID").format(Number(n)||0),ph=n=>{if(!n)return"—";const e=n.toDate?n.toDate():new Date(n);return isNaN(e)?"—":e.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})};async function No(n,e=""){var t;try{const{addDoc:r,serverTimestamp:i}=await bi(async()=>{const{addDoc:o,serverTimestamp:a}=await Promise.resolve().then(()=>zy);return{addDoc:o,serverTimestamp:a}},void 0,import.meta.url),{auth:s}=await bi(async()=>{const{auth:o}=await Promise.resolve().then(()=>_v);return{auth:o}},void 0,import.meta.url);await r(ky($s,"adminLogs"),{admin:((t=s.currentUser)==null?void 0:t.email)||"?",aksi:n,rincian:e,waktu:i()})}catch{}}async function Kp(n,e){const t=await Uy(Ea($s,n,e)).catch(()=>null);return t!=null&&t.exists()?t.data():null}async function yv(n,e){const{deleteDoc:t}=await bi(async()=>{const{deleteDoc:r}=await Promise.resolve().then(()=>zy);return{deleteDoc:r}},void 0,import.meta.url);await t(Ea($s,n,e))}async function Uz(n,e,t){const{setDoc:r}=await bi(async()=>{const{setDoc:i}=await Promise.resolve().then(()=>zy);return{setDoc:i}},void 0,import.meta.url);await r(Ea($s,n,e),t)}async function aS(n){const{getDatabase:e,ref:t,get:r}=await bi(async()=>{const{getDatabase:o,ref:a,get:l}=await Promise.resolve().then(()=>gx);return{getDatabase:o,ref:a,get:l}},void 0,import.meta.url),{app:i}=await bi(async()=>{const{app:o}=await Promise.resolve().then(()=>_v);return{app:o}},void 0,import.meta.url),s=await r(t(e(i),n));return s.exists()?s.val():null}async function Hp(n,e){const{getDatabase:t,ref:r,set:i}=await bi(async()=>{const{getDatabase:o,ref:a,set:l}=await Promise.resolve().then(()=>gx);return{getDatabase:o,ref:a,set:l}},void 0,import.meta.url),{app:s}=await bi(async()=>{const{app:o}=await Promise.resolve().then(()=>_v);return{app:o}},void 0,import.meta.url);await i(r(t(s),n),e)}function jz({sumber:n,hari:e,satuan:t}){const r=ne.useMemo(()=>{const l=new Date;l.setHours(0,0,0,0);const c=[];for(let h=e-1;h>=0;h--){const d=new Date(l.getTime()-h*864e5),p=new Date(d.getTime()+864e5);c.push({label:d.getDate()+"/"+(d.getMonth()+1),n:n.filter(g=>g>=d.getTime()&&g<p.getTime()).length})}return c},[n,e]),i=r.reduce((l,c)=>l+c.n,0),s=Math.max(1,...r.map(l=>l.n));if(!i)return w.jsx("div",{className:"kosong",children:"Belum ada data untuk rentang ini."});const o=200,a=100/r.length;return w.jsxs(w.Fragment,{children:[w.jsxs("div",{style:{color:"#9a9cab",fontSize:12,padding:"0 4px 8px"},children:[i," ",t," · puncak ",s]}),w.jsxs("svg",{viewBox:"0 0 100 "+(o+28),preserveAspectRatio:"none",style:{width:"100%",height:240,display:"block"},children:[w.jsx("defs",{children:w.jsxs("linearGradient",{id:"gradBatang",x1:"0",y1:"0",x2:"0",y2:"1",children:[w.jsx("stop",{offset:"0%",stopColor:"#e8538f"}),w.jsx("stop",{offset:"100%",stopColor:"#83d8ae"})]})}),r.map((l,c)=>{const h=Math.max(2,Math.round(l.n/s*o));return w.jsxs("g",{children:[w.jsx("rect",{x:c*a+a*.18+"%",y:o-h,width:a*.64+"%",height:h,rx:"2",fill:"url(#gradBatang)"}),w.jsx("text",{x:(c+.5)*a+"%",y:o+16,fill:"#9a9cab",fontSize:"10",textAnchor:"middle",children:l.label}),l.n>0&&w.jsx("text",{x:(c+.5)*a+"%",y:o-h-6,fill:"#d1d3e0",fontSize:"10",textAnchor:"middle",children:l.n})]},l.label+c)})]})]})}function Bz(){const[n,e]=ne.useState(7),t=Ln("userIds",500),r=Ln("rooms",500),i=Ln("gifts",200),s=Ln("banned",200),o=Ln("userReports",300),a=Ln("adminLogs",400),l=t.isi.filter(y=>Number(y.vip||0)>0).length,c=new Set(s.isi.map(y=>y.id||y.uid)).size,h=r.isi.filter(y=>y.locked).length,d=[["people_alt",Ne(t.isi.length),"Total user"],["workspace_premium",Ne(l),"Total user VIP"],["group_off",Ne(c),"User diblokir"],["mic",Ne(r.isi.length),"Total room"],["lock",Ne(h),"Room terkunci"],["flag",Ne(o.isi.length),"Laporan user"],["redeem",Ne(i.isi.length),"Gift aktif"],["bolt",String(a.isi.length),"Catatan admin"]],p=a.isi.map(y=>{var E;return Number(((E=y.waktu)==null?void 0:E.seconds)||0)*1e3}).filter(y=>y>0),g=t.isi.map(y=>Number(y.createdAt||y.dibuat||0)).filter(y=>y>0),I=p.length>=g.length,P=I?p:g,x=[...a.isi].sort((y,E)=>{var A,V;return(((A=E.waktu)==null?void 0:A.seconds)||0)-(((V=y.waktu)==null?void 0:V.seconds)||0)}).slice(0,12);return w.jsxs(w.Fragment,{children:[w.jsx("div",{className:"kartu",children:w.jsx("div",{className:"dasborKartu",children:d.map(([y,E,A])=>w.jsxs("div",{className:"kartuAngka",children:[w.jsx("div",{className:"ikonKartu",children:y}),w.jsxs("div",{children:[w.jsx("b",{children:E}),w.jsx("span",{children:A})]})]},A))})}),w.jsxs("div",{className:"panel",children:[w.jsxs("div",{className:"panelAtas",children:[w.jsxs("h3",{children:[I?"Aktivitas admin ":"Pendaftaran user ",n," hari terakhir"]}),w.jsx("div",{className:"filter",children:[7,30].map(y=>w.jsxs("div",{className:"pil"+(n===y?" on":""),onClick:()=>e(y),children:[y," hari"]},y))})]}),w.jsx("div",{style:{padding:"6px 4px 0"},children:w.jsx(jz,{sumber:P,hari:n,satuan:I?"catatan":"user"})})]}),w.jsxs("div",{className:"panel",children:[w.jsxs("div",{className:"panelAtas",children:[w.jsx("h3",{children:"Aktivitas admin terakhir"}),w.jsx("div",{className:"filter",children:w.jsxs("div",{className:"pil on",children:[a.isi.length," catatan"]})})]}),x.length?w.jsxs("table",{children:[w.jsx("thead",{children:w.jsxs("tr",{children:[w.jsx("th",{children:"WAKTU"}),w.jsx("th",{children:"ADMIN"}),w.jsx("th",{children:"AKSI"}),w.jsx("th",{children:"RINCIAN"})]})}),w.jsx("tbody",{children:x.map((y,E)=>w.jsxs("tr",{children:[w.jsx("td",{children:ph(y.waktu)}),w.jsx("td",{children:y.admin}),w.jsx("td",{children:y.aksi}),w.jsx("td",{children:y.rincian})]},E))})]}):w.jsx("div",{className:"kosong",children:"Belum ada aktivitas tercatat."})]}),w.jsxs("div",{className:"panel",children:[w.jsxs("div",{className:"panelAtas",children:[w.jsx("h3",{children:"Room terbaru"}),w.jsx("div",{className:"filter",children:w.jsx("div",{className:"pil on",children:w.jsx("a",{href:"#room",children:"Lihat semua"})})})]}),r.isi.length?w.jsxs("table",{children:[w.jsx("thead",{children:w.jsxs("tr",{children:[w.jsx("th",{children:"ROOM"}),w.jsx("th",{children:"PEMILIK"}),w.jsx("th",{children:"KUNCI"})]})}),w.jsx("tbody",{children:r.isi.slice(0,8).map(y=>w.jsxs("tr",{children:[w.jsx("td",{children:y.name||y.title||y.id}),w.jsxs("td",{children:[String(y.ownerUid||"").slice(0,10),"…"]}),w.jsx("td",{children:y.locked?w.jsx("span",{className:"tag blokir",children:"terkunci"}):w.jsx("span",{className:"tag aktif",children:"terbuka"})})]},y.id))})]}):w.jsx("div",{className:"kosong",children:"Belum ada room."})]})]})}const kg="viza-toast";function In(n,e=!1){window.dispatchEvent(new CustomEvent(kg,{detail:{pesan:n,gagal:e}}))}function zz(){const[n,e]=ne.useState(null);return ne.useEffect(()=>{let t;const r=i=>{e(i.detail),clearTimeout(t),t=setTimeout(()=>e(null),3600)};return window.addEventListener(kg,r),()=>{window.removeEventListener(kg,r),clearTimeout(t)}},[]),n?w.jsx("div",{className:"toast tampil"+(n.gagal?" gagal":""),children:n.pesan}):null}const vv=({isi:n})=>w.jsx("div",{className:"kartu",children:n.map(([e,t])=>w.jsxs("div",{className:"stat",children:[w.jsx("b",{children:e}),w.jsx("span",{children:t})]},t))}),Td=({judul:n,sub:e,aksi:t,kaki:r,children:i})=>w.jsxs("div",{className:"panel",children:[w.jsxs("div",{className:"panelAtas",children:[w.jsxs("h3",{children:[n,e?w.jsxs("span",{className:"sub",children:[" ",e]}):null]}),t?w.jsx("div",{className:"filter",children:t}):null]}),i,r?w.jsx("div",{className:"kaki",children:r}):null]}),Ix=({on:n,onClick:e,children:t})=>w.jsx("div",{className:"pil"+(n?" on":""),onClick:e,children:t}),Fn=({jenis:n="aktif",children:e})=>w.jsx("span",{className:"tag "+n,children:e}),Tx=({children:n})=>w.jsx("div",{className:"kosong",children:n}),wv=({nilai:n,onUbah:e,placeholder:t})=>w.jsxs("label",{className:"kotakCari",children:[w.jsx("span",{children:"⌕"}),w.jsx("input",{value:n,onChange:r=>e(r.target.value),placeholder:t}),n?w.jsx("button",{type:"button",onClick:()=>e(""),title:"Bersihkan",children:"×"}):null]});function $z({buka:n,judul:e,onTutup:t,children:r,kaki:i}){return ne.useEffect(()=>{if(!n)return;const s=o=>o.key==="Escape"&&t();return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[n,t]),n?w.jsx("div",{className:"laciLatar",onClick:t,children:w.jsxs("div",{className:"laci",onClick:s=>s.stopPropagation(),children:[w.jsxs("div",{className:"laciAtas",children:[w.jsx("h3",{children:e}),w.jsx("button",{onClick:t,title:"Tutup",children:"×"})]}),w.jsx("div",{className:"laciIsi",children:r}),i?w.jsx("div",{className:"laciKaki",children:i}):null]})}):null}function Ev({buka:n,judul:e,pesan:t,tombol:r="Lanjut",onYa:i,onTidak:s,sibuk:o}){return n?w.jsx("div",{className:"laciLatar",onClick:s,children:w.jsxs("div",{className:"kotakKonfirmasi",onClick:a=>a.stopPropagation(),children:[w.jsx("h3",{children:e}),w.jsx("p",{children:t}),w.jsxs("div",{className:"barisTombol",children:[w.jsx("button",{className:"polos",onClick:s,disabled:o,children:"Batal"}),w.jsx("button",{className:"utama",onClick:i,disabled:o,children:o?"Memproses…":r})]})]})}):null}const vu=({baris:n=6})=>w.jsx("div",{style:{padding:14},children:Array.from({length:n}).map((e,t)=>w.jsx("div",{className:"rangka",style:{width:100-t%3*12+"%"}},t))});function Sd({kolom:n,baris:e,urut:t,onUrut:r,kosong:i="Tidak ada data."}){const[s,o]=t||[null,1],a=l=>s===l?o===1?" ▲":" ▼":"";return e.length?w.jsx("div",{className:"bungkusTabel",children:w.jsxs("table",{children:[w.jsx("thead",{children:w.jsx("tr",{children:n.map(l=>w.jsxs("th",{onClick:l.urut&&r?()=>r(l.kunci):void 0,style:l.urut?{cursor:"pointer"}:void 0,children:[l.label,l.urut?a(l.kunci):""]},l.kunci))})}),w.jsx("tbody",{children:e.map((l,c)=>w.jsx("tr",{children:n.map(h=>w.jsx("td",{children:h.sel(l)},h.kunci))},l.__kunci??c))})]})}):w.jsx(Tx,{children:i})}function Ad(n,e=null){const[t,r]=ne.useState(e);return[ne.useMemo(()=>{if(!t)return n;const[o,a]=t;return[...n].sort((l,c)=>{const h=l[o],d=c[o];return typeof h=="number"||typeof d=="number"?((Number(h)||0)-(Number(d)||0))*a:String(h??"").localeCompare(String(d??""),"id")*a})},[n,t]),t,o=>r(a=>a&&a[0]===o?[o,-a[1]]:[o,1])]}function qz(){var M,S,v,C,k,T,N,R,Vt,Dn;const n=Ln("userIds",500),e=Ln("banned",300),[t,r]=ne.useState(""),[i,s]=ne.useState("semua"),[o,a]=ne.useState(null),[l,c]=ne.useState(null),[h,d]=ne.useState(null),[p,g]=ne.useState(!1),I=ne.useMemo(()=>new Set(e.isi.map(Y=>Y.id)),[e.isi]),P=ne.useMemo(()=>{const Y=t.trim().toLowerCase();return n.isi.map(fe=>{const G=fe.uid||fe.id;return{__kunci:G,uid:G,nama:fe.name||fe.nama||"(tanpa nama)",foto:fe.avatar||fe.photo||"",vip:Number(fe.vip||0),koin:Number(fe.coins??fe.coin??0),dibuat:Number(fe.createdAt||fe.dibuat||0),blok:I.has(fe.id)||I.has(G)}}).filter(fe=>Y&&!fe.nama.toLowerCase().includes(Y)&&!fe.uid.toLowerCase().includes(Y)?!1:i==="aktif"?!fe.blok:i==="blokir"?fe.blok:i==="vip"?fe.vip>0:!0)},[n.isi,I,t,i]),[x,y,E]=Ad(P,["nama",1]),A=async Y=>{a(Y),c(null);const[fe,G,ee]=await Promise.all([Kp("users",Y.uid),Kp("wallets",Y.uid),Kp("banned",Y.uid)]);c({profil:fe,dompet:G,ban:ee})},V=Y=>{d({judul:Y.blok?"Buka blokir "+Y.nama+"?":"Blokir "+Y.nama+"?",pesan:Y.blok?"User bisa memakai aplikasi Viza lagi setelah dibuka.":"User tidak bisa memakai aplikasi sampai blokirnya dibuka.",tombol:Y.blok?"Buka blokir":"Blokir",jalan:async()=>{var fe;g(!0);try{Y.blok?(await yv("banned",Y.uid),await No("Buka blokir",`${Y.nama} · ${Y.uid}`),In(`${Y.nama} dibuka blokirnya`)):(await Uz("banned",Y.uid,{uid:Y.uid,nama:Y.nama,alasan:"diblokir admin panel",oleh:((fe=mi.currentUser)==null?void 0:fe.email)||"?",waktu:new Date}),await No("Blokir user",`${Y.nama} · ${Y.uid}`),In(`${Y.nama} diblokir`)),await e.segarkan(),d(null),a(null)}catch(G){In("Gagal: "+(G.code||G.message),!0)}finally{g(!1)}}})},F=[{kunci:"nama",label:"USER",urut:!0,sel:Y=>w.jsxs("div",{className:"user",children:[w.jsx("div",{className:"mini",children:Y.foto?w.jsx("img",{src:Y.foto,alt:""}):(Y.nama[0]||"?").toUpperCase()}),w.jsxs("div",{children:[w.jsx("div",{children:Y.nama}),w.jsx("div",{className:"catatan",style:{padding:0,marginTop:2},children:Y.vip?"VIP "+Y.vip:"gratis"})]})]})},{kunci:"uid",label:"UID",sel:Y=>w.jsxs("span",{title:Y.uid,children:[Y.uid.slice(0,14),"…"]})},{kunci:"koin",label:"KOIN",urut:!0,sel:Y=>Ne(Y.koin)},{kunci:"dibuat",label:"TERDAFTAR",urut:!0,sel:Y=>Y.dibuat?ph(Y.dibuat):"—"},{kunci:"blok",label:"STATUS",sel:Y=>Y.blok?w.jsx(Fn,{jenis:"blokir",children:"diblokir"}):w.jsx(Fn,{children:"aktif"})},{kunci:"aksi",label:"AKSI",sel:Y=>w.jsxs("span",{className:"aksiBaris",children:[w.jsx("button",{className:"aksi",onClick:()=>A(Y),children:"Detail"}),w.jsx("button",{className:"aksi",onClick:()=>V(Y),children:Y.blok?"Buka blokir":"Blokir"})]})}];return w.jsxs(w.Fragment,{children:[w.jsx(vv,{isi:[[Ne(n.isi.length),"User terdaftar"],[Ne(n.isi.length-P.filter(Y=>Y.blok).length),"Tidak diblokir"],[Ne(I.size),"Diblokir"],[Ne(n.isi.filter(Y=>Number(Y.vip||0)>0).length),"User VIP"]]}),w.jsxs(Td,{judul:"Daftar user",aksi:w.jsx(wv,{nilai:t,onUbah:r,placeholder:"Cari nama atau UID…"}),kaki:`${P.length} user ditampilkan dari ${n.isi.length} terdaftar`,children:[w.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["aktif","Aktif"],["vip","VIP"],["blokir","Diblokir"]].map(([Y,fe])=>w.jsx(Ix,{on:i===Y,onClick:()=>s(Y),children:fe},Y))}),n.memuat&&!n.isi.length?w.jsx(vu,{}):w.jsx(Sd,{kolom:F,baris:x,urut:y,onUrut:E,kosong:"Tidak ada user yang cocok."})]}),w.jsx($z,{buka:!!o,judul:o?"Detail "+o.nama:"",onTutup:()=>{a(null),c(null)},kaki:o?w.jsx(w.Fragment,{children:w.jsx("button",{className:"polos",onClick:()=>V(o),children:o.blok?"Buka blokir":"Blokir user"})}):null,children:l?w.jsxs(w.Fragment,{children:[w.jsxs("div",{className:"petak",style:{padding:0,marginBottom:12},children:[w.jsxs("div",{className:"kotakMini",children:[w.jsx("b",{children:Ne(((M=l.dompet)==null?void 0:M.coins)??((S=l.profil)==null?void 0:S.coins)??0)}),w.jsx("span",{children:"Koin dompet"})]}),w.jsxs("div",{className:"kotakMini",children:[w.jsx("b",{children:(v=l.profil)!=null&&v.vip?"VIP "+l.profil.vip:"Gratis"}),w.jsx("span",{children:"Paket"})]}),w.jsxs("div",{className:"kotakMini",children:[w.jsx("b",{children:l.ban?"Diblokir":"Aktif"}),w.jsx("span",{children:"Status"})]}),w.jsxs("div",{className:"kotakMini",children:[w.jsx("b",{children:((C=l.profil)==null?void 0:C.level)??"—"}),w.jsx("span",{children:"Level"})]})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"UID"}),w.jsx("b",{children:o.uid})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Nama"}),w.jsx("b",{children:((k=l.profil)==null?void 0:k.name)||o.nama})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Email"}),w.jsx("b",{children:((T=l.profil)==null?void 0:T.email)||"—"})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Vip sampai"}),w.jsx("b",{children:(N=l.profil)!=null&&N.vipUntil?ph(l.profil.vipUntil):"—"})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Fans"}),w.jsx("b",{children:Ne(((R=l.profil)==null?void 0:R.fans)??0)})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Mengikuti"}),w.jsx("b",{children:Ne(((Vt=l.profil)==null?void 0:Vt.following)??0)})]}),w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Dompet terakhir"}),w.jsx("b",{children:(Dn=l.dompet)!=null&&Dn.updatedAt?ph(l.dompet.updatedAt):"—"})]}),l.ban?w.jsxs("div",{className:"barisDetail",children:[w.jsx("span",{children:"Alasan blokir"}),w.jsx("b",{children:l.ban.alasan||"—"})]}):null,w.jsx("div",{className:"catatan",style:{marginTop:12},children:"Detail dibaca dari users, wallets, dan banned. Untuk mengubah angka, buka menu Database."})]}):w.jsx(vu,{baris:4})}),w.jsx(Ev,{buka:!!h,judul:h==null?void 0:h.judul,pesan:h==null?void 0:h.pesan,tombol:h==null?void 0:h.tombol,sibuk:p,onYa:()=>h==null?void 0:h.jalan(),onTidak:()=>d(null)})]})}const Gz="https://viza.43-156-99-4.sslip.io/admin",Wz="sb_publishable_4PxD2LedOsBgIJyHLkM47A_bImSQI2W",Kz=["coin_all","reset_all","reset_gem_all","reset_all_assets","delete_users","manual_pending","manual_all","pay_get","pay_set"];async function lS(n,e=15e3){const t=mi.currentUser;if(!t)throw new Error("Belum login");Kz.includes(n.op)&&!n.uid&&(n={...n,uid:"-"});const r=await t.getIdToken(),i=new AbortController,s=setTimeout(()=>i.abort(),e);try{const o=await fetch(Gz,{method:"POST",headers:{"Content-Type":"application/json",apikey:Wz},body:JSON.stringify({a:"admin",t:r,p:n}),signal:i.signal}),a=await o.text();if(!o.ok)throw new Error(a.slice(0,160)||"HTTP "+o.status);return a?JSON.parse(a):{}}finally{clearTimeout(s)}}function Hz(){const n=Ln("rooms",500),[e,t]=ne.useState(null),[r,i]=ne.useState({}),[s,o]=ne.useState(""),[a,l]=ne.useState(""),[c,h]=ne.useState(null),[d,p]=ne.useState(!1),g=async()=>{try{const[T,N]=await Promise.all([aS("roomsPub"),aS("officialRooms").catch(()=>null)]);t(T||{}),i(N||{}),o("")}catch(T){o(T.message||String(T)),t({})}};ne.useEffect(()=>{g()},[]);const I=ne.useMemo(()=>{const T=a.trim().toLowerCase();return Object.entries(e||{}).map(([N,R])=>({__kunci:N,id:N,...R})).filter(N=>!T||String(N.name||"").toLowerCase().includes(T)||N.id.toLowerCase().includes(T)).sort((N,R)=>(Number(R.pinned)||0)-(Number(N.pinned)||0)||(Number(R.createdAt)||0)-(Number(N.createdAt)||0))},[e,a]),P=ne.useMemo(()=>{const T=a.trim().toLowerCase();return n.isi.map(N=>({__kunci:N.id,id:N.id,nama:N.name||N.title||"(tanpa nama)",pemilik:N.ownerUid||"",locked:!!N.locked})).filter(N=>!T||N.nama.toLowerCase().includes(T)||N.id.toLowerCase().includes(T))},[n.isi,a]),[x,y,E]=Ad(I),[A,V,F]=Ad(P,["nama",1]),M=T=>{const N=!T.pinned;h({judul:N?"Sematkan "+(T.name||T.id)+"?":"Lepas semat "+(T.name||T.id)+"?",pesan:N?"Room tampil paling atas di daftar room aplikasi.":"Room kembali ke urutan biasa.",tombol:N?"Sematkan":"Lepas",jalan:async()=>{p(!0);try{try{await Hp(`roomsPub/${T.id}/pinned`,N),await Hp(`roomsPub/${T.id}/pinnedAt`,N?Date.now():0)}catch{await lS({op:"room_pin",uid:T.id,nilai:N?1:0})}await No(N?"Sematkan room":"Lepas semat room",T.id),In(N?"Room disematkan paling atas":"Semat dilepas"),await g(),h(null)}catch(R){In("Gagal: "+(R.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},S=T=>{const N=!r[T.id];h({judul:N?"Tag official "+(T.name||T.id)+"?":"Lepas tag official?",pesan:N?"Room mendapat tanda resmi di foto room dan daftar room.":"Tanda resmi dilepas.",tombol:N?"Pasang":"Lepas",jalan:async()=>{p(!0);try{try{await Hp(`officialRooms/${T.id}`,N?!0:null)}catch{await lS({op:"room_official",uid:T.id,nilai:N?1:0})}await No(N?"Tag official":"Lepas official",T.id),In(N?"Tag official dipasang":"Tag official dilepas"),await g(),h(null)}catch(R){In("Gagal: "+(R.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},v=T=>h({judul:"Tutup room "+T.nama+"?",pesan:"Room dihapus dari daftar dan langsung hilang di aplikasi. Tindakan ini tidak bisa dibatalkan.",tombol:"Tutup room",jalan:async()=>{p(!0);try{await yv("rooms",T.id),await No("Tutup room",T.id),In("Room ditutup"),await n.segarkan(),h(null)}catch(N){In("Gagal: "+(N.code||N.message),!0)}finally{p(!1)}}}),C=[{kunci:"name",label:"ROOM",urut:!0,sel:T=>w.jsxs("div",{children:[w.jsxs("div",{children:[r[T.id]?"✅ ":"",T.name||"(tanpa nama)"]}),w.jsxs("div",{className:"catatan",style:{padding:0,marginTop:2},children:[String(T.id).slice(0,14),"…"]})]})},{kunci:"ownerName",label:"PEMILIK",urut:!0,sel:T=>String(T.ownerName||T.ownerUid||"—").slice(0,14)},{kunci:"members",label:"PESERTA",urut:!0,sel:T=>Ne(T.members||0)},{kunci:"pinned",label:"ATURAN",urut:!0,sel:T=>w.jsxs(w.Fragment,{children:[T.pinned?w.jsx(Fn,{children:"disematkan"}):w.jsx(Fn,{jenis:"",children:"biasa"})," ",r[T.id]?w.jsx(Fn,{children:"official"}):null]})},{kunci:"aksi",label:"AKSI",sel:T=>w.jsxs("span",{className:"aksiBaris",children:[w.jsx("button",{className:"aksi",onClick:()=>M(T),children:T.pinned?"Lepas semat":"Sematkan"}),w.jsx("button",{className:"aksi",onClick:()=>S(T),children:r[T.id]?"Lepas official":"Tag official"})]})}],k=[{kunci:"nama",label:"NAMA",urut:!0,sel:T=>T.nama},{kunci:"id",label:"ID ROOM",sel:T=>String(T.id).slice(0,12)+"…"},{kunci:"pemilik",label:"PEMILIK",sel:T=>String(T.pemilik||"—").slice(0,12)},{kunci:"locked",label:"KUNCI",sel:T=>T.locked?w.jsx(Fn,{jenis:"blokir",children:"terkunci"}):w.jsx(Fn,{children:"terbuka"})},{kunci:"aksi",label:"AKSI",sel:T=>w.jsx("button",{className:"aksi",onClick:()=>v(T),children:"Tutup room"})}];return w.jsxs(w.Fragment,{children:[w.jsx(vv,{isi:[[Ne(I.length),"Room party (RTDB)"],[Ne(n.isi.length),"Room Firestore"],[Ne(n.isi.filter(T=>!T.locked).length),"Terbuka"],[Ne(n.isi.filter(T=>T.locked).length),"Terkunci"]]}),w.jsx(Td,{judul:"Room party",sub:"· sematkan dan beri tag official",aksi:w.jsx(wv,{nilai:a,onUbah:l,placeholder:"Cari nama atau ID room…"}),children:s?w.jsxs(Tx,{children:["Gagal memuat roomsPub: ",s]}):e===null?w.jsx(vu,{}):w.jsx(Sd,{kolom:C,baris:x,urut:y,onUrut:E,kosong:"Belum ada room party di Realtime Database."})}),w.jsx(Td,{judul:"Daftar room (Firestore)",children:n.memuat&&!n.isi.length?w.jsx(vu,{baris:4}):w.jsx(Sd,{kolom:k,baris:A,urut:V,onUrut:F,kosong:"Belum ada room."})}),w.jsx(Ev,{buka:!!c,judul:c==null?void 0:c.judul,pesan:c==null?void 0:c.pesan,tombol:c==null?void 0:c.tombol,sibuk:d,onYa:()=>c==null?void 0:c.jalan(),onTidak:()=>h(null)})]})}function Qz(){const n=Ln("gifts",300),[e,t]=ne.useState(""),[r,i]=ne.useState("semua"),[s,o]=ne.useState(null),[a,l]=ne.useState(!1),c=ne.useMemo(()=>{const x=e.trim().toLowerCase();return n.isi.map(y=>({__kunci:y.id,id:y.id,nama:y.name||y.id,ikon:y.icon||"",emoji:y.emoji||"🎁",harga:Number(y.price||0),media:y.mediaUrl||"",tipe:y.mediaType||"",cashback:!!y.cashback,special:!!y.special,rocket:!!y.rocket})).filter(y=>x&&!y.nama.toLowerCase().includes(x)?!1:r==="video"?/mp4|video/i.test(y.tipe)||/\.mp4$/i.test(y.media):r==="svga"?/svga/i.test(y.tipe)||/\.svga$/i.test(y.media):r==="cashback"?y.cashback:!0)},[n.isi,e,r]),[h,d,p]=Ad(c,["harga",-1]),g=x=>o({judul:"Hapus "+x.nama+"?",pesan:"Gift hilang dari katalog dan tidak bisa dikirim lagi. Tindakan ini tidak bisa dibatalkan.",tombol:"Hapus gift",jalan:async()=>{l(!0);try{await yv("gifts",x.id),await No("Hapus gift",x.id),In(x.nama+" dihapus"),await n.segarkan(),o(null)}catch(y){In("Gagal: "+(y.code||y.message),!0)}finally{l(!1)}}}),I=[{kunci:"nama",label:"GIFT",urut:!0,sel:x=>w.jsxs("div",{className:"user",children:[w.jsx("div",{className:"mini",children:x.ikon?w.jsx("img",{src:x.ikon,alt:"",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}):x.emoji}),w.jsx("div",{children:x.nama})]})},{kunci:"harga",label:"HARGA",urut:!0,sel:x=>Ne(x.harga)+" koin"},{kunci:"media",label:"MEDIA",sel:x=>x.media?w.jsx("a",{className:"aksi",href:x.media,target:"_blank",rel:"noopener",children:x.tipe||"tautan"}):"—"},{kunci:"tambahan",label:"TAMBAHAN",sel:x=>w.jsxs(w.Fragment,{children:[x.special?w.jsx(Fn,{children:"special"}):null,x.rocket?w.jsx(Fn,{children:"rocket"}):null,x.cashback?w.jsx(Fn,{children:"cashback"}):null,!x.special&&!x.rocket&&!x.cashback?"—":null]})},{kunci:"aksi",label:"AKSI",sel:x=>w.jsx("button",{className:"aksi",onClick:()=>g(x),children:"Hapus"})}],P=n.isi.filter(x=>/mp4|video/i.test(x.mediaType||"")||/\.mp4$/i.test(x.mediaUrl||"")).length;return w.jsxs(w.Fragment,{children:[w.jsx(vv,{isi:[[Ne(n.isi.length),"Item katalog"],[Ne(P),"Gift video MP4"],[Ne(n.isi.filter(x=>x.cashback).length),"Gift cashback"],[Ne(Math.max(0,...n.isi.map(x=>Number(x.price||0)))),"Harga tertinggi"]]}),w.jsxs(Td,{judul:"Katalog gift",sub:"· dibaca aplikasi dari koleksi gifts",aksi:w.jsx(wv,{nilai:e,onUbah:t,placeholder:"Cari nama gift…"}),kaki:`${c.length} item ditampilkan dari ${n.isi.length}`,children:[w.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["video","Video MP4"],["svga","SVGA"],["cashback","Cashback"]].map(([x,y])=>w.jsx(Ix,{on:r===x,onClick:()=>i(x),children:y},x))}),n.memuat&&!n.isi.length?w.jsx(vu,{}):w.jsx(Sd,{kolom:I,baris:h,urut:d,onUrut:p,kosong:"Belum ada gift. Tambah lewat panel lama dulu."}),w.jsx("div",{className:"catatan",style:{padding:"0 14px 14px"},children:"Menambah dan mengubah berkas gift masih di panel lama (#gift). Di sini sudah bisa mencari, menyaring, dan menghapus."})]}),w.jsx(Ev,{buka:!!s,judul:s==null?void 0:s.judul,pesan:s==null?void 0:s.pesan,tombol:s==null?void 0:s.tombol,sibuk:a,onYa:()=>s==null?void 0:s.jalan(),onTidak:()=>o(null)})]})}function Yz({nama:n,judul:e}){return w.jsxs("div",{className:"panel",children:[w.jsx("div",{className:"panelAtas",children:w.jsx("h3",{children:e})}),w.jsxs("div",{className:"kosong",children:["Halaman ",w.jsx("b",{children:e})," belum dipindahkan ke React.",w.jsx("br",{}),w.jsx("br",{}),"Sementara ini bisa dibuka di panel lama: ",w.jsxs("a",{href:"../panel/admin/#"+n,children:["panel lama #",n]})]})]})}const Jz={dashboard:"Ringkasan user, room, gift, dan aktivitas admin",user:"Cari user, lihat detail, blokir atau buka blokir",room:"Pantau room, sematkan, beri tag official, dan tutup room",gift:"Katalog gift: cari, saring, dan hapus item"},Xz={dashboard:Bz,user:qz,room:Hz,gift:Qz};async function Zz(n){if(!n)return null;const e=(n.email||"").toLowerCase(),t={email:e,nama:n.displayName||e.split("@")[0],peran:e===Rg?"owner":"-",aktif:!0};if(e===Rg)return t;try{const r=await Uy(Ea($s,"panelAdmins",e));if(r.exists()&&r.data().aktif!==!1)return{...t,peran:r.data().peran||"admin",nama:r.data().nama||t.nama}}catch(r){console.warn("panelAdmins tidak terbaca:",r.code)}return null}function e3(){const n=()=>(location.hash.replace("#","")||"dashboard").split("?")[0],[e,t]=ne.useState(n);return ne.useEffect(()=>{const r=()=>t(n());return window.addEventListener("hashchange",r),()=>window.removeEventListener("hashchange",r)},[]),e}function t3({onPesan:n}){const[e,t]=ne.useState(""),[r,i]=ne.useState(""),[s,o]=ne.useState(!1),a=async c=>{c.preventDefault(),o(!0);try{await rO(mi,e.trim(),r)}catch(h){n(h.code==="auth/invalid-credential"?"Email atau sandi salah.":"Gagal masuk: "+h.code)}finally{o(!1)}},l=async()=>{try{await CO(mi,new lr)}catch(c){n("Gagal masuk dengan Google: "+c.code)}};return w.jsx("div",{className:"layarLogin",children:w.jsxs("form",{className:"kotakLogin",onSubmit:a,children:[w.jsxs("div",{className:"merekLogin",children:[w.jsx("div",{className:"logoBesar",children:"V"}),w.jsxs("div",{children:[w.jsx("b",{children:"Viza Panel"}),w.jsx("span",{children:"Panel developer Viza Chat · React"})]})]}),w.jsx("label",{children:"Email admin"}),w.jsx("input",{value:e,onChange:c=>t(c.target.value),placeholder:"nama@email.com",autoComplete:"username"}),w.jsx("label",{children:"Password"}),w.jsx("input",{type:"password",value:r,onChange:c=>i(c.target.value),placeholder:"••••••••",autoComplete:"current-password"}),w.jsx("button",{className:"utama",type:"submit",disabled:s,children:s?"Memeriksa…":"Masuk"}),w.jsx("div",{className:"atau",children:w.jsx("span",{children:"atau"})}),w.jsx("button",{className:"polos",type:"button",onClick:l,children:"Masuk dengan Google"}),w.jsx("div",{className:"kakiLogin",children:"Hanya akun yang terdaftar yang bisa membuka panel ini."})]})})}function n3(){const[n,e]=ne.useState(void 0),[t,r]=ne.useState(""),[i,s]=ne.useState(!1),o=e3();if(ne.useEffect(()=>{const c=setTimeout(()=>e(d=>d===void 0?null:d),4e3),h=oO(mi,async d=>{if(clearTimeout(c),!d){e(null);return}const p=await Zz(d);if(!p){r(`Akun ${d.email} belum terdaftar sebagai admin panel.`),await JE(mi),e(null);return}e(p)});return()=>{clearTimeout(c),h()}},[]),ne.useEffect(()=>{s(!1)},[o]),n===void 0)return w.jsx("div",{className:"kosong",style:{padding:40},children:"Memeriksa sesi…"});if(!n)return w.jsx(t3,{onPesan:r});const a=Xz[o]||Yz,l=Vz[o]||"Dashboard";return w.jsxs("div",{className:"aplikasi",children:[i&&w.jsx("div",{className:"tiraiMenu tampil",onClick:()=>s(!1)}),w.jsxs("aside",{className:"sidebar"+(i?" buka":""),children:[w.jsxs("div",{className:"merek",children:[w.jsx("div",{className:"logo",children:"V"}),w.jsxs("div",{children:[w.jsx("b",{children:"Viza Panel"}),w.jsx("span",{children:n.email})]})]}),Ex.map(c=>w.jsxs("div",{children:[w.jsx("div",{className:"grup",children:c.grup}),c.isi.map(([h,d,p])=>w.jsxs("a",{className:"menu"+(o===h?" aktif":""),href:"#"+h,children:[w.jsx("i",{children:d}),p]},h))]},c.grup)),w.jsx("div",{className:"bawah",children:w.jsxs("div",{className:"saya",children:[w.jsx("div",{className:"ava",children:(n.nama||"A")[0].toUpperCase()}),w.jsxs("div",{children:[w.jsx("b",{children:n.nama}),w.jsx("span",{children:n.peran})]}),w.jsx("button",{title:"Keluar",onClick:()=>JE(mi),children:"⎋"})]})})]}),w.jsxs("main",{className:"isi",children:[w.jsxs("div",{className:"topbar",children:[w.jsx("button",{className:"tombolMenu","aria-label":"Buka menu",onClick:()=>s(c=>!c),children:"☰"}),w.jsxs("div",{children:[w.jsx("h1",{children:l}),w.jsx("div",{className:"crumb",children:l}),w.jsx("div",{className:"ket",children:Jz[o]||""})]})]}),w.jsxs("div",{className:"isiDalam",children:[t&&w.jsx("div",{className:"kosong",style:{marginBottom:12},children:t}),w.jsx(a,{nama:o,judul:l})]})]}),w.jsx(zz,{})]})}EA(document.getElementById("root")).render(w.jsx(_N.StrictMode,{children:w.jsx(n3,{})}));
