(function(){'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
const enabled=()=>!reduced.matches&&document.documentElement.dataset.motion!=='off';
if(!('IntersectionObserver' in window)||!enabled())return;
const targets=[...document.querySelectorAll('.chapter h2,.about-statement,.project-story h3,.project-lead')];
function prepare(element){
 const original=element.textContent;let index=0;
 for(const node of [...element.childNodes]){
  if(node.nodeType===3){
   const fragment=document.createDocumentFragment();
   for(const token of node.textContent.split(/(\s+)/)){
    if(!token)continue;
    if(/^\s+$/.test(token)){fragment.append(document.createTextNode(token));continue}
    const word=document.createElement('span');word.className='motion-word';word.textContent=token;
    word.style.setProperty('--word-delay',Math.min(index++*30,450)+'ms');fragment.append(word);
   }
   node.replaceWith(fragment);
  }else if(node.nodeType===1&&node.tagName!=='BR'){
   node.classList.add('motion-word');node.style.setProperty('--word-delay',Math.min(index++*30,450)+'ms');
  }
 }
 if(element.textContent!==original)return;
 element.classList.add('has-word-motion');
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
 if(!entry.isIntersecting)return;
 observer.unobserve(entry.target);
 if(!enabled())return;
 prepare(entry.target);entry.target.classList.add('text-motion-running');
}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
targets.forEach(el=>observer.observe(el));
})();
