(this["webpackJsonpdidi-nft"]=this["webpackJsonpdidi-nft"]||[]).push([[10],{2532:function(e,t,c){"use strict";c.d(t,"a",(function(){return o}));var i=c(38),n=c(1070),s=c(0),a=c(154),l=c(3);function o(e){e.title;var t=e.visible,c=Object(s.useState)(!1),o=Object(i.a)(c,2),r=o[0],d=o[1];Object(s.useEffect)((function(){d(t)}),[t]);return Object(l.jsx)(n.a,{visible:r,footer:null,centered:!0,width:300,onCancel:function(){d(!1)},children:Object(l.jsxs)("div",{style:{display:"flex"},children:[Object(l.jsx)("div",{className:"center",style:{marginRight:"15px"},children:Object(l.jsx)(a.a,{className:"textmode",style:{fontSize:"31px"}})}),Object(l.jsx)("div",{children:Object(l.jsx)("p",{style:{color:"rgba(4, 4, 5, 0.5)",fontSize:"16px",marginTop:"20px"},children:"\u4e0a\u4f20\u56fe\u7247\u4e2d..."})})]})})}},2547:function(e,t,c){},2560:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return N}));var i=c(13),n=c(1),s=c.n(n),a=c(9),l=c(38),o=(c(2547),c(2518)),r=c(2516),d=c(1064),j=c(2513),b=c(111),O=c(0),u=c(348),p=c(334),x=c(2532),m=c(66),h=c(254),v=c(22),f=c(86),g=c(3);function N(){var e,t=o.a.TextArea,c=Object(O.useState)([]),n=Object(l.a)(c,2),N=n[0],w=n[1],y=Object(O.useState)(!1),z=Object(l.a)(y,2),F=z[0],L=z[1],k=Object(O.useState)(null),I=Object(l.a)(k,2),R=I[0],S=I[1],A=Object(O.useState)([]),E=Object(l.a)(A,2),T=E[0],Y=E[1],G=r.a.useForm(),M=Object(l.a)(G,1)[0],D=Object(m.b)(),P=Object(f.f)(),U=Object(f.h)().collectionAddress,B=Object(m.c)((function(e){return e})),J=B.walletAddress,W=B.orbitdb,q=B.chainId,H=B.collectionObj,K=B.collectionInfo,Q=Object(O.useRef)(),X=Object(u.a)({accept:"image/*",onDrop:function(e){e[0].size>2048e3?d.b.error("Logo\u6700\u5927\u4e3a2MB!"):w(e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})})))}}),_=X.getRootProps,C=X.getInputProps;Object(O.useEffect)((function(){var e;Q.current.setFieldsValue({description:null===(e=H[U])||void 0===e?void 0:e.description}),S(H[U])}),[H,U]),Object(O.useEffect)((function(){Y(K)}),[K]);var V=function(){var e=Object(a.a)(s.a.mark((function e(t){var c,i,n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(R.description=t.description,!(N.length>0)){e.next=17;break}if(!(N[0].size<=2048e3)){e.next=16;break}return L(!0),(i=new FormData).append("file",N[0]),e.next=8,Object(p.a)(i);case 8:n=e.sent,c="https://gateway.pinata.cloud/ipfs/"+n,L(!1),console.log(c),w([]),M.resetFields(),e.next=17;break;case 16:d.b.warn("Logo\u6700\u5927\u4e3a2MB");case 17:return c&&(R.logo=c),T.forEach((function(e){e.collectionAddress===U&&(e.logo=R.logo,e.description=R.description)})),"/orbitdb/zdpuAoo1YYEnqQWrj5UezXyhMyTcfFDYo85a7Hw8ce9RKw6p2/dev",e.next=23,Object(h.a)("/orbitdb/zdpuAoo1YYEnqQWrj5UezXyhMyTcfFDYo85a7Hw8ce9RKw6p2/dev",W);case 23:if(!(a=e.sent)){e.next=30;break}return e.next=27,a.set("".concat(J,"_").concat(q),T);case 27:return e.next=29,a.set("".concat(U,"_").concat(q),R);case 29:D(Object(v.db)(T));case 30:P.goBack();case 31:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{className:"edit-collection",children:Object(g.jsxs)("div",{children:[F?Object(g.jsx)(x.a,{visible:!0}):Object(g.jsx)(g.Fragment,{}),Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{className:"edit-collection-title",children:"\u7f16\u8f91\u4f5c\u54c1\u96c6"}),Object(g.jsxs)("div",{className:"edit-collection-upload-image",children:[Object(g.jsx)("div",{className:"edit-collection-area-upload",children:Object(g.jsx)("div",{children:Object(g.jsxs)("div",Object(i.a)(Object(i.a)({},_({className:"edit-collection-dropzone"})),{},{children:[Object(g.jsx)("input",Object(i.a)({},C())),N[0]||(null===R||void 0===R?void 0:R.logo)?Object(g.jsx)("div",{className:"preview",children:Object(g.jsx)("img",{src:(null===(e=N[0])||void 0===e?void 0:e.preview)||(null===R||void 0===R?void 0:R.logo),alt:"priview",style:{width:"90%",maxWidth:"208px",height:"208px",objectFit:"contain"}})}):Object(g.jsx)("p",{className:"textmode",style:{textAlign:"center"},children:"\u4e0a\u4f20LOGO"})]}))})}),Object(g.jsxs)("div",{className:"edit-collection-upload-desc",children:[Object(g.jsx)("div",{className:"edit-collection-upLoad-title",children:"\u4fee\u6539LOGO"}),Object(g.jsxs)("div",{children:[Object(g.jsx)("div",{children:"\u652f\u6301JPG, PNG, GIF"}),Object(g.jsx)("div",{children:"*\u63a8\u8350\u5c3a\u5bf8400*400\uff0c\u4e0d\u8d85\u8fc72M"})]}),Object(g.jsxs)("div",Object(i.a)(Object(i.a)({},_({className:"edit-collection-dropzone"})),{},{children:[Object(g.jsx)("input",Object(i.a)({},C())),Object(g.jsx)("div",{className:"edit-collection-upLoad-btn",children:"\u4fee\u6539"})]}))]})]}),Object(g.jsx)("div",{children:Object(g.jsx)("div",{className:"edit-collection-input-area",children:Object(g.jsxs)(r.a,{onFinish:V,form:M,colon:!1,ref:Q,children:[Object(g.jsx)(r.a.Item,{label:Object(g.jsx)("div",{className:"edit-collection-input-name",children:"\u4f5c\u54c1\u96c6\u540d\u79f0*"}),name:"name",children:Object(g.jsx)("p",{className:"edit-collection-input-value",children:null===R||void 0===R?void 0:R.name})}),Object(g.jsx)("div",{className:"mt25"}),Object(g.jsx)(r.a.Item,{label:Object(g.jsx)("div",{className:"edit-collection-input-name",children:"\u4f5c\u54c1\u96c6\u4ee3\u7801*"}),name:"name",children:Object(g.jsx)("p",{className:"edit-collection-input-value",children:null===R||void 0===R?void 0:R.symbol})}),Object(g.jsx)("div",{className:"mt25"}),Object(g.jsx)(r.a.Item,{className:"description",name:"description",label:Object(g.jsx)("div",{className:"edit-collection-input-name",children:"\u7b80\u4ecb"}),children:Object(g.jsx)(t,{className:"input-name-nft input-mode-bc content-description",autoSize:{minRows:2},placeholder:"\u8bf7\u8f93\u5165\u7b80\u4ecb",size:"large",maxLength:"500"})}),Object(g.jsx)(r.a.Item,{style:{marginTop:"40px"},children:Object(g.jsx)(j.a,{justify:"center",children:Object(g.jsx)(b.a,{className:"btn-create-item",htmlType:"submit",shape:"round",size:"large",children:"\u4fdd\u5b58"})})})]})})})]})]})})})}}}]);
//# sourceMappingURL=10.c71ff68b.chunk.js.map