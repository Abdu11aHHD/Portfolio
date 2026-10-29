'use strict';
(() => {
 const searchButton=document.querySelector('#open-search');
 const dialog=document.querySelector('#search-dialog');
 const input=document.querySelector('#search-input');
 const results=document.querySelector('#search-results');
 const destinations=[
  ['Projects','#work','Selected work'],['About','#about','Background and technical skills'],['Nabeeh','#nabeeh-case','Agentic AI safety supervisor'],['IronID','#ironid-details','AI fitness coach'],['SHEFAA','#shefaa-details','Arabic medical Q&A'],['Approach','#approach','Interactive context walkthrough'],['Experience','#background','Experience and education'],['Contact','#contact','Email and LinkedIn'],['View résumé','../../../assets/Abdullah_Alharbi_Resume.pdf','PDF résumé']
 ];
 function renderSearch(){
  const query=input.value.trim().toLowerCase();
  const matches=destinations.filter(d=>`${d[0]} ${d[2]}`.toLowerCase().includes(query));
  results.replaceChildren();
  if(!matches.length){const p=document.createElement('p');p.className='search-empty';p.textContent='No matching sections. Try “projects” or “contact”.';results.append(p);return}
  for(const [name,href,description] of matches){const a=document.createElement('a');a.href=href;a.textContent=name;const span=document.createElement('span');span.textContent=description;a.append(span);if(href.endsWith('.pdf')){a.target='_blank';a.rel='noopener noreferrer';a.ariaLabel='View résumé PDF (opens in a new tab)'};a.addEventListener('click',()=>{if(href==='#ironid-details'||href==='#shefaa-details')document.querySelector(href).open=true;dialog.close()});results.append(a)}
 }
 function openSearch(){input.value='';renderSearch();dialog.showModal();input.focus()}
 searchButton.hidden=false;searchButton.addEventListener('click',openSearch);
 document.querySelector('#close-search').addEventListener('click',()=>dialog.close());
 input.addEventListener('input',renderSearch);
 dialog.addEventListener('close',()=>searchButton.focus());
 document.addEventListener('keydown',e=>{const editing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)||document.activeElement?.isContentEditable;if((e.key==='k'&&(e.ctrlKey||e.metaKey))||(e.key==='/'&&!editing)){if(document.querySelector('#image-dialog').open)return;e.preventDefault();if(!dialog.open)openSearch()}});
 document.querySelectorAll('[data-open-project]').forEach(a=>a.addEventListener('click',()=>{const details=document.getElementById(a.dataset.openProject);if(details)details.open=true}));
 // The name stays ordinary accessible HTML. Particles are a temporary pointer-only overlay.
 const host=document.querySelector('.hero-name'),canvas=document.querySelector('#name-canvas'),heading=document.querySelector('#hero-title');
 const fine=window.matchMedia('(hover:hover) and (pointer:fine)'),reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 if(!canvas?.getContext)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 let points=[],width=0,height=0,raf=0,pointer=null,lastMove=0;
 const enabled=()=>fine.matches&&!reduced.matches&&document.documentElement.dataset.motion!=='off'&&window.innerWidth>620;
 function reset(){cancelAnimationFrame(raf);raf=0;pointer=null;host.classList.remove('particle-active');ctx.clearRect(0,0,width,height)}
 function build(){
  reset();if(!enabled())return;
  const box=heading.getBoundingClientRect();width=Math.round(box.width);height=Math.round(box.height);if(width<1||height<1)return;
  const ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);
  const mask=document.createElement('canvas');mask.width=width;mask.height=height;const m=mask.getContext('2d');if(!m)return;const style=getComputedStyle(heading);m.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;m.textAlign='center';m.textBaseline='middle';m.fillStyle='#fff';if('letterSpacing' in m)m.letterSpacing=style.letterSpacing;m.fillText(heading.textContent,width/2,height/2);const pixels=m.getImageData(0,0,width,height).data;points=[];
  for(let y=2;y<height;y+=5)for(let x=2;x<width;x+=5)if(pixels[(y*width+x)*4+3]>140)points.push({x,y,bx:x,by:y,vx:0,vy:0});
 }
 function frame(time){
  if(!enabled()||document.hidden){reset();return}
  ctx.clearRect(0,0,width,height);const glow=ctx.createLinearGradient(0,0,width,height);const light=document.documentElement.dataset.theme==='light';glow.addColorStop(0,light?'#226c45':'#b0f3c8');glow.addColorStop(1,light?'#13766e':'#4dcfc0');ctx.fillStyle=glow;let moving=false;
  for(const p of points){if(pointer){const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.sqrt(dx*dx+dy*dy);if(d>0&&d<100){const force=(1-d/100)*1.5;p.vx+=dx/d*force;p.vy+=dy/d*force}}p.vx+=(p.bx-p.x)*.035;p.vy+=(p.by-p.y)*.035;p.vx*=.83;p.vy*=.83;p.x+=p.vx;p.y+=p.vy;if(Math.abs(p.x-p.bx)+Math.abs(p.y-p.by)>.3)moving=true;ctx.beginPath();ctx.arc(p.x,p.y,1.7,0,Math.PI*2);ctx.fill()}
  if(!pointer&&!moving){reset();return}
  if(time-lastMove>2500){reset();return}
  raf=requestAnimationFrame(frame);
 }
 host.addEventListener('pointermove',e=>{if(!enabled()||!points.length)return;const r=host.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};lastMove=performance.now();if(!raf){host.classList.add('particle-active');raf=requestAnimationFrame(frame)}},{passive:true});
 host.addEventListener('pointerleave',()=>{pointer=null});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset()});
 fine.addEventListener('change',build);reduced.addEventListener('change',build);window.addEventListener('resize',build);
 if(document.fonts?.ready)document.fonts.ready.then(build).catch(()=>{});else build();
})();
