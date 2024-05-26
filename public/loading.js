/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const _root = document.querySelector("#root");
  if (_root && _root.innerHTML === "") {
    _root.innerHTML = `
      <style>
          .---page-loading {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
      
          .---loader {
              width: 40px;
              height: 40px;
              --c:no-repeat linear-gradient(orange 0 0);
              background: var(--c),var(--c),var(--c),var(--c);
              background-size: 21px 21px;
              animation: l5 1.5s infinite cubic-bezier(0.3,1,0,1);
          }
          @keyframes l5 {
              0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
              33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%;width:60px;height: 60px}
              66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ;width:60px;height: 60px}
              100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
          }
      </style>
    
      <div class="---page-loading">
        <div class="---loader">
        </div>
      </div>
    `;
  }
})();
