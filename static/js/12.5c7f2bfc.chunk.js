(this["webpackJsonpdidi-nft"]=this["webpackJsonpdidi-nft"]||[]).push([[12],{2360:function(e,t,c){},2374:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return w}));var a=c(9),n=c(1),s=c.n(n),r=c(14),i=c(33),o=(c(2360),c(2327)),l=c(2325),j=c(967),d=c(2322),b=c(101),u=c(0),O=c(61),p=c(317),h=c(938),m=c(19),x=c(305),f=c(79),v=c(228),g=c(2);function w(){var e=o.a.TextArea,t=Object(u.useState)([]),c=Object(i.a)(t,2),n=c[0],w=c[1],N=Object(u.useState)(!1),y=Object(i.a)(N,2),k=y[0],z=y[1],L=Object(u.useState)(!1),F=Object(i.a)(L,2),I=F[0],A=F[1],R=Object(O.c)((function(e){return e})),C=R.walletAddress,E=R.creativeStudio,S=R.orbitdb,Y=R.chainId,D=R.collectionInfo,G=R.colError,M=Object(u.useState)([]),U=Object(i.a)(M,2),q=U[0],P=U[1],T=Object(f.h)().standard,B=Object(f.f)(),J=Object(O.b)(),W=l.a.useForm(),H=Object(i.a)(W,1)[0];Object(u.useEffect)((function(){P(D)}),[D]);var K=Object(p.a)({accept:"image/*",onDrop:function(e){e[0].size>2048e3?j.b.error("Logo\u6700\u5927\u4e3a2MB!"):w(e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})})))}}),Q=K.getRootProps,X=K.getInputProps,_=Object(u.useCallback)(Object(r.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w([]),H.resetFields();case 2:case"end":return e.stop()}}),e)}))),[H]);Object(u.useEffect)((function(){"1"===G&&_()}),[G,_]);var V=function(){var e=Object(r.a)(s.a.mark((function e(t){var c,i,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t),z(!0),!(n.length>0)){e.next=13;break}if(!(n[0].size<=2048e3)){e.next=12;break}return(i=new FormData).append("file",n[0]),e.next=8,Object(x.a)(i);case 8:o=e.sent,c="https://gateway.pinata.cloud/ipfs/"+o,e.next=13;break;case 12:j.b.warn("Logo\u6700\u5927\u4e3a2MB");case 13:return console.log(T),e.next=16,J(Object(m.V)(t)).then(function(){var e=Object(r.a)(s.a.mark((function e(n){var r,i,o,l;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.status){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,E.methods.getCollectionsByUser(C).call();case 4:return r=e.sent,i=r[r.length-1],o=Object(a.a)(Object(a.a)({},t),{},{logo:c||"",id:i.id,contractAddress:i.contractAddress,isERC1155:i.isERC1155,creator:i.creator}),q.push(o),"/orbitdb/zdpuAoo1YYEnqQWrj5UezXyhMyTcfFDYo85a7Hw8ce9RKw6p2/dev",e.next=11,Object(v.a)("/orbitdb/zdpuAoo1YYEnqQWrj5UezXyhMyTcfFDYo85a7Hw8ce9RKw6p2/dev",S);case 11:if(!(l=e.sent)){e.next=18;break}return e.next=15,l.set("".concat(C,"_").concat(Y),q);case 15:return e.next=17,l.set("".concat(i.contractAddress,"_").concat(Y),o);case 17:J(Object(m.hb)(q));case 18:B.push("/collection/index/".concat(C));case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e)}));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=Object(r.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H.submit(),A(!0);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsx)(g.Fragment,{children:Object(g.jsx)("div",{className:"create-collection",children:Object(g.jsxs)("div",{children:[Object(g.jsx)(h.a,{visible:k,handleOk:Z,setIsDeploying:z,loading:I}),Object(g.jsxs)("div",{children:[Object(g.jsx)("h2",{className:"create-collection-title",children:"\u521b\u5efa\u4f5c\u54c1\u96c6"}),Object(g.jsxs)("div",{className:"create-collection-upload-image",children:[Object(g.jsx)("div",{className:"create-collection-area-upload",children:Object(g.jsx)("div",{children:Object(g.jsx)("div",{className:"create-collection-dropzone",children:n[0]?Object(g.jsx)("div",{className:"preview",children:Object(g.jsx)("img",{className:"collection-img",src:n[0].preview,alt:"priview",style:{width:"90%",maxWidth:"208px",height:"208px",objectFit:"contain"}})}):Object(g.jsx)("p",{className:"textmode",style:{textAlign:"center"},children:"\u4e0a\u4f20LOGO"})})})}),Object(g.jsxs)("div",{className:"create-collection-upload-desc",children:[Object(g.jsx)("div",{className:"create-collection-upLoad-title",children:"\u4e0a\u4f20LOGO"}),Object(g.jsxs)("div",{children:[Object(g.jsx)("div",{children:"\u652f\u6301JPG, PNG, GIF"}),Object(g.jsx)("div",{children:"*\u63a8\u8350\u5c3a\u5bf8400*400\uff0c\u4e0d\u8d85\u8fc72M"})]}),Object(g.jsxs)("div",Object(a.a)(Object(a.a)({},Q({className:"create-collection-dropzone"})),{},{children:[Object(g.jsx)("input",Object(a.a)({},X())),Object(g.jsx)("div",{className:"create-collection-upLoad-btn",children:"\u4e0a\u4f20"})]}))]})]}),Object(g.jsx)("div",{children:Object(g.jsx)("div",{className:"create-collection-input-area",children:Object(g.jsxs)(l.a,{onFinish:V,form:H,colon:!1,children:[Object(g.jsx)(l.a.Item,{label:Object(g.jsx)("div",{className:"create-collection-input-name",children:"\u4f5c\u54c1\u96c6\u540d\u79f0"}),name:"name",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4f5c\u54c1\u96c6\u540d\u79f0!"}],children:Object(g.jsx)(o.a,{className:"create-collection-input-value",placeholder:"\u8bf7\u8f93\u5165\u4f5c\u54c1\u96c6\u540d\u79f0",size:"large",autoComplete:"off",maxLength:"50"})}),Object(g.jsx)("div",{className:"mt25"}),Object(g.jsx)(l.a.Item,{label:Object(g.jsx)("div",{className:"create-collection-input-name",children:"\u4f5c\u54c1\u96c6\u4ee3\u7801"}),name:"symbol",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u4f5c\u54c1\u96c6\u4ee3\u7801!"}],children:Object(g.jsx)(o.a,{className:"create-collection-input-value",placeholder:"\u8bf7\u8f93\u5165\u4f5c\u54c1\u96c6\u4ee3\u7801",size:"large",autoComplete:"off",maxLength:"50"})}),Object(g.jsx)("div",{className:"mt25"}),Object(g.jsx)(l.a.Item,{className:"description",name:"description",label:Object(g.jsx)("div",{className:"create-collection-input-name mr11",children:"\u7b80\u4ecb"}),children:Object(g.jsx)(e,{className:"create-collection-input-value",autoSize:{minRows:2},placeholder:"\u8bf7\u8f93\u5165\u7b80\u4ecb",size:"large",maxLength:"500"})}),Object(g.jsx)(l.a.Item,{style:{marginTop:"40px"},children:Object(g.jsx)(d.a,{justify:"center",children:Object(g.jsx)(b.a,{className:"btn-create-item",shape:"round",size:"large",onClick:function(){return Z()},children:"\u4fdd\u5b58"})})})]})})})]})]})})})}}}]);
//# sourceMappingURL=12.5c7f2bfc.chunk.js.map