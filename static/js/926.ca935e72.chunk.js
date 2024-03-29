"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[926],{66068:function(e,i,t){t.d(i,{Z:function(){return o}});var n=t(49367),s=t(79669),l=t(36940),a=t(67557);function o(){const e=(0,s.I0)(),i=(0,s.v9)(l.Pu);return(0,a.jsx)(n.Z,{checked:"dark"===i,checkedChildren:"🌜",unCheckedChildren:"🌞",onClick:()=>e((0,l.Dc)())})}},24926:function(e,i,t){t.r(i),t.d(i,{default:function(){return V}});var n=t(89526),s=t(63285),l=t(13309),a=t(79669),o=t(88519),c=t(32371),r=t(83277),d=t(11522),h=t(67557);const{Content:p}=s.default;function x(){return(0,h.jsxs)(p,{style:{margin:20},children:[(0,h.jsx)(n.Suspense,{fallback:(0,h.jsx)(d.Z,{}),children:(0,h.jsx)(r.j3,{})}),(0,h.jsx)(c.Z.BackTop,{})]})}var g=t(24059),u=t(31314),m=t(71992),f=t(23214),j=t(78589),y=t(7569),k=t(54437),Z=t(22641),v=t(56397),b=t(70570);function C(){const e=(0,r.SN)(),i=(0,a.v9)(o.S6),t=e.map((e=>{const t=i.find((i=>i.path===e.pathname));return t?{title:t.title,path:t.path}:e.handle?.title?{title:e.handle.title,path:e.pathname}:void 0})).filter(Boolean);return(0,h.jsx)(b.Z,{items:t.map((e=>({title:(0,h.jsx)(v.rU,{to:e.path,children:e.title})})))})}var w=t(19301),z=t(94689),S=t(21606),P=t(3645),N=t(32449),B=t(54846),H=t(48425),I=t(27642),E=t(68205),T=t(66068);const _=(0,k.ZP)(s.default.Header)`
  height: 48px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  z-index: 99;
  padding: 0;
  height: 48;
  lineheight: 1;
  background: ${e=>e.background};
  & .header-actions-item {
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 18px;
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`,F=k.ZP.div`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  font-size: 18px;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;function R(e){const{token:{colorBgContainer:i}}=g.Z.useToken(),t=(0,r.s0)(),[n,{set:s}]=(0,j.Z)(!1),a=()=>s(Z.Z.isFullscreen);return(0,l.Z)((()=>{Z.Z.isEnabled&&Z.Z.on("change",a)})),(0,y.Z)((()=>{Z.Z.off("change",a)})),(0,h.jsxs)(_,{background:i,children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,h.jsx)(F,{as:e.collapsed?w.Z:z.Z,onClick:()=>e.setCollapsed(!e.collapsed)}),(0,h.jsx)("div",{style:{height:36,display:"flex",alignItems:"center"},children:(0,h.jsx)(C,{})})]}),(0,h.jsxs)("div",{style:{display:"flex",paddingRight:16},children:[(0,h.jsx)("div",{className:"header-actions-item",onClick:()=>{Z.Z.isEnabled?Z.Z.toggle():u.ZP.warning("您的浏览器不支持全屏！")},children:n?(0,h.jsx)(S.Z,{}):(0,h.jsx)(P.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(N.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(T.Z,{})}),(0,h.jsx)(m.Z,{menu:{items:[{key:1,label:"个人中心",icon:(0,h.jsx)(B.Z,{})},{key:2,label:"个人设置",icon:(0,h.jsx)(H.Z,{})},{key:4,label:"意见反馈",icon:(0,h.jsx)(I.Z,{}),onClick:()=>t("/issues")},{type:"divider"},{key:3,label:"退出登录",icon:(0,h.jsx)(E.Z,{}),onClick:()=>{localStorage.removeItem("token"),t("/login")}}]},children:(0,h.jsxs)("div",{className:"header-actions-item",children:[(0,h.jsx)(f.C,{src:"https://avatars.githubusercontent.com/u/47770861?v=4",size:"small",style:{marginRight:8}}),(0,h.jsx)("span",{style:{fontSize:14},children:"Cai Hai"})]})})]})]})}var $=t(96804),D=t(96479),U=t(88662),A=t(36940),G=t(324);const K=function(e){return e&&(0,n.createElement)(G[e])},M=function({id:e,type:i,title:t,path:n,children:s,icon:l}){return{key:n||e,label:t,icon:l?K(l):"",children:"2"===i?(s||[]).map((e=>M(e))):void 0}};function O(){const{list:e,status:i}=(0,a.v9)(o.EN),t=(0,r.s0)(),s=(0,r.TH)(),l=(0,n.useMemo)((()=>e.map((e=>M(e)))),[e]),c=(0,a.v9)(A.Pu),{token:{colorBgContainer:d}}=g.Z.useToken();return(0,h.jsx)($.Z,{active:!0,loading:"loading"===i,paragraph:{rows:6},title:!1,style:{padding:20},children:(0,h.jsx)(U.$B,{style:{height:"calc(100% - 64px)"},autoHide:!0,children:(0,h.jsx)(D.Z,{mode:"inline",selectedKeys:[s.pathname],items:l,onClick:({key:e})=>t(e),style:{border:"none",background:d},theme:"dark"===c?"dark":"light"})})})}var W=t(27259);const q=(0,k.ZP)(s.default.Sider)`
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`,J=k.F4`
    0% {
      display: none;
      opacity: 0;
    }

    80% {
      display: none;
      opacity: 0;
    }

    to {
      display: unset;
      opacity: 1;
    }
  `,L=k.ZP.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
  }
  & img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
  & h1 {
    height: 32px;
    margin: 0 0 0 12px;
    font-weight: 600;
    font-size: 18px;
    line-height: 32px;
    vertical-align: middle;
    animation: ${J} 0.3s;
  }
`;function Q(e){const i={width:210,collapsedWidth:64,collapsed:e.collapsed,theme:"light"};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.default.Sider,{...i}),(0,h.jsxs)(q,{...i,children:[(0,h.jsx)(L,{children:(0,h.jsxs)(v.rU,{to:"/",children:[(0,h.jsx)("img",{src:W.Z,alt:"logo"}),(0,h.jsx)("h1",{style:{display:e.collapsed?"none":"block"},children:"React Or Antd"})]})}),(0,h.jsx)(O,{})]})]})}function V(){const[e,i]=(0,n.useState)(!1),t=(0,a.I0)();return(0,l.Z)((()=>t((0,o.rG)()))),(0,h.jsxs)(s.default,{style:{minHeight:"100vh",flexDirection:"row"},children:[(0,h.jsx)(Q,{collapsed:e}),(0,h.jsxs)(s.default,{children:[(0,h.jsx)(R,{collapsed:e,setCollapsed:i}),(0,h.jsx)(x,{})]})]})}},27259:function(e,i,t){i.Z=t.p+"static/image/logo.51586d6b98032197691d127435162092.svg"}}]);
//# sourceMappingURL=926.ca935e72.chunk.js.map