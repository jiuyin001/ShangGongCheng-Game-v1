
(function(){
'use strict';
// 垃圾类别统一颜色（湿=棕 可回收=蓝 有害=红 干=灰）
const catColors={brown:'#8B5A2B',blue:'#1677d2',red:'#d9363e',black:'#6b6f76'};
function catColor(c){return catColors[c]||catColors.black}
window.wasteCategoryColor=catColor;
window.ECO_CATEGORY_COLORS=Object.assign({},catColors);

// 结果文字颜色同步：让“湿垃圾/可回收物/有害垃圾/干垃圾”出现时自动着色
function colorWasteWords(){
 document.querySelectorAll('p,div,h3,span,strong,b,li,td').forEach(el=>{
   if(el.children.length) return;
   let html=el.innerHTML;
   html=html.replace(/(湿垃圾|可回收物|有害垃圾|干垃圾)/g,
     '<em class="waste-word-$1">$1</em>');
   if(html!==el.innerHTML) el.innerHTML=html;
 });
}
function addStyles(){
 const s=document.createElement('style');
 s.textContent=`
 .waste-word-湿垃圾{color:#8B5A2B;font-style:normal;font-weight:800}
 .waste-word-可回收物{color:#1677d2;font-style:normal;font-weight:800}
 .waste-word-有害垃圾{color:#d9363e;font-style:normal;font-weight:800}
 .waste-word-干垃圾{color:#6b6f76;font-style:normal;font-weight:800}
 .gp-match-tile{transition:.2s}
 .gp-match-tile img{object-fit:contain}
 `;
 document.head.appendChild(s);
}
window.shouldShowFirstTutorial=function(id){
 return localStorage.getItem('tutorial_'+id)!=='done';
};
window.finishFirstTutorial=function(id){localStorage.setItem('tutorial_'+id,'done')};

window.addEventListener('DOMContentLoaded',()=>{
 addStyles();
 const observer=new MutationObserver(()=>{
   colorWasteWords();
 });
 observer.observe(document.body,{childList:true,subtree:true});
 colorWasteWords();
});
})();


// V52验收增强补丁
(function(){
'use strict';
// 垃圾类别统一颜色（湿垃圾修正为棕色）
window.ECO_CATEGORY_COLORS={
  brown:'#8B5A2B',
  blue:'#1677D2',
  red:'#D9363E',
  black:'#666666'
};

// 防止声音切换页面丢失
try{
 const key='eco_sound_enabled';
 if(localStorage.getItem(key)===null) localStorage.setItem(key,'true');
 window.EcoSoundState={
   get:()=>localStorage.getItem(key)!=='false',
   set:v=>localStorage.setItem(key,v?'true':'false')
 };
}catch(e){}

// 首次游戏教程状态（按游戏独立）
window.EcoTutorial={
 shouldShow:function(gameId,exhibition){
   if(exhibition) return false;
   return localStorage.getItem('tutorial_done_'+gameId)!=='1';
 },
 done:function(gameId){
   localStorage.setItem('tutorial_done_'+gameId,'1');
 }
};

// 展会排行榜排序规则
window.EcoRankSort=function(a,b){
 if(Number(b.score)!==Number(a.score)) return Number(b.score)-Number(a.score);
 if(Number(a.time)!==Number(b.time)) return Number(a.time)-Number(b.time);
 return Number(a.finishedAt)-Number(b.finishedAt);
};

})();
