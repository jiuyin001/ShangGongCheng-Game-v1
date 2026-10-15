(function(root){
  'use strict';
  const content=typeof module!=='undefined'?require('./content.js'):root.EcoContent;
  const STATE_KEY='garbage-park-v7-state',ADMIN_KEY='garbage-park-v7-admin';
  const gameIds=content.games.map(g=>g.id),lessonIds=content.lessons.map(l=>l.id);
  const journeyIds=['recyclable','hazardous','kitchen','residual'];
  const defaults=()=>({profile:{name:'环保小达人',color:'green',title:'',frame:''},completed:{},lessons:[],journey:[],history:[],wallet:{grants:{},redemptions:{},runs:{},learning:{}} ,review:{items:{},games:{sorter:[],runner:[],ludo:[],match:[]}},records:{runner:{unlocked:0,best:0,cleared:[],rewardBestByLevel:{}},match:{unlocked:0,best:0,cleared:[],rewardBestByLevel:{}},sorter:{best:0},ludo:{best:0},quiz:{best:0}},settings:{music:false,sfx:true,volume:.36,sfxVolume:.65,reduceMotion:false},awards:{},texts:{},tutorialSeen:false});
  const cleanTexts=value=>Object.fromEntries(Object.entries(value||{}).filter(([key,v])=>content.fields[key]&&typeof v==='string').map(([key,v])=>[key,v.slice(0,5000)]));
  function normalizeWallet(value,completed){
    const result={grants:{},redemptions:{},runs:{},learning:{}},v=value&&typeof value==='object'?value:null;
    if(!v){for(const [id,record] of Object.entries(completed))result.grants[id]={amount:content.economy.gameReward,source:record.source,time:Number(record.time)||0};return result}
    for(const [id,record] of Object.entries(v.grants||{}))if(gameIds.includes(id)&&record&&Number.isSafeInteger(record.amount)&&record.amount>0&&['preview','game'].includes(record.source))result.grants[id]={amount:record.amount,source:record.source,time:Number(record.time)||0};
    for(const [id,r] of Object.entries(v.runs||{}))if(id.length<120&&r&&gameIds.includes(r.game)&&Number.isSafeInteger(r.amount)&&r.amount>=0)result.runs[id]={game:r.game,amount:r.amount,score:Number(r.score)||0,rank:Number(r.rank)||0,level:Number(r.level)||0,time:Number(r.time)||0};
    for(const [id,r] of Object.entries(v.learning||{}))if(/^[A-Za-z0-9_-]{1,80}$/.test(id)&&r&&Number.isSafeInteger(r.amount)&&r.amount>=0&&r.amount<=100000)result.learning[id]={amount:r.amount,time:Number(r.time)||0};
    let balance=Object.values(result.grants).reduce((sum,r)=>sum+r.amount,0)+Object.values(result.runs).reduce((sum,r)=>sum+r.amount,0)+Object.values(result.learning).reduce((sum,r)=>sum+r.amount,0);
    const entries=Object.entries(v.redemptions||{}).sort((a,b)=>(Number(a[1]?.time)||0)-(Number(b[1]?.time)||0));
    for(const [key,record] of entries){
      if(!record||!Number.isSafeInteger(record.cost)||record.cost<0||record.cost>balance)continue;
      const itemId=String(record.itemId||key),legacy=record.itemId?false:true,item=content.shop.find(x=>x.id===itemId);
      if(legacy&&!item)continue;
      const type=record.type||item?.type||'virtual';
      result.redemptions[key]={itemId,cost:record.cost,time:Number(record.time)||0,type,status:['pending','fulfilled','cancelled'].includes(record.status)?record.status:'pending',itemName:String(record.itemName||item?.name||itemId).slice(0,100)};
      balance-=record.cost;
    }
    return result;
  }
  function normalize(value){
    const s=defaults(),v=value&&typeof value==='object'?value:{};
    s.profile={...s.profile,...v.profile};s.profile.name=String(s.profile.name||'环保小达人').slice(0,24);s.profile.color=['green','blue','orange','purple'].includes(s.profile.color)?s.profile.color:'green';
    s.completed=Object.fromEntries(Object.entries(v.completed||{}).filter(([id,val])=>gameIds.includes(id)&&val&&['preview','game'].includes(val.source)));
    s.lessons=Array.isArray(v.lessons)?[...new Set(v.lessons.filter(id=>lessonIds.includes(id)))]:[];
    s.journey=Array.isArray(v.journey)?[...new Set(v.journey.filter(id=>journeyIds.includes(id)))]:[];
    s.history=Array.isArray(v.history)?v.history.filter(h=>h&&['view','lesson','preview','game','reset','points','redeem','equip','run','quiz'].includes(h.type)&&Number.isFinite(Number(h.time))).slice(0,100):[];
    s.wallet=normalizeWallet(v.wallet,s.completed);
    const reviewItems=v.review?.items&&typeof v.review.items==='object'?v.review.items:{};
    const reviewGames=v.review?.games&&typeof v.review.games==='object'?v.review.games:{};
    const cleanedGames={sorter:[],runner:[],ludo:[],match:[]};
    for(const gid of ['sorter','runner','ludo','match']){const list=Array.isArray(reviewGames[gid])?reviewGames[gid]:[];cleanedGames[gid]=list.filter(w=>w&&typeof w==='object'&&typeof w.item==='string'&&w.item.length<60).slice(0,200).map(w=>({item:w.item,expected:String(w.expected||'').slice(0,20),chosen:String(w.chosen||'').slice(0,20),source:w.source==='formal'?'formal':'practice',restored:w.restored===true,addedAt:Number(w.addedAt)||0,restoredAt:Number(w.restoredAt)||0}))}
    s.review={items:Object.fromEntries(Object.entries(reviewItems).filter(([id,r])=>/^[A-Za-z0-9_-]{1,80}$/.test(id)&&r&&typeof r==='object').map(([id,r])=>[id,{wrongCount:Math.max(0,Math.floor(Number(r.wrongCount)||0)),attempts:Math.max(0,Math.floor(Number(r.attempts)||0)),mastered:r.mastered===true,lastWrongAt:Number(r.lastWrongAt)||0,masteredAt:Number(r.masteredAt)||0}])),games:cleanedGames};
    for(const id of [...gameIds,'quiz']){s.records[id]={...s.records[id],...(v.records?.[id]||{})};s.records[id].best=Math.max(0,Number(s.records[id].best)||0);s.records[id].rewardBest=Math.max(0,Number(s.records[id].rewardBest)||0);s.records[id].bestRank=Math.max(0,Math.min(4,Math.floor(Number(s.records[id].bestRank)||0)));if(['runner','match'].includes(id)){s.records[id].unlocked=Math.max(0,Math.min(2,Number(s.records[id].unlocked)||0));const cleared=Array.isArray(s.records[id].cleared)?s.records[id].cleared.filter(n=>n===0||n===1):[];if(!cleared.length&&(s.records[id].unlocked||0)>0){for(let k=0;k<Math.min(2,s.records[id].unlocked||0);k++)cleared.push(k)}s.records[id].cleared=cleared;const byLevel=s.records[id].rewardBestByLevel&&typeof s.records[id].rewardBestByLevel==='object'?s.records[id].rewardBestByLevel:{};if(!Object.keys(byLevel).length&&(s.records[id].rewardBest||0)>0)byLevel[0]=s.records[id].rewardBest;for(const lv of [0,1,2])byLevel[lv]=Math.max(0,Number(byLevel[lv])||0);s.records[id].rewardBestByLevel=byLevel}}
    for(const type of ['title','frame'])if(!content.shop.some(item=>item.id===s.profile[type]&&item.type===type&&Object.values(s.wallet.redemptions).some(r=>r.itemId===item.id&&r.type!=='physical')))s.profile[type]='';
    s.awards=v.awards&&typeof v.awards==='object'?{...v.awards}:{};s.tutorialSeen=v.tutorialSeen===true;s.settings={...s.settings,...v.settings};['music','sfx','reduceMotion'].forEach(k=>s.settings[k]=s.settings[k]===true);s.settings.volume=Math.max(0,Math.min(1,Number(s.settings.volume)||0));s.settings.sfxVolume=Math.max(0,Math.min(1,Number(s.settings.sfxVolume??.65)||0));s.texts=cleanTexts(v.texts);return s;
  }
  function read(storage){try{return normalize(JSON.parse(storage.getItem(STATE_KEY)||'null'))}catch{return defaults()}}
  function write(storage,state){try{storage.setItem(STATE_KEY,JSON.stringify(state));return true}catch{return false}}
  function progress(state){const done=gameIds.filter(id=>state.completed[id]).length;return {done,total:4,percent:done*25,preview:gameIds.some(id=>state.completed[id]?.source==='preview')}}
  function event(state,type,item,now=Date.now(),details={}){state.history.unshift({type,item,time:now,id:now+'-'+Math.random().toString(36).slice(2,8),...details});state.history=state.history.slice(0,100);}
  function wallet(state){const records=Object.values(state.wallet.redemptions||{}),earned=Object.values(state.wallet.grants).reduce((sum,r)=>sum+r.amount,0)+Object.values(state.wallet.runs||{}).reduce((sum,r)=>sum+r.amount,0)+Object.values(state.wallet.learning||{}).reduce((sum,r)=>sum+r.amount,0),spent=records.reduce((sum,r)=>sum+r.cost,0);return {balance:earned-spent,earned,spent,owned:[...new Set(records.filter(r=>r.type!=='physical').map(r=>r.itemId))],redeemedItems:[...new Set(records.map(r=>r.itemId))],redemptions:records.map(r=>({...r})),preview:Object.values(state.wallet.grants).some(r=>r.source==='preview')}}
  function recordRun(state,id,runId,result,now=Date.now()){
    if(!gameIds.includes(id)||typeof runId!=='string'||runId.length>119)throw Error('Invalid run');state.wallet.runs=state.wallet.runs||{};
    if(state.wallet.runs[runId])return {duplicate:true,bonus:0,coins:0,credit:0,wallet:wallet(state),progress:progress(state)};
    const score=Math.max(-100,Math.min(100000,Number(result.score)||0)),peak=Math.max(0,Math.min(100000,Number(result.peak??score)||0)),rank=Math.max(1,Math.min(4,Math.floor(Number(result.rank)||4)));
    const before=wallet(state).earned;if(result.passed)complete(state,id,'game',now);const bonus=wallet(state).earned-before;
    state.records[id]=state.records[id]||{best:0,rewardBest:0,bestRank:0};
    let coins=0;
    if(id==='ludo'){
      const previous=state.records[id].bestRank||0, next=previous===0?rank:Math.min(previous,rank);
      coins=next<previous||previous===0?([100,75,50,25][next-1]-(previous===0?0:[100,75,50,25][previous-1])):0;
      state.records[id].bestRank=next;
    }else{
      const lv=Math.min(2,Math.max(0,Number(result.level)||0));
      const byLevel=state.records[id].rewardBestByLevel=state.records[id].rewardBestByLevel||{};
      const prev=Math.max(0,Number(byLevel[lv])||0);
      const rewardScore=Math.max(0,Math.min(100000,lv===2?peak:score));
      const next=Math.max(prev,rewardScore);
      byLevel[lv]=next;
      coins=Math.max(0,Math.floor(next/10)-Math.floor(prev/10));
      state.records[id].rewardBest=Math.max(state.records[id].rewardBest||0,next);
    }
    state.wallet.runs[runId]={game:id,amount:coins,score,rank:id==='ludo'?rank:0,level:Number(result.level)||0,time:now};
    state.records[id].best=Math.max(state.records[id].best,peak);
    if(['runner','match'].includes(id)&&result.passed){state.records[id].unlocked=Math.max(state.records[id].unlocked,Math.min(2,(Number(result.level)||0)+1));const lv=Number(result.level)||0;if(lv===0||lv===1){const cleared=state.records[id].cleared||(state.records[id].cleared=[]);if(!cleared.includes(lv))cleared.push(lv)}}
    event(state,'run',id,now,{score,amount:coins,rank:id==='ludo'?rank:0});return {duplicate:false,bonus,coins,credit:bonus+coins,wallet:wallet(state),progress:progress(state)};
  }
  function recordQuiz(state,correct,now=Date.now()){state.records.quiz.best=Math.max(state.records.quiz.best,correct*10);event(state,'quiz','classroom',now,{score:correct*10});return {score:correct*10,passed:correct>=8}}
  function recordLearningAnswer(state,question,correct,now=Date.now()){
    if(!question||typeof question.id!=='string'||!/^[A-Za-z0-9_-]{1,80}$/.test(question.id))throw Error('Invalid learning question');
    state.review=state.review||{items:{}};state.review.items=state.review.items||{};state.wallet.learning=state.wallet.learning||{};
    const id=question.id,previous=state.review.items[id]||{wrongCount:0,attempts:0,mastered:false,lastWrongAt:0,masteredAt:0};previous.attempts=(Number(previous.attempts)||0)+1;
    let points=0;
    if(correct){previous.mastered=true;previous.masteredAt=now;if(!state.wallet.learning[id]){points=Math.max(0,Math.min(100000,Math.floor(Number(root.EcoAdminPoints?.knowledge??10)||0)));state.wallet.learning[id]={amount:points,time:now};event(state,'points','learning-'+id,now,{amount:points,questionId:id,source:'learning'});}}
    else{previous.wrongCount=(Number(previous.wrongCount)||0)+1;previous.mastered=false;previous.lastWrongAt=now;}
    state.review.items[id]=previous;return {correct:!!correct,mastered:previous.mastered,points,attempts:previous.attempts,wrongCount:previous.wrongCount,pending:Object.values(state.review.items).filter(r=>!r.mastered&&r.wrongCount>0).length,wallet:wallet(state)};
  }
  function reviewStats(state){const items=Object.values(state.review?.items||{}),pending=items.filter(r=>r.wrongCount>0&&!r.mastered).length,mastered=items.filter(r=>r.mastered).length;return {pending,mastered,total:items.length,learningPoints:Object.values(state.wallet?.learning||{}).reduce((n,r)=>n+(Number(r.amount)||0),0)}}
  function gameWrongList(state){state.review=state.review||{items:{},games:{}};state.review.games=state.review.games||{sorter:[],runner:[],ludo:[],match:[]};return state.review.games}
  function recordGameWrong(state,game,wrongItems,source='formal'){
    const list=gameWrongList(state)[game];if(!Array.isArray(list))return 0;
    let added=0;
    for(const w of (Array.isArray(wrongItems)?wrongItems:[])){
      if(!w||typeof w.item!=='string'||!w.item)continue;
      const idx=list.findIndex(x=>x.item===w.item);
      if(idx>=0){const it=list[idx];if(source==='formal'&&it.source==='practice'){it.source='formal';it.expected=String(w.expected||it.expected);it.chosen=String(w.chosen||'');if(!it.restored)added++}continue}
      list.push({item:w.item,expected:String(w.expected||''),chosen:String(w.chosen||''),source:source==='formal'?'formal':'practice',restored:false,addedAt:Date.now(),restoredAt:0});added++;
    }
    return added;
  }
  function gameReviewStats(state){const g=gameWrongList(state);const out={};let pending=0,total=0;for(const game of ['sorter','runner','ludo','match']){const list=g[game]||[];const p=list.filter(x=>!x.restored).length;out[game]={pending:p,total:list.length};pending+=p;total+=list.length}return {pending,total,byGame:out}}
  function restoreGameWrong(state,game,item,cat,now=Date.now()){
    const list=gameWrongList(state)[game]||[];const idx=list.findIndex(x=>x.item===item&&!x.restored);
    if(idx<0)return {ok:false,reason:'absent'};
    const it=list[idx];
    if(it.expected!==cat)return {ok:false,reason:'wrong',expected:it.expected};
    it.restored=true;it.restoredAt=now;
    state.wallet.learning=state.wallet.learning||{};
    const key='game-'+game+'-'+item;
    let points=0;
    if(it.source==='formal'&&!state.wallet.learning[key]){
      points=Math.max(0,Math.min(100000,Math.floor(Number(root.EcoAdminPoints?.[game]?.correct??10)||0)));
      if(points>0){state.wallet.learning[key]={amount:points,time:now};event(state,'points',key,now,{amount:points,source:'game-review'})}
    }
    return {ok:true,restored:true,points,source:it.source,wallet:wallet(state)};
  }
  function grant(state,id,source,now){if(state.wallet.grants[id]){if(source==='game')state.wallet.grants[id].source='game';return 0}const configured=root.EcoAdminPoints?.completion?.[id],amount=Number.isFinite(Number(configured))?Math.max(0,Math.min(100000,Math.floor(Number(configured)))):content.economy.gameReward;state.wallet.grants[id]={amount,source,time:now};event(state,'points',id,now,{amount});return amount}
  function complete(state,id,source='game',now=Date.now()){if(!gameIds.includes(id)||!['game','preview'].includes(source))throw Error('Invalid game completion');if(state.completed[id]){if(source==='game'&&state.completed[id].source==='preview'){state.completed[id]={source,time:now};event(state,'game',id,now);grant(state,id,source,now)}return false}state.completed[id]={source,time:now};event(state,source,id,now);grant(state,id,source,now);return true;}
  function redeem(state,id,now=Date.now(),catalog=content.shop){const item=catalog.find(item=>item.id===id);if(!item)return {ok:false,reason:'unknown'};const physical=item.type==='physical';if(!physical&&Object.values(state.wallet.redemptions).some(r=>r.itemId===id&&r.type!=='physical'))return {ok:false,reason:'owned'};if(Number.isFinite(Number(item.stock))&&Number(item.stock)<=0)return {ok:false,reason:'stock'};if(!Number.isSafeInteger(Number(item.cost))||Number(item.cost)<0)return {ok:false,reason:'price'};if(wallet(state).balance<item.cost)return {ok:false,reason:'insufficient'};const key=physical?`red-${now}-${Math.random().toString(36).slice(2,9)}`:id;state.wallet.redemptions[key]={itemId:id,cost:Number(item.cost),time:now,type:item.type||'virtual',status:physical?'pending':'fulfilled',itemName:String(item.name||id).slice(0,100)};if(!physical&&['title','frame'].includes(item.type))state.profile[item.type]=id;event(state,'redeem',id,now,{cost:Number(item.cost),redemptionId:key,type:item.type||'virtual'});return {ok:true,item:id,redemptionId:key,balance:wallet(state).balance}}
  function markRedemption(state,redemptionId,status,now=Date.now()){const r=state.wallet.redemptions?.[redemptionId];if(!r||r.type!=='physical'||!['pending','fulfilled','cancelled'].includes(status))return false;if(r.status===status)return true;if(r.status==='cancelled')return false;r.status=status;event(state,'redeem',r.itemId,now,{cost:r.cost,status,redemptionId});return true}
  function equip(state,id,now=Date.now(),catalog=content.shop){const item=catalog.find(item=>item.id===id);if(!item||item.type==='physical'||!Object.values(state.wallet.redemptions).some(r=>r.itemId===id&&r.type!=='physical'))return false;if(state.profile[item.type]!==id){state.profile[item.type]=id;event(state,'equip',id,now)}return true}
  function learn(state,id,now=Date.now()){if(!lessonIds.includes(id))throw Error('Invalid lesson');if(state.lessons.includes(id))return false;state.lessons.push(id);event(state,'lesson',id,now);return true;}
  function resetProgress(state,now=Date.now()){state.completed={};event(state,'reset','',now)}
  function cryptoEngine(){return root.crypto?.subtle?root.crypto:(typeof require==='function'?require('node:crypto').webcrypto:null)}
  const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
  const unhex=value=>Uint8Array.from(value.match(/.{2}/g)||[],x=>parseInt(x,16));
  async function hash(password,salt){const c=cryptoEngine();if(!c?.subtle)throw Error('Crypto unavailable');const material=await c.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return hex(await c.subtle.deriveBits({name:'PBKDF2',salt:unhex(salt),iterations:120000,hash:'SHA-256'},material,256));}
  function admin(storage){try{const v=JSON.parse(storage.getItem(ADMIN_KEY)||'null');return v&&v.salt&&v.hash?v:null}catch{return null}}
  async function setPassword(storage,password){if(password.length<6)throw Error('short');const c=cryptoEngine();if(!c)throw Error('crypto');const salt=hex(c.getRandomValues(new Uint8Array(16))),value={salt,hash:await hash(password,salt),version:1};storage.setItem(ADMIN_KEY,JSON.stringify(value));return value;}
  async function checkPassword(storage,password){const saved=admin(storage);if(!saved)return false;const actual=await hash(password,saved.salt);let diff=actual.length^saved.hash.length;for(let i=0;i<actual.length;i++)diff|=actual.charCodeAt(i)^(saved.hash.charCodeAt(i)||0);return diff===0;}
  function text(key,overrides={},values={}){const raw=overrides[key]??content.fields[key]?.value??key;return raw.replace(/\{(\w+)\}/g,(match,k)=>values[k]===undefined?match:String(values[k]));}
  const api={STATE_KEY,ADMIN_KEY,defaults,normalize,read,write,progress,wallet,recordRun,recordQuiz,recordLearningAnswer,reviewStats,recordGameWrong,gameWrongList,gameReviewStats,restoreGameWrong,redeem,markRedemption,equip,event,complete,learn,resetProgress,admin,setPassword,checkPassword,text,cleanTexts};root.EcoCore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
