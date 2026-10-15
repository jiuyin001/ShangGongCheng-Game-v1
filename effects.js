(function(root){
  'use strict';
  const colors=['#ffcb47','#69dfae','#59cafa','#ff9c53','#bca0f5'];
  function create({document= root.document,window=root,reducedMotion=()=>false}={}){
    const active=new Set(),layers=new Map();
    const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const quiet=()=>!!reducedMotion()||!!media?.matches;
    function animate(node,frames,options){
      if(!node?.animate||quiet())return null;
      const animation=node.animate(frames,options);active.add(animation);
      const release=()=>active.delete(animation);animation.finished?.then(release,release);
      return animation;
    }
    function clearCelebration(){for(const [layer,timer] of layers){window.clearTimeout(timer);layer.remove()}layers.clear()}
    function cancel(){for(const animation of active)animation.cancel();active.clear();clearCelebration()}
    function press(node){if(node?.disabled)return;animate(node,[{scale:'1',offset:0},{scale:'.956',offset:.25},{scale:'1.025',offset:.64},{scale:'1',offset:1}],{duration:350,easing:'cubic-bezier(.2,.7,.3,1)'})}
    function pop(node){animate(node,[{scale:'1',offset:0},{scale:'1.075',offset:.45},{scale:'1',offset:1}],{duration:450,easing:'cubic-bezier(.2,.8,.25,1)'})}
    function swap(node){animate(node,[{opacity:.4,transform:'translateY(6px) scale(.985)'},{opacity:1,transform:'none'}],{duration:240,easing:'ease-out'})}
    function progress(track,from,to){
      if(!track||!Number.isFinite(from)||from===to||quiet())return;
      const fill=track.querySelector('.progress-fill'),truck=track.querySelector('.progress-truck');
      animate(fill,[{width:from+'%'},{width:to+'%'}],{duration:720,easing:'cubic-bezier(.22,.72,.24,1)'});
      const width=track.clientWidth,pos=p=>Math.max(0,Math.min(width-36,width*p/100-21));
      animate(truck,[{left:pos(from)+'px'},{left:pos(to)+'px'}],{duration:720,easing:'cubic-bezier(.22,.72,.24,1)'});
    }
    function floatText(text,{anchor,tier=0}={}){
      if(!text)return null;
      const host=document.querySelector('dialog[open]')||document.body;
      const el=document.createElement('div');el.className='gp-floattext'+(tier===2?' tier2':tier===1?' tier1':tier===3?' tier3':'');
      el.textContent=text;
      if(anchor){const r=anchor.getBoundingClientRect();el.style.left=(r.left+r.width/2)+'px';el.style.top=Math.max(12,r.top-10)+'px'}else{el.style.left=(window.innerWidth||1024)/2+'px';el.style.top=(window.innerHeight||768)*.4+'px'}
      if(!quiet()){for(let i=0;i<8;i++){const s=document.createElement('i');s.className='gp-ft-spark';const r=Math.random;s.style.setProperty('--dx',((r()-.5)*130)+'px');s.style.setProperty('--dy',(18+r()*52)+'px');s.style.setProperty('--fc',['#ffd23f','#ff9a3d','#69e6a8','#59cafa','#ff6ec7'][i%5]);s.style.setProperty('--fd',(r()*140)+'ms');el.appendChild(s)}}
      host.appendChild(el);const remove=()=>{el.remove()};setTimeout(remove,2200);return el;
    }
    function shake(node,{duration=420}={}){if(!node||quiet())return;node.classList.remove('gp-shake-screen');void node.offsetWidth;node.classList.add('gp-shake-screen');clearTimeout(shake.timer);shake.timer=setTimeout(()=>node.classList.remove('gp-shake-screen'),duration)}
    function celebrate({kind='game',percent=25,anchor}={}){
      if(quiet())return false;
      clearCelebration();
      const dialog=document.querySelector('dialog[open]'),host=dialog||document.body;
      const rect=anchor?.getBoundingClientRect(),width=window.innerWidth||1024,height=window.innerHeight||768;
      const x=rect?Math.min(width-20,Math.max(20,rect.left+rect.width/2)):width/2;
      const y=rect?Math.min(height-55,Math.max(60,rect.top+rect.height/2)):height*.35;
      const count=kind==='lesson'?18:percent===100?54:36;
      const layer=document.createElement('div');layer.className='fx-confetti-layer';layer.setAttribute('aria-hidden','true');
      for(let i=0;i<count;i++){
        const bit=document.createElement('i'),r=Math.random;bit.className='fx-confetti';
        const vars={'x':x+'px','y':y+'px','size':(kind==='lesson'?6+r()*4:7+r()*5)+'px','color':colors[i%colors.length],'dx':((r()-.5)*Math.min(width*.78,kind==='lesson'?280:680))+'px','lift':(45+r()*(kind==='lesson'?65:145))+'px','fall':(100+r()*Math.min(height*.55,380))+'px','turn':((r()-.5)*960)+'deg','duration':(kind==='lesson'?1000+r()*350:1400+r()*550)+'ms','delay':(r()*120)+'ms'};
        for(const [key,value] of Object.entries(vars))bit.style.setProperty('--fx-'+key,value);
        layer.appendChild(bit);
      }
      host.appendChild(layer);
      const timer=window.setTimeout(()=>{layer.remove();layers.delete(layer)},2200);layers.set(layer,timer);
      pop(anchor);return true;
    }
    media?.addEventListener?.('change',()=>{if(quiet())cancel()});
    return {press,pop,swap,progress,celebrate,floatText,shake,clearCelebration,cancel,quiet};
  }
  const api={create};root.EcoEffects=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
