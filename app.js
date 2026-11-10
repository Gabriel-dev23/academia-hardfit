document.documentElement.classList.add('js');
const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}

// Native scrolling keeps wheel, trackpad and touch behavior consistent.
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
const progress=document.createElement('div');
progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
const headings=[...document.querySelectorAll('h1,h2')];
headings.forEach(heading=>{
  const label=heading.textContent.replace(/\s+/g,' ').trim();
  heading.setAttribute('aria-label',label);
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  let index=0;
  nodes.forEach(node=>{
    const fragment=document.createDocumentFragment();
    // Wrap words so letters never break a word across lines on mobile.
    node.textContent.split(/(\s+)/).forEach(word=>{
      if(!word.trim()){fragment.append(document.createTextNode(word));return;}
      const wrapper=document.createElement('span');wrapper.className='motion-word';wrapper.setAttribute('aria-hidden','true');
      [...word].forEach(letter=>{const span=document.createElement('span');span.className='motion-letter';span.textContent=letter;span.style.setProperty('--letter-delay',`${index++*24}ms`);wrapper.append(span);});
      fragment.append(wrapper);
    });
    node.replaceWith(fragment);
  });
});
const headingObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(({target,isIntersecting})=>target.classList.toggle('letters-visible',isIntersecting));
},{threshold:.18}):null;
headings.forEach(h=>headingObserver?headingObserver.observe(h):h.classList.add('letters-visible'));
const sections=[...document.querySelectorAll('.section,.closing')];
const photo=document.querySelector('.hero-photo');
const heroContent=document.querySelector('.hero-content');
const backgroundWord=document.querySelector('.experience-word');
const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
let scheduled=false;
function renderMotion(){
  scheduled=false;
  const viewport=window.innerHeight;
  const scroll=window.scrollY;
  const total=document.documentElement.scrollHeight-viewport;
  progress.style.transform=`scaleX(${total>0?clamp(scroll/total):0})`;
  if(reducedMotion.matches){
    photo.style.removeProperty('transform');heroContent.style.removeProperty('transform');heroContent.style.removeProperty('opacity');
    sections.forEach(s=>s.style.removeProperty('--scroll-progress'));
    return;
  }
  photo.style.transform=`translate3d(0,${Math.min(scroll*.24,260)}px,0) scale(1.12)`;
  heroContent.style.transform=`translate3d(0,${Math.min(scroll*.1,90)}px,0)`;
  heroContent.style.opacity=String(clamp(1-scroll/(viewport*.95),.15,1));
  sections.forEach(section=>{
    const rect=section.getBoundingClientRect();
    if(rect.top>viewport*1.15||rect.bottom< -100)return;
    const p=clamp((viewport-rect.top)/(viewport+rect.height));
    section.style.setProperty('--scroll-progress',String(p));
    section.querySelectorAll('h2 .motion-letter').forEach((letter,i,letters)=>{
      const fill=clamp((viewport*.88-rect.top)/(viewport*.48));
      const lit=fill>=i/letters.length;
      letter.classList.toggle('scroll-lit',lit);
    });
  });
  const rect=document.querySelector('.experience').getBoundingClientRect();
  if(rect.top<viewport&&rect.bottom>0)backgroundWord.style.translate=`0 ${(viewport*.5-rect.top)*.12}px`;
}
function requestMotion(){if(!scheduled){scheduled=true;requestAnimationFrame(renderMotion);}}
window.addEventListener('scroll',requestMotion,{passive:true});
window.addEventListener('resize',requestMotion,{passive:true});
reducedMotion.addEventListener('change',requestMotion);
requestMotion();
document.querySelectorAll('.btn,.review,.benefits article').forEach(element=>{
  element.addEventListener('pointermove',event=>{
    if(reducedMotion.matches||!finePointer.matches||event.pointerType==='touch')return;
    const rect=element.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    element.style.setProperty('--pointer-x',`${x*8}px`);
    element.style.setProperty('--pointer-y',`${y*6}px`);
    element.style.setProperty('--glow-x',`${(x+.5)*100}%`);
    element.style.setProperty('--glow-y',`${(y+.5)*100}%`);
  });
  element.addEventListener('pointerleave',()=>{element.style.setProperty('--pointer-x','0px');element.style.setProperty('--pointer-y','0px');});
});

// A seamless lateral marquee, with two identical groups for an exact loop.
const tickerTrack=document.querySelector('.ticker > div');
const tickerGroup=document.createElement('span');
tickerGroup.className='ticker-group';
tickerGroup.innerHTML='FORÇA <i>✳</i> EVOLUÇÃO <i>✳</i> BEM-ESTAR <i>✳</i> HARD FIT <i>✳</i> '.repeat(3);
tickerTrack.replaceChildren(tickerGroup,tickerGroup.cloneNode(true));
let tickerAnimation;
function startTicker(){
  tickerAnimation?.cancel();
  if(reducedMotion.matches)return;
  const distance=tickerGroup.getBoundingClientRect().width;
  tickerAnimation=tickerTrack.animate([{transform:'translateX(0)'},{transform:`translateX(-${distance}px)`}],{duration:distance/65*1000,iterations:Infinity,easing:'linear'});
}
startTicker();
document.fonts?.ready.then(startTicker);
window.addEventListener('resize',startTicker,{passive:true});

// Keep the full heading in the accessibility tree and its layout stable.
const typingLines=[...document.querySelectorAll('h1 > span')];
let typingTimer;
function startTyping(){
  clearTimeout(typingTimer);
  const letters=typingLines.flatMap(line=>[...line.querySelectorAll('.motion-letter')]);
  letters.forEach(letter=>letter.classList.remove('typed-off','typing-cursor'));
  if(reducedMotion.matches)return;
  letters.forEach(letter=>letter.classList.add('typed-off'));
  let lineIndex=0,letterIndex=0;
  function typeNext(){
    letters.forEach(letter=>letter.classList.remove('typing-cursor'));
    const lineLetters=[...typingLines[lineIndex].querySelectorAll('.motion-letter')];
    const letter=lineLetters[letterIndex];
    letter.classList.remove('typed-off');letter.classList.add('typing-cursor');
    letterIndex++;
    if(letterIndex<lineLetters.length){typingTimer=setTimeout(typeNext,95);return;}
    if(lineIndex<typingLines.length-1){lineIndex++;letterIndex=0;typingTimer=setTimeout(typeNext,420);return;}
    typingTimer=setTimeout(startTyping,4500);
  }
  typingTimer=setTimeout(typeNext,450);
}
startTyping();
reducedMotion.addEventListener('change',()=>{startTicker();startTyping();});
