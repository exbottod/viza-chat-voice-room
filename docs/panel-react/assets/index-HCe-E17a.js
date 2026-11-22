(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function gb(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var TS={exports:{}},Vd={},SS={exports:{}},ce={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Su=Symbol.for("react.element"),_b=Symbol.for("react.portal"),yb=Symbol.for("react.fragment"),vb=Symbol.for("react.strict_mode"),wb=Symbol.for("react.profiler"),Eb=Symbol.for("react.provider"),Ib=Symbol.for("react.context"),Tb=Symbol.for("react.forward_ref"),Sb=Symbol.for("react.suspense"),Ab=Symbol.for("react.memo"),kb=Symbol.for("react.lazy"),Ow=Symbol.iterator;function Cb(n){return n===null||typeof n!="object"?null:(n=Ow&&n[Ow]||n["@@iterator"],typeof n=="function"?n:null)}var AS={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},kS=Object.assign,CS={};function da(n,e,t){this.props=n,this.context=e,this.refs=CS,this.updater=t||AS}da.prototype.isReactComponent={};da.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};da.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function RS(){}RS.prototype=da.prototype;function jg(n,e,t){this.props=n,this.context=e,this.refs=CS,this.updater=t||AS}var Ug=jg.prototype=new RS;Ug.constructor=jg;kS(Ug,da.prototype);Ug.isPureReactComponent=!0;var Lw=Array.isArray,PS=Object.prototype.hasOwnProperty,Bg={current:null},xS={key:!0,ref:!0,__self:!0,__source:!0};function bS(n,e,t){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)PS.call(e,r)&&!xS.hasOwnProperty(r)&&(i[r]=e[r]);var a=arguments.length-2;if(a===1)i.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];i.children=l}if(n&&n.defaultProps)for(r in a=n.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:Su,type:n,key:s,ref:o,props:i,_owner:Bg.current}}function Rb(n,e){return{$$typeof:Su,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function zg(n){return typeof n=="object"&&n!==null&&n.$$typeof===Su}function Pb(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Mw=/\/+/g;function up(n,e){return typeof n=="object"&&n!==null&&n.key!=null?Pb(""+n.key):e.toString(36)}function Hc(n,e,t,r,i){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case Su:case _b:o=!0}}if(o)return o=n,i=i(o),n=r===""?"."+up(o,0):r,Lw(i)?(t="",n!=null&&(t=n.replace(Mw,"$&/")+"/"),Hc(i,e,t,"",function(c){return c})):i!=null&&(zg(i)&&(i=Rb(i,t+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Mw,"$&/")+"/")+n)),e.push(i)),1;if(o=0,r=r===""?".":r+":",Lw(n))for(var a=0;a<n.length;a++){s=n[a];var l=r+up(s,a);o+=Hc(s,e,t,l,i)}else if(l=Cb(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=r+up(s,a++),o+=Hc(s,e,t,l,i);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function wc(n,e,t){if(n==null)return n;var r=[],i=0;return Hc(n,r,"","",function(s){return e.call(t,s,i++)}),r}function xb(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var Bt={current:null},Qc={transition:null},bb={ReactCurrentDispatcher:Bt,ReactCurrentBatchConfig:Qc,ReactCurrentOwner:Bg};function NS(){throw Error("act(...) is not supported in production builds of React.")}ce.Children={map:wc,forEach:function(n,e,t){wc(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return wc(n,function(){e++}),e},toArray:function(n){return wc(n,function(e){return e})||[]},only:function(n){if(!zg(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};ce.Component=da;ce.Fragment=yb;ce.Profiler=wb;ce.PureComponent=jg;ce.StrictMode=vb;ce.Suspense=Sb;ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bb;ce.act=NS;ce.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var r=kS({},n.props),i=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Bg.current),e.key!==void 0&&(i=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)PS.call(e,l)&&!xS.hasOwnProperty(l)&&(r[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)r.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:Su,type:n.type,key:i,ref:s,props:r,_owner:o}};ce.createContext=function(n){return n={$$typeof:Ib,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:Eb,_context:n},n.Consumer=n};ce.createElement=bS;ce.createFactory=function(n){var e=bS.bind(null,n);return e.type=n,e};ce.createRef=function(){return{current:null}};ce.forwardRef=function(n){return{$$typeof:Tb,render:n}};ce.isValidElement=zg;ce.lazy=function(n){return{$$typeof:kb,_payload:{_status:-1,_result:n},_init:xb}};ce.memo=function(n,e){return{$$typeof:Ab,type:n,compare:e===void 0?null:e}};ce.startTransition=function(n){var e=Qc.transition;Qc.transition={};try{n()}finally{Qc.transition=e}};ce.unstable_act=NS;ce.useCallback=function(n,e){return Bt.current.useCallback(n,e)};ce.useContext=function(n){return Bt.current.useContext(n)};ce.useDebugValue=function(){};ce.useDeferredValue=function(n){return Bt.current.useDeferredValue(n)};ce.useEffect=function(n,e){return Bt.current.useEffect(n,e)};ce.useId=function(){return Bt.current.useId()};ce.useImperativeHandle=function(n,e,t){return Bt.current.useImperativeHandle(n,e,t)};ce.useInsertionEffect=function(n,e){return Bt.current.useInsertionEffect(n,e)};ce.useLayoutEffect=function(n,e){return Bt.current.useLayoutEffect(n,e)};ce.useMemo=function(n,e){return Bt.current.useMemo(n,e)};ce.useReducer=function(n,e,t){return Bt.current.useReducer(n,e,t)};ce.useRef=function(n){return Bt.current.useRef(n)};ce.useState=function(n){return Bt.current.useState(n)};ce.useSyncExternalStore=function(n,e,t){return Bt.current.useSyncExternalStore(n,e,t)};ce.useTransition=function(){return Bt.current.useTransition()};ce.version="18.3.1";SS.exports=ce;var W=SS.exports;const Nb=gb(W);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Db=W,Vb=Symbol.for("react.element"),Ob=Symbol.for("react.fragment"),Lb=Object.prototype.hasOwnProperty,Mb=Db.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Fb={key:!0,ref:!0,__self:!0,__source:!0};function DS(n,e,t){var r,i={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Lb.call(e,r)&&!Fb.hasOwnProperty(r)&&(i[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Vb,type:n,key:s,ref:o,props:i,_owner:Mb.current}}Vd.Fragment=Ob;Vd.jsx=DS;Vd.jsxs=DS;TS.exports=Vd;var g=TS.exports,VS={exports:{}},ln={},OS={exports:{}},LS={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(G,te){var ie=G.length;G.push(te);e:for(;0<ie;){var Be=ie-1>>>1,Te=G[Be];if(0<i(Te,te))G[Be]=te,G[ie]=Te,ie=Be;else break e}}function t(G){return G.length===0?null:G[0]}function r(G){if(G.length===0)return null;var te=G[0],ie=G.pop();if(ie!==te){G[0]=ie;e:for(var Be=0,Te=G.length,Je=Te>>>1;Be<Je;){var rr=2*(Be+1)-1,ir=G[rr],sr=rr+1,or=G[sr];if(0>i(ir,ie))sr<Te&&0>i(or,ir)?(G[Be]=or,G[sr]=ie,Be=sr):(G[Be]=ir,G[rr]=ie,Be=rr);else if(sr<Te&&0>i(or,ie))G[Be]=or,G[sr]=ie,Be=sr;else break e}}return te}function i(G,te){var ie=G.sortIndex-te.sortIndex;return ie!==0?ie:G.id-te.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],h=1,d=null,p=3,_=!1,T=!1,C=!1,P=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(G){for(var te=t(c);te!==null;){if(te.callback===null)r(c);else if(te.startTime<=G)r(c),te.sortIndex=te.expirationTime,e(l,te);else break;te=t(c)}}function D(G){if(C=!1,S(G),!T)if(t(l)!==null)T=!0,J(F);else{var te=t(c);te!==null&&pe(D,te.startTime-G)}}function F(G,te){T=!1,C&&(C=!1,y(w),w=-1),_=!0;var ie=p;try{for(S(te),d=t(l);d!==null&&(!(d.expirationTime>te)||G&&!A());){var Be=d.callback;if(typeof Be=="function"){d.callback=null,p=d.priorityLevel;var Te=Be(d.expirationTime<=te);te=n.unstable_now(),typeof Te=="function"?d.callback=Te:d===t(l)&&r(l),S(te)}else r(l);d=t(l)}if(d!==null)var Je=!0;else{var rr=t(c);rr!==null&&pe(D,rr.startTime-te),Je=!1}return Je}finally{d=null,p=ie,_=!1}}var M=!1,k=null,w=-1,E=5,R=-1;function A(){return!(n.unstable_now()-R<E)}function b(){if(k!==null){var G=n.unstable_now();R=G;var te=!0;try{te=k(!0,G)}finally{te?x():(M=!1,k=null)}}else M=!1}var x;if(typeof I=="function")x=function(){I(b)};else if(typeof MessageChannel<"u"){var Ot=new MessageChannel,On=Ot.port2;Ot.port1.onmessage=b,x=function(){On.postMessage(null)}}else x=function(){P(b,0)};function J(G){k=G,M||(M=!0,x())}function pe(G,te){w=P(function(){G(n.unstable_now())},te)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(G){G.callback=null},n.unstable_continueExecution=function(){T||_||(T=!0,J(F))},n.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<G?Math.floor(1e3/G):5},n.unstable_getCurrentPriorityLevel=function(){return p},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(G){switch(p){case 1:case 2:case 3:var te=3;break;default:te=p}var ie=p;p=te;try{return G()}finally{p=ie}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(G,te){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var ie=p;p=G;try{return te()}finally{p=ie}},n.unstable_scheduleCallback=function(G,te,ie){var Be=n.unstable_now();switch(typeof ie=="object"&&ie!==null?(ie=ie.delay,ie=typeof ie=="number"&&0<ie?Be+ie:Be):ie=Be,G){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=ie+Te,G={id:h++,callback:te,priorityLevel:G,startTime:ie,expirationTime:Te,sortIndex:-1},ie>Be?(G.sortIndex=ie,e(c,G),t(l)===null&&G===t(c)&&(C?(y(w),w=-1):C=!0,pe(D,ie-Be))):(G.sortIndex=Te,e(l,G),T||_||(T=!0,J(F))),G},n.unstable_shouldYield=A,n.unstable_wrapCallback=function(G){var te=p;return function(){var ie=p;p=te;try{return G.apply(this,arguments)}finally{p=ie}}}})(LS);OS.exports=LS;var jb=OS.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ub=W,sn=jb;function B(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var MS=new Set,Bl={};function Bs(n,e){Fo(n,e),Fo(n+"Capture",e)}function Fo(n,e){for(Bl[n]=e,n=0;n<e.length;n++)MS.add(e[n])}var Tr=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),im=Object.prototype.hasOwnProperty,Bb=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Fw={},jw={};function zb(n){return im.call(jw,n)?!0:im.call(Fw,n)?!1:Bb.test(n)?jw[n]=!0:(Fw[n]=!0,!1)}function $b(n,e,t,r){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function qb(n,e,t,r){if(e===null||typeof e>"u"||$b(n,e,t,r))return!0;if(r)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function zt(n,e,t,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var It={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){It[n]=new zt(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];It[e]=new zt(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){It[n]=new zt(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){It[n]=new zt(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){It[n]=new zt(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){It[n]=new zt(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){It[n]=new zt(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){It[n]=new zt(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){It[n]=new zt(n,5,!1,n.toLowerCase(),null,!1,!1)});var $g=/[\-:]([a-z])/g;function qg(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace($g,qg);It[e]=new zt(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace($g,qg);It[e]=new zt(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace($g,qg);It[e]=new zt(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){It[n]=new zt(n,1,!1,n.toLowerCase(),null,!1,!1)});It.xlinkHref=new zt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){It[n]=new zt(n,1,!1,n.toLowerCase(),null,!0,!0)});function Gg(n,e,t,r){var i=It.hasOwnProperty(e)?It[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(qb(e,t,i,r)&&(t=null),r||i===null?zb(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):i.mustUseProperty?n[i.propertyName]=t===null?i.type===3?!1:"":t:(e=i.attributeName,r=i.attributeNamespace,t===null?n.removeAttribute(e):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,r?n.setAttributeNS(r,e,t):n.setAttribute(e,t))))}var Dr=Ub.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ec=Symbol.for("react.element"),ho=Symbol.for("react.portal"),fo=Symbol.for("react.fragment"),Kg=Symbol.for("react.strict_mode"),sm=Symbol.for("react.profiler"),FS=Symbol.for("react.provider"),jS=Symbol.for("react.context"),Wg=Symbol.for("react.forward_ref"),om=Symbol.for("react.suspense"),am=Symbol.for("react.suspense_list"),Hg=Symbol.for("react.memo"),Kr=Symbol.for("react.lazy"),US=Symbol.for("react.offscreen"),Uw=Symbol.iterator;function Ga(n){return n===null||typeof n!="object"?null:(n=Uw&&n[Uw]||n["@@iterator"],typeof n=="function"?n:null)}var qe=Object.assign,cp;function ul(n){if(cp===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);cp=e&&e[1]||""}return`
`+cp+n}var hp=!1;function dp(n,e){if(!n||hp)return"";hp=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){r=c}n.call(e.prototype)}else{try{throw Error()}catch(c){r=c}n()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{hp=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?ul(n):""}function Gb(n){switch(n.tag){case 5:return ul(n.type);case 16:return ul("Lazy");case 13:return ul("Suspense");case 19:return ul("SuspenseList");case 0:case 2:case 15:return n=dp(n.type,!1),n;case 11:return n=dp(n.type.render,!1),n;case 1:return n=dp(n.type,!0),n;default:return""}}function lm(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case fo:return"Fragment";case ho:return"Portal";case sm:return"Profiler";case Kg:return"StrictMode";case om:return"Suspense";case am:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case jS:return(n.displayName||"Context")+".Consumer";case FS:return(n._context.displayName||"Context")+".Provider";case Wg:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Hg:return e=n.displayName||null,e!==null?e:lm(n.type)||"Memo";case Kr:e=n._payload,n=n._init;try{return lm(n(e))}catch{}}return null}function Kb(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return lm(e);case 8:return e===Kg?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function wi(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function BS(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Wb(n){var e=BS(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),r=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function Ic(n){n._valueTracker||(n._valueTracker=Wb(n))}function zS(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),r="";return n&&(r=BS(n)?n.checked?"true":"false":n.value),n=r,n!==t?(e.setValue(n),!0):!1}function vh(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function um(n,e){var t=e.checked;return qe({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function Bw(n,e){var t=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;t=wi(e.value!=null?e.value:t),n._wrapperState={initialChecked:r,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $S(n,e){e=e.checked,e!=null&&Gg(n,"checked",e,!1)}function cm(n,e){$S(n,e);var t=wi(e.value),r=e.type;if(t!=null)r==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(r==="submit"||r==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?hm(n,e.type,t):e.hasOwnProperty("defaultValue")&&hm(n,e.type,wi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function zw(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function hm(n,e,t){(e!=="number"||vh(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var cl=Array.isArray;function Ao(n,e,t,r){if(n=n.options,e){e={};for(var i=0;i<t.length;i++)e["$"+t[i]]=!0;for(t=0;t<n.length;t++)i=e.hasOwnProperty("$"+n[t].value),n[t].selected!==i&&(n[t].selected=i),i&&r&&(n[t].defaultSelected=!0)}else{for(t=""+wi(t),e=null,i=0;i<n.length;i++){if(n[i].value===t){n[i].selected=!0,r&&(n[i].defaultSelected=!0);return}e!==null||n[i].disabled||(e=n[i])}e!==null&&(e.selected=!0)}}function dm(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(B(91));return qe({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function $w(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(B(92));if(cl(t)){if(1<t.length)throw Error(B(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:wi(t)}}function qS(n,e){var t=wi(e.value),r=wi(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),r!=null&&(n.defaultValue=""+r)}function qw(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function GS(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function fm(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?GS(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Tc,KS=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,r,i){MSApp.execUnsafeLocalFunction(function(){return n(e,t,r,i)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Tc=Tc||document.createElement("div"),Tc.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Tc.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function zl(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var vl={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Hb=["Webkit","ms","Moz","O"];Object.keys(vl).forEach(function(n){Hb.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),vl[e]=vl[n]})});function WS(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||vl.hasOwnProperty(n)&&vl[n]?(""+e).trim():e+"px"}function HS(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var r=t.indexOf("--")===0,i=WS(t,e[t],r);t==="float"&&(t="cssFloat"),r?n.setProperty(t,i):n[t]=i}}var Qb=qe({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function pm(n,e){if(e){if(Qb[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(B(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(B(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(B(61))}if(e.style!=null&&typeof e.style!="object")throw Error(B(62))}}function mm(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var gm=null;function Qg(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var _m=null,ko=null,Co=null;function Gw(n){if(n=Cu(n)){if(typeof _m!="function")throw Error(B(280));var e=n.stateNode;e&&(e=jd(e),_m(n.stateNode,n.type,e))}}function QS(n){ko?Co?Co.push(n):Co=[n]:ko=n}function YS(){if(ko){var n=ko,e=Co;if(Co=ko=null,Gw(n),e)for(n=0;n<e.length;n++)Gw(e[n])}}function JS(n,e){return n(e)}function XS(){}var fp=!1;function ZS(n,e,t){if(fp)return n(e,t);fp=!0;try{return JS(n,e,t)}finally{fp=!1,(ko!==null||Co!==null)&&(XS(),YS())}}function $l(n,e){var t=n.stateNode;if(t===null)return null;var r=jd(t);if(r===null)return null;t=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(n=n.type,r=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!r;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(B(231,e,typeof t));return t}var ym=!1;if(Tr)try{var Ka={};Object.defineProperty(Ka,"passive",{get:function(){ym=!0}}),window.addEventListener("test",Ka,Ka),window.removeEventListener("test",Ka,Ka)}catch{ym=!1}function Yb(n,e,t,r,i,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(h){this.onError(h)}}var wl=!1,wh=null,Eh=!1,vm=null,Jb={onError:function(n){wl=!0,wh=n}};function Xb(n,e,t,r,i,s,o,a,l){wl=!1,wh=null,Yb.apply(Jb,arguments)}function Zb(n,e,t,r,i,s,o,a,l){if(Xb.apply(this,arguments),wl){if(wl){var c=wh;wl=!1,wh=null}else throw Error(B(198));Eh||(Eh=!0,vm=c)}}function zs(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function e0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Kw(n){if(zs(n)!==n)throw Error(B(188))}function eN(n){var e=n.alternate;if(!e){if(e=zs(n),e===null)throw Error(B(188));return e!==n?null:n}for(var t=n,r=e;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){t=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return Kw(i),n;if(s===r)return Kw(i),e;s=s.sibling}throw Error(B(188))}if(t.return!==r.return)t=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===t){o=!0,t=i,r=s;break}if(a===r){o=!0,r=i,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,r=i;break}if(a===r){o=!0,r=s,t=i;break}a=a.sibling}if(!o)throw Error(B(189))}}if(t.alternate!==r)throw Error(B(190))}if(t.tag!==3)throw Error(B(188));return t.stateNode.current===t?n:e}function t0(n){return n=eN(n),n!==null?n0(n):null}function n0(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=n0(n);if(e!==null)return e;n=n.sibling}return null}var r0=sn.unstable_scheduleCallback,Ww=sn.unstable_cancelCallback,tN=sn.unstable_shouldYield,nN=sn.unstable_requestPaint,Xe=sn.unstable_now,rN=sn.unstable_getCurrentPriorityLevel,Yg=sn.unstable_ImmediatePriority,i0=sn.unstable_UserBlockingPriority,Ih=sn.unstable_NormalPriority,iN=sn.unstable_LowPriority,s0=sn.unstable_IdlePriority,Od=null,$n=null;function sN(n){if($n&&typeof $n.onCommitFiberRoot=="function")try{$n.onCommitFiberRoot(Od,n,void 0,(n.current.flags&128)===128)}catch{}}var Rn=Math.clz32?Math.clz32:lN,oN=Math.log,aN=Math.LN2;function lN(n){return n>>>=0,n===0?32:31-(oN(n)/aN|0)|0}var Sc=64,Ac=4194304;function hl(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Th(n,e){var t=n.pendingLanes;if(t===0)return 0;var r=0,i=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~i;a!==0?r=hl(a):(s&=o,s!==0&&(r=hl(s)))}else o=t&~i,o!==0?r=hl(o):s!==0&&(r=hl(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=r;0<e;)t=31-Rn(e),i=1<<t,r|=n[t],e&=~i;return r}function uN(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function cN(n,e){for(var t=n.suspendedLanes,r=n.pingedLanes,i=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-Rn(s),a=1<<o,l=i[o];l===-1?(!(a&t)||a&r)&&(i[o]=uN(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function wm(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function o0(){var n=Sc;return Sc<<=1,!(Sc&4194240)&&(Sc=64),n}function pp(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function Au(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Rn(e),n[e]=t}function hN(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var r=n.eventTimes;for(n=n.expirationTimes;0<t;){var i=31-Rn(t),s=1<<i;e[i]=0,r[i]=-1,n[i]=-1,t&=~s}}function Jg(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var r=31-Rn(t),i=1<<r;i&e|n[r]&e&&(n[r]|=e),t&=~i}}var we=0;function a0(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var l0,Xg,u0,c0,h0,Em=!1,kc=[],oi=null,ai=null,li=null,ql=new Map,Gl=new Map,Hr=[],dN="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Hw(n,e){switch(n){case"focusin":case"focusout":oi=null;break;case"dragenter":case"dragleave":ai=null;break;case"mouseover":case"mouseout":li=null;break;case"pointerover":case"pointerout":ql.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Gl.delete(e.pointerId)}}function Wa(n,e,t,r,i,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=Cu(e),e!==null&&Xg(e)),n):(n.eventSystemFlags|=r,e=n.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),n)}function fN(n,e,t,r,i){switch(e){case"focusin":return oi=Wa(oi,n,e,t,r,i),!0;case"dragenter":return ai=Wa(ai,n,e,t,r,i),!0;case"mouseover":return li=Wa(li,n,e,t,r,i),!0;case"pointerover":var s=i.pointerId;return ql.set(s,Wa(ql.get(s)||null,n,e,t,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Gl.set(s,Wa(Gl.get(s)||null,n,e,t,r,i)),!0}return!1}function d0(n){var e=cs(n.target);if(e!==null){var t=zs(e);if(t!==null){if(e=t.tag,e===13){if(e=e0(t),e!==null){n.blockedOn=e,h0(n.priority,function(){u0(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Yc(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=Im(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var r=new t.constructor(t.type,t);gm=r,t.target.dispatchEvent(r),gm=null}else return e=Cu(t),e!==null&&Xg(e),n.blockedOn=t,!1;e.shift()}return!0}function Qw(n,e,t){Yc(n)&&t.delete(e)}function pN(){Em=!1,oi!==null&&Yc(oi)&&(oi=null),ai!==null&&Yc(ai)&&(ai=null),li!==null&&Yc(li)&&(li=null),ql.forEach(Qw),Gl.forEach(Qw)}function Ha(n,e){n.blockedOn===e&&(n.blockedOn=null,Em||(Em=!0,sn.unstable_scheduleCallback(sn.unstable_NormalPriority,pN)))}function Kl(n){function e(i){return Ha(i,n)}if(0<kc.length){Ha(kc[0],n);for(var t=1;t<kc.length;t++){var r=kc[t];r.blockedOn===n&&(r.blockedOn=null)}}for(oi!==null&&Ha(oi,n),ai!==null&&Ha(ai,n),li!==null&&Ha(li,n),ql.forEach(e),Gl.forEach(e),t=0;t<Hr.length;t++)r=Hr[t],r.blockedOn===n&&(r.blockedOn=null);for(;0<Hr.length&&(t=Hr[0],t.blockedOn===null);)d0(t),t.blockedOn===null&&Hr.shift()}var Ro=Dr.ReactCurrentBatchConfig,Sh=!0;function mN(n,e,t,r){var i=we,s=Ro.transition;Ro.transition=null;try{we=1,Zg(n,e,t,r)}finally{we=i,Ro.transition=s}}function gN(n,e,t,r){var i=we,s=Ro.transition;Ro.transition=null;try{we=4,Zg(n,e,t,r)}finally{we=i,Ro.transition=s}}function Zg(n,e,t,r){if(Sh){var i=Im(n,e,t,r);if(i===null)Sp(n,e,r,Ah,t),Hw(n,r);else if(fN(i,n,e,t,r))r.stopPropagation();else if(Hw(n,r),e&4&&-1<dN.indexOf(n)){for(;i!==null;){var s=Cu(i);if(s!==null&&l0(s),s=Im(n,e,t,r),s===null&&Sp(n,e,r,Ah,t),s===i)break;i=s}i!==null&&r.stopPropagation()}else Sp(n,e,r,null,t)}}var Ah=null;function Im(n,e,t,r){if(Ah=null,n=Qg(r),n=cs(n),n!==null)if(e=zs(n),e===null)n=null;else if(t=e.tag,t===13){if(n=e0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Ah=n,null}function f0(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(rN()){case Yg:return 1;case i0:return 4;case Ih:case iN:return 16;case s0:return 536870912;default:return 16}default:return 16}}var ni=null,e_=null,Jc=null;function p0(){if(Jc)return Jc;var n,e=e_,t=e.length,r,i="value"in ni?ni.value:ni.textContent,s=i.length;for(n=0;n<t&&e[n]===i[n];n++);var o=t-n;for(r=1;r<=o&&e[t-r]===i[s-r];r++);return Jc=i.slice(n,1<r?1-r:void 0)}function Xc(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function Cc(){return!0}function Yw(){return!1}function un(n){function e(t,r,i,s,o){this._reactName=t,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Cc:Yw,this.isPropagationStopped=Yw,this}return qe(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Cc)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Cc)},persist:function(){},isPersistent:Cc}),e}var fa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},t_=un(fa),ku=qe({},fa,{view:0,detail:0}),_N=un(ku),mp,gp,Qa,Ld=qe({},ku,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:n_,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Qa&&(Qa&&n.type==="mousemove"?(mp=n.screenX-Qa.screenX,gp=n.screenY-Qa.screenY):gp=mp=0,Qa=n),mp)},movementY:function(n){return"movementY"in n?n.movementY:gp}}),Jw=un(Ld),yN=qe({},Ld,{dataTransfer:0}),vN=un(yN),wN=qe({},ku,{relatedTarget:0}),_p=un(wN),EN=qe({},fa,{animationName:0,elapsedTime:0,pseudoElement:0}),IN=un(EN),TN=qe({},fa,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),SN=un(TN),AN=qe({},fa,{data:0}),Xw=un(AN),kN={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},CN={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},RN={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function PN(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=RN[n])?!!e[n]:!1}function n_(){return PN}var xN=qe({},ku,{key:function(n){if(n.key){var e=kN[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=Xc(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?CN[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:n_,charCode:function(n){return n.type==="keypress"?Xc(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Xc(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),bN=un(xN),NN=qe({},Ld,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zw=un(NN),DN=qe({},ku,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:n_}),VN=un(DN),ON=qe({},fa,{propertyName:0,elapsedTime:0,pseudoElement:0}),LN=un(ON),MN=qe({},Ld,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),FN=un(MN),jN=[9,13,27,32],r_=Tr&&"CompositionEvent"in window,El=null;Tr&&"documentMode"in document&&(El=document.documentMode);var UN=Tr&&"TextEvent"in window&&!El,m0=Tr&&(!r_||El&&8<El&&11>=El),eE=" ",tE=!1;function g0(n,e){switch(n){case"keyup":return jN.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var po=!1;function BN(n,e){switch(n){case"compositionend":return _0(e);case"keypress":return e.which!==32?null:(tE=!0,eE);case"textInput":return n=e.data,n===eE&&tE?null:n;default:return null}}function zN(n,e){if(po)return n==="compositionend"||!r_&&g0(n,e)?(n=p0(),Jc=e_=ni=null,po=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return m0&&e.locale!=="ko"?null:e.data;default:return null}}var $N={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function nE(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!$N[n.type]:e==="textarea"}function y0(n,e,t,r){QS(r),e=kh(e,"onChange"),0<e.length&&(t=new t_("onChange","change",null,t,r),n.push({event:t,listeners:e}))}var Il=null,Wl=null;function qN(n){P0(n,0)}function Md(n){var e=_o(n);if(zS(e))return n}function GN(n,e){if(n==="change")return e}var v0=!1;if(Tr){var yp;if(Tr){var vp="oninput"in document;if(!vp){var rE=document.createElement("div");rE.setAttribute("oninput","return;"),vp=typeof rE.oninput=="function"}yp=vp}else yp=!1;v0=yp&&(!document.documentMode||9<document.documentMode)}function iE(){Il&&(Il.detachEvent("onpropertychange",w0),Wl=Il=null)}function w0(n){if(n.propertyName==="value"&&Md(Wl)){var e=[];y0(e,Wl,n,Qg(n)),ZS(qN,e)}}function KN(n,e,t){n==="focusin"?(iE(),Il=e,Wl=t,Il.attachEvent("onpropertychange",w0)):n==="focusout"&&iE()}function WN(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Md(Wl)}function HN(n,e){if(n==="click")return Md(e)}function QN(n,e){if(n==="input"||n==="change")return Md(e)}function YN(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Vn=typeof Object.is=="function"?Object.is:YN;function Hl(n,e){if(Vn(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),r=Object.keys(e);if(t.length!==r.length)return!1;for(r=0;r<t.length;r++){var i=t[r];if(!im.call(e,i)||!Vn(n[i],e[i]))return!1}return!0}function sE(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function oE(n,e){var t=sE(n);n=0;for(var r;t;){if(t.nodeType===3){if(r=n+t.textContent.length,n<=e&&r>=e)return{node:t,offset:e-n};n=r}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=sE(t)}}function E0(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?E0(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function I0(){for(var n=window,e=vh();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=vh(n.document)}return e}function i_(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function JN(n){var e=I0(),t=n.focusedElem,r=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&E0(t.ownerDocument.documentElement,t)){if(r!==null&&i_(t)){if(e=r.start,n=r.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var i=t.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!n.extend&&s>r&&(i=r,r=s,s=i),i=oE(t,s);var o=oE(t,r);i&&o&&(n.rangeCount!==1||n.anchorNode!==i.node||n.anchorOffset!==i.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),n.removeAllRanges(),s>r?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var XN=Tr&&"documentMode"in document&&11>=document.documentMode,mo=null,Tm=null,Tl=null,Sm=!1;function aE(n,e,t){var r=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Sm||mo==null||mo!==vh(r)||(r=mo,"selectionStart"in r&&i_(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Tl&&Hl(Tl,r)||(Tl=r,r=kh(Tm,"onSelect"),0<r.length&&(e=new t_("onSelect","select",null,e,t),n.push({event:e,listeners:r}),e.target=mo)))}function Rc(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var go={animationend:Rc("Animation","AnimationEnd"),animationiteration:Rc("Animation","AnimationIteration"),animationstart:Rc("Animation","AnimationStart"),transitionend:Rc("Transition","TransitionEnd")},wp={},T0={};Tr&&(T0=document.createElement("div").style,"AnimationEvent"in window||(delete go.animationend.animation,delete go.animationiteration.animation,delete go.animationstart.animation),"TransitionEvent"in window||delete go.transitionend.transition);function Fd(n){if(wp[n])return wp[n];if(!go[n])return n;var e=go[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in T0)return wp[n]=e[t];return n}var S0=Fd("animationend"),A0=Fd("animationiteration"),k0=Fd("animationstart"),C0=Fd("transitionend"),R0=new Map,lE="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mi(n,e){R0.set(n,e),Bs(e,[n])}for(var Ep=0;Ep<lE.length;Ep++){var Ip=lE[Ep],ZN=Ip.toLowerCase(),eD=Ip[0].toUpperCase()+Ip.slice(1);Mi(ZN,"on"+eD)}Mi(S0,"onAnimationEnd");Mi(A0,"onAnimationIteration");Mi(k0,"onAnimationStart");Mi("dblclick","onDoubleClick");Mi("focusin","onFocus");Mi("focusout","onBlur");Mi(C0,"onTransitionEnd");Fo("onMouseEnter",["mouseout","mouseover"]);Fo("onMouseLeave",["mouseout","mouseover"]);Fo("onPointerEnter",["pointerout","pointerover"]);Fo("onPointerLeave",["pointerout","pointerover"]);Bs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Bs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Bs("onBeforeInput",["compositionend","keypress","textInput","paste"]);Bs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Bs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Bs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tD=new Set("cancel close invalid load scroll toggle".split(" ").concat(dl));function uE(n,e,t){var r=n.type||"unknown-event";n.currentTarget=t,Zb(r,e,void 0,n),n.currentTarget=null}function P0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var r=n[t],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;uE(i,a,c),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;uE(i,a,c),s=l}}}if(Eh)throw n=vm,Eh=!1,vm=null,n}function Pe(n,e){var t=e[Pm];t===void 0&&(t=e[Pm]=new Set);var r=n+"__bubble";t.has(r)||(x0(e,n,2,!1),t.add(r))}function Tp(n,e,t){var r=0;e&&(r|=4),x0(t,n,r,e)}var Pc="_reactListening"+Math.random().toString(36).slice(2);function Ql(n){if(!n[Pc]){n[Pc]=!0,MS.forEach(function(t){t!=="selectionchange"&&(tD.has(t)||Tp(t,!1,n),Tp(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Pc]||(e[Pc]=!0,Tp("selectionchange",!1,e))}}function x0(n,e,t,r){switch(f0(e)){case 1:var i=mN;break;case 4:i=gN;break;default:i=Zg}t=i.bind(null,e,t,n),i=void 0,!ym||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?n.addEventListener(e,t,{capture:!0,passive:i}):n.addEventListener(e,t,!0):i!==void 0?n.addEventListener(e,t,{passive:i}):n.addEventListener(e,t,!1)}function Sp(n,e,t,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=cs(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}ZS(function(){var c=s,h=Qg(t),d=[];e:{var p=R0.get(n);if(p!==void 0){var _=t_,T=n;switch(n){case"keypress":if(Xc(t)===0)break e;case"keydown":case"keyup":_=bN;break;case"focusin":T="focus",_=_p;break;case"focusout":T="blur",_=_p;break;case"beforeblur":case"afterblur":_=_p;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=Jw;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=vN;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=VN;break;case S0:case A0:case k0:_=IN;break;case C0:_=LN;break;case"scroll":_=_N;break;case"wheel":_=FN;break;case"copy":case"cut":case"paste":_=SN;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=Zw}var C=(e&4)!==0,P=!C&&n==="scroll",y=C?p!==null?p+"Capture":null:p;C=[];for(var I=c,S;I!==null;){S=I;var D=S.stateNode;if(S.tag===5&&D!==null&&(S=D,y!==null&&(D=$l(I,y),D!=null&&C.push(Yl(I,D,S)))),P)break;I=I.return}0<C.length&&(p=new _(p,T,null,t,h),d.push({event:p,listeners:C}))}}if(!(e&7)){e:{if(p=n==="mouseover"||n==="pointerover",_=n==="mouseout"||n==="pointerout",p&&t!==gm&&(T=t.relatedTarget||t.fromElement)&&(cs(T)||T[Sr]))break e;if((_||p)&&(p=h.window===h?h:(p=h.ownerDocument)?p.defaultView||p.parentWindow:window,_?(T=t.relatedTarget||t.toElement,_=c,T=T?cs(T):null,T!==null&&(P=zs(T),T!==P||T.tag!==5&&T.tag!==6)&&(T=null)):(_=null,T=c),_!==T)){if(C=Jw,D="onMouseLeave",y="onMouseEnter",I="mouse",(n==="pointerout"||n==="pointerover")&&(C=Zw,D="onPointerLeave",y="onPointerEnter",I="pointer"),P=_==null?p:_o(_),S=T==null?p:_o(T),p=new C(D,I+"leave",_,t,h),p.target=P,p.relatedTarget=S,D=null,cs(h)===c&&(C=new C(y,I+"enter",T,t,h),C.target=S,C.relatedTarget=P,D=C),P=D,_&&T)t:{for(C=_,y=T,I=0,S=C;S;S=to(S))I++;for(S=0,D=y;D;D=to(D))S++;for(;0<I-S;)C=to(C),I--;for(;0<S-I;)y=to(y),S--;for(;I--;){if(C===y||y!==null&&C===y.alternate)break t;C=to(C),y=to(y)}C=null}else C=null;_!==null&&cE(d,p,_,C,!1),T!==null&&P!==null&&cE(d,P,T,C,!0)}}e:{if(p=c?_o(c):window,_=p.nodeName&&p.nodeName.toLowerCase(),_==="select"||_==="input"&&p.type==="file")var F=GN;else if(nE(p))if(v0)F=QN;else{F=WN;var M=KN}else(_=p.nodeName)&&_.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(F=HN);if(F&&(F=F(n,c))){y0(d,F,t,h);break e}M&&M(n,p,c),n==="focusout"&&(M=p._wrapperState)&&M.controlled&&p.type==="number"&&hm(p,"number",p.value)}switch(M=c?_o(c):window,n){case"focusin":(nE(M)||M.contentEditable==="true")&&(mo=M,Tm=c,Tl=null);break;case"focusout":Tl=Tm=mo=null;break;case"mousedown":Sm=!0;break;case"contextmenu":case"mouseup":case"dragend":Sm=!1,aE(d,t,h);break;case"selectionchange":if(XN)break;case"keydown":case"keyup":aE(d,t,h)}var k;if(r_)e:{switch(n){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else po?g0(n,t)&&(w="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(w="onCompositionStart");w&&(m0&&t.locale!=="ko"&&(po||w!=="onCompositionStart"?w==="onCompositionEnd"&&po&&(k=p0()):(ni=h,e_="value"in ni?ni.value:ni.textContent,po=!0)),M=kh(c,w),0<M.length&&(w=new Xw(w,n,null,t,h),d.push({event:w,listeners:M}),k?w.data=k:(k=_0(t),k!==null&&(w.data=k)))),(k=UN?BN(n,t):zN(n,t))&&(c=kh(c,"onBeforeInput"),0<c.length&&(h=new Xw("onBeforeInput","beforeinput",null,t,h),d.push({event:h,listeners:c}),h.data=k))}P0(d,e)})}function Yl(n,e,t){return{instance:n,listener:e,currentTarget:t}}function kh(n,e){for(var t=e+"Capture",r=[];n!==null;){var i=n,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=$l(n,t),s!=null&&r.unshift(Yl(n,s,i)),s=$l(n,e),s!=null&&r.push(Yl(n,s,i))),n=n.return}return r}function to(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function cE(n,e,t,r,i){for(var s=e._reactName,o=[];t!==null&&t!==r;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,i?(l=$l(t,s),l!=null&&o.unshift(Yl(t,l,a))):i||(l=$l(t,s),l!=null&&o.push(Yl(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var nD=/\r\n?/g,rD=/\u0000|\uFFFD/g;function hE(n){return(typeof n=="string"?n:""+n).replace(nD,`
`).replace(rD,"")}function xc(n,e,t){if(e=hE(e),hE(n)!==e&&t)throw Error(B(425))}function Ch(){}var Am=null,km=null;function Cm(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Rm=typeof setTimeout=="function"?setTimeout:void 0,iD=typeof clearTimeout=="function"?clearTimeout:void 0,dE=typeof Promise=="function"?Promise:void 0,sD=typeof queueMicrotask=="function"?queueMicrotask:typeof dE<"u"?function(n){return dE.resolve(null).then(n).catch(oD)}:Rm;function oD(n){setTimeout(function(){throw n})}function Ap(n,e){var t=e,r=0;do{var i=t.nextSibling;if(n.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(r===0){n.removeChild(i),Kl(e);return}r--}else t!=="$"&&t!=="$?"&&t!=="$!"||r++;t=i}while(t);Kl(e)}function ui(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function fE(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var pa=Math.random().toString(36).slice(2),Fn="__reactFiber$"+pa,Jl="__reactProps$"+pa,Sr="__reactContainer$"+pa,Pm="__reactEvents$"+pa,aD="__reactListeners$"+pa,lD="__reactHandles$"+pa;function cs(n){var e=n[Fn];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Sr]||t[Fn]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=fE(n);n!==null;){if(t=n[Fn])return t;n=fE(n)}return e}n=t,t=n.parentNode}return null}function Cu(n){return n=n[Fn]||n[Sr],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function _o(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(B(33))}function jd(n){return n[Jl]||null}var xm=[],yo=-1;function Fi(n){return{current:n}}function Ve(n){0>yo||(n.current=xm[yo],xm[yo]=null,yo--)}function Ce(n,e){yo++,xm[yo]=n.current,n.current=e}var Ei={},Vt=Fi(Ei),Qt=Fi(!1),Es=Ei;function jo(n,e){var t=n.type.contextTypes;if(!t)return Ei;var r=n.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=e[s];return r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=i),i}function Yt(n){return n=n.childContextTypes,n!=null}function Rh(){Ve(Qt),Ve(Vt)}function pE(n,e,t){if(Vt.current!==Ei)throw Error(B(168));Ce(Vt,e),Ce(Qt,t)}function b0(n,e,t){var r=n.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return t;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(B(108,Kb(n)||"Unknown",i));return qe({},t,r)}function Ph(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Ei,Es=Vt.current,Ce(Vt,n),Ce(Qt,Qt.current),!0}function mE(n,e,t){var r=n.stateNode;if(!r)throw Error(B(169));t?(n=b0(n,e,Es),r.__reactInternalMemoizedMergedChildContext=n,Ve(Qt),Ve(Vt),Ce(Vt,n)):Ve(Qt),Ce(Qt,t)}var dr=null,Ud=!1,kp=!1;function N0(n){dr===null?dr=[n]:dr.push(n)}function uD(n){Ud=!0,N0(n)}function ji(){if(!kp&&dr!==null){kp=!0;var n=0,e=we;try{var t=dr;for(we=1;n<t.length;n++){var r=t[n];do r=r(!0);while(r!==null)}dr=null,Ud=!1}catch(i){throw dr!==null&&(dr=dr.slice(n+1)),r0(Yg,ji),i}finally{we=e,kp=!1}}return null}var vo=[],wo=0,xh=null,bh=0,cn=[],hn=0,Is=null,pr=1,mr="";function ts(n,e){vo[wo++]=bh,vo[wo++]=xh,xh=n,bh=e}function D0(n,e,t){cn[hn++]=pr,cn[hn++]=mr,cn[hn++]=Is,Is=n;var r=pr;n=mr;var i=32-Rn(r)-1;r&=~(1<<i),t+=1;var s=32-Rn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,pr=1<<32-Rn(e)+i|t<<i|r,mr=s+n}else pr=1<<s|t<<i|r,mr=n}function s_(n){n.return!==null&&(ts(n,1),D0(n,1,0))}function o_(n){for(;n===xh;)xh=vo[--wo],vo[wo]=null,bh=vo[--wo],vo[wo]=null;for(;n===Is;)Is=cn[--hn],cn[hn]=null,mr=cn[--hn],cn[hn]=null,pr=cn[--hn],cn[hn]=null}var rn=null,nn=null,Me=!1,In=null;function V0(n,e){var t=dn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function gE(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,rn=n,nn=ui(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,rn=n,nn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Is!==null?{id:pr,overflow:mr}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=dn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,rn=n,nn=null,!0):!1;default:return!1}}function bm(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Nm(n){if(Me){var e=nn;if(e){var t=e;if(!gE(n,e)){if(bm(n))throw Error(B(418));e=ui(t.nextSibling);var r=rn;e&&gE(n,e)?V0(r,t):(n.flags=n.flags&-4097|2,Me=!1,rn=n)}}else{if(bm(n))throw Error(B(418));n.flags=n.flags&-4097|2,Me=!1,rn=n}}}function _E(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;rn=n}function bc(n){if(n!==rn)return!1;if(!Me)return _E(n),Me=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!Cm(n.type,n.memoizedProps)),e&&(e=nn)){if(bm(n))throw O0(),Error(B(418));for(;e;)V0(n,e),e=ui(e.nextSibling)}if(_E(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(B(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){nn=ui(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}nn=null}}else nn=rn?ui(n.stateNode.nextSibling):null;return!0}function O0(){for(var n=nn;n;)n=ui(n.nextSibling)}function Uo(){nn=rn=null,Me=!1}function a_(n){In===null?In=[n]:In.push(n)}var cD=Dr.ReactCurrentBatchConfig;function Ya(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(B(309));var r=t.stateNode}if(!r)throw Error(B(147,n));var i=r,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(B(284));if(!t._owner)throw Error(B(290,n))}return n}function Nc(n,e){throw n=Object.prototype.toString.call(e),Error(B(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function yE(n){var e=n._init;return e(n._payload)}function L0(n){function e(y,I){if(n){var S=y.deletions;S===null?(y.deletions=[I],y.flags|=16):S.push(I)}}function t(y,I){if(!n)return null;for(;I!==null;)e(y,I),I=I.sibling;return null}function r(y,I){for(y=new Map;I!==null;)I.key!==null?y.set(I.key,I):y.set(I.index,I),I=I.sibling;return y}function i(y,I){return y=fi(y,I),y.index=0,y.sibling=null,y}function s(y,I,S){return y.index=S,n?(S=y.alternate,S!==null?(S=S.index,S<I?(y.flags|=2,I):S):(y.flags|=2,I)):(y.flags|=1048576,I)}function o(y){return n&&y.alternate===null&&(y.flags|=2),y}function a(y,I,S,D){return I===null||I.tag!==6?(I=Dp(S,y.mode,D),I.return=y,I):(I=i(I,S),I.return=y,I)}function l(y,I,S,D){var F=S.type;return F===fo?h(y,I,S.props.children,D,S.key):I!==null&&(I.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Kr&&yE(F)===I.type)?(D=i(I,S.props),D.ref=Ya(y,I,S),D.return=y,D):(D=sh(S.type,S.key,S.props,null,y.mode,D),D.ref=Ya(y,I,S),D.return=y,D)}function c(y,I,S,D){return I===null||I.tag!==4||I.stateNode.containerInfo!==S.containerInfo||I.stateNode.implementation!==S.implementation?(I=Vp(S,y.mode,D),I.return=y,I):(I=i(I,S.children||[]),I.return=y,I)}function h(y,I,S,D,F){return I===null||I.tag!==7?(I=ys(S,y.mode,D,F),I.return=y,I):(I=i(I,S),I.return=y,I)}function d(y,I,S){if(typeof I=="string"&&I!==""||typeof I=="number")return I=Dp(""+I,y.mode,S),I.return=y,I;if(typeof I=="object"&&I!==null){switch(I.$$typeof){case Ec:return S=sh(I.type,I.key,I.props,null,y.mode,S),S.ref=Ya(y,null,I),S.return=y,S;case ho:return I=Vp(I,y.mode,S),I.return=y,I;case Kr:var D=I._init;return d(y,D(I._payload),S)}if(cl(I)||Ga(I))return I=ys(I,y.mode,S,null),I.return=y,I;Nc(y,I)}return null}function p(y,I,S,D){var F=I!==null?I.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return F!==null?null:a(y,I,""+S,D);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Ec:return S.key===F?l(y,I,S,D):null;case ho:return S.key===F?c(y,I,S,D):null;case Kr:return F=S._init,p(y,I,F(S._payload),D)}if(cl(S)||Ga(S))return F!==null?null:h(y,I,S,D,null);Nc(y,S)}return null}function _(y,I,S,D,F){if(typeof D=="string"&&D!==""||typeof D=="number")return y=y.get(S)||null,a(I,y,""+D,F);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case Ec:return y=y.get(D.key===null?S:D.key)||null,l(I,y,D,F);case ho:return y=y.get(D.key===null?S:D.key)||null,c(I,y,D,F);case Kr:var M=D._init;return _(y,I,S,M(D._payload),F)}if(cl(D)||Ga(D))return y=y.get(S)||null,h(I,y,D,F,null);Nc(I,D)}return null}function T(y,I,S,D){for(var F=null,M=null,k=I,w=I=0,E=null;k!==null&&w<S.length;w++){k.index>w?(E=k,k=null):E=k.sibling;var R=p(y,k,S[w],D);if(R===null){k===null&&(k=E);break}n&&k&&R.alternate===null&&e(y,k),I=s(R,I,w),M===null?F=R:M.sibling=R,M=R,k=E}if(w===S.length)return t(y,k),Me&&ts(y,w),F;if(k===null){for(;w<S.length;w++)k=d(y,S[w],D),k!==null&&(I=s(k,I,w),M===null?F=k:M.sibling=k,M=k);return Me&&ts(y,w),F}for(k=r(y,k);w<S.length;w++)E=_(k,y,w,S[w],D),E!==null&&(n&&E.alternate!==null&&k.delete(E.key===null?w:E.key),I=s(E,I,w),M===null?F=E:M.sibling=E,M=E);return n&&k.forEach(function(A){return e(y,A)}),Me&&ts(y,w),F}function C(y,I,S,D){var F=Ga(S);if(typeof F!="function")throw Error(B(150));if(S=F.call(S),S==null)throw Error(B(151));for(var M=F=null,k=I,w=I=0,E=null,R=S.next();k!==null&&!R.done;w++,R=S.next()){k.index>w?(E=k,k=null):E=k.sibling;var A=p(y,k,R.value,D);if(A===null){k===null&&(k=E);break}n&&k&&A.alternate===null&&e(y,k),I=s(A,I,w),M===null?F=A:M.sibling=A,M=A,k=E}if(R.done)return t(y,k),Me&&ts(y,w),F;if(k===null){for(;!R.done;w++,R=S.next())R=d(y,R.value,D),R!==null&&(I=s(R,I,w),M===null?F=R:M.sibling=R,M=R);return Me&&ts(y,w),F}for(k=r(y,k);!R.done;w++,R=S.next())R=_(k,y,w,R.value,D),R!==null&&(n&&R.alternate!==null&&k.delete(R.key===null?w:R.key),I=s(R,I,w),M===null?F=R:M.sibling=R,M=R);return n&&k.forEach(function(b){return e(y,b)}),Me&&ts(y,w),F}function P(y,I,S,D){if(typeof S=="object"&&S!==null&&S.type===fo&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Ec:e:{for(var F=S.key,M=I;M!==null;){if(M.key===F){if(F=S.type,F===fo){if(M.tag===7){t(y,M.sibling),I=i(M,S.props.children),I.return=y,y=I;break e}}else if(M.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===Kr&&yE(F)===M.type){t(y,M.sibling),I=i(M,S.props),I.ref=Ya(y,M,S),I.return=y,y=I;break e}t(y,M);break}else e(y,M);M=M.sibling}S.type===fo?(I=ys(S.props.children,y.mode,D,S.key),I.return=y,y=I):(D=sh(S.type,S.key,S.props,null,y.mode,D),D.ref=Ya(y,I,S),D.return=y,y=D)}return o(y);case ho:e:{for(M=S.key;I!==null;){if(I.key===M)if(I.tag===4&&I.stateNode.containerInfo===S.containerInfo&&I.stateNode.implementation===S.implementation){t(y,I.sibling),I=i(I,S.children||[]),I.return=y,y=I;break e}else{t(y,I);break}else e(y,I);I=I.sibling}I=Vp(S,y.mode,D),I.return=y,y=I}return o(y);case Kr:return M=S._init,P(y,I,M(S._payload),D)}if(cl(S))return T(y,I,S,D);if(Ga(S))return C(y,I,S,D);Nc(y,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,I!==null&&I.tag===6?(t(y,I.sibling),I=i(I,S),I.return=y,y=I):(t(y,I),I=Dp(S,y.mode,D),I.return=y,y=I),o(y)):t(y,I)}return P}var Bo=L0(!0),M0=L0(!1),Nh=Fi(null),Dh=null,Eo=null,l_=null;function u_(){l_=Eo=Dh=null}function c_(n){var e=Nh.current;Ve(Nh),n._currentValue=e}function Dm(n,e,t){for(;n!==null;){var r=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),n===t)break;n=n.return}}function Po(n,e){Dh=n,l_=Eo=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(qt=!0),n.firstContext=null)}function mn(n){var e=n._currentValue;if(l_!==n)if(n={context:n,memoizedValue:e,next:null},Eo===null){if(Dh===null)throw Error(B(308));Eo=n,Dh.dependencies={lanes:0,firstContext:n}}else Eo=Eo.next=n;return e}var hs=null;function h_(n){hs===null?hs=[n]:hs.push(n)}function F0(n,e,t,r){var i=e.interleaved;return i===null?(t.next=t,h_(e)):(t.next=i.next,i.next=t),e.interleaved=t,Ar(n,r)}function Ar(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var Wr=!1;function d_(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function j0(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Er(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function ci(n,e,t){var r=n.updateQueue;if(r===null)return null;if(r=r.shared,ge&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Ar(n,t)}return i=r.interleaved,i===null?(e.next=e,h_(r)):(e.next=i.next,i.next=e),r.interleaved=e,Ar(n,t)}function Zc(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Jg(n,t)}}function vE(n,e){var t=n.updateQueue,r=n.alternate;if(r!==null&&(r=r.updateQueue,t===r)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?i=s=e:s=s.next=e}else i=s=e;t={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Vh(n,e,t,r){var i=n.updateQueue;Wr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var h=n.alternate;h!==null&&(h=h.updateQueue,a=h.lastBaseUpdate,a!==o&&(a===null?h.firstBaseUpdate=c:a.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=i.baseState;o=0,h=c=l=null,a=s;do{var p=a.lane,_=a.eventTime;if((r&p)===p){h!==null&&(h=h.next={eventTime:_,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var T=n,C=a;switch(p=e,_=t,C.tag){case 1:if(T=C.payload,typeof T=="function"){d=T.call(_,d,p);break e}d=T;break e;case 3:T.flags=T.flags&-65537|128;case 0:if(T=C.payload,p=typeof T=="function"?T.call(_,d,p):T,p==null)break e;d=qe({},d,p);break e;case 2:Wr=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,p=i.effects,p===null?i.effects=[a]:p.push(a))}else _={eventTime:_,lane:p,tag:a.tag,payload:a.payload,callback:a.callback,next:null},h===null?(c=h=_,l=d):h=h.next=_,o|=p;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;p=a,a=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(h===null&&(l=d),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=h,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);Ss|=o,n.lanes=o,n.memoizedState=d}}function wE(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var r=n[e],i=r.callback;if(i!==null){if(r.callback=null,r=t,typeof i!="function")throw Error(B(191,i));i.call(r)}}}var Ru={},qn=Fi(Ru),Xl=Fi(Ru),Zl=Fi(Ru);function ds(n){if(n===Ru)throw Error(B(174));return n}function f_(n,e){switch(Ce(Zl,e),Ce(Xl,n),Ce(qn,Ru),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:fm(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=fm(e,n)}Ve(qn),Ce(qn,e)}function zo(){Ve(qn),Ve(Xl),Ve(Zl)}function U0(n){ds(Zl.current);var e=ds(qn.current),t=fm(e,n.type);e!==t&&(Ce(Xl,n),Ce(qn,t))}function p_(n){Xl.current===n&&(Ve(qn),Ve(Xl))}var ze=Fi(0);function Oh(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Cp=[];function m_(){for(var n=0;n<Cp.length;n++)Cp[n]._workInProgressVersionPrimary=null;Cp.length=0}var eh=Dr.ReactCurrentDispatcher,Rp=Dr.ReactCurrentBatchConfig,Ts=0,$e=null,rt=null,ht=null,Lh=!1,Sl=!1,eu=0,hD=0;function kt(){throw Error(B(321))}function g_(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Vn(n[t],e[t]))return!1;return!0}function __(n,e,t,r,i,s){if(Ts=s,$e=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,eh.current=n===null||n.memoizedState===null?mD:gD,n=t(r,i),Sl){s=0;do{if(Sl=!1,eu=0,25<=s)throw Error(B(301));s+=1,ht=rt=null,e.updateQueue=null,eh.current=_D,n=t(r,i)}while(Sl)}if(eh.current=Mh,e=rt!==null&&rt.next!==null,Ts=0,ht=rt=$e=null,Lh=!1,e)throw Error(B(300));return n}function y_(){var n=eu!==0;return eu=0,n}function Mn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ht===null?$e.memoizedState=ht=n:ht=ht.next=n,ht}function gn(){if(rt===null){var n=$e.alternate;n=n!==null?n.memoizedState:null}else n=rt.next;var e=ht===null?$e.memoizedState:ht.next;if(e!==null)ht=e,rt=n;else{if(n===null)throw Error(B(310));rt=n,n={memoizedState:rt.memoizedState,baseState:rt.baseState,baseQueue:rt.baseQueue,queue:rt.queue,next:null},ht===null?$e.memoizedState=ht=n:ht=ht.next=n}return ht}function tu(n,e){return typeof e=="function"?e(n):e}function Pp(n){var e=gn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=rt,i=r.baseQueue,s=t.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,c=s;do{var h=c.lane;if((Ts&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:n(r,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=r):l=l.next=d,$e.lanes|=h,Ss|=h}c=c.next}while(c!==null&&c!==s);l===null?o=r:l.next=a,Vn(r,e.memoizedState)||(qt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=l,t.lastRenderedState=r}if(n=t.interleaved,n!==null){i=n;do s=i.lane,$e.lanes|=s,Ss|=s,i=i.next;while(i!==n)}else i===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function xp(n){var e=gn(),t=e.queue;if(t===null)throw Error(B(311));t.lastRenderedReducer=n;var r=t.dispatch,i=t.pending,s=e.memoizedState;if(i!==null){t.pending=null;var o=i=i.next;do s=n(s,o.action),o=o.next;while(o!==i);Vn(s,e.memoizedState)||(qt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,r]}function B0(){}function z0(n,e){var t=$e,r=gn(),i=e(),s=!Vn(r.memoizedState,i);if(s&&(r.memoizedState=i,qt=!0),r=r.queue,v_(G0.bind(null,t,r,n),[n]),r.getSnapshot!==e||s||ht!==null&&ht.memoizedState.tag&1){if(t.flags|=2048,nu(9,q0.bind(null,t,r,i,e),void 0,null),mt===null)throw Error(B(349));Ts&30||$0(t,e,i)}return i}function $0(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=$e.updateQueue,e===null?(e={lastEffect:null,stores:null},$e.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function q0(n,e,t,r){e.value=t,e.getSnapshot=r,K0(e)&&W0(n)}function G0(n,e,t){return t(function(){K0(e)&&W0(n)})}function K0(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Vn(n,t)}catch{return!0}}function W0(n){var e=Ar(n,1);e!==null&&Pn(e,n,1,-1)}function EE(n){var e=Mn();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:tu,lastRenderedState:n},e.queue=n,n=n.dispatch=pD.bind(null,$e,n),[e.memoizedState,n]}function nu(n,e,t,r){return n={tag:n,create:e,destroy:t,deps:r,next:null},e=$e.updateQueue,e===null?(e={lastEffect:null,stores:null},$e.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(r=t.next,t.next=n,n.next=r,e.lastEffect=n)),n}function H0(){return gn().memoizedState}function th(n,e,t,r){var i=Mn();$e.flags|=n,i.memoizedState=nu(1|e,t,void 0,r===void 0?null:r)}function Bd(n,e,t,r){var i=gn();r=r===void 0?null:r;var s=void 0;if(rt!==null){var o=rt.memoizedState;if(s=o.destroy,r!==null&&g_(r,o.deps)){i.memoizedState=nu(e,t,s,r);return}}$e.flags|=n,i.memoizedState=nu(1|e,t,s,r)}function IE(n,e){return th(8390656,8,n,e)}function v_(n,e){return Bd(2048,8,n,e)}function Q0(n,e){return Bd(4,2,n,e)}function Y0(n,e){return Bd(4,4,n,e)}function J0(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function X0(n,e,t){return t=t!=null?t.concat([n]):null,Bd(4,4,J0.bind(null,e,n),t)}function w_(){}function Z0(n,e){var t=gn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&g_(e,r[1])?r[0]:(t.memoizedState=[n,e],n)}function eA(n,e){var t=gn();e=e===void 0?null:e;var r=t.memoizedState;return r!==null&&e!==null&&g_(e,r[1])?r[0]:(n=n(),t.memoizedState=[n,e],n)}function tA(n,e,t){return Ts&21?(Vn(t,e)||(t=o0(),$e.lanes|=t,Ss|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,qt=!0),n.memoizedState=t)}function dD(n,e){var t=we;we=t!==0&&4>t?t:4,n(!0);var r=Rp.transition;Rp.transition={};try{n(!1),e()}finally{we=t,Rp.transition=r}}function nA(){return gn().memoizedState}function fD(n,e,t){var r=di(n);if(t={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null},rA(n))iA(e,t);else if(t=F0(n,e,t,r),t!==null){var i=Ut();Pn(t,n,r,i),sA(t,e,r)}}function pD(n,e,t){var r=di(n),i={lane:r,action:t,hasEagerState:!1,eagerState:null,next:null};if(rA(n))iA(e,i);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(i.hasEagerState=!0,i.eagerState=a,Vn(a,o)){var l=e.interleaved;l===null?(i.next=i,h_(e)):(i.next=l.next,l.next=i),e.interleaved=i;return}}catch{}finally{}t=F0(n,e,i,r),t!==null&&(i=Ut(),Pn(t,n,r,i),sA(t,e,r))}}function rA(n){var e=n.alternate;return n===$e||e!==null&&e===$e}function iA(n,e){Sl=Lh=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function sA(n,e,t){if(t&4194240){var r=e.lanes;r&=n.pendingLanes,t|=r,e.lanes=t,Jg(n,t)}}var Mh={readContext:mn,useCallback:kt,useContext:kt,useEffect:kt,useImperativeHandle:kt,useInsertionEffect:kt,useLayoutEffect:kt,useMemo:kt,useReducer:kt,useRef:kt,useState:kt,useDebugValue:kt,useDeferredValue:kt,useTransition:kt,useMutableSource:kt,useSyncExternalStore:kt,useId:kt,unstable_isNewReconciler:!1},mD={readContext:mn,useCallback:function(n,e){return Mn().memoizedState=[n,e===void 0?null:e],n},useContext:mn,useEffect:IE,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,th(4194308,4,J0.bind(null,e,n),t)},useLayoutEffect:function(n,e){return th(4194308,4,n,e)},useInsertionEffect:function(n,e){return th(4,2,n,e)},useMemo:function(n,e){var t=Mn();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var r=Mn();return e=t!==void 0?t(e):e,r.memoizedState=r.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},r.queue=n,n=n.dispatch=fD.bind(null,$e,n),[r.memoizedState,n]},useRef:function(n){var e=Mn();return n={current:n},e.memoizedState=n},useState:EE,useDebugValue:w_,useDeferredValue:function(n){return Mn().memoizedState=n},useTransition:function(){var n=EE(!1),e=n[0];return n=dD.bind(null,n[1]),Mn().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var r=$e,i=Mn();if(Me){if(t===void 0)throw Error(B(407));t=t()}else{if(t=e(),mt===null)throw Error(B(349));Ts&30||$0(r,e,t)}i.memoizedState=t;var s={value:t,getSnapshot:e};return i.queue=s,IE(G0.bind(null,r,s,n),[n]),r.flags|=2048,nu(9,q0.bind(null,r,s,t,e),void 0,null),t},useId:function(){var n=Mn(),e=mt.identifierPrefix;if(Me){var t=mr,r=pr;t=(r&~(1<<32-Rn(r)-1)).toString(32)+t,e=":"+e+"R"+t,t=eu++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=hD++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},gD={readContext:mn,useCallback:Z0,useContext:mn,useEffect:v_,useImperativeHandle:X0,useInsertionEffect:Q0,useLayoutEffect:Y0,useMemo:eA,useReducer:Pp,useRef:H0,useState:function(){return Pp(tu)},useDebugValue:w_,useDeferredValue:function(n){var e=gn();return tA(e,rt.memoizedState,n)},useTransition:function(){var n=Pp(tu)[0],e=gn().memoizedState;return[n,e]},useMutableSource:B0,useSyncExternalStore:z0,useId:nA,unstable_isNewReconciler:!1},_D={readContext:mn,useCallback:Z0,useContext:mn,useEffect:v_,useImperativeHandle:X0,useInsertionEffect:Q0,useLayoutEffect:Y0,useMemo:eA,useReducer:xp,useRef:H0,useState:function(){return xp(tu)},useDebugValue:w_,useDeferredValue:function(n){var e=gn();return rt===null?e.memoizedState=n:tA(e,rt.memoizedState,n)},useTransition:function(){var n=xp(tu)[0],e=gn().memoizedState;return[n,e]},useMutableSource:B0,useSyncExternalStore:z0,useId:nA,unstable_isNewReconciler:!1};function wn(n,e){if(n&&n.defaultProps){e=qe({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Vm(n,e,t,r){e=n.memoizedState,t=t(r,e),t=t==null?e:qe({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var zd={isMounted:function(n){return(n=n._reactInternals)?zs(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=di(n),s=Er(r,i);s.payload=e,t!=null&&(s.callback=t),e=ci(n,s,i),e!==null&&(Pn(e,n,i,r),Zc(e,n,i))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var r=Ut(),i=di(n),s=Er(r,i);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=ci(n,s,i),e!==null&&(Pn(e,n,i,r),Zc(e,n,i))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=Ut(),r=di(n),i=Er(t,r);i.tag=2,e!=null&&(i.callback=e),e=ci(n,i,r),e!==null&&(Pn(e,n,r,t),Zc(e,n,r))}};function TE(n,e,t,r,i,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!Hl(t,r)||!Hl(i,s):!0}function oA(n,e,t){var r=!1,i=Ei,s=e.contextType;return typeof s=="object"&&s!==null?s=mn(s):(i=Yt(e)?Es:Vt.current,r=e.contextTypes,s=(r=r!=null)?jo(n,i):Ei),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=zd,n.stateNode=e,e._reactInternals=n,r&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=s),e}function SE(n,e,t,r){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,r),e.state!==n&&zd.enqueueReplaceState(e,e.state,null)}function Om(n,e,t,r){var i=n.stateNode;i.props=t,i.state=n.memoizedState,i.refs={},d_(n);var s=e.contextType;typeof s=="object"&&s!==null?i.context=mn(s):(s=Yt(e)?Es:Vt.current,i.context=jo(n,s)),i.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Vm(n,e,s,t),i.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&zd.enqueueReplaceState(i,i.state,null),Vh(n,t,i,r),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308)}function $o(n,e){try{var t="",r=e;do t+=Gb(r),r=r.return;while(r);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:i,digest:null}}function bp(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Lm(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var yD=typeof WeakMap=="function"?WeakMap:Map;function aA(n,e,t){t=Er(-1,t),t.tag=3,t.payload={element:null};var r=e.value;return t.callback=function(){jh||(jh=!0,Km=r),Lm(n,e)},t}function lA(n,e,t){t=Er(-1,t),t.tag=3;var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;t.payload=function(){return r(i)},t.callback=function(){Lm(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Lm(n,e),typeof r!="function"&&(hi===null?hi=new Set([this]):hi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function AE(n,e,t){var r=n.pingCache;if(r===null){r=n.pingCache=new yD;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(t)||(i.add(t),n=ND.bind(null,n,e,t),e.then(n,n))}function kE(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function CE(n,e,t,r,i){return n.mode&1?(n.flags|=65536,n.lanes=i,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Er(-1,1),e.tag=2,ci(t,e,1))),t.lanes|=1),n)}var vD=Dr.ReactCurrentOwner,qt=!1;function Ft(n,e,t,r){e.child=n===null?M0(e,null,t,r):Bo(e,n.child,t,r)}function RE(n,e,t,r,i){t=t.render;var s=e.ref;return Po(e,i),r=__(n,e,t,r,s,i),t=y_(),n!==null&&!qt?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,kr(n,e,i)):(Me&&t&&s_(e),e.flags|=1,Ft(n,e,r,i),e.child)}function PE(n,e,t,r,i){if(n===null){var s=t.type;return typeof s=="function"&&!R_(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,uA(n,e,s,r,i)):(n=sh(t.type,null,r,e,e.mode,i),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&i)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:Hl,t(o,r)&&n.ref===e.ref)return kr(n,e,i)}return e.flags|=1,n=fi(s,r),n.ref=e.ref,n.return=e,e.child=n}function uA(n,e,t,r,i){if(n!==null){var s=n.memoizedProps;if(Hl(s,r)&&n.ref===e.ref)if(qt=!1,e.pendingProps=r=s,(n.lanes&i)!==0)n.flags&131072&&(qt=!0);else return e.lanes=n.lanes,kr(n,e,i)}return Mm(n,e,t,r,i)}function cA(n,e,t){var r=e.pendingProps,i=r.children,s=n!==null?n.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ce(To,tn),tn|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,Ce(To,tn),tn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:t,Ce(To,tn),tn|=r}else s!==null?(r=s.baseLanes|t,e.memoizedState=null):r=t,Ce(To,tn),tn|=r;return Ft(n,e,i,t),e.child}function hA(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Mm(n,e,t,r,i){var s=Yt(t)?Es:Vt.current;return s=jo(e,s),Po(e,i),t=__(n,e,t,r,s,i),r=y_(),n!==null&&!qt?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~i,kr(n,e,i)):(Me&&r&&s_(e),e.flags|=1,Ft(n,e,t,i),e.child)}function xE(n,e,t,r,i){if(Yt(t)){var s=!0;Ph(e)}else s=!1;if(Po(e,i),e.stateNode===null)nh(n,e),oA(e,t,r),Om(e,t,r,i),r=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=mn(c):(c=Yt(t)?Es:Vt.current,c=jo(e,c));var h=t.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==c)&&SE(e,o,r,c),Wr=!1;var p=e.memoizedState;o.state=p,Vh(e,r,o,i),l=e.memoizedState,a!==r||p!==l||Qt.current||Wr?(typeof h=="function"&&(Vm(e,t,h,r),l=e.memoizedState),(a=Wr||TE(e,t,a,r,p,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=l),o.props=r,o.state=l,o.context=c,r=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,j0(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:wn(e.type,a),o.props=c,d=e.pendingProps,p=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=mn(l):(l=Yt(t)?Es:Vt.current,l=jo(e,l));var _=t.getDerivedStateFromProps;(h=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||p!==l)&&SE(e,o,r,l),Wr=!1,p=e.memoizedState,o.state=p,Vh(e,r,o,i);var T=e.memoizedState;a!==d||p!==T||Qt.current||Wr?(typeof _=="function"&&(Vm(e,t,_,r),T=e.memoizedState),(c=Wr||TE(e,t,c,r,p,T,l)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,T,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,T,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=T),o.props=r,o.state=T,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&p===n.memoizedState||(e.flags|=1024),r=!1)}return Fm(n,e,t,r,s,i)}function Fm(n,e,t,r,i,s){hA(n,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&mE(e,t,!1),kr(n,e,s);r=e.stateNode,vD.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,n!==null&&o?(e.child=Bo(e,n.child,null,s),e.child=Bo(e,null,a,s)):Ft(n,e,a,s),e.memoizedState=r.state,i&&mE(e,t,!0),e.child}function dA(n){var e=n.stateNode;e.pendingContext?pE(n,e.pendingContext,e.pendingContext!==e.context):e.context&&pE(n,e.context,!1),f_(n,e.containerInfo)}function bE(n,e,t,r,i){return Uo(),a_(i),e.flags|=256,Ft(n,e,t,r),e.child}var jm={dehydrated:null,treeContext:null,retryLane:0};function Um(n){return{baseLanes:n,cachePool:null,transitions:null}}function fA(n,e,t){var r=e.pendingProps,i=ze.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(i&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(i|=1),Ce(ze,i&1),n===null)return Nm(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,n=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Gd(o,r,0,null),n=ys(n,r,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Um(t),e.memoizedState=jm,n):E_(e,o));if(i=n.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return wD(n,e,o,r,a,i,t);if(s){s=r.fallback,o=e.mode,i=n.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=l,e.deletions=null):(r=fi(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=fi(a,s):(s=ys(s,o,t,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=n.child.memoizedState,o=o===null?Um(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=jm,r}return s=n.child,n=s.sibling,r=fi(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=t),r.return=e,r.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=r,e.memoizedState=null,r}function E_(n,e){return e=Gd({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function Dc(n,e,t,r){return r!==null&&a_(r),Bo(e,n.child,null,t),n=E_(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function wD(n,e,t,r,i,s,o){if(t)return e.flags&256?(e.flags&=-257,r=bp(Error(B(422))),Dc(n,e,o,r)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Gd({mode:"visible",children:r.children},i,0,null),s=ys(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Bo(e,n.child,null,o),e.child.memoizedState=Um(o),e.memoizedState=jm,s);if(!(e.mode&1))return Dc(n,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(B(419)),r=bp(s,r,void 0),Dc(n,e,o,r)}if(a=(o&n.childLanes)!==0,qt||a){if(r=mt,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Ar(n,i),Pn(r,n,i,-1))}return C_(),r=bp(Error(B(421))),Dc(n,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=n.child,e=DD.bind(null,n),i._reactRetry=e,null):(n=s.treeContext,nn=ui(i.nextSibling),rn=e,Me=!0,In=null,n!==null&&(cn[hn++]=pr,cn[hn++]=mr,cn[hn++]=Is,pr=n.id,mr=n.overflow,Is=e),e=E_(e,r.children),e.flags|=4096,e)}function NE(n,e,t){n.lanes|=e;var r=n.alternate;r!==null&&(r.lanes|=e),Dm(n.return,e,t)}function Np(n,e,t,r,i){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:t,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=t,s.tailMode=i)}function pA(n,e,t){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Ft(n,e,r.children,t),r=ze.current,r&2)r=r&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&NE(n,t,e);else if(n.tag===19)NE(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}r&=1}if(Ce(ze,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(t=e.child,i=null;t!==null;)n=t.alternate,n!==null&&Oh(n)===null&&(i=t),t=t.sibling;t=i,t===null?(i=e.child,e.child=null):(i=t.sibling,t.sibling=null),Np(e,!1,i,t,s);break;case"backwards":for(t=null,i=e.child,e.child=null;i!==null;){if(n=i.alternate,n!==null&&Oh(n)===null){e.child=i;break}n=i.sibling,i.sibling=t,t=i,i=n}Np(e,!0,t,null,s);break;case"together":Np(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function nh(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function kr(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Ss|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(B(153));if(e.child!==null){for(n=e.child,t=fi(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=fi(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function ED(n,e,t){switch(e.tag){case 3:dA(e),Uo();break;case 5:U0(e);break;case 1:Yt(e.type)&&Ph(e);break;case 4:f_(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;Ce(Nh,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(Ce(ze,ze.current&1),e.flags|=128,null):t&e.child.childLanes?fA(n,e,t):(Ce(ze,ze.current&1),n=kr(n,e,t),n!==null?n.sibling:null);Ce(ze,ze.current&1);break;case 19:if(r=(t&e.childLanes)!==0,n.flags&128){if(r)return pA(n,e,t);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Ce(ze,ze.current),r)break;return null;case 22:case 23:return e.lanes=0,cA(n,e,t)}return kr(n,e,t)}var mA,Bm,gA,_A;mA=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Bm=function(){};gA=function(n,e,t,r){var i=n.memoizedProps;if(i!==r){n=e.stateNode,ds(qn.current);var s=null;switch(t){case"input":i=um(n,i),r=um(n,r),s=[];break;case"select":i=qe({},i,{value:void 0}),r=qe({},r,{value:void 0}),s=[];break;case"textarea":i=dm(n,i),r=dm(n,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(n.onclick=Ch)}pm(t,r);var o;t=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var a=i[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Bl.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var l=r[c];if(a=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Bl.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Pe("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};_A=function(n,e,t,r){t!==r&&(e.flags|=4)};function Ja(n,e){if(!Me)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:r.sibling=null}}function Ct(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,r=0;if(e)for(var i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=n,i=i.sibling;else for(i=n.child;i!==null;)t|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=n,i=i.sibling;return n.subtreeFlags|=r,n.childLanes=t,e}function ID(n,e,t){var r=e.pendingProps;switch(o_(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ct(e),null;case 1:return Yt(e.type)&&Rh(),Ct(e),null;case 3:return r=e.stateNode,zo(),Ve(Qt),Ve(Vt),m_(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(n===null||n.child===null)&&(bc(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,In!==null&&(Qm(In),In=null))),Bm(n,e),Ct(e),null;case 5:p_(e);var i=ds(Zl.current);if(t=e.type,n!==null&&e.stateNode!=null)gA(n,e,t,r,i),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(B(166));return Ct(e),null}if(n=ds(qn.current),bc(e)){r=e.stateNode,t=e.type;var s=e.memoizedProps;switch(r[Fn]=e,r[Jl]=s,n=(e.mode&1)!==0,t){case"dialog":Pe("cancel",r),Pe("close",r);break;case"iframe":case"object":case"embed":Pe("load",r);break;case"video":case"audio":for(i=0;i<dl.length;i++)Pe(dl[i],r);break;case"source":Pe("error",r);break;case"img":case"image":case"link":Pe("error",r),Pe("load",r);break;case"details":Pe("toggle",r);break;case"input":Bw(r,s),Pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Pe("invalid",r);break;case"textarea":$w(r,s),Pe("invalid",r)}pm(t,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&xc(r.textContent,a,n),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&xc(r.textContent,a,n),i=["children",""+a]):Bl.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Pe("scroll",r)}switch(t){case"input":Ic(r),zw(r,s,!0);break;case"textarea":Ic(r),qw(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Ch)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=GS(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof r.is=="string"?n=o.createElement(t,{is:r.is}):(n=o.createElement(t),t==="select"&&(o=n,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):n=o.createElementNS(n,t),n[Fn]=e,n[Jl]=r,mA(n,e,!1,!1),e.stateNode=n;e:{switch(o=mm(t,r),t){case"dialog":Pe("cancel",n),Pe("close",n),i=r;break;case"iframe":case"object":case"embed":Pe("load",n),i=r;break;case"video":case"audio":for(i=0;i<dl.length;i++)Pe(dl[i],n);i=r;break;case"source":Pe("error",n),i=r;break;case"img":case"image":case"link":Pe("error",n),Pe("load",n),i=r;break;case"details":Pe("toggle",n),i=r;break;case"input":Bw(n,r),i=um(n,r),Pe("invalid",n);break;case"option":i=r;break;case"select":n._wrapperState={wasMultiple:!!r.multiple},i=qe({},r,{value:void 0}),Pe("invalid",n);break;case"textarea":$w(n,r),i=dm(n,r),Pe("invalid",n);break;default:i=r}pm(t,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?HS(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&KS(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&zl(n,l):typeof l=="number"&&zl(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Bl.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Pe("scroll",n):l!=null&&Gg(n,s,l,o))}switch(t){case"input":Ic(n),zw(n,r,!1);break;case"textarea":Ic(n),qw(n);break;case"option":r.value!=null&&n.setAttribute("value",""+wi(r.value));break;case"select":n.multiple=!!r.multiple,s=r.value,s!=null?Ao(n,!!r.multiple,s,!1):r.defaultValue!=null&&Ao(n,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(n.onclick=Ch)}switch(t){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ct(e),null;case 6:if(n&&e.stateNode!=null)_A(n,e,n.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(B(166));if(t=ds(Zl.current),ds(qn.current),bc(e)){if(r=e.stateNode,t=e.memoizedProps,r[Fn]=e,(s=r.nodeValue!==t)&&(n=rn,n!==null))switch(n.tag){case 3:xc(r.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&xc(r.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else r=(t.nodeType===9?t:t.ownerDocument).createTextNode(r),r[Fn]=e,e.stateNode=r}return Ct(e),null;case 13:if(Ve(ze),r=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Me&&nn!==null&&e.mode&1&&!(e.flags&128))O0(),Uo(),e.flags|=98560,s=!1;else if(s=bc(e),r!==null&&r.dehydrated!==null){if(n===null){if(!s)throw Error(B(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(B(317));s[Fn]=e}else Uo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ct(e),s=!1}else In!==null&&(Qm(In),In=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(r=r!==null,r!==(n!==null&&n.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(n===null||ze.current&1?ot===0&&(ot=3):C_())),e.updateQueue!==null&&(e.flags|=4),Ct(e),null);case 4:return zo(),Bm(n,e),n===null&&Ql(e.stateNode.containerInfo),Ct(e),null;case 10:return c_(e.type._context),Ct(e),null;case 17:return Yt(e.type)&&Rh(),Ct(e),null;case 19:if(Ve(ze),s=e.memoizedState,s===null)return Ct(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ja(s,!1);else{if(ot!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Oh(n),o!==null){for(e.flags|=128,Ja(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=t,t=e.child;t!==null;)s=t,n=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return Ce(ze,ze.current&1|2),e.child}n=n.sibling}s.tail!==null&&Xe()>qo&&(e.flags|=128,r=!0,Ja(s,!1),e.lanes=4194304)}else{if(!r)if(n=Oh(o),n!==null){if(e.flags|=128,r=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Ja(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Me)return Ct(e),null}else 2*Xe()-s.renderingStartTime>qo&&t!==1073741824&&(e.flags|=128,r=!0,Ja(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Xe(),e.sibling=null,t=ze.current,Ce(ze,r?t&1|2:t&1),e):(Ct(e),null);case 22:case 23:return k_(),r=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?tn&1073741824&&(Ct(e),e.subtreeFlags&6&&(e.flags|=8192)):Ct(e),null;case 24:return null;case 25:return null}throw Error(B(156,e.tag))}function TD(n,e){switch(o_(e),e.tag){case 1:return Yt(e.type)&&Rh(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return zo(),Ve(Qt),Ve(Vt),m_(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return p_(e),null;case 13:if(Ve(ze),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(B(340));Uo()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return Ve(ze),null;case 4:return zo(),null;case 10:return c_(e.type._context),null;case 22:case 23:return k_(),null;case 24:return null;default:return null}}var Vc=!1,xt=!1,SD=typeof WeakSet=="function"?WeakSet:Set,Q=null;function Io(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(r){He(n,e,r)}else t.current=null}function zm(n,e,t){try{t()}catch(r){He(n,e,r)}}var DE=!1;function AD(n,e){if(Am=Sh,n=I0(),i_(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var r=t.getSelection&&t.getSelection();if(r&&r.rangeCount!==0){t=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,h=0,d=n,p=null;t:for(;;){for(var _;d!==t||i!==0&&d.nodeType!==3||(a=o+i),d!==s||r!==0&&d.nodeType!==3||(l=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(_=d.firstChild)!==null;)p=d,d=_;for(;;){if(d===n)break t;if(p===t&&++c===i&&(a=o),p===s&&++h===r&&(l=o),(_=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=_}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(km={focusedElem:n,selectionRange:t},Sh=!1,Q=e;Q!==null;)if(e=Q,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,Q=n;else for(;Q!==null;){e=Q;try{var T=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(T!==null){var C=T.memoizedProps,P=T.memoizedState,y=e.stateNode,I=y.getSnapshotBeforeUpdate(e.elementType===e.type?C:wn(e.type,C),P);y.__reactInternalSnapshotBeforeUpdate=I}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(B(163))}}catch(D){He(e,e.return,D)}if(n=e.sibling,n!==null){n.return=e.return,Q=n;break}Q=e.return}return T=DE,DE=!1,T}function Al(n,e,t){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&n)===n){var s=i.destroy;i.destroy=void 0,s!==void 0&&zm(e,t,s)}i=i.next}while(i!==r)}}function $d(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var r=t.create;t.destroy=r()}t=t.next}while(t!==e)}}function $m(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function yA(n){var e=n.alternate;e!==null&&(n.alternate=null,yA(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[Fn],delete e[Jl],delete e[Pm],delete e[aD],delete e[lD])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function vA(n){return n.tag===5||n.tag===3||n.tag===4}function VE(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||vA(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function qm(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Ch));else if(r!==4&&(n=n.child,n!==null))for(qm(n,e,t),n=n.sibling;n!==null;)qm(n,e,t),n=n.sibling}function Gm(n,e,t){var r=n.tag;if(r===5||r===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(r!==4&&(n=n.child,n!==null))for(Gm(n,e,t),n=n.sibling;n!==null;)Gm(n,e,t),n=n.sibling}var vt=null,En=!1;function zr(n,e,t){for(t=t.child;t!==null;)wA(n,e,t),t=t.sibling}function wA(n,e,t){if($n&&typeof $n.onCommitFiberUnmount=="function")try{$n.onCommitFiberUnmount(Od,t)}catch{}switch(t.tag){case 5:xt||Io(t,e);case 6:var r=vt,i=En;vt=null,zr(n,e,t),vt=r,En=i,vt!==null&&(En?(n=vt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):vt.removeChild(t.stateNode));break;case 18:vt!==null&&(En?(n=vt,t=t.stateNode,n.nodeType===8?Ap(n.parentNode,t):n.nodeType===1&&Ap(n,t),Kl(n)):Ap(vt,t.stateNode));break;case 4:r=vt,i=En,vt=t.stateNode.containerInfo,En=!0,zr(n,e,t),vt=r,En=i;break;case 0:case 11:case 14:case 15:if(!xt&&(r=t.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&zm(t,e,o),i=i.next}while(i!==r)}zr(n,e,t);break;case 1:if(!xt&&(Io(t,e),r=t.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=t.memoizedProps,r.state=t.memoizedState,r.componentWillUnmount()}catch(a){He(t,e,a)}zr(n,e,t);break;case 21:zr(n,e,t);break;case 22:t.mode&1?(xt=(r=xt)||t.memoizedState!==null,zr(n,e,t),xt=r):zr(n,e,t);break;default:zr(n,e,t)}}function OE(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new SD),e.forEach(function(r){var i=VD.bind(null,n,r);t.has(r)||(t.add(r),r.then(i,i))})}}function vn(n,e){var t=e.deletions;if(t!==null)for(var r=0;r<t.length;r++){var i=t[r];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:vt=a.stateNode,En=!1;break e;case 3:vt=a.stateNode.containerInfo,En=!0;break e;case 4:vt=a.stateNode.containerInfo,En=!0;break e}a=a.return}if(vt===null)throw Error(B(160));wA(s,o,i),vt=null,En=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){He(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)EA(e,n),e=e.sibling}function EA(n,e){var t=n.alternate,r=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(vn(e,n),Ln(n),r&4){try{Al(3,n,n.return),$d(3,n)}catch(C){He(n,n.return,C)}try{Al(5,n,n.return)}catch(C){He(n,n.return,C)}}break;case 1:vn(e,n),Ln(n),r&512&&t!==null&&Io(t,t.return);break;case 5:if(vn(e,n),Ln(n),r&512&&t!==null&&Io(t,t.return),n.flags&32){var i=n.stateNode;try{zl(i,"")}catch(C){He(n,n.return,C)}}if(r&4&&(i=n.stateNode,i!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&$S(i,s),mm(a,o);var c=mm(a,s);for(o=0;o<l.length;o+=2){var h=l[o],d=l[o+1];h==="style"?HS(i,d):h==="dangerouslySetInnerHTML"?KS(i,d):h==="children"?zl(i,d):Gg(i,h,d,c)}switch(a){case"input":cm(i,s);break;case"textarea":qS(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var _=s.value;_!=null?Ao(i,!!s.multiple,_,!1):p!==!!s.multiple&&(s.defaultValue!=null?Ao(i,!!s.multiple,s.defaultValue,!0):Ao(i,!!s.multiple,s.multiple?[]:"",!1))}i[Jl]=s}catch(C){He(n,n.return,C)}}break;case 6:if(vn(e,n),Ln(n),r&4){if(n.stateNode===null)throw Error(B(162));i=n.stateNode,s=n.memoizedProps;try{i.nodeValue=s}catch(C){He(n,n.return,C)}}break;case 3:if(vn(e,n),Ln(n),r&4&&t!==null&&t.memoizedState.isDehydrated)try{Kl(e.containerInfo)}catch(C){He(n,n.return,C)}break;case 4:vn(e,n),Ln(n);break;case 13:vn(e,n),Ln(n),i=n.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(S_=Xe())),r&4&&OE(n);break;case 22:if(h=t!==null&&t.memoizedState!==null,n.mode&1?(xt=(c=xt)||h,vn(e,n),xt=c):vn(e,n),Ln(n),r&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!h&&n.mode&1)for(Q=n,h=n.child;h!==null;){for(d=Q=h;Q!==null;){switch(p=Q,_=p.child,p.tag){case 0:case 11:case 14:case 15:Al(4,p,p.return);break;case 1:Io(p,p.return);var T=p.stateNode;if(typeof T.componentWillUnmount=="function"){r=p,t=p.return;try{e=r,T.props=e.memoizedProps,T.state=e.memoizedState,T.componentWillUnmount()}catch(C){He(r,t,C)}}break;case 5:Io(p,p.return);break;case 22:if(p.memoizedState!==null){ME(d);continue}}_!==null?(_.return=p,Q=_):ME(d)}h=h.sibling}e:for(h=null,d=n;;){if(d.tag===5){if(h===null){h=d;try{i=d.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=WS("display",o))}catch(C){He(n,n.return,C)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(C){He(n,n.return,C)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===n)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===n)break e;for(;d.sibling===null;){if(d.return===null||d.return===n)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:vn(e,n),Ln(n),r&4&&OE(n);break;case 21:break;default:vn(e,n),Ln(n)}}function Ln(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(vA(t)){var r=t;break e}t=t.return}throw Error(B(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(zl(i,""),r.flags&=-33);var s=VE(n);Gm(n,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=VE(n);qm(n,a,o);break;default:throw Error(B(161))}}catch(l){He(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function kD(n,e,t){Q=n,IA(n)}function IA(n,e,t){for(var r=(n.mode&1)!==0;Q!==null;){var i=Q,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Vc;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||xt;a=Vc;var c=xt;if(Vc=o,(xt=l)&&!c)for(Q=i;Q!==null;)o=Q,l=o.child,o.tag===22&&o.memoizedState!==null?FE(i):l!==null?(l.return=o,Q=l):FE(i);for(;s!==null;)Q=s,IA(s),s=s.sibling;Q=i,Vc=a,xt=c}LE(n)}else i.subtreeFlags&8772&&s!==null?(s.return=i,Q=s):LE(n)}}function LE(n){for(;Q!==null;){var e=Q;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:xt||$d(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!xt)if(t===null)r.componentDidMount();else{var i=e.elementType===e.type?t.memoizedProps:wn(e.type,t.memoizedProps);r.componentDidUpdate(i,t.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&wE(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}wE(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&Kl(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(B(163))}xt||e.flags&512&&$m(e)}catch(p){He(e,e.return,p)}}if(e===n){Q=null;break}if(t=e.sibling,t!==null){t.return=e.return,Q=t;break}Q=e.return}}function ME(n){for(;Q!==null;){var e=Q;if(e===n){Q=null;break}var t=e.sibling;if(t!==null){t.return=e.return,Q=t;break}Q=e.return}}function FE(n){for(;Q!==null;){var e=Q;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{$d(4,e)}catch(l){He(e,t,l)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(l){He(e,i,l)}}var s=e.return;try{$m(e)}catch(l){He(e,s,l)}break;case 5:var o=e.return;try{$m(e)}catch(l){He(e,o,l)}}}catch(l){He(e,e.return,l)}if(e===n){Q=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Q=a;break}Q=e.return}}var CD=Math.ceil,Fh=Dr.ReactCurrentDispatcher,I_=Dr.ReactCurrentOwner,fn=Dr.ReactCurrentBatchConfig,ge=0,mt=null,nt=null,Et=0,tn=0,To=Fi(0),ot=0,ru=null,Ss=0,qd=0,T_=0,kl=null,$t=null,S_=0,qo=1/0,hr=null,jh=!1,Km=null,hi=null,Oc=!1,ri=null,Uh=0,Cl=0,Wm=null,rh=-1,ih=0;function Ut(){return ge&6?Xe():rh!==-1?rh:rh=Xe()}function di(n){return n.mode&1?ge&2&&Et!==0?Et&-Et:cD.transition!==null?(ih===0&&(ih=o0()),ih):(n=we,n!==0||(n=window.event,n=n===void 0?16:f0(n.type)),n):1}function Pn(n,e,t,r){if(50<Cl)throw Cl=0,Wm=null,Error(B(185));Au(n,t,r),(!(ge&2)||n!==mt)&&(n===mt&&(!(ge&2)&&(qd|=t),ot===4&&Qr(n,Et)),Jt(n,r),t===1&&ge===0&&!(e.mode&1)&&(qo=Xe()+500,Ud&&ji()))}function Jt(n,e){var t=n.callbackNode;cN(n,e);var r=Th(n,n===mt?Et:0);if(r===0)t!==null&&Ww(t),n.callbackNode=null,n.callbackPriority=0;else if(e=r&-r,n.callbackPriority!==e){if(t!=null&&Ww(t),e===1)n.tag===0?uD(jE.bind(null,n)):N0(jE.bind(null,n)),sD(function(){!(ge&6)&&ji()}),t=null;else{switch(a0(r)){case 1:t=Yg;break;case 4:t=i0;break;case 16:t=Ih;break;case 536870912:t=s0;break;default:t=Ih}t=xA(t,TA.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function TA(n,e){if(rh=-1,ih=0,ge&6)throw Error(B(327));var t=n.callbackNode;if(xo()&&n.callbackNode!==t)return null;var r=Th(n,n===mt?Et:0);if(r===0)return null;if(r&30||r&n.expiredLanes||e)e=Bh(n,r);else{e=r;var i=ge;ge|=2;var s=AA();(mt!==n||Et!==e)&&(hr=null,qo=Xe()+500,_s(n,e));do try{xD();break}catch(a){SA(n,a)}while(!0);u_(),Fh.current=s,ge=i,nt!==null?e=0:(mt=null,Et=0,e=ot)}if(e!==0){if(e===2&&(i=wm(n),i!==0&&(r=i,e=Hm(n,i))),e===1)throw t=ru,_s(n,0),Qr(n,r),Jt(n,Xe()),t;if(e===6)Qr(n,r);else{if(i=n.current.alternate,!(r&30)&&!RD(i)&&(e=Bh(n,r),e===2&&(s=wm(n),s!==0&&(r=s,e=Hm(n,s))),e===1))throw t=ru,_s(n,0),Qr(n,r),Jt(n,Xe()),t;switch(n.finishedWork=i,n.finishedLanes=r,e){case 0:case 1:throw Error(B(345));case 2:ns(n,$t,hr);break;case 3:if(Qr(n,r),(r&130023424)===r&&(e=S_+500-Xe(),10<e)){if(Th(n,0)!==0)break;if(i=n.suspendedLanes,(i&r)!==r){Ut(),n.pingedLanes|=n.suspendedLanes&i;break}n.timeoutHandle=Rm(ns.bind(null,n,$t,hr),e);break}ns(n,$t,hr);break;case 4:if(Qr(n,r),(r&4194240)===r)break;for(e=n.eventTimes,i=-1;0<r;){var o=31-Rn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Xe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*CD(r/1960))-r,10<r){n.timeoutHandle=Rm(ns.bind(null,n,$t,hr),r);break}ns(n,$t,hr);break;case 5:ns(n,$t,hr);break;default:throw Error(B(329))}}}return Jt(n,Xe()),n.callbackNode===t?TA.bind(null,n):null}function Hm(n,e){var t=kl;return n.current.memoizedState.isDehydrated&&(_s(n,e).flags|=256),n=Bh(n,e),n!==2&&(e=$t,$t=t,e!==null&&Qm(e)),n}function Qm(n){$t===null?$t=n:$t.push.apply($t,n)}function RD(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var r=0;r<t.length;r++){var i=t[r],s=i.getSnapshot;i=i.value;try{if(!Vn(s(),i))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Qr(n,e){for(e&=~T_,e&=~qd,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Rn(e),r=1<<t;n[t]=-1,e&=~r}}function jE(n){if(ge&6)throw Error(B(327));xo();var e=Th(n,0);if(!(e&1))return Jt(n,Xe()),null;var t=Bh(n,e);if(n.tag!==0&&t===2){var r=wm(n);r!==0&&(e=r,t=Hm(n,r))}if(t===1)throw t=ru,_s(n,0),Qr(n,e),Jt(n,Xe()),t;if(t===6)throw Error(B(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,ns(n,$t,hr),Jt(n,Xe()),null}function A_(n,e){var t=ge;ge|=1;try{return n(e)}finally{ge=t,ge===0&&(qo=Xe()+500,Ud&&ji())}}function As(n){ri!==null&&ri.tag===0&&!(ge&6)&&xo();var e=ge;ge|=1;var t=fn.transition,r=we;try{if(fn.transition=null,we=1,n)return n()}finally{we=r,fn.transition=t,ge=e,!(ge&6)&&ji()}}function k_(){tn=To.current,Ve(To)}function _s(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,iD(t)),nt!==null)for(t=nt.return;t!==null;){var r=t;switch(o_(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Rh();break;case 3:zo(),Ve(Qt),Ve(Vt),m_();break;case 5:p_(r);break;case 4:zo();break;case 13:Ve(ze);break;case 19:Ve(ze);break;case 10:c_(r.type._context);break;case 22:case 23:k_()}t=t.return}if(mt=n,nt=n=fi(n.current,null),Et=tn=e,ot=0,ru=null,T_=qd=Ss=0,$t=kl=null,hs!==null){for(e=0;e<hs.length;e++)if(t=hs[e],r=t.interleaved,r!==null){t.interleaved=null;var i=r.next,s=t.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}t.pending=r}hs=null}return n}function SA(n,e){do{var t=nt;try{if(u_(),eh.current=Mh,Lh){for(var r=$e.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Lh=!1}if(Ts=0,ht=rt=$e=null,Sl=!1,eu=0,I_.current=null,t===null||t.return===null){ot=1,ru=e,nt=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=Et,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=a,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var p=h.alternate;p?(h.updateQueue=p.updateQueue,h.memoizedState=p.memoizedState,h.lanes=p.lanes):(h.updateQueue=null,h.memoizedState=null)}var _=kE(o);if(_!==null){_.flags&=-257,CE(_,o,a,s,e),_.mode&1&&AE(s,c,e),e=_,l=c;var T=e.updateQueue;if(T===null){var C=new Set;C.add(l),e.updateQueue=C}else T.add(l);break e}else{if(!(e&1)){AE(s,c,e),C_();break e}l=Error(B(426))}}else if(Me&&a.mode&1){var P=kE(o);if(P!==null){!(P.flags&65536)&&(P.flags|=256),CE(P,o,a,s,e),a_($o(l,a));break e}}s=l=$o(l,a),ot!==4&&(ot=2),kl===null?kl=[s]:kl.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var y=aA(s,l,e);vE(s,y);break e;case 1:a=l;var I=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof I.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(hi===null||!hi.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var D=lA(s,a,e);vE(s,D);break e}}s=s.return}while(s!==null)}CA(t)}catch(F){e=F,nt===t&&t!==null&&(nt=t=t.return);continue}break}while(!0)}function AA(){var n=Fh.current;return Fh.current=Mh,n===null?Mh:n}function C_(){(ot===0||ot===3||ot===2)&&(ot=4),mt===null||!(Ss&268435455)&&!(qd&268435455)||Qr(mt,Et)}function Bh(n,e){var t=ge;ge|=2;var r=AA();(mt!==n||Et!==e)&&(hr=null,_s(n,e));do try{PD();break}catch(i){SA(n,i)}while(!0);if(u_(),ge=t,Fh.current=r,nt!==null)throw Error(B(261));return mt=null,Et=0,ot}function PD(){for(;nt!==null;)kA(nt)}function xD(){for(;nt!==null&&!tN();)kA(nt)}function kA(n){var e=PA(n.alternate,n,tn);n.memoizedProps=n.pendingProps,e===null?CA(n):nt=e,I_.current=null}function CA(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=TD(t,e),t!==null){t.flags&=32767,nt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{ot=6,nt=null;return}}else if(t=ID(t,e,tn),t!==null){nt=t;return}if(e=e.sibling,e!==null){nt=e;return}nt=e=n}while(e!==null);ot===0&&(ot=5)}function ns(n,e,t){var r=we,i=fn.transition;try{fn.transition=null,we=1,bD(n,e,t,r)}finally{fn.transition=i,we=r}return null}function bD(n,e,t,r){do xo();while(ri!==null);if(ge&6)throw Error(B(327));t=n.finishedWork;var i=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(B(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(hN(n,s),n===mt&&(nt=mt=null,Et=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Oc||(Oc=!0,xA(Ih,function(){return xo(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=fn.transition,fn.transition=null;var o=we;we=1;var a=ge;ge|=4,I_.current=null,AD(n,t),EA(t,n),JN(km),Sh=!!Am,km=Am=null,n.current=t,kD(t),nN(),ge=a,we=o,fn.transition=s}else n.current=t;if(Oc&&(Oc=!1,ri=n,Uh=i),s=n.pendingLanes,s===0&&(hi=null),sN(t.stateNode),Jt(n,Xe()),e!==null)for(r=n.onRecoverableError,t=0;t<e.length;t++)i=e[t],r(i.value,{componentStack:i.stack,digest:i.digest});if(jh)throw jh=!1,n=Km,Km=null,n;return Uh&1&&n.tag!==0&&xo(),s=n.pendingLanes,s&1?n===Wm?Cl++:(Cl=0,Wm=n):Cl=0,ji(),null}function xo(){if(ri!==null){var n=a0(Uh),e=fn.transition,t=we;try{if(fn.transition=null,we=16>n?16:n,ri===null)var r=!1;else{if(n=ri,ri=null,Uh=0,ge&6)throw Error(B(331));var i=ge;for(ge|=4,Q=n.current;Q!==null;){var s=Q,o=s.child;if(Q.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Q=c;Q!==null;){var h=Q;switch(h.tag){case 0:case 11:case 15:Al(8,h,s)}var d=h.child;if(d!==null)d.return=h,Q=d;else for(;Q!==null;){h=Q;var p=h.sibling,_=h.return;if(yA(h),h===c){Q=null;break}if(p!==null){p.return=_,Q=p;break}Q=_}}}var T=s.alternate;if(T!==null){var C=T.child;if(C!==null){T.child=null;do{var P=C.sibling;C.sibling=null,C=P}while(C!==null)}}Q=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Q=o;else e:for(;Q!==null;){if(s=Q,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Al(9,s,s.return)}var y=s.sibling;if(y!==null){y.return=s.return,Q=y;break e}Q=s.return}}var I=n.current;for(Q=I;Q!==null;){o=Q;var S=o.child;if(o.subtreeFlags&2064&&S!==null)S.return=o,Q=S;else e:for(o=I;Q!==null;){if(a=Q,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:$d(9,a)}}catch(F){He(a,a.return,F)}if(a===o){Q=null;break e}var D=a.sibling;if(D!==null){D.return=a.return,Q=D;break e}Q=a.return}}if(ge=i,ji(),$n&&typeof $n.onPostCommitFiberRoot=="function")try{$n.onPostCommitFiberRoot(Od,n)}catch{}r=!0}return r}finally{we=t,fn.transition=e}}return!1}function UE(n,e,t){e=$o(t,e),e=aA(n,e,1),n=ci(n,e,1),e=Ut(),n!==null&&(Au(n,1,e),Jt(n,e))}function He(n,e,t){if(n.tag===3)UE(n,n,t);else for(;e!==null;){if(e.tag===3){UE(e,n,t);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(hi===null||!hi.has(r))){n=$o(t,n),n=lA(e,n,1),e=ci(e,n,1),n=Ut(),e!==null&&(Au(e,1,n),Jt(e,n));break}}e=e.return}}function ND(n,e,t){var r=n.pingCache;r!==null&&r.delete(e),e=Ut(),n.pingedLanes|=n.suspendedLanes&t,mt===n&&(Et&t)===t&&(ot===4||ot===3&&(Et&130023424)===Et&&500>Xe()-S_?_s(n,0):T_|=t),Jt(n,e)}function RA(n,e){e===0&&(n.mode&1?(e=Ac,Ac<<=1,!(Ac&130023424)&&(Ac=4194304)):e=1);var t=Ut();n=Ar(n,e),n!==null&&(Au(n,e,t),Jt(n,t))}function DD(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),RA(n,t)}function VD(n,e){var t=0;switch(n.tag){case 13:var r=n.stateNode,i=n.memoizedState;i!==null&&(t=i.retryLane);break;case 19:r=n.stateNode;break;default:throw Error(B(314))}r!==null&&r.delete(e),RA(n,t)}var PA;PA=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Qt.current)qt=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return qt=!1,ED(n,e,t);qt=!!(n.flags&131072)}else qt=!1,Me&&e.flags&1048576&&D0(e,bh,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;nh(n,e),n=e.pendingProps;var i=jo(e,Vt.current);Po(e,t),i=__(null,e,r,n,i,t);var s=y_();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Yt(r)?(s=!0,Ph(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,d_(e),i.updater=zd,e.stateNode=i,i._reactInternals=e,Om(e,r,n,t),e=Fm(null,e,r,!0,s,t)):(e.tag=0,Me&&s&&s_(e),Ft(null,e,i,t),e=e.child),e;case 16:r=e.elementType;e:{switch(nh(n,e),n=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=LD(r),n=wn(r,n),i){case 0:e=Mm(null,e,r,n,t);break e;case 1:e=xE(null,e,r,n,t);break e;case 11:e=RE(null,e,r,n,t);break e;case 14:e=PE(null,e,r,wn(r.type,n),t);break e}throw Error(B(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),Mm(n,e,r,i,t);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),xE(n,e,r,i,t);case 3:e:{if(dA(e),n===null)throw Error(B(387));r=e.pendingProps,s=e.memoizedState,i=s.element,j0(n,e),Vh(e,r,null,t);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=$o(Error(B(423)),e),e=bE(n,e,r,t,i);break e}else if(r!==i){i=$o(Error(B(424)),e),e=bE(n,e,r,t,i);break e}else for(nn=ui(e.stateNode.containerInfo.firstChild),rn=e,Me=!0,In=null,t=M0(e,null,r,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Uo(),r===i){e=kr(n,e,t);break e}Ft(n,e,r,t)}e=e.child}return e;case 5:return U0(e),n===null&&Nm(e),r=e.type,i=e.pendingProps,s=n!==null?n.memoizedProps:null,o=i.children,Cm(r,i)?o=null:s!==null&&Cm(r,s)&&(e.flags|=32),hA(n,e),Ft(n,e,o,t),e.child;case 6:return n===null&&Nm(e),null;case 13:return fA(n,e,t);case 4:return f_(e,e.stateNode.containerInfo),r=e.pendingProps,n===null?e.child=Bo(e,null,r,t):Ft(n,e,r,t),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),RE(n,e,r,i,t);case 7:return Ft(n,e,e.pendingProps,t),e.child;case 8:return Ft(n,e,e.pendingProps.children,t),e.child;case 12:return Ft(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,Ce(Nh,r._currentValue),r._currentValue=o,s!==null)if(Vn(s.value,o)){if(s.children===i.children&&!Qt.current){e=kr(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=Er(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),Dm(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(B(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),Dm(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Ft(n,e,i.children,t),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Po(e,t),i=mn(i),r=r(i),e.flags|=1,Ft(n,e,r,t),e.child;case 14:return r=e.type,i=wn(r,e.pendingProps),i=wn(r.type,i),PE(n,e,r,i,t);case 15:return uA(n,e,e.type,e.pendingProps,t);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:wn(r,i),nh(n,e),e.tag=1,Yt(r)?(n=!0,Ph(e)):n=!1,Po(e,t),oA(e,r,i),Om(e,r,i,t),Fm(null,e,r,!0,n,t);case 19:return pA(n,e,t);case 22:return cA(n,e,t)}throw Error(B(156,e.tag))};function xA(n,e){return r0(n,e)}function OD(n,e,t,r){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function dn(n,e,t,r){return new OD(n,e,t,r)}function R_(n){return n=n.prototype,!(!n||!n.isReactComponent)}function LD(n){if(typeof n=="function")return R_(n)?1:0;if(n!=null){if(n=n.$$typeof,n===Wg)return 11;if(n===Hg)return 14}return 2}function fi(n,e){var t=n.alternate;return t===null?(t=dn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function sh(n,e,t,r,i,s){var o=2;if(r=n,typeof n=="function")R_(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case fo:return ys(t.children,i,s,e);case Kg:o=8,i|=8;break;case sm:return n=dn(12,t,e,i|2),n.elementType=sm,n.lanes=s,n;case om:return n=dn(13,t,e,i),n.elementType=om,n.lanes=s,n;case am:return n=dn(19,t,e,i),n.elementType=am,n.lanes=s,n;case US:return Gd(t,i,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case FS:o=10;break e;case jS:o=9;break e;case Wg:o=11;break e;case Hg:o=14;break e;case Kr:o=16,r=null;break e}throw Error(B(130,n==null?n:typeof n,""))}return e=dn(o,t,e,i),e.elementType=n,e.type=r,e.lanes=s,e}function ys(n,e,t,r){return n=dn(7,n,r,e),n.lanes=t,n}function Gd(n,e,t,r){return n=dn(22,n,r,e),n.elementType=US,n.lanes=t,n.stateNode={isHidden:!1},n}function Dp(n,e,t){return n=dn(6,n,null,e),n.lanes=t,n}function Vp(n,e,t){return e=dn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function MD(n,e,t,r,i){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=pp(0),this.expirationTimes=pp(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pp(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function P_(n,e,t,r,i,s,o,a,l){return n=new MD(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=dn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:r,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},d_(s),n}function FD(n,e,t){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ho,key:r==null?null:""+r,children:n,containerInfo:e,implementation:t}}function bA(n){if(!n)return Ei;n=n._reactInternals;e:{if(zs(n)!==n||n.tag!==1)throw Error(B(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Yt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(B(171))}if(n.tag===1){var t=n.type;if(Yt(t))return b0(n,t,e)}return e}function NA(n,e,t,r,i,s,o,a,l){return n=P_(t,r,!0,n,i,s,o,a,l),n.context=bA(null),t=n.current,r=Ut(),i=di(t),s=Er(r,i),s.callback=e??null,ci(t,s,i),n.current.lanes=i,Au(n,i,r),Jt(n,r),n}function Kd(n,e,t,r){var i=e.current,s=Ut(),o=di(i);return t=bA(t),e.context===null?e.context=t:e.pendingContext=t,e=Er(s,o),e.payload={element:n},r=r===void 0?null:r,r!==null&&(e.callback=r),n=ci(i,e,o),n!==null&&(Pn(n,i,o,s),Zc(n,i,o)),o}function zh(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function BE(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function x_(n,e){BE(n,e),(n=n.alternate)&&BE(n,e)}function jD(){return null}var DA=typeof reportError=="function"?reportError:function(n){console.error(n)};function b_(n){this._internalRoot=n}Wd.prototype.render=b_.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(B(409));Kd(n,e,null,null)};Wd.prototype.unmount=b_.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;As(function(){Kd(null,n,null,null)}),e[Sr]=null}};function Wd(n){this._internalRoot=n}Wd.prototype.unstable_scheduleHydration=function(n){if(n){var e=c0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Hr.length&&e!==0&&e<Hr[t].priority;t++);Hr.splice(t,0,n),t===0&&d0(n)}};function N_(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Hd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function zE(){}function UD(n,e,t,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=zh(o);s.call(c)}}var o=NA(e,r,n,0,null,!1,!1,"",zE);return n._reactRootContainer=o,n[Sr]=o.current,Ql(n.nodeType===8?n.parentNode:n),As(),o}for(;i=n.lastChild;)n.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var c=zh(l);a.call(c)}}var l=P_(n,0,!1,null,null,!1,!1,"",zE);return n._reactRootContainer=l,n[Sr]=l.current,Ql(n.nodeType===8?n.parentNode:n),As(function(){Kd(e,l,t,r)}),l}function Qd(n,e,t,r,i){var s=t._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=zh(o);a.call(l)}}Kd(e,o,n,i)}else o=UD(t,e,n,i,r);return zh(o)}l0=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=hl(e.pendingLanes);t!==0&&(Jg(e,t|1),Jt(e,Xe()),!(ge&6)&&(qo=Xe()+500,ji()))}break;case 13:As(function(){var r=Ar(n,1);if(r!==null){var i=Ut();Pn(r,n,1,i)}}),x_(n,1)}};Xg=function(n){if(n.tag===13){var e=Ar(n,134217728);if(e!==null){var t=Ut();Pn(e,n,134217728,t)}x_(n,134217728)}};u0=function(n){if(n.tag===13){var e=di(n),t=Ar(n,e);if(t!==null){var r=Ut();Pn(t,n,e,r)}x_(n,e)}};c0=function(){return we};h0=function(n,e){var t=we;try{return we=n,e()}finally{we=t}};_m=function(n,e,t){switch(e){case"input":if(cm(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var r=t[e];if(r!==n&&r.form===n.form){var i=jd(r);if(!i)throw Error(B(90));zS(r),cm(r,i)}}}break;case"textarea":qS(n,t);break;case"select":e=t.value,e!=null&&Ao(n,!!t.multiple,e,!1)}};JS=A_;XS=As;var BD={usingClientEntryPoint:!1,Events:[Cu,_o,jd,QS,YS,A_]},Xa={findFiberByHostInstance:cs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},zD={bundleType:Xa.bundleType,version:Xa.version,rendererPackageName:Xa.rendererPackageName,rendererConfig:Xa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Dr.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=t0(n),n===null?null:n.stateNode},findFiberByHostInstance:Xa.findFiberByHostInstance||jD,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Lc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Lc.isDisabled&&Lc.supportsFiber)try{Od=Lc.inject(zD),$n=Lc}catch{}}ln.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=BD;ln.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!N_(e))throw Error(B(200));return FD(n,e,null,t)};ln.createRoot=function(n,e){if(!N_(n))throw Error(B(299));var t=!1,r="",i=DA;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=P_(n,1,!1,null,null,t,!1,r,i),n[Sr]=e.current,Ql(n.nodeType===8?n.parentNode:n),new b_(e)};ln.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(B(188)):(n=Object.keys(n).join(","),Error(B(268,n)));return n=t0(e),n=n===null?null:n.stateNode,n};ln.flushSync=function(n){return As(n)};ln.hydrate=function(n,e,t){if(!Hd(e))throw Error(B(200));return Qd(null,n,e,!0,t)};ln.hydrateRoot=function(n,e,t){if(!N_(n))throw Error(B(405));var r=t!=null&&t.hydratedSources||null,i=!1,s="",o=DA;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=NA(e,null,n,1,t??null,i,!1,s,o),n[Sr]=e.current,Ql(n),r)for(n=0;n<r.length;n++)t=r[n],i=t._getVersion,i=i(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,i]:e.mutableSourceEagerHydrationData.push(t,i);return new Wd(e)};ln.render=function(n,e,t){if(!Hd(e))throw Error(B(200));return Qd(null,n,e,!1,t)};ln.unmountComponentAtNode=function(n){if(!Hd(n))throw Error(B(40));return n._reactRootContainer?(As(function(){Qd(null,null,n,!1,function(){n._reactRootContainer=null,n[Sr]=null})}),!0):!1};ln.unstable_batchedUpdates=A_;ln.unstable_renderSubtreeIntoContainer=function(n,e,t,r){if(!Hd(t))throw Error(B(200));if(n==null||n._reactInternals===void 0)throw Error(B(38));return Qd(n,e,t,!1,r)};ln.version="18.3.1-next-f1338f8080-20240426";function VA(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(VA)}catch(n){console.error(n)}}VA(),VS.exports=ln;var $D=VS.exports,OA,$E=$D;OA=$E.createRoot,$E.hydrateRoot;var qE={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z=function(n,e){if(!n)throw ma(e)},ma=function(n){return new Error("Firebase Database ("+LA.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},qD=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},D_={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,h=s>>2,d=(s&3)<<4|a>>4;let p=(a&15)<<2|c>>6,_=c&63;l||(_=64,o||(p=64)),r.push(t[h],t[d],t[p],t[_])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(MA(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):qD(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const d=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||c==null||d==null)throw new GD;const p=s<<2|a>>4;if(r.push(p),c!==64){const _=a<<4&240|c>>2;if(r.push(_),d!==64){const T=c<<6&192|d;r.push(T)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class GD extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const FA=function(n){const e=MA(n);return D_.encodeByteArray(e,!0)},$h=function(n){return FA(n).replace(/\./g,"")},qh=function(n){try{return D_.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KD(n){return jA(void 0,n)}function jA(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!WD(t)||(n[t]=jA(n[t],e[t]));return n}function WD(n){return n!=="__proto__"}/**
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
 */function HD(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const QD=()=>HD().__FIREBASE_DEFAULTS__,YD=()=>{if(typeof process>"u"||typeof qE>"u")return;const n=qE.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},JD=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&qh(n[1]);return e&&JSON.parse(e)},Yd=()=>{try{return QD()||YD()||JD()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},UA=n=>{var e,t;return(t=(e=Yd())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},V_=n=>{const e=UA(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},BA=()=>{var n;return(n=Yd())===null||n===void 0?void 0:n.config},zA=n=>{var e;return(e=Yd())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
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
 */function O_(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[$h(JSON.stringify(t)),$h(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function L_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(at())}function XD(){var n;const e=(n=Yd())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ZD(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function e1(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function $A(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function t1(){const n=at();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function n1(){return LA.NODE_ADMIN===!0}function qA(){return!XD()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function GA(){try{return typeof indexedDB=="object"}catch{return!1}}function r1(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i1="FirebaseError";class Zn extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=i1,Object.setPrototypeOf(this,Zn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Pu.prototype.create)}}class Pu{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?s1(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Zn(i,a,r)}}function s1(n,e){return n.replace(o1,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const o1=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(n){return JSON.parse(n)}function it(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KA=function(n){let e={},t={},r={},i="";try{const s=n.split(".");e=iu(qh(s[0])||""),t=iu(qh(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}},a1=function(n){const e=KA(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},l1=function(n){const e=KA(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Go(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ym(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Gh(n,e,t){const r={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function Ii(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],o=e[i];if(GE(s)&&GE(o)){if(!Ii(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function GE(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function fl(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function pl(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)r[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const p=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(p<<1|p>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,h;for(let d=0;d<80;d++){d<40?d<20?(c=a^s&(o^a),h=1518500249):(c=s^o^a,h=1859775393):d<60?(c=s&o|a&(s|o),h=2400959708):(c=s^o^a,h=3395469782);const p=(i<<5|i>>>27)+c+l+h+r[d]&4294967295;l=a,a=o,o=(s<<30|s>>>2)&4294967295,s=i,i=p}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const r=t-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function c1(n,e){const t=new h1(n,e);return t.subscribe.bind(t)}class h1{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");d1(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Op),i.error===void 0&&(i.error=Op),i.complete===void 0&&(i.complete=Op);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function d1(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Op(){}function M_(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f1=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,z(r<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Xd=function(n){let e=0;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ue(n){return n&&n._delegate?n._delegate:n}class Cr{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rs="[DEFAULT]";/**
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
 */class p1{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Jd;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(g1(e))try{this.getOrInitializeService({instanceIdentifier:rs})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=rs){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rs){return this.instances.has(e)}getOptions(e=rs){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:m1(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=rs){return this.component?this.component.multipleInstances?e:rs:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function m1(n){return n===rs?void 0:n}function g1(n){return n.instantiationMode==="EAGER"}/**
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
 */class _1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new p1(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ae;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ae||(ae={}));const y1={debug:ae.DEBUG,verbose:ae.VERBOSE,info:ae.INFO,warn:ae.WARN,error:ae.ERROR,silent:ae.SILENT},v1=ae.INFO,w1={[ae.DEBUG]:"log",[ae.VERBOSE]:"log",[ae.INFO]:"info",[ae.WARN]:"warn",[ae.ERROR]:"error"},E1=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=w1[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zd{constructor(e){this.name=e,this._logLevel=v1,this._logHandler=E1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ae))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?y1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ae.DEBUG,...e),this._logHandler(this,ae.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ae.VERBOSE,...e),this._logHandler(this,ae.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ae.INFO,...e),this._logHandler(this,ae.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ae.WARN,...e),this._logHandler(this,ae.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ae.ERROR,...e),this._logHandler(this,ae.ERROR,...e)}}const I1=(n,e)=>e.some(t=>n instanceof t);let KE,WE;function T1(){return KE||(KE=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function S1(){return WE||(WE=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const WA=new WeakMap,Jm=new WeakMap,HA=new WeakMap,Lp=new WeakMap,F_=new WeakMap;function A1(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(pi(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&WA.set(t,n)}).catch(()=>{}),F_.set(e,n),e}function k1(n){if(Jm.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Jm.set(n,e)}let Xm={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Jm.get(n);if(e==="objectStoreNames")return n.objectStoreNames||HA.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return pi(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function C1(n){Xm=n(Xm)}function R1(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Mp(this),e,...t);return HA.set(r,e.sort?e.sort():[e]),pi(r)}:S1().includes(n)?function(...e){return n.apply(Mp(this),e),pi(WA.get(this))}:function(...e){return pi(n.apply(Mp(this),e))}}function P1(n){return typeof n=="function"?R1(n):(n instanceof IDBTransaction&&k1(n),I1(n,T1())?new Proxy(n,Xm):n)}function pi(n){if(n instanceof IDBRequest)return A1(n);if(Lp.has(n))return Lp.get(n);const e=P1(n);return e!==n&&(Lp.set(n,e),F_.set(e,n)),e}const Mp=n=>F_.get(n);function x1(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(n,e),a=pi(o);return r&&o.addEventListener("upgradeneeded",l=>{r(pi(o.result),l.oldVersion,l.newVersion,pi(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const b1=["get","getKey","getAll","getAllKeys","count"],N1=["put","add","delete","clear"],Fp=new Map;function HE(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Fp.get(e))return Fp.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=N1.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||b1.includes(t)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Fp.set(e,s),s}C1(n=>({...n,get:(e,t,r)=>HE(e,t)||n.get(e,t,r),has:(e,t)=>!!HE(e,t)||n.has(e,t)}));/**
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
 */class D1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(V1(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function V1(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Zm="@firebase/app",QE="0.10.13";/**
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
 */const Rr=new Zd("@firebase/app"),O1="@firebase/app-compat",L1="@firebase/analytics-compat",M1="@firebase/analytics",F1="@firebase/app-check-compat",j1="@firebase/app-check",U1="@firebase/auth",B1="@firebase/auth-compat",z1="@firebase/database",$1="@firebase/data-connect",q1="@firebase/database-compat",G1="@firebase/functions",K1="@firebase/functions-compat",W1="@firebase/installations",H1="@firebase/installations-compat",Q1="@firebase/messaging",Y1="@firebase/messaging-compat",J1="@firebase/performance",X1="@firebase/performance-compat",Z1="@firebase/remote-config",eV="@firebase/remote-config-compat",tV="@firebase/storage",nV="@firebase/storage-compat",rV="@firebase/firestore",iV="@firebase/vertexai-preview",sV="@firebase/firestore-compat",oV="firebase",aV="10.14.1";/**
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
 */const Kh="[DEFAULT]",lV={[Zm]:"fire-core",[O1]:"fire-core-compat",[M1]:"fire-analytics",[L1]:"fire-analytics-compat",[j1]:"fire-app-check",[F1]:"fire-app-check-compat",[U1]:"fire-auth",[B1]:"fire-auth-compat",[z1]:"fire-rtdb",[$1]:"fire-data-connect",[q1]:"fire-rtdb-compat",[G1]:"fire-fn",[K1]:"fire-fn-compat",[W1]:"fire-iid",[H1]:"fire-iid-compat",[Q1]:"fire-fcm",[Y1]:"fire-fcm-compat",[J1]:"fire-perf",[X1]:"fire-perf-compat",[Z1]:"fire-rc",[eV]:"fire-rc-compat",[tV]:"fire-gcs",[nV]:"fire-gcs-compat",[rV]:"fire-fst",[sV]:"fire-fst-compat",[iV]:"fire-vertex","fire-js":"fire-js",[oV]:"fire-js-all"};/**
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
 */const Wh=new Map,uV=new Map,eg=new Map;function YE(n,e){try{n.container.addComponent(e)}catch(t){Rr.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ti(n){const e=n.name;if(eg.has(e))return Rr.debug(`There were multiple attempts to register component ${e}.`),!1;eg.set(e,n);for(const t of Wh.values())YE(t,n);for(const t of uV.values())YE(t,n);return!0}function $s(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function cV(n,e,t=Kh){$s(n,e).clearInstance(t)}function Un(n){return n.settings!==void 0}/**
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
 */const hV={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},mi=new Pu("app","Firebase",hV);/**
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
 */class dV{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Cr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw mi.create("app-deleted",{appName:this._name})}}/**
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
 */const Ui=aV;function QA(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Kh,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw mi.create("bad-app-name",{appName:String(i)});if(t||(t=BA()),!t)throw mi.create("no-options");const s=Wh.get(i);if(s){if(Ii(t,s.options)&&Ii(r,s.config))return s;throw mi.create("duplicate-app",{appName:i})}const o=new _1(i);for(const l of eg.values())o.addComponent(l);const a=new dV(t,r,o);return Wh.set(i,a),a}function ef(n=Kh){const e=Wh.get(n);if(!e&&n===Kh&&BA())return QA();if(!e)throw mi.create("no-app",{appName:n});return e}function pn(n,e,t){var r;let i=(r=lV[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Rr.warn(a.join(" "));return}Ti(new Cr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const fV="firebase-heartbeat-database",pV=1,su="firebase-heartbeat-store";let jp=null;function YA(){return jp||(jp=x1(fV,pV,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(su)}catch(t){console.warn(t)}}}}).catch(n=>{throw mi.create("idb-open",{originalErrorMessage:n.message})})),jp}async function mV(n){try{const t=(await YA()).transaction(su),r=await t.objectStore(su).get(JA(n));return await t.done,r}catch(e){if(e instanceof Zn)Rr.warn(e.message);else{const t=mi.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Rr.warn(t.message)}}}async function JE(n,e){try{const r=(await YA()).transaction(su,"readwrite");await r.objectStore(su).put(e,JA(n)),await r.done}catch(t){if(t instanceof Zn)Rr.warn(t.message);else{const r=mi.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Rr.warn(r.message)}}}function JA(n){return`${n.name}!${n.options.appId}`}/**
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
 */const gV=1024,_V=30*24*60*60*1e3;class yV{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new wV(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=XE();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=_V}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Rr.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=XE(),{heartbeatsToSend:r,unsentEntries:i}=vV(this._heartbeatsCache.heartbeats),s=$h(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Rr.warn(t),""}}}function XE(){return new Date().toISOString().substring(0,10)}function vV(n,e=gV){const t=[];let r=n.slice();for(const i of n){const s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),ZE(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ZE(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class wV{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return GA()?r1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await mV(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return JE(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return JE(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ZE(n){return $h(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function EV(n){Ti(new Cr("platform-logger",e=>new D1(e),"PRIVATE")),Ti(new Cr("heartbeat",e=>new yV(e),"PRIVATE")),pn(Zm,QE,n),pn(Zm,QE,"esm2017"),pn("fire-js","")}EV("");function j_(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function XA(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const IV=XA,ZA=new Pu("auth","Firebase",XA());/**
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
 */const Hh=new Zd("@firebase/auth");function TV(n,...e){Hh.logLevel<=ae.WARN&&Hh.warn(`Auth (${Ui}): ${n}`,...e)}function oh(n,...e){Hh.logLevel<=ae.ERROR&&Hh.error(`Auth (${Ui}): ${n}`,...e)}/**
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
 */function _n(n,...e){throw B_(n,...e)}function xn(n,...e){return B_(n,...e)}function U_(n,e,t){const r=Object.assign(Object.assign({},IV()),{[e]:t});return new Pu("auth","Firebase",r).create(e,{appName:n.name})}function gi(n){return U_(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function SV(n,e,t){const r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&_n(n,"argument-error"),U_(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function B_(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return ZA.create(n,...e)}function ee(n,e,...t){if(!n)throw B_(e,...t)}function gr(n){const e="INTERNAL ASSERTION FAILED: "+n;throw oh(e),new Error(e)}function Pr(n,e){n||gr(e)}/**
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
 */function tg(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function AV(){return eI()==="http:"||eI()==="https:"}function eI(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function kV(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(AV()||e1()||"connection"in navigator)?navigator.onLine:!0}function CV(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class xu{constructor(e,t){this.shortDelay=e,this.longDelay=t,Pr(t>e,"Short delay should be less than long delay!"),this.isMobile=L_()||$A()}get(){return kV()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function z_(n,e){Pr(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ek{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;gr("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;gr("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;gr("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const RV={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const PV=new xu(3e4,6e4);function qs(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function er(n,e,t,r,i={}){return tk(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const a=ga(Object.assign({key:n.config.apiKey},o)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c=Object.assign({method:e,headers:l},s);return ZD()||(c.referrerPolicy="no-referrer"),ek.fetch()(nk(n,n.config.apiHost,t,a),c)})}async function tk(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},RV),e);try{const i=new bV(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Mc(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mc(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Mc(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Mc(n,"user-disabled",o);const h=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw U_(n,h,c);_n(n,h)}}catch(i){if(i instanceof Zn)throw i;_n(n,"network-request-failed",{message:String(i)})}}async function tf(n,e,t,r,i={}){const s=await er(n,e,t,r,i);return"mfaPendingCredential"in s&&_n(n,"multi-factor-auth-required",{_serverResponse:s}),s}function nk(n,e,t,r){const i=`${e}${t}?${r}`;return n.config.emulator?z_(n.config,i):`${n.config.apiScheme}://${i}`}function xV(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class bV{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(xn(this.auth,"network-request-failed")),PV.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Mc(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=xn(n,e,r);return i.customData._tokenResponse=t,i}function tI(n){return n!==void 0&&n.enterprise!==void 0}class NV{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return xV(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function DV(n,e){return er(n,"GET","/v2/recaptchaConfig",qs(n,e))}/**
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
 */async function VV(n,e){return er(n,"POST","/v1/accounts:delete",e)}async function rk(n,e){return er(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Rl(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function OV(n,e=!1){const t=ue(n),r=await t.getIdToken(e),i=$_(r);ee(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Rl(Up(i.auth_time)),issuedAtTime:Rl(Up(i.iat)),expirationTime:Rl(Up(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Up(n){return Number(n)*1e3}function $_(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return oh("JWT malformed, contained fewer than 3 sections"),null;try{const i=qh(t);return i?JSON.parse(i):(oh("Failed to decode base64 JWT payload"),null)}catch(i){return oh("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function nI(n){const e=$_(n);return ee(e,"internal-error"),ee(typeof e.exp<"u","internal-error"),ee(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ks(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Zn&&LV(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function LV({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class MV{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ng{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Rl(this.lastLoginAt),this.creationTime=Rl(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Qh(n){var e;const t=n.auth,r=await n.getIdToken(),i=await ks(n,rk(t,{idToken:r}));ee(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ik(s.providerUserInfo):[],a=jV(n.providerData,o),l=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),h=l?c:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ng(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,d)}async function FV(n){const e=ue(n);await Qh(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jV(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ik(n){return n.map(e=>{var{providerId:t}=e,r=j_(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function UV(n,e){const t=await tk(n,{},async()=>{const r=ga({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=nk(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",ek.fetch()(o,{method:"POST",headers:a,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function BV(n,e){return er(n,"POST","/v2/accounts:revokeToken",qs(n,e))}/**
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
 */class bo{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ee(e.idToken,"internal-error"),ee(typeof e.idToken<"u","internal-error"),ee(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):nI(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ee(e.length!==0,"internal-error");const t=nI(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ee(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await UV(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new bo;return r&&(ee(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(ee(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(ee(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new bo,this.toJSON())}_performRefresh(){return gr("not implemented")}}/**
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
 */function $r(n,e){ee(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class _r{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=j_(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new MV(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ng(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ks(this,this.stsTokenManager.getToken(this.auth,e));return ee(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return OV(this,e)}reload(){return FV(this)}_assign(e){this!==e&&(ee(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new _r(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){ee(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qh(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Un(this.auth.app))return Promise.reject(gi(this.auth));const e=await this.getIdToken();return await ks(this,VV(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,a,l,c,h;const d=(r=t.displayName)!==null&&r!==void 0?r:void 0,p=(i=t.email)!==null&&i!==void 0?i:void 0,_=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,T=(o=t.photoURL)!==null&&o!==void 0?o:void 0,C=(a=t.tenantId)!==null&&a!==void 0?a:void 0,P=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,y=(c=t.createdAt)!==null&&c!==void 0?c:void 0,I=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:S,emailVerified:D,isAnonymous:F,providerData:M,stsTokenManager:k}=t;ee(S&&k,e,"internal-error");const w=bo.fromJSON(this.name,k);ee(typeof S=="string",e,"internal-error"),$r(d,e.name),$r(p,e.name),ee(typeof D=="boolean",e,"internal-error"),ee(typeof F=="boolean",e,"internal-error"),$r(_,e.name),$r(T,e.name),$r(C,e.name),$r(P,e.name),$r(y,e.name),$r(I,e.name);const E=new _r({uid:S,auth:e,email:p,emailVerified:D,displayName:d,isAnonymous:F,photoURL:T,phoneNumber:_,tenantId:C,stsTokenManager:w,createdAt:y,lastLoginAt:I});return M&&Array.isArray(M)&&(E.providerData=M.map(R=>Object.assign({},R))),P&&(E._redirectEventId=P),E}static async _fromIdTokenResponse(e,t,r=!1){const i=new bo;i.updateFromServerResponse(t);const s=new _r({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Qh(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];ee(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?ik(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new bo;a.updateFromIdToken(r);const l=new _r({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ng(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,c),l}}/**
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
 */const rI=new Map;function yr(n){Pr(n instanceof Function,"Expected a class definition");let e=rI.get(n);return e?(Pr(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,rI.set(n,e),e)}/**
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
 */class sk{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}sk.type="NONE";const iI=sk;/**
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
 */function ah(n,e,t){return`firebase:${n}:${e}:${t}`}class No{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=ah(this.userKey,i.apiKey,s),this.fullPersistenceKey=ah("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?_r._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new No(yr(iI),e,r);const i=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||yr(iI);const o=ah(r,e.config.apiKey,e.name);let a=null;for(const c of t)try{const h=await c._get(o);if(h){const d=_r._fromJSON(e,h);c!==s&&(a=d),s=c;break}}catch{}const l=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new No(s,e,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new No(s,e,r))}}/**
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
 */function sI(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(uk(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ok(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hk(e))return"Blackberry";if(dk(e))return"Webos";if(ak(e))return"Safari";if((e.includes("chrome/")||lk(e))&&!e.includes("edge/"))return"Chrome";if(ck(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function ok(n=at()){return/firefox\//i.test(n)}function ak(n=at()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function lk(n=at()){return/crios\//i.test(n)}function uk(n=at()){return/iemobile/i.test(n)}function ck(n=at()){return/android/i.test(n)}function hk(n=at()){return/blackberry/i.test(n)}function dk(n=at()){return/webos/i.test(n)}function q_(n=at()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function zV(n=at()){var e;return q_(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function $V(){return t1()&&document.documentMode===10}function fk(n=at()){return q_(n)||ck(n)||dk(n)||hk(n)||/windows phone/i.test(n)||uk(n)}/**
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
 */function pk(n,e=[]){let t;switch(n){case"Browser":t=sI(at());break;case"Worker":t=`${sI(at())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ui}/${r}`}/**
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
 */class qV{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,a)=>{try{const l=e(s);o(l)}catch(l){a(l)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function GV(n,e={}){return er(n,"GET","/v2/passwordPolicy",qs(n,e))}/**
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
 */const KV=6;class WV{constructor(e){var t,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:KV,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,a;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(a=l.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),l}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class HV{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new oI(this),this.idTokenSubscription=new oI(this),this.beforeStateQueue=new qV(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ZA,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=yr(t)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await No.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await rk(this,{idToken:e}),r=await _r._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Un(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return ee(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qh(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=CV()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Un(this.app))return Promise.reject(gi(this));const t=e?ue(e):null;return t&&ee(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ee(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Un(this.app)?Promise.reject(gi(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Un(this.app)?Promise.reject(gi(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(yr(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await GV(this),t=new WV(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Pu("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await BV(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&yr(e)||this._popupRedirectResolver;ee(t,this,"argument-error"),this.redirectPersistenceManager=await No.create(this,[yr(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ee(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ee(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pk(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&TV(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Gs(n){return ue(n)}class oI{constructor(e){this.auth=e,this.observer=null,this.addObserver=c1(t=>this.observer=t)}get next(){return ee(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let nf={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function QV(n){nf=n}function mk(n){return nf.loadJS(n)}function YV(){return nf.recaptchaEnterpriseScript}function JV(){return nf.gapiScript}function XV(n){return`__${n}${Math.floor(Math.random()*1e6)}`}const ZV="recaptcha-enterprise",eO="NO_RECAPTCHA";class tO{constructor(e){this.type=ZV,this.auth=Gs(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{DV(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new NV(l);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function i(s,o,a){const l=window.grecaptcha;tI(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(eO)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(a=>{if(!t&&tI(window.grecaptcha))i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=YV();l.length!==0&&(l+=a),mk(l).then(()=>{i(a,s,o)}).catch(c=>{o(c)})}}).catch(a=>{o(a)})})}}async function aI(n,e,t,r=!1){const i=new tO(n);let s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function lI(n,e,t,r){var i;if(!((i=n._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await aI(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await aI(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)})}/**
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
 */function nO(n,e){const t=$s(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ii(s,e??{}))return i;_n(i,"already-initialized")}return t.initialize({options:e})}function rO(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(yr);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function iO(n,e,t){const r=Gs(n);ee(r._canInitEmulator,r,"emulator-config-failed"),ee(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=gk(e),{host:o,port:a}=sO(e),l=a===null?"":`:${a}`;r.config.emulator={url:`${s}//${o}${l}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),oO()}function gk(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function sO(n){const e=gk(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:uI(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:uI(o)}}}function uI(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function oO(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class G_{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return gr("not implemented")}_getIdTokenResponse(e){return gr("not implemented")}_linkToIdToken(e,t){return gr("not implemented")}_getReauthenticationResolver(e){return gr("not implemented")}}async function aO(n,e){return er(n,"POST","/v1/accounts:update",e)}async function lO(n,e){return er(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function uO(n,e){return tf(n,"POST","/v1/accounts:signInWithPassword",qs(n,e))}/**
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
 */async function cO(n,e){return tf(n,"POST","/v1/accounts:signInWithEmailLink",qs(n,e))}async function hO(n,e){return tf(n,"POST","/v1/accounts:signInWithEmailLink",qs(n,e))}/**
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
 */class ou extends G_{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new ou(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ou(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lI(e,t,"signInWithPassword",uO);case"emailLink":return cO(e,{email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lI(e,r,"signUpPassword",lO);case"emailLink":return hO(e,{idToken:t,email:this._email,oobCode:this._password});default:_n(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Do(n,e){return tf(n,"POST","/v1/accounts:signInWithIdp",qs(n,e))}/**
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
 */const dO="http://localhost";class Cs extends G_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Cs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_n("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=j_(t,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Cs(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Do(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Do(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Do(e,t)}buildRequest(){const e={requestUri:dO,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ga(t)}return e}}/**
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
 */function fO(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function pO(n){const e=fl(pl(n)).link,t=e?fl(pl(e)).deep_link_id:null,r=fl(pl(n)).deep_link_id;return(r?fl(pl(r)).link:null)||r||t||e||n}class K_{constructor(e){var t,r,i,s,o,a;const l=fl(pl(e)),c=(t=l.apiKey)!==null&&t!==void 0?t:null,h=(r=l.oobCode)!==null&&r!==void 0?r:null,d=fO((i=l.mode)!==null&&i!==void 0?i:null);ee(c&&h&&d,"argument-error"),this.apiKey=c,this.operation=d,this.code=h,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const t=pO(e);try{return new K_(t)}catch{return null}}}/**
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
 */class Ks{constructor(){this.providerId=Ks.PROVIDER_ID}static credential(e,t){return ou._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=K_.parseLink(t);return ee(r,"argument-error"),ou._fromEmailAndCode(e,r.code,r.tenantId)}}Ks.PROVIDER_ID="password";Ks.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ks.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class W_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class bu extends W_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Yr extends bu{constructor(){super("facebook.com")}static credential(e){return Cs._fromParams({providerId:Yr.PROVIDER_ID,signInMethod:Yr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yr.credentialFromTaggedObject(e)}static credentialFromError(e){return Yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yr.credential(e.oauthAccessToken)}catch{return null}}}Yr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Yr.PROVIDER_ID="facebook.com";/**
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
 */class fr extends bu{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Cs._fromParams({providerId:fr.PROVIDER_ID,signInMethod:fr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return fr.credentialFromTaggedObject(e)}static credentialFromError(e){return fr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return fr.credential(t,r)}catch{return null}}}fr.GOOGLE_SIGN_IN_METHOD="google.com";fr.PROVIDER_ID="google.com";/**
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
 */class Jr extends bu{constructor(){super("github.com")}static credential(e){return Cs._fromParams({providerId:Jr.PROVIDER_ID,signInMethod:Jr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Jr.credentialFromTaggedObject(e)}static credentialFromError(e){return Jr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Jr.credential(e.oauthAccessToken)}catch{return null}}}Jr.GITHUB_SIGN_IN_METHOD="github.com";Jr.PROVIDER_ID="github.com";/**
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
 */class Xr extends bu{constructor(){super("twitter.com")}static credential(e,t){return Cs._fromParams({providerId:Xr.PROVIDER_ID,signInMethod:Xr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Xr.credentialFromTaggedObject(e)}static credentialFromError(e){return Xr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Xr.credential(t,r)}catch{return null}}}Xr.TWITTER_SIGN_IN_METHOD="twitter.com";Xr.PROVIDER_ID="twitter.com";/**
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
 */class Ko{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await _r._fromIdTokenResponse(e,r,i),o=cI(r);return new Ko({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=cI(r);return new Ko({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function cI(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Yh extends Zn{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Yh.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Yh(e,t,r,i)}}function _k(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Yh._fromErrorAndOperation(n,s,e,r):s})}async function mO(n,e,t=!1){const r=await ks(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ko._forOperation(n,"link",r)}/**
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
 */async function yk(n,e,t=!1){const{auth:r}=n;if(Un(r.app))return Promise.reject(gi(r));const i="reauthenticate";try{const s=await ks(n,_k(r,i,e,n),t);ee(s.idToken,r,"internal-error");const o=$_(s.idToken);ee(o,r,"internal-error");const{sub:a}=o;return ee(n.uid===a,r,"user-mismatch"),Ko._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&_n(r,"user-mismatch"),s}}/**
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
 */async function vk(n,e,t=!1){if(Un(n.app))return Promise.reject(gi(n));const r="signIn",i=await _k(n,r,e),s=await Ko._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function gO(n,e){return vk(Gs(n),e)}async function _O(n,e){return yk(ue(n),e)}/**
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
 */async function yO(n){const e=Gs(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function vO(n,e,t){return Un(n.app)?Promise.reject(gi(n)):gO(ue(n),Ks.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&yO(n),r})}/**
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
 */async function wO(n,e){return er(n,"POST","/v1/accounts:update",e)}/**
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
 */async function EO(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const r=ue(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await ks(r,wO(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const a=r.providerData.find(({providerId:l})=>l==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function IO(n,e){return TO(ue(n),null,e)}async function TO(n,e,t){const{auth:r}=n,s={idToken:await n.getIdToken(),returnSecureToken:!0};t&&(s.password=t);const o=await ks(n,aO(r,s));await n._updateTokensIfNecessary(o,!0)}function SO(n,e,t,r){return ue(n).onIdTokenChanged(e,t,r)}function AO(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function kO(n,e,t,r){return ue(n).onAuthStateChanged(e,t,r)}function rg(n){return ue(n).signOut()}const Jh="__sak";/**
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
 */class wk{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Jh,"1"),this.storage.removeItem(Jh),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const CO=1e3,RO=10;class Ek extends wk{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=fk(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);$V()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,RO):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},CO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ek.type="LOCAL";const PO=Ek;/**
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
 */class Ik extends wk{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ik.type="SESSION";const Tk=Ik;/**
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
 */function xO(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class rf{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new rf(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async c=>c(t.origin,s)),l=await xO(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}rf.receivers=[];/**
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
 */function H_(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class bO{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const c=H_("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(d){const p=d;if(p.data.eventId===c)switch(p.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(p.data.response);break;default:clearTimeout(h),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Gn(){return window}function NO(n){Gn().location.href=n}/**
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
 */function Sk(){return typeof Gn().WorkerGlobalScope<"u"&&typeof Gn().importScripts=="function"}async function DO(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function VO(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function OO(){return Sk()?self:null}/**
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
 */const Ak="firebaseLocalStorageDb",LO=1,Xh="firebaseLocalStorage",kk="fbase_key";class Nu{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function sf(n,e){return n.transaction([Xh],e?"readwrite":"readonly").objectStore(Xh)}function MO(){const n=indexedDB.deleteDatabase(Ak);return new Nu(n).toPromise()}function ig(){const n=indexedDB.open(Ak,LO);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xh,{keyPath:kk})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xh)?e(r):(r.close(),await MO(),e(await ig()))})})}async function hI(n,e,t){const r=sf(n,!0).put({[kk]:e,value:t});return new Nu(r).toPromise()}async function FO(n,e){const t=sf(n,!1).get(e),r=await new Nu(t).toPromise();return r===void 0?null:r.value}function dI(n,e){const t=sf(n,!0).delete(e);return new Nu(t).toPromise()}const jO=800,UO=3;class Ck{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ig(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>UO)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Sk()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=rf._getInstance(OO()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await DO(),!this.activeServiceWorker)return;this.sender=new bO(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||VO()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ig();return await hI(e,Jh,"1"),await dI(e,Jh),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>hI(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>FO(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>dI(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=sf(i,!1).getAll();return new Nu(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),jO)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ck.type="LOCAL";const BO=Ck;new xu(3e4,6e4);/**
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
 */function Rk(n,e){return e?yr(e):(ee(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Q_ extends G_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Do(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Do(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Do(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zO(n){return vk(n.auth,new Q_(n),n.bypassAuthState)}function $O(n){const{auth:e,user:t}=n;return ee(t,e,"internal-error"),yk(t,new Q_(n),n.bypassAuthState)}async function qO(n){const{auth:e,user:t}=n;return ee(t,e,"internal-error"),mO(t,new Q_(n),n.bypassAuthState)}/**
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
 */class Pk{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zO;case"linkViaPopup":case"linkViaRedirect":return qO;case"reauthViaPopup":case"reauthViaRedirect":return $O;default:_n(this.auth,"internal-error")}}resolve(e){Pr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Pr(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const GO=new xu(2e3,1e4);async function KO(n,e,t){if(Un(n.app))return Promise.reject(xn(n,"operation-not-supported-in-this-environment"));const r=Gs(n);SV(n,e,W_);const i=Rk(r,t);return new fs(r,"signInViaPopup",e,i).executeNotNull()}class fs extends Pk{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,fs.currentPopupAction&&fs.currentPopupAction.cancel(),fs.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ee(e,this.auth,"internal-error"),e}async onExecution(){Pr(this.filter.length===1,"Popup operations only handle one event");const e=H_();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(xn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(xn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fs.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(xn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,GO.get())};e()}}fs.currentPopupAction=null;/**
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
 */const WO="pendingRedirect",lh=new Map;class HO extends Pk{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=lh.get(this.auth._key());if(!e){try{const r=await QO(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}lh.set(this.auth._key(),e)}return this.bypassAuthState||lh.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function QO(n,e){const t=XO(e),r=JO(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function YO(n,e){lh.set(n._key(),e)}function JO(n){return yr(n._redirectPersistence)}function XO(n){return ah(WO,n.config.apiKey,n.name)}async function ZO(n,e,t=!1){if(Un(n.app))return Promise.reject(gi(n));const r=Gs(n),i=Rk(r,e),o=await new HO(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const eL=10*60*1e3;class tL{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!nL(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!xk(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(xn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=eL&&this.cachedEventUids.clear(),this.cachedEventUids.has(fI(e))}saveEventToCache(e){this.cachedEventUids.add(fI(e)),this.lastProcessedEventTime=Date.now()}}function fI(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function xk({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function nL(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xk(n);default:return!1}}/**
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
 */async function rL(n,e={}){return er(n,"GET","/v1/projects",e)}/**
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
 */const iL=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sL=/^https?/;async function oL(n){if(n.config.emulator)return;const{authorizedDomains:e}=await rL(n);for(const t of e)try{if(aL(t))return}catch{}_n(n,"unauthorized-domain")}function aL(n){const e=tg(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!sL.test(t))return!1;if(iL.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const lL=new xu(3e4,6e4);function pI(){const n=Gn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function uL(n){return new Promise((e,t)=>{var r,i,s;function o(){pI(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pI(),t(xn(n,"network-request-failed"))},timeout:lL.get()})}if(!((i=(r=Gn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Gn().gapi)===null||s===void 0)&&s.load)o();else{const a=XV("iframefcb");return Gn()[a]=()=>{gapi.load?o():t(xn(n,"network-request-failed"))},mk(`${JV()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw uh=null,e})}let uh=null;function cL(n){return uh=uh||uL(n),uh}/**
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
 */const hL=new xu(5e3,15e3),dL="__/auth/iframe",fL="emulator/auth/iframe",pL={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},mL=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gL(n){const e=n.config;ee(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?z_(e,fL):`https://${n.config.authDomain}/${dL}`,r={apiKey:e.apiKey,appName:n.name,v:Ui},i=mL.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ga(r).slice(1)}`}async function _L(n){const e=await cL(n),t=Gn().gapi;return ee(t,n,"internal-error"),e.open({where:document.body,url:gL(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pL,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=xn(n,"network-request-failed"),a=Gn().setTimeout(()=>{s(o)},hL.get());function l(){Gn().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
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
 */const yL={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vL=500,wL=600,EL="_blank",IL="http://localhost";class mI{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function TL(n,e,t,r=vL,i=wL){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},yL),{width:r.toString(),height:i.toString(),top:s,left:o}),c=at().toLowerCase();t&&(a=lk(c)?EL:t),ok(c)&&(e=e||IL,l.scrollbars="yes");const h=Object.entries(l).reduce((p,[_,T])=>`${p}${_}=${T},`,"");if(zV(c)&&a!=="_self")return SL(e||"",a),new mI(null);const d=window.open(e||"",a,h);ee(d,n,"popup-blocked");try{d.focus()}catch{}return new mI(d)}function SL(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const AL="__/auth/handler",kL="emulator/auth/handler",CL=encodeURIComponent("fac");async function gI(n,e,t,r,i,s){ee(n.config.authDomain,n,"auth-domain-config-required"),ee(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ui,eventId:i};if(e instanceof W_){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Ym(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof bu){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const l=await n._getAppCheckToken(),c=l?`#${CL}=${encodeURIComponent(l)}`:"";return`${RL(n)}?${ga(a).slice(1)}${c}`}function RL({config:n}){return n.emulator?z_(n,kL):`https://${n.authDomain}/${AL}`}/**
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
 */const Bp="webStorageSupport";class PL{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Tk,this._completeRedirectFn=ZO,this._overrideRedirectResult=YO}async _openPopup(e,t,r,i){var s;Pr((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await gI(e,t,r,tg(),i);return TL(e,o,H_())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await gI(e,t,r,tg(),i);return NO(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Pr(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await _L(e),r=new tL(e);return t.register("authEvent",i=>(ee(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Bp,{type:Bp},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Bp];o!==void 0&&t(!!o),_n(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=oL(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return fk()||ak()||q_()}}const xL=PL;var _I="@firebase/auth",yI="1.7.9";/**
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
 */class bL{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ee(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function NL(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function DL(n){Ti(new Cr("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;ee(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pk(n)},c=new HV(r,i,s,l);return rO(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ti(new Cr("auth-internal",e=>{const t=Gs(e.getProvider("auth").getImmediate());return(r=>new bL(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pn(_I,yI,NL(n)),pn(_I,yI,"esm2017")}/**
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
 */const VL=5*60,OL=zA("authIdTokenMaxAge")||VL;let vI=null;const LL=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>OL)return;const i=t==null?void 0:t.token;vI!==i&&(vI=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function ML(n=ef()){const e=$s(n,"auth");if(e.isInitialized())return e.getImmediate();const t=nO(n,{popupRedirectResolver:xL,persistence:[BO,PO,Tk]}),r=zA("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=LL(s.toString());AO(t,o,()=>o(t.currentUser)),SO(t,a=>o(a))}}const i=UA("auth");return i&&iO(t,`http://${i}`),t}function FL(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}QV({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=xn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",FL().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});DL("Browser");var wI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var vs,bk;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(k,w){function E(){}E.prototype=w.prototype,k.D=w.prototype,k.prototype=new E,k.prototype.constructor=k,k.C=function(R,A,b){for(var x=Array(arguments.length-2),Ot=2;Ot<arguments.length;Ot++)x[Ot-2]=arguments[Ot];return w.prototype[A].apply(R,x)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(k,w,E){E||(E=0);var R=Array(16);if(typeof w=="string")for(var A=0;16>A;++A)R[A]=w.charCodeAt(E++)|w.charCodeAt(E++)<<8|w.charCodeAt(E++)<<16|w.charCodeAt(E++)<<24;else for(A=0;16>A;++A)R[A]=w[E++]|w[E++]<<8|w[E++]<<16|w[E++]<<24;w=k.g[0],E=k.g[1],A=k.g[2];var b=k.g[3],x=w+(b^E&(A^b))+R[0]+3614090360&4294967295;w=E+(x<<7&4294967295|x>>>25),x=b+(A^w&(E^A))+R[1]+3905402710&4294967295,b=w+(x<<12&4294967295|x>>>20),x=A+(E^b&(w^E))+R[2]+606105819&4294967295,A=b+(x<<17&4294967295|x>>>15),x=E+(w^A&(b^w))+R[3]+3250441966&4294967295,E=A+(x<<22&4294967295|x>>>10),x=w+(b^E&(A^b))+R[4]+4118548399&4294967295,w=E+(x<<7&4294967295|x>>>25),x=b+(A^w&(E^A))+R[5]+1200080426&4294967295,b=w+(x<<12&4294967295|x>>>20),x=A+(E^b&(w^E))+R[6]+2821735955&4294967295,A=b+(x<<17&4294967295|x>>>15),x=E+(w^A&(b^w))+R[7]+4249261313&4294967295,E=A+(x<<22&4294967295|x>>>10),x=w+(b^E&(A^b))+R[8]+1770035416&4294967295,w=E+(x<<7&4294967295|x>>>25),x=b+(A^w&(E^A))+R[9]+2336552879&4294967295,b=w+(x<<12&4294967295|x>>>20),x=A+(E^b&(w^E))+R[10]+4294925233&4294967295,A=b+(x<<17&4294967295|x>>>15),x=E+(w^A&(b^w))+R[11]+2304563134&4294967295,E=A+(x<<22&4294967295|x>>>10),x=w+(b^E&(A^b))+R[12]+1804603682&4294967295,w=E+(x<<7&4294967295|x>>>25),x=b+(A^w&(E^A))+R[13]+4254626195&4294967295,b=w+(x<<12&4294967295|x>>>20),x=A+(E^b&(w^E))+R[14]+2792965006&4294967295,A=b+(x<<17&4294967295|x>>>15),x=E+(w^A&(b^w))+R[15]+1236535329&4294967295,E=A+(x<<22&4294967295|x>>>10),x=w+(A^b&(E^A))+R[1]+4129170786&4294967295,w=E+(x<<5&4294967295|x>>>27),x=b+(E^A&(w^E))+R[6]+3225465664&4294967295,b=w+(x<<9&4294967295|x>>>23),x=A+(w^E&(b^w))+R[11]+643717713&4294967295,A=b+(x<<14&4294967295|x>>>18),x=E+(b^w&(A^b))+R[0]+3921069994&4294967295,E=A+(x<<20&4294967295|x>>>12),x=w+(A^b&(E^A))+R[5]+3593408605&4294967295,w=E+(x<<5&4294967295|x>>>27),x=b+(E^A&(w^E))+R[10]+38016083&4294967295,b=w+(x<<9&4294967295|x>>>23),x=A+(w^E&(b^w))+R[15]+3634488961&4294967295,A=b+(x<<14&4294967295|x>>>18),x=E+(b^w&(A^b))+R[4]+3889429448&4294967295,E=A+(x<<20&4294967295|x>>>12),x=w+(A^b&(E^A))+R[9]+568446438&4294967295,w=E+(x<<5&4294967295|x>>>27),x=b+(E^A&(w^E))+R[14]+3275163606&4294967295,b=w+(x<<9&4294967295|x>>>23),x=A+(w^E&(b^w))+R[3]+4107603335&4294967295,A=b+(x<<14&4294967295|x>>>18),x=E+(b^w&(A^b))+R[8]+1163531501&4294967295,E=A+(x<<20&4294967295|x>>>12),x=w+(A^b&(E^A))+R[13]+2850285829&4294967295,w=E+(x<<5&4294967295|x>>>27),x=b+(E^A&(w^E))+R[2]+4243563512&4294967295,b=w+(x<<9&4294967295|x>>>23),x=A+(w^E&(b^w))+R[7]+1735328473&4294967295,A=b+(x<<14&4294967295|x>>>18),x=E+(b^w&(A^b))+R[12]+2368359562&4294967295,E=A+(x<<20&4294967295|x>>>12),x=w+(E^A^b)+R[5]+4294588738&4294967295,w=E+(x<<4&4294967295|x>>>28),x=b+(w^E^A)+R[8]+2272392833&4294967295,b=w+(x<<11&4294967295|x>>>21),x=A+(b^w^E)+R[11]+1839030562&4294967295,A=b+(x<<16&4294967295|x>>>16),x=E+(A^b^w)+R[14]+4259657740&4294967295,E=A+(x<<23&4294967295|x>>>9),x=w+(E^A^b)+R[1]+2763975236&4294967295,w=E+(x<<4&4294967295|x>>>28),x=b+(w^E^A)+R[4]+1272893353&4294967295,b=w+(x<<11&4294967295|x>>>21),x=A+(b^w^E)+R[7]+4139469664&4294967295,A=b+(x<<16&4294967295|x>>>16),x=E+(A^b^w)+R[10]+3200236656&4294967295,E=A+(x<<23&4294967295|x>>>9),x=w+(E^A^b)+R[13]+681279174&4294967295,w=E+(x<<4&4294967295|x>>>28),x=b+(w^E^A)+R[0]+3936430074&4294967295,b=w+(x<<11&4294967295|x>>>21),x=A+(b^w^E)+R[3]+3572445317&4294967295,A=b+(x<<16&4294967295|x>>>16),x=E+(A^b^w)+R[6]+76029189&4294967295,E=A+(x<<23&4294967295|x>>>9),x=w+(E^A^b)+R[9]+3654602809&4294967295,w=E+(x<<4&4294967295|x>>>28),x=b+(w^E^A)+R[12]+3873151461&4294967295,b=w+(x<<11&4294967295|x>>>21),x=A+(b^w^E)+R[15]+530742520&4294967295,A=b+(x<<16&4294967295|x>>>16),x=E+(A^b^w)+R[2]+3299628645&4294967295,E=A+(x<<23&4294967295|x>>>9),x=w+(A^(E|~b))+R[0]+4096336452&4294967295,w=E+(x<<6&4294967295|x>>>26),x=b+(E^(w|~A))+R[7]+1126891415&4294967295,b=w+(x<<10&4294967295|x>>>22),x=A+(w^(b|~E))+R[14]+2878612391&4294967295,A=b+(x<<15&4294967295|x>>>17),x=E+(b^(A|~w))+R[5]+4237533241&4294967295,E=A+(x<<21&4294967295|x>>>11),x=w+(A^(E|~b))+R[12]+1700485571&4294967295,w=E+(x<<6&4294967295|x>>>26),x=b+(E^(w|~A))+R[3]+2399980690&4294967295,b=w+(x<<10&4294967295|x>>>22),x=A+(w^(b|~E))+R[10]+4293915773&4294967295,A=b+(x<<15&4294967295|x>>>17),x=E+(b^(A|~w))+R[1]+2240044497&4294967295,E=A+(x<<21&4294967295|x>>>11),x=w+(A^(E|~b))+R[8]+1873313359&4294967295,w=E+(x<<6&4294967295|x>>>26),x=b+(E^(w|~A))+R[15]+4264355552&4294967295,b=w+(x<<10&4294967295|x>>>22),x=A+(w^(b|~E))+R[6]+2734768916&4294967295,A=b+(x<<15&4294967295|x>>>17),x=E+(b^(A|~w))+R[13]+1309151649&4294967295,E=A+(x<<21&4294967295|x>>>11),x=w+(A^(E|~b))+R[4]+4149444226&4294967295,w=E+(x<<6&4294967295|x>>>26),x=b+(E^(w|~A))+R[11]+3174756917&4294967295,b=w+(x<<10&4294967295|x>>>22),x=A+(w^(b|~E))+R[2]+718787259&4294967295,A=b+(x<<15&4294967295|x>>>17),x=E+(b^(A|~w))+R[9]+3951481745&4294967295,k.g[0]=k.g[0]+w&4294967295,k.g[1]=k.g[1]+(A+(x<<21&4294967295|x>>>11))&4294967295,k.g[2]=k.g[2]+A&4294967295,k.g[3]=k.g[3]+b&4294967295}r.prototype.u=function(k,w){w===void 0&&(w=k.length);for(var E=w-this.blockSize,R=this.B,A=this.h,b=0;b<w;){if(A==0)for(;b<=E;)i(this,k,b),b+=this.blockSize;if(typeof k=="string"){for(;b<w;)if(R[A++]=k.charCodeAt(b++),A==this.blockSize){i(this,R),A=0;break}}else for(;b<w;)if(R[A++]=k[b++],A==this.blockSize){i(this,R),A=0;break}}this.h=A,this.o+=w},r.prototype.v=function(){var k=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);k[0]=128;for(var w=1;w<k.length-8;++w)k[w]=0;var E=8*this.o;for(w=k.length-8;w<k.length;++w)k[w]=E&255,E/=256;for(this.u(k),k=Array(16),w=E=0;4>w;++w)for(var R=0;32>R;R+=8)k[E++]=this.g[w]>>>R&255;return k};function s(k,w){var E=a;return Object.prototype.hasOwnProperty.call(E,k)?E[k]:E[k]=w(k)}function o(k,w){this.h=w;for(var E=[],R=!0,A=k.length-1;0<=A;A--){var b=k[A]|0;R&&b==w||(E[A]=b,R=!1)}this.g=E}var a={};function l(k){return-128<=k&&128>k?s(k,function(w){return new o([w|0],0>w?-1:0)}):new o([k|0],0>k?-1:0)}function c(k){if(isNaN(k)||!isFinite(k))return d;if(0>k)return P(c(-k));for(var w=[],E=1,R=0;k>=E;R++)w[R]=k/E|0,E*=4294967296;return new o(w,0)}function h(k,w){if(k.length==0)throw Error("number format error: empty string");if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(k.charAt(0)=="-")return P(h(k.substring(1),w));if(0<=k.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=c(Math.pow(w,8)),R=d,A=0;A<k.length;A+=8){var b=Math.min(8,k.length-A),x=parseInt(k.substring(A,A+b),w);8>b?(b=c(Math.pow(w,b)),R=R.j(b).add(c(x))):(R=R.j(E),R=R.add(c(x)))}return R}var d=l(0),p=l(1),_=l(16777216);n=o.prototype,n.m=function(){if(C(this))return-P(this).m();for(var k=0,w=1,E=0;E<this.g.length;E++){var R=this.i(E);k+=(0<=R?R:4294967296+R)*w,w*=4294967296}return k},n.toString=function(k){if(k=k||10,2>k||36<k)throw Error("radix out of range: "+k);if(T(this))return"0";if(C(this))return"-"+P(this).toString(k);for(var w=c(Math.pow(k,6)),E=this,R="";;){var A=D(E,w).g;E=y(E,A.j(w));var b=((0<E.g.length?E.g[0]:E.h)>>>0).toString(k);if(E=A,T(E))return b+R;for(;6>b.length;)b="0"+b;R=b+R}},n.i=function(k){return 0>k?0:k<this.g.length?this.g[k]:this.h};function T(k){if(k.h!=0)return!1;for(var w=0;w<k.g.length;w++)if(k.g[w]!=0)return!1;return!0}function C(k){return k.h==-1}n.l=function(k){return k=y(this,k),C(k)?-1:T(k)?0:1};function P(k){for(var w=k.g.length,E=[],R=0;R<w;R++)E[R]=~k.g[R];return new o(E,~k.h).add(p)}n.abs=function(){return C(this)?P(this):this},n.add=function(k){for(var w=Math.max(this.g.length,k.g.length),E=[],R=0,A=0;A<=w;A++){var b=R+(this.i(A)&65535)+(k.i(A)&65535),x=(b>>>16)+(this.i(A)>>>16)+(k.i(A)>>>16);R=x>>>16,b&=65535,x&=65535,E[A]=x<<16|b}return new o(E,E[E.length-1]&-2147483648?-1:0)};function y(k,w){return k.add(P(w))}n.j=function(k){if(T(this)||T(k))return d;if(C(this))return C(k)?P(this).j(P(k)):P(P(this).j(k));if(C(k))return P(this.j(P(k)));if(0>this.l(_)&&0>k.l(_))return c(this.m()*k.m());for(var w=this.g.length+k.g.length,E=[],R=0;R<2*w;R++)E[R]=0;for(R=0;R<this.g.length;R++)for(var A=0;A<k.g.length;A++){var b=this.i(R)>>>16,x=this.i(R)&65535,Ot=k.i(A)>>>16,On=k.i(A)&65535;E[2*R+2*A]+=x*On,I(E,2*R+2*A),E[2*R+2*A+1]+=b*On,I(E,2*R+2*A+1),E[2*R+2*A+1]+=x*Ot,I(E,2*R+2*A+1),E[2*R+2*A+2]+=b*Ot,I(E,2*R+2*A+2)}for(R=0;R<w;R++)E[R]=E[2*R+1]<<16|E[2*R];for(R=w;R<2*w;R++)E[R]=0;return new o(E,0)};function I(k,w){for(;(k[w]&65535)!=k[w];)k[w+1]+=k[w]>>>16,k[w]&=65535,w++}function S(k,w){this.g=k,this.h=w}function D(k,w){if(T(w))throw Error("division by zero");if(T(k))return new S(d,d);if(C(k))return w=D(P(k),w),new S(P(w.g),P(w.h));if(C(w))return w=D(k,P(w)),new S(P(w.g),w.h);if(30<k.g.length){if(C(k)||C(w))throw Error("slowDivide_ only works with positive integers.");for(var E=p,R=w;0>=R.l(k);)E=F(E),R=F(R);var A=M(E,1),b=M(R,1);for(R=M(R,2),E=M(E,2);!T(R);){var x=b.add(R);0>=x.l(k)&&(A=A.add(E),b=x),R=M(R,1),E=M(E,1)}return w=y(k,A.j(w)),new S(A,w)}for(A=d;0<=k.l(w);){for(E=Math.max(1,Math.floor(k.m()/w.m())),R=Math.ceil(Math.log(E)/Math.LN2),R=48>=R?1:Math.pow(2,R-48),b=c(E),x=b.j(w);C(x)||0<x.l(k);)E-=R,b=c(E),x=b.j(w);T(b)&&(b=p),A=A.add(b),k=y(k,x)}return new S(A,k)}n.A=function(k){return D(this,k).h},n.and=function(k){for(var w=Math.max(this.g.length,k.g.length),E=[],R=0;R<w;R++)E[R]=this.i(R)&k.i(R);return new o(E,this.h&k.h)},n.or=function(k){for(var w=Math.max(this.g.length,k.g.length),E=[],R=0;R<w;R++)E[R]=this.i(R)|k.i(R);return new o(E,this.h|k.h)},n.xor=function(k){for(var w=Math.max(this.g.length,k.g.length),E=[],R=0;R<w;R++)E[R]=this.i(R)^k.i(R);return new o(E,this.h^k.h)};function F(k){for(var w=k.g.length+1,E=[],R=0;R<w;R++)E[R]=k.i(R)<<1|k.i(R-1)>>>31;return new o(E,k.h)}function M(k,w){var E=w>>5;w%=32;for(var R=k.g.length-E,A=[],b=0;b<R;b++)A[b]=0<w?k.i(b+E)>>>w|k.i(b+E+1)<<32-w:k.i(b+E);return new o(A,k.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,bk=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=h,vs=o}).apply(typeof wI<"u"?wI:typeof self<"u"?self:typeof window<"u"?window:{});var Fc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nk,ml,Dk,ch,sg,Vk,Ok,Lk;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(u,f,m){return u==Array.prototype||u==Object.prototype||(u[f]=m.value),u};function t(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fc=="object"&&Fc];for(var f=0;f<u.length;++f){var m=u[f];if(m&&m.Math==Math)return m}throw Error("Cannot find global object")}var r=t(this);function i(u,f){if(f)e:{var m=r;u=u.split(".");for(var v=0;v<u.length-1;v++){var V=u[v];if(!(V in m))break e;m=m[V]}u=u[u.length-1],v=m[u],f=f(v),f!=v&&f!=null&&e(m,u,{configurable:!0,writable:!0,value:f})}}function s(u,f){u instanceof String&&(u+="");var m=0,v=!1,V={next:function(){if(!v&&m<u.length){var L=m++;return{value:f(L,u[L]),done:!1}}return v=!0,{done:!0,value:void 0}}};return V[Symbol.iterator]=function(){return V},V}i("Array.prototype.values",function(u){return u||function(){return s(this,function(f,m){return m})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(u){var f=typeof u;return f=f!="object"?f:u?Array.isArray(u)?"array":f:"null",f=="array"||f=="object"&&typeof u.length=="number"}function c(u){var f=typeof u;return f=="object"&&u!=null||f=="function"}function h(u,f,m){return u.call.apply(u.bind,arguments)}function d(u,f,m){if(!u)throw Error();if(2<arguments.length){var v=Array.prototype.slice.call(arguments,2);return function(){var V=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(V,v),u.apply(f,V)}}return function(){return u.apply(f,arguments)}}function p(u,f,m){return p=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?h:d,p.apply(null,arguments)}function _(u,f){var m=Array.prototype.slice.call(arguments,1);return function(){var v=m.slice();return v.push.apply(v,arguments),u.apply(this,v)}}function T(u,f){function m(){}m.prototype=f.prototype,u.aa=f.prototype,u.prototype=new m,u.prototype.constructor=u,u.Qb=function(v,V,L){for(var q=Array(arguments.length-2),Se=2;Se<arguments.length;Se++)q[Se-2]=arguments[Se];return f.prototype[V].apply(v,q)}}function C(u){const f=u.length;if(0<f){const m=Array(f);for(let v=0;v<f;v++)m[v]=u[v];return m}return[]}function P(u,f){for(let m=1;m<arguments.length;m++){const v=arguments[m];if(l(v)){const V=u.length||0,L=v.length||0;u.length=V+L;for(let q=0;q<L;q++)u[V+q]=v[q]}else u.push(v)}}class y{constructor(f,m){this.i=f,this.j=m,this.h=0,this.g=null}get(){let f;return 0<this.h?(this.h--,f=this.g,this.g=f.next,f.next=null):f=this.i(),f}}function I(u){return/^[\s\xa0]*$/.test(u)}function S(){var u=a.navigator;return u&&(u=u.userAgent)?u:""}function D(u){return D[" "](u),u}D[" "]=function(){};var F=S().indexOf("Gecko")!=-1&&!(S().toLowerCase().indexOf("webkit")!=-1&&S().indexOf("Edge")==-1)&&!(S().indexOf("Trident")!=-1||S().indexOf("MSIE")!=-1)&&S().indexOf("Edge")==-1;function M(u,f,m){for(const v in u)f.call(m,u[v],v,u)}function k(u,f){for(const m in u)f.call(void 0,u[m],m,u)}function w(u){const f={};for(const m in u)f[m]=u[m];return f}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function R(u,f){let m,v;for(let V=1;V<arguments.length;V++){v=arguments[V];for(m in v)u[m]=v[m];for(let L=0;L<E.length;L++)m=E[L],Object.prototype.hasOwnProperty.call(v,m)&&(u[m]=v[m])}}function A(u){var f=1;u=u.split(":");const m=[];for(;0<f&&u.length;)m.push(u.shift()),f--;return u.length&&m.push(u.join(":")),m}function b(u){a.setTimeout(()=>{throw u},0)}function x(){var u=te;let f=null;return u.g&&(f=u.g,u.g=u.g.next,u.g||(u.h=null),f.next=null),f}class Ot{constructor(){this.h=this.g=null}add(f,m){const v=On.get();v.set(f,m),this.h?this.h.next=v:this.g=v,this.h=v}}var On=new y(()=>new J,u=>u.reset());class J{constructor(){this.next=this.g=this.h=null}set(f,m){this.h=f,this.g=m,this.next=null}reset(){this.next=this.g=this.h=null}}let pe,G=!1,te=new Ot,ie=()=>{const u=a.Promise.resolve(void 0);pe=()=>{u.then(Be)}};var Be=()=>{for(var u;u=x();){try{u.h.call(u.g)}catch(m){b(m)}var f=On;f.j(u),100>f.h&&(f.h++,u.next=f.g,f.g=u)}G=!1};function Te(){this.s=this.s,this.C=this.C}Te.prototype.s=!1,Te.prototype.ma=function(){this.s||(this.s=!0,this.N())},Te.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Je(u,f){this.type=u,this.g=this.target=f,this.defaultPrevented=!1}Je.prototype.h=function(){this.defaultPrevented=!0};var rr=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var u=!1,f=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const m=()=>{};a.addEventListener("test",m,f),a.removeEventListener("test",m,f)}catch{}return u}();function ir(u,f){if(Je.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u){var m=this.type=u.type,v=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;if(this.target=u.target||u.srcElement,this.g=f,f=u.relatedTarget){if(F){e:{try{D(f.nodeName);var V=!0;break e}catch{}V=!1}V||(f=null)}}else m=="mouseover"?f=u.fromElement:m=="mouseout"&&(f=u.toElement);this.relatedTarget=f,v?(this.clientX=v.clientX!==void 0?v.clientX:v.pageX,this.clientY=v.clientY!==void 0?v.clientY:v.pageY,this.screenX=v.screenX||0,this.screenY=v.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=typeof u.pointerType=="string"?u.pointerType:sr[u.pointerType]||"",this.state=u.state,this.i=u,u.defaultPrevented&&ir.aa.h.call(this)}}T(ir,Je);var sr={2:"touch",3:"pen",4:"mouse"};ir.prototype.h=function(){ir.aa.h.call(this);var u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var or="closure_listenable_"+(1e6*Math.random()|0),jx=0;function Ux(u,f,m,v,V){this.listener=u,this.proxy=null,this.src=f,this.type=m,this.capture=!!v,this.ha=V,this.key=++jx,this.da=this.fa=!1}function nc(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function rc(u){this.src=u,this.g={},this.h=0}rc.prototype.add=function(u,f,m,v,V){var L=u.toString();u=this.g[L],u||(u=this.g[L]=[],this.h++);var q=Bf(u,f,v,V);return-1<q?(f=u[q],m||(f.fa=!1)):(f=new Ux(f,this.src,L,!!v,V),f.fa=m,u.push(f)),f};function Uf(u,f){var m=f.type;if(m in u.g){var v=u.g[m],V=Array.prototype.indexOf.call(v,f,void 0),L;(L=0<=V)&&Array.prototype.splice.call(v,V,1),L&&(nc(f),u.g[m].length==0&&(delete u.g[m],u.h--))}}function Bf(u,f,m,v){for(var V=0;V<u.length;++V){var L=u[V];if(!L.da&&L.listener==f&&L.capture==!!m&&L.ha==v)return V}return-1}var zf="closure_lm_"+(1e6*Math.random()|0),$f={};function Lv(u,f,m,v,V){if(Array.isArray(f)){for(var L=0;L<f.length;L++)Lv(u,f[L],m,v,V);return null}return m=jv(m),u&&u[or]?u.K(f,m,c(v)?!!v.capture:!1,V):Bx(u,f,m,!1,v,V)}function Bx(u,f,m,v,V,L){if(!f)throw Error("Invalid event type");var q=c(V)?!!V.capture:!!V,Se=Gf(u);if(Se||(u[zf]=Se=new rc(u)),m=Se.add(f,m,v,q,L),m.proxy)return m;if(v=zx(),m.proxy=v,v.src=u,v.listener=m,u.addEventListener)rr||(V=q),V===void 0&&(V=!1),u.addEventListener(f.toString(),v,V);else if(u.attachEvent)u.attachEvent(Fv(f.toString()),v);else if(u.addListener&&u.removeListener)u.addListener(v);else throw Error("addEventListener and attachEvent are unavailable.");return m}function zx(){function u(m){return f.call(u.src,u.listener,m)}const f=$x;return u}function Mv(u,f,m,v,V){if(Array.isArray(f))for(var L=0;L<f.length;L++)Mv(u,f[L],m,v,V);else v=c(v)?!!v.capture:!!v,m=jv(m),u&&u[or]?(u=u.i,f=String(f).toString(),f in u.g&&(L=u.g[f],m=Bf(L,m,v,V),-1<m&&(nc(L[m]),Array.prototype.splice.call(L,m,1),L.length==0&&(delete u.g[f],u.h--)))):u&&(u=Gf(u))&&(f=u.g[f.toString()],u=-1,f&&(u=Bf(f,m,v,V)),(m=-1<u?f[u]:null)&&qf(m))}function qf(u){if(typeof u!="number"&&u&&!u.da){var f=u.src;if(f&&f[or])Uf(f.i,u);else{var m=u.type,v=u.proxy;f.removeEventListener?f.removeEventListener(m,v,u.capture):f.detachEvent?f.detachEvent(Fv(m),v):f.addListener&&f.removeListener&&f.removeListener(v),(m=Gf(f))?(Uf(m,u),m.h==0&&(m.src=null,f[zf]=null)):nc(u)}}}function Fv(u){return u in $f?$f[u]:$f[u]="on"+u}function $x(u,f){if(u.da)u=!0;else{f=new ir(f,this);var m=u.listener,v=u.ha||u.src;u.fa&&qf(u),u=m.call(v,f)}return u}function Gf(u){return u=u[zf],u instanceof rc?u:null}var Kf="__closure_events_fn_"+(1e9*Math.random()>>>0);function jv(u){return typeof u=="function"?u:(u[Kf]||(u[Kf]=function(f){return u.handleEvent(f)}),u[Kf])}function Tt(){Te.call(this),this.i=new rc(this),this.M=this,this.F=null}T(Tt,Te),Tt.prototype[or]=!0,Tt.prototype.removeEventListener=function(u,f,m,v){Mv(this,u,f,m,v)};function Lt(u,f){var m,v=u.F;if(v)for(m=[];v;v=v.F)m.push(v);if(u=u.M,v=f.type||f,typeof f=="string")f=new Je(f,u);else if(f instanceof Je)f.target=f.target||u;else{var V=f;f=new Je(v,u),R(f,V)}if(V=!0,m)for(var L=m.length-1;0<=L;L--){var q=f.g=m[L];V=ic(q,v,!0,f)&&V}if(q=f.g=u,V=ic(q,v,!0,f)&&V,V=ic(q,v,!1,f)&&V,m)for(L=0;L<m.length;L++)q=f.g=m[L],V=ic(q,v,!1,f)&&V}Tt.prototype.N=function(){if(Tt.aa.N.call(this),this.i){var u=this.i,f;for(f in u.g){for(var m=u.g[f],v=0;v<m.length;v++)nc(m[v]);delete u.g[f],u.h--}}this.F=null},Tt.prototype.K=function(u,f,m,v){return this.i.add(String(u),f,!1,m,v)},Tt.prototype.L=function(u,f,m,v){return this.i.add(String(u),f,!0,m,v)};function ic(u,f,m,v){if(f=u.i.g[String(f)],!f)return!0;f=f.concat();for(var V=!0,L=0;L<f.length;++L){var q=f[L];if(q&&!q.da&&q.capture==m){var Se=q.listener,yt=q.ha||q.src;q.fa&&Uf(u.i,q),V=Se.call(yt,v)!==!1&&V}}return V&&!v.defaultPrevented}function Uv(u,f,m){if(typeof u=="function")m&&(u=p(u,m));else if(u&&typeof u.handleEvent=="function")u=p(u.handleEvent,u);else throw Error("Invalid listener argument");return 2147483647<Number(f)?-1:a.setTimeout(u,f||0)}function Bv(u){u.g=Uv(()=>{u.g=null,u.i&&(u.i=!1,Bv(u))},u.l);const f=u.h;u.h=null,u.m.apply(null,f)}class qx extends Te{constructor(f,m){super(),this.m=f,this.l=m,this.h=null,this.i=!1,this.g=null}j(f){this.h=arguments,this.g?this.i=!0:Bv(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Na(u){Te.call(this),this.h=u,this.g={}}T(Na,Te);var zv=[];function $v(u){M(u.g,function(f,m){this.g.hasOwnProperty(m)&&qf(f)},u),u.g={}}Na.prototype.N=function(){Na.aa.N.call(this),$v(this)},Na.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Wf=a.JSON.stringify,Gx=a.JSON.parse,Kx=class{stringify(u){return a.JSON.stringify(u,void 0)}parse(u){return a.JSON.parse(u,void 0)}};function Hf(){}Hf.prototype.h=null;function qv(u){return u.h||(u.h=u.i())}function Gv(){}var Da={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Qf(){Je.call(this,"d")}T(Qf,Je);function Yf(){Je.call(this,"c")}T(Yf,Je);var Qi={},Kv=null;function sc(){return Kv=Kv||new Tt}Qi.La="serverreachability";function Wv(u){Je.call(this,Qi.La,u)}T(Wv,Je);function Va(u){const f=sc();Lt(f,new Wv(f))}Qi.STAT_EVENT="statevent";function Hv(u,f){Je.call(this,Qi.STAT_EVENT,u),this.stat=f}T(Hv,Je);function Mt(u){const f=sc();Lt(f,new Hv(f,u))}Qi.Ma="timingevent";function Qv(u,f){Je.call(this,Qi.Ma,u),this.size=f}T(Qv,Je);function Oa(u,f){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){u()},f)}function La(){this.g=!0}La.prototype.xa=function(){this.g=!1};function Wx(u,f,m,v,V,L){u.info(function(){if(u.g)if(L)for(var q="",Se=L.split("&"),yt=0;yt<Se.length;yt++){var _e=Se[yt].split("=");if(1<_e.length){var St=_e[0];_e=_e[1];var At=St.split("_");q=2<=At.length&&At[1]=="type"?q+(St+"="+_e+"&"):q+(St+"=redacted&")}}else q=null;else q=L;return"XMLHTTP REQ ("+v+") [attempt "+V+"]: "+f+`
`+m+`
`+q})}function Hx(u,f,m,v,V,L,q){u.info(function(){return"XMLHTTP RESP ("+v+") [ attempt "+V+"]: "+f+`
`+m+`
`+L+" "+q})}function Js(u,f,m,v){u.info(function(){return"XMLHTTP TEXT ("+f+"): "+Yx(u,m)+(v?" "+v:"")})}function Qx(u,f){u.info(function(){return"TIMEOUT: "+f})}La.prototype.info=function(){};function Yx(u,f){if(!u.g)return f;if(!f)return null;try{var m=JSON.parse(f);if(m){for(u=0;u<m.length;u++)if(Array.isArray(m[u])){var v=m[u];if(!(2>v.length)){var V=v[1];if(Array.isArray(V)&&!(1>V.length)){var L=V[0];if(L!="noop"&&L!="stop"&&L!="close")for(var q=1;q<V.length;q++)V[q]=""}}}}return Wf(m)}catch{return f}}var oc={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Yv={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Jf;function ac(){}T(ac,Hf),ac.prototype.g=function(){return new XMLHttpRequest},ac.prototype.i=function(){return{}},Jf=new ac;function jr(u,f,m,v){this.j=u,this.i=f,this.l=m,this.R=v||1,this.U=new Na(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Jv}function Jv(){this.i=null,this.g="",this.h=!1}var Xv={},Xf={};function Zf(u,f,m){u.L=1,u.v=hc(ar(f)),u.m=m,u.P=!0,Zv(u,null)}function Zv(u,f){u.F=Date.now(),lc(u),u.A=ar(u.v);var m=u.A,v=u.R;Array.isArray(v)||(v=[String(v)]),fw(m.i,"t",v),u.C=0,m=u.j.J,u.h=new Jv,u.g=bw(u.j,m?f:null,!u.m),0<u.O&&(u.M=new qx(p(u.Y,u,u.g),u.O)),f=u.U,m=u.g,v=u.ca;var V="readystatechange";Array.isArray(V)||(V&&(zv[0]=V.toString()),V=zv);for(var L=0;L<V.length;L++){var q=Lv(m,V[L],v||f.handleEvent,!1,f.h||f);if(!q)break;f.g[q.key]=q}f=u.H?w(u.H):{},u.m?(u.u||(u.u="POST"),f["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.A,u.u,u.m,f)):(u.u="GET",u.g.ea(u.A,u.u,null,f)),Va(),Wx(u.i,u.u,u.A,u.l,u.R,u.m)}jr.prototype.ca=function(u){u=u.target;const f=this.M;f&&lr(u)==3?f.j():this.Y(u)},jr.prototype.Y=function(u){try{if(u==this.g)e:{const At=lr(this.g);var f=this.g.Ba();const eo=this.g.Z();if(!(3>At)&&(At!=3||this.g&&(this.h.h||this.g.oa()||ww(this.g)))){this.J||At!=4||f==7||(f==8||0>=eo?Va(3):Va(2)),ep(this);var m=this.g.Z();this.X=m;t:if(ew(this)){var v=ww(this.g);u="";var V=v.length,L=lr(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Yi(this),Ma(this);var q="";break t}this.h.i=new a.TextDecoder}for(f=0;f<V;f++)this.h.h=!0,u+=this.h.i.decode(v[f],{stream:!(L&&f==V-1)});v.length=0,this.h.g+=u,this.C=0,q=this.h.g}else q=this.g.oa();if(this.o=m==200,Hx(this.i,this.u,this.A,this.l,this.R,At,m),this.o){if(this.T&&!this.K){t:{if(this.g){var Se,yt=this.g;if((Se=yt.g?yt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(Se)){var _e=Se;break t}}_e=null}if(m=_e)Js(this.i,this.l,m,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,tp(this,m);else{this.o=!1,this.s=3,Mt(12),Yi(this),Ma(this);break e}}if(this.P){m=!0;let yn;for(;!this.J&&this.C<q.length;)if(yn=Jx(this,q),yn==Xf){At==4&&(this.s=4,Mt(14),m=!1),Js(this.i,this.l,null,"[Incomplete Response]");break}else if(yn==Xv){this.s=4,Mt(15),Js(this.i,this.l,q,"[Invalid Chunk]"),m=!1;break}else Js(this.i,this.l,yn,null),tp(this,yn);if(ew(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),At!=4||q.length!=0||this.h.h||(this.s=1,Mt(16),m=!1),this.o=this.o&&m,!m)Js(this.i,this.l,q,"[Invalid Chunked Response]"),Yi(this),Ma(this);else if(0<q.length&&!this.W){this.W=!0;var St=this.j;St.g==this&&St.ba&&!St.M&&(St.j.info("Great, no buffering proxy detected. Bytes received: "+q.length),ap(St),St.M=!0,Mt(11))}}else Js(this.i,this.l,q,null),tp(this,q);At==4&&Yi(this),this.o&&!this.J&&(At==4?Cw(this.j,this):(this.o=!1,lc(this)))}else pb(this.g),m==400&&0<q.indexOf("Unknown SID")?(this.s=3,Mt(12)):(this.s=0,Mt(13)),Yi(this),Ma(this)}}}catch{}finally{}};function ew(u){return u.g?u.u=="GET"&&u.L!=2&&u.j.Ca:!1}function Jx(u,f){var m=u.C,v=f.indexOf(`
`,m);return v==-1?Xf:(m=Number(f.substring(m,v)),isNaN(m)?Xv:(v+=1,v+m>f.length?Xf:(f=f.slice(v,v+m),u.C=v+m,f)))}jr.prototype.cancel=function(){this.J=!0,Yi(this)};function lc(u){u.S=Date.now()+u.I,tw(u,u.I)}function tw(u,f){if(u.B!=null)throw Error("WatchDog timer not null");u.B=Oa(p(u.ba,u),f)}function ep(u){u.B&&(a.clearTimeout(u.B),u.B=null)}jr.prototype.ba=function(){this.B=null;const u=Date.now();0<=u-this.S?(Qx(this.i,this.A),this.L!=2&&(Va(),Mt(17)),Yi(this),this.s=2,Ma(this)):tw(this,this.S-u)};function Ma(u){u.j.G==0||u.J||Cw(u.j,u)}function Yi(u){ep(u);var f=u.M;f&&typeof f.ma=="function"&&f.ma(),u.M=null,$v(u.U),u.g&&(f=u.g,u.g=null,f.abort(),f.ma())}function tp(u,f){try{var m=u.j;if(m.G!=0&&(m.g==u||np(m.h,u))){if(!u.K&&np(m.h,u)&&m.G==3){try{var v=m.Da.g.parse(f)}catch{v=null}if(Array.isArray(v)&&v.length==3){var V=v;if(V[0]==0){e:if(!m.u){if(m.g)if(m.g.F+3e3<u.F)_c(m),mc(m);else break e;op(m),Mt(18)}}else m.za=V[1],0<m.za-m.T&&37500>V[2]&&m.F&&m.v==0&&!m.C&&(m.C=Oa(p(m.Za,m),6e3));if(1>=iw(m.h)&&m.ca){try{m.ca()}catch{}m.ca=void 0}}else Xi(m,11)}else if((u.K||m.g==u)&&_c(m),!I(f))for(V=m.Da.g.parse(f),f=0;f<V.length;f++){let _e=V[f];if(m.T=_e[0],_e=_e[1],m.G==2)if(_e[0]=="c"){m.K=_e[1],m.ia=_e[2];const St=_e[3];St!=null&&(m.la=St,m.j.info("VER="+m.la));const At=_e[4];At!=null&&(m.Aa=At,m.j.info("SVER="+m.Aa));const eo=_e[5];eo!=null&&typeof eo=="number"&&0<eo&&(v=1.5*eo,m.L=v,m.j.info("backChannelRequestTimeoutMs_="+v)),v=m;const yn=u.g;if(yn){const vc=yn.g?yn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(vc){var L=v.h;L.g||vc.indexOf("spdy")==-1&&vc.indexOf("quic")==-1&&vc.indexOf("h2")==-1||(L.j=L.l,L.g=new Set,L.h&&(rp(L,L.h),L.h=null))}if(v.D){const lp=yn.g?yn.g.getResponseHeader("X-HTTP-Session-Id"):null;lp&&(v.ya=lp,Re(v.I,v.D,lp))}}m.G=3,m.l&&m.l.ua(),m.ba&&(m.R=Date.now()-u.F,m.j.info("Handshake RTT: "+m.R+"ms")),v=m;var q=u;if(v.qa=xw(v,v.J?v.ia:null,v.W),q.K){sw(v.h,q);var Se=q,yt=v.L;yt&&(Se.I=yt),Se.B&&(ep(Se),lc(Se)),v.g=q}else Aw(v);0<m.i.length&&gc(m)}else _e[0]!="stop"&&_e[0]!="close"||Xi(m,7);else m.G==3&&(_e[0]=="stop"||_e[0]=="close"?_e[0]=="stop"?Xi(m,7):sp(m):_e[0]!="noop"&&m.l&&m.l.ta(_e),m.v=0)}}Va(4)}catch{}}var Xx=class{constructor(u,f){this.g=u,this.map=f}};function nw(u){this.l=u||10,a.PerformanceNavigationTiming?(u=a.performance.getEntriesByType("navigation"),u=0<u.length&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function rw(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function iw(u){return u.h?1:u.g?u.g.size:0}function np(u,f){return u.h?u.h==f:u.g?u.g.has(f):!1}function rp(u,f){u.g?u.g.add(f):u.h=f}function sw(u,f){u.h&&u.h==f?u.h=null:u.g&&u.g.has(f)&&u.g.delete(f)}nw.prototype.cancel=function(){if(this.i=ow(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function ow(u){if(u.h!=null)return u.i.concat(u.h.D);if(u.g!=null&&u.g.size!==0){let f=u.i;for(const m of u.g.values())f=f.concat(m.D);return f}return C(u.i)}function Zx(u){if(u.V&&typeof u.V=="function")return u.V();if(typeof Map<"u"&&u instanceof Map||typeof Set<"u"&&u instanceof Set)return Array.from(u.values());if(typeof u=="string")return u.split("");if(l(u)){for(var f=[],m=u.length,v=0;v<m;v++)f.push(u[v]);return f}f=[],m=0;for(v in u)f[m++]=u[v];return f}function eb(u){if(u.na&&typeof u.na=="function")return u.na();if(!u.V||typeof u.V!="function"){if(typeof Map<"u"&&u instanceof Map)return Array.from(u.keys());if(!(typeof Set<"u"&&u instanceof Set)){if(l(u)||typeof u=="string"){var f=[];u=u.length;for(var m=0;m<u;m++)f.push(m);return f}f=[],m=0;for(const v in u)f[m++]=v;return f}}}function aw(u,f){if(u.forEach&&typeof u.forEach=="function")u.forEach(f,void 0);else if(l(u)||typeof u=="string")Array.prototype.forEach.call(u,f,void 0);else for(var m=eb(u),v=Zx(u),V=v.length,L=0;L<V;L++)f.call(void 0,v[L],m&&m[L],u)}var lw=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function tb(u,f){if(u){u=u.split("&");for(var m=0;m<u.length;m++){var v=u[m].indexOf("="),V=null;if(0<=v){var L=u[m].substring(0,v);V=u[m].substring(v+1)}else L=u[m];f(L,V?decodeURIComponent(V.replace(/\+/g," ")):"")}}}function Ji(u){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,u instanceof Ji){this.h=u.h,uc(this,u.j),this.o=u.o,this.g=u.g,cc(this,u.s),this.l=u.l;var f=u.i,m=new Ua;m.i=f.i,f.g&&(m.g=new Map(f.g),m.h=f.h),uw(this,m),this.m=u.m}else u&&(f=String(u).match(lw))?(this.h=!1,uc(this,f[1]||"",!0),this.o=Fa(f[2]||""),this.g=Fa(f[3]||"",!0),cc(this,f[4]),this.l=Fa(f[5]||"",!0),uw(this,f[6]||"",!0),this.m=Fa(f[7]||"")):(this.h=!1,this.i=new Ua(null,this.h))}Ji.prototype.toString=function(){var u=[],f=this.j;f&&u.push(ja(f,cw,!0),":");var m=this.g;return(m||f=="file")&&(u.push("//"),(f=this.o)&&u.push(ja(f,cw,!0),"@"),u.push(encodeURIComponent(String(m)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),m=this.s,m!=null&&u.push(":",String(m))),(m=this.l)&&(this.g&&m.charAt(0)!="/"&&u.push("/"),u.push(ja(m,m.charAt(0)=="/"?ib:rb,!0))),(m=this.i.toString())&&u.push("?",m),(m=this.m)&&u.push("#",ja(m,ob)),u.join("")};function ar(u){return new Ji(u)}function uc(u,f,m){u.j=m?Fa(f,!0):f,u.j&&(u.j=u.j.replace(/:$/,""))}function cc(u,f){if(f){if(f=Number(f),isNaN(f)||0>f)throw Error("Bad port number "+f);u.s=f}else u.s=null}function uw(u,f,m){f instanceof Ua?(u.i=f,ab(u.i,u.h)):(m||(f=ja(f,sb)),u.i=new Ua(f,u.h))}function Re(u,f,m){u.i.set(f,m)}function hc(u){return Re(u,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),u}function Fa(u,f){return u?f?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function ja(u,f,m){return typeof u=="string"?(u=encodeURI(u).replace(f,nb),m&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function nb(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var cw=/[#\/\?@]/g,rb=/[#\?:]/g,ib=/[#\?]/g,sb=/[#\?@]/g,ob=/#/g;function Ua(u,f){this.h=this.g=null,this.i=u||null,this.j=!!f}function Ur(u){u.g||(u.g=new Map,u.h=0,u.i&&tb(u.i,function(f,m){u.add(decodeURIComponent(f.replace(/\+/g," ")),m)}))}n=Ua.prototype,n.add=function(u,f){Ur(this),this.i=null,u=Xs(this,u);var m=this.g.get(u);return m||this.g.set(u,m=[]),m.push(f),this.h+=1,this};function hw(u,f){Ur(u),f=Xs(u,f),u.g.has(f)&&(u.i=null,u.h-=u.g.get(f).length,u.g.delete(f))}function dw(u,f){return Ur(u),f=Xs(u,f),u.g.has(f)}n.forEach=function(u,f){Ur(this),this.g.forEach(function(m,v){m.forEach(function(V){u.call(f,V,v,this)},this)},this)},n.na=function(){Ur(this);const u=Array.from(this.g.values()),f=Array.from(this.g.keys()),m=[];for(let v=0;v<f.length;v++){const V=u[v];for(let L=0;L<V.length;L++)m.push(f[v])}return m},n.V=function(u){Ur(this);let f=[];if(typeof u=="string")dw(this,u)&&(f=f.concat(this.g.get(Xs(this,u))));else{u=Array.from(this.g.values());for(let m=0;m<u.length;m++)f=f.concat(u[m])}return f},n.set=function(u,f){return Ur(this),this.i=null,u=Xs(this,u),dw(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[f]),this.h+=1,this},n.get=function(u,f){return u?(u=this.V(u),0<u.length?String(u[0]):f):f};function fw(u,f,m){hw(u,f),0<m.length&&(u.i=null,u.g.set(Xs(u,f),C(m)),u.h+=m.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],f=Array.from(this.g.keys());for(var m=0;m<f.length;m++){var v=f[m];const L=encodeURIComponent(String(v)),q=this.V(v);for(v=0;v<q.length;v++){var V=L;q[v]!==""&&(V+="="+encodeURIComponent(String(q[v]))),u.push(V)}}return this.i=u.join("&")};function Xs(u,f){return f=String(f),u.j&&(f=f.toLowerCase()),f}function ab(u,f){f&&!u.j&&(Ur(u),u.i=null,u.g.forEach(function(m,v){var V=v.toLowerCase();v!=V&&(hw(this,v),fw(this,V,m))},u)),u.j=f}function lb(u,f){const m=new La;if(a.Image){const v=new Image;v.onload=_(Br,m,"TestLoadImage: loaded",!0,f,v),v.onerror=_(Br,m,"TestLoadImage: error",!1,f,v),v.onabort=_(Br,m,"TestLoadImage: abort",!1,f,v),v.ontimeout=_(Br,m,"TestLoadImage: timeout",!1,f,v),a.setTimeout(function(){v.ontimeout&&v.ontimeout()},1e4),v.src=u}else f(!1)}function ub(u,f){const m=new La,v=new AbortController,V=setTimeout(()=>{v.abort(),Br(m,"TestPingServer: timeout",!1,f)},1e4);fetch(u,{signal:v.signal}).then(L=>{clearTimeout(V),L.ok?Br(m,"TestPingServer: ok",!0,f):Br(m,"TestPingServer: server error",!1,f)}).catch(()=>{clearTimeout(V),Br(m,"TestPingServer: error",!1,f)})}function Br(u,f,m,v,V){try{V&&(V.onload=null,V.onerror=null,V.onabort=null,V.ontimeout=null),v(m)}catch{}}function cb(){this.g=new Kx}function hb(u,f,m){const v=m||"";try{aw(u,function(V,L){let q=V;c(V)&&(q=Wf(V)),f.push(v+L+"="+encodeURIComponent(q))})}catch(V){throw f.push(v+"type="+encodeURIComponent("_badmap")),V}}function dc(u){this.l=u.Ub||null,this.j=u.eb||!1}T(dc,Hf),dc.prototype.g=function(){return new fc(this.l,this.j)},dc.prototype.i=function(u){return function(){return u}}({});function fc(u,f){Tt.call(this),this.D=u,this.o=f,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}T(fc,Tt),n=fc.prototype,n.open=function(u,f){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=u,this.A=f,this.readyState=1,za(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const f={headers:this.u,method:this.B,credentials:this.m,cache:void 0};u&&(f.body=u),(this.D||a).fetch(new Request(this.A,f)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ba(this)),this.readyState=0},n.Sa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,za(this)),this.g&&(this.readyState=3,za(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;pw(this)}else u.text().then(this.Ra.bind(this),this.ga.bind(this))};function pw(u){u.j.read().then(u.Pa.bind(u)).catch(u.ga.bind(u))}n.Pa=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var f=u.value?u.value:new Uint8Array(0);(f=this.v.decode(f,{stream:!u.done}))&&(this.response=this.responseText+=f)}u.done?Ba(this):za(this),this.readyState==3&&pw(this)}},n.Ra=function(u){this.g&&(this.response=this.responseText=u,Ba(this))},n.Qa=function(u){this.g&&(this.response=u,Ba(this))},n.ga=function(){this.g&&Ba(this)};function Ba(u){u.readyState=4,u.l=null,u.j=null,u.v=null,za(u)}n.setRequestHeader=function(u,f){this.u.append(u,f)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],f=this.h.entries();for(var m=f.next();!m.done;)m=m.value,u.push(m[0]+": "+m[1]),m=f.next();return u.join(`\r
`)};function za(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(fc.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function mw(u){let f="";return M(u,function(m,v){f+=v,f+=":",f+=m,f+=`\r
`}),f}function ip(u,f,m){e:{for(v in m){var v=!1;break e}v=!0}v||(m=mw(m),typeof u=="string"?m!=null&&encodeURIComponent(String(m)):Re(u,f,m))}function We(u){Tt.call(this),this.headers=new Map,this.o=u||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}T(We,Tt);var db=/^https?$/i,fb=["POST","PUT"];n=We.prototype,n.Ha=function(u){this.J=u},n.ea=function(u,f,m,v){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);f=f?f.toUpperCase():"GET",this.D=u,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Jf.g(),this.v=this.o?qv(this.o):qv(Jf),this.g.onreadystatechange=p(this.Ea,this);try{this.B=!0,this.g.open(f,String(u),!0),this.B=!1}catch(L){gw(this,L);return}if(u=m||"",m=new Map(this.headers),v)if(Object.getPrototypeOf(v)===Object.prototype)for(var V in v)m.set(V,v[V]);else if(typeof v.keys=="function"&&typeof v.get=="function")for(const L of v.keys())m.set(L,v.get(L));else throw Error("Unknown input type for opt_headers: "+String(v));v=Array.from(m.keys()).find(L=>L.toLowerCase()=="content-type"),V=a.FormData&&u instanceof a.FormData,!(0<=Array.prototype.indexOf.call(fb,f,void 0))||v||V||m.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[L,q]of m)this.g.setRequestHeader(L,q);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{vw(this),this.u=!0,this.g.send(u),this.u=!1}catch(L){gw(this,L)}};function gw(u,f){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=f,u.m=5,_w(u),pc(u)}function _w(u){u.A||(u.A=!0,Lt(u,"complete"),Lt(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=u||7,Lt(this,"complete"),Lt(this,"abort"),pc(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),pc(this,!0)),We.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?yw(this):this.bb())},n.bb=function(){yw(this)};function yw(u){if(u.h&&typeof o<"u"&&(!u.v[1]||lr(u)!=4||u.Z()!=2)){if(u.u&&lr(u)==4)Uv(u.Ea,0,u);else if(Lt(u,"readystatechange"),lr(u)==4){u.h=!1;try{const q=u.Z();e:switch(q){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var f=!0;break e;default:f=!1}var m;if(!(m=f)){var v;if(v=q===0){var V=String(u.D).match(lw)[1]||null;!V&&a.self&&a.self.location&&(V=a.self.location.protocol.slice(0,-1)),v=!db.test(V?V.toLowerCase():"")}m=v}if(m)Lt(u,"complete"),Lt(u,"success");else{u.m=6;try{var L=2<lr(u)?u.g.statusText:""}catch{L=""}u.l=L+" ["+u.Z()+"]",_w(u)}}finally{pc(u)}}}}function pc(u,f){if(u.g){vw(u);const m=u.g,v=u.v[0]?()=>{}:null;u.g=null,u.v=null,f||Lt(u,"ready");try{m.onreadystatechange=v}catch{}}}function vw(u){u.I&&(a.clearTimeout(u.I),u.I=null)}n.isActive=function(){return!!this.g};function lr(u){return u.g?u.g.readyState:0}n.Z=function(){try{return 2<lr(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(u){if(this.g){var f=this.g.responseText;return u&&f.indexOf(u)==0&&(f=f.substring(u.length)),Gx(f)}};function ww(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.H){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function pb(u){const f={};u=(u.g&&2<=lr(u)&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let v=0;v<u.length;v++){if(I(u[v]))continue;var m=A(u[v]);const V=m[0];if(m=m[1],typeof m!="string")continue;m=m.trim();const L=f[V]||[];f[V]=L,L.push(m)}k(f,function(v){return v.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function $a(u,f,m){return m&&m.internalChannelParams&&m.internalChannelParams[u]||f}function Ew(u){this.Aa=0,this.i=[],this.j=new La,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=$a("failFast",!1,u),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=$a("baseRetryDelayMs",5e3,u),this.cb=$a("retryDelaySeedMs",1e4,u),this.Wa=$a("forwardChannelMaxRetries",2,u),this.wa=$a("forwardChannelRequestTimeoutMs",2e4,u),this.pa=u&&u.xmlHttpFactory||void 0,this.Xa=u&&u.Tb||void 0,this.Ca=u&&u.useFetchStreams||!1,this.L=void 0,this.J=u&&u.supportsCrossDomainXhr||!1,this.K="",this.h=new nw(u&&u.concurrentRequestLimit),this.Da=new cb,this.P=u&&u.fastHandshake||!1,this.O=u&&u.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=u&&u.Rb||!1,u&&u.xa&&this.j.xa(),u&&u.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&u&&u.detectBufferingProxy||!1,this.ja=void 0,u&&u.longPollingTimeout&&0<u.longPollingTimeout&&(this.ja=u.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Ew.prototype,n.la=8,n.G=1,n.connect=function(u,f,m,v){Mt(0),this.W=u,this.H=f||{},m&&v!==void 0&&(this.H.OSID=m,this.H.OAID=v),this.F=this.X,this.I=xw(this,null,this.W),gc(this)};function sp(u){if(Iw(u),u.G==3){var f=u.U++,m=ar(u.I);if(Re(m,"SID",u.K),Re(m,"RID",f),Re(m,"TYPE","terminate"),qa(u,m),f=new jr(u,u.j,f),f.L=2,f.v=hc(ar(m)),m=!1,a.navigator&&a.navigator.sendBeacon)try{m=a.navigator.sendBeacon(f.v.toString(),"")}catch{}!m&&a.Image&&(new Image().src=f.v,m=!0),m||(f.g=bw(f.j,null),f.g.ea(f.v)),f.F=Date.now(),lc(f)}Pw(u)}function mc(u){u.g&&(ap(u),u.g.cancel(),u.g=null)}function Iw(u){mc(u),u.u&&(a.clearTimeout(u.u),u.u=null),_c(u),u.h.cancel(),u.s&&(typeof u.s=="number"&&a.clearTimeout(u.s),u.s=null)}function gc(u){if(!rw(u.h)&&!u.s){u.s=!0;var f=u.Ga;pe||ie(),G||(pe(),G=!0),te.add(f,u),u.B=0}}function mb(u,f){return iw(u.h)>=u.h.j-(u.s?1:0)?!1:u.s?(u.i=f.D.concat(u.i),!0):u.G==1||u.G==2||u.B>=(u.Va?0:u.Wa)?!1:(u.s=Oa(p(u.Ga,u,f),Rw(u,u.B)),u.B++,!0)}n.Ga=function(u){if(this.s)if(this.s=null,this.G==1){if(!u){this.U=Math.floor(1e5*Math.random()),u=this.U++;const V=new jr(this,this.j,u);let L=this.o;if(this.S&&(L?(L=w(L),R(L,this.S)):L=this.S),this.m!==null||this.O||(V.H=L,L=null),this.P)e:{for(var f=0,m=0;m<this.i.length;m++){t:{var v=this.i[m];if("__data__"in v.map&&(v=v.map.__data__,typeof v=="string")){v=v.length;break t}v=void 0}if(v===void 0)break;if(f+=v,4096<f){f=m;break e}if(f===4096||m===this.i.length-1){f=m+1;break e}}f=1e3}else f=1e3;f=Sw(this,V,f),m=ar(this.I),Re(m,"RID",u),Re(m,"CVER",22),this.D&&Re(m,"X-HTTP-Session-Id",this.D),qa(this,m),L&&(this.O?f="headers="+encodeURIComponent(String(mw(L)))+"&"+f:this.m&&ip(m,this.m,L)),rp(this.h,V),this.Ua&&Re(m,"TYPE","init"),this.P?(Re(m,"$req",f),Re(m,"SID","null"),V.T=!0,Zf(V,m,null)):Zf(V,m,f),this.G=2}}else this.G==3&&(u?Tw(this,u):this.i.length==0||rw(this.h)||Tw(this))};function Tw(u,f){var m;f?m=f.l:m=u.U++;const v=ar(u.I);Re(v,"SID",u.K),Re(v,"RID",m),Re(v,"AID",u.T),qa(u,v),u.m&&u.o&&ip(v,u.m,u.o),m=new jr(u,u.j,m,u.B+1),u.m===null&&(m.H=u.o),f&&(u.i=f.D.concat(u.i)),f=Sw(u,m,1e3),m.I=Math.round(.5*u.wa)+Math.round(.5*u.wa*Math.random()),rp(u.h,m),Zf(m,v,f)}function qa(u,f){u.H&&M(u.H,function(m,v){Re(f,v,m)}),u.l&&aw({},function(m,v){Re(f,v,m)})}function Sw(u,f,m){m=Math.min(u.i.length,m);var v=u.l?p(u.l.Na,u.l,u):null;e:{var V=u.i;let L=-1;for(;;){const q=["count="+m];L==-1?0<m?(L=V[0].g,q.push("ofs="+L)):L=0:q.push("ofs="+L);let Se=!0;for(let yt=0;yt<m;yt++){let _e=V[yt].g;const St=V[yt].map;if(_e-=L,0>_e)L=Math.max(0,V[yt].g-100),Se=!1;else try{hb(St,q,"req"+_e+"_")}catch{v&&v(St)}}if(Se){v=q.join("&");break e}}}return u=u.i.splice(0,m),f.D=u,v}function Aw(u){if(!u.g&&!u.u){u.Y=1;var f=u.Fa;pe||ie(),G||(pe(),G=!0),te.add(f,u),u.v=0}}function op(u){return u.g||u.u||3<=u.v?!1:(u.Y++,u.u=Oa(p(u.Fa,u),Rw(u,u.v)),u.v++,!0)}n.Fa=function(){if(this.u=null,kw(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var u=2*this.R;this.j.info("BP detection timer enabled: "+u),this.A=Oa(p(this.ab,this),u)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Mt(10),mc(this),kw(this))};function ap(u){u.A!=null&&(a.clearTimeout(u.A),u.A=null)}function kw(u){u.g=new jr(u,u.j,"rpc",u.Y),u.m===null&&(u.g.H=u.o),u.g.O=0;var f=ar(u.qa);Re(f,"RID","rpc"),Re(f,"SID",u.K),Re(f,"AID",u.T),Re(f,"CI",u.F?"0":"1"),!u.F&&u.ja&&Re(f,"TO",u.ja),Re(f,"TYPE","xmlhttp"),qa(u,f),u.m&&u.o&&ip(f,u.m,u.o),u.L&&(u.g.I=u.L);var m=u.g;u=u.ia,m.L=1,m.v=hc(ar(f)),m.m=null,m.P=!0,Zv(m,u)}n.Za=function(){this.C!=null&&(this.C=null,mc(this),op(this),Mt(19))};function _c(u){u.C!=null&&(a.clearTimeout(u.C),u.C=null)}function Cw(u,f){var m=null;if(u.g==f){_c(u),ap(u),u.g=null;var v=2}else if(np(u.h,f))m=f.D,sw(u.h,f),v=1;else return;if(u.G!=0){if(f.o)if(v==1){m=f.m?f.m.length:0,f=Date.now()-f.F;var V=u.B;v=sc(),Lt(v,new Qv(v,m)),gc(u)}else Aw(u);else if(V=f.s,V==3||V==0&&0<f.X||!(v==1&&mb(u,f)||v==2&&op(u)))switch(m&&0<m.length&&(f=u.h,f.i=f.i.concat(m)),V){case 1:Xi(u,5);break;case 4:Xi(u,10);break;case 3:Xi(u,6);break;default:Xi(u,2)}}}function Rw(u,f){let m=u.Ta+Math.floor(Math.random()*u.cb);return u.isActive()||(m*=2),m*f}function Xi(u,f){if(u.j.info("Error code "+f),f==2){var m=p(u.fb,u),v=u.Xa;const V=!v;v=new Ji(v||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||uc(v,"https"),hc(v),V?lb(v.toString(),m):ub(v.toString(),m)}else Mt(2);u.G=0,u.l&&u.l.sa(f),Pw(u),Iw(u)}n.fb=function(u){u?(this.j.info("Successfully pinged google.com"),Mt(2)):(this.j.info("Failed to ping google.com"),Mt(1))};function Pw(u){if(u.G=0,u.ka=[],u.l){const f=ow(u.h);(f.length!=0||u.i.length!=0)&&(P(u.ka,f),P(u.ka,u.i),u.h.i.length=0,C(u.i),u.i.length=0),u.l.ra()}}function xw(u,f,m){var v=m instanceof Ji?ar(m):new Ji(m);if(v.g!="")f&&(v.g=f+"."+v.g),cc(v,v.s);else{var V=a.location;v=V.protocol,f=f?f+"."+V.hostname:V.hostname,V=+V.port;var L=new Ji(null);v&&uc(L,v),f&&(L.g=f),V&&cc(L,V),m&&(L.l=m),v=L}return m=u.D,f=u.ya,m&&f&&Re(v,m,f),Re(v,"VER",u.la),qa(u,v),v}function bw(u,f,m){if(f&&!u.J)throw Error("Can't create secondary domain capable XhrIo object.");return f=u.Ca&&!u.pa?new We(new dc({eb:m})):new We(u.pa),f.Ha(u.J),f}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Nw(){}n=Nw.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function yc(){}yc.prototype.g=function(u,f){return new en(u,f)};function en(u,f){Tt.call(this),this.g=new Ew(f),this.l=u,this.h=f&&f.messageUrlParams||null,u=f&&f.messageHeaders||null,f&&f.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=f&&f.initMessageHeaders||null,f&&f.messageContentType&&(u?u["X-WebChannel-Content-Type"]=f.messageContentType:u={"X-WebChannel-Content-Type":f.messageContentType}),f&&f.va&&(u?u["X-WebChannel-Client-Profile"]=f.va:u={"X-WebChannel-Client-Profile":f.va}),this.g.S=u,(u=f&&f.Sb)&&!I(u)&&(this.g.m=u),this.v=f&&f.supportsCrossDomainXhr||!1,this.u=f&&f.sendRawJson||!1,(f=f&&f.httpSessionIdParam)&&!I(f)&&(this.g.D=f,u=this.h,u!==null&&f in u&&(u=this.h,f in u&&delete u[f])),this.j=new Zs(this)}T(en,Tt),en.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},en.prototype.close=function(){sp(this.g)},en.prototype.o=function(u){var f=this.g;if(typeof u=="string"){var m={};m.__data__=u,u=m}else this.u&&(m={},m.__data__=Wf(u),u=m);f.i.push(new Xx(f.Ya++,u)),f.G==3&&gc(f)},en.prototype.N=function(){this.g.l=null,delete this.j,sp(this.g),delete this.g,en.aa.N.call(this)};function Dw(u){Qf.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var f=u.__sm__;if(f){e:{for(const m in f){u=m;break e}u=void 0}(this.i=u)&&(u=this.i,f=f!==null&&u in f?f[u]:void 0),this.data=f}else this.data=u}T(Dw,Qf);function Vw(){Yf.call(this),this.status=1}T(Vw,Yf);function Zs(u){this.g=u}T(Zs,Nw),Zs.prototype.ua=function(){Lt(this.g,"a")},Zs.prototype.ta=function(u){Lt(this.g,new Dw(u))},Zs.prototype.sa=function(u){Lt(this.g,new Vw)},Zs.prototype.ra=function(){Lt(this.g,"b")},yc.prototype.createWebChannel=yc.prototype.g,en.prototype.send=en.prototype.o,en.prototype.open=en.prototype.m,en.prototype.close=en.prototype.close,Lk=function(){return new yc},Ok=function(){return sc()},Vk=Qi,sg={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},oc.NO_ERROR=0,oc.TIMEOUT=8,oc.HTTP_ERROR=6,ch=oc,Yv.COMPLETE="complete",Dk=Yv,Gv.EventType=Da,Da.OPEN="a",Da.CLOSE="b",Da.ERROR="c",Da.MESSAGE="d",Tt.prototype.listen=Tt.prototype.K,ml=Gv,We.prototype.listenOnce=We.prototype.L,We.prototype.getLastError=We.prototype.Ka,We.prototype.getLastErrorCode=We.prototype.Ba,We.prototype.getStatus=We.prototype.Z,We.prototype.getResponseJson=We.prototype.Oa,We.prototype.getResponseText=We.prototype.oa,We.prototype.send=We.prototype.ea,We.prototype.setWithCredentials=We.prototype.Ha,Nk=We}).apply(typeof Fc<"u"?Fc:typeof self<"u"?self:typeof window<"u"?window:{});const EI="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dt=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};dt.UNAUTHENTICATED=new dt(null),dt.GOOGLE_CREDENTIALS=new dt("google-credentials-uid"),dt.FIRST_PARTY=new dt("first-party-uid"),dt.MOCK_USER=new dt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _a="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Si=new Zd("@firebase/firestore");function ao(){return Si.logLevel}function jL(n){Si.setLogLevel(n)}function U(n,...e){if(Si.logLevel<=ae.DEBUG){const t=e.map(Y_);Si.debug(`Firestore (${_a}): ${n}`,...t)}}function Ze(n,...e){if(Si.logLevel<=ae.ERROR){const t=e.map(Y_);Si.error(`Firestore (${_a}): ${n}`,...t)}}function on(n,...e){if(Si.logLevel<=ae.WARN){const t=e.map(Y_);Si.warn(`Firestore (${_a}): ${n}`,...t)}}function Y_(n){if(typeof n=="string")return n;try{/**
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
 */function H(n="Unexpected state"){const e=`FIRESTORE (${_a}) INTERNAL ASSERTION FAILED: `+n;throw Ze(e),new Error(e)}function Y(n,e){n||H()}function UL(n,e){n||H()}function $(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends Zn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Fk{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(dt.UNAUTHENTICATED))}shutdown(){}}class BL{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class zL{constructor(e){this.t=e,this.currentUser=dt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let r=this.i;const i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let s=new gt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new gt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},a=l=>{U("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(U("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new gt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(U("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new Mk(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new dt(e)}}class $L{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=dt.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class qL{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new $L(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(dt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class jk{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class GL{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Y(this.o===void 0);const r=s=>{s.error!=null&&U("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,U("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{U("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):U("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new jk(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class KL{getToken(){return Promise.resolve(new jk(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
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
 */function WL(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=WL(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%e.length))}return r}}function ne(n,e){return n<e?-1:n>e?1:0}function Wo(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}function Uk(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new j(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return je.fromMillis(Date.now())}static fromDate(e){return je.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new je(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ne(this.nanoseconds,e.nanoseconds):ne(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(e){this.timestamp=e}static fromTimestamp(e){return new X(e)}static min(){return new X(new je(0,0))}static max(){return new X(new je(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e,t,r){t===void 0?t=0:t>e.length&&H(),r===void 0?r=e.length-t:r>e.length-t&&H(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return au.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof au?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class de extends au{construct(e,t,r){return new de(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new j(O.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new de(t)}static emptyPath(){return new de([])}}const HL=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class De extends au{construct(e,t,r){return new De(e,t,r)}static isValidIdentifier(e){return HL.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),De.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new De(["__name__"])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new j(O.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new j(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new j(O.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new De(t)}static emptyPath(){return new De([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(de.fromString(e))}static fromName(e){return new K(de.fromString(e).popFirst(5))}static empty(){return new K(de.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&de.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return de.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new de(e.slice()))}}/**
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
 */class Ho{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}}function og(n){return n.fields.find(e=>e.kind===2)}function is(n){return n.fields.filter(e=>e.kind!==2)}function QL(n,e){let t=ne(n.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let r=0;r<Math.min(n.fields.length,e.fields.length);++r)if(t=YL(n.fields[r],e.fields[r]),t!==0)return t;return ne(n.fields.length,e.fields.length)}Ho.UNKNOWN_ID=-1;class ws{constructor(e,t){this.fieldPath=e,this.kind=t}}function YL(n,e){const t=De.comparator(n.fieldPath,e.fieldPath);return t!==0?t:ne(n.kind,e.kind)}class Qo{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Qo(0,an.min())}}function Bk(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=X.fromTimestamp(r===1e9?new je(t+1,0):new je(t,r));return new an(i,K.empty(),e)}function zk(n){return new an(n.readTime,n.key,-1)}class an{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new an(X.min(),K.empty(),-1)}static max(){return new an(X.max(),K.empty(),-1)}}function X_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=K.comparator(n.documentKey,e.documentKey),t!==0?t:ne(n.largestBatchId,e.largestBatchId))}/**
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
 */const $k="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class qk{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bi(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==$k)throw n;U("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&H(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new N((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof N?t:N.resolve(t)}catch(t){return N.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):N.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):N.reject(t)}static resolve(e){return new N((t,r)=>{t(e)})}static reject(e){return new N((t,r)=>{r(e)})}static waitFor(e){return new N((t,r)=>{let i=0,s=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++s,o&&s===i&&t()},l=>r(l))}),o=!0,s===i&&t()})}static or(e){let t=N.resolve(!1);for(const r of e)t=t.next(i=>i?N.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new N((r,i)=>{const s=e.length,o=new Array(s);let a=0;for(let l=0;l<s;l++){const c=l;t(e[c]).next(h=>{o[c]=h,++a,a===s&&r(o)},h=>i(h))}})}static doWhile(e,t){return new N((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new gt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Pl(e,t.error)):this.V.resolve()},this.transaction.onerror=r=>{const i=Z_(r.target.error);this.V.reject(new Pl(e,i))}}static open(e,t,r,i){try{return new of(t,e.transaction(i,r))}catch(s){throw new Pl(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(U("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new XL(t)}}class Kn{constructor(e,t,r){this.name=e,this.version=t,this.p=r,Kn.S(at())===12.2&&Ze("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return U("SimpleDb","Removing database:",e),os(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!GA())return!1;if(Kn.v())return!0;const e=at(),t=Kn.S(e),r=0<t&&t<10,i=Gk(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}async M(e){return this.db||(U("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,r)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const o=s.target.result;t(o)},i.onblocked=()=>{r(new Pl(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const o=s.target.error;o.name==="VersionError"?r(new j(O.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new j(O.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Pl(e,o))},i.onupgradeneeded=s=>{U("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{U("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,i){const s=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const a=of.open(this.db,e,s?"readonly":"readwrite",r),l=i(a).next(c=>(a.g(),c)).catch(c=>(a.abort(c),N.reject(c))).toPromise();return l.catch(()=>{}),await a.m,l}catch(a){const l=a,c=l.name!=="FirebaseError"&&o<3;if(U("SimpleDb","Transaction failed with error:",l.message,"Retrying:",c),this.close(),!c)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Gk(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class JL{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return os(this.B.delete())}}class Pl extends j{constructor(e,t){super(O.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function zi(n){return n.name==="IndexedDbTransactionError"}class XL{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(U("SimpleDb","PUT",this.store.name,e,t),r=this.store.put(t,e)):(U("SimpleDb","PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),os(r)}add(e){return U("SimpleDb","ADD",this.store.name,e,e),os(this.store.add(e))}get(e){return os(this.store.get(e)).next(t=>(t===void 0&&(t=null),U("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return U("SimpleDb","DELETE",this.store.name,e),os(this.store.delete(e))}count(){return U("SimpleDb","COUNT",this.store.name),os(this.store.count())}U(e,t){const r=this.options(e,t),i=r.index?this.store.index(r.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(r.range);return new N((o,a)=>{s.onerror=l=>{a(l.target.error)},s.onsuccess=l=>{o(l.target.result)}})}{const s=this.cursor(r),o=[];return this.W(s,(a,l)=>{o.push(l)}).next(()=>o)}}G(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new N((i,s)=>{r.onerror=o=>{s(o.target.error)},r.onsuccess=o=>{i(o.target.result)}})}j(e,t){U("SimpleDb","DELETE ALL",this.store.name);const r=this.options(e,t);r.H=!1;const i=this.cursor(r);return this.W(i,(s,o,a)=>a.delete())}J(e,t){let r;t?r=e:(r={},t=e);const i=this.cursor(r);return this.W(i,t)}Y(e){const t=this.cursor({});return new N((r,i)=>{t.onerror=s=>{const o=Z_(s.target.error);i(o)},t.onsuccess=s=>{const o=s.target.result;o?e(o.primaryKey,o.value).next(a=>{a?o.continue():r()}):r()}})}W(e,t){const r=[];return new N((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{const a=o.target.result;if(!a)return void i();const l=new JL(a),c=t(a.primaryKey,a.value,l);if(c instanceof N){const h=c.catch(d=>(l.done(),N.reject(d)));r.push(h)}l.isDone?i():l.K===null?a.continue():a.continue(l.K)}}).next(()=>N.waitFor(r))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.H?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function os(n){return new N((e,t)=>{n.onsuccess=r=>{const i=r.target.result;e(i)},n.onerror=r=>{const i=Z_(r.target.error);t(i)}})}let II=!1;function Z_(n){const e=Kn.S(at());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new j("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return II||(II=!0,setTimeout(()=>{throw r},0)),r}}return n}class ZL{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){U("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{U("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){zi(t)?U("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Bi(t)}await this.X(6e4)})}}class eM{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const r=new Set;let i=t,s=!0;return N.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!r.has(o))return U("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(a=>{i-=a,r.add(o)});s=!1})).next(()=>t-i)}ne(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,r).next(s=>{const o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(a=>(U("IndexBackfiller",`Updating offset: ${a}`),this.localStore.indexManager.updateCollectionGroup(e,t,a))).next(()=>o.size)}))}re(e,t){let r=e;return t.changes.forEach((i,s)=>{const o=zk(s);X_(o,r)>0&&(r=o)}),new an(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Gt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Gt.oe=-1;function Du(n){return n==null}function lu(n){return n===0&&1/n==-1/0}function Kk(n){return typeof n=="number"&&Number.isInteger(n)&&!lu(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=TI(e)),e=tM(n.get(t),e);return TI(e)}function tM(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function TI(n){return n+""}function Bn(n){const e=n.length;if(Y(e>=2),e===2)return Y(n.charAt(0)===""&&n.charAt(1)===""),de.emptyPath();const t=e-2,r=[];let i="";for(let s=0;s<e;){const o=n.indexOf("",s);switch((o<0||o>t)&&H(),n.charAt(o+1)){case"":const a=n.substring(s,o);let l;i.length===0?l=a:(i+=a,l=i,i=""),r.push(l);break;case"":i+=n.substring(s,o),i+="\0";break;case"":i+=n.substring(s,o+1);break;default:H()}s=o+2}return new de(r)}/**
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
 */const SI=["userId","batchId"];/**
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
 */function hh(n,e){return[n,Nt(e)]}function Wk(n,e,t){return[n,Nt(e),t]}const nM={},rM=["prefixPath","collectionGroup","readTime","documentId"],iM=["prefixPath","collectionGroup","documentId"],sM=["collectionGroup","readTime","prefixPath","documentId"],oM=["canonicalId","targetId"],aM=["targetId","path"],lM=["path","targetId"],uM=["collectionId","parent"],cM=["indexId","uid"],hM=["uid","sequenceNumber"],dM=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],fM=["indexId","uid","orderedDocumentKey"],pM=["userId","collectionPath","documentId"],mM=["userId","collectionPath","largestBatchId"],gM=["userId","collectionGroup","largestBatchId"],Hk=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],_M=[...Hk,"documentOverlays"],Qk=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Yk=Qk,ey=[...Yk,"indexConfiguration","indexState","indexEntries"],yM=ey,vM=[...ey,"globals"];/**
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
 */class ag extends qk{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function lt(n,e){const t=$(n);return Kn.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AI(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function $i(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Jk(n,e){const t=[];for(const r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.push(e(n[r],r,n));return t}function Xk(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ge=class lg{constructor(e,t){this.comparator=e,this.root=t||_i.EMPTY}insert(e,t){return new lg(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_i.BLACK,null,null))}remove(e){return new lg(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_i.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new jc(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new jc(this.root,e,this.comparator,!1)}getReverseIterator(){return new jc(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new jc(this.root,e,this.comparator,!0)}},jc=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},_i=class cr{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??cr.RED,this.left=i??cr.EMPTY,this.right=s??cr.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new cr(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return cr.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return cr.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,cr.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,cr.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw H();const e=this.left.check();if(e!==this.right.check())throw H();return e+(this.isRed()?0:1)}};_i.EMPTY=null,_i.RED=!0,_i.BLACK=!1;_i.EMPTY=new class{constructor(){this.size=0}get key(){throw H()}get value(){throw H()}get color(){throw H()}get left(){throw H()}get right(){throw H()}copy(e,t,r,i,s){return this}insert(e,t,r){return new _i(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.comparator=e,this.data=new Ge(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new kI(this.data.getIterator())}getIteratorFrom(e){return new kI(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof Ee)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new Ee(this.comparator);return t.data=e,t}}class kI{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function no(n){return n.hasNext()?n.getNext():void 0}/**
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
 */class Kt{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new Kt([])}unionWith(e){let t=new Ee(De.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Kt(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wo(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class Zk extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */function wM(){return typeof atob<"u"}/**
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
 */class Ke{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Zk("Invalid base64 string: "+s):s}}(e);return new Ke(t)}static fromUint8Array(e){const t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ke(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ne(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ke.EMPTY_BYTE_STRING=new Ke("");const EM=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xr(n){if(Y(!!n),typeof n=="string"){let e=0;const t=EM.exec(n);if(Y(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Oe(n.seconds),nanos:Oe(n.nanos)}}function Oe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function br(n){return typeof n=="string"?Ke.fromBase64String(n):Ke.fromUint8Array(n)}/**
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
 */function af(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function lf(n){const e=n.mapValue.fields.__previous_value__;return af(e)?lf(e):e}function uu(n){const e=xr(n.mapValue.fields.__local_write_time__.timestampValue);return new je(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IM{constructor(e,t,r,i,s,o,a,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class Ai{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Ai("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ai&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ii={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},dh={nullValue:"NULL_VALUE"};function ki(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?af(n)?4:eC(n)?9007199254740991:uf(n)?10:11:H()}function Qn(n,e){if(n===e)return!0;const t=ki(n);if(t!==ki(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return uu(n).isEqual(uu(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=xr(i.timestampValue),a=xr(s.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return br(i.bytesValue).isEqual(br(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Oe(i.geoPointValue.latitude)===Oe(s.geoPointValue.latitude)&&Oe(i.geoPointValue.longitude)===Oe(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Oe(i.integerValue)===Oe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Oe(i.doubleValue),a=Oe(s.doubleValue);return o===a?lu(o)===lu(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return Wo(n.arrayValue.values||[],e.arrayValue.values||[],Qn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},a=s.mapValue.fields||{};if(AI(o)!==AI(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!Qn(o[l],a[l])))return!1;return!0}(n,e);default:return H()}}function cu(n,e){return(n.values||[]).find(t=>Qn(t,e))!==void 0}function Ci(n,e){if(n===e)return 0;const t=ki(n),r=ki(e);if(t!==r)return ne(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ne(n.booleanValue,e.booleanValue);case 2:return function(s,o){const a=Oe(s.integerValue||s.doubleValue),l=Oe(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1}(n,e);case 3:return CI(n.timestampValue,e.timestampValue);case 4:return CI(uu(n),uu(e));case 5:return ne(n.stringValue,e.stringValue);case 6:return function(s,o){const a=br(s),l=br(o);return a.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){const a=s.split("/"),l=o.split("/");for(let c=0;c<a.length&&c<l.length;c++){const h=ne(a[c],l[c]);if(h!==0)return h}return ne(a.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){const a=ne(Oe(s.latitude),Oe(o.latitude));return a!==0?a:ne(Oe(s.longitude),Oe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return RI(n.arrayValue,e.arrayValue);case 10:return function(s,o){var a,l,c,h;const d=s.fields||{},p=o.fields||{},_=(a=d.value)===null||a===void 0?void 0:a.arrayValue,T=(l=p.value)===null||l===void 0?void 0:l.arrayValue,C=ne(((c=_==null?void 0:_.values)===null||c===void 0?void 0:c.length)||0,((h=T==null?void 0:T.values)===null||h===void 0?void 0:h.length)||0);return C!==0?C:RI(_,T)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===ii.mapValue&&o===ii.mapValue)return 0;if(s===ii.mapValue)return 1;if(o===ii.mapValue)return-1;const a=s.fields||{},l=Object.keys(a),c=o.fields||{},h=Object.keys(c);l.sort(),h.sort();for(let d=0;d<l.length&&d<h.length;++d){const p=ne(l[d],h[d]);if(p!==0)return p;const _=Ci(a[l[d]],c[h[d]]);if(_!==0)return _}return ne(l.length,h.length)}(n.mapValue,e.mapValue);default:throw H()}}function CI(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ne(n,e);const t=xr(n),r=xr(e),i=ne(t.seconds,r.seconds);return i!==0?i:ne(t.nanos,r.nanos)}function RI(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=Ci(t[i],r[i]);if(s)return s}return ne(t.length,r.length)}function Yo(n){return ug(n)}function ug(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=xr(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return br(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return K.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=ug(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${ug(t.fields[o])}`;return i+"}"}(n.mapValue):H()}function fh(n){switch(ki(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=lf(n);return e?16+fh(e):16;case 5:return 2*n.stringValue.length;case 6:return br(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+fh(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return $i(r.fields,(s,o)=>{i+=s.length+fh(o)}),i}(n.mapValue);default:throw H()}}function Rs(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function cg(n){return!!n&&"integerValue"in n}function hu(n){return!!n&&"arrayValue"in n}function PI(n){return!!n&&"nullValue"in n}function xI(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ph(n){return!!n&&"mapValue"in n}function uf(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function xl(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return $i(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=xl(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=xl(n.arrayValue.values[t]);return e}return Object.assign({},n)}function eC(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const tC={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function TM(n){return"nullValue"in n?dh:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Rs(Ai.empty(),K.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?uf(n)?tC:{mapValue:{}}:H()}function SM(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Rs(Ai.empty(),K.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?tC:"mapValue"in n?uf(n)?{mapValue:{}}:ii:H()}function bI(n,e){const t=Ci(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function NI(n,e){const t=Ci(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.value=e}static empty(){return new wt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ph(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=xl(t)}setAll(e){let t=De.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=xl(o):i.push(a.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());ph(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ph(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){$i(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new wt(xl(this.value))}}function nC(n){const e=[];return $i(n.fields,(t,r)=>{const i=new De([t]);if(ph(r)){const s=nC(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Kt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Ne(e,0,X.min(),X.min(),X.min(),wt.empty(),0)}static newFoundDocument(e,t,r,i){return new Ne(e,1,t,X.min(),r,i,0)}static newNoDocument(e,t){return new Ne(e,2,t,X.min(),X.min(),wt.empty(),0)}static newUnknownDocument(e,t){return new Ne(e,3,t,X.min(),X.min(),wt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(X.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=wt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=wt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=X.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ne&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ne(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Ri{constructor(e,t){this.position=e,this.inclusive=t}}function DI(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],o=n.position[i];if(s.field.isKeyField()?r=K.comparator(K.fromName(o.referenceValue),t.key):r=Ci(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function VI(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Qn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class du{constructor(e,t="asc"){this.field=e,this.dir=t}}function AM(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class rC{}class fe extends rC{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new kM(e,t,r):t==="array-contains"?new PM(e,r):t==="in"?new uC(e,r):t==="not-in"?new xM(e,r):t==="array-contains-any"?new bM(e,r):new fe(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new CM(e,r):new RM(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Ci(t,this.value)):t!==null&&ki(this.value)===ki(t)&&this.matchesComparison(Ci(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return H()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ve extends rC{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ve(e,t)}matches(e){return Jo(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Jo(n){return n.op==="and"}function hg(n){return n.op==="or"}function ty(n){return iC(n)&&Jo(n)}function iC(n){for(const e of n.filters)if(e instanceof ve)return!1;return!0}function dg(n){if(n instanceof fe)return n.field.canonicalString()+n.op.toString()+Yo(n.value);if(ty(n))return n.filters.map(e=>dg(e)).join(",");{const e=n.filters.map(t=>dg(t)).join(",");return`${n.op}(${e})`}}function sC(n,e){return n instanceof fe?function(r,i){return i instanceof fe&&r.op===i.op&&r.field.isEqual(i.field)&&Qn(r.value,i.value)}(n,e):n instanceof ve?function(r,i){return i instanceof ve&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,a)=>s&&sC(o,i.filters[a]),!0):!1}(n,e):void H()}function oC(n,e){const t=n.filters.concat(e);return ve.create(t,n.op)}function aC(n){return n instanceof fe?function(t){return`${t.field.canonicalString()} ${t.op} ${Yo(t.value)}`}(n):n instanceof ve?function(t){return t.op.toString()+" {"+t.getFilters().map(aC).join(" ,")+"}"}(n):"Filter"}class kM extends fe{constructor(e,t,r){super(e,t,r),this.key=K.fromName(r.referenceValue)}matches(e){const t=K.comparator(e.key,this.key);return this.matchesComparison(t)}}class CM extends fe{constructor(e,t){super(e,"in",t),this.keys=lC("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class RM extends fe{constructor(e,t){super(e,"not-in",t),this.keys=lC("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function lC(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>K.fromName(r.referenceValue))}class PM extends fe{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return hu(t)&&cu(t.arrayValue,this.value)}}class uC extends fe{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&cu(this.value.arrayValue,t)}}class xM extends fe{constructor(e,t){super(e,"not-in",t)}matches(e){if(cu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!cu(this.value.arrayValue,t)}}class bM extends fe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!hu(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>cu(this.value.arrayValue,r))}}/**
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
 */class NM{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.ue=null}}function fg(n,e=null,t=[],r=[],i=null,s=null,o=null){return new NM(n,e,t,r,i,s,o)}function Ps(n){const e=$(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>dg(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Du(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Yo(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Yo(r)).join(",")),e.ue=t}return e.ue}function Vu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!AM(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!sC(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!VI(n.startAt,e.startAt)&&VI(n.endAt,e.endAt)}function Zh(n){return K.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function ed(n,e){return n.filters.filter(t=>t instanceof fe&&t.field.isEqual(e))}function OI(n,e,t){let r=dh,i=!0;for(const s of ed(n,e)){let o=dh,a=!0;switch(s.op){case"<":case"<=":o=TM(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,a=!1;break;case"!=":case"not-in":o=dh}bI({value:r,inclusive:i},{value:o,inclusive:a})<0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];bI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}function LI(n,e,t){let r=ii,i=!0;for(const s of ed(n,e)){let o=ii,a=!0;switch(s.op){case">=":case">":o=SM(s.value),a=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,a=!1;break;case"!=":case"not-in":o=ii}NI({value:r,inclusive:i},{value:o,inclusive:a})>0&&(r=o,i=a)}if(t!==null){for(let s=0;s<n.orderBy.length;++s)if(n.orderBy[s].field.isEqual(e)){const o=t.position[s];NI({value:r,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(r=o,i=t.inclusive);break}}return{value:r,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=l,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function cC(n,e,t,r,i,s,o,a){return new Or(n,e,t,r,i,s,o,a)}function ya(n){return new Or(n)}function MI(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function ny(n){return n.collectionGroup!==null}function Vo(n){const e=$(n);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Ee(De.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new du(s,r))}),t.has(De.keyField().canonicalString())||e.ce.push(new du(De.keyField(),r))}return e.ce}function Dt(n){const e=$(n);return e.le||(e.le=dC(e,Vo(n))),e.le}function hC(n){const e=$(n);return e.he||(e.he=dC(e,n.explicitOrderBy)),e.he}function dC(n,e){if(n.limitType==="F")return fg(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new du(i.field,s)});const t=n.endAt?new Ri(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ri(n.startAt.position,n.startAt.inclusive):null;return fg(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function pg(n,e){const t=n.filters.concat([e]);return new Or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function td(n,e,t){return new Or(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Ou(n,e){return Vu(Dt(n),Dt(e))&&n.limitType===e.limitType}function fC(n){return`${Ps(Dt(n))}|lt:${n.limitType}`}function lo(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>aC(i)).join(", ")}]`),Du(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Yo(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Yo(i)).join(",")),`Target(${r})`}(Dt(n))}; limitType=${n.limitType})`}function Lu(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):K.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of Vo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,a,l){const c=DI(o,a,l);return o.inclusive?c<=0:c<0}(r.startAt,Vo(r),i)||r.endAt&&!function(o,a,l){const c=DI(o,a,l);return o.inclusive?c>=0:c>0}(r.endAt,Vo(r),i))}(n,e)}function pC(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function mC(n){return(e,t)=>{let r=!1;for(const i of Vo(n)){const s=DM(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function DM(n,e,t){const r=n.field.isKeyField()?K.comparator(e.key,t.key):function(s,o,a){const l=o.data.field(s),c=a.data.field(s);return l!==null&&c!==null?Ci(l,c):H()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return H()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){$i(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return Xk(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VM=new Ge(K.comparator);function Wt(){return VM}const gC=new Ge(K.comparator);function gl(...n){let e=gC;for(const t of n)e=e.insert(t.key,t);return e}function _C(n){let e=gC;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function zn(){return bl()}function yC(){return bl()}function bl(){return new Lr(n=>n.toString(),(n,e)=>n.isEqual(e))}const OM=new Ge(K.comparator),LM=new Ee(K.comparator);function re(...n){let e=LM;for(const t of n)e=e.add(t);return e}const MM=new Ee(ne);function ry(){return MM}/**
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
 */function iy(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:lu(e)?"-0":e}}function vC(n){return{integerValue:""+n}}function wC(n,e){return Kk(e)?vC(e):iy(n,e)}/**
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
 */class cf{constructor(){this._=void 0}}function FM(n,e,t){return n instanceof Xo?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&af(s)&&(s=lf(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):n instanceof xs?IC(n,e):n instanceof bs?TC(n,e):function(i,s){const o=EC(i,s),a=FI(o)+FI(i.Pe);return cg(o)&&cg(i.Pe)?vC(a):iy(i.serializer,a)}(n,e)}function jM(n,e,t){return n instanceof xs?IC(n,e):n instanceof bs?TC(n,e):t}function EC(n,e){return n instanceof Zo?function(r){return cg(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Xo extends cf{}class xs extends cf{constructor(e){super(),this.elements=e}}function IC(n,e){const t=SC(e);for(const r of n.elements)t.some(i=>Qn(i,r))||t.push(r);return{arrayValue:{values:t}}}class bs extends cf{constructor(e){super(),this.elements=e}}function TC(n,e){let t=SC(e);for(const r of n.elements)t=t.filter(i=>!Qn(i,r));return{arrayValue:{values:t}}}class Zo extends cf{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function FI(n){return Oe(n.integerValue||n.doubleValue)}function SC(n){return hu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t){this.field=e,this.transform=t}}function UM(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof xs&&i instanceof xs||r instanceof bs&&i instanceof bs?Wo(r.elements,i.elements,Qn):r instanceof Zo&&i instanceof Zo?Qn(r.Pe,i.Pe):r instanceof Xo&&i instanceof Xo}(n.transform,e.transform)}class BM{constructor(e,t){this.version=e,this.transformResults=t}}class Fe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Fe}static exists(e){return new Fe(void 0,e)}static updateTime(e){return new Fe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function mh(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class hf{}function AC(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new wa(n.key,Fe.none()):new va(n.key,n.data,Fe.none());{const t=n.data,r=wt.empty();let i=new Ee(De.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Mr(n.key,r,new Kt(i.toArray()),Fe.none())}}function zM(n,e,t){n instanceof va?function(i,s,o){const a=i.value.clone(),l=UI(i.fieldTransforms,s,o.transformResults);a.setAll(l),s.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof Mr?function(i,s,o){if(!mh(i.precondition,s))return void s.convertToUnknownDocument(o.version);const a=UI(i.fieldTransforms,s,o.transformResults),l=s.data;l.setAll(kC(i)),l.setAll(a),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Nl(n,e,t,r){return n instanceof va?function(s,o,a,l){if(!mh(s.precondition,o))return a;const c=s.value.clone(),h=BI(s.fieldTransforms,l,o);return c.setAll(h),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(n,e,t,r):n instanceof Mr?function(s,o,a,l){if(!mh(s.precondition,o))return a;const c=BI(s.fieldTransforms,l,o),h=o.data;return h.setAll(kC(s)),h.setAll(c),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(d=>d.field))}(n,e,t,r):function(s,o,a){return mh(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function $M(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=EC(r.transform,i||null);s!=null&&(t===null&&(t=wt.empty()),t.set(r.field,s))}return t||null}function jI(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Wo(r,i,(s,o)=>UM(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class va extends hf{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Mr extends hf{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function kC(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function UI(n,e,t){const r=new Map;Y(n.length===t.length);for(let i=0;i<t.length;i++){const s=n[i],o=s.transform,a=e.data.field(s.field);r.set(s.field,jM(o,a,t[i]))}return r}function BI(n,e,t){const r=new Map;for(const i of n){const s=i.transform,o=t.data.field(i.field);r.set(i.field,FM(s,o,e))}return r}class wa extends hf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class sy extends hf{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&zM(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Nl(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Nl(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=yC();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let a=this.applyToLocalView(o,s.mutatedFields);a=t.has(i.key)?null:a;const l=AC(o,a);l!==null&&r.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(X.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),re())}isEqual(e){return this.batchId===e.batchId&&Wo(this.mutations,e.mutations,(t,r)=>jI(t,r))&&Wo(this.baseMutations,e.baseMutations,(t,r)=>jI(t,r))}}class ay{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Y(e.mutations.length===r.length);let i=function(){return OM}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new ay(e,t,r,i)}}/**
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
 */class ly{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class CC{constructor(e,t,r){this.alias=e,this.aggregateType=t,this.fieldPath=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qM{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt,me;function RC(n){switch(n){default:return H();case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0}}function PC(n){if(n===void 0)return Ze("GRPC error has no .code"),O.UNKNOWN;switch(n){case tt.OK:return O.OK;case tt.CANCELLED:return O.CANCELLED;case tt.UNKNOWN:return O.UNKNOWN;case tt.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case tt.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case tt.INTERNAL:return O.INTERNAL;case tt.UNAVAILABLE:return O.UNAVAILABLE;case tt.UNAUTHENTICATED:return O.UNAUTHENTICATED;case tt.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case tt.NOT_FOUND:return O.NOT_FOUND;case tt.ALREADY_EXISTS:return O.ALREADY_EXISTS;case tt.PERMISSION_DENIED:return O.PERMISSION_DENIED;case tt.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case tt.ABORTED:return O.ABORTED;case tt.OUT_OF_RANGE:return O.OUT_OF_RANGE;case tt.UNIMPLEMENTED:return O.UNIMPLEMENTED;case tt.DATA_LOSS:return O.DATA_LOSS;default:return H()}}(me=tt||(tt={}))[me.OK=0]="OK",me[me.CANCELLED=1]="CANCELLED",me[me.UNKNOWN=2]="UNKNOWN",me[me.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",me[me.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",me[me.NOT_FOUND=5]="NOT_FOUND",me[me.ALREADY_EXISTS=6]="ALREADY_EXISTS",me[me.PERMISSION_DENIED=7]="PERMISSION_DENIED",me[me.UNAUTHENTICATED=16]="UNAUTHENTICATED",me[me.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",me[me.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",me[me.ABORTED=10]="ABORTED",me[me.OUT_OF_RANGE=11]="OUT_OF_RANGE",me[me.UNIMPLEMENTED=12]="UNIMPLEMENTED",me[me.INTERNAL=13]="INTERNAL",me[me.UNAVAILABLE=14]="UNAVAILABLE",me[me.DATA_LOSS=15]="DATA_LOSS";/**
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
 */let nd=null;/**
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
 */function xC(){return new TextEncoder}/**
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
 */const GM=new vs([4294967295,4294967295],0);function zI(n){const e=xC().encode(n),t=new bk;return t.update(e),new Uint8Array(t.digest())}function $I(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new vs([t,r],0),new vs([i,s],0)]}class uy{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new _l(`Invalid padding: ${t}`);if(r<0)throw new _l(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new _l(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new _l(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=vs.fromNumber(this.Ie)}Ee(e,t,r){let i=e.add(t.multiply(vs.fromNumber(r)));return i.compare(GM)===1&&(i=new vs([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=zI(e),[r,i]=$I(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);if(!this.de(o))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new uy(s,i,t);return r.forEach(a=>o.insert(a)),o}insert(e){if(this.Ie===0)return;const t=zI(e),[r,i]=$I(t);for(let s=0;s<this.hashCount;s++){const o=this.Ee(r,i,s);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class _l extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,ju.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Fu(X.min(),i,new Ge(ne),Wt(),re())}}class ju{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ju(r,t,re(),re(),re())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e,t,r,i){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=i}}class bC{constructor(e,t){this.targetId=e,this.me=t}}class NC{constructor(e,t,r=Ke.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class qI{constructor(){this.fe=0,this.ge=KI(),this.pe=Ke.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=re(),t=re(),r=re();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:H()}}),new ju(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=KI()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Y(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class KM{constructor(e){this.Le=e,this.Be=new Map,this.ke=Wt(),this.qe=GI(),this.Qe=new Ge(ne)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:H()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,i)=>{this.ze(i)&&t(i)})}He(e){const t=e.targetId,r=e.me.count,i=this.Je(t);if(i){const s=i.target;if(Zh(s))if(r===0){const o=new K(s.path);this.Ue(t,o,Ne.newNoDocument(o,X.min()))}else Y(r===1);else{const o=this.Ye(t);if(o!==r){const a=this.Ze(e),l=a?this.Xe(a,e,o):1;if(l!==0){this.je(t);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,c)}nd==null||nd.et(function(h,d,p,_,T){var C,P,y,I,S,D;const F={localCacheCount:h,existenceFilterCount:d.count,databaseId:p.database,projectId:p.projectId},M=d.unchangedNames;return M&&(F.bloomFilter={applied:T===0,hashCount:(C=M==null?void 0:M.hashCount)!==null&&C!==void 0?C:0,bitmapLength:(I=(y=(P=M==null?void 0:M.bits)===null||P===void 0?void 0:P.bitmap)===null||y===void 0?void 0:y.length)!==null&&I!==void 0?I:0,padding:(D=(S=M==null?void 0:M.bits)===null||S===void 0?void 0:S.padding)!==null&&D!==void 0?D:0,mightContain:k=>{var w;return(w=_==null?void 0:_.mightContain(k))!==null&&w!==void 0&&w}}),F}(o,e.me,this.Le.tt(),a,l))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let o,a;try{o=br(r).toUint8Array()}catch(l){if(l instanceof Zk)return on("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new uy(o,i,s)}catch(l){return on(l instanceof _l?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.Ie===0?null:a}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const o=this.Le.tt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(a)||(this.Ue(t,s,null),i++)}),i}rt(e){const t=new Map;this.Be.forEach((s,o)=>{const a=this.Je(o);if(a){if(s.current&&Zh(a.target)){const l=new K(a.target.path);this.ke.get(l)!==null||this.it(o,l)||this.Ue(o,l,Ne.newNoDocument(l,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let r=re();this.qe.forEach((s,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.Je(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));const i=new Fu(e,t,this.Qe,this.ke,r);return this.ke=Wt(),this.qe=GI(),this.Qe=new Ge(ne),i}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new qI,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new Ee(ne),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||U("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new qI),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function GI(){return new Ge(K.comparator)}function KI(){return new Ge(K.comparator)}const WM={asc:"ASCENDING",desc:"DESCENDING"},HM={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},QM={and:"AND",or:"OR"};class YM{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function mg(n,e){return n.useProto3Json||Du(e)?e:{value:e}}function ea(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function DC(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function JM(n,e){return ea(n,e.toTimestamp())}function et(n){return Y(!!n),X.fromTimestamp(function(t){const r=xr(t);return new je(r.seconds,r.nanos)}(n))}function cy(n,e){return gg(n,e).canonicalString()}function gg(n,e){const t=function(i){return new de(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function VC(n){const e=de.fromString(n);return Y(qC(e)),e}function fu(n,e){return cy(n.databaseId,e.path)}function Wn(n,e){const t=VC(e);if(t.get(1)!==n.databaseId.projectId)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new j(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new K(MC(t))}function OC(n,e){return cy(n.databaseId,e)}function LC(n){const e=VC(n);return e.length===4?de.emptyPath():MC(e)}function _g(n){return new de(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function MC(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function WI(n,e,t){return{name:fu(n,e),fields:t.value.mapValue.fields}}function FC(n,e,t){const r=Wn(n,e.name),i=et(e.updateTime),s=e.createTime?et(e.createTime):X.min(),o=new wt({mapValue:{fields:e.fields}}),a=Ne.newFoundDocument(r,i,s,o);return t&&a.setHasCommittedMutations(),t?a.setHasCommittedMutations():a}function XM(n,e){return"found"in e?function(r,i){Y(!!i.found),i.found.name,i.found.updateTime;const s=Wn(r,i.found.name),o=et(i.found.updateTime),a=i.found.createTime?et(i.found.createTime):X.min(),l=new wt({mapValue:{fields:i.found.fields}});return Ne.newFoundDocument(s,o,a,l)}(n,e):"missing"in e?function(r,i){Y(!!i.missing),Y(!!i.readTime);const s=Wn(r,i.missing),o=et(i.readTime);return Ne.newNoDocument(s,o)}(n,e):H()}function ZM(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:H()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,h){return c.useProto3Json?(Y(h===void 0||typeof h=="string"),Ke.fromBase64String(h||"")):(Y(h===void 0||h instanceof Buffer||h instanceof Uint8Array),Ke.fromUint8Array(h||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const h=c.code===void 0?O.UNKNOWN:PC(c.code);return new j(h,c.message||"")}(o);t=new NC(r,i,s,a||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Wn(n,r.document.name),s=et(r.document.updateTime),o=r.document.createTime?et(r.document.createTime):X.min(),a=new wt({mapValue:{fields:r.document.fields}}),l=Ne.newFoundDocument(i,s,o,a),c=r.targetIds||[],h=r.removedTargetIds||[];t=new gh(c,h,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Wn(n,r.document),s=r.readTime?et(r.readTime):X.min(),o=Ne.newNoDocument(i,s),a=r.removedTargetIds||[];t=new gh([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Wn(n,r.document),s=r.removedTargetIds||[];t=new gh([],s,i,null)}else{if(!("filter"in e))return H();{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new qM(i,s),a=r.targetId;t=new bC(a,o)}}return t}function pu(n,e){let t;if(e instanceof va)t={update:WI(n,e.key,e.value)};else if(e instanceof wa)t={delete:fu(n,e.key)};else if(e instanceof Mr)t={update:WI(n,e.key,e.data),updateMask:sF(e.fieldMask)};else{if(!(e instanceof sy))return H();t={verify:fu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const a=o.transform;if(a instanceof Xo)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof xs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof bs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Zo)return{fieldPath:o.field.canonicalString(),increment:a.Pe};throw H()}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:JM(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:H()}(n,e.precondition)),t}function yg(n,e){const t=e.currentDocument?function(s){return s.updateTime!==void 0?Fe.updateTime(et(s.updateTime)):s.exists!==void 0?Fe.exists(s.exists):Fe.none()}(e.currentDocument):Fe.none(),r=e.updateTransforms?e.updateTransforms.map(i=>function(o,a){let l=null;if("setToServerValue"in a)Y(a.setToServerValue==="REQUEST_TIME"),l=new Xo;else if("appendMissingElements"in a){const h=a.appendMissingElements.values||[];l=new xs(h)}else if("removeAllFromArray"in a){const h=a.removeAllFromArray.values||[];l=new bs(h)}else"increment"in a?l=new Zo(o,a.increment):H();const c=De.fromServerFormat(a.fieldPath);return new Mu(c,l)}(n,i)):[];if(e.update){e.update.name;const i=Wn(n,e.update.name),s=new wt({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(l){const c=l.fieldPaths||[];return new Kt(c.map(h=>De.fromServerFormat(h)))}(e.updateMask);return new Mr(i,s,o,t,r)}return new va(i,s,t,r)}if(e.delete){const i=Wn(n,e.delete);return new wa(i,t)}if(e.verify){const i=Wn(n,e.verify);return new sy(i,t)}return H()}function eF(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(i,s){let o=i.updateTime?et(i.updateTime):et(s);return o.isEqual(X.min())&&(o=et(s)),new BM(o,i.transformResults||[])}(t,e))):[]}function jC(n,e){return{documents:[OC(n,e.path)]}}function df(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=OC(n,i);const s=function(c){if(c.length!==0)return $C(ve.create(c,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(h=>function(p){return{field:Zr(p.field),direction:nF(p.dir)}}(h))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=mg(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{_t:t,parent:i}}function UC(n,e,t,r){const{_t:i,parent:s}=df(n,e),o={},a=[];let l=0;return t.forEach(c=>{const h=r?c.alias:"aggregate_"+l++;o[h]=c.alias,c.aggregateType==="count"?a.push({alias:h,count:{}}):c.aggregateType==="avg"?a.push({alias:h,avg:{field:Zr(c.fieldPath)}}):c.aggregateType==="sum"&&a.push({alias:h,sum:{field:Zr(c.fieldPath)}})}),{request:{structuredAggregationQuery:{aggregations:a,structuredQuery:i.structuredQuery},parent:i.parent},ut:o,parent:s}}function BC(n){let e=LC(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Y(r===1);const h=t.from[0];h.allDescendants?i=h.collectionId:e=e.child(h.collectionId)}let s=[];t.where&&(s=function(d){const p=zC(d);return p instanceof ve&&ty(p)?p.getFilters():[p]}(t.where));let o=[];t.orderBy&&(o=function(d){return d.map(p=>function(T){return new du(uo(T.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(T.direction))}(p))}(t.orderBy));let a=null;t.limit&&(a=function(d){let p;return p=typeof d=="object"?d.value:d,Du(p)?null:p}(t.limit));let l=null;t.startAt&&(l=function(d){const p=!!d.before,_=d.values||[];return new Ri(_,p)}(t.startAt));let c=null;return t.endAt&&(c=function(d){const p=!d.before,_=d.values||[];return new Ri(_,p)}(t.endAt)),cC(e,i,o,s,a,"F",l,c)}function tF(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return H()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function zC(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=uo(t.unaryFilter.field);return fe.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=uo(t.unaryFilter.field);return fe.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=uo(t.unaryFilter.field);return fe.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=uo(t.unaryFilter.field);return fe.create(o,"!=",{nullValue:"NULL_VALUE"});default:return H()}}(n):n.fieldFilter!==void 0?function(t){return fe.create(uo(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return H()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ve.create(t.compositeFilter.filters.map(r=>zC(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return H()}}(t.compositeFilter.op))}(n):H()}function nF(n){return WM[n]}function rF(n){return HM[n]}function iF(n){return QM[n]}function Zr(n){return{fieldPath:n.canonicalString()}}function uo(n){return De.fromServerFormat(n.fieldPath)}function $C(n){return n instanceof fe?function(t){if(t.op==="=="){if(xI(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NAN"}};if(PI(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(xI(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NOT_NAN"}};if(PI(t.value))return{unaryFilter:{field:Zr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Zr(t.field),op:rF(t.op),value:t.value}}}(n):n instanceof ve?function(t){const r=t.getFilters().map(i=>$C(i));return r.length===1?r[0]:{compositeFilter:{op:iF(t.op),filters:r}}}(n):H()}function sF(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function qC(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t,r,i,s=X.min(),o=X.min(),a=Ke.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new vr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new vr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e){this.ct=e}}function oF(n,e){let t;if(e.document)t=FC(n.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=K.fromSegments(e.noDocument.path),i=Ds(e.noDocument.readTime);t=Ne.newNoDocument(r,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return H();{const r=K.fromSegments(e.unknownDocument.path),i=Ds(e.unknownDocument.version);t=Ne.newUnknownDocument(r,i)}}return e.readTime&&t.setReadTime(function(i){const s=new je(i[0],i[1]);return X.fromTimestamp(s)}(e.readTime)),t}function HI(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:rd(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=function(s,o){return{name:fu(s,o.key),fields:o.data.value.mapValue.fields,updateTime:ea(s,o.version.toTimestamp()),createTime:ea(s,o.createTime.toTimestamp())}}(n.ct,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Ns(e.version)};else{if(!e.isUnknownDocument())return H();r.unknownDocument={path:t.path.toArray(),version:Ns(e.version)}}return r}function rd(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Ns(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Ds(n){const e=new je(n.seconds,n.nanoseconds);return X.fromTimestamp(e)}function as(n,e){const t=(e.baseMutations||[]).map(s=>yg(n.ct,s));for(let s=0;s<e.mutations.length-1;++s){const o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const a=e.mutations[s+1];o.updateTransforms=a.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const r=e.mutations.map(s=>yg(n.ct,s)),i=je.fromMillis(e.localWriteTimeMs);return new oy(e.batchId,i,t,r)}function yl(n){const e=Ds(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Ds(n.lastLimboFreeSnapshotVersion):X.min();let r;return r=function(s){return s.documents!==void 0}(n.query)?function(s){return Y(s.documents.length===1),Dt(ya(LC(s.documents[0])))}(n.query):function(s){return Dt(BC(s))}(n.query),new vr(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Ke.fromBase64String(n.resumeToken))}function KC(n,e){const t=Ns(e.snapshotVersion),r=Ns(e.lastLimboFreeSnapshotVersion);let i;i=Zh(e.target)?jC(n.ct,e.target):df(n.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Ps(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:i}}function hy(n){const e=BC({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?td(e,e.limit,"L"):e}function zp(n,e){return new ly(e.largestBatchId,yg(n.ct,e.overlayMutation))}function QI(n,e){const t=e.path.lastSegment();return[n,Nt(e.path.popLast()),t]}function YI(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Ns(r.readTime),documentKey:Nt(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
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
 */class aF{getBundleMetadata(e,t){return JI(e).get(t).next(r=>{if(r)return function(s){return{id:s.bundleId,createTime:Ds(s.createTime),version:s.version}}(r)})}saveBundleMetadata(e,t){return JI(e).put(function(i){return{bundleId:i.id,createTime:Ns(et(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return XI(e).get(t).next(r=>{if(r)return function(s){return{name:s.name,query:hy(s.bundledQuery),readTime:Ds(s.readTime)}}(r)})}saveNamedQuery(e,t){return XI(e).put(function(i){return{name:i.name,readTime:Ns(et(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function JI(n){return lt(n,"bundles")}function XI(n){return lt(n,"namedQueries")}/**
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
 */class ff{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const r=t.uid||"";return new ff(e,r)}getOverlay(e,t){return Za(e).get(QI(this.userId,t)).next(r=>r?zp(this.serializer,r):null)}getOverlays(e,t){const r=zn();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){const i=[];return r.forEach((s,o)=>{const a=new ly(t,o);i.push(this.ht(e,a))}),N.waitFor(i)}removeOverlaysForBatchId(e,t,r){const i=new Set;t.forEach(o=>i.add(Nt(o.getCollectionPath())));const s=[];return i.forEach(o=>{const a=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);s.push(Za(e).j("collectionPathOverlayIndex",a))}),N.waitFor(s)}getOverlaysForCollection(e,t,r){const i=zn(),s=Nt(t),o=IDBKeyRange.bound([this.userId,s,r],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Za(e).U("collectionPathOverlayIndex",o).next(a=>{for(const l of a){const c=zp(this.serializer,l);i.set(c.getKey(),c)}return i})}getOverlaysForCollectionGroup(e,t,r,i){const s=zn();let o;const a=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Za(e).J({index:"collectionGroupOverlayIndex",range:a},(l,c,h)=>{const d=zp(this.serializer,c);s.size()<i||d.largestBatchId===o?(s.set(d.getKey(),d),o=d.largestBatchId):h.done()}).next(()=>s)}ht(e,t){return Za(e).put(function(i,s,o){const[a,l,c]=QI(s,o.mutation.key);return{userId:s,collectionPath:l,documentId:c,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:pu(i.ct,o.mutation)}}(this.serializer,this.userId,t))}}function Za(n){return lt(n,"documentOverlays")}/**
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
 */class lF{Pt(e){return lt(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const r=t==null?void 0:t.value;return r?Ke.fromUint8Array(r):Ke.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class ls{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(Oe(e.integerValue));else if("doubleValue"in e){const r=Oe(e.doubleValue);isNaN(r)?this.dt(t,13):(this.dt(t,15),lu(r)?t.At(0):t.At(r))}else if("timestampValue"in e){let r=e.timestampValue;this.dt(t,20),typeof r=="string"&&(r=xr(r)),t.Rt(`${r.seconds||""}`),t.At(r.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(br(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.dt(t,45),t.At(r.latitude||0),t.At(r.longitude||0)}else"mapValue"in e?eC(e)?this.dt(t,Number.MAX_SAFE_INTEGER):uf(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):H()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const r=e.fields||{};this.dt(t,55);for(const i of Object.keys(r))this.Vt(i,t),this.Tt(r[i],t)}wt(e,t){var r,i;const s=e.fields||{};this.dt(t,53);const o="value",a=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(Oe(a)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){const r=e.values||[];this.dt(t,50);for(const i of r)this.Tt(i,t)}yt(e,t){this.dt(t,37),K.fromName(e).path.forEach(r=>{this.dt(t,60),this.Dt(r,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}ls.vt=new ls;function uF(n){if(n===0)return 8;let e=0;return!(n>>4)&&(e+=4,n<<=4),!(n>>6)&&(e+=2,n<<=2),!(n>>7)&&(e+=1),e}function ZI(n){const e=64-function(r){let i=0;for(let s=0;s<8;++s){const o=uF(255&r[s]);if(i+=o,o!==8)break}return i}(n);return Math.ceil(e/8)}class cF{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ft(r.value),r=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Ot(r.value),r=t.next();this.Nt()}Lt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ft(r);else if(r<2048)this.Ft(960|r>>>6),this.Ft(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|r>>>12),this.Ft(128|63&r>>>6),this.Ft(128|63&r);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Ot(r);else if(r<2048)this.Ot(960|r>>>6),this.Ot(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|r>>>12),this.Ot(128|63&r>>>6),this.Ot(128|63&r);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),r=ZI(t);this.Qt(1+r),this.buffer[this.position++]=255&r;for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),r=ZI(t);this.Qt(1+r),this.buffer[this.position++]=~(255&r);for(let i=t.length-r;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(s){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),r=(128&t[0])!=0;t[0]^=r?255:128;for(let i=1;i<t.length;++i)t[i]^=r?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const i=new Uint8Array(r);i.set(this.buffer),this.buffer=i}}class hF{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class dF{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class el{constructor(){this.jt=new cF,this.Ht=new hF(this.jt),this.Jt=new dF(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class us{constructor(e,t,r,i){this.indexId=e,this.documentKey=t,this.arrayValue=r,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.directionalValue,0),t!==e?r.set([0],this.directionalValue.length):++r[r.length-1],new us(this.indexId,this.documentKey,this.arrayValue,r)}}function qr(n,e){let t=n.indexId-e.indexId;return t!==0?t:(t=eT(n.arrayValue,e.arrayValue),t!==0?t:(t=eT(n.directionalValue,e.directionalValue),t!==0?t:K.comparator(n.documentKey,e.documentKey)))}function eT(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}/**
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
 */class tT{constructor(e){this.Xt=new Ee((t,r)=>De.comparator(t.field,r.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const r=t;r.isInequality()?this.Xt=this.Xt.add(r):this.tn.push(r)}}get nn(){return this.Xt.size>1}rn(e){if(Y(e.collectionGroup===this.collectionId),this.nn)return!1;const t=og(e);if(t!==void 0&&!this.sn(t))return!1;const r=is(e);let i=new Set,s=0,o=0;for(;s<r.length&&this.sn(r[s]);++s)i=i.add(r[s].fieldPath.canonicalString());if(s===r.length)return!0;if(this.Xt.size>0){const a=this.Xt.getIterator().getNext();if(!i.has(a.field.canonicalString())){const l=r[s];if(!this.on(a,l)||!this._n(this.en[o++],l))return!1}++s}for(;s<r.length;++s){const a=r[s];if(o>=this.en.length||!this._n(this.en[o++],a))return!1}return!0}an(){if(this.nn)return null;let e=new Ee(De.comparator);const t=[];for(const r of this.tn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new ws(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new ws(r.field,0))}for(const r of this.en)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new ws(r.field,r.dir==="asc"?0:1)));return new Ho(Ho.UNKNOWN_ID,this.collectionId,t,Qo.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function WC(n){var e,t;if(Y(n instanceof fe||n instanceof ve),n instanceof fe){if(n instanceof uC){const i=((t=(e=n.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>fe.create(n.field,"==",s)))||[];return ve.create(i,"or")}return n}const r=n.filters.map(i=>WC(i));return ve.create(r,n.op)}function fF(n){if(n.getFilters().length===0)return[];const e=Eg(WC(n));return Y(HC(e)),vg(e)||wg(e)?[e]:e.getFilters()}function vg(n){return n instanceof fe}function wg(n){return n instanceof ve&&ty(n)}function HC(n){return vg(n)||wg(n)||function(t){if(t instanceof ve&&hg(t)){for(const r of t.getFilters())if(!vg(r)&&!wg(r))return!1;return!0}return!1}(n)}function Eg(n){if(Y(n instanceof fe||n instanceof ve),n instanceof fe)return n;if(n.filters.length===1)return Eg(n.filters[0]);const e=n.filters.map(r=>Eg(r));let t=ve.create(e,n.op);return t=id(t),HC(t)?t:(Y(t instanceof ve),Y(Jo(t)),Y(t.filters.length>1),t.filters.reduce((r,i)=>dy(r,i)))}function dy(n,e){let t;return Y(n instanceof fe||n instanceof ve),Y(e instanceof fe||e instanceof ve),t=n instanceof fe?e instanceof fe?function(i,s){return ve.create([i,s],"and")}(n,e):nT(n,e):e instanceof fe?nT(e,n):function(i,s){if(Y(i.filters.length>0&&s.filters.length>0),Jo(i)&&Jo(s))return oC(i,s.getFilters());const o=hg(i)?i:s,a=hg(i)?s:i,l=o.filters.map(c=>dy(c,a));return ve.create(l,"or")}(n,e),id(t)}function nT(n,e){if(Jo(e))return oC(e,n.getFilters());{const t=e.filters.map(r=>dy(n,r));return ve.create(t,"or")}}function id(n){if(Y(n instanceof fe||n instanceof ve),n instanceof fe)return n;const e=n.getFilters();if(e.length===1)return id(e[0]);if(iC(n))return n;const t=e.map(i=>id(i)),r=[];return t.forEach(i=>{i instanceof fe?r.push(i):i instanceof ve&&(i.op===n.op?r.push(...i.filters):r.push(i))}),r.length===1?r[0]:ve.create(r,n.op)}/**
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
 */class pF{constructor(){this.un=new fy}addToCollectionParentIndex(e,t){return this.un.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(an.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(an.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}}class fy{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ee(de.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ee(de.comparator)).toArray()}}/**
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
 */const Uc=new Uint8Array(0);class mF{constructor(e,t){this.databaseId=t,this.cn=new fy,this.ln=new Lr(r=>Ps(r),(r,i)=>Vu(r,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const r=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const s={collectionId:r,parent:Nt(i)};return rT(e).put(s)}return N.resolve()}getCollectionParents(e,t){const r=[],i=IDBKeyRange.bound([t,""],[Uk(t),""],!1,!0);return rT(e).U(i).next(s=>{for(const o of s){if(o.collectionId!==t)break;r.push(Bn(o.parent))}return r})}addFieldIndex(e,t){const r=tl(e),i=function(a){return{indexId:a.indexId,collectionGroup:a.collectionGroup,fields:a.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(t);delete i.indexId;const s=r.add(i);if(t.indexState){const o=io(e);return s.next(a=>{o.put(YI(a,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){const r=tl(e),i=io(e),s=ro(e);return r.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=tl(e),r=ro(e),i=io(e);return t.j().next(()=>r.j()).next(()=>i.j())}createTargetIndexes(e,t){return N.forEach(this.hn(t),r=>this.getIndexType(e,r).next(i=>{if(i===0||i===1){const s=new tT(r).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){const r=ro(e);let i=!0;const s=new Map;return N.forEach(this.hn(t),o=>this.Pn(e,o).next(a=>{i&&(i=!!a),s.set(o,a)})).next(()=>{if(i){let o=re();const a=[];return N.forEach(s,(l,c)=>{U("IndexedDbIndexManager",`Using index ${function(S){return`id=${S.indexId}|cg=${S.collectionGroup}|f=${S.fields.map(D=>`${D.fieldPath}:${D.kind}`).join(",")}`}(l)} to execute ${Ps(t)}`);const h=function(S,D){const F=og(D);if(F===void 0)return null;for(const M of ed(S,F.fieldPath))switch(M.op){case"array-contains-any":return M.value.arrayValue.values||[];case"array-contains":return[M.value]}return null}(c,l),d=function(S,D){const F=new Map;for(const M of is(D))for(const k of ed(S,M.fieldPath))switch(k.op){case"==":case"in":F.set(M.fieldPath.canonicalString(),k.value);break;case"not-in":case"!=":return F.set(M.fieldPath.canonicalString(),k.value),Array.from(F.values())}return null}(c,l),p=function(S,D){const F=[];let M=!0;for(const k of is(D)){const w=k.kind===0?OI(S,k.fieldPath,S.startAt):LI(S,k.fieldPath,S.startAt);F.push(w.value),M&&(M=w.inclusive)}return new Ri(F,M)}(c,l),_=function(S,D){const F=[];let M=!0;for(const k of is(D)){const w=k.kind===0?LI(S,k.fieldPath,S.endAt):OI(S,k.fieldPath,S.endAt);F.push(w.value),M&&(M=w.inclusive)}return new Ri(F,M)}(c,l),T=this.In(l,c,p),C=this.In(l,c,_),P=this.Tn(l,c,d),y=this.En(l.indexId,h,T,p.inclusive,C,_.inclusive,P);return N.forEach(y,I=>r.G(I,t.limit).next(S=>{S.forEach(D=>{const F=K.fromSegments(D.documentKey);o.has(F)||(o=o.add(F),a.push(F))})}))}).next(()=>a)}return N.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=fF(ve.create(e.filters,"and")).map(r=>fg(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,r,i,s,o,a){const l=(t!=null?t.length:1)*Math.max(r.length,s.length),c=l/(t!=null?t.length:1),h=[];for(let d=0;d<l;++d){const p=t?this.dn(t[d/c]):Uc,_=this.An(e,p,r[d%c],i),T=this.Rn(e,p,s[d%c],o),C=a.map(P=>this.An(e,p,P,!0));h.push(...this.createRange(_,T,C))}return h}An(e,t,r,i){const s=new us(e,K.empty(),t,r);return i?s:s.Zt()}Rn(e,t,r,i){const s=new us(e,K.empty(),t,r);return i?s.Zt():s}Pn(e,t){const r=new tT(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(const a of s)r.rn(a)&&(!o||a.fields.length>o.fields.length)&&(o=a);return o})}getIndexType(e,t){let r=2;const i=this.hn(t);return N.forEach(i,s=>this.Pn(e,s).next(o=>{o?r!==0&&o.fields.length<function(l){let c=new Ee(De.comparator),h=!1;for(const d of l.filters)for(const p of d.getFlattenedFilters())p.field.isKeyField()||(p.op==="array-contains"||p.op==="array-contains-any"?h=!0:c=c.add(p.field));for(const d of l.orderBy)d.field.isKeyField()||(c=c.add(d.field));return c.size+(h?1:0)}(s)&&(r=1):r=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&r===2?1:r)}Vn(e,t){const r=new el;for(const i of is(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const o=r.Yt(i.kind);ls.vt.It(s,o)}return r.zt()}dn(e){const t=new el;return ls.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const r=new el;return ls.vt.It(Rs(this.databaseId,t),r.Yt(function(s){const o=is(s);return o.length===0?0:o[o.length-1].kind}(e))),r.zt()}Tn(e,t,r){if(r===null)return[];let i=[];i.push(new el);let s=0;for(const o of is(e)){const a=r[s++];for(const l of i)if(this.fn(t,o.fieldPath)&&hu(a))i=this.gn(i,o,a);else{const c=l.Yt(o.kind);ls.vt.It(a,c)}}return this.pn(i)}In(e,t,r){return this.Tn(e,t,r.position)}pn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].zt();return t}gn(e,t,r){const i=[...e],s=[];for(const o of r.arrayValue.values||[])for(const a of i){const l=new el;l.seed(a.zt()),ls.vt.It(o,l.Yt(t.kind)),s.push(l)}return s}fn(e,t){return!!e.filters.find(r=>r instanceof fe&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in"))}getFieldIndexes(e,t){const r=tl(e),i=io(e);return(t?r.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):r.U()).next(s=>{const o=[];return N.forEach(s,a=>i.get([a.indexId,this.uid]).next(l=>{o.push(function(h,d){const p=d?new Qo(d.sequenceNumber,new an(Ds(d.readTime),new K(Bn(d.documentKey)),d.largestBatchId)):Qo.empty(),_=h.fields.map(([T,C])=>new ws(De.fromServerFormat(T),C));return new Ho(h.indexId,h.collectionGroup,_,p)}(a,l))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((r,i)=>{const s=r.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:ne(r.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,r){const i=tl(e),s=io(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(a=>N.forEach(a,l=>s.put(YI(l.indexId,this.uid,o,r)))))}updateIndexEntries(e,t){const r=new Map;return N.forEach(t,(i,s)=>{const o=r.get(i.collectionGroup);return(o?N.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(a=>(r.set(i.collectionGroup,a),N.forEach(a,l=>this.wn(e,i,l).next(c=>{const h=this.Sn(s,l);return c.isEqual(h)?N.resolve():this.bn(e,s,l,c,h)}))))})}Dn(e,t,r,i){return ro(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(r,t.key),documentKey:t.key.path.toArray()})}vn(e,t,r,i){return ro(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(r,t.key),t.key.path.toArray()])}wn(e,t,r){const i=ro(e);let s=new Ee(qr);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([r.indexId,this.uid,this.mn(r,t)])},(o,a)=>{s=s.add(new us(r.indexId,t,a.arrayValue,a.directionalValue))}).next(()=>s)}Sn(e,t){let r=new Ee(qr);const i=this.Vn(t,e);if(i==null)return r;const s=og(t);if(s!=null){const o=e.data.field(s.fieldPath);if(hu(o))for(const a of o.arrayValue.values||[])r=r.add(new us(t.indexId,e.key,this.dn(a),i))}else r=r.add(new us(t.indexId,e.key,Uc,i));return r}bn(e,t,r,i,s){U("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(l,c,h,d,p){const _=l.getIterator(),T=c.getIterator();let C=no(_),P=no(T);for(;C||P;){let y=!1,I=!1;if(C&&P){const S=h(C,P);S<0?I=!0:S>0&&(y=!0)}else C!=null?I=!0:y=!0;y?(d(P),P=no(T)):I?(p(C),C=no(_)):(C=no(_),P=no(T))}}(i,s,qr,a=>{o.push(this.Dn(e,t,r,a))},a=>{o.push(this.vn(e,t,r,a))}),N.waitFor(o)}yn(e){let t=1;return io(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(r,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,r){r=r.sort((o,a)=>qr(o,a)).filter((o,a,l)=>!a||qr(o,l[a-1])!==0);const i=[];i.push(e);for(const o of r){const a=qr(o,e),l=qr(o,t);if(a===0)i[0]=e.Zt();else if(a>0&&l<0)i.push(o),i.push(o.Zt());else if(l>0)break}i.push(t);const s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];const a=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,Uc,[]],l=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,Uc,[]];s.push(IDBKeyRange.bound(a,l))}return s}Cn(e,t){return qr(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(iT)}getMinOffset(e,t){return N.mapArray(this.hn(t),r=>this.Pn(e,r).next(i=>i||H())).next(iT)}}function rT(n){return lt(n,"collectionParents")}function ro(n){return lt(n,"indexEntries")}function tl(n){return lt(n,"indexConfiguration")}function io(n){return lt(n,"indexState")}function iT(n){Y(n.length!==0);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const i=n[r].indexState.offset;X_(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new an(e.readTime,e.documentKey,t)}/**
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
 */const sT={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Pt{constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}static withCacheSize(e){return new Pt(e,Pt.DEFAULT_COLLECTION_PERCENTILE,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function QC(n,e,t){const r=n.store("mutations"),i=n.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId);let a=0;const l=r.J({range:o},(h,d,p)=>(a++,p.delete()));s.push(l.next(()=>{Y(a===1)}));const c=[];for(const h of t.mutations){const d=Wk(e,h.key.path,t.batchId);s.push(i.delete(d)),c.push(h.key)}return N.waitFor(s).next(()=>c)}function sd(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw H();e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Pt.DEFAULT_COLLECTION_PERCENTILE=10,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Pt.DEFAULT=new Pt(41943040,Pt.DEFAULT_COLLECTION_PERCENTILE,Pt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Pt.DISABLED=new Pt(-1,0,0);class pf{constructor(e,t,r,i){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=i,this.Fn={}}static lt(e,t,r,i){Y(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new pf(s,t,r,i)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Gr(e).J({index:"userMutationsIndex",range:r},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,r,i){const s=co(e),o=Gr(e);return o.add({}).next(a=>{Y(typeof a=="number");const l=new oy(a,t,r,i),c=function(_,T,C){const P=C.baseMutations.map(I=>pu(_.ct,I)),y=C.mutations.map(I=>pu(_.ct,I));return{userId:T,batchId:C.batchId,localWriteTimeMs:C.localWriteTime.toMillis(),baseMutations:P,mutations:y}}(this.serializer,this.userId,l),h=[];let d=new Ee((p,_)=>ne(p.canonicalString(),_.canonicalString()));for(const p of i){const _=Wk(this.userId,p.key.path,a);d=d.add(p.key.path.popLast()),h.push(o.put(c)),h.push(s.put(_,nM))}return d.forEach(p=>{h.push(this.indexManager.addToCollectionParentIndex(e,p))}),e.addOnCommittedListener(()=>{this.Fn[a]=l.keys()}),N.waitFor(h).next(()=>l)})}lookupMutationBatch(e,t){return Gr(e).get(t).next(r=>r?(Y(r.userId===this.userId),as(this.serializer,r)):null)}Mn(e,t){return this.Fn[t]?N.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(r=>{if(r){const i=r.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=IDBKeyRange.lowerBound([this.userId,r]);let s=null;return Gr(e).J({index:"userMutationsIndex",range:i},(o,a,l)=>{a.userId===this.userId&&(Y(a.batchId>=r),s=as(this.serializer,a)),l.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=-1;return Gr(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{r=s.batchId,o.done()}).next(()=>r)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Gr(e).U("userMutationsIndex",t).next(r=>r.map(i=>as(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=hh(this.userId,t.path),i=IDBKeyRange.lowerBound(r),s=[];return co(e).J({range:i},(o,a,l)=>{const[c,h,d]=o,p=Bn(h);if(c===this.userId&&t.path.isEqual(p))return Gr(e).get(d).next(_=>{if(!_)throw H();Y(_.userId===this.userId),s.push(as(this.serializer,_))});l.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ne);const i=[];return t.forEach(s=>{const o=hh(this.userId,s.path),a=IDBKeyRange.lowerBound(o),l=co(e).J({range:a},(c,h,d)=>{const[p,_,T]=c,C=Bn(_);p===this.userId&&s.path.isEqual(C)?r=r.add(T):d.done()});i.push(l)}),N.waitFor(i).next(()=>this.xn(e,r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1,s=hh(this.userId,r),o=IDBKeyRange.lowerBound(s);let a=new Ee(ne);return co(e).J({range:o},(l,c,h)=>{const[d,p,_]=l,T=Bn(p);d===this.userId&&r.isPrefixOf(T)?T.length===i&&(a=a.add(_)):h.done()}).next(()=>this.xn(e,a))}xn(e,t){const r=[],i=[];return t.forEach(s=>{i.push(Gr(e).get(s).next(o=>{if(o===null)throw H();Y(o.userId===this.userId),r.push(as(this.serializer,o))}))}),N.waitFor(i).next(()=>r)}removeMutationBatch(e,t){return QC(e._e,this.userId,t).next(r=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),N.forEach(r,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return N.resolve();const r=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return co(e).J({range:r},(s,o,a)=>{if(s[0]===this.userId){const l=Bn(s[1]);i.push(l)}else a.done()}).next(()=>{Y(i.length===0)})})}containsKey(e,t){return YC(e,this.userId,t)}Nn(e){return JC(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function YC(n,e,t){const r=hh(e,t.path),i=r[1],s=IDBKeyRange.lowerBound(r);let o=!1;return co(n).J({range:s,H:!0},(a,l,c)=>{const[h,d,p]=a;h===e&&d===i&&(o=!0),c.done()}).next(()=>o)}function Gr(n){return lt(n,"mutations")}function co(n){return lt(n,"documentMutations")}function JC(n){return lt(n,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Vs(0)}static kn(){return new Vs(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gF{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const r=new Vs(t.highestTargetId);return t.highestTargetId=r.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>X.fromTimestamp(new je(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,r){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,r&&(i.lastRemoteSnapshotVersion=r.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(r=>(r.targetCount+=1,this.$n(t,r),this.Qn(e,r))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>so(e).delete(t.targetId)).next(()=>this.qn(e)).next(r=>(Y(r.targetCount>0),r.targetCount-=1,this.Qn(e,r)))}removeTargets(e,t,r){let i=0;const s=[];return so(e).J((o,a)=>{const l=yl(a);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(i++,s.push(this.removeTargetData(e,l)))}).next(()=>N.waitFor(s)).next(()=>i)}forEachTarget(e,t){return so(e).J((r,i)=>{const s=yl(i);t(s)})}qn(e){return oT(e).get("targetGlobalKey").next(t=>(Y(t!==null),t))}Qn(e,t){return oT(e).put("targetGlobalKey",t)}Kn(e,t){return so(e).put(KC(this.serializer,t))}$n(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const r=Ps(t),i=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let s=null;return so(e).J({range:i,index:"queryTargetsIndex"},(o,a,l)=>{const c=yl(a);Vu(t,c.target)&&(s=c,l.done())}).next(()=>s)}addMatchingKeys(e,t,r){const i=[],s=ei(e);return t.forEach(o=>{const a=Nt(o.path);i.push(s.put({targetId:r,path:a})),i.push(this.referenceDelegate.addReference(e,r,o))}),N.waitFor(i)}removeMatchingKeys(e,t,r){const i=ei(e);return N.forEach(t,s=>{const o=Nt(s.path);return N.waitFor([i.delete([r,o]),this.referenceDelegate.removeReference(e,r,s)])})}removeMatchingKeysForTargetId(e,t){const r=ei(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(i)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),i=ei(e);let s=re();return i.J({range:r,H:!0},(o,a,l)=>{const c=Bn(o[1]),h=new K(c);s=s.add(h)}).next(()=>s)}containsKey(e,t){const r=Nt(t.path),i=IDBKeyRange.bound([r],[Uk(r)],!1,!0);let s=0;return ei(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,a],l,c)=>{o!==0&&(s++,c.done())}).next(()=>s>0)}ot(e,t){return so(e).get(t).next(r=>r?yl(r):null)}}function so(n){return lt(n,"targets")}function oT(n){return lt(n,"targetGlobal")}function ei(n){return lt(n,"targetDocuments")}/**
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
 */function aT([n,e],[t,r]){const i=ne(n,t);return i===0?ne(e,r):i}class _F{constructor(e){this.Un=e,this.buffer=new Ee(aT),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();aT(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class XC{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){U("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){zi(t)?U("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Bi(t)}await this.Hn(3e5)})}}class yF{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Gt.oe);const r=new _F(t);return this.Jn.forEachTarget(e,i=>r.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>r.zn(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Jn.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(U("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(sT)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(U("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),sT):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let r,i,s,o,a,l,c;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(U("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),i=this.params.maximumSequenceNumbersToCollect):i=d,o=Date.now(),this.nthSequenceNumber(e,i))).next(d=>(r=d,a=Date.now(),this.removeTargets(e,r,t))).next(d=>(s=d,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(d=>(c=Date.now(),ao()<=ae.DEBUG&&U("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${i} in `+(a-o)+`ms
	Removed ${s} targets in `+(l-a)+`ms
	Removed ${d} documents in `+(c-l)+`ms
Total Duration: ${c-h}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:d})))}}function ZC(n,e){return new yF(n,e)}/**
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
 */class vF{constructor(e,t){this.db=e,this.garbageCollector=ZC(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(r,i)=>t(i))}addReference(e,t,r){return Bc(e,r)}removeReference(e,t,r){return Bc(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Bc(e,t)}nr(e,t){return function(i,s){let o=!1;return JC(i).Y(a=>YC(i,a,s).next(l=>(l&&(o=!0),N.resolve(!l)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,(o,a)=>{if(a<=t){const l=this.nr(e,o).next(c=>{if(!c)return s++,r.getEntry(e,o).next(()=>(r.removeEntry(o,X.min()),ei(e).delete(function(d){return[0,Nt(d.path)]}(o))))});i.push(l)}}).next(()=>N.waitFor(i)).next(()=>r.apply(e)).next(()=>s)}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Bc(e,t)}tr(e,t){const r=ei(e);let i,s=Gt.oe;return r.J({index:"documentTargetsIndex"},([o,a],{path:l,sequenceNumber:c})=>{o===0?(s!==Gt.oe&&t(new K(Bn(i)),s),s=c,i=l):s=Gt.oe}).next(()=>{s!==Gt.oe&&t(new K(Bn(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Bc(n,e){return ei(n).put(function(r,i){return{targetId:0,path:Nt(r.path),sequenceNumber:i}}(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eR{constructor(){this.changes=new Lr(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ne.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wF{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Zi(e).put(r)}removeEntry(e,t,r){return Zi(e).delete(function(s,o){const a=s.path.toArray();return[a.slice(0,a.length-2),a[a.length-2],rd(o),a[a.length-1]]}(t,r))}updateMetadata(e,t){return this.getMetadata(e).next(r=>(r.byteSize+=t,this.rr(e,r)))}getEntry(e,t){let r=Ne.newInvalidDocument(t);return Zi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(nl(t))},(i,s)=>{r=this.ir(t,s)}).next(()=>r)}sr(e,t){let r={size:0,document:Ne.newInvalidDocument(t)};return Zi(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(nl(t))},(i,s)=>{r={document:this.ir(t,s),size:sd(s)}}).next(()=>r)}getEntries(e,t){let r=Wt();return this._r(e,t,(i,s)=>{const o=this.ir(i,s);r=r.insert(i,o)}).next(()=>r)}ar(e,t){let r=Wt(),i=new Ge(K.comparator);return this._r(e,t,(s,o)=>{const a=this.ir(s,o);r=r.insert(s,a),i=i.insert(s,sd(o))}).next(()=>({documents:r,ur:i}))}_r(e,t,r){if(t.isEmpty())return N.resolve();let i=new Ee(cT);t.forEach(l=>i=i.add(l));const s=IDBKeyRange.bound(nl(i.first()),nl(i.last())),o=i.getIterator();let a=o.getNext();return Zi(e).J({index:"documentKeyIndex",range:s},(l,c,h)=>{const d=K.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;a&&cT(a,d)<0;)r(a,null),a=o.getNext();a&&a.isEqual(d)&&(r(a,c),a=o.hasNext()?o.getNext():null),a?h.$(nl(a)):h.done()}).next(()=>{for(;a;)r(a,null),a=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,r,i,s){const o=t.path,a=[o.popLast().toArray(),o.lastSegment(),rd(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Zi(e).U(IDBKeyRange.bound(a,l,!0)).next(c=>{s==null||s.incrementDocumentReadCount(c.length);let h=Wt();for(const d of c){const p=this.ir(K.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);p.isFoundDocument()&&(Lu(t,p)||i.has(p.key))&&(h=h.insert(p.key,p))}return h})}getAllFromCollectionGroup(e,t,r,i){let s=Wt();const o=uT(t,r),a=uT(t,an.max());return Zi(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,a,!0)},(l,c,h)=>{const d=this.ir(K.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);s=s.insert(d.key,d),s.size===i&&h.done()}).next(()=>s)}newChangeBuffer(e){return new EF(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return lT(e).get("remoteDocumentGlobalKey").next(t=>(Y(!!t),t))}rr(e,t){return lT(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const r=oF(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(X.min())))return r}return Ne.newInvalidDocument(e)}}function tR(n){return new wF(n)}class EF extends eR{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new Lr(r=>r.toString(),(r,i)=>r.isEqual(i))}applyChanges(e){const t=[];let r=0,i=new Ee((s,o)=>ne(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{const a=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,a.readTime)),o.isValidDocument()){const l=HI(this.cr.serializer,o);i=i.add(s.path.popLast());const c=sd(l);r+=c-a.size,t.push(this.cr.addEntry(e,s,l))}else if(r-=a.size,this.trackRemovals){const l=HI(this.cr.serializer,o.convertToNoDocument(X.min()));t.push(this.cr.addEntry(e,s,l))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,r)),N.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(r=>(this.lr.set(t,{size:r.size,readTime:r.document.readTime}),r.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:r,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:r.get(s).readTime})}),r))}}function lT(n){return lt(n,"remoteDocumentGlobal")}function Zi(n){return lt(n,"remoteDocumentsV14")}function nl(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function uT(n,e){const t=e.documentKey.path.toArray();return[n,rd(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function cT(n,e){const t=n.path.toArray(),r=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<r.length-2;++s)if(i=ne(t[s],r[s]),i)return i;return i=ne(t.length,r.length),i||(i=ne(t[t.length-2],r[r.length-2]),i||ne(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class IF{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Nl(r.mutation,i,Kt.empty(),je.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,re()).next(()=>r))}getLocalViewOfDocuments(e,t,r=re()){const i=zn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=gl();return s.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const r=zn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,re()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,r,i){let s=Wt();const o=bl(),a=function(){return bl()}();return t.forEach((l,c)=>{const h=r.get(c.key);i.has(c.key)&&(h===void 0||h.mutation instanceof Mr)?s=s.insert(c.key,c):h!==void 0?(o.set(c.key,h.mutation.getFieldMask()),Nl(h.mutation,c,h.mutation.getFieldMask(),je.now())):o.set(c.key,Kt.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((c,h)=>o.set(c,h)),t.forEach((c,h)=>{var d;return a.set(c,new IF(h,(d=o.get(c))!==null&&d!==void 0?d:null))}),a))}recalculateAndSaveOverlays(e,t){const r=bl();let i=new Ge((o,a)=>o-a),s=re();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=t.get(l);if(c===null)return;let h=r.get(l)||Kt.empty();h=a.applyToLocalView(c,h),r.set(l,h);const d=(i.get(a.batchId)||re()).add(l);i=i.insert(a.batchId,d)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,h=l.value,d=yC();h.forEach(p=>{if(!s.has(p)){const _=AC(t.get(p),r.get(p));_!==null&&d.set(p,_),s=s.add(p)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,d))}return N.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return K.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ny(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve(zn());let a=-1,l=s;return o.next(c=>N.forEach(c,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),s.get(h)?N.resolve():this.remoteDocumentCache.getEntry(e,h).next(p=>{l=l.insert(h,p)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,l,c,re())).next(h=>({batchId:a,changes:_C(h)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new K(t)).next(r=>{let i=gl();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let o=gl();return this.indexManager.getCollectionParents(e,s).next(a=>N.forEach(a,l=>{const c=function(d,p){return new Or(p,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(h=>{h.forEach((d,p)=>{o=o.insert(d,p)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((l,c)=>{const h=c.getKey();o.get(h)===null&&(o=o.insert(h,Ne.newInvalidDocument(h)))});let a=gl();return o.forEach((l,c)=>{const h=s.get(l);h!==void 0&&Nl(h.mutation,c,Kt.empty(),je.now()),Lu(t,c)&&(a=a.insert(l,c))}),a})}}/**
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
 */class TF{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return N.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:et(i.createTime)}}(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:hy(i.bundledQuery),readTime:et(i.readTime)}}(t)),N.resolve()}}/**
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
 */class SF{constructor(){this.overlays=new Ge(K.comparator),this.Ir=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){const r=zn();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.ht(e,t,s)}),N.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){const i=zn(),s=t.length+1,o=new K(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ge((c,h)=>c-h);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>r){let h=s.get(c.largestBatchId);h===null&&(h=zn(),s=s.insert(c.largestBatchId,h)),h.set(c.getKey(),c)}}const a=zn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,h)=>a.set(c,h)),!(a.size()>=i)););return N.resolve(a)}ht(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ly(t,r));let s=this.Ir.get(t);s===void 0&&(s=re(),this.Ir.set(t,s)),this.Ir.set(t,s.add(r.key))}}/**
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
 */class AF{constructor(){this.sessionToken=Ke.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(){this.Tr=new Ee(ct.Er),this.dr=new Ee(ct.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new ct(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new ct(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new K(new de([])),r=new ct(t,e),i=new ct(t,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new K(new de([])),r=new ct(t,e),i=new ct(t,e+1);let s=re();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const t=new ct(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ct{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return K.comparator(e.key,t.key)||ne(e.wr,t.wr)}static Ar(e,t){return ne(e.wr,t.wr)||K.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kF{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new Ee(ct.Er)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new oy(s,t,r,i);this.mutationQueue.push(o);for(const a of i)this.br=this.br.add(new ct(a.key,s)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.vr(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ct(t,0),i=new ct(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const a=this.Dr(o.wr);s.push(a)}),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ee(ne);return t.forEach(i=>{const s=new ct(i,0),o=new ct(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],a=>{r=r.add(a.wr)})}),N.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;K.isDocumentKey(s)||(s=s.child(""));const o=new ct(new K(s),0);let a=new Ee(ne);return this.br.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(a=a.add(l.wr)),!0)},o),N.resolve(this.Cr(a))}Cr(e){const t=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Y(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return N.forEach(t.mutations,i=>{const s=new ct(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new ct(t,0),i=this.br.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CF{constructor(e){this.Mr=e,this.docs=function(){return new Ge(K.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():Ne.newInvalidDocument(t))}getEntries(e,t){let r=Wt();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():Ne.newInvalidDocument(i))}),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Wt();const o=t.path,a=new K(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:h}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||X_(zk(h),r)<=0||(i.has(h.key)||Lu(t,h))&&(s=s.insert(h.key,h.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){H()}Or(e,t){return N.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new RF(this)}getSize(e){return N.resolve(this.size)}}class RF extends eR{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),N.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PF{constructor(e){this.persistence=e,this.Nr=new Lr(t=>Ps(t),Vu),this.lastRemoteSnapshotVersion=X.min(),this.highestTargetId=0,this.Lr=0,this.Br=new py,this.targetCount=0,this.kr=Vs.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,i)=>t(i)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),N.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Vs(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.Kn(t),N.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.Nr.forEach((o,a)=>{a.sequenceNumber<=t&&r.get(a.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),N.waitFor(s).next(()=>i)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),N.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class my{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Gt(0),this.Kr=!1,this.Kr=!0,this.$r=new AF,this.referenceDelegate=e(this),this.Ur=new PF(this),this.indexManager=new pF,this.remoteDocumentCache=function(i){return new CF(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new GC(t),this.Gr=new TF(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new SF,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new kF(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){U("MemoryPersistence","Starting transaction:",e);const i=new xF(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return N.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class xF extends qk{constructor(e){super(),this.currentSequenceNumber=e}}class mf{constructor(e){this.persistence=e,this.Jr=new py,this.Yr=null}static Zr(e){return new mf(e)}get Xr(){if(this.Yr)return this.Yr;throw H()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),N.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.Xr,r=>{const i=K.fromPath(r);return this.ei(e,i).next(s=>{s||t.removeEntry(i,X.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return N.or([()=>N.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class od{constructor(e,t){this.persistence=e,this.ti=new Lr(r=>Nt(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=ZC(this,t)}static Zr(e,t){return new od(e,t)}zr(){}jr(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}er(e){let t=0;return this.Zn(e,r=>{t++}).next(()=>t)}Zn(e,t){return N.forEach(this.ti,(r,i)=>this.nr(e,r,i).next(s=>s?N.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.Or(e,o=>this.nr(e,o,t).next(a=>{a||(r++,s.removeEntry(o,X.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.ti.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),N.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=fh(e.data.value)),t}nr(e,t,r){return N.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.ti.get(t);return N.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class bF{constructor(e){this.serializer=e}O(e,t,r,i){const s=new of("createOrUpgrade",t);r<1&&i>=1&&(function(l){l.createObjectStore("owner")}(e),function(l){l.createObjectStore("mutationQueues",{keyPath:"userId"}),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",SI,{unique:!0}),l.createObjectStore("documentMutations")}(e),hT(e),function(l){l.createObjectStore("remoteDocuments")}(e));let o=N.resolve();return r<3&&i>=3&&(r!==0&&(function(l){l.deleteObjectStore("targetDocuments"),l.deleteObjectStore("targets"),l.deleteObjectStore("targetGlobal")}(e),hT(e)),o=o.next(()=>function(l){const c=l.store("targetGlobal"),h={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:X.min().toTimestamp(),targetCount:0};return c.put("targetGlobalKey",h)}(s))),r<4&&i>=4&&(r!==0&&(o=o.next(()=>function(l,c){return c.store("mutations").U().next(h=>{l.deleteObjectStore("mutations"),l.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",SI,{unique:!0});const d=c.store("mutations"),p=h.map(_=>d.put(_));return N.waitFor(p)})}(e,s))),o=o.next(()=>{(function(l){l.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),r<5&&i>=5&&(o=o.next(()=>this.ni(s))),r<6&&i>=6&&(o=o.next(()=>(function(l){l.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),r<7&&i>=7&&(o=o.next(()=>this.ii(s))),r<8&&i>=8&&(o=o.next(()=>this.si(e,s))),r<9&&i>=9&&(o=o.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)})),r<10&&i>=10&&(o=o.next(()=>this.oi(s))),r<11&&i>=11&&(o=o.next(()=>{(function(l){l.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(l){l.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),r<12&&i>=12&&(o=o.next(()=>{(function(l){const c=l.createObjectStore("documentOverlays",{keyPath:pM});c.createIndex("collectionPathOverlayIndex",mM,{unique:!1}),c.createIndex("collectionGroupOverlayIndex",gM,{unique:!1})})(e)})),r<13&&i>=13&&(o=o.next(()=>function(l){const c=l.createObjectStore("remoteDocumentsV14",{keyPath:rM});c.createIndex("documentKeyIndex",iM),c.createIndex("collectionGroupIndex",sM)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),r<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),r<15&&i>=15&&(o=o.next(()=>function(l){l.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),l.createObjectStore("indexState",{keyPath:cM}).createIndex("sequenceNumberIndex",hM,{unique:!1}),l.createObjectStore("indexEntries",{keyPath:dM}).createIndex("documentKeyIndex",fM,{unique:!1})}(e))),r<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),r<17&&i>=17&&(o=o.next(()=>{(function(l){l.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((r,i)=>{t+=sd(i)}).next(()=>{const r={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",r)})}ni(e){const t=e.store("mutationQueues"),r=e.store("mutations");return t.U().next(i=>N.forEach(i,s=>{const o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return r.U("userMutationsIndex",o).next(a=>N.forEach(a,l=>{Y(l.userId===s.userId);const c=as(this.serializer,l);return QC(e,s.userId,c).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),r=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{const s=[];return r.J((o,a)=>{const l=new de(o),c=function(d){return[0,Nt(d)]}(l);s.push(t.get(c).next(h=>h?N.resolve():(d=>t.put({targetId:0,path:Nt(d),sequenceNumber:i.highestListenSequenceNumber}))(l)))}).next(()=>N.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:uM});const r=t.store("collectionParents"),i=new fy,s=o=>{if(i.add(o)){const a=o.lastSegment(),l=o.popLast();return r.put({collectionId:a,parent:Nt(l)})}};return t.store("remoteDocuments").J({H:!0},(o,a)=>{const l=new de(o);return s(l.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,a,l],c)=>{const h=Bn(a);return s(h.popLast())}))}oi(e){const t=e.store("targets");return t.J((r,i)=>{const s=yl(i),o=KC(this.serializer,s);return t.put(o)})}_i(e,t){const r=t.store("remoteDocuments"),i=[];return r.J((s,o)=>{const a=t.store("remoteDocumentsV14"),l=function(d){return d.document?new K(de.fromString(d.document.name).popFirst(5)):d.noDocument?K.fromSegments(d.noDocument.path):d.unknownDocument?K.fromSegments(d.unknownDocument.path):H()}(o).path.toArray(),c={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(a.put(c))}).next(()=>N.waitFor(i))}ai(e,t){const r=t.store("mutations"),i=tR(this.serializer),s=new my(mf.Zr,this.serializer.ct);return r.U().next(o=>{const a=new Map;return o.forEach(l=>{var c;let h=(c=a.get(l.userId))!==null&&c!==void 0?c:re();as(this.serializer,l).keys().forEach(d=>h=h.add(d)),a.set(l.userId,h)}),N.forEach(a,(l,c)=>{const h=new dt(c),d=ff.lt(this.serializer,h),p=s.getIndexManager(h),_=pf.lt(h,this.serializer,p,s.referenceDelegate);return new nR(i,_,d,p).recalculateAndSaveOverlaysForDocumentKeys(new ag(t,Gt.oe),l).next()})})}}function hT(n){n.createObjectStore("targetDocuments",{keyPath:aM}).createIndex("documentTargetsIndex",lM,{unique:!0}),n.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",oM,{unique:!0}),n.createObjectStore("targetGlobal")}const $p="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class gy{constructor(e,t,r,i,s,o,a,l,c,h,d=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.ui=s,this.window=o,this.document=a,this.ci=c,this.li=h,this.hi=d,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=p=>Promise.resolve(),!gy.D())throw new j(O.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new vF(this,i),this.Ai=t+"main",this.serializer=new GC(l),this.Ri=new Kn(this.Ai,this.hi,new bF(this.serializer)),this.$r=new lF,this.Ur=new gF(this.referenceDelegate,this.serializer),this.remoteDocumentCache=tR(this.serializer),this.Gr=new aF,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,h===!1&&Ze("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new j(O.FAILED_PRECONDITION,$p);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Gt(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>zc(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(zi(e))return U("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return U("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return rl(e).get("owner").next(t=>N.resolve(this.vi(t)))}Ci(e){return zc(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const r=lt(t,"clientMetadata");return r.U().next(i=>{const s=this.xi(i,18e5),o=i.filter(a=>s.indexOf(a)===-1);return N.forEach(o,a=>r.delete(a.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?N.resolve(!0):rl(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new j(O.FAILED_PRECONDITION,$p);return!1}}return!(!this.networkEnabled||!this.inForeground)||zc(e).U().next(r=>this.xi(r,5e3).find(i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,a=this.networkEnabled===i.networkEnabled;if(s||o&&a)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&U("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new ag(e,Gt.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(r=>this.Mi(r.updateTimeMs,t)&&!this.Ni(r.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>zc(e).U().next(t=>this.xi(t,18e5).map(r=>r.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return pf.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new mF(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return ff.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,r){U("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=function(l){return l===17?vM:l===16?yM:l===15?ey:l===14?Yk:l===13?Qk:l===12?_M:l===11?Hk:void H()}(this.hi);let o;return this.Ri.runTransaction(e,i,s,a=>(o=new ag(a,this.Qr?this.Qr.next():Gt.oe),t==="readwrite-primary"?this.wi(o).next(l=>!!l||this.Si(o)).next(l=>{if(!l)throw Ze(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new j(O.FAILED_PRECONDITION,$k);return r(o)}).next(l=>this.Di(o).next(()=>l)):this.Ki(o).next(()=>r(o)))).then(a=>(o.raiseOnCommittedEvent(),a))}Ki(e){return rl(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new j(O.FAILED_PRECONDITION,$p)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return rl(e).put("owner",t)}static D(){return Kn.D()}bi(e){const t=rl(e);return t.get("owner").next(r=>this.vi(r)?(U("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):N.resolve())}Mi(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ze(`Detected an update time that is in the future: ${e} > ${r}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;qA()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const r=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return U("IndexedDbPersistence",`Client '${e}' ${r?"is":"is not"} zombied in LocalStorage`),r}catch(r){return Ze("IndexedDbPersistence","Failed to get zombied client id.",r),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Ze("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function rl(n){return lt(n,"owner")}function zc(n){return lt(n,"clientMetadata")}function _y(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=i}static Wi(e,t){let r=re(),i=re();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new yy(e,t.fromCache,r,i)}}/**
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
 */class NF{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class rR{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return qA()?8:Gk(at())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new NF;return this.Xi(e,t,o).next(a=>{if(s.result=a,this.zi)return this.es(e,t,o,a.size)})}).next(()=>s.result)}es(e,t,r,i){return r.documentReadCount<this.ji?(ao()<=ae.DEBUG&&U("QueryEngine","SDK will not create cache indexes for query:",lo(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),N.resolve()):(ao()<=ae.DEBUG&&U("QueryEngine","Query:",lo(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(ao()<=ae.DEBUG&&U("QueryEngine","The SDK decides to create cache indexes for query:",lo(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Dt(t))):N.resolve())}Yi(e,t){if(MI(t))return N.resolve(null);let r=Dt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=td(t,null,"F"),r=Dt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=re(...s);return this.Ji.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,r).next(l=>{const c=this.ts(t,a);return this.ns(t,c,o,l.readTime)?this.Yi(e,td(t,null,"F")):this.rs(e,c,t,l)}))})))}Zi(e,t,r,i){return MI(t)||i.isEqual(X.min())?N.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(t,s);return this.ns(t,o,r,i)?N.resolve(null):(ao()<=ae.DEBUG&&U("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),lo(t)),this.rs(e,o,t,Bk(i,-1)).next(a=>a))})}ts(e,t){let r=new Ee(mC(e));return t.forEach((i,s)=>{Lu(e,s)&&(r=r.add(s))}),r}ns(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,r){return ao()<=ae.DEBUG&&U("QueryEngine","Using full collection scan to execute query:",lo(t)),this.Ji.getDocumentsMatchingQuery(e,t,an.min(),r)}rs(e,t,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
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
 */class DF{constructor(e,t,r,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new Ge(ne),this._s=new Lr(s=>Ps(s),Vu),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nR(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function iR(n,e,t,r){return new DF(n,e,t,r)}async function sR(n,e){const t=$(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],a=[];let l=re();for(const c of i){o.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}for(const c of s){a.push(c.batchId);for(const h of c.mutations)l=l.add(h.key)}return t.localDocuments.getDocuments(r,l).next(c=>({hs:c,removedBatchIds:o,addedBatchIds:a}))})})}function VF(n,e){const t=$(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(a,l,c,h){const d=c.batch,p=d.keys();let _=N.resolve();return p.forEach(T=>{_=_.next(()=>h.getEntry(l,T)).next(C=>{const P=c.docVersions.get(T);Y(P!==null),C.version.compareTo(P)<0&&(d.applyToRemoteDocument(C,c),C.isValidDocument()&&(C.setReadTime(c.commitVersion),h.addEntry(C)))})}),_.next(()=>a.mutationQueue.removeMutationBatch(l,d))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let l=re();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(l=l.add(a.batch.mutations[c].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function oR(n){const e=$(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function OF(n,e){const t=$(n),r=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const a=[];e.targetChanges.forEach((h,d)=>{const p=i.get(d);if(!p)return;a.push(t.Ur.removeMatchingKeys(s,h.removedDocuments,d).next(()=>t.Ur.addMatchingKeys(s,h.addedDocuments,d)));let _=p.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(d)!==null?_=_.withResumeToken(Ke.EMPTY_BYTE_STRING,X.min()).withLastLimboFreeSnapshotVersion(X.min()):h.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(h.resumeToken,r)),i=i.insert(d,_),function(C,P,y){return C.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-C.snapshotVersion.toMicroseconds()>=3e8?!0:y.addedDocuments.size+y.modifiedDocuments.size+y.removedDocuments.size>0}(p,_,h)&&a.push(t.Ur.updateTargetData(s,_))});let l=Wt(),c=re();if(e.documentUpdates.forEach(h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(s,h))}),a.push(aR(s,o,e.documentUpdates).next(h=>{l=h.Ps,c=h.Is})),!r.isEqual(X.min())){const h=t.Ur.getLastRemoteSnapshotVersion(s).next(d=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,r));a.push(h)}return N.waitFor(a).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,c)).next(()=>l)}).then(s=>(t.os=i,s))}function aR(n,e,t){let r=re(),i=re();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=Wt();return t.forEach((a,l)=>{const c=s.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(a)),l.isNoDocument()&&l.version.isEqual(X.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):U("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{Ps:o,Is:i}})}function LF(n,e){const t=$(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function ta(n,e){const t=$(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.Ur.getTargetData(r,e).next(s=>s?(i=s,N.resolve(i)):t.Ur.allocateTargetId(r).next(o=>(i=new vr(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.os.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function na(n,e,t){const r=$(n),i=r.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!zi(o))throw o;U("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(i.target)}function ad(n,e,t){const r=$(n);let i=X.min(),s=re();return r.persistence.runTransaction("Execute query","readwrite",o=>function(l,c,h){const d=$(l),p=d._s.get(h);return p!==void 0?N.resolve(d.os.get(p)):d.Ur.getTargetData(c,h)}(r,o,Dt(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,a.targetId).next(l=>{s=l})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,t?i:X.min(),t?s:re())).next(a=>(cR(r,pC(e),a),{documents:a,Ts:s})))}function lR(n,e){const t=$(n),r=$(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>r.ot(s,e).next(o=>o?o.target:null))}function uR(n,e){const t=$(n),r=t.us.get(e)||X.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,Bk(r,-1),Number.MAX_SAFE_INTEGER)).then(i=>(cR(t,e,i),i))}function cR(n,e,t){let r=n.us.get(e)||X.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.us.set(e,r)}async function MF(n,e,t,r){const i=$(n);let s=re(),o=Wt();for(const c of t){const h=e.Es(c.metadata.name);c.document&&(s=s.add(h));const d=e.ds(c);d.setReadTime(e.As(c.metadata.readTime)),o=o.insert(h,d)}const a=i.cs.newChangeBuffer({trackRemovals:!0}),l=await ta(i,function(h){return Dt(ya(de.fromString(`__bundle__/docs/${h}`)))}(r));return i.persistence.runTransaction("Apply bundle documents","readwrite",c=>aR(c,a,o).next(h=>(a.apply(c),h)).next(h=>i.Ur.removeMatchingKeysForTargetId(c,l.targetId).next(()=>i.Ur.addMatchingKeys(c,s,l.targetId)).next(()=>i.localDocuments.getLocalViewOfDocuments(c,h.Ps,h.Is)).next(()=>h.Ps)))}async function FF(n,e,t=re()){const r=await ta(n,Dt(hy(e.bundledQuery))),i=$(n);return i.persistence.runTransaction("Save named query","readwrite",s=>{const o=et(e.readTime);if(r.snapshotVersion.compareTo(o)>=0)return i.Gr.saveNamedQuery(s,e);const a=r.withResumeToken(Ke.EMPTY_BYTE_STRING,o);return i.os=i.os.insert(a.targetId,a),i.Ur.updateTargetData(s,a).next(()=>i.Ur.removeMatchingKeysForTargetId(s,r.targetId)).next(()=>i.Ur.addMatchingKeys(s,t,r.targetId)).next(()=>i.Gr.saveNamedQuery(s,e))})}function dT(n,e){return`firestore_clients_${n}_${e}`}function fT(n,e,t){let r=`firestore_mutations_${n}_${t}`;return e.isAuthenticated()&&(r+=`_${e.uid}`),r}function qp(n,e){return`firestore_targets_${n}_${e}`}class ld{constructor(e,t,r,i){this.user=e,this.batchId=t,this.state=r,this.error=i}static Rs(e,t,r){const i=JSON.parse(r);let s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new j(i.error.code,i.error.message))),o?new ld(e,t,i.state,s):(Ze("SharedClientState",`Failed to parse mutation state for ID '${t}': ${r}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Dl{constructor(e,t,r){this.targetId=e,this.state=t,this.error=r}static Rs(e,t){const r=JSON.parse(t);let i,s=typeof r=="object"&&["not-current","current","rejected"].indexOf(r.state)!==-1&&(r.error===void 0||typeof r.error=="object");return s&&r.error&&(s=typeof r.error.message=="string"&&typeof r.error.code=="string",s&&(i=new j(r.error.code,r.error.message))),s?new Dl(e,r.state,i):(Ze("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ud{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const r=JSON.parse(t);let i=typeof r=="object"&&r.activeTargetIds instanceof Array,s=ry();for(let o=0;i&&o<r.activeTargetIds.length;++o)i=Kk(r.activeTargetIds[o]),s=s.add(r.activeTargetIds[o]);return i?new ud(e,s):(Ze("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class vy{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new vy(t.clientId,t.onlineState):(Ze("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Ig{constructor(){this.activeTargetIds=ry()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Gp{constructor(e,t,r,i,s){this.window=e,this.ui=t,this.persistenceKey=r,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new Ge(ne),this.started=!1,this.bs=[];const o=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=dT(this.persistenceKey,this.ps),this.vs=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Ig),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.Os=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const r of e){if(r===this.ps)continue;const i=this.getItem(dT(this.persistenceKey,r));if(i){const s=ud.Rs(r,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const r=this.Ls(t);r&&this.Bs(r)}for(const r of this.bs)this.ws(r);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((r,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,r){this.qs(e,t,r),this.Qs(e)}addLocalQueryTarget(e,t=!0){let r="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(qp(this.persistenceKey,e));if(i){const s=Dl.Rs(e,i);s&&(r=s.state)}}return t&&this.Ks.fs(e),this.Ns(),r}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(qp(this.persistenceKey,e))}updateQueryState(e,t,r){this.$s(e,t,r)}handleUserChange(e,t,r){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,r.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return U("SharedClientState","READ",e,t),t}setItem(e,t){U("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){U("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(U("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void Ze("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const r=this.Gs(t.key);return this.zs(r,null)}{const r=this.js(t.key,t.newValue);if(r)return this.zs(r.clientId,r)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const r=this.Hs(t.key,t.newValue);if(r)return this.Js(r)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const r=this.Ys(t.key,t.newValue);if(r)return this.Zs(r)}}else if(t.key===this.xs){if(t.newValue!==null){const r=this.Ls(t.newValue);if(r)return this.Bs(r)}}else if(t.key===this.vs){const r=function(s){let o=Gt.oe;if(s!=null)try{const a=JSON.parse(s);Y(typeof a=="number"),o=a}catch(a){Ze("SharedClientState","Failed to read sequence number from WebStorage",a)}return o}(t.newValue);r!==Gt.oe&&this.sequenceNumberHandler(r)}else if(t.key===this.Os){const r=this.Xs(t.newValue);await Promise.all(r.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,r){const i=new ld(this.currentUser,e,t,r),s=fT(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){const t=fT(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,r){const i=qp(this.persistenceKey,e),s=new Dl(e,t,r);this.setItem(i,s.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const r=this.Gs(e);return ud.Rs(r,t)}Hs(e,t){const r=this.Fs.exec(e),i=Number(r[1]),s=r[2]!==void 0?r[2]:null;return ld.Rs(new dt(s),i,t)}Ys(e,t){const r=this.Ms.exec(e),i=Number(r[1]);return Dl.Rs(i,t)}Ls(e){return vy.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);U("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const r=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(r),o=[],a=[];return s.forEach(l=>{i.has(l)||o.push(l)}),i.forEach(l=>{s.has(l)||a.push(l)}),this.syncEngine.io(o,a).then(()=>{this.Ss=r})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=ry();return e.forEach((r,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class hR{constructor(){this.so=new Ig,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ig,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class jF{_o(e){}shutdown(){}}/**
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
 */class pT{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){U("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){U("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let $c=null;function Kp(){return $c===null?$c=function(){return 268435456+Math.round(2147483648*Math.random())}():$c++,"0x"+$c.toString(16)}/**
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
 */const UF={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BF{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="WebChannelConnection";class zF extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,r,i,s,o){const a=Kp(),l=this.xo(t,r.toUriEncodedString());U("RestConnection",`Sending RPC '${t}' ${a}:`,l,i);const c={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(c,s,o),this.No(t,l,c,i).then(h=>(U("RestConnection",`Received RPC '${t}' ${a}: `,h),h),h=>{throw on("RestConnection",`RPC '${t}' ${a} failed with error: `,h,"url: ",l,"request:",i),h})}Lo(t,r,i,s,o,a){return this.Mo(t,r,i,s,o)}Oo(t,r,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+_a}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,r){const i=UF[t];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,i){const s=Kp();return new Promise((o,a)=>{const l=new Nk;l.setWithCredentials(!0),l.listenOnce(Dk.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ch.NO_ERROR:const h=l.getResponseJson();U(Rt,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(h)),o(h);break;case ch.TIMEOUT:U(Rt,`RPC '${e}' ${s} timed out`),a(new j(O.DEADLINE_EXCEEDED,"Request time out"));break;case ch.HTTP_ERROR:const d=l.getStatus();if(U(Rt,`RPC '${e}' ${s} failed with status:`,d,"response text:",l.getResponseText()),d>0){let p=l.getResponseJson();Array.isArray(p)&&(p=p[0]);const _=p==null?void 0:p.error;if(_&&_.status&&_.message){const T=function(P){const y=P.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(y)>=0?y:O.UNKNOWN}(_.status);a(new j(T,_.message))}else a(new j(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new j(O.UNAVAILABLE,"Connection failed."));break;default:H()}}finally{U(Rt,`RPC '${e}' ${s} completed.`)}});const c=JSON.stringify(i);U(Rt,`RPC '${e}' ${s} sending request:`,i),l.send(t,"POST",c,r,15)})}Bo(e,t,r){const i=Kp(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Lk(),a=Ok(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Oo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const h=s.join("");U(Rt,`Creating RPC '${e}' stream ${i}: ${h}`,l);const d=o.createWebChannel(h,l);let p=!1,_=!1;const T=new BF({Io:P=>{_?U(Rt,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(p||(U(Rt,`Opening RPC '${e}' stream ${i} transport.`),d.open(),p=!0),U(Rt,`RPC '${e}' stream ${i} sending:`,P),d.send(P))},To:()=>d.close()}),C=(P,y,I)=>{P.listen(y,S=>{try{I(S)}catch(D){setTimeout(()=>{throw D},0)}})};return C(d,ml.EventType.OPEN,()=>{_||(U(Rt,`RPC '${e}' stream ${i} transport opened.`),T.yo())}),C(d,ml.EventType.CLOSE,()=>{_||(_=!0,U(Rt,`RPC '${e}' stream ${i} transport closed`),T.So())}),C(d,ml.EventType.ERROR,P=>{_||(_=!0,on(Rt,`RPC '${e}' stream ${i} transport errored:`,P),T.So(new j(O.UNAVAILABLE,"The operation could not be completed")))}),C(d,ml.EventType.MESSAGE,P=>{var y;if(!_){const I=P.data[0];Y(!!I);const S=I,D=S.error||((y=S[0])===null||y===void 0?void 0:y.error);if(D){U(Rt,`RPC '${e}' stream ${i} received error:`,D);const F=D.status;let M=function(E){const R=tt[E];if(R!==void 0)return PC(R)}(F),k=D.message;M===void 0&&(M=O.INTERNAL,k="Unknown error status: "+F+" with message "+D.message),_=!0,T.So(new j(M,k)),d.close()}else U(Rt,`RPC '${e}' stream ${i} received:`,I),T.bo(I)}}),C(a,Vk.STAT_EVENT,P=>{P.stat===sg.PROXY?U(Rt,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===sg.NOPROXY&&U(Rt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{T.wo()},0),T}}/**
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
 */function dR(){return typeof window<"u"?window:null}function _h(){return typeof document<"u"?document:null}/**
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
 */function Uu(n){return new YM(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e,t,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-r);i>0&&U("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fR{constructor(e,t,r,i,s,o,a,l){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new wy(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===O.RESOURCE_EXHAUSTED?(Ze(t.toString()),Ze("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===t&&this.P_(r,i)},r=>{e(()=>{const i=new j(O.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return U("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(U("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $F extends fR{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=ZM(this.serializer,e),r=function(s){if(!("targetChange"in s))return X.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?X.min():o.readTime?et(o.readTime):X.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=_g(this.serializer),t.addTarget=function(s,o){let a;const l=o.target;if(a=Zh(l)?{documents:jC(s,l)}:{query:df(s,l)._t},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=DC(s,o.resumeToken);const c=mg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(X.min())>0){a.readTime=ea(s,o.snapshotVersion.toTimestamp());const c=mg(s,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,e);const r=tF(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=_g(this.serializer),t.removeTarget=e,this.a_(t)}}class qF extends fR{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=eF(e.writeResults,e.commitTime),r=et(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=_g(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>pu(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GF extends class{}{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,gg(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new j(O.UNKNOWN,s.toString())})}Lo(e,t,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Lo(e,gg(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new j(O.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class KF{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ze(t),this.D_=!1):U("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WF{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{qi(this)&&(U("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=$(l);c.L_.add(4),await Ea(c),c.q_.set("Unknown"),c.L_.delete(4),await Bu(c)}(this))})}),this.q_=new KF(r,i)}}async function Bu(n){if(qi(n))for(const e of n.B_)await e(!0)}async function Ea(n){for(const e of n.B_)await e(!1)}function gf(n,e){const t=$(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Ty(t)?Iy(t):Ta(t).r_()&&Ey(t,e))}function ra(n,e){const t=$(n),r=Ta(t);t.N_.delete(e),r.r_()&&pR(t,e),t.N_.size===0&&(r.r_()?r.o_():qi(t)&&t.q_.set("Unknown"))}function Ey(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(X.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ta(n).A_(e)}function pR(n,e){n.Q_.xe(e),Ta(n).R_(e)}function Iy(n){n.Q_=new KM({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),Ta(n).start(),n.q_.v_()}function Ty(n){return qi(n)&&!Ta(n).n_()&&n.N_.size>0}function qi(n){return $(n).L_.size===0}function mR(n){n.Q_=void 0}async function HF(n){n.q_.set("Online")}async function QF(n){n.N_.forEach((e,t)=>{Ey(n,e)})}async function YF(n,e){mR(n),Ty(n)?(n.q_.M_(e),Iy(n)):n.q_.set("Unknown")}async function JF(n,e,t){if(n.q_.set("Online"),e instanceof NC&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const a of s.targetIds)i.N_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.N_.delete(a),i.Q_.removeTarget(a))}(n,e)}catch(r){U("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await cd(n,r)}else if(e instanceof gh?n.Q_.Ke(e):e instanceof bC?n.Q_.He(e):n.Q_.We(e),!t.isEqual(X.min()))try{const r=await oR(n.localStore);t.compareTo(r)>=0&&await function(s,o){const a=s.Q_.rt(o);return a.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const h=s.N_.get(c);h&&s.N_.set(c,h.withResumeToken(l.resumeToken,o))}}),a.targetMismatches.forEach((l,c)=>{const h=s.N_.get(l);if(!h)return;s.N_.set(l,h.withResumeToken(Ke.EMPTY_BYTE_STRING,h.snapshotVersion)),pR(s,l);const d=new vr(h.target,l,c,h.sequenceNumber);Ey(s,d)}),s.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(r){U("RemoteStore","Failed to raise snapshot:",r),await cd(n,r)}}async function cd(n,e,t){if(!zi(e))throw e;n.L_.add(1),await Ea(n),n.q_.set("Offline"),t||(t=()=>oR(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{U("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Bu(n)})}function gR(n,e){return e().catch(t=>cd(n,t,e))}async function Ia(n){const e=$(n),t=Pi(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;XF(e);)try{const i=await LF(e.localStore,r);if(i===null){e.O_.length===0&&t.o_();break}r=i.batchId,ZF(e,i)}catch(i){await cd(e,i)}_R(e)&&yR(e)}function XF(n){return qi(n)&&n.O_.length<10}function ZF(n,e){n.O_.push(e);const t=Pi(n);t.r_()&&t.V_&&t.m_(e.mutations)}function _R(n){return qi(n)&&!Pi(n).n_()&&n.O_.length>0}function yR(n){Pi(n).start()}async function e2(n){Pi(n).p_()}async function t2(n){const e=Pi(n);for(const t of n.O_)e.m_(t.mutations)}async function n2(n,e,t){const r=n.O_.shift(),i=ay.from(r,e,t);await gR(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ia(n)}async function r2(n,e){e&&Pi(n).V_&&await async function(r,i){if(function(o){return RC(o)&&o!==O.ABORTED}(i.code)){const s=r.O_.shift();Pi(r).s_(),await gR(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Ia(r)}}(n,e),_R(n)&&yR(n)}async function mT(n,e){const t=$(n);t.asyncQueue.verifyOperationInProgress(),U("RemoteStore","RemoteStore received new credentials");const r=qi(t);t.L_.add(3),await Ea(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Bu(t)}async function Tg(n,e){const t=$(n);e?(t.L_.delete(2),await Bu(t)):e||(t.L_.add(2),await Ea(t),t.q_.set("Unknown"))}function Ta(n){return n.K_||(n.K_=function(t,r,i){const s=$(t);return s.w_(),new $F(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:HF.bind(null,n),Ro:QF.bind(null,n),mo:YF.bind(null,n),d_:JF.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),Ty(n)?Iy(n):n.q_.set("Unknown")):(await n.K_.stop(),mR(n))})),n.K_}function Pi(n){return n.U_||(n.U_=function(t,r,i){const s=$(t);return s.w_(),new qF(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:e2.bind(null,n),mo:r2.bind(null,n),f_:t2.bind(null,n),g_:n2.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Ia(n)):(await n.U_.stop(),n.O_.length>0&&(U("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const o=Date.now()+r,a=new Sy(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(O.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Sa(n,e){if(Ze("AsyncQueue",`${e}: ${n}`),zi(n))return new j(O.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e){this.comparator=e?(t,r)=>e(t,r)||K.comparator(t.key,r.key):(t,r)=>K.comparator(t.key,r.key),this.keyedMap=gl(),this.sortedSet=new Ge(this.comparator)}static emptySet(e){return new Oo(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Oo)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Oo;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(){this.W_=new Ge(K.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):H():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class ia{constructor(e,t,r,i,s,o,a,l,c){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,t,r,i,s){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new ia(e,t,Oo.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ou(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class s2{constructor(){this.queries=_T(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const i=$(t),s=i.queries;i.queries=_T(),s.forEach((o,a)=>{for(const l of a.j_)l.onError(r)})})(this,new j(O.ABORTED,"Firestore shutting down"))}}function _T(){return new Lr(n=>fC(n),Ou)}async function Ay(n,e){const t=$(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(r=2):(s=new i2,r=e.J_()?0:1);try{switch(r){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const a=Sa(o,`Initialization of query '${lo(e.query)}' failed`);return void e.onError(a)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&Cy(t)}async function ky(n,e){const t=$(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function o2(n,e){const t=$(n);let r=!1;for(const i of e){const s=i.query,o=t.queries.get(s);if(o){for(const a of o.j_)a.X_(i)&&(r=!0);o.z_=i}}r&&Cy(t)}function a2(n,e,t){const r=$(n),i=r.queries.get(e);if(i)for(const s of i.j_)s.onError(t);r.queries.delete(e)}function Cy(n){n.Y_.forEach(e=>{e.next()})}var Sg,yT;(yT=Sg||(Sg={})).ea="default",yT.Cache="cache";class Ry{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ia(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=ia.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Sg.Cache}}/**
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
 */class l2{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
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
 */class vT{constructor(e){this.serializer=e}Es(e){return Wn(this.serializer,e)}ds(e){return e.metadata.exists?FC(this.serializer,e.document,!1):Ne.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return et(e)}}class u2{constructor(e,t,r){this.ca=e,this.localStore=t,this.serializer=r,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=vR(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const r=de.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(r.get(r.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,r=new vT(this.serializer);for(const i of e)if(i.metadata.queries){const s=r.Es(i.metadata.name);for(const o of i.metadata.queries){const a=(t.get(o)||re()).add(s);t.set(o,a)}}return t}async complete(){const e=await MF(this.localStore,new vT(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const r of this.queries)await FF(this.localStore,r,t.get(r.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function vR(n){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:n.totalDocuments,totalBytes:n.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wR{constructor(e){this.key=e}}class ER{constructor(e){this.key=e}}class IR{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=re(),this.mutatedKeys=re(),this.Aa=mC(e),this.Ra=new Oo(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new gT,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((h,d)=>{const p=i.get(h),_=Lu(this.query,d)?d:null,T=!!p&&this.mutatedKeys.has(p.key),C=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let P=!1;p&&_?p.data.isEqual(_.data)?T!==C&&(r.track({type:3,doc:_}),P=!0):this.ga(p,_)||(r.track({type:2,doc:_}),P=!0,(l&&this.Aa(_,l)>0||c&&this.Aa(_,c)<0)&&(a=!0)):!p&&_?(r.track({type:0,doc:_}),P=!0):p&&!_&&(r.track({type:1,doc:p}),P=!0,(l||c)&&(a=!0)),P&&(_?(o=o.add(_),s=C?s.add(h):s.delete(h)):(o=o.delete(h),s=s.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),s=s.delete(h.key),r.track({type:1,doc:h})}return{Ra:o,fa:r,ns:a,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((h,d)=>function(_,T){const C=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return H()}};return C(_)-C(T)}(h.type,d.type)||this.Aa(h.doc,d.doc)),this.pa(r),i=i!=null&&i;const a=t&&!i?this.ya():[],l=this.da.size===0&&this.current&&!i?1:0,c=l!==this.Ea;return this.Ea=l,o.length!==0||c?{snapshot:new ia(this.query,e.Ra,s,o,e.mutatedKeys,l===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:a}:{wa:a}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new gT,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=re(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new ER(r))}),this.da.forEach(r=>{e.has(r)||t.push(new wR(r))}),t}ba(e){this.Ta=e.Ts,this.da=re();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return ia.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class c2{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class h2{constructor(e){this.key=e,this.va=!1}}class d2{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new Lr(a=>fC(a),Ou),this.Ma=new Map,this.xa=new Set,this.Oa=new Ge(K.comparator),this.Na=new Map,this.La=new py,this.Ba={},this.ka=new Map,this.qa=Vs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function f2(n,e,t=!0){const r=_f(n);let i;const s=r.Fa.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await TR(r,e,t,!0),i}async function p2(n,e){const t=_f(n);await TR(t,e,!0,!1)}async function TR(n,e,t,r){const i=await ta(n.localStore,Dt(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t);let a;return r&&(a=await Py(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&gf(n.remoteStore,i),a}async function Py(n,e,t,r,i){n.Ka=(d,p,_)=>async function(C,P,y,I){let S=P.view.ma(y);S.ns&&(S=await ad(C.localStore,P.query,!1).then(({documents:k})=>P.view.ma(k,S)));const D=I&&I.targetChanges.get(P.targetId),F=I&&I.targetMismatches.get(P.targetId)!=null,M=P.view.applyChanges(S,C.isPrimaryClient,D,F);return Ag(C,P.targetId,M.wa),M.snapshot}(n,d,p,_);const s=await ad(n.localStore,e,!0),o=new IR(e,s.Ts),a=o.ma(s.documents),l=ju.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),c=o.applyChanges(a,n.isPrimaryClient,l);Ag(n,t,c.wa);const h=new c2(e,t,o);return n.Fa.set(e,h),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),c.snapshot}async function m2(n,e,t){const r=$(n),i=r.Fa.get(e),s=r.Ma.get(i.targetId);if(s.length>1)return r.Ma.set(i.targetId,s.filter(o=>!Ou(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await na(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&ra(r.remoteStore,i.targetId),sa(r,i.targetId)}).catch(Bi)):(sa(r,i.targetId),await na(r.localStore,i.targetId,!0))}async function g2(n,e){const t=$(n),r=t.Fa.get(e),i=t.Ma.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),ra(t.remoteStore,r.targetId))}async function _2(n,e,t){const r=Dy(n);try{const i=await function(o,a){const l=$(o),c=je.now(),h=a.reduce((_,T)=>_.add(T.key),re());let d,p;return l.persistence.runTransaction("Locally write mutations","readwrite",_=>{let T=Wt(),C=re();return l.cs.getEntries(_,h).next(P=>{T=P,T.forEach((y,I)=>{I.isValidDocument()||(C=C.add(y))})}).next(()=>l.localDocuments.getOverlayedDocuments(_,T)).next(P=>{d=P;const y=[];for(const I of a){const S=$M(I,d.get(I.key).overlayedDocument);S!=null&&y.push(new Mr(I.key,S,nC(S.value.mapValue),Fe.exists(!0)))}return l.mutationQueue.addMutationBatch(_,c,y,a)}).next(P=>{p=P;const y=P.applyToLocalDocumentSet(d,C);return l.documentOverlayCache.saveOverlays(_,P.batchId,y)})}).then(()=>({batchId:p.batchId,changes:_C(d)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,a,l){let c=o.Ba[o.currentUser.toKey()];c||(c=new Ge(ne)),c=c.insert(a,l),o.Ba[o.currentUser.toKey()]=c}(r,i.batchId,t),await Fr(r,i.changes),await Ia(r.remoteStore)}catch(i){const s=Sa(i,"Failed to persist write");t.reject(s)}}async function SR(n,e){const t=$(n);try{const r=await OF(t.localStore,e);e.targetChanges.forEach((i,s)=>{const o=t.Na.get(s);o&&(Y(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?Y(o.va):i.removedDocuments.size>0&&(Y(o.va),o.va=!1))}),await Fr(t,r,e)}catch(r){await Bi(r)}}function wT(n,e,t){const r=$(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Fa.forEach((s,o)=>{const a=o.view.Z_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const l=$(o);l.onlineState=a;let c=!1;l.queries.forEach((h,d)=>{for(const p of d.j_)p.Z_(a)&&(c=!0)}),c&&Cy(l)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function y2(n,e,t){const r=$(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Na.get(e),s=i&&i.key;if(s){let o=new Ge(K.comparator);o=o.insert(s,Ne.newNoDocument(s,X.min()));const a=re().add(s),l=new Fu(X.min(),new Map,new Ge(ne),o,a);await SR(r,l),r.Oa=r.Oa.remove(s),r.Na.delete(e),Ny(r)}else await na(r.localStore,e,!1).then(()=>sa(r,e,t)).catch(Bi)}async function v2(n,e){const t=$(n),r=e.batch.batchId;try{const i=await VF(t.localStore,e);by(t,r,null),xy(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Fr(t,i)}catch(i){await Bi(i)}}async function w2(n,e,t){const r=$(n);try{const i=await function(o,a){const l=$(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let h;return l.mutationQueue.lookupMutationBatch(c,a).next(d=>(Y(d!==null),h=d.keys(),l.mutationQueue.removeMutationBatch(c,d))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,h,a)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,h)).next(()=>l.localDocuments.getDocuments(c,h))})}(r.localStore,e);by(r,e,t),xy(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Fr(r,i)}catch(i){await Bi(i)}}async function E2(n,e){const t=$(n);qi(t.remoteStore)||U("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const r=await function(o){const a=$(o);return a.persistence.runTransaction("Get highest unacknowledged batch id","readonly",l=>a.mutationQueue.getHighestUnacknowledgedBatchId(l))}(t.localStore);if(r===-1)return void e.resolve();const i=t.ka.get(r)||[];i.push(e),t.ka.set(r,i)}catch(r){const i=Sa(r,"Initialization of waitForPendingWrites() operation failed");e.reject(i)}}function xy(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function by(n,e,t){const r=$(n);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}function sa(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||AR(n,r)})}function AR(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(ra(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),Ny(n))}function Ag(n,e,t){for(const r of t)r instanceof wR?(n.La.addReference(r.key,e),I2(n,r)):r instanceof ER?(U("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||AR(n,r.key)):H()}function I2(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(U("SyncEngine","New document in limbo: "+t),n.xa.add(r),Ny(n))}function Ny(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new K(de.fromString(e)),r=n.qa.next();n.Na.set(r,new h2(t)),n.Oa=n.Oa.insert(t,r),gf(n.remoteStore,new vr(Dt(ya(t.path)),r,"TargetPurposeLimboResolution",Gt.oe))}}async function Fr(n,e,t){const r=$(n),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((a,l)=>{o.push(r.Ka(l,e,t).then(c=>{var h;if((c||t)&&r.isPrimaryClient){const d=c?!c.fromCache:(h=t==null?void 0:t.targetChanges.get(l.targetId))===null||h===void 0?void 0:h.current;r.sharedClientState.updateQueryState(l.targetId,d?"current":"not-current")}if(c){i.push(c);const d=yy.Wi(l.targetId,c);s.push(d)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(l,c){const h=$(l);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>N.forEach(c,p=>N.forEach(p.$i,_=>h.persistence.referenceDelegate.addReference(d,p.targetId,_)).next(()=>N.forEach(p.Ui,_=>h.persistence.referenceDelegate.removeReference(d,p.targetId,_)))))}catch(d){if(!zi(d))throw d;U("LocalStore","Failed to update sequence numbers: "+d)}for(const d of c){const p=d.targetId;if(!d.fromCache){const _=h.os.get(p),T=_.snapshotVersion,C=_.withLastLimboFreeSnapshotVersion(T);h.os=h.os.insert(p,C)}}}(r.localStore,s))}async function T2(n,e){const t=$(n);if(!t.currentUser.isEqual(e)){U("SyncEngine","User change. New user:",e.toKey());const r=await sR(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(a=>{a.forEach(l=>{l.reject(new j(O.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Fr(t,r.hs)}}function S2(n,e){const t=$(n),r=t.Na.get(e);if(r&&r.va)return re().add(r.key);{let i=re();const s=t.Ma.get(e);if(!s)return i;for(const o of s){const a=t.Fa.get(o);i=i.unionWith(a.view.Va)}return i}}async function A2(n,e){const t=$(n),r=await ad(t.localStore,e.query,!0),i=e.view.ba(r);return t.isPrimaryClient&&Ag(t,e.targetId,i.wa),i}async function k2(n,e){const t=$(n);return uR(t.localStore,e).then(r=>Fr(t,r))}async function C2(n,e,t,r){const i=$(n),s=await function(a,l){const c=$(a),h=$(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",d=>h.Mn(d,l).next(p=>p?c.localDocuments.getDocuments(d,p):N.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await Ia(i.remoteStore):t==="acknowledged"||t==="rejected"?(by(i,e,r||null),xy(i,e),function(a,l){$($(a).mutationQueue).On(l)}(i.localStore,e)):H(),await Fr(i,s)):U("SyncEngine","Cannot apply mutation batch with id: "+e)}async function R2(n,e){const t=$(n);if(_f(t),Dy(t),e===!0&&t.Qa!==!0){const r=t.sharedClientState.getAllActiveQueryTargets(),i=await ET(t,r.toArray());t.Qa=!0,await Tg(t.remoteStore,!0);for(const s of i)gf(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){const r=[];let i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?r.push(o):i=i.then(()=>(sa(t,o),na(t.localStore,o,!0))),ra(t.remoteStore,o)}),await i,await ET(t,r),function(o){const a=$(o);a.Na.forEach((l,c)=>{ra(a.remoteStore,c)}),a.La.pr(),a.Na=new Map,a.Oa=new Ge(K.comparator)}(t),t.Qa=!1,await Tg(t.remoteStore,!1)}}async function ET(n,e,t){const r=$(n),i=[],s=[];for(const o of e){let a;const l=r.Ma.get(o);if(l&&l.length!==0){a=await ta(r.localStore,Dt(l[0]));for(const c of l){const h=r.Fa.get(c),d=await A2(r,h);d.snapshot&&s.push(d.snapshot)}}else{const c=await lR(r.localStore,o);a=await ta(r.localStore,c),await Py(r,kR(c),o,!1,a.resumeToken)}i.push(a)}return r.Ca.d_(s),i}function kR(n){return cC(n.path,n.collectionGroup,n.orderBy,n.filters,n.limit,"F",n.startAt,n.endAt)}function P2(n){return function(t){return $($(t).persistence).Qi()}($(n).localStore)}async function x2(n,e,t,r){const i=$(n);if(i.Qa)return void U("SyncEngine","Ignoring unexpected query state notification.");const s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{const o=await uR(i.localStore,pC(s[0])),a=Fu.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ke.EMPTY_BYTE_STRING);await Fr(i,o,a);break}case"rejected":await na(i.localStore,e,!0),sa(i,e,r);break;default:H()}}async function b2(n,e,t){const r=_f(n);if(r.Qa){for(const i of e){if(r.Ma.has(i)&&r.sharedClientState.isActiveQueryTarget(i)){U("SyncEngine","Adding an already active target "+i);continue}const s=await lR(r.localStore,i),o=await ta(r.localStore,s);await Py(r,kR(s),o.targetId,!1,o.resumeToken),gf(r.remoteStore,o)}for(const i of t)r.Ma.has(i)&&await na(r.localStore,i,!1).then(()=>{ra(r.remoteStore,i),sa(r,i)}).catch(Bi)}}function _f(n){const e=$(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=SR.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=S2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=y2.bind(null,e),e.Ca.d_=o2.bind(null,e.eventManager),e.Ca.$a=a2.bind(null,e.eventManager),e}function Dy(n){const e=$(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=v2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=w2.bind(null,e),e}function N2(n,e,t){const r=$(n);(async function(s,o,a){try{const l=await o.getMetadata();if(await function(_,T){const C=$(_),P=et(T.createTime);return C.persistence.runTransaction("hasNewerBundle","readonly",y=>C.Gr.getBundleMetadata(y,T.id)).then(y=>!!y&&y.createTime.compareTo(P)>=0)}(s.localStore,l))return await o.close(),a._completeWith(function(_){return{taskState:"Success",documentsLoaded:_.totalDocuments,bytesLoaded:_.totalBytes,totalDocuments:_.totalDocuments,totalBytes:_.totalBytes}}(l)),Promise.resolve(new Set);a._updateProgress(vR(l));const c=new u2(l,s.localStore,o.serializer);let h=await o.Ua();for(;h;){const p=await c.la(h);p&&a._updateProgress(p),h=await o.Ua()}const d=await c.complete();return await Fr(s,d.Ia,void 0),await function(_,T){const C=$(_);return C.persistence.runTransaction("Save bundle","readwrite",P=>C.Gr.saveBundleMetadata(P,T))}(s.localStore,l),a._completeWith(d.progress),Promise.resolve(d.Pa)}catch(l){return on("SyncEngine",`Loading bundle failed with ${l}`),a._failWith(l),Promise.resolve(new Set)}})(r,e,t).then(i=>{r.sharedClientState.notifyBundleLoaded(i)})}class xi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Uu(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return iR(this.persistence,new rR,e.initialUser,this.serializer)}Ga(e){return new my(mf.Zr,this.serializer)}Wa(e){return new hR}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}xi.provider={build:()=>new xi};class D2 extends xi{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){Y(this.persistence.referenceDelegate instanceof od);const r=this.persistence.referenceDelegate.garbageCollector;return new XC(r,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?Pt.withCacheSize(this.cacheSizeBytes):Pt.DEFAULT;return new my(r=>od.Zr(r,t),this.serializer)}}class Vy extends xi{constructor(e,t,r){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Dy(this.Ja.syncEngine),await Ia(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return iR(this.persistence,new rR,e.initialUser,this.serializer)}ja(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new XC(r,e.asyncQueue,t)}Ha(e,t){const r=new eM(t,this.persistence);return new ZL(e.asyncQueue,r)}Ga(e){const t=_y(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Pt.withCacheSize(this.cacheSizeBytes):Pt.DEFAULT;return new gy(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,dR(),_h(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new hR}}class CR extends Vy{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Gp&&(this.sharedClientState.syncEngine={no:C2.bind(null,t),ro:x2.bind(null,t),io:b2.bind(null,t),Qi:P2.bind(null,t),eo:k2.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async r=>{await R2(this.Ja.syncEngine,r),this.gcScheduler&&(r&&!this.gcScheduler.started?this.gcScheduler.start():r||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(r&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():r||this.indexBackfillerScheduler.stop())})}Wa(e){const t=dR();if(!Gp.D(t))throw new j(O.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const r=_y(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Gp(t,e.asyncQueue,r,e.clientId,e.initialUser)}}class bi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wT(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=T2.bind(null,this.syncEngine),await Tg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new s2}()}createDatastore(e){const t=Uu(e.databaseInfo.databaseId),r=function(s){return new zF(s)}(e.databaseInfo);return function(s,o,a,l){return new GF(s,o,a,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,a){return new WF(r,i,s,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>wT(this.syncEngine,t,0),function(){return pT.D()?new pT:new jF}())}createSyncEngine(e,t){return function(i,s,o,a,l,c,h){const d=new d2(i,s,o,a,l,c);return h&&(d.Qa=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=$(i);U("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Ea(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}bi.provider={build:()=>new bi};function IT(n,e=10240){let t=0;return{async read(){if(t<n.byteLength){const r={value:n.slice(t,t+e),done:!1};return t+=e,r}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
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
 */class yf{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ze("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class V2{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new gt,this.buffer=new Uint8Array,this.eu=function(){return new TextDecoder("utf-8")}(),this.tu().then(r=>{r&&r.ua()?this.metadata.resolve(r.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(r==null?void 0:r.aa)}`))},r=>this.metadata.reject(r))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),r=Number(t);isNaN(r)&&this.ru(`length string (${t}) is not valid number`);const i=await this.iu(r);return new l2(JSON.parse(i),e.length+r)}su(){return this.buffer.findIndex(e=>e===123)}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O2{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new j(O.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(i,s){const o=$(i),a={documents:s.map(d=>fu(o.serializer,d))},l=await o.Lo("BatchGetDocuments",o.serializer.databaseId,de.emptyPath(),a,s.length),c=new Map;l.forEach(d=>{const p=XM(o.serializer,d);c.set(p.key.toString(),p)});const h=[];return s.forEach(d=>{const p=c.get(d.toString());Y(!!p),h.push(p)}),h}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new wa(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{const i=K.fromPath(r);this.mutations.push(new sy(i,this.precondition(i)))}),await async function(r,i){const s=$(r),o={writes:i.map(a=>pu(s.serializer,a))};await s.Mo("Commit",s.serializer.databaseId,de.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw H();t=X.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new j(O.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(X.min())?Fe.exists(!1):Fe.updateTime(t):Fe.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(X.min()))throw new j(O.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Fe.updateTime(t)}return Fe.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class L2{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this._u=r.maxAttempts,this.t_=new wy(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new O2(this.datastore),t=this.cu(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.lu(i)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const t=this.updateFunction(e);return!Du(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!RC(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M2{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=dt.UNAUTHENTICATED,this.clientId=J_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{U("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(U("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new gt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Sa(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Wp(n,e){n.asyncQueue.verifyOperationInProgress(),U("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await sR(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function TT(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Oy(n);U("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>mT(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>mT(e.remoteStore,i)),n._onlineComponents=e}async function Oy(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){U("FirestoreClient","Using user provided OfflineComponentProvider");try{await Wp(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===O.FAILED_PRECONDITION||i.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;on("Error using user provided cache. Falling back to memory cache: "+t),await Wp(n,new xi)}}else U("FirestoreClient","Using default OfflineComponentProvider"),await Wp(n,new xi);return n._offlineComponents}async function vf(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(U("FirestoreClient","Using user provided OnlineComponentProvider"),await TT(n,n._uninitializedComponentsProvider._online)):(U("FirestoreClient","Using default OnlineComponentProvider"),await TT(n,new bi))),n._onlineComponents}function RR(n){return Oy(n).then(e=>e.persistence)}function Aa(n){return Oy(n).then(e=>e.localStore)}function PR(n){return vf(n).then(e=>e.remoteStore)}function Ly(n){return vf(n).then(e=>e.syncEngine)}function xR(n){return vf(n).then(e=>e.datastore)}async function oa(n){const e=await vf(n),t=e.eventManager;return t.onListen=f2.bind(null,e.syncEngine),t.onUnlisten=m2.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=p2.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=g2.bind(null,e.syncEngine),t}function F2(n){return n.asyncQueue.enqueue(async()=>{const e=await RR(n),t=await PR(n);return e.setNetworkEnabled(!0),function(i){const s=$(i);return s.L_.delete(0),Bu(s)}(t)})}function j2(n){return n.asyncQueue.enqueue(async()=>{const e=await RR(n),t=await PR(n);return e.setNetworkEnabled(!1),async function(i){const s=$(i);s.L_.add(0),await Ea(s),s.q_.set("Offline")}(t)})}function U2(n,e){const t=new gt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await function(c,h){const d=$(c);return d.persistence.runTransaction("read document","readonly",p=>d.localDocuments.getDocument(p,h))}(i,s);a.isFoundDocument()?o.resolve(a):a.isNoDocument()?o.resolve(null):o.reject(new j(O.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(a){const l=Sa(a,`Failed to get document '${s} from cache`);o.reject(l)}}(await Aa(n),e,t)),t.promise}function bR(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new yf({next:p=>{h.Za(),o.enqueueAndForget(()=>ky(s,d));const _=p.docs.has(a);!_&&p.fromCache?c.reject(new j(O.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&p.fromCache&&l&&l.source==="server"?c.reject(new j(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new Ry(ya(a.path),h,{includeMetadataChanges:!0,_a:!0});return Ay(s,d)}(await oa(n),n.asyncQueue,e,t,r)),r.promise}function B2(n,e){const t=new gt;return n.asyncQueue.enqueueAndForget(async()=>async function(i,s,o){try{const a=await ad(i,s,!0),l=new IR(s,a.Ts),c=l.ma(a.documents),h=l.applyChanges(c,!1);o.resolve(h.snapshot)}catch(a){const l=Sa(a,`Failed to execute query '${s} against cache`);o.reject(l)}}(await Aa(n),e,t)),t.promise}function NR(n,e,t={}){const r=new gt;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,a,l,c){const h=new yf({next:p=>{h.Za(),o.enqueueAndForget(()=>ky(s,d)),p.fromCache&&l.source==="server"?c.reject(new j(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(p)},error:p=>c.reject(p)}),d=new Ry(a,h,{includeMetadataChanges:!0,_a:!0});return Ay(s,d)}(await oa(n),n.asyncQueue,e,t,r)),r.promise}function z2(n,e,t){const r=new gt;return n.asyncQueue.enqueueAndForget(async()=>{try{const i=await xR(n);r.resolve(async function(o,a,l){var c;const h=$(o),{request:d,ut:p,parent:_}=UC(h.serializer,hC(a),l);h.connection.Fo||delete d.parent;const T=(await h.Lo("RunAggregationQuery",h.serializer.databaseId,_,d,1)).filter(P=>!!P.result);Y(T.length===1);const C=(c=T[0].result)===null||c===void 0?void 0:c.aggregateFields;return Object.keys(C).reduce((P,y)=>(P[p[y]]=C[y],P),{})}(i,e,t))}catch(i){r.reject(i)}}),r.promise}function $2(n,e){const t=new yf(e);return n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.add(s),s.next()}(await oa(n),t)),()=>{t.Za(),n.asyncQueue.enqueueAndForget(async()=>function(i,s){$(i).Y_.delete(s)}(await oa(n),t))}}function q2(n,e,t,r){const i=function(o,a){let l;return l=typeof o=="string"?xC().encode(o):o,function(h,d){return new V2(h,d)}(function(h,d){if(h instanceof Uint8Array)return IT(h,d);if(h instanceof ArrayBuffer)return IT(new Uint8Array(h),d);if(h instanceof ReadableStream)return h.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")}(l),a)}(t,Uu(e));n.asyncQueue.enqueueAndForget(async()=>{N2(await Ly(n),i,r)})}function G2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){const s=$(r);return s.persistence.runTransaction("Get named query","readonly",o=>s.Gr.getNamedQuery(o,i))}(await Aa(n),e))}function K2(n,e){return n.asyncQueue.enqueue(async()=>async function(r,i){const s=$(r),o=s.indexManager,a=[];return s.persistence.runTransaction("Configure indexes","readwrite",l=>o.getFieldIndexes(l).next(c=>function(d,p,_,T,C){d=[...d],p=[...p],d.sort(_),p.sort(_);const P=d.length,y=p.length;let I=0,S=0;for(;I<y&&S<P;){const D=_(d[S],p[I]);D<0?C(d[S++]):D>0?T(p[I++]):(I++,S++)}for(;I<y;)T(p[I++]);for(;S<P;)C(d[S++])}(c,i,QL,h=>{a.push(o.addFieldIndex(l,h))},h=>{a.push(o.deleteFieldIndex(l,h))})).next(()=>N.waitFor(a)))}(await Aa(n),e))}function W2(n,e){return n.asyncQueue.enqueue(async()=>function(r,i){$(r).ss.zi=i}(await Aa(n),e))}function H2(n){return n.asyncQueue.enqueue(async()=>function(t){const r=$(t),i=r.indexManager;return r.persistence.runTransaction("Delete All Indexes","readwrite",s=>i.deleteAllFieldIndexes(s))}(await Aa(n)))}/**
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
 */function DR(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const ST=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(n,e,t){if(!t)throw new j(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function VR(n,e,t,r){if(e===!0&&r===!0)throw new j(O.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function AT(n){if(!K.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kT(n){if(K.isDocumentKey(n))throw new j(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function wf(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":H()}function oe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new j(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=wf(n);throw new j(O.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function OR(n,e){if(e<=0)throw new j(O.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */class CT{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new j(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new j(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}VR("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=DR((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new j(O.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class zu{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new CT({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new j(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new CT(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Fk;switch(r.type){case"firstParty":return new qL(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new j(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=ST.get(t);r&&(U("ComponentProvider","Removing Datastore"),ST.delete(t),r.terminate())}(this),Promise.resolve()}}function LR(n,e,t,r={}){var i;const s=(n=oe(n,zu))._getSettings(),o=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&on("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let a,l;if(typeof r.mockUserToken=="string")a=r.mockUserToken,l=dt.MOCK_USER;else{a=O_(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const c=r.mockUserToken.sub||r.mockUserToken.user_id;if(!c)throw new j(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new dt(c)}n._authCredentials=new BL(new Mk(a,l))}}/**
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
 */class _t{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new _t(this.firestore,e,this._query)}}class Ye{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new bn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ye(this.firestore,e,this._key)}}class bn extends _t{constructor(e,t,r){super(e,t,ya(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ye(this.firestore,null,new K(e))}withConverter(e){return new bn(this.firestore,e,this._path)}}function Ef(n,e,...t){if(n=ue(n),My("collection","path",e),n instanceof zu){const r=de.fromString(e,...t);return kT(r),new bn(n,null,r)}{if(!(n instanceof Ye||n instanceof bn))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return kT(r),new bn(n.firestore,null,r)}}function Q2(n,e){if(n=oe(n,zu),My("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new j(O.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new _t(n,null,function(r){return new Or(de.emptyPath(),r)}(e))}function Gi(n,e,...t){if(n=ue(n),arguments.length===1&&(e=J_.newId()),My("doc","path",e),n instanceof zu){const r=de.fromString(e,...t);return AT(r),new Ye(n,null,new K(r))}{if(!(n instanceof Ye||n instanceof bn))throw new j(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(de.fromString(e,...t));return AT(r),new Ye(n.firestore,n instanceof bn?n.converter:null,new K(r))}}function Y2(n,e){return n=ue(n),e=ue(e),(n instanceof Ye||n instanceof bn)&&(e instanceof Ye||e instanceof bn)&&n.firestore===e.firestore&&n.path===e.path&&n.converter===e.converter}function Fy(n,e){return n=ue(n),e=ue(e),n instanceof _t&&e instanceof _t&&n.firestore===e.firestore&&Ou(n._query,e._query)&&n.converter===e.converter}/**
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
 */class RT{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new wy(this,"async_queue_retry"),this.Vu=()=>{const r=_h();r&&U("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=_h();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=_h();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new gt;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!zi(e))throw e;U("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw Ze("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Sy.createAndSchedule(this,e,t,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&H()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function kg(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class MR{constructor(){this._progressObserver={},this._taskCompletionResolver=new gt,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,r){this._progressObserver={next:e,error:t,complete:r}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
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
 */const J2=-1;class Ie extends zu{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new RT,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new RT(e),this._firestoreClient=void 0,await e}}}function X2(n,e,t){t||(t="(default)");const r=$s(n,"firestore");if(r.isInitialized(t)){const i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(Ii(s,e))return i;throw new j(O.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new j(O.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new j(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return r.initialize({options:e,instanceIdentifier:t})}function FR(n,e){const t=typeof n=="object"?n:ef(),r=typeof n=="string"?n:e||"(default)",i=$s(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=V_("firestore");s&&LR(i,...s)}return i}function Ue(n){if(n._terminated)throw new j(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||jR(n),n._firestoreClient}function jR(n){var e,t,r;const i=n._freezeSettings(),s=function(a,l,c,h){return new IM(a,l,c,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,DR(h.experimentalLongPollingOptions),h.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new M2(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(a){const l=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(l),_online:l}}(n._componentsProvider))}function Z2(n,e){on("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=n._freezeSettings();return UR(n,bi.provider,{build:r=>new Vy(r,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}async function ej(n){on("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=n._freezeSettings();UR(n,bi.provider,{build:t=>new CR(t,e.cacheSizeBytes)})}function UR(n,e,t){if((n=oe(n,Ie))._firestoreClient||n._terminated)throw new j(O.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(n._componentsProvider||n._getSettings().localCache)throw new j(O.FAILED_PRECONDITION,"SDK cache is already specified.");n._componentsProvider={_online:e,_offline:t},jR(n)}function tj(n){if(n._initialized&&!n._terminated)throw new j(O.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new gt;return n._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(r){if(!Kn.D())return Promise.resolve();const i=r+"main";await Kn.delete(i)}(_y(n._databaseId,n._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function nj(n){return function(t){const r=new gt;return t.asyncQueue.enqueueAndForget(async()=>E2(await Ly(t),r)),r.promise}(Ue(n=oe(n,Ie)))}function rj(n){return F2(Ue(n=oe(n,Ie)))}function ij(n){return j2(Ue(n=oe(n,Ie)))}function sj(n){return cV(n.app,"firestore",n._databaseId.database),n._delete()}function oj(n,e){const t=Ue(n=oe(n,Ie)),r=new MR;return q2(t,n._databaseId,e,r),r}function aj(n,e){return G2(Ue(n=oe(n,Ie)),e).then(t=>t?new _t(n,null,t.query):null)}/**
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
 */class aa{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class BR{constructor(e,t,r){this._userDataWriter=t,this._data=r,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
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
 */class Ni{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Ni(Ke.fromBase64String(e))}catch(t){throw new j(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Ni(Ke.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ki{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new j(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function lj(){return new Ki("__name__")}/**
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
 */class Wi{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new j(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new j(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ne(this._lat,e._lat)||ne(this._long,e._long)}}/**
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
 */class $u{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uj=/^__.*__$/;class cj{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Mr(e,this.data,this.fieldMask,t,this.fieldTransforms):new va(e,this.data,t,this.fieldTransforms)}}class zR{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Mr(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function $R(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw H()}}class Tf{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Tf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return hd(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if($R(this.Cu)&&uj.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class hj{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Uu(e)}Qu(e,t,r,i=!1){return new Tf({Cu:e,methodName:t,qu:r,path:De.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ws(n){const e=n._freezeSettings(),t=Uu(n._databaseId);return new hj(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Sf(n,e,t,r,i,s={}){const o=n.Qu(s.merge||s.mergeFields?2:0,e,t,i);Gy("Data must be an object, but it was:",o,r);const a=KR(r,o);let l,c;if(s.merge)l=new Kt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const h=[];for(const d of s.mergeFields){const p=mu(e,d,t);if(!o.contains(p))throw new j(O.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);HR(h,p)||h.push(p)}l=new Kt(h),c=o.fieldTransforms.filter(d=>l.covers(d.field))}else l=null,c=o.fieldTransforms;return new cj(new wt(a),l,c)}class qu extends Wi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof qu}}function qR(n,e,t){return new Tf({Cu:3,qu:e.settings.qu,methodName:n._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class jy extends Wi{_toFieldTransform(e){return new Mu(e.path,new Xo)}isEqual(e){return e instanceof jy}}class Uy extends Wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=qR(this,e,!0),r=this.Ku.map(s=>Hs(s,t)),i=new xs(r);return new Mu(e.path,i)}isEqual(e){return e instanceof Uy&&Ii(this.Ku,e.Ku)}}class By extends Wi{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=qR(this,e,!0),r=this.Ku.map(s=>Hs(s,t)),i=new bs(r);return new Mu(e.path,i)}isEqual(e){return e instanceof By&&Ii(this.Ku,e.Ku)}}class zy extends Wi{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Zo(e.serializer,wC(e.serializer,this.$u));return new Mu(e.path,t)}isEqual(e){return e instanceof zy&&this.$u===e.$u}}function $y(n,e,t,r){const i=n.Qu(1,e,t);Gy("Data must be an object, but it was:",i,r);const s=[],o=wt.empty();$i(r,(l,c)=>{const h=Af(e,l,t);c=ue(c);const d=i.Nu(h);if(c instanceof qu)s.push(h);else{const p=Hs(c,d);p!=null&&(s.push(h),o.set(h,p))}});const a=new Kt(s);return new zR(o,a,i.fieldTransforms)}function qy(n,e,t,r,i,s){const o=n.Qu(1,e,t),a=[mu(e,r,t)],l=[i];if(s.length%2!=0)throw new j(O.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<s.length;p+=2)a.push(mu(e,s[p])),l.push(s[p+1]);const c=[],h=wt.empty();for(let p=a.length-1;p>=0;--p)if(!HR(c,a[p])){const _=a[p];let T=l[p];T=ue(T);const C=o.Nu(_);if(T instanceof qu)c.push(_);else{const P=Hs(T,C);P!=null&&(c.push(_),h.set(_,P))}}const d=new Kt(c);return new zR(h,d,o.fieldTransforms)}function GR(n,e,t,r=!1){return Hs(t,n.Qu(r?4:3,e))}function Hs(n,e){if(WR(n=ue(n)))return Gy("Unsupported field value:",e,n),KR(n,e);if(n instanceof Wi)return function(r,i){if(!$R(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const a of r){let l=Hs(a,i.Lu(o));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ue(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return wC(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=je.fromDate(r);return{timestampValue:ea(i.serializer,s)}}if(r instanceof je){const s=new je(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ea(i.serializer,s)}}if(r instanceof If)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ni)return{bytesValue:DC(i.serializer,r._byteString)};if(r instanceof Ye){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:cy(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof $u)return function(o,a){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw a.Bu("VectorValues must only contain numeric values.");return iy(a.serializer,l)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${wf(r)}`)}(n,e)}function KR(n,e){const t={};return Xk(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$i(n,(r,i)=>{const s=Hs(i,e.Mu(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function WR(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof je||n instanceof If||n instanceof Ni||n instanceof Ye||n instanceof Wi||n instanceof $u)}function Gy(n,e,t){if(!WR(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const r=wf(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function mu(n,e,t){if((e=ue(e))instanceof Ki)return e._internalPath;if(typeof e=="string")return Af(n,e);throw hd("Field path arguments must be of type string or ",n,!1,void 0,t)}const dj=new RegExp("[~\\*/\\[\\]]");function Af(n,e,t){if(e.search(dj)>=0)throw hd(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ki(...e.split("."))._internalPath}catch{throw hd(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function hd(n,e,t,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(s||o)&&(l+=" (found",s&&(l+=` in field ${r}`),o&&(l+=` in document ${i}`),l+=")"),new j(O.INVALID_ARGUMENT,a+n+l)}function HR(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class gu{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ye(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new fj(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(kf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class fj extends gu{data(){return super.data()}}function kf(n,e){return typeof e=="string"?Af(n,e):e instanceof Ki?e._internalPath:e._delegate._internalPath}/**
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
 */function QR(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new j(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ky{}class ka extends Ky{}function Wy(n,e,...t){let r=[];e instanceof Ky&&r.push(e),r=r.concat(t),function(s){const o=s.filter(l=>l instanceof Qs).length,a=s.filter(l=>l instanceof Ca).length;if(o>1||o>0&&a>0)throw new j(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)n=i._apply(n);return n}class Ca extends ka{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ca(e,t,r)}_apply(e){const t=this._parse(e);return JR(e._query,t),new _t(e.firestore,e.converter,pg(e._query,t))}_parse(e){const t=Ws(e.firestore);return function(s,o,a,l,c,h,d){let p;if(c.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new j(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){xT(d,h);const _=[];for(const T of d)_.push(PT(l,s,T));p={arrayValue:{values:_}}}else p=PT(l,s,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||xT(d,h),p=GR(a,o,d,h==="in"||h==="not-in");return fe.create(c,h,p)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function pj(n,e,t){const r=e,i=kf("where",n);return Ca._create(i,r,t)}class Qs extends Ky{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Qs(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ve.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i;const a=s.getFlattenedFilters();for(const l of a)JR(o,l),o=pg(o,l)}(e._query,t),new _t(e.firestore,e.converter,pg(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function mj(...n){return n.forEach(e=>XR("or",e)),Qs._create("or",n)}function gj(...n){return n.forEach(e=>XR("and",e)),Qs._create("and",n)}class Cf extends ka{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Cf(e,t)}_apply(e){const t=function(i,s,o){if(i.startAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new j(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new du(s,o)}(e._query,this._field,this._direction);return new _t(e.firestore,e.converter,function(i,s){const o=i.explicitOrderBy.concat([s]);return new Or(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function _j(n,e="asc"){const t=e,r=kf("orderBy",n);return Cf._create(r,t)}class Gu extends ka{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Gu(e,t,r)}_apply(e){return new _t(e.firestore,e.converter,td(e._query,this._limit,this._limitType))}}function Hy(n){return OR("limit",n),Gu._create("limit",n,"F")}function yj(n){return OR("limitToLast",n),Gu._create("limitToLast",n,"L")}class Ku extends ka{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Ku(e,t,r)}_apply(e){const t=YR(e,this.type,this._docOrFields,this._inclusive);return new _t(e.firestore,e.converter,function(i,s){return new Or(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)}(e._query,t))}}function vj(...n){return Ku._create("startAt",n,!0)}function wj(...n){return Ku._create("startAfter",n,!1)}class Wu extends ka{constructor(e,t,r){super(),this.type=e,this._docOrFields=t,this._inclusive=r}static _create(e,t,r){return new Wu(e,t,r)}_apply(e){const t=YR(e,this.type,this._docOrFields,this._inclusive);return new _t(e.firestore,e.converter,function(i,s){return new Or(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)}(e._query,t))}}function Ej(...n){return Wu._create("endBefore",n,!1)}function Ij(...n){return Wu._create("endAt",n,!0)}function YR(n,e,t,r){if(t[0]=ue(t[0]),t[0]instanceof gu)return function(s,o,a,l,c){if(!l)throw new j(O.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${a}().`);const h=[];for(const d of Vo(s))if(d.field.isKeyField())h.push(Rs(o,l.key));else{const p=l.data.field(d.field);if(af(p))throw new j(O.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+d.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(p===null){const _=d.field.canonicalString();throw new j(O.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${_}' (used as the orderBy) does not exist.`)}h.push(p)}return new Ri(h,c)}(n._query,n.firestore._databaseId,e,t[0]._document,r);{const i=Ws(n.firestore);return function(o,a,l,c,h,d){const p=o.explicitOrderBy;if(h.length>p.length)throw new j(O.INVALID_ARGUMENT,`Too many arguments provided to ${c}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const _=[];for(let T=0;T<h.length;T++){const C=h[T];if(p[T].field.isKeyField()){if(typeof C!="string")throw new j(O.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${c}(), but got a ${typeof C}`);if(!ny(o)&&C.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${c}() must be a plain document ID, but '${C}' contains a slash.`);const P=o.path.child(de.fromString(C));if(!K.isDocumentKey(P))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${c}() must result in a valid document path, but '${P}' is not because it contains an odd number of segments.`);const y=new K(P);_.push(Rs(a,y))}else{const P=GR(l,c,C);_.push(P)}}return new Ri(_,d)}(n._query,n.firestore._databaseId,i,e,t,r)}}function PT(n,e,t){if(typeof(t=ue(t))=="string"){if(t==="")throw new j(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!ny(e)&&t.indexOf("/")!==-1)throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(de.fromString(t));if(!K.isDocumentKey(r))throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Rs(n,new K(r))}if(t instanceof Ye)return Rs(n,t._key);throw new j(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wf(t)}.`)}function xT(n,e){if(!Array.isArray(n)||n.length===0)throw new j(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function JR(n,e){const t=function(i,s){for(const o of i)for(const a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new j(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function XR(n,e){if(!(e instanceof Ca||e instanceof Qs))throw new j(O.INVALID_ARGUMENT,`Function ${n}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Qy{convertValue(e,t="none"){switch(ki(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(br(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw H()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return $i(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>Oe(o.doubleValue));return new $u(s)}convertGeoPoint(e){return new If(Oe(e.latitude),Oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=lf(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(uu(e));default:return null}}convertTimestamp(e){const t=xr(e);return new je(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=de.fromString(e);Y(qC(r));const i=new Ai(r.get(1),r.get(3)),s=new K(r.popFirst(5));return i.isEqual(t)||Ze(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Rf(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}class Tj extends Qy{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ni(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ye(this.firestore,null,t)}}/**
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
 */function Sj(n){return new aa("sum",mu("sum",n))}function Aj(n){return new aa("avg",mu("average",n))}function ZR(){return new aa("count")}function kj(n,e){var t,r;return n instanceof aa&&e instanceof aa&&n.aggregateType===e.aggregateType&&((t=n._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((r=e._internalFieldPath)===null||r===void 0?void 0:r.canonicalString())}function Cj(n,e){return Fy(n.query,e.query)&&Ii(n.data(),e.data())}/**
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
 */class si{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Os extends gu{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Vl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(kf("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Vl extends Os{data(e={}){return super.data(e)}}class Ls{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new si(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Vl(this._firestore,this._userDataWriter,r.key,r,new si(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new j(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const l=new Vl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new si(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>s||a.type!==3).map(a=>{const l=new Vl(i._firestore,i._userDataWriter,a.doc.key,a.doc,new si(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,h=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:Rj(a.type),doc:l,oldIndex:c,newIndex:h}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Rj(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return H()}}function Pj(n,e){return n instanceof Os&&e instanceof Os?n._firestore===e._firestore&&n._key.isEqual(e._key)&&(n._document===null?e._document===null:n._document.isEqual(e._document))&&n._converter===e._converter:n instanceof Ls&&e instanceof Ls&&n._firestore===e._firestore&&Fy(n.query,e.query)&&n.metadata.isEqual(e.metadata)&&n._snapshot.isEqual(e._snapshot)}/**
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
 */function Yy(n){n=oe(n,Ye);const e=oe(n.firestore,Ie);return bR(Ue(e),n._key).then(t=>Xy(e,n,t))}class Hi extends Qy{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ni(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ye(this.firestore,null,t)}}function xj(n){n=oe(n,Ye);const e=oe(n.firestore,Ie),t=Ue(e),r=new Hi(e);return U2(t,n._key).then(i=>new Os(e,r,n._key,i,new si(i!==null&&i.hasLocalMutations,!0),n.converter))}function bj(n){n=oe(n,Ye);const e=oe(n.firestore,Ie);return bR(Ue(e),n._key,{source:"server"}).then(t=>Xy(e,n,t))}function Jy(n){n=oe(n,_t);const e=oe(n.firestore,Ie),t=Ue(e),r=new Hi(e);return QR(n._query),NR(t,n._query).then(i=>new Ls(e,r,n,i))}function Nj(n){n=oe(n,_t);const e=oe(n.firestore,Ie),t=Ue(e),r=new Hi(e);return B2(t,n._query).then(i=>new Ls(e,r,n,i))}function Dj(n){n=oe(n,_t);const e=oe(n.firestore,Ie),t=Ue(e),r=new Hi(e);return NR(t,n._query,{source:"server"}).then(i=>new Ls(e,r,n,i))}function eP(n,e,t){n=oe(n,Ye);const r=oe(n.firestore,Ie),i=Rf(n.converter,e,t);return Ra(r,[Sf(Ws(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Fe.none())])}function Vj(n,e,t,...r){n=oe(n,Ye);const i=oe(n.firestore,Ie),s=Ws(i);let o;return o=typeof(e=ue(e))=="string"||e instanceof Ki?qy(s,"updateDoc",n._key,e,t,r):$y(s,"updateDoc",n._key,e),Ra(i,[o.toMutation(n._key,Fe.exists(!0))])}function Cg(n){return Ra(oe(n.firestore,Ie),[new wa(n._key,Fe.none())])}function Oj(n,e){const t=oe(n.firestore,Ie),r=Gi(n),i=Rf(n.converter,e);return Ra(t,[Sf(Ws(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,Fe.exists(!1))]).then(()=>r)}function Lj(n,...e){var t,r,i;n=ue(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||kg(e[o])||(s=e[o],o++);const a={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(kg(e[o])){const d=e[o];e[o]=(t=d.next)===null||t===void 0?void 0:t.bind(d),e[o+1]=(r=d.error)===null||r===void 0?void 0:r.bind(d),e[o+2]=(i=d.complete)===null||i===void 0?void 0:i.bind(d)}let l,c,h;if(n instanceof Ye)c=oe(n.firestore,Ie),h=ya(n._key.path),l={next:d=>{e[o]&&e[o](Xy(c,n,d))},error:e[o+1],complete:e[o+2]};else{const d=oe(n,_t);c=oe(d.firestore,Ie),h=d._query;const p=new Hi(c);l={next:_=>{e[o]&&e[o](new Ls(c,p,d,_))},error:e[o+1],complete:e[o+2]},QR(n._query)}return function(p,_,T,C){const P=new yf(C),y=new Ry(_,P,T);return p.asyncQueue.enqueueAndForget(async()=>Ay(await oa(p),y)),()=>{P.Za(),p.asyncQueue.enqueueAndForget(async()=>ky(await oa(p),y))}}(Ue(c),h,a,l)}function Mj(n,e){return $2(Ue(n=oe(n,Ie)),kg(e)?e:{next:e})}function Ra(n,e){return function(r,i){const s=new gt;return r.asyncQueue.enqueueAndForget(async()=>_2(await Ly(r),i,s)),s.promise}(Ue(n),e)}function Xy(n,e,t){const r=t.docs.get(e._key),i=new Hi(n);return new Os(n,i,e._key,r,new si(t.hasPendingWrites,t.fromCache),e.converter)}/**
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
 */function Fj(n){return tP(n,{count:ZR()})}function tP(n,e){const t=oe(n.firestore,Ie),r=Ue(t),i=Jk(e,(s,o)=>new CC(o,s.aggregateType,s._internalFieldPath));return z2(r,n._query,i).then(s=>function(a,l,c){const h=new Hi(a);return new BR(l,h,c)}(t,n,s))}class jj{constructor(e){this.kind="memory",this._onlineComponentProvider=bi.provider,e!=null&&e.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=xi.provider}toJSON(){return{kind:this.kind}}}class Uj{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=nP(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class Bj{constructor(){this.kind="memoryEager",this._offlineComponentProvider=xi.provider}toJSON(){return{kind:this.kind}}}class zj{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new D2(e)}}toJSON(){return{kind:this.kind}}}function $j(){return new Bj}function qj(n){return new zj(n==null?void 0:n.cacheSizeBytes)}function Gj(n){return new jj(n)}function Kj(n){return new Uj(n)}class Wj{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=bi.provider,this._offlineComponentProvider={build:t=>new Vy(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Hj{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=bi.provider,this._offlineComponentProvider={build:t=>new CR(t,e==null?void 0:e.cacheSizeBytes)}}}function nP(n){return new Wj(n==null?void 0:n.forceOwnership)}function Qj(){return new Hj}/**
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
 */const Yj={maxAttempts:5};/**
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
 */class rP{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Ws(e)}set(e,t,r){this._verifyNotCommitted();const i=ti(e,this._firestore),s=Rf(i.converter,t,r),o=Sf(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,Fe.none())),this}update(e,t,r,...i){this._verifyNotCommitted();const s=ti(e,this._firestore);let o;return o=typeof(t=ue(t))=="string"||t instanceof Ki?qy(this._dataReader,"WriteBatch.update",s._key,t,r,i):$y(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,Fe.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=ti(e,this._firestore);return this._mutations=this._mutations.concat(new wa(t._key,Fe.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new j(O.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function ti(n,e){if((n=ue(n)).firestore!==e)throw new j(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class iP extends class{constructor(t,r){this._firestore=t,this._transaction=r,this._dataReader=Ws(t)}get(t){const r=ti(t,this._firestore),i=new Tj(this._firestore);return this._transaction.lookup([r._key]).then(s=>{if(!s||s.length!==1)return H();const o=s[0];if(o.isFoundDocument())return new gu(this._firestore,i,o.key,o,r.converter);if(o.isNoDocument())return new gu(this._firestore,i,r._key,null,r.converter);throw H()})}set(t,r,i){const s=ti(t,this._firestore),o=Rf(s.converter,r,i),a=Sf(this._dataReader,"Transaction.set",s._key,o,s.converter!==null,i);return this._transaction.set(s._key,a),this}update(t,r,i,...s){const o=ti(t,this._firestore);let a;return a=typeof(r=ue(r))=="string"||r instanceof Ki?qy(this._dataReader,"Transaction.update",o._key,r,i,s):$y(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(t){const r=ti(t,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=ti(e,this._firestore),r=new Hi(this._firestore);return super.get(e).then(i=>new Os(this._firestore,r,t._key,i._document,new si(!1,!1),t.converter))}}function Jj(n,e,t){n=oe(n,Ie);const r=Object.assign(Object.assign({},Yj),t);return function(s){if(s.maxAttempts<1)throw new j(O.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,a){const l=new gt;return s.asyncQueue.enqueueAndForget(async()=>{const c=await xR(s);new L2(s.asyncQueue,c,a,o,l).au()}),l.promise}(Ue(n),i=>e(new iP(n,i)),r)}/**
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
 */function Xj(){return new qu("deleteField")}function Zj(){return new jy("serverTimestamp")}function eU(...n){return new Uy("arrayUnion",n)}function tU(...n){return new By("arrayRemove",n)}function nU(n){return new zy("increment",n)}function rU(n){return new $u(n)}/**
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
 */function iU(n){return Ue(n=oe(n,Ie)),new rP(n,e=>Ra(n,e))}/**
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
 */function sU(n,e){const t=Ue(n=oe(n,Ie));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return on("Cannot enable indexes when persistence is disabled"),Promise.resolve();const r=function(s){const o=typeof s=="string"?function(c){try{return JSON.parse(c)}catch(h){throw new j(O.INVALID_ARGUMENT,"Failed to parse JSON: "+(h==null?void 0:h.message))}}(s):s,a=[];if(Array.isArray(o.indexes))for(const l of o.indexes){const c=bT(l,"collectionGroup"),h=[];if(Array.isArray(l.fields))for(const d of l.fields){const p=Af("setIndexConfiguration",bT(d,"fieldPath"));d.arrayConfig==="CONTAINS"?h.push(new ws(p,2)):d.order==="ASCENDING"?h.push(new ws(p,0)):d.order==="DESCENDING"&&h.push(new ws(p,1))}a.push(new Ho(Ho.UNKNOWN_ID,c,h,Qo.empty()))}return a}(e);return K2(t,r)}function bT(n,e){if(typeof n[e]!="string")throw new j(O.INVALID_ARGUMENT,"Missing string value for: "+e);return n[e]}/**
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
 */class sP{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function oU(n){var e;n=oe(n,Ie);const t=NT.get(n);if(t)return t;if(((e=Ue(n)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const r=new sP(n);return NT.set(n,r),r}function aU(n){oP(n,!0)}function lU(n){oP(n,!1)}function uU(n){H2(Ue(n._firestore)).then(e=>U("deleting all persistent cache indexes succeeded")).catch(e=>on("deleting all persistent cache indexes failed",e))}function oP(n,e){W2(Ue(n._firestore),e).then(t=>U(`setting persistent cache index auto creation isEnabled=${e} succeeded`)).catch(t=>on(`setting persistent cache index auto creation isEnabled=${e} failed`,t))}const NT=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cU(n){var e;const t=(e=Ue(oe(n.firestore,Ie))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:df(t,Dt(n._query))._t}function hU(n,e){var t;const r=Jk(e,(s,o)=>new CC(o,s.aggregateType,s._internalFieldPath)),i=(t=Ue(oe(n.firestore,Ie))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return i===void 0?null:UC(i,hC(n._query),r,!0).request}/**
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
 */class dU{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return Zy.instance.onExistenceFilterMismatch(e)}}class Zy{constructor(){this.Uu=new Map}static get instance(){return qc||(qc=new Zy,function(t){if(nd)throw new Error("a TestingHooksSpi instance is already set");nd=t}(qc)),qc}et(e){this.Uu.forEach(t=>t(e))}onExistenceFilterMismatch(e){const t=Symbol(),r=this.Uu;return r.set(t,e),()=>r.delete(t)}}let qc=null;(function(e,t=!0){(function(i){_a=i})(Ui),Ti(new Cr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),a=new Ie(new zL(r.getProvider("auth-internal")),new GL(r.getProvider("app-check-internal")),function(c,h){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new j(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ai(c.options.projectId,h)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),a._setSettings(s),a},"PUBLIC").setMultipleInstances(!0)),pn(EI,"4.7.3",e),pn(EI,"4.7.3","esm2017")})();const ev=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:Qy,AggregateField:aa,AggregateQuerySnapshot:BR,Bytes:Ni,CACHE_SIZE_UNLIMITED:J2,CollectionReference:bn,DocumentReference:Ye,DocumentSnapshot:Os,FieldPath:Ki,FieldValue:Wi,Firestore:Ie,FirestoreError:j,GeoPoint:If,LoadBundleTask:MR,PersistentCacheIndexManager:sP,Query:_t,QueryCompositeFilterConstraint:Qs,QueryConstraint:ka,QueryDocumentSnapshot:Vl,QueryEndAtConstraint:Wu,QueryFieldFilterConstraint:Ca,QueryLimitConstraint:Gu,QueryOrderByConstraint:Cf,QuerySnapshot:Ls,QueryStartAtConstraint:Ku,SnapshotMetadata:si,Timestamp:je,Transaction:iP,VectorValue:$u,WriteBatch:rP,_AutoId:J_,_ByteString:Ke,_DatabaseId:Ai,_DocumentKey:K,_EmptyAppCheckTokenProvider:KL,_EmptyAuthCredentialsProvider:Fk,_FieldPath:De,_TestingHooks:dU,_cast:oe,_debugAssert:UL,_internalAggregationQueryToProtoRunAggregationQueryRequest:hU,_internalQueryToProtoQueryTarget:cU,_isBase64Available:wM,_logWarn:on,_validateIsNotUsedTogether:VR,addDoc:Oj,aggregateFieldEqual:kj,aggregateQuerySnapshotEqual:Cj,and:gj,arrayRemove:tU,arrayUnion:eU,average:Aj,clearIndexedDbPersistence:tj,collection:Ef,collectionGroup:Q2,connectFirestoreEmulator:LR,count:ZR,deleteAllPersistentCacheIndexes:uU,deleteDoc:Cg,deleteField:Xj,disableNetwork:ij,disablePersistentCacheIndexAutoCreation:lU,doc:Gi,documentId:lj,enableIndexedDbPersistence:Z2,enableMultiTabIndexedDbPersistence:ej,enableNetwork:rj,enablePersistentCacheIndexAutoCreation:aU,endAt:Ij,endBefore:Ej,ensureFirestoreConfigured:Ue,executeWrite:Ra,getAggregateFromServer:tP,getCountFromServer:Fj,getDoc:Yy,getDocFromCache:xj,getDocFromServer:bj,getDocs:Jy,getDocsFromCache:Nj,getDocsFromServer:Dj,getFirestore:FR,getPersistentCacheIndexManager:oU,increment:nU,initializeFirestore:X2,limit:Hy,limitToLast:yj,loadBundle:oj,memoryEagerGarbageCollector:$j,memoryLocalCache:Gj,memoryLruGarbageCollector:qj,namedQuery:aj,onSnapshot:Lj,onSnapshotsInSync:Mj,or:mj,orderBy:_j,persistentLocalCache:Kj,persistentMultipleTabManager:Qj,persistentSingleTabManager:nP,query:Wy,queryEqual:Fy,refEqual:Y2,runTransaction:Jj,serverTimestamp:Zj,setDoc:eP,setIndexConfiguration:sU,setLogLevel:jL,snapshotEqual:Pj,startAfter:wj,startAt:vj,sum:Sj,terminate:sj,updateDoc:Vj,vector:rU,waitForPendingWrites:nj,where:pj,writeBatch:iU},Symbol.toStringTag,{value:"Module"}));var fU="firebase",pU="10.14.1";/**
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
 */pn(fU,pU,"app");var DT={};const VT="@firebase/database",OT="1.0.8";/**
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
 */let aP="";function lP(n){aP=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mU{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),it(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:iu(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gU{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Vr(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uP=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new mU(e)}}catch{}return new gU},ps=uP("localStorage"),_U=uP("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo=new Zd("@firebase/database"),yU=function(){let n=1;return function(){return n++}}(),cP=function(n){const e=f1(n),t=new u1;t.update(e);const r=t.digest();return D_.encodeByteArray(r)},Hu=function(...n){let e="";for(let t=0;t<n.length;t++){const r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Hu.apply(null,r):typeof r=="object"?e+=it(r):e+=r,e+=" "}return e};let Ol=null,LT=!0;const vU=function(n,e){z(!0,"Can't turn on custom loggers persistently."),Lo.logLevel=ae.VERBOSE,Ol=Lo.log.bind(Lo)},bt=function(...n){if(LT===!0&&(LT=!1,Ol===null&&_U.get("logging_enabled")===!0&&vU()),Ol){const e=Hu.apply(null,n);Ol(e)}},Qu=function(n){return function(...e){bt(n,...e)}},Rg=function(...n){const e="FIREBASE INTERNAL ERROR: "+Hu(...n);Lo.error(e)},Nr=function(...n){const e=`FIREBASE FATAL ERROR: ${Hu(...n)}`;throw Lo.error(e),new Error(e)},Xt=function(...n){const e="FIREBASE WARNING: "+Hu(...n);Lo.warn(e)},wU=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Xt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},hP=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},EU=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},la="[MIN_NAME]",Ms="[MAX_NAME]",Pa=function(n,e){if(n===e)return 0;if(n===la||e===Ms)return-1;if(e===la||n===Ms)return 1;{const t=MT(n),r=MT(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},IU=function(n,e){return n===e?0:n<e?-1:1},il=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+it(e))},tv=function(n){if(typeof n!="object"||n===null)return it(n);const e=[];for(const r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=it(e[r]),t+=":",t+=tv(n[e[r]]);return t+="}",t},dP=function(n,e){const t=n.length;if(t<=e)return[n];const r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function Zt(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const fP=function(n){z(!hP(n),"Invalid JSON number");const e=11,t=52,r=(1<<e-1)-1;let i,s,o,a,l;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=a+r,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const h=c.join("");let d="";for(l=0;l<64;l+=8){let p=parseInt(h.substr(l,8),2).toString(16);p.length===1&&(p="0"+p),d=d+p}return d.toLowerCase()},TU=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},SU=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function AU(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}const kU=new RegExp("^-?(0*)\\d{1,10}$"),CU=-2147483648,RU=2147483647,MT=function(n){if(kU.test(n)){const e=Number(n);if(e>=CU&&e<=RU)return e}return null},xa=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Xt("Exception was thrown by user callback.",t),e},Math.floor(0))}},PU=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ll=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class xU{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Xt(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bU{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(bt("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Xt(e)}}class yh{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}yh.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nv="5",pP="v",mP="s",gP="r",_P="f",yP=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,vP="ls",wP="p",Pg="ac",EP="websocket",IP="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP{constructor(e,t,r,i,s=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ps.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ps.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function NU(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function SP(n,e,t){z(typeof e=="string","typeof type must == string"),z(typeof t=="object","typeof params must == object");let r;if(e===EP)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===IP)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);NU(n)&&(t.ns=n.namespace);const i=[];return Zt(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DU{constructor(){this.counters_={}}incrementCounter(e,t=1){Vr(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return KD(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hp={},Qp={};function rv(n){const e=n.toString();return Hp[e]||(Hp[e]=new DU),Hp[e]}function VU(n,e){const t=n.toString();return Qp[t]||(Qp[t]=e()),Qp[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OU{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&xa(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FT="start",LU="close",MU="pLPCommand",FU="pRTLPCB",AP="id",kP="pw",CP="ser",jU="cb",UU="seg",BU="ts",zU="d",$U="dframe",RP=1870,PP=30,qU=RP-PP,GU=25e3,KU=3e4;class So{constructor(e,t,r,i,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Qu(e),this.stats_=rv(t),this.urlFn=l=>(this.appCheckToken&&(l[Pg]=this.appCheckToken),SP(t,IP,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new OU(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(KU)),EU(()=>{if(this.isClosed_)return;this.scriptTagHolder=new iv((...s)=>{const[o,a,l,c,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===FT)this.id=a,this.password=l;else if(o===LU)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const r={};r[FT]="t",r[CP]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[jU]=this.scriptTagHolder.uniqueCallbackIdentifier),r[pP]=nv,this.transportSessionId&&(r[mP]=this.transportSessionId),this.lastSessionId&&(r[vP]=this.lastSessionId),this.applicationId&&(r[wP]=this.applicationId),this.appCheckToken&&(r[Pg]=this.appCheckToken),typeof location<"u"&&location.hostname&&yP.test(location.hostname)&&(r[gP]=_P);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){So.forceAllow_=!0}static forceDisallow(){So.forceDisallow_=!0}static isAvailable(){return So.forceAllow_?!0:!So.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!TU()&&!SU()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=it(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=FA(t),i=dP(r,qU);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const r={};r[$U]="t",r[AP]=e,r[kP]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=it(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class iv{constructor(e,t,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=yU(),window[MU+this.uniqueCallbackIdentifier]=e,window[FU+this.uniqueCallbackIdentifier]=t,this.myIFrame=iv.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){bt("frame writing exception"),a.stack&&bt(a.stack),bt(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||bt("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[AP]=this.myID,e[kP]=this.myPW,e[CP]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+PP+r.length<=RP;){const o=this.pendingSegs.shift();r=r+"&"+UU+i+"="+o.seg+"&"+BU+i+"="+o.ts+"&"+zU+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(GU)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{bt("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WU=16384,HU=45e3;let dd=null;typeof MozWebSocket<"u"?dd=MozWebSocket:typeof WebSocket<"u"&&(dd=WebSocket);class Sn{constructor(e,t,r,i,s,o,a){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Qu(this.connId),this.stats_=rv(t),this.connURL=Sn.connectionURL_(t,o,a,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){const o={};return o[pP]=nv,typeof location<"u"&&location.hostname&&yP.test(location.hostname)&&(o[gP]=_P),t&&(o[mP]=t),r&&(o[vP]=r),i&&(o[Pg]=i),s&&(o[wP]=s),SP(e,EP,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ps.set("previous_websocket_failure",!0);try{let r;n1(),this.mySock=new dd(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Sn.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&dd!==null&&!Sn.forceDisallow_}static previouslyFailed(){return ps.isInMemoryStorage||ps.get("previous_websocket_failure")===!0}markConnectionHealthy(){ps.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const r=iu(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(z(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const t=it(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const r=dP(t,WU);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(HU))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Sn.responsesRequiredToBeHealthy=2;Sn.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[So,Sn]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Sn&&Sn.isAvailable();let r=t&&!Sn.previouslyFailed();if(e.webSocketOnly&&(t||Xt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Sn];else{const i=this.transports_=[];for(const s of _u.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);_u.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}_u.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QU=6e4,YU=5e3,JU=10*1024,XU=100*1024,Yp="t",jT="d",ZU="s",UT="r",e4="e",BT="o",zT="a",$T="n",qT="p",t4="h";class n4{constructor(e,t,r,i,s,o,a,l,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Qu("c:"+this.id+":"),this.transportManager_=new _u(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ll(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>XU?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>JU?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Yp in e){const t=e[Yp];t===zT?this.upgradeIfSecondaryHealthy_():t===UT?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===BT&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=il("t",e),r=il("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:qT,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:zT,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:$T,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=il("t",e),r=il("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=il(Yp,e);if(jT in e){const r=e[jT];if(t===t4){const i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===$T){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===ZU?this.onConnectionShutdown_(r):t===UT?this.onReset_(r):t===e4?Rg("Server Error: "+r):t===BT?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Rg("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),nv!==r&&Xt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),Ll(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(QU))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ll(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(YU))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:qT,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ps.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xP{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bP{constructor(e){this.allowedEvents_=e,this.listeners_={},z(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});const i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){z(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd extends bP{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!L_()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new fd}getInitialEvent(e){return z(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT=32,KT=768;class Ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ye(){return new Ae("")}function he(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Di(n){return n.pieces_.length-n.pieceNum_}function ke(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new Ae(n.pieces_,e)}function NP(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function r4(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function DP(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function VP(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new Ae(e,0)}function st(n,e){const t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof Ae)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new Ae(t,0)}function le(n){return n.pieceNum_>=n.pieces_.length}function jt(n,e){const t=he(n),r=he(e);if(t===null)return e;if(t===r)return jt(ke(n),ke(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function OP(n,e){if(Di(n)!==Di(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function An(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(Di(n)>Di(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}class i4{constructor(e,t){this.errorPrefix_=t,this.parts_=DP(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Xd(this.parts_[r]);LP(this)}}function s4(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Xd(e),LP(n)}function o4(n){const e=n.parts_.pop();n.byteLength_-=Xd(e),n.parts_.length>0&&(n.byteLength_-=1)}function LP(n){if(n.byteLength_>KT)throw new Error(n.errorPrefix_+"has a key path longer than "+KT+" bytes ("+n.byteLength_+").");if(n.parts_.length>GT)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+GT+") or object contains a cycle "+ss(n))}function ss(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv extends bP{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new sv}getInitialEvent(e){return z(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=1e3,a4=60*5*1e3,WT=30*1e3,l4=1.3,u4=3e4,c4="server_kill",HT=3;class Ir extends xP{constructor(e,t,r,i,s,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ir.nextPersistentConnectionId_++,this.log_=Qu("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=sl,this.maxReconnectDelay_=a4,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");sv.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&fd.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){const i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(it(s)),z(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const t=new Jd,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),z(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){const t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{const l=a.d,c=a.s;Ir.warnOnListenWarnings_(l,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Vr(e,"w")){const r=Go(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();Xt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||l1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=WT)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=a1(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),z(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){const s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();const o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+it(e));const t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Rg("Unrecognized action received from server: "+it(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){z(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=sl,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=sl,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>u4&&(this.reconnectDelay_=sl),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*l4)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ir.nextConnectionId_++,s=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,r())},c=function(d){z(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,p]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?bt("getToken() completed but was canceled"):(bt("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=p&&p.token,a=new n4(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,_=>{Xt(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(c4)},s))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Xt(d),l())}}}interrupt(e){bt("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){bt("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ym(this.interruptReasons_)&&(this.reconnectDelay_=sl,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>tv(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const r=new Ae(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){bt("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=HT&&(this.reconnectDelay_=WT,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){bt("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=HT&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+aP.replace(/\./g,"-")]=1,L_()?e["framework.cordova"]=1:$A()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=fd.getInstance().currentlyOnline();return Ym(this.interruptReasons_)&&e}}Ir.nextPersistentConnectionId_=0;Ir.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Pf{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const r=new se(la,e),i=new se(la,t);return this.compare(r,i)!==0}minPost(){return se.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gc;class MP extends Pf{static get __EMPTY_NODE(){return Gc}static set __EMPTY_NODE(e){Gc=e}compare(e,t){return Pa(e.name,t.name)}isDefinedOn(e){throw ma("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return se.MIN}maxPost(){return new se(Ms,Gc)}makePost(e,t){return z(typeof e=="string","KeyIndex indexValue must always be a string."),new se(e,Gc)}toString(){return".key"}}const Mo=new MP;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ft{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??ft.RED,this.left=i??Ht.EMPTY_NODE,this.right=s??Ht.EMPTY_NODE}copy(e,t,r,i,s){return new ft(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ht.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return Ht.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ft.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ft.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ft.RED=!0;ft.BLACK=!1;class h4{copy(e,t,r,i,s){return this}insert(e,t,r){return new ft(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ht{constructor(e,t=Ht.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Ht(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ft.BLACK,null,null))}remove(e){return new Ht(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ft.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kc(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Kc(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Kc(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Kc(this.root_,null,this.comparator_,!0,e)}}Ht.EMPTY_NODE=new h4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d4(n,e){return Pa(n.name,e.name)}function ov(n,e){return Pa(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xg;function f4(n){xg=n}const FP=function(n){return typeof n=="number"?"number:"+fP(n):"string:"+n},jP=function(n){if(n.isLeafNode()){const e=n.val();z(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Vr(e,".sv"),"Priority must be a string or number.")}else z(n===xg||n.isEmpty(),"priority of unexpected type.");z(n===xg||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let QT;class ut{constructor(e,t=ut.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,z(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),jP(this.priorityNode_)}static set __childrenNodeConstructor(e){QT=e}static get __childrenNodeConstructor(){return QT}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ut(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ut.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return le(e)?this:he(e)===".priority"?this.priorityNode_:ut.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ut.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const r=he(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(z(r!==".priority"||Di(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,ut.__childrenNodeConstructor.EMPTY_NODE.updateChild(ke(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+FP(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=fP(this.value_):e+=this.value_,this.lazyHash_=cP(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ut.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ut.__childrenNodeConstructor?-1:(z(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,r=typeof this.value_,i=ut.VALUE_TYPE_ORDER.indexOf(t),s=ut.VALUE_TYPE_ORDER.indexOf(r);return z(i>=0,"Unknown leaf type: "+t),z(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ut.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let UP,BP;function p4(n){UP=n}function m4(n){BP=n}class g4 extends Pf{compare(e,t){const r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?Pa(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return se.MIN}maxPost(){return new se(Ms,new ut("[PRIORITY-POST]",BP))}makePost(e,t){const r=UP(e);return new se(t,new ut("[PRIORITY-POST]",r))}toString(){return".priority"}}const Qe=new g4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _4=Math.log(2);class y4{constructor(e){const t=s=>parseInt(Math.log(s)/_4,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const pd=function(n,e,t,r){n.sort(e);const i=function(l,c){const h=c-l;let d,p;if(h===0)return null;if(h===1)return d=n[l],p=t?t(d):d,new ft(p,d.node,ft.BLACK,null,null);{const _=parseInt(h/2,10)+l,T=i(l,_),C=i(_+1,c);return d=n[_],p=t?t(d):d,new ft(p,d.node,ft.BLACK,T,C)}},s=function(l){let c=null,h=null,d=n.length;const p=function(T,C){const P=d-T,y=d;d-=T;const I=i(P+1,y),S=n[P],D=t?t(S):S;_(new ft(D,S.node,C,null,I))},_=function(T){c?(c.left=T,c=T):(h=T,c=T)};for(let T=0;T<l.count;++T){const C=l.nextBitIsOne(),P=Math.pow(2,l.count-(T+1));C?p(P,ft.BLACK):(p(P,ft.BLACK),p(P,ft.RED))}return h},o=new y4(n.length),a=s(o);return new Ht(r||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jp;const oo={};class wr{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return z(oo&&Qe,"ChildrenNode.ts has not been loaded"),Jp=Jp||new wr({".priority":oo},{".priority":Qe}),Jp}get(e){const t=Go(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Ht?t:null}hasIndex(e){return Vr(this.indexSet_,e.toString())}addIndex(e,t){z(e!==Mo,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=t.getIterator(se.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let a;i?a=pd(r,e.getCompare()):a=oo;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const h=Object.assign({},this.indexes_);return h[l]=a,new wr(h,c)}addToIndexes(e,t){const r=Gh(this.indexes_,(i,s)=>{const o=Go(this.indexSet_,s);if(z(o,"Missing index implementation for "+s),i===oo)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(se.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),pd(a,o.getCompare())}else return oo;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new se(e.name,a))),l.insert(e,e.node)}});return new wr(r,this.indexSet_)}removeFromIndexes(e,t){const r=Gh(this.indexes_,i=>{if(i===oo)return i;{const s=t.get(e.name);return s?i.remove(new se(e.name,s)):i}});return new wr(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ol;class Z{constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&jP(this.priorityNode_),this.children_.isEmpty()&&z(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return ol||(ol=new Z(new Ht(ov),null,wr.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ol}updatePriority(e){return this.children_.isEmpty()?this:new Z(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?ol:t}}getChild(e){const t=he(e);return t===null?this:this.getImmediateChild(t).getChild(ke(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(z(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const r=new se(e,t);let i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?ol:this.priorityNode_;return new Z(i,o,s)}}updateChild(e,t){const r=he(e);if(r===null)return t;{z(he(e)!==".priority"||Di(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(ke(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let r=0,i=0,s=!0;if(this.forEachChild(Qe,(o,a)=>{t[o]=a.val(e),r++,s&&Z.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+FP(this.getPriority().val())+":"),this.forEachChild(Qe,(t,r)=>{const i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":cP(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new se(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new se(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new se(t,this.children_.get(t)):null}forEachChild(e,t){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,se.Wrap);let s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Yu?-1:0}withIndex(e){if(e===Mo||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new Z(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Mo||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const r=this.getIterator(Qe),i=t.getIterator(Qe);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Mo?null:this.indexMap_.get(e.toString())}}Z.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class v4 extends Z{constructor(){super(new Ht(ov),Z.EMPTY_NODE,wr.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return Z.EMPTY_NODE}isEmpty(){return!1}}const Yu=new v4;Object.defineProperties(se,{MIN:{value:new se(la,Z.EMPTY_NODE)},MAX:{value:new se(Ms,Yu)}});MP.__EMPTY_NODE=Z.EMPTY_NODE;ut.__childrenNodeConstructor=Z;f4(Yu);m4(Yu);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w4=!0;function pt(n,e=null){if(n===null)return Z.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),z(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ut(t,pt(e))}if(!(n instanceof Array)&&w4){const t=[];let r=!1;if(Zt(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=pt(a);l.isEmpty()||(r=r||!l.getPriority().isEmpty(),t.push(new se(o,l)))}}),t.length===0)return Z.EMPTY_NODE;const s=pd(t,d4,o=>o.name,ov);if(r){const o=pd(t,Qe.getCompare());return new Z(s,pt(e),new wr({".priority":o},{".priority":Qe}))}else return new Z(s,pt(e),wr.Default)}else{let t=Z.EMPTY_NODE;return Zt(n,(r,i)=>{if(Vr(n,r)&&r.substring(0,1)!=="."){const s=pt(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(pt(e))}}p4(pt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E4 extends Pf{constructor(e){super(),this.indexPath_=e,z(!le(e)&&he(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?Pa(e.name,t.name):s}makePost(e,t){const r=pt(e),i=Z.EMPTY_NODE.updateChild(this.indexPath_,r);return new se(t,i)}maxPost(){const e=Z.EMPTY_NODE.updateChild(this.indexPath_,Yu);return new se(Ms,e)}toString(){return DP(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I4 extends Pf{compare(e,t){const r=e.node.compareTo(t.node);return r===0?Pa(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return se.MIN}maxPost(){return se.MAX}makePost(e,t){const r=pt(e);return new se(t,r)}toString(){return".value"}}const T4=new I4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zP(n){return{type:"value",snapshotNode:n}}function ua(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function yu(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function vu(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function S4(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e){this.index_=e}updateChild(e,t,r,i,s,o){z(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(r.getChild(i))&&a.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(yu(t,a)):z(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ua(t,r)):o.trackChildChange(vu(t,r,a))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(Qe,(i,s)=>{t.hasChild(i)||r.trackChildChange(yu(i,s))}),t.isLeafNode()||t.forEachChild(Qe,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(vu(i,s,o))}else r.trackChildChange(ua(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?Z.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e){this.indexedFilter_=new av(e.getIndex()),this.index_=e.getIndex(),this.startPost_=wu.getStartPost_(e),this.endPost_=wu.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,i,s,o){return this.matches(new se(t,r))||(r=Z.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,i,s,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=Z.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(Z.EMPTY_NODE);const s=this;return t.forEachChild(Qe,(o,a)=>{s.matches(new se(o,a))||(i=i.updateImmediateChild(o,Z.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A4{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{const r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new wu(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,i,s,o){return this.rangedFilter_.matches(new se(t,r))||(r=Z.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,i,s,o):this.fullLimitUpdateChild_(e,t,r,s,o)}updateFullNode(e,t,r){let i;if(t.isLeafNode()||t.isEmpty())i=Z.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=Z.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(Z.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,Z.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,i,s){let o;if(this.reverse_){const d=this.index_.getCompare();o=(p,_)=>d(_,p)}else o=this.index_.getCompare();const a=e;z(a.numChildren()===this.limit_,"");const l=new se(t,r),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let p=i.getChildAfterChild(this.index_,c,this.reverse_);for(;p!=null&&(p.name===t||a.hasChild(p.name));)p=i.getChildAfterChild(this.index_,p,this.reverse_);const _=p==null?1:o(p,l);if(h&&!r.isEmpty()&&_>=0)return s!=null&&s.trackChildChange(vu(t,r,d)),a.updateImmediateChild(t,r);{s!=null&&s.trackChildChange(yu(t,d));const C=a.updateImmediateChild(t,Z.EMPTY_NODE);return p!=null&&this.rangedFilter_.matches(p)?(s!=null&&s.trackChildChange(ua(p.name,p.node)),C.updateImmediateChild(p.name,p.node)):C}}else return r.isEmpty()?e:h&&o(c,l)>=0?(s!=null&&(s.trackChildChange(yu(c.name,c.node)),s.trackChildChange(ua(t,r))),a.updateImmediateChild(t,r).updateImmediateChild(c.name,Z.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Qe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return z(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return z(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:la}hasEnd(){return this.endSet_}getIndexEndValue(){return z(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return z(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ms}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return z(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Qe}copy(){const e=new xf;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function k4(n){return n.loadsAllData()?new av(n.getIndex()):n.hasLimit()?new A4(n):new wu(n)}function YT(n){const e={};if(n.isDefault())return e;let t;if(n.index_===Qe?t="$priority":n.index_===T4?t="$value":n.index_===Mo?t="$key":(z(n.index_ instanceof E4,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=it(t),n.startSet_){const r=n.startAfterSet_?"startAfter":"startAt";e[r]=it(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+it(n.indexStartName_))}if(n.endSet_){const r=n.endBeforeSet_?"endBefore":"endAt";e[r]=it(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+it(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function JT(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==Qe&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md extends xP{constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Qu("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(z(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=md.getListenId_(e,r),a={};this.listens_[o]=a;const l=YT(e._queryParams);this.restRequest_(s+".json",l,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(s,d,!1,r),Go(this.listens_,o)===a){let p;c?c===401?p="permission_denied":p="rest_error:"+c:p="ok",i(p,null)}})}unlisten(e,t){const r=md.getListenId_(e,t);delete this.listens_[r]}get(e){const t=YT(e._queryParams),r=e._path.toString(),i=new Jd;return this.restRequest_(r+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(r,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ga(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(r&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=iu(a.responseText)}catch{Xt("Failed to parse JSON response for "+o+": "+a.responseText)}r(null,l)}else a.status!==401&&a.status!==404&&Xt("Got unsuccessful REST response for "+o+" Status: "+a.status),r(a.status);r=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C4{constructor(){this.rootNode_=Z.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(){return{value:null,children:new Map}}function $P(n,e,t){if(le(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const r=he(e);n.children.has(r)||n.children.set(r,gd());const i=n.children.get(r);e=ke(e),$P(i,e,t)}}function bg(n,e,t){n.value!==null?t(e,n.value):R4(n,(r,i)=>{const s=new Ae(e.toString()+"/"+r);bg(i,s,t)})}function R4(n,e){n.children.forEach((t,r)=>{e(r,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P4{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Zt(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XT=10*1e3,x4=30*1e3,b4=5*60*1e3;class N4{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new P4(e);const r=XT+(x4-XT)*Math.random();Ll(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),t={};let r=!1;Zt(e,(i,s)=>{s>0&&Vr(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),Ll(this.reportStats_.bind(this),Math.floor(Math.random()*2*b4))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var kn;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(kn||(kn={}));function qP(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function lv(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function uv(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=kn.ACK_USER_WRITE,this.source=qP()}operationForChild(e){if(le(this.path)){if(this.affectedTree.value!=null)return z(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new Ae(e));return new _d(ye(),t,this.revert)}}else return z(he(this.path)===e,"operationForChild called for unrelated child."),new _d(ke(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t){this.source=e,this.path=t,this.type=kn.LISTEN_COMPLETE}operationForChild(e){return le(this.path)?new Eu(this.source,ye()):new Eu(this.source,ke(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=kn.OVERWRITE}operationForChild(e){return le(this.path)?new Fs(this.source,ye(),this.snap.getImmediateChild(e)):new Fs(this.source,ke(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=kn.MERGE}operationForChild(e){if(le(this.path)){const t=this.children.subtree(new Ae(e));return t.isEmpty()?null:t.value?new Fs(this.source,ye(),t.value):new Iu(this.source,ye(),t)}else return z(he(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Iu(this.source,ke(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(le(e))return this.isFullyInitialized()&&!this.filtered_;const t=he(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D4{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function V4(n,e,t,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(S4(o.childName,o.snapshotNode))}),al(n,i,"child_removed",e,r,t),al(n,i,"child_added",e,r,t),al(n,i,"child_moved",s,r,t),al(n,i,"child_changed",e,r,t),al(n,i,"value",e,r,t),i}function al(n,e,t,r,i,s){const o=r.filter(a=>a.type===t);o.sort((a,l)=>L4(n,a,l)),o.forEach(a=>{const l=O4(n,a,s);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function O4(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function L4(n,e,t){if(e.childName==null||t.childName==null)throw ma("Should only compare child_ events.");const r=new se(e.childName,e.snapshotNode),i=new se(t.childName,t.snapshotNode);return n.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(n,e){return{eventCache:n,serverCache:e}}function Ml(n,e,t,r){return bf(new Vi(e,t,r),n.serverCache)}function GP(n,e,t,r){return bf(n.eventCache,new Vi(e,t,r))}function yd(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function js(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xp;const M4=()=>(Xp||(Xp=new Ht(IU)),Xp);class xe{constructor(e,t=M4()){this.value=e,this.children=t}static fromObject(e){let t=new xe(null);return Zt(e,(r,i)=>{t=t.set(new Ae(r),i)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ye(),value:this.value};if(le(e))return null;{const r=he(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(ke(e),t);return s!=null?{path:st(new Ae(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(le(e))return this;{const t=he(e),r=this.children.get(t);return r!==null?r.subtree(ke(e)):new xe(null)}}set(e,t){if(le(e))return new xe(t,this.children);{const r=he(e),s=(this.children.get(r)||new xe(null)).set(ke(e),t),o=this.children.insert(r,s);return new xe(this.value,o)}}remove(e){if(le(e))return this.children.isEmpty()?new xe(null):new xe(null,this.children);{const t=he(e),r=this.children.get(t);if(r){const i=r.remove(ke(e));let s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new xe(null):new xe(this.value,s)}else return this}}get(e){if(le(e))return this.value;{const t=he(e),r=this.children.get(t);return r?r.get(ke(e)):null}}setTree(e,t){if(le(e))return t;{const r=he(e),s=(this.children.get(r)||new xe(null)).setTree(ke(e),t);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new xe(this.value,o)}}fold(e){return this.fold_(ye(),e)}fold_(e,t){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(st(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,ye(),t)}findOnPath_(e,t,r){const i=this.value?r(t,this.value):!1;if(i)return i;if(le(e))return null;{const s=he(e),o=this.children.get(s);return o?o.findOnPath_(ke(e),st(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ye(),t)}foreachOnPath_(e,t,r){if(le(e))return this;{this.value&&r(t,this.value);const i=he(e),s=this.children.get(i);return s?s.foreachOnPath_(ke(e),st(t,i),r):new xe(null)}}foreach(e){this.foreach_(ye(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(st(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this.writeTree_=e}static empty(){return new Nn(new xe(null))}}function Fl(n,e,t){if(le(e))return new Nn(new xe(t));{const r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=jt(i,e);return s=s.updateChild(o,t),new Nn(n.writeTree_.set(i,s))}else{const i=new xe(t),s=n.writeTree_.setTree(e,i);return new Nn(s)}}}function ZT(n,e,t){let r=n;return Zt(t,(i,s)=>{r=Fl(r,st(e,i),s)}),r}function eS(n,e){if(le(e))return Nn.empty();{const t=n.writeTree_.setTree(e,new xe(null));return new Nn(t)}}function Ng(n,e){return Ys(n,e)!=null}function Ys(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(jt(t.path,e)):null}function tS(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(Qe,(r,i)=>{e.push(new se(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new se(r,i.value))}),e}function yi(n,e){if(le(e))return n;{const t=Ys(n,e);return t!=null?new Nn(new xe(t)):new Nn(n.writeTree_.subtree(e))}}function Dg(n){return n.writeTree_.isEmpty()}function ca(n,e){return KP(ye(),n.writeTree_,e)}function KP(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(z(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=KP(st(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(st(n,".priority"),r)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(n,e){return YP(e,n)}function F4(n,e,t,r,i){z(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=Fl(n.visibleWrites,e,t)),n.lastWriteId=r}function j4(n,e){for(let t=0;t<n.allWrites.length;t++){const r=n.allWrites[t];if(r.writeId===e)return r}return null}function U4(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);z(t>=0,"removeWrite called with nonexistent writeId.");const r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&B4(a,r.path)?i=!1:An(r.path,a.path)&&(s=!0)),o--}if(i){if(s)return z4(n),!0;if(r.snap)n.visibleWrites=eS(n.visibleWrites,r.path);else{const a=r.children;Zt(a,l=>{n.visibleWrites=eS(n.visibleWrites,st(r.path,l))})}return!0}else return!1}function B4(n,e){if(n.snap)return An(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&An(st(n.path,t),e))return!0;return!1}function z4(n){n.visibleWrites=WP(n.allWrites,$4,ye()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function $4(n){return n.visible}function WP(n,e,t){let r=Nn.empty();for(let i=0;i<n.length;++i){const s=n[i];if(e(s)){const o=s.path;let a;if(s.snap)An(t,o)?(a=jt(t,o),r=Fl(r,a,s.snap)):An(o,t)&&(a=jt(o,t),r=Fl(r,ye(),s.snap.getChild(a)));else if(s.children){if(An(t,o))a=jt(t,o),r=ZT(r,a,s.children);else if(An(o,t))if(a=jt(o,t),le(a))r=ZT(r,ye(),s.children);else{const l=Go(s.children,he(a));if(l){const c=l.getChild(ke(a));r=Fl(r,ye(),c)}}}else throw ma("WriteRecord should have .snap or .children")}}return r}function HP(n,e,t,r,i){if(!r&&!i){const s=Ys(n.visibleWrites,e);if(s!=null)return s;{const o=yi(n.visibleWrites,e);if(Dg(o))return t;if(t==null&&!Ng(o,ye()))return null;{const a=t||Z.EMPTY_NODE;return ca(o,a)}}}else{const s=yi(n.visibleWrites,e);if(!i&&Dg(s))return t;if(!i&&t==null&&!Ng(s,ye()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(An(c.path,e)||An(e,c.path))},a=WP(n.allWrites,o,e),l=t||Z.EMPTY_NODE;return ca(a,l)}}}function q4(n,e,t){let r=Z.EMPTY_NODE;const i=Ys(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(Qe,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){const s=yi(n.visibleWrites,e);return t.forEachChild(Qe,(o,a)=>{const l=ca(yi(s,new Ae(o)),a);r=r.updateImmediateChild(o,l)}),tS(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=yi(n.visibleWrites,e);return tS(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function G4(n,e,t,r,i){z(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=st(e,t);if(Ng(n.visibleWrites,s))return null;{const o=yi(n.visibleWrites,s);return Dg(o)?i.getChild(t):ca(o,i.getChild(t))}}function K4(n,e,t,r){const i=st(e,t),s=Ys(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){const o=yi(n.visibleWrites,i);return ca(o,r.getNode().getImmediateChild(t))}else return null}function W4(n,e){return Ys(n.visibleWrites,e)}function H4(n,e,t,r,i,s,o){let a;const l=yi(n.visibleWrites,e),c=Ys(l,ye());if(c!=null)a=c;else if(t!=null)a=ca(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const h=[],d=o.getCompare(),p=s?a.getReverseIteratorFrom(r,o):a.getIteratorFrom(r,o);let _=p.getNext();for(;_&&h.length<i;)d(_,r)!==0&&h.push(_),_=p.getNext();return h}else return[]}function Q4(){return{visibleWrites:Nn.empty(),allWrites:[],lastWriteId:-1}}function vd(n,e,t,r){return HP(n.writeTree,n.treePath,e,t,r)}function cv(n,e){return q4(n.writeTree,n.treePath,e)}function nS(n,e,t,r){return G4(n.writeTree,n.treePath,e,t,r)}function wd(n,e){return W4(n.writeTree,st(n.treePath,e))}function Y4(n,e,t,r,i,s){return H4(n.writeTree,n.treePath,e,t,r,i,s)}function hv(n,e,t){return K4(n.writeTree,n.treePath,e,t)}function QP(n,e){return YP(st(n.treePath,e),n.writeTree)}function YP(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J4{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,r=e.childName;z(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),z(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,vu(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,yu(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,ua(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,vu(r,e.snapshotNode,i.oldSnap));else throw ma("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X4{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}}const JP=new X4;class dv{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Vi(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return hv(this.writes_,e,r)}}getChildAfterChild(e,t,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:js(this.viewCache_),s=Y4(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z4(n){return{filter:n}}function eB(n,e){z(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),z(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function tB(n,e,t,r,i){const s=new J4;let o,a;if(t.type===kn.OVERWRITE){const c=t;c.source.fromUser?o=Vg(n,e,c.path,c.snap,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!le(c.path),o=Ed(n,e,c.path,c.snap,r,i,a,s))}else if(t.type===kn.MERGE){const c=t;c.source.fromUser?o=rB(n,e,c.path,c.children,r,i,s):(z(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Og(n,e,c.path,c.children,r,i,a,s))}else if(t.type===kn.ACK_USER_WRITE){const c=t;c.revert?o=oB(n,e,c.path,r,i,s):o=iB(n,e,c.path,c.affectedTree,r,i,s)}else if(t.type===kn.LISTEN_COMPLETE)o=sB(n,e,t.path,r,s);else throw ma("Unknown operation type: "+t.type);const l=s.getChanges();return nB(e,o,l),{viewCache:o,changes:l}}function nB(n,e,t){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=yd(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(zP(yd(e)))}}function XP(n,e,t,r,i,s){const o=e.eventCache;if(wd(r,t)!=null)return e;{let a,l;if(le(t))if(z(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=js(e),h=c instanceof Z?c:Z.EMPTY_NODE,d=cv(r,h);a=n.filter.updateFullNode(e.eventCache.getNode(),d,s)}else{const c=vd(r,js(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=he(t);if(c===".priority"){z(Di(t)===1,"Can't have a priority with additional path components");const h=o.getNode();l=e.serverCache.getNode();const d=nS(r,t,h,l);d!=null?a=n.filter.updatePriority(h,d):a=o.getNode()}else{const h=ke(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const p=nS(r,t,o.getNode(),l);p!=null?d=o.getNode().getImmediateChild(c).updateChild(h,p):d=o.getNode().getImmediateChild(c)}else d=hv(r,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,h,i,s):a=o.getNode()}}return Ml(e,a,o.isFullyInitialized()||le(t),n.filter.filtersNodes())}}function Ed(n,e,t,r,i,s,o,a){const l=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(le(t))c=h.updateFullNode(l.getNode(),r,null);else if(h.filtersNodes()&&!l.isFiltered()){const _=l.getNode().updateChild(t,r);c=h.updateFullNode(l.getNode(),_,null)}else{const _=he(t);if(!l.isCompleteForPath(t)&&Di(t)>1)return e;const T=ke(t),P=l.getNode().getImmediateChild(_).updateChild(T,r);_===".priority"?c=h.updatePriority(l.getNode(),P):c=h.updateChild(l.getNode(),_,P,T,JP,null)}const d=GP(e,c,l.isFullyInitialized()||le(t),h.filtersNodes()),p=new dv(i,d,s);return XP(n,d,t,i,p,a)}function Vg(n,e,t,r,i,s,o){const a=e.eventCache;let l,c;const h=new dv(i,e,s);if(le(t))c=n.filter.updateFullNode(e.eventCache.getNode(),r,o),l=Ml(e,c,!0,n.filter.filtersNodes());else{const d=he(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),r),l=Ml(e,c,a.isFullyInitialized(),a.isFiltered());else{const p=ke(t),_=a.getNode().getImmediateChild(d);let T;if(le(p))T=r;else{const C=h.getCompleteChild(d);C!=null?NP(p)===".priority"&&C.getChild(VP(p)).isEmpty()?T=C:T=C.updateChild(p,r):T=Z.EMPTY_NODE}if(_.equals(T))l=e;else{const C=n.filter.updateChild(a.getNode(),d,T,p,h,o);l=Ml(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function rS(n,e){return n.eventCache.isCompleteForChild(e)}function rB(n,e,t,r,i,s,o){let a=e;return r.foreach((l,c)=>{const h=st(t,l);rS(e,he(h))&&(a=Vg(n,a,h,c,i,s,o))}),r.foreach((l,c)=>{const h=st(t,l);rS(e,he(h))||(a=Vg(n,a,h,c,i,s,o))}),a}function iS(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Og(n,e,t,r,i,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;le(t)?c=r:c=new xe(null).setTree(t,r);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,p)=>{if(h.hasChild(d)){const _=e.serverCache.getNode().getImmediateChild(d),T=iS(n,_,p);l=Ed(n,l,new Ae(d),T,i,s,o,a)}}),c.children.inorderTraversal((d,p)=>{const _=!e.serverCache.isCompleteForChild(d)&&p.value===null;if(!h.hasChild(d)&&!_){const T=e.serverCache.getNode().getImmediateChild(d),C=iS(n,T,p);l=Ed(n,l,new Ae(d),C,i,s,o,a)}}),l}function iB(n,e,t,r,i,s,o){if(wd(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(r.value!=null){if(le(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Ed(n,e,t,l.getNode().getChild(t),i,s,a,o);if(le(t)){let c=new xe(null);return l.getNode().forEachChild(Mo,(h,d)=>{c=c.set(new Ae(h),d)}),Og(n,e,t,c,i,s,a,o)}else return e}else{let c=new xe(null);return r.foreach((h,d)=>{const p=st(t,h);l.isCompleteForPath(p)&&(c=c.set(h,l.getNode().getChild(p)))}),Og(n,e,t,c,i,s,a,o)}}function sB(n,e,t,r,i){const s=e.serverCache,o=GP(e,s.getNode(),s.isFullyInitialized()||le(t),s.isFiltered());return XP(n,o,t,r,JP,i)}function oB(n,e,t,r,i,s){let o;if(wd(r,t)!=null)return e;{const a=new dv(r,e,i),l=e.eventCache.getNode();let c;if(le(t)||he(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=vd(r,js(e));else{const d=e.serverCache.getNode();z(d instanceof Z,"serverChildren would be complete if leaf node"),h=cv(r,d)}h=h,c=n.filter.updateFullNode(l,h,s)}else{const h=he(t);let d=hv(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=l.getImmediateChild(h)),d!=null?c=n.filter.updateChild(l,h,d,ke(t),a,s):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(l,h,Z.EMPTY_NODE,ke(t),a,s):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=vd(r,js(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||wd(r,ye())!=null,Ml(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aB{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new av(r.getIndex()),s=k4(r);this.processor_=Z4(s);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(Z.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(Z.EMPTY_NODE,a.getNode(),null),h=new Vi(l,o.isFullyInitialized(),i.filtersNodes()),d=new Vi(c,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=bf(d,h),this.eventGenerator_=new D4(this.query_)}get query(){return this.query_}}function lB(n){return n.viewCache_.serverCache.getNode()}function uB(n){return yd(n.viewCache_)}function cB(n,e){const t=js(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!le(e)&&!t.getImmediateChild(he(e)).isEmpty())?t.getChild(e):null}function sS(n){return n.eventRegistrations_.length===0}function hB(n,e){n.eventRegistrations_.push(e)}function oS(n,e,t){const r=[];if(t){z(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(t,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<n.eventRegistrations_.length;++s){const o=n.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return r}function aS(n,e,t,r){e.type===kn.MERGE&&e.source.queryId!==null&&(z(js(n.viewCache_),"We should always have a full cache before handling merges"),z(yd(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,s=tB(n.processor_,i,e,t,r);return eB(n.processor_,s.viewCache),z(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,ZP(n,s.changes,s.viewCache.eventCache.getNode(),null)}function dB(n,e){const t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(Qe,(s,o)=>{r.push(ua(s,o))}),t.isFullyInitialized()&&r.push(zP(t.getNode())),ZP(n,r,t.getNode(),e)}function ZP(n,e,t,r){const i=r?[r]:n.eventRegistrations_;return V4(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Id;class ex{constructor(){this.views=new Map}}function fB(n){z(!Id,"__referenceConstructor has already been defined"),Id=n}function pB(){return z(Id,"Reference.ts has not been loaded"),Id}function mB(n){return n.views.size===0}function fv(n,e,t,r){const i=e.source.queryId;if(i!==null){const s=n.views.get(i);return z(s!=null,"SyncTree gave us an op for an invalid query."),aS(s,e,t,r)}else{let s=[];for(const o of n.views.values())s=s.concat(aS(o,e,t,r));return s}}function tx(n,e,t,r,i){const s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=vd(t,i?r:null),l=!1;a?l=!0:r instanceof Z?(a=cv(t,r),l=!1):(a=Z.EMPTY_NODE,l=!1);const c=bf(new Vi(a,l,!1),new Vi(r,i,!1));return new aB(e,c)}return o}function gB(n,e,t,r,i,s){const o=tx(n,e,r,i,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),hB(o,t),dB(o,t)}function _B(n,e,t,r){const i=e._queryIdentifier,s=[];let o=[];const a=Oi(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(oS(c,t,r)),sS(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||s.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(oS(l,t,r)),sS(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||s.push(l.query)))}return a&&!Oi(n)&&s.push(new(pB())(e._repo,e._path)),{removed:s,events:o}}function nx(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function vi(n,e){let t=null;for(const r of n.views.values())t=t||cB(r,e);return t}function rx(n,e){if(e._queryParams.loadsAllData())return Df(n);{const r=e._queryIdentifier;return n.views.get(r)}}function ix(n,e){return rx(n,e)!=null}function Oi(n){return Df(n)!=null}function Df(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Td;function yB(n){z(!Td,"__referenceConstructor has already been defined"),Td=n}function vB(){return z(Td,"Reference.ts has not been loaded"),Td}let wB=1;class lS{constructor(e){this.listenProvider_=e,this.syncPointTree_=new xe(null),this.pendingWriteTree_=Q4(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function sx(n,e,t,r,i){return F4(n.pendingWriteTree_,e,t,r,i),i?Xu(n,new Fs(qP(),e,t)):[]}function ms(n,e,t=!1){const r=j4(n.pendingWriteTree_,e);if(U4(n.pendingWriteTree_,e)){let s=new xe(null);return r.snap!=null?s=s.set(ye(),!0):Zt(r.children,o=>{s=s.set(new Ae(o),!0)}),Xu(n,new _d(r.path,s,t))}else return[]}function Ju(n,e,t){return Xu(n,new Fs(lv(),e,t))}function EB(n,e,t){const r=xe.fromObject(t);return Xu(n,new Iu(lv(),e,r))}function IB(n,e){return Xu(n,new Eu(lv(),e))}function TB(n,e,t){const r=mv(n,t);if(r){const i=gv(r),s=i.path,o=i.queryId,a=jt(s,e),l=new Eu(uv(o),a);return _v(n,s,l)}else return[]}function ox(n,e,t,r,i=!1){const s=e._path,o=n.syncPointTree_.get(s);let a=[];if(o&&(e._queryIdentifier==="default"||ix(o,e))){const l=_B(o,e,t,r);mB(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));const c=l.removed;if(a=l.events,!i){const h=c.findIndex(p=>p._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(s,(p,_)=>Oi(_));if(h&&!d){const p=n.syncPointTree_.subtree(s);if(!p.isEmpty()){const _=CB(p);for(let T=0;T<_.length;++T){const C=_[T],P=C.query,y=cx(n,C);n.listenProvider_.startListening(jl(P),Tu(n,P),y.hashFn,y.onComplete)}}}!d&&c.length>0&&!r&&(h?n.listenProvider_.stopListening(jl(e),null):c.forEach(p=>{const _=n.queryToTagMap.get(Vf(p));n.listenProvider_.stopListening(jl(p),_)}))}RB(n,c)}return a}function ax(n,e,t,r){const i=mv(n,r);if(i!=null){const s=gv(i),o=s.path,a=s.queryId,l=jt(o,e),c=new Fs(uv(a),l,t);return _v(n,o,c)}else return[]}function SB(n,e,t,r){const i=mv(n,r);if(i){const s=gv(i),o=s.path,a=s.queryId,l=jt(o,e),c=xe.fromObject(t),h=new Iu(uv(a),l,c);return _v(n,o,h)}else return[]}function AB(n,e,t,r=!1){const i=e._path;let s=null,o=!1;n.syncPointTree_.foreachOnPath(i,(p,_)=>{const T=jt(p,i);s=s||vi(_,T),o=o||Oi(_)});let a=n.syncPointTree_.get(i);a?(o=o||Oi(a),s=s||vi(a,ye())):(a=new ex,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;s!=null?l=!0:(l=!1,s=Z.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((_,T)=>{const C=vi(T,ye());C&&(s=s.updateImmediateChild(_,C))}));const c=ix(a,e);if(!c&&!e._queryParams.loadsAllData()){const p=Vf(e);z(!n.queryToTagMap.has(p),"View does not exist, but we have a tag");const _=PB();n.queryToTagMap.set(p,_),n.tagToQueryMap.set(_,p)}const h=Nf(n.pendingWriteTree_,i);let d=gB(a,e,t,h,s,l);if(!c&&!o&&!r){const p=rx(a,e);d=d.concat(xB(n,e,p))}return d}function pv(n,e,t){const i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=jt(o,e),c=vi(a,l);if(c)return c});return HP(i,e,s,t,!0)}function kB(n,e){const t=e._path;let r=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const d=jt(c,t);r=r||vi(h,d)});let i=n.syncPointTree_.get(t);i?r=r||vi(i,ye()):(i=new ex,n.syncPointTree_=n.syncPointTree_.set(t,i));const s=r!=null,o=s?new Vi(r,!0,!1):null,a=Nf(n.pendingWriteTree_,e._path),l=tx(i,e,a,s?o.getNode():Z.EMPTY_NODE,s);return uB(l)}function Xu(n,e){return lx(e,n.syncPointTree_,null,Nf(n.pendingWriteTree_,ye()))}function lx(n,e,t,r){if(le(n.path))return ux(n,e,t,r);{const i=e.get(ye());t==null&&i!=null&&(t=vi(i,ye()));let s=[];const o=he(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,h=QP(r,o);s=s.concat(lx(a,l,c,h))}return i&&(s=s.concat(fv(i,n,r,t))),s}}function ux(n,e,t,r){const i=e.get(ye());t==null&&i!=null&&(t=vi(i,ye()));let s=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=QP(r,o),h=n.operationForChild(o);h&&(s=s.concat(ux(h,a,l,c)))}),i&&(s=s.concat(fv(i,n,r,t))),s}function cx(n,e){const t=e.query,r=Tu(n,t);return{hashFn:()=>(lB(e)||Z.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?TB(n,t._path,r):IB(n,t._path);{const s=AU(i,t);return ox(n,t,null,s)}}}}function Tu(n,e){const t=Vf(e);return n.queryToTagMap.get(t)}function Vf(n){return n._path.toString()+"$"+n._queryIdentifier}function mv(n,e){return n.tagToQueryMap.get(e)}function gv(n){const e=n.indexOf("$");return z(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new Ae(n.substr(0,e))}}function _v(n,e,t){const r=n.syncPointTree_.get(e);z(r,"Missing sync point for query tag that we're tracking");const i=Nf(n.pendingWriteTree_,e);return fv(r,t,i,null)}function CB(n){return n.fold((e,t,r)=>{if(t&&Oi(t))return[Df(t)];{let i=[];return t&&(i=nx(t)),Zt(r,(s,o)=>{i=i.concat(o)}),i}})}function jl(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(vB())(n._repo,n._path):n}function RB(n,e){for(let t=0;t<e.length;++t){const r=e[t];if(!r._queryParams.loadsAllData()){const i=Vf(r),s=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(s)}}}function PB(){return wB++}function xB(n,e,t){const r=e._path,i=Tu(n,e),s=cx(n,t),o=n.listenProvider_.startListening(jl(e),i,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(r);if(i)z(!Oi(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,h,d)=>{if(!le(c)&&h&&Oi(h))return[Df(h).query];{let p=[];return h&&(p=p.concat(nx(h).map(_=>_.query))),Zt(d,(_,T)=>{p=p.concat(T)}),p}});for(let c=0;c<l.length;++c){const h=l[c];n.listenProvider_.stopListening(jl(h),Tu(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new yv(t)}node(){return this.node_}}class vv{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=st(this.path_,e);return new vv(this.syncTree_,t)}node(){return pv(this.syncTree_,this.path_)}}const bB=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},uS=function(n,e,t){if(!n||typeof n!="object")return n;if(z(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return NB(n[".sv"],e,t);if(typeof n[".sv"]=="object")return DB(n[".sv"],e);z(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},NB=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:z(!1,"Unexpected server value: "+n)}},DB=function(n,e,t){n.hasOwnProperty("increment")||z(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const r=n.increment;typeof r!="number"&&z(!1,"Unexpected increment value: "+r);const i=e.node();if(z(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},VB=function(n,e,t,r){return wv(e,new vv(t,n),r)},hx=function(n,e,t){return wv(n,new yv(e),t)};function wv(n,e,t){const r=n.getPriority().val(),i=uS(r,e.getImmediateChild(".priority"),t);let s;if(n.isLeafNode()){const o=n,a=uS(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new ut(a,pt(i)):n}else{const o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new ut(i))),o.forEachChild(Qe,(a,l)=>{const c=wv(l,e.getImmediateChild(a),t);c!==l&&(s=s.updateImmediateChild(a,c))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}}function Iv(n,e){let t=e instanceof Ae?e:new Ae(e),r=n,i=he(t);for(;i!==null;){const s=Go(r.node.children,i)||{children:{},childCount:0};r=new Ev(i,r,s),t=ke(t),i=he(t)}return r}function ba(n){return n.node.value}function dx(n,e){n.node.value=e,Lg(n)}function fx(n){return n.node.childCount>0}function OB(n){return ba(n)===void 0&&!fx(n)}function Of(n,e){Zt(n.node.children,(t,r)=>{e(new Ev(t,n,r))})}function px(n,e,t,r){t&&e(n),Of(n,i=>{px(i,e,!0)})}function LB(n,e,t){let r=n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Zu(n){return new Ae(n.parent===null?n.name:Zu(n.parent)+"/"+n.name)}function Lg(n){n.parent!==null&&MB(n.parent,n.name,n)}function MB(n,e,t){const r=OB(t),i=Vr(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,Lg(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Lg(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FB=/[\[\].#$\/\u0000-\u001F\u007F]/,jB=/[\[\].#$\u0000-\u001F\u007F]/,Zp=10*1024*1024,mx=function(n){return typeof n=="string"&&n.length!==0&&!FB.test(n)},gx=function(n){return typeof n=="string"&&n.length!==0&&!jB.test(n)},UB=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),gx(n)},BB=function(n,e,t,r){Tv(M_(n,"value"),e,t)},Tv=function(n,e,t){const r=t instanceof Ae?new i4(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ss(r));if(typeof e=="function")throw new Error(n+"contains a function "+ss(r)+" with contents = "+e.toString());if(hP(e))throw new Error(n+"contains "+e.toString()+" "+ss(r));if(typeof e=="string"&&e.length>Zp/3&&Xd(e)>Zp)throw new Error(n+"contains a string greater than "+Zp+" utf8 bytes "+ss(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Zt(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!mx(o)))throw new Error(n+" contains an invalid key ("+o+") "+ss(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);s4(r,o),Tv(n,a,r),o4(r)}),i&&s)throw new Error(n+' contains ".value" child '+ss(r)+" in addition to actual children.")}},Sv=function(n,e,t,r){if(!gx(t))throw new Error(M_(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},zB=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Sv(n,e,t)},Av=function(n,e){if(he(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},$B=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!mx(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!UB(t))throw new Error(M_(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qB{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function _x(n,e){let t=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();t!==null&&!OP(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function Yn(n,e,t){_x(n,t),GB(n,r=>An(r,e)||An(e,r))}function GB(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){const i=n.eventLists_[r];if(i){const s=i.path;e(s)?(KB(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function KB(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const r=t.getEventRunner();Ol&&bt("event: "+t.toString()),xa(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WB="repo_interrupt",HB=25;class QB{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new qB,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=gd(),this.transactionQueueTree_=new Ev,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function YB(n,e,t){if(n.stats_=rv(n.repoInfo_),n.forceRestClient_||PU())n.server_=new md(n.repoInfo_,(r,i,s,o)=>{cS(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>hS(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{it(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new Ir(n.repoInfo_,e,(r,i,s,o)=>{cS(n,r,i,s,o)},r=>{hS(n,r)},r=>{XB(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=VU(n.repoInfo_,()=>new N4(n.stats_,n.server_)),n.infoData_=new C4,n.infoSyncTree_=new lS({startListening:(r,i,s,o)=>{let a=[];const l=n.infoData_.getNode(r._path);return l.isEmpty()||(a=Ju(n.infoSyncTree_,r._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Cv(n,"connected",!1),n.serverSyncTree_=new lS({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(a,l)=>{const c=o(a,l);Yn(n.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function JB(n){const t=n.infoData_.getNode(new Ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function kv(n){return bB({timestamp:JB(n)})}function cS(n,e,t,r,i){n.dataUpdateCount++;const s=new Ae(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){const l=Gh(t,c=>pt(c));o=SB(n.serverSyncTree_,s,l,i)}else{const l=pt(t);o=ax(n.serverSyncTree_,s,l,i)}else if(r){const l=Gh(t,c=>pt(c));o=EB(n.serverSyncTree_,s,l)}else{const l=pt(t);o=Ju(n.serverSyncTree_,s,l)}let a=s;o.length>0&&(a=Mf(n,s)),Yn(n.eventQueue_,a,o)}function hS(n,e){Cv(n,"connected",e),e===!1&&tz(n)}function XB(n,e){Zt(e,(t,r)=>{Cv(n,t,r)})}function Cv(n,e,t){const r=new Ae("/.info/"+e),i=pt(t);n.infoData_.updateSnapshot(r,i);const s=Ju(n.infoSyncTree_,r,i);Yn(n.eventQueue_,r,s)}function yx(n){return n.nextWriteId_++}function ZB(n,e,t){const r=kB(n.serverSyncTree_,e);return r!=null?Promise.resolve(r):n.server_.get(e).then(i=>{const s=pt(i).withIndex(e._queryParams.getIndex());AB(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Ju(n.serverSyncTree_,e._path,s);else{const a=Tu(n.serverSyncTree_,e);o=ax(n.serverSyncTree_,e._path,s,a)}return Yn(n.eventQueue_,e._path,o),ox(n.serverSyncTree_,e,t,null,!0),s},i=>(Lf(n,"get for query "+it(e)+" failed: "+i),Promise.reject(new Error(i))))}function ez(n,e,t,r,i){Lf(n,"set",{path:e.toString(),value:t,priority:r});const s=kv(n),o=pt(t,r),a=pv(n.serverSyncTree_,e),l=hx(o,a,s),c=yx(n),h=sx(n.serverSyncTree_,e,l,c,!0);_x(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(p,_)=>{const T=p==="ok";T||Xt("set at "+e+" failed: "+p);const C=ms(n.serverSyncTree_,c,!T);Yn(n.eventQueue_,e,C),rz(n,i,p,_)});const d=Tx(n,e);Mf(n,d),Yn(n.eventQueue_,d,[])}function tz(n){Lf(n,"onDisconnectEvents");const e=kv(n),t=gd();bg(n.onDisconnect_,ye(),(i,s)=>{const o=VB(i,s,n.serverSyncTree_,e);$P(t,i,o)});let r=[];bg(t,ye(),(i,s)=>{r=r.concat(Ju(n.serverSyncTree_,i,s));const o=Tx(n,i);Mf(n,o)}),n.onDisconnect_=gd(),Yn(n.eventQueue_,ye(),r)}function nz(n){n.persistentConnection_&&n.persistentConnection_.interrupt(WB)}function Lf(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),bt(t,...e)}function rz(n,e,t,r){e&&xa(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function vx(n,e,t){return pv(n.serverSyncTree_,e,t)||Z.EMPTY_NODE}function Rv(n,e=n.transactionQueueTree_){if(e||Ff(n,e),ba(e)){const t=Ex(n,e);z(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&iz(n,Zu(e),t)}else fx(e)&&Of(e,t=>{Rv(n,t)})}function iz(n,e,t){const r=t.map(c=>c.currentWriteId),i=vx(n,e,r);let s=i;const o=i.hash();for(let c=0;c<t.length;c++){const h=t[c];z(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=jt(e,h.path);s=s.updateChild(d,h.currentOutputSnapshotRaw)}const a=s.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Lf(n,"transaction put response",{path:l.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let p=0;p<t.length;p++)t[p].status=2,h=h.concat(ms(n.serverSyncTree_,t[p].currentWriteId)),t[p].onComplete&&d.push(()=>t[p].onComplete(null,!0,t[p].currentOutputSnapshotResolved)),t[p].unwatcher();Ff(n,Iv(n.transactionQueueTree_,e)),Rv(n,n.transactionQueueTree_),Yn(n.eventQueue_,e,h);for(let p=0;p<d.length;p++)xa(d[p])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{Xt("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}Mf(n,e)}},o)}function Mf(n,e){const t=wx(n,e),r=Zu(t),i=Ex(n,t);return sz(n,i,r),r}function sz(n,e,t){if(e.length===0)return;const r=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=jt(t,l.path);let h=!1,d;if(z(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)h=!0,d=l.abortReason,i=i.concat(ms(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=HB)h=!0,d="maxretry",i=i.concat(ms(n.serverSyncTree_,l.currentWriteId,!0));else{const p=vx(n,l.path,o);l.currentInputSnapshot=p;const _=e[a].update(p.val());if(_!==void 0){Tv("transaction failed: Data returned ",_,l.path);let T=pt(_);typeof _=="object"&&_!=null&&Vr(_,".priority")||(T=T.updatePriority(p.getPriority()));const P=l.currentWriteId,y=kv(n),I=hx(T,p,y);l.currentOutputSnapshotRaw=T,l.currentOutputSnapshotResolved=I,l.currentWriteId=yx(n),o.splice(o.indexOf(P),1),i=i.concat(sx(n.serverSyncTree_,l.path,I,l.currentWriteId,l.applyLocally)),i=i.concat(ms(n.serverSyncTree_,P,!0))}else h=!0,d="nodata",i=i.concat(ms(n.serverSyncTree_,l.currentWriteId,!0))}Yn(n.eventQueue_,t,i),i=[],h&&(e[a].status=2,function(p){setTimeout(p,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?r.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):r.push(()=>e[a].onComplete(new Error(d),!1,null))))}Ff(n,n.transactionQueueTree_);for(let a=0;a<r.length;a++)xa(r[a]);Rv(n,n.transactionQueueTree_)}function wx(n,e){let t,r=n.transactionQueueTree_;for(t=he(e);t!==null&&ba(r)===void 0;)r=Iv(r,t),e=ke(e),t=he(e);return r}function Ex(n,e){const t=[];return Ix(n,e,t),t.sort((r,i)=>r.order-i.order),t}function Ix(n,e,t){const r=ba(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);Of(e,i=>{Ix(n,i,t)})}function Ff(n,e){const t=ba(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,dx(e,t.length>0?t:void 0)}Of(e,r=>{Ff(n,r)})}function Tx(n,e){const t=Zu(wx(n,e)),r=Iv(n.transactionQueueTree_,e);return LB(r,i=>{em(n,i)}),em(n,r),px(r,i=>{em(n,i)}),t}function em(n,e){const t=ba(e);if(t){const r=[];let i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(z(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(z(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ms(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?dx(e,void 0):t.length=s+1,Yn(n.eventQueue_,Zu(e),i);for(let o=0;o<r.length;o++)xa(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oz(n){let e="";const t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function az(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Xt(`Invalid query segment '${t}' in query '${n}'`)}return e}const dS=function(n,e){const t=lz(n),r=t.namespace;t.domain==="firebase.com"&&Nr(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&Nr("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||wU();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new TP(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new Ae(t.pathString)}},lz=function(n){let e="",t="",r="",i="",s="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(h,d)),h<d&&(i=oz(n.substring(h,d)));const p=az(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const T=e.indexOf(".");r=e.substring(0,T).toLowerCase(),t=e.substring(T+1),s=r}"ns"in p&&(s=p.ns)}return{host:e,port:l,domain:t,subdomain:r,secure:o,scheme:a,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uz{constructor(e,t,r,i){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+it(this.snapshot.exportVal())}}class cz{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hz{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return z(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class jf{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return le(this._path)?null:NP(this._path)}get ref(){return new tr(this._repo,this._path)}get _queryIdentifier(){const e=JT(this._queryParams),t=tv(e);return t==="{}"?"default":t}get _queryObject(){return JT(this._queryParams)}isEqual(e){if(e=ue(e),!(e instanceof jf))return!1;const t=this._repo===e._repo,r=OP(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+r4(this._path)}}class tr extends jf{constructor(e,t){super(e,t,new xf,!1)}get parent(){const e=VP(this._path);return e===null?null:new tr(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ha{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new Ae(e),r=Ad(this.ref,e);return new ha(this._node.getChild(t),r,Qe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new ha(i,Ad(this.ref,r),Qe)))}hasChild(e){const t=new Ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Sd(n,e){return n=ue(n),n._checkNotDeleted("ref"),e!==void 0?Ad(n._root,e):n._root}function Ad(n,e){return n=ue(n),he(n._path)===null?zB("child","path",e):Sv("child","path",e),new tr(n._repo,st(n._path,e))}function Sx(n){return Av("remove",n._path),Ax(n,null)}function Ax(n,e){n=ue(n),Av("set",n._path),BB("set",e,n._path);const t=new Jd;return ez(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Pv(n){n=ue(n);const e=new hz(()=>{}),t=new xv(e);return ZB(n._repo,n,t).then(r=>new ha(r,new tr(n._repo,n._path),n._queryParams.getIndex()))}class xv{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const r=t._queryParams.getIndex();return new uz("value",this,new ha(e.snapshotNode,new tr(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new cz(this,e,t):null}matches(e){return e instanceof xv?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}fB(tr);yB(tr);/**
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
 */const dz="FIREBASE_DATABASE_EMULATOR_HOST",Mg={};let fz=!1;function pz(n,e,t,r){n.repoInfo_=new TP(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),r&&(n.authTokenProvider_=r)}function kx(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||Nr("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),bt("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=dS(s,i),a=o.repoInfo,l;typeof process<"u"&&DT&&(l=DT[dz]),l?(s=`http://${l}?ns=${a.namespace}`,o=dS(s,i),a=o.repoInfo):o.repoInfo.secure;const c=new bU(n.name,n.options,e);$B("Invalid Firebase Database URL",o),le(o.path)||Nr("Database URL must point to the root of a Firebase Database (not including a child path).");const h=gz(a,n,c,new xU(n.name,t));return new Cx(h,n)}function mz(n,e){const t=Mg[e];(!t||t[n.key]!==n)&&Nr(`Database ${e}(${n.repoInfo_}) has already been deleted.`),nz(n),delete t[n.key]}function gz(n,e,t,r){let i=Mg[e.name];i||(i={},Mg[e.name]=i);let s=i[n.toURLString()];return s&&Nr("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new QB(n,fz,t,r),i[n.toURLString()]=s,s}class Cx{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(YB(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new tr(this._repo,ye())),this._rootInternal}_delete(){return this._rootInternal!==null&&(mz(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Nr("Cannot call "+e+" on a deleted database.")}}function Rx(n=ef(),e){const t=$s(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const r=V_("database");r&&Px(t,...r)}return t}function Px(n,e,t,r={}){n=ue(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&Nr("Cannot call useEmulator() after instance has already been initialized.");const i=n._repoInternal;let s;if(i.repoInfo_.nodeAdmin)r.mockUserToken&&Nr('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new yh(yh.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:O_(r.mockUserToken,n.app.options.projectId);s=new yh(o)}pz(i,e,t,s)}/**
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
 */function _z(n){lP(Ui),Ti(new Cr("database",(e,{instanceIdentifier:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return kx(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),pn(VT,OT,n),pn(VT,OT,"esm2017")}Ir.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ir.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};_z();const xx=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:ha,Database:Cx,_QueryImpl:jf,_QueryParams:xf,_ReferenceImpl:tr,_repoManagerDatabaseFromApp:kx,_setSDKVersion:lP,_validatePathString:Sv,_validateWritablePath:Av,child:Ad,connectDatabaseEmulator:Px,get:Pv,getDatabase:Rx,ref:Sd,remove:Sx,set:Ax},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bx="firebasestorage.googleapis.com",yz="storageBucket",vz=2*60*1e3,wz=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr extends Zn{constructor(e,t,r=0){super(tm(e),`Firebase Storage: ${t} (${tm(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,nr.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return tm(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Jn;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Jn||(Jn={}));function tm(n){return"storage/"+n}function Ez(){const n="An unknown error occurred, please check the error payload for server response.";return new nr(Jn.UNKNOWN,n)}function Iz(){return new nr(Jn.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Tz(){return new nr(Jn.CANCELED,"User canceled the upload/download.")}function Sz(n){return new nr(Jn.INVALID_URL,"Invalid URL '"+n+"'.")}function Az(n){return new nr(Jn.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function fS(n){return new nr(Jn.INVALID_ARGUMENT,n)}function Nx(){return new nr(Jn.APP_DELETED,"The Firebase app was deleted.")}function kz(n){return new nr(Jn.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=Cn.makeFromUrl(e,t)}catch{return new Cn(e,"")}if(r.path==="")return r;throw Az(e)}static makeFromUrl(e,t){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(D){D.path.charAt(D.path.length-1)==="/"&&(D.path_=D.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function c(D){D.path_=decodeURIComponent(D.path)}const h="v[A-Za-z0-9_]+",d=t.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",_=new RegExp(`^https?://${d}/${h}/b/${i}/o${p}`,"i"),T={bucket:1,path:3},C=t===bx?"(?:storage.googleapis.com|storage.cloud.google.com)":t,P="([^?#]*)",y=new RegExp(`^https?://${C}/${i}/${P}`,"i"),S=[{regex:a,indices:l,postModify:s},{regex:_,indices:T,postModify:c},{regex:y,indices:{bucket:1,path:2},postModify:c}];for(let D=0;D<S.length;D++){const F=S[D],M=F.regex.exec(e);if(M){const k=M[F.indices.bucket];let w=M[F.indices.path];w||(w=""),r=new Cn(k,w),F.postModify(r);break}}if(r==null)throw Sz(e);return r}}class Cz{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rz(n,e,t){let r=1,i=null,s=null,o=!1,a=0;function l(){return a===2}let c=!1;function h(...P){c||(c=!0,e.apply(null,P))}function d(P){i=setTimeout(()=>{i=null,n(_,l())},P)}function p(){s&&clearTimeout(s)}function _(P,...y){if(c){p();return}if(P){p(),h.call(null,P,...y);return}if(l()||o){p(),h.call(null,P,...y);return}r<64&&(r*=2);let S;a===1?(a=2,S=0):S=(r+Math.random())*1e3,d(S)}let T=!1;function C(P){T||(T=!0,p(),!c&&(i!==null?(P||(a=2),clearTimeout(i),d(0)):P||(a=1)))}return d(0),s=setTimeout(()=>{o=!0,C(!0)},t),C}function Pz(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xz(n){return n!==void 0}function pS(n,e,t,r){if(r<e)throw fS(`Invalid value for '${n}'. Expected ${e} or greater.`);if(r>t)throw fS(`Invalid value for '${n}'. Expected ${t} or less.`)}function bz(n){const e=encodeURIComponent;let t="?";for(const r in n)if(n.hasOwnProperty(r)){const i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var kd;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(kd||(kd={}));/**
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
 */function Nz(n,e){const t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dz{constructor(e,t,r,i,s,o,a,l,c,h,d,p=!0){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=c,this.progressCallback_=h,this.connectionFactory_=d,this.retry=p,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,T)=>{this.resolve_=_,this.reject_=T,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new Wc(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const l=a.loaded,c=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===kd.NO_ERROR,l=s.getStatus();if(!a||Nz(l,this.additionalRetryCodes_)&&this.retry){const h=s.getErrorCode()===kd.ABORT;r(!1,new Wc(!1,null,h));return}const c=this.successCodes_.indexOf(l)!==-1;r(!0,new Wc(c,s))})},t=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());xz(l)?s(l):s()}catch(l){o(l)}else if(a!==null){const l=Ez();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?Nx():Tz();o(l)}else{const l=Iz();o(l)}};this.canceled_?t(!1,new Wc(!1,null,!0)):this.backoffId_=Rz(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Pz(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Wc{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}}function Vz(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Oz(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Lz(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Mz(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Fz(n,e,t,r,i,s,o=!0){const a=bz(n.urlParams),l=n.url+a,c=Object.assign({},n.headers);return Lz(c,e),Vz(c,t),Oz(c,s),Mz(c,r),new Dz(l,n.method,c,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jz(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Uz(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */class Cd{constructor(e,t){this._service=e,t instanceof Cn?this._location=t:this._location=Cn.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new Cd(e,t)}get root(){const e=new Cn(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Uz(this._location.path)}get storage(){return this._service}get parent(){const e=jz(this._location.path);if(e===null)return null;const t=new Cn(this._location.bucket,e);return new Cd(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw kz(e)}}function mS(n,e){const t=e==null?void 0:e[yz];return t==null?null:Cn.makeFromBucketSpec(t,n)}function Bz(n,e,t,r={}){n.host=`${e}:${t}`,n._protocol="http";const{mockUserToken:i}=r;i&&(n._overrideAuthToken=typeof i=="string"?i:O_(i,n.app.options.projectId))}class zz{constructor(e,t,r,i,s){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._bucket=null,this._host=bx,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=vz,this._maxUploadRetryTime=wz,this._requests=new Set,i!=null?this._bucket=Cn.makeFromBucketSpec(i,this._host):this._bucket=mS(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Cn.makeFromBucketSpec(this._url,e):this._bucket=mS(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){pS("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){pS("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new Cd(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new Cz(Nx());{const o=Fz(e,this._appId,r,i,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}}const gS="@firebase/storage",_S="0.13.2";/**
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
 */const Dx="storage";function $z(n=ef(),e){n=ue(n);const r=$s(n,Dx).getImmediate({identifier:e}),i=V_("storage");return i&&qz(r,...i),r}function qz(n,e,t,r={}){Bz(n,e,t,r)}function Gz(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new zz(t,r,i,e,Ui)}function Kz(){Ti(new Cr(Dx,Gz,"PUBLIC").setMultipleInstances(!0)),pn(gS,_S,""),pn(gS,_S,"esm2017")}Kz();const Vx={apiKey:"AIzaSyAAm1ylv5H4McTNvOut_0UdgiAFdxBBumI",authDomain:"my-app-e7f8c.firebaseapp.com",projectId:"my-app-e7f8c",storageBucket:"my-app-e7f8c.firebasestorage.app",messagingSenderId:"622104139221",appId:"1:622104139221:android:294ad10f9eed7350acd95c",databaseURL:"https://my-app-e7f8c-default-rtdb.asia-southeast1.firebasedatabase.app"},Rd="bangexx01@gmail.com",ec=QA(Vx),Dn=ML(ec),Xn=FR(ec),Pd=Rx(ec),Wz=$z(ec),bv=Object.freeze(Object.defineProperty({__proto__:null,PEMILIK:Rd,app:ec,auth:Dn,db:Xn,firebaseConfig:Vx,rtdb:Pd,storage:Wz},Symbol.toStringTag,{value:"Module"})),Ox=[{grup:"DASHBOARD",isi:[["dashboard","insights","Dashboard"]]},{grup:"USER MANAGEMENT",isi:[["user","person","User"],["room","mic","Room"],["staf","badge","Host & Agency"],["cs","support_agent","Customer Service"],["seller","storefront","Coin Seller"],["laporan","flag","Laporan user"],["family","diversity_3","Family"]]},{grup:"FINANCIAL MANAGEMENT",isi:[["vipharga","workspace_premium","Plan (harga VIP)"],["cekin","event_available","Plan history (cek in)"],["wallet","account_balance_wallet","Currency (coin & reset)"],["gift","redeem","Gift"],["cashback","savings","Cashback gift"]]},{grup:"GAMING",isi:[["katalog","sports_esports","Katalog game"],["pasang","link","Pasang game"],["bet","casino","Bet game"],["greedy","toll","Greedy King"],["fruit","nutrition","Crazy Fruit"],["roket","rocket_launch","Hadiah roket"],["reward","emoji_events","Reward room"]]},{grup:"ENGAGEMENT",isi:[["emote","mood","Reaction (emote)"],["kirim","send","Kirim ke user"],["pengumuman","campaign","Broadcast & pengumuman"]]},{grup:"CONTENT MANAGEMENT",isi:[["frame","image","Frame & banner"],["aset","auto_awesome","Aset & VIP"],["asetvps","folder_open","Aset di VPS"],["latar","wallpaper","Background tab"]]},{grup:"DATA",isi:[["database","storage","Database"],["log","history","Log admin"]]},{grup:"CONFIG",isi:[["pengaturan","settings","Pengaturan"]]}],Hz=Ox.flatMap(n=>n.isi).reduce((n,[e,,t])=>({...n,[e]:t}),{}),Qz="modulepreload",Yz=function(n,e){return new URL(n,e).href},yS={},Li=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(c=>{if(c=Yz(c,r),c in yS)return;yS[c]=!0;const h=c.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(!!r)for(let T=o.length-1;T>=0;T--){const C=o[T];if(C.href===c&&(!h||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${d}`))return;const _=document.createElement("link");if(_.rel=h?"stylesheet":Qz,h||(_.as="script"),_.crossOrigin="",_.href=c,l&&_.setAttribute("nonce",l),document.head.appendChild(_),h)return new Promise((T,C)=>{_.addEventListener("load",T),_.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Jz=45e3,gs=new Map;async function Lx(n,e){return(await Jy(Wy(Ef(Xn,n),Hy(e)))).docs.map(r=>({id:r.id,...r.data()}))}function vS(n,e=500){const t=n+"|"+e,r=gs.get(t);if(r!=null&&r.janji)return r.janji;if(r&&Date.now()-r.waktu<Jz)return Promise.resolve(r.isi);const i=Lx(n,e).then(s=>(gs.set(t,{isi:s,waktu:Date.now(),janji:null}),s)).catch(()=>r?r.isi:[]);return gs.set(t,{isi:(r==null?void 0:r.isi)||[],waktu:(r==null?void 0:r.waktu)||0,janji:i}),i}function Tn(n,e=500){const t=n+"|"+e,[r,i]=W.useState(()=>{var a;return((a=gs.get(t))==null?void 0:a.isi)||[]}),[s,o]=W.useState(!gs.get(t));return W.useEffect(()=>{var l;let a=!0;return o(!((l=gs.get(t))!=null&&l.waktu)),vS(n,e).then(c=>{a&&(i(c),o(!1))}),()=>{a=!1}},[n,e]),{isi:r,memuat:s,segarkan:()=>(gs.delete(t),vS(n,e))}}const be=n=>new Intl.NumberFormat("id-ID").format(Number(n)||0),Ul=n=>{if(!n)return"—";const e=n.toDate?n.toDate():new Date(n);return isNaN(e)?"—":e.toLocaleString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})};async function Hn(n,e=""){var t;try{const{addDoc:r,serverTimestamp:i}=await Li(async()=>{const{addDoc:o,serverTimestamp:a}=await Promise.resolve().then(()=>ev);return{addDoc:o,serverTimestamp:a}},void 0,import.meta.url),{auth:s}=await Li(async()=>{const{auth:o}=await Promise.resolve().then(()=>bv);return{auth:o}},void 0,import.meta.url);await r(Ef(Xn,"adminLogs"),{admin:((t=s.currentUser)==null?void 0:t.email)||"?",aksi:n,rincian:e,waktu:i()})}catch{}}async function nm(n,e){const t=await Yy(Gi(Xn,n,e)).catch(()=>null);return t!=null&&t.exists()?t.data():null}async function Nv(n,e){const{deleteDoc:t}=await Li(async()=>{const{deleteDoc:r}=await Promise.resolve().then(()=>ev);return{deleteDoc:r}},void 0,import.meta.url);await t(Gi(Xn,n,e))}async function Xz(n,e,t){const{setDoc:r}=await Li(async()=>{const{setDoc:i}=await Promise.resolve().then(()=>ev);return{setDoc:i}},void 0,import.meta.url);await r(Gi(Xn,n,e),t)}async function wS(n){const{getDatabase:e,ref:t,get:r}=await Li(async()=>{const{getDatabase:o,ref:a,get:l}=await Promise.resolve().then(()=>xx);return{getDatabase:o,ref:a,get:l}},void 0,import.meta.url),{app:i}=await Li(async()=>{const{app:o}=await Promise.resolve().then(()=>bv);return{app:o}},void 0,import.meta.url),s=await r(t(e(i),n));return s.exists()?s.val():null}async function rm(n,e){const{getDatabase:t,ref:r,set:i}=await Li(async()=>{const{getDatabase:o,ref:a,set:l}=await Promise.resolve().then(()=>xx);return{getDatabase:o,ref:a,set:l}},void 0,import.meta.url),{app:s}=await Li(async()=>{const{app:o}=await Promise.resolve().then(()=>bv);return{app:o}},void 0,import.meta.url);await i(r(t(s),n),e)}function Zz({sumber:n,hari:e,satuan:t}){const r=W.useMemo(()=>{const l=new Date;l.setHours(0,0,0,0);const c=[];for(let h=e-1;h>=0;h--){const d=new Date(l.getTime()-h*864e5),p=new Date(d.getTime()+864e5);c.push({label:d.getDate()+"/"+(d.getMonth()+1),n:n.filter(_=>_>=d.getTime()&&_<p.getTime()).length})}return c},[n,e]),i=r.reduce((l,c)=>l+c.n,0),s=Math.max(1,...r.map(l=>l.n));if(!i)return g.jsx("div",{className:"kosong",children:"Belum ada data untuk rentang ini."});const o=200,a=100/r.length;return g.jsxs(g.Fragment,{children:[g.jsxs("div",{style:{color:"#9a9cab",fontSize:12,padding:"0 4px 8px"},children:[i," ",t," · puncak ",s]}),g.jsxs("svg",{viewBox:"0 0 100 "+(o+28),preserveAspectRatio:"none",style:{width:"100%",height:240,display:"block"},children:[g.jsx("defs",{children:g.jsxs("linearGradient",{id:"gradBatang",x1:"0",y1:"0",x2:"0",y2:"1",children:[g.jsx("stop",{offset:"0%",stopColor:"#e8538f"}),g.jsx("stop",{offset:"100%",stopColor:"#83d8ae"})]})}),r.map((l,c)=>{const h=Math.max(2,Math.round(l.n/s*o));return g.jsxs("g",{children:[g.jsx("rect",{x:c*a+a*.18+"%",y:o-h,width:a*.64+"%",height:h,rx:"2",fill:"url(#gradBatang)"}),g.jsx("text",{x:(c+.5)*a+"%",y:o+16,fill:"#9a9cab",fontSize:"10",textAnchor:"middle",children:l.label}),l.n>0&&g.jsx("text",{x:(c+.5)*a+"%",y:o-h-6,fill:"#d1d3e0",fontSize:"10",textAnchor:"middle",children:l.n})]},l.label+c)})]})]})}function e3(){const[n,e]=W.useState(7),t=Tn("userIds",500),r=Tn("rooms",500),i=Tn("gifts",200),s=Tn("banned",200),o=Tn("userReports",300),a=Tn("adminLogs",400),l=t.isi.filter(y=>Number(y.vip||0)>0).length,c=new Set(s.isi.map(y=>y.id||y.uid)).size,h=r.isi.filter(y=>y.locked).length,d=[["people_alt",be(t.isi.length),"Total user"],["workspace_premium",be(l),"Total user VIP"],["group_off",be(c),"User diblokir"],["mic",be(r.isi.length),"Total room"],["lock",be(h),"Room terkunci"],["flag",be(o.isi.length),"Laporan user"],["redeem",be(i.isi.length),"Gift aktif"],["bolt",String(a.isi.length),"Catatan admin"]],p=a.isi.map(y=>{var I;return Number(((I=y.waktu)==null?void 0:I.seconds)||0)*1e3}).filter(y=>y>0),_=t.isi.map(y=>Number(y.createdAt||y.dibuat||0)).filter(y=>y>0),T=p.length>=_.length,C=T?p:_,P=[...a.isi].sort((y,I)=>{var S,D;return(((S=I.waktu)==null?void 0:S.seconds)||0)-(((D=y.waktu)==null?void 0:D.seconds)||0)}).slice(0,12);return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"kartu",children:g.jsx("div",{className:"dasborKartu",children:d.map(([y,I,S])=>g.jsxs("div",{className:"kartuAngka",children:[g.jsx("div",{className:"ikonKartu",children:y}),g.jsxs("div",{children:[g.jsx("b",{children:I}),g.jsx("span",{children:S})]})]},S))})}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsxs("h3",{children:[T?"Aktivitas admin ":"Pendaftaran user ",n," hari terakhir"]}),g.jsx("div",{className:"filter",children:[7,30].map(y=>g.jsxs("div",{className:"pil"+(n===y?" on":""),onClick:()=>e(y),children:[y," hari"]},y))})]}),g.jsx("div",{style:{padding:"6px 4px 0"},children:g.jsx(Zz,{sumber:C,hari:n,satuan:T?"catatan":"user"})})]}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsx("h3",{children:"Aktivitas admin terakhir"}),g.jsx("div",{className:"filter",children:g.jsxs("div",{className:"pil on",children:[a.isi.length," catatan"]})})]}),P.length?g.jsxs("table",{children:[g.jsx("thead",{children:g.jsxs("tr",{children:[g.jsx("th",{children:"WAKTU"}),g.jsx("th",{children:"ADMIN"}),g.jsx("th",{children:"AKSI"}),g.jsx("th",{children:"RINCIAN"})]})}),g.jsx("tbody",{children:P.map((y,I)=>g.jsxs("tr",{children:[g.jsx("td",{children:Ul(y.waktu)}),g.jsx("td",{children:y.admin}),g.jsx("td",{children:y.aksi}),g.jsx("td",{children:y.rincian})]},I))})]}):g.jsx("div",{className:"kosong",children:"Belum ada aktivitas tercatat."})]}),g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsx("h3",{children:"Room terbaru"}),g.jsx("div",{className:"filter",children:g.jsx("div",{className:"pil on",children:g.jsx("a",{href:"#room",children:"Lihat semua"})})})]}),r.isi.length?g.jsxs("table",{children:[g.jsx("thead",{children:g.jsxs("tr",{children:[g.jsx("th",{children:"ROOM"}),g.jsx("th",{children:"PEMILIK"}),g.jsx("th",{children:"KUNCI"})]})}),g.jsx("tbody",{children:r.isi.slice(0,8).map(y=>g.jsxs("tr",{children:[g.jsx("td",{children:y.name||y.title||y.id}),g.jsxs("td",{children:[String(y.ownerUid||"").slice(0,10),"…"]}),g.jsx("td",{children:y.locked?g.jsx("span",{className:"tag blokir",children:"terkunci"}):g.jsx("span",{className:"tag aktif",children:"terbuka"})})]},y.id))})]}):g.jsx("div",{className:"kosong",children:"Belum ada room."})]})]})}const Fg="viza-toast";function Le(n,e=!1){window.dispatchEvent(new CustomEvent(Fg,{detail:{pesan:n,gagal:e}}))}function t3(){const[n,e]=W.useState(null);return W.useEffect(()=>{let t;const r=i=>{e(i.detail),clearTimeout(t),t=setTimeout(()=>e(null),3600)};return window.addEventListener(Fg,r),()=>{window.removeEventListener(Fg,r),clearTimeout(t)}},[]),n?g.jsx("div",{className:"toast tampil"+(n.gagal?" gagal":""),children:n.pesan}):null}const Dv=({isi:n})=>g.jsx("div",{className:"kartu",children:n.map(([e,t])=>g.jsxs("div",{className:"stat",children:[g.jsx("b",{children:e}),g.jsx("span",{children:t})]},t))}),xd=({judul:n,sub:e,aksi:t,kaki:r,children:i})=>g.jsxs("div",{className:"panel",children:[g.jsxs("div",{className:"panelAtas",children:[g.jsxs("h3",{children:[n,e?g.jsxs("span",{className:"sub",children:[" ",e]}):null]}),t?g.jsx("div",{className:"filter",children:t}):null]}),i,r?g.jsx("div",{className:"kaki",children:r}):null]}),Mx=({on:n,onClick:e,children:t})=>g.jsx("div",{className:"pil"+(n?" on":""),onClick:e,children:t}),jn=({jenis:n="aktif",children:e})=>g.jsx("span",{className:"tag "+n,children:e}),Vv=({children:n})=>g.jsx("div",{className:"kosong",children:n}),Ov=({nilai:n,onUbah:e,placeholder:t})=>g.jsxs("label",{className:"kotakCari",children:[g.jsx("span",{children:"⌕"}),g.jsx("input",{value:n,onChange:r=>e(r.target.value),placeholder:t}),n?g.jsx("button",{type:"button",onClick:()=>e(""),title:"Bersihkan",children:"×"}):null]});function n3({buka:n,judul:e,onTutup:t,children:r,kaki:i}){return W.useEffect(()=>{if(!n)return;const s=o=>o.key==="Escape"&&t();return window.addEventListener("keydown",s),()=>window.removeEventListener("keydown",s)},[n,t]),n?g.jsx("div",{className:"laciLatar",onClick:t,children:g.jsxs("div",{className:"laci",onClick:s=>s.stopPropagation(),children:[g.jsxs("div",{className:"laciAtas",children:[g.jsx("h3",{children:e}),g.jsx("button",{onClick:t,title:"Tutup",children:"×"})]}),g.jsx("div",{className:"laciIsi",children:r}),i?g.jsx("div",{className:"laciKaki",children:i}):null]})}):null}function tc({buka:n,judul:e,pesan:t,tombol:r="Lanjut",onYa:i,onTidak:s,sibuk:o}){return n?g.jsx("div",{className:"laciLatar",onClick:s,children:g.jsxs("div",{className:"kotakKonfirmasi",onClick:a=>a.stopPropagation(),children:[g.jsx("h3",{children:e}),g.jsx("p",{children:t}),g.jsxs("div",{className:"barisTombol",children:[g.jsx("button",{className:"polos",onClick:s,disabled:o,children:"Batal"}),g.jsx("button",{className:"utama",onClick:i,disabled:o,children:o?"Memproses…":r})]})]})}):null}const Us=({baris:n=6})=>g.jsx("div",{style:{padding:14},children:Array.from({length:n}).map((e,t)=>g.jsx("div",{className:"rangka",style:{width:100-t%3*12+"%"}},t))});function bd({kolom:n,baris:e,urut:t,onUrut:r,kosong:i="Tidak ada data."}){const[s,o]=t||[null,1],a=l=>s===l?o===1?" ▲":" ▼":"";return e.length?g.jsx("div",{className:"bungkusTabel",children:g.jsxs("table",{children:[g.jsx("thead",{children:g.jsx("tr",{children:n.map(l=>g.jsxs("th",{onClick:l.urut&&r?()=>r(l.kunci):void 0,style:l.urut?{cursor:"pointer"}:void 0,children:[l.label,l.urut?a(l.kunci):""]},l.kunci))})}),g.jsx("tbody",{children:e.map((l,c)=>g.jsx("tr",{children:n.map(h=>g.jsx("td",{children:h.sel(l)},h.kunci))},l.__kunci??c))})]})}):g.jsx(Vv,{children:i})}function Nd(n,e=null){const[t,r]=W.useState(e);return[W.useMemo(()=>{if(!t)return n;const[o,a]=t;return[...n].sort((l,c)=>{const h=l[o],d=c[o];return typeof h=="number"||typeof d=="number"?((Number(h)||0)-(Number(d)||0))*a:String(h??"").localeCompare(String(d??""),"id")*a})},[n,t]),t,o=>r(a=>a&&a[0]===o?[o,-a[1]]:[o,1])]}function r3(){var M,k,w,E,R,A,b,x,Ot,On;const n=Tn("userIds",500),e=Tn("banned",300),[t,r]=W.useState(""),[i,s]=W.useState("semua"),[o,a]=W.useState(null),[l,c]=W.useState(null),[h,d]=W.useState(null),[p,_]=W.useState(!1),T=W.useMemo(()=>new Set(e.isi.map(J=>J.id)),[e.isi]),C=W.useMemo(()=>{const J=t.trim().toLowerCase();return n.isi.map(pe=>{const G=pe.uid||pe.id;return{__kunci:G,uid:G,nama:pe.name||pe.nama||"(tanpa nama)",foto:pe.avatar||pe.photo||"",vip:Number(pe.vip||0),koin:Number(pe.coins??pe.coin??0),dibuat:Number(pe.createdAt||pe.dibuat||0),blok:T.has(pe.id)||T.has(G)}}).filter(pe=>J&&!pe.nama.toLowerCase().includes(J)&&!pe.uid.toLowerCase().includes(J)?!1:i==="aktif"?!pe.blok:i==="blokir"?pe.blok:i==="vip"?pe.vip>0:!0)},[n.isi,T,t,i]),[P,y,I]=Nd(C,["nama",1]),S=async J=>{a(J),c(null);const[pe,G,te]=await Promise.all([nm("users",J.uid),nm("wallets",J.uid),nm("banned",J.uid)]);c({profil:pe,dompet:G,ban:te})},D=J=>{d({judul:J.blok?"Buka blokir "+J.nama+"?":"Blokir "+J.nama+"?",pesan:J.blok?"User bisa memakai aplikasi Viza lagi setelah dibuka.":"User tidak bisa memakai aplikasi sampai blokirnya dibuka.",tombol:J.blok?"Buka blokir":"Blokir",jalan:async()=>{var pe;_(!0);try{J.blok?(await Nv("banned",J.uid),await Hn("Buka blokir",`${J.nama} · ${J.uid}`),Le(`${J.nama} dibuka blokirnya`)):(await Xz("banned",J.uid,{uid:J.uid,nama:J.nama,alasan:"diblokir admin panel",oleh:((pe=Dn.currentUser)==null?void 0:pe.email)||"?",waktu:new Date}),await Hn("Blokir user",`${J.nama} · ${J.uid}`),Le(`${J.nama} diblokir`)),await e.segarkan(),d(null),a(null)}catch(G){Le("Gagal: "+(G.code||G.message),!0)}finally{_(!1)}}})},F=[{kunci:"nama",label:"USER",urut:!0,sel:J=>g.jsxs("div",{className:"user",children:[g.jsx("div",{className:"mini",children:J.foto?g.jsx("img",{src:J.foto,alt:""}):(J.nama[0]||"?").toUpperCase()}),g.jsxs("div",{children:[g.jsx("div",{children:J.nama}),g.jsx("div",{className:"catatan",style:{padding:0,marginTop:2},children:J.vip?"VIP "+J.vip:"gratis"})]})]})},{kunci:"uid",label:"UID",sel:J=>g.jsxs("span",{title:J.uid,children:[J.uid.slice(0,14),"…"]})},{kunci:"koin",label:"KOIN",urut:!0,sel:J=>be(J.koin)},{kunci:"dibuat",label:"TERDAFTAR",urut:!0,sel:J=>J.dibuat?Ul(J.dibuat):"—"},{kunci:"blok",label:"STATUS",sel:J=>J.blok?g.jsx(jn,{jenis:"blokir",children:"diblokir"}):g.jsx(jn,{children:"aktif"})},{kunci:"aksi",label:"AKSI",sel:J=>g.jsxs("span",{className:"aksiBaris",children:[g.jsx("button",{className:"aksi",onClick:()=>S(J),children:"Detail"}),g.jsx("button",{className:"aksi",onClick:()=>D(J),children:J.blok?"Buka blokir":"Blokir"})]})}];return g.jsxs(g.Fragment,{children:[g.jsx(Dv,{isi:[[be(n.isi.length),"User terdaftar"],[be(n.isi.length-C.filter(J=>J.blok).length),"Tidak diblokir"],[be(T.size),"Diblokir"],[be(n.isi.filter(J=>Number(J.vip||0)>0).length),"User VIP"]]}),g.jsxs(xd,{judul:"Daftar user",aksi:g.jsx(Ov,{nilai:t,onUbah:r,placeholder:"Cari nama atau UID…"}),kaki:`${C.length} user ditampilkan dari ${n.isi.length} terdaftar`,children:[g.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["aktif","Aktif"],["vip","VIP"],["blokir","Diblokir"]].map(([J,pe])=>g.jsx(Mx,{on:i===J,onClick:()=>s(J),children:pe},J))}),n.memuat&&!n.isi.length?g.jsx(Us,{}):g.jsx(bd,{kolom:F,baris:P,urut:y,onUrut:I,kosong:"Tidak ada user yang cocok."})]}),g.jsx(n3,{buka:!!o,judul:o?"Detail "+o.nama:"",onTutup:()=>{a(null),c(null)},kaki:o?g.jsx(g.Fragment,{children:g.jsx("button",{className:"polos",onClick:()=>D(o),children:o.blok?"Buka blokir":"Blokir user"})}):null,children:l?g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"petak",style:{padding:0,marginBottom:12},children:[g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:be(((M=l.dompet)==null?void 0:M.coins)??((k=l.profil)==null?void 0:k.coins)??0)}),g.jsx("span",{children:"Koin dompet"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:(w=l.profil)!=null&&w.vip?"VIP "+l.profil.vip:"Gratis"}),g.jsx("span",{children:"Paket"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:l.ban?"Diblokir":"Aktif"}),g.jsx("span",{children:"Status"})]}),g.jsxs("div",{className:"kotakMini",children:[g.jsx("b",{children:((E=l.profil)==null?void 0:E.level)??"—"}),g.jsx("span",{children:"Level"})]})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"UID"}),g.jsx("b",{children:o.uid})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Nama"}),g.jsx("b",{children:((R=l.profil)==null?void 0:R.name)||o.nama})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Email"}),g.jsx("b",{children:((A=l.profil)==null?void 0:A.email)||"—"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Vip sampai"}),g.jsx("b",{children:(b=l.profil)!=null&&b.vipUntil?Ul(l.profil.vipUntil):"—"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Fans"}),g.jsx("b",{children:be(((x=l.profil)==null?void 0:x.fans)??0)})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Mengikuti"}),g.jsx("b",{children:be(((Ot=l.profil)==null?void 0:Ot.following)??0)})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Dompet terakhir"}),g.jsx("b",{children:(On=l.dompet)!=null&&On.updatedAt?Ul(l.dompet.updatedAt):"—"})]}),l.ban?g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Alasan blokir"}),g.jsx("b",{children:l.ban.alasan||"—"})]}):null,g.jsx("div",{className:"catatan",style:{marginTop:12},children:"Detail dibaca dari users, wallets, dan banned. Untuk mengubah angka, buka menu Database."})]}):g.jsx(Us,{baris:4})}),g.jsx(tc,{buka:!!h,judul:h==null?void 0:h.judul,pesan:h==null?void 0:h.pesan,tombol:h==null?void 0:h.tombol,sibuk:p,onYa:()=>h==null?void 0:h.jalan(),onTidak:()=>d(null)})]})}const i3="https://viza.43-156-99-4.sslip.io/admin",s3="sb_publishable_4PxD2LedOsBgIJyHLkM47A_bImSQI2W",o3=["coin_all","reset_all","reset_gem_all","reset_all_assets","delete_users","manual_pending","manual_all","pay_get","pay_set","cfg_get","cfg_set"];async function Dd(n,e=15e3){const t=Dn.currentUser;if(!t)throw new Error("Belum login");o3.includes(n.op)&&!n.uid&&(n={...n,uid:"-"});const r=await t.getIdToken(),i=new AbortController,s=setTimeout(()=>i.abort(),e);try{const o=await fetch(i3,{method:"POST",headers:{"Content-Type":"application/json",apikey:s3},body:JSON.stringify({a:"admin",t:r,p:n}),signal:i.signal}),a=await o.text();if(!o.ok)throw new Error(a.slice(0,160)||"HTTP "+o.status);return a?JSON.parse(a):{}}finally{clearTimeout(s)}}function a3(){const n=Tn("rooms",500),[e,t]=W.useState(null),[r,i]=W.useState({}),[s,o]=W.useState(""),[a,l]=W.useState(""),[c,h]=W.useState(null),[d,p]=W.useState(!1),_=async()=>{try{const[A,b]=await Promise.all([wS("roomsPub"),wS("officialRooms").catch(()=>null)]);t(A||{}),i(b||{}),o("")}catch(A){o(A.message||String(A)),t({})}};W.useEffect(()=>{_()},[]);const T=W.useMemo(()=>{const A=a.trim().toLowerCase();return Object.entries(e||{}).map(([b,x])=>({__kunci:b,id:b,...x})).filter(b=>!A||String(b.name||"").toLowerCase().includes(A)||b.id.toLowerCase().includes(A)).sort((b,x)=>(Number(x.pinned)||0)-(Number(b.pinned)||0)||(Number(x.createdAt)||0)-(Number(b.createdAt)||0))},[e,a]),C=W.useMemo(()=>{const A=a.trim().toLowerCase();return n.isi.map(b=>({__kunci:b.id,id:b.id,nama:b.name||b.title||"(tanpa nama)",pemilik:b.ownerUid||"",locked:!!b.locked})).filter(b=>!A||b.nama.toLowerCase().includes(A)||b.id.toLowerCase().includes(A))},[n.isi,a]),[P,y,I]=Nd(T),[S,D,F]=Nd(C,["nama",1]),M=A=>{const b=!A.pinned;h({judul:b?"Sematkan "+(A.name||A.id)+"?":"Lepas semat "+(A.name||A.id)+"?",pesan:b?"Room tampil paling atas di daftar room aplikasi.":"Room kembali ke urutan biasa.",tombol:b?"Sematkan":"Lepas",jalan:async()=>{p(!0);try{try{await rm(`roomsPub/${A.id}/pinned`,b),await rm(`roomsPub/${A.id}/pinnedAt`,b?Date.now():0)}catch{await Dd({op:"room_pin",uid:A.id,nilai:b?1:0})}await Hn(b?"Sematkan room":"Lepas semat room",A.id),Le(b?"Room disematkan paling atas":"Semat dilepas"),await _(),h(null)}catch(x){Le("Gagal: "+(x.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},k=A=>{const b=!r[A.id];h({judul:b?"Tag official "+(A.name||A.id)+"?":"Lepas tag official?",pesan:b?"Room mendapat tanda resmi di foto room dan daftar room.":"Tanda resmi dilepas.",tombol:b?"Pasang":"Lepas",jalan:async()=>{p(!0);try{try{await rm(`officialRooms/${A.id}`,b?!0:null)}catch{await Dd({op:"room_official",uid:A.id,nilai:b?1:0})}await Hn(b?"Tag official":"Lepas official",A.id),Le(b?"Tag official dipasang":"Tag official dilepas"),await _(),h(null)}catch(x){Le("Gagal: "+(x.message||"tidak diizinkan"),!0)}finally{p(!1)}}})},w=A=>h({judul:"Tutup room "+A.nama+"?",pesan:"Room dihapus dari daftar dan langsung hilang di aplikasi. Tindakan ini tidak bisa dibatalkan.",tombol:"Tutup room",jalan:async()=>{p(!0);try{await Nv("rooms",A.id),await Hn("Tutup room",A.id),Le("Room ditutup"),await n.segarkan(),h(null)}catch(b){Le("Gagal: "+(b.code||b.message),!0)}finally{p(!1)}}}),E=[{kunci:"name",label:"ROOM",urut:!0,sel:A=>g.jsxs("div",{children:[g.jsxs("div",{children:[r[A.id]?"✅ ":"",A.name||"(tanpa nama)"]}),g.jsxs("div",{className:"catatan",style:{padding:0,marginTop:2},children:[String(A.id).slice(0,14),"…"]})]})},{kunci:"ownerName",label:"PEMILIK",urut:!0,sel:A=>String(A.ownerName||A.ownerUid||"—").slice(0,14)},{kunci:"members",label:"PESERTA",urut:!0,sel:A=>be(A.members||0)},{kunci:"pinned",label:"ATURAN",urut:!0,sel:A=>g.jsxs(g.Fragment,{children:[A.pinned?g.jsx(jn,{children:"disematkan"}):g.jsx(jn,{jenis:"",children:"biasa"})," ",r[A.id]?g.jsx(jn,{children:"official"}):null]})},{kunci:"aksi",label:"AKSI",sel:A=>g.jsxs("span",{className:"aksiBaris",children:[g.jsx("button",{className:"aksi",onClick:()=>M(A),children:A.pinned?"Lepas semat":"Sematkan"}),g.jsx("button",{className:"aksi",onClick:()=>k(A),children:r[A.id]?"Lepas official":"Tag official"})]})}],R=[{kunci:"nama",label:"NAMA",urut:!0,sel:A=>A.nama},{kunci:"id",label:"ID ROOM",sel:A=>String(A.id).slice(0,12)+"…"},{kunci:"pemilik",label:"PEMILIK",sel:A=>String(A.pemilik||"—").slice(0,12)},{kunci:"locked",label:"KUNCI",sel:A=>A.locked?g.jsx(jn,{jenis:"blokir",children:"terkunci"}):g.jsx(jn,{children:"terbuka"})},{kunci:"aksi",label:"AKSI",sel:A=>g.jsx("button",{className:"aksi",onClick:()=>w(A),children:"Tutup room"})}];return g.jsxs(g.Fragment,{children:[g.jsx(Dv,{isi:[[be(T.length),"Room party (RTDB)"],[be(n.isi.length),"Room Firestore"],[be(n.isi.filter(A=>!A.locked).length),"Terbuka"],[be(n.isi.filter(A=>A.locked).length),"Terkunci"]]}),g.jsx(xd,{judul:"Room party",sub:"· sematkan dan beri tag official",aksi:g.jsx(Ov,{nilai:a,onUbah:l,placeholder:"Cari nama atau ID room…"}),children:s?g.jsxs(Vv,{children:["Gagal memuat roomsPub: ",s]}):e===null?g.jsx(Us,{}):g.jsx(bd,{kolom:E,baris:P,urut:y,onUrut:I,kosong:"Belum ada room party di Realtime Database."})}),g.jsx(xd,{judul:"Daftar room (Firestore)",children:n.memuat&&!n.isi.length?g.jsx(Us,{baris:4}):g.jsx(bd,{kolom:R,baris:S,urut:D,onUrut:F,kosong:"Belum ada room."})}),g.jsx(tc,{buka:!!c,judul:c==null?void 0:c.judul,pesan:c==null?void 0:c.pesan,tombol:c==null?void 0:c.tombol,sibuk:d,onYa:()=>c==null?void 0:c.jalan(),onTidak:()=>h(null)})]})}function l3(){const n=Tn("gifts",300),[e,t]=W.useState(""),[r,i]=W.useState("semua"),[s,o]=W.useState(null),[a,l]=W.useState(!1),c=W.useMemo(()=>{const P=e.trim().toLowerCase();return n.isi.map(y=>({__kunci:y.id,id:y.id,nama:y.name||y.id,ikon:y.icon||"",emoji:y.emoji||"🎁",harga:Number(y.price||0),media:y.mediaUrl||"",tipe:y.mediaType||"",cashback:!!y.cashback,special:!!y.special,rocket:!!y.rocket})).filter(y=>P&&!y.nama.toLowerCase().includes(P)?!1:r==="video"?/mp4|video/i.test(y.tipe)||/\.mp4$/i.test(y.media):r==="svga"?/svga/i.test(y.tipe)||/\.svga$/i.test(y.media):r==="cashback"?y.cashback:!0)},[n.isi,e,r]),[h,d,p]=Nd(c,["harga",-1]),_=P=>o({judul:"Hapus "+P.nama+"?",pesan:"Gift hilang dari katalog dan tidak bisa dikirim lagi. Tindakan ini tidak bisa dibatalkan.",tombol:"Hapus gift",jalan:async()=>{l(!0);try{await Nv("gifts",P.id),await Hn("Hapus gift",P.id),Le(P.nama+" dihapus"),await n.segarkan(),o(null)}catch(y){Le("Gagal: "+(y.code||y.message),!0)}finally{l(!1)}}}),T=[{kunci:"nama",label:"GIFT",urut:!0,sel:P=>g.jsxs("div",{className:"user",children:[g.jsx("div",{className:"mini",children:P.ikon?g.jsx("img",{src:P.ikon,alt:"",style:{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}):P.emoji}),g.jsx("div",{children:P.nama})]})},{kunci:"harga",label:"HARGA",urut:!0,sel:P=>be(P.harga)+" koin"},{kunci:"media",label:"MEDIA",sel:P=>P.media?g.jsx("a",{className:"aksi",href:P.media,target:"_blank",rel:"noopener",children:P.tipe||"tautan"}):"—"},{kunci:"tambahan",label:"TAMBAHAN",sel:P=>g.jsxs(g.Fragment,{children:[P.special?g.jsx(jn,{children:"special"}):null,P.rocket?g.jsx(jn,{children:"rocket"}):null,P.cashback?g.jsx(jn,{children:"cashback"}):null,!P.special&&!P.rocket&&!P.cashback?"—":null]})},{kunci:"aksi",label:"AKSI",sel:P=>g.jsx("button",{className:"aksi",onClick:()=>_(P),children:"Hapus"})}],C=n.isi.filter(P=>/mp4|video/i.test(P.mediaType||"")||/\.mp4$/i.test(P.mediaUrl||"")).length;return g.jsxs(g.Fragment,{children:[g.jsx(Dv,{isi:[[be(n.isi.length),"Item katalog"],[be(C),"Gift video MP4"],[be(n.isi.filter(P=>P.cashback).length),"Gift cashback"],[be(Math.max(0,...n.isi.map(P=>Number(P.price||0)))),"Harga tertinggi"]]}),g.jsxs(xd,{judul:"Katalog gift",sub:"· dibaca aplikasi dari koleksi gifts",aksi:g.jsx(Ov,{nilai:e,onUbah:t,placeholder:"Cari nama gift…"}),kaki:`${c.length} item ditampilkan dari ${n.isi.length}`,children:[g.jsx("div",{className:"filter",style:{padding:"0 14px 10px"},children:[["semua","Semua"],["video","Video MP4"],["svga","SVGA"],["cashback","Cashback"]].map(([P,y])=>g.jsx(Mx,{on:r===P,onClick:()=>i(P),children:y},P))}),n.memuat&&!n.isi.length?g.jsx(Us,{}):g.jsx(bd,{kolom:T,baris:h,urut:d,onUrut:p,kosong:"Belum ada gift. Tambah lewat panel lama dulu."}),g.jsx("div",{className:"catatan",style:{padding:"0 14px 14px"},children:"Menambah dan mengubah berkas gift masih di panel lama (#gift). Di sini sudah bisa mencari, menyaring, dan menghapus."})]}),g.jsx(tc,{buka:!!s,judul:s==null?void 0:s.judul,pesan:s==null?void 0:s.pesan,tombol:s==null?void 0:s.tombol,sibuk:a,onYa:()=>s==null?void 0:s.jalan(),onTidak:()=>o(null)})]})}const u3=n=>String(n).replace(/[.#$\[\]/]/g,"_");async function c3(){const n=new Map,e=(t,r)=>{const i=String(t.id||r||"");i&&n.set(i,{...n.get(i)||{},...t,id:i})};try{(await Lx("vipConfig",400)).forEach(t=>e(t,t.id))}catch{}try{const t=await Pv(Sd(Pd,"vipCfg"));t.exists()&&t.forEach(r=>e(r.val()||{},r.key))}catch{}return[...n.values()].filter(t=>String(t.slot||"")==="emote").sort((t,r)=>(Number(t.order)||0)-(Number(r.order)||0)||String(t.name||"").localeCompare(String(r.name||"")))}async function h3(n){try{await Cg(Gi(Xn,"vipConfig",n))}catch{}try{const e=await Jy(Wy(Ef(Xn,"vipConfig"),Hy(500)));for(const t of e.docs)t.id!==n&&(t.data()||{}).id!==n||await Cg(t.ref).catch(()=>{})}catch{}try{const e=await Pv(Sd(Pd,"vipCfg"));if(e.exists()){const t=[];e.forEach(r=>{(r.key===u3(n)||(r.val()||{}).id===n)&&t.push(Sx(Sd(Pd,"vipCfg/"+r.key)))}),await Promise.all(t)}}catch{}}function d3(){const[n,e]=W.useState(null),[t,r]=W.useState(null),[i,s]=W.useState(!1),o=()=>c3().then(e).catch(()=>e([]));W.useEffect(()=>{o()},[]);const a=async()=>{s(!0);try{await h3(t.id),await Hn("Hapus emote",t.id),Le("Emote dihapus"),r(null),await o()}catch(l){Le("Gagal menghapus: "+(l.message||""),!0)}finally{s(!1)}};return g.jsxs(g.Fragment,{children:[g.jsxs("a",{className:"tombolBaru",href:"../panel/admin/#emote",children:[g.jsx("span",{className:"material-icons",style:{fontSize:20},children:"add"})," New"]}),n===null?g.jsx(Us,{baris:4}):n.length?g.jsx("div",{className:"petakReaksi",children:n.map(l=>g.jsxs("div",{className:"kartuReaksi",children:[g.jsx("img",{src:l.url||"",alt:l.name||l.id,loading:"lazy"}),g.jsx("b",{children:l.name||l.id}),g.jsx("button",{className:"bulatHapus",title:"Hapus",onClick:()=>r(l),children:g.jsx("span",{className:"material-icons",children:"delete"})})]},l.id))}):g.jsx(Vv,{children:"Belum ada emote. Tekan New untuk menambah."}),g.jsx(tc,{buka:!!t,judul:"Hapus "+((t==null?void 0:t.name)||"emote")+"?",pesan:"Emote hilang dari bar emote semua room. Tindakan ini tidak bisa dibatalkan.",tombol:"Hapus",sibuk:i,onYa:a,onTidak:()=>r(null)})]})}const ll=({label:n,...e})=>g.jsxs("label",{className:"isianForm",children:[g.jsx("span",{children:n}),g.jsx("input",{...e})]});function f3({admin:n}){const[e,t]=W.useState(n.nama||""),[r,i]=W.useState(!1),[s,o]=W.useState(!1),[a,l]=W.useState(""),[c,h]=W.useState(""),[d,p]=W.useState(""),[_,T]=W.useState(!1),C=Dn.currentUser,P=((C==null?void 0:C.providerData)||[]).some(S=>S.providerId==="password"),y=async()=>{const S=e.trim();if(!S)return Le("Nama tidak boleh kosong",!0);i(!0);try{await EO(C,{displayName:S}),(C.email||"").toLowerCase()!==Rd&&await eP(Gi(Xn,"panelAdmins",C.email.toLowerCase()),{nama:S},{merge:!0}).catch(()=>{}),await Hn("Ubah nama profil",S),Le("Nama diperbarui. Muat ulang halaman untuk melihatnya di menu.")}catch(D){Le("Gagal: "+(D.code||D.message),!0)}finally{i(!1)}},I=async()=>{if(!P)return Le("Akun ini masuk lewat Google, jadi password diatur di akun Google.",!0);if(c.length<6)return Le("Password baru minimal 6 karakter",!0);if(c!==d)return Le("Ulangi password baru dengan sama persis",!0);T(!0);try{await _O(C,Ks.credential(C.email,a)),await IO(C,c),await Hn("Ubah password",C.email),Le("Password berhasil diganti"),l(""),h(""),p(""),o(!1)}catch(S){const D=S.code||"";Le(D.includes("wrong-password")||D.includes("invalid-credential")?"Password lama salah":"Gagal: "+(D||S.message),!0)}finally{T(!1)}};return g.jsxs(g.Fragment,{children:[g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:"Admin Information"})}),g.jsxs("div",{className:"panelIsi",children:[g.jsx(ll,{label:"Name",value:e,onChange:S=>t(S.target.value),placeholder:"Nama tampilan"}),g.jsx(ll,{label:"Email (untuk login)",value:n.email,readOnly:!0}),g.jsxs("div",{className:"barisAksiForm",children:[g.jsx("a",{className:"tautanPink",onClick:()=>o(S=>!S),children:s?"Tutup ubah password":"Update Password ?"}),g.jsx("button",{className:"tombolBaru",onClick:y,disabled:r,children:r?"Menyimpan…":"Submit"})]}),g.jsxs("div",{className:"catatan",children:["Peran: ",g.jsx("b",{children:n.peran}),". Email dipakai untuk masuk dan tidak bisa diubah dari sini."]})]})]}),s?g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:"Ubah password"})}),g.jsx("div",{className:"panelIsi",children:P?g.jsxs(g.Fragment,{children:[g.jsx(ll,{label:"Password lama",type:"password",value:a,onChange:S=>l(S.target.value),autoComplete:"current-password"}),g.jsx(ll,{label:"Password baru (minimal 6 karakter)",type:"password",value:c,onChange:S=>h(S.target.value),autoComplete:"new-password"}),g.jsx(ll,{label:"Ulangi password baru",type:"password",value:d,onChange:S=>p(S.target.value),autoComplete:"new-password"}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",onClick:I,disabled:_,children:_?"Memproses…":"Ganti password"})})]}):g.jsx("div",{className:"kosong",children:"Akun ini masuk lewat Google. Password diatur di akun Google Anda, bukan di panel."})})]}):null,g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:"Update Profile Image"})}),g.jsxs("div",{className:"panelIsi",style:{textAlign:"center"},children:[g.jsx("div",{className:"fotoProfilBesar",children:C!=null&&C.photoURL?g.jsx("img",{src:C.photoURL,alt:"",referrerPolicy:"no-referrer"}):g.jsx("span",{children:(n.nama||"A")[0].toUpperCase()})}),g.jsx("div",{className:"catatan",style:{textAlign:"center"},children:"Foto diambil dari akun Google yang dipakai masuk. Ganti fotonya di akun Google Anda."})]})]})]})}const p3=[["umum","General"],["agora","Agora"],["versi","Versi & APK"],["payment","Payment"],["firebase","Firebase"],["admin","Admin panel"]],ur=({label:n,info:e,...t})=>g.jsxs("label",{className:"isianForm",children:[g.jsx("span",{children:n}),g.jsx("input",{...t}),e?g.jsx("small",{children:e}):null]}),ES=({nyala:n,onUbah:e,label:t})=>g.jsxs("div",{className:"barisSaklar",children:[g.jsx("b",{children:t}),g.jsx("button",{type:"button",className:"saklar"+(n?" nyala":""),onClick:()=>e(!n),"aria-pressed":n,children:g.jsx("i",{})})]}),es=({judul:n,children:e})=>g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:n})}),g.jsx("div",{className:"panelIsi",children:e})]});function IS(){var k,w;const[n,e]=W.useState(()=>location.hash.split("?tab=")[1]||"umum"),[t,r]=W.useState(null),[i,s]=W.useState(""),[o,a]=W.useState(!1),[l,c]=W.useState(null),[h,d]=W.useState(""),[p,_]=W.useState(""),[T,C]=W.useState({versiTerbaru:"",versiMin:"",apkUrl:"",apkCatatan:""}),[P,y]=W.useState({stripeAktif:!1,stripePub:"",stripeSecret:"",paystackAktif:!1,paystackPub:"",paystackSecret:""}),[I,S]=W.useState(""),D=async()=>{try{const R=(await Dd({op:"cfg_get"})).cfg||{};r(R),C({versiTerbaru:R.versiTerbaru||"",versiMin:R.versiMin||"",apkUrl:R.apkUrl||"",apkCatatan:R.apkCatatan||""}),y(A=>({...A,stripeAktif:R.stripeAktif==="1",stripePub:R.stripePub||"",paystackAktif:R.paystackAktif==="1",paystackPub:R.paystackPub||""})),s("")}catch(E){s(E.message||String(E)),r({})}};W.useEffect(()=>{D()},[]);const F=async(E,R,A)=>{a(!0);try{const b=await Dd({op:"cfg_set",nilai:E});await Hn("Ubah pengaturan",R),Le(R+" disimpan"),await D(),A&&A(b)}catch(b){Le("Gagal: "+(b.message||b),!0)}finally{a(!1),c(null)}};if(t===null)return g.jsx(Us,{baris:6});const M=E=>t[E]&&t[E].ada?"Tersimpan: "+t[E].samar+" (kosongkan bila tidak diubah)":"Belum diisi";return g.jsxs(g.Fragment,{children:[g.jsx("div",{className:"deretTab",children:p3.map(([E,R])=>g.jsx("button",{className:"tabSet"+(n===E?" on":""),onClick:()=>e(E),children:R},E))}),i?g.jsx("div",{className:"panel",children:g.jsxs("div",{className:"kosong",children:["Pengaturan server belum bisa dibaca: ",i,g.jsx("br",{}),"Pastikan server dompet sudah diperbarui (jalankan perbarui-dompet-viza.sh) dan Anda masuk sebagai developer."]})}):null,n==="umum"?g.jsxs(es,{judul:"General",children:[g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Project Firebase"}),g.jsx("b",{children:"my-app-e7f8c"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Suara room"}),g.jsxs("b",{children:["Agora (",t.agoraSumber==="panel"?"dari panel":t.agoraSumber==="server"?"dari server":"belum diatur",")"]})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"App ID Agora aktif"}),g.jsx("b",{children:t.agoraAppIdAktif||"—"})]}),g.jsxs("div",{className:"barisDetail",children:[g.jsx("span",{children:"Versi aplikasi terbaru"}),g.jsx("b",{children:t.versiTerbaru||"ikut feed unduh"})]}),g.jsx("div",{className:"catatan",children:"Pengaturan di sini disimpan di server dompet, jadi berlaku langsung tanpa rilis APK baru."})]}):null,n==="agora"?g.jsxs(es,{judul:"Agora",children:[g.jsxs("div",{className:"catatan",style:{marginBottom:12},children:["Ganti akun Agora kapan saja: buat project baru di console.agora.io, tempel App ID dan App Certificate di sini, lalu konfirmasi. Server langsung memakainya dan token suara baru dibuat dari kunci itu. Tidak perlu membangun APK lagi. Aktif sekarang: ",g.jsx("b",{children:t.agoraAppIdAktif||"belum ada"}),"."]}),g.jsx(ur,{label:"Agora Key (App ID, 32 karakter)",value:h,onChange:E=>d(E.target.value.trim()),placeholder:"mis. 406ff649c0bd49d397b487d22d075493",maxLength:32}),g.jsx(ur,{label:"Agora Certificates (App Certificate, 32 karakter)",value:p,onChange:E=>_(E.target.value.trim()),placeholder:(k=t.agoraCert)!=null&&k.ada?"Tersimpan di server: "+t.agoraCert.samar:"tempel App Certificate",maxLength:32,autoComplete:"off"}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",disabled:o||!/^[0-9a-f]{32}$/i.test(h)||!/^[0-9a-f]{32}$/i.test(p),onClick:()=>c({judul:"Ganti akun Agora?",pesan:"Semua room langsung memakai App ID baru ("+h.slice(0,6)+"…). Suara yang sedang berjalan bisa terputus sebentar lalu tersambung kembali dengan akun baru.",tombol:"Konfirmasi & terapkan",jalan:()=>F({agoraAppId:h,agoraCert:p},"Akun Agora",E=>{d(""),_(""),Le(E.ujiAgora===1?"Uji token berhasil: suara siap memakai akun baru":"Tersimpan, tetapi uji token gagal. Periksa App ID dan Certificate.",E.ujiAgora!==1)})}),children:"Submit"})}),g.jsx("div",{className:"catatan",children:"Certificate hanya disimpan di server dan tidak pernah dikirim balik ke browser."})]}):null,n==="versi"?g.jsxs(es,{judul:"Versi & link APK Android",children:[g.jsx(ur,{label:"Versi terbaru",value:T.versiTerbaru,onChange:E=>C({...T,versiTerbaru:E.target.value}),placeholder:"mis. 1.0.340"}),g.jsx(ur,{label:"Versi minimum (di bawah ini wajib update)",value:T.versiMin,onChange:E=>C({...T,versiMin:E.target.value}),placeholder:"mis. 1.0.330"}),g.jsx(ur,{label:"Link unduh APK Android",value:T.apkUrl,onChange:E=>C({...T,apkUrl:E.target.value}),placeholder:"https://exbottod.github.io/viza-chat-voice-room/unduh/"}),g.jsxs("label",{className:"isianForm",children:[g.jsx("span",{children:"Catatan pembaruan"}),g.jsx("textarea",{rows:4,value:T.apkCatatan,onChange:E=>C({...T,apkCatatan:E.target.value})})]}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",disabled:o,onClick:()=>F(T,"Versi & link APK"),children:"Submit"})}),g.jsx("div",{className:"catatan",children:"Disimpan di server. Aplikasi yang membaca pengaturan ini akan memakainya; feed unduh GitHub tetap jadi sumber patch."})]}):null,n==="payment"?g.jsxs(g.Fragment,{children:[g.jsxs(es,{judul:"Stripe Android Switch (aktif/nonaktif pembayaran di aplikasi)",children:[g.jsx(ES,{label:"Stripe",nyala:P.stripeAktif,onUbah:E=>y({...P,stripeAktif:E})}),g.jsx(ur,{label:"Stripe Publishable Key",value:P.stripePub,onChange:E=>y({...P,stripePub:E.target.value.trim()}),placeholder:"pk_live_..."}),g.jsx(ur,{label:"Stripe Secret Key",type:"password",value:P.stripeSecret,onChange:E=>y({...P,stripeSecret:E.target.value.trim()}),placeholder:M("stripeSecret"),autoComplete:"off"}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",disabled:o,onClick:()=>F({stripeAktif:P.stripeAktif?"1":"0",stripePub:P.stripePub,stripeSecret:P.stripeSecret},"Stripe",()=>y(E=>({...E,stripeSecret:""}))),children:"Submit"})})]}),g.jsxs(es,{judul:"Paystack Android Switch",children:[g.jsx(ES,{label:"Paystack",nyala:P.paystackAktif,onUbah:E=>y({...P,paystackAktif:E})}),g.jsx(ur,{label:"Paystack Public Key",value:P.paystackPub,onChange:E=>y({...P,paystackPub:E.target.value.trim()}),placeholder:"pk_live_..."}),g.jsx(ur,{label:"Paystack Secret Key",type:"password",value:P.paystackSecret,onChange:E=>y({...P,paystackSecret:E.target.value.trim()}),placeholder:M("paystackSecret"),autoComplete:"off"}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",disabled:o,onClick:()=>F({paystackAktif:P.paystackAktif?"1":"0",paystackPub:P.paystackPub,paystackSecret:P.paystackSecret},"Paystack",()=>y(E=>({...E,paystackSecret:""}))),children:"Submit"})})]}),g.jsx("div",{className:"catatan",style:{padding:"0 4px"},children:"Kunci tersimpan di server. Top-up manual (DANA, GoPay, QRIS) tetap diatur di panel lama, menu Coin & reset. Saklar dan kunci ini baru berpengaruh setelah jalur bayar kartu di aplikasi dihubungkan."})]}):null,n==="firebase"?g.jsxs(es,{judul:"Private Key JSON (untuk notifikasi push Firebase)",children:[g.jsxs("label",{className:"isianForm",children:[g.jsx("span",{children:"Tempel isi berkas JSON akun layanan"}),g.jsx("textarea",{rows:10,value:I,onChange:E=>S(E.target.value),placeholder:(w=t.fcmJson)!=null&&w.ada?"Sudah tersimpan di server ("+t.fcmJson.samar+"). Kosongkan bila tidak diubah.":'{ "type": "service_account", ... }',spellCheck:!1})]}),g.jsx("div",{className:"barisAksiForm",style:{justifyContent:"flex-end"},children:g.jsx("button",{className:"tombolBaru",disabled:o||!I.trim(),onClick:()=>F({fcmJson:I},"Kunci Firebase",()=>S("")),children:"Submit"})}),g.jsx("div",{className:"catatan",children:"JSON diperiksa dulu (harus akun layanan) dan disimpan hanya di server. Isinya tidak ditampilkan lagi setelah disimpan."})]}):null,n==="admin"?g.jsxs(es,{judul:"Admin panel",children:[g.jsx("div",{className:"catatan",children:"Daftar admin dan manager panel dikelola di panel lama sampai halamannya dipindahkan."}),g.jsx("div",{style:{marginTop:12},children:g.jsx("a",{className:"tombolBaru",href:"../panel/admin/#pengaturan",children:"Buka pengaturan admin"})})]}):null,g.jsx(tc,{buka:!!l,judul:l==null?void 0:l.judul,pesan:l==null?void 0:l.pesan,tombol:l==null?void 0:l.tombol,sibuk:o,onYa:()=>l==null?void 0:l.jalan(),onTidak:()=>c(null)})]})}function m3({nama:n,judul:e}){return g.jsxs("div",{className:"panel",children:[g.jsx("div",{className:"panelAtas",children:g.jsx("h3",{children:e})}),g.jsxs("div",{className:"kosong",children:["Halaman ",g.jsx("b",{children:e})," belum dipindahkan ke React.",g.jsx("br",{}),g.jsx("br",{}),"Sementara ini bisa dibuka di panel lama: ",g.jsxs("a",{href:"../panel/admin/#"+n,children:["panel lama #",n]})]})]})}function Fx(n,e){const t=W.useRef(null);return W.useEffect(()=>{if(!n)return;const r=s=>{t.current&&!t.current.contains(s.target)&&e()},i=s=>s.key==="Escape"&&e();return document.addEventListener("mousedown",r),document.addEventListener("keydown",i),()=>{document.removeEventListener("mousedown",r),document.removeEventListener("keydown",i)}},[n,e]),t}function g3(){const[n,e]=W.useState(!1),[t,r]=W.useState(()=>Number(localStorage.getItem("viza-notif")||0)),i=Tn("adminLogs",400),s=Fx(n,()=>e(!1)),o=[...i.isi].map(c=>{var h;return{...c,ms:Number(((h=c.waktu)==null?void 0:h.seconds)||0)*1e3}}).sort((c,h)=>h.ms-c.ms),a=o.filter(c=>c.ms>t).length,l=()=>{e(c=>!c),!n&&o[0]&&(localStorage.setItem("viza-notif",String(o[0].ms)),r(o[0].ms))};return g.jsxs("div",{className:"kotakTopbar",ref:s,children:[g.jsxs("button",{className:"tombolLonceng",onClick:l,title:"Notifikasi",children:[g.jsx("span",{className:"material-icons",children:"notifications_active"}),a>0?g.jsx("em",{children:a>99?"99+":a}):null]}),n?g.jsxs("div",{className:"menuTurun lebar",children:[g.jsx("div",{className:"menuTurunAtas",children:"Aktivitas terbaru"}),o.length?o.slice(0,8).map((c,h)=>g.jsxs("div",{className:"barisNotif",children:[g.jsx("b",{children:c.aksi}),g.jsx("span",{children:c.rincian||"—"}),g.jsxs("small",{children:[c.admin," · ",Ul(c.waktu)]})]},h)):g.jsx("div",{className:"barisNotif",children:g.jsx("span",{children:"Belum ada aktivitas."})}),g.jsx("a",{className:"menuTurunKaki",href:"#log",onClick:()=>e(!1),children:"Lihat semua log"})]}):null]})}function _3({admin:n}){var o;const[e,t]=W.useState(!1),r=Fx(e,()=>t(!1)),i=(o=Dn.currentUser)==null?void 0:o.photoURL,s=(n.nama||"A")[0].toUpperCase();return g.jsxs("div",{className:"kotakTopbar",ref:r,children:[g.jsx("button",{className:"tombolFoto",onClick:()=>t(a=>!a),title:n.email,children:i?g.jsx("img",{src:i,alt:"",referrerPolicy:"no-referrer"}):g.jsx("span",{children:s})}),e?g.jsxs("div",{className:"menuTurun",children:[g.jsxs("div",{className:"profilAtas",children:[g.jsx("div",{className:"tombolFoto besar",children:i?g.jsx("img",{src:i,alt:"",referrerPolicy:"no-referrer"}):g.jsx("span",{children:s})}),g.jsxs("div",{children:[g.jsx("b",{children:n.nama}),g.jsx("span",{children:n.email}),g.jsx("em",{children:n.peran})]})]}),g.jsxs("a",{className:"menuTurunItem",href:"#profile",onClick:()=>t(!1),children:[g.jsx("span",{className:"material-icons",children:"person_outline"})," Profile"]}),g.jsxs("a",{className:"menuTurunItem",href:"#setting",onClick:()=>t(!1),children:[g.jsx("span",{className:"material-icons",children:"settings"})," Setting"]}),g.jsxs("button",{className:"menuTurunItem",onClick:()=>rg(Dn),children:[g.jsx("span",{className:"material-icons",children:"logout"})," Logout"]})]}):null]})}function y3({admin:n}){return g.jsxs("div",{className:"kananTopbar",children:[g.jsx(g3,{}),g.jsx(_3,{admin:n})]})}const v3={dashboard:"Ringkasan user, room, gift, dan aktivitas admin",user:"Cari user, lihat detail, blokir atau buka blokir",room:"Pantau room, sematkan, beri tag official, dan tutup room",gift:"Katalog gift: cari, saring, dan hapus item",emote:"Emote yang tampil di bar emote semua room",profile:"Ubah nama dan password akun developer",setting:"Agora, versi & link APK, payment, dan Firebase",pengaturan:"Agora, versi & link APK, payment, dan Firebase"},w3={dashboard:e3,user:r3,room:a3,gift:l3,emote:d3,profile:f3,setting:IS,pengaturan:IS};async function E3(n){if(!n)return null;const e=(n.email||"").toLowerCase(),t={email:e,nama:n.displayName||e.split("@")[0],peran:e===Rd?"owner":"-",aktif:!0};if(e===Rd)return t;try{const r=await Yy(Gi(Xn,"panelAdmins",e));if(r.exists()&&r.data().aktif!==!1)return{...t,peran:r.data().peran||"admin",nama:r.data().nama||t.nama}}catch(r){console.warn("panelAdmins tidak terbaca:",r.code)}return null}function I3(){const n=()=>(location.hash.replace("#","")||"dashboard").split("?")[0],[e,t]=W.useState(n);return W.useEffect(()=>{const r=()=>t(n());return window.addEventListener("hashchange",r),()=>window.removeEventListener("hashchange",r)},[]),e}function T3({onPesan:n}){const[e,t]=W.useState(""),[r,i]=W.useState(""),[s,o]=W.useState(!1),a=async c=>{c.preventDefault(),o(!0);try{await vO(Dn,e.trim(),r)}catch(h){n(h.code==="auth/invalid-credential"?"Email atau sandi salah.":"Gagal masuk: "+h.code)}finally{o(!1)}},l=async()=>{try{await KO(Dn,new fr)}catch(c){n("Gagal masuk dengan Google: "+c.code)}};return g.jsx("div",{className:"layarLogin",children:g.jsxs("form",{className:"kotakLogin",onSubmit:a,children:[g.jsxs("div",{className:"merekLogin",children:[g.jsx("div",{className:"logoBesar",children:"V"}),g.jsxs("div",{children:[g.jsx("b",{children:"Viza Panel"}),g.jsx("span",{children:"Panel developer Viza Chat · React"})]})]}),g.jsx("label",{children:"Email admin"}),g.jsx("input",{value:e,onChange:c=>t(c.target.value),placeholder:"nama@email.com",autoComplete:"username"}),g.jsx("label",{children:"Password"}),g.jsx("input",{type:"password",value:r,onChange:c=>i(c.target.value),placeholder:"••••••••",autoComplete:"current-password"}),g.jsx("button",{className:"utama",type:"submit",disabled:s,children:s?"Memeriksa…":"Masuk"}),g.jsx("div",{className:"atau",children:g.jsx("span",{children:"atau"})}),g.jsx("button",{className:"polos",type:"button",onClick:l,children:"Masuk dengan Google"}),g.jsx("div",{className:"kakiLogin",children:"Hanya akun yang terdaftar yang bisa membuka panel ini."})]})})}function S3(){const[n,e]=W.useState(void 0),[t,r]=W.useState(""),[i,s]=W.useState(!1),o=I3();if(W.useEffect(()=>{const c=setTimeout(()=>e(d=>d===void 0?null:d),4e3),h=kO(Dn,async d=>{if(clearTimeout(c),!d){e(null);return}const p=await E3(d);if(!p){r(`Akun ${d.email} belum terdaftar sebagai admin panel.`),await rg(Dn),e(null);return}e(p)});return()=>{clearTimeout(c),h()}},[]),W.useEffect(()=>{s(!1)},[o]),n===void 0)return g.jsx("div",{className:"kosong",style:{padding:40},children:"Memeriksa sesi…"});if(!n)return g.jsx(T3,{onPesan:r});const a=w3[o]||m3,l=Hz[o]||"Dashboard";return g.jsxs("div",{className:"aplikasi",children:[i&&g.jsx("div",{className:"tiraiMenu tampil",onClick:()=>s(!1)}),g.jsxs("aside",{className:"sidebar"+(i?" buka":""),children:[g.jsxs("div",{className:"merek",children:[g.jsx("div",{className:"logo",children:"V"}),g.jsxs("div",{children:[g.jsx("b",{children:"Viza Panel"}),g.jsx("span",{children:n.email})]})]}),Ox.map(c=>g.jsxs("div",{children:[c.grup?g.jsx("div",{className:"grup",children:c.grup}):null,c.isi.map(([h,d,p])=>g.jsxs("a",{className:"menu"+(o===h?" aktif":""),href:"#"+h,children:[g.jsx("i",{className:"material-icons",children:d}),g.jsx("span",{children:p})]},h))]},c.grup||"atas")),g.jsx("div",{className:"bawah",children:g.jsxs("div",{className:"saya",children:[g.jsx("div",{className:"ava",children:(n.nama||"A")[0].toUpperCase()}),g.jsxs("div",{children:[g.jsx("b",{children:n.nama}),g.jsx("span",{children:n.peran})]}),g.jsx("button",{title:"Keluar",onClick:()=>rg(Dn),children:"⎋"})]})})]}),g.jsxs("main",{className:"isi",children:[g.jsxs("div",{className:"topbar",children:[g.jsx("button",{className:"tombolMenu","aria-label":"Buka menu",onClick:()=>s(c=>!c),children:"☰"}),g.jsxs("div",{children:[g.jsx("h1",{children:l}),g.jsx("div",{className:"crumb",children:l}),g.jsx("div",{className:"ket",children:v3[o]||""})]}),g.jsx(y3,{admin:n})]}),g.jsxs("div",{className:"isiDalam",children:[t&&g.jsx("div",{className:"kosong",style:{marginBottom:12},children:t}),g.jsx(a,{nama:o,judul:l,admin:n})]})]}),g.jsx(t3,{})]})}OA(document.getElementById("root")).render(g.jsx(Nb.StrictMode,{children:g.jsx(S3,{})}));
