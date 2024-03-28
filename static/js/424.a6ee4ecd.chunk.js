"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[424],{33227:function(e,t,o){o.r(t),o.d(t,{default:function(){return m}});var r=o(16509),l=o(49367),n=o(74918),a=o(96799),i=o(31314),c=o(83277),s=o(83716),d=o(86430),u=o(58047),p=o(53736),g=o(395),b=o(67557);function m(){const{data:e}=(0,g.uD)(),t=(0,c.s0)(),o=[{title:"真实姓名",dataIndex:"name"},{title:"账号",dataIndex:"account"},{title:"性别",dataIndex:"gender",render:e=>{const t=p.zH.map[e],o={color:t?.color||"rgba(0,0,0,.25)",label:t?.label||"未知"};return(0,b.jsx)(r.Z,{color:o.color,children:o.label})},type:"select",options:p.zH.options},{title:"手机号",dataIndex:"phone"},{title:"邮箱",dataIndex:"email"},{title:"状态",dataIndex:"status",render:e=>(0,b.jsx)(l.Z,{checked:1===e}),type:"select",options:[{label:"启用",value:1},{label:"禁用",value:0}]},{title:"部门",dataIndex:"deptId",type:"treeSelect",options:e,render:(e,t)=>t.deptName},{title:"操作",key:"action",render:e=>(0,b.jsxs)(n.Z,{children:[(0,b.jsx)(a.ZP,{type:"primary",size:"small",onClick:()=>t("/permis/account/detail"),children:"详情"}),(0,b.jsx)(a.ZP,{type:"primary",ghost:!0,size:"small",children:"编辑"}),(0,b.jsx)(a.ZP,{type:"primary",size:"small",style:{background:"#e6a23c"},children:"授权"}),(0,b.jsx)(a.ZP,{type:"primary",danger:!0,size:"small",children:"删除"})]}),width:100,fixed:"right",hideInSearch:!0}];return(0,b.jsx)(d.Z,{columns:o,rowKey:"id",headerTitle:"用户列表",request:(e,{current:t,pageSize:o})=>s.Z.post("/api/account/page",{params:e,pageIndex:t,pageSize:o}).then((e=>{const{result:t}=e;return{list:t.records,total:t.total}})),batchBarRender:[(0,b.jsx)(a.ZP,{type:"primary",danger:!0,onClick:()=>i.ZP.warning("演示功能"),children:"批量删除"},"del"),(0,b.jsx)(a.ZP,{onClick:()=>i.ZP.warning("演示功能"),children:"导出数据"},"export")],toolBarRender:[(0,b.jsx)(a.ZP,{type:"primary",icon:(0,b.jsx)(u.Z,{}),onClick:()=>i.ZP.warning("演示功能"),children:"新增"},"add"),(0,b.jsx)(a.ZP,{onClick:()=>i.ZP.warning("演示功能"),children:"导出"},"export")]})}},395:function(e,t,o){o.d(t,{EY:function(){return n},NY:function(){return s},uD:function(){return a}});var r=o(48844);const l=r.Z.injectEndpoints({endpoints:e=>({getDeptAll:e.query({query:()=>"/api/dept/list",providesTags:["deptList"]}),getDeptSelect:e.query({query:()=>"/api/dept/select",providesTags:["DeptSelect"]}),addDeptItem:e.mutation({query:e=>({url:"/api/dept/add",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"]}),updateDeptItem:e.mutation({query:e=>({url:"/api/dept/update",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"]}),deleteDeptItem:e.mutation({query:e=>({url:"/api/dept/delete",method:"POST",body:e}),invalidatesTags:["deptList","DeptSelect"],async onQueryStarted({id:e},{dispatch:t,queryFulfilled:o}){const l=t(r.Z.util.updateQueryData("getDeptAll",void 0,(t=>t.filter((t=>t.id!==e)))));try{await o}catch{l.undo()}}})})}),{useGetDeptAllQuery:n,useGetDeptSelectQuery:a,useAddDeptItemMutation:i,useUpdateDeptItemMutation:c,useDeleteDeptItemMutation:s}=l},53736:function(e,t,o){o.d(t,{AH:function(){return l},zH:function(){return n}});const r=function(e){return{enum:Object.fromEntries(e.map((({alias:e,value:t})=>[e,t]))),options:e.map((({label:e,value:t})=>({label:e,value:t}))),map:Object.fromEntries(e.map((e=>[e.value,e])))}},l=r([{label:"菜单",value:"1",alias:"menu",color:"#87d068"},{label:"目录",value:"2",alias:"folder",color:"#108ee9"}]),n=r([{label:"男",value:"1",alias:"male",color:"#00b9ff"},{label:"女",value:"2",alias:"woman",color:"#f179b4"}])},16509:function(e,t,o){o.d(t,{Z:function(){return O}});var r=o(89526),l=o(17431),n=o(70854),a=o.n(n),i=o(50159),c=o(73591),s=o(89651),d=o(25342),u=o(13806),p=o(13728),g=o(11351),b=o(94237),m=o(55439);const y=e=>{const{lineWidth:t,fontSizeIcon:o,calc:r}=e,l=e.fontSizeSM;return(0,b.TS)(e,{tagFontSize:l,tagLineHeight:(0,u.bf)(r(e.lineHeightSM).mul(l).equal()),tagIconSize:r(o).sub(r(t).mul(2)).equal(),tagPaddingHorizontal:8,tagBorderlessBg:e.defaultBg})},f=e=>({defaultBg:new p.C(e.colorFillQuaternary).onBackground(e.colorBgContainer).toHexString(),defaultColor:e.colorText});var h=(0,m.I$)("Tag",(e=>(e=>{const{paddingXXS:t,lineWidth:o,tagPaddingHorizontal:r,componentCls:l,calc:n}=e,a=n(r).sub(o).equal(),i=n(t).sub(o).equal();return{[l]:Object.assign(Object.assign({},(0,g.Wf)(e)),{display:"inline-block",height:"auto",marginInlineEnd:e.marginXS,paddingInline:a,fontSize:e.tagFontSize,lineHeight:e.tagLineHeight,whiteSpace:"nowrap",background:e.defaultBg,border:`${(0,u.bf)(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusSM,opacity:1,transition:`all ${e.motionDurationMid}`,textAlign:"start",position:"relative",[`&${l}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:e.defaultColor},[`${l}-close-icon`]:{marginInlineStart:i,fontSize:e.tagIconSize,color:e.colorTextDescription,cursor:"pointer",transition:`all ${e.motionDurationMid}`,"&:hover":{color:e.colorTextHeading}},[`&${l}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${e.iconCls}-close, ${e.iconCls}-close:hover`]:{color:e.colorTextLightSolid}},"&-checkable":{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${l}-checkable-checked):hover`]:{color:e.colorPrimary,backgroundColor:e.colorFillSecondary},"&:active, &-checked":{color:e.colorTextLightSolid},"&-checked":{backgroundColor:e.colorPrimary,"&:hover":{backgroundColor:e.colorPrimaryHover}},"&:active":{backgroundColor:e.colorPrimaryActive}},"&-hidden":{display:"none"},[`> ${e.iconCls} + span, > span + ${e.iconCls}`]:{marginInlineStart:a}}),[`${l}-borderless`]:{borderColor:"transparent",background:e.tagBorderlessBg}}})(y(e))),f);const C=r.forwardRef(((e,t)=>{const{prefixCls:o,style:l,className:n,checked:i,onChange:c,onClick:s}=e,u=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(r=Object.getOwnPropertySymbols(e);l<r.length;l++)t.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(o[r[l]]=e[r[l]])}return o}(e,["prefixCls","style","className","checked","onChange","onClick"]),{getPrefixCls:p,tag:g}=r.useContext(d.E_),b=p("tag",o),[m,y,f]=h(b),C=a()(b,`${b}-checkable`,{[`${b}-checkable-checked`]:i},null==g?void 0:g.className,n,y,f);return m(r.createElement("span",Object.assign({},u,{ref:t,style:Object.assign(Object.assign({},l),null==g?void 0:g.style),className:C,onClick:e=>{null==c||c(!i),null==s||s(e)}})))}));var v=C,k=o(7606),x=(0,m.bk)(["Tag","preset"],(e=>(e=>(0,k.Z)(e,((t,o)=>{let{textColor:r,lightBorderColor:l,lightColor:n,darkColor:a}=o;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:r,background:n,borderColor:l,"&-inverse":{color:e.colorTextLightSolid,background:a,borderColor:a},[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}})))(y(e))),f);const S=(e,t,o)=>{const r="string"!=typeof(l=o)?l:l.charAt(0).toUpperCase()+l.slice(1);var l;return{[`${e.componentCls}${e.componentCls}-${t}`]:{color:e[`color${o}`],background:e[`color${r}Bg`],borderColor:e[`color${r}Border`],[`&${e.componentCls}-borderless`]:{borderColor:"transparent"}}}};var $=(0,m.bk)(["Tag","status"],(e=>{const t=y(e);return[S(t,"success","Success"),S(t,"processing","Info"),S(t,"error","Error"),S(t,"warning","Warning")]}),f);const I=(e,t)=>{const{prefixCls:o,className:n,rootClassName:u,style:p,children:g,icon:b,color:m,onClose:y,closeIcon:f,closable:C,bordered:v=!0}=e,k=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var l=0;for(r=Object.getOwnPropertySymbols(e);l<r.length;l++)t.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(o[r[l]]=e[r[l]])}return o}(e,["prefixCls","className","rootClassName","style","children","icon","color","onClose","closeIcon","closable","bordered"]),{getPrefixCls:S,direction:I,tag:j}=r.useContext(d.E_),[O,P]=r.useState(!0);r.useEffect((()=>{"visible"in k&&P(k.visible)}),[k.visible]);const Z=(0,i.o2)(m),w=(0,i.yT)(m),T=Z||w,D=Object.assign(Object.assign({backgroundColor:m&&!T?m:void 0},null==j?void 0:j.style),p),E=S("tag",o),[z,B,N]=h(E),q=a()(E,null==j?void 0:j.className,{[`${E}-${m}`]:T,[`${E}-has-color`]:m&&!T,[`${E}-hidden`]:!O,[`${E}-rtl`]:"rtl"===I,[`${E}-borderless`]:!v},n,u,B,N),H=e=>{e.stopPropagation(),null==y||y(e),e.defaultPrevented||P(!1)},[,L]=(0,c.Z)({closable:C,closeIcon:null!=f?f:null==j?void 0:j.closeIcon,customCloseIconRender:e=>null===e?r.createElement(l.Z,{className:`${E}-close-icon`,onClick:H}):r.createElement("span",{className:`${E}-close-icon`,onClick:H},e),defaultCloseIcon:null,defaultClosable:!1}),A="function"==typeof k.onClick||g&&"a"===g.type,M=b||null,R=M?r.createElement(r.Fragment,null,M,g&&r.createElement("span",null,g)):g,F=r.createElement("span",Object.assign({},k,{ref:t,className:q,style:D}),R,L,Z&&r.createElement(x,{key:"preset",prefixCls:E}),w&&r.createElement($,{key:"status",prefixCls:E}));return z(A?r.createElement(s.Z,{component:"Tag"},F):F)},j=r.forwardRef(I);j.CheckableTag=v;var O=j}}]);
//# sourceMappingURL=424.a6ee4ecd.chunk.js.map