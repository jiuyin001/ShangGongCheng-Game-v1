(function(root){
 'use strict';
 const D=typeof module!=='undefined'?require('./trash-data.js'):root.EcoTrash;
 const cats=D.categories.map(c=>c.id),rand=(n,rng)=>Math.floor(rng()*n),pick=(array,rng)=>array[rand(array.length,rng)],pts=(module,key,fallback)=>{const v=Number(root.EcoAdminPoints?.[module]?.[key]);return Number.isFinite(v)?v:fallback};
 function shuffle(a,rng=Math.random){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rand(i+1,rng);[a[i],a[j]]=[a[j],a[i]]}return a}
 const itemFor=(cat,rng=Math.random)=>pick(D.forCategory(cat),rng);
 function createSort(rng=Math.random){return {queue:shuffle(cats.flatMap(c=>shuffle(D.forCategory(c),rng).slice(0,3)),rng),index:0,score:0,correct:0,wrongItems:[],done:false}}
 function answerSort(s,cat){if(s.done)return null;const item=s.queue[s.index],correct=item.category===cat;s.score+=correct?pts('sorter','correct',10):pts('sorter','wrong',-5);s.correct+=correct?1:0;if(!correct)s.wrongItems.push({item:item.id,expected:item.category,chosen:cat});s.index++;s.done=s.index===s.queue.length;return {correct,item,score:s.score,done:s.done,passed:s.done&&s.score>=60}}

 const ring=[[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],[8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],[13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],[6,0]];
 const homes=[[[7,1],[7,2],[7,3],[7,4],[7,5]],[[1,7],[2,7],[3,7],[4,7],[5,7]],[[7,13],[7,12],[7,11],[7,10],[7,9]],[[13,7],[12,7],[11,7],[10,7],[9,7]]];
 function createLudo({mode='single',humans=4,seat=0,rng=Math.random}={}){
  const seats=mode==='single'?[seat,(seat+2)%4]:humans===2?[0,2]:Array.from({length:humans},(_,i)=>i);
  return {rng,mode,players:seats.map((i,index)=>({seat:i,category:cats[i],human:mode==='multi'||index===0,name:mode==='single'?(index===0?'我':'电脑'):String(arguments[0]?.names?.[index]||'玩家'+(index+1)).slice(0,16),pieces:[-1],rank:null,score:0,correct:0})),turn:0,dice:0,phase:'roll',pending:null,history:[],wrongItems:[],ranks:[],score:0,correct:0,lastMove:null};
 }
 const worldCell=(p,step)=>((p.seat*13+step)%52+52)%52;
 function stepCell(p,step){if(step<0)return null;if(step<52)return ring[worldCell(p,step)];if(step<57)return homes[p.seat][step-52];return [7,7]}
 function nextTurn(s,extra=false){if(extra&&!s.players[s.turn].rank)return;const count=s.players.length;for(let i=0;i<count;i++){s.turn=(s.turn+1)%count;if(!s.players[s.turn].rank){s.phase='roll';s.pending=null;return s.turn}}s.phase='done';return -1}
 function rollLudo(s){if(s.phase!=='roll')return null;s.dice=1+rand(6,s.rng);s.phase='rollResult';s.history.unshift({player:s.players[s.turn].name,seat:s.players[s.turn].seat,dice:s.dice,answer:'点数已定格，正在答题'});s.history=s.history.slice(0,200);return s.dice}
 function confirmLudoRoll(s){if(s.phase!=='rollResult')return false;s.phase='choose';if(s.history[0])s.history[0].answer='已自动进入答题';return true}
 function chooseLudo(s,index){
  if(s.phase!=='choose')return null;const p=s.players[s.turn],from=p.pieces[index];if(from===undefined||from===57)return null;
  let target=from<0?s.dice-1:from+s.dice;if(target>57)target=57; // 超出终点不回退，直接算到达终点
  const stops=[target];let jump=0;
  if(target<52&&cats[worldCell(p,target)%4]===p.category){const fly=[7,20,33,46].includes(worldCell(p,target));jump=fly?12:4;target=Math.min(57,target+jump);stops.push(target)}
  const questions=[target<52?(s.board?.[worldCell(p,target)]||itemFor(cats[worldCell(p,target)%4],s.rng)):itemFor(p.category,s.rng)];
  // 修复飞行棋跳格：记录每一步经过格子，避免动画直接从起点跳终点导致视觉跳格
  const route=[];let cursor=from<0?-1:from;let guard=0;while(cursor!==target&&guard++<60){cursor++;if(cursor>57)cursor=57;route.push(cursor)}
  s.pending={piece:index,from,target,stops:route.length?route:[target],questions,index:0,jump};s.phase='quiz';return s.pending;
 }
 function answerLudo(s,cat){
  if(s.phase!=='quiz')return null;const pending=s.pending,item=pending.questions[pending.index],correct=item.category===cat;
  if(!correct){s.wrongItems.push({item:item.id,expected:item.category,chosen:cat});s.history[0].answer='答错，原地不动';s.phase='roll';s.pending=null;nextTurn(s,false);return {correct:false,item,moved:false}}
  s.correct++;s.score+=pts('ludo','correct',10);s.players[s.turn].score+=pts('ludo','correct',10);s.players[s.turn].correct++;pending.index++;if(pending.index<pending.questions.length)return {correct:true,item,moved:false};
  const p=s.players[s.turn];p.pieces[pending.piece]=pending.target;s.lastMove={seat:p.seat,from:pending.from,to:pending.target,stops:pending.stops.slice()};let captured=0;
  if(pending.target<52){const cell=worldCell(p,pending.target);if(![0,13,26,39].includes(cell))for(const opponent of s.players)if(opponent!==p)opponent.pieces=opponent.pieces.map(step=>{if(step>=0&&step<52&&worldCell(opponent,step)===cell){captured++;return -1}return step})}
  if(p.pieces.every(step=>step===57)){p.rank=s.ranks.length+1;s.ranks.push(p.seat)}
  s.history[0].answer='答对，前进'+(pending.jump?'并跳格':'')+(captured?'，击回'+captured+'枚':'');s.phase='roll';s.pending=null;
  const singlePlayerFinished=s.mode==='single'&&p.rank;
  if(singlePlayerFinished||s.ranks.length>=s.players.length-1){if(s.ranks.length>=s.players.length-1){for(const remaining of s.players){if(!remaining.rank){remaining.rank=s.players.length;s.ranks.push(remaining.seat)}}}s.phase='done'}else nextTurn(s,false);
  return {correct:true,item,moved:true,captured,rank:p.rank,done:s.phase==='done'};
 }
 function makeBoard(s){s.board=Array.from({length:52},(_,i)=>itemFor(cats[i%4],s.rng));return s}

 function createRunner(level=0,rng=Math.random){return {level,rng,elapsed:0,spawnAt:.75,objects:[],lane:1,lanes:3,target:cats[0],targetIndex:0,hintUntil:0,score:0,peak:0,correct:0,wrong:0,wrongItems:[],spawnCount:0,catQueue:[],duration:level===2?null:15,goal:level===2?null:[20,25][level],done:false,passed:false,events:[]}}
 function runnerCat(s){if(!s.catQueue||!s.catQueue.length)s.catQueue=shuffle(cats.slice(),s.rng);return s.catQueue.pop()}
 function moveRunner(s,lane){if(s.done||![0,1,2].includes(lane))return false;s.lane=lane;return true}
 function advanceRunner(s,dt){
  if(s.done)return [];s.elapsed+=dt;s.targetIndex=Math.floor(s.elapsed/10)%4;s.target=cats[s.targetIndex];const events=[];
  const speed=s.level===0?.4:s.level===1?.44:Math.min(.7,.4+s.elapsed/40);
  if(s.elapsed>=s.spawnAt){s.spawnCount++;const hint=s.spawnCount%9===0;const lane=(s.spawnCount-1)%3;const item=hint?null:itemFor(runnerCat(s),s.rng);s.objects.push({id:s.spawnCount*3+lane,lane,x:1.3,item,hint,targetAt:s.target});s.spawnAt=s.elapsed+(s.level===0?.9:s.level===1?.85:.8)}
  const caught=new Set();s.objects.forEach(o=>{const before=o.x;o.x-=dt*speed;if(o.lane===s.lane&&before>.14&&o.x<=.14){caught.add(o);if(o.hint){s.hintUntil=s.elapsed+8;events.push({hint:true,correct:true,lane:o.lane})}else if(o.item){const correct=o.item.category===s.target;s.score+=correct?pts('runner','correct',10):pts('runner','wrong',-10);s.peak=Math.max(s.peak,s.score);s.correct+=correct?1:0;s.wrong+=correct?0:1;if(!correct)s.wrongItems.push({item:o.item.id,expected:o.item.category,chosen:s.target});events.push({correct,item:o.item,lane:o.lane,score:s.score})}}});const removed=[];s.objects=s.objects.filter(o=>{if(caught.has(o))return false;if(o.x>-.12)return true;removed.push(o);return false});for(const o of removed){if(o.item&&o.item.category===o.targetAt&&!s.wrongItems.some(x=>x.item===o.item.id)){s.wrongItems.push({item:o.item.id,expected:o.item.category,chosen:'missed'});events.push({missed:true,item:o.item,lane:o.lane})}}s.events=events;
  if(s.duration!==null&&s.elapsed>=s.duration){s.done=true;s.passed=s.score>=s.goal}return events;
 }
 function matches(board,n=6){const found=new Set();for(let r=0;r<n;r++)for(let c=0;c<n;c++){const i=r*n+c,cat=board[i]?.category;if(!cat)continue;if(c<=n-3&&board[i+1]?.category===cat&&board[i+2]?.category===cat){let k=c;while(k<n&&board[r*n+k]?.category===cat)found.add(r*n+k++)}if(r<=n-3&&board[i+n]?.category===cat&&board[i+2*n]?.category===cat){let k=r;while(k<n&&board[k*n+c]?.category===cat)found.add(k++*n+c)}}return [...found]}
 const adjacent=(a,b,n=6)=>Math.abs(Math.floor(a/n)-Math.floor(b/n))+Math.abs(a%n-b%n)===1;
 function possibleMove(board,n=6){for(let a=0;a<board.length;a++)for(const b of [a+1,a+n])if(b<board.length&&adjacent(a,b,n)){const copy=board.slice();[copy[a],copy[b]]=[copy[b],copy[a]];if(matches(copy,n).length)return [a,b]}return null}
 function freshGrid(rng=Math.random,n=6){for(let trial=0;trial<100;trial++){const b=[];for(let r=0;r<n;r++)for(let c=0;c<n;c++){let choices=cats.filter(cat=>!(c>=2&&b[r*n+c-1].category===cat&&b[r*n+c-2].category===cat)&&!(r>=2&&b[(r-1)*n+c].category===cat&&b[(r-2)*n+c].category===cat));b.push(itemFor(pick(choices,rng),rng))}if(possibleMove(b,n))return b}throw Error('Could not build playable grid')}
 function createMatch(level=0,rng=Math.random){return {level,rng,n:6,board:freshGrid(rng),score:0,peak:0,elapsed:0,duration:level===2?null:30,goal:level===2?null:[300,500][level],done:false,passed:false,cascades:0}}
 function advanceMatch(s,dt){if(s.done)return;s.elapsed+=dt;if(s.duration!==null&&s.elapsed>=s.duration){s.done=true;s.passed=s.score>=s.goal}}
 function swapMatch(s,a,b){if(s.done||!adjacent(a,b,s.n))return null;const original=s.board.slice();[s.board[a],s.board[b]]=[s.board[b],s.board[a]];let remove=matches(s.board,s.n);if(!remove.length){s.board=original;const penalty=pts('match','invalid',-5);s.score+=penalty;advanceMatch(s,0);return {correct:false,points:penalty,waves:[]}}
  const waves=[];let points=0;
  for(let wave=0;remove.length&&wave<20;wave++){const set=new Set(remove);waves.push(remove);points+=remove.length*pts('match','clear',10);for(let c=0;c<s.n;c++){const kept=[];for(let r=s.n-1;r>=0;r--){const i=r*s.n+c;if(!set.has(i))kept.push(s.board[i])}for(let r=s.n-1;r>=0;r--)s.board[r*s.n+c]=kept[s.n-1-r]||pick(D.items,s.rng)}remove=matches(s.board,s.n)}
  s.score+=points;s.peak=Math.max(s.peak,s.score);s.cascades=waves.length;if(remove.length||!possibleMove(s.board,s.n))s.board=freshGrid(s.rng);return {correct:true,points,waves};
 }
 function shuffleMatch(s){if(s.done)return;s.score+=pts('match','shuffle',-10);s.board=freshGrid(s.rng);advanceMatch(s,0)}
 function hintMatch(s){if(s.done)return null;s.score+=pts('match','hint',-5);advanceMatch(s,0);return possibleMove(s.board,s.n)}
 function matchHintTiles(board,n=6){const set=new Set(matches(board,n));for(let a=0;a<board.length;a++)for(const b of [a+1,a+n])if(b<board.length&&adjacent(a,b,n)){const copy=board.slice();[copy[a],copy[b]]=[copy[b],copy[a]];const hit=matches(copy,n);if(hit.length){set.add(a);set.add(b);hit.forEach(i=>set.add(i))}}return [...set]}
 const rankPoints=rank=>{const configured=root.EcoAdminPoints?.ludo?.rank;return Array.isArray(configured)&&configured.length===4?Math.max(0,Number(configured[rank-1])||0):([100,75,50,25][rank-1]||0)};
 const api={shuffle,itemFor,createSort,answerSort,ring,homes,createLudo,makeBoard,worldCell,stepCell,rollLudo,confirmLudoRoll,chooseLudo,answerLudo,createRunner,moveRunner,advanceRunner,matches,adjacent,possibleMove,matchHintTiles,freshGrid,createMatch,advanceMatch,swapMatch,shuffleMatch,hintMatch,rankPoints};root.EcoGameEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
