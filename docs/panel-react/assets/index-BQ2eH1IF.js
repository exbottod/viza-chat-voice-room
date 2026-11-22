(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function uN(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var yS={exports:{}},kd={},vS={exports:{}},ue={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Eu=Symbol.for("react.element"),cN=Symbol.for("react.portal"),hN=Symbol.for("react.fragment"),dN=Symbol.for("react.strict_mode"),fN=Symbol.for("react.profiler"),pN=Symbol.for("react.provider"),mN=Symbol.for("react.context"),gN=Symbol.for("react.forward_ref"),_N=Symbol.for("react.suspense"),yN=Symbol.for("react.memo"),vN=Symbol.for("react.lazy"),Nw=Symbol.iterator;function wN(n){return n===null||typeof n!="object"?null:(n=Nw&&n[Nw]||n["@@iterator"],typeof n=="function"?n:null)}var wS={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ES=Object.assign,IS={};function la(n,e,t){this.props=n,this.context=e,this.refs=IS,this.updater=t||wS}la.prototype.isReactComponent={};la.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};la.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function TS(){}TS.prototype=la.prototype;function Og(n,e,t){this.props=n,this.context=e,this.refs=IS,this.updater=t||wS}var Lg=Og.prototype=new TS;Lg.constructor=Og;ES(Lg,la.prototype);Lg.isPureReactComponent=!0;var bw=Array.isArray,SS=Object.prototype.hasOwnProperty,Mg={current:null},AS={key:!0,ref:!0,__self:!0,__source:!0};function CS(n,e,t){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)SS.call(e,r)&&!AS.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(n&&n.defaultProps)for(r in a=n.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Eu,type:n,key:s,ref:o,props:i,_owner:Mg.current}}function EN(n,e){return{$$typeof:Eu,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Fg(n){return typeof n=="object"&&n!==null&&n.$$typeof===Eu}function IN(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Dw=/\/+/g;function ip(n,e){return typeof n=="object"&&n!==null&&n.key!=null?IN(""+n.key):e.toString(36)}function qc(n,e,t,r,i){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case Eu:case cN:o=!0}}if(o)return o=n,i=i(o),n=r===""?"."+ip(o,0):r,bw(i)?(t="",n!=null&&(t=n.replace(Dw,"$&/")+"/"),qc(i,e,t,"",function(c){return c})):i!=null&&(Fg(i)&&(i=EN(i,t+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Dw,"$&/")+"/")+n)),e.push(i)),1;if(o=0,r=r===""?".":r+":",bw(n))for(var a=0;a<n.length;a++){s=n[a];var l=r+ip(s,a);o+=qc(s,e,t,l,i)}else if(l=wN(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=r+ip(s,a++),o+=qc(s,e,t,l,i);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function gc(n,e,t){if(n==null)return n;var r=[],i=0;return qc(n,r,"","",function(s){return e.call(t,s,i++)}),r}function TN(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var jt={current:null},Gc={transition:null},SN={ReactCurrentDispatcher:jt,ReactCurrentBatchConfig:Gc,ReactCurrentOwner:Mg};function RS(){throw Error("act(...) is not supported in production builds of React.")}ue.Children={map:gc,forEach:function(n,e,t){gc(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return gc(n,function(){e++}),e},toArray:function(n){return gc(n,function(e){return e})||[]},only:function(n){if(!Fg(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};ue.Component=la;ue.Fragment=hN;ue.Profiler=fN;ue.PureComponent=Og;ue.StrictMode=dN;ue.Suspense=_N;ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=SN;ue.act=RS;ue.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var r=ES({},n.props),i=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Mg.current),e.key!==void 0&&(i=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)SS.call(e,l)&&!AS.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Eu,type:n.type,key:i,ref:s,props:r,_owner:o}};ue.createContext=function(n){return n={$$typeof:mN,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:pN,_context:n},n.Consumer=n};ue.createElement=CS;ue.createFactory=function(n){var e=CS.bind(null,n);return e.type=n,e};ue.createRef=function(){return{current:null}};ue.forwardRef=function(n){return{$$typeof:gN,render:n}};ue.isValidElement=Fg;ue.lazy=function(n){return{$$typeof:vN,_payload:{_status:-1,_result:n},_init:TN}};ue.memo=function(n,e){return{$$typeof:yN,type:n,compare:e===void 0?null:e}};ue.startTransition=function(n){var e=Gc.transition;Gc.transition={};try{n()}finally{Gc.transition=e}};ue.unstable_act=RS;ue.useCallback=function(n,e){return jt.current.useCallback(n,e)};ue.useContext=function(n){return jt.current.useContext(n)};ue.useDebugValue=function(){};ue.useDeferredValue=function(n){return jt.current.useDeferredValue(n)};ue.useEffect=function(n,e){return jt.current.useEffect(n,e)};ue.useId=function(){return jt.current.useId()};ue.useImperativeHandle=function(n,e,t){return jt.current.useImperativeHandle(n,e,t)};ue.useInsertionEffect=function(n,e){return jt.current.useInsertionEffect(n,e)};ue.useLayoutEffect=function(n,e){return jt.current.useLayoutEffect(n,e)};ue.useMemo=function(n,e){return jt.current.useMemo(n,e)};ue.useReducer=function(n,e,t){return jt.current.useReducer(n,e,t)};ue.useRef=function(n){return jt.current.useRef(n)};ue.useState=function(n){return jt.current.useState(n)};ue.useSyncExternalStore=function(n,e,t){return jt.current.useSyncExternalStore(n,e,t)};ue.useTransition=function(){return jt.current.useTransition()};ue.version="18.3.1";vS.exports=ue;var X=vS.exports;const AN=uN(X);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var CN=X,RN=Symbol.for("react.element"),kN=Symbol.for("react.fragment"),PN=Object.prototype.hasOwnProperty,xN=CN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,NN={key:!0,ref:!0,__self:!0,__source:!0};function kS(n,e,t){var r,i={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)PN.call(e,r)&&!NN.hasOwnProperty(r)&&(i[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:RN,type:n,key:s,ref:o,props:i,_owner:xN.current}}kd.Fragment=kN;kd.jsx=kS;kd.jsxs=kS;yS.exports=kd;var g=yS.exports,PS={exports:{}},ln={},xS={exports:{}},NS={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(G,te){var ie=G.length;G.push(te);e:for(;0<ie;){var je=ie-1>>>1,Te=G[je];if(0<i(Te,te))G[je]=te,G[ie]=Te,ie=je;else break e}}function t(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var te=G[0],ie=G.pop();if(ie!==te){G[0]=ie;e:for(var je=0,Te=G.length,Ye=Te>>>1;je<Ye;){var er=2*(je+1)-1,tr=G[er],nr=er+1,rr=G[nr];if(0>i(tr,ie))nr<Te&&0>i(rr,tr)?(G[je]=rr,G[nr]=ie,je=nr):(G[je]=tr,G[er]=ie,je=er);else if(nr<Te&&0>i(rr,ie))G[je]=rr,G[nr]=ie,je=nr;else break e}}return te}function i(G,te){var ie=G.sortIndex-te.sortIndex;return ie!==0?ie:G.id-te.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,p=3,_=!1,I=!1,P=!1,x=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(G){for(var te=t(c);te!==null;){if(te.callback===null)r(c);else if(te.startTime<=G)r(c),te.sortIndex=te.expirationTime,e(l,te);else break;te=t(c)}}function V(G){if(P=!1,A(G),!I)if(t(l)!==null)I=!0,Y(F);else{var te=t(c);te!==null&&fe(V,te.startTime-G)}}function F(G,te){I=!1,P&&(P=!1,v(w),w=-1),_=!0;var ie=p;try{for(A(te),d=t(l);d!==null&&(!(d.expirationTime>te)||G&&!T());){var je=d.callback;if(typeof je=="function"){d.callback=null,p=d.priorityLevel;var Te=je(d.expirationTime<=te);te=n.unstable_now(),typeof Te=="function"?d.callback=Te:d===t(l)&&r(l),A(te)}else r(l);d=t(l)}if(d!==null)var Ye=!0;else{var er=t(c);er!==null&&fe(V,er.startTime-te),Ye=!1}return Ye}finally{d=null,p=ie,_=!1}}var M=!1,S=null,w=-1,C=5,k=-1;function T(){return!(n.unstable_now()-k<C)}function N(){if(S!==null){var G=n.unstable_now();k=G;var te=!0;try{te=S(!0,G)}finally{te?R():(M=!1,S=null)}}else M=!1}var R;if(typeof E=="function")R=function(){E(N)};else if(typeof MessageChannel<"u"){var Vt=new MessageChannel,Vn=Vt.port2;Vt.port1.onmessage=N,R=function(){Vn.postMessage(null)}}else R=function(){x(N,0)};function Y(G){S=G,M||(M=!0,R())}function fe(G,te){w=x(function(){G(n.unstable_now())},te)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(G){G.callback=null},n.unstable_continueExecution=function(){I||_||(I=!0,Y(F))},n.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<G?Math.floor(1e3/G):5},n.unstable_getCurrentPriorityLevel=function(){return p},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(G){switch(p){case 1:case 2:case 3:var te=3;break;default:te=p}var ie=p;p=te;try{return G()}finally{p=ie}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(G,te){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var ie=p;p=G;try{return te()}finally{p=ie}},n.unstable_scheduleCallback=function(G,te,ie){var je=n.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?je+ie:je):ie=je,G){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=ie+Te,G={id:h++,callback:te,priorityLevel:G,startTime:ie,expirationTime:Te,sortIndex:-1},ie>je?(G.sortIndex=ie,e(c,G),t(l)===null&&G===t(c)&&(P?(v(w),w=-1):P=!0,fe(V,ie-je))):(G.sortIndex=Te,e(l,G),I||_||(I=!0,Y(F))),G},n.unstable_shouldYield=T,n.unstable_wrapCallback=function(G){var te=p;return function(){var ie=p;p=te;try{return G.apply(this,arguments)}finally{p=ie}}}})(NS);xS.exports=NS;var bN=xS.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var DN=X,sn=bN;function B(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var bS=new Set,Ml={};function Ls(n,e){Do(n,e),Do(n+"Capture",e)}function Do(n,e){for(Ml[n]=e,n=0;n<e.length;n++)bS.add(e[n])}var vr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zp=Object.prototype.hasOwnProperty,VN=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Vw={},Ow={};function ON(n){return Zp.call(Ow,n)?!0:Zp.call(Vw,n)?!1:VN.test(n)?Ow[n]=!0:(Vw[n]=!0,!1)}function LN(n,e,t,r){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function MN(n,e,t,r){if(e===null||typeof e>"u"||LN(n,e,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Bt(n,e,t,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){Et[n]=new Bt(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];Et[e]=new Bt(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){Et[n]=new Bt(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){Et[n]=new Bt(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){Et[n]=new Bt(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){Et[n]=new Bt(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){Et[n]=new Bt(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){Et[n]=new Bt(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){Et[n]=new Bt(n,5,!1,n.toLowerCase(),null,!1,!1)});var Ug=/[\-:]([a-z])/g;function jg(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(Ug,jg);Et[e]=new Bt(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(Ug,jg);Et[e]=new Bt(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(Ug,jg);Et[e]=new Bt(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){Et[n]=new Bt(n,1,!1,n.toLowerCase(),null,!1,!1)});Et.xlinkHref=new Bt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){Et[n]=new Bt(n,1,!1,n.toLowerCase(),null,!0,!0)});function Bg(n,e,t,r){var i=Et.hasOwnProperty(e)?Et[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(MN(e,t,i,r)&&(t=null),r||i===null?ON(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):i.mustUseProperty?n[i.propertyName]=t===null?i.type===3?!1:"":t:(e=i.attributeName,r=i.attributeNamespace,t===null?n.removeAttribute(e):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?n.setAttributeNS(r,e,t):n.setAttribute(e,t))))}var xr=DN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_c=Symbol.for("react.element"),oo=Symbol.for("react.portal"),ao=Symbol.for("react.fragment"),zg=Symbol.for("react.strict_mode"),em=Symbol.for("react.profiler"),DS=Symbol.for("react.provider"),VS=Symbol.for("react.context"),$g=Symbol.for("react.forward_ref"),tm=Symbol.for("react.suspense"),nm=Symbol.for("react.suspense_list"),qg=Symbol.for("react.memo"),$r=Symbol.for("react.lazy"),OS=Symbol.for("react.offscreen"),Lw=Symbol.iterator;function za(n){return n===null||typeof n!="object"?null:(n=Lw&&n[Lw]||n["@@iterator"],typeof n=="function"?n:null)}var $e=Object.assign,sp;function sl(n){if(sp===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);sp=e&&e[1]||""}return`
`+sp+n}var op=!1;function ap(n,e){if(!n||op)return"";op=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){r=c}n.call(e.prototype)}else{try{throw Error()}catch(c){r=c}n()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{op=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?sl(n):""}function FN(n){switch(n.tag){case 5:return sl(n.type);case 16:return sl("Lazy");case 13:return sl("Suspense");case 19:return sl("SuspenseList");case 0:case 2:case 15:return n=ap(n.type,!1),n;case 11:return n=ap(n.type.render,!1),n;case 1:return n=ap(n.type,!0),n;default:return""}}function rm(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case ao:return"Fragment";case oo:return"Portal";case em:return"Profiler";case zg:return"StrictMode";case tm:return"Suspense";case nm:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case VS:return(n.displayName||"Context")+".Consumer";case DS:return(n._context.displayName||"Context")+".Provider";case $g:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case qg:return e=n.displayName||null,e!==null?e:rm(n.type)||"Memo";case $r:e=n._payload,n=n._init;try{return rm(n(e))}catch{}}return null}function UN(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return rm(e);case 8:return e===zg?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _i(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function LS(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function jN(n){var e=LS(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),r=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function yc(n){n._valueTracker||(n._valueTracker=jN(n))}function MS(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),r="";return n&&(r=LS(n)?n.checked?"true":"false":n.value),n=r,n!==t?(e.setValue(n),!0):!1}function mh(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function im(n,e){var t=e.checked;return $e({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Mw(n,e){var t=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;t=_i(e.value!=null?e.value:t),n._wrapperState={initialChecked:r,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function FS(n,e){e=e.checked,e!=null&&Bg(n,"checked",e,!1)}function sm(n,e){FS(n,e);var t=_i(e.value),r=e.type;if(t!=null)r==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(r==="submit"||r==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?om(n,e.type,t):e.hasOwnProperty("defaultValue")&&om(n,e.type,_i(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function Fw(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function om(n,e,t){(e!=="number"||mh(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var ol=Array.isArray;function wo(n,e,t,r){if(n=n.options,e){e={};for(var i=0;i<t.length;i++)e["$"+t[i]]=!0;for(t=0;t<n.length;t++)i=e.hasOwnProperty("$"+n[t].value),n[t].selected!==i&&(n[t].selected=i),i&&r&&(n[t].defaultSelected=!0)}else{for(t=""+_i(t),e=null,i=0;i<n.length;i++){if(n[i].value===t){n[i].selected=!0,r&&(n[i].defaultSelected=!0);return}e!==null||n[i].disabled||(e=n[i])}e!==null&&(e.selected=!0)}}function am(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(B(91));return $e({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Uw(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(B(92));if(ol(t)){if(1<t.length)throw Error(B(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:_i(t)}}function US(n,e){var t=_i(e.value),r=_i(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),r!=null&&(n.defaultValue=""+r)}function jw(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function jS(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function lm(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?jS(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var vc,BS=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,r,i){MSApp.execUnsafeLocalFunction(function(){return n(e,t,r,i)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(vc=vc||document.createElement("div"),vc.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=vc.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Fl(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var ml={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},BN=["Webkit","ms","Moz","O"];Object.keys(ml).forEach(function(n){BN.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),ml[e]=ml[n]})});function zS(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||ml.hasOwnProperty(n)&&ml[n]?(""+e).trim():e+"px"}function $S(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=zS(t,e[t],r);t==="float"&&(t="cssFloat"),r?n.setProperty(t,i):n[t]=i}}var zN=$e({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function um(n,e){if(e){if(zN[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(B(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(B(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(B(61))}if(e.style!=null&&typeof e.style!="object")throw Error(B(62))}}function cm(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hm=null;function Gg(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var dm=null,Eo=null,Io=null;function Bw(n){if(n=Su(n)){if(typeof dm!="function")throw Error(B(280));var e=n.stateNode;e&&(e=Dd(e),dm(n.stateNode,n.type,e))}}function qS(n){Eo?Io?Io.push(n):Io=[n]:Eo=n}function GS(){if(Eo){var n=Eo,e=Io;if(Io=Eo=null,Bw(n),e)for(n=0;n<e.length;n++)Bw(e[n])}}function WS(n,e){return n(e)}function KS(){}var lp=!1;function HS(n,e,t){if(lp)return n(e,t);lp=!0;try{return WS(n,e,t)}finally{lp=!1,(Eo!==null||Io!==null)&&(KS(),GS())}}function Ul(n,e){var t=n.stateNode;if(t===null)return null;var r=Dd(t);if(r===null)return null;t=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(n=n.type,r=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!r;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(B(231,e,typeof t));return t}var fm=!1;if(vr)try{var $a={};Object.defineProperty($a,"passive",{get:function(){fm=!0}}),window.addEventListener("test",$a,$a),window.removeEventListener("test",$a,$a)}catch{fm=!1}function $N(n,e,t,r,i,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(h){this.onError(h)}}var gl=!1,gh=null,_h=!1,pm=null,qN={onError:function(n){gl=!0,gh=n}};function GN(n,e,t,r,i,s,o,a,l){gl=!1,gh=null,$N.apply(qN,arguments)}function WN(n,e,t,r,i,s,o,a,l){if(GN.apply(this,arguments),gl){if(gl){var c=gh;gl=!1,gh=null}else throw Error(B(198));_h||(_h=!0,pm=c)}}function Ms(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function QS(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function zw(n){if(Ms(n)!==n)throw Error(B(188))}function KN(n){var e=n.alternate;if(!e){if(e=Ms(n),e===null)throw Error(B(188));return e!==n?null:n}for(var t=n,r=e;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return zw(i),n;if(s===r)return zw(i),e;s=s.sibling}throw Error(B(188))}if(t.return!==r.return)t=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===t){o=!0,t=i,r=s;break}if(a===r){o=!0,r=i,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,r=i;break}if(a===r){o=!0,r=s,t=i;break}a=a.sibling}if(!o)throw Error(B(189))}}if(t.alternate!==r)throw Error(B(190))}if(t.tag!==3)throw Error(B(188));return t.stateNode.current===t?n:e}function YS(n){return n=KN(n),n!==null?JS(n):null}function JS(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=JS(n);if(e!==null)return e;n=n.sibling}return null}var XS=sn.unstable_scheduleCallback,$w=sn.unstable_cancelCallback,HN=sn.unstable_shouldYield,QN=sn.unstable_requestPaint,Je=sn.unstable_now,YN=sn.unstable_getCurrentPriorityLevel,Wg=sn.unstable_ImmediatePriority,ZS=sn.unstable_UserBlockingPriority,yh=sn.unstable_NormalPriority,JN=sn.unstable_LowPriority,e0=sn.unstable_IdlePriority,Pd=null,zn=null;function XN(n){if(zn&&typeof zn.onCommitFiberRoot=="function")try{zn.onCommitFiberRoot(Pd,n,void 0,(n.current.flags&128)===128)}catch{}}var kn=Math.clz32?Math.clz32:tb,ZN=Math.log,eb=Math.LN2;function tb(n){return n>>>=0,n===0?32:31-(ZN(n)/eb|0)|0}var wc=64,Ec=4194304;function al(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function vh(n,e){var t=n.pendingLanes;if(t===0)return 0;var r=0,i=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~i;a!==0?r=al(a):(s&=o,s!==0&&(r=al(s)))}else o=t&~i,o!==0?r=al(o):s!==0&&(r=al(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=r;0<e;)t=31-kn(e),i=1<<t,r|=n[t],e&=~i;return r}function nb(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rb(n,e){for(var t=n.suspendedLanes,r=n.pingedLanes,i=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-kn(s),a=1<<o,l=i[o];l===-1?(!(a&t)||a&r)&&(i[o]=nb(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function mm(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function t0(){var n=wc;return wc<<=1,!(wc&4194240)&&(wc=64),n}function up(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function Iu(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-kn(e),n[e]=t}function ib(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var r=n.eventTimes;for(n=n.expirationTimes;0<t;){var i=31-kn(t),s=1<<i;e[i]=0,r[i]=-1,n[i]=-1,t&=~s}}function Kg(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var r=31-kn(t),i=1<<r;i&e|n[r]&e&&(n[r]|=e),t&=~i}}var we=0;function n0(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var r0,Hg,i0,s0,o0,gm=!1,Ic=[],ri=null,ii=null,si=null,jl=new Map,Bl=new Map,Gr=[],sb="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function qw(n,e){switch(n){case"focusin":case"focusout":ri=null;break;case"dragenter":case"dragleave":ii=null;break;case"mouseover":case"mouseout":si=null;break;case"pointerover":case"pointerout":jl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bl.delete(e.pointerId)}}function qa(n,e,t,r,i,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Su(e),e!==null&&Hg(e)),n):(n.eventSystemFlags|=r,e=n.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),n)}function ob(n,e,t,r,i){switch(e){case"focusin":return ri=qa(ri,n,e,t,r,i),!0;case"dragenter":return ii=qa(ii,n,e,t,r,i),!0;case"mouseover":return si=qa(si,n,e,t,r,i),!0;case"pointerover":var s=i.pointerId;return jl.set(s,qa(jl.get(s)||null,n,e,t,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Bl.set(s,qa(Bl.get(s)||null,n,e,t,r,i)),!0}return!1}function a0(n){var e=os(n.target);if(e!==null){var t=Ms(e);if(t!==null){if(e=t.tag,e===13){if(e=QS(t),e!==null){n.blockedOn=e,o0(n.priority,function(){i0(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Wc(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=_m(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var r=new t.constructor(t.type,t);hm=r,t.target.dispatchEvent(r),hm=null}else return e=Su(t),e!==null&&Hg(e),n.blockedOn=t,!1;e.shift()}return!0}function Gw(n,e,t){Wc(n)&&t.delete(e)}function ab(){gm=!1,ri!==null&&Wc(ri)&&(ri=null),ii!==null&&Wc(ii)&&(ii=null),si!==null&&Wc(si)&&(si=null),jl.forEach(Gw),Bl.forEach(Gw)}function Ga(n,e){n.blockedOn===e&&(n.blockedOn=null,gm||(gm=!0,sn.unstable_scheduleCallback(sn.unstable_NormalPriority,ab)))}function zl(n){function e(i){return Ga(i,n)}if(0<Ic.length){Ga(Ic[0],n);for(var t=1;t<Ic.length;t++){var r=Ic[t];r.blockedOn===n&&(r.blockedOn=null)}}for(ri!==null&&Ga(ri,n),ii!==null&&Ga(ii,n),si!==null&&Ga(si,n),jl.forEach(e),Bl.forEach(e),t=0;t<Gr.length;t++)r=Gr[t],r.blockedOn===n&&(r.blockedOn=null);for(;0<Gr.length&&(t=Gr[0],t.blockedOn===null);)a0(t),t.blockedOn===null&&Gr.shift()}var To=xr.ReactCurrentBatchConfig,wh=!0;function lb(n,e,t,r){var i=we,s=To.transition;To.transition=null;try{we=1,Qg(n,e,t,r)}finally{we=i,To.transition=s}}function ub(n,e,t,r){var i=we,s=To.transition;To.transition=null;try{we=4,Qg(n,e,t,r)}finally{we=i,To.transition=s}}function Qg(n,e,t,r){if(wh){var i=_m(n,e,t,r);if(i===null)vp(n,e,r,Eh,t),qw(n,r);else if(ob(i,n,e,t,r))r.stopPropagation();else if(qw(n,r),e&4&&-1<sb.indexOf(n)){for(;i!==null;){var s=Su(i);if(s!==null&&r0(s),s=_m(n,e,t,r),s===null&&vp(n,e,r,Eh,t),s===i)break;i=s}i!==null&&r.stopPropagation()}else vp(n,e,r,null,t)}}var Eh=null;function _m(n,e,t,r){if(Eh=null,n=Gg(r),n=os(n),n!==null)if(e=Ms(n),e===null)n=null;else if(t=e.tag,t===13){if(n=QS(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Eh=n,null}function l0(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(YN()){case Wg:return 1;case ZS:return 4;case yh:case JN:return 16;case e0:return 536870912;default:return 16}default:return 16}}var Zr=null,Yg=null,Kc=null;function u0(){if(Kc)return Kc;var n,e=Yg,t=e.length,r,i="value"in Zr?Zr.value:Zr.textContent,s=i.length;for(n=0;n<t&&e[n]===i[n];n++);var o=t-n;for(r=1;r<=o&&e[t-r]===i[s-r];r++);return Kc=i.slice(n,1<r?1-r:void 0)}function Hc(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Tc(){return!0}function Ww(){return!1}function un(n){function e(t,r,i,s,o){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Tc:Ww,this.isPropagationStopped=Ww,this}return $e(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Tc)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Tc)},persist:function(){},isPersistent:Tc}),e}var ua={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jg=un(ua),Tu=$e({},ua,{view:0,detail:0}),cb=un(Tu),cp,hp,Wa,xd=$e({},Tu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Xg,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Wa&&(Wa&&n.type==="mousemove"?(cp=n.screenX-Wa.screenX,hp=n.screenY-Wa.screenY):hp=cp=0,Wa=n),cp)},movementY:function(n){return"movementY"in n?n.movementY:hp}}),Kw=un(xd),hb=$e({},xd,{dataTransfer:0}),db=un(hb),fb=$e({},Tu,{relatedTarget:0}),dp=un(fb),pb=$e({},ua,{animationName:0,elapsedTime:0,pseudoElement:0}),mb=un(pb),gb=$e({},ua,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),_b=un(gb),yb=$e({},ua,{data:0}),Hw=un(yb),vb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Eb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ib(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=Eb[n])?!!e[n]:!1}function Xg(){return Ib}var Tb=$e({},Tu,{key:function(n){if(n.key){var e=vb[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Hc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?wb[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Xg,charCode:function(n){return n.type==="keypress"?Hc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Hc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),Sb=un(Tb),Ab=$e({},xd,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qw=un(Ab),Cb=$e({},Tu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Xg}),Rb=un(Cb),kb=$e({},ua,{propertyName:0,elapsedTime:0,pseudoElement:0}),Pb=un(kb),xb=$e({},xd,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Nb=un(xb),bb=[9,13,27,32],Zg=vr&&"CompositionEvent"in window,_l=null;vr&&"documentMode"in document&&(_l=document.documentMode);var Db=vr&&"TextEvent"in window&&!_l,c0=vr&&(!Zg||_l&&8<_l&&11>=_l),Yw=" ",Jw=!1;function h0(n,e){switch(n){case"keyup":return bb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function d0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var lo=!1;function Vb(n,e){switch(n){case"compositionend":return d0(e);case"keypress":return e.which!==32?null:(Jw=!0,Yw);case"textInput":return n=e.data,n===Yw&&Jw?null:n;default:return null}}function Ob(n,e){if(lo)return n==="compositionend"||!Zg&&h0(n,e)?(n=u0(),Kc=Yg=Zr=null,lo=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return c0&&e.locale!=="ko"?null:e.data;default:return null}}var Lb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xw(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!Lb[n.type]:e==="textarea"}function f0(n,e,t,r){qS(r),e=Ih(e,"onChange"),0<e.length&&(t=new Jg("onChange","change",null,t,r),n.push({event:t,listeners:e}))}var yl=null,$l=null;function Mb(n){S0(n,0)}function Nd(n){var e=ho(n);if(MS(e))return n}function Fb(n,e){if(n==="change")return e}var p0=!1;if(vr){var fp;if(vr){var pp="oninput"in document;if(!pp){var Zw=document.createElement("div");Zw.setAttribute("oninput","return;"),pp=typeof Zw.oninput=="function"}fp=pp}else fp=!1;p0=fp&&(!document.documentMode||9<document.documentMode)}function eE(){yl&&(yl.detachEvent("onpropertychange",m0),$l=yl=null)}function m0(n){if(n.propertyName==="value"&&Nd($l)){var e=[];f0(e,$l,n,Gg(n)),HS(Mb,e)}}function Ub(n,e,t){n==="focusin"?(eE(),yl=e,$l=t,yl.attachEvent("onpropertychange",m0)):n==="focusout"&&eE()}function jb(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Nd($l)}function Bb(n,e){if(n==="click")return Nd(e)}function zb(n,e){if(n==="input"||n==="change")return Nd(e)}function $b(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Dn=typeof Object.is=="function"?Object.is:$b;function ql(n,e){if(Dn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),r=Object.keys(e);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!Zp.call(e,i)||!Dn(n[i],e[i]))return!1}return!0}function tE(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function nE(n,e){var t=tE(n);n=0;for(var r;t;){if(t.nodeType===3){if(r=n+t.textContent.length,n<=e&&r>=e)return{node:t,offset:e-n};n=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=tE(t)}}function g0(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?g0(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function _0(){for(var n=window,e=mh();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=mh(n.document)}return e}function e_(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function qb(n){var e=_0(),t=n.focusedElem,r=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&g0(t.ownerDocument.documentElement,t)){if(r!==null&&e_(t)){if(e=r.start,n=r.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var i=t.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!n.extend&&s>r&&(i=r,r=s,s=i),i=nE(t,s);var o=nE(t,r);i&&o&&(n.rangeCount!==1||n.anchorNode!==i.node||n.anchorOffset!==i.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),n.removeAllRanges(),s>r?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var Gb=vr&&"documentMode"in document&&11>=document.documentMode,uo=null,ym=null,vl=null,vm=!1;function rE(n,e,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;vm||uo==null||uo!==mh(r)||(r=uo,"selectionStart"in r&&e_(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),vl&&ql(vl,r)||(vl=r,r=Ih(ym,"onSelect"),0<r.length&&(e=new Jg("onSelect","select",null,e,t),n.push({event:e,listeners:r}),e.target=uo)))}function Sc(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var co={animationend:Sc("Animation","AnimationEnd"),animationiteration:Sc("Animation","AnimationIteration"),animationstart:Sc("Animation","AnimationStart"),transitionend:Sc("Transition","TransitionEnd")},mp={},y0={};vr&&(y0=document.createElement("div").style,"AnimationEvent"in window||(delete co.animationend.animation,delete co.animationiteration.animation,delete co.animationstart.animation),"TransitionEvent"in window||delete co.transitionend.transition);function bd(n){if(mp[n])return mp[n];if(!co[n])return n;var e=co[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in y0)return mp[n]=e[t];return n}var v0=bd("animationend"),w0=bd("animationiteration"),E0=bd("animationstart"),I0=bd("transitionend"),T0=new Map,iE="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Vi(n,e){T0.set(n,e),Ls(e,[n])}for(var gp=0;gp<iE.length;gp++){var _p=iE[gp],Wb=_p.toLowerCase(),Kb=_p[0].toUpperCase()+_p.slice(1);Vi(Wb,"on"+Kb)}Vi(v0,"onAnimationEnd");Vi(w0,"onAnimationIteration");Vi(E0,"onAnimationStart");Vi("dblclick","onDoubleClick");Vi("focusin","onFocus");Vi("focusout","onBlur");Vi(I0,"onTransitionEnd");Do("onMouseEnter",["mouseout","mouseover"]);Do("onMouseLeave",["mouseout","mouseover"]);Do("onPointerEnter",["pointerout","pointerover"]);Do("onPointerLeave",["pointerout","pointerover"]);Ls("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ls("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ls("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ls("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ls("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ls("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ll="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Hb=new Set("cancel close invalid load scroll toggle".split(" ").concat(ll));function sE(n,e,t){var r=n.type||"unknown-event";n.currentTarget=t,WN(r,e,void 0,n),n.currentTarget=null}function S0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var r=n[t],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;sE(i,a,c),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;sE(i,a,c),s=l}}}if(_h)throw n=pm,_h=!1,pm=null,n}function Pe(n,e){var t=e[Sm];t===void 0&&(t=e[Sm]=new Set);var r=n+"__bubble";t.has(r)||(A0(e,n,2,!1),t.add(r))}function yp(n,e,t){var r=0;e&&(r|=4),A0(t,n,r,e)}var Ac="_reactListening"+Math.random().toString(36).slice(2);function Gl(n){if(!n[Ac]){n[Ac]=!0,bS.forEach(function(t){t!=="selectionchange"&&(Hb.has(t)||yp(t,!1,n),yp(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Ac]||(e[Ac]=!0,yp("selectionchange",!1,e))}}function A0(n,e,t,r){switch(l0(e)){case 1:var i=lb;break;case 4:i=ub;break;default:i=Qg}t=i.bind(null,e,t,n),i=void 0,!fm||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?n.addEventListener(e,t,{capture:!0,passive:i}):n.addEventListener(e,t,!0):i!==void 0?n.addEventListener(e,t,{passive:i}):n.addEventListener(e,t,!1)}function vp(n,e,t,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=os(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}HS(function(){var c=s,h=Gg(t),d=[];e:{var p=T0.get(n);if(p!==void 0){var _=Jg,I=n;switch(n){case"keypress":if(Hc(t)===0)break e;case"keydown":case"keyup":_=Sb;break;case"focusin":I="focus",_=dp;break;case"focusout":I="blur",_=dp;break;case"beforeblur":case"afterblur":_=dp;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=Kw;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=db;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Rb;break;case v0:case w0:case E0:_=mb;break;case I0:_=Pb;break;case"scroll":_=cb;break;case"wheel":_=Nb;break;case"copy":case"cut":case"paste":_=_b;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=Qw}var P=(e&4)!==0,x=!P&&n==="scroll",v=P?p!==null?p+"Capture":null:p;P=[];for(var E=c,A;E!==null;){A=E;var V=A.stateNode;if(A.tag===5&&V!==null&&(A=V,v!==null&&(V=Ul(E,v),V!=null&&P.push(Wl(E,V,A)))),x)break;E=E.return}0<P.length&&(p=new _(p,I,null,t,h),d.push({event:p,listeners:P}))}}if(!(e&7)){e:{if(p=n==="mouseover"||n==="pointerover",_=n==="mouseout"||n==="pointerout",p&&t!==hm&&(I=t.relatedTarget||t.fromElement)&&(os(I)||I[wr]))break e;if((_||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,_?(I=t.relatedTarget||t.toElement,_=c,I=I?os(I):null,I!==null&&(x=Ms(I),I!==x||I.tag!==5&&I.tag!==6)&&(I=null)):(_=null,I=c),_!==I)){if(P=Kw,V="onMouseLeave",v="onMouseEnter",E="mouse",(n==="pointerout"||n==="pointerover")&&(P=Qw,V="onPointerLeave",v="onPointerEnter",E="pointer"),x=_==null?p:ho(_),A=I==null?p:ho(I),p=new P(V,E+"leave",_,t,h),p.target=x,p.relatedTarget=A,V=null,os(h)===c&&(P=new P(v,E+"enter",I,t,h),P.target=A,P.relatedTarget=x,V=P),x=V,_&&I)t:{for(P=_,v=I,E=0,A=P;A;A=Ys(A))E++;for(A=0,V=v;V;V=Ys(V))A++;for(;0<E-A;)P=Ys(P),E--;for(;0<A-E;)v=Ys(v),A--;for(;E--;){if(P===v||v!==null&&P===v.alternate)break t;P=Ys(P),v=Ys(v)}P=null}else P=null;_!==null&&oE(d,p,_,P,!1),I!==null&&x!==null&&oE(d,x,I,P,!0)}}e:{if(p=c?ho(c):window,_=p.nodeName&&p.nodeName.toLowerCase(),_==="select"||_==="input"&&p.type==="file")var F=Fb;else if(Xw(p))if(p0)F=zb;else{F=jb;var M=Ub}else(_=p.nodeName)&&_.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(F=Bb);if(F&&(F=F(n,c))){f0(d,F,t,h);break e}M&&M(n,p,c),n==="focusout"&&(M=p._wrapperState)&&M.controlled&&p.type==="number"&&om(p,"number",p.value)}switch(M=c?ho(c):window,n){case"focusin":(Xw(M)||M.contentEditable==="true")&&(uo=M,ym=c,vl=null);break;case"focusout":vl=ym=uo=null;break;case"mousedown":vm=!0;break;case"contextmenu":case"mouseup":case"dragend":vm=!1,rE(d,t,h);break;case"selectionchange":if(Gb)break;case"keydown":case"keyup":rE(d,t,h)}var S;if(Zg)e:{switch(n){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else lo?h0(n,t)&&(w="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(w="onCompositionStart");w&&(c0&&t.locale!=="ko"&&(lo||w!=="onCompositionStart"?w==="onCompositionEnd"&&lo&&(S=u0()):(Zr=h,Yg="value"in Zr?Zr.value:Zr.textContent,lo=!0)),M=Ih(c,w),0<M.length&&(w=new Hw(w,n,null,t,h),d.push({event:w,listeners:M}),S?w.data=S:(S=d0(t),S!==null&&(w.data=S)))),(S=Db?Vb(n,t):Ob(n,t))&&(c=Ih(c,"onBeforeInput"),0<c.length&&(h=new Hw("onBeforeInput","beforeinput",null,t,h),d.push({event:h,listeners:c}),h.data=S))}S0(d,e)})}function Wl(n,e,t){return{instance:n,listener:e,currentTarget:t}}function Ih(n,e){for(var t=e+"Capture",r=[];n!==null;){var i=n,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Ul(n,t),s!=null&&r.unshift(Wl(n,s,i)),s=Ul(n,e),s!=null&&r.push(Wl(n,s,i))),n=n.return}return r}function Ys(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function oE(n,e,t,r,i){for(var s=e._reactName,o=[];t!==null&&t!==r;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=Ul(t,s),l!=null&&o.unshift(Wl(t,l,a))):i||(l=Ul(t,s),l!=null&&o.push(Wl(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var Qb=/\r\n?/g,Yb=/\u0000|\uFFFD/g;function aE(n){return(typeof n=="string"?n:""+n).replace(Qb,`
`).replace(Yb,"")}function Cc(n,e,t){if(e=aE(e),aE(n)!==e&&t)throw Error(B(425))}function Th(){}var wm=null,Em=null;function Im(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Tm=typeof setTimeout=="function"?setTimeout:void 0,Jb=typeof clearTimeout=="function"?clearTimeout:void 0,lE=typeof Promise=="function"?Promise:void 0,Xb=typeof queueMicrotask=="function"?queueMicrotask:typeof lE<"u"?function(n){return lE.resolve(null).then(n).catch(Zb)}:Tm;function Zb(n){setTimeout(function(){throw n})}function wp(n,e){var t=e,r=0;do{var i=t.nextSibling;if(n.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){n.removeChild(i),zl(e);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);zl(e)}function oi(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function uE(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var ca=Math.random().toString(36).slice(2),Mn="__reactFiber$"+ca,Kl="__reactProps$"+ca,wr="__reactContainer$"+ca,Sm="__reactEvents$"+ca,eD="__reactListeners$"+ca,tD="__reactHandles$"+ca;function os(n){var e=n[Mn];if(e)return e;for(var t=n.parentNode;t;){if(e=t[wr]||t[Mn]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=uE(n);n!==null;){if(t=n[Mn])return t;n=uE(n)}return e}n=t,t=n.parentNode}return null}function Su(n){return n=n[Mn]||n[wr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ho(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(B(33))}function Dd(n){return n[Kl]||null}var Am=[],fo=-1;function Oi(n){return{current:n}}function Ve(n){0>fo||(n.current=Am[fo],Am[fo]=null,fo--)}function Re(n,e){fo++,Am[fo]=n.current,n.current=e}var yi={},Dt=Oi(yi),Ht=Oi(!1),ys=yi;function Vo(n,e){var t=n.type.contextTypes;if(!t)return yi;var r=n.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=e[s];return r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=i),i}function Qt(n){return n=n.childContextTypes,n!=null}function Sh(){Ve(Ht),Ve(Dt)}function cE(n,e,t){if(Dt.current!==yi)throw Error(B(168));Re(Dt,e),Re(Ht,t)}function C0(n,e,t){var r=n.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(B(108,UN(n)||"Unknown",i));return $e({},t,r)}function Ah(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||yi,ys=Dt.current,Re(Dt,n),Re(Ht,Ht.current),!0}function hE(n,e,t){var r=n.stateNode;if(!r)throw Error(B(169));t?(n=C0(n,e,ys),r.__reactInternalMemoizedMergedChildContext=n,Ve(Ht),Ve(Dt),Re(Dt,n)):Ve(Ht),Re(Ht,t)}var lr=null,Vd=!1,Ep=!1;function R0(n){lr===null?lr=[n]:lr.push(n)}function nD(n){Vd=!0,R0(n)}function Li(){if(!Ep&&lr!==null){Ep=!0;var n=0,e=we;try{var t=lr;for(we=1;n<t.length;n++){var r=t[n];do r=r(!0);while(r!==null)}lr=null,Vd=!1}catch(i){throw lr!==null&&(lr=lr.slice(n+1)),XS(Wg,Li),i}finally{we=e,Ep=!1}}return null}var po=[],mo=0,Ch=null,Rh=0,cn=[],hn=0,vs=null,cr=1,hr="";function Ji(n,e){po[mo++]=Rh,po[mo++]=Ch,Ch=n,Rh=e}function k0(n,e,t){cn[hn++]=cr,cn[hn++]=hr,cn[hn++]=vs,vs=n;var r=cr;n=hr;var i=32-kn(r)-1;r&=~(1<<i),t+=1;var s=32-kn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,cr=1<<32-kn(e)+i|t<<i|r,hr=s+n}else cr=1<<s|t<<i|r,hr=n}function t_(n){n.return!==null&&(Ji(n,1),k0(n,1,0))}function n_(n){for(;n===Ch;)Ch=po[--mo],po[mo]=null,Rh=po[--mo],po[mo]=null;for(;n===vs;)vs=cn[--hn],cn[hn]=null,hr=cn[--hn],cn[hn]=null,cr=cn[--hn],cn[hn]=null}var rn=null,nn=null,Le=!1,In=null;function P0(n,e){var t=dn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function dE(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,rn=n,nn=oi(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,rn=n,nn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=vs!==null?{id:cr,overflow:hr}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=dn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,rn=n,nn=null,!0):!1;default:return!1}}function Cm(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Rm(n){if(Le){var e=nn;if(e){var t=e;if(!dE(n,e)){if(Cm(n))throw Error(B(418));e=oi(t.nextSibling);var r=rn;e&&dE(n,e)?P0(r,t):(n.flags=n.flags&-4097|2,Le=!1,rn=n)}}else{if(Cm(n))throw Error(B(418));n.flags=n.flags&-4097|2,Le=!1,rn=n}}}function fE(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;rn=n}function Rc(n){if(n!==rn)return!1;if(!Le)return fE(n),Le=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Im(n.type,n.memoizedProps)),e&&(e=nn)){if(Cm(n))throw x0(),Error(B(418));for(;e;)P0(n,e),e=oi(e.nextSibling)}if(fE(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(B(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){nn=oi(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}nn=null}}else nn=rn?oi(n.stateNode.nextSibling):null;return!0}function x0(){for(var n=nn;n;)n=oi(n.nextSibling)}function Oo(){nn=rn=null,Le=!1}function r_(n){In===null?In=[n]:In.push(n)}var rD=xr.ReactCurrentBatchConfig;function Ka(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(B(309));var r=t.stateNode}if(!r)throw Error(B(147,n));var i=r,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(B(284));if(!t._owner)throw Error(B(290,n))}return n}function kc(n,e){throw n=Object.prototype.toString.call(e),Error(B(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function pE(n){var e=n._init;return e(n._payload)}function N0(n){function e(v,E){if(n){var A=v.deletions;A===null?(v.deletions=[E],v.flags|=16):A.push(E)}}function t(v,E){if(!n)return null;for(;E!==null;)e(v,E),E=E.sibling;return null}function r(v,E){for(v=new Map;E!==null;)E.key!==null?v.set(E.key,E):v.set(E.index,E),E=E.sibling;return v}function i(v,E){return v=ci(v,E),v.index=0,v.sibling=null,v}function s(v,E,A){return v.index=A,n?(A=v.alternate,A!==null?(A=A.index,A<E?(v.flags|=2,E):A):(v.flags|=2,E)):(v.flags|=1048576,E)}function o(v){return n&&v.alternate===null&&(v.flags|=2),v}function a(v,E,A,V){return E===null||E.tag!==6?(E=kp(A,v.mode,V),E.return=v,E):(E=i(E,A),E.return=v,E)}function l(v,E,A,V){var F=A.type;return F===ao?h(v,E,A.props.children,V,A.key):E!==null&&(E.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===$r&&pE(F)===E.type)?(V=i(E,A.props),V.ref=Ka(v,E,A),V.return=v,V):(V=th(A.type,A.key,A.props,null,v.mode,V),V.ref=Ka(v,E,A),V.return=v,V)}function c(v,E,A,V){return E===null||E.tag!==4||E.stateNode.containerInfo!==A.containerInfo||E.stateNode.implementation!==A.implementation?(E=Pp(A,v.mode,V),E.return=v,E):(E=i(E,A.children||[]),E.return=v,E)}function h(v,E,A,V,F){return E===null||E.tag!==7?(E=ps(A,v.mode,V,F),E.return=v,E):(E=i(E,A),E.return=v,E)}function d(v,E,A){if(typeof E=="string"&&E!==""||typeof E=="number")return E=kp(""+E,v.mode,A),E.return=v,E;if(typeof E=="object"&&E!==null){switch(E.$$typeof){case _c:return A=th(E.type,E.key,E.props,null,v.mode,A),A.ref=Ka(v,null,E),A.return=v,A;case oo:return E=Pp(E,v.mode,A),E.return=v,E;case $r:var V=E._init;return d(v,V(E._payload),A)}if(ol(E)||za(E))return E=ps(E,v.mode,A,null),E.return=v,E;kc(v,E)}return null}function p(v,E,A,V){var F=E!==null?E.key:null;if(typeof A=="string"&&A!==""||typeof A=="number")return F!==null?null:a(v,E,""+A,V);if(typeof A=="object"&&A!==null){switch(A.$$typeof){case _c:return A.key===F?l(v,E,A,V):null;case oo:return A.key===F?c(v,E,A,V):null;case $r:return F=A._init,p(v,E,F(A._payload),V)}if(ol(A)||za(A))return F!==null?null:h(v,E,A,V,null);kc(v,A)}return null}function _(v,E,A,V,F){if(typeof V=="string"&&V!==""||typeof V=="number")return v=v.get(A)||null,a(E,v,""+V,F);if(typeof V=="object"&&V!==null){switch(V.$$typeof){case _c:return v=v.get(V.key===null?A:V.key)||null,l(E,v,V,F);case oo:return v=v.get(V.key===null?A:V.key)||null,c(E,v,V,F);case $r:var M=V._init;return _(v,E,A,M(V._payload),F)}if(ol(V)||za(V))return v=v.get(A)||null,h(E,v,V,F,null);kc(E,V)}return null}function I(v,E,A,V){for(var F=null,M=null,S=E,w=E=0,C=null;S!==null&&w<A.length;w++){S.index>w?(C=S,S=null):C=S.sibling;var k=p(v,S,A[w],V);if(k===null){S===null&&(S=C);break}n&&S&&k.alternate===null&&e(v,S),E=s(k,E,w),M===null?F=k:M.sibling=k,M=k,S=C}if(w===A.length)return t(v,S),Le&&Ji(v,w),F;if(S===null){for(;w<A.length;w++)S=d(v,A[w],V),S!==null&&(E=s(S,E,w),M===null?F=S:M.sibling=S,M=S);return Le&&Ji(v,w),F}for(S=r(v,S);w<A.length;w++)C=_(S,v,w,A[w],V),C!==null&&(n&&C.alternate!==null&&S.delete(C.key===null?w:C.key),E=s(C,E,w),M===null?F=C:M.sibling=C,M=C);return n&&S.forEach(function(T){return e(v,T)}),Le&&Ji(v,w),F}function P(v,E,A,V){var F=za(A);if(typeof F!="function")throw Error(B(150));if(A=F.call(A),A==null)throw Error(B(151));for(var M=F=null,S=E,w=E=0,C=null,k=A.next();S!==null&&!k.done;w++,k=A.next()){S.index>w?(C=S,S=null):C=S.sibling;var T=p(v,S,k.value,V);if(T===null){S===null&&(S=C);break}n&&S&&T.alternate===null&&e(v,S),E=s(T,E,w),M===null?F=T:M.sibling=T,M=T,S=C}if(k.done)return t(v,S),Le&&Ji(v,w),F;if(S===null){for(;!k.done;w++,k=A.next())k=d(v,k.value,V),k!==null&&(E=s(k,E,w),M===null?F=k:M.sibling=k,M=k);return Le&&Ji(v,w),F}for(S=r(v,S);!k.done;w++,k=A.next())k=_(S,v,w,k.value,V),k!==null&&(n&&k.alternate!==null&&S.delete(k.key===null?w:k.key),E=s(k,E,w),M===null?F=k:M.sibling=k,M=k);return n&&S.forEach(function(N){return e(v,N)}),Le&&Ji(v,w),F}function x(v,E,A,V){if(typeof A=="object"&&A!==null&&A.type===ao&&A.key===null&&(A=A.props.children),typeof A=="object"&&A!==null){switch(A.$$typeof){case _c:e:{for(var F=A.key,M=E;M!==null;){if(M.key===F){if(F=A.type,F===ao){if(M.tag===7){t(v,M.sibling),E=i(M,A.props.children),E.return=v,v=E;break e}}else if(M.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===$r&&pE(F)===M.type){t(v,M.sibling),E=i(M,A.props),E.ref=Ka(v,M,A),E.return=v,v=E;break e}t(v,M);break}else e(v,M);M=M.sibling}A.type===ao?(E=ps(A.props.children,v.mode,V,A.key),E.return=v,v=E):(V=th(A.type,A.key,A.props,null,v.mode,V),V.ref=Ka(v,E,A),V.return=v,v=V)}return o(v);case oo:e:{for(M=A.key;E!==null;){if(E.key===M)if(E.tag===4&&E.stateNode.containerInfo===A.containerInfo&&E.stateNode.implementation===A.implementation){t(v,E.sibling),E=i(E,A.children||[]),E.return=v,v=E;break e}else{t(v,E);break}else e(v,E);E=E.sibling}E=Pp(A,v.mode,V),E.return=v,v=E}return o(v);case $r:return M=A._init,x(v,E,M(A._payload),V)}if(ol(A))return I(v,E,A,V);if(za(A))return P(v,E,A,V);kc(v,A)}return typeof A=="string"&&A!==""||typeof A=="number"?(A=""+A,E!==null&&E.tag===6?(t(v,E.sibling),E=i(E,A),E.return=v,v=E):(t(v,E),E=kp(A,v.mode,V),E.return=v,v=E),o(v)):t(v,E)}return x}var Lo=N0(!0),b0=N0(!1),kh=Oi(null),Ph=null,go=null,i_=null;function s_(){i_=go=Ph=null}function o_(n){var e=kh.current;Ve(kh),n._currentValue=e}function km(n,e,t){for(;n!==null;){var r=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===t)break;n=n.return}}function So(n,e){Ph=n,i_=go=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&($t=!0),n.firstContext=null)}function mn(n){var e=n._currentValue;if(i_!==n)if(n={context:n,memoizedValue:e,next:null},go===null){if(Ph===null)throw Error(B(308));go=n,Ph.dependencies={lanes:0,firstContext:n}}else go=go.next=n;return e}var as=null;function a_(n){as===null?as=[n]:as.push(n)}function D0(n,e,t,r){var i=e.interleaved;return i===null?(t.next=t,a_(e)):(t.next=i.next,i.next=t),e.interleaved=t,Er(n,r)}function Er(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var qr=!1;function l_(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function V0(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function _r(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function ai(n,e,t){var r=n.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Er(n,t)}return i=r.interleaved,i===null?(e.next=e,a_(r)):(e.next=i.next,i.next=e),r.interleaved=e,Er(n,t)}function Qc(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Kg(n,t)}}function mE(n,e){var t=n.updateQueue,r=n.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?i=s=e:s=s.next=e}else i=s=e;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function xh(n,e,t,r){var i=n.updateQueue;qr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=n.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=i.baseState;o=0,h=c=l=null,a=s;do{var p=a.lane,_=a.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:_,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var I=n,P=a;switch(p=e,_=t,P.tag){case 1:if(I=P.payload,typeof I=="function"){d=I.call(_,d,p);break e}d=I;break e;case 3:I.flags=I.flags&-65537|128;case 0:if(I=P.payload,p=typeof I=="function"?I.call(_,d,p):I,p==null)break e;d=$e({},d,p);break e;case 2:qr=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else _={eventTime:_,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=_,l=d):h=h.next=_,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(h===null&&(l=d),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=h,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Es|=o,n.lanes=o,n.memoizedState=d}}function gE(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var r=n[e],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(B(191,i));i.call(r)}}}var Au={},$n=Oi(Au),Hl=Oi(Au),Ql=Oi(Au);function ls(n){if(n===Au)throw Error(B(174));return n}function u_(n,e){switch(Re(Ql,e),Re(Hl,n),Re($n,Au),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:lm(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=lm(e,n)}Ve($n),Re($n,e)}function Mo(){Ve($n),Ve(Hl),Ve(Ql)}function O0(n){ls(Ql.current);var e=ls($n.current),t=lm(e,n.type);e!==t&&(Re(Hl,n),Re($n,t))}function c_(n){Hl.current===n&&(Ve($n),Ve(Hl))}var Be=Oi(0);function Nh(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ip=[];function h_(){for(var n=0;n<Ip.length;n++)Ip[n]._workInProgressVersionPrimary=null;Ip.length=0}var Yc=xr.ReactCurrentDispatcher,Tp=xr.ReactCurrentBatchConfig,ws=0,ze=null,nt=null,ct=null,bh=!1,wl=!1,Yl=0,iD=0;function At(){throw Error(B(321))}function d_(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Dn(n[t],e[t]))return!1;return!0}function f_(n,e,t,r,i,s){if(ws=s,ze=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Yc.current=n===null||n.memoizedState===null?lD:uD,n=t(r,i),wl){s=0;do{if(wl=!1,Yl=0,25<=s)throw Error(B(301));s+=1,ct=nt=null,e.updateQueue=null,Yc.current=cD,n=t(r,i)}while(wl)}if(Yc.current=Dh,e=nt!==null&&nt.next!==null,ws=0,ct=nt=ze=null,bh=!1,e)throw Error(B(300));return n}function p_(){var n=Yl!==0;return Yl=0,n}function Ln(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ct===null?ze.memoizedState=ct=n:ct=ct.next=n,ct}function gn(){if(nt===null){var n=ze.alternate;n=n!==null?n.memoizedState:null}else n=nt.next;var e=ct===null?ze.memoizedState:ct.next;if(e!==null)ct=e,nt=n;else{if(n===null)throw Error(B(310));nt=n,n={memoizedState:nt.memoizedState,baseState:nt.baseState,baseQueue:nt.baseQueue,queue:nt.queue,next:null},ct===null?ze.memoizedState=ct=n:ct=ct.next=n}return ct}function Jl(n,e){return typeof e=="function"?e(n):e}function Sp(n){var e=gn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=nt,i=r.baseQueue,s=t.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((ws&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:n(r,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=r):l=l.next=d,ze.lanes|=h,Es|=h}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=a,Dn(r,e.memoizedState)||($t=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=l,t.lastRenderedState=r}if(n=t.interleaved,n!==null){i=n;do s=i.lane,ze.lanes|=s,Es|=s,i=i.next;while(i!==n)}else i===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Ap(n){var e=gn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=t.dispatch,i=t.pending,s=e.memoizedState;if(i!==null){t.pending=null;var o=i=i.next;do s=n(s,o.action),o=o.next;while(o!==i);Dn(s,e.memoizedState)||($t=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,r]}function L0(){}function M0(n,e){var t=ze,r=gn(),i=e(),s=!Dn(r.memoizedState,i);if(s&&(r.memoizedState=i,$t=!0),r=r.queue,m_(j0.bind(null,t,r,n),[n]),r.getSnapshot!==e||s||ct!==null&&ct.memoizedState.tag&1){if(t.flags|=2048,Xl(9,U0.bind(null,t,r,i,e),void 0,null),pt===null)throw Error(B(349));ws&30||F0(t,e,i)}return i}function F0(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function U0(n,e,t,r){e.value=t,e.getSnapshot=r,B0(e)&&z0(n)}function j0(n,e,t){return t(function(){B0(e)&&z0(n)})}function B0(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Dn(n,t)}catch{return!0}}function z0(n){var e=Er(n,1);e!==null&&Pn(e,n,1,-1)}function _E(n){var e=Ln();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Jl,lastRenderedState:n},e.queue=n,n=n.dispatch=aD.bind(null,ze,n),[e.memoizedState,n]}function Xl(n,e,t,r){return n={tag:n,create:e,destroy:t,deps:r,next:null},e=ze.updateQueue,e===null?(e={lastEffect:null,stores:null},ze.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(r=t.next,t.next=n,n.next=r,e.lastEffect=n)),n}function $0(){return gn().memoizedState}function Jc(n,e,t,r){var i=Ln();ze.flags|=n,i.memoizedState=Xl(1|e,t,void 0,r===void 0?null:r)}function Od(n,e,t,r){var i=gn();r=r===void 0?null:r;var s=void 0;if(nt!==null){var o=nt.memoizedState;if(s=o.destroy,r!==null&&d_(r,o.deps)){i.memoizedState=Xl(e,t,s,r);return}}ze.flags|=n,i.memoizedState=Xl(1|e,t,s,r)}function yE(n,e){return Jc(8390656,8,n,e)}function m_(n,e){return Od(2048,8,n,e)}function q0(n,e){return Od(4,2,n,e)}function G0(n,e){return Od(4,4,n,e)}function W0(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function K0(n,e,t){return t=t!=null?t.concat([n]):null,Od(4,4,W0.bind(null,e,n),t)}function g_(){}function H0(n,e){var t=gn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&d_(e,r[1])?r[0]:(t.memoizedState=[n,e],n)}function Q0(n,e){var t=gn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&d_(e,r[1])?r[0]:(n=n(),t.memoizedState=[n,e],n)}function Y0(n,e,t){return ws&21?(Dn(t,e)||(t=t0(),ze.lanes|=t,Es|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,$t=!0),n.memoizedState=t)}function sD(n,e){var t=we;we=t!==0&&4>t?t:4,n(!0);var r=Tp.transition;Tp.transition={};try{n(!1),e()}finally{we=t,Tp.transition=r}}function J0(){return gn().memoizedState}function oD(n,e,t){var r=ui(n);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},X0(n))Z0(e,t);else if(t=D0(n,e,t,r),t!==null){var i=Ut();Pn(t,n,r,i),eA(t,e,r)}}function aD(n,e,t){var r=ui(n),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(X0(n))Z0(e,i);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(i.hasEagerState=!0,i.eagerState=a,Dn(a,o)){var l=e.interleaved;l===null?(i.next=i,a_(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}t=D0(n,e,i,r),t!==null&&(i=Ut(),Pn(t,n,r,i),eA(t,e,r))}}function X0(n){var e=n.alternate;return n===ze||e!==null&&e===ze}function Z0(n,e){wl=bh=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function eA(n,e,t){if(t&4194240){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Kg(n,t)}}var Dh={readContext:mn,useCallback:At,useContext:At,useEffect:At,useImperativeHandle:At,useInsertionEffect:At,useLayoutEffect:At,useMemo:At,useReducer:At,useRef:At,useState:At,useDebugValue:At,useDeferredValue:At,useTransition:At,useMutableSource:At,useSyncExternalStore:At,useId:At,unstable_isNewReconciler:!1},lD={readContext:mn,useCallback:function(n,e){return Ln().memoizedState=[n,e===void 0?null:e],n},useContext:mn,useEffect:yE,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,Jc(4194308,4,W0.bind(null,e,n),t)},useLayoutEffect:function(n,e){return Jc(4194308,4,n,e)},useInsertionEffect:function(n,e){return Jc(4,2,n,e)},useMemo:function(n,e){var t=Ln();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var r=Ln();return e=t!==void 0?t(e):e,r.memoizedState=r.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},r.queue=n,n=n.dispatch=oD.bind(null,ze,n),[r.memoizedState,n]},useRef:function(n){var e=Ln();return n={current:n},e.memoizedState=n},useState:_E,useDebugValue:g_,useDeferredValue:function(n){return Ln().memoizedState=n},useTransition:function(){var n=_E(!1),e=n[0];return n=sD.bind(null,n[1]),Ln().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var r=ze,i=Ln();if(Le){if(t===void 0)throw Error(B(407));t=t()}else{if(t=e(),pt===null)throw Error(B(349));ws&30||F0(r,e,t)}i.memoizedState=t;var s={value:t,getSnapshot:e};return i.queue=s,yE(j0.bind(null,r,s,n),[n]),r.flags|=2048,Xl(9,U0.bind(null,r,s,t,e),void 0,null),t},useId:function(){var n=Ln(),e=pt.identifierPrefix;if(Le){var t=hr,r=cr;t=(r&~(1<<32-kn(r)-1)).toString(32)+t,e=":"+e+"R"+t,t=Yl++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=iD++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},uD={readContext:mn,useCallback:H0,useContext:mn,useEffect:m_,useImperativeHandle:K0,useInsertionEffect:q0,useLayoutEffect:G0,useMemo:Q0,useReducer:Sp,useRef:$0,useState:function(){return Sp(Jl)},useDebugValue:g_,useDeferredValue:function(n){var e=gn();return Y0(e,nt.memoizedState,n)},useTransition:function(){var n=Sp(Jl)[0],e=gn().memoizedState;return[n,e]},useMutableSource:L0,useSyncExternalStore:M0,useId:J0,unstable_isNewReconciler:!1},cD={readContext:mn,useCallback:H0,useContext:mn,useEffect:m_,useImperativeHandle:K0,useInsertionEffect:q0,useLayoutEffect:G0,useMemo:Q0,useReducer:Ap,useRef:$0,useState:function(){return Ap(Jl)},useDebugValue:g_,useDeferredValue:function(n){var e=gn();return nt===null?e.memoizedState=n:Y0(e,nt.memoizedState,n)},useTransition:function(){var n=Ap(Jl)[0],e=gn().memoizedState;return[n,e]},useMutableSource:L0,useSyncExternalStore:M0,useId:J0,unstable_isNewReconciler:!1};function wn(n,e){if(n&&n.defaultProps){e=$e({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Pm(n,e,t,r){e=n.memoizedState,t=t(r,e),t=t==null?e:$e({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var Ld={isMounted:function(n){return(n=n._reactInternals)?Ms(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=ui(n),s=_r(r,i);s.payload=e,t!=null&&(s.callback=t),e=ai(n,s,i),e!==null&&(Pn(e,n,i,r),Qc(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=ui(n),s=_r(r,i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=ai(n,s,i),e!==null&&(Pn(e,n,i,r),Qc(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Ut(),r=ui(n),i=_r(t,r);i.tag=2,e!=null&&(i.callback=e),e=ai(n,i,r),e!==null&&(Pn(e,n,r,t),Qc(e,n,r))}};function vE(n,e,t,r,i,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!ql(t,r)||!ql(i,s):!0}function tA(n,e,t){var r=!1,i=yi,s=e.contextType;return typeof s=="object"&&s!==null?s=mn(s):(i=Qt(e)?ys:Dt.current,r=e.contextTypes,s=(r=r!=null)?Vo(n,i):yi),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Ld,n.stateNode=e,e._reactInternals=n,r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=s),e}function wE(n,e,t,r){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,r),e.state!==n&&Ld.enqueueReplaceState(e,e.state,null)}function xm(n,e,t,r){var i=n.stateNode;i.props=t,i.state=n.memoizedState,i.refs={},l_(n);var s=e.contextType;typeof s=="object"&&s!==null?i.context=mn(s):(s=Qt(e)?ys:Dt.current,i.context=Vo(n,s)),i.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Pm(n,e,s,t),i.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Ld.enqueueReplaceState(i,i.state,null),xh(n,t,i,r),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308)}function Fo(n,e){try{var t="",r=e;do t+=FN(r),r=r.return;while(r);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:i,digest:null}}function Cp(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Nm(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var hD=typeof WeakMap=="function"?WeakMap:Map;function nA(n,e,t){t=_r(-1,t),t.tag=3,t.payload={element:null};var r=e.value;return t.callback=function(){Oh||(Oh=!0,Bm=r),Nm(n,e)},t}function rA(n,e,t){t=_r(-1,t),t.tag=3;var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;t.payload=function(){return r(i)},t.callback=function(){Nm(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Nm(n,e),typeof r!="function"&&(li===null?li=new Set([this]):li.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function EE(n,e,t){var r=n.pingCache;if(r===null){r=n.pingCache=new hD;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(t)||(i.add(t),n=AD.bind(null,n,e,t),e.then(n,n))}function IE(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function TE(n,e,t,r,i){return n.mode&1?(n.flags|=65536,n.lanes=i,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=_r(-1,1),e.tag=2,ai(t,e,1))),t.lanes|=1),n)}var dD=xr.ReactCurrentOwner,$t=!1;function Mt(n,e,t,r){e.child=n===null?b0(e,null,t,r):Lo(e,n.child,t,r)}function SE(n,e,t,r,i){t=t.render;var s=e.ref;return So(e,i),r=f_(n,e,t,r,s,i),t=p_(),n!==null&&!$t?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Ir(n,e,i)):(Le&&t&&t_(e),e.flags|=1,Mt(n,e,r,i),e.child)}function AE(n,e,t,r,i){if(n===null){var s=t.type;return typeof s=="function"&&!S_(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,iA(n,e,s,r,i)):(n=th(t.type,null,r,e,e.mode,i),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&i)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:ql,t(o,r)&&n.ref===e.ref)return Ir(n,e,i)}return e.flags|=1,n=ci(s,r),n.ref=e.ref,n.return=e,e.child=n}function iA(n,e,t,r,i){if(n!==null){var s=n.memoizedProps;if(ql(s,r)&&n.ref===e.ref)if($t=!1,e.pendingProps=r=s,(n.lanes&i)!==0)n.flags&131072&&($t=!0);else return e.lanes=n.lanes,Ir(n,e,i)}return bm(n,e,t,r,i)}function sA(n,e,t){var r=e.pendingProps,i=r.children,s=n!==null?n.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Re(yo,en),en|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,Re(yo,en),en|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:t,Re(yo,en),en|=r}else s!==null?(r=s.baseLanes|t,e.memoizedState=null):r=t,Re(yo,en),en|=r;return Mt(n,e,i,t),e.child}function oA(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function bm(n,e,t,r,i){var s=Qt(t)?ys:Dt.current;return s=Vo(e,s),So(e,i),t=f_(n,e,t,r,s,i),r=p_(),n!==null&&!$t?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,Ir(n,e,i)):(Le&&r&&t_(e),e.flags|=1,Mt(n,e,t,i),e.child)}function CE(n,e,t,r,i){if(Qt(t)){var s=!0;Ah(e)}else s=!1;if(So(e,i),e.stateNode===null)Xc(n,e),tA(e,t,r),xm(e,t,r,i),r=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=mn(c):(c=Qt(t)?ys:Dt.current,c=Vo(e,c));var h=t.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==c)&&wE(e,o,r,c),qr=!1;var p=e.memoizedState;o.state=p,xh(e,r,o,i),l=e.memoizedState,a!==r||p!==l||Ht.current||qr?(typeof h=="function"&&(Pm(e,t,h,r),l=e.memoizedState),(a=qr||vE(e,t,a,r,p,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),o.props=r,o.state=l,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,V0(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:wn(e.type,a),o.props=c,d=e.pendingProps,p=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=mn(l):(l=Qt(t)?ys:Dt.current,l=Vo(e,l));var _=t.getDerivedStateFromProps;(h=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||p!==l)&&wE(e,o,r,l),qr=!1,p=e.memoizedState,o.state=p,xh(e,r,o,i);var I=e.memoizedState;a!==d||p!==I||Ht.current||qr?(typeof _=="function"&&(Pm(e,t,_,r),I=e.memoizedState),(c=qr||vE(e,t,c,r,p,I,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,I,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,I,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=I),o.props=r,o.state=I,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),r=!1)}return Dm(n,e,t,r,s,i)}function Dm(n,e,t,r,i,s){oA(n,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&hE(e,t,!1),Ir(n,e,s);r=e.stateNode,dD.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,n!==null&&o?(e.child=Lo(e,n.child,null,s),e.child=Lo(e,null,a,s)):Mt(n,e,a,s),e.memoizedState=r.state,i&&hE(e,t,!0),e.child}function aA(n){var e=n.stateNode;e.pendingContext?cE(n,e.pendingContext,e.pendingContext!==e.context):e.context&&cE(n,e.context,!1),u_(n,e.containerInfo)}function RE(n,e,t,r,i){return Oo(),r_(i),e.flags|=256,Mt(n,e,t,r),e.child}var Vm={dehydrated:null,treeContext:null,retryLane:0};function Om(n){return{baseLanes:n,cachePool:null,transitions:null}}function lA(n,e,t){var r=e.pendingProps,i=Be.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(i|=1),Re(Be,i&1),n===null)return Rm(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,n=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Ud(o,r,0,null),n=ps(n,r,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Om(t),e.memoizedState=Vm,n):__(e,o));if(i=n.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return fD(n,e,o,r,a,i,t);if(s){s=r.fallback,o=e.mode,i=n.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=ci(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=ci(a,s):(s=ps(s,o,t,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=n.child.memoizedState,o=o===null?Om(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Vm,r}return s=n.child,n=s.sibling,r=ci(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=t),r.return=e,r.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=r,e.memoizedState=null,r}function __(n,e){return e=Ud({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Pc(n,e,t,r){return r!==null&&r_(r),Lo(e,n.child,null,t),n=__(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function fD(n,e,t,r,i,s,o){if(t)return e.flags&256?(e.flags&=-257,r=Cp(Error(B(422))),Pc(n,e,o,r)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Ud({mode:"visible",children:r.children},i,0,null),s=ps(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Lo(e,n.child,null,o),e.child.memoizedState=Om(o),e.memoizedState=Vm,s);if(!(e.mode&1))return Pc(n,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(B(419)),r=Cp(s,r,void 0),Pc(n,e,o,r)}if(a=(o&n.childLanes)!==0,$t||a){if(r=pt,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Er(n,i),Pn(r,n,i,-1))}return T_(),r=Cp(Error(B(421))),Pc(n,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=n.child,e=CD.bind(null,n),i._reactRetry=e,null):(n=s.treeContext,nn=oi(i.nextSibling),rn=e,Le=!0,In=null,n!==null&&(cn[hn++]=cr,cn[hn++]=hr,cn[hn++]=vs,cr=n.id,hr=n.overflow,vs=e),e=__(e,r.children),e.flags|=4096,e)}function kE(n,e,t){n.lanes|=e;var r=n.alternate;r!==null&&(r.lanes|=e),km(n.return,e,t)}function Rp(n,e,t,r,i){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=t,s.tailMode=i)}function uA(n,e,t){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Mt(n,e,r.children,t),r=Be.current,r&2)r=r&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&kE(n,t,e);else if(n.tag===19)kE(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}if(Re(Be,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(t=e.child,i=null;t!==null;)n=t.alternate,n!==null&&Nh(n)===null&&(i=t),t=t.sibling;t=i,t===null?(i=e.child,e.child=null):(i=t.sibling,t.sibling=null),Rp(e,!1,i,t,s);break;case"backwards":for(t=null,i=e.child,e.child=null;i!==null;){if(n=i.alternate,n!==null&&Nh(n)===null){e.child=i;break}n=i.sibling,i.sibling=t,t=i,i=n}Rp(e,!0,t,null,s);break;case"together":Rp(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Xc(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function Ir(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Es|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(B(153));if(e.child!==null){for(n=e.child,t=ci(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=ci(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function pD(n,e,t){switch(e.tag){case 3:aA(e),Oo();break;case 5:O0(e);break;case 1:Qt(e.type)&&Ah(e);break;case 4:u_(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;Re(kh,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(Re(Be,Be.current&1),e.flags|=128,null):t&e.child.childLanes?lA(n,e,t):(Re(Be,Be.current&1),n=Ir(n,e,t),n!==null?n.sibling:null);Re(Be,Be.current&1);break;case 19:if(r=(t&e.childLanes)!==0,n.flags&128){if(r)return uA(n,e,t);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Re(Be,Be.current),r)break;return null;case 22:case 23:return e.lanes=0,sA(n,e,t)}return Ir(n,e,t)}var cA,Lm,hA,dA;cA=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Lm=function(){};hA=function(n,e,t,r){var i=n.memoizedProps;if(i!==r){n=e.stateNode,ls($n.current);var s=null;switch(t){case"input":i=im(n,i),r=im(n,r),s=[];break;case"select":i=$e({},i,{value:void 0}),r=$e({},r,{value:void 0}),s=[];break;case"textarea":i=am(n,i),r=am(n,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(n.onclick=Th)}um(t,r);var o;t=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ml.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ml.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Pe("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};dA=function(n,e,t,r){t!==r&&(e.flags|=4)};function Ha(n,e){if(!Le)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:r.sibling=null}}function Ct(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,r=0;if(e)for(var i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=n,i=i.sibling;else for(i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=n,i=i.sibling;return n.subtreeFlags|=r,n.childLanes=t,e}function mD(n,e,t){var r=e.pendingProps;switch(n_(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ct(e),null;case 1:return Qt(e.type)&&Sh(),Ct(e),null;case 3:return r=e.stateNode,Mo(),Ve(Ht),Ve(Dt),h_(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(n===null||n.child===null)&&(Rc(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,In!==null&&(qm(In),In=null))),Lm(n,e),Ct(e),null;case 5:c_(e);var i=ls(Ql.current);if(t=e.type,n!==null&&e.stateNode!=null)hA(n,e,t,r,i),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(B(166));return Ct(e),null}if(n=ls($n.current),Rc(e)){r=e.stateNode,t=e.type;var s=e.memoizedProps;switch(r[Mn]=e,r[Kl]=s,n=(e.mode&1)!==0,t){case"dialog":Pe("cancel",r),Pe("close",r);break;case"iframe":case"object":case"embed":Pe("load",r);break;case"video":case"audio":for(i=0;i<ll.length;i++)Pe(ll[i],r);break;case"source":Pe("error",r);break;case"img":case"image":case"link":Pe("error",r),Pe("load",r);break;case"details":Pe("toggle",r);break;case"input":Mw(r,s),Pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Pe("invalid",r);break;case"textarea":Uw(r,s),Pe("invalid",r)}um(t,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&Cc(r.textContent,a,n),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Cc(r.textContent,a,n),i=["children",""+a]):Ml.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Pe("scroll",r)}switch(t){case"input":yc(r),Fw(r,s,!0);break;case"textarea":yc(r),jw(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Th)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=jS(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof r.is=="string"?n=o.createElement(t,{is:r.is}):(n=o.createElement(t),t==="select"&&(o=n,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):n=o.createElementNS(n,t),n[Mn]=e,n[Kl]=r,cA(n,e,!1,!1),e.stateNode=n;e:{switch(o=cm(t,r),t){case"dialog":Pe("cancel",n),Pe("close",n),i=r;break;case"iframe":case"object":case"embed":Pe("load",n),i=r;break;case"video":case"audio":for(i=0;i<ll.length;i++)Pe(ll[i],n);i=r;break;case"source":Pe("error",n),i=r;break;case"img":case"image":case"link":Pe("error",n),Pe("load",n),i=r;break;case"details":Pe("toggle",n),i=r;break;case"input":Mw(n,r),i=im(n,r),Pe("invalid",n);break;case"option":i=r;break;case"select":n._wrapperState={wasMultiple:!!r.multiple},i=$e({},r,{value:void 0}),Pe("invalid",n);break;case"textarea":Uw(n,r),i=am(n,r),Pe("invalid",n);break;default:i=r}um(t,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?$S(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&BS(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Fl(n,l):typeof l=="number"&&Fl(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ml.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Pe("scroll",n):l!=null&&Bg(n,s,l,o))}switch(t){case"input":yc(n),Fw(n,r,!1);break;case"textarea":yc(n),jw(n);break;case"option":r.value!=null&&n.setAttribute("value",""+_i(r.value));break;case"select":n.multiple=!!r.multiple,s=r.value,s!=null?wo(n,!!r.multiple,s,!1):r.defaultValue!=null&&wo(n,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(n.onclick=Th)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ct(e),null;case 6:if(n&&e.stateNode!=null)dA(n,e,n.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(B(166));if(t=ls(Ql.current),ls($n.current),Rc(e)){if(r=e.stateNode,t=e.memoizedProps,r[Mn]=e,(s=r.nodeValue!==t)&&(n=rn,n!==null))switch(n.tag){case 3:Cc(r.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Cc(r.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Mn]=e,e.stateNode=r}return Ct(e),null;case 13:if(Ve(Be),r=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Le&&nn!==null&&e.mode&1&&!(e.flags&128))x0(),Oo(),e.flags|=98560,s=!1;else if(s=Rc(e),r!==null&&r.dehydrated!==null){if(n===null){if(!s)throw Error(B(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(B(317));s[Mn]=e}else Oo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ct(e),s=!1}else In!==null&&(qm(In),In=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(r=r!==null,r!==(n!==null&&n.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(n===null||Be.current&1?st===0&&(st=3):T_())),e.updateQueue!==null&&(e.flags|=4),Ct(e),null);case 4:return Mo(),Lm(n,e),n===null&&Gl(e.stateNode.containerInfo),Ct(e),null;case 10:return o_(e.type._context),Ct(e),null;case 17:return Qt(e.type)&&Sh(),Ct(e),null;case 19:if(Ve(Be),s=e.memoizedState,s===null)return Ct(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ha(s,!1);else{if(st!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Nh(n),o!==null){for(e.flags|=128,Ha(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=t,t=e.child;t!==null;)s=t,n=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return Re(Be,Be.current&1|2),e.child}n=n.sibling}s.tail!==null&&Je()>Uo&&(e.flags|=128,r=!0,Ha(s,!1),e.lanes=4194304)}else{if(!r)if(n=Nh(o),n!==null){if(e.flags|=128,r=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Ha(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Le)return Ct(e),null}else 2*Je()-s.renderingStartTime>Uo&&t!==1073741824&&(e.flags|=128,r=!0,Ha(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Je(),e.sibling=null,t=Be.current,Re(Be,r?t&1|2:t&1),e):(Ct(e),null);case 22:case 23:return I_(),r=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?en&1073741824&&(Ct(e),e.subtreeFlags&6&&(e.flags|=8192)):Ct(e),null;case 24:return null;case 25:return null}throw Error(B(156,e.tag))}function gD(n,e){switch(n_(e),e.tag){case 1:return Qt(e.type)&&Sh(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Mo(),Ve(Ht),Ve(Dt),h_(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return c_(e),null;case 13:if(Ve(Be),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(B(340));Oo()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Ve(Be),null;case 4:return Mo(),null;case 10:return o_(e.type._context),null;case 22:case 23:return I_(),null;case 24:return null;default:return null}}var xc=!1,Pt=!1,_D=typeof WeakSet=="function"?WeakSet:Set,H=null;function _o(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){Ke(n,e,r)}else t.current=null}function Mm(n,e,t){try{t()}catch(r){Ke(n,e,r)}}var PE=!1;function yD(n,e){if(wm=wh,n=_0(),e_(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=n,p=null;t:for(;;){for(var _;d!==t||i!==0&&d.nodeType!==3||(a=o+i),d!==s||r!==0&&d.nodeType!==3||(l=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(_=d.firstChild)!==null;)p=d,d=_;for(;;){if(d===n)break t;if(p===t&&++c===i&&(a=o),p===s&&++h===r&&(l=o),(_=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=_}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Em={focusedElem:n,selectionRange:t},wh=!1,H=e;H!==null;)if(e=H,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,H=n;else for(;H!==null;){e=H;try{var I=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(I!==null){var P=I.memoizedProps,x=I.memoizedState,v=e.stateNode,E=v.getSnapshotBeforeUpdate(e.elementType===e.type?P:wn(e.type,P),x);v.__reactInternalSnapshotBeforeUpdate=E}break;case 3:var A=e.stateNode.containerInfo;A.nodeType===1?A.textContent="":A.nodeType===9&&A.documentElement&&A.removeChild(A.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(V){Ke(e,e.return,V)}if(n=e.sibling,n!==null){n.return=e.return,H=n;break}H=e.return}return I=PE,PE=!1,I}function El(n,e,t){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&n)===n){var s=i.destroy;i.destroy=void 0,s!==void 0&&Mm(e,t,s)}i=i.next}while(i!==r)}}function Md(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var r=t.create;t.destroy=r()}t=t.next}while(t!==e)}}function Fm(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function fA(n){var e=n.alternate;e!==null&&(n.alternate=null,fA(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Mn],delete e[Kl],delete e[Sm],delete e[eD],delete e[tD])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function pA(n){return n.tag===5||n.tag===3||n.tag===4}function xE(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||pA(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Um(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Th));else if(r!==4&&(n=n.child,n!==null))for(Um(n,e,t),n=n.sibling;n!==null;)Um(n,e,t),n=n.sibling}function jm(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(r!==4&&(n=n.child,n!==null))for(jm(n,e,t),n=n.sibling;n!==null;)jm(n,e,t),n=n.sibling}var yt=null,En=!1;function Ur(n,e,t){for(t=t.child;t!==null;)mA(n,e,t),t=t.sibling}function mA(n,e,t){if(zn&&typeof zn.onCommitFiberUnmount=="function")try{zn.onCommitFiberUnmount(Pd,t)}catch{}switch(t.tag){case 5:Pt||_o(t,e);case 6:var r=yt,i=En;yt=null,Ur(n,e,t),yt=r,En=i,yt!==null&&(En?(n=yt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):yt.removeChild(t.stateNode));break;case 18:yt!==null&&(En?(n=yt,t=t.stateNode,n.nodeType===8?wp(n.parentNode,t):n.nodeType===1&&wp(n,t),zl(n)):wp(yt,t.stateNode));break;case 4:r=yt,i=En,yt=t.stateNode.containerInfo,En=!0,Ur(n,e,t),yt=r,En=i;break;case 0:case 11:case 14:case 15:if(!Pt&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Mm(t,e,o),i=i.next}while(i!==r)}Ur(n,e,t);break;case 1:if(!Pt&&(_o(t,e),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){Ke(t,e,a)}Ur(n,e,t);break;case 21:Ur(n,e,t);break;case 22:t.mode&1?(Pt=(r=Pt)||t.memoizedState!==null,Ur(n,e,t),Pt=r):Ur(n,e,t);break;default:Ur(n,e,t)}}function NE(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new _D),e.forEach(function(r){var i=RD.bind(null,n,r);t.has(r)||(t.add(r),r.then(i,i))})}}function vn(n,e){var t=e.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:yt=a.stateNode,En=!1;break e;case 3:yt=a.stateNode.containerInfo,En=!0;break e;case 4:yt=a.stateNode.containerInfo,En=!0;break e}a=a.return}if(yt===null)throw Error(B(160));mA(s,o,i),yt=null,En=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){Ke(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)gA(e,n),e=e.sibling}function gA(n,e){var t=n.alternate,r=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(vn(e,n),On(n),r&4){try{El(3,n,n.return),Md(3,n)}catch(P){Ke(n,n.return,P)}try{El(5,n,n.return)}catch(P){Ke(n,n.return,P)}}break;case 1:vn(e,n),On(n),r&512&&t!==null&&_o(t,t.return);break;case 5:if(vn(e,n),On(n),r&512&&t!==null&&_o(t,t.return),n.flags&32){var i=n.stateNode;try{Fl(i,"")}catch(P){Ke(n,n.return,P)}}if(r&4&&(i=n.stateNode,i!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&FS(i,s),cm(a,o);var c=cm(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?$S(i,d):h==="dangerouslySetInnerHTML"?BS(i,d):h==="children"?Fl(i,d):Bg(i,h,d,c)}switch(a){case"input":sm(i,s);break;case"textarea":US(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var _=s.value;_!=null?wo(i,!!s.multiple,_,!1):p!==!!s.multiple&&(s.defaultValue!=null?wo(i,!!s.multiple,s.defaultValue,!0):wo(i,!!s.multiple,s.multiple?[]:"",!1))}i[Kl]=s}catch(P){Ke(n,n.return,P)}}break;case 6:if(vn(e,n),On(n),r&4){if(n.stateNode===null)throw Error(B(162));i=n.stateNode,s=n.memoizedProps;try{i.nodeValue=s}catch(P){Ke(n,n.return,P)}}break;case 3:if(vn(e,n),On(n),r&4&&t!==null&&t.memoizedState.isDehydrated)try{zl(e.containerInfo)}catch(P){Ke(n,n.return,P)}break;case 4:vn(e,n),On(n);break;case 13:vn(e,n),On(n),i=n.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(w_=Je())),r&4&&NE(n);break;case 22:if(h=t!==null&&t.memoizedState!==null,n.mode&1?(Pt=(c=Pt)||h,vn(e,n),Pt=c):vn(e,n),On(n),r&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!h&&n.mode&1)for(H=n,h=n.child;h!==null;){for(d=H=h;H!==null;){switch(p=H,_=p.child,p.tag){case 0:case 11:case 14:case 15:El(4,p,p.return);break;case 1:_o(p,p.return);var I=p.stateNode;if(typeof I.componentWillUnmount=="function"){r=p,t=p.return;try{e=r,I.props=e.memoizedProps,I.state=e.memoizedState,I.componentWillUnmount()}catch(P){Ke(r,t,P)}}break;case 5:_o(p,p.return);break;case 22:if(p.memoizedState!==null){DE(d);continue}}_!==null?(_.return=p,H=_):DE(d)}h=h.sibling}e:for(h=null,d=n;;){if(d.tag===5){if(h===null){h=d;try{i=d.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=zS("display",o))}catch(P){Ke(n,n.return,P)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(P){Ke(n,n.return,P)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break e;for(;d.sibling===null;){if(d.return===null||d.return===n)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:vn(e,n),On(n),r&4&&NE(n);break;case 21:break;default:vn(e,n),On(n)}}function On(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(pA(t)){var r=t;break e}t=t.return}throw Error(B(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Fl(i,""),r.flags&=-33);var s=xE(n);jm(n,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=xE(n);Um(n,a,o);break;default:throw Error(B(161))}}catch(l){Ke(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function vD(n,e,t){H=n,_A(n)}function _A(n,e,t){for(var r=(n.mode&1)!==0;H!==null;){var i=H,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||xc;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||Pt;a=xc;var c=Pt;if(xc=o,(Pt=l)&&!c)for(H=i;H!==null;)o=H,l=o.child,o.tag===22&&o.memoizedState!==null?VE(i):l!==null?(l.return=o,H=l):VE(i);for(;s!==null;)H=s,_A(s),s=s.sibling;H=i,xc=a,Pt=c}bE(n)}else i.subtreeFlags&8772&&s!==null?(s.return=i,H=s):bE(n)}}function bE(n){for(;H!==null;){var e=H;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Pt||Md(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Pt)if(t===null)r.componentDidMount();else{var i=e.elementType===e.type?t.memoizedProps:wn(e.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&gE(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}gE(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&zl(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}Pt||e.flags&512&&Fm(e)}catch(p){Ke(e,e.return,p)}}if(e===n){H=null;break}if(t=e.sibling,t!==null){t.return=e.return,H=t;break}H=e.return}}function DE(n){for(;H!==null;){var e=H;if(e===n){H=null;break}var t=e.sibling;if(t!==null){t.return=e.return,H=t;break}H=e.return}}function VE(n){for(;H!==null;){var e=H;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Md(4,e)}catch(l){Ke(e,t,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){Ke(e,i,l)}}var s=e.return;try{Fm(e)}catch(l){Ke(e,s,l)}break;case 5:var o=e.return;try{Fm(e)}catch(l){Ke(e,o,l)}}}catch(l){Ke(e,e.return,l)}if(e===n){H=null;break}var a=e.sibling;if(a!==null){a.return=e.return,H=a;break}H=e.return}}var wD=Math.ceil,Vh=xr.ReactCurrentDispatcher,y_=xr.ReactCurrentOwner,fn=xr.ReactCurrentBatchConfig,ge=0,pt=null,tt=null,wt=0,en=0,yo=Oi(0),st=0,Zl=null,Es=0,Fd=0,v_=0,Il=null,zt=null,w_=0,Uo=1/0,ar=null,Oh=!1,Bm=null,li=null,Nc=!1,ei=null,Lh=0,Tl=0,zm=null,Zc=-1,eh=0;function Ut(){return ge&6?Je():Zc!==-1?Zc:Zc=Je()}function ui(n){return n.mode&1?ge&2&&wt!==0?wt&-wt:rD.transition!==null?(eh===0&&(eh=t0()),eh):(n=we,n!==0||(n=window.event,n=n===void 0?16:l0(n.type)),n):1}function Pn(n,e,t,r){if(50<Tl)throw Tl=0,zm=null,Error(B(185));Iu(n,t,r),(!(ge&2)||n!==pt)&&(n===pt&&(!(ge&2)&&(Fd|=t),st===4&&Wr(n,wt)),Yt(n,r),t===1&&ge===0&&!(e.mode&1)&&(Uo=Je()+500,Vd&&Li()))}function Yt(n,e){var t=n.callbackNode;rb(n,e);var r=vh(n,n===pt?wt:0);if(r===0)t!==null&&$w(t),n.callbackNode=null,n.callbackPriority=0;else if(e=r&-r,n.callbackPriority!==e){if(t!=null&&$w(t),e===1)n.tag===0?nD(OE.bind(null,n)):R0(OE.bind(null,n)),Xb(function(){!(ge&6)&&Li()}),t=null;else{switch(n0(r)){case 1:t=Wg;break;case 4:t=ZS;break;case 16:t=yh;break;case 536870912:t=e0;break;default:t=yh}t=AA(t,yA.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function yA(n,e){if(Zc=-1,eh=0,ge&6)throw Error(B(327));var t=n.callbackNode;if(Ao()&&n.callbackNode!==t)return null;var r=vh(n,n===pt?wt:0);if(r===0)return null;if(r&30||r&n.expiredLanes||e)e=Mh(n,r);else{e=r;var i=ge;ge|=2;var s=wA();(pt!==n||wt!==e)&&(ar=null,Uo=Je()+500,fs(n,e));do try{TD();break}catch(a){vA(n,a)}while(!0);s_(),Vh.current=s,ge=i,tt!==null?e=0:(pt=null,wt=0,e=st)}if(e!==0){if(e===2&&(i=mm(n),i!==0&&(r=i,e=$m(n,i))),e===1)throw t=Zl,fs(n,0),Wr(n,r),Yt(n,Je()),t;if(e===6)Wr(n,r);else{if(i=n.current.alternate,!(r&30)&&!ED(i)&&(e=Mh(n,r),e===2&&(s=mm(n),s!==0&&(r=s,e=$m(n,s))),e===1))throw t=Zl,fs(n,0),Wr(n,r),Yt(n,Je()),t;switch(n.finishedWork=i,n.finishedLanes=r,e){case 0:case 1:throw Error(B(345));case 2:Xi(n,zt,ar);break;case 3:if(Wr(n,r),(r&130023424)===r&&(e=w_+500-Je(),10<e)){if(vh(n,0)!==0)break;if(i=n.suspendedLanes,(i&r)!==r){Ut(),n.pingedLanes|=n.suspendedLanes&i;break}n.timeoutHandle=Tm(Xi.bind(null,n,zt,ar),e);break}Xi(n,zt,ar);break;case 4:if(Wr(n,r),(r&4194240)===r)break;for(e=n.eventTimes,i=-1;0<r;){var o=31-kn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Je()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*wD(r/1960))-r,10<r){n.timeoutHandle=Tm(Xi.bind(null,n,zt,ar),r);break}Xi(n,zt,ar);break;case 5:Xi(n,zt,ar);break;default:throw Error(B(329))}}}return Yt(n,Je()),n.callbackNode===t?yA.bind(null,n):null}function $m(n,e){var t=Il;return n.current.memoizedState.isDehydrated&&(fs(n,e).flags|=256),n=Mh(n,e),n!==2&&(e=zt,zt=t,e!==null&&qm(e)),n}function qm(n){zt===null?zt=n:zt.push.apply(zt,n)}function ED(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],s=i.getSnapshot;i=i.value;try{if(!Dn(s(),i))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Wr(n,e){for(e&=~v_,e&=~Fd,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-kn(e),r=1<<t;n[t]=-1,e&=~r}}function OE(n){if(ge&6)throw Error(B(327));Ao();var e=vh(n,0);if(!(e&1))return Yt(n,Je()),null;var t=Mh(n,e);if(n.tag!==0&&t===2){var r=mm(n);r!==0&&(e=r,t=$m(n,r))}if(t===1)throw t=Zl,fs(n,0),Wr(n,e),Yt(n,Je()),t;if(t===6)throw Error(B(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,Xi(n,zt,ar),Yt(n,Je()),null}function E_(n,e){var t=ge;ge|=1;try{return n(e)}finally{ge=t,ge===0&&(Uo=Je()+500,Vd&&Li())}}function Is(n){ei!==null&&ei.tag===0&&!(ge&6)&&Ao();var e=ge;ge|=1;var t=fn.transition,r=we;try{if(fn.transition=null,we=1,n)return n()}finally{we=r,fn.transition=t,ge=e,!(ge&6)&&Li()}}function I_(){en=yo.current,Ve(yo)}function fs(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,Jb(t)),tt!==null)for(t=tt.return;t!==null;){var r=t;switch(n_(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Sh();break;case 3:Mo(),Ve(Ht),Ve(Dt),h_();break;case 5:c_(r);break;case 4:Mo();break;case 13:Ve(Be);break;case 19:Ve(Be);break;case 10:o_(r.type._context);break;case 22:case 23:I_()}t=t.return}if(pt=n,tt=n=ci(n.current,null),wt=en=e,st=0,Zl=null,v_=Fd=Es=0,zt=Il=null,as!==null){for(e=0;e<as.length;e++)if(t=as[e],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,s=t.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}t.pending=r}as=null}return n}function vA(n,e){do{var t=tt;try{if(s_(),Yc.current=Dh,bh){for(var r=ze.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}bh=!1}if(ws=0,ct=nt=ze=null,wl=!1,Yl=0,y_.current=null,t===null||t.return===null){st=1,Zl=e,tt=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=wt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var _=IE(o);if(_!==null){_.flags&=-257,TE(_,o,a,s,e),_.mode&1&&EE(s,c,e),e=_,l=c;var I=e.updateQueue;if(I===null){var P=new Set;P.add(l),e.updateQueue=P}else I.add(l);break e}else{if(!(e&1)){EE(s,c,e),T_();break e}l=Error(B(426))}}else if(Le&&a.mode&1){var x=IE(o);if(x!==null){!(x.flags&65536)&&(x.flags|=256),TE(x,o,a,s,e),r_(Fo(l,a));break e}}s=l=Fo(l,a),st!==4&&(st=2),Il===null?Il=[s]:Il.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var v=nA(s,l,e);mE(s,v);break e;case 1:a=l;var E=s.type,A=s.stateNode;if(!(s.flags&128)&&(typeof E.getDerivedStateFromError=="function"||A!==null&&typeof A.componentDidCatch=="function"&&(li===null||!li.has(A)))){s.flags|=65536,e&=-e,s.lanes|=e;var V=rA(s,a,e);mE(s,V);break e}}s=s.return}while(s!==null)}IA(t)}catch(F){e=F,tt===t&&t!==null&&(tt=t=t.return);continue}break}while(!0)}function wA(){var n=Vh.current;return Vh.current=Dh,n===null?Dh:n}function T_(){(st===0||st===3||st===2)&&(st=4),pt===null||!(Es&268435455)&&!(Fd&268435455)||Wr(pt,wt)}function Mh(n,e){var t=ge;ge|=2;var r=wA();(pt!==n||wt!==e)&&(ar=null,fs(n,e));do try{ID();break}catch(i){vA(n,i)}while(!0);if(s_(),ge=t,Vh.current=r,tt!==null)throw Error(B(261));return pt=null,wt=0,st}function ID(){for(;tt!==null;)EA(tt)}function TD(){for(;tt!==null&&!HN();)EA(tt)}function EA(n){var e=SA(n.alternate,n,en);n.memoizedProps=n.pendingProps,e===null?IA(n):tt=e,y_.current=null}function IA(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=gD(t,e),t!==null){t.flags&=32767,tt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{st=6,tt=null;return}}else if(t=mD(t,e,en),t!==null){tt=t;return}if(e=e.sibling,e!==null){tt=e;return}tt=e=n}while(e!==null);st===0&&(st=5)}function Xi(n,e,t){var r=we,i=fn.transition;try{fn.transition=null,we=1,SD(n,e,t,r)}finally{fn.transition=i,we=r}return null}function SD(n,e,t,r){do Ao();while(ei!==null);if(ge&6)throw Error(B(327));t=n.finishedWork;var i=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(B(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(ib(n,s),n===pt&&(tt=pt=null,wt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Nc||(Nc=!0,AA(yh,function(){return Ao(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=fn.transition,fn.transition=null;var o=we;we=1;var a=ge;ge|=4,y_.current=null,yD(n,t),gA(t,n),qb(Em),wh=!!wm,Em=wm=null,n.current=t,vD(t),QN(),ge=a,we=o,fn.transition=s}else n.current=t;if(Nc&&(Nc=!1,ei=n,Lh=i),s=n.pendingLanes,s===0&&(li=null),XN(t.stateNode),Yt(n,Je()),e!==null)for(r=n.onRecoverableError,t=0;t<e.length;t++)i=e[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(Oh)throw Oh=!1,n=Bm,Bm=null,n;return Lh&1&&n.tag!==0&&Ao(),s=n.pendingLanes,s&1?n===zm?Tl++:(Tl=0,zm=n):Tl=0,Li(),null}function Ao(){if(ei!==null){var n=n0(Lh),e=fn.transition,t=we;try{if(fn.transition=null,we=16>n?16:n,ei===null)var r=!1;else{if(n=ei,ei=null,Lh=0,ge&6)throw Error(B(331));var i=ge;for(ge|=4,H=n.current;H!==null;){var s=H,o=s.child;if(H.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(H=c;H!==null;){var h=H;switch(h.tag){case 0:case 11:case 15:El(8,h,s)}var d=h.child;if(d!==null)d.return=h,H=d;else for(;H!==null;){h=H;var p=h.sibling,_=h.return;if(fA(h),h===c){H=null;break}if(p!==null){p.return=_,H=p;break}H=_}}}var I=s.alternate;if(I!==null){var P=I.child;if(P!==null){I.child=null;do{var x=P.sibling;P.sibling=null,P=x}while(P!==null)}}H=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,H=o;else e:for(;H!==null;){if(s=H,s.flags&2048)switch(s.tag){case 0:case 11:case 15:El(9,s,s.return)}var v=s.sibling;if(v!==null){v.return=s.return,H=v;break e}H=s.return}}var E=n.current;for(H=E;H!==null;){o=H;var A=o.child;if(o.subtreeFlags&2064&&A!==null)A.return=o,H=A;else e:for(o=E;H!==null;){if(a=H,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Md(9,a)}}catch(F){Ke(a,a.return,F)}if(a===o){H=null;break e}var V=a.sibling;if(V!==null){V.return=a.return,H=V;break e}H=a.return}}if(ge=i,Li(),zn&&typeof zn.onPostCommitFiberRoot=="function")try{zn.onPostCommitFiberRoot(Pd,n)}catch{}r=!0}return r}finally{we=t,fn.transition=e}}return!1}function LE(n,e,t){e=Fo(t,e),e=nA(n,e,1),n=ai(n,e,1),e=Ut(),n!==null&&(Iu(n,1,e),Yt(n,e))}function Ke(n,e,t){if(n.tag===3)LE(n,n,t);else for(;e!==null;){if(e.tag===3){LE(e,n,t);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(li===null||!li.has(r))){n=Fo(t,n),n=rA(e,n,1),e=ai(e,n,1),n=Ut(),e!==null&&(Iu(e,1,n),Yt(e,n));break}}e=e.return}}function AD(n,e,t){var r=n.pingCache;r!==null&&r.delete(e),e=Ut(),n.pingedLanes|=n.suspendedLanes&t,pt===n&&(wt&t)===t&&(st===4||st===3&&(wt&130023424)===wt&&500>Je()-w_?fs(n,0):v_|=t),Yt(n,e)}function TA(n,e){e===0&&(n.mode&1?(e=Ec,Ec<<=1,!(Ec&130023424)&&(Ec=4194304)):e=1);var t=Ut();n=Er(n,e),n!==null&&(Iu(n,e,t),Yt(n,t))}function CD(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),TA(n,t)}function RD(n,e){var t=0;switch(n.tag){case 13:var r=n.stateNode,i=n.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=n.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(e),TA(n,t)}var SA;SA=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Ht.current)$t=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return $t=!1,pD(n,e,t);$t=!!(n.flags&131072)}else $t=!1,Le&&e.flags&1048576&&k0(e,Rh,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Xc(n,e),n=e.pendingProps;var i=Vo(e,Dt.current);So(e,t),i=f_(null,e,r,n,i,t);var s=p_();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Qt(r)?(s=!0,Ah(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,l_(e),i.updater=Ld,e.stateNode=i,i._reactInternals=e,xm(e,r,n,t),e=Dm(null,e,r,!0,s,t)):(e.tag=0,Le&&s&&t_(e),Mt(null,e,i,t),e=e.child),e;case 16:r=e.elementType;e:{switch(Xc(n,e),n=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=PD(r),n=wn(r,n),i){case 0:e=bm(null,e,r,n,t);break e;case 1:e=CE(null,e,r,n,t);break e;case 11:e=SE(null,e,r,n,t);break e;case 14:e=AE(null,e,r,wn(r.type,n),t);break e}throw Error(B(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),bm(n,e,r,i,t);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),CE(n,e,r,i,t);case 3:e:{if(aA(e),n===null)throw Error(B(387));r=e.pendingProps,s=e.memoizedState,i=s.element,V0(n,e),xh(e,r,null,t);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=Fo(Error(B(423)),e),e=RE(n,e,r,t,i);break e}else if(r!==i){i=Fo(Error(B(424)),e),e=RE(n,e,r,t,i);break e}else for(nn=oi(e.stateNode.containerInfo.firstChild),rn=e,Le=!0,In=null,t=b0(e,null,r,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Oo(),r===i){e=Ir(n,e,t);break e}Mt(n,e,r,t)}e=e.child}return e;case 5:return O0(e),n===null&&Rm(e),r=e.type,i=e.pendingProps,s=n!==null?n.memoizedProps:null,o=i.children,Im(r,i)?o=null:s!==null&&Im(r,s)&&(e.flags|=32),oA(n,e),Mt(n,e,o,t),e.child;case 6:return n===null&&Rm(e),null;case 13:return lA(n,e,t);case 4:return u_(e,e.stateNode.containerInfo),r=e.pendingProps,n===null?e.child=Lo(e,null,r,t):Mt(n,e,r,t),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),SE(n,e,r,i,t);case 7:return Mt(n,e,e.pendingProps,t),e.child;case 8:return Mt(n,e,e.pendingProps.children,t),e.child;case 12:return Mt(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,Re(kh,r._currentValue),r._currentValue=o,s!==null)if(Dn(s.value,o)){if(s.children===i.children&&!Ht.current){e=Ir(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=_r(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),km(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(B(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),km(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Mt(n,e,i.children,t),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,So(e,t),i=mn(i),r=r(i),e.flags|=1,Mt(n,e,r,t),e.child;case 14:return r=e.type,i=wn(r,e.pendingProps),i=wn(r.type,i),AE(n,e,r,i,t);case 15:return iA(n,e,e.type,e.pendingProps,t);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),Xc(n,e),e.tag=1,Qt(r)?(n=!0,Ah(e)):n=!1,So(e,t),tA(e,r,i),xm(e,r,i,t),Dm(null,e,r,!0,n,t);case 19:return uA(n,e,t);case 22:return sA(n,e,t)}throw Error(B(156,e.tag))};function AA(n,e){return XS(n,e)}function kD(n,e,t,r){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dn(n,e,t,r){return new kD(n,e,t,r)}function S_(n){return n=n.prototype,!(!n||!n.isReactComponent)}function PD(n){if(typeof n=="function")return S_(n)?1:0;if(n!=null){if(n=n.$$typeof,n===$g)return 11;if(n===qg)return 14}return 2}function ci(n,e){var t=n.alternate;return t===null?(t=dn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function th(n,e,t,r,i,s){var o=2;if(r=n,typeof n=="function")S_(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case ao:return ps(t.children,i,s,e);case zg:o=8,i|=8;break;case em:return n=dn(12,t,e,i|2),n.elementType=em,n.lanes=s,n;case tm:return n=dn(13,t,e,i),n.elementType=tm,n.lanes=s,n;case nm:return n=dn(19,t,e,i),n.elementType=nm,n.lanes=s,n;case OS:return Ud(t,i,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case DS:o=10;break e;case VS:o=9;break e;case $g:o=11;break e;case qg:o=14;break e;case $r:o=16,r=null;break e}throw Error(B(130,n==null?n:typeof n,""))}return e=dn(o,t,e,i),e.elementType=n,e.type=r,e.lanes=s,e}function ps(n,e,t,r){return n=dn(7,n,r,e),n.lanes=t,n}function Ud(n,e,t,r){return n=dn(22,n,r,e),n.elementType=OS,n.lanes=t,n.stateNode={isHidden:!1},n}function kp(n,e,t){return n=dn(6,n,null,e),n.lanes=t,n}function Pp(n,e,t){return e=dn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function xD(n,e,t,r,i){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=up(0),this.expirationTimes=up(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=up(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function A_(n,e,t,r,i,s,o,a,l){return n=new xD(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=dn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},l_(s),n}function ND(n,e,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:oo,key:r==null?null:""+r,children:n,containerInfo:e,implementation:t}}function CA(n){if(!n)return yi;n=n._reactInternals;e:{if(Ms(n)!==n||n.tag!==1)throw Error(B(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Qt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(B(171))}if(n.tag===1){var t=n.type;if(Qt(t))return C0(n,t,e)}return e}function RA(n,e,t,r,i,s,o,a,l){return n=A_(t,r,!0,n,i,s,o,a,l),n.context=CA(null),t=n.current,r=Ut(),i=ui(t),s=_r(r,i),s.callback=e??null,ai(t,s,i),n.current.lanes=i,Iu(n,i,r),Yt(n,r),n}function jd(n,e,t,r){var i=e.current,s=Ut(),o=ui(i);return t=CA(t),e.context===null?e.context=t:e.pendingContext=t,e=_r(s,o),e.payload={element:n},r=r===void 0?null:r,r!==null&&(e.callback=r),n=ai(i,e,o),n!==null&&(Pn(n,i,o,s),Qc(n,i,o)),o}function Fh(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function ME(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function C_(n,e){ME(n,e),(n=n.alternate)&&ME(n,e)}function bD(){return null}var kA=typeof reportError=="function"?reportError:function(n){console.error(n)};function R_(n){this._internalRoot=n}Bd.prototype.render=R_.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(B(409));jd(n,e,null,null)};Bd.prototype.unmount=R_.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Is(function(){jd(null,n,null,null)}),e[wr]=null}};function Bd(n){this._internalRoot=n}Bd.prototype.unstable_scheduleHydration=function(n){if(n){var e=s0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Gr.length&&e!==0&&e<Gr[t].priority;t++);Gr.splice(t,0,n),t===0&&a0(n)}};function k_(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function zd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function FE(){}function DD(n,e,t,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=Fh(o);s.call(c)}}var o=RA(e,r,n,0,null,!1,!1,"",FE);return n._reactRootContainer=o,n[wr]=o.current,Gl(n.nodeType===8?n.parentNode:n),Is(),o}for(;i=n.lastChild;)n.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=Fh(l);a.call(c)}}var l=A_(n,0,!1,null,null,!1,!1,"",FE);return n._reactRootContainer=l,n[wr]=l.current,Gl(n.nodeType===8?n.parentNode:n),Is(function(){jd(e,l,t,r)}),l}function $d(n,e,t,r,i){var s=t._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=Fh(o);a.call(l)}}jd(e,o,n,i)}else o=DD(t,e,n,i,r);return Fh(o)}r0=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=al(e.pendingLanes);t!==0&&(Kg(e,t|1),Yt(e,Je()),!(ge&6)&&(Uo=Je()+500,Li()))}break;case 13:Is(function(){var r=Er(n,1);if(r!==null){var i=Ut();Pn(r,n,1,i)}}),C_(n,1)}};Hg=function(n){if(n.tag===13){var e=Er(n,134217728);if(e!==null){var t=Ut();Pn(e,n,134217728,t)}C_(n,134217728)}};i0=function(n){if(n.tag===13){var e=ui(n),t=Er(n,e);if(t!==null){var r=Ut();Pn(t,n,e,r)}C_(n,e)}};s0=function(){return we};o0=function(n,e){var t=we;try{return we=n,e()}finally{we=t}};dm=function(n,e,t){switch(e){case"input":if(sm(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var r=t[e];if(r!==n&&r.form===n.form){var i=Dd(r);if(!i)throw Error(B(90));MS(r),sm(r,i)}}}break;case"textarea":US(n,t);break;case"select":e=t.value,e!=null&&wo(n,!!t.multiple,e,!1)}};WS=E_;KS=Is;var VD={usingClientEntryPoint:!1,Events:[Su,ho,Dd,qS,GS,E_]},Qa={findFiberByHostInstance:os,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},OD={bundleType:Qa.bundleType,version:Qa.version,rendererPackageName:Qa.rendererPackageName,rendererConfig:Qa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xr.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=YS(n),n===null?null:n.stateNode},findFiberByHostInstance:Qa.findFiberByHostInstance||bD,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var bc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bc.isDisabled&&bc.supportsFiber)try{Pd=bc.inject(OD),zn=bc}catch{}}ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=VD;ln.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!k_(e))throw Error(B(200));return ND(n,e,null,t)};ln.createRoot=function(n,e){if(!k_(n))throw Error(B(299));var t=!1,r="",i=kA;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=A_(n,1,!1,null,null,t,!1,r,i),n[wr]=e.current,Gl(n.nodeType===8?n.parentNode:n),new R_(e)};ln.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(B(188)):(n=Object.keys(n).join(","),Error(B(268,n)));return n=YS(e),n=n===null?null:n.stateNode,n};ln.flushSync=function(n){return Is(n)};ln.hydrate=function(n,e,t){if(!zd(e))throw Error(B(200));return $d(null,n,e,!0,t)};ln.hydrateRoot=function(n,e,t){if(!k_(n))throw Error(B(405));var r=t!=null&&t.hydratedSources||null,i=!1,s="",o=kA;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=RA(e,null,n,1,t??null,i,!1,s,o),n[wr]=e.current,Gl(n),r)for(n=0;n<r.length;n++)t=r[n],i=t._getVersion,i=i(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,i]:e.mutableSourceEagerHydrationData.push(t,i);return new Bd(e)};ln.render=function(n,e,t){if(!zd(e))throw Error(B(200));return $d(null,n,e,!1,t)};ln.unmountComponentAtNode=function(n){if(!zd(n))throw Error(B(40));return n._reactRootContainer?(Is(function(){$d(null,null,n,!1,function(){n._reactRootContainer=null,n[wr]=null})}),!0):!1};ln.unstable_batchedUpdates=E_;ln.unstable_renderSubtreeIntoContainer=function(n,e,t,r){if(!zd(t))throw Error(B(200));if(n==null||n._reactInternals===void 0)throw Error(B(38));return $d(n,e,t,!1,r)};ln.version="18.3.1-next-f1338f8080-20240426";function PA(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(PA)}catch(n){console.error(n)}}PA(),PS.exports=ln;var LD=PS.exports,xA,UE=LD;xA=UE.createRoot,UE.hydrateRoot;var jE={};/**
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
 */const NA={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const z=function(n,e){if(!n)throw ha(e)},ha=function(n){return new Error("Firebase Database ("+NA.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const bA=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},MD=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},P_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,h=s>>2,d=(s&3)<<4|a>>4;let p=(a&15)<<2|c>>6,_=c&63;l||(_=64,o||(p=64)),r.push(t[h],t[d],t[p],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(bA(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):MD(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const d=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||c==null||d==null)throw new FD;const p=s<<2|a>>4;if(r.push(p),c!==64){const _=a<<4&240|c>>2;if(r.push(_),d!==64){const I=c<<6&192|d;r.push(I)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class FD extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const DA=function(n){const e=bA(n);return P_.encodeByteArray(e,!0)},Uh=function(n){return DA(n).replace(/\./g,"")},jh=function(n){try{return P_.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function UD(n){return VA(void 0,n)}function VA(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!jD(t)||(n[t]=VA(n[t],e[t]));return n}function jD(n){return n!=="__proto__"}/**
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
 */function BD(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const zD=()=>BD().__FIREBASE_DEFAULTS__,$D=()=>{if(typeof process>"u"||typeof jE>"u")return;const n=jE.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},qD=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&jh(n[1]);return e&&JSON.parse(e)},qd=()=>{try{return zD()||$D()||qD()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},OA=n=>{var e,t;return(t=(e=qd())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},x_=n=>{const e=OA(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},LA=()=>{var n;return(n=qd())===null||n===void 0?void 0:n.config},MA=n=>{var e;return(e=qd())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Gd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function N_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Uh(JSON.stringify(t)),Uh(JSON.stringify(o)),""].join(".")}/**
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
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function b_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function GD(){var n;const e=(n=qd())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function WD(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function KD(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function FA(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function HD(){const n=ot();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function QD(){return NA.NODE_ADMIN===!0}function UA(){return!GD()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function jA(){try{return typeof indexedDB=="object"}catch{return!1}}function YD(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const JD="FirebaseError";class Jn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=JD,Object.setPrototypeOf(this,Jn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cu.prototype.create)}}class Cu{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?XD(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Jn(i,a,r)}}function XD(n,e){return n.replace(ZD,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const ZD=/\{\$([^}]+)}/g;/**
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
 */function eu(n){return JSON.parse(n)}function rt(n){return JSON.stringify(n)}/**
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
 */const BA=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=eu(jh(s[0])||""),t=eu(jh(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},e1=function(n){const e=BA(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},t1=function(n){const e=BA(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Nr(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function jo(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Gm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Bh(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function vi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(BE(s)&&BE(o)){if(!vi(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function BE(n){return n!==null&&typeof n=="object"}/**
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
 */function da(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ul(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function cl(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
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
 */class n1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)r[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const p=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(p<<1|p>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let d=0;d<80;d++){d<40?d<20?(c=a^s&(o^a),h=1518500249):(c=s^o^a,h=1859775393):d<60?(c=s&o|a&(s|o),h=2400959708):(c=s^o^a,h=3395469782);const p=(i<<5|i>>>27)+c+l+h+r[d]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=p}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function r1(n,e){const t=new i1(n,e);return t.subscribe.bind(t)}class i1{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");s1(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=xp),i.error===void 0&&(i.error=xp),i.complete===void 0&&(i.complete=xp);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function s1(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function xp(){}function D_(n,e){return`${n} failed: ${e} argument `}/**
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
 */const o1=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,z(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Wd=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function me(n){return n&&n._delegate?n._delegate:n}class Tr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Zi="[DEFAULT]";/**
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
 */class a1{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Gd;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(u1(e))try{this.getOrInitializeService({instanceIdentifier:Zi})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Zi){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zi){return this.instances.has(e)}getOptions(e=Zi){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:l1(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Zi){return this.component?this.component.multipleInstances?e:Zi:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function l1(n){return n===Zi?void 0:n}function u1(n){return n.instantiationMode==="EAGER"}/**
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
 */class c1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new a1(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));const h1={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},d1=ae.INFO,f1={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},p1=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=f1[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Kd{constructor(e){this.name=e,this._logLevel=d1,this._logHandler=p1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?h1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const m1=(n,e)=>e.some(t=>n instanceof t);let zE,$E;function g1(){return zE||(zE=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function _1(){return $E||($E=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zA=new WeakMap,Wm=new WeakMap,$A=new WeakMap,Np=new WeakMap,V_=new WeakMap;function y1(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(hi(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&zA.set(t,n)}).catch(()=>{}),V_.set(e,n),e}function v1(n){if(Wm.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Wm.set(n,e)}let Km={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Wm.get(n);if(e==="objectStoreNames")return n.objectStoreNames||$A.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return hi(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function w1(n){Km=n(Km)}function E1(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(bp(this),e,...t);return $A.set(r,e.sort?e.sort():[e]),hi(r)}:_1().includes(n)?function(...e){return n.apply(bp(this),e),hi(zA.get(this))}:function(...e){return hi(n.apply(bp(this),e))}}function I1(n){return typeof n=="function"?E1(n):(n instanceof IDBTransaction&&v1(n),m1(n,g1())?new Proxy(n,Km):n)}function hi(n){if(n instanceof IDBRequest)return y1(n);if(Np.has(n))return Np.get(n);const e=I1(n);return e!==n&&(Np.set(n,e),V_.set(e,n)),e}const bp=n=>V_.get(n);function T1(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=hi(o);return r&&o.addEventListener("upgradeneeded",l=>{r(hi(o.result),l.oldVersion,l.newVersion,hi(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const S1=["get","getKey","getAll","getAllKeys","count"],A1=["put","add","delete","clear"],Dp=new Map;function qE(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Dp.get(e))return Dp.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=A1.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||S1.includes(t)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Dp.set(e,s),s}w1(n=>({...n,get:(e,t,r)=>qE(e,t)||n.get(e,t,r),has:(e,t)=>!!qE(e,t)||n.has(e,t)}));/**
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
 */class C1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(R1(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function R1(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Hm="@firebase/app",GE="0.10.13";/**
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
 */const Sr=new Kd("@firebase/app"),k1="@firebase/app-compat",P1="@firebase/analytics-compat",x1="@firebase/analytics",N1="@firebase/app-check-compat",b1="@firebase/app-check",D1="@firebase/auth",V1="@firebase/auth-compat",O1="@firebase/database",L1="@firebase/data-connect",M1="@firebase/database-compat",F1="@firebase/functions",U1="@firebase/functions-compat",j1="@firebase/installations",B1="@firebase/installations-compat",z1="@firebase/messaging",$1="@firebase/messaging-compat",q1="@firebase/performance",G1="@firebase/performance-compat",W1="@firebase/remote-config",K1="@firebase/remote-config-compat",H1="@firebase/storage",Q1="@firebase/storage-compat",Y1="@firebase/firestore",J1="@firebase/vertexai-preview",X1="@firebase/firestore-compat",Z1="firebase",eV="10.14.1";/**
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
 */const zh="[DEFAULT]",tV={[Hm]:"fire-core",[k1]:"fire-core-compat",[x1]:"fire-analytics",[P1]:"fire-analytics-compat",[b1]:"fire-app-check",[N1]:"fire-app-check-compat",[D1]:"fire-auth",[V1]:"fire-auth-compat",[O1]:"fire-rtdb",[L1]:"fire-data-connect",[M1]:"fire-rtdb-compat",[F1]:"fire-fn",[U1]:"fire-fn-compat",[j1]:"fire-iid",[B1]:"fire-iid-compat",[z1]:"fire-fcm",[$1]:"fire-fcm-compat",[q1]:"fire-perf",[G1]:"fire-perf-compat",[W1]:"fire-rc",[K1]:"fire-rc-compat",[H1]:"fire-gcs",[Q1]:"fire-gcs-compat",[Y1]:"fire-fst",[X1]:"fire-fst-compat",[J1]:"fire-vertex","fire-js":"fire-js",[Z1]:"fire-js-all"};/**
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
 */const $h=new Map,nV=new Map,Qm=new Map;function WE(n,e){try{n.container.addComponent(e)}catch(t){Sr.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wi(n){const e=n.name;if(Qm.has(e))return Sr.debug(`There were multiple attempts to register component ${e}.`),!1;Qm.set(e,n);for(const t of $h.values())WE(t,n);for(const t of nV.values())WE(t,n);return!0}function Fs(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function rV(n,e,t=zh){Fs(n,e).clearInstance(t)}function Un(n){return n.settings!==void 0}/**
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
 */const iV={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},di=new Cu("app","Firebase",iV);/**
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
 */class sV{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Tr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw di.create("app-deleted",{appName:this._name})}}/**
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
 */const Mi=eV;function qA(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:zh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw di.create("bad-app-name",{appName:String(i)});if(t||(t=LA()),!t)throw di.create("no-options");const s=$h.get(i);if(s){if(vi(t,s.options)&&vi(r,s.config))return s;throw di.create("duplicate-app",{appName:i})}const o=new c1(i);for(const l of Qm.values())o.addComponent(l);const a=new sV(t,r,o);return $h.set(i,a),a}function Hd(n=zh){const e=$h.get(n);if(!e&&n===zh&&LA())return qA();if(!e)throw di.create("no-app",{appName:n});return e}function pn(n,e,t){var r;let i=(r=tV[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Sr.warn(a.join(" "));return}wi(new Tr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const oV="firebase-heartbeat-database",aV=1,tu="firebase-heartbeat-store";let Vp=null;function GA(){return Vp||(Vp=T1(oV,aV,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(tu)}catch(t){console.warn(t)}}}}).catch(n=>{throw di.create("idb-open",{originalErrorMessage:n.message})})),Vp}async function lV(n){try{const t=(await GA()).transaction(tu),r=await t.objectStore(tu).get(WA(n));return await t.done,r}catch(e){if(e instanceof Jn)Sr.warn(e.message);else{const t=di.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Sr.warn(t.message)}}}async function KE(n,e){try{const r=(await GA()).transaction(tu,"readwrite");await r.objectStore(tu).put(e,WA(n)),await r.done}catch(t){if(t instanceof Jn)Sr.warn(t.message);else{const r=di.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Sr.warn(r.message)}}}function WA(n){return`${n.name}!${n.options.appId}`}/**
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
 */const uV=1024,cV=30*24*60*60*1e3;class hV{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new fV(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=HE();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=cV}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Sr.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=HE(),{heartbeatsToSend:r,unsentEntries:i}=dV(this._heartbeatsCache.heartbeats),s=Uh(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Sr.warn(t),""}}}function HE(){return new Date().toISOString().substring(0,10)}function dV(n,e=uV){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),QE(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),QE(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class fV{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return jA()?YD().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await lV(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return KE(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return KE(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function QE(n){return Uh(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function pV(n){wi(new Tr("platform-logger",e=>new C1(e),"PRIVATE")),wi(new Tr("heartbeat",e=>new hV(e),"PRIVATE")),pn(Hm,GE,n),pn(Hm,GE,"esm2017"),pn("fire-js","")}pV("");function O_(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function KA(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const mV=KA,HA=new Cu("auth","Firebase",KA());/**
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
 */const qh=new Kd("@firebase/auth");function gV(n,...e){qh.logLevel<=ae.WARN&&qh.warn(`Auth (${Mi}): ${n}`,...e)}function nh(n,...e){qh.logLevel<=ae.ERROR&&qh.error(`Auth (${Mi}): ${n}`,...e)}/**
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
 */function _n(n,...e){throw M_(n,...e)}function xn(n,...e){return M_(n,...e)}function L_(n,e,t){const r=Object.assign(Object.assign({},mV()),{[e]:t});return new Cu("auth","Firebase",r).create(e,{appName:n.name})}function fi(n){return L_(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function _V(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&_n(n,"argument-error"),L_(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function M_(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return HA.create(n,...e)}function ee(n,e,...t){if(!n)throw M_(e,...t)}function dr(n){const e="INTERNAL ASSERTION FAILED: "+n;throw nh(e),new Error(e)}function Ar(n,e){n||dr(e)}/**
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
 */function Ym(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function yV(){return YE()==="http:"||YE()==="https:"}function YE(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function vV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(yV()||KD()||"connection"in navigator)?navigator.onLine:!0}function wV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ru{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ar(t>e,"Short delay should be less than long delay!"),this.isMobile=b_()||FA()}get(){return vV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function F_(n,e){Ar(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class QA{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;dr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;dr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;dr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const EV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const IV=new Ru(3e4,6e4);function Us(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Fi(n,e,t,r,i={}){return YA(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=da(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},s);return WD()||(c.referrerPolicy="no-referrer"),QA.fetch()(JA(n,n.config.apiHost,t,a),c)})}async function YA(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},EV),e);try{const i=new SV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Dc(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dc(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Dc(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Dc(n,"user-disabled",o);const h=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw L_(n,h,c);_n(n,h)}}catch(i){if(i instanceof Jn)throw i;_n(n,"network-request-failed",{message:String(i)})}}async function Qd(n,e,t,r,i={}){const s=await Fi(n,e,t,r,i);return"mfaPendingCredential"in s&&_n(n,"multi-factor-auth-required",{_serverResponse:s}),s}function JA(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?F_(n.config,i):`${n.config.apiScheme}://${i}`}function TV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class SV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(xn(this.auth,"network-request-failed")),IV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Dc(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=xn(n,e,r);return i.customData._tokenResponse=t,i}function JE(n){return n!==void 0&&n.enterprise!==void 0}class AV{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return TV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function CV(n,e){return Fi(n,"GET","/v2/recaptchaConfig",Us(n,e))}/**
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
 */async function RV(n,e){return Fi(n,"POST","/v1/accounts:delete",e)}async function XA(n,e){return Fi(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Sl(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function kV(n,e=!1){const t=me(n),r=await t.getIdToken(e),i=U_(r);ee(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Sl(Op(i.auth_time)),issuedAtTime:Sl(Op(i.iat)),expirationTime:Sl(Op(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Op(n){return Number(n)*1e3}function U_(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return nh("JWT malformed, contained fewer than 3 sections"),null;try{const i=jh(t);return i?JSON.parse(i):(nh("Failed to decode base64 JWT payload"),null)}catch(i){return nh("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function XE(n){const e=U_(n);return ee(e,"internal-error"),ee(typeof e.exp<"u","internal-error"),ee(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function nu(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Jn&&PV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function PV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class xV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Jm{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Sl(this.lastLoginAt),this.creationTime=Sl(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Gh(n){var e;const t=n.auth,r=await n.getIdToken(),i=await nu(n,XA(t,{idToken:r}));ee(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ZA(s.providerUserInfo):[],a=bV(n.providerData,o),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Jm(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function NV(n){const e=me(n);await Gh(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ZA(n){return n.map(e=>{var{providerId:t}=e,r=O_(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function DV(n,e){const t=await YA(n,{},async()=>{const r=da({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=JA(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",QA.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function VV(n,e){return Fi(n,"POST","/v2/accounts:revokeToken",Us(n,e))}/**
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
 */class Co{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ee(e.idToken,"internal-error"),ee(typeof e.idToken<"u","internal-error"),ee(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):XE(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ee(e.length!==0,"internal-error");const t=XE(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ee(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await DV(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new Co;return r&&(ee(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(ee(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(ee(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Co,this.toJSON())}_performRefresh(){return dr("not implemented")}}/**
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
 */function jr(n,e){ee(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class fr{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=O_(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new xV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Jm(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await nu(this,this.stsTokenManager.getToken(this.auth,e));return ee(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return kV(this,e)}reload(){return NV(this)}_assign(e){this!==e&&(ee(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new fr(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ee(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Gh(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Un(this.auth.app))return Promise.reject(fi(this.auth));const e=await this.getIdToken();return await nu(this,RV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,l,c,h;const d=(r=t.displayName)!==null&&r!==void 0?r:void 0,p=(i=t.email)!==null&&i!==void 0?i:void 0,_=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,I=(o=t.photoURL)!==null&&o!==void 0?o:void 0,P=(a=t.tenantId)!==null&&a!==void 0?a:void 0,x=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,v=(c=t.createdAt)!==null&&c!==void 0?c:void 0,E=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:A,emailVerified:V,isAnonymous:F,providerData:M,stsTokenManager:S}=t;ee(A&&S,e,"internal-error");const w=Co.fromJSON(this.name,S);ee(typeof A=="string",e,"internal-error"),jr(d,e.name),jr(p,e.name),ee(typeof V=="boolean",e,"internal-error"),ee(typeof F=="boolean",e,"internal-error"),jr(_,e.name),jr(I,e.name),jr(P,e.name),jr(x,e.name),jr(v,e.name),jr(E,e.name);const C=new fr({uid:A,auth:e,email:p,emailVerified:V,displayName:d,isAnonymous:F,photoURL:I,phoneNumber:_,tenantId:P,stsTokenManager:w,createdAt:v,lastLoginAt:E});return M&&Array.isArray(M)&&(C.providerData=M.map(k=>Object.assign({},k))),x&&(C._redirectEventId=x),C}static async _fromIdTokenResponse(e,t,r=!1){const i=new Co;i.updateFromServerResponse(t);const s=new fr({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Gh(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];ee(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?ZA(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Co;a.updateFromIdToken(r);const l=new fr({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Jm(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,c),l}}/**
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
 */const ZE=new Map;function pr(n){Ar(n instanceof Function,"Expected a class definition");let e=ZE.get(n);return e?(Ar(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ZE.set(n,e),e)}/**
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
 */class eC{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}eC.type="NONE";const eI=eC;/**
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
 */function rh(n,e,t){return`firebase:${n}:${e}:${t}`}class Ro{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=rh(this.userKey,i.apiKey,s),this.fullPersistenceKey=rh("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?fr._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Ro(pr(eI),e,r);const i=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||pr(eI);const o=rh(r,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const d=fr._fromJSON(e,h);c!==s&&(a=d),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Ro(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new Ro(s,e,r))}}/**
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
 */function tI(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(iC(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tC(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(oC(e))return"Blackberry";if(aC(e))return"Webos";if(nC(e))return"Safari";if((e.includes("chrome/")||rC(e))&&!e.includes("edge/"))return"Chrome";if(sC(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function tC(n=ot()){return/firefox\//i.test(n)}function nC(n=ot()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function rC(n=ot()){return/crios\//i.test(n)}function iC(n=ot()){return/iemobile/i.test(n)}function sC(n=ot()){return/android/i.test(n)}function oC(n=ot()){return/blackberry/i.test(n)}function aC(n=ot()){return/webos/i.test(n)}function j_(n=ot()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function OV(n=ot()){var e;return j_(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function LV(){return HD()&&document.documentMode===10}function lC(n=ot()){return j_(n)||sC(n)||aC(n)||oC(n)||/windows phone/i.test(n)||iC(n)}/**
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
 */function uC(n,e=[]){let t;switch(n){case"Browser":t=tI(ot());break;case"Worker":t=`${tI(ot())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Mi}/${r}`}/**
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
 */class MV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function FV(n,e={}){return Fi(n,"GET","/v2/passwordPolicy",Us(n,e))}/**
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
 */const UV=6;class jV{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:UV,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class BV{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new nI(this),this.idTokenSubscription=new nI(this),this.beforeStateQueue=new MV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=HA,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=pr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await Ro.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await XA(this,{idToken:e}),r=await fr._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Un(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ee(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Gh(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Un(this.app))return Promise.reject(fi(this));const t=e?me(e):null;return t&&ee(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ee(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Un(this.app)?Promise.reject(fi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Un(this.app)?Promise.reject(fi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(pr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await FV(this),t=new jV(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Cu("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await VV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&pr(e)||this._popupRedirectResolver;ee(t,this,"argument-error"),this.redirectPersistenceManager=await Ro.create(this,[pr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ee(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ee(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=uC(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&gV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function js(n){return me(n)}class nI{constructor(e){this.auth=e,this.observer=null,this.addObserver=r1(t=>this.observer=t)}get next(){return ee(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Yd={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function zV(n){Yd=n}function cC(n){return Yd.loadJS(n)}function $V(){return Yd.recaptchaEnterpriseScript}function qV(){return Yd.gapiScript}function GV(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const WV="recaptcha-enterprise",KV="NO_RECAPTCHA";class HV{constructor(e){this.type=WV,this.auth=js(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{CV(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new AV(l);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function i(s,o,a){const l=window.grecaptcha;JE(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(KV)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&JE(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=$V();l.length!==0&&(l+=a),cC(l).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function rI(n,e,t,r=!1){const i=new HV(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function iI(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await rI(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await rI(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}/**
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
 */function QV(n,e){const t=Fs(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(vi(s,e??{}))return i;_n(i,"already-initialized")}return t.initialize({options:e})}function YV(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(pr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function JV(n,e,t){const r=js(n);ee(r._canInitEmulator,r,"emulator-config-failed"),ee(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=hC(e),{host:o,port:a}=XV(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),ZV()}function hC(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function XV(n){const e=hC(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:sI(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:sI(o)}}}function sI(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function ZV(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class B_{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return dr("not implemented")}_getIdTokenResponse(e){return dr("not implemented")}_linkToIdToken(e,t){return dr("not implemented")}_getReauthenticationResolver(e){return dr("not implemented")}}async function eO(n,e){return Fi(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function tO(n,e){return Qd(n,"POST","/v1/accounts:signInWithPassword",Us(n,e))}/**
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
 */async function nO(n,e){return Qd(n,"POST","/v1/accounts:signInWithEmailLink",Us(n,e))}async function rO(n,e){return Qd(n,"POST","/v1/accounts:signInWithEmailLink",Us(n,e))}/**
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
 */class ru extends B_{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new ru(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ru(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return iI(e,t,"signInWithPassword",tO);case"emailLink":return nO(e,{email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return iI(e,r,"signUpPassword",eO);case"emailLink":return rO(e,{idToken:t,email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function ko(n,e){return Qd(n,"POST","/v1/accounts:signInWithIdp",Us(n,e))}/**
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
 */const iO="http://localhost";class Ts extends B_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ts(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_n("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=O_(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Ts(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ko(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,ko(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ko(e,t)}buildRequest(){const e={requestUri:iO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=da(t)}return e}}/**
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
 */function sO(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function oO(n){const e=ul(cl(n)).link,t=e?ul(cl(e)).deep_link_id:null,r=ul(cl(n)).deep_link_id;return(r?ul(cl(r)).link:null)||r||t||e||n}class z_{constructor(e){var t,r,i,s,o,a;const l=ul(cl(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,h=(r=l.oobCode)!==null&&r!==void 0?r:null,d=sO((i=l.mode)!==null&&i!==void 0?i:null);ee(c&&h&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=h,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=oO(e);try{return new z_(t)}catch{return null}}}/**
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
 */class fa{constructor(){this.providerId=fa.PROVIDER_ID}static credential(e,t){return ru._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=z_.parseLink(t);return ee(r,"argument-error"),ru._fromEmailAndCode(e,r.code,r.tenantId)}}fa.PROVIDER_ID="password";fa.EMAIL_PASSWORD_SIGN_IN_METHOD="password";fa.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class $_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ku extends $_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Kr extends ku{constructor(){super("facebook.com")}static credential(e){return Ts._fromParams({providerId:Kr.PROVIDER_ID,signInMethod:Kr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kr.credentialFromTaggedObject(e)}static credentialFromError(e){return Kr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kr.credential(e.oauthAccessToken)}catch{return null}}}Kr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kr.PROVIDER_ID="facebook.com";/**
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
 */class ur extends ku{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ts._fromParams({providerId:ur.PROVIDER_ID,signInMethod:ur.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ur.credentialFromTaggedObject(e)}static credentialFromError(e){return ur.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ur.credential(t,r)}catch{return null}}}ur.GOOGLE_SIGN_IN_METHOD="google.com";ur.PROVIDER_ID="google.com";/**
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
 */class Hr extends ku{constructor(){super("github.com")}static credential(e){return Ts._fromParams({providerId:Hr.PROVIDER_ID,signInMethod:Hr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Hr.credentialFromTaggedObject(e)}static credentialFromError(e){return Hr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Hr.credential(e.oauthAccessToken)}catch{return null}}}Hr.GITHUB_SIGN_IN_METHOD="github.com";Hr.PROVIDER_ID="github.com";/**
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
 */class Qr extends ku{constructor(){super("twitter.com")}static credential(e,t){return Ts._fromParams({providerId:Qr.PROVIDER_ID,signInMethod:Qr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qr.credentialFromTaggedObject(e)}static credentialFromError(e){return Qr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Qr.credential(t,r)}catch{return null}}}Qr.TWITTER_SIGN_IN_METHOD="twitter.com";Qr.PROVIDER_ID="twitter.com";/**
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
 */class Bo{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await fr._fromIdTokenResponse(e,r,i),o=oI(r);return new Bo({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=oI(r);return new Bo({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function oI(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Wh extends Jn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Wh.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Wh(e,t,r,i)}}function dC(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Wh._fromErrorAndOperation(n,s,e,r):s})}async function aO(n,e,t=!1){const r=await nu(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Bo._forOperation(n,"link",r)}/**
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
 */async function lO(n,e,t=!1){const{auth:r}=n;if(Un(r.app))return Promise.reject(fi(r));const i="reauthenticate";try{const s=await nu(n,dC(r,i,e,n),t);ee(s.idToken,r,"internal-error");const o=U_(s.idToken);ee(o,r,"internal-error");const{sub:a}=o;return ee(n.uid===a,r,"user-mismatch"),Bo._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&_n(r,"user-mismatch"),s}}/**
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
 */async function fC(n,e,t=!1){if(Un(n.app))return Promise.reject(fi(n));const r="signIn",i=await dC(n,r,e),s=await Bo._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function uO(n,e){return fC(js(n),e)}/**
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
 */async function cO(n){const e=js(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function hO(n,e,t){return Un(n.app)?Promise.reject(fi(n)):uO(me(n),fa.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&cO(n),r})}function dO(n,e,t,r){return me(n).onIdTokenChanged(e,t,r)}function fO(n,e,t){return me(n).beforeAuthStateChanged(e,t)}function pO(n,e,t,r){return me(n).onAuthStateChanged(e,t,r)}function Xm(n){return me(n).signOut()}const Kh="__sak";/**
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
 */class pC{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Kh,"1"),this.storage.removeItem(Kh),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const mO=1e3,gO=10;class mC extends pC{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=lC(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);LV()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,gO):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},mO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}mC.type="LOCAL";const _O=mC;/**
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
 */class gC extends pC{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gC.type="SESSION";const _C=gC;/**
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
 */function yO(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Jd{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Jd(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(t.origin,s)),l=await yO(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Jd.receivers=[];/**
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
 */function q_(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class vO{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const c=q_("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const p=d;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(h),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function qn(){return window}function wO(n){qn().location.href=n}/**
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
 */function yC(){return typeof qn().WorkerGlobalScope<"u"&&typeof qn().importScripts=="function"}async function EO(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function IO(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function TO(){return yC()?self:null}/**
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
 */const vC="firebaseLocalStorageDb",SO=1,Hh="firebaseLocalStorage",wC="fbase_key";class Pu{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Xd(n,e){return n.transaction([Hh],e?"readwrite":"readonly").objectStore(Hh)}function AO(){const n=indexedDB.deleteDatabase(vC);return new Pu(n).toPromise()}function Zm(){const n=indexedDB.open(vC,SO);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Hh,{keyPath:wC})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Hh)?e(r):(r.close(),await AO(),e(await Zm()))})})}async function aI(n,e,t){const r=Xd(n,!0).put({[wC]:e,value:t});return new Pu(r).toPromise()}async function CO(n,e){const t=Xd(n,!1).get(e),r=await new Pu(t).toPromise();return r===void 0?null:r.value}function lI(n,e){const t=Xd(n,!0).delete(e);return new Pu(t).toPromise()}const RO=800,kO=3;class EC{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zm(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>kO)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return yC()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Jd._getInstance(TO()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await EO(),!this.activeServiceWorker)return;this.sender=new vO(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||IO()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zm();return await aI(e,Kh,"1"),await lI(e,Kh),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>aI(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>CO(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>lI(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Xd(i,!1).getAll();return new Pu(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),RO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}EC.type="LOCAL";const PO=EC;new Ru(3e4,6e4);/**
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
 */function IC(n,e){return e?pr(e):(ee(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class G_ extends B_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ko(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ko(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ko(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function xO(n){return fC(n.auth,new G_(n),n.bypassAuthState)}function NO(n){const{auth:e,user:t}=n;return ee(t,e,"internal-error"),lO(t,new G_(n),n.bypassAuthState)}async function bO(n){const{auth:e,user:t}=n;return ee(t,e,"internal-error"),aO(t,new G_(n),n.bypassAuthState)}/**
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
 */class TC{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return xO;case"linkViaPopup":case"linkViaRedirect":return bO;case"reauthViaPopup":case"reauthViaRedirect":return NO;default:_n(this.auth,"internal-error")}}resolve(e){Ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ar(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const DO=new Ru(2e3,1e4);async function VO(n,e,t){if(Un(n.app))return Promise.reject(xn(n,"operation-not-supported-in-this-environment"));const r=js(n);_V(n,e,$_);const i=IC(r,t);return new us(r,"signInViaPopup",e,i).executeNotNull()}class us extends TC{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,us.currentPopupAction&&us.currentPopupAction.cancel(),us.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ee(e,this.auth,"internal-error"),e}async onExecution(){Ar(this.filter.length===1,"Popup operations only handle one event");const e=q_();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(xn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(xn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,us.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(xn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,DO.get())};e()}}us.currentPopupAction=null;/**
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
 */const OO="pendingRedirect",ih=new Map;class LO extends TC{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ih.get(this.auth._key());if(!e){try{const r=await MO(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ih.set(this.auth._key(),e)}return this.bypassAuthState||ih.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function MO(n,e){const t=jO(e),r=UO(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function FO(n,e){ih.set(n._key(),e)}function UO(n){return pr(n._redirectPersistence)}function jO(n){return rh(OO,n.config.apiKey,n.name)}async function BO(n,e,t=!1){if(Un(n.app))return Promise.reject(fi(n));const r=js(n),i=IC(r,e),o=await new LO(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const zO=10*60*1e3;class $O{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qO(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!SC(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(xn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=zO&&this.cachedEventUids.clear(),this.cachedEventUids.has(uI(e))}saveEventToCache(e){this.cachedEventUids.add(uI(e)),this.lastProcessedEventTime=Date.now()}}function uI(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function SC({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function qO(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return SC(n);default:return!1}}/**
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
 */async function GO(n,e={}){return Fi(n,"GET","/v1/projects",e)}/**
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
 */const WO=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,KO=/^https?/;async function HO(n){if(n.config.emulator)return;const{authorizedDomains:e}=await GO(n);for(const t of e)try{if(QO(t))return}catch{}_n(n,"unauthorized-domain")}function QO(n){const e=Ym(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!KO.test(t))return!1;if(WO.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const YO=new Ru(3e4,6e4);function cI(){const n=qn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function JO(n){return new Promise((e,t)=>{var r,i,s;function o(){cI(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{cI(),t(xn(n,"network-request-failed"))},timeout:YO.get()})}if(!((i=(r=qn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=qn().gapi)===null||s===void 0)&&s.load)o();else{const a=GV("iframefcb");return qn()[a]=()=>{gapi.load?o():t(xn(n,"network-request-failed"))},cC(`${qV()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw sh=null,e})}let sh=null;function XO(n){return sh=sh||JO(n),sh}/**
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
 */const ZO=new Ru(5e3,15e3),eL="__/auth/iframe",tL="emulator/auth/iframe",nL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},rL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function iL(n){const e=n.config;ee(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?F_(e,tL):`https://${n.config.authDomain}/${eL}`,r={apiKey:e.apiKey,appName:n.name,v:Mi},i=rL.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${da(r).slice(1)}`}async function sL(n){const e=await XO(n),t=qn().gapi;return ee(t,n,"internal-error"),e.open({where:document.body,url:iL(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:nL,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=xn(n,"network-request-failed"),a=qn().setTimeout(()=>{s(o)},ZO.get());function l(){qn().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const oL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},aL=500,lL=600,uL="_blank",cL="http://localhost";class hI{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function hL(n,e,t,r=aL,i=lL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},oL),{width:r.toString(),height:i.toString(),top:s,left:o}),c=ot().toLowerCase();t&&(a=rC(c)?uL:t),tC(c)&&(e=e||cL,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[_,I])=>`${p}${_}=${I},`,"");if(OV(c)&&a!=="_self")return dL(e||"",a),new hI(null);const d=window.open(e||"",a,h);ee(d,n,"popup-blocked");try{d.focus()}catch{}return new hI(d)}function dL(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const fL="__/auth/handler",pL="emulator/auth/handler",mL=encodeURIComponent("fac");async function dI(n,e,t,r,i,s){ee(n.config.authDomain,n,"auth-domain-config-required"),ee(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Mi,eventId:i};if(e instanceof $_){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Gm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof ku){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${mL}=${encodeURIComponent(l)}`:"";return`${gL(n)}?${da(a).slice(1)}${c}`}function gL({config:n}){return n.emulator?F_(n,pL):`https://${n.authDomain}/${fL}`}/**
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
 */const Lp="webStorageSupport";class _L{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_C,this._completeRedirectFn=BO,this._overrideRedirectResult=FO}async _openPopup(e,t,r,i){var s;Ar((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await dI(e,t,r,Ym(),i);return hL(e,o,q_())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await dI(e,t,r,Ym(),i);return wO(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Ar(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await sL(e),r=new $O(e);return t.register("authEvent",i=>(ee(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lp,{type:Lp},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Lp];o!==void 0&&t(!!o),_n(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=HO(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return lC()||nC()||j_()}}const yL=_L;var fI="@firebase/auth",pI="1.7.9";/**
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
 */class vL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ee(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function wL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function EL(n){wi(new Tr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;ee(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:uC(n)},c=new BV(r,i,s,l);return YV(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),wi(new Tr("auth-internal",e=>{const t=js(e.getProvider("auth").getImmediate());return(r=>new vL(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pn(fI,pI,wL(n)),pn(fI,pI,"esm2017")}/**
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
 */const IL=5*60,TL=MA("authIdTokenMaxAge")||IL;let mI=null;const SL=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>TL)return;const i=t==null?void 0:t.token;mI!==i&&(mI=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function AL(n=Hd()){const e=Fs(n,"auth");if(e.isInitialized())return e.getImmediate();const t=QV(n,{popupRedirectResolver:yL,persistence:[PO,_O,_C]}),r=MA("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=SL(s.toString());fO(t,o,()=>o(t.currentUser)),dO(t,a=>o(a))}}const i=OA("auth");return i&&JV(t,`http://${i}`),t}function CL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}zV({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=xn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",CL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});EL("Browser");var gI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ms,AC;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(S,w){function C(){}C.prototype=w.prototype,S.D=w.prototype,S.prototype=new C,S.prototype.constructor=S,S.C=function(k,T,N){for(var R=Array(arguments.length-2),Vt=2;Vt<arguments.length;Vt++)R[Vt-2]=arguments[Vt];return w.prototype[T].apply(k,R)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(S,w,C){C||(C=0);var k=Array(16);if(typeof w=="string")for(var T=0;16>T;++T)k[T]=w.charCodeAt(C++)|w.charCodeAt(C++)<<8|w.charCodeAt(C++)<<16|w.charCodeAt(C++)<<24;else for(T=0;16>T;++T)k[T]=w[C++]|w[C++]<<8|w[C++]<<16|w[C++]<<24;w=S.g[0],C=S.g[1],T=S.g[2];var N=S.g[3],R=w+(N^C&(T^N))+k[0]+3614090360&4294967295;w=C+(R<<7&4294967295|R>>>25),R=N+(T^w&(C^T))+k[1]+3905402710&4294967295,N=w+(R<<12&4294967295|R>>>20),R=T+(C^N&(w^C))+k[2]+606105819&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(w^T&(N^w))+k[3]+3250441966&4294967295,C=T+(R<<22&4294967295|R>>>10),R=w+(N^C&(T^N))+k[4]+4118548399&4294967295,w=C+(R<<7&4294967295|R>>>25),R=N+(T^w&(C^T))+k[5]+1200080426&4294967295,N=w+(R<<12&4294967295|R>>>20),R=T+(C^N&(w^C))+k[6]+2821735955&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(w^T&(N^w))+k[7]+4249261313&4294967295,C=T+(R<<22&4294967295|R>>>10),R=w+(N^C&(T^N))+k[8]+1770035416&4294967295,w=C+(R<<7&4294967295|R>>>25),R=N+(T^w&(C^T))+k[9]+2336552879&4294967295,N=w+(R<<12&4294967295|R>>>20),R=T+(C^N&(w^C))+k[10]+4294925233&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(w^T&(N^w))+k[11]+2304563134&4294967295,C=T+(R<<22&4294967295|R>>>10),R=w+(N^C&(T^N))+k[12]+1804603682&4294967295,w=C+(R<<7&4294967295|R>>>25),R=N+(T^w&(C^T))+k[13]+4254626195&4294967295,N=w+(R<<12&4294967295|R>>>20),R=T+(C^N&(w^C))+k[14]+2792965006&4294967295,T=N+(R<<17&4294967295|R>>>15),R=C+(w^T&(N^w))+k[15]+1236535329&4294967295,C=T+(R<<22&4294967295|R>>>10),R=w+(T^N&(C^T))+k[1]+4129170786&4294967295,w=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(w^C))+k[6]+3225465664&4294967295,N=w+(R<<9&4294967295|R>>>23),R=T+(w^C&(N^w))+k[11]+643717713&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^w&(T^N))+k[0]+3921069994&4294967295,C=T+(R<<20&4294967295|R>>>12),R=w+(T^N&(C^T))+k[5]+3593408605&4294967295,w=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(w^C))+k[10]+38016083&4294967295,N=w+(R<<9&4294967295|R>>>23),R=T+(w^C&(N^w))+k[15]+3634488961&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^w&(T^N))+k[4]+3889429448&4294967295,C=T+(R<<20&4294967295|R>>>12),R=w+(T^N&(C^T))+k[9]+568446438&4294967295,w=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(w^C))+k[14]+3275163606&4294967295,N=w+(R<<9&4294967295|R>>>23),R=T+(w^C&(N^w))+k[3]+4107603335&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^w&(T^N))+k[8]+1163531501&4294967295,C=T+(R<<20&4294967295|R>>>12),R=w+(T^N&(C^T))+k[13]+2850285829&4294967295,w=C+(R<<5&4294967295|R>>>27),R=N+(C^T&(w^C))+k[2]+4243563512&4294967295,N=w+(R<<9&4294967295|R>>>23),R=T+(w^C&(N^w))+k[7]+1735328473&4294967295,T=N+(R<<14&4294967295|R>>>18),R=C+(N^w&(T^N))+k[12]+2368359562&4294967295,C=T+(R<<20&4294967295|R>>>12),R=w+(C^T^N)+k[5]+4294588738&4294967295,w=C+(R<<4&4294967295|R>>>28),R=N+(w^C^T)+k[8]+2272392833&4294967295,N=w+(R<<11&4294967295|R>>>21),R=T+(N^w^C)+k[11]+1839030562&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^w)+k[14]+4259657740&4294967295,C=T+(R<<23&4294967295|R>>>9),R=w+(C^T^N)+k[1]+2763975236&4294967295,w=C+(R<<4&4294967295|R>>>28),R=N+(w^C^T)+k[4]+1272893353&4294967295,N=w+(R<<11&4294967295|R>>>21),R=T+(N^w^C)+k[7]+4139469664&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^w)+k[10]+3200236656&4294967295,C=T+(R<<23&4294967295|R>>>9),R=w+(C^T^N)+k[13]+681279174&4294967295,w=C+(R<<4&4294967295|R>>>28),R=N+(w^C^T)+k[0]+3936430074&4294967295,N=w+(R<<11&4294967295|R>>>21),R=T+(N^w^C)+k[3]+3572445317&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^w)+k[6]+76029189&4294967295,C=T+(R<<23&4294967295|R>>>9),R=w+(C^T^N)+k[9]+3654602809&4294967295,w=C+(R<<4&4294967295|R>>>28),R=N+(w^C^T)+k[12]+3873151461&4294967295,N=w+(R<<11&4294967295|R>>>21),R=T+(N^w^C)+k[15]+530742520&4294967295,T=N+(R<<16&4294967295|R>>>16),R=C+(T^N^w)+k[2]+3299628645&4294967295,C=T+(R<<23&4294967295|R>>>9),R=w+(T^(C|~N))+k[0]+4096336452&4294967295,w=C+(R<<6&4294967295|R>>>26),R=N+(C^(w|~T))+k[7]+1126891415&4294967295,N=w+(R<<10&4294967295|R>>>22),R=T+(w^(N|~C))+k[14]+2878612391&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~w))+k[5]+4237533241&4294967295,C=T+(R<<21&4294967295|R>>>11),R=w+(T^(C|~N))+k[12]+1700485571&4294967295,w=C+(R<<6&4294967295|R>>>26),R=N+(C^(w|~T))+k[3]+2399980690&4294967295,N=w+(R<<10&4294967295|R>>>22),R=T+(w^(N|~C))+k[10]+4293915773&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~w))+k[1]+2240044497&4294967295,C=T+(R<<21&4294967295|R>>>11),R=w+(T^(C|~N))+k[8]+1873313359&4294967295,w=C+(R<<6&4294967295|R>>>26),R=N+(C^(w|~T))+k[15]+4264355552&4294967295,N=w+(R<<10&4294967295|R>>>22),R=T+(w^(N|~C))+k[6]+2734768916&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~w))+k[13]+1309151649&4294967295,C=T+(R<<21&4294967295|R>>>11),R=w+(T^(C|~N))+k[4]+4149444226&4294967295,w=C+(R<<6&4294967295|R>>>26),R=N+(C^(w|~T))+k[11]+3174756917&4294967295,N=w+(R<<10&4294967295|R>>>22),R=T+(w^(N|~C))+k[2]+718787259&4294967295,T=N+(R<<15&4294967295|R>>>17),R=C+(N^(T|~w))+k[9]+3951481745&4294967295,S.g[0]=S.g[0]+w&4294967295,S.g[1]=S.g[1]+(T+(R<<21&4294967295|R>>>11))&4294967295,S.g[2]=S.g[2]+T&4294967295,S.g[3]=S.g[3]+N&4294967295}r.prototype.u=function(S,w){w===void 0&&(w=S.length);for(var C=w-this.blockSize,k=this.B,T=this.h,N=0;N<w;){if(T==0)for(;N<=C;)i(this,S,N),N+=this.blockSize;if(typeof S=="string"){for(;N<w;)if(k[T++]=S.charCodeAt(N++),T==this.blockSize){i(this,k),T=0;break}}else for(;N<w;)if(k[T++]=S[N++],T==this.blockSize){i(this,k),T=0;break}}this.h=T,this.o+=w},r.prototype.v=function(){var S=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);S[0]=128;for(var w=1;w<S.length-8;++w)S[w]=0;var C=8*this.o;for(w=S.length-8;w<S.length;++w)S[w]=C&255,C/=256;for(this.u(S),S=Array(16),w=C=0;4>w;++w)for(var k=0;32>k;k+=8)S[C++]=this.g[w]>>>k&255;return S};function s(S,w){var C=a;return Object.prototype.hasOwnProperty.call(C,S)?C[S]:C[S]=w(S)}function o(S,w){this.h=w;for(var C=[],k=!0,T=S.length-1;0<=T;T--){var N=S[T]|0;k&&N==w||(C[T]=N,k=!1)}this.g=C}var a={};function l(S){return-128<=S&&128>S?s(S,function(w){return new o([w|0],0>w?-1:0)}):new o([S|0],0>S?-1:0)}function c(S){if(isNaN(S)||!isFinite(S))return d;if(0>S)return x(c(-S));for(var w=[],C=1,k=0;S>=C;k++)w[k]=S/C|0,C*=4294967296;return new o(w,0)}function h(S,w){if(S.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(S.charAt(0)=="-")return x(h(S.substring(1),w));if(0<=S.indexOf("-"))throw Error('number format error: interior "-" character');for(var C=c(Math.pow(w,8)),k=d,T=0;T<S.length;T+=8){var N=Math.min(8,S.length-T),R=parseInt(S.substring(T,T+N),w);8>N?(N=c(Math.pow(w,N)),k=k.j(N).add(c(R))):(k=k.j(C),k=k.add(c(R)))}return k}var d=l(0),p=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(P(this))return-x(this).m();for(var S=0,w=1,C=0;C<this.g.length;C++){var k=this.i(C);S+=(0<=k?k:4294967296+k)*w,w*=4294967296}return S},n.toString=function(S){if(S=S||10,2>S||36<S)throw Error("radix out of range: "+S);if(I(this))return"0";if(P(this))return"-"+x(this).toString(S);for(var w=c(Math.pow(S,6)),C=this,k="";;){var T=V(C,w).g;C=v(C,T.j(w));var N=((0<C.g.length?C.g[0]:C.h)>>>0).toString(S);if(C=T,I(C))return N+k;for(;6>N.length;)N="0"+N;k=N+k}},n.i=function(S){return 0>S?0:S<this.g.length?this.g[S]:this.h};function I(S){if(S.h!=0)return!1;for(var w=0;w<S.g.length;w++)if(S.g[w]!=0)return!1;return!0}function P(S){return S.h==-1}n.l=function(S){return S=v(this,S),P(S)?-1:I(S)?0:1};function x(S){for(var w=S.g.length,C=[],k=0;k<w;k++)C[k]=~S.g[k];return new o(C,~S.h).add(p)}n.abs=function(){return P(this)?x(this):this},n.add=function(S){for(var w=Math.max(this.g.length,S.g.length),C=[],k=0,T=0;T<=w;T++){var N=k+(this.i(T)&65535)+(S.i(T)&65535),R=(N>>>16)+(this.i(T)>>>16)+(S.i(T)>>>16);k=R>>>16,N&=65535,R&=65535,C[T]=R<<16|N}return new o(C,C[C.length-1]&-2147483648?-1:0)};function v(S,w){return S.add(x(w))}n.j=function(S){if(I(this)||I(S))return d;if(P(this))return P(S)?x(this).j(x(S)):x(x(this).j(S));if(P(S))return x(this.j(x(S)));if(0>this.l(_)&&0>S.l(_))return c(this.m()*S.m());for(var w=this.g.length+S.g.length,C=[],k=0;k<2*w;k++)C[k]=0;for(k=0;k<this.g.length;k++)for(var T=0;T<S.g.length;T++){var N=this.i(k)>>>16,R=this.i(k)&65535,Vt=S.i(T)>>>16,Vn=S.i(T)&65535;C[2*k+2*T]+=R*Vn,E(C,2*k+2*T),C[2*k+2*T+1]+=N*Vn,E(C,2*k+2*T+1),C[2*k+2*T+1]+=R*Vt,E(C,2*k+2*T+1),C[2*k+2*T+2]+=N*Vt,E(C,2*k+2*T+2)}for(k=0;k<w;k++)C[k]=C[2*k+1]<<16|C[2*k];for(k=w;k<2*w;k++)C[k]=0;return new o(C,0)};function E(S,w){for(;(S[w]&65535)!=S[w];)S[w+1]+=S[w]>>>16,S[w]&=65535,w++}function A(S,w){this.g=S,this.h=w}function V(S,w){if(I(w))throw Error("division by zero");if(I(S))return new A(d,d);if(P(S))return w=V(x(S),w),new A(x(w.g),x(w.h));if(P(w))return w=V(S,x(w)),new A(x(w.g),w.h);if(30<S.g.length){if(P(S)||P(w))throw Error("slowDivide_ only works with positive integers.");for(var C=p,k=w;0>=k.l(S);)C=F(C),k=F(k);var T=M(C,1),N=M(k,1);for(k=M(k,2),C=M(C,2);!I(k);){var R=N.add(k);0>=R.l(S)&&(T=T.add(C),N=R),k=M(k,1),C=M(C,1)}return w=v(S,T.j(w)),new A(T,w)}for(T=d;0<=S.l(w);){for(C=Math.max(1,Math.floor(S.m()/w.m())),k=Math.ceil(Math.log(C)/Math.LN2),k=48>=k?1:Math.pow(2,k-48),N=c(C),R=N.j(w);P(R)||0<R.l(S);)C-=k,N=c(C),R=N.j(w);I(N)&&(N=p),T=T.add(N),S=v(S,R)}return new A(T,S)}n.A=function(S){return V(this,S).h},n.and=function(S){for(var w=Math.max(this.g.length,S.g.length),C=[],k=0;k<w;k++)C[k]=this.i(k)&S.i(k);return new o(C,this.h&S.h)},n.or=function(S){for(var w=Math.max(this.g.length,S.g.length),C=[],k=0;k<w;k++)C[k]=this.i(k)|S.i(k);return new o(C,this.h|S.h)},n.xor=function(S){for(var w=Math.max(this.g.length,S.g.length),C=[],k=0;k<w;k++)C[k]=this.i(k)^S.i(k);return new o(C,this.h^S.h)};function F(S){for(var w=S.g.length+1,C=[],k=0;k<w;k++)C[k]=S.i(k)<<1|S.i(k-1)>>>31;return new o(C,S.h)}function M(S,w){var C=w>>5;w%=32;for(var k=S.g.length-C,T=[],N=0;N<k;N++)T[N]=0<w?S.i(N+C)>>>w|S.i(N+C+1)<<32-w:S.i(N+C);return new o(T,S.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,AC=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,ms=o}).apply(typeof gI<"u"?gI:typeof self<"u"?self:typeof window<"u"?window:{});var Vc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var CC,hl,RC,oh,eg,kC,PC,xC;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,f,m){return u==Array.prototype||u==Object.prototype||(u[f]=m.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vc=="object"&&Vc];for(var f=0;f<u.length;++f){var m=u[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function i(u,f){if(f)e:{var m=r;u=u.split(".");for(var y=0;y<u.length-1;y++){var D=u[y];if(!(D in m))break e;m=m[D]}u=u[u.length-1],y=m[u],f=f(y),f!=y&&f!=null&&e(m,u,{configurable:!0,writable:!0,value:f})}}function s(u,f){u instanceof String&&(u+="");var m=0,y=!1,D={next:function(){if(!y&&m<u.length){var L=m++;return{value:f(L,u[L]),done:!1}}return y=!0,{done:!0,value:void 0}}};return D[Symbol.iterator]=function(){return D},D}i("Array.prototype.values",function(u){return u||function(){return s(this,function(f,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(u){var f=typeof u;return f=f!="object"?f:u?Array.isArray(u)?"array":f:"null",f=="array"||f=="object"&&typeof u.length=="number"}function c(u){var f=typeof u;return f=="object"&&u!=null||f=="function"}function h(u,f,m){return u.call.apply(u.bind,arguments)}function d(u,f,m){if(!u)throw Error();if(2<arguments.length){var y=Array.prototype.slice.call(arguments,2);return function(){var D=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(D,y),u.apply(f,D)}}return function(){return u.apply(f,arguments)}}function p(u,f,m){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function _(u,f){var m=Array.prototype.slice.call(arguments,1);return function(){var y=m.slice();return y.push.apply(y,arguments),u.apply(this,y)}}function I(u,f){function m(){}m.prototype=f.prototype,u.aa=f.prototype,u.prototype=new m,u.prototype.constructor=u,u.Qb=function(y,D,L){for(var q=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)q[Se-2]=arguments[Se];return f.prototype[D].apply(y,q)}}function P(u){const f=u.length;if(0<f){const m=Array(f);for(let y=0;y<f;y++)m[y]=u[y];return m}return[]}function x(u,f){for(let m=1;m<arguments.length;m++){const y=arguments[m];if(l(y)){const D=u.length||0,L=y.length||0;u.length=D+L;for(let q=0;q<L;q++)u[D+q]=y[q]}else u.push(y)}}class v{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function E(u){return/^[\s\xa0]*$/.test(u)}function A(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function V(u){return V[" "](u),u}V[" "]=function(){};var F=A().indexOf("Gecko")!=-1&&!(A().toLowerCase().indexOf("webkit")!=-1&&A().indexOf("Edge")==-1)&&!(A().indexOf("Trident")!=-1||A().indexOf("MSIE")!=-1)&&A().indexOf("Edge")==-1;function M(u,f,m){for(const y in u)f.call(m,u[y],y,u)}function S(u,f){for(const m in u)f.call(void 0,u[m],m,u)}function w(u){const f={};for(const m in u)f[m]=u[m];return f}const C="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function k(u,f){let m,y;for(let D=1;D<arguments.length;D++){y=arguments[D];for(m in y)u[m]=y[m];for(let L=0;L<C.length;L++)m=C[L],Object.prototype.hasOwnProperty.call(y,m)&&(u[m]=y[m])}}function T(u){var f=1;u=u.split(":");const m=[];for(;0<f&&u.length;)m.push(u.shift()),f--;return u.length&&m.push(u.join(":")),m}function N(u){a.setTimeout(()=>{throw u},0)}function R(){var u=te;let f=null;return u.g&&(f=u.g,u.g=u.g.next,u.g||(u.h=null),f.next=null),f}class Vt{constructor(){this.h=this.g=null}add(f,m){const y=Vn.get();y.set(f,m),this.h?this.h.next=y:this.g=y,this.h=y}}var Vn=new v(()=>new Y,u=>u.reset());class Y{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let fe,G=!1,te=new Vt,ie=()=>{const u=a.Promise.resolve(void 0);fe=()=>{u.then(je)}};var je=()=>{for(var u;u=R();){try{u.h.call(u.g)}catch(m){N(m)}var f=Vn;f.j(u),100>f.h&&(f.h++,u.next=f.g,f.g=u)}G=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ye(u,f){this.type=u,this.g=this.target=f,this.defaultPrevented=!1}Ye.prototype.h=function(){this.defaultPrevented=!0};var er=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,f=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const m=()=>{};a.addEventListener("test",m,f),a.removeEventListener("test",m,f)}catch{}return u}();function tr(u,f){if(Ye.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var m=this.type=u.type,y=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=f,f=u.relatedTarget){if(F){e:{try{V(f.nodeName);var D=!0;break e}catch{}D=!1}D||(f=null)}}else m=="mouseover"?f=u.fromElement:m=="mouseout"&&(f=u.toElement);this.relatedTarget=f,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:nr[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&tr.aa.h.call(this)}}I(tr,Ye);var nr={2:"touch",3:"pen",4:"mouse"};tr.prototype.h=function(){tr.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var rr="closure_listenable_"+(1e6*Math.random()|0),bx=0;function Dx(u,f,m,y,D){this.listener=u,this.proxy=null,this.src=f,this.type=m,this.capture=!!y,this.ha=D,this.key=++bx,this.da=this.fa=!1}function Xu(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function Zu(u){this.src=u,this.g={},this.h=0}Zu.prototype.add=function(u,f,m,y,D){var L=u.toString();u=this.g[L],u||(u=this.g[L]=[],this.h++);var q=Lf(u,f,y,D);return-1<q?(f=u[q],m||(f.fa=!1)):(f=new Dx(f,this.src,L,!!y,D),f.fa=m,u.push(f)),f};function Of(u,f){var m=f.type;if(m in u.g){var y=u.g[m],D=Array.prototype.indexOf.call(y,f,void 0),L;(L=0<=D)&&Array.prototype.splice.call(y,D,1),L&&(Xu(f),u.g[m].length==0&&(delete u.g[m],u.h--))}}function Lf(u,f,m,y){for(var D=0;D<u.length;++D){var L=u[D];if(!L.da&&L.listener==f&&L.capture==!!m&&L.ha==y)return D}return-1}var Mf="closure_lm_"+(1e6*Math.random()|0),Ff={};function bv(u,f,m,y,D){if(Array.isArray(f)){for(var L=0;L<f.length;L++)bv(u,f[L],m,y,D);return null}return m=Ov(m),u&&u[rr]?u.K(f,m,c(y)?!!y.capture:!1,D):Vx(u,f,m,!1,y,D)}function Vx(u,f,m,y,D,L){if(!f)throw Error("Invalid event type");var q=c(D)?!!D.capture:!!D,Se=jf(u);if(Se||(u[Mf]=Se=new Zu(u)),m=Se.add(f,m,y,q,L),m.proxy)return m;if(y=Ox(),m.proxy=y,y.src=u,y.listener=m,u.addEventListener)er||(D=q),D===void 0&&(D=!1),u.addEventListener(f.toString(),y,D);else if(u.attachEvent)u.attachEvent(Vv(f.toString()),y);else if(u.addListener&&u.removeListener)u.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return m}function Ox(){function u(m){return f.call(u.src,u.listener,m)}const f=Lx;return u}function Dv(u,f,m,y,D){if(Array.isArray(f))for(var L=0;L<f.length;L++)Dv(u,f[L],m,y,D);else y=c(y)?!!y.capture:!!y,m=Ov(m),u&&u[rr]?(u=u.i,f=String(f).toString(),f in u.g&&(L=u.g[f],m=Lf(L,m,y,D),-1<m&&(Xu(L[m]),Array.prototype.splice.call(L,m,1),L.length==0&&(delete u.g[f],u.h--)))):u&&(u=jf(u))&&(f=u.g[f.toString()],u=-1,f&&(u=Lf(f,m,y,D)),(m=-1<u?f[u]:null)&&Uf(m))}function Uf(u){if(typeof u!="number"&&u&&!u.da){var f=u.src;if(f&&f[rr])Of(f.i,u);else{var m=u.type,y=u.proxy;f.removeEventListener?f.removeEventListener(m,y,u.capture):f.detachEvent?f.detachEvent(Vv(m),y):f.addListener&&f.removeListener&&f.removeListener(y),(m=jf(f))?(Of(m,u),m.h==0&&(m.src=null,f[Mf]=null)):Xu(u)}}}function Vv(u){return u in Ff?Ff[u]:Ff[u]="on"+u}function Lx(u,f){if(u.da)u=!0;else{f=new tr(f,this);var m=u.listener,y=u.ha||u.src;u.fa&&Uf(u),u=m.call(y,f)}return u}function jf(u){return u=u[Mf],u instanceof Zu?u:null}var Bf="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ov(u){return typeof u=="function"?u:(u[Bf]||(u[Bf]=function(f){return u.handleEvent(f)}),u[Bf])}function It(){Te.call(this),this.i=new Zu(this),this.M=this,this.F=null}I(It,Te),It.prototype[rr]=!0,It.prototype.removeEventListener=function(u,f,m,y){Dv(this,u,f,m,y)};function Ot(u,f){var m,y=u.F;if(y)for(m=[];y;y=y.F)m.push(y);if(u=u.M,y=f.type||f,typeof f=="string")f=new Ye(f,u);else if(f instanceof Ye)f.target=f.target||u;else{var D=f;f=new Ye(y,u),k(f,D)}if(D=!0,m)for(var L=m.length-1;0<=L;L--){var q=f.g=m[L];D=ec(q,y,!0,f)&&D}if(q=f.g=u,D=ec(q,y,!0,f)&&D,D=ec(q,y,!1,f)&&D,m)for(L=0;L<m.length;L++)q=f.g=m[L],D=ec(q,y,!1,f)&&D}It.prototype.N=function(){if(It.aa.N.call(this),this.i){var u=this.i,f;for(f in u.g){for(var m=u.g[f],y=0;y<m.length;y++)Xu(m[y]);delete u.g[f],u.h--}}this.F=null},It.prototype.K=function(u,f,m,y){return this.i.add(String(u),f,!1,m,y)},It.prototype.L=function(u,f,m,y){return this.i.add(String(u),f,!0,m,y)};function ec(u,f,m,y){if(f=u.i.g[String(f)],!f)return!0;f=f.concat();for(var D=!0,L=0;L<f.length;++L){var q=f[L];if(q&&!q.da&&q.capture==m){var Se=q.listener,_t=q.ha||q.src;q.fa&&Of(u.i,q),D=Se.call(_t,y)!==!1&&D}}return D&&!y.defaultPrevented}function Lv(u,f,m){if(typeof u=="function")m&&(u=p(u,m));else if(u&&typeof u.handleEvent=="function")u=p(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:a.setTimeout(u,f||0)}function Mv(u){u.g=Lv(()=>{u.g=null,u.i&&(u.i=!1,Mv(u))},u.l);const f=u.h;u.h=null,u.m.apply(null,f)}class Mx extends Te{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:Mv(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Pa(u){Te.call(this),this.h=u,this.g={}}I(Pa,Te);var Fv=[];function Uv(u){M(u.g,function(f,m){this.g.hasOwnProperty(m)&&Uf(f)},u),u.g={}}Pa.prototype.N=function(){Pa.aa.N.call(this),Uv(this)},Pa.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zf=a.JSON.stringify,Fx=a.JSON.parse,Ux=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function $f(){}$f.prototype.h=null;function jv(u){return u.h||(u.h=u.i())}function Bv(){}var xa={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function qf(){Ye.call(this,"d")}I(qf,Ye);function Gf(){Ye.call(this,"c")}I(Gf,Ye);var Wi={},zv=null;function tc(){return zv=zv||new It}Wi.La="serverreachability";function $v(u){Ye.call(this,Wi.La,u)}I($v,Ye);function Na(u){const f=tc();Ot(f,new $v(f))}Wi.STAT_EVENT="statevent";function qv(u,f){Ye.call(this,Wi.STAT_EVENT,u),this.stat=f}I(qv,Ye);function Lt(u){const f=tc();Ot(f,new qv(f,u))}Wi.Ma="timingevent";function Gv(u,f){Ye.call(this,Wi.Ma,u),this.size=f}I(Gv,Ye);function ba(u,f){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},f)}function Da(){this.g=!0}Da.prototype.xa=function(){this.g=!1};function jx(u,f,m,y,D,L){u.info(function(){if(u.g)if(L)for(var q="",Se=L.split("&"),_t=0;_t<Se.length;_t++){var _e=Se[_t].split("=");if(1<_e.length){var Tt=_e[0];_e=_e[1];var St=Tt.split("_");q=2<=St.length&&St[1]=="type"?q+(Tt+"="+_e+"&"):q+(Tt+"=redacted&")}}else q=null;else q=L;return"XMLHTTP REQ ("+y+") [attempt "+D+"]: "+f+`
`+m+`
`+q})}function Bx(u,f,m,y,D,L,q){u.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+D+"]: "+f+`
`+m+`
`+L+" "+q})}function Ws(u,f,m,y){u.info(function(){return"XMLHTTP TEXT ("+f+"): "+$x(u,m)+(y?" "+y:"")})}function zx(u,f){u.info(function(){return"TIMEOUT: "+f})}Da.prototype.info=function(){};function $x(u,f){if(!u.g)return f;if(!f)return null;try{var m=JSON.parse(f);if(m){for(u=0;u<m.length;u++)if(Array.isArray(m[u])){var y=m[u];if(!(2>y.length)){var D=y[1];if(Array.isArray(D)&&!(1>D.length)){var L=D[0];if(L!="noop"&&L!="stop"&&L!="close")for(var q=1;q<D.length;q++)D[q]=""}}}}return zf(m)}catch{return f}}var nc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Wv={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Wf;function rc(){}I(rc,$f),rc.prototype.g=function(){return new XMLHttpRequest},rc.prototype.i=function(){return{}},Wf=new rc;function Lr(u,f,m,y){this.j=u,this.i=f,this.l=m,this.R=y||1,this.U=new Pa(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Kv}function Kv(){this.i=null,this.g="",this.h=!1}var Hv={},Kf={};function Hf(u,f,m){u.L=1,u.v=ac(ir(f)),u.m=m,u.P=!0,Qv(u,null)}function Qv(u,f){u.F=Date.now(),ic(u),u.A=ir(u.v);var m=u.A,y=u.R;Array.isArray(y)||(y=[String(y)]),uw(m.i,"t",y),u.C=0,m=u.j.J,u.h=new Kv,u.g=Rw(u.j,m?f:null,!u.m),0<u.O&&(u.M=new Mx(p(u.Y,u,u.g),u.O)),f=u.U,m=u.g,y=u.ca;var D="readystatechange";Array.isArray(D)||(D&&(Fv[0]=D.toString()),D=Fv);for(var L=0;L<D.length;L++){var q=bv(m,D[L],y||f.handleEvent,!1,f.h||f);if(!q)break;f.g[q.key]=q}f=u.H?w(u.H):{},u.m?(u.u||(u.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,f)):(u.u="GET",u.g.ea(u.A,u.u,null,f)),Na(),jx(u.i,u.u,u.A,u.l,u.R,u.m)}Lr.prototype.ca=function(u){u=u.target;const f=this.M;f&&sr(u)==3?f.j():this.Y(u)},Lr.prototype.Y=function(u){try{if(u==this.g)e:{const St=sr(this.g);var f=this.g.Ba();const Qs=this.g.Z();if(!(3>St)&&(St!=3||this.g&&(this.h.h||this.g.oa()||gw(this.g)))){this.J||St!=4||f==7||(f==8||0>=Qs?Na(3):Na(2)),Qf(this);var m=this.g.Z();this.X=m;t:if(Yv(this)){var y=gw(this.g);u="";var D=y.length,L=sr(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ki(this),Va(this);var q="";break t}this.h.i=new a.TextDecoder}for(f=0;f<D;f++)this.h.h=!0,u+=this.h.i.decode(y[f],{stream:!(L&&f==D-1)});y.length=0,this.h.g+=u,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=m==200,Bx(this.i,this.u,this.A,this.l,this.R,St,m),this.o){if(this.T&&!this.K){t:{if(this.g){var Se,_t=this.g;if((Se=_t.g?_t.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!E(Se)){var _e=Se;break t}}_e=null}if(m=_e)Ws(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Yf(this,m);else{this.o=!1,this.s=3,Lt(12),Ki(this),Va(this);break e}}if(this.P){m=!0;let yn;for(;!this.J&&this.C<q.length;)if(yn=qx(this,q),yn==Kf){St==4&&(this.s=4,Lt(14),m=!1),Ws(this.i,this.l,null,"[Incomplete Response]");break}else if(yn==Hv){this.s=4,Lt(15),Ws(this.i,this.l,q,"[Invalid Chunk]"),m=!1;break}else Ws(this.i,this.l,yn,null),Yf(this,yn);if(Yv(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),St!=4||q.length!=0||this.h.h||(this.s=1,Lt(16),m=!1),this.o=this.o&&m,!m)Ws(this.i,this.l,q,"[Invalid Chunked Response]"),Ki(this),Va(this);else if(0<q.length&&!this.W){this.W=!0;var Tt=this.j;Tt.g==this&&Tt.ba&&!Tt.M&&(Tt.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),np(Tt),Tt.M=!0,Lt(11))}}else Ws(this.i,this.l,q,null),Yf(this,q);St==4&&Ki(this),this.o&&!this.J&&(St==4?Tw(this.j,this):(this.o=!1,ic(this)))}else aN(this.g),m==400&&0<q.indexOf("Unknown SID")?(this.s=3,Lt(12)):(this.s=0,Lt(13)),Ki(this),Va(this)}}}catch{}finally{}};function Yv(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function qx(u,f){var m=u.C,y=f.indexOf(`
`,m);return y==-1?Kf:(m=Number(f.substring(m,y)),isNaN(m)?Hv:(y+=1,y+m>f.length?Kf:(f=f.slice(y,y+m),u.C=y+m,f)))}Lr.prototype.cancel=function(){this.J=!0,Ki(this)};function ic(u){u.S=Date.now()+u.I,Jv(u,u.I)}function Jv(u,f){if(u.B!=null)throw Error("WatchDog timer not null");u.B=ba(p(u.ba,u),f)}function Qf(u){u.B&&(a.clearTimeout(u.B),u.B=null)}Lr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(zx(this.i,this.A),this.L!=2&&(Na(),Lt(17)),Ki(this),this.s=2,Va(this)):Jv(this,this.S-u)};function Va(u){u.j.G==0||u.J||Tw(u.j,u)}function Ki(u){Qf(u);var f=u.M;f&&typeof f.ma=="function"&&f.ma(),u.M=null,Uv(u.U),u.g&&(f=u.g,u.g=null,f.abort(),f.ma())}function Yf(u,f){try{var m=u.j;if(m.G!=0&&(m.g==u||Jf(m.h,u))){if(!u.K&&Jf(m.h,u)&&m.G==3){try{var y=m.Da.g.parse(f)}catch{y=null}if(Array.isArray(y)&&y.length==3){var D=y;if(D[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<u.F)fc(m),hc(m);else break e;tp(m),Lt(18)}}else m.za=D[1],0<m.za-m.T&&37500>D[2]&&m.F&&m.v==0&&!m.C&&(m.C=ba(p(m.Za,m),6e3));if(1>=ew(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Qi(m,11)}else if((u.K||m.g==u)&&fc(m),!E(f))for(D=m.Da.g.parse(f),f=0;f<D.length;f++){let _e=D[f];if(m.T=_e[0],_e=_e[1],m.G==2)if(_e[0]=="c"){m.K=_e[1],m.ia=_e[2];const Tt=_e[3];Tt!=null&&(m.la=Tt,m.j.info("VER="+m.la));const St=_e[4];St!=null&&(m.Aa=St,m.j.info("SVER="+m.Aa));const Qs=_e[5];Qs!=null&&typeof Qs=="number"&&0<Qs&&(y=1.5*Qs,m.L=y,m.j.info("backChannelRequestTimeoutMs_="+y)),y=m;const yn=u.g;if(yn){const mc=yn.g?yn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(mc){var L=y.h;L.g||mc.indexOf("spdy")==-1&&mc.indexOf("quic")==-1&&mc.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(Xf(L,L.h),L.h=null))}if(y.D){const rp=yn.g?yn.g.getResponseHeader("X-HTTP-Session-Id"):null;rp&&(y.ya=rp,ke(y.I,y.D,rp))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-u.F,m.j.info("Handshake RTT: "+m.R+"ms")),y=m;var q=u;if(y.qa=Cw(y,y.J?y.ia:null,y.W),q.K){tw(y.h,q);var Se=q,_t=y.L;_t&&(Se.I=_t),Se.B&&(Qf(Se),ic(Se)),y.g=q}else Ew(y);0<m.i.length&&dc(m)}else _e[0]!="stop"&&_e[0]!="close"||Qi(m,7);else m.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Qi(m,7):ep(m):_e[0]!="noop"&&m.l&&m.l.ta(_e),m.v=0)}}Na(4)}catch{}}var Gx=class{constructor(u,f){this.g=u,this.map=f}};function Xv(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Zv(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function ew(u){return u.h?1:u.g?u.g.size:0}function Jf(u,f){return u.h?u.h==f:u.g?u.g.has(f):!1}function Xf(u,f){u.g?u.g.add(f):u.h=f}function tw(u,f){u.h&&u.h==f?u.h=null:u.g&&u.g.has(f)&&u.g.delete(f)}Xv.prototype.cancel=function(){if(this.i=nw(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function nw(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let f=u.i;for(const m of u.g.values())f=f.concat(m.D);return f}return P(u.i)}function Wx(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(l(u)){for(var f=[],m=u.length,y=0;y<m;y++)f.push(u[y]);return f}f=[],m=0;for(y in u)f[m++]=u[y];return f}function Kx(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(l(u)||typeof u=="string"){var f=[];u=u.length;for(var m=0;m<u;m++)f.push(m);return f}f=[],m=0;for(const y in u)f[m++]=y;return f}}}function rw(u,f){if(u.forEach&&typeof u.forEach=="function")u.forEach(f,void 0);else if(l(u)||typeof u=="string")Array.prototype.forEach.call(u,f,void 0);else for(var m=Kx(u),y=Wx(u),D=y.length,L=0;L<D;L++)f.call(void 0,y[L],m&&m[L],u)}var iw=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hx(u,f){if(u){u=u.split("&");for(var m=0;m<u.length;m++){var y=u[m].indexOf("="),D=null;if(0<=y){var L=u[m].substring(0,y);D=u[m].substring(y+1)}else L=u[m];f(L,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function Hi(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Hi){this.h=u.h,sc(this,u.j),this.o=u.o,this.g=u.g,oc(this,u.s),this.l=u.l;var f=u.i,m=new Ma;m.i=f.i,f.g&&(m.g=new Map(f.g),m.h=f.h),sw(this,m),this.m=u.m}else u&&(f=String(u).match(iw))?(this.h=!1,sc(this,f[1]||"",!0),this.o=Oa(f[2]||""),this.g=Oa(f[3]||"",!0),oc(this,f[4]),this.l=Oa(f[5]||"",!0),sw(this,f[6]||"",!0),this.m=Oa(f[7]||"")):(this.h=!1,this.i=new Ma(null,this.h))}Hi.prototype.toString=function(){var u=[],f=this.j;f&&u.push(La(f,ow,!0),":");var m=this.g;return(m||f=="file")&&(u.push("//"),(f=this.o)&&u.push(La(f,ow,!0),"@"),u.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&u.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&u.push("/"),u.push(La(m,m.charAt(0)=="/"?Jx:Yx,!0))),(m=this.i.toString())&&u.push("?",m),(m=this.m)&&u.push("#",La(m,Zx)),u.join("")};function ir(u){return new Hi(u)}function sc(u,f,m){u.j=m?Oa(f,!0):f,u.j&&(u.j=u.j.replace(/:$/,""))}function oc(u,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);u.s=f}else u.s=null}function sw(u,f,m){f instanceof Ma?(u.i=f,eN(u.i,u.h)):(m||(f=La(f,Xx)),u.i=new Ma(f,u.h))}function ke(u,f,m){u.i.set(f,m)}function ac(u){return ke(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Oa(u,f){return u?f?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function La(u,f,m){return typeof u=="string"?(u=encodeURI(u).replace(f,Qx),m&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function Qx(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var ow=/[#\/\?@]/g,Yx=/[#\?:]/g,Jx=/[#\?]/g,Xx=/[#\?@]/g,Zx=/#/g;function Ma(u,f){this.h=this.g=null,this.i=u||null,this.j=!!f}function Mr(u){u.g||(u.g=new Map,u.h=0,u.i&&Hx(u.i,function(f,m){u.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}n=Ma.prototype,n.add=function(u,f){Mr(this),this.i=null,u=Ks(this,u);var m=this.g.get(u);return m||this.g.set(u,m=[]),m.push(f),this.h+=1,this};function aw(u,f){Mr(u),f=Ks(u,f),u.g.has(f)&&(u.i=null,u.h-=u.g.get(f).length,u.g.delete(f))}function lw(u,f){return Mr(u),f=Ks(u,f),u.g.has(f)}n.forEach=function(u,f){Mr(this),this.g.forEach(function(m,y){m.forEach(function(D){u.call(f,D,y,this)},this)},this)},n.na=function(){Mr(this);const u=Array.from(this.g.values()),f=Array.from(this.g.keys()),m=[];for(let y=0;y<f.length;y++){const D=u[y];for(let L=0;L<D.length;L++)m.push(f[y])}return m},n.V=function(u){Mr(this);let f=[];if(typeof u=="string")lw(this,u)&&(f=f.concat(this.g.get(Ks(this,u))));else{u=Array.from(this.g.values());for(let m=0;m<u.length;m++)f=f.concat(u[m])}return f},n.set=function(u,f){return Mr(this),this.i=null,u=Ks(this,u),lw(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[f]),this.h+=1,this},n.get=function(u,f){return u?(u=this.V(u),0<u.length?String(u[0]):f):f};function uw(u,f,m){aw(u,f),0<m.length&&(u.i=null,u.g.set(Ks(u,f),P(m)),u.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],f=Array.from(this.g.keys());for(var m=0;m<f.length;m++){var y=f[m];const L=encodeURIComponent(String(y)),q=this.V(y);for(y=0;y<q.length;y++){var D=L;q[y]!==""&&(D+="="+encodeURIComponent(String(q[y]))),u.push(D)}}return this.i=u.join("&")};function Ks(u,f){return f=String(f),u.j&&(f=f.toLowerCase()),f}function eN(u,f){f&&!u.j&&(Mr(u),u.i=null,u.g.forEach(function(m,y){var D=y.toLowerCase();y!=D&&(aw(this,y),uw(this,D,m))},u)),u.j=f}function tN(u,f){const m=new Da;if(a.Image){const y=new Image;y.onload=_(Fr,m,"TestLoadImage: loaded",!0,f,y),y.onerror=_(Fr,m,"TestLoadImage: error",!1,f,y),y.onabort=_(Fr,m,"TestLoadImage: abort",!1,f,y),y.ontimeout=_(Fr,m,"TestLoadImage: timeout",!1,f,y),a.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=u}else f(!1)}function nN(u,f){const m=new Da,y=new AbortController,D=setTimeout(()=>{y.abort(),Fr(m,"TestPingServer: timeout",!1,f)},1e4);fetch(u,{signal:y.signal}).then(L=>{clearTimeout(D),L.ok?Fr(m,"TestPingServer: ok",!0,f):Fr(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(D),Fr(m,"TestPingServer: error",!1,f)})}function Fr(u,f,m,y,D){try{D&&(D.onload=null,D.onerror=null,D.onabort=null,D.ontimeout=null),y(m)}catch{}}function rN(){this.g=new Ux}function iN(u,f,m){const y=m||"";try{rw(u,function(D,L){let q=D;c(D)&&(q=zf(D)),f.push(y+L+"="+encodeURIComponent(q))})}catch(D){throw f.push(y+"type="+encodeURIComponent("_badmap")),D}}function lc(u){this.l=u.Ub||null,this.j=u.eb||!1}I(lc,$f),lc.prototype.g=function(){return new uc(this.l,this.j)},lc.prototype.i=function(u){return function(){return u}}({});function uc(u,f){It.call(this),this.D=u,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}I(uc,It),n=uc.prototype,n.open=function(u,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=f,this.readyState=1,Ua(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(f.body=u),(this.D||a).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fa(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Ua(this)),this.g&&(this.readyState=3,Ua(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;cw(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function cw(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var f=u.value?u.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!u.done}))&&(this.response=this.responseText+=f)}u.done?Fa(this):Ua(this),this.readyState==3&&cw(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Fa(this))},n.Qa=function(u){this.g&&(this.response=u,Fa(this))},n.ga=function(){this.g&&Fa(this)};function Fa(u){u.readyState=4,u.l=null,u.j=null,u.v=null,Ua(u)}n.setRequestHeader=function(u,f){this.u.append(u,f)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,u.push(m[0]+": "+m[1]),m=f.next();return u.join(`\r
`)};function Ua(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(uc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function hw(u){let f="";return M(u,function(m,y){f+=y,f+=":",f+=m,f+=`\r
`}),f}function Zf(u,f,m){e:{for(y in m){var y=!1;break e}y=!0}y||(m=hw(m),typeof u=="string"?m!=null&&encodeURIComponent(String(m)):ke(u,f,m))}function We(u){It.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}I(We,It);var sN=/^https?$/i,oN=["POST","PUT"];n=We.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,f,m,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);f=f?f.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Wf.g(),this.v=this.o?jv(this.o):jv(Wf),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(u),!0),this.B=!1}catch(L){dw(this,L);return}if(u=m||"",m=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var D in y)m.set(D,y[D]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const L of y.keys())m.set(L,y.get(L));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(m.keys()).find(L=>L.toLowerCase()=="content-type"),D=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(oN,f,void 0))||y||D||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,q]of m)this.g.setRequestHeader(L,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{mw(this),this.u=!0,this.g.send(u),this.u=!1}catch(L){dw(this,L)}};function dw(u,f){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=f,u.m=5,fw(u),cc(u)}function fw(u){u.A||(u.A=!0,Ot(u,"complete"),Ot(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,Ot(this,"complete"),Ot(this,"abort"),cc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cc(this,!0)),We.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?pw(this):this.bb())},n.bb=function(){pw(this)};function pw(u){if(u.h&&typeof o<"u"&&(!u.v[1]||sr(u)!=4||u.Z()!=2)){if(u.u&&sr(u)==4)Lv(u.Ea,0,u);else if(Ot(u,"readystatechange"),sr(u)==4){u.h=!1;try{const q=u.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var y;if(y=q===0){var D=String(u.D).match(iw)[1]||null;!D&&a.self&&a.self.location&&(D=a.self.location.protocol.slice(0,-1)),y=!sN.test(D?D.toLowerCase():"")}m=y}if(m)Ot(u,"complete"),Ot(u,"success");else{u.m=6;try{var L=2<sr(u)?u.g.statusText:""}catch{L=""}u.l=L+" ["+u.Z()+"]",fw(u)}}finally{cc(u)}}}}function cc(u,f){if(u.g){mw(u);const m=u.g,y=u.v[0]?()=>{}:null;u.g=null,u.v=null,f||Ot(u,"ready");try{m.onreadystatechange=y}catch{}}}function mw(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function sr(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<sr(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var f=this.g.responseText;return u&&f.indexOf(u)==0&&(f=f.substring(u.length)),Fx(f)}};function gw(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function aN(u){const f={};u=(u.g&&2<=sr(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<u.length;y++){if(E(u[y]))continue;var m=T(u[y]);const D=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const L=f[D]||[];f[D]=L,L.push(m)}S(f,function(y){return y.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ja(u,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[u]||f}function _w(u){this.Aa=0,this.i=[],this.j=new Da,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ja("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ja("baseRetryDelayMs",5e3,u),this.cb=ja("retryDelaySeedMs",1e4,u),this.Wa=ja("forwardChannelMaxRetries",2,u),this.wa=ja("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new Xv(u&&u.concurrentRequestLimit),this.Da=new rN,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=_w.prototype,n.la=8,n.G=1,n.connect=function(u,f,m,y){Lt(0),this.W=u,this.H=f||{},m&&y!==void 0&&(this.H.OSID=m,this.H.OAID=y),this.F=this.X,this.I=Cw(this,null,this.W),dc(this)};function ep(u){if(yw(u),u.G==3){var f=u.U++,m=ir(u.I);if(ke(m,"SID",u.K),ke(m,"RID",f),ke(m,"TYPE","terminate"),Ba(u,m),f=new Lr(u,u.j,f),f.L=2,f.v=ac(ir(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(f.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=f.v,m=!0),m||(f.g=Rw(f.j,null),f.g.ea(f.v)),f.F=Date.now(),ic(f)}Aw(u)}function hc(u){u.g&&(np(u),u.g.cancel(),u.g=null)}function yw(u){hc(u),u.u&&(a.clearTimeout(u.u),u.u=null),fc(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function dc(u){if(!Zv(u.h)&&!u.s){u.s=!0;var f=u.Ga;fe||ie(),G||(fe(),G=!0),te.add(f,u),u.B=0}}function lN(u,f){return ew(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=f.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=ba(p(u.Ga,u,f),Sw(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const D=new Lr(this,this.j,u);let L=this.o;if(this.S&&(L?(L=w(L),k(L,this.S)):L=this.S),this.m!==null||this.O||(D.H=L,L=null),this.P)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var y=this.i[m];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break t}y=void 0}if(y===void 0)break;if(f+=y,4096<f){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=ww(this,D,f),m=ir(this.I),ke(m,"RID",u),ke(m,"CVER",22),this.D&&ke(m,"X-HTTP-Session-Id",this.D),Ba(this,m),L&&(this.O?f="headers="+encodeURIComponent(String(hw(L)))+"&"+f:this.m&&Zf(m,this.m,L)),Xf(this.h,D),this.Ua&&ke(m,"TYPE","init"),this.P?(ke(m,"$req",f),ke(m,"SID","null"),D.T=!0,Hf(D,m,null)):Hf(D,m,f),this.G=2}}else this.G==3&&(u?vw(this,u):this.i.length==0||Zv(this.h)||vw(this))};function vw(u,f){var m;f?m=f.l:m=u.U++;const y=ir(u.I);ke(y,"SID",u.K),ke(y,"RID",m),ke(y,"AID",u.T),Ba(u,y),u.m&&u.o&&Zf(y,u.m,u.o),m=new Lr(u,u.j,m,u.B+1),u.m===null&&(m.H=u.o),f&&(u.i=f.D.concat(u.i)),f=ww(u,m,1e3),m.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),Xf(u.h,m),Hf(m,y,f)}function Ba(u,f){u.H&&M(u.H,function(m,y){ke(f,y,m)}),u.l&&rw({},function(m,y){ke(f,y,m)})}function ww(u,f,m){m=Math.min(u.i.length,m);var y=u.l?p(u.l.Na,u.l,u):null;e:{var D=u.i;let L=-1;for(;;){const q=["count="+m];L==-1?0<m?(L=D[0].g,q.push("ofs="+L)):L=0:q.push("ofs="+L);let Se=!0;for(let _t=0;_t<m;_t++){let _e=D[_t].g;const Tt=D[_t].map;if(_e-=L,0>_e)L=Math.max(0,D[_t].g-100),Se=!1;else try{iN(Tt,q,"req"+_e+"_")}catch{y&&y(Tt)}}if(Se){y=q.join("&");break e}}}return u=u.i.splice(0,m),f.D=u,y}function Ew(u){if(!u.g&&!u.u){u.Y=1;var f=u.Fa;fe||ie(),G||(fe(),G=!0),te.add(f,u),u.v=0}}function tp(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=ba(p(u.Fa,u),Sw(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,Iw(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=ba(p(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Lt(10),hc(this),Iw(this))};function np(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function Iw(u){u.g=new Lr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var f=ir(u.qa);ke(f,"RID","rpc"),ke(f,"SID",u.K),ke(f,"AID",u.T),ke(f,"CI",u.F?"0":"1"),!u.F&&u.ja&&ke(f,"TO",u.ja),ke(f,"TYPE","xmlhttp"),Ba(u,f),u.m&&u.o&&Zf(f,u.m,u.o),u.L&&(u.g.I=u.L);var m=u.g;u=u.ia,m.L=1,m.v=ac(ir(f)),m.m=null,m.P=!0,Qv(m,u)}n.Za=function(){this.C!=null&&(this.C=null,hc(this),tp(this),Lt(19))};function fc(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Tw(u,f){var m=null;if(u.g==f){fc(u),np(u),u.g=null;var y=2}else if(Jf(u.h,f))m=f.D,tw(u.h,f),y=1;else return;if(u.G!=0){if(f.o)if(y==1){m=f.m?f.m.length:0,f=Date.now()-f.F;var D=u.B;y=tc(),Ot(y,new Gv(y,m)),dc(u)}else Ew(u);else if(D=f.s,D==3||D==0&&0<f.X||!(y==1&&lN(u,f)||y==2&&tp(u)))switch(m&&0<m.length&&(f=u.h,f.i=f.i.concat(m)),D){case 1:Qi(u,5);break;case 4:Qi(u,10);break;case 3:Qi(u,6);break;default:Qi(u,2)}}}function Sw(u,f){let m=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(m*=2),m*f}function Qi(u,f){if(u.j.info("Error code "+f),f==2){var m=p(u.fb,u),y=u.Xa;const D=!y;y=new Hi(y||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||sc(y,"https"),ac(y),D?tN(y.toString(),m):nN(y.toString(),m)}else Lt(2);u.G=0,u.l&&u.l.sa(f),Aw(u),yw(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),Lt(2)):(this.j.info("Failed to ping google.com"),Lt(1))};function Aw(u){if(u.G=0,u.ka=[],u.l){const f=nw(u.h);(f.length!=0||u.i.length!=0)&&(x(u.ka,f),x(u.ka,u.i),u.h.i.length=0,P(u.i),u.i.length=0),u.l.ra()}}function Cw(u,f,m){var y=m instanceof Hi?ir(m):new Hi(m);if(y.g!="")f&&(y.g=f+"."+y.g),oc(y,y.s);else{var D=a.location;y=D.protocol,f=f?f+"."+D.hostname:D.hostname,D=+D.port;var L=new Hi(null);y&&sc(L,y),f&&(L.g=f),D&&oc(L,D),m&&(L.l=m),y=L}return m=u.D,f=u.ya,m&&f&&ke(y,m,f),ke(y,"VER",u.la),Ba(u,y),y}function Rw(u,f,m){if(f&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=u.Ca&&!u.pa?new We(new lc({eb:m})):new We(u.pa),f.Ha(u.J),f}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function kw(){}n=kw.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function pc(){}pc.prototype.g=function(u,f){return new Zt(u,f)};function Zt(u,f){It.call(this),this.g=new _w(f),this.l=u,this.h=f&&f.messageUrlParams||null,u=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(u?u["X-WebChannel-Content-Type"]=f.messageContentType:u={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(u?u["X-WebChannel-Client-Profile"]=f.va:u={"X-WebChannel-Client-Profile":f.va}),this.g.S=u,(u=f&&f.Sb)&&!E(u)&&(this.g.m=u),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!E(f)&&(this.g.D=f,u=this.h,u!==null&&f in u&&(u=this.h,f in u&&delete u[f])),this.j=new Hs(this)}I(Zt,It),Zt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Zt.prototype.close=function(){ep(this.g)},Zt.prototype.o=function(u){var f=this.g;if(typeof u=="string"){var m={};m.__data__=u,u=m}else this.u&&(m={},m.__data__=zf(u),u=m);f.i.push(new Gx(f.Ya++,u)),f.G==3&&dc(f)},Zt.prototype.N=function(){this.g.l=null,delete this.j,ep(this.g),delete this.g,Zt.aa.N.call(this)};function Pw(u){qf.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var f=u.__sm__;if(f){e:{for(const m in f){u=m;break e}u=void 0}(this.i=u)&&(u=this.i,f=f!==null&&u in f?f[u]:void 0),this.data=f}else this.data=u}I(Pw,qf);function xw(){Gf.call(this),this.status=1}I(xw,Gf);function Hs(u){this.g=u}I(Hs,kw),Hs.prototype.ua=function(){Ot(this.g,"a")},Hs.prototype.ta=function(u){Ot(this.g,new Pw(u))},Hs.prototype.sa=function(u){Ot(this.g,new xw)},Hs.prototype.ra=function(){Ot(this.g,"b")},pc.prototype.createWebChannel=pc.prototype.g,Zt.prototype.send=Zt.prototype.o,Zt.prototype.open=Zt.prototype.m,Zt.prototype.close=Zt.prototype.close,xC=function(){return new pc},PC=function(){return tc()},kC=Wi,eg={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},nc.NO_ERROR=0,nc.TIMEOUT=8,nc.HTTP_ERROR=6,oh=nc,Wv.COMPLETE="complete",RC=Wv,Bv.EventType=xa,xa.OPEN="a",xa.CLOSE="b",xa.ERROR="c",xa.MESSAGE="d",It.prototype.listen=It.prototype.K,hl=Bv,We.prototype.listenOnce=We.prototype.L,We.prototype.getLastError=We.prototype.Ka,We.prototype.getLastErrorCode=We.prototype.Ba,We.prototype.getStatus=We.prototype.Z,We.prototype.getResponseJson=We.prototype.Oa,We.prototype.getResponseText=We.prototype.oa,We.prototype.send=We.prototype.ea,We.prototype.setWithCredentials=We.prototype.Ha,CC=We}).apply(typeof Vc<"u"?Vc:typeof self<"u"?self:typeof window<"u"?window:{});const _I="@firebase/firestore";/**
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
 */let pa="10.14.0";/**
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
 */const Ei=new Kd("@firebase/firestore");function no(){return Ei.logLevel}function RL(n){Ei.setLogLevel(n)}function j(n,...e){if(Ei.logLevel<=ae.DEBUG){const t=e.map(W_);Ei.debug(`Firestore (${pa}): ${n}`,...t)}}function Xe(n,...e){if(Ei.logLevel<=ae.ERROR){const t=e.map(W_);Ei.error(`Firestore (${pa}): ${n}`,...t)}}function on(n,...e){if(Ei.logLevel<=ae.WARN){const t=e.map(W_);Ei.warn(`Firestore (${pa}): ${n}`,...t)}}function W_(n){if(typeof n=="string")return n;try{/**
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
 */function K(n="Unexpected state"){const e=`FIRESTORE (${pa}) INTERNAL ASSERTION FAILED: `+n;throw Xe(e),new Error(e)}function Q(n,e){n||K()}function kL(n,e){n||K()}function $(n,e){return n}/**
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
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Jn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class NC{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class bC{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ht.UNAUTHENTICATED))}shutdown(){}}class PL{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class xL{constructor(e){this.t=e,this.currentUser=ht.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Q(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new mt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new mt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},a=l=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new mt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Q(typeof r.accessToken=="string"),new NC(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Q(e===null||typeof e=="string"),new ht(e)}}class NL{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=ht.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class bL{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new NL(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ht.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class DC{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class DL{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Q(this.o===void 0);const r=s=>{s.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,j("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Q(typeof t.token=="string"),this.R=t.token,new DC(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class VL{getToken(){return Promise.resolve(new DC(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function OL(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
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
 */class K_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=OL(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function ne(n,e){return n<e?-1:n>e?1:0}function zo(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function VC(n){return n+"\0"}/**
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
 */class Fe{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Fe.fromMillis(Date.now())}static fromDate(e){return Fe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new Fe(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class iu{constructor(e,t,r){t===void 0?t=0:t>e.length&&K(),r===void 0?r=e.length-t:r>e.length-t&&K(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return iu.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof iu?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class he extends iu{construct(e,t,r){return new he(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new U(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new he(t)}static emptyPath(){return new he([])}}const LL=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class De extends iu{construct(e,t,r){return new De(e,t,r)}static isValidIdentifier(e){return LL.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),De.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new De(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new U(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new U(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new U(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new De(t)}static emptyPath(){return new De([])}}/**
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
 */class $o{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function tg(n){return n.fields.find(e=>e.kind===2)}function es(n){return n.fields.filter(e=>e.kind!==2)}function ML(n,e){let t=ne(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=FL(n.fields[r],e.fields[r]),t!==0)return t;return ne(n.fields.length,e.fields.length)}$o.UNKNOWN_ID=-1;class gs{constructor(e,t){this.fieldPath=e,this.kind=t}}function FL(n,e){const t=De.comparator(n.fieldPath,e.fieldPath);return t!==0?t:ne(n.kind,e.kind)}class qo{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new qo(0,an.min())}}function OC(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=J.fromTimestamp(r===1e9?new Fe(t+1,0):new Fe(t,r));return new an(i,W.empty(),e)}function LC(n){return new an(n.readTime,n.key,-1)}class an{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new an(J.min(),W.empty(),-1)}static max(){return new an(J.max(),W.empty(),-1)}}function H_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=W.comparator(n.documentKey,e.documentKey),t!==0?t:ne(n.largestBatchId,e.largestBatchId))}/**
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
 */const MC="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class FC{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ui(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==MC)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class Zd{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new mt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Al(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=Q_(r.target.error);this.V.reject(new Al(e,i))}}static open(e,t,r,i){try{return new Zd(t,e.transaction(i,r))}catch(s){throw new Al(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(j("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new jL(t)}}class Gn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Gn.S(ot())===12.2&&Xe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return j("SimpleDb","Removing database:",e),ns(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!jA())return!1;if(Gn.v())return!0;const e=ot(),t=Gn.S(e),r=0<t&&t<10,i=UC(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(j("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Al(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new U(O.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new U(O.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Al(e,o))},i.onupgradeneeded=s=>{j("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{j("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=Zd.open(this.db,e,s?"readonly":"readwrite",r),l=i(a).next(c=>(a.g(),c)).catch(c=>(a.abort(c),b.reject(c))).toPromise();return l.catch(()=>{}),await a.m,l}catch(a){const l=a,c=l.name!=="FirebaseError"&&o<3;if(j("SimpleDb","Transaction failed with error:",l.message,"Retrying:",c),this.close(),!c)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function UC(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class UL{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return ns(this.B.delete())}}class Al extends U{constructor(e,t){super(O.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function ji(n){return n.name==="IndexedDbTransactionError"}class jL{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(j("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(j("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),ns(r)}add(e){return j("SimpleDb","ADD",this.store.name,e,e),ns(this.store.add(e))}get(e){return ns(this.store.get(e)).next(t=>(t===void 0&&(t=null),j("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return j("SimpleDb","DELETE",this.store.name,e),ns(this.store.delete(e))}count(){return j("SimpleDb","COUNT",this.store.name),ns(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new b((o,a)=>{s.onerror=l=>{a(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(a,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new b((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){j("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,a)=>a.delete())}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new b((r,i)=>{t.onerror=s=>{const o=Q_(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,t){const r=[];return new b((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const l=new UL(a),c=t(a.primaryKey,a.value,l);if(c instanceof b){const h=c.catch(d=>(l.done(),b.reject(d)));r.push(h)}l.isDone?i():l.K===null?a.continue():a.continue(l.K)}}).next(()=>b.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function ns(n){return new b((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Q_(r.target.error);t(i)}})}let yI=!1;function Q_(n){const e=Gn.S(ot());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return yI||(yI=!0,setTimeout(()=>{throw r},0)),r}}return n}class BL{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){j("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{j("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){ji(t)?j("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Ui(t)}await this.X(6e4)})}}class zL{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const r=new Set;let i=t,s=!0;return b.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return j("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(a=>(j("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=LC(s);H_(o,r)>0&&(r=o)}),new an(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class qt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}qt.oe=-1;function xu(n){return n==null}function su(n){return n===0&&1/n==-1/0}function jC(n){return typeof n=="number"&&Number.isInteger(n)&&!su(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function Nt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=vI(e)),e=$L(n.get(t),e);return vI(e)}function $L(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function vI(n){return n+""}function jn(n){const e=n.length;if(Q(e>=2),e===2)return Q(n.charAt(0)===""&&n.charAt(1)===""),he.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&K(),n.charAt(o+1)){case"":const a=n.substring(s,o);let l;i.length===0?l=a:(i+=a,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:K()}s=o+2}return new he(r)}/**
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
 */const wI=["userId","batchId"];/**
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
 */function ah(n,e){return[n,Nt(e)]}function BC(n,e,t){return[n,Nt(e),t]}const qL={},GL=["prefixPath","collectionGroup","readTime","documentId"],WL=["prefixPath","collectionGroup","documentId"],KL=["collectionGroup","readTime","prefixPath","documentId"],HL=["canonicalId","targetId"],QL=["targetId","path"],YL=["path","targetId"],JL=["collectionId","parent"],XL=["indexId","uid"],ZL=["uid","sequenceNumber"],eM=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],tM=["indexId","uid","orderedDocumentKey"],nM=["userId","collectionPath","documentId"],rM=["userId","collectionPath","largestBatchId"],iM=["userId","collectionGroup","largestBatchId"],zC=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],sM=[...zC,"documentOverlays"],$C=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],qC=$C,Y_=[...qC,"indexConfiguration","indexState","indexEntries"],oM=Y_,aM=[...Y_,"globals"];/**
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
 */class ng extends FC{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function at(n,e){const t=$(n);return Gn.F(t._e,e)}/**
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
 */function EI(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Bi(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function GC(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function WC(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */let qe=class rg{constructor(e,t){this.comparator=e,this.root=t||pi.EMPTY}insert(e,t){return new rg(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,pi.BLACK,null,null))}remove(e){return new rg(this.comparator,this.root.remove(e,this.comparator).copy(null,null,pi.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Oc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Oc(this.root,e,this.comparator,!1)}getReverseIterator(){return new Oc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Oc(this.root,e,this.comparator,!0)}},Oc=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},pi=class or{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??or.RED,this.left=i??or.EMPTY,this.right=s??or.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new or(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return or.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return or.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,or.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,or.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw K();const e=this.left.check();if(e!==this.right.check())throw K();return e+(this.isRed()?0:1)}};pi.EMPTY=null,pi.RED=!0,pi.BLACK=!1;pi.EMPTY=new class{constructor(){this.size=0}get key(){throw K()}get value(){throw K()}get color(){throw K()}get left(){throw K()}get right(){throw K()}copy(e,t,r,i,s){return this}insert(e,t,r){return new pi(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Ee{constructor(e){this.comparator=e,this.data=new qe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new II(this.data.getIterator())}getIteratorFrom(e){return new II(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class II{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Js(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class Gt{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new Gt([])}unionWith(e){let t=new Ee(De.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Gt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return zo(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class KC extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function lM(){return typeof atob<"u"}/**
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
 */class Ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new KC("Invalid base64 string: "+s):s}}(e);return new Ge(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ge.EMPTY_BYTE_STRING=new Ge("");const uM=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Cr(n){if(Q(!!n),typeof n=="string"){let e=0;const t=uM.exec(n);if(Q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Oe(n.seconds),nanos:Oe(n.nanos)}}function Oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Rr(n){return typeof n=="string"?Ge.fromBase64String(n):Ge.fromUint8Array(n)}/**
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
 */function ef(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function tf(n){const e=n.mapValue.fields.__previous_value__;return ef(e)?tf(e):e}function ou(n){const e=Cr(n.mapValue.fields.__local_write_time__.timestampValue);return new Fe(e.seconds,e.nanos)}/**
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
 */class cM{constructor(e,t,r,i,s,o,a,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class Ii{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ii("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ii&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ti={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},lh={nullValue:"NULL_VALUE"};function Ti(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ef(n)?4:HC(n)?9007199254740991:nf(n)?10:11:K()}function Hn(n,e){if(n===e)return!0;const t=Ti(n);if(t!==Ti(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ou(n).isEqual(ou(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Cr(i.timestampValue),a=Cr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Rr(i.bytesValue).isEqual(Rr(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Oe(i.geoPointValue.latitude)===Oe(s.geoPointValue.latitude)&&Oe(i.geoPointValue.longitude)===Oe(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Oe(i.integerValue)===Oe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Oe(i.doubleValue),a=Oe(s.doubleValue);return o===a?su(o)===su(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return zo(n.arrayValue.values||[],e.arrayValue.values||[],Hn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(EI(o)!==EI(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!Hn(o[l],a[l])))return!1;return!0}(n,e);default:return K()}}function au(n,e){return(n.values||[]).find(t=>Hn(t,e))!==void 0}function Si(n,e){if(n===e)return 0;const t=Ti(n),r=Ti(e);if(t!==r)return ne(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ne(n.booleanValue,e.booleanValue);case 2:return function(s,o){const a=Oe(s.integerValue||s.doubleValue),l=Oe(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1}(n,e);case 3:return TI(n.timestampValue,e.timestampValue);case 4:return TI(ou(n),ou(e));case 5:return ne(n.stringValue,e.stringValue);case 6:return function(s,o){const a=Rr(s),l=Rr(o);return a.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const a=s.split("/"),l=o.split("/");for(let c=0;c<a.length&&c<l.length;c++){const h=ne(a[c],l[c]);if(h!==0)return h}return ne(a.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const a=ne(Oe(s.latitude),Oe(o.latitude));return a!==0?a:ne(Oe(s.longitude),Oe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return SI(n.arrayValue,e.arrayValue);case 10:return function(s,o){var a,l,c,h;const d=s.fields||{},p=o.fields||{},_=(a=d.value)===null||a===void 0?void 0:a.arrayValue,I=(l=p.value)===null||l===void 0?void 0:l.arrayValue,P=ne(((c=_==null?void 0:_.values)===null||c===void 0?void 0:c.length)||0,((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0);return P!==0?P:SI(_,I)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===ti.mapValue&&o===ti.mapValue)return 0;if(s===ti.mapValue)return 1;if(o===ti.mapValue)return-1;const a=s.fields||{},l=Object.keys(a),c=o.fields||{},h=Object.keys(c);l.sort(),h.sort();for(let d=0;d<l.length&&d<h.length;++d){const p=ne(l[d],h[d]);if(p!==0)return p;const _=Si(a[l[d]],c[h[d]]);if(_!==0)return _}return ne(l.length,h.length)}(n.mapValue,e.mapValue);default:throw K()}}function TI(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ne(n,e);const t=Cr(n),r=Cr(e),i=ne(t.seconds,r.seconds);return i!==0?i:ne(t.nanos,r.nanos)}function SI(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Si(t[i],r[i]);if(s)return s}return ne(t.length,r.length)}function Go(n){return ig(n)}function ig(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Cr(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Rr(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return W.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=ig(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${ig(t.fields[o])}`;return i+"}"}(n.mapValue):K()}function uh(n){switch(Ti(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=tf(n);return e?16+uh(e):16;case 5:return 2*n.stringValue.length;case 6:return Rr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+uh(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Bi(r.fields,(s,o)=>{i+=s.length+uh(o)}),i}(n.mapValue);default:throw K()}}function Ss(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function sg(n){return!!n&&"integerValue"in n}function lu(n){return!!n&&"arrayValue"in n}function AI(n){return!!n&&"nullValue"in n}function CI(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ch(n){return!!n&&"mapValue"in n}function nf(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Cl(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Bi(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Cl(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Cl(n.arrayValue.values[t]);return e}return Object.assign({},n)}function HC(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const QC={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function hM(n){return"nullValue"in n?lh:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Ss(Ii.empty(),W.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?nf(n)?QC:{mapValue:{}}:K()}function dM(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Ss(Ii.empty(),W.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?QC:"mapValue"in n?nf(n)?{mapValue:{}}:ti:K()}function RI(n,e){const t=Si(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function kI(n,e){const t=Si(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
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
 */class vt{constructor(e){this.value=e}static empty(){return new vt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ch(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Cl(t)}setAll(e){let t=De.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=Cl(o):i.push(a.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());ch(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Hn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ch(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Bi(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new vt(Cl(this.value))}}function YC(n){const e=[];return Bi(n.fields,(t,r)=>{const i=new De([t]);if(ch(r)){const s=YC(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Gt(e)}/**
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
 */class Ai{constructor(e,t){this.position=e,this.inclusive=t}}function PI(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=W.comparator(W.fromName(o.referenceValue),t.key):r=Si(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function xI(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Hn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class uu{constructor(e,t="asc"){this.field=e,this.dir=t}}function fM(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class JC{}class de extends JC{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new pM(e,t,r):t==="array-contains"?new _M(e,r):t==="in"?new rR(e,r):t==="not-in"?new yM(e,r):t==="array-contains-any"?new vM(e,r):new de(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new mM(e,r):new gM(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Si(t,this.value)):t!==null&&Ti(this.value)===Ti(t)&&this.matchesComparison(Si(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return K()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ve extends JC{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ve(e,t)}matches(e){return Wo(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Wo(n){return n.op==="and"}function og(n){return n.op==="or"}function J_(n){return XC(n)&&Wo(n)}function XC(n){for(const e of n.filters)if(e instanceof ve)return!1;return!0}function ag(n){if(n instanceof de)return n.field.canonicalString()+n.op.toString()+Go(n.value);if(J_(n))return n.filters.map(e=>ag(e)).join(",");{const e=n.filters.map(t=>ag(t)).join(",");return`${n.op}(${e})`}}function ZC(n,e){return n instanceof de?function(r,i){return i instanceof de&&r.op===i.op&&r.field.isEqual(i.field)&&Hn(r.value,i.value)}(n,e):n instanceof ve?function(r,i){return i instanceof ve&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&ZC(o,i.filters[a]),!0):!1}(n,e):void K()}function eR(n,e){const t=n.filters.concat(e);return ve.create(t,n.op)}function tR(n){return n instanceof de?function(t){return`${t.field.canonicalString()} ${t.op} ${Go(t.value)}`}(n):n instanceof ve?function(t){return t.op.toString()+" {"+t.getFilters().map(tR).join(" ,")+"}"}(n):"Filter"}class pM extends de{constructor(e,t,r){super(e,t,r),this.key=W.fromName(r.referenceValue)}matches(e){const t=W.comparator(e.key,this.key);return this.matchesComparison(t)}}class mM extends de{constructor(e,t){super(e,"in",t),this.keys=nR("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class gM extends de{constructor(e,t){super(e,"not-in",t),this.keys=nR("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function nR(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>W.fromName(r.referenceValue))}class _M extends de{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return lu(t)&&au(t.arrayValue,this.value)}}class rR extends de{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&au(this.value.arrayValue,t)}}class yM extends de{constructor(e,t){super(e,"not-in",t)}matches(e){if(au(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!au(this.value.arrayValue,t)}}class vM extends de{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!lu(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>au(this.value.arrayValue,r))}}/**
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
 */class wM{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function lg(n,e=null,t=[],r=[],i=null,s=null,o=null){return new wM(n,e,t,r,i,s,o)}function As(n){const e=$(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>ag(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),xu(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Go(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Go(r)).join(",")),e.ue=t}return e.ue}function Nu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!fM(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ZC(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!xI(n.startAt,e.startAt)&&xI(n.endAt,e.endAt)}function Qh(n){return W.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Yh(n,e){return n.filters.filter(t=>t instanceof de&&t.field.isEqual(e))}function NI(n,e,t){let r=lh,i=!0;for(const s of Yh(n,e)){let o=lh,a=!0;switch(s.op){case"<":case"<=":o=hM(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=lh}RI({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];RI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function bI(n,e,t){let r=ti,i=!0;for(const s of Yh(n,e)){let o=ti,a=!0;switch(s.op){case">=":case">":o=dM(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=ti}kI({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];kI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
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
 */class br{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function iR(n,e,t,r,i,s,o,a){return new br(n,e,t,r,i,s,o,a)}function ma(n){return new br(n)}function DI(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function X_(n){return n.collectionGroup!==null}function Po(n){const e=$(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Ee(De.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new uu(s,r))}),t.has(De.keyField().canonicalString())||e.ce.push(new uu(De.keyField(),r))}return e.ce}function bt(n){const e=$(n);return e.le||(e.le=oR(e,Po(n))),e.le}function sR(n){const e=$(n);return e.he||(e.he=oR(e,n.explicitOrderBy)),e.he}function oR(n,e){if(n.limitType==="F")return lg(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new uu(i.field,s)});const t=n.endAt?new Ai(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ai(n.startAt.position,n.startAt.inclusive):null;return lg(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function ug(n,e){const t=n.filters.concat([e]);return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Jh(n,e,t){return new br(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function bu(n,e){return Nu(bt(n),bt(e))&&n.limitType===e.limitType}function aR(n){return`${As(bt(n))}|lt:${n.limitType}`}function ro(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>tR(i)).join(", ")}]`),xu(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Go(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Go(i)).join(",")),`Target(${r})`}(bt(n))}; limitType=${n.limitType})`}function Du(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):W.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Po(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,a,l){const c=PI(o,a,l);return o.inclusive?c<=0:c<0}(r.startAt,Po(r),i)||r.endAt&&!function(o,a,l){const c=PI(o,a,l);return o.inclusive?c>=0:c>0}(r.endAt,Po(r),i))}(n,e)}function lR(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function uR(n){return(e,t)=>{let r=!1;for(const i of Po(n)){const s=EM(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function EM(n,e,t){const r=n.field.isKeyField()?W.comparator(e.key,t.key):function(s,o,a){const l=o.data.field(s),c=a.data.field(s);return l!==null&&c!==null?Si(l,c):K()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return K()}}/**
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
 */class Dr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Bi(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return WC(this.inner)}size(){return this.innerSize}}/**
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
 */const IM=new qe(W.comparator);function Wt(){return IM}const cR=new qe(W.comparator);function dl(...n){let e=cR;for(const t of n)e=e.insert(t.key,t);return e}function hR(n){let e=cR;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Bn(){return Rl()}function dR(){return Rl()}function Rl(){return new Dr(n=>n.toString(),(n,e)=>n.isEqual(e))}const TM=new qe(W.comparator),SM=new Ee(W.comparator);function re(...n){let e=SM;for(const t of n)e=e.add(t);return e}const AM=new Ee(ne);function Z_(){return AM}/**
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
 */function ey(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:su(e)?"-0":e}}function fR(n){return{integerValue:""+n}}function pR(n,e){return jC(e)?fR(e):ey(n,e)}/**
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
 */class rf{constructor(){this._=void 0}}function CM(n,e,t){return n instanceof Ko?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ef(s)&&(s=tf(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof Cs?gR(n,e):n instanceof Rs?_R(n,e):function(i,s){const o=mR(i,s),a=VI(o)+VI(i.Pe);return sg(o)&&sg(i.Pe)?fR(a):ey(i.serializer,a)}(n,e)}function RM(n,e,t){return n instanceof Cs?gR(n,e):n instanceof Rs?_R(n,e):t}function mR(n,e){return n instanceof Ho?function(r){return sg(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ko extends rf{}class Cs extends rf{constructor(e){super(),this.elements=e}}function gR(n,e){const t=yR(e);for(const r of n.elements)t.some(i=>Hn(i,r))||t.push(r);return{arrayValue:{values:t}}}class Rs extends rf{constructor(e){super(),this.elements=e}}function _R(n,e){let t=yR(e);for(const r of n.elements)t=t.filter(i=>!Hn(i,r));return{arrayValue:{values:t}}}class Ho extends rf{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function VI(n){return Oe(n.integerValue||n.doubleValue)}function yR(n){return lu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Vu{constructor(e,t){this.field=e,this.transform=t}}function kM(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Cs&&i instanceof Cs||r instanceof Rs&&i instanceof Rs?zo(r.elements,i.elements,Hn):r instanceof Ho&&i instanceof Ho?Hn(r.Pe,i.Pe):r instanceof Ko&&i instanceof Ko}(n.transform,e.transform)}class PM{constructor(e,t){this.version=e,this.transformResults=t}}class Me{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Me}static exists(e){return new Me(void 0,e)}static updateTime(e){return new Me(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hh(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class sf{}function vR(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _a(n.key,Me.none()):new ga(n.key,n.data,Me.none());{const t=n.data,r=vt.empty();let i=new Ee(De.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Vr(n.key,r,new Gt(i.toArray()),Me.none())}}function xM(n,e,t){n instanceof ga?function(i,s,o){const a=i.value.clone(),l=LI(i.fieldTransforms,s,o.transformResults);a.setAll(l),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof Vr?function(i,s,o){if(!hh(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=LI(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(wR(i)),l.setAll(a),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function kl(n,e,t,r){return n instanceof ga?function(s,o,a,l){if(!hh(s.precondition,o))return a;const c=s.value.clone(),h=MI(s.fieldTransforms,l,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof Vr?function(s,o,a,l){if(!hh(s.precondition,o))return a;const c=MI(s.fieldTransforms,l,o),h=o.data;return h.setAll(wR(s)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(d=>d.field))}(n,e,t,r):function(s,o,a){return hh(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function NM(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=mR(r.transform,i||null);s!=null&&(t===null&&(t=vt.empty()),t.set(r.field,s))}return t||null}function OI(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&zo(r,i,(s,o)=>kM(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class ga extends sf{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Vr extends sf{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function wR(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function LI(n,e,t){const r=new Map;Q(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,RM(o,a,t[i]))}return r}function MI(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,CM(s,o,e))}return r}class _a extends sf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ty extends sf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ny{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&xM(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=kl(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=kl(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=dR();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const l=vR(o,a);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(J.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&zo(this.mutations,e.mutations,(t,r)=>OI(t,r))&&zo(this.baseMutations,e.baseMutations,(t,r)=>OI(t,r))}}class ry{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Q(e.mutations.length===r.length);let i=function(){return TM}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new ry(e,t,r,i)}}/**
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
 */class iy{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class ER{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
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
 */class bM{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var et,pe;function IR(n){switch(n){default:return K();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0}}function TR(n){if(n===void 0)return Xe("GRPC error has no .code"),O.UNKNOWN;switch(n){case et.OK:return O.OK;case et.CANCELLED:return O.CANCELLED;case et.UNKNOWN:return O.UNKNOWN;case et.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case et.INTERNAL:return O.INTERNAL;case et.UNAVAILABLE:return O.UNAVAILABLE;case et.UNAUTHENTICATED:return O.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case et.NOT_FOUND:return O.NOT_FOUND;case et.ALREADY_EXISTS:return O.ALREADY_EXISTS;case et.PERMISSION_DENIED:return O.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case et.ABORTED:return O.ABORTED;case et.OUT_OF_RANGE:return O.OUT_OF_RANGE;case et.UNIMPLEMENTED:return O.UNIMPLEMENTED;case et.DATA_LOSS:return O.DATA_LOSS;default:return K()}}(pe=et||(et={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function SR(){return new TextEncoder}/**
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
 */const DM=new ms([4294967295,4294967295],0);function FI(n){const e=SR().encode(n),t=new AC;return t.update(e),new Uint8Array(t.digest())}function UI(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new ms([t,r],0),new ms([i,s],0)]}class sy{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new fl(`Invalid padding: ${t}`);if(r<0)throw new fl(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new fl(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new fl(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=ms.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(ms.fromNumber(r)));return i.compare(DM)===1&&(i=new ms([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=FI(e),[r,i]=UI(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new sy(s,i,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ie===0)return;const t=FI(e),[r,i]=UI(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class fl extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ou{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Lu.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ou(J.min(),i,new qe(ne),Wt(),re())}}class Lu{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Lu(r,t,re(),re(),re())}}/**
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
 */class dh{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class AR{constructor(e,t){this.targetId=e,this.me=t}}class CR{constructor(e,t,r=Ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class jI{constructor(){this.fe=0,this.ge=zI(),this.pe=Ge.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=re(),t=re(),r=re();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:K()}}),new Lu(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=zI()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class VM{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wt(),this.qe=BI(),this.Qe=new qe(ne)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:K()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Qh(s))if(r===0){const o=new W(s.path);this.Ue(t,o,be.newNoDocument(o,J.min()))}else Q(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),l=a?this.Xe(a,e,o):1;if(l!==0){this.je(t);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,c)}Xh==null||Xh.et(function(h,d,p,_,I){var P,x,v,E,A,V;const F={localCacheCount:h,existenceFilterCount:d.count,databaseId:p.database,projectId:p.projectId},M=d.unchangedNames;return M&&(F.bloomFilter={applied:I===0,hashCount:(P=M==null?void 0:M.hashCount)!==null&&P!==void 0?P:0,bitmapLength:(E=(v=(x=M==null?void 0:M.bits)===null||x===void 0?void 0:x.bitmap)===null||v===void 0?void 0:v.length)!==null&&E!==void 0?E:0,padding:(V=(A=M==null?void 0:M.bits)===null||A===void 0?void 0:A.padding)!==null&&V!==void 0?V:0,mightContain:S=>{var w;return(w=_==null?void 0:_.mightContain(S))!==null&&w!==void 0&&w}}),F}(o,e.me,this.Le.tt(),a,l))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=Rr(r).toUint8Array()}catch(l){if(l instanceof KC)return on("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new sy(o,i,s)}catch(l){return on(l instanceof fl?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Qh(a.target)){const l=new W(a.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,be.newNoDocument(l,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let r=re();this.qe.forEach((s,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.Je(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new Ou(e,t,this.Qe,this.ke,r);return this.ke=Wt(),this.qe=BI(),this.Qe=new qe(ne),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new jI,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ee(ne),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new jI),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function BI(){return new qe(W.comparator)}function zI(){return new qe(W.comparator)}const OM={asc:"ASCENDING",desc:"DESCENDING"},LM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},MM={and:"AND",or:"OR"};class FM{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function cg(n,e){return n.useProto3Json||xu(e)?e:{value:e}}function Qo(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function RR(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function UM(n,e){return Qo(n,e.toTimestamp())}function Ze(n){return Q(!!n),J.fromTimestamp(function(t){const r=Cr(t);return new Fe(r.seconds,r.nanos)}(n))}function oy(n,e){return hg(n,e).canonicalString()}function hg(n,e){const t=function(i){return new he(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function kR(n){const e=he.fromString(n);return Q(FR(e)),e}function cu(n,e){return oy(n.databaseId,e.path)}function Wn(n,e){const t=kR(e);if(t.get(1)!==n.databaseId.projectId)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new U(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new W(NR(t))}function PR(n,e){return oy(n.databaseId,e)}function xR(n){const e=kR(n);return e.length===4?he.emptyPath():NR(e)}function dg(n){return new he(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function NR(n){return Q(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function $I(n,e,t){return{name:cu(n,e),fields:t.value.mapValue.fields}}function bR(n,e,t){const r=Wn(n,e.name),i=Ze(e.updateTime),s=e.createTime?Ze(e.createTime):J.min(),o=new vt({mapValue:{fields:e.fields}}),a=be.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function jM(n,e){return"found"in e?function(r,i){Q(!!i.found),i.found.name,i.found.updateTime;const s=Wn(r,i.found.name),o=Ze(i.found.updateTime),a=i.found.createTime?Ze(i.found.createTime):J.min(),l=new vt({mapValue:{fields:i.found.fields}});return be.newFoundDocument(s,o,a,l)}(n,e):"missing"in e?function(r,i){Q(!!i.missing),Q(!!i.readTime);const s=Wn(r,i.missing),o=Ze(i.readTime);return be.newNoDocument(s,o)}(n,e):K()}function BM(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:K()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,h){return c.useProto3Json?(Q(h===void 0||typeof h=="string"),Ge.fromBase64String(h||"")):(Q(h===void 0||h instanceof Buffer||h instanceof Uint8Array),Ge.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const h=c.code===void 0?O.UNKNOWN:TR(c.code);return new U(h,c.message||"")}(o);t=new CR(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(n,r.document.name),s=Ze(r.document.updateTime),o=r.document.createTime?Ze(r.document.createTime):J.min(),a=new vt({mapValue:{fields:r.document.fields}}),l=be.newFoundDocument(i,s,o,a),c=r.targetIds||[],h=r.removedTargetIds||[];t=new dh(c,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(n,r.document),s=r.readTime?Ze(r.readTime):J.min(),o=be.newNoDocument(i,s),a=r.removedTargetIds||[];t=new dh([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(n,r.document),s=r.removedTargetIds||[];t=new dh([],s,i,null)}else{if(!("filter"in e))return K();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new bM(i,s),a=r.targetId;t=new AR(a,o)}}return t}function hu(n,e){let t;if(e instanceof ga)t={update:$I(n,e.key,e.value)};else if(e instanceof _a)t={delete:cu(n,e.key)};else if(e instanceof Vr)t={update:$I(n,e.key,e.data),updateMask:KM(e.fieldMask)};else{if(!(e instanceof ty))return K();t={verify:cu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const a=o.transform;if(a instanceof Ko)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Cs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Rs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ho)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw K()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:UM(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:K()}(n,e.precondition)),t}function fg(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Me.updateTime(Ze(s.updateTime)):s.exists!==void 0?Me.exists(s.exists):Me.none()}(e.currentDocument):Me.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,a){let l=null;if("setToServerValue"in a)Q(a.setToServerValue==="REQUEST_TIME"),l=new Ko;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];l=new Cs(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];l=new Rs(h)}else"increment"in a?l=new Ho(o,a.increment):K();const c=De.fromServerFormat(a.fieldPath);return new Vu(c,l)}(n,i)):[];if(e.update){e.update.name;const i=Wn(n,e.update.name),s=new vt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const c=l.fieldPaths||[];return new Gt(c.map(h=>De.fromServerFormat(h)))}(e.updateMask);return new Vr(i,s,o,t,r)}return new ga(i,s,t,r)}if(e.delete){const i=Wn(n,e.delete);return new _a(i,t)}if(e.verify){const i=Wn(n,e.verify);return new ty(i,t)}return K()}function zM(n,e){return n&&n.length>0?(Q(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?Ze(i.updateTime):Ze(s);return o.isEqual(J.min())&&(o=Ze(s)),new PM(o,i.transformResults||[])}(t,e))):[]}function DR(n,e){return{documents:[PR(n,e.path)]}}function of(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=PR(n,i);const s=function(c){if(c.length!==0)return MR(ve.create(c,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:Yr(p.field),direction:qM(p.dir)}}(h))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=cg(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:t,parent:i}}function VR(n,e,t,r){const{_t:i,parent:s}=of(n,e),o={},a=[];let l=0;return t.forEach(c=>{const h=r?c.alias:"aggregate_"+l++;o[h]=c.alias,c.aggregateType==="count"?a.push({alias:h,count:{}}):c.aggregateType==="avg"?a.push({alias:h,avg:{field:Yr(c.fieldPath)}}):c.aggregateType==="sum"&&a.push({alias:h,sum:{field:Yr(c.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function OR(n){let e=xR(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Q(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=function(d){const p=LR(d);return p instanceof ve&&J_(p)?p.getFilters():[p]}(t.where));let o=[];t.orderBy&&(o=function(d){return d.map(p=>function(I){return new uu(io(I.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(I.direction))}(p))}(t.orderBy));let a=null;t.limit&&(a=function(d){let p;return p=typeof d=="object"?d.value:d,xu(p)?null:p}(t.limit));let l=null;t.startAt&&(l=function(d){const p=!!d.before,_=d.values||[];return new Ai(_,p)}(t.startAt));let c=null;return t.endAt&&(c=function(d){const p=!d.before,_=d.values||[];return new Ai(_,p)}(t.endAt)),iR(e,i,o,s,a,"F",l,c)}function $M(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return K()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function LR(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=io(t.unaryFilter.field);return de.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=io(t.unaryFilter.field);return de.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=io(t.unaryFilter.field);return de.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=io(t.unaryFilter.field);return de.create(o,"!=",{nullValue:"NULL_VALUE"});default:return K()}}(n):n.fieldFilter!==void 0?function(t){return de.create(io(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return K()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ve.create(t.compositeFilter.filters.map(r=>LR(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return K()}}(t.compositeFilter.op))}(n):K()}function qM(n){return OM[n]}function GM(n){return LM[n]}function WM(n){return MM[n]}function Yr(n){return{fieldPath:n.canonicalString()}}function io(n){return De.fromServerFormat(n.fieldPath)}function MR(n){return n instanceof de?function(t){if(t.op==="=="){if(CI(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NAN"}};if(AI(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(CI(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NOT_NAN"}};if(AI(t.value))return{unaryFilter:{field:Yr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Yr(t.field),op:GM(t.op),value:t.value}}}(n):n instanceof ve?function(t){const r=t.getFilters().map(i=>MR(i));return r.length===1?r[0]:{compositeFilter:{op:WM(t.op),filters:r}}}(n):K()}function KM(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function FR(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class mr{constructor(e,t,r,i,s=J.min(),o=J.min(),a=Ge.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new mr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new mr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class UR{constructor(e){this.ct=e}}function HM(n,e){let t;if(e.document)t=bR(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=W.fromSegments(e.noDocument.path),i=Ps(e.noDocument.readTime);t=be.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return K();{const r=W.fromSegments(e.unknownDocument.path),i=Ps(e.unknownDocument.version);t=be.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new Fe(i[0],i[1]);return J.fromTimestamp(s)}(e.readTime)),t}function qI(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Zh(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:cu(s,o.key),fields:o.data.value.mapValue.fields,updateTime:Qo(s,o.version.toTimestamp()),createTime:Qo(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:ks(e.version)};else{if(!e.isUnknownDocument())return K();r.unknownDocument={path:t.path.toArray(),version:ks(e.version)}}return r}function Zh(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function ks(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ps(n){const e=new Fe(n.seconds,n.nanoseconds);return J.fromTimestamp(e)}function rs(n,e){const t=(e.baseMutations||[]).map(s=>fg(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>fg(n.ct,s)),i=Fe.fromMillis(e.localWriteTimeMs);return new ny(e.batchId,i,t,r)}function pl(n){const e=Ps(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Ps(n.lastLimboFreeSnapshotVersion):J.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return Q(s.documents.length===1),bt(ma(xR(s.documents[0])))}(n.query):function(s){return bt(OR(s))}(n.query),new mr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ge.fromBase64String(n.resumeToken))}function jR(n,e){const t=ks(e.snapshotVersion),r=ks(e.lastLimboFreeSnapshotVersion);let i;i=Qh(e.target)?DR(n.ct,e.target):of(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:As(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function ay(n){const e=OR({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Jh(e,e.limit,"L"):e}function Mp(n,e){return new iy(e.largestBatchId,fg(n.ct,e.overlayMutation))}function GI(n,e){const t=e.path.lastSegment();return[n,Nt(e.path.popLast()),t]}function WI(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:ks(r.readTime),documentKey:Nt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class QM{getBundleMetadata(e,t){return KI(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Ps(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return KI(e).put(function(i){return{bundleId:i.id,createTime:ks(Ze(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return HI(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:ay(s.bundledQuery),readTime:Ps(s.readTime)}}(r)})}saveNamedQuery(e,t){return HI(e).put(function(i){return{name:i.name,readTime:ks(Ze(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function KI(n){return at(n,"bundles")}function HI(n){return at(n,"namedQueries")}/**
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
 */class af{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new af(e,r)}getOverlay(e,t){return Ya(e).get(GI(this.userId,t)).next(r=>r?Mp(this.serializer,r):null)}getOverlays(e,t){const r=Bn();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const a=new iy(t,o);i.push(this.ht(e,a))}),b.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(Nt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Ya(e).j("collectionPathOverlayIndex",a))}),b.waitFor(s)}getOverlaysForCollection(e,t,r){const i=Bn(),s=Nt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Ya(e).U("collectionPathOverlayIndex",o).next(a=>{for(const l of a){const c=Mp(this.serializer,l);i.set(c.getKey(),c)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=Bn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Ya(e).J({index:"collectionGroupOverlayIndex",range:a},(l,c,h)=>{const d=Mp(this.serializer,c);s.size()<i||d.largestBatchId===o?(s.set(d.getKey(),d),o=d.largestBatchId):h.done()}).next(()=>s)}ht(e,t){return Ya(e).put(function(i,s,o){const[a,l,c]=GI(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:c,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:hu(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Ya(n){return at(n,"documentOverlays")}/**
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
 */class YM{Pt(e){return at(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ge.fromUint8Array(r):Ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class is{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(Oe(e.integerValue));else if("doubleValue"in e){const r=Oe(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),su(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=Cr(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Rr(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?HC(e)?this.dt(t,Number.MAX_SAFE_INTEGER):nf(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):K()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(Oe(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),W.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}is.vt=new is;function JM(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function QI(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=JM(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class XM{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=QI(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=QI(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class ZM{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class eF{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Ja{constructor(){this.jt=new XM,this.Ht=new ZM(this.jt),this.Jt=new eF(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class ss{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new ss(this.indexId,this.documentKey,this.arrayValue,r)}}function Br(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=YI(n.arrayValue,e.arrayValue),t!==0?t:(t=YI(n.directionalValue,e.directionalValue),t!==0?t:W.comparator(n.documentKey,e.documentKey)))}function YI(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class JI{constructor(e){this.Xt=new Ee((t,r)=>De.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(Q(e.collectionGroup===this.collectionId),this.nn)return!1;const t=tg(e);if(t!==void 0&&!this.sn(t))return!1;const r=es(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const l=r[s];if(!this.on(a,l)||!this._n(this.en[o++],l))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Ee(De.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new gs(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new gs(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new gs(r.field,r.dir==="asc"?0:1)));return new $o($o.UNKNOWN_ID,this.collectionId,t,qo.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function BR(n){var e,t;if(Q(n instanceof de||n instanceof ve),n instanceof de){if(n instanceof rR){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>de.create(n.field,"==",s)))||[];return ve.create(i,"or")}return n}const r=n.filters.map(i=>BR(i));return ve.create(r,n.op)}function tF(n){if(n.getFilters().length===0)return[];const e=gg(BR(n));return Q(zR(e)),pg(e)||mg(e)?[e]:e.getFilters()}function pg(n){return n instanceof de}function mg(n){return n instanceof ve&&J_(n)}function zR(n){return pg(n)||mg(n)||function(t){if(t instanceof ve&&og(t)){for(const r of t.getFilters())if(!pg(r)&&!mg(r))return!1;return!0}return!1}(n)}function gg(n){if(Q(n instanceof de||n instanceof ve),n instanceof de)return n;if(n.filters.length===1)return gg(n.filters[0]);const e=n.filters.map(r=>gg(r));let t=ve.create(e,n.op);return t=ed(t),zR(t)?t:(Q(t instanceof ve),Q(Wo(t)),Q(t.filters.length>1),t.filters.reduce((r,i)=>ly(r,i)))}function ly(n,e){let t;return Q(n instanceof de||n instanceof ve),Q(e instanceof de||e instanceof ve),t=n instanceof de?e instanceof de?function(i,s){return ve.create([i,s],"and")}(n,e):XI(n,e):e instanceof de?XI(e,n):function(i,s){if(Q(i.filters.length>0&&s.filters.length>0),Wo(i)&&Wo(s))return eR(i,s.getFilters());const o=og(i)?i:s,a=og(i)?s:i,l=o.filters.map(c=>ly(c,a));return ve.create(l,"or")}(n,e),ed(t)}function XI(n,e){if(Wo(e))return eR(e,n.getFilters());{const t=e.filters.map(r=>ly(n,r));return ve.create(t,"or")}}function ed(n){if(Q(n instanceof de||n instanceof ve),n instanceof de)return n;const e=n.getFilters();if(e.length===1)return ed(e[0]);if(XC(n))return n;const t=e.map(i=>ed(i)),r=[];return t.forEach(i=>{i instanceof de?r.push(i):i instanceof ve&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ve.create(r,n.op)}/**
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
 */class nF{constructor(){this.un=new uy}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(an.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(an.min())}updateCollectionGroup(e,t,r){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class uy{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ee(he.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ee(he.comparator)).toArray()}}/**
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
 */const Lc=new Uint8Array(0);class rF{constructor(e,t){this.databaseId=t,this.cn=new uy,this.ln=new Dr(r=>As(r),(r,i)=>Nu(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:r,parent:Nt(i)};return ZI(e).put(s)}return b.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[VC(t),""],!1,!0);return ZI(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(jn(o.parent))}return r})}addFieldIndex(e,t){const r=Xa(e),i=function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=Zs(e);return s.next(a=>{o.put(WI(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=Xa(e),i=Zs(e),s=Xs(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Xa(e),r=Xs(e),i=Zs(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return b.forEach(this.hn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new JI(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=Xs(e);let i=!0;const s=new Map;return b.forEach(this.hn(t),o=>this.Pn(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=re();const a=[];return b.forEach(s,(l,c)=>{j("IndexedDbIndexManager",`Using index ${function(A){return`id=${A.indexId}|cg=${A.collectionGroup}|f=${A.fields.map(V=>`${V.fieldPath}:${V.kind}`).join(",")}`}(l)} to execute ${As(t)}`);const h=function(A,V){const F=tg(V);if(F===void 0)return null;for(const M of Yh(A,F.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(c,l),d=function(A,V){const F=new Map;for(const M of es(V))for(const S of Yh(A,M.fieldPath))switch(S.op){case"==":case"in":F.set(M.fieldPath.canonicalString(),S.value);break;case"not-in":case"!=":return F.set(M.fieldPath.canonicalString(),S.value),Array.from(F.values())}return null}(c,l),p=function(A,V){const F=[];let M=!0;for(const S of es(V)){const w=S.kind===0?NI(A,S.fieldPath,A.startAt):bI(A,S.fieldPath,A.startAt);F.push(w.value),M&&(M=w.inclusive)}return new Ai(F,M)}(c,l),_=function(A,V){const F=[];let M=!0;for(const S of es(V)){const w=S.kind===0?bI(A,S.fieldPath,A.endAt):NI(A,S.fieldPath,A.endAt);F.push(w.value),M&&(M=w.inclusive)}return new Ai(F,M)}(c,l),I=this.In(l,c,p),P=this.In(l,c,_),x=this.Tn(l,c,d),v=this.En(l.indexId,h,I,p.inclusive,P,_.inclusive,x);return b.forEach(v,E=>r.G(E,t.limit).next(A=>{A.forEach(V=>{const F=W.fromSegments(V.documentKey);o.has(F)||(o=o.add(F),a.push(F))})}))}).next(()=>a)}return b.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=tF(ve.create(e.filters,"and")).map(r=>lg(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),c=l/(t!=null?t.length:1),h=[];for(let d=0;d<l;++d){const p=t?this.dn(t[d/c]):Lc,_=this.An(e,p,r[d%c],i),I=this.Rn(e,p,s[d%c],o),P=a.map(x=>this.An(e,p,x,!0));h.push(...this.createRange(_,I,P))}return h}An(e,t,r,i){const s=new ss(e,W.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new ss(e,W.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new JI(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,t){let r=2;const i=this.hn(t);return b.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let c=new Ee(De.comparator),h=!1;for(const d of l.filters)for(const p of d.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?h=!0:c=c.add(p.field));for(const d of l.orderBy)d.field.isKeyField()||(c=c.add(d.field));return c.size+(h?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}Vn(e,t){const r=new Ja;for(const i of es(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);is.vt.It(s,o)}return r.zt()}dn(e){const t=new Ja;return is.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new Ja;return is.vt.It(Ss(this.databaseId,t),r.Yt(function(s){const o=es(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new Ja);let s=0;for(const o of es(e)){const a=r[s++];for(const l of i)if(this.fn(t,o.fieldPath)&&lu(a))i=this.gn(i,o,a);else{const c=l.Yt(o.kind);is.vt.It(a,c)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const l=new Ja;l.seed(a.zt()),is.vt.It(o,l.Yt(t.kind)),s.push(l)}return s}fn(e,t){return!!e.filters.find(r=>r instanceof de&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=Xa(e),i=Zs(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{const o=[];return b.forEach(s,a=>i.get([a.indexId,this.uid]).next(l=>{o.push(function(h,d){const p=d?new qo(d.sequenceNumber,new an(Ps(d.readTime),new W(jn(d.documentKey)),d.largestBatchId)):qo.empty(),_=h.fields.map(([I,P])=>new gs(De.fromServerFormat(I),P));return new $o(h.indexId,h.collectionGroup,_,p)}(a,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:ne(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=Xa(e),s=Zs(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(a=>b.forEach(a,l=>s.put(WI(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return b.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),b.forEach(a,l=>this.wn(e,i,l).next(c=>{const h=this.Sn(s,l);return c.isEqual(h)?b.resolve():this.bn(e,s,l,c,h)}))))})}Dn(e,t,r,i){return Xs(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return Xs(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=Xs(e);let s=new Ee(Br);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},(o,a)=>{s=s.add(new ss(r.indexId,t,a.arrayValue,a.directionalValue))}).next(()=>s)}Sn(e,t){let r=new Ee(Br);const i=this.Vn(t,e);if(i==null)return r;const s=tg(t);if(s!=null){const o=e.data.field(s.fieldPath);if(lu(o))for(const a of o.arrayValue.values||[])r=r.add(new ss(t.indexId,e.key,this.dn(a),i))}else r=r.add(new ss(t.indexId,e.key,Lc,i));return r}bn(e,t,r,i,s){j("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,c,h,d,p){const _=l.getIterator(),I=c.getIterator();let P=Js(_),x=Js(I);for(;P||x;){let v=!1,E=!1;if(P&&x){const A=h(P,x);A<0?E=!0:A>0&&(v=!0)}else P!=null?E=!0:v=!0;v?(d(x),x=Js(I)):E?(p(P),P=Js(_)):(P=Js(_),x=Js(I))}}(i,s,Br,a=>{o.push(this.Dn(e,t,r,a))},a=>{o.push(this.vn(e,t,r,a))}),b.waitFor(o)}yn(e){let t=1;return Zs(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,a)=>Br(o,a)).filter((o,a,l)=>!a||Br(o,l[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=Br(o,e),l=Br(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&l<0)i.push(o),i.push(o.Zt());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Lc,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Lc,[]];s.push(IDBKeyRange.bound(a,l))}return s}Cn(e,t){return Br(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(eT)}getMinOffset(e,t){return b.mapArray(this.hn(t),r=>this.Pn(e,r).next(i=>i||K())).next(eT)}}function ZI(n){return at(n,"collectionParents")}function Xs(n){return at(n,"indexEntries")}function Xa(n){return at(n,"indexConfiguration")}function Zs(n){return at(n,"indexState")}function eT(n){Q(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;H_(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new an(e.readTime,e.documentKey,t)}/**
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
 */const tT={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class kt{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new kt(e,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function $R(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const l=r.J({range:o},(h,d,p)=>(a++,p.delete()));s.push(l.next(()=>{Q(a===1)}));const c=[];for(const h of t.mutations){const d=BC(e,h.key.path,t.batchId);s.push(i.delete(d)),c.push(h.key)}return b.waitFor(s).next(()=>c)}function td(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw K();e=n.noDocument}return JSON.stringify(e).length}/**
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
 */kt.DEFAULT_COLLECTION_PERCENTILE=10,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,kt.DEFAULT=new kt(41943040,kt.DEFAULT_COLLECTION_PERCENTILE,kt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),kt.DISABLED=new kt(-1,0,0);class lf{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){Q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new lf(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return zr(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=so(e),o=zr(e);return o.add({}).next(a=>{Q(typeof a=="number");const l=new ny(a,t,r,i),c=function(_,I,P){const x=P.baseMutations.map(E=>hu(_.ct,E)),v=P.mutations.map(E=>hu(_.ct,E));return{userId:I,batchId:P.batchId,localWriteTimeMs:P.localWriteTime.toMillis(),baseMutations:x,mutations:v}}(this.serializer,this.userId,l),h=[];let d=new Ee((p,_)=>ne(p.canonicalString(),_.canonicalString()));for(const p of i){const _=BC(this.userId,p.key.path,a);d=d.add(p.key.path.popLast()),h.push(o.put(c)),h.push(s.put(_,qL))}return d.forEach(p=>{h.push(this.indexManager.addToCollectionParentIndex(e,p))}),e.addOnCommittedListener(()=>{this.Fn[a]=l.keys()}),b.waitFor(h).next(()=>l)})}lookupMutationBatch(e,t){return zr(e).get(t).next(r=>r?(Q(r.userId===this.userId),rs(this.serializer,r)):null)}Mn(e,t){return this.Fn[t]?b.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return zr(e).J({index:"userMutationsIndex",range:i},(o,a,l)=>{a.userId===this.userId&&(Q(a.batchId>=r),s=rs(this.serializer,a)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return zr(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return zr(e).U("userMutationsIndex",t).next(r=>r.map(i=>rs(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=ah(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return so(e).J({range:i},(o,a,l)=>{const[c,h,d]=o,p=jn(h);if(c===this.userId&&t.path.isEqual(p))return zr(e).get(d).next(_=>{if(!_)throw K();Q(_.userId===this.userId),s.push(rs(this.serializer,_))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ne);const i=[];return t.forEach(s=>{const o=ah(this.userId,s.path),a=IDBKeyRange.lowerBound(o),l=so(e).J({range:a},(c,h,d)=>{const[p,_,I]=c,P=jn(_);p===this.userId&&s.path.isEqual(P)?r=r.add(I):d.done()});i.push(l)}),b.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=ah(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Ee(ne);return so(e).J({range:o},(l,c,h)=>{const[d,p,_]=l,I=jn(p);d===this.userId&&r.isPrefixOf(I)?I.length===i&&(a=a.add(_)):h.done()}).next(()=>this.xn(e,a))}xn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(zr(e).get(s).next(o=>{if(o===null)throw K();Q(o.userId===this.userId),r.push(rs(this.serializer,o))}))}),b.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return $R(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),b.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return so(e).J({range:r},(s,o,a)=>{if(s[0]===this.userId){const l=jn(s[1]);i.push(l)}else a.done()}).next(()=>{Q(i.length===0)})})}containsKey(e,t){return qR(e,this.userId,t)}Nn(e){return GR(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function qR(n,e,t){const r=ah(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return so(n).J({range:s,H:!0},(a,l,c)=>{const[h,d,p]=a;h===e&&d===i&&(o=!0),c.done()}).next(()=>o)}function zr(n){return at(n,"mutations")}function so(n){return at(n,"documentMutations")}function GR(n){return at(n,"mutationQueues")}/**
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
 */class xs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new xs(0)}static kn(){return new xs(-1)}}/**
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
 */class iF{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const r=new xs(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>J.fromTimestamp(new Fe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>eo(e).delete(t.targetId)).next(()=>this.qn(e)).next(r=>(Q(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return eo(e).J((o,a)=>{const l=pl(a);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>b.waitFor(s)).next(()=>i)}forEachTarget(e,t){return eo(e).J((r,i)=>{const s=pl(i);t(s)})}qn(e){return nT(e).get("targetGlobalKey").next(t=>(Q(t!==null),t))}Qn(e,t){return nT(e).put("targetGlobalKey",t)}Kn(e,t){return eo(e).put(jR(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=As(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return eo(e).J({range:i,index:"queryTargetsIndex"},(o,a,l)=>{const c=pl(a);Nu(t,c.target)&&(s=c,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=Jr(e);return t.forEach(o=>{const a=Nt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),b.waitFor(i)}removeMatchingKeys(e,t,r){const i=Jr(e);return b.forEach(t,s=>{const o=Nt(s.path);return b.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=Jr(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=Jr(e);let s=re();return i.J({range:r,H:!0},(o,a,l)=>{const c=jn(o[1]),h=new W(c);s=s.add(h)}).next(()=>s)}containsKey(e,t){const r=Nt(t.path),i=IDBKeyRange.bound([r],[VC(r)],!1,!0);let s=0;return Jr(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,a],l,c)=>{o!==0&&(s++,c.done())}).next(()=>s>0)}ot(e,t){return eo(e).get(t).next(r=>r?pl(r):null)}}function eo(n){return at(n,"targets")}function nT(n){return at(n,"targetGlobal")}function Jr(n){return at(n,"targetDocuments")}/**
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
 */function rT([n,e],[t,r]){const i=ne(n,t);return i===0?ne(e,r):i}class sF{constructor(e){this.Un=e,this.buffer=new Ee(rT),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();rT(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class WR{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){j("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ji(t)?j("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Ui(t)}await this.Hn(3e5)})}}class oF{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return b.resolve(qt.oe);const r=new sF(t);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(j("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(tT)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(j("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),tT):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,l,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(j("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),i=this.params.maximumSequenceNumbersToCollect):i=d,o=Date.now(),this.nthSequenceNumber(e,i))).next(d=>(r=d,a=Date.now(),this.removeTargets(e,r,t))).next(d=>(s=d,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(d=>(c=Date.now(),no()<=ae.DEBUG&&j("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(l-a)+`ms
	Removed ${d} documents in `+(c-l)+`ms
Total Duration: ${c-h}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:d})))}}function KR(n,e){return new oF(n,e)}/**
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
 */class aF{constructor(e,t){this.db=e,this.garbageCollector=KR(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(r,i)=>t(i))}addReference(e,t,r){return Mc(e,r)}removeReference(e,t,r){return Mc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Mc(e,t)}nr(e,t){return function(i,s){let o=!1;return GR(i).Y(a=>qR(i,a,s).next(l=>(l&&(o=!0),b.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,a)=>{if(a<=t){const l=this.nr(e,o).next(c=>{if(!c)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,J.min()),Jr(e).delete(function(d){return[0,Nt(d.path)]}(o))))});i.push(l)}}).next(()=>b.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Mc(e,t)}tr(e,t){const r=Jr(e);let i,s=qt.oe;return r.J({index:"documentTargetsIndex"},([o,a],{path:l,sequenceNumber:c})=>{o===0?(s!==qt.oe&&t(new W(jn(i)),s),s=c,i=l):s=qt.oe}).next(()=>{s!==qt.oe&&t(new W(jn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Mc(n,e){return Jr(n).put(function(r,i){return{targetId:0,path:Nt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
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
 */class HR{constructor(){this.changes=new Dr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,be.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?b.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class lF{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Yi(e).put(r)}removeEntry(e,t,r){return Yi(e).delete(function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],Zh(o),a[a.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.rr(e,r)))}getEntry(e,t){let r=be.newInvalidDocument(t);return Yi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Za(t))},(i,s)=>{r=this.ir(t,s)}).next(()=>r)}sr(e,t){let r={size:0,document:be.newInvalidDocument(t)};return Yi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Za(t))},(i,s)=>{r={document:this.ir(t,s),size:td(s)}}).next(()=>r)}getEntries(e,t){let r=Wt();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,t){let r=Wt(),i=new qe(W.comparator);return this._r(e,t,(s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,td(o))}).next(()=>({documents:r,ur:i}))}_r(e,t,r){if(t.isEmpty())return b.resolve();let i=new Ee(oT);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(Za(i.first()),Za(i.last())),o=i.getIterator();let a=o.getNext();return Yi(e).J({index:"documentKeyIndex",range:s},(l,c,h)=>{const d=W.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;a&&oT(a,d)<0;)r(a,null),a=o.getNext();a&&a.isEqual(d)&&(r(a,c),a=o.hasNext()?o.getNext():null),a?h.$(Za(a)):h.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),Zh(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Yi(e).U(IDBKeyRange.bound(a,l,!0)).next(c=>{s==null||s.incrementDocumentReadCount(c.length);let h=Wt();for(const d of c){const p=this.ir(W.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);p.isFoundDocument()&&(Du(t,p)||i.has(p.key))&&(h=h.insert(p.key,p))}return h})}getAllFromCollectionGroup(e,t,r,i){let s=Wt();const o=sT(t,r),a=sT(t,an.max());return Yi(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(l,c,h)=>{const d=this.ir(W.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);s=s.insert(d.key,d),s.size===i&&h.done()}).next(()=>s)}newChangeBuffer(e){return new uF(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return iT(e).get("remoteDocumentGlobalKey").next(t=>(Q(!!t),t))}rr(e,t){return iT(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=HM(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(J.min())))return r}return be.newInvalidDocument(e)}}function QR(n){return new lF(n)}class uF extends HR{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Dr(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new Ee((s,o)=>ne(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const l=qI(this.cr.serializer,o);i=i.add(s.path.popLast());const c=td(l);r+=c-a.size,t.push(this.cr.addEntry(e,s,l))}else if(r-=a.size,this.trackRemovals){const l=qI(this.cr.serializer,o.convertToNoDocument(J.min()));t.push(this.cr.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,r)),b.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function iT(n){return at(n,"remoteDocumentGlobal")}function Yi(n){return at(n,"remoteDocumentsV14")}function Za(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function sT(n,e){const t=e.documentKey.path.toArray();return[n,Zh(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function oT(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=ne(t[s],r[s]),i)return i;return i=ne(t.length,r.length),i||(i=ne(t[t.length-2],r[r.length-2]),i||ne(t[t.length-1],r[r.length-1]))}/**
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
 */class cF{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class YR{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&kl(r.mutation,i,Gt.empty(),Fe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const i=Bn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=dl();return s.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=Bn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=Wt();const o=Rl(),a=function(){return Rl()}();return t.forEach((l,c)=>{const h=r.get(c.key);i.has(c.key)&&(h===void 0||h.mutation instanceof Vr)?s=s.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),kl(h.mutation,c,h.mutation.getFieldMask(),Fe.now())):o.set(c.key,Gt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((c,h)=>o.set(c,h)),t.forEach((c,h)=>{var d;return a.set(c,new cF(h,(d=o.get(c))!==null&&d!==void 0?d:null))}),a))}recalculateAndSaveOverlays(e,t){const r=Rl();let i=new qe((o,a)=>o-a),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=t.get(l);if(c===null)return;let h=r.get(l)||Gt.empty();h=a.applyToLocalView(c,h),r.set(l,h);const d=(i.get(a.batchId)||re()).add(l);i=i.insert(a.batchId,d)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,h=l.value,d=dR();h.forEach(p=>{if(!s.has(p)){const _=vR(t.get(p),r.get(p));_!==null&&d.set(p,_),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,d))}return b.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return W.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):X_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):b.resolve(Bn());let a=-1,l=s;return o.next(c=>b.forEach(c,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),s.get(h)?b.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{l=l.insert(h,p)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,l,c,re())).next(h=>({batchId:a,changes:hR(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new W(t)).next(r=>{let i=dl();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=dl();return this.indexManager.getCollectionParents(e,s).next(a=>b.forEach(a,l=>{const c=function(d,p){return new br(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,c)=>{const h=c.getKey();o.get(h)===null&&(o=o.insert(h,be.newInvalidDocument(h)))});let a=dl();return o.forEach((l,c)=>{const h=s.get(l);h!==void 0&&kl(h.mutation,c,Gt.empty(),Fe.now()),Du(t,c)&&(a=a.insert(l,c))}),a})}}/**
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
 */class hF{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ze(i.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:ay(i.bundledQuery),readTime:Ze(i.readTime)}}(t)),b.resolve()}}/**
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
 */class dF{constructor(){this.overlays=new qe(W.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Bn();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),b.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),b.resolve()}getOverlaysForCollection(e,t,r){const i=Bn(),s=t.length+1,o=new W(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new qe((c,h)=>c-h);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>r){let h=s.get(c.largestBatchId);h===null&&(h=Bn(),s=s.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const a=Bn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,h)=>a.set(c,h)),!(a.size()>=i)););return b.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new iy(t,r));let s=this.Ir.get(t);s===void 0&&(s=re(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
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
 */class fF{constructor(){this.sessionToken=Ge.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
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
 */class cy{constructor(){this.Tr=new Ee(ut.Er),this.dr=new Ee(ut.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ut(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ut(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new W(new he([])),r=new ut(t,e),i=new ut(t,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new W(new he([])),r=new ut(t,e),i=new ut(t,e+1);let s=re();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new ut(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ut{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return W.comparator(e.key,t.key)||ne(e.wr,t.wr)}static Ar(e,t){return ne(e.wr,t.wr)||W.comparator(e.key,t.key)}}/**
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
 */class pF{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ee(ut.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ny(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new ut(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ut(t,0),i=new ut(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const a=this.Dr(o.wr);s.push(a)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ne);return t.forEach(i=>{const s=new ut(i,0),o=new ut(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],a=>{r=r.add(a.wr)})}),b.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;W.isDocumentKey(s)||(s=s.child(""));const o=new ut(new W(s),0);let a=new Ee(ne);return this.br.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(a=a.add(l.wr)),!0)},o),b.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return b.forEach(t.mutations,i=>{const s=new ut(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ut(t,0),i=this.br.firstAfterOrEqual(r);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class mF{constructor(e){this.Mr=e,this.docs=function(){return new qe(W.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return b.resolve(r?r.document.mutableCopy():be.newInvalidDocument(t))}getEntries(e,t){let r=Wt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():be.newInvalidDocument(i))}),b.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Wt();const o=t.path,a=new W(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:h}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||H_(LC(h),r)<=0||(i.has(h.key)||Du(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,r,i){K()}Or(e,t){return b.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new gF(this)}getSize(e){return b.resolve(this.size)}}class gF extends HR{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class _F{constructor(e){this.persistence=e,this.Nr=new Dr(t=>As(t),Nu),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Lr=0,this.Br=new cy,this.targetCount=0,this.kr=xs.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new xs(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return b.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),b.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return b.resolve(r)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
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
 */class hy{constructor(e,t){this.qr={},this.overlays={},this.Qr=new qt(0),this.Kr=!1,this.Kr=!0,this.$r=new fF,this.referenceDelegate=e(this),this.Ur=new _F(this),this.indexManager=new nF,this.remoteDocumentCache=function(i){return new mF(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new UR(t),this.Gr=new hF(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new dF,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new pF(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const i=new yF(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return b.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class yF extends FC{constructor(e){super(),this.currentSequenceNumber=e}}class uf{constructor(e){this.persistence=e,this.Jr=new cy,this.Yr=null}static Zr(e){return new uf(e)}get Xr(){if(this.Yr)return this.Yr;throw K()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),b.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,r=>{const i=W.fromPath(r);return this.ei(e,i).next(s=>{s||t.removeEntry(i,J.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class nd{constructor(e,t){this.persistence=e,this.ti=new Dr(r=>Nt(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=KR(this,t)}static Zr(e,t){return new nd(e,t)}zr(){}jr(e){return b.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}Zn(e,t){return b.forEach(this.ti,(r,i)=>this.nr(e,r,i).next(s=>s?b.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,o=>this.nr(e,o,t).next(a=>{a||(r++,s.removeEntry(o,J.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),b.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),b.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),b.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),b.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=uh(e.data.value)),t}nr(e,t,r){return b.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return b.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class vF{constructor(e){this.serializer=e}O(e,t,r,i){const s=new Zd("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",wI,{unique:!0}),l.createObjectStore("documentMutations")}(e),aT(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=b.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),aT(e)),o=o.next(()=>function(l){const c=l.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:J.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",h)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,c){return c.store("mutations").U().next(h=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",wI,{unique:!0});const d=c.store("mutations"),p=h.map(_=>d.put(_));return b.waitFor(p)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const c=l.createObjectStore("documentOverlays",{keyPath:nM});c.createIndex("collectionPathOverlayIndex",rM,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",iM,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const c=l.createObjectStore("remoteDocumentsV14",{keyPath:GL});c.createIndex("documentKeyIndex",WL),c.createIndex("collectionGroupIndex",KL)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:XL}).createIndex("sequenceNumberIndex",ZL,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:eM}).createIndex("documentKeyIndex",tM,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=td(i)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>b.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(a=>b.forEach(a,l=>{Q(l.userId===s.userId);const c=rs(this.serializer,l);return $R(e,s.userId,c).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,a)=>{const l=new he(o),c=function(d){return[0,Nt(d)]}(l);s.push(t.get(c).next(h=>h?b.resolve():(d=>t.put({targetId:0,path:Nt(d),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>b.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:JL});const r=t.store("collectionParents"),i=new uy,s=o=>{if(i.add(o)){const a=o.lastSegment(),l=o.popLast();return r.put({collectionId:a,parent:Nt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,a)=>{const l=new he(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,a,l],c)=>{const h=jn(a);return s(h.popLast())}))}oi(e){const t=e.store("targets");return t.J((r,i)=>{const s=pl(i),o=jR(this.serializer,s);return t.put(o)})}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{const a=t.store("remoteDocumentsV14"),l=function(d){return d.document?new W(he.fromString(d.document.name).popFirst(5)):d.noDocument?W.fromSegments(d.noDocument.path):d.unknownDocument?W.fromSegments(d.unknownDocument.path):K()}(o).path.toArray(),c={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(c))}).next(()=>b.waitFor(i))}ai(e,t){const r=t.store("mutations"),i=QR(this.serializer),s=new hy(uf.Zr,this.serializer.ct);return r.U().next(o=>{const a=new Map;return o.forEach(l=>{var c;let h=(c=a.get(l.userId))!==null&&c!==void 0?c:re();rs(this.serializer,l).keys().forEach(d=>h=h.add(d)),a.set(l.userId,h)}),b.forEach(a,(l,c)=>{const h=new ht(c),d=af.lt(this.serializer,h),p=s.getIndexManager(h),_=lf.lt(h,this.serializer,p,s.referenceDelegate);return new YR(i,_,d,p).recalculateAndSaveOverlaysForDocumentKeys(new ng(t,qt.oe),l).next()})})}}function aT(n){n.createObjectStore("targetDocuments",{keyPath:QL}).createIndex("documentTargetsIndex",YL,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",HL,{unique:!0}),n.createObjectStore("targetGlobal")}const Fp="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class dy{constructor(e,t,r,i,s,o,a,l,c,h,d=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=c,this.li=h,this.hi=d,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=p=>Promise.resolve(),!dy.D())throw new U(O.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new aF(this,i),this.Ai=t+"main",this.serializer=new UR(l),this.Ri=new Gn(this.Ai,this.hi,new vF(this.serializer)),this.$r=new YM,this.Ur=new iF(this.referenceDelegate,this.serializer),this.remoteDocumentCache=QR(this.serializer),this.Gr=new QM,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&Xe("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(O.FAILED_PRECONDITION,Fp);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new qt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Fc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(ji(e))return j("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return j("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return el(e).get("owner").next(t=>b.resolve(this.vi(t)))}Ci(e){return Fc(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=at(t,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return b.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?b.resolve(!0):el(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new U(O.FAILED_PRECONDITION,Fp);return!1}}return!(!this.networkEnabled||!this.inForeground)||Fc(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&j("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new ng(e,qt.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Fc(e).U().next(t=>this.xi(t,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return lf.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new rF(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return af.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){j("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?aM:l===16?oM:l===15?Y_:l===14?qC:l===13?$C:l===12?sM:l===11?zC:void K()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,a=>(o=new ng(a,this.Qr?this.Qr.next():qt.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw Xe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new U(O.FAILED_PRECONDITION,MC);return r(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>r(o)))).then(a=>(o.raiseOnCommittedEvent(),a))}Ki(e){return el(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(O.FAILED_PRECONDITION,Fp)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return el(e).put("owner",t)}static D(){return Gn.D()}bi(e){const t=el(e);return t.get("owner").next(r=>this.vi(r)?(j("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):b.resolve())}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Xe(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;UA()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return j("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Xe("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Xe("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function el(n){return at(n,"owner")}function Fc(n){return at(n,"clientMetadata")}function fy(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class py{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=re(),i=re();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new py(e,t.fromCache,r,i)}}/**
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
 */class wF{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class JR{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return UA()?8:UC(ot())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new wF;return this.Xi(e,t,o).next(a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)})}).next(()=>s.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(no()<=ae.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",ro(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(no()<=ae.DEBUG&&j("QueryEngine","Query:",ro(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(no()<=ae.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",ro(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,bt(t))):b.resolve())}Yi(e,t){if(DI(t))return b.resolve(null);let r=bt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Jh(t,null,"F"),r=bt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.Ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(l=>{const c=this.ts(t,a);return this.ns(t,c,o,l.readTime)?this.Yi(e,Jh(t,null,"F")):this.rs(e,c,t,l)}))})))}Zi(e,t,r,i){return DI(t)||i.isEqual(J.min())?b.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?b.resolve(null):(no()<=ae.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),ro(t)),this.rs(e,o,t,OC(i,-1)).next(a=>a))})}ts(e,t){let r=new Ee(uR(e));return t.forEach((i,s)=>{Du(e,s)&&(r=r.add(s))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return no()<=ae.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",ro(t)),this.Ji.getDocumentsMatchingQuery(e,t,an.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */class EF{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new qe(ne),this._s=new Dr(s=>As(s),Nu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new YR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function XR(n,e,t,r){return new EF(n,e,t,r)}async function ZR(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let l=re();for(const c of i){o.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}for(const c of s){a.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(r,l).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:a}))})})}function IF(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(a,l,c,h){const d=c.batch,p=d.keys();let _=b.resolve();return p.forEach(I=>{_=_.next(()=>h.getEntry(l,I)).next(P=>{const x=c.docVersions.get(I);Q(x!==null),P.version.compareTo(x)<0&&(d.applyToRemoteDocument(P,c),P.isValidDocument()&&(P.setReadTime(c.commitVersion),h.addEntry(P)))})}),_.next(()=>a.mutationQueue.removeMutationBatch(l,d))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let l=re();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(l=l.add(a.batch.mutations[c].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function ek(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function TF(n,e){const t=$(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach((h,d)=>{const p=i.get(d);if(!p)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,d).next(()=>t.Ur.addMatchingKeys(s,h.addedDocuments,d)));let _=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(d)!==null?_=_.withResumeToken(Ge.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,r)),i=i.insert(d,_),function(P,x,v){return P.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:v.addedDocuments.size+v.modifiedDocuments.size+v.removedDocuments.size>0}(p,_,h)&&a.push(t.Ur.updateTargetData(s,_))});let l=Wt(),c=re();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))}),a.push(tk(s,o,e.documentUpdates).next(h=>{l=h.Ps,c=h.Is})),!r.isEqual(J.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next(d=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(h)}return b.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,c)).next(()=>l)}).then(s=>(t.os=i,s))}function tk(n,e,t){let r=re(),i=re();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Wt();return t.forEach((a,l)=>{const c=s.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(a)),l.isNoDocument()&&l.version.isEqual(J.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):j("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function SF(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Yo(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ur.getTargetData(r,e).next(s=>s?(i=s,b.resolve(i)):t.Ur.allocateTargetId(r).next(o=>(i=new mr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function Jo(n,e,t){const r=$(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!ji(o))throw o;j("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function rd(n,e,t){const r=$(n);let i=J.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,c,h){const d=$(l),p=d._s.get(h);return p!==void 0?b.resolve(d.os.get(p)):d.Ur.getTargetData(c,h)}(r,o,bt(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next(l=>{s=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:J.min(),t?s:re())).next(a=>(ik(r,lR(e),a),{documents:a,Ts:s})))}function nk(n,e){const t=$(n),r=$(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function rk(n,e){const t=$(n),r=t.us.get(e)||J.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,OC(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(ik(t,e,i),i))}function ik(n,e,t){let r=n.us.get(e)||J.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.us.set(e,r)}async function AF(n,e,t,r){const i=$(n);let s=re(),o=Wt();for(const c of t){const h=e.Es(c.metadata.name);c.document&&(s=s.add(h));const d=e.ds(c);d.setReadTime(e.As(c.metadata.readTime)),o=o.insert(h,d)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),l=await Yo(i,function(h){return bt(ma(he.fromString(`__bundle__/docs/${h}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",c=>tk(c,a,o).next(h=>(a.apply(c),h)).next(h=>i.Ur.removeMatchingKeysForTargetId(c,l.targetId).next(()=>i.Ur.addMatchingKeys(c,s,l.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(c,h.Ps,h.Is)).next(()=>h.Ps)))}async function CF(n,e,t=re()){const r=await Yo(n,bt(ay(e.bundledQuery))),i=$(n);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=Ze(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(Ge.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next(()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,r.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function lT(n,e){return`firestore_clients_${n}_${e}`}function uT(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function Up(n,e){return`firestore_targets_${n}_${e}`}class id{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new U(i.error.code,i.error.message))),o?new id(e,t,i.state,s):(Xe("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Pl{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new U(r.error.code,r.error.message))),s?new Pl(e,r.state,i):(Xe("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class sd{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=Z_();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=jC(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new sd(e,s):(Xe("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class my{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new my(t.clientId,t.onlineState):(Xe("SharedClientState",`Failed to parse online state: ${e}`),null)}}class _g{constructor(){this.activeTargetIds=Z_()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jp{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new qe(ne),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=lT(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new _g),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(lT(this.persistenceKey,r));if(i){const s=sd.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Up(this.persistenceKey,e));if(i){const s=Pl.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Up(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return j("SharedClientState","READ",e,t),t}setItem(e,t){j("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){j("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(j("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void Xe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=function(s){let o=qt.oe;if(s!=null)try{const a=JSON.parse(s);Q(typeof a=="number"),o=a}catch(a){Xe("SharedClientState","Failed to read sequence number from WebStorage",a)}return o}(t.newValue);r!==qt.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new id(this.currentUser,e,t,r),s=uT(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=uT(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=Up(this.persistenceKey,e),s=new Pl(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return sd.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return id.Rs(new ht(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return Pl.Rs(i,t)}Ls(e){return my.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);j("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||a.push(l)}),this.syncEngine.io(o,a).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=Z_();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class sk{constructor(){this.so=new _g,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new _g,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class RF{_o(e){}shutdown(){}}/**
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
 */class cT{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){j("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){j("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Uc=null;function Bp(){return Uc===null?Uc=function(){return 268435456+Math.round(2147483648*Math.random())}():Uc++,"0x"+Uc.toString(16)}/**
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
 */const kF={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class PF{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const Rt="WebChannelConnection";class xF extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=Bp(),l=this.xo(t,r.toUriEncodedString());j("RestConnection",`Sending RPC '${t}' ${a}:`,l,i);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,s,o),this.No(t,l,c,i).then(h=>(j("RestConnection",`Received RPC '${t}' ${a}: `,h),h),h=>{throw on("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",l,"request:",i),h})}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+pa}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,r){const i=kF[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=Bp();return new Promise((o,a)=>{const l=new CC;l.setWithCredentials(!0),l.listenOnce(RC.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case oh.NO_ERROR:const h=l.getResponseJson();j(Rt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case oh.TIMEOUT:j(Rt,`RPC '${e}' ${s} timed out`),a(new U(O.DEADLINE_EXCEEDED,"Request time out"));break;case oh.HTTP_ERROR:const d=l.getStatus();if(j(Rt,`RPC '${e}' ${s} failed with status:`,d,"response text:",l.getResponseText()),d>0){let p=l.getResponseJson();Array.isArray(p)&&(p=p[0]);const _=p==null?void 0:p.error;if(_&&_.status&&_.message){const I=function(x){const v=x.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(v)>=0?v:O.UNKNOWN}(_.status);a(new U(I,_.message))}else a(new U(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new U(O.UNAVAILABLE,"Connection failed."));break;default:K()}}finally{j(Rt,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(i);j(Rt,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",c,r,15)})}Bo(e,t,r){const i=Bp(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=xC(),a=PC(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const h=s.join("");j(Rt,`Creating RPC '${e}' stream ${i}: ${h}`,l);const d=o.createWebChannel(h,l);let p=!1,_=!1;const I=new PF({Io:x=>{_?j(Rt,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(p||(j(Rt,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),j(Rt,`RPC '${e}' stream ${i} sending:`,x),d.send(x))},To:()=>d.close()}),P=(x,v,E)=>{x.listen(v,A=>{try{E(A)}catch(V){setTimeout(()=>{throw V},0)}})};return P(d,hl.EventType.OPEN,()=>{_||(j(Rt,`RPC '${e}' stream ${i} transport opened.`),I.yo())}),P(d,hl.EventType.CLOSE,()=>{_||(_=!0,j(Rt,`RPC '${e}' stream ${i} transport closed`),I.So())}),P(d,hl.EventType.ERROR,x=>{_||(_=!0,on(Rt,`RPC '${e}' stream ${i} transport errored:`,x),I.So(new U(O.UNAVAILABLE,"The operation could not be completed")))}),P(d,hl.EventType.MESSAGE,x=>{var v;if(!_){const E=x.data[0];Q(!!E);const A=E,V=A.error||((v=A[0])===null||v===void 0?void 0:v.error);if(V){j(Rt,`RPC '${e}' stream ${i} received error:`,V);const F=V.status;let M=function(C){const k=et[C];if(k!==void 0)return TR(k)}(F),S=V.message;M===void 0&&(M=O.INTERNAL,S="Unknown error status: "+F+" with message "+V.message),_=!0,I.So(new U(M,S)),d.close()}else j(Rt,`RPC '${e}' stream ${i} received:`,E),I.bo(E)}}),P(a,kC.STAT_EVENT,x=>{x.stat===eg.PROXY?j(Rt,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===eg.NOPROXY&&j(Rt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{I.wo()},0),I}}/**
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
 */function ok(){return typeof window<"u"?window:null}function fh(){return typeof document<"u"?document:null}/**
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
 */function Mu(n){return new FM(n,!0)}/**
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
 */class gy{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&j("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class ak{constructor(e,t,r,i,s,o,a,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new gy(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(Xe(t.toString()),Xe("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new U(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return j("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(j("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class NF extends ak{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=BM(this.serializer,e),r=function(s){if(!("targetChange"in s))return J.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?J.min():o.readTime?Ze(o.readTime):J.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=dg(this.serializer),t.addTarget=function(s,o){let a;const l=o.target;if(a=Qh(l)?{documents:DR(s,l)}:{query:of(s,l)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=RR(s,o.resumeToken);const c=cg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(J.min())>0){a.readTime=Qo(s,o.snapshotVersion.toTimestamp());const c=cg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,e);const r=$M(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=dg(this.serializer),t.removeTarget=e,this.a_(t)}}class bF extends ak{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Q(!!e.streamToken),this.lastStreamToken=e.streamToken,Q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=zM(e.writeResults,e.commitTime),r=Ze(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=dg(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>hu(this.serializer,r))};this.a_(t)}}/**
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
 */class DF extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,hg(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(O.UNKNOWN,s.toString())})}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Lo(e,hg(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new U(O.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class VF{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
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
 */class OF{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{zi(this)&&(j("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=$(l);c.L_.add(4),await ya(c),c.q_.set("Unknown"),c.L_.delete(4),await Fu(c)}(this))})}),this.q_=new VF(r,i)}}async function Fu(n){if(zi(n))for(const e of n.B_)await e(!0)}async function ya(n){for(const e of n.B_)await e(!1)}function cf(n,e){const t=$(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),vy(t)?yy(t):wa(t).r_()&&_y(t,e))}function Xo(n,e){const t=$(n),r=wa(t);t.N_.delete(e),r.r_()&&lk(t,e),t.N_.size===0&&(r.r_()?r.o_():zi(t)&&t.q_.set("Unknown"))}function _y(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}wa(n).A_(e)}function lk(n,e){n.Q_.xe(e),wa(n).R_(e)}function yy(n){n.Q_=new VM({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),wa(n).start(),n.q_.v_()}function vy(n){return zi(n)&&!wa(n).n_()&&n.N_.size>0}function zi(n){return $(n).L_.size===0}function uk(n){n.Q_=void 0}async function LF(n){n.q_.set("Online")}async function MF(n){n.N_.forEach((e,t)=>{_y(n,e)})}async function FF(n,e){uk(n),vy(n)?(n.q_.M_(e),yy(n)):n.q_.set("Unknown")}async function UF(n,e,t){if(n.q_.set("Online"),e instanceof CR&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))}(n,e)}catch(r){j("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await od(n,r)}else if(e instanceof dh?n.Q_.Ke(e):e instanceof AR?n.Q_.He(e):n.Q_.We(e),!t.isEqual(J.min()))try{const r=await ek(n.localStore);t.compareTo(r)>=0&&await function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const h=s.N_.get(c);h&&s.N_.set(c,h.withResumeToken(l.resumeToken,o))}}),a.targetMismatches.forEach((l,c)=>{const h=s.N_.get(l);if(!h)return;s.N_.set(l,h.withResumeToken(Ge.EMPTY_BYTE_STRING,h.snapshotVersion)),lk(s,l);const d=new mr(h.target,l,c,h.sequenceNumber);_y(s,d)}),s.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(r){j("RemoteStore","Failed to raise snapshot:",r),await od(n,r)}}async function od(n,e,t){if(!ji(e))throw e;n.L_.add(1),await ya(n),n.q_.set("Offline"),t||(t=()=>ek(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Fu(n)})}function ck(n,e){return e().catch(t=>od(n,t,e))}async function va(n){const e=$(n),t=Ci(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;jF(e);)try{const i=await SF(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,BF(e,i)}catch(i){await od(e,i)}hk(e)&&dk(e)}function jF(n){return zi(n)&&n.O_.length<10}function BF(n,e){n.O_.push(e);const t=Ci(n);t.r_()&&t.V_&&t.m_(e.mutations)}function hk(n){return zi(n)&&!Ci(n).n_()&&n.O_.length>0}function dk(n){Ci(n).start()}async function zF(n){Ci(n).p_()}async function $F(n){const e=Ci(n);for(const t of n.O_)e.m_(t.mutations)}async function qF(n,e,t){const r=n.O_.shift(),i=ry.from(r,e,t);await ck(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await va(n)}async function GF(n,e){e&&Ci(n).V_&&await async function(r,i){if(function(o){return IR(o)&&o!==O.ABORTED}(i.code)){const s=r.O_.shift();Ci(r).s_(),await ck(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await va(r)}}(n,e),hk(n)&&dk(n)}async function hT(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),j("RemoteStore","RemoteStore received new credentials");const r=zi(t);t.L_.add(3),await ya(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Fu(t)}async function yg(n,e){const t=$(n);e?(t.L_.delete(2),await Fu(t)):e||(t.L_.add(2),await ya(t),t.q_.set("Unknown"))}function wa(n){return n.K_||(n.K_=function(t,r,i){const s=$(t);return s.w_(),new NF(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:LF.bind(null,n),Ro:MF.bind(null,n),mo:FF.bind(null,n),d_:UF.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),vy(n)?yy(n):n.q_.set("Unknown")):(await n.K_.stop(),uk(n))})),n.K_}function Ci(n){return n.U_||(n.U_=function(t,r,i){const s=$(t);return s.w_(),new bF(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:zF.bind(null,n),mo:GF.bind(null,n),f_:$F.bind(null,n),g_:qF.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await va(n)):(await n.U_.stop(),n.O_.length>0&&(j("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
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
 */class wy{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new mt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new wy(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ea(n,e){if(Xe("AsyncQueue",`${e}: ${n}`),ji(n))return new U(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class xo{constructor(e){this.comparator=e?(t,r)=>e(t,r)||W.comparator(t.key,r.key):(t,r)=>W.comparator(t.key,r.key),this.keyedMap=dl(),this.sortedSet=new qe(this.comparator)}static emptySet(e){return new xo(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof xo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new xo;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class dT{constructor(){this.W_=new qe(W.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):K():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class Zo{constructor(e,t,r,i,s,o,a,l,c){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new Zo(e,t,xo.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&bu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class WF{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class KF{constructor(){this.queries=fT(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=$(t),s=i.queries;i.queries=fT(),s.forEach((o,a)=>{for(const l of a.j_)l.onError(r)})})(this,new U(O.ABORTED,"Firestore shutting down"))}}function fT(){return new Dr(n=>aR(n),bu)}async function Ey(n,e){const t=$(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new WF,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=Ea(o,`Initialization of query '${ro(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Ty(t)}async function Iy(n,e){const t=$(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function HF(n,e){const t=$(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&Ty(t)}function QF(n,e,t){const r=$(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function Ty(n){n.Y_.forEach(e=>{e.next()})}var vg,pT;(pT=vg||(vg={})).ea="default",pT.Cache="cache";class Sy{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new Zo(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Zo.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==vg.Cache}}/**
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
 */class YF{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
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
 */class mT{constructor(e){this.serializer=e}Es(e){return Wn(this.serializer,e)}ds(e){return e.metadata.exists?bR(this.serializer,e.document,!1):be.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return Ze(e)}}class JF{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=fk(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=he.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new mT(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||re()).add(s);t.set(o,a)}}return t}async complete(){const e=await AF(this.localStore,new mT(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await CF(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function fk(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
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
 */class pk{constructor(e){this.key=e}}class mk{constructor(e){this.key=e}}class gk{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=re(),this.mutatedKeys=re(),this.Aa=uR(e),this.Ra=new xo(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new dT,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((h,d)=>{const p=i.get(h),_=Du(this.query,d)?d:null,I=!!p&&this.mutatedKeys.has(p.key),P=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let x=!1;p&&_?p.data.isEqual(_.data)?I!==P&&(r.track({type:3,doc:_}),x=!0):this.ga(p,_)||(r.track({type:2,doc:_}),x=!0,(l&&this.Aa(_,l)>0||c&&this.Aa(_,c)<0)&&(a=!0)):!p&&_?(r.track({type:0,doc:_}),x=!0):p&&!_&&(r.track({type:1,doc:p}),x=!0,(l||c)&&(a=!0)),x&&(_?(o=o.add(_),s=P?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,d)=>function(_,I){const P=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return K()}};return P(_)-P(I)}(h.type,d.type)||this.Aa(h.doc,d.doc)),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,c=l!==this.Ea;return this.Ea=l,o.length!==0||c?{snapshot:new Zo(this.query,e.Ra,s,o,e.mutatedKeys,l===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new dT,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=re(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new mk(r))}),this.da.forEach(r=>{e.has(r)||t.push(new pk(r))}),t}ba(e){this.Ta=e.Ts,this.da=re();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Zo.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class XF{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class ZF{constructor(e){this.key=e,this.va=!1}}class e2{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Dr(a=>aR(a),bu),this.Ma=new Map,this.xa=new Set,this.Oa=new qe(W.comparator),this.Na=new Map,this.La=new cy,this.Ba={},this.ka=new Map,this.qa=xs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function t2(n,e,t=!0){const r=hf(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await _k(r,e,t,!0),i}async function n2(n,e){const t=hf(n);await _k(t,e,!0,!1)}async function _k(n,e,t,r){const i=await Yo(n.localStore,bt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await Ay(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&cf(n.remoteStore,i),a}async function Ay(n,e,t,r,i){n.Ka=(d,p,_)=>async function(P,x,v,E){let A=x.view.ma(v);A.ns&&(A=await rd(P.localStore,x.query,!1).then(({documents:S})=>x.view.ma(S,A)));const V=E&&E.targetChanges.get(x.targetId),F=E&&E.targetMismatches.get(x.targetId)!=null,M=x.view.applyChanges(A,P.isPrimaryClient,V,F);return wg(P,x.targetId,M.wa),M.snapshot}(n,d,p,_);const s=await rd(n.localStore,e,!0),o=new gk(e,s.Ts),a=o.ma(s.documents),l=Lu.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),c=o.applyChanges(a,n.isPrimaryClient,l);wg(n,t,c.wa);const h=new XF(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),c.snapshot}async function r2(n,e,t){const r=$(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!bu(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Jo(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Xo(r.remoteStore,i.targetId),ea(r,i.targetId)}).catch(Ui)):(ea(r,i.targetId),await Jo(r.localStore,i.targetId,!0))}async function i2(n,e){const t=$(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Xo(t.remoteStore,r.targetId))}async function s2(n,e,t){const r=Py(n);try{const i=await function(o,a){const l=$(o),c=Fe.now(),h=a.reduce((_,I)=>_.add(I.key),re());let d,p;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let I=Wt(),P=re();return l.cs.getEntries(_,h).next(x=>{I=x,I.forEach((v,E)=>{E.isValidDocument()||(P=P.add(v))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,I)).next(x=>{d=x;const v=[];for(const E of a){const A=NM(E,d.get(E.key).overlayedDocument);A!=null&&v.push(new Vr(E.key,A,YC(A.value.mapValue),Me.exists(!0)))}return l.mutationQueue.addMutationBatch(_,c,v,a)}).next(x=>{p=x;const v=x.applyToLocalDocumentSet(d,P);return l.documentOverlayCache.saveOverlays(_,x.batchId,v)})}).then(()=>({batchId:p.batchId,changes:hR(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,l){let c=o.Ba[o.currentUser.toKey()];c||(c=new qe(ne)),c=c.insert(a,l),o.Ba[o.currentUser.toKey()]=c}(r,i.batchId,t),await Or(r,i.changes),await va(r.remoteStore)}catch(i){const s=Ea(i,"Failed to persist write");t.reject(s)}}async function yk(n,e){const t=$(n);try{const r=await TF(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(Q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?Q(o.va):i.removedDocuments.size>0&&(Q(o.va),o.va=!1))}),await Or(t,r,e)}catch(r){await Ui(r)}}function gT(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const l=$(o);l.onlineState=a;let c=!1;l.queries.forEach((h,d)=>{for(const p of d.j_)p.Z_(a)&&(c=!0)}),c&&Ty(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function o2(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new qe(W.comparator);o=o.insert(s,be.newNoDocument(s,J.min()));const a=re().add(s),l=new Ou(J.min(),new Map,new qe(ne),o,a);await yk(r,l),r.Oa=r.Oa.remove(s),r.Na.delete(e),ky(r)}else await Jo(r.localStore,e,!1).then(()=>ea(r,e,t)).catch(Ui)}async function a2(n,e){const t=$(n),r=e.batch.batchId;try{const i=await IF(t.localStore,e);Ry(t,r,null),Cy(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Or(t,i)}catch(i){await Ui(i)}}async function l2(n,e,t){const r=$(n);try{const i=await function(o,a){const l=$(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return l.mutationQueue.lookupMutationBatch(c,a).next(d=>(Q(d!==null),h=d.keys(),l.mutationQueue.removeMutationBatch(c,d))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,h,a)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>l.localDocuments.getDocuments(c,h))})}(r.localStore,e);Ry(r,e,t),Cy(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Or(r,i)}catch(i){await Ui(i)}}async function u2(n,e){const t=$(n);zi(t.remoteStore)||j("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const a=$(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>a.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=Ea(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function Cy(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Ry(n,e,t){const r=$(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function ea(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||vk(n,r)})}function vk(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(Xo(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),ky(n))}function wg(n,e,t){for(const r of t)r instanceof pk?(n.La.addReference(r.key,e),c2(n,r)):r instanceof mk?(j("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||vk(n,r.key)):K()}function c2(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(j("SyncEngine","New document in limbo: "+t),n.xa.add(r),ky(n))}function ky(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new W(he.fromString(e)),r=n.qa.next();n.Na.set(r,new ZF(t)),n.Oa=n.Oa.insert(t,r),cf(n.remoteStore,new mr(bt(ma(t.path)),r,"TargetPurposeLimboResolution",qt.oe))}}async function Or(n,e,t){const r=$(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((a,l)=>{o.push(r.Ka(l,e,t).then(c=>{var h;if((c||t)&&r.isPrimaryClient){const d=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(l.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(c){i.push(c);const d=py.Wi(l.targetId,c);s.push(d)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(l,c){const h=$(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>b.forEach(c,p=>b.forEach(p.$i,_=>h.persistence.referenceDelegate.addReference(d,p.targetId,_)).next(()=>b.forEach(p.Ui,_=>h.persistence.referenceDelegate.removeReference(d,p.targetId,_)))))}catch(d){if(!ji(d))throw d;j("LocalStore","Failed to update sequence numbers: "+d)}for(const d of c){const p=d.targetId;if(!d.fromCache){const _=h.os.get(p),I=_.snapshotVersion,P=_.withLastLimboFreeSnapshotVersion(I);h.os=h.os.insert(p,P)}}}(r.localStore,s))}async function h2(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){j("SyncEngine","User change. New user:",e.toKey());const r=await ZR(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(a=>{a.forEach(l=>{l.reject(new U(O.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Or(t,r.hs)}}function d2(n,e){const t=$(n),r=t.Na.get(e);if(r&&r.va)return re().add(r.key);{let i=re();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function f2(n,e){const t=$(n),r=await rd(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&wg(t,e.targetId,i.wa),i}async function p2(n,e){const t=$(n);return rk(t.localStore,e).then(r=>Or(t,r))}async function m2(n,e,t,r){const i=$(n),s=await function(a,l){const c=$(a),h=$(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",d=>h.Mn(d,l).next(p=>p?c.localDocuments.getDocuments(d,p):b.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await va(i.remoteStore):t==="acknowledged"||t==="rejected"?(Ry(i,e,r||null),Cy(i,e),function(a,l){$($(a).mutationQueue).On(l)}(i.localStore,e)):K(),await Or(i,s)):j("SyncEngine","Cannot apply mutation batch with id: "+e)}async function g2(n,e){const t=$(n);if(hf(t),Py(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await _T(t,r.toArray());t.Qa=!0,await yg(t.remoteStore,!0);for(const s of i)cf(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(ea(t,o),Jo(t.localStore,o,!0))),Xo(t.remoteStore,o)}),await i,await _T(t,r),function(o){const a=$(o);a.Na.forEach((l,c)=>{Xo(a.remoteStore,c)}),a.La.pr(),a.Na=new Map,a.Oa=new qe(W.comparator)}(t),t.Qa=!1,await yg(t.remoteStore,!1)}}async function _T(n,e,t){const r=$(n),i=[],s=[];for(const o of e){let a;const l=r.Ma.get(o);if(l&&l.length!==0){a=await Yo(r.localStore,bt(l[0]));for(const c of l){const h=r.Fa.get(c),d=await f2(r,h);d.snapshot&&s.push(d.snapshot)}}else{const c=await nk(r.localStore,o);a=await Yo(r.localStore,c),await Ay(r,wk(c),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function wk(n){return iR(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function _2(n){return function(t){return $($(t).persistence).Qi()}($(n).localStore)}async function y2(n,e,t,r){const i=$(n);if(i.Qa)return void j("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await rk(i.localStore,lR(s[0])),a=Ou.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ge.EMPTY_BYTE_STRING);await Or(i,o,a);break}case"rejected":await Jo(i.localStore,e,!0),ea(i,e,r);break;default:K()}}async function v2(n,e,t){const r=hf(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){j("SyncEngine","Adding an already active target "+i);continue}const s=await nk(r.localStore,i),o=await Yo(r.localStore,s);await Ay(r,wk(s),o.targetId,!1,o.resumeToken),cf(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await Jo(r.localStore,i,!1).then(()=>{Xo(r.remoteStore,i),ea(r,i)}).catch(Ui)}}function hf(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=yk.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=d2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=o2.bind(null,e),e.Ca.d_=HF.bind(null,e.eventManager),e.Ca.$a=QF.bind(null,e.eventManager),e}function Py(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=a2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=l2.bind(null,e),e}function w2(n,e,t){const r=$(n);(async function(s,o,a){try{const l=await o.getMetadata();if(await function(_,I){const P=$(_),x=Ze(I.createTime);return P.persistence.runTransaction("hasNewerBundle","readonly",v=>P.Gr.getBundleMetadata(v,I.id)).then(v=>!!v&&v.createTime.compareTo(x)>=0)}(s.localStore,l))return await o.close(),a._completeWith(function(_){return{taskState:"Success",documentsLoaded:_.totalDocuments,bytesLoaded:_.totalBytes,totalDocuments:_.totalDocuments,totalBytes:_.totalBytes}}(l)),Promise.resolve(new Set);a._updateProgress(fk(l));const c=new JF(l,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const p=await c.la(h);p&&a._updateProgress(p),h=await o.Ua()}const d=await c.complete();return await Or(s,d.Ia,void 0),await function(_,I){const P=$(_);return P.persistence.runTransaction("Save bundle","readwrite",x=>P.Gr.saveBundleMetadata(x,I))}(s.localStore,l),a._completeWith(d.progress),Promise.resolve(d.Pa)}catch(l){return on("SyncEngine",`Loading bundle failed with ${l}`),a._failWith(l),Promise.resolve(new Set)}})(r,e,t).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class Ri{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Mu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return XR(this.persistence,new JR,e.initialUser,this.serializer)}Ga(e){return new hy(uf.Zr,this.serializer)}Wa(e){return new sk}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ri.provider={build:()=>new Ri};class E2 extends Ri{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){Q(this.persistence.referenceDelegate instanceof nd);const r=this.persistence.referenceDelegate.garbageCollector;return new WR(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new hy(r=>nd.Zr(r,t),this.serializer)}}class xy extends Ri{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Py(this.Ja.syncEngine),await va(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return XR(this.persistence,new JR,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new WR(r,e.asyncQueue,t)}Ha(e,t){const r=new zL(t,this.persistence);return new BL(e.asyncQueue,r)}Ga(e){const t=fy(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?kt.withCacheSize(this.cacheSizeBytes):kt.DEFAULT;return new dy(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,ok(),fh(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new sk}}class Ek extends xy{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof jp&&(this.sharedClientState.syncEngine={no:m2.bind(null,t),ro:y2.bind(null,t),io:v2.bind(null,t),Qi:_2.bind(null,t),eo:p2.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await g2(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const t=ok();if(!jp.D(t))throw new U(O.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=fy(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new jp(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class ki{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>gT(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=h2.bind(null,this.syncEngine),await yg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new KF}()}createDatastore(e){const t=Mu(e.databaseInfo.databaseId),r=function(s){return new xF(s)}(e.databaseInfo);return function(s,o,a,l){return new DF(s,o,a,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,a){return new OF(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>gT(this.syncEngine,t,0),function(){return cT.D()?new cT:new RF}())}createSyncEngine(e,t){return function(i,s,o,a,l,c,h){const d=new e2(i,s,o,a,l,c);return h&&(d.Qa=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=$(i);j("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await ya(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ki.provider={build:()=>new ki};function yT(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class df{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Xe("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class I2{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new mt,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))},r=>this.metadata.reject(r))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new YF(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
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
 */class T2{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new U(O.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=$(i),a={documents:s.map(d=>cu(o.serializer,d))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,he.emptyPath(),a,s.length),c=new Map;l.forEach(d=>{const p=jM(o.serializer,d);c.set(p.key.toString(),p)});const h=[];return s.forEach(d=>{const p=c.get(d.toString());Q(!!p),h.push(p)}),h}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new _a(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const i=W.fromPath(r);this.mutations.push(new ty(i,this.precondition(i)))}),await async function(r,i){const s=$(r),o={writes:i.map(a=>hu(s.serializer,a))};await s.Mo("Commit",s.serializer.databaseId,he.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw K();t=J.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new U(O.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(J.min())?Me.exists(!1):Me.updateTime(t):Me.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(J.min()))throw new U(O.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Me.updateTime(t)}return Me.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class S2{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new gy(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new T2(this.datastore),t=this.cu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.lu(i)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const t=this.updateFunction(e);return!xu(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!IR(t)}return!1}}/**
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
 */class A2{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=ht.UNAUTHENTICATED,this.clientId=K_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{j("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(j("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new mt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ea(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function zp(n,e){n.asyncQueue.verifyOperationInProgress(),j("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await ZR(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function vT(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Ny(n);j("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>hT(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>hT(e.remoteStore,i)),n._onlineComponents=e}async function Ny(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j("FirestoreClient","Using user provided OfflineComponentProvider");try{await zp(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;on("Error using user provided cache. Falling back to memory cache: "+t),await zp(n,new Ri)}}else j("FirestoreClient","Using default OfflineComponentProvider"),await zp(n,new Ri);return n._offlineComponents}async function ff(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j("FirestoreClient","Using user provided OnlineComponentProvider"),await vT(n,n._uninitializedComponentsProvider._online)):(j("FirestoreClient","Using default OnlineComponentProvider"),await vT(n,new ki))),n._onlineComponents}function Ik(n){return Ny(n).then(e=>e.persistence)}function Ia(n){return Ny(n).then(e=>e.localStore)}function Tk(n){return ff(n).then(e=>e.remoteStore)}function by(n){return ff(n).then(e=>e.syncEngine)}function Sk(n){return ff(n).then(e=>e.datastore)}async function ta(n){const e=await ff(n),t=e.eventManager;return t.onListen=t2.bind(null,e.syncEngine),t.onUnlisten=r2.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=n2.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=i2.bind(null,e.syncEngine),t}function C2(n){return n.asyncQueue.enqueue(async()=>{const e=await Ik(n),t=await Tk(n);return e.setNetworkEnabled(!0),function(i){const s=$(i);return s.L_.delete(0),Fu(s)}(t)})}function R2(n){return n.asyncQueue.enqueue(async()=>{const e=await Ik(n),t=await Tk(n);return e.setNetworkEnabled(!1),async function(i){const s=$(i);s.L_.add(0),await ya(s),s.q_.set("Offline")}(t)})}function k2(n,e){const t=new mt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await function(c,h){const d=$(c);return d.persistence.runTransaction("read document","readonly",p=>d.localDocuments.getDocument(p,h))}(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new U(O.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const l=Ea(a,`Failed to get document '${s} from cache`);o.reject(l)}}(await Ia(n),e,t)),t.promise}function Ak(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new df({next:p=>{h.Za(),o.enqueueAndForget(()=>Iy(s,d));const _=p.docs.has(a);!_&&p.fromCache?c.reject(new U(O.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&p.fromCache&&l&&l.source==="server"?c.reject(new U(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new Sy(ma(a.path),h,{includeMetadataChanges:!0,_a:!0});return Ey(s,d)}(await ta(n),n.asyncQueue,e,t,r)),r.promise}function P2(n,e){const t=new mt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await rd(i,s,!0),l=new gk(s,a.Ts),c=l.ma(a.documents),h=l.applyChanges(c,!1);o.resolve(h.snapshot)}catch(a){const l=Ea(a,`Failed to execute query '${s} against cache`);o.reject(l)}}(await Ia(n),e,t)),t.promise}function Ck(n,e,t={}){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new df({next:p=>{h.Za(),o.enqueueAndForget(()=>Iy(s,d)),p.fromCache&&l.source==="server"?c.reject(new U(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new Sy(a,h,{includeMetadataChanges:!0,_a:!0});return Ey(s,d)}(await ta(n),n.asyncQueue,e,t,r)),r.promise}function x2(n,e,t){const r=new mt;return n.asyncQueue.enqueueAndForget(async()=>{try{const i=await Sk(n);r.resolve(async function(o,a,l){var c;const h=$(o),{request:d,ut:p,parent:_}=VR(h.serializer,sR(a),l);h.connection.Fo||delete d.parent;const I=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,_,d,1)).filter(x=>!!x.result);Q(I.length===1);const P=(c=I[0].result)===null||c===void 0?void 0:c.aggregateFields;return Object.keys(P).reduce((x,v)=>(x[p[v]]=P[v],x),{})}(i,e,t))}catch(i){r.reject(i)}}),r.promise}function N2(n,e){const t=new df(e);return n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.add(s),s.next()}(await ta(n),t)),()=>{t.Za(),n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.delete(s)}(await ta(n),t))}}function b2(n,e,t,r){const i=function(o,a){let l;return l=typeof o=="string"?SR().encode(o):o,function(h,d){return new I2(h,d)}(function(h,d){if(h instanceof Uint8Array)return yT(h,d);if(h instanceof ArrayBuffer)return yT(new Uint8Array(h),d);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),a)}(t,Mu(e));n.asyncQueue.enqueueAndForget(async()=>{w2(await by(n),i,r)})}function D2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){const s=$(r);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await Ia(n),e))}function V2(n,e){return n.asyncQueue.enqueue(async()=>async function(r,i){const s=$(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",l=>o.getFieldIndexes(l).next(c=>function(d,p,_,I,P){d=[...d],p=[...p],d.sort(_),p.sort(_);const x=d.length,v=p.length;let E=0,A=0;for(;E<v&&A<x;){const V=_(d[A],p[E]);V<0?P(d[A++]):V>0?I(p[E++]):(E++,A++)}for(;E<v;)I(p[E++]);for(;A<x;)P(d[A++])}(c,i,ML,h=>{a.push(o.addFieldIndex(l,h))},h=>{a.push(o.deleteFieldIndex(l,h))})).next(()=>b.waitFor(a)))}(await Ia(n),e))}function O2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){$(r).ss.zi=i}(await Ia(n),e))}function L2(n){return n.asyncQueue.enqueue(async()=>function(t){const r=$(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await Ia(n)))}/**
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
 */function Rk(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const wT=new Map;/**
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
 */function Dy(n,e,t){if(!t)throw new U(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function kk(n,e,t,r){if(e===!0&&r===!0)throw new U(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function ET(n){if(!W.isDocumentKey(n))throw new U(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function IT(n){if(W.isDocumentKey(n))throw new U(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function pf(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":K()}function oe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=pf(n);throw new U(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Pk(n,e){if(e<=0)throw new U(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */class TT{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new U(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}kk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Rk((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new U(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Uu{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new TT({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new TT(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bC;switch(r.type){case"firstParty":return new bL(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new U(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=wT.get(t);r&&(j("ComponentProvider","Removing Datastore"),wT.delete(t),r.terminate())}(this),Promise.resolve()}}function xk(n,e,t,r={}){var i;const s=(n=oe(n,Uu))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&on("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,l;if(typeof r.mockUserToken=="string")a=r.mockUserToken,l=ht.MOCK_USER;else{a=N_(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new U(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new ht(c)}n._authCredentials=new PL(new NC(a,l))}}/**
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
 */class gt{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new gt(this.firestore,e,this._query)}}class Qe{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Nn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Qe(this.firestore,e,this._key)}}class Nn extends gt{constructor(e,t,r){super(e,t,ma(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Qe(this.firestore,null,new W(e))}withConverter(e){return new Nn(this.firestore,e,this._path)}}function mf(n,e,...t){if(n=me(n),Dy("collection","path",e),n instanceof Uu){const r=he.fromString(e,...t);return IT(r),new Nn(n,null,r)}{if(!(n instanceof Qe||n instanceof Nn))throw new U(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return IT(r),new Nn(n.firestore,null,r)}}function M2(n,e){if(n=oe(n,Uu),Dy("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new U(O.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new gt(n,null,function(r){return new br(he.emptyPath(),r)}(e))}function Bs(n,e,...t){if(n=me(n),arguments.length===1&&(e=K_.newId()),Dy("doc","path",e),n instanceof Uu){const r=he.fromString(e,...t);return ET(r),new Qe(n,null,new W(r))}{if(!(n instanceof Qe||n instanceof Nn))throw new U(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(he.fromString(e,...t));return ET(r),new Qe(n.firestore,n instanceof Nn?n.converter:null,new W(r))}}function F2(n,e){return n=me(n),e=me(e),(n instanceof Qe||n instanceof Nn)&&(e instanceof Qe||e instanceof Nn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Vy(n,e){return n=me(n),e=me(e),n instanceof gt&&e instanceof gt&&n.firestore===e.firestore&&bu(n._query,e._query)&&n.converter===e.converter}/**
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
 */class ST{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new gy(this,"async_queue_retry"),this.Vu=()=>{const r=fh();r&&j("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=fh();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=fh();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new mt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ji(e))throw e;j("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw Xe("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=wy.createAndSchedule(this,e,t,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&K()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Eg(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class Nk{constructor(){this._progressObserver={},this._taskCompletionResolver=new mt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const U2=-1;class Ie extends Uu{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new ST,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ST(e),this._firestoreClient=void 0,await e}}}function j2(n,e,t){t||(t="(default)");const r=Fs(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(vi(s,e))return i;throw new U(O.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(O.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function bk(n,e){const t=typeof n=="object"?n:Hd(),r=typeof n=="string"?n:e||"(default)",i=Fs(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=x_("firestore");s&&xk(i,...s)}return i}function Ue(n){if(n._terminated)throw new U(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Dk(n),n._firestoreClient}function Dk(n){var e,t,r;const i=n._freezeSettings(),s=function(a,l,c,h){return new cM(a,l,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Rk(h.experimentalLongPollingOptions),h.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new A2(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(a){const l=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(l),_online:l}}(n._componentsProvider))}function B2(n,e){on("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return Vk(n,ki.provider,{build:r=>new xy(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function z2(n){on("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();Vk(n,ki.provider,{build:t=>new Ek(t,e.cacheSizeBytes)})}function Vk(n,e,t){if((n=oe(n,Ie))._firestoreClient||n._terminated)throw new U(O.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new U(O.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},Dk(n)}function $2(n){if(n._initialized&&!n._terminated)throw new U(O.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new mt;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Gn.D())return Promise.resolve();const i=r+"main";await Gn.delete(i)}(fy(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function q2(n){return function(t){const r=new mt;return t.asyncQueue.enqueueAndForget(async()=>u2(await by(t),r)),r.promise}(Ue(n=oe(n,Ie)))}function G2(n){return C2(Ue(n=oe(n,Ie)))}function W2(n){return R2(Ue(n=oe(n,Ie)))}function K2(n){return rV(n.app,"firestore",n._databaseId.database),n._delete()}function H2(n,e){const t=Ue(n=oe(n,Ie)),r=new Nk;return b2(t,n._databaseId,e,r),r}function Q2(n,e){return D2(Ue(n=oe(n,Ie)),e).then(t=>t?new gt(n,null,t.query):null)}/**
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
 */class na{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class Ok{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class Pi{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Pi(Ge.fromBase64String(e))}catch(t){throw new U(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Pi(Ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class $i{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function Y2(){return new $i("__name__")}/**
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
 */class qi{constructor(e){this._methodName=e}}/**
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
 */class gf{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}}/**
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
 */class ju{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
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
 */const J2=/^__.*__$/;class X2{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Vr(e,this.data,this.fieldMask,t,this.fieldTransforms):new ga(e,this.data,t,this.fieldTransforms)}}class Lk{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Vr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Mk(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw K()}}class _f{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new _f(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return ad(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Mk(this.Cu)&&J2.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Z2{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Mu(e)}Qu(e,t,r,i=!1){return new _f({Cu:e,methodName:t,qu:r,path:De.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function zs(n){const e=n._freezeSettings(),t=Mu(n._databaseId);return new Z2(n._databaseId,!!e.ignoreUndefinedProperties,t)}function yf(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);By("Data must be an object, but it was:",o,r);const a=jk(r,o);let l,c;if(s.merge)l=new Gt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const d of s.mergeFields){const p=du(e,d,t);if(!o.contains(p))throw new U(O.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);zk(h,p)||h.push(p)}l=new Gt(h),c=o.fieldTransforms.filter(d=>l.covers(d.field))}else l=null,c=o.fieldTransforms;return new X2(new vt(a),l,c)}class Bu extends qi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Bu}}function Fk(n,e,t){return new _f({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Oy extends qi{_toFieldTransform(e){return new Vu(e.path,new Ko)}isEqual(e){return e instanceof Oy}}class Ly extends qi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Fk(this,e,!0),r=this.Ku.map(s=>$s(s,t)),i=new Cs(r);return new Vu(e.path,i)}isEqual(e){return e instanceof Ly&&vi(this.Ku,e.Ku)}}class My extends qi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Fk(this,e,!0),r=this.Ku.map(s=>$s(s,t)),i=new Rs(r);return new Vu(e.path,i)}isEqual(e){return e instanceof My&&vi(this.Ku,e.Ku)}}class Fy extends qi{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Ho(e.serializer,pR(e.serializer,this.$u));return new Vu(e.path,t)}isEqual(e){return e instanceof Fy&&this.$u===e.$u}}function Uy(n,e,t,r){const i=n.Qu(1,e,t);By("Data must be an object, but it was:",i,r);const s=[],o=vt.empty();Bi(r,(l,c)=>{const h=vf(e,l,t);c=me(c);const d=i.Nu(h);if(c instanceof Bu)s.push(h);else{const p=$s(c,d);p!=null&&(s.push(h),o.set(h,p))}});const a=new Gt(s);return new Lk(o,a,i.fieldTransforms)}function jy(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[du(e,r,t)],l=[i];if(s.length%2!=0)throw new U(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)a.push(du(e,s[p])),l.push(s[p+1]);const c=[],h=vt.empty();for(let p=a.length-1;p>=0;--p)if(!zk(c,a[p])){const _=a[p];let I=l[p];I=me(I);const P=o.Nu(_);if(I instanceof Bu)c.push(_);else{const x=$s(I,P);x!=null&&(c.push(_),h.set(_,x))}}const d=new Gt(c);return new Lk(h,d,o.fieldTransforms)}function Uk(n,e,t,r=!1){return $s(t,n.Qu(r?4:3,e))}function $s(n,e){if(Bk(n=me(n)))return By("Unsupported field value:",e,n),jk(n,e);if(n instanceof qi)return function(r,i){if(!Mk(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const a of r){let l=$s(a,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return pR(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Fe.fromDate(r);return{timestampValue:Qo(i.serializer,s)}}if(r instanceof Fe){const s=new Fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Qo(i.serializer,s)}}if(r instanceof gf)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Pi)return{bytesValue:RR(i.serializer,r._byteString)};if(r instanceof Qe){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:oy(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof ju)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw a.Bu("VectorValues must only contain numeric values.");return ey(a.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${pf(r)}`)}(n,e)}function jk(n,e){const t={};return WC(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Bi(n,(r,i)=>{const s=$s(i,e.Mu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Bk(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Fe||n instanceof gf||n instanceof Pi||n instanceof Qe||n instanceof qi||n instanceof ju)}function By(n,e,t){if(!Bk(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=pf(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function du(n,e,t){if((e=me(e))instanceof $i)return e._internalPath;if(typeof e=="string")return vf(n,e);throw ad("Field path arguments must be of type string or ",n,!1,void 0,t)}const eU=new RegExp("[~\\*/\\[\\]]");function vf(n,e,t){if(e.search(eU)>=0)throw ad(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new $i(...e.split("."))._internalPath}catch{throw ad(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function ad(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new U(O.INVALID_ARGUMENT,a+n+l)}function zk(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class fu{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Qe(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tU(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(wf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class tU extends fu{data(){return super.data()}}function wf(n,e){return typeof e=="string"?vf(n,e):e instanceof $i?e._internalPath:e._delegate._internalPath}/**
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
 */function $k(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new U(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class zy{}class Ta extends zy{}function $y(n,e,...t){let r=[];e instanceof zy&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof qs).length,a=s.filter(l=>l instanceof Sa).length;if(o>1||o>0&&a>0)throw new U(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Sa extends Ta{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Sa(e,t,r)}_apply(e){const t=this._parse(e);return Gk(e._query,t),new gt(e.firestore,e.converter,ug(e._query,t))}_parse(e){const t=zs(e.firestore);return function(s,o,a,l,c,h,d){let p;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new U(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){CT(d,h);const _=[];for(const I of d)_.push(AT(l,s,I));p={arrayValue:{values:_}}}else p=AT(l,s,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||CT(d,h),p=Uk(a,o,d,h==="in"||h==="not-in");return de.create(c,h,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function nU(n,e,t){const r=e,i=wf("where",n);return Sa._create(i,r,t)}class qs extends zy{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new qs(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ve.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const a=s.getFlattenedFilters();for(const l of a)Gk(o,l),o=ug(o,l)}(e._query,t),new gt(e.firestore,e.converter,ug(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function rU(...n){return n.forEach(e=>Wk("or",e)),qs._create("or",n)}function iU(...n){return n.forEach(e=>Wk("and",e)),qs._create("and",n)}class Ef extends Ta{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Ef(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new U(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new uu(s,o)}(e._query,this._field,this._direction);return new gt(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new br(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function sU(n,e="asc"){const t=e,r=wf("orderBy",n);return Ef._create(r,t)}class zu extends Ta{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new zu(e,t,r)}_apply(e){return new gt(e.firestore,e.converter,Jh(e._query,this._limit,this._limitType))}}function qy(n){return Pk("limit",n),zu._create("limit",n,"F")}function oU(n){return Pk("limitToLast",n),zu._create("limitToLast",n,"L")}class $u extends Ta{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new $u(e,t,r)}_apply(e){const t=qk(e,this.type,this._docOrFields,this._inclusive);return new gt(e.firestore,e.converter,function(i,s){return new br(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function aU(...n){return $u._create("startAt",n,!0)}function lU(...n){return $u._create("startAfter",n,!1)}class qu extends Ta{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new qu(e,t,r)}_apply(e){const t=qk(e,this.type,this._docOrFields,this._inclusive);return new gt(e.firestore,e.converter,function(i,s){return new br(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function uU(...n){return qu._create("endBefore",n,!1)}function cU(...n){return qu._create("endAt",n,!0)}function qk(n,e,t,r){if(t[0]=me(t[0]),t[0]instanceof fu)return function(s,o,a,l,c){if(!l)throw new U(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const d of Po(s))if(d.field.isKeyField())h.push(Ss(o,l.key));else{const p=l.data.field(d.field);if(ef(p))throw new U(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+d.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const _=d.field.canonicalString();throw new U(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}h.push(p)}return new Ai(h,c)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=zs(n.firestore);return function(o,a,l,c,h,d){const p=o.explicitOrderBy;if(h.length>p.length)throw new U(O.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let I=0;I<h.length;I++){const P=h[I];if(p[I].field.isKeyField()){if(typeof P!="string")throw new U(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof P}`);if(!X_(o)&&P.indexOf("/")!==-1)throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${P}' contains a slash.`);const x=o.path.child(he.fromString(P));if(!W.isDocumentKey(x))throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${x}' is not because it contains an odd number of segments.`);const v=new W(x);_.push(Ss(a,v))}else{const x=Uk(l,c,P);_.push(x)}}return new Ai(_,d)}(n._query,n.firestore._databaseId,i,e,t,r)}}function AT(n,e,t){if(typeof(t=me(t))=="string"){if(t==="")throw new U(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!X_(e)&&t.indexOf("/")!==-1)throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(he.fromString(t));if(!W.isDocumentKey(r))throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ss(n,new W(r))}if(t instanceof Qe)return Ss(n,t._key);throw new U(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${pf(t)}.`)}function CT(n,e){if(!Array.isArray(n)||n.length===0)throw new U(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Gk(n,e){const t=function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new U(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Wk(n,e){if(!(e instanceof Sa||e instanceof qs))throw new U(O.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Gy{convertValue(e,t="none"){switch(Ti(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Rr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw K()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Bi(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Oe(o.doubleValue));return new ju(s)}convertGeoPoint(e){return new gf(Oe(e.latitude),Oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=tf(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ou(e));default:return null}}convertTimestamp(e){const t=Cr(e);return new Fe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=he.fromString(e);Q(FR(r));const i=new Ii(r.get(1),r.get(3)),s=new W(r.popFirst(5));return i.isEqual(t)||Xe(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function If(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class hU extends Gy{constructor(e){super(),this.firestore=e}convertBytes(e){return new Pi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qe(this.firestore,null,t)}}/**
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
 */function dU(n){return new na("sum",du("sum",n))}function fU(n){return new na("avg",du("average",n))}function Kk(){return new na("count")}function pU(n,e){var t,r;return n instanceof na&&e instanceof na&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function mU(n,e){return Vy(n.query,e.query)&&vi(n.data(),e.data())}/**
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
 */class ni{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Ns extends fu{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new xl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(wf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class xl extends Ns{data(e={}){return super.data(e)}}class bs{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new ni(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new xl(this._firestore,this._userDataWriter,r.key,r,new ni(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const l=new xl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new ni(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const l=new xl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new ni(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,h=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:gU(a.type),doc:l,oldIndex:c,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function gU(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return K()}}function _U(n,e){return n instanceof Ns&&e instanceof Ns?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof bs&&e instanceof bs&&n._firestore===e._firestore&&Vy(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */function Wy(n){n=oe(n,Qe);const e=oe(n.firestore,Ie);return Ak(Ue(e),n._key).then(t=>Hy(e,n,t))}class Gi extends Gy{constructor(e){super(),this.firestore=e}convertBytes(e){return new Pi(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Qe(this.firestore,null,t)}}function yU(n){n=oe(n,Qe);const e=oe(n.firestore,Ie),t=Ue(e),r=new Gi(e);return k2(t,n._key).then(i=>new Ns(e,r,n._key,i,new ni(i!==null&&i.hasLocalMutations,!0),n.converter))}function vU(n){n=oe(n,Qe);const e=oe(n.firestore,Ie);return Ak(Ue(e),n._key,{source:"server"}).then(t=>Hy(e,n,t))}function Ky(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new Gi(e);return $k(n._query),Ck(t,n._query).then(i=>new bs(e,r,n,i))}function wU(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new Gi(e);return P2(t,n._query).then(i=>new bs(e,r,n,i))}function EU(n){n=oe(n,gt);const e=oe(n.firestore,Ie),t=Ue(e),r=new Gi(e);return Ck(t,n._query,{source:"server"}).then(i=>new bs(e,r,n,i))}function IU(n,e,t){n=oe(n,Qe);const r=oe(n.firestore,Ie),i=If(n.converter,e,t);return Aa(r,[yf(zs(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Me.none())])}function TU(n,e,t,...r){n=oe(n,Qe);const i=oe(n.firestore,Ie),s=zs(i);let o;return o=typeof(e=me(e))=="string"||e instanceof $i?jy(s,"updateDoc",n._key,e,t,r):Uy(s,"updateDoc",n._key,e),Aa(i,[o.toMutation(n._key,Me.exists(!0))])}function Ig(n){return Aa(oe(n.firestore,Ie),[new _a(n._key,Me.none())])}function SU(n,e){const t=oe(n.firestore,Ie),r=Bs(n),i=If(n.converter,e);return Aa(t,[yf(zs(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Me.exists(!1))]).then(()=>r)}function AU(n,...e){var t,r,i;n=me(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Eg(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Eg(e[o])){const d=e[o];e[o]=(t=d.next)===null||t===void 0?void 0:t.bind(d),e[o+1]=(r=d.error)===null||r===void 0?void 0:r.bind(d),e[o+2]=(i=d.complete)===null||i===void 0?void 0:i.bind(d)}let l,c,h;if(n instanceof Qe)c=oe(n.firestore,Ie),h=ma(n._key.path),l={next:d=>{e[o]&&e[o](Hy(c,n,d))},error:e[o+1],complete:e[o+2]};else{const d=oe(n,gt);c=oe(d.firestore,Ie),h=d._query;const p=new Gi(c);l={next:_=>{e[o]&&e[o](new bs(c,p,d,_))},error:e[o+1],complete:e[o+2]},$k(n._query)}return function(p,_,I,P){const x=new df(P),v=new Sy(_,x,I);return p.asyncQueue.enqueueAndForget(async()=>Ey(await ta(p),v)),()=>{x.Za(),p.asyncQueue.enqueueAndForget(async()=>Iy(await ta(p),v))}}(Ue(c),h,a,l)}function CU(n,e){return N2(Ue(n=oe(n,Ie)),Eg(e)?e:{next:e})}function Aa(n,e){return function(r,i){const s=new mt;return r.asyncQueue.enqueueAndForget(async()=>s2(await by(r),i,s)),s.promise}(Ue(n),e)}function Hy(n,e,t){const r=t.docs.get(e._key),i=new Gi(n);return new Ns(n,i,e._key,r,new ni(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function RU(n){return Hk(n,{count:Kk()})}function Hk(n,e){const t=oe(n.firestore,Ie),r=Ue(t),i=GC(e,(s,o)=>new ER(o,s.aggregateType,s._internalFieldPath));return x2(r,n._query,i).then(s=>function(a,l,c){const h=new Gi(a);return new Ok(l,h,c)}(t,n,s))}class kU{constructor(e){this.kind="memory",this._onlineComponentProvider=ki.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=Ri.provider}toJSON(){return{kind:this.kind}}}class PU{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Qk(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class xU{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Ri.provider}toJSON(){return{kind:this.kind}}}class NU{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new E2(e)}}toJSON(){return{kind:this.kind}}}function bU(){return new xU}function DU(n){return new NU(n==null?void 0:n.cacheSizeBytes)}function VU(n){return new kU(n)}function OU(n){return new PU(n)}class LU{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ki.provider,this._offlineComponentProvider={build:t=>new xy(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class MU{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ki.provider,this._offlineComponentProvider={build:t=>new Ek(t,e==null?void 0:e.cacheSizeBytes)}}}function Qk(n){return new LU(n==null?void 0:n.forceOwnership)}function FU(){return new MU}/**
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
 */const UU={maxAttempts:5};/**
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
 */class Yk{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=zs(e)}set(e,t,r){this._verifyNotCommitted();const i=Xr(e,this._firestore),s=If(i.converter,t,r),o=yf(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Me.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=Xr(e,this._firestore);let o;return o=typeof(t=me(t))=="string"||t instanceof $i?jy(this._dataReader,"WriteBatch.update",s._key,t,r,i):Uy(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Me.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Xr(e,this._firestore);return this._mutations=this._mutations.concat(new _a(t._key,Me.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new U(O.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Xr(n,e){if((n=me(n)).firestore!==e)throw new U(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class Jk extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=zs(t)}get(t){const r=Xr(t,this._firestore),i=new hU(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return K();const o=s[0];if(o.isFoundDocument())return new fu(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new fu(this._firestore,i,r._key,null,r.converter);throw K()})}set(t,r,i){const s=Xr(t,this._firestore),o=If(s.converter,r,i),a=yf(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=Xr(t,this._firestore);let a;return a=typeof(r=me(r))=="string"||r instanceof $i?jy(this._dataReader,"Transaction.update",o._key,r,i,s):Uy(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=Xr(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Xr(e,this._firestore),r=new Gi(this._firestore);return super.get(e).then(i=>new Ns(this._firestore,r,t._key,i._document,new ni(!1,!1),t.converter))}}function jU(n,e,t){n=oe(n,Ie);const r=Object.assign(Object.assign({},UU),t);return function(s){if(s.maxAttempts<1)throw new U(O.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,a){const l=new mt;return s.asyncQueue.enqueueAndForget(async()=>{const c=await Sk(s);new S2(s.asyncQueue,c,a,o,l).au()}),l.promise}(Ue(n),i=>e(new Jk(n,i)),r)}/**
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
 */function BU(){return new Bu("deleteField")}function zU(){return new Oy("serverTimestamp")}function $U(...n){return new Ly("arrayUnion",n)}function qU(...n){return new My("arrayRemove",n)}function GU(n){return new Fy("increment",n)}function WU(n){return new ju(n)}/**
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
 */function KU(n){return Ue(n=oe(n,Ie)),new Yk(n,e=>Aa(n,e))}/**
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
 */function HU(n,e){const t=Ue(n=oe(n,Ie));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return on("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(s){const o=typeof s=="string"?function(c){try{return JSON.parse(c)}catch(h){throw new U(O.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}}(s):s,a=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const c=RT(l,"collectionGroup"),h=[];if(Array.isArray(l.fields))for(const d of l.fields){const p=vf("setIndexConfiguration",RT(d,"fieldPath"));d.arrayConfig==="CONTAINS"?h.push(new gs(p,2)):d.order==="ASCENDING"?h.push(new gs(p,0)):d.order==="DESCENDING"&&h.push(new gs(p,1))}a.push(new $o($o.UNKNOWN_ID,c,h,qo.empty()))}return a}(e);return V2(t,r)}function RT(n,e){if(typeof n[e]!="string")throw new U(O.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class Xk{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function QU(n){var e;n=oe(n,Ie);const t=kT.get(n);if(t)return t;if(((e=Ue(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new Xk(n);return kT.set(n,r),r}function YU(n){Zk(n,!0)}function JU(n){Zk(n,!1)}function XU(n){L2(Ue(n._firestore)).then(e=>j("deleting all persistent cache indexes succeeded")).catch(e=>on("deleting all persistent cache indexes failed",e))}function Zk(n,e){O2(Ue(n._firestore),e).then(t=>j(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>on(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const kT=new WeakMap;/**
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
 */function ZU(n){var e;const t=(e=Ue(oe(n.firestore,Ie))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:of(t,bt(n._query))._t}function ej(n,e){var t;const r=GC(e,(s,o)=>new ER(o,s.aggregateType,s._internalFieldPath)),i=(t=Ue(oe(n.firestore,Ie))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:VR(i,sR(n._query),r,!0).request}/**
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
 */class tj{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Qy.instance.onExistenceFilterMismatch(e)}}class Qy{constructor(){this.Uu=new Map}static get instance(){return jc||(jc=new Qy,function(t){if(Xh)throw new Error("a TestingHooksSpi instance is already set");Xh=t}(jc)),jc}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let jc=null;(function(e,t=!0){(function(i){pa=i})(Mi),wi(new Tr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Ie(new xL(r.getProvider("auth-internal")),new DL(r.getProvider("app-check-internal")),function(c,h){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new U(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ii(c.options.projectId,h)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),pn(_I,"4.7.3",e),pn(_I,"4.7.3","esm2017")})();const Yy=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Gy,AggregateField:na,AggregateQuerySnapshot:Ok,Bytes:Pi,CACHE_SIZE_UNLIMITED:U2,CollectionReference:Nn,DocumentReference:Qe,DocumentSnapshot:Ns,FieldPath:$i,FieldValue:qi,Firestore:Ie,FirestoreError:U,GeoPoint:gf,LoadBundleTask:Nk,PersistentCacheIndexManager:Xk,Query:gt,QueryCompositeFilterConstraint:qs,QueryConstraint:Ta,QueryDocumentSnapshot:xl,QueryEndAtConstraint:qu,QueryFieldFilterConstraint:Sa,QueryLimitConstraint:zu,QueryOrderByConstraint:Ef,QuerySnapshot:bs,QueryStartAtConstraint:$u,SnapshotMetadata:ni,Timestamp:Fe,Transaction:Jk,VectorValue:ju,WriteBatch:Yk,_AutoId:K_,_ByteString:Ge,_DatabaseId:Ii,_DocumentKey:W,_EmptyAppCheckTokenProvider:VL,_EmptyAuthCredentialsProvider:bC,_FieldPath:De,_TestingHooks:tj,_cast:oe,_debugAssert:kL,_internalAggregationQueryToProtoRunAggregationQueryRequest:ej,_internalQueryToProtoQueryTarget:ZU,_isBase64Available:lM,_logWarn:on,_validateIsNotUsedTogether:kk,addDoc:SU,aggregateFieldEqual:pU,aggregateQuerySnapshotEqual:mU,and:iU,arrayRemove:qU,arrayUnion:$U,average:fU,clearIndexedDbPersistence:$2,collection:mf,collectionGroup:M2,connectFirestoreEmulator:xk,count:Kk,deleteAllPersistentCacheIndexes:XU,deleteDoc:Ig,deleteField:BU,disableNetwork:W2,disablePersistentCacheIndexAutoCreation:JU,doc:Bs,documentId:Y2,enableIndexedDbPersistence:B2,enableMultiTabIndexedDbPersistence:z2,enableNetwork:G2,enablePersistentCacheIndexAutoCreation:YU,endAt:cU,endBefore:uU,ensureFirestoreConfigured:Ue,executeWrite:Aa,getAggregateFromServer:Hk,getCountFromServer:RU,getDoc:Wy,getDocFromCache:yU,getDocFromServer:vU,getDocs:Ky,getDocsFromCache:wU,getDocsFromServer:EU,getFirestore:bk,getPersistentCacheIndexManager:QU,increment:GU,initializeFirestore:j2,limit:qy,limitToLast:oU,loadBundle:H2,memoryEagerGarbageCollector:bU,memoryLocalCache:VU,memoryLruGarbageCollector:DU,namedQuery:Q2,onSnapshot:AU,onSnapshotsInSync:CU,or:rU,orderBy:sU,persistentLocalCache:OU,persistentMultipleTabManager:FU,persistentSingleTabManager:Qk,query:$y,queryEqual:Vy,refEqual:F2,runTransaction:jU,serverTimestamp:zU,setDoc:IU,setIndexConfiguration:HU,setLogLevel:RL,snapshotEqual:_U,startAfter:lU,startAt:aU,sum:dU,terminate:K2,updateDoc:TU,vector:WU,waitForPendingWrites:q2,where:nU,writeBatch:KU},Symbol.toStringTag,{value:"Module"}));var nj="firebase",rj="10.14.1";/**
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
 */pn(nj,rj,"app");var PT={};const xT="@firebase/database",NT="1.0.8";/**
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
 */let eP="";function tP(n){eP=n}/**
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
 */class ij{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),rt(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:eu(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class sj{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Nr(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const nP=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ij(e)}}catch{}return new sj},cs=nP("localStorage"),oj=nP("sessionStorage");/**
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
 */const No=new Kd("@firebase/database"),aj=function(){let n=1;return function(){return n++}}(),rP=function(n){const e=o1(n),t=new n1;t.update(e);const r=t.digest();return P_.encodeByteArray(r)},Gu=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Gu.apply(null,r):typeof r=="object"?e+=rt(r):e+=r,e+=" "}return e};let Nl=null,bT=!0;const lj=function(n,e){z(!0,"Can't turn on custom loggers persistently."),No.logLevel=ae.VERBOSE,Nl=No.log.bind(No)},xt=function(...n){if(bT===!0&&(bT=!1,Nl===null&&oj.get("logging_enabled")===!0&&lj()),Nl){const e=Gu.apply(null,n);Nl(e)}},Wu=function(n){return function(...e){xt(n,...e)}},Tg=function(...n){const e="FIREBASE INTERNAL ERROR: "+Gu(...n);No.error(e)},kr=function(...n){const e=`FIREBASE FATAL ERROR: ${Gu(...n)}`;throw No.error(e),new Error(e)},Jt=function(...n){const e="FIREBASE WARNING: "+Gu(...n);No.warn(e)},uj=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Jt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},iP=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cj=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ra="[MIN_NAME]",Ds="[MAX_NAME]",Ca=function(n,e){if(n===e)return 0;if(n===ra||e===Ds)return-1;if(e===ra||n===Ds)return 1;{const t=DT(n),r=DT(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},hj=function(n,e){return n===e?0:n<e?-1:1},tl=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+rt(e))},Jy=function(n){if(typeof n!="object"||n===null)return rt(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=rt(e[r]),t+=":",t+=Jy(n[e[r]]);return t+="}",t},sP=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function Xt(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const oP=function(n){z(!iP(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let i,s,o,a,l;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=a+r,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const h=c.join("");let d="";for(l=0;l<64;l+=8){let p=parseInt(h.substr(l,8),2).toString(16);p.length===1&&(p="0"+p),d=d+p}return d.toLowerCase()},dj=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},fj=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function pj(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}const mj=new RegExp("^-?(0*)\\d{1,10}$"),gj=-2147483648,_j=2147483647,DT=function(n){if(mj.test(n)){const e=Number(n);if(e>=gj&&e<=_j)return e}return null},Ra=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Jt("Exception was thrown by user callback.",t),e},Math.floor(0))}},yj=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},bl=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class vj{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Jt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class wj{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(xt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Jt(e)}}class ph{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ph.OWNER="owner";/**
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
 */const Xy="5",aP="v",lP="s",uP="r",cP="f",hP=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,dP="ls",fP="p",Sg="ac",pP="websocket",mP="long_polling";/**
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
 */class gP{constructor(e,t,r,i,s=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=cs.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&cs.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Ej(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function _P(n,e,t){z(typeof e=="string","typeof type must == string"),z(typeof t=="object","typeof params must == object");let r;if(e===pP)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===mP)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ej(n)&&(t.ns=n.namespace);const i=[];return Xt(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
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
 */class Ij{constructor(){this.counters_={}}incrementCounter(e,t=1){Nr(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return UD(this.counters_)}}/**
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
 */const $p={},qp={};function Zy(n){const e=n.toString();return $p[e]||($p[e]=new Ij),$p[e]}function Tj(n,e){const t=n.toString();return qp[t]||(qp[t]=e()),qp[t]}/**
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
 */class Sj{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&Ra(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const VT="start",Aj="close",Cj="pLPCommand",Rj="pRTLPCB",yP="id",vP="pw",wP="ser",kj="cb",Pj="seg",xj="ts",Nj="d",bj="dframe",EP=1870,IP=30,Dj=EP-IP,Vj=25e3,Oj=3e4;class vo{constructor(e,t,r,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Wu(e),this.stats_=Zy(t),this.urlFn=l=>(this.appCheckToken&&(l[Sg]=this.appCheckToken),_P(t,mP,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Sj(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Oj)),cj(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ev((...s)=>{const[o,a,l,c,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===VT)this.id=a,this.password=l;else if(o===Aj)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[VT]="t",r[wP]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[kj]=this.scriptTagHolder.uniqueCallbackIdentifier),r[aP]=Xy,this.transportSessionId&&(r[lP]=this.transportSessionId),this.lastSessionId&&(r[dP]=this.lastSessionId),this.applicationId&&(r[fP]=this.applicationId),this.appCheckToken&&(r[Sg]=this.appCheckToken),typeof location<"u"&&location.hostname&&hP.test(location.hostname)&&(r[uP]=cP);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){vo.forceAllow_=!0}static forceDisallow(){vo.forceDisallow_=!0}static isAvailable(){return vo.forceAllow_?!0:!vo.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!dj()&&!fj()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=rt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=DA(t),i=sP(r,Dj);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[bj]="t",r[yP]=e,r[vP]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=rt(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ev{constructor(e,t,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=aj(),window[Cj+this.uniqueCallbackIdentifier]=e,window[Rj+this.uniqueCallbackIdentifier]=t,this.myIFrame=ev.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){xt("frame writing exception"),a.stack&&xt(a.stack),xt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||xt("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[yP]=this.myID,e[vP]=this.myPW,e[wP]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+IP+r.length<=EP;){const o=this.pendingSegs.shift();r=r+"&"+Pj+i+"="+o.seg+"&"+xj+i+"="+o.ts+"&"+Nj+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(Vj)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{xt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const Lj=16384,Mj=45e3;let ld=null;typeof MozWebSocket<"u"?ld=MozWebSocket:typeof WebSocket<"u"&&(ld=WebSocket);class Sn{constructor(e,t,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Wu(this.connId),this.stats_=Zy(t),this.connURL=Sn.connectionURL_(t,o,a,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){const o={};return o[aP]=Xy,typeof location<"u"&&location.hostname&&hP.test(location.hostname)&&(o[uP]=cP),t&&(o[lP]=t),r&&(o[dP]=r),i&&(o[Sg]=i),s&&(o[fP]=s),_P(e,pP,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,cs.set("previous_websocket_failure",!0);try{let r;QD(),this.mySock=new ld(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Sn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&ld!==null&&!Sn.forceDisallow_}static previouslyFailed(){return cs.isInMemoryStorage||cs.get("previous_websocket_failure")===!0}markConnectionHealthy(){cs.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=eu(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(z(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=rt(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=sP(t,Lj);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Mj))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Sn.responsesRequiredToBeHealthy=2;Sn.healthyTimeout=3e4;/**
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
 */class pu{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[vo,Sn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Sn&&Sn.isAvailable();let r=t&&!Sn.previouslyFailed();if(e.webSocketOnly&&(t||Jt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Sn];else{const i=this.transports_=[];for(const s of pu.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);pu.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}pu.globalTransportInitialized_=!1;/**
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
 */const Fj=6e4,Uj=5e3,jj=10*1024,Bj=100*1024,Gp="t",OT="d",zj="s",LT="r",$j="e",MT="o",FT="a",UT="n",jT="p",qj="h";class Gj{constructor(e,t,r,i,s,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Wu("c:"+this.id+":"),this.transportManager_=new pu(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=bl(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Bj?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>jj?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Gp in e){const t=e[Gp];t===FT?this.upgradeIfSecondaryHealthy_():t===LT?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===MT&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=tl("t",e),r=tl("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:jT,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:FT,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:UT,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=tl("t",e),r=tl("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=tl(Gp,e);if(OT in e){const r=e[OT];if(t===qj){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===UT){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===zj?this.onConnectionShutdown_(r):t===LT?this.onReset_(r):t===$j?Tg("Server Error: "+r):t===MT?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Tg("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xy!==r&&Jt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),bl(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Fj))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):bl(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Uj))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:jT,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(cs.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class TP{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class SP{constructor(e){this.allowedEvents_=e,this.listeners_={},z(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){z(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class ud extends SP{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!b_()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new ud}getInitialEvent(e){return z(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const BT=32,zT=768;class Ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ye(){return new Ae("")}function ce(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function xi(n){return n.pieces_.length-n.pieceNum_}function Ce(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new Ae(n.pieces_,e)}function AP(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Wj(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function CP(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function RP(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new Ae(e,0)}function it(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof Ae)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new Ae(t,0)}function le(n){return n.pieceNum_>=n.pieces_.length}function Ft(n,e){const t=ce(n),r=ce(e);if(t===null)return e;if(t===r)return Ft(Ce(n),Ce(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function kP(n,e){if(xi(n)!==xi(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function An(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(xi(n)>xi(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class Kj{constructor(e,t){this.errorPrefix_=t,this.parts_=CP(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Wd(this.parts_[r]);PP(this)}}function Hj(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Wd(e),PP(n)}function Qj(n){const e=n.parts_.pop();n.byteLength_-=Wd(e),n.parts_.length>0&&(n.byteLength_-=1)}function PP(n){if(n.byteLength_>zT)throw new Error(n.errorPrefix_+"has a key path longer than "+zT+" bytes ("+n.byteLength_+").");if(n.parts_.length>BT)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+BT+") or object contains a cycle "+ts(n))}function ts(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class tv extends SP{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new tv}getInitialEvent(e){return z(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const nl=1e3,Yj=60*5*1e3,$T=30*1e3,Jj=1.3,Xj=3e4,Zj="server_kill",qT=3;class yr extends TP{constructor(e,t,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=yr.nextPersistentConnectionId_++,this.log_=Wu("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=nl,this.maxReconnectDelay_=Yj,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");tv.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ud.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(rt(s)),z(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const t=new Gd,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),z(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;yr.warnOnListenWarnings_(l,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Nr(e,"w")){const r=jo(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();Jt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||t1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=$T)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=e1(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){const s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();const o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+rt(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Tg("Unrecognized action received from server: "+rt(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){z(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=nl,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=nl,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Xj&&(this.reconnectDelay_=nl),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Jj)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+yr.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(d){z(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?xt("getToken() completed but was canceled"):(xt("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,a=new Gj(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,_=>{Jt(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Zj)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Jt(d),l())}}}interrupt(e){xt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){xt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Gm(this.interruptReasons_)&&(this.reconnectDelay_=nl,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>Jy(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const r=new Ae(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){xt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=qT&&(this.reconnectDelay_=$T,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){xt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=qT&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+eP.replace(/\./g,"-")]=1,b_()?e["framework.cordova"]=1:FA()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ud.getInstance().currentlyOnline();return Gm(this.interruptReasons_)&&e}}yr.nextPersistentConnectionId_=0;yr.nextConnectionId_=0;/**
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
 */class Tf{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new se(ra,e),i=new se(ra,t);return this.compare(r,i)!==0}minPost(){return se.MIN}}/**
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
 */let Bc;class xP extends Tf{static get __EMPTY_NODE(){return Bc}static set __EMPTY_NODE(e){Bc=e}compare(e,t){return Ca(e.name,t.name)}isDefinedOn(e){throw ha("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return se.MIN}maxPost(){return new se(Ds,Bc)}makePost(e,t){return z(typeof e=="string","KeyIndex indexValue must always be a string."),new se(e,Bc)}toString(){return".key"}}const bo=new xP;/**
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
 */class zc{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class dt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??dt.RED,this.left=i??Kt.EMPTY_NODE,this.right=s??Kt.EMPTY_NODE}copy(e,t,r,i,s){return new dt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Kt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return Kt.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}dt.RED=!0;dt.BLACK=!1;class e4{copy(e,t,r,i,s){return this}insert(e,t,r){return new dt(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Kt{constructor(e,t=Kt.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Kt(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,dt.BLACK,null,null))}remove(e){return new Kt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,dt.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new zc(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new zc(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new zc(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new zc(this.root_,null,this.comparator_,!0,e)}}Kt.EMPTY_NODE=new e4;/**
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
 */function t4(n,e){return Ca(n.name,e.name)}function nv(n,e){return Ca(n,e)}/**
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
 */let Ag;function n4(n){Ag=n}const NP=function(n){return typeof n=="number"?"number:"+oP(n):"string:"+n},bP=function(n){if(n.isLeafNode()){const e=n.val();z(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Nr(e,".sv"),"Priority must be a string or number.")}else z(n===Ag||n.isEmpty(),"priority of unexpected type.");z(n===Ag||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let GT;class lt{constructor(e,t=lt.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,z(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),bP(this.priorityNode_)}static set __childrenNodeConstructor(e){GT=e}static get __childrenNodeConstructor(){return GT}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new lt(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:lt.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return le(e)?this:ce(e)===".priority"?this.priorityNode_:lt.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:lt.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=ce(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(z(r!==".priority"||xi(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,lt.__childrenNodeConstructor.EMPTY_NODE.updateChild(Ce(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+NP(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=oP(this.value_):e+=this.value_,this.lazyHash_=rP(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===lt.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof lt.__childrenNodeConstructor?-1:(z(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,i=lt.VALUE_TYPE_ORDER.indexOf(t),s=lt.VALUE_TYPE_ORDER.indexOf(r);return z(i>=0,"Unknown leaf type: "+t),z(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}lt.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let DP,VP;function r4(n){DP=n}function i4(n){VP=n}class s4 extends Tf{compare(e,t){const r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?Ca(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return se.MIN}maxPost(){return new se(Ds,new lt("[PRIORITY-POST]",VP))}makePost(e,t){const r=DP(e);return new se(t,new lt("[PRIORITY-POST]",r))}toString(){return".priority"}}const He=new s4;/**
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
 */const o4=Math.log(2);class a4{constructor(e){const t=s=>parseInt(Math.log(s)/o4,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const cd=function(n,e,t,r){n.sort(e);const i=function(l,c){const h=c-l;let d,p;if(h===0)return null;if(h===1)return d=n[l],p=t?t(d):d,new dt(p,d.node,dt.BLACK,null,null);{const _=parseInt(h/2,10)+l,I=i(l,_),P=i(_+1,c);return d=n[_],p=t?t(d):d,new dt(p,d.node,dt.BLACK,I,P)}},s=function(l){let c=null,h=null,d=n.length;const p=function(I,P){const x=d-I,v=d;d-=I;const E=i(x+1,v),A=n[x],V=t?t(A):A;_(new dt(V,A.node,P,null,E))},_=function(I){c?(c.left=I,c=I):(h=I,c=I)};for(let I=0;I<l.count;++I){const P=l.nextBitIsOne(),x=Math.pow(2,l.count-(I+1));P?p(x,dt.BLACK):(p(x,dt.BLACK),p(x,dt.RED))}return h},o=new a4(n.length),a=s(o);return new Kt(r||e,a)};/**
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
 */let Wp;const to={};class gr{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return z(to&&He,"ChildrenNode.ts has not been loaded"),Wp=Wp||new gr({".priority":to},{".priority":He}),Wp}get(e){const t=jo(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Kt?t:null}hasIndex(e){return Nr(this.indexSet_,e.toString())}addIndex(e,t){z(e!==bo,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=t.getIterator(se.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=cd(r,e.getCompare()):a=to;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new gr(h,c)}addToIndexes(e,t){const r=Bh(this.indexes_,(i,s)=>{const o=jo(this.indexSet_,s);if(z(o,"Missing index implementation for "+s),i===to)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(se.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),cd(a,o.getCompare())}else return to;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new se(e.name,a))),l.insert(e,e.node)}});return new gr(r,this.indexSet_)}removeFromIndexes(e,t){const r=Bh(this.indexes_,i=>{if(i===to)return i;{const s=t.get(e.name);return s?i.remove(new se(e.name,s)):i}});return new gr(r,this.indexSet_)}}/**
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
 */let rl;class Z{constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&bP(this.priorityNode_),this.children_.isEmpty()&&z(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return rl||(rl=new Z(new Kt(nv),null,gr.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rl}updatePriority(e){return this.children_.isEmpty()?this:new Z(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?rl:t}}getChild(e){const t=ce(e);return t===null?this:this.getImmediateChild(t).getChild(Ce(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(z(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new se(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?rl:this.priorityNode_;return new Z(i,o,s)}}updateChild(e,t){const r=ce(e);if(r===null)return t;{z(ce(e)!==".priority"||xi(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Ce(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,i=0,s=!0;if(this.forEachChild(He,(o,a)=>{t[o]=a.val(e),r++,s&&Z.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+NP(this.getPriority().val())+":"),this.forEachChild(He,(t,r)=>{const i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":rP(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new se(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new se(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new se(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Ku?-1:0}withIndex(e){if(e===bo||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Z(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===bo||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(He),i=t.getIterator(He);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===bo?null:this.indexMap_.get(e.toString())}}Z.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class l4 extends Z{constructor(){super(new Kt(nv),Z.EMPTY_NODE,gr.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Z.EMPTY_NODE}isEmpty(){return!1}}const Ku=new l4;Object.defineProperties(se,{MIN:{value:new se(ra,Z.EMPTY_NODE)},MAX:{value:new se(Ds,Ku)}});xP.__EMPTY_NODE=Z.EMPTY_NODE;lt.__childrenNodeConstructor=Z;n4(Ku);i4(Ku);/**
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
 */const u4=!0;function ft(n,e=null){if(n===null)return Z.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),z(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new lt(t,ft(e))}if(!(n instanceof Array)&&u4){const t=[];let r=!1;if(Xt(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=ft(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),t.push(new se(o,l)))}}),t.length===0)return Z.EMPTY_NODE;const s=cd(t,t4,o=>o.name,nv);if(r){const o=cd(t,He.getCompare());return new Z(s,ft(e),new gr({".priority":o},{".priority":He}))}else return new Z(s,ft(e),gr.Default)}else{let t=Z.EMPTY_NODE;return Xt(n,(r,i)=>{if(Nr(n,r)&&r.substring(0,1)!=="."){const s=ft(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(ft(e))}}r4(ft);/**
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
 */class c4 extends Tf{constructor(e){super(),this.indexPath_=e,z(!le(e)&&ce(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?Ca(e.name,t.name):s}makePost(e,t){const r=ft(e),i=Z.EMPTY_NODE.updateChild(this.indexPath_,r);return new se(t,i)}maxPost(){const e=Z.EMPTY_NODE.updateChild(this.indexPath_,Ku);return new se(Ds,e)}toString(){return CP(this.indexPath_,0).join("/")}}/**
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
 */class h4 extends Tf{compare(e,t){const r=e.node.compareTo(t.node);return r===0?Ca(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return se.MIN}maxPost(){return se.MAX}makePost(e,t){const r=ft(e);return new se(t,r)}toString(){return".value"}}const d4=new h4;/**
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
 */function OP(n){return{type:"value",snapshotNode:n}}function ia(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function mu(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function gu(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function f4(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class rv{constructor(e){this.index_=e}updateChild(e,t,r,i,s,o){z(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(mu(t,a)):z(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ia(t,r)):o.trackChildChange(gu(t,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(He,(i,s)=>{t.hasChild(i)||r.trackChildChange(mu(i,s))}),t.isLeafNode()||t.forEachChild(He,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(gu(i,s,o))}else r.trackChildChange(ia(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?Z.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class _u{constructor(e){this.indexedFilter_=new rv(e.getIndex()),this.index_=e.getIndex(),this.startPost_=_u.getStartPost_(e),this.endPost_=_u.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,i,s,o){return this.matches(new se(t,r))||(r=Z.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,i,s,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=Z.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(Z.EMPTY_NODE);const s=this;return t.forEachChild(He,(o,a)=>{s.matches(new se(o,a))||(i=i.updateImmediateChild(o,Z.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class p4{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{const r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new _u(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,i,s,o){return this.rangedFilter_.matches(new se(t,r))||(r=Z.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,i,s,o):this.fullLimitUpdateChild_(e,t,r,s,o)}updateFullNode(e,t,r){let i;if(t.isLeafNode()||t.isEmpty())i=Z.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=Z.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(Z.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,Z.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(p,_)=>d(_,p)}else o=this.index_.getCompare();const a=e;z(a.numChildren()===this.limit_,"");const l=new se(t,r),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let p=i.getChildAfterChild(this.index_,c,this.reverse_);for(;p!=null&&(p.name===t||a.hasChild(p.name));)p=i.getChildAfterChild(this.index_,p,this.reverse_);const _=p==null?1:o(p,l);if(h&&!r.isEmpty()&&_>=0)return s!=null&&s.trackChildChange(gu(t,r,d)),a.updateImmediateChild(t,r);{s!=null&&s.trackChildChange(mu(t,d));const P=a.updateImmediateChild(t,Z.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(s!=null&&s.trackChildChange(ia(p.name,p.node)),P.updateImmediateChild(p.name,p.node)):P}}else return r.isEmpty()?e:h&&o(c,l)>=0?(s!=null&&(s.trackChildChange(mu(c.name,c.node)),s.trackChildChange(ia(t,r))),a.updateImmediateChild(t,r).updateImmediateChild(c.name,Z.EMPTY_NODE)):e}}/**
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
 */class Sf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=He}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return z(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return z(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ra}hasEnd(){return this.endSet_}getIndexEndValue(){return z(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return z(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ds}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return z(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===He}copy(){const e=new Sf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function m4(n){return n.loadsAllData()?new rv(n.getIndex()):n.hasLimit()?new p4(n):new _u(n)}function WT(n){const e={};if(n.isDefault())return e;let t;if(n.index_===He?t="$priority":n.index_===d4?t="$value":n.index_===bo?t="$key":(z(n.index_ instanceof c4,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=rt(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=rt(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+rt(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=rt(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+rt(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function KT(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==He&&(e.i=n.index_.toString()),e}/**
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
 */class hd extends TP{constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Wu("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(z(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=hd.getListenId_(e,r),a={};this.listens_[o]=a;const l=WT(e._queryParams);this.restRequest_(s+".json",l,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(s,d,!1,r),jo(this.listens_,o)===a){let p;c?c===401?p="permission_denied":p="rest_error:"+c:p="ok",i(p,null)}})}unlisten(e,t){const r=hd.getListenId_(e,t);delete this.listens_[r]}get(e){const t=WT(e._queryParams),r=e._path.toString(),i=new Gd;return this.restRequest_(r+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+da(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=eu(a.responseText)}catch{Jt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&Jt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class g4{constructor(){this.rootNode_=Z.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function dd(){return{value:null,children:new Map}}function LP(n,e,t){if(le(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=ce(e);n.children.has(r)||n.children.set(r,dd());const i=n.children.get(r);e=Ce(e),LP(i,e,t)}}function Cg(n,e,t){n.value!==null?t(e,n.value):_4(n,(r,i)=>{const s=new Ae(e.toString()+"/"+r);Cg(i,s,t)})}function _4(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
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
 */class y4{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Xt(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}}/**
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
 */const HT=10*1e3,v4=30*1e3,w4=5*60*1e3;class E4{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new y4(e);const r=HT+(v4-HT)*Math.random();bl(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;Xt(e,(i,s)=>{s>0&&Nr(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),bl(this.reportStats_.bind(this),Math.floor(Math.random()*2*w4))}}/**
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
 */var Cn;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Cn||(Cn={}));function MP(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function iv(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function sv(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class fd{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=Cn.ACK_USER_WRITE,this.source=MP()}operationForChild(e){if(le(this.path)){if(this.affectedTree.value!=null)return z(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Ae(e));return new fd(ye(),t,this.revert)}}else return z(ce(this.path)===e,"operationForChild called for unrelated child."),new fd(Ce(this.path),this.affectedTree,this.revert)}}/**
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
 */class yu{constructor(e,t){this.source=e,this.path=t,this.type=Cn.LISTEN_COMPLETE}operationForChild(e){return le(this.path)?new yu(this.source,ye()):new yu(this.source,Ce(this.path))}}/**
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
 */class Vs{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=Cn.OVERWRITE}operationForChild(e){return le(this.path)?new Vs(this.source,ye(),this.snap.getImmediateChild(e)):new Vs(this.source,Ce(this.path),this.snap)}}/**
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
 */class vu{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=Cn.MERGE}operationForChild(e){if(le(this.path)){const t=this.children.subtree(new Ae(e));return t.isEmpty()?null:t.value?new Vs(this.source,ye(),t.value):new vu(this.source,ye(),t)}else return z(ce(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new vu(this.source,Ce(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Ni{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(le(e))return this.isFullyInitialized()&&!this.filtered_;const t=ce(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class I4{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function T4(n,e,t,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(f4(o.childName,o.snapshotNode))}),il(n,i,"child_removed",e,r,t),il(n,i,"child_added",e,r,t),il(n,i,"child_moved",s,r,t),il(n,i,"child_changed",e,r,t),il(n,i,"value",e,r,t),i}function il(n,e,t,r,i,s){const o=r.filter(a=>a.type===t);o.sort((a,l)=>A4(n,a,l)),o.forEach(a=>{const l=S4(n,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function S4(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function A4(n,e,t){if(e.childName==null||t.childName==null)throw ha("Should only compare child_ events.");const r=new se(e.childName,e.snapshotNode),i=new se(t.childName,t.snapshotNode);return n.index_.compare(r,i)}/**
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
 */function Af(n,e){return{eventCache:n,serverCache:e}}function Dl(n,e,t,r){return Af(new Ni(e,t,r),n.serverCache)}function FP(n,e,t,r){return Af(n.eventCache,new Ni(e,t,r))}function pd(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Os(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let Kp;const C4=()=>(Kp||(Kp=new Kt(hj)),Kp);class xe{constructor(e,t=C4()){this.value=e,this.children=t}static fromObject(e){let t=new xe(null);return Xt(e,(r,i)=>{t=t.set(new Ae(r),i)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ye(),value:this.value};if(le(e))return null;{const r=ce(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(Ce(e),t);return s!=null?{path:it(new Ae(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(le(e))return this;{const t=ce(e),r=this.children.get(t);return r!==null?r.subtree(Ce(e)):new xe(null)}}set(e,t){if(le(e))return new xe(t,this.children);{const r=ce(e),s=(this.children.get(r)||new xe(null)).set(Ce(e),t),o=this.children.insert(r,s);return new xe(this.value,o)}}remove(e){if(le(e))return this.children.isEmpty()?new xe(null):new xe(null,this.children);{const t=ce(e),r=this.children.get(t);if(r){const i=r.remove(Ce(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new xe(null):new xe(this.value,s)}else return this}}get(e){if(le(e))return this.value;{const t=ce(e),r=this.children.get(t);return r?r.get(Ce(e)):null}}setTree(e,t){if(le(e))return t;{const r=ce(e),s=(this.children.get(r)||new xe(null)).setTree(Ce(e),t);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new xe(this.value,o)}}fold(e){return this.fold_(ye(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(it(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,ye(),t)}findOnPath_(e,t,r){const i=this.value?r(t,this.value):!1;if(i)return i;if(le(e))return null;{const s=ce(e),o=this.children.get(s);return o?o.findOnPath_(Ce(e),it(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ye(),t)}foreachOnPath_(e,t,r){if(le(e))return this;{this.value&&r(t,this.value);const i=ce(e),s=this.children.get(i);return s?s.foreachOnPath_(Ce(e),it(t,i),r):new xe(null)}}foreach(e){this.foreach_(ye(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(it(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
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
 */class bn{constructor(e){this.writeTree_=e}static empty(){return new bn(new xe(null))}}function Vl(n,e,t){if(le(e))return new bn(new xe(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=Ft(i,e);return s=s.updateChild(o,t),new bn(n.writeTree_.set(i,s))}else{const i=new xe(t),s=n.writeTree_.setTree(e,i);return new bn(s)}}}function QT(n,e,t){let r=n;return Xt(t,(i,s)=>{r=Vl(r,it(e,i),s)}),r}function YT(n,e){if(le(e))return bn.empty();{const t=n.writeTree_.setTree(e,new xe(null));return new bn(t)}}function Rg(n,e){return Gs(n,e)!=null}function Gs(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ft(t.path,e)):null}function JT(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(He,(r,i)=>{e.push(new se(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new se(r,i.value))}),e}function mi(n,e){if(le(e))return n;{const t=Gs(n,e);return t!=null?new bn(new xe(t)):new bn(n.writeTree_.subtree(e))}}function kg(n){return n.writeTree_.isEmpty()}function sa(n,e){return UP(ye(),n.writeTree_,e)}function UP(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(z(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=UP(it(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(it(n,".priority"),r)),t}}/**
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
 */function Cf(n,e){return $P(e,n)}function R4(n,e,t,r,i){z(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=Vl(n.visibleWrites,e,t)),n.lastWriteId=r}function k4(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function P4(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);z(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&x4(a,r.path)?i=!1:An(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return N4(n),!0;if(r.snap)n.visibleWrites=YT(n.visibleWrites,r.path);else{const a=r.children;Xt(a,l=>{n.visibleWrites=YT(n.visibleWrites,it(r.path,l))})}return!0}else return!1}function x4(n,e){if(n.snap)return An(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&An(it(n.path,t),e))return!0;return!1}function N4(n){n.visibleWrites=jP(n.allWrites,b4,ye()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function b4(n){return n.visible}function jP(n,e,t){let r=bn.empty();for(let i=0;i<n.length;++i){const s=n[i];if(e(s)){const o=s.path;let a;if(s.snap)An(t,o)?(a=Ft(t,o),r=Vl(r,a,s.snap)):An(o,t)&&(a=Ft(o,t),r=Vl(r,ye(),s.snap.getChild(a)));else if(s.children){if(An(t,o))a=Ft(t,o),r=QT(r,a,s.children);else if(An(o,t))if(a=Ft(o,t),le(a))r=QT(r,ye(),s.children);else{const l=jo(s.children,ce(a));if(l){const c=l.getChild(Ce(a));r=Vl(r,ye(),c)}}}else throw ha("WriteRecord should have .snap or .children")}}return r}function BP(n,e,t,r,i){if(!r&&!i){const s=Gs(n.visibleWrites,e);if(s!=null)return s;{const o=mi(n.visibleWrites,e);if(kg(o))return t;if(t==null&&!Rg(o,ye()))return null;{const a=t||Z.EMPTY_NODE;return sa(o,a)}}}else{const s=mi(n.visibleWrites,e);if(!i&&kg(s))return t;if(!i&&t==null&&!Rg(s,ye()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(An(c.path,e)||An(e,c.path))},a=jP(n.allWrites,o,e),l=t||Z.EMPTY_NODE;return sa(a,l)}}}function D4(n,e,t){let r=Z.EMPTY_NODE;const i=Gs(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(He,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){const s=mi(n.visibleWrites,e);return t.forEachChild(He,(o,a)=>{const l=sa(mi(s,new Ae(o)),a);r=r.updateImmediateChild(o,l)}),JT(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=mi(n.visibleWrites,e);return JT(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function V4(n,e,t,r,i){z(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=it(e,t);if(Rg(n.visibleWrites,s))return null;{const o=mi(n.visibleWrites,s);return kg(o)?i.getChild(t):sa(o,i.getChild(t))}}function O4(n,e,t,r){const i=it(e,t),s=Gs(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){const o=mi(n.visibleWrites,i);return sa(o,r.getNode().getImmediateChild(t))}else return null}function L4(n,e){return Gs(n.visibleWrites,e)}function M4(n,e,t,r,i,s,o){let a;const l=mi(n.visibleWrites,e),c=Gs(l,ye());if(c!=null)a=c;else if(t!=null)a=sa(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),p=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let _=p.getNext();for(;_&&h.length<i;)d(_,r)!==0&&h.push(_),_=p.getNext();return h}else return[]}function F4(){return{visibleWrites:bn.empty(),allWrites:[],lastWriteId:-1}}function md(n,e,t,r){return BP(n.writeTree,n.treePath,e,t,r)}function ov(n,e){return D4(n.writeTree,n.treePath,e)}function XT(n,e,t,r){return V4(n.writeTree,n.treePath,e,t,r)}function gd(n,e){return L4(n.writeTree,it(n.treePath,e))}function U4(n,e,t,r,i,s){return M4(n.writeTree,n.treePath,e,t,r,i,s)}function av(n,e,t){return O4(n.writeTree,n.treePath,e,t)}function zP(n,e){return $P(it(n.treePath,e),n.writeTree)}function $P(n,e){return{treePath:n,writeTree:e}}/**
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
 */class j4{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;z(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),z(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,gu(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,mu(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,ia(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,gu(r,e.snapshotNode,i.oldSnap));else throw ha("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class B4{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const qP=new B4;class lv{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Ni(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return av(this.writes_,e,r)}}getChildAfterChild(e,t,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Os(this.viewCache_),s=U4(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}}/**
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
 */function z4(n){return{filter:n}}function $4(n,e){z(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),z(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function q4(n,e,t,r,i){const s=new j4;let o,a;if(t.type===Cn.OVERWRITE){const c=t;c.source.fromUser?o=Pg(n,e,c.path,c.snap,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!le(c.path),o=_d(n,e,c.path,c.snap,r,i,a,s))}else if(t.type===Cn.MERGE){const c=t;c.source.fromUser?o=W4(n,e,c.path,c.children,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=xg(n,e,c.path,c.children,r,i,a,s))}else if(t.type===Cn.ACK_USER_WRITE){const c=t;c.revert?o=Q4(n,e,c.path,r,i,s):o=K4(n,e,c.path,c.affectedTree,r,i,s)}else if(t.type===Cn.LISTEN_COMPLETE)o=H4(n,e,t.path,r,s);else throw ha("Unknown operation type: "+t.type);const l=s.getChanges();return G4(e,o,l),{viewCache:o,changes:l}}function G4(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=pd(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(OP(pd(e)))}}function GP(n,e,t,r,i,s){const o=e.eventCache;if(gd(r,t)!=null)return e;{let a,l;if(le(t))if(z(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Os(e),h=c instanceof Z?c:Z.EMPTY_NODE,d=ov(r,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const c=md(r,Os(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=ce(t);if(c===".priority"){z(xi(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const d=XT(r,t,h,l);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=Ce(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const p=XT(r,t,o.getNode(),l);p!=null?d=o.getNode().getImmediateChild(c).updateChild(h,p):d=o.getNode().getImmediateChild(c)}else d=av(r,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,h,i,s):a=o.getNode()}}return Dl(e,a,o.isFullyInitialized()||le(t),n.filter.filtersNodes())}}function _d(n,e,t,r,i,s,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(le(t))c=h.updateFullNode(l.getNode(),r,null);else if(h.filtersNodes()&&!l.isFiltered()){const _=l.getNode().updateChild(t,r);c=h.updateFullNode(l.getNode(),_,null)}else{const _=ce(t);if(!l.isCompleteForPath(t)&&xi(t)>1)return e;const I=Ce(t),x=l.getNode().getImmediateChild(_).updateChild(I,r);_===".priority"?c=h.updatePriority(l.getNode(),x):c=h.updateChild(l.getNode(),_,x,I,qP,null)}const d=FP(e,c,l.isFullyInitialized()||le(t),h.filtersNodes()),p=new lv(i,d,s);return GP(n,d,t,i,p,a)}function Pg(n,e,t,r,i,s,o){const a=e.eventCache;let l,c;const h=new lv(i,e,s);if(le(t))c=n.filter.updateFullNode(e.eventCache.getNode(),r,o),l=Dl(e,c,!0,n.filter.filtersNodes());else{const d=ce(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),r),l=Dl(e,c,a.isFullyInitialized(),a.isFiltered());else{const p=Ce(t),_=a.getNode().getImmediateChild(d);let I;if(le(p))I=r;else{const P=h.getCompleteChild(d);P!=null?AP(p)===".priority"&&P.getChild(RP(p)).isEmpty()?I=P:I=P.updateChild(p,r):I=Z.EMPTY_NODE}if(_.equals(I))l=e;else{const P=n.filter.updateChild(a.getNode(),d,I,p,h,o);l=Dl(e,P,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function ZT(n,e){return n.eventCache.isCompleteForChild(e)}function W4(n,e,t,r,i,s,o){let a=e;return r.foreach((l,c)=>{const h=it(t,l);ZT(e,ce(h))&&(a=Pg(n,a,h,c,i,s,o))}),r.foreach((l,c)=>{const h=it(t,l);ZT(e,ce(h))||(a=Pg(n,a,h,c,i,s,o))}),a}function eS(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function xg(n,e,t,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;le(t)?c=r:c=new xe(null).setTree(t,r);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,p)=>{if(h.hasChild(d)){const _=e.serverCache.getNode().getImmediateChild(d),I=eS(n,_,p);l=_d(n,l,new Ae(d),I,i,s,o,a)}}),c.children.inorderTraversal((d,p)=>{const _=!e.serverCache.isCompleteForChild(d)&&p.value===null;if(!h.hasChild(d)&&!_){const I=e.serverCache.getNode().getImmediateChild(d),P=eS(n,I,p);l=_d(n,l,new Ae(d),P,i,s,o,a)}}),l}function K4(n,e,t,r,i,s,o){if(gd(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(le(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return _d(n,e,t,l.getNode().getChild(t),i,s,a,o);if(le(t)){let c=new xe(null);return l.getNode().forEachChild(bo,(h,d)=>{c=c.set(new Ae(h),d)}),xg(n,e,t,c,i,s,a,o)}else return e}else{let c=new xe(null);return r.foreach((h,d)=>{const p=it(t,h);l.isCompleteForPath(p)&&(c=c.set(h,l.getNode().getChild(p)))}),xg(n,e,t,c,i,s,a,o)}}function H4(n,e,t,r,i){const s=e.serverCache,o=FP(e,s.getNode(),s.isFullyInitialized()||le(t),s.isFiltered());return GP(n,o,t,r,qP,i)}function Q4(n,e,t,r,i,s){let o;if(gd(r,t)!=null)return e;{const a=new lv(r,e,i),l=e.eventCache.getNode();let c;if(le(t)||ce(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=md(r,Os(e));else{const d=e.serverCache.getNode();z(d instanceof Z,"serverChildren would be complete if leaf node"),h=ov(r,d)}h=h,c=n.filter.updateFullNode(l,h,s)}else{const h=ce(t);let d=av(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=l.getImmediateChild(h)),d!=null?c=n.filter.updateChild(l,h,d,Ce(t),a,s):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,Z.EMPTY_NODE,Ce(t),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=md(r,Os(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||gd(r,ye())!=null,Dl(e,c,o,n.filter.filtersNodes())}}/**
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
 */class Y4{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new rv(r.getIndex()),s=m4(r);this.processor_=z4(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(Z.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(Z.EMPTY_NODE,a.getNode(),null),h=new Ni(l,o.isFullyInitialized(),i.filtersNodes()),d=new Ni(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=Af(d,h),this.eventGenerator_=new I4(this.query_)}get query(){return this.query_}}function J4(n){return n.viewCache_.serverCache.getNode()}function X4(n){return pd(n.viewCache_)}function Z4(n,e){const t=Os(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!le(e)&&!t.getImmediateChild(ce(e)).isEmpty())?t.getChild(e):null}function tS(n){return n.eventRegistrations_.length===0}function eB(n,e){n.eventRegistrations_.push(e)}function nS(n,e,t){const r=[];if(t){z(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(t,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<n.eventRegistrations_.length;++s){const o=n.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return r}function rS(n,e,t,r){e.type===Cn.MERGE&&e.source.queryId!==null&&(z(Os(n.viewCache_),"We should always have a full cache before handling merges"),z(pd(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,s=q4(n.processor_,i,e,t,r);return $4(n.processor_,s.viewCache),z(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,WP(n,s.changes,s.viewCache.eventCache.getNode(),null)}function tB(n,e){const t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(He,(s,o)=>{r.push(ia(s,o))}),t.isFullyInitialized()&&r.push(OP(t.getNode())),WP(n,r,t.getNode(),e)}function WP(n,e,t,r){const i=r?[r]:n.eventRegistrations_;return T4(n.eventGenerator_,e,t,i)}/**
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
 */let yd;class KP{constructor(){this.views=new Map}}function nB(n){z(!yd,"__referenceConstructor has already been defined"),yd=n}function rB(){return z(yd,"Reference.ts has not been loaded"),yd}function iB(n){return n.views.size===0}function uv(n,e,t,r){const i=e.source.queryId;if(i!==null){const s=n.views.get(i);return z(s!=null,"SyncTree gave us an op for an invalid query."),rS(s,e,t,r)}else{let s=[];for(const o of n.views.values())s=s.concat(rS(o,e,t,r));return s}}function HP(n,e,t,r,i){const s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=md(t,i?r:null),l=!1;a?l=!0:r instanceof Z?(a=ov(t,r),l=!1):(a=Z.EMPTY_NODE,l=!1);const c=Af(new Ni(a,l,!1),new Ni(r,i,!1));return new Y4(e,c)}return o}function sB(n,e,t,r,i,s){const o=HP(n,e,r,i,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),eB(o,t),tB(o,t)}function oB(n,e,t,r){const i=e._queryIdentifier,s=[];let o=[];const a=bi(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(nS(c,t,r)),tS(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(nS(l,t,r)),tS(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!bi(n)&&s.push(new(rB())(e._repo,e._path)),{removed:s,events:o}}function QP(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function gi(n,e){let t=null;for(const r of n.views.values())t=t||Z4(r,e);return t}function YP(n,e){if(e._queryParams.loadsAllData())return Rf(n);{const r=e._queryIdentifier;return n.views.get(r)}}function JP(n,e){return YP(n,e)!=null}function bi(n){return Rf(n)!=null}function Rf(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let vd;function aB(n){z(!vd,"__referenceConstructor has already been defined"),vd=n}function lB(){return z(vd,"Reference.ts has not been loaded"),vd}let uB=1;class iS{constructor(e){this.listenProvider_=e,this.syncPointTree_=new xe(null),this.pendingWriteTree_=F4(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function XP(n,e,t,r,i){return R4(n.pendingWriteTree_,e,t,r,i),i?Qu(n,new Vs(MP(),e,t)):[]}function hs(n,e,t=!1){const r=k4(n.pendingWriteTree_,e);if(P4(n.pendingWriteTree_,e)){let s=new xe(null);return r.snap!=null?s=s.set(ye(),!0):Xt(r.children,o=>{s=s.set(new Ae(o),!0)}),Qu(n,new fd(r.path,s,t))}else return[]}function Hu(n,e,t){return Qu(n,new Vs(iv(),e,t))}function cB(n,e,t){const r=xe.fromObject(t);return Qu(n,new vu(iv(),e,r))}function hB(n,e){return Qu(n,new yu(iv(),e))}function dB(n,e,t){const r=hv(n,t);if(r){const i=dv(r),s=i.path,o=i.queryId,a=Ft(s,e),l=new yu(sv(o),a);return fv(n,s,l)}else return[]}function ZP(n,e,t,r,i=!1){const s=e._path,o=n.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||JP(o,e))){const l=oB(o,e,t,r);iB(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(p=>p._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(s,(p,_)=>bi(_));if(h&&!d){const p=n.syncPointTree_.subtree(s);if(!p.isEmpty()){const _=gB(p);for(let I=0;I<_.length;++I){const P=_[I],x=P.query,v=rx(n,P);n.listenProvider_.startListening(Ol(x),wu(n,x),v.hashFn,v.onComplete)}}}!d&&c.length>0&&!r&&(h?n.listenProvider_.stopListening(Ol(e),null):c.forEach(p=>{const _=n.queryToTagMap.get(kf(p));n.listenProvider_.stopListening(Ol(p),_)}))}_B(n,c)}return a}function ex(n,e,t,r){const i=hv(n,r);if(i!=null){const s=dv(i),o=s.path,a=s.queryId,l=Ft(o,e),c=new Vs(sv(a),l,t);return fv(n,o,c)}else return[]}function fB(n,e,t,r){const i=hv(n,r);if(i){const s=dv(i),o=s.path,a=s.queryId,l=Ft(o,e),c=xe.fromObject(t),h=new vu(sv(a),l,c);return fv(n,o,h)}else return[]}function pB(n,e,t,r=!1){const i=e._path;let s=null,o=!1;n.syncPointTree_.foreachOnPath(i,(p,_)=>{const I=Ft(p,i);s=s||gi(_,I),o=o||bi(_)});let a=n.syncPointTree_.get(i);a?(o=o||bi(a),s=s||gi(a,ye())):(a=new KP,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=Z.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((_,I)=>{const P=gi(I,ye());P&&(s=s.updateImmediateChild(_,P))}));const c=JP(a,e);if(!c&&!e._queryParams.loadsAllData()){const p=kf(e);z(!n.queryToTagMap.has(p),"View does not exist, but we have a tag");const _=yB();n.queryToTagMap.set(p,_),n.tagToQueryMap.set(_,p)}const h=Cf(n.pendingWriteTree_,i);let d=sB(a,e,t,h,s,l);if(!c&&!o&&!r){const p=YP(a,e);d=d.concat(vB(n,e,p))}return d}function cv(n,e,t){const i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=Ft(o,e),c=gi(a,l);if(c)return c});return BP(i,e,s,t,!0)}function mB(n,e){const t=e._path;let r=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const d=Ft(c,t);r=r||gi(h,d)});let i=n.syncPointTree_.get(t);i?r=r||gi(i,ye()):(i=new KP,n.syncPointTree_=n.syncPointTree_.set(t,i));const s=r!=null,o=s?new Ni(r,!0,!1):null,a=Cf(n.pendingWriteTree_,e._path),l=HP(i,e,a,s?o.getNode():Z.EMPTY_NODE,s);return X4(l)}function Qu(n,e){return tx(e,n.syncPointTree_,null,Cf(n.pendingWriteTree_,ye()))}function tx(n,e,t,r){if(le(n.path))return nx(n,e,t,r);{const i=e.get(ye());t==null&&i!=null&&(t=gi(i,ye()));let s=[];const o=ce(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=zP(r,o);s=s.concat(tx(a,l,c,h))}return i&&(s=s.concat(uv(i,n,r,t))),s}}function nx(n,e,t,r){const i=e.get(ye());t==null&&i!=null&&(t=gi(i,ye()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=zP(r,o),h=n.operationForChild(o);h&&(s=s.concat(nx(h,a,l,c)))}),i&&(s=s.concat(uv(i,n,r,t))),s}function rx(n,e){const t=e.query,r=wu(n,t);return{hashFn:()=>(J4(e)||Z.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?dB(n,t._path,r):hB(n,t._path);{const s=pj(i,t);return ZP(n,t,null,s)}}}}function wu(n,e){const t=kf(e);return n.queryToTagMap.get(t)}function kf(n){return n._path.toString()+"$"+n._queryIdentifier}function hv(n,e){return n.tagToQueryMap.get(e)}function dv(n){const e=n.indexOf("$");return z(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new Ae(n.substr(0,e))}}function fv(n,e,t){const r=n.syncPointTree_.get(e);z(r,"Missing sync point for query tag that we're tracking");const i=Cf(n.pendingWriteTree_,e);return uv(r,t,i,null)}function gB(n){return n.fold((e,t,r)=>{if(t&&bi(t))return[Rf(t)];{let i=[];return t&&(i=QP(t)),Xt(r,(s,o)=>{i=i.concat(o)}),i}})}function Ol(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(lB())(n._repo,n._path):n}function _B(n,e){for(let t=0;t<e.length;++t){const r=e[t];if(!r._queryParams.loadsAllData()){const i=kf(r),s=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(s)}}}function yB(){return uB++}function vB(n,e,t){const r=e._path,i=wu(n,e),s=rx(n,t),o=n.listenProvider_.startListening(Ol(e),i,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(r);if(i)z(!bi(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,d)=>{if(!le(c)&&h&&bi(h))return[Rf(h).query];{let p=[];return h&&(p=p.concat(QP(h).map(_=>_.query))),Xt(d,(_,I)=>{p=p.concat(I)}),p}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(Ol(h),wu(n,h))}}return o}/**
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
 */class pv{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new pv(t)}node(){return this.node_}}class mv{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=it(this.path_,e);return new mv(this.syncTree_,t)}node(){return cv(this.syncTree_,this.path_)}}const wB=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},sS=function(n,e,t){if(!n||typeof n!="object")return n;if(z(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return EB(n[".sv"],e,t);if(typeof n[".sv"]=="object")return IB(n[".sv"],e);z(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},EB=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:z(!1,"Unexpected server value: "+n)}},IB=function(n,e,t){n.hasOwnProperty("increment")||z(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&z(!1,"Unexpected increment value: "+r);const i=e.node();if(z(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},TB=function(n,e,t,r){return gv(e,new mv(t,n),r)},ix=function(n,e,t){return gv(n,new pv(e),t)};function gv(n,e,t){const r=n.getPriority().val(),i=sS(r,e.getImmediateChild(".priority"),t);let s;if(n.isLeafNode()){const o=n,a=sS(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new lt(a,ft(i)):n}else{const o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new lt(i))),o.forEachChild(He,(a,l)=>{const c=gv(l,e.getImmediateChild(a),t);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
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
 */class _v{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function yv(n,e){let t=e instanceof Ae?e:new Ae(e),r=n,i=ce(t);for(;i!==null;){const s=jo(r.node.children,i)||{children:{},childCount:0};r=new _v(i,r,s),t=Ce(t),i=ce(t)}return r}function ka(n){return n.node.value}function sx(n,e){n.node.value=e,Ng(n)}function ox(n){return n.node.childCount>0}function SB(n){return ka(n)===void 0&&!ox(n)}function Pf(n,e){Xt(n.node.children,(t,r)=>{e(new _v(t,n,r))})}function ax(n,e,t,r){t&&e(n),Pf(n,i=>{ax(i,e,!0)})}function AB(n,e,t){let r=n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Yu(n){return new Ae(n.parent===null?n.name:Yu(n.parent)+"/"+n.name)}function Ng(n){n.parent!==null&&CB(n.parent,n.name,n)}function CB(n,e,t){const r=SB(t),i=Nr(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,Ng(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Ng(n))}/**
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
 */const RB=/[\[\].#$\/\u0000-\u001F\u007F]/,kB=/[\[\].#$\u0000-\u001F\u007F]/,Hp=10*1024*1024,lx=function(n){return typeof n=="string"&&n.length!==0&&!RB.test(n)},ux=function(n){return typeof n=="string"&&n.length!==0&&!kB.test(n)},PB=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ux(n)},xB=function(n,e,t,r){vv(D_(n,"value"),e,t)},vv=function(n,e,t){const r=t instanceof Ae?new Kj(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ts(r));if(typeof e=="function")throw new Error(n+"contains a function "+ts(r)+" with contents = "+e.toString());if(iP(e))throw new Error(n+"contains "+e.toString()+" "+ts(r));if(typeof e=="string"&&e.length>Hp/3&&Wd(e)>Hp)throw new Error(n+"contains a string greater than "+Hp+" utf8 bytes "+ts(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Xt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!lx(o)))throw new Error(n+" contains an invalid key ("+o+") "+ts(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Hj(r,o),vv(n,a,r),Qj(r)}),i&&s)throw new Error(n+' contains ".value" child '+ts(r)+" in addition to actual children.")}},wv=function(n,e,t,r){if(!ux(t))throw new Error(D_(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},NB=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),wv(n,e,t)},Ev=function(n,e){if(ce(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},bB=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!lx(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!PB(t))throw new Error(D_(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class DB{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function cx(n,e){let t=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();t!==null&&!kP(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function Qn(n,e,t){cx(n,t),VB(n,r=>An(r,e)||An(e,r))}function VB(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const i=n.eventLists_[r];if(i){const s=i.path;e(s)?(OB(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function OB(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();Nl&&xt("event: "+t.toString()),Ra(r)}}}/**
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
 */const LB="repo_interrupt",MB=25;class FB{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new DB,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=dd(),this.transactionQueueTree_=new _v,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function UB(n,e,t){if(n.stats_=Zy(n.repoInfo_),n.forceRestClient_||yj())n.server_=new hd(n.repoInfo_,(r,i,s,o)=>{oS(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>aS(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{rt(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new yr(n.repoInfo_,e,(r,i,s,o)=>{oS(n,r,i,s,o)},r=>{aS(n,r)},r=>{BB(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=Tj(n.repoInfo_,()=>new E4(n.stats_,n.server_)),n.infoData_=new g4,n.infoSyncTree_=new iS({startListening:(r,i,s,o)=>{let a=[];const l=n.infoData_.getNode(r._path);return l.isEmpty()||(a=Hu(n.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Tv(n,"connected",!1),n.serverSyncTree_=new iS({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(a,l)=>{const c=o(a,l);Qn(n.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function jB(n){const t=n.infoData_.getNode(new Ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Iv(n){return wB({timestamp:jB(n)})}function oS(n,e,t,r,i){n.dataUpdateCount++;const s=new Ae(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){const l=Bh(t,c=>ft(c));o=fB(n.serverSyncTree_,s,l,i)}else{const l=ft(t);o=ex(n.serverSyncTree_,s,l,i)}else if(r){const l=Bh(t,c=>ft(c));o=cB(n.serverSyncTree_,s,l)}else{const l=ft(t);o=Hu(n.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=Nf(n,s)),Qn(n.eventQueue_,a,o)}function aS(n,e){Tv(n,"connected",e),e===!1&&qB(n)}function BB(n,e){Xt(e,(t,r)=>{Tv(n,t,r)})}function Tv(n,e,t){const r=new Ae("/.info/"+e),i=ft(t);n.infoData_.updateSnapshot(r,i);const s=Hu(n.infoSyncTree_,r,i);Qn(n.eventQueue_,r,s)}function hx(n){return n.nextWriteId_++}function zB(n,e,t){const r=mB(n.serverSyncTree_,e);return r!=null?Promise.resolve(r):n.server_.get(e).then(i=>{const s=ft(i).withIndex(e._queryParams.getIndex());pB(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Hu(n.serverSyncTree_,e._path,s);else{const a=wu(n.serverSyncTree_,e);o=ex(n.serverSyncTree_,e._path,s,a)}return Qn(n.eventQueue_,e._path,o),ZP(n.serverSyncTree_,e,t,null,!0),s},i=>(xf(n,"get for query "+rt(e)+" failed: "+i),Promise.reject(new Error(i))))}function $B(n,e,t,r,i){xf(n,"set",{path:e.toString(),value:t,priority:r});const s=Iv(n),o=ft(t,r),a=cv(n.serverSyncTree_,e),l=ix(o,a,s),c=hx(n),h=XP(n.serverSyncTree_,e,l,c,!0);cx(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(p,_)=>{const I=p==="ok";I||Jt("set at "+e+" failed: "+p);const P=hs(n.serverSyncTree_,c,!I);Qn(n.eventQueue_,e,P),WB(n,i,p,_)});const d=gx(n,e);Nf(n,d),Qn(n.eventQueue_,d,[])}function qB(n){xf(n,"onDisconnectEvents");const e=Iv(n),t=dd();Cg(n.onDisconnect_,ye(),(i,s)=>{const o=TB(i,s,n.serverSyncTree_,e);LP(t,i,o)});let r=[];Cg(t,ye(),(i,s)=>{r=r.concat(Hu(n.serverSyncTree_,i,s));const o=gx(n,i);Nf(n,o)}),n.onDisconnect_=dd(),Qn(n.eventQueue_,ye(),r)}function GB(n){n.persistentConnection_&&n.persistentConnection_.interrupt(LB)}function xf(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),xt(t,...e)}function WB(n,e,t,r){e&&Ra(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function dx(n,e,t){return cv(n.serverSyncTree_,e,t)||Z.EMPTY_NODE}function Sv(n,e=n.transactionQueueTree_){if(e||bf(n,e),ka(e)){const t=px(n,e);z(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&KB(n,Yu(e),t)}else ox(e)&&Pf(e,t=>{Sv(n,t)})}function KB(n,e,t){const r=t.map(c=>c.currentWriteId),i=dx(n,e,r);let s=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];z(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=Ft(e,h.path);s=s.updateChild(d,h.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;n.server_.put(l.toString(),a,c=>{xf(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let p=0;p<t.length;p++)t[p].status=2,h=h.concat(hs(n.serverSyncTree_,t[p].currentWriteId)),t[p].onComplete&&d.push(()=>t[p].onComplete(null,!0,t[p].currentOutputSnapshotResolved)),t[p].unwatcher();bf(n,yv(n.transactionQueueTree_,e)),Sv(n,n.transactionQueueTree_),Qn(n.eventQueue_,e,h);for(let p=0;p<d.length;p++)Ra(d[p])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{Jt("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}Nf(n,e)}},o)}function Nf(n,e){const t=fx(n,e),r=Yu(t),i=px(n,t);return HB(n,i,r),r}function HB(n,e,t){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Ft(t,l.path);let h=!1,d;if(z(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,d=l.abortReason,i=i.concat(hs(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=MB)h=!0,d="maxretry",i=i.concat(hs(n.serverSyncTree_,l.currentWriteId,!0));else{const p=dx(n,l.path,o);l.currentInputSnapshot=p;const _=e[a].update(p.val());if(_!==void 0){vv("transaction failed: Data returned ",_,l.path);let I=ft(_);typeof _=="object"&&_!=null&&Nr(_,".priority")||(I=I.updatePriority(p.getPriority()));const x=l.currentWriteId,v=Iv(n),E=ix(I,p,v);l.currentOutputSnapshotRaw=I,l.currentOutputSnapshotResolved=E,l.currentWriteId=hx(n),o.splice(o.indexOf(x),1),i=i.concat(XP(n.serverSyncTree_,l.path,E,l.currentWriteId,l.applyLocally)),i=i.concat(hs(n.serverSyncTree_,x,!0))}else h=!0,d="nodata",i=i.concat(hs(n.serverSyncTree_,l.currentWriteId,!0))}Qn(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}bf(n,n.transactionQueueTree_);for(let a=0;a<r.length;a++)Ra(r[a]);Sv(n,n.transactionQueueTree_)}function fx(n,e){let t,r=n.transactionQueueTree_;for(t=ce(e);t!==null&&ka(r)===void 0;)r=yv(r,t),e=Ce(e),t=ce(e);return r}function px(n,e){const t=[];return mx(n,e,t),t.sort((r,i)=>r.order-i.order),t}function mx(n,e,t){const r=ka(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);Pf(e,i=>{mx(n,i,t)})}function bf(n,e){const t=ka(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,sx(e,t.length>0?t:void 0)}Pf(e,r=>{bf(n,r)})}function gx(n,e){const t=Yu(fx(n,e)),r=yv(n.transactionQueueTree_,e);return AB(r,i=>{Qp(n,i)}),Qp(n,r),ax(r,i=>{Qp(n,i)}),t}function Qp(n,e){const t=ka(e);if(t){const r=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(z(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(z(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(hs(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?sx(e,void 0):t.length=s+1,Qn(n.eventQueue_,Yu(e),i);for(let o=0;o<r.length;o++)Ra(r[o])}}/**
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
 */function QB(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function YB(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Jt(`Invalid query segment '${t}' in query '${n}'`)}return e}const lS=function(n,e){const t=JB(n),r=t.namespace;t.domain==="firebase.com"&&kr(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&kr("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||uj();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new gP(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new Ae(t.pathString)}},JB=function(n){let e="",t="",r="",i="",s="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(i=QB(n.substring(h,d)));const p=YB(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const I=e.indexOf(".");r=e.substring(0,I).toLowerCase(),t=e.substring(I+1),s=r}"ns"in p&&(s=p.ns)}return{host:e,port:l,domain:t,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
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
 */class XB{constructor(e,t,r,i){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+rt(this.snapshot.exportVal())}}class ZB{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class ez{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return z(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Df{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return le(this._path)?null:AP(this._path)}get ref(){return new Xn(this._repo,this._path)}get _queryIdentifier(){const e=KT(this._queryParams),t=Jy(e);return t==="{}"?"default":t}get _queryObject(){return KT(this._queryParams)}isEqual(e){if(e=me(e),!(e instanceof Df))return!1;const t=this._repo===e._repo,r=kP(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Wj(this._path)}}class Xn extends Df{constructor(e,t){super(e,t,new Sf,!1)}get parent(){const e=RP(this._path);return e===null?null:new Xn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class oa{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new Ae(e),r=Ed(this.ref,e);return new oa(this._node.getChild(t),r,He)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new oa(i,Ed(this.ref,r),He)))}hasChild(e){const t=new Ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function wd(n,e){return n=me(n),n._checkNotDeleted("ref"),e!==void 0?Ed(n._root,e):n._root}function Ed(n,e){return n=me(n),ce(n._path)===null?NB("child","path",e):wv("child","path",e),new Xn(n._repo,it(n._path,e))}function _x(n){return Ev("remove",n._path),yx(n,null)}function yx(n,e){n=me(n),Ev("set",n._path),xB("set",e,n._path);const t=new Gd;return $B(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Av(n){n=me(n);const e=new ez(()=>{}),t=new Cv(e);return zB(n._repo,n,t).then(r=>new oa(r,new Xn(n._repo,n._path),n._queryParams.getIndex()))}class Cv{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const r=t._queryParams.getIndex();return new XB("value",this,new oa(e.snapshotNode,new Xn(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ZB(this,e,t):null}matches(e){return e instanceof Cv?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}nB(Xn);aB(Xn);/**
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
 */const tz="FIREBASE_DATABASE_EMULATOR_HOST",bg={};let nz=!1;function rz(n,e,t,r){n.repoInfo_=new gP(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),r&&(n.authTokenProvider_=r)}function vx(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||kr("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),xt("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=lS(s,i),a=o.repoInfo,l;typeof process<"u"&&PT&&(l=PT[tz]),l?(s=`http://${l}?ns=${a.namespace}`,o=lS(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new wj(n.name,n.options,e);bB("Invalid Firebase Database URL",o),le(o.path)||kr("Database URL must point to the root of a Firebase Database (not including a child path).");const h=sz(a,n,c,new vj(n.name,t));return new wx(h,n)}function iz(n,e){const t=bg[e];(!t||t[n.key]!==n)&&kr(`Database ${e}(${n.repoInfo_}) has already been deleted.`),GB(n),delete t[n.key]}function sz(n,e,t,r){let i=bg[e.name];i||(i={},bg[e.name]=i);let s=i[n.toURLString()];return s&&kr("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new FB(n,nz,t,r),i[n.toURLString()]=s,s}class wx{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(UB(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Xn(this._repo,ye())),this._rootInternal}_delete(){return this._rootInternal!==null&&(iz(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&kr("Cannot call "+e+" on a deleted database.")}}function Ex(n=Hd(),e){const t=Fs(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const r=x_("database");r&&Ix(t,...r)}return t}function Ix(n,e,t,r={}){n=me(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&kr("Cannot call useEmulator() after instance has already been initialized.");const i=n._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&kr('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new ph(ph.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:N_(r.mockUserToken,n.app.options.projectId);s=new ph(o)}rz(i,e,t,s)}/**
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
 */function oz(n){tP(Mi),wi(new Tr("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return vx(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),pn(xT,NT,n),pn(xT,NT,"esm2017")}yr.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};yr.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};oz();const Tx=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:oa,Database:wx,_QueryImpl:Df,_QueryParams:Sf,_ReferenceImpl:Xn,_repoManagerDatabaseFromApp:vx,_setSDKVersion:tP,_validatePathString:wv,_validateWritablePath:Ev,child:Ed,connectDatabaseEmulator:Ix,get:Av,getDatabase:Ex,ref:wd,remove:_x,set:yx},Symbol.toStringTag,{value:"Module"}));/**
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
 */const Sx="firebasestorage.googleapis.com",az="storageBucket",lz=2*60*1e3,uz=10*60*1e3;/**
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
 */class Zn extends Jn{constructor(e,t,r=0){super(Yp(e),`Firebase Storage: ${t} (${Yp(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Zn.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Yp(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Yn;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Yn||(Yn={}));function Yp(n){return"storage/"+n}function cz(){const n="An unknown error occurred, please check the error payload for server response.";return new Zn(Yn.UNKNOWN,n)}function hz(){return new Zn(Yn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function dz(){return new Zn(Yn.CANCELED,"User canceled the upload/download.")}function fz(n){return new Zn(Yn.INVALID_URL,"Invalid URL '"+n+"'.")}function pz(n){return new Zn(Yn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function uS(n){return new Zn(Yn.INVALID_ARGUMENT,n)}function Ax(){return new Zn(Yn.APP_DELETED,"The Firebase app was deleted.")}function mz(n){return new Zn(Yn.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
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
 */class Rn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Rn.makeFromUrl(e,t)}catch{return new Rn(e,"")}if(r.path==="")return r;throw pz(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(V){V.path.charAt(V.path.length-1)==="/"&&(V.path_=V.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(V){V.path_=decodeURIComponent(V.path)}const h="v[A-Za-z0-9_]+",d=t.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",_=new RegExp(`^https?://${d}/${h}/b/${i}/o${p}`,"i"),I={bucket:1,path:3},P=t===Sx?"(?:storage.googleapis.com|storage.cloud.google.com)":t,x="([^?#]*)",v=new RegExp(`^https?://${P}/${i}/${x}`,"i"),A=[{regex:a,indices:l,postModify:s},{regex:_,indices:I,postModify:c},{regex:v,indices:{bucket:1,path:2},postModify:c}];for(let V=0;V<A.length;V++){const F=A[V],M=F.regex.exec(e);if(M){const S=M[F.indices.bucket];let w=M[F.indices.path];w||(w=""),r=new Rn(S,w),F.postModify(r);break}}if(r==null)throw fz(e);return r}}class gz{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function _z(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function l(){return a===2}let c=!1;function h(...x){c||(c=!0,e.apply(null,x))}function d(x){i=setTimeout(()=>{i=null,n(_,l())},x)}function p(){s&&clearTimeout(s)}function _(x,...v){if(c){p();return}if(x){p(),h.call(null,x,...v);return}if(l()||o){p(),h.call(null,x,...v);return}r<64&&(r*=2);let A;a===1?(a=2,A=0):A=(r+Math.random())*1e3,d(A)}let I=!1;function P(x){I||(I=!0,p(),!c&&(i!==null?(x||(a=2),clearTimeout(i),d(0)):x||(a=1)))}return d(0),s=setTimeout(()=>{o=!0,P(!0)},t),P}function yz(n){n(!1)}/**
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
 */function vz(n){return n!==void 0}function cS(n,e,t,r){if(r<e)throw uS(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw uS(`Invalid value for '${n}'. Expected ${t} or less.`)}function wz(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var Id;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(Id||(Id={}));/**
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
 */function Ez(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
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
 */class Iz{constructor(e,t,r,i,s,o,a,l,c,h,d,p=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=d,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,I)=>{this.resolve_=_,this.reject_=I,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new $c(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===Id.NO_ERROR,l=s.getStatus();if(!a||Ez(l,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===Id.ABORT;r(!1,new $c(!1,null,h));return}const c=this.successCodes_.indexOf(l)!==-1;r(!0,new $c(c,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());vz(l)?s(l):s()}catch(l){o(l)}else if(a!==null){const l=cz();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Ax():dz();o(l)}else{const l=hz();o(l)}};this.canceled_?t(!1,new $c(!1,null,!0)):this.backoffId_=_z(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&yz(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class $c{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Tz(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Sz(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Az(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Cz(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Rz(n,e,t,r,i,s,o=!0){const a=wz(n.urlParams),l=n.url+a,c=Object.assign({},n.headers);return Az(c,e),Tz(c,t),Sz(c,s),Cz(c,r),new Iz(l,n.method,c,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
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
 */function kz(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Pz(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class Td{constructor(e,t){this._service=e,t instanceof Rn?this._location=t:this._location=Rn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Td(e,t)}get root(){const e=new Rn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Pz(this._location.path)}get storage(){return this._service}get parent(){const e=kz(this._location.path);if(e===null)return null;const t=new Rn(this._location.bucket,e);return new Td(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw mz(e)}}function hS(n,e){const t=e==null?void 0:e[az];return t==null?null:Rn.makeFromBucketSpec(t,n)}function xz(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:N_(i,n.app.options.projectId))}class Nz{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=Sx,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=lz,this._maxUploadRetryTime=uz,this._requests=new Set,i!=null?this._bucket=Rn.makeFromBucketSpec(i,this._host):this._bucket=hS(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Rn.makeFromBucketSpec(this._url,e):this._bucket=hS(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){cS("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){cS("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Td(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new gz(Ax());{const o=Rz(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const dS="@firebase/storage",fS="0.13.2";/**
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
 */const Cx="storage";function bz(n=Hd(),e){n=me(n);const r=Fs(n,Cx).getImmediate({identifier:e}),i=x_("storage");return i&&Dz(r,...i),r}function Dz(n,e,t,r={}){xz(n,e,t,r)}function Vz(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Nz(t,r,i,e,Mi)}function Oz(){wi(new Tr(Cx,Vz,"PUBLIC").setMultipleInstances(!0)),pn(dS,fS,""),pn(dS,fS,"esm2017")}Oz();const Rx={apiKey:"AIzaSyAAm1ylv5H4McTNvOut_0UdgiAFdxBBumI",authDomain:"my-app-e7f8c.firebaseapp.com",projectId:"my-app-e7f8c",storageBucket:"my-app-e7f8c.firebasestorage.app",messagingSenderId:"622104139221",appId:"1:622104139221:android:294ad10f9eed7350acd95c",databaseURL:"https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app"},Dg="bangexx01@gmail.com",Ju=qA(Rx),Kn=AL(Ju),Pr=bk(Ju),Sd=Ex(Ju),Lz=bz(Ju),Rv=Object.freeze(Object.defineProperty({__proto__:null,PEMILIK:Dg,app:Ju,auth:Kn,db:Pr,firebaseConfig:Rx,rtdb:Sd,storage:Lz},Symbol.toStringTag,{value:"Module"})),kx=[{grup:"",isi:[["dashboard","dashboard","Dashboard"]]},{grup:"KELOLA",isi:[["user","group","User"],["room","mic","Room"],["staf","badge","Staf & seller"],["cs","support_agent","Customer Service"],["laporan","flag","Laporan user"],["wallet","paid","Coin & reset"],["cekin","event_available","Cek in harian"],["vipharga","workspace_premium","Harga VIP"],["family","diversity_3","Family"]]},{grup:"GAMING",isi:[["katalog","sports_esports","Katalog game"],["pasang","link","Pasang game"],["bet","casino","Bet game"],["greedy","toll","Greedy King"],["fruit","nutrition","Crazy Fruit"],["roket","rocket_launch","Hadiah roket"],["reward","emoji_events","Reward room"]]},{grup:"ENGAGEMENT",isi:[["gift","redeem","Gift"],["cashback","savings","Cashback gift"],["emote","mood","Reaction (emote)"],["kirim","send","Kirim ke user"]]},{grup:"CONTENT MANAGEMENT",isi:[["frame","image","Frame & banner"],["aset","auto_awesome","Aset & VIP"],["asetvps","folder_open","Aset di VPS"],["latar","wallpaper","Background tab"],["pengumuman","campaign","Pengumuman resmi"]]},{grup:"DATA",isi:[["database","storage","Database"],["log","history","Log admin"]]},{grup:"CONFIG",isi:[["pengaturan","settings","Pengaturan"]]}],Mz=kx.flatMap(n=>n.isi).reduce((n,[e,,t])=>({...n,[e]:t}),{}),Fz="modulepreload",Uz=function(n,e){return new URL(n,e).href},pS={},Di=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=Uz(c,r),c in pS)return;pS[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!r)for(let I=o.length-1;I>=0;I--){const P=o[I];if(P.href===c&&(!h||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":Fz,h||(_.as="script"),_.crossOrigin="",_.href=c,l&&_.setAttribute("nonce",l),document.head.appendChild(_),h)return new Promise((I,P)=>{_.addEventListener("load",I),_.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},jz=45e3,ds=new Map;async function Px(n,e){return(await Ky($y(mf(Pr,n),qy(e)))).docs.map(r=>({id:r.id,...r.data()}))}function mS(n,e=500){const t=n+"|"+e,r=ds.get(t);if(r!=null&&r.janji)return r.janji;if(r&&Date.now()-r.waktu<jz)return Promise.resolve(r.isi);const i=Px(n,e).then(s=>(ds.set(t,{isi:s,waktu:Date.now(),janji:null}),s)).catch(()=>r?r.isi:[]);return ds.set(t,{isi:(r==null?void 0:r.isi)||[],waktu:(r==null?void 0:r.waktu)||0,janji:i}),i}function Tn(n,e=500){const t=n+"|"+e,[r,i]=X.useState(()=>{var a;return((a=ds.get(t))==null?void 0:a.isi)||[]}),[s,o]=X.useState(!ds.get(t));return X.useEffect(()=>{var l;let a=!0;return o(!((l=ds.get(t))!=null&&l.waktu)),mS(n,e).then(c=>{a&&(i(c),o(!1))}),()=>{a=!1}},[n,e]),{isi:r,memuat:s,segarkan:()=>(ds.delete(t),mS(n,e))}}const Ne=n=>new Intl.NumberFormat("id-ID").format(Number(n)||0),Ll=n=>{if(!n)return"—";const e=n.toDate?n.toDate():new Date(n);return isNaN(e)?"—":e.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})};async function _s(n,e=""){var t;try{const{addDoc:r,serverTimestamp:i}=await Di(async()=>{const{addDoc:o,serverTimestamp:a}=await Promise.resolve().then(()=>Yy);return{addDoc:o,serverTimestamp:a}},void 0,import.meta.url),{auth:s}=await Di(async()=>{const{auth:o}=await Promise.resolve().then(()=>Rv);return{auth:o}},void 0,import.meta.url);await r(mf(Pr,"adminLogs"),{admin:((t=s.currentUser)==null?void 0:t.email)||"?",aksi:n,rincian:e,waktu:i()})}catch{}}async function Jp(n,e){const t=await Wy(Bs(Pr,n,e)).catch(()=>null);return t!=null&&t.exists()?t.data():null}async function kv(n,e){const{deleteDoc:t}=await Di(async()=>{const{deleteDoc:r}=await Promise.resolve().then(()=>Yy);return{deleteDoc:r}},void 0,import.meta.url);await t(Bs(Pr,n,e))}async function Bz(n,e,t){const{setDoc:r}=await Di(async()=>{const{setDoc:i}=await Promise.resolve().then(()=>Yy);return{setDoc:i}},void 0,import.meta.url);await r(Bs(Pr,n,e),t)}async function gS(n){const{getDatabase:e,ref:t,get:r}=await Di(async()=>{const{getDatabase:o,ref:a,get:l}=await Promise.resolve().then(()=>Tx);return{getDatabase:o,ref:a,get:l}},void 0,import.meta.url),{app:i}=await Di(async()=>{const{app:o}=await Promise.resolve().then(()=>Rv);return{app:o}},void 0,import.meta.url),s=await r(t(e(i),n));return s.exists()?s.val():null}async function Xp(n,e){const{getDatabase:t,ref:r,set:i}=await Di(async()=>{const{getDatabase:o,ref:a,set:l}=await Promise.resolve().then(()=>Tx);return{getDatabase:o,ref:a,set:l}},void 0,import.meta.url),{app:s}=await Di(async()=>{const{app:o}=await Promise.resolve().then(()=>Rv);return{app:o}},void 0,import.meta.url);await i(r(t(s),n),e)}function zz({sumber:n,hari:e,satuan:t}){const r=X.useMemo(()=>{const l=new Date;l.setHours(0,0,0,0);const c=[];for(let h=e-1;h>=0;h--){const d=new Date(l.getTime()-h*864e5),p=new Date(d.getTime()+864e5);c.push({label:d.getDate()+"/"+(d.getMonth()+1),n:n.filter(_=>_>=d.getTime()&&_<p.getTime()).length})}return c},[n,e]),i=r.reduce((l,c)=>l+c.n,0),s=Math.max(1,...r.map(l=>l.n));if(!i)return g.jsx("div",{className:"kosong",children:"Belum ada data untuk rentang ini."});const o=200,a=100/r.length;return g.jsxs(g.Fragment,{children:[g.jsxs("div",{style:{color:"#9a9cab",fontSize:12,padding:"0 4px 8px"},children:[i," ",t," · puncak ",s]}),g.jsxs("svg",{viewBox:"0 0 100 "+(o+28),preserveAspectRatio:"none",style:{width:"100%",height:240,display:"block"},children:[g.jsx("defs",{children:g.jsxs("linearGradient",{id:"gradBatang",x1:"0",y1:"0",x2:"0",y2:"1",children:[g.jsx("stop",{offset:"0%",stopColor:"#e8538f"}),g.jsx("stop",{offset:"100%",stopColor:"#83d8ae"})]})}),r.map((l,c)=>{const h=Math.max(2,Math.round(l.n/s*o));return g.jsxs("g",{children:[g.jsx("rect",{x:c*a+a*.18+"%",y:o-h,width:a*.64+"%",height:h,rx:"2",fill:"url(#gradBatang)"}),g.jsx("text",{x:(c+.5)*a+"%",y:o+16,fill:"#9a9cab",fontSize:"10",textAnchor:"middle",children:l.label}),l.n>0&&g.jsx("text",{x:(c+.5)*a+"%",y:o-h-6,fill:"#d1d3e0",fontSize:"10",textAnchor:"middle",children:l.n})]},l.label+c)})]})]})}function $z(){const[n,e]=X.useState(7),t=Tn("userIds",500),r=Tn("rooms",500),i=Tn("gifts",200),s=Tn("banned",200),o=Tn("userReports",300),a=Tn("adminLogs",400),l=t.isi.filter(v=>Number(v.vip||0)>0).length,c=new Set(s.isi.map(v=>v.id||v.uid)).size,h=r.isi.filter(v=>v.locked).length,d=[["people_alt",Ne(t.isi.length),"Total user"],["workspace_premium",Ne(l),"Total user VIP"],["group_off",Ne(c),"User diblokir"],["mic",Ne(r.isi.length),"Total room"],["lock",Ne(h),"Room terkunci"],["flag",Ne(o.isi.length),"Laporan user"],["redeem",Ne(i.isi.length),"Gift aktif"],["bolt",String(a.isi.length),"Catatan admin"]],p=a.isi.map(v=>{var E;return Number(((E=v.waktu)==null?void 0:E.seconds)||0)*1e3}).filter(v=>v>0),_=t.isi.map(v=>Number(v.createdAt||v.dibuat||0)).filter(v=>v>0),I=p.length>=_.length,P=I?p:_,x=[...a.isi].sort((v,E)=>{var A,V;return(((A=E.waktu)==null?void 0:A.seconds)||0)-(((V=v.waktu)==null?void 0:V.seconds)||0)}).slice(0,12);return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"kartu",children:g.jsx("div",{className:"dasborKartu",children:d.map(([v,E,A])=>g.jsxs("div",{className:"kartuAngka",children:[g.jsx("div",{className:"ikonKartu",children:v}),g.jsxs("div",{children:[g.jsx("b",{children:E}),g.jsx("span",{children:A})]})]},A))})}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsxs("h3",{children:[I?"Aktivitas admin ":"Pendaftaran user ",n," hari terakhir"]}),g.jsx("div",{className:"filter",children:[7,30].map(v=>g.jsxs("div",{className:"pil"+(n===v?" on":""),onClick:()=>e(v),children:[v," hari"]},v))})]}),g.jsx("div",{style:{padding:"6px 4px 0"},children:g.jsx(zz,{sumber:P,hari:n,satuan:I?"catatan":"user"})})]}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsx("h3",{children:"Aktivitas admin terakhir"}),g.jsx("div",{className:"filter",children:g.jsxs("div",{className:"pil on",children:[a.isi.length," catatan"]})})]}),x.length?g.jsxs("table",{children:[g.jsx("thead",{children:g.jsxs("tr",{children:[g.jsx("th",{children:"WAKTU"}),g.jsx("th",{children:"ADMIN"}),g.jsx("th",{children:"AKSI"}),g.jsx("th",{children:"RINCIAN"})]})}),g.jsx("tbody",{children:x.map((v,E)=>g.jsxs("tr",{children:[g.jsx("td",{children:Ll(v.waktu)}),g.jsx("td",{children:v.admin}),g.jsx("td",{children:v.aksi}),g.jsx("td",{children:v.rincian})]},E))})]}):g.jsx("div",{className:"kosong",children:"Belum ada aktivitas tercatat."})]}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsx("h3",{children:"Room terbaru"}),g.jsx("div",{className:"filter",children:g.jsx("div",{className:"pil on",children:g.jsx("a",{href:"#room",children:"Lihat semua"})})})]}),r.isi.length?g.jsxs("table",{children:[g.jsx("thead",{children:g.jsxs("tr",{children:[g.jsx("th",{children:"ROOM"}),g.jsx("th",{children:"PEMILIK"}),g.jsx("th",{children:"KUNCI"})]})}),g.jsx("tbody",{children:r.isi.slice(0,8).map(v=>g.jsxs("tr",{children:[g.jsx("td",{children:v.name||v.title||v.id}),g.jsxs("td",{children:[String(v.ownerUid||"").slice(0,10),"…"]}),g.jsx("td",{children:v.locked?g.jsx("span",{className:"tag blokir",children:"terkunci"}):g.jsx("span",{className:"tag aktif",children:"terbuka"})})]},v.id))})]}):g.jsx("div",{className:"kosong",children:"Belum ada room."})]})]})}const Vg="viza-toast";function tn(n,e=!1){window.dispatchEvent(new CustomEvent(Vg,{detail:{pesan:n,gagal:e}}))}function qz(){const[n,e]=X.useState(null);return X.useEffect(()=>{let t;const r=i=>{e(i.detail),clearTimeout(t),t=setTimeout(()=>e(null),3600)};return window.addEventListener(Vg,r),()=>{window.removeEventListener(Vg,r),clearTimeout(t)}},[]),n?g.jsx("div",{className:"toast tampil"+(n.gagal?" gagal":""),children:n.pesan}):null}const Pv=({isi:n})=>g.jsx("div",{className:"kartu",children:n.map(([e,t])=>g.jsxs("div",{className:"stat",children:[g.jsx("b",{children:e}),g.jsx("span",{children:t})]},t))}),Ad=({judul:n,sub:e,aksi:t,kaki:r,children:i})=>g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsxs("h3",{children:[n,e?g.jsxs("span",{className:"sub",children:[" ",e]}):null]}),t?g.jsx("div",{className:"filter",children:t}):null]}),i,r?g.jsx("div",{className:"kaki",children:r}):null]}),xx=({on:n,onClick:e,children:t})=>g.jsx("div",{className:"pil"+(n?" on":""),onClick:e,children:t}),Fn=({jenis:n="aktif",children:e})=>g.jsx("span",{className:"tag "+n,children:e}),xv=({children:n})=>g.jsx("div",{className:"kosong",children:n}),Nv=({nilai:n,onUbah:e,placeholder:t})=>g.jsxs("label",{className:"kotakCari",children:[g.jsx("span",{children:"⌕"}),g.jsx("input",{value:n,onChange:r=>e(r.target.value),placeholder:t}),n?g.jsx("button",{type:"button",onClick:()=>e(""),title:"Bersihkan",children:"×"}):null]});function Gz({buka:n,judul:e,onTutup:t,children:r,kaki:i}){return X.useEffect(()=>{if(!n)return;const s=o=>o.key==="Escape"&&t();return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[n,t]),n?g.jsx("div",{className:"laciLatar",onClick:t,children:g.jsxs("div",{className:"laci",onClick:s=>s.stopPropagation(),children:[g.jsxs("div",{className:"laciAtas",children:[g.jsx("h3",{children:e}),g.jsx("button",{onClick:t,title:"Tutup",children:"×"})]}),g.jsx("div",{className:"laciIsi",children:r}),i?g.jsx("div",{className:"laciKaki",children:i}):null]})}):null}function Vf({buka:n,judul:e,pesan:t,tombol:r="Lanjut",onYa:i,onTidak:s,sibuk:o}){return n?g.jsx("div",{className:"laciLatar",onClick:s,children:g.jsxs("div",{className:"kotakKonfirmasi",onClick:a=>a.stopPropagation(),children:[g.jsx("h3",{children:e}),g.jsx("p",{children:t}),g.jsxs("div",{className:"barisTombol",children:[g.jsx("button",{className:"polos",onClick:s,disabled:o,children:"Batal"}),g.jsx("button",{className:"utama",onClick:i,disabled:o,children:o?"Memproses…":r})]})]})}):null}const aa=({baris:n=6})=>g.jsx("div",{style:{padding:14},children:Array.from({length:n}).map((e,t)=>g.jsx("div",{className:"rangka",style:{width:100-t%3*12+"%"}},t))});function Cd({kolom:n,baris:e,urut:t,onUrut:r,kosong:i="Tidak ada data."}){const[s,o]=t||[null,1],a=l=>s===l?o===1?" ▲":" ▼":"";return e.length?g.jsx("div",{className:"bungkusTabel",children:g.jsxs("table",{children:[g.jsx("thead",{children:g.jsx("tr",{children:n.map(l=>g.jsxs("th",{onClick:l.urut&&r?()=>r(l.kunci):void 0,style:l.urut?{cursor:"pointer"}:void 0,children:[l.label,l.urut?a(l.kunci):""]},l.kunci))})}),g.jsx("tbody",{children:e.map((l,c)=>g.jsx("tr",{children:n.map(h=>g.jsx("td",{children:h.sel(l)},h.kunci))},l.__kunci??c))})]})}):g.jsx(xv,{children:i})}function Rd(n,e=null){const[t,r]=X.useState(e);return[X.useMemo(()=>{if(!t)return n;const[o,a]=t;return[...n].sort((l,c)=>{const h=l[o],d=c[o];return typeof h=="number"||typeof d=="number"?((Number(h)||0)-(Number(d)||0))*a:String(h??"").localeCompare(String(d??""),"id")*a})},[n,t]),t,o=>r(a=>a&&a[0]===o?[o,-a[1]]:[o,1])]}function Wz(){var M,S,w,C,k,T,N,R,Vt,Vn;const n=Tn("userIds",500),e=Tn("banned",300),[t,r]=X.useState(""),[i,s]=X.useState("semua"),[o,a]=X.useState(null),[l,c]=X.useState(null),[h,d]=X.useState(null),[p,_]=X.useState(!1),I=X.useMemo(()=>new Set(e.isi.map(Y=>Y.id)),[e.isi]),P=X.useMemo(()=>{const Y=t.trim().toLowerCase();return n.isi.map(fe=>{const G=fe.uid||fe.id;return{__kunci:G,uid:G,nama:fe.name||fe.nama||"(tanpa nama)",foto:fe.avatar||fe.photo||"",vip:Number(fe.vip||0),koin:Number(fe.coins??fe.coin??0),dibuat:Number(fe.createdAt||fe.dibuat||0),blok:I.has(fe.id)||I.has(G)}}).filter(fe=>Y&&!fe.nama.toLowerCase().includes(Y)&&!fe.uid.toLowerCase().includes(Y)?!1:i==="aktif"?!fe.blok:i==="blokir"?fe.blok:i==="vip"?fe.vip>0:!0)},[n.isi,I,t,i]),[x,v,E]=Rd(P,["nama",1]),A=async Y=>{a(Y),c(null);const[fe,G,te]=await Promise.all([Jp("users",Y.uid),Jp("wallets",Y.uid),Jp("banned",Y.uid)]);c({profil:fe,dompet:G,ban:te})},V=Y=>{d({judul:Y.blok?"Buka blokir "+Y.nama+"?":"Blokir "+Y.nama+"?",pesan:Y.blok?"User bisa memakai aplikasi Viza lagi setelah dibuka.":"User tidak bisa memakai aplikasi sampai blokirnya dibuka.",tombol:Y.blok?"Buka blokir":"Blokir",jalan:async()=>{var fe;_(!0);try{Y.blok?(await kv("banned",Y.uid),await _s("Buka blokir",`${Y.nama} · ${Y.uid}`),tn(`${Y.nama} dibuka blokirnya`)):(await Bz("banned",Y.uid,{uid:Y.uid,nama:Y.nama,alasan:"diblokir admin panel",oleh:((fe=Kn.currentUser)==null?void 0:fe.email)||"?",waktu:new Date}),await _s("Blokir user",`${Y.nama} · ${Y.uid}`),tn(`${Y.nama} diblokir`)),await e.segarkan(),d(null),a(null)}catch(G){tn("Gagal: "+(G.code||G.message),!0)}finally{_(!1)}}})},F=[{kunci:"nama",label:"USER",urut:!0,sel:Y=>g.jsxs("div",{className:"user",children:[g.jsx("div",{className:"mini",children:Y.foto?g.jsx("img",{src:Y.foto,alt:""}):(Y.nama[0]||"?").toUpperCase()}),g.jsxs("div",{children:[g.jsx("div",{children:Y.nama}),g.jsx("div",{className:"catatan",style:{padding:0,marginTop:2},children:Y.vip?"VIP "+Y.vip:"gratis"})]})]})},{kunci:"uid",label:"UID",sel:Y=>g.jsxs("span",{title:Y.uid,children:[Y.uid.slice(0,14),"…"]})},{kunci:"koin",label:"KOIN",urut:!0,sel:Y=>Ne(Y.koin)},{kunci:"dibuat",label:"TERDAFTAR",urut:!0,sel:Y=>Y.dibuat?Ll(Y.dibuat):"—"},{kunci:"blok",label:"STATUS",sel:Y=>Y.blok?g.jsx(Fn,{jenis:"blokir",children:"diblokir"}):g.jsx(Fn,{children:"aktif"})},{kunci:"aksi",label:"AKSI",sel:Y=>g.jsxs("span",{className:"aksiBaris",children:[g.jsx("button",{className:"aksi",onClick:()=>A(Y),children:"Detail"}),g.jsx("button",{className:"aksi",onClick:()=>V(Y),children:Y.blok?"Buka blokir":"Blokir"})]})}];return g.jsxs(g.Fragment,{children:[g.jsx(Pv,{isi:[[Ne(n.isi.length),"User terdaftar"],[Ne(n.isi.length-P.filter(Y=>Y.blok).length),"Tidak diblokir"],[Ne(I.size),"Diblokir"],[Ne(n.isi.filter(Y=>Number(Y.vip||0)>0).length),"User VIP"]]}),g.jsxs(Ad,{judul:"Daftar user",aksi:g.jsx(Nv,{nilai:t,onUbah:r,placeholder:"Cari nama atau UID…"}),kaki:`${P.length} user ditampilkan dari ${n.isi.length} terdaftar`,children:[g.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["aktif","Aktif"],["vip","VIP"],["blokir","Diblokir"]].map(([Y,fe])=>g.jsx(xx,{on:i===Y,onClick:()=>s(Y),children:fe},Y))}),n.memuat&&!n.isi.length?g.jsx(aa,{}):g.jsx(Cd,{kolom:F,baris:x,urut:v,onUrut:E,kosong:"Tidak ada user yang cocok."})]}),g.jsx(Gz,{buka:!!o,judul:o?"Detail "+o.nama:"",onTutup:()=>{a(null),c(null)},kaki:o?g.jsx(g.Fragment,{children:g.jsx("button",{className:"polos",onClick:()=>V(o),children:o.blok?"Buka blokir":"Blokir user"})}):null,children:l?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"petak",style:{padding:0,marginBottom:12},children:[g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:Ne(((M=l.dompet)==null?void 0:M.coins)??((S=l.profil)==null?void 0:S.coins)??0)}),g.jsx("span",{children:"Koin dompet"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:(w=l.profil)!=null&&w.vip?"VIP "+l.profil.vip:"Gratis"}),g.jsx("span",{children:"Paket"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:l.ban?"Diblokir":"Aktif"}),g.jsx("span",{children:"Status"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:((C=l.profil)==null?void 0:C.level)??"—"}),g.jsx("span",{children:"Level"})]})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"UID"}),g.jsx("b",{children:o.uid})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Nama"}),g.jsx("b",{children:((k=l.profil)==null?void 0:k.name)||o.nama})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Email"}),g.jsx("b",{children:((T=l.profil)==null?void 0:T.email)||"—"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Vip sampai"}),g.jsx("b",{children:(N=l.profil)!=null&&N.vipUntil?Ll(l.profil.vipUntil):"—"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Fans"}),g.jsx("b",{children:Ne(((R=l.profil)==null?void 0:R.fans)??0)})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Mengikuti"}),g.jsx("b",{children:Ne(((Vt=l.profil)==null?void 0:Vt.following)??0)})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Dompet terakhir"}),g.jsx("b",{children:(Vn=l.dompet)!=null&&Vn.updatedAt?Ll(l.dompet.updatedAt):"—"})]}),l.ban?g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Alasan blokir"}),g.jsx("b",{children:l.ban.alasan||"—"})]}):null,g.jsx("div",{className:"catatan",style:{marginTop:12},children:"Detail dibaca dari users, wallets, dan banned. Untuk mengubah angka, buka menu Database."})]}):g.jsx(aa,{baris:4})}),g.jsx(Vf,{buka:!!h,judul:h==null?void 0:h.judul,pesan:h==null?void 0:h.pesan,tombol:h==null?void 0:h.tombol,sibuk:p,onYa:()=>h==null?void 0:h.jalan(),onTidak:()=>d(null)})]})}const Kz="https://viza.43-156-99-4.sslip.io/admin",Hz="sb_publishable_4PxD2LedOsBgIJyHLkM47A_bImSQI2W",Qz=["coin_all","reset_all","reset_gem_all","reset_all_assets","delete_users","manual_pending","manual_all","pay_get","pay_set"];async function _S(n,e=15e3){const t=Kn.currentUser;if(!t)throw new Error("Belum login");Qz.includes(n.op)&&!n.uid&&(n={...n,uid:"-"});const r=await t.getIdToken(),i=new AbortController,s=setTimeout(()=>i.abort(),e);try{const o=await fetch(Kz,{method:"POST",headers:{"Content-Type":"application/json",apikey:Hz},body:JSON.stringify({a:"admin",t:r,p:n}),signal:i.signal}),a=await o.text();if(!o.ok)throw new Error(a.slice(0,160)||"HTTP "+o.status);return a?JSON.parse(a):{}}finally{clearTimeout(s)}}function Yz(){const n=Tn("rooms",500),[e,t]=X.useState(null),[r,i]=X.useState({}),[s,o]=X.useState(""),[a,l]=X.useState(""),[c,h]=X.useState(null),[d,p]=X.useState(!1),_=async()=>{try{const[T,N]=await Promise.all([gS("roomsPub"),gS("officialRooms").catch(()=>null)]);t(T||{}),i(N||{}),o("")}catch(T){o(T.message||String(T)),t({})}};X.useEffect(()=>{_()},[]);const I=X.useMemo(()=>{const T=a.trim().toLowerCase();return Object.entries(e||{}).map(([N,R])=>({__kunci:N,id:N,...R})).filter(N=>!T||String(N.name||"").toLowerCase().includes(T)||N.id.toLowerCase().includes(T)).sort((N,R)=>(Number(R.pinned)||0)-(Number(N.pinned)||0)||(Number(R.createdAt)||0)-(Number(N.createdAt)||0))},[e,a]),P=X.useMemo(()=>{const T=a.trim().toLowerCase();return n.isi.map(N=>({__kunci:N.id,id:N.id,nama:N.name||N.title||"(tanpa nama)",pemilik:N.ownerUid||"",locked:!!N.locked})).filter(N=>!T||N.nama.toLowerCase().includes(T)||N.id.toLowerCase().includes(T))},[n.isi,a]),[x,v,E]=Rd(I),[A,V,F]=Rd(P,["nama",1]),M=T=>{const N=!T.pinned;h({judul:N?"Sematkan "+(T.name||T.id)+"?":"Lepas semat "+(T.name||T.id)+"?",pesan:N?"Room tampil paling atas di daftar room aplikasi.":"Room kembali ke urutan biasa.",tombol:N?"Sematkan":"Lepas",jalan:async()=>{p(!0);try{try{await Xp(`roomsPub/${T.id}/pinned`,N),await Xp(`roomsPub/${T.id}/pinnedAt`,N?Date.now():0)}catch{await _S({op:"room_pin",uid:T.id,nilai:N?1:0})}await _s(N?"Sematkan room":"Lepas semat room",T.id),tn(N?"Room disematkan paling atas":"Semat dilepas"),await _(),h(null)}catch(R){tn("Gagal: "+(R.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},S=T=>{const N=!r[T.id];h({judul:N?"Tag official "+(T.name||T.id)+"?":"Lepas tag official?",pesan:N?"Room mendapat tanda resmi di foto room dan daftar room.":"Tanda resmi dilepas.",tombol:N?"Pasang":"Lepas",jalan:async()=>{p(!0);try{try{await Xp(`officialRooms/${T.id}`,N?!0:null)}catch{await _S({op:"room_official",uid:T.id,nilai:N?1:0})}await _s(N?"Tag official":"Lepas official",T.id),tn(N?"Tag official dipasang":"Tag official dilepas"),await _(),h(null)}catch(R){tn("Gagal: "+(R.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},w=T=>h({judul:"Tutup room "+T.nama+"?",pesan:"Room dihapus dari daftar dan langsung hilang di aplikasi. Tindakan ini tidak bisa dibatalkan.",tombol:"Tutup room",jalan:async()=>{p(!0);try{await kv("rooms",T.id),await _s("Tutup room",T.id),tn("Room ditutup"),await n.segarkan(),h(null)}catch(N){tn("Gagal: "+(N.code||N.message),!0)}finally{p(!1)}}}),C=[{kunci:"name",label:"ROOM",urut:!0,sel:T=>g.jsxs("div",{children:[g.jsxs("div",{children:[r[T.id]?"✅ ":"",T.name||"(tanpa nama)"]}),g.jsxs("div",{className:"catatan",style:{padding:0,marginTop:2},children:[String(T.id).slice(0,14),"…"]})]})},{kunci:"ownerName",label:"PEMILIK",urut:!0,sel:T=>String(T.ownerName||T.ownerUid||"—").slice(0,14)},{kunci:"members",label:"PESERTA",urut:!0,sel:T=>Ne(T.members||0)},{kunci:"pinned",label:"ATURAN",urut:!0,sel:T=>g.jsxs(g.Fragment,{children:[T.pinned?g.jsx(Fn,{children:"disematkan"}):g.jsx(Fn,{jenis:"",children:"biasa"})," ",r[T.id]?g.jsx(Fn,{children:"official"}):null]})},{kunci:"aksi",label:"AKSI",sel:T=>g.jsxs("span",{className:"aksiBaris",children:[g.jsx("button",{className:"aksi",onClick:()=>M(T),children:T.pinned?"Lepas semat":"Sematkan"}),g.jsx("button",{className:"aksi",onClick:()=>S(T),children:r[T.id]?"Lepas official":"Tag official"})]})}],k=[{kunci:"nama",label:"NAMA",urut:!0,sel:T=>T.nama},{kunci:"id",label:"ID ROOM",sel:T=>String(T.id).slice(0,12)+"…"},{kunci:"pemilik",label:"PEMILIK",sel:T=>String(T.pemilik||"—").slice(0,12)},{kunci:"locked",label:"KUNCI",sel:T=>T.locked?g.jsx(Fn,{jenis:"blokir",children:"terkunci"}):g.jsx(Fn,{children:"terbuka"})},{kunci:"aksi",label:"AKSI",sel:T=>g.jsx("button",{className:"aksi",onClick:()=>w(T),children:"Tutup room"})}];return g.jsxs(g.Fragment,{children:[g.jsx(Pv,{isi:[[Ne(I.length),"Room party (RTDB)"],[Ne(n.isi.length),"Room Firestore"],[Ne(n.isi.filter(T=>!T.locked).length),"Terbuka"],[Ne(n.isi.filter(T=>T.locked).length),"Terkunci"]]}),g.jsx(Ad,{judul:"Room party",sub:"· sematkan dan beri tag official",aksi:g.jsx(Nv,{nilai:a,onUbah:l,placeholder:"Cari nama atau ID room…"}),children:s?g.jsxs(xv,{children:["Gagal memuat roomsPub: ",s]}):e===null?g.jsx(aa,{}):g.jsx(Cd,{kolom:C,baris:x,urut:v,onUrut:E,kosong:"Belum ada room party di Realtime Database."})}),g.jsx(Ad,{judul:"Daftar room (Firestore)",children:n.memuat&&!n.isi.length?g.jsx(aa,{baris:4}):g.jsx(Cd,{kolom:k,baris:A,urut:V,onUrut:F,kosong:"Belum ada room."})}),g.jsx(Vf,{buka:!!c,judul:c==null?void 0:c.judul,pesan:c==null?void 0:c.pesan,tombol:c==null?void 0:c.tombol,sibuk:d,onYa:()=>c==null?void 0:c.jalan(),onTidak:()=>h(null)})]})}function Jz(){const n=Tn("gifts",300),[e,t]=X.useState(""),[r,i]=X.useState("semua"),[s,o]=X.useState(null),[a,l]=X.useState(!1),c=X.useMemo(()=>{const x=e.trim().toLowerCase();return n.isi.map(v=>({__kunci:v.id,id:v.id,nama:v.name||v.id,ikon:v.icon||"",emoji:v.emoji||"🎁",harga:Number(v.price||0),media:v.mediaUrl||"",tipe:v.mediaType||"",cashback:!!v.cashback,special:!!v.special,rocket:!!v.rocket})).filter(v=>x&&!v.nama.toLowerCase().includes(x)?!1:r==="video"?/mp4|video/i.test(v.tipe)||/\.mp4$/i.test(v.media):r==="svga"?/svga/i.test(v.tipe)||/\.svga$/i.test(v.media):r==="cashback"?v.cashback:!0)},[n.isi,e,r]),[h,d,p]=Rd(c,["harga",-1]),_=x=>o({judul:"Hapus "+x.nama+"?",pesan:"Gift hilang dari katalog dan tidak bisa dikirim lagi. Tindakan ini tidak bisa dibatalkan.",tombol:"Hapus gift",jalan:async()=>{l(!0);try{await kv("gifts",x.id),await _s("Hapus gift",x.id),tn(x.nama+" dihapus"),await n.segarkan(),o(null)}catch(v){tn("Gagal: "+(v.code||v.message),!0)}finally{l(!1)}}}),I=[{kunci:"nama",label:"GIFT",urut:!0,sel:x=>g.jsxs("div",{className:"user",children:[g.jsx("div",{className:"mini",children:x.ikon?g.jsx("img",{src:x.ikon,alt:"",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}):x.emoji}),g.jsx("div",{children:x.nama})]})},{kunci:"harga",label:"HARGA",urut:!0,sel:x=>Ne(x.harga)+" koin"},{kunci:"media",label:"MEDIA",sel:x=>x.media?g.jsx("a",{className:"aksi",href:x.media,target:"_blank",rel:"noopener",children:x.tipe||"tautan"}):"—"},{kunci:"tambahan",label:"TAMBAHAN",sel:x=>g.jsxs(g.Fragment,{children:[x.special?g.jsx(Fn,{children:"special"}):null,x.rocket?g.jsx(Fn,{children:"rocket"}):null,x.cashback?g.jsx(Fn,{children:"cashback"}):null,!x.special&&!x.rocket&&!x.cashback?"—":null]})},{kunci:"aksi",label:"AKSI",sel:x=>g.jsx("button",{className:"aksi",onClick:()=>_(x),children:"Hapus"})}],P=n.isi.filter(x=>/mp4|video/i.test(x.mediaType||"")||/\.mp4$/i.test(x.mediaUrl||"")).length;return g.jsxs(g.Fragment,{children:[g.jsx(Pv,{isi:[[Ne(n.isi.length),"Item katalog"],[Ne(P),"Gift video MP4"],[Ne(n.isi.filter(x=>x.cashback).length),"Gift cashback"],[Ne(Math.max(0,...n.isi.map(x=>Number(x.price||0)))),"Harga tertinggi"]]}),g.jsxs(Ad,{judul:"Katalog gift",sub:"· dibaca aplikasi dari koleksi gifts",aksi:g.jsx(Nv,{nilai:e,onUbah:t,placeholder:"Cari nama gift…"}),kaki:`${c.length} item ditampilkan dari ${n.isi.length}`,children:[g.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["video","Video MP4"],["svga","SVGA"],["cashback","Cashback"]].map(([x,v])=>g.jsx(xx,{on:r===x,onClick:()=>i(x),children:v},x))}),n.memuat&&!n.isi.length?g.jsx(aa,{}):g.jsx(Cd,{kolom:I,baris:h,urut:d,onUrut:p,kosong:"Belum ada gift. Tambah lewat panel lama dulu."}),g.jsx("div",{className:"catatan",style:{padding:"0 14px 14px"},children:"Menambah dan mengubah berkas gift masih di panel lama (#gift). Di sini sudah bisa mencari, menyaring, dan menghapus."})]}),g.jsx(Vf,{buka:!!s,judul:s==null?void 0:s.judul,pesan:s==null?void 0:s.pesan,tombol:s==null?void 0:s.tombol,sibuk:a,onYa:()=>s==null?void 0:s.jalan(),onTidak:()=>o(null)})]})}const Xz=n=>String(n).replace(/[.#$\[\]/]/g,"_");async function Zz(){const n=new Map,e=(t,r)=>{const i=String(t.id||r||"");i&&n.set(i,{...n.get(i)||{},...t,id:i})};try{(await Px("vipConfig",400)).forEach(t=>e(t,t.id))}catch{}try{const t=await Av(wd(Sd,"vipCfg"));t.exists()&&t.forEach(r=>e(r.val()||{},r.key))}catch{}return[...n.values()].filter(t=>String(t.slot||"")==="emote").sort((t,r)=>(Number(t.order)||0)-(Number(r.order)||0)||String(t.name||"").localeCompare(String(r.name||"")))}async function e3(n){try{await Ig(Bs(Pr,"vipConfig",n))}catch{}try{const e=await Ky($y(mf(Pr,"vipConfig"),qy(500)));for(const t of e.docs)t.id!==n&&(t.data()||{}).id!==n||await Ig(t.ref).catch(()=>{})}catch{}try{const e=await Av(wd(Sd,"vipCfg"));if(e.exists()){const t=[];e.forEach(r=>{(r.key===Xz(n)||(r.val()||{}).id===n)&&t.push(_x(wd(Sd,"vipCfg/"+r.key)))}),await Promise.all(t)}}catch{}}function t3(){const[n,e]=X.useState(null),[t,r]=X.useState(null),[i,s]=X.useState(!1),o=()=>Zz().then(e).catch(()=>e([]));X.useEffect(()=>{o()},[]);const a=async()=>{s(!0);try{await e3(t.id),await _s("Hapus emote",t.id),tn("Emote dihapus"),r(null),await o()}catch(l){tn("Gagal menghapus: "+(l.message||""),!0)}finally{s(!1)}};return g.jsxs(g.Fragment,{children:[g.jsxs("a",{className:"tombolBaru",href:"../panel/admin/#emote",children:[g.jsx("span",{className:"material-icons",style:{fontSize:20},children:"add"})," New"]}),n===null?g.jsx(aa,{baris:4}):n.length?g.jsx("div",{className:"petakReaksi",children:n.map(l=>g.jsxs("div",{className:"kartuReaksi",children:[g.jsx("img",{src:l.url||"",alt:l.name||l.id,loading:"lazy"}),g.jsx("b",{children:l.name||l.id}),g.jsx("button",{className:"bulatHapus",title:"Hapus",onClick:()=>r(l),children:g.jsx("span",{className:"material-icons",children:"delete"})})]},l.id))}):g.jsx(xv,{children:"Belum ada emote. Tekan New untuk menambah."}),g.jsx(Vf,{buka:!!t,judul:"Hapus "+((t==null?void 0:t.name)||"emote")+"?",pesan:"Emote hilang dari bar emote semua room. Tindakan ini tidak bisa dibatalkan.",tombol:"Hapus",sibuk:i,onYa:a,onTidak:()=>r(null)})]})}function n3({nama:n,judul:e}){return g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:e})}),g.jsxs("div",{className:"kosong",children:["Halaman ",g.jsx("b",{children:e})," belum dipindahkan ke React.",g.jsx("br",{}),g.jsx("br",{}),"Sementara ini bisa dibuka di panel lama: ",g.jsxs("a",{href:"../panel/admin/#"+n,children:["panel lama #",n]})]})]})}function Nx(n,e){const t=X.useRef(null);return X.useEffect(()=>{if(!n)return;const r=s=>{t.current&&!t.current.contains(s.target)&&e()},i=s=>s.key==="Escape"&&e();return document.addEventListener("mousedown",r),document.addEventListener("keydown",i),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",i)}},[n,e]),t}function r3(){const[n,e]=X.useState(!1),[t,r]=X.useState(()=>Number(localStorage.getItem("viza-notif")||0)),i=Tn("adminLogs",400),s=Nx(n,()=>e(!1)),o=[...i.isi].map(c=>{var h;return{...c,ms:Number(((h=c.waktu)==null?void 0:h.seconds)||0)*1e3}}).sort((c,h)=>h.ms-c.ms),a=o.filter(c=>c.ms>t).length,l=()=>{e(c=>!c),!n&&o[0]&&(localStorage.setItem("viza-notif",String(o[0].ms)),r(o[0].ms))};return g.jsxs("div",{className:"kotakTopbar",ref:s,children:[g.jsxs("button",{className:"tombolLonceng",onClick:l,title:"Notifikasi",children:[g.jsx("span",{className:"material-icons",children:"notifications_active"}),a>0?g.jsx("em",{children:a>99?"99+":a}):null]}),n?g.jsxs("div",{className:"menuTurun lebar",children:[g.jsx("div",{className:"menuTurunAtas",children:"Aktivitas terbaru"}),o.length?o.slice(0,8).map((c,h)=>g.jsxs("div",{className:"barisNotif",children:[g.jsx("b",{children:c.aksi}),g.jsx("span",{children:c.rincian||"—"}),g.jsxs("small",{children:[c.admin," · ",Ll(c.waktu)]})]},h)):g.jsx("div",{className:"barisNotif",children:g.jsx("span",{children:"Belum ada aktivitas."})}),g.jsx("a",{className:"menuTurunKaki",href:"#log",onClick:()=>e(!1),children:"Lihat semua log"})]}):null]})}function i3({admin:n}){var o;const[e,t]=X.useState(!1),r=Nx(e,()=>t(!1)),i=(o=Kn.currentUser)==null?void 0:o.photoURL,s=(n.nama||"A")[0].toUpperCase();return g.jsxs("div",{className:"kotakTopbar",ref:r,children:[g.jsx("button",{className:"tombolFoto",onClick:()=>t(a=>!a),title:n.email,children:i?g.jsx("img",{src:i,alt:"",referrerPolicy:"no-referrer"}):g.jsx("span",{children:s})}),e?g.jsxs("div",{className:"menuTurun",children:[g.jsxs("div",{className:"profilAtas",children:[g.jsx("div",{className:"tombolFoto besar",children:i?g.jsx("img",{src:i,alt:"",referrerPolicy:"no-referrer"}):g.jsx("span",{children:s})}),g.jsxs("div",{children:[g.jsx("b",{children:n.nama}),g.jsx("span",{children:n.email}),g.jsx("em",{children:n.peran})]})]}),g.jsxs("a",{className:"menuTurunItem",href:"#pengaturan",onClick:()=>t(!1),children:[g.jsx("span",{className:"material-icons",children:"settings"})," Pengaturan"]}),g.jsxs("button",{className:"menuTurunItem",onClick:()=>Xm(Kn),children:[g.jsx("span",{className:"material-icons",children:"logout"})," Keluar"]})]}):null]})}function s3({admin:n}){return g.jsxs("div",{className:"kananTopbar",children:[g.jsx(r3,{}),g.jsx(i3,{admin:n})]})}const o3={dashboard:"Ringkasan user, room, gift, dan aktivitas admin",user:"Cari user, lihat detail, blokir atau buka blokir",room:"Pantau room, sematkan, beri tag official, dan tutup room",gift:"Katalog gift: cari, saring, dan hapus item",emote:"Emote yang tampil di bar emote semua room"},a3={dashboard:$z,user:Wz,room:Yz,gift:Jz,emote:t3};async function l3(n){if(!n)return null;const e=(n.email||"").toLowerCase(),t={email:e,nama:n.displayName||e.split("@")[0],peran:e===Dg?"owner":"-",aktif:!0};if(e===Dg)return t;try{const r=await Wy(Bs(Pr,"panelAdmins",e));if(r.exists()&&r.data().aktif!==!1)return{...t,peran:r.data().peran||"admin",nama:r.data().nama||t.nama}}catch(r){console.warn("panelAdmins tidak terbaca:",r.code)}return null}function u3(){const n=()=>(location.hash.replace("#","")||"dashboard").split("?")[0],[e,t]=X.useState(n);return X.useEffect(()=>{const r=()=>t(n());return window.addEventListener("hashchange",r),()=>window.removeEventListener("hashchange",r)},[]),e}function c3({onPesan:n}){const[e,t]=X.useState(""),[r,i]=X.useState(""),[s,o]=X.useState(!1),a=async c=>{c.preventDefault(),o(!0);try{await hO(Kn,e.trim(),r)}catch(h){n(h.code==="auth/invalid-credential"?"Email atau sandi salah.":"Gagal masuk: "+h.code)}finally{o(!1)}},l=async()=>{try{await VO(Kn,new ur)}catch(c){n("Gagal masuk dengan Google: "+c.code)}};return g.jsx("div",{className:"layarLogin",children:g.jsxs("form",{className:"kotakLogin",onSubmit:a,children:[g.jsxs("div",{className:"merekLogin",children:[g.jsx("div",{className:"logoBesar",children:"V"}),g.jsxs("div",{children:[g.jsx("b",{children:"Viza Panel"}),g.jsx("span",{children:"Panel developer Viza Chat · React"})]})]}),g.jsx("label",{children:"Email admin"}),g.jsx("input",{value:e,onChange:c=>t(c.target.value),placeholder:"nama@email.com",autoComplete:"username"}),g.jsx("label",{children:"Password"}),g.jsx("input",{type:"password",value:r,onChange:c=>i(c.target.value),placeholder:"••••••••",autoComplete:"current-password"}),g.jsx("button",{className:"utama",type:"submit",disabled:s,children:s?"Memeriksa…":"Masuk"}),g.jsx("div",{className:"atau",children:g.jsx("span",{children:"atau"})}),g.jsx("button",{className:"polos",type:"button",onClick:l,children:"Masuk dengan Google"}),g.jsx("div",{className:"kakiLogin",children:"Hanya akun yang terdaftar yang bisa membuka panel ini."})]})})}function h3(){const[n,e]=X.useState(void 0),[t,r]=X.useState(""),[i,s]=X.useState(!1),o=u3();if(X.useEffect(()=>{const c=setTimeout(()=>e(d=>d===void 0?null:d),4e3),h=pO(Kn,async d=>{if(clearTimeout(c),!d){e(null);return}const p=await l3(d);if(!p){r(`Akun ${d.email} belum terdaftar sebagai admin panel.`),await Xm(Kn),e(null);return}e(p)});return()=>{clearTimeout(c),h()}},[]),X.useEffect(()=>{s(!1)},[o]),n===void 0)return g.jsx("div",{className:"kosong",style:{padding:40},children:"Memeriksa sesi…"});if(!n)return g.jsx(c3,{onPesan:r});const a=a3[o]||n3,l=Mz[o]||"Dashboard";return g.jsxs("div",{className:"aplikasi",children:[i&&g.jsx("div",{className:"tiraiMenu tampil",onClick:()=>s(!1)}),g.jsxs("aside",{className:"sidebar"+(i?" buka":""),children:[g.jsxs("div",{className:"merek",children:[g.jsx("div",{className:"logo",children:"V"}),g.jsxs("div",{children:[g.jsx("b",{children:"Viza Panel"}),g.jsx("span",{children:n.email})]})]}),kx.map(c=>g.jsxs("div",{children:[c.grup?g.jsx("div",{className:"grup",children:c.grup}):null,c.isi.map(([h,d,p])=>g.jsxs("a",{className:"menu"+(o===h?" aktif":""),href:"#"+h,children:[g.jsx("i",{className:"material-icons",children:d}),g.jsx("span",{children:p})]},h))]},c.grup||"atas")),g.jsx("div",{className:"bawah",children:g.jsxs("div",{className:"saya",children:[g.jsx("div",{className:"ava",children:(n.nama||"A")[0].toUpperCase()}),g.jsxs("div",{children:[g.jsx("b",{children:n.nama}),g.jsx("span",{children:n.peran})]}),g.jsx("button",{title:"Keluar",onClick:()=>Xm(Kn),children:"⎋"})]})})]}),g.jsxs("main",{className:"isi",children:[g.jsxs("div",{className:"topbar",children:[g.jsx("button",{className:"tombolMenu","aria-label":"Buka menu",onClick:()=>s(c=>!c),children:"☰"}),g.jsxs("div",{children:[g.jsx("h1",{children:l}),g.jsx("div",{className:"crumb",children:l}),g.jsx("div",{className:"ket",children:o3[o]||""})]}),g.jsx(s3,{admin:n})]}),g.jsxs("div",{className:"isiDalam",children:[t&&g.jsx("div",{className:"kosong",style:{marginBottom:12},children:t}),g.jsx(a,{nama:o,judul:l})]})]}),g.jsx(qz,{})]})}xA(document.getElementById("root")).render(g.jsx(AN.StrictMode,{children:g.jsx(h3,{})}));
