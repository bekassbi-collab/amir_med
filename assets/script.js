(() => {
const {groups,translations}=window.CENTER_DATA;
let lang='ru', category='all';
try{const saved=localStorage.getItem('amir-med-language');if(saved==='ru'||saved==='kk')lang=saved;}catch{}
const $=s=>document.querySelector(s);
function whatsapp(service='',address=''){
const message=lang==='kk'?`Сәлеметсіз бе! AMIR MED орталығына жазылғым келеді.${service?' Қызмет: '+service+'.':''}${address?' Мекенжай: '+address+'.':''} Қабылдау уақытын айта аласыз ба?`:`Здравствуйте! Хочу записаться в AMIR MED.${service?' Услуга: '+service+'.':''}${address?' Адрес: '+address+'.':''} Подскажите доступное время приёма.`;
const offer=window.CENTER_OFFER;const suffix=offer?.active()?(lang==='ru'?' Хочу закрепить скидку: 10% на услуги, 15% на комплексы. Подскажите сумму предоплаты.':' Жеңілдікті бекіткім келеді: қызметтерге 10%, кешендерге 15%. Алдын ала төлем сомасын айтыңызшы.') : '';
return 'https://wa.me/77472052547?text='+encodeURIComponent(message+suffix);
}
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function priceMarkup(r,g){
const t=translations[lang],o=window.CENTER_OFFER,prefix=r.fromPrice&&lang==='ru'?t.from+' ':'',suffix=r.fromPrice&&lang==='kk'?' '+t.from:'';
const format=n=>escape(prefix+n.toLocaleString('ru-RU')+' ₸'+suffix);
return o?.active()?`<del>${format(r.price)}</del><span class="discount-price">${format(Math.round(r.price*(100-o.percent(g.kind))/100))}</span><small class="discount-badge">−${o.percent(g.kind)}%</small>`:format(r.price);
}
function render(){
const t=translations[lang];document.documentElement.lang=lang;document.title=t.title;$('meta[name="description"]').content=t.description;
document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t[e.dataset.i18n]);
document.querySelectorAll('[data-language]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.language===lang));});
document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=whatsapp('',a.dataset.addressKey?t[a.dataset.addressKey]:''));
$('#service-grid').innerHTML=groups.filter(g=>category==='all'||g.kind===category).map(g=>`<article class="service-card${g.kind==='package'?' package-card':''}"><div class="card-top"><span class="tag">${escape(g.kind==='package'?t.packageTag:t.procedureTag)}</span><span class="card-index">${String(groups.indexOf(g)+1).padStart(2,'0')}</span></div><h3>${escape(g[lang])}</h3>${g.kind==='package'?`<p class="package-note">${escape(g.description?.[lang] || t.packageNote)}</p><p class="package-duration">${escape(t.packageDuration)}</p>`:''}${g.included?`<div class="program-details"><h4>${escape(t.includedTitle)}</h4><ul>${g.included[lang].map(item=>`<li>${escape(item)}</li>`).join('')}</ul><p class="diagnostic-note">${escape(t.diagnosticNote)}</p></div>`:''}${window.CENTER_OFFER?.active()?`<p class="card-offer-time">${lang==='ru'?'Закрепите скидку за':'Жеңілдікті бекітіңіз:'} <strong data-offer-clock>${window.CENTER_OFFER.clock()}</strong></p>`:''}<dl>${g.rows.map(r=>`<div class="price-row"><dt>${escape(r[lang])}</dt><dd>${r.price===null?`<span class="pending">${escape(t.clarify)}</span>`:priceMarkup(r,g)}</dd></div>`).join('')}</dl><a class="service-book" href="${whatsapp(g[lang])}" target="_blank" rel="noopener noreferrer">${escape(t.askService)}</a></article>`).join('');
}
document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.language;try{localStorage.setItem('amir-med-language',lang);}catch{}render();}));
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;render();}));
window.addEventListener('offer-change',render);
render();
})();
