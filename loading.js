/*
 * 垃圾分类小达人 | 交接基准 B-10s, vanilla JS.
 * Public interface: window.GarbageLoading (documented in README and design-spec.json)
 * No network, CDN, emoji-based replacement art, or third-party dependencies.
 */
(()=>{'use strict';
 const BASE={width:1672,height:941,durationMs:10000};
 const qs=new URLSearchParams(location.search);
 const snapshot=qs.get('snapshot')==='1';
 const manual=qs.get('mode')==='manual'||window.GarbageLoadingConfig?.mode==='manual';
 const duration=Number(window.GarbageLoadingConfig?.durationMs)||BASE.durationMs;
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const $=id=>document.getElementById(id);
 const el={viewport:$('viewport'),frame:$('frame'),stage:$('stage'),scene:$('scene'),rail:$('rail'),fill:$('fill'),truck:$('truck'),number:$('number'),
    fact:$('fact-replace'),factText:$('fact-text'),next:$('fact-next'),sound:$('sound-control'),soundLabel:$('sound-label'),
    bgm:$('bgm'),music:$('music-control'),musicLabel:$('music-label'),musicVolume:$('music-volume'),ambient:$('ambient-layer'),
    complete:$('complete'),start:$('start'),debug:$('debug'),debugSlider:$('debug-progress'),debugVal:$('debug-val'),canvas:$('confetti'),live:$('live')};
 const facts=[
  '废纸、塑料、玻璃、金属等属于可回收物。',
  '废电池、废灯管和过期药品属于有害垃圾。',
  '剩菜、果皮、菜叶等是湿垃圾，请沥干后投放。',
  '用过的餐巾纸、陶瓷碎片属于干垃圾。',
  '可回收物尽量保持清洁干燥，利于循环利用。',
  '有害垃圾应单独投放，不要混入其他垃圾。',
  '湿垃圾投放前请去除塑料袋等外包装。',
  '分类小行动，上海更美好！'
 ];
 const fxCtx=el.canvas.getContext('2d');
 let currentProgress=snapshot?68:0, index=0, ready=false, started=false, frameId=0, lastTime=null, demoRunning=false;
 let confettiId=0, particles=[], confettiElapsed=0, soundEnabled=false, audioCtx=null, soundInitialized=false, soundWasOn=false, lastWheelNote=0;
 let nextUrl=window.GarbageLoadingConfig?.nextUrl||null, moveTimer=0;
 let musicEnabled=false,musicVolume=.36, musicFadeId=0,tipElapsed=0,lastManualTipAt=-100000;
 // V53: 与大厅共用全局声音偏好（页面跳转/游戏结束/返回大厅后仍保留用户设置）
 const PREF_KEY='eco-sound-prefs-v1';
 function savePrefs(){try{localStorage.setItem(PREF_KEY,JSON.stringify({music:!!musicEnabled,sfx:!!soundEnabled,volume:musicVolume,sfxVolume:musicVolume}))}catch{}}
 function loadPrefs(){try{const v=JSON.parse(localStorage.getItem(PREF_KEY)||'null');if(v&&typeof v==='object'){if(typeof v.music==='boolean')musicEnabled=v.music;if(typeof v.sfx==='boolean')soundEnabled=v.sfx;if(Number.isFinite(Number(v.volume)))musicVolume=Math.max(0,Math.min(1,Number(v.volume)));}}catch{}}
 let preloadState={total:0,loaded:0,totalWeight:0,loadedWeight:0,failed:[],done:false,running:false};
 const BINS=[
   {element:'sprite-blue',centerX:607,centerY:536,label:'可回收物 ✓',tip:0},
   {element:'sprite-brown',centerX:850,centerY:531,label:'湿垃圾 ✓',tip:2},
   {element:'sprite-red',centerX:1099,centerY:529,label:'有害垃圾 ✓',tip:1},
   {element:'sprite-black',centerX:1353,centerY:527,label:'干垃圾 ✓',tip:3}
 ];
 const dispatch=(name,detail={})=>document.dispatchEvent(new CustomEvent(name,{detail,bubbles:true}));
 const clamp=n=>Math.max(0,Math.min(100,Number(n)||0));
 function layout(){
   const scale=Math.min(window.innerWidth/BASE.width,window.innerHeight/BASE.height);
   el.frame.style.width=(BASE.width*scale)+'px';el.frame.style.height=(BASE.height*scale)+'px';
   el.stage.style.transform=`scale(${scale})`;
 }
 window.addEventListener('resize',layout,{passive:true});layout();

 // User-gesture-activated procedural SFX (no audio file fetches). Browsers prohibit autoplay.
 function synth(notes){
   if(!soundEnabled||!soundInitialized||!audioCtx)return;
   const ctx=audioCtx;
   if(ctx.state!=='running')return;
   const begin=ctx.currentTime+.015;
   notes.forEach((n,i)=>{
     const osc=ctx.createOscillator();const vol=ctx.createGain();
     const at=begin+(n.offset??i*.075),dur=n.dur??.11;
     osc.type=n.type||'sine';osc.frequency.setValueAtTime(n.f,at);
     if(n.to)osc.frequency.exponentialRampToValueAtTime(n.to,at+dur);
     vol.gain.setValueAtTime(.0001,at);
     vol.gain.exponentialRampToValueAtTime(Math.max(.0001,n.v??.058),at+.008);
     vol.gain.exponentialRampToValueAtTime(.0001,at+dur);
     osc.connect(vol);vol.connect(ctx.destination);osc.start(at);osc.stop(at+dur+.015);
   });
 }
 const sounds={click:()=>synth([{f:620,to:930,dur:.11,v:.055},{f:1080,dur:.09,v:.027,offset:.052}]),
    tip:()=>synth([{f:480,to:590,dur:.11,v:.042},{f:770,to:880,dur:.11,v:.041,offset:.085}]),
    checkpoint:()=>synth([{f:570,to:780,dur:.13,v:.03}]),
    finish:()=>synth([{f:523,dur:.17,v:.06},{f:659,dur:.17,v:.06,offset:.13},{f:784,dur:.19,v:.06,offset:.26},{f:1046,dur:.35,v:.07,offset:.39}]),
    start:()=>synth([{f:700,to:950,dur:.14,v:.06},{f:1000,to:1450,dur:.21,v:.055,offset:.12}])};
 async function enableSound(flag=true){
    soundEnabled=!!flag;
    if(soundEnabled){
      const AudioContextClass=window.AudioContext||window.webkitAudioContext;
      if(!AudioContextClass){soundEnabled=false;}
      else{
        try{audioCtx=audioCtx||new AudioContextClass();await audioCtx.resume();soundInitialized=audioCtx.state==='running';}
        catch(_){soundInitialized=false;soundEnabled=false;}
      }
    }
    el.sound.dataset.on=String(soundEnabled&&soundInitialized);
    el.sound.setAttribute('aria-pressed',String(soundEnabled&&soundInitialized));
    el.sound.setAttribute('aria-label',soundEnabled?'关闭音效':'开启音效');
    el.soundLabel.textContent=soundEnabled?'音效已开':'开启音效';
    dispatch('sound:change',{enabled:soundEnabled&&soundInitialized});
    if(soundEnabled&&!soundWasOn){sounds.click();soundWasOn=true;}
    if(!soundEnabled)soundWasOn=false;
    savePrefs();
    return soundEnabled&&soundInitialized;
 }
 el.sound.addEventListener('click',()=>enableSound(!soundEnabled));
 // The background track is an ORIGINAL 120 BPM/C-major synth composition, 32s loop.
 // Music and SFX are separately controllable, and require user interaction.
 function updateMusicUI(){
   el.music.dataset.on=String(musicEnabled);
   el.music.setAttribute('aria-pressed',String(musicEnabled));
   el.music.setAttribute('aria-label',musicEnabled?'关闭背景音乐':'开启背景音乐');
   el.musicLabel.textContent=musicEnabled?'音乐已开':'开启音乐';
 }
 async function enableMusic(flag=true){
   if(snapshot)return false;
   if(flag){
     cancelAnimationFrame(musicFadeId);
     el.bgm.volume=musicVolume;if(!el.bgm.hasAttribute('src'))el.bgm.src=el.bgm.dataset.src||'assets/eco-pop-adventure.mp3';
     try{await el.bgm.play();musicEnabled=true;}
     catch(err){musicEnabled=false;dispatch('music:error',{message:String(err)});}
   }else{cancelAnimationFrame(musicFadeId);musicEnabled=false;el.bgm.pause();}
   updateMusicUI();
   savePrefs();
   dispatch('music:change',{enabled:musicEnabled,volume:musicVolume,track:'eco-pop-adventure.mp3'});
   return musicEnabled;
 }
 el.music.addEventListener('click',()=>enableMusic(!musicEnabled));
 el.musicVolume.addEventListener('input',()=>{
   musicVolume=Number(el.musicVolume.value)/100;
   el.bgm.volume=musicVolume;
   savePrefs();
   dispatch('music:volume',{volume:musicVolume});
 });
 updateMusicUI();
 document.addEventListener('visibilitychange',()=>{
   if(snapshot)return;
   if(document.hidden){if(musicEnabled)el.bgm.pause();}
   else if(musicEnabled)el.bgm.play().catch(()=>{musicEnabled=false;updateMusicUI()});
 });
 function duckMusic(amount=.65){
   if(!musicEnabled)return;
   cancelAnimationFrame(musicFadeId);
   const start=el.bgm.volume,to=musicVolume*amount,t0=performance.now();
   const step=now=>{const k=Math.min(1,(now-t0)/450);
     el.bgm.volume=Math.max(0,Math.min(1,start+(to-start)*k));
     if(k<1)musicFadeId=requestAnimationFrame(step);
   };musicFadeId=requestAnimationFrame(step);
 }
 // Non-destructive star burst; no changes to hand-approved bin artwork or icons.
 function burst(x,y,label='',color='#ffed76'){
   if(reduceMotion)return;
   for(let i=0;i<7;i++){
     const s=document.createElement('span');s.className='click-star';s.textContent=i%3===0?'✦':'★';
     const radians=(i/7)*Math.PI*2;
     s.style.left=(x+Math.cos(radians)*7)+'px';s.style.top=(y+Math.sin(radians)*7)+'px';
     s.style.color=color;
     s.style.setProperty('--tx',(Math.cos(radians)*(38+i*2)).toFixed(1)+'px');
     s.style.setProperty('--ty',(Math.sin(radians)*(36+i*2)-17).toFixed(1)+'px');
     el.ambient.appendChild(s);s.addEventListener('animationend',()=>s.remove(),{once:true});
   }
   if(label){const tag=document.createElement('span');tag.className='bubble-caption';tag.textContent=label;
     tag.style.left=(x-65)+'px';tag.style.top=(y-62)+'px';el.ambient.appendChild(tag);
     tag.addEventListener('animationend',()=>tag.remove(),{once:true});}
 }
 function reaction(bin,label=true){
   const b=BINS[bin];if(!b)return;
   const item=$(b.element);item.classList.remove('cheer');void item.offsetHeight;
   item.classList.add('cheer');const shadow=$('shadow-'+b.element.replace('sprite-',''));shadow.classList.remove('cheer');void shadow.offsetHeight;shadow.classList.add('cheer');setTimeout(()=>{item.classList.remove('cheer');shadow.classList.remove('cheer')},780);
   burst(b.centerX,b.centerY-28,label?b.label:'', ['#a9ffff','#ffdd9f','#ffadce','#eaffff'][bin]);
 }
 function mascotReaction(){
   const m=$('mascot-sprite');m.classList.remove('cheer');void m.offsetHeight;m.classList.add('cheer');
   const shadow=$('shadow-mascot');shadow.classList.remove('cheer');void shadow.offsetHeight;shadow.classList.add('cheer');setTimeout(()=>{m.classList.remove('cheer');shadow.classList.remove('cheer')},850);
   burst(422,534,'', '#ffe56c');
 }


 function render(){
   if(snapshot)return;
   const pct=Math.round(currentProgress);
   // The truck tracks the FILL TIP, not elapsed time. Manual and demo modes render identically.
   const width=580*(currentProgress/100);
   el.fill.style.width=width.toFixed(3)+'px';
   const truckLeft=486+width-8;
   el.truck.style.transform=`translate3d(${(truckLeft-472).toFixed(3)}px,0,0)`;
   el.number.textContent=pct+'%';
   el.rail.setAttribute('aria-valuenow',String(pct));
   el.rail.setAttribute('aria-valuetext',`加载中 ${pct}%`);
   el.debugSlider.value=String(currentProgress);
   el.debugVal.textContent=pct+'%';
 }
 function setProgress(value,{fromDemo=false}={}){
   if(snapshot)return 68;
   // Production completion is gated by all required assets.
   if(!manual&&!preloadState.done&&Number(value)>=100)value=95;
   if(!fromDemo)stopAuto();
   const old=Math.round(currentProgress);
   currentProgress=clamp(value);
   render();
   const rounded=Math.round(currentProgress);
   if(old!==rounded){
     dispatch('loading:progress',{progress:rounded,elapsedRatio:currentProgress/100,truckLeft:486+580*(currentProgress/100)-8});
     for(let k=0;k<3;k++){const threshold=(k+1)*25;
       if(old<threshold&&rounded>=threshold){sounds.checkpoint();reaction(k,false);if(k===1)mascotReaction();}
     }
   }
   el.truck.classList.toggle('moving',currentProgress>0&&currentProgress<100&&!reduceMotion);
   clearTimeout(moveTimer);
   if(!fromDemo&&currentProgress<100){moveTimer=setTimeout(()=>el.truck.classList.remove('moving'),480);}
   if(!fromDemo&&currentProgress<100)tipElapsed=0;
   if(currentProgress>=100&&!ready){
     ready=true;stopAuto();el.truck.classList.remove('moving');
     setTimeout(()=>{
       if(!ready||snapshot)return;
       showComplete();
     },reduceMotion?0:500);
   }
   return currentProgress;
 }
 function stopAuto(){demoRunning=false;cancelAnimationFrame(frameId);frameId=0;lastTime=null;}
 function tick(now){
   if(!demoRunning)return;
   if(lastTime!==null&&!document.hidden){
     const dt=Math.min(now-lastTime,200);
     const target=preloadState.done?100:Math.min(95,Math.floor((preloadState.loadedWeight/Math.max(1,preloadState.totalWeight))*95));
      setProgress(Math.max(currentProgress,target),{fromDemo:true});
     tipElapsed+=dt;
     if(tipElapsed>=3400){tipElapsed-=3400;
       if(now-lastManualTipAt>3600)showTip(undefined,{automatic:true});
     }
   }
   lastTime=now;
   // Low-volume, opt-in wheel hum only AFTER a user gesture has unlocked AudioContext.
   if(soundEnabled&&soundInitialized&&currentProgress>1&&currentProgress<99&&now-lastWheelNote>920){
     synth([{f:145,to:113,dur:.085,v:.011,type:'triangle'}]);lastWheelNote=now;
   }
   if(demoRunning&&currentProgress<100)frameId=requestAnimationFrame(tick);
 }
 async function preloadOne(item){
   let ok=false;
   try{
     // Consume the complete same-origin response, rather than merely buffering enough to start playback.
     const response=await fetch(item.url,{cache:'force-cache',credentials:'same-origin'});
     if(!response.ok)throw new Error('HTTP '+response.status);
     if(response.body&&response.body.getReader){const reader=response.body.getReader();while(true){const part=await reader.read();if(part.done)break;}}
     else await response.arrayBuffer();
     if(item.kind==='image'){const img=new Image();img.src=item.url;if(img.decode)await img.decode();else await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;});}
     ok=true;
   }catch(error){try{ok=await preloadFallback(item);}catch(_){ok=false;}}
   if(ok){preloadState.loaded++;preloadState.loadedWeight+=Math.max(1,Number(item.weight)||1);}else preloadState.failed.push(item.url);
   renderPreloadProgress();return ok;
 }
 function preloadFallback(item){
   return new Promise(resolve=>{
     let settled=false;const done=ok=>{if(settled)return;settled=true;resolve(ok);};
     if(item.kind==='image'){const img=new Image();img.onload=()=>done(true);img.onerror=()=>done(false);img.src=item.url;}
     else if(item.kind==='audio'){const audio=new Audio();audio.preload='auto';audio.addEventListener('canplaythrough',()=>done(true),{once:true});audio.addEventListener('error',()=>done(false),{once:true});audio.src=item.url;audio.load();}
     else{const link=document.createElement('link');link.rel='preload';link.as=item.kind==='style'?'style':'script';link.href=item.url;link.onload=()=>done(true);link.onerror=()=>done(false);document.head.appendChild(link);}
   });
 }
 async function waitForLoaderArt(){
   const images=Array.from(document.querySelectorAll('#stage img'));
   await Promise.all(images.map(async img=>{
     if(!img.complete)await new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});});
     if(img.complete&&img.naturalWidth&&img.decode)try{await img.decode();}catch(_){}
   }));
   // Allow two actual paint frames before bulk downloads start.
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 }
 function renderPreloadProgress(){
   if(manual||snapshot||preloadState.done)return;
   const pct=preloadState.totalWeight?Math.min(95,Math.floor(preloadState.loadedWeight/preloadState.totalWeight*95)):0;
   if(pct>currentProgress)setProgress(pct,{fromDemo:true});
   el.live.textContent=preloadState.failed.length?`正在加载资源：${preloadState.loaded}/${preloadState.total}；有${preloadState.failed.length}项资源加载失败，暂不进入游戏。`:`正在准备游戏资源 ${preloadState.loaded}/${preloadState.total}`;
 }
 async function preloadGameResources(){
   if(preloadState.running||snapshot||manual)return;preloadState.running=true;
   const manifest=Array.isArray(window.GarbageLoadingConfig?.preloadManifest)?window.GarbageLoadingConfig.preloadManifest:[];
   const loaderAssets=new Set(['assets/scene-animated.webp','assets/loading-master.webp','assets/mascot.webp','assets/bin-blue.webp','assets/bin-brown.webp','assets/bin-red.webp','assets/bin-black.webp','assets/truck-cutout.webp']);
   const all=manifest.filter(item=>!loaderAssets.has(item.url)&&item.kind!=='audio'&&item.url!=='assets/eco-pop-adventure.mp3'),seen=new Set();const unique=all.filter(item=>{if(seen.has(item.url))return false;seen.add(item.url);return true;});
   preloadState.total=unique.length;preloadState.loaded=0;preloadState.totalWeight=unique.reduce((sum,item)=>sum+Math.max(1,Number(item.weight)||1),0);preloadState.loadedWeight=0;preloadState.failed=[];renderPreloadProgress();await Promise.all(unique.map(preloadOne));
   if(preloadState.failed.length){el.live.textContent=`有${preloadState.failed.length}项游戏资源未能加载，进度暂未完成。请检查文件是否完整，并刷新页面重试。`;dispatch('loading:asset-error',{failed:preloadState.failed.slice()});return;}
   await new Promise(resolve=>setTimeout(resolve,300));preloadState.done=true;el.live.textContent='全部游戏资源已加载，正在完成准备。';dispatch('loading:preload-complete',{total:preloadState.total,loaded:preloadState.loaded,totalWeight:preloadState.totalWeight,loadedWeight:preloadState.loadedWeight});
   if(!manual&&currentProgress<100){if(!demoRunning)startDemo();setProgress(100,{fromDemo:true});}
 }
 function startDemo(){
   if(snapshot||manual)return;
   stopAuto();demoRunning=true;lastTime=null;frameId=requestAnimationFrame(tick);
   dispatch('loading:start',{durationMs:duration,mode:'demo'});
 }
 function clearConfetti(){cancelAnimationFrame(confettiId);fxCtx.clearRect(0,0,1672,941);particles=[];}
 function reset({auto=false}={}){
   if(snapshot)return;
   stopAuto();clearTimeout(moveTimer);clearConfetti();ready=false;started=false;tipElapsed=0;lastManualTipAt=-100000;
   cancelAnimationFrame(musicFadeId);el.bgm.volume=musicVolume;
   for(const node of el.ambient.querySelectorAll('.click-star,.bubble-caption'))node.remove();
   currentProgress=0;el.complete.classList.remove('open');el.complete.setAttribute('aria-hidden','true');el.start.disabled=false;
   el.start.innerHTML='<span>★ 开始挑战</span><span aria-hidden="true">➜</span>';document.querySelector('.finish-description').textContent='小车已到站，环保挑战马上开始！';
   el.truck.classList.remove('moving');index=0;el.fact.classList.remove('visible','pulse');
   render();dispatch('loading:reset',{});
   if(auto)startDemo();
 }
 function stop(){stopAuto();}
 function finish(){return setProgress(100)}

 // Restrict to the ORIGINAL one-line message area; do not cover fixed '换一条'.
 function fitTip(){
   const node=el.factText;
   let px=19;
   node.style.fontSize=px+'px';
   // Width is measured in the actual browser font; never rely on char count.
   while(px>14&&node.scrollWidth>599){px-=.5;node.style.fontSize=px+'px';}
   if(node.scrollWidth>599){node.style.maxWidth='599px';node.style.textOverflow='ellipsis';}
 }
 function showTip(which,{automatic=false}={}){
   if(snapshot)return null;
   index=(Number.isInteger(which)?((which%facts.length)+facts.length)%facts.length:(index+1)%facts.length);
   const message=facts[index];
   el.factText.textContent=message;
   el.fact.classList.add('visible');el.fact.classList.remove('pulse');void el.fact.offsetHeight;el.fact.classList.add('pulse');
   fitTip();el.live.textContent='小知识：'+message;
   if(!automatic)lastManualTipAt=performance.now();
   sounds.tip();dispatch('tip:change',{index,text:message});return message;
 }
 $('mascot-hit').addEventListener('click',()=>{mascotReaction();sounds.click();el.live.textContent='你好！一起做好垃圾分类。'});
 $('replay').addEventListener('click',()=>reset({auto:!manual}));
 el.next.addEventListener('click',()=>{showTip();burst(1203,850,'','#ffe78c');});
 [['bin-recycle',0],['bin-wet',1],['bin-hazard',2],['bin-dry',3]].forEach(([id,i])=>
   $(id).addEventListener('click',()=>{showTip(BINS[i].tip);reaction(i,true)}));

 // Celebration is drawn as discrete particles instead of baking changes into the approved illustration.
 const seeded=(()=>{let n=20261012;return()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296}})();
 function launchConfetti(){
   if(reduceMotion)return;
   clearConfetti();
   const colors=['#ffdf3e','#ff799e','#42f0b4','#61d9ff','#ff9d38','#fffdf2'];
   for(let i=0;i<105;i++){
     particles.push({x:350+seeded()*950,y:290+seeded()*120,dx:(seeded()-.5)*5,dy:-3-seeded()*5,
       vy:.11+seeded()*.11,angle:seeded()*6.28,spin:(seeded()-.5)*.19,w:5+seeded()*8,h:8+seeded()*8,c:colors[i%colors.length],age:0});
   }
   confettiElapsed=0;
   const step=()=>{
     fxCtx.clearRect(0,0,1672,941);
     particles.forEach(p=>{
       p.age++;p.x+=p.dx;p.y+=p.dy;p.dy+=p.vy;p.angle+=p.spin;
       fxCtx.save();fxCtx.translate(p.x,p.y);fxCtx.rotate(p.angle);
       fxCtx.globalAlpha=Math.max(0,1-(p.age/155));fxCtx.fillStyle=p.c;fxCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h);fxCtx.restore();
     });
     confettiElapsed++;
     if(confettiElapsed<150)confettiId=requestAnimationFrame(step);else clearConfetti();
   };confettiId=requestAnimationFrame(step);
 }
 function showComplete(){
   el.complete.classList.add('open');el.complete.setAttribute('aria-hidden','false');
   sounds.finish();launchConfetti();duckMusic(.48);mascotReaction();
   for(let k=0;k<4;k++)setTimeout(()=>reaction(k,false),130*k);
   el.start.focus({preventScroll:true});el.live.textContent='加载完成，点击开始挑战。';
   dispatch('loading:ready',{progress:100,durationMs:duration});
 }
 el.start.addEventListener('click',()=>{
   if(started)return;
   started=true;sounds.start();if(musicEnabled){el.bgm.pause();musicEnabled=false;updateMusicUI();}
   dispatch('game:start',{source:'loading-screen',progress:100});
   if(nextUrl){window.location.assign(nextUrl);}
   else{el.start.disabled=true;el.start.innerHTML='<span>✓ 出发，分类小达人！</span>';document.querySelector('.finish-description').textContent='分类小行动，上海更美好！';el.live.textContent='准备完成！分类挑战已就绪。';}
 });
 // 应用保存的声音偏好（音乐仍遵循浏览器自动播放策略，由用户点击开启）
 loadPrefs();
 el.sound.dataset.on=String(soundEnabled);
 el.sound.setAttribute('aria-pressed',String(soundEnabled));
 el.sound.setAttribute('aria-label',soundEnabled?'关闭音效':'开启音效');
 el.soundLabel.textContent=soundEnabled?'音效已开':'开启音效';
 el.musicVolume.value=String(Math.round(musicVolume*100));
 el.bgm.volume=musicVolume;
 // Expose a tiny explicit API for the next AI. Do not overwrite this contract.
 window.GarbageLoading={
   setProgress,finish,stop,reset:()=>reset(),restart:()=>reset({auto:!manual}),
   showTip,setNextUrl:url=>{nextUrl=String(url||'')},
   getProgress:()=>Math.round(currentProgress),getFacts:()=>facts.slice(),
   getState:()=>({progress:Math.round(currentProgress),ready,started,mode:manual?'manual':'demo',soundEnabled,musicEnabled,musicVolume}),
   enableSound,enableMusic,setMusicVolume:(v)=>{musicVolume=clamp(v*100)/100;el.musicVolume.value=String(Math.round(musicVolume*100));el.bgm.volume=musicVolume;return musicVolume;},on:(name,listener)=>document.addEventListener(name,listener),
   off:(name,listener)=>document.removeEventListener(name,listener)
 };
 if(qs.get('debug')==='1'){
   el.debug.classList.add('visible');
   el.debugSlider.addEventListener('input',e=>setProgress(e.target.value));
   $('debug-restart').addEventListener('click',()=>reset({auto:!manual}));
   $('debug-finish').addEventListener('click',finish);
 }
 if(snapshot){
   document.body.classList.add('snapshot');el.scene.src='assets/loading-master.webp';
 }else{
   render();
   // Keep the loader's full composition visible before downloading game resources in the background.
   waitForLoaderArt().then(()=>preloadGameResources());
 }
})();
