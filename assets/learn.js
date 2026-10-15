/* ---------- R58 去学习：垃圾分类小课堂（独立模块，依赖 app.js 全局环境） ---------- */
(function () {
  'use strict';
  if (window.__LEARN_LOADED__) return;
  window.__LEARN_LOADED__ = true;

  const LEARN_KEYS = ['recyclable', 'kitchen', 'hazardous', 'other'];
  let learnScore = 0;    /* 本次小测验答对题数（会话内累计，用于顶部角标） */
  let groupCorrect = 0;  /* R63：当前这一组答对数（结算页用） */
  let groupEarned = 0;  /* R63：当前这一组获得积分（结算页用） */
  let learnQuizQ = [];   /* 当前测验题列表 */
  let learnQuizIdx = -1; /* 当前题下标 */
  let learnCur = null;   /* 当前正在浏览的分类 */

  function q1(sel) { return document.querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* R63：运行时配置合并 —— config（管理员编辑后持久化）优先，缺省回退 DEFAULT_CONFIG.learn */
  function learnCfg() {
    var def = (typeof DEFAULT_CONFIG !== 'undefined' && DEFAULT_CONFIG.learn) || {};
    var cur = (typeof config !== 'undefined' && config.learn) || {};
    function pick(key, fallback) {
      var v = (cur[key] !== undefined && cur[key] !== null) ? cur[key] : def[key];
      return (v === undefined || v === null) ? fallback : v;
    }
    return {
      intro: pick('intro', {}) || {},
      tips: pick('tips', {}) || {},
      tricky: pick('tricky', []) || [],
      quiz: pick('quiz', []) || [],
      pointsPerCorrect: pick('pointsPerCorrect', 10),
      questionCount: pick('questionCount', 5),
      perAccountLimit: pick('perAccountLimit', 0)
    };
  }

  /* R63：共享模块接口（app.js 顶层函数）。app.js 未改造完成时防御降级为“不限” */
  function canPlayLearn() { try { if (typeof canPlayModule === 'function') return !!canPlayModule('learn'); } catch (e) {} return true; }
  function bumpLearnCount() { try { if (typeof bumpModuleCount === 'function') bumpModuleCount('learn'); } catch (e) {} }
  function bumpLearnPlay() { try { if (typeof bumpPlayCount === 'function') bumpPlayCount('learn'); } catch (e) {} }
  function awardLearn(pts) { try { if (typeof addModuleScore === 'function' && pts) addModuleScore('learn', pts); } catch (e) {} }

  /* 视图切换：显示学习页，隐藏其它 #view-* */
  function showLearnView() {
    qa('[id^="view-"]').forEach(function (v) { if (v.id !== 'view-learn') v.classList.add('is-hidden'); });
    var vl = q1('#view-learn'); if (vl) vl.classList.remove('is-hidden');
  }
  function showHomeView() {
    qa('[id^="view-"]').forEach(function (v) { v.classList.add('is-hidden'); });
    var vh = q1('#view-home'); if (vh) vh.classList.remove('is-hidden');
  }

  function learnHome() {
    if (typeof window !== 'undefined') { try { window.scrollTo(0, 0); } catch (e) {} }
    var _vl = q1('#view-learn'); if (_vl) { try { _vl.scrollTop = 0; } catch (e) {} }
    var d = learnCfg();
    var L = d.intro || {};
    var wrap = q1('#learn-body'); if (!wrap) return;
    learnCur = null;
    var sc = q1('#learn-score');
    if (sc) sc.textContent = learnScore ? '答对 ' + learnScore + ' 题' : '';
    var ti = q1('#learn-title'); if (ti) ti.textContent = '垃圾分类小课堂';
    wrap.innerHTML =
      '<div class="learn-grid">' +
      LEARN_KEYS.map(function (k) {
        var it = L[k] || {};
        return '<button class="learn-card" data-learn="' + k + '" type="button" style="--c:' + (it.color || '#888888') + '">' +
          '<img class="learn-card-mark" src="' + (it.mark || '') + '" alt="' + (it.name || k) + '">' +
          '<b class="learn-card-name">' + (it.name || k) + '</b>' +
          '<span class="learn-card-alias">' + (it.alias || '') + '</span>' +
          '<span class="learn-card-cta">去学习 →</span>' +
          '</button>';
      }).join('') +
      '</div>' +
      '<p class="learn-foot-note">内容依据《上海市生活垃圾分类投放指南》（上海市绿化和市容管理局发布）。学完记得来「考考你」测一测！</p>';
    qa('.learn-card', wrap).forEach(function (b) { b.addEventListener('click', function () { learnOpen(b.dataset.learn); }); });
  }

  function learnOpen(k) {
    if (typeof window !== 'undefined') { try { window.scrollTo(0, 0); } catch (e) {} }
    var _vl = q1('#view-learn'); if (_vl) { try { _vl.scrollTop = 0; } catch (e) {} }
    var d = learnCfg();
    var it = (d.intro || {})[k];
    if (!it) return;
    learnCur = k;
    var wrap = q1('#learn-body'); if (!wrap) return;
    /* R63 修复 bug：原误读 config.learnTips（不存在），应为 config.learn.tips；缺省回退默认 */
    var tip = (d.tips || {})[k] || '';
    var tricky = (d.tricky || []).filter(function (t) { return t.bin === k; });
    var ti = q1('#learn-title'); if (ti) ti.textContent = it.name + ' · 小课堂';
    var sc = q1('#learn-score');
    if (sc) sc.textContent = learnScore ? '答对 ' + learnScore + ' 题' : '';
    var items = it.items || [];
    wrap.innerHTML =
      '<button class="learn-back" id="learn-back" type="button">← 返回课堂</button>' +
      '<div class="learn-hero" style="--c:' + it.color + '">' +
        '<img class="learn-hero-mark" src="' + it.mark + '" alt="">' +
        '<div class="learn-hero-txt"><b class="learn-hero-name">' + it.name + '</b><span class="learn-hero-alias">' + (it.alias || '') + '</span></div>' +
      '</div>' +
      '<div class="learn-card-block"><h3>它是什么？</h3><p class="learn-def">' + (it.def || '') + '</p></div>' +
      (tip ? '<div class="learn-card-block learn-tip"><h3>小程说</h3><p>' + tip + '</p></div>' : '') +
      '<div class="learn-card-block"><h3>常见物品</h3><div class="learn-chips">' +
        items.map(function (n) { return '<span class="learn-chip">' + n + '</span>'; }).join('') +
      '</div></div>' +
      '<div class="learn-card-block"><h3>投放小贴士</h3><p class="learn-def">' + (it.note || '') + '</p></div>' +
      (tricky.length ? '<div class="learn-card-block learn-tricky"><h3>容易搞错</h3><div class="learn-chips">' +
        tricky.map(function (t) { return '<span class="learn-chip">' + t.name + '</span>'; }).join('') +
        '</div><p class="learn-tricky-tip">这些都属于「' + it.name + '」，别扔错桶哦！</p></div>' : '') +
      '<div class="learn-card-block learn-quiz-cta"><h3>考考你</h3><p>下面这些垃圾，你知道扔进哪个桶吗？</p><button class="btn btn-primary" id="btn-learn-quiz" type="button">开始答题</button></div>';
    var back = q1('#learn-back');
    if (back) back.addEventListener('click', learnHome);
    var qb = q1('#btn-learn-quiz');
    if (qb) qb.addEventListener('click', learnQuizAsk);
  }

  function learnQuizAsk() {
    var d = learnCfg();
    /* R63 单账号题数限制：开始答题前判定 */
    if (!canPlayLearn()) {
      renderLearnLimitBlock();
      return;
    }
    var pool = (d.quiz || []).slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    /* R63：题数取 config.learn.questionCount（默认 5），不超过题池大小 */
    var qc = parseInt(d.questionCount, 10);
    if (!(qc > 0)) qc = 5;
    learnQuizQ = pool.slice(0, Math.min(qc, pool.length));
    learnQuizIdx = 0;
    groupCorrect = 0;   /* R63：每组重置 */
    groupEarned = 0;
    if (!learnQuizQ.length) {
      var wrap0 = q1('#learn-body'); if (wrap0) {
        wrap0.innerHTML =
          '<button class="learn-back" id="learn-back" type="button">← 返回课堂</button>' +
          '<div class="learn-quiz-result"><h3>题目还没准备好</h3>' +
          '<p class="learn-result-msg">题池为空，请管理员在编辑面板添加题目后再来～</p></div>';
        var bk0 = q1('#learn-back');
        if (bk0) bk0.addEventListener('click', function () { learnHome(); if (learnCur) learnOpen(learnCur); });
      }
      return;
    }
    renderLearnQuiz();
  }

  /* R63：次数达上限拦截页 */
  function renderLearnLimitBlock() {
    if (typeof window !== 'undefined') { try { window.scrollTo(0, 0); } catch (e) {} }
    var _vl = q1('#view-learn'); if (_vl) { try { _vl.scrollTop = 0; } catch (e) {} }
    var wrap = q1('#learn-body'); if (!wrap) return;
    var ti = q1('#learn-title'); if (ti) ti.textContent = '考考你';
    wrap.innerHTML =
      '<div class="r63-limit-block">' +
        '<div class="r63-limit-icon">🔒</div>' +
        '<h3>今日答题次数已达上限</h3>' +
        '<p>联系管理员解锁后即可继续答题～</p>' +
        '<div class="learn-result-actions">' +
        '<button class="btn btn-primary" id="learn-back" type="button">返回课堂</button>' +
        '</div></div>';
    var bk = q1('#learn-back');
    if (bk) bk.addEventListener('click', function () { learnHome(); if (learnCur) learnOpen(learnCur); });
  }

  function renderLearnQuiz() {
    if (typeof window !== 'undefined') { try { window.scrollTo(0, 0); } catch (e) {} }
    var _vl = q1('#view-learn'); if (_vl) { try { _vl.scrollTop = 0; } catch (e) {} }
    var wrap = q1('#learn-body'); if (!wrap) return;
    var q = learnQuizQ[learnQuizIdx];
    if (!q) { renderLearnQuizFinish(); return; }
    var d = learnCfg();
    var L = d.intro || {};
    var ti = q1('#learn-title');
    if (ti) ti.textContent = '考考你 · ' + (learnQuizIdx + 1) + ' / ' + learnQuizQ.length;
    wrap.innerHTML =
      '<button class="learn-back" id="learn-back" type="button">← 返回课堂</button>' +
      '<div class="learn-quiz"><h3 class="learn-quiz-q">「' + q.name + '」应该扔进哪个桶？</h3>' +
      '<div class="learn-quiz-opts">' +
      LEARN_KEYS.map(function (k) {
        var it = L[k] || {};
        return '<button class="learn-quiz-opt" data-bin="' + k + '" type="button" style="--c:' + (it.color || '#888888') + '">' +
          '<img src="' + (it.mark || '') + '" alt=""><span>' + (it.name || k) + '</span></button>';
      }).join('') +
      '</div></div>';
    var back = q1('#learn-back');
    if (back) back.addEventListener('click', function () { learnHome(); if (learnCur) learnOpen(learnCur); });
    qa('.learn-quiz-opt', wrap).forEach(function (b) { b.addEventListener('click', function () { learnQuizAnswer(b.dataset.bin); }); });
  }

  function learnQuizAnswer(bin) {
    var wrap = q1('#learn-body'); if (!wrap) return;
    var q = learnQuizQ[learnQuizIdx];
    if (!q) return;
    var ok = bin === q.bin;
    var d = learnCfg();
    /* R63：答对立即结算积分（config.learn.pointsPerCorrect，默认10），并累计本组 */
    var pts = parseInt(d.pointsPerCorrect, 10);
    if (!(pts >= 0)) pts = 10;
    if (ok) {
      learnScore += 1;
      groupCorrect += 1;
      groupEarned += pts;
      awardLearn(pts);
      if (typeof SFX !== 'undefined' && SFX.correct) { try { SFX.correct(); } catch (e) {} }
    }
    else if (typeof SFX !== 'undefined' && SFX.wrong) { try { SFX.wrong(); } catch (e) {} }
    /* R63：每答完一题（无论对错）消耗一次单账号题数额度 */
    bumpLearnCount();
    var right = (d.intro || {})[q.bin] || {};
    var av = (typeof config !== 'undefined' && config.avatar) || {};
    wrap.innerHTML =
      '<div class="learn-quiz-result ' + (ok ? 'is-ok' : 'is-no') + '">' +
        '<img class="learn-result-fb" src="' + (ok ? av.cheer : av.oops) + '" alt="">' +
        '<h3>' + (ok ? '答对啦！你真棒 🎉' : '哎呀，答错了…') + '</h3>' +
        '<p class="learn-result-ans">「' + q.name + '」属于 <b style="color:' + (right.color || '') + '">' + (right.name || '') + '</b>' + (ok ? '' : '，下次记住哦') + '</p>' +
        '<div class="learn-result-actions">' +
        '<button class="btn btn-primary" id="learn-next-q" type="button">' + (learnQuizIdx + 1 >= learnQuizQ.length ? '查看成绩' : '下一题') + '</button>' +
        '<button class="btn btn-ghost" id="learn-stop" type="button">不玩了</button>' +
        '</div></div>';
    var nx = q1('#learn-next-q');
    if (nx) nx.addEventListener('click', function () {
      learnQuizIdx += 1;
      if (learnQuizIdx >= learnQuizQ.length) renderLearnQuizFinish();
      else renderLearnQuiz();
    });
    var st = q1('#learn-stop');
    if (st) st.addEventListener('click', function () { learnHome(); if (learnCur) learnOpen(learnCur); });
  }

  function renderLearnQuizFinish() {
    if (typeof window !== 'undefined') { try { window.scrollTo(0, 0); } catch (e) {} }
    var _vl = q1('#view-learn'); if (_vl) { try { _vl.scrollTop = 0; } catch (e) {} }
    var wrap = q1('#learn-body'); if (!wrap) return;
    var total = learnQuizQ.length;
    /* R63：一次完整答题（全部答完）计一次游玩次数 */
    bumpLearnPlay();
    var sc = q1('#learn-score');
    if (sc) sc.textContent = learnScore ? '答对 ' + learnScore + ' 题' : '';
    var ti = q1('#learn-title'); if (ti) ti.textContent = '考考你 · 完成';
    wrap.innerHTML =
      '<div class="learn-quiz-result is-done">' +
        '<h3>小测验完成！</h3>' +
        '<p class="learn-result-score">答对 <b>' + groupCorrect + '</b> / ' + total + ' 题</p>' +
        (groupEarned > 0 ? '<p class="r63-finish-points">获得 <b>+' + groupEarned + '</b> 分 🎁</p>' : '') +
        '<p class="learn-result-msg">' + (groupCorrect === total ? '满分！你就是垃圾分类小达人！🌟' : groupCorrect >= Math.ceil(total / 2) ? '很不错！再接再厉～' : '多看看上面的知识，再来挑战一次吧！') + '</p>' +
        '<div class="learn-result-actions">' +
        '<button class="btn btn-primary" id="learn-again" type="button">再答一组</button>' +
        '<button class="btn btn-ghost" id="learn-back" type="button">返回课堂</button>' +
        '</div></div>';
    var ag = q1('#learn-again');
    if (ag) ag.addEventListener('click', learnQuizAsk);
    var bk = q1('#learn-back');
    if (bk) bk.addEventListener('click', function () { learnHome(); if (learnCur) learnOpen(learnCur); });
  }

  function enterLearn(k) {
    if (typeof SFX !== 'undefined' && SFX.click) { try { SFX.click(); } catch (e) {} }
    learnOpen(k || LEARN_KEYS[0]);
    showLearnView();
    /* R59：学习页用独立 BGM（不改动学习内容事实） */
    if (typeof SFX !== 'undefined' && SFX.bgmPlay) { try { SFX.bgmPlay('learn'); } catch (e) {} }
  }

  /* ========== R64 反馈20②：小课堂题库编辑面板（#edit-learn） ==========
     配合 index.html 新增的 data-tab="learn" 容器；若容器不存在则 JS 兜底创建并挂到 #panel-edit。
     题库数据 = config.learn.quiz（每项 { name, bin }），渲染为「物品名 + 正确分类」行，可增删改并保存。 */

  /* 兜底：#edit-learn 容器与「小课堂题库」tab 按钮不存在时创建 */
  function ensureLearnEditPanel() {
    var aside = q1('#panel-edit');
    if (!aside) return;
    if (!q1('#edit-learn')) {
      var body = document.createElement('div');
      body.className = 'panel-body is-hidden';
      body.id = 'edit-learn';
      aside.appendChild(body);
    }
    if (!q1('.edit-tab[data-tab="learn"]')) {
      var tabs = q1('.edit-tabs');
      if (tabs) {
        var btn = document.createElement('button');
        btn.className = 'edit-tab';
        btn.setAttribute('data-tab', 'learn');
        btn.type = 'button';
        btn.textContent = '小课堂题库';
        tabs.appendChild(btn);
      }
    }
  }

  /* 当前题库（config 优先，缺省回退默认；老存档兜底） */
  function learnQuizPool() {
    var def = (typeof DEFAULT_CONFIG !== 'undefined' && DEFAULT_CONFIG.learn && DEFAULT_CONFIG.learn.quiz) || [];
    var cur = (typeof config !== 'undefined' && config.learn && config.learn.quiz) || null;
    return Array.isArray(cur) ? cur : def.slice();
  }

  /* 分类下拉选项（用 config.bins 名称，回退固定四键） */
  function learnBinOptions() {
    var bins = (typeof config !== 'undefined' && config.bins) || [];
    return LEARN_KEYS.map(function (k) {
      var b = null;
      for (var i = 0; i < bins.length; i++) { if (bins[i].id === k) { b = bins[i]; break; } }
      return { id: k, name: (b && b.name) ? b.name : k };
    });
  }

  /* 渲染题库编辑器 */
  function renderLearnQuizEditor() {
    var box = q1('#edit-learn');
    if (!box) return;
    var pool = learnQuizPool();
    var binOpts = learnBinOptions();
    function optHtml(curBin) {
      return binOpts.map(function (o) {
        return '<option value="' + o.id + '"' + (o.id === curBin ? ' selected' : '') + '>' + o.name + '</option>';
      }).join('');
    }
    var rowsHtml = pool.map(function (item, idx) {
      var nm = (item && item.name) || '';
      var bn = (item && item.bin) || binOpts[0].id;
      return '<div class="r64-learn-q-row">' +
        '<input class="r64-learn-q-name" type="text" value="' + String(nm).replace(/"/g, '&quot;') + '" placeholder="物品名，如 报纸">' +
        '<select class="r64-learn-q-bin">' + optHtml(bn) + '</select>' +
        '<button class="btn btn-sm btn-ghost r64-learn-q-del" type="button">删除</button>' +
        '</div>';
    }).join('');
    box.innerHTML =
      '<div class="r64-learn-editor">' +
        '<h3>小课堂「考考你」题库</h3>' +
        '<p class="r64-learn-hint">每条 = 物品名 + 正确分类；答题时显示「物品名 应该扔进哪个桶？」。分类须依《上海市生活垃圾分类投放指南》口径。</p>' +
        '<div id="r64-learn-quiz-list">' + (rowsHtml || '<p class="r64-learn-empty">暂无题目，点下方「新增题目」</p>') + '</div>' +
        '<div class="r64-learn-actions">' +
          '<button class="btn btn-sm btn-primary" id="r64-learn-quiz-add" type="button">+ 新增题目</button>' +
          '<button class="btn btn-sm btn-primary" id="r64-learn-quiz-save" type="button">保存题库</button>' +
          '<span class="r64-learn-tip" id="r64-learn-quiz-tip"></span>' +
        '</div>' +
      '</div>';
    /* 新增一行 */
    var add = q1('#r64-learn-quiz-add');
    if (add) add.addEventListener('click', function () {
      var list = q1('#r64-learn-quiz-list');
      if (!list) return;
      var empty = q1('.r64-learn-empty');
      if (empty) empty.remove();
      var row = document.createElement('div');
      row.className = 'r64-learn-q-row';
      row.innerHTML =
        '<input class="r64-learn-q-name" type="text" value="" placeholder="物品名，如 报纸">' +
        '<select class="r64-learn-q-bin">' + optHtml(binOpts[0].id) + '</select>' +
        '<button class="btn btn-sm btn-ghost r64-learn-q-del" type="button">删除</button>';
      list.appendChild(row);
      bindRowDel(row);
    });
    /* 每行删除 */
    qa('.r64-learn-q-row', box).forEach(bindRowDel);
    /* 保存 */
    var save = q1('#r64-learn-quiz-save');
    if (save) save.addEventListener('click', function () {
      var arr = [];
      qa('.r64-learn-q-row', box).forEach(function (row) {
        var nm = (q1('.r64-learn-q-name', row) || {}).value || '';
        var bn = (q1('.r64-learn-q-bin', row) || {}).value || binOpts[0].id;
        nm = String(nm).trim();
        if (nm) arr.push({ name: nm, bin: bn });
      });
      if (typeof config === 'undefined' || !config.learn) { /* 老存档兜底 */ try { config.learn = { intro: {}, tips: {}, tricky: [] }; } catch (e) {} }
      if (config.learn) config.learn.quiz = arr;
      /* 持久化（复用 app.js 的 saveJSON / LS_CONFIG） */
      try {
        if (typeof saveJSON === 'function' && typeof LS_CONFIG !== 'undefined') saveJSON(LS_CONFIG, config);
      } catch (e) {}
      var tip = q1('#r64-learn-quiz-tip');
      if (tip) { tip.textContent = '已保存 ' + arr.length + ' 题 ✓'; }
      if (typeof SFX !== 'undefined' && SFX.correct) { try { SFX.correct(); } catch (e) {} }
    });
  }

  function bindRowDel(row) {
    var d = q1('.r64-learn-q-del', row);
    if (d && !d.__r64Bound) {
      d.__r64Bound = true;
      d.addEventListener('click', function () { row.remove(); });
    }
  }

  /* 接管「小课堂题库」tab 显隐与渲染 */
  function hookLearnEditTab() {
    ensureLearnEditPanel();
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('.edit-tab') : null;
      if (!t) return;
      var el = q1('#edit-learn');
      if (t.getAttribute('data-tab') === 'learn') {
        qa('.panel-body[id^="edit-"]').forEach(function (b) { b.classList.add('is-hidden'); });
        if (el) el.classList.remove('is-hidden');
        renderLearnQuizEditor();
      } else if (el) {
        el.classList.add('is-hidden');
      }
    });
  }

  function init() {
    /* R64：题库编辑面板兜底创建 + tab 接管（反馈20②） */
    try { hookLearnEditTab(); } catch (e) {}
    /* 首页四色标识 → 去学习（index.html 中已带 data-learn） */
    qa('.mark-item.is-learn').forEach(function (b) {
      b.addEventListener('click', function () { enterLearn(b.dataset.learn); });
    });
    /* 学习页内返回首页 */
    var bh = q1('#btn-learn-home');
    if (bh) bh.addEventListener('click', function () {
      if (typeof SFX !== 'undefined' && SFX.click) { try { SFX.click(); } catch (e) {} }
      if (window.renderHome) { try { renderHome(); } catch (e) {} }
      showHomeView();
      if (typeof SFX !== 'undefined' && SFX.bgmPlay) { try { SFX.bgmPlay('home'); } catch (e) {} }
    });
    /* R62：首页「去学习」大横幅入口绑定（本文件唯一新增改动） */
    qa('.learn-entry-big').forEach(function (b) {
      b.addEventListener('click', function () {
        if (typeof SFX !== 'undefined' && SFX.click) { try { SFX.click(); } catch (e) {} }
        learnHome();
        showLearnView();
        if (typeof SFX !== 'undefined' && SFX.bgmPlay) { try { SFX.bgmPlay('learn'); } catch (e) {} }
      });
    });
    learnHome();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
