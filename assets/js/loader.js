const preloader = document.createElement("div");
preloader.id = "preloader";
preloader.innerHTML = `
  <div class="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
`;

const style = document.createElement("style");
style.innerHTML = `
html.preloader-lock, 
body.preloader-lock {
  overflow: hidden !important;
  height: 100% !important;
  width: 100% !important;
}

#preloader {
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;  
  height: 100dvh;  
  background-color: greenyellow;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;  
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.spinner {
  position: relative; 
  width: 20px;       
  height: 20px;
}

.spinner div {
  position: absolute;
  width: 50%;
  height: 150%;
  background: #000000;
  transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
  animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
}

.spinner div:nth-child(1) { --delay: 0.1; --rotation: 36; --translation: 150; }
.spinner div:nth-child(2) { --delay: 0.2; --rotation: 72; --translation: 150; }
.spinner div:nth-child(3) { --delay: 0.3; --rotation: 108; --translation: 150; }
.spinner div:nth-child(4) { --delay: 0.4; --rotation: 144; --translation: 150; }
.spinner div:nth-child(5) { --delay: 0.5; --rotation: 180; --translation: 150; }
.spinner div:nth-child(6) { --delay: 0.6; --rotation: 216; --translation: 150; }
.spinner div:nth-child(7) { --delay: 0.7; --rotation: 252; --translation: 150; }
.spinner div:nth-child(8) { --delay: 0.8; --rotation: 288; --translation: 150; }
.spinner div:nth-child(9) { --delay: 0.9; --rotation: 324; --translation: 150; }
.spinner div:nth-child(10) { --delay: 1; --rotation: 360; --translation: 150; }

@keyframes spinner-fzua35 {
  0%, 10%, 20%, 30%, 40%, 60%, 70%, 80%, 90%, 100% { 
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%)); 
  }
  50% { 
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%)); 
  }
}

.preloader-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
`;
document.head.appendChild(style);

let isHidden = false;
function hidePreloader() {
  if (!isHidden) {
    isHidden = true;
    preloader.classList.add("preloader-hidden");
    
    document.documentElement.classList.remove("preloader-lock");
    document.body.classList.remove("preloader-lock");
    
    setTimeout(() => preloader.remove(), 500);
  }
}

function injectPreloader() {
  document.documentElement.classList.add("preloader-lock");
  document.body.classList.add("preloader-lock");
  document.body.insertBefore(preloader, document.body.firstChild);
}

if (document.body) {
  injectPreloader();
} else {
  document.addEventListener("DOMContentLoaded", injectPreloader);
}

document.addEventListener("DOMContentLoaded", hidePreloader);
window.addEventListener("load", hidePreloader);
setTimeout(hidePreloader, 3000);
