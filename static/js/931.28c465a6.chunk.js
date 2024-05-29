"use strict";(self.webpackChunkreact_admin_web=self.webpackChunkreact_admin_web||[]).push([[931,207],{7627:function(n,e,o){var r=o(89526),t=o(24059),s=o(96799),i=o(79255),a=o(25540),c=o(17431),d=o(31315),l=o.n(d),m=o(24470),u=o(73961),p=o(49839),h=o(20485),f=o(22701),x=o(37470),v=o(54437),y=o(67557);const j=v.ZP.div`
  width: 320px;
  border-radius: 8px;
  padding: 10px 14px 14px 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  & > .drag-handler {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
    cursor: move;
    user-select: none;
  }
  &.zoom-in-top-enter {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-enter-active {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
  &.zoom-in-top-exit {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
  &.zoom-in-top-exit-active {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-appear {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-appear-active {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
`,b=n=>{const{token:{colorPrimary:e,colorError:o}}=t.Z.useToken(),[d,{set:m}]=(0,h.Z)(!1),p=(0,r.useRef)(null);return(0,u.createPortal)((0,y.jsx)(l(),{bounds:"body",handle:".drag-handler",children:(0,y.jsx)("div",{className:"video-modal",style:{position:"fixed",top:60,right:0,zIndex:999},children:(0,y.jsx)(x.Z,{in:n.visible,nodeRef:p,timeout:300,unmountOnExit:!0,classNames:"zoom-in-top",appear:!0,children:(0,y.jsxs)(j,{ref:p,style:{background:e},children:[(0,y.jsxs)("div",{className:"drag-handler",children:[(0,y.jsxs)("div",{className:"audio-name ellipsis",style:{color:d?o:""},children:[d?(0,y.jsx)(i.Z,{style:{marginRight:8}}):(0,y.jsx)(a.Z,{style:{marginRight:8}}),n.name?n.name:(0,f.B)(n.src)]}),(0,y.jsx)(s.ZP,{type:"text",icon:(0,y.jsx)(c.Z,{}),onClick:()=>n.onClose?.(),style:{color:"#fff"},size:"small"})]}),(0,y.jsx)("audio",{src:n.src,controls:!0,autoPlay:!0,style:{width:"100%"},onError:()=>m(!0),onPlay:()=>m(!1)})]})})})}),document.body)};let g;e.Z=(0,p.Z)(b,{showModal:function(n,e){if(!g){const n=document.createDocumentFragment();document.body.appendChild(n),g=m.createRoot(n)}g.render((0,y.jsx)(b,{src:n,name:e,visible:!0,onClose:()=>(g?.render((0,y.jsx)(b,{src:n,name:e,visible:!1})),void setTimeout((()=>{g?.unmount(),g=null}),350))}))}})},70207:function(n,e,o){o.r(e),o(89526);var r=o(20485),t=o(40557),s=o(65055),i=o(72384),a=o(79669),c=o(76801),d=o.n(c),l=o(69538),m=o(67557);const u=function(){const[n,{setTrue:e,setFalse:o}]=(0,r.Z)(!1);return(0,m.jsx)("div",{className:"zeroclipboard-container",children:(0,m.jsx)("div",{className:`copy-code-btn ${n&&"copied"}`,onClick:n=>{const r=n.currentTarget.closest(".code-container"),t=r?.getElementsByTagName("pre")[0].innerText;d()(t||"").then((()=>{e(),setTimeout(o,1500)}))},children:n?(0,m.jsx)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",className:"octicon color-fg-success",children:(0,m.jsx)("path",{d:"M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"})}):(0,m.jsxs)("svg",{"aria-hidden":"true",height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16","data-view-component":"true",className:"octicon",children:[(0,m.jsx)("path",{d:"M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"}),(0,m.jsx)("path",{d:"M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"})]})})})};e.default=({markdown:n})=>{const e=(0,a.v9)(i.Pu);return(0,m.jsx)("div",{className:"markdown-body","data-theme":e,style:{padding:24},children:(0,m.jsx)(t.U,{remarkPlugins:[s.Z],rehypePlugins:[l.Z],skipHtml:!0,components:{pre:({children:n})=>(0,m.jsxs)("div",{className:"highlight code-container",children:[(0,m.jsx)("pre",{children:n}),(0,m.jsx)(u,{})]})},children:n})})}},49839:function(n,e,o){function r(n,e){const o=n;return Object.keys(e).forEach((n=>{Object.defineProperty(o,n,{value:e[n],writable:!1,enumerable:!0})})),o}o.d(e,{Z:function(){return r}})},34931:function(n,e,o){o.r(e),o.d(e,{default:function(){return l}});var r=o(89526),t=o(68175),s=o(96799),i=o(7627),a=o(70207),c='# AudioModal\r\n音乐播放器组件\r\n\r\n## 代码演示\r\n```tsx\r\nimport { useState } from "react";\r\nimport { Button } from "antd";\r\nimport AudioModal from "@/components/AudioModal";\r\n\r\nexport default function AudioPage() {\r\n  const [visible, setVisible] = useState(false);\r\n\r\n  return (\r\n    <div>\r\n      <Button onClick={() => setVisible(true)}>点击播放音乐</Button>\r\n\r\n      <AudioModal\r\n        visible={visible}\r\n        name="音乐名称.mp3"\r\n        audioSrc="http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3"\r\n        onClose={() => setVisible(false)}\r\n      />\r\n    </div>\r\n  );\r\n}\r\n\r\n```\r\n\r\n## 推荐使用 `showModal` \r\n就像普通 `Modal` 一样，`AudioModal` 总是会在 `body` 下创建节点，并且它不应该同时存在多个实例，所以我认为使用 `showModal` 调用才是合理的编码方式。\r\n```tsx\r\nimport { Button } from "antd";\r\nimport AudioModal from "@/components/AudioModal";\r\n\r\nexport default function PlayAudio() {\r\n  return (\r\n    <Button\r\n      onClick={() =>\r\n        AudioModal.showModal(\r\n          "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3",\r\n          "音乐名称.mp3"\r\n        )\r\n      }\r\n    >\r\n      点击播放\r\n    </Button>\r\n  );\r\n}\r\n```',d=o(67557);function l(){const[n,e]=(0,r.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(t.Z,{children:[(0,d.jsx)(s.ZP,{type:"primary",onClick:()=>e(!0),children:"点击播放音乐"}),(0,d.jsx)(i.Z,{visible:n,name:"音乐名称.mp3",src:"http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3",onClose:()=>e(!1)})]}),(0,d.jsx)(a.default,{markdown:c})]})}}}]);
//# sourceMappingURL=931.28c465a6.chunk.js.map