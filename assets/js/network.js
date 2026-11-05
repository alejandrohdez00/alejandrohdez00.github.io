/*
 * Rizoma: a living background network.
 * Seeds sprout branching trees; new nodes sometimes reach out and connect to
 * nearby nodes (also on other trees). Trees grow, rest, fade and re-sprout,
 * so the whole thing loops like a GIF. Colours flow through the spectrum
 * along each branch and over time. The rest of the site's colours are static.
 */
(function () {
  var canvas = document.querySelector('.network');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0, H = 0, DPR = 1;
  var trees = [], nodes = [], edges = [];
  var clock = 0, last = 0, spawnTimer = 0;
  var isDark = true;

  function readTheme() { isDark = root.dataset.theme === 'dark'; }

  function colorFor(tree, depth, alpha) {
    var h = (tree.hue + depth * 24 + clock * 10) % 360;
    return 'hsla(' + Math.round(h) + ',' + (isDark ? '80%,66%,' : '72%,50%,') + alpha.toFixed(3) + ')';
  }

  /* ---------- growth model ---------- */
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function targetTrees() { return W < 700 ? 2 : 4; }

  function spawnTree() {
    var col = Math.min(W, 760), margin = (W - col) / 2, x;
    if (margin > 140 && Math.random() < 0.8) {
      x = Math.random() < 0.5 ? Math.random() * margin : W - Math.random() * margin;
    } else {
      x = Math.random() * W;
    }
    var tree = {
      hue: Math.random() * 360, offset: Math.random(), alpha: 0,
      state: 'grow', timer: 0, pending: 0, count: 0,
      maxNodes: 45 + Math.floor(Math.random() * 45),
      scale: W < 700 ? 0.7 : 1
    };
    trees.push(tree);
    addNode(tree, x, H * (0.08 + Math.random() * 0.84), 0, Math.random() * Math.PI * 2);
  }

  function addNode(tree, x, y, depth, angle) {
    var n = { tree: tree, x: x, y: y, depth: depth, angle: angle, born: clock, pulse: clock };
    nodes.push(n); tree.count++;
    branch(n);
    if (depth > 0 && Math.random() < 0.3) link(n);
    return n;
  }

  function branch(n) {
    var t = n.tree;
    if (n.depth >= 8 || t.count >= t.maxNodes || nodes.length > 320) return;
    var k = n.depth === 0 ? 3 : (Math.random() < 0.5 ? 1 : (Math.random() < 0.7 ? 2 : 0));
    for (var i = 0; i < k; i++) {
      var a = n.depth === 0
        ? n.angle + (i / k) * Math.PI * 2 + (Math.random() - 0.5) * 0.6
        : n.angle + (Math.random() - 0.5) * 1.5;
      var len = (65 + Math.random() * 65) * Math.pow(0.9, n.depth) * t.scale;
      var bx = n.x + Math.cos(a) * len, by = n.y + Math.sin(a) * len;
      if (bx < -30 || bx > W + 30 || by < -30 || by > H + 30) continue;
      addEdge(t, n, { x: bx, y: by }, len, 'branch', a, n.depth + 1);
    }
  }

  function link(n) {
    var best = null, bestD = 135 * n.tree.scale;
    for (var i = 0; i < nodes.length; i++) {
      var m = nodes[i];
      if (m === n || m.tree.state === 'fade') continue;
      var d = Math.hypot(m.x - n.x, m.y - n.y);
      if (d < 25) continue;
      // prefer connecting to other trees
      if (m.tree !== n.tree) d *= 0.7;
      if (d < bestD) { bestD = d; best = m; }
    }
    if (best) addEdge(n.tree, n, best, Math.hypot(best.x - n.x, best.y - n.y), 'link', 0, n.depth);
  }

  function addEdge(tree, a, b, len, kind, angle, depth) {
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    var bend = (Math.random() - 0.5) * 0.5 * len;
    var nx = -(b.y - a.y) / (len || 1), ny = (b.x - a.x) / (len || 1);
    edges.push({
      tree: tree, a: a, b: b, len: len, kind: kind, angle: angle, depth: depth,
      cx: mx + nx * bend, cy: my + ny * bend, p: 0, done: false
    });
    tree.pending++;
  }

  function update(dt) {
    // trees lifecycle
    for (var i = trees.length - 1; i >= 0; i--) {
      var t = trees[i];
      if (t.state === 'grow') {
        t.alpha = Math.min(1, t.alpha + dt / 1.5);
        if (t.pending === 0) { t.state = 'hold'; t.timer = 5 + Math.random() * 4; }
      } else if (t.state === 'hold') {
        t.timer -= dt;
        if (t.timer <= 0) t.state = 'fade';
      } else {
        t.alpha -= dt / 4;
        if (t.alpha <= 0) {
          trees.splice(i, 1);
          nodes = nodes.filter(function (n) { return n.tree !== t; });
          edges = edges.filter(function (e) { return e.tree !== t; });
        }
      }
    }
    // grow edges
    var born = [];
    for (var j = 0; j < edges.length; j++) {
      var e = edges[j];
      if (e.done) continue;
      var speed = (e.kind === 'link' ? 85 : 60) * e.tree.scale;
      e.p = Math.min(1, e.p + (speed * dt) / Math.max(e.len, 1));
      if (e.p >= 1) {
        e.done = true; e.tree.pending--;
        if (e.kind === 'branch') born.push(e);
        else e.b.pulse = clock; // a link arriving makes the target bloom
      }
    }
    born.forEach(function (e) { e.b = addNode(e.tree, e.b.x, e.b.y, e.depth, e.angle); });
    // keep the forest populated
    spawnTimer -= dt;
    var alive = trees.filter(function (t) { return t.state !== 'fade'; }).length;
    if (alive < targetTrees() && spawnTimer <= 0) { spawnTree(); spawnTimer = 2 + Math.random() * 3; }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';
    for (var i = 0; i < edges.length; i++) {
      var e = edges[i], al = e.tree.alpha;
      if (al <= 0 || e.p <= 0) continue;
      var t = e.p, ax = e.a.x, ay = e.a.y;
      var q0x = ax + (e.cx - ax) * t, q0y = ay + (e.cy - ay) * t;
      var q1x = e.cx + (e.b.x - e.cx) * t, q1y = e.cy + (e.b.y - e.cy) * t;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(q0x, q0y, q0x + (q1x - q0x) * t, q0y + (q1y - q0y) * t);
      ctx.strokeStyle = colorFor(e.tree, e.depth, (e.kind === 'link' ? 0.4 : 0.7) * al);
      ctx.lineWidth = e.kind === 'link' ? 0.8 : Math.max(0.7, 1.7 - e.depth * 0.13);
      if (e.kind === 'link') ctx.setLineDash([2, 4]); else ctx.setLineDash([]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    for (var j = 0; j < nodes.length; j++) {
      var n = nodes[j], a = n.tree.alpha;
      if (a <= 0) continue;
      var age = clock - n.born, r = Math.max(1.3, 3.2 - n.depth * 0.25) * Math.min(1, age / 0.4 + 0.2);
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = colorFor(n.tree, n.depth, 0.9 * a);
      ctx.fill();
      var pa = clock - n.pulse;
      if (pa < 1.4) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + pa * 13, 0, Math.PI * 2);
        ctx.strokeStyle = colorFor(n.tree, n.depth, (1 - pa / 1.4) * 0.5 * a);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  function frame(ts) {
    requestAnimationFrame(frame);
    if (!last) { last = ts; return; }
    var dt = (ts - last) / 1000;
    if (dt < 1 / 32) return;          // ~30 fps is plenty for a backdrop
    last = ts; dt = Math.min(dt, 0.1); // no jumps after a hidden tab
    clock += dt;
    update(dt);
    draw();
  }

  /* ---------- boot ---------- */
  resize();
  readTheme();
  new MutationObserver(function () { readTheme(); if (reduce) draw(); })
    .observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  if (reduce) {
    // A single, still, fully grown network.
    for (var s = 0; s < targetTrees(); s++) spawnTree();
    trees.forEach(function (t) { t.alpha = 1; });
    for (var k = 0; k < 600; k++) {
      update(0.1);
      trees.forEach(function (t) { t.state = 'grow'; t.alpha = 1; });
    }
    clock = 0; nodes.forEach(function (n) { n.born = -9; n.pulse = -9; });
    draw();
    window.addEventListener('resize', function () { resize(); draw(); });
  } else {
    window.addEventListener('resize', resize);
    spawnTree();
    if (W >= 700) spawnTree();
    requestAnimationFrame(frame);
  }
})();
