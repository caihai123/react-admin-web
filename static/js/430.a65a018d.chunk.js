"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[430],{86430:function(e,t,n){n.d(t,{Z:function(){return L}});var r=n(89526),l=n(5416),i=n(68175),a=n(74918),s=n(96799),o=n(87806),c=n(31439),d=n(54437),u=n(78589),m=n(67557);const h="188px",p=(0,d.ZP)(l.Z)`
  position: relative;
  overflow-y: hidden;
  padding-top: 16px;
  &:after {
    content: "";
    display: inline-block;
    width: ${h};
    height: 32px;
    vertical-align: top;
    margin-bottom: 16px;
  }
  & .ant-form-item {
    margin-bottom: 16px;
  }
`,x=(0,d.ZP)(l.Z.Item)`
  position: absolute;
  right: -16px;
  bottom: 0;
  z-index: 10;
`;var f=(0,r.forwardRef)((function(e,t){const[n]=l.Z.useForm(),[d,{setTrue:f,setFalse:g}]=(0,u.Z)(!1),{children:y,style:j,className:b,...Z}=e,v=function(){n.resetFields(),n.submit()};return(0,r.useImperativeHandle)(t,(()=>({submit:n.submit,reset:v}))),(0,m.jsx)(i.Z,{styles:{body:{paddingTop:0,paddingBottom:0}},style:j,className:b,children:(0,m.jsxs)(p,{layout:"inline",style:{height:d?"auto":"64px",paddingRight:d?"0":h},form:n,...Z,children:[y,(0,m.jsx)(x,{children:(0,m.jsxs)(a.Z,{children:[(0,m.jsx)(s.ZP,{type:"primary",htmlType:"submit",children:"查询"}),(0,m.jsx)(s.ZP,{onClick:()=>v(),children:"重置"}),d?(0,m.jsxs)(s.ZP,{type:"link",style:{padding:0},onClick:()=>g(),children:["收起",(0,m.jsx)(o.Z,{style:{marginInlineStart:0}})]}):(0,m.jsxs)(s.ZP,{type:"link",style:{padding:0},onClick:()=>f(),children:["展开",(0,m.jsx)(c.Z,{style:{marginInlineStart:0}})]})]})})]})})})),g=n(24059),y=n(64785),j=n(71992),b=n(95810),Z={"tools-bar":"ghwuoi3NE3Ry7s7fNzAi","header-title":"mtRVkLbROTli4p1ohQ5i","tool-right":"gpJXWmO55r2tH9Z_hXa6","toolbar-setting":"whG6r6ufswl2doZWNUEI","toolbar-setting-item":"te8gfQS8fuVGrAEe5Wko","batch-bar":"dDNrcy2mCFFeBtzOHKWq"},v=n(18001),k=n(2652),I=n.n(k),w=n(54169),S=n(64622),P=n(48425),R=n(46044),C=n(59827),T=n(84878),N=function(e){const{children:t,value:n,onChange:l,options:i}=e,a=i.map((e=>e.value)),[o,c]=(0,r.useState)(!1),[d,u]=(0,r.useState)(!0),h=e=>{l(e),c(!!e.length&&e.length<a.length),u(e.length===a.length)};return(0,m.jsx)(R.Z,{arrow:!1,content:(0,m.jsxs)("div",{style:{minWidth:176},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,m.jsx)(C.Z,{indeterminate:o,onChange:e=>{l(e.target.checked?a:[]),c(!1),u(e.target.checked)},checked:d,children:"列展示"}),(0,m.jsx)(s.ZP,{type:"link",style:{height:22,lineHeight:1,padding:0},onClick:()=>h(a),children:"重置"})]}),(0,m.jsx)(T.Z,{style:{margin:"4px 0"}}),(0,m.jsx)(C.Z.Group,{value:n,onChange:e=>h(e),style:{display:"block"},children:i.map((e=>(0,m.jsx)(C.Z,{style:{display:"flex",margin:0},value:e.value,children:e.label},e.value)))})]}),placement:"bottomRight",trigger:"click",children:t})},z=n(31363);function F({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(z.Z,{placeholder:`请输入${e.title}`,...e.fieldProps})})}var A=n(54374),B=n(53725);function O({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(A.default,{placeholder:`请选择${e.title}`,style:{width:183},allowClear:!0,...e.fieldProps,children:e.options.map((e=>(0,m.jsx)(A.default.Option,{value:e.value,children:e.color?(0,m.jsx)(B.Z,{color:e.color,text:e.label}):e.label},e.value)))})})}function K({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(C.Z.Group,{options:e.options,...e.fieldProps})})}var $=n(49155);function q({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)($.ZP.Group,{options:e.options,...e.fieldProps})})}var E=n(81867);function G({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(E.default,{...e.fieldProps})})}const{RangePicker:H}=E.default;function V({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(H,{style:{width:250},...e.fieldProps})})}var W=n(91117);function _({item:e}){return(0,m.jsx)(l.Z.Item,{label:e.title,name:e.dataIndex,...e.formItemProps,children:(0,m.jsx)(W.Z,{placeholder:`请选择${e.title}`,treeData:e.options,style:{width:183},allowClear:!0,...e.fieldProps})})}function D({item:e}){if(e.renderFormItem)return e.renderFormItem();switch(e.type){case"select":return(0,m.jsx)(O,{item:e});case"checkbox":return(0,m.jsx)(K,{item:e});case"radio":return(0,m.jsx)(q,{item:e});case"date":return(0,m.jsx)(G,{item:e});case"dateRange":return(0,m.jsx)(V,{item:e});case"treeSelect":return(0,m.jsx)(_,{item:e});default:return(0,m.jsx)(F,{item:e})}}var M=n(8139);const Q=function(e){return e.key||e.dataIndex},J="large",X=(0,r.forwardRef)((function(e,t){const{dataSource:n,columns:l=[],search:o=!0,toolBarRender:c=null,headerTitle:d,batchBarRender:u=null,tableRowSelection:h={},pagination:p=!0,loading:x,onRefresh:k,onSubmit:I,onReset:R}=e,C=(0,r.useMemo)((()=>Object.fromEntries(l.filter((e=>void 0!==e.initialValue)).map((({dataIndex:e,initialValue:t})=>[e,t])))),[l]),T=(0,r.useMemo)((()=>l.filter((e=>!0!==e.hideInSearch)).map((e=>(0,m.jsx)(D,{item:e},Q(e))))),[l]),z=(0,r.useMemo)((()=>l.filter((e=>!0!==e.hideInTable))),[l]),[F,A]=(0,r.useState)(z.map((e=>Q(e)))),[B,O]=(0,r.useState)(C),K=(0,r.useRef)(null),$=(0,v.Z)((({current:t,pageSize:r})=>!Array.isArray(n)&&e.request?.(B,{current:t,pageSize:r})),{refreshDeps:[B],defaultCurrent:p?.current||1,defaultPageSize:p?.pageSize||10,loadingDelay:0}),q=(0,r.useMemo)((()=>{const e=Array.isArray(n),t={showSizeChanger:!0,showQuickJumper:!0,showTotal:(e,t)=>`第 ${t.join("-")} 条/共 ${e} 条`,style:{marginBottom:-8},...p},{data:r,pagination:l,refresh:i}=$;return{list:e?n:r?.list,pagination:!!p&&(e?t:{current:l.current,pageSize:l.pageSize,total:l.total,onChange:l.onChange,...t}),refresh:t=>{e||(t&&t!==l.current?l.changeCurrent(t):i()),k?.(B)}}}),[n,$,p,B,k]),[E,{setTrue:G,setFalse:H}]=(0,M.ZP)("boolean"==typeof x&&x);(0,r.useEffect)((()=>{const e=Array.isArray(n);("boolean"===x?x:!e&&$.loading)?G():H()}),[n,x,$.loading,G,H]);const[V,W]=(0,r.useState)(J),[_,X]=(0,r.useState)([]);(0,r.useImperativeHandle)(t,(()=>({refresh:q.refresh,search:()=>{const e=K?.current?.submit;e?e():O(null),I?.(B)},reset:()=>{const e=K?.current?.reset;e?e():O(null),R?.(B)},clearSelected:()=>X([])})));const{token:{borderRadius:L,controlItemBgActive:U,colorText:Y}}=g.Z.useToken();return(0,m.jsxs)(m.Fragment,{children:[o&&(0,m.jsx)(f,{ref:K,onFinish:e=>O(e),initialValues:C,children:T}),(0,m.jsxs)(i.Z,{style:{marginTop:o?16:0},styles:{body:{paddingTop:16,paddingBottom:24}},children:[(0,m.jsxs)("div",{className:Z["tools-bar"],style:{display:_.length>0?"none":"",color:Y},children:[(0,m.jsx)("div",{className:Z["header-title"],children:"function"==typeof d?d():d}),(0,m.jsxs)("div",{className:Z["tool-right"],children:[c&&(0,m.jsx)(a.Z,{children:"function"==typeof c?c(B):c}),(0,m.jsxs)("div",{className:Z["toolbar-setting"],children:[(0,m.jsx)("div",{className:Z["toolbar-setting-item"],onClick:()=>q.refresh(),children:(0,m.jsx)(y.Z,{title:"刷新",children:(0,m.jsx)(w.Z,{})})}),(0,m.jsx)(j.Z,{overlayStyle:{width:80},menu:{items:[{key:"large",label:"默认"},{key:"middle",label:"中等"},{key:"small",label:"紧凑"}],selectable:!0,defaultSelectedKeys:[J],onClick:({key:e})=>W(e)},trigger:["click"],children:(0,m.jsx)("div",{className:Z["toolbar-setting-item"],children:(0,m.jsx)(y.Z,{title:"密度",children:(0,m.jsx)(S.Z,{})})})}),(0,m.jsx)(N,{value:F,options:z.map((e=>({label:e.title,value:Q(e)}))),onChange:e=>A(e),children:(0,m.jsx)("div",{className:Z["toolbar-setting-item"],children:(0,m.jsx)(y.Z,{title:"列设置",children:(0,m.jsx)(P.Z,{})})})})]})]})]}),u&&(0,m.jsxs)("div",{className:Z["batch-bar"],style:{display:_.length>0?"":"none",color:Y,backgroundColor:U,borderRadius:L},children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)("span",{children:["已选 ",_.length," 项"]}),(0,m.jsx)(s.ZP,{type:"link",onClick:()=>X([]),children:"取消选择"})]}),(0,m.jsx)(a.Z,{children:"function"==typeof u?u(_):u})]}),(0,m.jsx)("div",{className:Z.main,children:(0,m.jsx)(b.Z,{rowKey:e.rowKey,dataSource:q.list,columns:z.filter((e=>{const t=Q(e);return F.includes(t)})),pagination:q.pagination,loading:E,rowSelection:u?{type:"checkbox",selectedRowKeys:_,onChange:e=>X(e),preserveSelectedRowKeys:!0,...h}:void 0,bordered:!0,size:V,scroll:{x:"max-content"}})})]})]})}));X.propTypes={rowKey:I().string.isRequired,dataSource:I().array,request:I().func,onRefresh:I().func,onSubmit:I().func,onReset:I().func,columns:I().array.isRequired,search:I().bool,loading:I().bool,toolBarRender:I().oneOfType([I().element,I().array,I().func]),headerTitle:I().oneOfType([I().element,I().array,I().func,I().string]),batchBarRender:I().oneOfType([I().element,I().array,I().func]),tableRowSelection:I().object,pagination:I().oneOfType([I().object,I().bool])};var L=X}}]);
//# sourceMappingURL=430.a65a018d.chunk.js.map