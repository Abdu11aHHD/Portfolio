(function(){'use strict';
const stages=[...document.querySelectorAll('.preview-canvas')];
function fit(stage){const width=stage.getBoundingClientRect().width;if(width>0)stage.style.setProperty('--preview-scale',String(width/1200));}
function sync(frame){try{const root=frame.contentDocument?.documentElement;if(!root)return;const theme=document.documentElement.dataset.theme||'light';root.dataset.theme=theme;root.style.colorScheme=theme}catch(e){}}
stages.forEach(stage=>{fit(stage);const frame=stage.querySelector('iframe');if(frame){frame.addEventListener('load',()=>sync(frame));sync(frame)}});
if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(entries=>entries.forEach(e=>fit(e.target)));stages.forEach(s=>observer.observe(s));}else{window.addEventListener('resize',()=>stages.forEach(fit));}
if(typeof MutationObserver==='function')new MutationObserver(()=>stages.forEach(s=>{const f=s.querySelector('iframe');if(f)sync(f)})).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
})();
