"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[534],{92693:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var o=t(72816),r=t(74918),i=t(96799),l=t(89526),a=t(79255),s=t(70854),c=t.n(s),d=t(46346),p=t(37624),u=t(61370),m=t(42514),g=t(25342),f=t(46044),y=t(42858),v=t(70206),b=t(87669),h=t(25384),x=t(48669),C=t(31384),$=(0,t(55439).I$)("Popconfirm",(e=>(e=>{const{componentCls:n,iconCls:t,antCls:o,zIndexPopup:r,colorText:i,colorWarning:l,marginXXS:a,marginXS:s,fontSize:c,fontWeightStrong:d,colorTextHeading:p}=e;return{[n]:{zIndex:r,[`&${o}-popover`]:{fontSize:c},[`${n}-message`]:{marginBottom:s,display:"flex",flexWrap:"nowrap",alignItems:"start",[`> ${n}-message-icon ${t}`]:{color:l,fontSize:c,lineHeight:1,marginInlineEnd:s},[`${n}-title`]:{fontWeight:d,color:p,"&:only-child":{fontWeight:"normal"}},[`${n}-description`]:{marginTop:a,color:i}},[`${n}-buttons`]:{textAlign:"end",whiteSpace:"nowrap",button:{marginInlineStart:s}}}}})(e)),(e=>{const{zIndexPopupBase:n}=e;return{zIndexPopup:n+60}}),{resetStyle:!1});const E=e=>{const{prefixCls:n,okButtonProps:t,cancelButtonProps:o,title:r,description:s,cancelText:d,okText:p,okType:u="primary",icon:m=l.createElement(a.Z,null),showCancel:f=!0,close:C,onConfirm:$,onCancel:E,onPopupClick:S}=e,{getPrefixCls:I}=l.useContext(g.E_),[O]=(0,h.Z)("Popconfirm",x.Z.Popconfirm),w=(0,v.Z)(r),j=(0,v.Z)(s);return l.createElement("div",{className:`${n}-inner-content`,onClick:S},l.createElement("div",{className:`${n}-message`},m&&l.createElement("span",{className:`${n}-message-icon`},m),l.createElement("div",{className:`${n}-message-text`},w&&l.createElement("div",{className:c()(`${n}-title`)},w),j&&l.createElement("div",{className:`${n}-description`},j))),l.createElement("div",{className:`${n}-buttons`},f&&l.createElement(i.ZP,Object.assign({onClick:E,size:"small"},o),d||(null==O?void 0:O.cancelText)),l.createElement(y.Z,{buttonProps:Object.assign(Object.assign({size:"small"},(0,b.nx)(u)),t),actionFn:$,close:C,prefixCls:I("btn"),quitOnNullishReturnValue:!0,emitEvent:!0},p||(null==O?void 0:O.okText))))};const S=l.forwardRef(((e,n)=>{var t,o;const{prefixCls:r,placement:i="top",trigger:s="click",okType:y="primary",icon:v=l.createElement(a.Z,null),children:b,overlayClassName:h,onOpenChange:x,onVisibleChange:C}=e,S=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t}(e,["prefixCls","placement","trigger","okType","icon","children","overlayClassName","onOpenChange","onVisibleChange"]),{getPrefixCls:I}=l.useContext(g.E_),[O,w]=(0,d.Z)(!1,{value:null!==(t=e.open)&&void 0!==t?t:e.visible,defaultValue:null!==(o=e.defaultOpen)&&void 0!==o?o:e.defaultVisible}),j=(e,n)=>{w(e,!0),null==C||C(e),null==x||x(e,n)},P=I("popconfirm",r),Z=c()(P,h),[k]=$(P);return k(l.createElement(f.Z,Object.assign({},(0,u.Z)(S,["title"]),{trigger:s,placement:i,onOpenChange:n=>{const{disabled:t=!1}=e;t||j(n)},open:O,ref:n,overlayClassName:Z,content:l.createElement(E,Object.assign({okType:y,icon:v},e,{prefixCls:P,close:e=>{j(!1,e)},onConfirm:n=>{var t;return null===(t=e.onConfirm)||void 0===t?void 0:t.call(void 0,n)},onCancel:n=>{var t;j(!1,n),null===(t=e.onCancel)||void 0===t||t.call(void 0,n)}})),"data-popover-inject":!0}),(0,m.Tm)(b,{onKeyDown:e=>{var n,t;l.isValidElement(b)&&(null===(t=null==b?void 0:(n=b.props).onKeyDown)||void 0===t||t.call(n,e)),(e=>{e.keyCode===p.Z.ESC&&O&&j(!1,e)})(e)}})))}));S._InternalPanelDoNotUseOrYouWillBeFired=e=>{const{prefixCls:n,placement:t,className:o,style:r}=e,i=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t}(e,["prefixCls","placement","className","style"]),{getPrefixCls:a}=l.useContext(g.E_),s=a("popconfirm",n),[d]=$(s);return d(l.createElement(C.ZP,{placement:t,className:c()(s,o),style:r,content:l.createElement(E,Object.assign({prefixCls:s},i))}))};var I=S,O=t(97132),w=t(86430),j=t(58047),P=t(395),Z=t(67557);function k(){const{message:e}=o.Z.useApp(),{data:n,isLoading:t,refetch:l}=(0,P.EY)(),[a]=(0,P.NY)(),s=[{title:"部门名称",dataIndex:"deptName"},{title:"描述",dataIndex:"description"},{title:"操作",key:"action",render:n=>(0,Z.jsxs)(r.Z,{children:[(0,Z.jsx)(i.ZP,{type:"primary",ghost:!0,size:"small",children:"编辑"}),(0,Z.jsx)(i.ZP,{type:"primary",size:"small",children:"新增下级"}),(0,Z.jsx)(I,{title:"提示",description:"您确定要删除此部门吗?",onConfirm:()=>{return t=n.id,void a({id:t}).unwrap().then((()=>{e.success("删除成功！")}));var t},okText:"确定",cancelText:"取消",children:(0,Z.jsx)(i.ZP,{type:"primary",danger:!0,size:"small",children:"删除"})})]}),width:100,fixed:"right"}];return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(O.Z,{message:"此页面用redux管理数据，主要用来演示和体验RTK查询的功能",type:"info",showIcon:!0,closable:!0}),(0,Z.jsx)(w.Z,{rowKey:"id",columns:s,dataSource:n,headerTitle:"部门列表",loading:t,search:!1,onRefresh:l,toolBarRender:[(0,Z.jsx)(i.ZP,{type:"primary",icon:(0,Z.jsx)(j.Z,{}),onClick:()=>e.warning("演示功能"),children:"新增"},"add"),(0,Z.jsx)(i.ZP,{onClick:()=>e.warning("演示功能"),children:"导出"},"export")],batchBarRender:[(0,Z.jsx)(i.ZP,{type:"primary",danger:!0,onClick:()=>e.warning("演示功能"),children:"批量删除"},"del"),(0,Z.jsx)(i.ZP,{onClick:()=>e.warning("演示功能"),children:"导出数据"},"export")]})]})}},395:function(e,n,t){t.d(n,{EY:function(){return i},NY:function(){return c},uD:function(){return l}});var o=t(48844);const r=o.Z.injectEndpoints({endpoints:e=>({getDeptAll:e.query({query:()=>"/api/dept/list",providesTags:["deptList"]}),getDeptSelect:e.query({query:()=>"/api/dept/select",providesTags:["DeptSelect"]}),addDeptItem:e.mutation({query:e=>({url:"/api/dept/add",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"]}),updateDeptItem:e.mutation({query:e=>({url:"/api/dept/update",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"]}),deleteDeptItem:e.mutation({query:e=>({url:"/api/dept/delete",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"],async onQueryStarted({id:e},{dispatch:n,queryFulfilled:t}){const r=n(o.Z.util.updateQueryData("getDeptAll",void 0,(n=>n.filter((n=>n.id!==e)))));try{await t}catch{r.undo()}}})})}),{useGetDeptAllQuery:i,useGetDeptSelectQuery:l,useAddDeptItemMutation:a,useUpdateDeptItemMutation:s,useDeleteDeptItemMutation:c}=r},97132:function(e,n,t){t.d(n,{Z:function(){return z}});var o=t(89526),r=t(4797),i=t(23835),l=t(17431),a=t(79255),s=t(39673),c=t(70854),d=t.n(c),p=t(20553),u=t(8786),m=t(42514),g=t(25342),f=t(13806),y=t(11351),v=t(55439);const b=(e,n,t,o,r)=>({background:e,border:`${(0,f.bf)(o.lineWidth)} ${o.lineType} ${n}`,[`${r}-icon`]:{color:t}}),h=e=>{const{componentCls:n,motionDurationSlow:t,marginXS:o,marginSM:r,fontSize:i,fontSizeLG:l,lineHeight:a,borderRadiusLG:s,motionEaseInOutCirc:c,withDescriptionIconSize:d,colorText:p,colorTextHeading:u,withDescriptionPadding:m,defaultPadding:g}=e;return{[n]:Object.assign(Object.assign({},(0,y.Wf)(e)),{position:"relative",display:"flex",alignItems:"center",padding:g,wordWrap:"break-word",borderRadius:s,[`&${n}-rtl`]:{direction:"rtl"},[`${n}-content`]:{flex:1,minWidth:0},[`${n}-icon`]:{marginInlineEnd:o,lineHeight:0},"&-description":{display:"none",fontSize:i,lineHeight:a},"&-message":{color:u},[`&${n}-motion-leave`]:{overflow:"hidden",opacity:1,transition:`max-height ${t} ${c}, opacity ${t} ${c},\n        padding-top ${t} ${c}, padding-bottom ${t} ${c},\n        margin-bottom ${t} ${c}`},[`&${n}-motion-leave-active`]:{maxHeight:0,marginBottom:"0 !important",paddingTop:0,paddingBottom:0,opacity:0}}),[`${n}-with-description`]:{alignItems:"flex-start",padding:m,[`${n}-icon`]:{marginInlineEnd:r,fontSize:d,lineHeight:0},[`${n}-message`]:{display:"block",marginBottom:o,color:u,fontSize:l},[`${n}-description`]:{display:"block",color:p}},[`${n}-banner`]:{marginBottom:0,border:"0 !important",borderRadius:0}}},x=e=>{const{componentCls:n,colorSuccess:t,colorSuccessBorder:o,colorSuccessBg:r,colorWarning:i,colorWarningBorder:l,colorWarningBg:a,colorError:s,colorErrorBorder:c,colorErrorBg:d,colorInfo:p,colorInfoBorder:u,colorInfoBg:m}=e;return{[n]:{"&-success":b(r,o,t,e,n),"&-info":b(m,u,p,e,n),"&-warning":b(a,l,i,e,n),"&-error":Object.assign(Object.assign({},b(d,c,s,e,n)),{[`${n}-description > pre`]:{margin:0,padding:0}})}}},C=e=>{const{componentCls:n,iconCls:t,motionDurationMid:o,marginXS:r,fontSizeIcon:i,colorIcon:l,colorIconHover:a}=e;return{[n]:{"&-action":{marginInlineStart:r},[`${n}-close-icon`]:{marginInlineStart:r,padding:0,overflow:"hidden",fontSize:i,lineHeight:(0,f.bf)(i),backgroundColor:"transparent",border:"none",outline:"none",cursor:"pointer",[`${t}-close`]:{color:l,transition:`color ${o}`,"&:hover":{color:a}}},"&-close-text":{color:l,transition:`color ${o}`,"&:hover":{color:a}}}}};var $=(0,v.I$)("Alert",(e=>[h(e),x(e),C(e)]),(e=>({withDescriptionIconSize:e.fontSizeHeading3,defaultPadding:`${e.paddingContentVerticalSM}px 12px`,withDescriptionPadding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`}))),E=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]])}return t};const S={success:r.Z,info:s.Z,error:i.Z,warning:a.Z},I=e=>{const{icon:n,prefixCls:t,type:r}=e,i=S[r]||null;return n?(0,m.wm)(n,o.createElement("span",{className:`${t}-icon`},n),(()=>({className:d()(`${t}-icon`,{[n.props.className]:n.props.className})}))):o.createElement(i,{className:`${t}-icon`})},O=e=>{const{isClosable:n,prefixCls:t,closeIcon:r,handleClose:i,ariaProps:a}=e,s=!0===r||void 0===r?o.createElement(l.Z,null):r;return n?o.createElement("button",Object.assign({type:"button",onClick:i,className:`${t}-close-icon`,tabIndex:0},a),s):null};var w=e=>{const{description:n,prefixCls:t,message:r,banner:i,className:l,rootClassName:a,style:s,onMouseEnter:c,onMouseLeave:m,onClick:f,afterClose:y,showIcon:v,closable:b,closeText:h,closeIcon:x,action:C}=e,S=E(e,["description","prefixCls","message","banner","className","rootClassName","style","onMouseEnter","onMouseLeave","onClick","afterClose","showIcon","closable","closeText","closeIcon","action"]),[w,j]=o.useState(!1),P=o.useRef(null),{getPrefixCls:Z,direction:k,alert:N}=o.useContext(g.E_),T=Z("alert",t),[D,z,B]=$(T),M=n=>{var t;j(!0),null===(t=e.onClose)||void 0===t||t.call(e,n)},H=o.useMemo((()=>void 0!==e.type?e.type:i?"warning":"info"),[e.type,i]),L=o.useMemo((()=>!("object"!=typeof b||!b.closeIcon)||!!h||("boolean"==typeof b?b:!1!==x&&null!=x||!!(null==N?void 0:N.closable))),[h,x,b,null==N?void 0:N.closable]),W=!(!i||void 0!==v)||v,R=d()(T,`${T}-${H}`,{[`${T}-with-description`]:!!n,[`${T}-no-icon`]:!W,[`${T}-banner`]:!!i,[`${T}-rtl`]:"rtl"===k},null==N?void 0:N.className,l,a,B,z),q=(0,u.Z)(S,{aria:!0,data:!0}),_=o.useMemo((()=>{var e,n;return"object"==typeof b&&b.closeIcon?b.closeIcon:h||(void 0!==x?x:"object"==typeof(null==N?void 0:N.closable)&&(null===(e=null==N?void 0:N.closable)||void 0===e?void 0:e.closeIcon)?null===(n=null==N?void 0:N.closable)||void 0===n?void 0:n.closeIcon:null==N?void 0:N.closeIcon)}),[x,b,h,null==N?void 0:N.closeIcon]),A=o.useMemo((()=>{const e=null!=b?b:null==N?void 0:N.closable;if("object"==typeof e){const{closeIcon:n}=e;return E(e,["closeIcon"])}return{}}),[b,null==N?void 0:N.closable]);return D(o.createElement(p.ZP,{visible:!w,motionName:`${T}-motion`,motionAppear:!1,motionEnter:!1,onLeaveStart:e=>({maxHeight:e.offsetHeight}),onLeaveEnd:y},(t=>{let{className:i,style:l}=t;return o.createElement("div",Object.assign({ref:P,"data-show":!w,className:d()(R,i),style:Object.assign(Object.assign(Object.assign({},null==N?void 0:N.style),s),l),onMouseEnter:c,onMouseLeave:m,onClick:f,role:"alert"},q),W?o.createElement(I,{description:n,icon:e.icon,prefixCls:T,type:H}):null,o.createElement("div",{className:`${T}-content`},r?o.createElement("div",{className:`${T}-message`},r):null,n?o.createElement("div",{className:`${T}-description`},n):null),C?o.createElement("div",{className:`${T}-action`},C):null,o.createElement(O,{isClosable:L,prefixCls:T,closeIcon:_,handleClose:M,ariaProps:A}))})))},j=t(83493),P=t(28141),Z=t(2885),k=t(75016);let N=function(e){function n(){var e;return(0,j.Z)(this,n),(e=(0,Z.Z)(this,n,arguments)).state={error:void 0,info:{componentStack:""}},e}return(0,k.Z)(n,e),(0,P.Z)(n,[{key:"componentDidCatch",value:function(e,n){this.setState({error:e,info:n})}},{key:"render",value:function(){const{message:e,description:n,children:t}=this.props,{error:r,info:i}=this.state,l=i&&i.componentStack?i.componentStack:null,a=void 0===e?(r||"").toString():e,s=void 0===n?l:n;return r?o.createElement(w,{type:"error",message:a,description:o.createElement("pre",{style:{fontSize:"0.9em",overflowX:"auto"}},s)}):t}}]),n}(o.Component);var T=N;const D=w;D.ErrorBoundary=T;var z=D}}]);
//# sourceMappingURL=534.2455490e.chunk.js.map