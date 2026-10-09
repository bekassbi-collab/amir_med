(() => {
const text={ru:{hint:'Листайте карточки влево →',previous:'Предыдущая карточка',next:'Следующая карточка',services:'Услуги и комплексные программы',team:'Наши специалисты'},kk:{hint:'Карточкаларды солға сырғытыңыз →',previous:'Алдыңғы карточка',next:'Келесі карточка',services:'Қызметтер мен кешенді бағдарламалар',team:'Біздің мамандар'}};
const collections=[['.service-grid','services'],['.team-grid','team']].map(([selector,key])=>{
 const track=document.querySelector(selector);if(!track)return null;
 track.tabIndex=0;track.setAttribute('role','region');
 const nav=document.createElement('div');nav.className='carousel-nav';nav.innerHTML='<span class="carousel-hint"></span><div class="carousel-arrows"><button type="button" class="carousel-arrow" data-back>←</button><button type="button" class="carousel-arrow" data-next>→</button></div>';track.before(nav);
 const back=nav.querySelector('[data-back]'),next=nav.querySelector('[data-next]');
 function move(direction){const card=track.firstElementChild;if(!card)return;const gap=parseFloat(getComputedStyle(track).gap)||0;track.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 function update(){const t=text[document.documentElement.lang==='kk'?'kk':'ru'];nav.querySelector('.carousel-hint').textContent=t.hint;track.setAttribute('aria-label',t[key]);back.setAttribute('aria-label',t.previous);next.setAttribute('aria-label',t.next);back.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=track.scrollWidth-track.clientWidth-2;nav.hidden=track.scrollWidth<=track.clientWidth+2;}
 back.onclick=()=>move(-1);next.onclick=()=>move(1);track.addEventListener('scroll',update,{passive:true});track.addEventListener('keydown',e=>{if(e.target!==track)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1);}});new ResizeObserver(update).observe(track);new MutationObserver(()=>{track.scrollLeft=0;update();}).observe(track,{childList:true});update();return update;
}).filter(Boolean);
new MutationObserver(()=>collections.forEach(update=>update())).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
