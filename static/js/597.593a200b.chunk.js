"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[597],{9597:function(e,t,i){i.r(t),i.d(t,{default:function(){return te}});var n=i(9526),s=i(7781),l=i(3309),a=i(9669),c=i(8519),o=i(2371),r=i(3277),d=i(1522),h=i(7557);const{Content:p}=s.default;function x(){return(0,h.jsxs)(p,{style:{margin:20},children:[(0,h.jsx)(n.Suspense,{fallback:(0,h.jsx)(d.Z,{}),children:(0,h.jsx)(r.j3,{})}),(0,h.jsx)(o.Z.BackTop,{})]})}var u=i(4059),g=i(1314),f=i(9367),m=i(1992),j=i(3214),y=i(8589),k=i(7569),Z=i(4437),v=i(2641),b=i(6940),C=i(6397),w=i(570);const z=function(e,t){return function(e,t){for(let i=0;i<e.length;)t(e[i])?i++:e.splice(i,1);return e}(e,(e=>e.children&&e.children.length?(z(e.children,t),!!e.children.length||t(e)):t(e)))},N=function(e,t){return z((i=e,JSON.parse(JSON.stringify(i))),t);var i},S=function(e){let t=[...e];const i=[];for(;t;){const e=t[0];e?(i.push({title:e.title,path:e.path}),t=e.children):t=null}return i};function P(){const e=(0,r.TH)(),t=(0,a.v9)(c.xR),i=(0,n.useMemo)((()=>{const i=e.pathname,n=N(t,(e=>e.path&&e.path===i));let s=S(n);s[0]||(s=[{title:"未知路由"}]);const[l]=s;return"/index"!==l.path&&s.unshift({title:"首页",path:"/index"}),s}),[e,t]);return(0,n.useEffect)((()=>{const e="React Or Antd",t=i[i.length-1];document.title=t?.title?`${e}-${t?.title}`:e}),[i]),(0,h.jsx)(w.Z,{items:i.map((e=>({title:e.path&&"/"!==e.path?(0,h.jsx)(C.rU,{to:e.path,children:e.title}):e.title})))})}var H=i(9301),R=i(4689),B=i(5675),E=i(1606),I=i(3645),T=i(2449),$=i(4846),O=i(8425),_=i(7642),F=i(8205);const A=(0,Z.ZP)(s.default.Header)`
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
`,D=Z.ZP.div`
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
`;function J(e){const{token:{colorBgContainer:t}}=u.default.useToken(),i=(0,r.s0)(),n=(0,a.I0)(),s=(0,a.v9)(b.Pu),[c,{set:o}]=(0,y.Z)(!1),d=()=>o(v.Z.isFullscreen);return(0,l.Z)((()=>{v.Z.isEnabled&&v.Z.on("change",d)})),(0,k.Z)((()=>{v.Z.off("change",d)})),(0,h.jsxs)(A,{background:t,children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,h.jsx)(D,{as:e.collapsed?H.Z:R.Z,onClick:()=>e.setCollapsed(!e.collapsed)}),(0,h.jsx)("div",{style:{height:36,display:"flex",alignItems:"center"},children:(0,h.jsx)(P,{})})]}),(0,h.jsxs)("div",{style:{display:"flex",paddingRight:16},children:[(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(B.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",onClick:()=>{v.Z.isEnabled?v.Z.toggle():g.ZP.warning("您的浏览器不支持全屏！")},children:c?(0,h.jsx)(E.Z,{}):(0,h.jsx)(I.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",children:(0,h.jsx)(T.Z,{})}),(0,h.jsx)("div",{className:"header-actions-item",onClick:()=>n((0,b.Dc)()),children:(0,h.jsx)(f.Z,{checked:"dark"===s,checkedChildren:"🌜",unCheckedChildren:"🌞"})}),(0,h.jsx)(m.Z,{menu:{items:[{key:1,label:"个人中心",icon:(0,h.jsx)($.Z,{})},{key:2,label:"个人设置",icon:(0,h.jsx)(O.Z,{})},{key:4,label:"意见反馈",icon:(0,h.jsx)(_.Z,{}),onClick:()=>i("/issues")},{type:"divider"},{key:3,label:"退出登录",icon:(0,h.jsx)(F.Z,{}),onClick:()=>{localStorage.removeItem("token"),i("/login")}}]},children:(0,h.jsxs)("div",{className:"header-actions-item",children:[(0,h.jsx)(j.C,{src:"https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",size:"small",style:{marginRight:8}}),(0,h.jsx)("span",{style:{fontSize:14},children:"Cai Hai"})]})})]})]})}var M=i(6804),U=i(6479),G=i(8662),K=i(1794);const V=function(e){return e&&(0,n.createElement)(K[e])},W=function({id:e,type:t,title:i,path:n,children:s,icon:l}){return{key:n||e,label:i,icon:l?V(l):"",children:"2"===t?(s||[]).map((e=>W(e))):void 0}};function q(){const{list:e,status:t}=(0,a.v9)(c.EN),i=(0,r.s0)(),s=(0,r.TH)(),l=(0,n.useMemo)((()=>e.map((e=>W(e)))),[e]),o=(0,a.v9)(b.Pu),{token:{colorBgContainer:d}}=u.default.useToken();return(0,h.jsx)(M.Z,{active:!0,loading:"loading"===t,paragraph:{rows:6},title:!1,style:{padding:20},children:(0,h.jsx)(G.$B,{style:{height:"calc(100% - 64px)"},autoHide:!0,children:(0,h.jsx)(U.Z,{mode:"inline",selectedKeys:[s.pathname],items:l,onClick:({key:e})=>i(e),style:{border:"none",background:d},theme:"dark"===o?"dark":"light"})})})}var L=i(7259);const Q=(0,Z.ZP)(s.default.Sider)`
  position: fixed !important ;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`,X=Z.F4`
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
  `,Y=Z.ZP.div`
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
    animation: ${X} 0.3s;
  }
`;function ee(e){const t={width:210,collapsedWidth:64,collapsed:e.collapsed,theme:"light"};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.default.Sider,{...t}),(0,h.jsxs)(Q,{...t,children:[(0,h.jsx)(Y,{children:(0,h.jsxs)(C.rU,{to:"/",children:[(0,h.jsx)("img",{src:L.Z,alt:"logo"}),(0,h.jsx)("h1",{style:{display:e.collapsed?"none":"block"},children:"React Or Antd"})]})}),(0,h.jsx)(q,{})]})]})}function te(){const[e,t]=(0,n.useState)(!1),i=(0,a.I0)();return(0,l.Z)((()=>i((0,c.rG)()))),(0,h.jsxs)(s.default,{style:{minHeight:"100vh",flexDirection:"row"},children:[(0,h.jsx)(ee,{collapsed:e}),(0,h.jsxs)(s.default,{children:[(0,h.jsx)(J,{collapsed:e,setCollapsed:t}),(0,h.jsx)(x,{})]})]})}},7259:function(e,t,i){t.Z=i.p+"static/image/logo.51586d6b98032197691d127435162092.svg"}}]);
//# sourceMappingURL=597.593a200b.chunk.js.map