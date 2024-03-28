"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[926],{24926:function(e,i,t){t.r(i),t.d(i,{default:function(){return X}});var n=t(89526),s=t(63285),l=t(13309),a=t(79669),o=t(88519),c=t(32371),d=t(83277),r=t(11522),h=t(67557);const{Content:p}=s.default;function x(){return(0,h.jsxs)(p,{style:{margin:20},children:[(0,h.jsx)(n.Suspense,{fallback:(0,h.jsx)(r.Z,{}),children:(0,h.jsx)(d.j3,{})}),(0,h.jsx)(c.Z.BackTop,{})]})}var g=t(24059),u=t(31314),m=t(49367),j=t(71992),f=t(23214),y=t(78589),k=t(7569),Z=t(54437),v=t(22641),b=t(36940),C=t(56397),w=t(70570);function z(){const e=(0,d.SN)(),i=(0,a.v9)(o.S6),t=e.map((e=>{const t=i.find((i=>i.path===e.pathname));return t?{title:t.title,path:t.path}:e.handle?.title?{title:e.handle.title,path:e.pathname}:void 0})).filter(Boolean);return(0,h.jsx)(w.Z,{items:t.map((e=>({title:(0,h.jsx)(C.rU,{to:e.path,children:e.title})})))})}var S=t(19301),N=t(94689),P=t(15675),B=t(21606),H=t(3645),I=t(32449),E=t(54846),T=t(48425),_=t(27642),F=t(68205);const R=(0,Z.ZP)(s.default.Header)`
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
`,$=Z.ZP.div`
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
`;function D(e){const{token:{colorBgContainer:i}}=g.Z.useToken(),t=(0,d.s0)(),n=(0,a.I0)(),s=(0,a.v9)(b.Pu),[o,{set:c}]=(0,y.Z)(!1),r=()=>c(v.Z.isFullscreen);return(0,l.Z)((()=>{v.Z.isEnabled&&v.Z.on("change",r)})),(0,k.Z)((()=>{v.Z.off("change",r)})),(0,h.jsxs)(R,{background:i,children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,h.jsx)($,{as:e.collapsed?S.Z:N.Z,onClick:()=>e.setCollapsed(!e.collapsed)}),(0,h.jsx)("div",{style:{height:36,display:"flex",alignItems:"center"},children:(0,h.jsx)(z,{})})]}),(0,h.jsxs)("div",{style:{display:"flex",paddingRight:16},children:[(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(P.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",onClick:()=>{v.Z.isEnabled?v.Z.toggle():u.ZP.warning("您的浏览器不支持全屏！")},children:o?(0,h.jsx)(B.Z,{}):(0,h.jsx)(H.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(I.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",onClick:()=>n((0,b.Dc)()),children:(0,h.jsx)(m.Z,{checked:"dark"===s,checkedChildren:"🌜",unCheckedChildren:"🌞"})}),(0,h.jsx)(j.Z,{menu:{items:[{key:1,label:"个人中心",icon:(0,h.jsx)(E.Z,{})},{key:2,label:"个人设置",icon:(0,h.jsx)(T.Z,{})},{key:4,label:"意见反馈",icon:(0,h.jsx)(_.Z,{}),onClick:()=>t("/issues")},{type:"divider"},{key:3,label:"退出登录",icon:(0,h.jsx)(F.Z,{}),onClick:()=>{localStorage.removeItem("token"),t("/login")}}]},children:(0,h.jsxs)("div",{className:"header-actions-item",children:[(0,h.jsx)(f.C,{src:"https://avatars.githubusercontent.com/u/47770861?v=4",size:"small",style:{marginRight:8}}),(0,h.jsx)("span",{style:{fontSize:14},children:"Cai Hai"})]})})]})]})}var U=t(96804),A=t(96479),G=t(88662),K=t(324);const M=function(e){return e&&(0,n.createElement)(K[e])},O=function({id:e,type:i,title:t,path:n,children:s,icon:l}){return{key:n||e,label:t,icon:l?M(l):"",children:"2"===i?(s||[]).map((e=>O(e))):void 0}};function W(){const{list:e,status:i}=(0,a.v9)(o.EN),t=(0,d.s0)(),s=(0,d.TH)(),l=(0,n.useMemo)((()=>e.map((e=>O(e)))),[e]),c=(0,a.v9)(b.Pu),{token:{colorBgContainer:r}}=g.Z.useToken();return(0,h.jsx)(U.Z,{active:!0,loading:"loading"===i,paragraph:{rows:6},title:!1,style:{padding:20},children:(0,h.jsx)(G.$B,{style:{height:"calc(100% - 64px)"},autoHide:!0,children:(0,h.jsx)(A.Z,{mode:"inline",selectedKeys:[s.pathname],items:l,onClick:({key:e})=>t(e),style:{border:"none",background:r},theme:"dark"===c?"dark":"light"})})})}var q=t(27259);const J=(0,Z.ZP)(s.default.Sider)`
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`,L=Z.F4`
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
  `,Q=Z.ZP.div`
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
    animation: ${L} 0.3s;
  }
`;function V(e){const i={width:210,collapsedWidth:64,collapsed:e.collapsed,theme:"light"};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.default.Sider,{...i}),(0,h.jsxs)(J,{...i,children:[(0,h.jsx)(Q,{children:(0,h.jsxs)(C.rU,{to:"/",children:[(0,h.jsx)("img",{src:q.Z,alt:"logo"}),(0,h.jsx)("h1",{style:{display:e.collapsed?"none":"block"},children:"React Or Antd"})]})}),(0,h.jsx)(W,{})]})]})}function X(){const[e,i]=(0,n.useState)(!1),t=(0,a.I0)();return(0,l.Z)((()=>t((0,o.rG)()))),(0,h.jsxs)(s.default,{style:{minHeight:"100vh",flexDirection:"row"},children:[(0,h.jsx)(V,{collapsed:e}),(0,h.jsxs)(s.default,{children:[(0,h.jsx)(D,{collapsed:e,setCollapsed:i}),(0,h.jsx)(x,{})]})]})}},27259:function(e,i,t){i.Z=t.p+"static/image/logo.51586d6b98032197691d127435162092.svg"}}]);
//# sourceMappingURL=926.87218cd1.chunk.js.map