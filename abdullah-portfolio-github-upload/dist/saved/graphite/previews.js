(function(){'use strict';
// Only our trusted, authored portfolio pages are embedded here.
const stages=[...document.querySelectorAll('.preview-canvas')];
function fit(stage){const width=stage.getBoundingClientRect().width;if(width>0)stage.style.setProperty('--preview-scale',String(width/1200));}
stages.forEach(fit);
if(typeof ResizeObserver==='function'){const observer=new ResizeObserver(entries=>entries.forEach(e=>fit(e.target)));stages.forEach(s=>observer.observe(s));}else{window.addEventListener('resize',()=>stages.forEach(fit));}
})();
