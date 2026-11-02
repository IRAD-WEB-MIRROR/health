/* Ministry of Health of the ISEZ - site script */
(function(){
var T={
en:{site_t1:"MINISTRY OF HEALTH",site_t2:"Irad Special Economic Zone",hotline:"Hotline",amb:"Ambulance",vi:"Version for the visually impaired",vi_off:"Normal version",duty_h:"Pharmacies open round the clock",all_pharm:"All state pharmacies »",useful:"Useful links",visitors:"Visitors today:",since:"since 12.03.2009",
m_home:"Home",m_about:"About the Ministry",m_lead:"Leadership",m_hosp:"Hospitals and polyclinics",m_pharm:"State pharmacies",m_med:"Essential medicines",m_vacc:"Vaccination",m_news:"News",m_docs:"Documents",m_vac:"Vacancies",m_pat:"For patients",m_cont:"Contacts",
days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]},
ir:{site_t1:"SALAMATTIK SAKTOO MINISTRLIGI",site_t2:"Irad Atayın Ekonomikalık Zonası",hotline:"Ishenim linyası",amb:"Tez jardam",vi:"Köz azız körgöndör üchün",vi_off:"Kadimki versiya",duty_h:"Tünkü-kündüzü ishtegen dariykanalar",all_pharm:"Bardık mamlekettik dariykanalar »",useful:"Paydaluu shiltemeler",visitors:"Bügün kirgender:",since:"12.03.2009-jıldan",
m_home:"Bashkı bet",m_about:"Ministrlik jönündö",m_lead:"Jetekchilik",m_hosp:"Oorukanalar jana poliklinikalar",m_pharm:"Mamlekettik dariykanalar",m_med:"Negizgi dari-darmekter",m_vacc:"Emdöö",m_news:"Jañılıktar",m_docs:"Dokumentter",m_vac:"Bosh orundar",m_pat:"Bemorlor üchün",m_cont:"Baylanısh",
days:["Jekshembi","Düyshömbü","Sheyshembi","Sharshembi","Beyshembi","Juma","Ishembi"],months:["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"]},
ru:{site_t1:"МИНИСТЕРСТВО ЗДРАВООХРАНЕНИЯ",site_t2:"Ирадская особая экономическая зона",hotline:"Горячая линия",amb:"Скорая помощь",vi:"Версия для слабовидящих",vi_off:"Обычная версия",duty_h:"Круглосуточные аптеки",all_pharm:"Все государственные аптеки »",useful:"Полезные ссылки",visitors:"Посетителей сегодня:",since:"с 12.03.2009",
m_home:"Главная",m_about:"О министерстве",m_lead:"Руководство",m_hosp:"Больницы и поликлиники",m_pharm:"Государственные аптеки",m_med:"Основные лекарства",m_vacc:"Вакцинация",m_news:"Новости",m_docs:"Документы",m_vac:"Вакансии",m_pat:"Пациентам",m_cont:"Контакты",
days:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],months:["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]}};
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}
function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var lang=get("moh_lang")||"en";if(!T[lang])lang="en";
function $(id){return document.getElementById(id)}
function apply(){
  var t=T[lang];
  var els=document.querySelectorAll("[data-i]");
  for(var i=0;i<els.length;i++){var k=els[i].getAttribute("data-i");if(k==="vi"){els[i].textContent=document.body.className.indexOf("vi")>=0?t.vi_off:t.vi;continue}if(t[k])els[i].textContent=t[k];}
  var d=new Date(),el=$("today");
  if(el)el.textContent=lang==="en"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear():
    lang==="ru"?t.days[d.getDay()]+", "+d.getDate()+" "+t.months[d.getMonth()]+" "+d.getFullYear()+" г.":d.getFullYear()+"-jılı "+d.getDate()+"-"+t.months[d.getMonth()]+", "+t.days[d.getDay()].toLowerCase();
  document.documentElement.lang=lang==="ir"?"ky":lang;
}
var ls=document.querySelectorAll("[data-lang]");
for(var i=0;i<ls.length;i++)ls[i].onclick=function(e){e.preventDefault();lang=this.getAttribute("data-lang");set("moh_lang",lang);apply()};
if(get("moh_vi")==="1")document.body.className+=" vi";
var vi=$("vi");if(vi)vi.onclick=function(e){e.preventDefault();var on=document.body.className.indexOf("vi")>=0;document.body.className=on?document.body.className.replace(/\s*vi/g,""):document.body.className+" vi";set("moh_vi",on?"0":"1");apply()};
apply();
/* visitor counter: grows through the day */
var c=$("cnt");if(c){var n=new Date(),day=Math.floor(n.getTime()/864e5),mins=n.getHours()*60+n.getMinutes();var base=380+(day*7919)%260;var v=base+Math.floor(mins*(0.9+((day*31)%7)/10));c.textContent=String(v).replace(/\B(?=(\d{3})+(?!\d))/g," ")}
/* filters */
function filt(rows,fn){for(var i=0;i<rows.length;i++)rows[i].style.display=fn(rows[i])?"":"none"}
var fp=$("fplace"),fk=$("fkind"),fq=$("fq");
if(fp){var run=function(){var p=fp.value,k=fk.value,q=fq.value.toLowerCase();var rows=document.querySelectorAll("table.fac tr[data-place]");
  filt(rows,function(r){return(!p||r.getAttribute("data-place")===p)&&(!k||r.getAttribute("data-kind")===k)&&(!q||r.textContent.toLowerCase().indexOf(q)>=0)});
  var secs=document.querySelectorAll("[data-sec]");for(var i=0;i<secs.length;i++){var s=secs[i].getAttribute("data-sec");var vis=document.querySelectorAll("table.fac[data-sec='"+s+"'] tr[data-place]");var any=false;for(var j=0;j<vis.length;j++)if(vis[j].style.display!=="none")any=true;secs[i].style.display=any?"":"none"}};
  fp.onchange=fk.onchange=run;fq.oninput=run}
var pp=$("pplace");if(pp)pp.onchange=function(){var p=pp.value;filt(document.querySelectorAll("#ptab tr[data-place]"),function(r){return!p||r.getAttribute("data-place")===p})};
var mq=$("mq"),mav=$("mav");
if(mq){var mrun=function(){var q=mq.value.toLowerCase(),a=mav.checked;filt(document.querySelectorAll("#mtab tr[data-st]"),function(r){return(!q||r.textContent.toLowerCase().indexOf(q)>=0)&&(!a||r.getAttribute("data-st")==="")})};mq.oninput=mrun;mav.onchange=mrun}
/* vaccination calculator */
var cb=$("calcb");
if(cb)cb.onclick=function(){var v=$("dob").value,out=$("calcout");if(!v){out.textContent="Please enter the date of birth.";return}
  var b=new Date(v+"T00:00:00");if(isNaN(b)){out.textContent="Please enter the date of birth.";return}
  var cal=JSON.parse($("calcdata").textContent),now=new Date(),h='<table class="t"><tr><th>Approximate date</th><th>Vaccination</th><th></th></tr>';
  for(var i=0;i<cal.length;i++){var m=cal[i][0],d=new Date(b.getTime());if(m<1)d.setDate(d.getDate()+(m===0?0:4));else{d.setMonth(d.getMonth()+Math.floor(m));if(m%1)d.setDate(d.getDate()+15)}
    var dd=("0"+d.getDate()).slice(-2)+"."+("0"+(d.getMonth()+1)).slice(-2)+"."+d.getFullYear();
    h+="<tr><td>"+dd+"</td><td>"+cal[i][1]+"</td><td>"+(d<now?'<span class="small">past: check the card</span>':'<span class="ok">due</span>')+"</td></tr>"}
  out.innerHTML=h+"</table>"};
})();
