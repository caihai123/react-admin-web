(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[322],{55988:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(54374),o=n(24059),i=n(53725),a=n(67557);const{Option:l}=r.default;function s(e){const{token:{colorPrimary:t}}=o.Z.useToken();return(0,a.jsxs)(r.default,{...e,children:[(0,a.jsx)(l,{value:0,children:(0,a.jsx)(i.Z,{status:"default",text:"不指定"})}),(0,a.jsx)(l,{value:1,children:(0,a.jsx)(i.Z,{status:"error",text:"严重"})}),(0,a.jsx)(l,{value:2,children:(0,a.jsx)(i.Z,{color:t,text:"主要"})}),(0,a.jsx)(l,{value:3,children:(0,a.jsx)(i.Z,{status:"warning",text:"次要"})}),(0,a.jsx)(l,{value:4,children:(0,a.jsx)(i.Z,{status:"success",text:"不重要"})})]})}},73818:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(54374),o=n(53725),i=n(67557);const{Option:a}=r.default;function l(e){return(0,i.jsxs)(r.default,{...e,children:[(0,i.jsx)(a,{value:1,children:(0,i.jsx)(o.Z,{status:"error",text:"缺陷"})}),(0,i.jsx)(a,{value:2,children:(0,i.jsx)(o.Z,{status:"success",text:"需求"})})]})}},85322:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return oe}});var r=n(16509),o=n(68175),i=n(74918),a=n(54374),l=n(31363),s=n(96799),c=n(47705),d=n(70854),m=n.n(d),u=n(89526),g=n(64899),p=n(52167),f=n(25342),h=n(91688),$=n(1308),b=n(26401),x=n(18740),y=n(75452),v=n(42514),C=n(78944);const S=u.createContext({});S.Consumer;var j=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};const k=(e,t)=>{var{prefixCls:n,children:r,actions:o,extra:i,className:a,colStyle:l}=e,s=j(e,["prefixCls","children","actions","extra","className","colStyle"]);const{grid:c,itemLayout:d}=(0,u.useContext)(S),{getPrefixCls:g}=(0,u.useContext)(f.E_),p=g("list",n),h=o&&o.length>0&&u.createElement("ul",{className:`${p}-item-action`,key:"actions"},o.map(((e,t)=>u.createElement("li",{key:`${p}-item-action-${t}`},e,t!==o.length-1&&u.createElement("em",{className:`${p}-item-action-split`}))))),$=c?"div":"li",b=u.createElement($,Object.assign({},s,c?{}:{ref:t},{className:m()(`${p}-item`,{[`${p}-item-no-flex`]:!("vertical"===d?i:!(()=>{let e;return u.Children.forEach(r,(t=>{"string"==typeof t&&(e=!0)})),e&&u.Children.count(r)>1})())},a)}),"vertical"===d&&i?[u.createElement("div",{className:`${p}-item-main`,key:"content"},r,h),u.createElement("div",{className:`${p}-item-extra`,key:"extra"},i)]:[r,h,(0,v.Tm)(i,{key:"extra"})]);return c?u.createElement(C.Z,{ref:t,flex:1,style:l},b):b},E=(0,u.forwardRef)(k);E.Meta=e=>{var{prefixCls:t,className:n,avatar:r,title:o,description:i}=e,a=j(e,["prefixCls","className","avatar","title","description"]);const{getPrefixCls:l}=(0,u.useContext)(f.E_),s=l("list",t),c=m()(`${s}-item-meta`,n),d=u.createElement("div",{className:`${s}-item-meta-content`},o&&u.createElement("h4",{className:`${s}-item-meta-title`},o),i&&u.createElement("div",{className:`${s}-item-meta-description`},i));return u.createElement("div",Object.assign({},a,{className:c}),r&&u.createElement("div",{className:`${s}-item-meta-avatar`},r),(o||i)&&d)};var O=E,Z=n(13806),w=n(11351),I=n(55439),P=n(94237);const B=e=>{const{listBorderedCls:t,componentCls:n,paddingLG:r,margin:o,itemPaddingSM:i,itemPaddingLG:a,marginLG:l,borderRadiusLG:s}=e;return{[`${t}`]:{border:`${(0,Z.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:s,[`${n}-header,${n}-footer,${n}-item`]:{paddingInline:r},[`${n}-pagination`]:{margin:`${(0,Z.bf)(o)} ${(0,Z.bf)(l)}`}},[`${t}${n}-sm`]:{[`${n}-item,${n}-header,${n}-footer`]:{padding:i}},[`${t}${n}-lg`]:{[`${n}-item,${n}-header,${n}-footer`]:{padding:a}}}},z=e=>{const{componentCls:t,screenSM:n,screenMD:r,marginLG:o,marginSM:i,margin:a}=e;return{[`@media screen and (max-width:${r}px)`]:{[`${t}`]:{[`${t}-item`]:{[`${t}-item-action`]:{marginInlineStart:o}}},[`${t}-vertical`]:{[`${t}-item`]:{[`${t}-item-extra`]:{marginInlineStart:o}}}},[`@media screen and (max-width: ${n}px)`]:{[`${t}`]:{[`${t}-item`]:{flexWrap:"wrap",[`${t}-action`]:{marginInlineStart:i}}},[`${t}-vertical`]:{[`${t}-item`]:{flexWrap:"wrap-reverse",[`${t}-item-main`]:{minWidth:e.contentWidth},[`${t}-item-extra`]:{margin:`auto auto ${(0,Z.bf)(a)}`}}}}}},N=e=>{const{componentCls:t,antCls:n,controlHeight:r,minHeight:o,paddingSM:i,marginLG:a,padding:l,itemPadding:s,colorPrimary:c,itemPaddingSM:d,itemPaddingLG:m,paddingXS:u,margin:g,colorText:p,colorTextDescription:f,motionDurationSlow:h,lineWidth:$,headerBg:b,footerBg:x,emptyTextPadding:y,metaMarginBottom:v,avatarMarginRight:C,titleMarginBottom:S,descriptionFontSize:j}=e,k={};return["start","center","end"].forEach((e=>{k[`&-align-${e}`]={textAlign:e}})),{[`${t}`]:Object.assign(Object.assign({},(0,w.Wf)(e)),{position:"relative","*":{outline:"none"},[`${t}-header`]:{background:b},[`${t}-footer`]:{background:x},[`${t}-header, ${t}-footer`]:{paddingBlock:i},[`${t}-pagination`]:Object.assign(Object.assign({marginBlockStart:a},k),{[`${n}-pagination-options`]:{textAlign:"start"}}),[`${t}-spin`]:{minHeight:o,textAlign:"center"},[`${t}-items`]:{margin:0,padding:0,listStyle:"none"},[`${t}-item`]:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:s,color:p,[`${t}-item-meta`]:{display:"flex",flex:1,alignItems:"flex-start",maxWidth:"100%",[`${t}-item-meta-avatar`]:{marginInlineEnd:C},[`${t}-item-meta-content`]:{flex:"1 0",width:0,color:p},[`${t}-item-meta-title`]:{margin:`0 0 ${(0,Z.bf)(e.marginXXS)} 0`,color:p,fontSize:e.fontSize,lineHeight:e.lineHeight,"> a":{color:p,transition:`all ${h}`,"&:hover":{color:c}}},[`${t}-item-meta-description`]:{color:f,fontSize:j,lineHeight:e.lineHeight}},[`${t}-item-action`]:{flex:"0 0 auto",marginInlineStart:e.marginXXL,padding:0,fontSize:0,listStyle:"none","& > li":{position:"relative",display:"inline-block",padding:`0 ${(0,Z.bf)(u)}`,color:f,fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"center","&:first-child":{paddingInlineStart:0}},[`${t}-item-action-split`]:{position:"absolute",insetBlockStart:"50%",insetInlineEnd:0,width:$,height:e.calc(e.fontHeight).sub(e.calc(e.marginXXS).mul(2)).equal(),transform:"translateY(-50%)",backgroundColor:e.colorSplit}}},[`${t}-empty`]:{padding:`${(0,Z.bf)(l)} 0`,color:f,fontSize:e.fontSizeSM,textAlign:"center"},[`${t}-empty-text`]:{padding:y,color:e.colorTextDisabled,fontSize:e.fontSize,textAlign:"center"},[`${t}-item-no-flex`]:{display:"block"}}),[`${t}-grid ${n}-col > ${t}-item`]:{display:"block",maxWidth:"100%",marginBlockEnd:g,paddingBlock:0,borderBlockEnd:"none"},[`${t}-vertical ${t}-item`]:{alignItems:"initial",[`${t}-item-main`]:{display:"block",flex:1},[`${t}-item-extra`]:{marginInlineStart:a},[`${t}-item-meta`]:{marginBlockEnd:v,[`${t}-item-meta-title`]:{marginBlockStart:0,marginBlockEnd:S,color:p,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}},[`${t}-item-action`]:{marginBlockStart:l,marginInlineStart:"auto","> li":{padding:`0 ${(0,Z.bf)(l)}`,"&:first-child":{paddingInlineStart:0}}}},[`${t}-split ${t}-item`]:{borderBlockEnd:`${(0,Z.bf)(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:last-child":{borderBlockEnd:"none"}},[`${t}-split ${t}-header`]:{borderBlockEnd:`${(0,Z.bf)(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${t}-split${t}-empty ${t}-footer`]:{borderTop:`${(0,Z.bf)(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${t}-loading ${t}-spin-nested-loading`]:{minHeight:r},[`${t}-split${t}-something-after-last-item ${n}-spin-container > ${t}-items > ${t}-item:last-child`]:{borderBlockEnd:`${(0,Z.bf)(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${t}-lg ${t}-item`]:{padding:m},[`${t}-sm ${t}-item`]:{padding:d},[`${t}:not(${t}-vertical)`]:{[`${t}-item-no-flex`]:{[`${t}-item-action`]:{float:"right"}}}}};var M=(0,I.I$)("List",(e=>{const t=(0,P.TS)(e,{listBorderedCls:`${e.componentCls}-bordered`,minHeight:e.controlHeightLG});return[N(t),B(t),z(t)]}),(e=>({contentWidth:220,itemPadding:`${(0,Z.bf)(e.paddingContentVertical)} 0`,itemPaddingSM:`${(0,Z.bf)(e.paddingContentVerticalSM)} ${(0,Z.bf)(e.paddingContentHorizontal)}`,itemPaddingLG:`${(0,Z.bf)(e.paddingContentVerticalLG)} ${(0,Z.bf)(e.paddingContentHorizontalLG)}`,headerBg:"transparent",footerBg:"transparent",emptyTextPadding:e.padding,metaMarginBottom:e.padding,avatarMarginRight:e.padding,titleMarginBottom:e.paddingSM,descriptionFontSize:e.fontSize}))),T=n(22847);function H(e){var t,{pagination:n=!1,prefixCls:r,bordered:o=!1,split:i=!0,className:a,rootClassName:l,style:s,children:d,itemLayout:v,loadMore:C,grid:j,dataSource:k=[],size:E,header:O,footer:Z,loading:w=!1,rowKey:I,renderItem:P,locale:B}=e,z=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["pagination","prefixCls","bordered","split","className","rootClassName","style","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]);const N=n&&"object"==typeof n?n:{},[H,L]=u.useState(N.defaultCurrent||1),[W,G]=u.useState(N.defaultPageSize||10),{getPrefixCls:R,renderEmpty:X,direction:A,list:_}=u.useContext(f.E_),F=e=>(t,r)=>{var o;L(t),G(r),n&&n[e]&&(null===(o=null==n?void 0:n[e])||void 0===o||o.call(n,t,r))},D=F("onChange"),q=F("onShowSizeChange"),V=R("list",r),[K,J,Q]=M(V);let U=w;"boolean"==typeof U&&(U={spinning:U});const Y=U&&U.spinning;let ee="";switch((0,T.Z)(E)){case"large":ee="lg";break;case"small":ee="sm"}const te=m()(V,{[`${V}-vertical`]:"vertical"===v,[`${V}-${ee}`]:ee,[`${V}-split`]:i,[`${V}-bordered`]:o,[`${V}-loading`]:Y,[`${V}-grid`]:!!j,[`${V}-something-after-last-item`]:!!(C||n||Z),[`${V}-rtl`]:"rtl"===A},null==_?void 0:_.className,a,l,J,Q),ne=(0,g.Z)({current:1,total:0},{total:k.length,current:H,pageSize:W},n||{}),re=Math.ceil(ne.total/ne.pageSize);ne.current>re&&(ne.current=re);const oe=n?u.createElement("div",{className:m()(`${V}-pagination`,`${V}-pagination-align-${null!==(t=null==ne?void 0:ne.align)&&void 0!==t?t:"end"}`)},u.createElement(x.Z,Object.assign({},ne,{onChange:D,onShowSizeChange:q}))):null;let ie=(0,c.Z)(k);n&&k.length>(ne.current-1)*ne.pageSize&&(ie=(0,c.Z)(k).splice((ne.current-1)*ne.pageSize,ne.pageSize));const ae=Object.keys(j||{}).some((e=>["xs","sm","md","lg","xl","xxl"].includes(e))),le=(0,b.Z)(ae),se=u.useMemo((()=>{for(let e=0;e<p.c4.length;e+=1){const t=p.c4[e];if(le[t])return t}}),[le]),ce=u.useMemo((()=>{if(!j)return;const e=se&&j[se]?j[se]:j.column;return e?{width:100/e+"%",maxWidth:100/e+"%"}:void 0}),[null==j?void 0:j.column,se]);let de=Y&&u.createElement("div",{style:{minHeight:53}});if(ie.length>0){const e=ie.map(((e,t)=>((e,t)=>{if(!P)return null;let n;return n="function"==typeof I?I(e):I?e[I]:e.key,n||(n=`list-item-${t}`),u.createElement(u.Fragment,{key:n},P(e,t))})(e,t)));de=j?u.createElement($.Z,{gutter:j.gutter},u.Children.map(e,(e=>u.createElement("div",{key:null==e?void 0:e.key,style:ce},e)))):u.createElement("ul",{className:`${V}-items`},e)}else d||Y||(de=u.createElement("div",{className:`${V}-empty-text`},B&&B.emptyText||(null==X?void 0:X("List"))||u.createElement(h.Z,{componentName:"List"})));const me=ne.position||"bottom",ue=u.useMemo((()=>({grid:j,itemLayout:v})),[JSON.stringify(j),v]);return K(u.createElement(S.Provider,{value:ue},u.createElement("div",Object.assign({style:Object.assign(Object.assign({},null==_?void 0:_.style),s),className:te},z),("top"===me||"both"===me)&&oe,O&&u.createElement("div",{className:`${V}-header`},O),u.createElement(y.Z,Object.assign({},U),de,d),Z&&u.createElement("div",{className:`${V}-footer`},Z),C||("bottom"===me||"both"===me)&&oe)))}H.Item=O;var L=H,W=n(49155),G=n(23835),R=n(93635),X=n(4797),A=n(58047),_=n(31439),F=n(54846),D=n(30511),q=n(83277),V=n(18001),K=n(83716),J=n(87322),Q=n.n(J),U=(n(20168),n(55988)),Y=n(73818),ee=n(67557);const te=n(93954);Q().extend(te),Q().locale("zh-cn");const ne=function({status:e}){switch(e){case 0:return(0,ee.jsx)(G.Z,{style:{color:"#909399"}});case 1:return(0,ee.jsx)(R.Z,{style:{color:"#108ee9"}});case 2:return(0,ee.jsx)(X.Z,{style:{color:"#52c41a"}});default:return(0,ee.jsx)("div",{children:"未知状态"})}},re=function({type:e}){switch(e){case 1:return(0,ee.jsx)(r.Z,{color:"error",children:"缺陷"});case 2:return(0,ee.jsx)(r.Z,{color:"processing",children:"需求"});default:return}};function oe(){const e=(0,q.s0)(),{data:t,pagination:n,loading:r}=(0,V.Z)((({current:e,pageSize:t})=>K.Z.post("/api/issues/page",{pageIndex:e,pageSize:t}).then((e=>{const{result:t}=e;return{list:t.records,total:t.total}}))));return(0,ee.jsxs)(o.Z,{children:[(0,ee.jsx)("h1",{children:"Issues 列表"}),(0,ee.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,ee.jsxs)(i.Z,{children:[(0,ee.jsx)(a.default,{defaultValue:"1",options:[{label:"全部",value:"1"},{label:"与我相关",value:"2"},{label:"我负责的",value:"3"},{label:"我创建的",value:"4"},{label:"我协作的",value:"5"}],style:{width:100}}),(0,ee.jsx)(l.Z.Search,{placeholder:"搜索 Issuse",style:{width:500}})]}),(0,ee.jsx)(i.Z,{children:(0,ee.jsx)(s.ZP,{type:"primary",icon:(0,ee.jsx)(A.Z,{}),onClick:()=>e("/issues/add"),children:"新键 Issuse"})})]}),(0,ee.jsx)(L,{header:(0,ee.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,ee.jsxs)(W.ZP.Group,{defaultValue:"1",buttonStyle:"solid",children:[(0,ee.jsx)(W.ZP.Button,{value:"",children:"全部"}),(0,ee.jsx)(W.ZP.Button,{value:"1",children:"开启的"}),(0,ee.jsx)(W.ZP.Button,{value:"2",children:"已完成"}),(0,ee.jsx)(W.ZP.Button,{value:"0",children:"已关闭"})]}),(0,ee.jsxs)("div",{style:{display:"flex"},children:[(0,ee.jsx)(Y.Z,{suffixIcon:(0,ee.jsx)(_.Z,{}),variant:"borderless",placeholder:"标签",popupMatchSelectWidth:!1}),(0,ee.jsx)(U.Z,{suffixIcon:(0,ee.jsx)(_.Z,{}),variant:"borderless",placeholder:"优先级",popupMatchSelectWidth:!1})]})]}),loading:r,itemLayout:"vertical",dataSource:t?.list,renderItem:e=>(0,ee.jsx)(L.Item,{actions:[(0,ee.jsx)(ne,{status:e.status}),(0,ee.jsxs)(i.Z,{children:[(0,ee.jsx)(F.Z,{}),e.user.name]}),(0,ee.jsxs)(i.Z,{children:[(0,ee.jsx)(D.Z,{}),e.commentCount]})],extra:Q()(e.createTime).fromNow(),children:(0,ee.jsx)(L.Item.Meta,{title:(0,ee.jsxs)("div",{children:[(0,ee.jsx)(re,{type:e.type})," ",e.title]}),description:e.describe})}),bordered:!0,pagination:{position:"bottom",align:"center",current:n.current,pageSize:n.pageSize,total:n.total,onChange:n.onChange},style:{marginTop:12}})]})}},16509:function(e,t,n){"use strict";n.d(t,{Z:function(){return O}});var r=n(89526),o=n(17431),i=n(70854),a=n.n(i),l=n(50159),s=n(73591),c=n(89651),d=n(25342),m=n(13806),u=n(13728),g=n(11351),p=n(94237),f=n(55439);const h=e=>{const{lineWidth:t,fontSizeIcon:n,calc:r}=e,o=e.fontSizeSM;return(0,p.TS)(e,{tagFontSize:o,tagLineHeight:(0,m.bf)(r(e.lineHeightSM).mul(o).equal()),tagIconSize:r(n).sub(r(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},$=e=>({defaultBg:new u.C(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText});var b=(0,f.I$)("Tag",(e=>(e=>{const{paddingXXS:t,lineWidth:n,tagPaddingHorizontal:r,componentCls:o,calc:i}=e,a=i(r).sub(n).equal(),l=i(t).sub(n).equal();return{[o]:Object.assign(Object.assign({},(0,g.Wf)(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:a,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${(0,m.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${o}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${o}-close-icon`]:{marginInlineStart:l,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${o}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${o}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:a}}),[`${o}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}})(h(e))),$);const x=r.forwardRef(((e,t)=>{const{prefixCls:n,style:o,className:i,checked:l,onChange:s,onClick:c}=e,m=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:u,tag:g}=r.useContext(d.E_),p=u("tag",n),[f,h,$]=b(p),x=a()(p,`${p}-checkable`,{[`${p}-checkable-checked`]:l},null==g?void 0:g.className,i,h,$);return f(r.createElement("span",Object.assign({},m,{ref:t,style:Object.assign(Object.assign({},o),null==g?void 0:g.style),className:x,onClick:e=>{null==s||s(!l),null==c||c(e)}})))}));var y=x,v=n(7606),C=(0,f.bk)(["Tag","preset"],(e=>(e=>(0,v.Z)(e,((t,n)=>{let{textColor:r,lightBorderColor:o,lightColor:i,darkColor:a}=n;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:r,background:i,borderColor:o,"&-inverse":{color:e.colorTextLightSolid,background:a,borderColor:a},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}})))(h(e))),$);const S=(e,t,n)=>{const r="string"!=typeof(o=n)?o:o.charAt(0).toUpperCase()+o.slice(1);var o;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:e[`color${n}`],background:e[`color${r}Bg`],borderColor:e[`color${r}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}};var j=(0,f.bk)(["Tag","status"],(e=>{const t=h(e);return[S(t,"success","Success"),S(t,"processing","Info"),S(t,"error","Error"),S(t,"warning","Warning")]}),$);const k=(e,t)=>{const{prefixCls:n,className:i,rootClassName:m,style:u,children:g,icon:p,color:f,onClose:h,closeIcon:$,closable:x,bordered:y=!0}=e,v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","closeIcon","closable","bordered"]),{getPrefixCls:S,direction:k,tag:E}=r.useContext(d.E_),[O,Z]=r.useState(!0);r.useEffect((()=>{"visible"in v&&Z(v.visible)}),[v.visible]);const w=(0,l.o2)(f),I=(0,l.yT)(f),P=w||I,B=Object.assign(Object.assign({backgroundColor:f&&!P?f:void 0},null==E?void 0:E.style),u),z=S("tag",n),[N,M,T]=b(z),H=a()(z,null==E?void 0:E.className,{[`${z}-${f}`]:P,[`${z}-has-color`]:f&&!P,[`${z}-hidden`]:!O,[`${z}-rtl`]:"rtl"===k,[`${z}-borderless`]:!y},i,m,M,T),L=e=>{e.stopPropagation(),null==h||h(e),e.defaultPrevented||Z(!1)},[,W]=(0,s.Z)({closable:x,closeIcon:null!=$?$:null==E?void 0:E.closeIcon,customCloseIconRender:e=>null===e?r.createElement(o.Z,{className:`${z}-close-icon`,onClick:L}):r.createElement("span",{className:`${z}-close-icon`,onClick:L},e),defaultCloseIcon:null,defaultClosable:!1}),G="function"==typeof v.onClick||g&&"a"===g.type,R=p||null,X=R?r.createElement(r.Fragment,null,R,g&&r.createElement("span",null,g)):g,A=r.createElement("span",Object.assign({},v,{ref:t,className:H,style:B}),X,W,w&&r.createElement(C,{key:"preset",prefixCls:z}),I&&r.createElement(j,{key:"status",prefixCls:z}));return N(G?r.createElement(c.Z,{component:"Tag"},A):A)},E=r.forwardRef(k);E.CheckableTag=y;var O=E},93954:function(e){e.exports=function(){"use strict";return function(e,t,n){e=e||{};var r=t.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(e,t,n,o){return r.fromToBase(e,t,n,o)}n.en.relativeTime=o,r.fromToBase=function(t,r,i,a,l){for(var s,c,d,m=i.$locale().relativeTime||o,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],g=u.length,p=0;p<g;p+=1){var f=u[p];f.d&&(s=a?n(t).diff(i,f.d,!0):i.diff(t,f.d,!0));var h=(e.rounding||Math.round)(Math.abs(s));if(d=s>0,h<=f.r||!f.r){h<=1&&p>0&&(f=u[p-1]);var $=m[f.l];l&&(h=l(""+h)),c="string"==typeof $?$.replace("%d",h):$(h,r,f.l,d);break}}if(r)return c;var b=d?m.future:m.past;return"function"==typeof b?b(c):b.replace("%s",c)},r.to=function(e,t){return i(e,t,this,!0)},r.from=function(e,t){return i(e,t,this)};var a=function(e){return e.$u?n.utc():n()};r.toNow=function(e){return this.to(a(this),e)},r.fromNow=function(e){return this.from(a(this),e)}}}()}}]);
//# sourceMappingURL=322.66f47292.chunk.js.map