(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[697],{8540:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,314,23))},314:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let r=n(1972),u=n(3027),l=n(3518),o=n(6580),f=n(8462),i=n(4789),a=n(1519),c=n(1563),s=["method","encType","target"];function d(e){let{replace:t,scroll:n,prefetch:d,ref:y,..._}=e,v=function(){let e=(0,u.useContext)(c.RouterContext),t=(0,u.useContext)(i.AppRouterContext);return e||t}(),j=_.action,h="string"==typeof j,O=!1===d||null===d?d:null;for(let e of s)e in _&&delete _[e];let M=b(v)&&h&&null===O,[P,w]=(0,o.useIntersection)({rootMargin:"200px",disabled:!M}),C=(0,f.useMergedRef)(P,null!=y?y:null);if((0,u.useEffect)(()=>{if(w&&M)try{let e=a.PrefetchKind.AUTO;v.prefetch(j,{kind:e})}catch(e){console.error(e)}},[M,w,j,O,v]),!h)return(0,r.jsx)("form",{..._,ref:C});let x=(0,l.addBasePath)(j);return(0,r.jsx)("form",{..._,ref:C,action:x,onSubmit:e=>(function(e,t){let n,{actionHref:r,onSubmit:u,replace:l,scroll:o,router:f}=t;if("function"==typeof u&&(u(e),e.defaultPrevented))return;let i=e.currentTarget,a=e.nativeEvent.submitter,c=r;if(a){if(function(e){let t=e.getAttribute("formEncType");if(null!==t&&!p(t))return!0;let n=e.getAttribute("formMethod");if(null!==n&&!m(n))return!0;let r=e.getAttribute("formTarget");return!(null===r||g(r))}(a)||function(e){let t=e.getAttribute("formAction");return t&&/\s*javascript:/i.test(t)}(a))return;let e=a.getAttribute("formAction");null!==e&&(c=e)}try{let e=window.location.href;n=new URL(c,e)}catch(e){throw Error('Cannot parse form action "'+c+'" as a URL',{cause:e})}for(let[e,t]of(n.searchParams.size&&(n.search=""),new FormData(i)))"string"!=typeof t&&(t=t.name),n.searchParams.append(e,t);e.preventDefault();let s=l?"replace":"push",d=n.href;b(f)?f[s](d,{scroll:o}):f[s](d,void 0,{scroll:o})})(e,{router:v,actionHref:x,replace:t,scroll:n,onSubmit:_.onSubmit})})}function b(e){return!("asPath"in e)}let p=e=>"application/x-www-form-urlencoded"===e,m=e=>"get"===e,g=e=>"_self"===e;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3124:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{cancelIdleCallback:function(){return r},requestIdleCallback:function(){return n}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6580:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return i}});let r=n(3027),u=n(3124),l="function"==typeof IntersectionObserver,o=new Map,f=[];function i(e){let{rootRef:t,rootMargin:n,disabled:i}=e,a=i||!l,[c,s]=(0,r.useState)(!1),d=(0,r.useRef)(null),b=(0,r.useCallback)(e=>{d.current=e},[]);return(0,r.useEffect)(()=>{if(l){if(a||c)return;let e=d.current;if(e&&e.tagName)return function(e,t,n){let{id:r,observer:u,elements:l}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=f.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=o.get(r)))return t;let u=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=u.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:u},f.push(n),o.set(n,t),t}(n);return l.set(e,t),u.observe(e),function(){if(l.delete(e),u.unobserve(e),0===l.size){u.disconnect(),o.delete(r);let e=f.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&f.splice(e,1)}}}(e,e=>e&&s(e),{root:null==t?void 0:t.current,rootMargin:n})}else if(!c){let e=(0,u.requestIdleCallback)(()=>s(!0));return()=>(0,u.cancelIdleCallback)(e)}},[a,n,t,c,d.current]),[b,c,(0,r.useCallback)(()=>{s(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8462:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return u}});let r=n(3027);function u(e,t){let n=(0,r.useRef)(()=>{}),u=(0,r.useRef)(()=>{});return(0,r.useMemo)(()=>e&&t?r=>{null===r?(n.current(),u.current()):(n.current=l(e,r),u.current=l(t,r))}:e||t,[e,t])}function l(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1563:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return r}});let r=n(8319)._(n(3027)).default.createContext(null)}},e=>{var t=t=>e(e.s=t);e.O(0,[878,746,744],()=>t(8540)),_N_E=e.O()}]);