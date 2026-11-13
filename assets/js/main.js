(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function host(u) { try { return new URL(u).host; } catch (e) { return u; } }

  var toastEl;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------- mobile nav ---------- */
  var mb = $(".menu-btn"), nav = $("#nav");
  if (mb && nav) {
    mb.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", open ? "true" : "false");
      mb.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- year ---------- */
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- profile image ---------- */
  $$("[data-profile]").forEach(function (box) {
    if (!S.profileImage) { box.innerHTML = '<div class="fallback">KK</div>'; return; }
    var img = new Image();
    img.alt = "Portrait of " + S.name;
    img.decoding = "async";
    img.onerror = function () { box.innerHTML = '<div class="fallback">KK</div>'; };
    img.src = S.profileImage;
    box.appendChild(img);
  });

  /* ---------- hero phone video ---------- */
  var screen = $("#screen");
  if (screen) {
    var fill = $("#barFill"), time = $("#barTime"), mute = $("#muteBtn"), intro = $("#introScreen");
    function fmt(n) { n = Math.max(0, Math.floor(n)); return "0:" + (n < 10 ? "0" : "") + n; }

    if (S.heroVideo) {
      var v = document.createElement("video");
      v.src = S.heroVideo;
      if (S.heroVideoPoster) v.poster = S.heroVideoPoster;
      v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true;
      v.setAttribute("playsinline", ""); v.setAttribute("webkit-playsinline", "");
      v.preload = "auto";
      v.setAttribute("aria-label", "Intro reel by " + S.name);
      screen.insertBefore(v, screen.firstChild);
      if (intro) intro.style.display = "none";

      var tryPlay = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
      tryPlay();
      document.addEventListener("click", tryPlay, { once: true });
      document.addEventListener("touchstart", tryPlay, { once: true, passive: true });

      v.addEventListener("timeupdate", function () {
        var d = v.duration || 10;
        fill.style.width = (v.currentTime / d * 100) + "%";
        time.textContent = fmt(v.currentTime) + " / " + fmt(d);
      });
      v.addEventListener("error", function () { if (intro) intro.style.display = "flex"; v.remove(); startFake(); });

      mute.addEventListener("click", function () {
        v.muted = !v.muted;
        mute.textContent = v.muted ? "🔇" : "🔊";
        mute.setAttribute("aria-label", v.muted ? "Unmute video" : "Mute video");
        if (!v.muted) tryPlay();
      });
    } else {
      mute.style.display = "none";
      startFake();
    }

    function startFake() {
      var t0 = performance.now(), D = 10000;
      (function tick(now) {
        var e = (now - t0) % D;
        fill.style.width = (e / D * 100) + "%";
        time.textContent = fmt(e / 1000) + " / 0:10";
        requestAnimationFrame(tick);
      })(t0);
    }
  }

  /* ---------- projects ---------- */
  var STATUS = { live: "Live", upcoming: "Upcoming", case: "Case study" };

  function shot(p) {
    var inner;
    var ph = '<div class="ph"><b>' + esc(p.title) + "</b><span>" + esc(p.kind) + "</span></div>";
    var bar = '<div class="bar-top" aria-hidden="true"><i></i><i></i><i></i></div>';
    if (p.image) {
      inner = bar + '<img loading="lazy" src="' + esc(p.image) + '" alt="Screenshot of ' + esc(p.title) + '">';
    } else if (p.url) {
      inner = bar + ph.replace('class="ph"', 'class="ph" data-ph') +
        '<img loading="lazy" alt="Preview of ' + esc(p.title) + '" src="https://s0.wp.com/mshots/v1/' +
        encodeURIComponent(p.url) + '?w=800&h=600" style="position:absolute;inset:22px 0 0;padding:0;opacity:0" onload="if(this.naturalWidth>400){this.style.opacity=1;var h=this.parentNode.querySelector(\'[data-ph]\');if(h)h.style.display=\'none\'}">';
    } else {
      inner = bar + ph;
    }
    var cls = "shot";
    if (p.url) {
      return '<a class="' + cls + '" href="' + esc(p.url) + '" target="_blank" rel="noopener" aria-label="Open ' + esc(p.title) + '">' + inner + "</a>";
    }
    return '<div class="' + cls + '">' + inner + "</div>";
  }

  function row(p) {
    var tags = (p.stack || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var act = p.url
      ? '<a class="btn dark small" href="' + esc(p.url) + '" target="_blank" rel="noopener">Visit project</a><span class="url">' + esc(host(p.url)) + "</span>"
      : '<span class="btn small" aria-disabled="true">' + (p.status === "upcoming" ? "In progress" : "No public link") + "</span>";
    return (
      '<article class="prow" data-status="' + esc(p.status) + '">' +
        '<div class="pbody">' +
          '<div class="pmeta"><span class="status ' + esc(p.status) + '">' + (STATUS[p.status] || "") + "</span><span>" + esc(p.kind) + "</span></div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<p class="sum">' + esc(p.summary) + "</p>" +
          '<p class="dep">' + esc(p.depth) + "</p>" +
          '<ul class="tags">' + tags + "</ul>" +
          '<div class="pact">' + act + "</div>" +
        "</div>" +
        '<div class="shot-wrap">' + shot(p) + "</div>" +
      "</article>"
    );
  }

  var all = $("#projects-all");
  if (all) {
    var render = function (f) {
      var list = S.projects.filter(function (p) { return f === "all" || p.status === f; });
      all.innerHTML = list.length ? list.map(row).join("") : '<p style="padding:32px 0;color:var(--mute)">Nothing here yet.</p>';
    };
    render("all");
    $$(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        $$(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        render(b.getAttribute("data-f"));
      });
    });
  }

  var feat = $("#projects-featured");
  if (feat) {
    feat.innerHTML = S.projects.filter(function (p) { return p.featured; }).slice(0, 3).map(row).join("");
  }

  /* ---------- skills ---------- */
  function thumb(k) {
    if (k.image) {
      return '<span class="thumb"><img loading="lazy" src="' + esc(k.image) + '" alt="' + esc(k.title) + ' logo" onerror="this.parentNode.innerHTML=\'<b>' + esc(k.title.charAt(0)) + '</b>\'"></span>';
    }
    return '<span class="thumb" aria-hidden="true"><b>' + esc(k.title.charAt(0)) + "</b></span>";
  }
  var sk = $("#skills-teaser");
  if (sk && S.skills) {
    sk.innerHTML = S.skills.map(function (k) {
      return '<a class="stile" href="skills.html#' + esc(k.id) + '">' + thumb(k) +
        "<div><h3>" + esc(k.title) + "</h3><p>" + esc(k.short) + "</p></div></a>";
    }).join("");
  }
  var sa = $("#skills-all");
  if (sa && S.skills) {
    var li = function (a) { return a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };
    sa.innerHTML = S.skills.map(function (k) {
      return '<article class="srow" id="' + esc(k.id) + '">' +
        '<div class="shead">' + thumb(k) + "<div><h2>" + esc(k.title) + "</h2><p>" + esc(k.short) + "</p></div></div>" +
        '<div class="sdetail"><div><h3>What I set up</h3><ul>' + li(k.setup) + "</ul></div>" +
        '<div><h3>Errors I fix</h3><ul>' + li(k.fixes) + "</ul></div></div></article>";
    }).join("");
    var jp = $("#skills-jump");
    if (jp) jp.innerHTML = S.skills.map(function (k) { return '<a href="#' + esc(k.id) + '">' + esc(k.title.replace(/ (setup|integration|authentication|configuration)$/i, "")) + "</a>"; }).join("");
  }

  /* ---------- knowledge map ---------- */
  var kn = $("#knowledge");
  if (kn) {
    kn.innerHTML = S.knowledge.map(function (k) {
      return '<div class="kb"><h3>' + esc(k.area) + "</h3><ul>" +
        k.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
  }

  /* ---------- contact info + copy ---------- */
  $$("[data-email]").forEach(function (e) { e.textContent = S.email; if (e.tagName === "A") e.href = "mailto:" + S.email; });
  $$("[data-mailto]").forEach(function (e) { e.href = "mailto:" + S.email; });
  $$("[data-tel]").forEach(function (e) { e.href = "tel:" + S.phoneRaw; });
  $$("[data-phone]").forEach(function (e) { e.textContent = S.phone; if (e.tagName === "A") e.href = "tel:" + S.phoneRaw; });
  $$("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var val = b.getAttribute("data-copy") === "email" ? S.email : S.phone;
      var done = function () { toast("Copied " + val); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done, function () { toast("Copy failed. Select the text instead."); });
      } else {
        var ta = document.createElement("textarea"); ta.value = val; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { toast("Copy failed. Select the text instead."); }
        ta.remove();
      }
    });
  });

  /* ---------- contact form (opens the visitor's mail app) ---------- */
  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var n = form.name.value.trim(), m = form.email.value.trim(), s = form.subject.value.trim(), t = form.message.value.trim();
      if (!n || !m || !t) { toast("Fill in your name, email and message."); return; }
      var subj = s || "Message from " + n;
      var body = t + "\n\n— " + n + " (" + m + ")";
      window.location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
      toast("Opening your email app");
    });
  }
})();
