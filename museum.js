/* 环保知识探索馆 V53 —— 四分类图片入口 → 垃圾图片卡片 → 故事详情 */
(function(root){
  'use strict';
  const D=root.EcoTrash,C=root.EcoContent;
  const escape=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const asset=path=>root.EcoAsset?root.EcoAsset(path):path;
  // 每个分类的“去向”与“资源化过程”默认文案
  const categoryJourney={
    brown:{title:'湿垃圾·生化处理线',go:'沥去水分后由环卫专车收运，进入湿垃圾生化处理设施（厌氧消化、堆肥等），不与其他垃圾混合焚烧。',resource:'厌氧消化：微生物在缺氧环境分解有机物产生沼气，沼气用于发电或供热；沼渣、沼液按规范继续利用或处置。'},
    blue:{title:'可回收物·再生资源线',go:'进入再生资源回收体系，由回收网点分拣、打包，再运往专业再生加工厂。',resource:'分拣识别→清洁破碎→制浆/熔融/造粒→再生原料→再制成新包装、纸张或制品。投放前清洁沥干，能提高再生品质。'},
    red:{title:'有害垃圾·专业处置线',go:'专用容器单独收集，专车运输至有害垃圾暂存点，再交由持证的专业单位集中无害化处理。',resource:'按类别拆解、分类处置：电池回收金属与电解液，灯管回收汞，药品高温焚烧，最大限度降低环境危害。'},
    black:{title:'干垃圾·焚烧发电线',go:'进入生活垃圾焚烧发电厂，或经无害化处理后在规范填埋场填埋。',resource:'焚烧产生热能推动发电，炉渣经处理后资源化利用；填埋场做防渗与沼气收集处理。'}
  };
  // 特殊垃圾专属故事：分类原因 / 去向 / 资源化
  const specialStories={
    'big-bone':{title:'《大骨头的奇妙旅行》',reason:'大骨头质地坚硬、难以粉碎，在湿垃圾处理设备里容易卡损，按上海分类指引投干垃圾。',go:'与其他干垃圾一起收运，进入焚烧发电厂。',resource:'在焚烧炉中充分燃烧，产生热能发电；少量炉渣经处理用于铺路等资源化用途。'},
    'corn-cob':{title:'《玉米棒的奇妙旅行》',reason:'玉米棒是整根的硬质秸秆类厨余，难降解、难粉碎，不能只看它来自食物就按湿垃圾投放。',go:'按干垃圾投放，随干垃圾收运进入焚烧发电环节。',resource:'焚烧产生热能用于发电；煮熟的玉米粒属于湿垃圾，但整根玉米棒按干垃圾处理。'},
    'rechargeable-battery':{title:'《一枚电池的专属旅程》',reason:'电池含镍、镉、锂等重金属与电解质，乱丢会污染土壤和水体，属于有害垃圾。',go:'投入有害垃圾专用容器，由专车收运至有害垃圾暂存点。',resource:'由持证企业拆解，回收金属与电解液进行资源化，最大限度避免重金属进入环境。'},
    'expired-pills':{title:'《一粒过期药的告别》',reason:'过期药品成分复杂，若冲入下水道或混入生活垃圾，可能污染水源，属于有害垃圾。',go:'保留原包装或密封后投入有害垃圾容器，专车收运。',resource:'由专业单位集中高温焚烧无害化处理，不随意丢弃也不可转赠他人服用。'},
    'lamp-tube':{title:'《一根灯管的守护》',reason:'荧光灯管含汞，破损后汞蒸气会污染环境，属于有害垃圾。',go:'轻拿轻放，放入有害垃圾容器，避免破损，由专车收运。',resource:'专业单位回收灯管中的汞与玻璃，汞经提纯再利用，玻璃做资源化处理。'}
  };
  // 分类投放要点（与指南原图一致，直接内嵌在展厅里，不依赖看图片）
  const guideKeypoints=[
    {key:'blue',title:'可回收物',text:'废纸、塑料、玻璃、金属、织物，保持清洁、沥干水分后投放。'},
    {key:'red',title:'有害垃圾',text:'电池、灯管、药品、油漆桶等，轻投轻放，防止破损。'},
    {key:'brown',title:'湿垃圾',text:'剩饭剩菜、瓜皮果核、花卉绿植，去除包装后沥干投放。'},
    {key:'black',title:'干垃圾',text:'纸巾、陶瓷碎片、烟蒂、灰土等，袋装后投放。'}
  ];
  const guideExtras=[['大件垃圾','沙发、床垫、桌子可预约回收，或投放到大件垃圾管理责任人指定的场所。'],['装修垃圾','碎砖、碎石、废砂浆装袋后投放到指定的装修垃圾堆放场所。'],['电子废弃物','大型电器联系电子废弃物回收企业；小型电子产品按可回收物要求投放。'],['投放要求','分类投放、专袋专桶，认清四分类标识；干净的可回收物不要混入湿垃圾。']];
  const zoneLesson={brown:'types',blue:'prepare',red:'daily',black:'daily'};
  // 卡片图片里没有、但最容易分错的易混垃圾投放小知识（按《上海市生活垃圾分类投放指引》整理）
  // img: 有准确配图的填 assets/trash/ 下文件名；无图则显示分类色块，不引入不准确图标
  const quizReview=[
    {n:'椰子壳',c:'black',img:'coconut-shell',w:'椰子壳太硬，湿垃圾机器啃不动，投干垃圾。'},
    {n:'榴莲壳',c:'black',img:'durian-shell',w:'榴莲壳硬邦邦难降解，投干垃圾；榴莲肉才是湿垃圾。'},
    {n:'螃蟹壳',c:'brown',w:'螃蟹壳容易烂，是湿垃圾。'},
    {n:'虾壳',c:'brown',img:'shrimp-shell',w:'虾壳容易烂，是湿垃圾。'},
    {n:'中药渣',c:'brown',w:'煮过的中药渣会烂，沥干水投湿垃圾。'},
    {n:'宠物饲料',c:'brown',w:'过期的猫粮狗粮是食物，投湿垃圾。'},
    {n:'鲜花',c:'brown',w:'花枝花叶会烂，投湿垃圾，先拆掉包装纸。'},
    {n:'绿植',c:'brown',w:'枯萎绿植会烂，投湿垃圾；花盆单独丢。'},
    {n:'玉米衣',c:'black',w:'玉米衣、玉米皮按上海指引投干垃圾，和玉米棒一样。'},
    {n:'镜子',c:'black',img:'mirror',w:'镜子是镀膜玻璃，成分复杂，投干垃圾，别当成玻璃瓶。'},
    {n:'奶瓶',c:'blue',w:'塑料奶瓶洗净擦干，是可回收物。'},
    {n:'棉被',c:'blue',w:'干净的旧棉被是可回收物（织物）。'},
    {n:'枕头',c:'blue',w:'干净的枕头是可回收物（织物）。'},
    {n:'皮带',c:'blue',w:'皮带保持干净，按可回收物（皮具）投放。'},
    {n:'墨盒',c:'red',w:'墨盒、硒鼓按上海指引属有害垃圾。'},
    {n:'油漆桶',c:'red',img:'paint-can',w:'油漆桶里有残留化学品，属有害垃圾，盖好再扔。'},
    {n:'相片底片',c:'red',w:'底片含感光材料，属有害垃圾。'},
    {n:'打火机',c:'black',img:'lighter',w:'一次性打火机按指引投干垃圾，别丢到火源边。'},
    {n:'带胶制品',c:'black',w:'胶带、贴纸很难回收，按指引投干垃圾。'},
    {n:'湿巾',c:'black',img:'wet-wipe',w:'湿巾再湿也不是湿垃圾，它是干垃圾！'},
    {n:'纸尿裤',c:'black',img:'diaper',w:'纸尿裤被污损难回收，投干垃圾。'},
    {n:'猫砂',c:'black',img:'cat-litter',w:'猫砂是干的，装袋投干垃圾。'},
    {n:'干燥剂',c:'black',w:'干燥剂吸过潮，投干垃圾。'},
    {n:'棉签',c:'black',img:'cotton-swab',w:'棉签、棉棒投干垃圾。'},
    {n:'竹筷',c:'black',w:'用过的一次性竹筷投干垃圾。'},
    {n:'陶瓷碎片',c:'black',img:'ceramic-shard',w:'陶瓷碎片投干垃圾，包好别扎手。'},
    {n:'圆珠笔',c:'black',w:'圆珠笔、签字笔投干垃圾。'},
    {n:'袜子',c:'black',w:'脏袜子投干垃圾；干净旧袜可以回收。'},
    {n:'灰土',c:'black',img:'dust-soil',w:'装修灰土装袋投干垃圾。'},
    {n:'胶带',c:'black',w:'胶带难回收，投干垃圾。'},
    {n:'隐形眼镜',c:'black',w:'隐形眼镜投干垃圾。'},
    {n:'雨伞',c:'black',img:'umbrella',w:'雨伞骨架难拆，投干垃圾。'},
    {n:'内衣裤',c:'black',w:'贴身衣物投干垃圾。'},
    {n:'核桃壳',c:'black',img:'walnut-shell',w:'核桃壳硬邦邦，湿垃圾机器啃不动，投干垃圾。'},
    {n:'外卖盒',c:'black',img:'takeout-box',w:'沾油污的外卖盒难回收，投干垃圾；洗干净才考虑可回收。'},
    {n:'奶茶杯',c:'blue',img:'milk-tea-cup',w:'塑料奶茶杯洗净沥干属低价值可回收物；没喝完的残液和珍珠倒湿垃圾，杯子若没洗净就按干垃圾。'},
    {n:'LED灯泡',c:'black',img:'led-bulb',w:'LED灯泡不含汞，投干垃圾；荧光灯管才是有害垃圾。'},
    {n:'纽扣电池',c:'red',img:'button-battery',w:'纽扣电池含重金属，是有害垃圾。'},
    {n:'过期指甲油',c:'red',img:'expired-nail-polish',w:'指甲油含化学成分，是有害垃圾。'},
    {n:'旧书',c:'blue',img:'old-book',w:'旧书保持干净干燥，是可回收物。'},
    {n:'金属衣架',c:'blue',img:'metal-hanger',w:'金属衣架是可回收物。'},
    {n:'西瓜皮',c:'brown',img:'watermelon-rind',w:'西瓜皮是瓜皮果核，投湿垃圾。'},
    {n:'剩面条',c:'brown',img:'leftover-noodles',w:'剩饭剩菜投湿垃圾。'}
  ];
  function quizReviewCard(q){const c=D.category(q.c);const decoys=D.categories.filter(x=>x.id!==q.c).sort(()=>Math.random()-.5).slice(0,2);const opts=[q.c].concat(decoys.map(d=>d.id)).sort(()=>Math.random()-.5);return `<details class="quiz-review-card" style="--cat:${c.color}"><summary>${q.img?`<img class="qr-img" src="${asset('assets/trash/'+q.img+'.png')}" alt="${escape(q.n)}" loading="lazy">`:`<span class="qr-dot" style="background:var(--cat)"></span>`}<strong>${escape(q.n)}</strong><em>${escape(C.fields['category.'+q.c+'.name']?.value||q.c)}</em></summary><p>${escape(q.w)}</p><div class="qr-quiz" data-item="${escape(q.n)}"><p class="qr-quiz-q">考考你：「${escape(q.n)}」应该放进哪个桶？</p><div class="qr-quiz-opts">${opts.map(cat=>`<button type="button" data-action="qr-answer" data-cat="${cat}" data-catname="${escape(C.fields['category.'+cat+'.name']?.value||cat)}" data-correct="${cat===q.c?'1':'0'}">${escape(C.fields['category.'+cat+'.name']?.value||cat)}</button>`).join('')}</div><p class="qr-quiz-fb" role="status"></p></div></details>`}
  function quizReviewGrid(catId){return `<div class="quiz-review-grid">${quizReview.filter(q=>!catId||q.c===catId).map(quizReviewCard).join('')}</div>`}
  function storyTitle(item){
    const s=specialStories[item.id];if(s)return s.title;
    const zone={brown:'的奇妙旅行',blue:'的第二次生命',red:'的专属旅程',black:'的从容告别'};
    return '《'+item.name+zone[item.category]+'》';
  }
  function catArt(catId,size=92){return `<img class="museum-bin-art" src="${asset('assets/bin-'+catId+'.webp')}" alt="" style="width:${size}px" loading="lazy">`;}
  function itemCard(item){return `<button type="button" class="museum-item-card" data-action="museum-item" data-item="${escape(item.id)}" style="--cat:${D.category(item.category).color}"><img src="${asset(item.image)}" alt="${escape(item.name)}" loading="lazy"><strong>${escape(item.name)}</strong><small>${escape(C.fields['category.'+item.category+'.name']?.value||item.category)}</small></button>`;}
  function categoryEntry(cat){const items=D.forCategory(cat.id);return `<button type="button" class="museum-cat-card" data-action="museum-cat" data-cat="${cat.id}" style="--cat:${cat.color}">${catArt(cat.id)}<span class="museum-cat-copy"><strong>${escape(C.fields['category.'+cat.id+'.name']?.value||cat.name)}</strong><small>${escape((C.fields['category.'+cat.id+'.examples']?.value||'').slice(0,26))}…</small><em>${items.length} 种垃圾的卡片</em></span></button>`;}
  function storySection(label,text){return `<section class="museum-story-block"><h4>${label}</h4><p>${escape(text)}</p></section>`;}
  function guideInline(catId){return guideKeypoints.map(g=>`<div class="museum-guide-inline" style="--cat:${D.category(g.key).color}"><strong>${escape(g.title)}</strong><span>${escape(g.text)}</span></div>`).join('')}
  function storyView(ctx,item){const zone=item.category,s=specialStories[item.id]||{},lesson=zoneLesson[zone],done=ctx.state.lessons.includes(lesson);const journey=categoryJourney[zone];const reason=s.reason||C.fields['trash.'+item.id+'.why']?.value||item.why;return `<div class="museum-view museum-story"><button class="secondary-button museum-back" data-action="museum-back" data-to="${ctx.prev==='home'?'home':'category'}">${'← 返回'}</button><div class="museum-story-hero" style="--cat:${D.category(zone).color}"><img src="${asset(item.image)}" alt="${escape(item.name)}" loading="lazy"><div><span class="museum-story-kicker">${escape(C.fields['category.'+zone+'.name']?.value||zone)} · 垃圾卡片故事</span><h3>${storyTitle(item)}</h3><p>${escape((C.fields['category.'+zone+'.description']?.value||'').slice(0,60))}</p></div></div><div class="museum-story-grid">${storySection('分类原因',reason)}${storySection('去向',s.go||journey.go)}${storySection('资源化过程',s.resource||journey.resource)}</div><div class="museum-story-note"><strong>小提示</strong><p>${escape(C.fields['category.'+zone+'.hint']?.value||'')}</p></div><div class="museum-learn-zone">${done?`<p class="museum-done">本展区已完成 ${'✓'}，可随时重看。</p>`:`<button class="primary-button" data-action="learn" data-lesson="${lesson}" data-item="${escape(item.id)}">${'完成探索 · +10 分'} ${'→'}</button><p class="museum-learn-note">完成探索后，环保小课堂进度 +1。</p>`}</div></div>`;}
  function categoryView(ctx,cat){const items=D.forCategory(cat.id);const journey=categoryJourney[cat.id];const guide=guideKeypoints.find(g=>g.key===cat.id);return `<div class="museum-view museum-category"><button class="secondary-button museum-back" data-action="museum-back" data-to="home">${'← 返回分类入口'}</button><div class="museum-cat-head" style="--cat:${cat.color}">${catArt(cat.id,76)}<div><span class="museum-story-kicker">${escape(C.fields['category.'+cat.id+'.name']?.value||cat.name)}</span><h3>${items.length} 张垃圾图片卡片</h3><p>${escape(C.fields['category.'+cat.id+'.examples']?.value||'')}</p></div></div><div class="museum-grid museum-grid-4">${items.map(itemCard).join('')}</div>${guide?`<section class="museum-guide-text museum-cat-guide" style="--cat:${cat.color}"><h4>📋 本类投放要点</h4><div class="museum-guide-inline" style="--cat:${cat.color}"><strong>${escape(guide.title)}</strong><span>${escape(guide.text)}</span></div><h4>♻️ 本类垃圾去了哪</h4><div class="museum-journey-inline"><p><strong>去向</strong>：${escape(journey.go)}</p><p><strong>资源化过程</strong>：${escape(journey.resource)}</p></div></section>`:''}${quizReview.some(q=>q.c===cat.id)?`<h4 class="quiz-review-title">本类易混垃圾 · 投放小知识</h4>${quizReviewGrid(cat.id)}`:''}<div class="museum-learn-zone">${ctx.state.lessons.includes(zoneLesson[cat.id])?`<p class="museum-done">本展区已完成 ✓</p>`:`<button class="primary-button" data-action="learn" data-lesson="${zoneLesson[cat.id]}">${'完成本展区探索 · +10 分'}</button>`}</div></div>`;}
  function homeView(ctx){const specialIds=['big-bone','corn-cob','rechargeable-battery','expired-pills','lamp-tube'];const specialItems=specialIds.map(id=>D.byId[id]).filter(Boolean);const quizLocked=!journeyDone(ctx.state);return `<div class="museum-view museum-home">${journeyRail(ctx)}<div class="museum-home-head"><span class="museum-home-badge">✦</span><div><h3>环保知识探索馆</h3><p>先选一个分类入口，看看每种垃圾的卡片故事：它们为什么这样分、去了哪里、怎样变废为宝。</p></div></div><div class="museum-grid museum-grid-2">${D.categories.map(categoryEntry).join('')}</div><section class="museum-special"><div class="museum-special-head"><span class="museum-special-icon">★</span><div><h3>特殊垃圾专区</h3><p>这些垃圾最容易分错，点开卡片看看它们的专属故事。</p></div><em>${specialItems.length} 个</em></div><div class="museum-grid museum-grid-4">${specialItems.map(itemCard).join('')}</div></section><section class="museum-special museum-quiz-review"><div class="museum-special-head"><span class="museum-special-icon">💡</span><div><h3>易混垃圾 · 投放小知识</h3><p>这些垃圾最容易分错，点开卡片看看它们为什么这样分、应该投进哪个桶。</p></div><em>${quizReview.length} 个</em></div>${quizReviewGrid('')}<p class="museum-fine">按《上海市生活垃圾分类投放指引》整理；个别品种以现场投放点公示为准。</p></section><div class="museum-progress-row"><span>小课堂进度：${ctx.state.lessons.length} / ${C.lessons.length}</span><div class="museum-progress-track"><div style="width:${C.lessons.length?Math.min(100,ctx.state.lessons.length/C.lessons.length*100):0}%"></div></div></div><section class="museum-guide-text"><div class="museum-special-head"><span class="museum-special-icon">📋</span><div><h3>投放要点 · 分类指南文字版</h3><p>不用去翻图片，这里直接写清楚：每类垃圾怎么分、怎么投。</p></div></div><div class="museum-guide-inline-grid">${guideInline('')}</div><ul class="museum-guide-extras">${guideExtras.map(([t,x])=>`<li><strong>${escape(t)}</strong><span>${escape(x)}</span></li>`).join('')}</ul></section><div class="museum-guide-link"><button class="secondary-button" data-action="guide">🗺 想看原图？点这里查看上海市分类指南原图</button></div><div class="lesson-quiz-cta ${quizLocked?'locked':''}"><div><h3>${escape(C.fields['quiz.title']?.value||'分类知识小测验')}</h3>${quizLocked?`<p>完成闯关旅程的 4 个主题站后解锁答题积分。当前 ${ctx.state.journey.length} / 4。</p>`:`<p>闯关旅程已通关，去小测验检验一下、拿积分吧！</p>`}</div>${quizLocked?`<button class="primary-button" data-action="journey-lock">${'🔒 未解锁 · 先走完旅程'}</button>`:`<button class="primary-button" data-action="quiz">${'去答题'} ${'→'}</button>`}</div></div>`;}
  // V71 闯关式旅程：四分类主题站点，顺序通关
  const journeyStations=[
    {id:'recyclable',cat:'blue',kicker:'第 1 站 · 可回收物',title:'变废为宝的再生工厂',intro:'纸箱、塑料瓶、易拉罐、旧衣服……洗干净、沥干水，它们就能回炉再造，变成新东西。',speak:'可回收物是放错地方的宝贝。纸箱、塑料瓶、易拉罐、旧衣服，洗干净沥干水，就能回炉再造，变成新的纸、瓶子和其他用品。投放前记得把瓶盖拧下来，倒掉里面的东西。'},
    {id:'hazardous',cat:'red',kicker:'第 2 站 · 有害垃圾',title:'危险小卫士的专属通道',intro:'电池、灯管、过期药品……乱扔会污染土壤和水。它们要走专门的处理通道，绝不让危险溜进环境。',speak:'有害垃圾里藏着电池、灯管、过期药品和油漆桶。它们含有重金属和有害物质，乱扔会污染土壤和水。所以要轻拿轻放，投进专门的红色容器，交给专业工厂集中处理。'},
    {id:'kitchen',cat:'brown',kicker:'第 3 站 · 湿垃圾',title:'厨余垃圾的堆肥魔法',intro:'剩饭、果皮、菜叶……沥干水送进生化工厂，变沼气发电，变肥料回归土地。',speak:'湿垃圾就是容易腐烂的厨余垃圾：剩饭、果皮、菜叶。它们沥干水后送进生化工厂，在缺氧环境里发酵产生沼气，沼气可以发电；剩下的渣还能做成肥料，让养分回到土地里。'},
    {id:'residual',cat:'black',kicker:'第 4 站 · 干垃圾',title:'干垃圾的焚烧发电之旅',intro:'纸巾、陶瓷碎片、烟蒂、大骨头……它们送去焚烧发电，烧不掉的再规范填埋。',speak:'干垃圾是前三类都进不去的其他垃圾：纸巾、陶瓷碎片、烟蒂、大骨头。它们收运后进入焚烧发电厂，燃烧产生的热能用来发电；烧不掉的炉渣经过处理再规范填埋。'}
  ];
  function journeyDone(state){return journeyStations.every(st=>state.journey.includes(st.id))||(C.lessons.length&&C.lessons.every(l=>state.lessons.includes(l.id)))}
  function journeyRail(ctx){const s=ctx.state;const current=s.journey.length;return `<section class="museum-journey-rail" style="--cat:${D.categories[Math.min(current,journeyStations.length)]?.color||'#69dfae'}"><div class="museum-journey-head"><span class="museum-journey-flag">✦</span><div><h3>闯关旅程 · 跟着小达人走完四分类</h3><p>按顺序逛 4 个主题站：每站看一条知识，答对 1 道验证题就点亮一站。走完全程，解锁环保知识小测验！</p></div><em>${s.journey.length} / ${journeyStations.length}</em></div><div class="museum-journey-path" role="list" aria-label="闯关路径">${journeyStations.map((st,i)=>{const done=s.journey.includes(st.id),isNext=!done&&i===s.journey.length;return `<div class="museum-journey-node ${done?'done':''} ${isNext?'next':''}" role="listitem" style="--cat:${D.category(st.cat).color}"><button type="button" data-action="museum-journey" data-station="${st.id}" ${done?'':'aria-label="进入'+escape(st.kicker)+'"'}><span class="museum-node-icon">${done?'✓':String(i+1)}</span></button><small>${escape(st.kicker.replace('第 '+String(i+1)+' 站 · ',''))}</small></div>${i<journeyStations.length-1?`<i class="museum-journey-link ${done?'done':''}"></i>`:''}`}).join('')}<div class="museum-journey-node finish ${journeyDone(s)?'done':''}"><span class="museum-node-icon">🏁</span><small>终点</small></div></div>${journeyDone(s)?`<button type="button" class="primary-button museum-journey-finish-cta" data-action="quiz">${'终点已点亮 · 解锁小测验 →'}</button>`:`<button type="button" class="secondary-button museum-journey-start" data-action="museum-journey" data-station="${s.journey.length<journeyStations.length?journeyStations[s.journey.length].id:journeyStations[0].id}">${s.journey.length?'继续闯关':'开始闯关'} · ${s.journey.length+1>journeyStations.length?'已完成':escape(journeyStations[Math.min(s.journey.length,journeyStations.length-1)].kicker)} →</button>`}</div></section>`}
  function journeyStationCard(ctx,st){const s=ctx.state,done=s.journey.includes(st.id);const cat=D.category(st.cat);const journey=categoryJourney[st.cat];const review=quizReview.find(q=>q.c===st.cat);const opts=D.categories.map(c=>c.id);return `<div class="museum-view museum-journey-view" style="--cat:${cat.color}"><button class="secondary-button museum-back" data-action="museum-back" data-to="home">${'← 返回旅程地图'}</button><div class="museum-journey-hero" style="--cat:${cat.color}">${catArt(st.cat,84)}<div><span class="museum-story-kicker">${escape(st.kicker)}</span><h3>${escape(st.title)}</h3><p>${escape(st.intro)}</p></div><button type="button" class="museum-speak-btn" data-action="journey-speak" data-text="${escape(st.speak)}" aria-label="朗读本条知识">🔊 朗读</button></div><div class="museum-story-grid">${storySection('它们去了哪',journey.go)}${storySection('怎样变废为宝',journey.resource)}</div><section class="museum-journey-check" style="--cat:${cat.color}">${done?`<p class="museum-done">本站已完成 ✓ 可以随时回来重看。</p><button type="button" class="primary-button" data-action="journey-next" data-station="${st.id}">${'继续下一站 →'}</button>`:review?`<h4>当场验证题 · 考一考</h4><p>「${escape(review.n)}」应该放进哪个桶？</p><div class="museum-journey-opts">${opts.map(cid=>`<button type="button" class="museum-journey-opt" data-action="journey-answer" data-station="${st.id}" data-cat="${cid}" data-correct="${cid===review.c?'1':'0'}">${catArt(cid,44)}<strong>${escape(C.fields['category.'+cid+'.name']?.value||cid)}</strong></button>`).join('')}</div><p class="museum-journey-fb" role="status"></p>${ctx.journeyHint?`<p class="museum-journey-hint">小提示：${escape(review.w)}</p>`:''}`:`<p class="museum-done">本站没有配套易混题，直接点亮吧！</p><button type="button" class="primary-button" data-action="journey-next" data-station="${st.id}">${'继续下一站 →'}</button>`}</div></div>`}
  const Museum={render(ctx){const view=ctx.view||{};if(view.type==='journey'){const st=journeyStations.find(x=>x.id===view.station);if(st)return journeyStationCard(ctx,st);}if(view.type==='story'){const item=D.byId[view.item];if(item)return storyView(ctx,item);}if(view.type==='category'){const cat=D.categories.find(c=>c.id===view.cat);if(cat)return categoryView(ctx,cat);}return homeView(ctx);}};
  root.EcoMuseum=Museum;
})(window);
