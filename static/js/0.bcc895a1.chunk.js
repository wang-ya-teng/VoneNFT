(this["webpackJsonpdidi-nft"]=this["webpackJsonpdidi-nft"]||[]).push([[0],{2372:function(e,t,a){"use strict";var n=a(664),c=a(385),r=n.e;r.Header=n.c,r.Footer=n.b,r.Content=n.a,r.Sider=c.b,t.a=r},2377:function(e,t,a){"use strict";var n=a(8),c=a(5),r=a(0),o=a(11),i=a.n(o),l=a(72),u=a(159),s=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},d=function(e){var t=e.prefixCls,a=e.className,o=e.hoverable,l=void 0===o||o,d=s(e,["prefixCls","className","hoverable"]);return r.createElement(u.a,null,(function(e){var o=(0,e.getPrefixCls)("card",t),u=i()("".concat(o,"-grid"),a,Object(n.a)({},"".concat(o,"-grid-hoverable"),l));return r.createElement("div",Object(c.a)({},d,{className:u}))}))},b=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a},f=function(e){return r.createElement(u.a,null,(function(t){var a=t.getPrefixCls,n=e.prefixCls,o=e.className,l=e.avatar,u=e.title,s=e.description,d=b(e,["prefixCls","className","avatar","title","description"]),f=a("card",n),v=i()("".concat(f,"-meta"),o),m=l?r.createElement("div",{className:"".concat(f,"-meta-avatar")},l):null,p=u?r.createElement("div",{className:"".concat(f,"-meta-title")},u):null,h=s?r.createElement("div",{className:"".concat(f,"-meta-description")},s):null,O=p||h?r.createElement("div",{className:"".concat(f,"-meta-detail")},p,h):null;return r.createElement("div",Object(c.a)({},d,{className:v}),m,O)}))},v=a(13),m=a(42),p=a(35),h=a(7),O=a(154),y=a(336),j=a(128),E=a(23),g=a(58),x=a(261);function w(e){var t=Object(r.useRef)(),a=Object(r.useRef)(!1);return Object(r.useEffect)((function(){return function(){a.current=!0,g.a.cancel(t.current)}}),[]),function(){for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];a.current||(g.a.cancel(t.current),t.current=Object(g.a)((function(){e.apply(void 0,c)})))}}var k=a(84);function C(e,t){var a,c=e.prefixCls,o=e.id,l=e.active,u=e.tab,s=u.key,d=u.tab,b=u.disabled,f=u.closeIcon,v=e.closable,m=e.renderWrapper,p=e.removeAriaLabel,h=e.editable,O=e.onClick,y=e.onRemove,j=e.onFocus,E=e.style,g=e.className,x="".concat(c,"-tab");r.useEffect((function(){return y}),[]);var w=h&&!1!==v&&!b;function C(e){b||O(e)}var N=r.createElement("div",{key:s,ref:t,className:i()(x,g,(a={},Object(n.a)(a,"".concat(x,"-with-remove"),w),Object(n.a)(a,"".concat(x,"-active"),l),Object(n.a)(a,"".concat(x,"-disabled"),b),a)),style:E,onClick:C},r.createElement("div",{role:"tab","aria-selected":l,id:o&&"".concat(o,"-tab-").concat(s),className:"".concat(x,"-btn"),"aria-controls":o&&"".concat(o,"-panel-").concat(s),"aria-disabled":b,tabIndex:b?null:0,onClick:function(e){e.stopPropagation(),C(e)},onKeyDown:function(e){[k.a.SPACE,k.a.ENTER].includes(e.which)&&(e.preventDefault(),C(e))},onFocus:j},d),w&&r.createElement("button",{type:"button","aria-label":p||"remove",tabIndex:0,className:"".concat(x,"-remove"),onClick:function(e){var t;e.stopPropagation(),(t=e).preventDefault(),t.stopPropagation(),h.onEdit("remove",{key:s,event:t})}},f||h.removeIcon||"\xd7"));return m?m(N):N}var N=r.forwardRef(C),P={width:0,height:0,left:0,top:0};var S={width:0,height:0,left:0,top:0,right:0};var T=a(156),I=a(942);function R(e,t){var a=e.prefixCls,n=e.editable,c=e.locale,o=e.style;return n&&!1!==n.showAdd?r.createElement("button",{ref:t,type:"button",className:"".concat(a,"-nav-add"),style:o,"aria-label":(null===c||void 0===c?void 0:c.addAriaLabel)||"Add tab",onClick:function(e){n.onEdit("add",{event:e})}},n.addIcon||"+"):null}var M=r.forwardRef(R);function A(e,t){var a=e.prefixCls,c=e.id,o=e.tabs,l=e.locale,u=e.mobile,s=e.moreIcon,d=void 0===s?"More":s,b=e.moreTransitionName,f=e.style,m=e.className,p=e.editable,h=e.tabBarGutter,O=e.rtl,y=e.removeAriaLabel,j=e.onTabClick,E=Object(r.useState)(!1),g=Object(v.a)(E,2),x=g[0],w=g[1],C=Object(r.useState)(null),N=Object(v.a)(C,2),P=N[0],S=N[1],R="".concat(c,"-more-popup"),A="".concat(a,"-dropdown"),L=null!==P?"".concat(R,"-").concat(P):null,B=null===l||void 0===l?void 0:l.dropdownAriaLabel;var K=r.createElement(T.f,{onClick:function(e){var t=e.key,a=e.domEvent;j(t,a),w(!1)},id:R,tabIndex:-1,role:"listbox","aria-activedescendant":L,selectedKeys:[P],"aria-label":void 0!==B?B:"expanded dropdown"},o.map((function(e){var t=p&&!1!==e.closable&&!e.disabled;return r.createElement(T.d,{key:e.key,id:"".concat(R,"-").concat(e.key),role:"option","aria-controls":c&&"".concat(c,"-panel-").concat(e.key),disabled:e.disabled},r.createElement("span",null,e.tab),t&&r.createElement("button",{type:"button","aria-label":y||"remove",tabIndex:0,className:"".concat(A,"-menu-item-remove"),onClick:function(t){var a,n;t.stopPropagation(),a=t,n=e.key,a.preventDefault(),a.stopPropagation(),p.onEdit("remove",{key:n,event:a})}},e.closeIcon||p.removeIcon||"\xd7"))})));function D(e){for(var t=o.filter((function(e){return!e.disabled})),a=t.findIndex((function(e){return e.key===P}))||0,n=t.length,c=0;c<n;c+=1){var r=t[a=(a+e+n)%n];if(!r.disabled)return void S(r.key)}}Object(r.useEffect)((function(){var e=document.getElementById(L);e&&e.scrollIntoView&&e.scrollIntoView(!1)}),[P]),Object(r.useEffect)((function(){x||S(null)}),[x]);var W=Object(n.a)({},O?"marginRight":"marginLeft",h);o.length||(W.visibility="hidden",W.order=1);var z=i()(Object(n.a)({},"".concat(A,"-rtl"),O)),q=u?null:r.createElement(I.a,{prefixCls:A,overlay:K,trigger:["hover"],visible:x,transitionName:b,onVisibleChange:w,overlayClassName:z,mouseEnterDelay:.1,mouseLeaveDelay:.1},r.createElement("button",{type:"button",className:"".concat(a,"-nav-more"),style:W,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":R,id:"".concat(c,"-more"),"aria-expanded":x,onKeyDown:function(e){var t=e.which;if(x)switch(t){case k.a.UP:D(-1),e.preventDefault();break;case k.a.DOWN:D(1),e.preventDefault();break;case k.a.ESC:w(!1);break;case k.a.SPACE:case k.a.ENTER:null!==P&&j(P,e)}else[k.a.DOWN,k.a.SPACE,k.a.ENTER].includes(t)&&(w(!0),e.preventDefault())}},d));return r.createElement("div",{className:i()("".concat(a,"-nav-operations"),m),style:f,ref:t},q,r.createElement(M,{prefixCls:a,locale:l,editable:p}))}var L=r.memo(r.forwardRef(A),(function(e,t){return t.tabMoving})),B=Object(r.createContext)(null),K=Math.pow(.995,20);function D(e,t){var a=r.useRef(e),n=r.useState({}),c=Object(v.a)(n,2)[1];return[a.current,function(e){var n="function"===typeof e?e(a.current):e;n!==a.current&&t(n,a.current),a.current=n,c({})}]}var W=function(e){var t,a=e.position,n=e.prefixCls,c=e.extra;if(!c)return null;var o={};return c&&"object"===Object(m.a)(c)&&!r.isValidElement(c)?o=c:o.right=c,"right"===a&&(t=o.right),"left"===a&&(t=o.left),t?r.createElement("div",{className:"".concat(n,"-extra-content")},t):null};function z(e,t){var a,o=r.useContext(B),l=o.prefixCls,u=o.tabs,s=e.className,d=e.style,b=e.id,f=e.animated,m=e.activeKey,p=e.rtl,O=e.extra,y=e.editable,j=e.locale,k=e.tabPosition,C=e.tabBarGutter,T=e.children,I=e.onTabClick,R=e.onTabScroll,A=Object(r.useRef)(),z=Object(r.useRef)(),q=Object(r.useRef)(),H=Object(r.useRef)(),V=function(){var e=Object(r.useRef)(new Map);return[function(t){return e.current.has(t)||e.current.set(t,r.createRef()),e.current.get(t)},function(t){e.current.delete(t)}]}(),G=Object(v.a)(V,2),F=G[0],Y=G[1],_="top"===k||"bottom"===k,X=D(0,(function(e,t){_&&R&&R({direction:e>t?"left":"right"})})),J=Object(v.a)(X,2),U=J[0],Q=J[1],Z=D(0,(function(e,t){!_&&R&&R({direction:e>t?"top":"bottom"})})),$=Object(v.a)(Z,2),ee=$[0],te=$[1],ae=Object(r.useState)(0),ne=Object(v.a)(ae,2),ce=ne[0],re=ne[1],oe=Object(r.useState)(0),ie=Object(v.a)(oe,2),le=ie[0],ue=ie[1],se=Object(r.useState)(0),de=Object(v.a)(se,2),be=de[0],fe=de[1],ve=Object(r.useState)(0),me=Object(v.a)(ve,2),pe=me[0],he=me[1],Oe=Object(r.useState)(null),ye=Object(v.a)(Oe,2),je=ye[0],Ee=ye[1],ge=Object(r.useState)(null),xe=Object(v.a)(ge,2),we=xe[0],ke=xe[1],Ce=Object(r.useState)(0),Ne=Object(v.a)(Ce,2),Pe=Ne[0],Se=Ne[1],Te=Object(r.useState)(0),Ie=Object(v.a)(Te,2),Re=Ie[0],Me=Ie[1],Ae=function(e){var t=Object(r.useRef)([]),a=Object(r.useState)({}),n=Object(v.a)(a,2)[1],c=Object(r.useRef)("function"===typeof e?e():e),o=w((function(){var e=c.current;t.current.forEach((function(t){e=t(e)})),t.current=[],c.current=e,n({})}));return[c.current,function(e){t.current.push(e),o()}]}(new Map),Le=Object(v.a)(Ae,2),Be=Le[0],Ke=Le[1],De=function(e,t,a){return Object(r.useMemo)((function(){for(var a,n=new Map,c=t.get(null===(a=e[0])||void 0===a?void 0:a.key)||P,r=c.left+c.width,o=0;o<e.length;o+=1){var i,l=e[o].key,u=t.get(l);u||(u=t.get(null===(i=e[o-1])||void 0===i?void 0:i.key)||P);var s=n.get(l)||Object(h.a)({},u);s.right=r-s.left-s.width,n.set(l,s)}return n}),[e.map((function(e){return e.key})).join("_"),t,a])}(u,Be,ce),We="".concat(l,"-nav-operations-hidden"),ze=0,qe=0;function He(e){return e<ze?ze:e>qe?qe:e}_?p?(ze=0,qe=Math.max(0,ce-je)):(ze=Math.min(0,je-ce),qe=0):(ze=Math.min(0,we-le),qe=0);var Ve=Object(r.useRef)(),Ge=Object(r.useState)(),Fe=Object(v.a)(Ge,2),Ye=Fe[0],_e=Fe[1];function Xe(){_e(Date.now())}function Je(){window.clearTimeout(Ve.current)}function Ue(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=De.get(e)||{width:0,height:0,left:0,right:0,top:0};if(_){var a=U;p?t.right<U?a=t.right:t.right+t.width>U+je&&(a=t.right+t.width-je):t.left<-U?a=-t.left:t.left+t.width>-U+je&&(a=-(t.left+t.width-je)),te(0),Q(He(a))}else{var n=ee;t.top<-ee?n=-t.top:t.top+t.height>-ee+we&&(n=-(t.top+t.height-we)),Q(0),te(He(n))}}!function(e,t){var a=Object(r.useState)(),n=Object(v.a)(a,2),c=n[0],o=n[1],i=Object(r.useState)(0),l=Object(v.a)(i,2),u=l[0],s=l[1],d=Object(r.useState)(0),b=Object(v.a)(d,2),f=b[0],m=b[1],p=Object(r.useState)(),h=Object(v.a)(p,2),O=h[0],y=h[1],j=Object(r.useRef)(),E=Object(r.useRef)(),g=Object(r.useRef)(null);g.current={onTouchStart:function(e){var t=e.touches[0],a=t.screenX,n=t.screenY;o({x:a,y:n}),window.clearInterval(j.current)},onTouchMove:function(e){if(c){e.preventDefault();var a=e.touches[0],n=a.screenX,r=a.screenY;o({x:n,y:r});var i=n-c.x,l=r-c.y;t(i,l);var d=Date.now();s(d),m(d-u),y({x:i,y:l})}},onTouchEnd:function(){if(c&&(o(null),y(null),O)){var e=O.x/f,a=O.y/f,n=Math.abs(e),r=Math.abs(a);if(Math.max(n,r)<.1)return;var i=e,l=a;j.current=window.setInterval((function(){Math.abs(i)<.01&&Math.abs(l)<.01?window.clearInterval(j.current):t(20*(i*=K),20*(l*=K))}),20)}},onWheel:function(e){var a=e.deltaX,n=e.deltaY,c=0,r=Math.abs(a),o=Math.abs(n);r===o?c="x"===E.current?a:n:r>o?(c=a,E.current="x"):(c=n,E.current="y"),t(-c,-c)&&e.preventDefault()}},r.useEffect((function(){function t(e){g.current.onTouchMove(e)}function a(e){g.current.onTouchEnd(e)}return document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",a,{passive:!1}),e.current.addEventListener("touchstart",(function(e){g.current.onTouchStart(e)}),{passive:!1}),e.current.addEventListener("wheel",(function(e){g.current.onWheel(e)})),function(){document.removeEventListener("touchmove",t),document.removeEventListener("touchend",a)}}),[])}(A,(function(e,t){function a(e,t){e((function(e){return He(e+t)}))}if(_){if(je>=ce)return!1;a(Q,e)}else{if(we>=le)return!1;a(te,t)}return Je(),Xe(),!0})),Object(r.useEffect)((function(){return Je(),Ye&&(Ve.current=window.setTimeout((function(){_e(0)}),100)),Je}),[Ye]);var Qe=function(e,t,a,n,c){var o,i,l,u=c.tabs,s=c.tabPosition,d=c.rtl;["top","bottom"].includes(s)?(o="width",i=d?"right":"left",l=Math.abs(t.left)):(o="height",i="top",l=-t.top);var b=t[o],f=a[o],v=n[o],m=b;return f+v>b&&(m=b-v),Object(r.useMemo)((function(){if(!u.length)return[0,0];for(var t=u.length,a=t,n=0;n<t;n+=1){var c=e.get(u[n].key)||S;if(c[i]+c[o]>l+m){a=n-1;break}}for(var r=0,s=t-1;s>=0;s-=1)if((e.get(u[s].key)||S)[i]<l){r=s+1;break}return[r,a]}),[e,l,m,s,u.map((function(e){return e.key})).join("_"),d])}(De,{width:je,height:we,left:U,top:ee},{width:be,height:pe},{width:Pe,height:Re},Object(h.a)(Object(h.a)({},e),{},{tabs:u})),Ze=Object(v.a)(Qe,2),$e=Ze[0],et=Ze[1],tt={};"top"===k||"bottom"===k?tt[p?"marginRight":"marginLeft"]=C:tt.marginTop=C;var at=u.map((function(e,t){var a=e.key,n=e.className;return r.createElement(N,{id:b,prefixCls:l,key:a,tab:e,style:0===t?void 0:tt,className:n,closable:e.closable,editable:y,active:a===m,renderWrapper:T,removeAriaLabel:null===j||void 0===j?void 0:j.removeAriaLabel,ref:F(a),onClick:function(e){I(a,e)},onRemove:function(){Y(a)},onFocus:function(){Ue(a),Xe(),A.current&&(p||(A.current.scrollLeft=0),A.current.scrollTop=0)}})})),nt=w((function(){var e,t,a,n,c,r,o,i,l,s=(null===(e=A.current)||void 0===e?void 0:e.offsetWidth)||0,d=(null===(t=A.current)||void 0===t?void 0:t.offsetHeight)||0,b=(null===(a=H.current)||void 0===a?void 0:a.offsetWidth)||0,f=(null===(n=H.current)||void 0===n?void 0:n.offsetHeight)||0,v=(null===(c=q.current)||void 0===c?void 0:c.offsetWidth)||0,m=(null===(r=q.current)||void 0===r?void 0:r.offsetHeight)||0;Ee(s),ke(d),Se(b),Me(f);var p=((null===(o=z.current)||void 0===o?void 0:o.offsetWidth)||0)-b,h=((null===(i=z.current)||void 0===i?void 0:i.offsetHeight)||0)-f;re(p),ue(h);var O=null===(l=q.current)||void 0===l?void 0:l.className.includes(We);fe(p-(O?0:v)),he(h-(O?0:m)),Ke((function(){var e=new Map;return u.forEach((function(t){var a=t.key,n=F(a).current;n&&e.set(a,{width:n.offsetWidth,height:n.offsetHeight,left:n.offsetLeft,top:n.offsetTop})})),e}))})),ct=u.slice(0,$e),rt=u.slice(et+1),ot=[].concat(Object(E.a)(ct),Object(E.a)(rt)),it=Object(r.useState)(),lt=Object(v.a)(it,2),ut=lt[0],st=lt[1],dt=De.get(m),bt=Object(r.useRef)();function ft(){g.a.cancel(bt.current)}Object(r.useEffect)((function(){var e={};return dt&&(_?(p?e.right=dt.right:e.left=dt.left,e.width=dt.width):(e.top=dt.top,e.height=dt.height)),ft(),bt.current=Object(g.a)((function(){st(e)})),ft}),[dt,_,p]),Object(r.useEffect)((function(){Ue()}),[m,dt,De,_]),Object(r.useEffect)((function(){nt()}),[p,C,m,u.map((function(e){return e.key})).join("_")]);var vt,mt,pt,ht,Ot=!!ot.length,yt="".concat(l,"-nav-wrap");return _?p?(mt=U>0,vt=U+je<ce):(vt=U<0,mt=-U+je<ce):(pt=ee<0,ht=-ee+we<le),r.createElement("div",{ref:t,role:"tablist",className:i()("".concat(l,"-nav"),s),style:d,onKeyDown:function(){Xe()}},r.createElement(W,{position:"left",extra:O,prefixCls:l}),r.createElement(x.a,{onResize:nt},r.createElement("div",{className:i()(yt,(a={},Object(n.a)(a,"".concat(yt,"-ping-left"),vt),Object(n.a)(a,"".concat(yt,"-ping-right"),mt),Object(n.a)(a,"".concat(yt,"-ping-top"),pt),Object(n.a)(a,"".concat(yt,"-ping-bottom"),ht),a)),ref:A},r.createElement(x.a,{onResize:nt},r.createElement("div",{ref:z,className:"".concat(l,"-nav-list"),style:{transform:"translate(".concat(U,"px, ").concat(ee,"px)"),transition:Ye?"none":void 0}},at,r.createElement(M,{ref:H,prefixCls:l,locale:j,editable:y,style:Object(h.a)(Object(h.a)({},0===at.length?void 0:tt),{},{visibility:Ot?"hidden":null})}),r.createElement("div",{className:i()("".concat(l,"-ink-bar"),Object(n.a)({},"".concat(l,"-ink-bar-animated"),f.inkBar)),style:ut}))))),r.createElement(L,Object(c.a)({},e,{removeAriaLabel:null===j||void 0===j?void 0:j.removeAriaLabel,ref:q,prefixCls:l,tabs:ot,className:!Ot&&We,tabMoving:!!Ye})),r.createElement(W,{position:"right",extra:O,prefixCls:l}))}var q=r.forwardRef(z);function H(e){var t=e.id,a=e.activeKey,c=e.animated,o=e.tabPosition,l=e.rtl,u=e.destroyInactiveTabPane,s=r.useContext(B),d=s.prefixCls,b=s.tabs,f=c.tabPane,v=b.findIndex((function(e){return e.key===a}));return r.createElement("div",{className:i()("".concat(d,"-content-holder"))},r.createElement("div",{className:i()("".concat(d,"-content"),"".concat(d,"-content-").concat(o),Object(n.a)({},"".concat(d,"-content-animated"),f)),style:v&&f?Object(n.a)({},l?"marginRight":"marginLeft","-".concat(v,"00%")):null},b.map((function(e){return r.cloneElement(e.node,{key:e.key,prefixCls:d,tabKey:e.key,id:t,animated:f,active:e.key===a,destroyInactiveTabPane:u})}))))}function V(e){var t=e.prefixCls,a=e.forceRender,n=e.className,c=e.style,o=e.id,l=e.active,u=e.animated,s=e.destroyInactiveTabPane,d=e.tabKey,b=e.children,f=r.useState(a),m=Object(v.a)(f,2),p=m[0],O=m[1];r.useEffect((function(){l?O(!0):s&&O(!1)}),[l,s]);var y={};return l||(u?(y.visibility="hidden",y.height=0,y.overflowY="hidden"):y.display="none"),r.createElement("div",{id:o&&"".concat(o,"-panel-").concat(d),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":o&&"".concat(o,"-tab-").concat(d),"aria-hidden":!l,style:Object(h.a)(Object(h.a)({},y),c),className:i()("".concat(t,"-tabpane"),l&&"".concat(t,"-tabpane-active"),n)},(l||p||a)&&b)}var G=["id","prefixCls","className","children","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll"],F=0;function Y(e,t){var a,o,l=e.id,u=e.prefixCls,s=void 0===u?"rc-tabs":u,d=e.className,b=e.children,f=e.direction,E=e.activeKey,g=e.defaultActiveKey,x=e.editable,w=e.animated,k=void 0===w?{inkBar:!0,tabPane:!1}:w,C=e.tabPosition,N=void 0===C?"top":C,P=e.tabBarGutter,S=e.tabBarStyle,T=e.tabBarExtraContent,I=e.locale,R=e.moreIcon,M=e.moreTransitionName,A=e.destroyInactiveTabPane,L=e.renderTabBar,K=e.onChange,D=e.onTabClick,W=e.onTabScroll,z=Object(p.a)(e,G),V=function(e){return Object(O.a)(e).map((function(e){if(r.isValidElement(e)){var t=void 0!==e.key?String(e.key):void 0;return Object(h.a)(Object(h.a)({key:t},e.props),{},{node:e})}return null})).filter((function(e){return e}))}(b),Y="rtl"===f;o=!1===k?{inkBar:!1,tabPane:!1}:!0===k?{inkBar:!0,tabPane:!0}:Object(h.a)({inkBar:!0,tabPane:!1},"object"===Object(m.a)(k)?k:{});var _=Object(r.useState)(!1),X=Object(v.a)(_,2),J=X[0],U=X[1];Object(r.useEffect)((function(){U(Object(y.a)())}),[]);var Q=Object(j.a)((function(){var e;return null===(e=V[0])||void 0===e?void 0:e.key}),{value:E,defaultValue:g}),Z=Object(v.a)(Q,2),$=Z[0],ee=Z[1],te=Object(r.useState)((function(){return V.findIndex((function(e){return e.key===$}))})),ae=Object(v.a)(te,2),ne=ae[0],ce=ae[1];Object(r.useEffect)((function(){var e,t=V.findIndex((function(e){return e.key===$}));-1===t&&(t=Math.max(0,Math.min(ne,V.length-1)),ee(null===(e=V[t])||void 0===e?void 0:e.key));ce(t)}),[V.map((function(e){return e.key})).join("_"),$,ne]);var re=Object(j.a)(null,{value:l}),oe=Object(v.a)(re,2),ie=oe[0],le=oe[1],ue=N;J&&!["left","right"].includes(N)&&(ue="top"),Object(r.useEffect)((function(){l||(le("rc-tabs-".concat(F)),F+=1)}),[]);var se,de={id:ie,activeKey:$,animated:o,tabPosition:ue,rtl:Y,mobile:J},be=Object(h.a)(Object(h.a)({},de),{},{editable:x,locale:I,moreIcon:R,moreTransitionName:M,tabBarGutter:P,onTabClick:function(e,t){null===D||void 0===D||D(e,t),ee(e),null===K||void 0===K||K(e)},onTabScroll:W,extra:T,style:S,panes:b});return se=L?L(be,q):r.createElement(q,be),r.createElement(B.Provider,{value:{tabs:V,prefixCls:s}},r.createElement("div",Object(c.a)({ref:t,id:l,className:i()(s,"".concat(s,"-").concat(ue),(a={},Object(n.a)(a,"".concat(s,"-mobile"),J),Object(n.a)(a,"".concat(s,"-editable"),x),Object(n.a)(a,"".concat(s,"-rtl"),Y),a),d)},z),se,r.createElement(H,Object(c.a)({destroyInactiveTabPane:A},de,{animated:o}))))}var _=r.forwardRef(Y);_.TabPane=V;var X=_,J=a(386),U={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},Q=a(39),Z=function(e,t){return r.createElement(Q.a,Object(h.a)(Object(h.a)({},e),{},{ref:t,icon:U}))};Z.displayName="PlusOutlined";var $=r.forwardRef(Z),ee=a(319),te=a(62),ae=a(90),ne=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a};function ce(e){var t,a=e.type,o=e.className,l=e.size,s=e.onEdit,d=e.hideAdd,b=e.centered,f=e.addIcon,v=ne(e,["type","className","size","onEdit","hideAdd","centered","addIcon"]),m=v.prefixCls,p=v.moreIcon,h=void 0===p?r.createElement(J.a,null):p,O=r.useContext(u.b),y=O.getPrefixCls,j=O.direction,E=y("tabs",m);"editable-card"===a&&(t={onEdit:function(e,t){var a=t.key,n=t.event;null===s||void 0===s||s("add"===e?n:a,e)},removeIcon:r.createElement(ee.a,null),addIcon:f||r.createElement($,null),showAdd:!0!==d});var g=y();return Object(te.a)(!("onPrevClick"in v)&&!("onNextClick"in v),"Tabs","`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead."),r.createElement(ae.b.Consumer,null,(function(e){var u,s=void 0!==l?l:e;return r.createElement(X,Object(c.a)({direction:j,moreTransitionName:"".concat(g,"-slide-up")},v,{className:i()((u={},Object(n.a)(u,"".concat(E,"-").concat(s),s),Object(n.a)(u,"".concat(E,"-card"),["card","editable-card"].includes(a)),Object(n.a)(u,"".concat(E,"-editable-card"),"editable-card"===a),Object(n.a)(u,"".concat(E,"-centered"),b),u),o),editable:t,moreIcon:h,prefixCls:E}))}))}ce.TabPane=V;var re=ce,oe=a(2323),ie=a(2322),le=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(n=Object.getOwnPropertySymbols(e);c<n.length;c++)t.indexOf(n[c])<0&&Object.prototype.propertyIsEnumerable.call(e,n[c])&&(a[n[c]]=e[n[c]])}return a};var ue=function(e){var t,a,o,s=r.useContext(u.b),b=s.getPrefixCls,f=s.direction,v=r.useContext(ae.b),m=e.prefixCls,p=e.className,h=e.extra,O=e.headStyle,y=void 0===O?{}:O,j=e.bodyStyle,E=void 0===j?{}:j,g=e.title,x=e.loading,w=e.bordered,k=void 0===w||w,C=e.size,N=e.type,P=e.cover,S=e.actions,T=e.tabList,I=e.children,R=e.activeTabKey,M=e.defaultActiveTabKey,A=e.tabBarExtraContent,L=e.hoverable,B=e.tabProps,K=void 0===B?{}:B,D=le(e,["prefixCls","className","extra","headStyle","bodyStyle","title","loading","bordered","size","type","cover","actions","tabList","children","activeTabKey","defaultActiveTabKey","tabBarExtraContent","hoverable","tabProps"]),W=b("card",m),z=0===E.padding||"0px"===E.padding?{padding:24}:void 0,q=r.createElement("div",{className:"".concat(W,"-loading-block")}),H=r.createElement("div",{className:"".concat(W,"-loading-content"),style:z},r.createElement(oe.a,{gutter:8},r.createElement(ie.a,{span:22},q)),r.createElement(oe.a,{gutter:8},r.createElement(ie.a,{span:8},q),r.createElement(ie.a,{span:15},q)),r.createElement(oe.a,{gutter:8},r.createElement(ie.a,{span:6},q),r.createElement(ie.a,{span:18},q)),r.createElement(oe.a,{gutter:8},r.createElement(ie.a,{span:13},q),r.createElement(ie.a,{span:9},q)),r.createElement(oe.a,{gutter:8},r.createElement(ie.a,{span:4},q),r.createElement(ie.a,{span:3},q),r.createElement(ie.a,{span:16},q))),V=void 0!==R,G=Object(c.a)(Object(c.a)({},K),(t={},Object(n.a)(t,V?"activeKey":"defaultActiveKey",V?R:M),Object(n.a)(t,"tabBarExtraContent",A),t)),F=T&&T.length?r.createElement(re,Object(c.a)({size:"large"},G,{className:"".concat(W,"-head-tabs"),onChange:function(t){var a;null===(a=e.onTabChange)||void 0===a||a.call(e,t)}}),T.map((function(e){return r.createElement(re.TabPane,{tab:e.tab,disabled:e.disabled,key:e.key})}))):null;(g||h||F)&&(o=r.createElement("div",{className:"".concat(W,"-head"),style:y},r.createElement("div",{className:"".concat(W,"-head-wrapper")},g&&r.createElement("div",{className:"".concat(W,"-head-title")},g),h&&r.createElement("div",{className:"".concat(W,"-extra")},h)),F));var Y=P?r.createElement("div",{className:"".concat(W,"-cover")},P):null,_=r.createElement("div",{className:"".concat(W,"-body"),style:E},x?H:I),X=S&&S.length?r.createElement("ul",{className:"".concat(W,"-actions")},function(e){return e.map((function(t,a){return r.createElement("li",{style:{width:"".concat(100/e.length,"%")},key:"action-".concat(a)},r.createElement("span",null,t))}))}(S)):null,J=Object(l.a)(D,["onTabChange"]),U=C||v,Q=i()(W,(a={},Object(n.a)(a,"".concat(W,"-loading"),x),Object(n.a)(a,"".concat(W,"-bordered"),k),Object(n.a)(a,"".concat(W,"-hoverable"),L),Object(n.a)(a,"".concat(W,"-contain-grid"),function(){var t;return r.Children.forEach(e.children,(function(e){e&&e.type&&e.type===d&&(t=!0)})),t}()),Object(n.a)(a,"".concat(W,"-contain-tabs"),T&&T.length),Object(n.a)(a,"".concat(W,"-").concat(U),U),Object(n.a)(a,"".concat(W,"-type-").concat(N),!!N),Object(n.a)(a,"".concat(W,"-rtl"),"rtl"===f),a),p);return r.createElement("div",Object(c.a)({},J,{className:Q}),o,Y,_,X)};ue.Grid=d,ue.Meta=f;t.a=ue}}]);
//# sourceMappingURL=0.bcc895a1.chunk.js.map