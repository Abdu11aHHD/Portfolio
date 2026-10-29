const menuButton=document.querySelector('#menu-toggle');
const mobileNav=document.querySelector('#mobile-nav');
menuButton.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));mobileNav.hidden=expanded;});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');}));
const promptDialog=document.querySelector('#prompt-dialog');
document.querySelector('#show-prompt').addEventListener('click',()=>promptDialog.showModal());
document.querySelector('#close-prompt').addEventListener('click',()=>promptDialog.close());
promptDialog.addEventListener('click',event=>{if(event.target===promptDialog){const r=promptDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)promptDialog.close();}});
