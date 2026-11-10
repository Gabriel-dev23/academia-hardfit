document.documentElement.classList.add('js');
const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
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
const {animate,scroll,inView,stagger,hover,press}=Motion;
const motionCleanups=[];
let tickerAnimation;
function setupMotion(){
  while(motionCleanups.length)motionCleanups.pop()();
  document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('visible');el.style.opacity='1';el.style.transform='none';});
  document.querySelectorAll('h2').forEach(el=>el.classList.add('letters-visible'));
  if(reducedMotion.matches)return;
  document.querySelectorAll('.reveal').forEach(el=>{
    const animation=animate(el,{opacity:[0,1],y:[40,0]},{duration:.65,type:'spring',bounce:.12,autoplay:false});
    const stop=inView(el,()=>{animation.play();},{amount:.12});
    motionCleanups.push(()=>{stop();animation.complete();});
  });
  document.querySelectorAll('h2').forEach(heading=>{
    const letters=[...heading.querySelectorAll('.motion-letter')];
    const animation=animate(letters,{opacity:[.15,1],y:[24,0],rotateX:[35,0]},{duration:.55,delay:stagger(.018),ease:'easeOut',autoplay:false});
    const stop=inView(heading,()=>{animation.play();},{amount:.3});
    motionCleanups.push(()=>{stop();animation.complete();});
  });
  const photo=document.querySelector('.hero-photo');
  const hero=document.querySelector('.hero');
  motionCleanups.push(scroll(animate(photo,{y:[0,180],scale:[1.12,1.25]},{ease:'linear'}),{target:hero,offset:['start start','end start']}));
  motionCleanups.push(scroll(animate(document.querySelector('.experience-word'),{y:[-60,90]},{ease:'linear'}),{target:document.querySelector('.experience'),offset:['start end','end start']}));
  motionCleanups.push(scroll(animate(progress,{scaleX:[0,1]},{ease:'linear'})));
  document.querySelectorAll('.section-top').forEach(line=>{
    motionCleanups.push(scroll(animate(line,{'--scroll-progress':[0,1]},{ease:'linear'}),{target:line,offset:['start end','start center']}));
  });
  motionCleanups.push(hover('.btn,.review,.benefits article',element=>{
    const button=element.classList.contains('btn');
    animate(element,{scale:button?1.035:1.015,y:-5},{type:'spring',stiffness:300,damping:22});
    return ()=>animate(element,{scale:1,y:0},{type:'spring',stiffness:300,damping:22});
  }));
  motionCleanups.push(press('.btn',element=>{
    animate(element,{scale:.96},{duration:.12});
    return ()=>animate(element,{scale:1},{type:'spring',stiffness:400,damping:20});
  }));
}
setupMotion();

// A seamless lateral marquee, with two identical groups for an exact loop.
const tickerTrack=document.querySelector('.ticker > div');
const tickerGroup=document.createElement('span');
tickerGroup.className='ticker-group';
tickerGroup.innerHTML='FORÇA <i>✳</i> EVOLUÇÃO <i>✳</i> BEM-ESTAR <i>✳</i> HARD FIT <i>✳</i> '.repeat(3);
tickerTrack.replaceChildren(tickerGroup,tickerGroup.cloneNode(true));
function startTicker(){
  tickerAnimation?.stop();
  if(reducedMotion.matches)return;
  const distance=tickerGroup.getBoundingClientRect().width;
  tickerAnimation=animate(tickerTrack,{x:[0,-distance]},{duration:distance/65,repeat:Infinity,ease:'linear'});
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
reducedMotion.addEventListener('change',()=>{setupMotion();startTicker();startTyping();});
