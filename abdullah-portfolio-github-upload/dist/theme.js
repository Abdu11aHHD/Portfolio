(function(){'use strict';
const root=document.documentElement,key='portfolio-color-theme',media=window.matchMedia('(prefers-color-scheme:dark)');
let chosen=null;try{const value=localStorage.getItem(key);if(value==='dark'||value==='light')chosen=value}catch(e){}
function apply(value){root.dataset.theme=value;root.style.colorScheme=value;document.querySelectorAll('[data-theme-toggle]').forEach(b=>{b.innerHTML=value==='dark'?'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>':'<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/></svg>';b.title='Switch to '+(value==='dark'?'light':'dark')+' mode';b.setAttribute('aria-label','Switch to '+(value==='dark'?'light':'dark')+' mode');b.setAttribute('aria-pressed',String(value==='dark'))});}
apply(chosen||(media.matches?'dark':'light'));
const reducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)');
let transition=null,colorTimer=0,changeSerial=0;
function changeTheme(value){
 const serial=++changeSerial;
 const commit=()=>{if(serial!==changeSerial)return;apply(value);try{localStorage.setItem(key,value)}catch(e){}};
 if(transition){transition.skipTransition();transition=null}
 clearTimeout(colorTimer);delete root.dataset.themeAnimation;
 if(reducedMotion.matches||document.hidden){commit();return}
 if(typeof document.startViewTransition==='function'){
  try{const current=document.startViewTransition(commit);transition=current;current.finished.catch(()=>{}).finally(()=>{if(transition===current)transition=null});return}catch(e){}
 }
 root.dataset.themeAnimation='colors';void root.offsetWidth;commit();
 colorTimer=setTimeout(()=>{delete root.dataset.themeAnimation},500);
}
function ready(){apply(root.dataset.theme);document.querySelectorAll('[data-theme-toggle]').forEach(b=>{b.hidden=false;b.addEventListener('click',()=>{chosen=(chosen||root.dataset.theme)==='dark'?'light':'dark';changeTheme(chosen)})});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
media.addEventListener('change',()=>{if(!chosen)apply(media.matches?'dark':'light')});
window.addEventListener('storage',e=>{if(e.key===key){changeSerial++;if(transition){transition.skipTransition();transition=null}chosen=e.newValue==='dark'||e.newValue==='light'?e.newValue:null;apply(chosen||(media.matches?'dark':'light'))}});
})();