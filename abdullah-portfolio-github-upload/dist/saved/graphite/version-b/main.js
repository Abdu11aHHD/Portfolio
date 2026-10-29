'use strict';
(() => {
 const $=selector=>document.querySelector(selector);
 const $$=selector=>[...document.querySelectorAll(selector)];
 document.documentElement.dataset.js='on';
 const menu=$('#menu-toggle'),mobile=$('#mobile-nav');
 menu.hidden=false;
 const closeMenu=()=>{mobile.hidden=true;menu.setAttribute('aria-expanded','false');menu.textContent='Menu'};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';mobile.hidden=open;menu.setAttribute('aria-expanded',String(!open));menu.textContent=open?'Menu':'Close'});
 $$('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 window.matchMedia('(min-width:621px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
 const figures=$$('.evaluation-figure'),figureButtons=$$('[data-figure]');
 $('.figure-controls').hidden=false;$('.figure-stage').classList.add('has-js');
 function showFigure(index){figures.forEach((f,i)=>f.hidden=i!==index);figureButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));$('.figure-stage').classList.remove('switching');requestAnimationFrame(()=>$('.figure-stage').classList.add('switching'))}
 figureButtons.forEach(b=>b.addEventListener('click',()=>showFigure(Number(b.dataset.figure))));showFigure(0);
 const scenarioTabs=$$('[data-scenario]'),panels=$$('.scenario-panel');
 $('.scenario-tabs').hidden=false;
 function showScenario(index){scenarioTabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1});panels.forEach((p,i)=>{p.hidden=i!==index;p.classList.toggle('entering',i===index)})}
 scenarioTabs.forEach((b,index)=>{b.addEventListener('click',()=>showScenario(index));b.addEventListener('keydown',e=>{let next=index;if(e.key==='ArrowRight')next=(index+1)%scenarioTabs.length;else if(e.key==='ArrowLeft')next=(index+scenarioTabs.length-1)%scenarioTabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=scenarioTabs.length-1;else return;e.preventDefault();showScenario(next);scenarioTabs[next].focus()})});showScenario(0);
 const dialog=$('#image-dialog');let trigger;
 $$('[data-image]').forEach(link=>link.addEventListener('click',e=>{if(typeof dialog.showModal!=='function')return;e.preventDefault();trigger=link;const figure=figures[Number(link.dataset.image)],img=figure.querySelector('img'),caption=figure.querySelector('figcaption');$('#expanded-image').src=img.src;$('#expanded-image').alt=img.alt;$('#expanded-caption').textContent=caption.textContent;$('#image-dialog-title').textContent=caption.textContent.split('.')[0];dialog.showModal();document.body.style.overflow='hidden'}));
 $('#close-image').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus()});dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
 let timer;function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>$('#toast').classList.remove('visible'),3500)}
 const copy=$('#copy-email');copy.hidden=false;copy.addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText('abdullahomalharbi@gmail.com');toast('Email copied.')}catch{toast('Copy unavailable. Select the address, or use the email link.')}});
 const reduced=window.matchMedia('(prefers-reduced-motion:reduce)'),motion=$('#motion-toggle');let userReduced=false;
 try{userReduced=localStorage.getItem('portfolio-b-motion')==='off'}catch{}
 function syncMotion(){const off=userReduced||reduced.matches;document.documentElement.dataset.motion=off?'off':'on';motion.setAttribute('aria-pressed',String(off));motion.textContent=off?'Motion reduced':'Reduce motion';motion.disabled=reduced.matches}
 motion.hidden=false;motion.addEventListener('click',()=>{userReduced=!userReduced;try{localStorage.setItem('portfolio-b-motion',userReduced?'off':'on')}catch{}syncMotion()});reduced.addEventListener('change',syncMotion);syncMotion();
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){if(!reduced.matches&&!userReduced)e.target.classList.add('revealing');observer.unobserve(e.target)}})},{rootMargin:'0px 0px -5% 0px',threshold:.08});$$('[data-reveal]').forEach(el=>observer.observe(el))}
})();
