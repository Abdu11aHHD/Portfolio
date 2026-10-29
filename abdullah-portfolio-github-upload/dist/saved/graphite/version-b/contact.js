'use strict';
(()=>{
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{
 event.preventDefault();
 const name=document.querySelector('#contact-name'),email=document.querySelector('#contact-email'),message=document.querySelector('#contact-message');
 name.setCustomValidity(name.value.trim()?'':'Please enter your name.');
 message.setCustomValidity(message.value.trim().length>=10?'':'Please write a message of at least 10 characters.');
 if(!form.reportValidity())return;
 const subject='Portfolio inquiry from '+name.value.trim().replace(/[\r\n]/g,' ');
 const body='Name: '+name.value.trim()+'\nReply email: '+email.value.trim()+'\n\n'+message.value.trim();
 window.location.href='mailto:abdullahomalharbi@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 document.querySelector('#contact-status').textContent='Email draft requested. If your email app did not open, use the email link or Copy email. Your message stays here until you leave or reload this page.';
});
form.addEventListener('input',event=>{if(event.target.setCustomValidity)event.target.setCustomValidity('')});
})();
