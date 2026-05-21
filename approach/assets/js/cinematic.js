/* ============================================================
   CINEMATIC SCROLL WEBSITE  ::  engine script
   Project Baseline web deliverable.

   Reads window.CINEMATIC_CONFIG (see site.config.js), builds the
   page, and runs the scroll-scrubbed cinematic background.

   MECHANIC: the cinematic film is delivered as a sequence of
   frame images drawn to a <canvas> by scroll position. This is
   the technique behind premium product sites (Apple and similar).
   It needs no video seeking, so it is reliable on every host and
   on mobile, where scroll-scrubbed <video> is unreliable.

   You should not need to edit this file to launch a client site.
   Edit site.config.js and swap the media. This is the engine.
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.CINEMATIC_CONFIG;
  if (!cfg) { console.error("CINEMATIC_CONFIG missing. Load site.config.js first."); return; }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel) { return document.querySelector(sel); };

  /* ----------------------------------------------------------
     1. BUILD THE PAGE FROM CONFIG
     ---------------------------------------------------------- */
  function brandMarkup(name) {
    var parts = String(name).trim().split(" ");
    if (parts.length < 2) return name;
    var last = parts.pop();
    return parts.join(" ") + " <b>" + last + "</b>";
  }
  function accentTitle(str) {
    return (str || "").replace(/\[(.+?)\]/g, "<em>$1</em>");
  }

  // -- loader + header brand
  $("#loaderBrand").innerHTML = brandMarkup(cfg.brand.name);
  $("#headerLogo").innerHTML = brandMarkup(cfg.brand.name);

  // -- header nav + cta
  var navEl = $("#headerNav");
  cfg.header.links.forEach(function (l) {
    var a = document.createElement("a");
    a.href = l.href; a.textContent = l.label;
    navEl.appendChild(a);
  });
  var ctaEl = $("#headerCta");
  ctaEl.textContent = cfg.header.cta.label;
  ctaEl.href = cfg.header.cta.href;

  // -- poster (first paint + reduced-motion still)
  var poster = $("#stagePoster");
  poster.src = cfg.frames.poster;

  // -- scenes (scroll narrative overlays)
  var filmEl = $("#film");
  cfg.scenes.forEach(function (sc, i) {
    var sec = document.createElement("section");
    sec.className = "scene";
    sec.setAttribute("data-align", sc.align || "left");
    sec.setAttribute("data-scene", i);
    sec.innerHTML =
      '<div class="scene__inner">' +
        (sc.eyebrow ? '<span class="eyebrow scene__eyebrow">' + sc.eyebrow + "</span>" : "") +
        '<h2 class="scene__title">' + accentTitle(sc.title) + "</h2>" +
        (sc.body ? '<p class="scene__body">' + sc.body + "</p>" : "") +
      "</div>";
    filmEl.appendChild(sec);
  });

  // -- service cards
  if (cfg.cards) {
    $("#cardsEyebrow").textContent = cfg.cards.eyebrow || "";
    $("#cardsTitle").textContent = cfg.cards.title || "";
    $("#cardsIntro").textContent = cfg.cards.intro || "";
    var grid = $("#cardsGrid");
    cfg.cards.items.forEach(function (it) {
      var card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<img class="card__img" src="' + it.img + '" alt="' + (it.alt || it.title) + '" loading="lazy">' +
        '<div class="card__fade"></div>' +
        '<div class="card__body">' +
          '<span class="card__kicker">' + it.kicker + "</span>" +
          '<h3 class="card__title">' + it.title + "</h3>" +
          '<p class="card__text">' + it.body + "</p>" +
          '<div class="card__rule"></div>' +
        "</div>";
      grid.appendChild(card);
    });
  }

  // -- footer
  $("#footerEyebrow").textContent = cfg.footer.eyebrow || "";
  $("#footerLine").innerHTML = accentTitle(cfg.footer.line);
  var fcta = $("#footerCta");
  fcta.textContent = cfg.footer.cta.label;
  fcta.href = cfg.footer.cta.href;
  $("#footerMeta").innerHTML = cfg.footer.meta || "";
  document.title = cfg.brand.pageTitle || cfg.brand.name;

  /* ----------------------------------------------------------
     2. PRELOAD THE FRAME SEQUENCE
     The loading screen tracks real frame-load progress.
     ---------------------------------------------------------- */
  var F = cfg.frames;
  var frameCount = F.count;
  var frames = new Array(frameCount);
  var loaded = 0;

  function framePath(i) {
    var n = String(i + 1);
    while (n.length < (F.pad || 3)) n = "0" + n;
    return F.dir + (F.prefix || "") + n + "." + (F.ext || "jpg");
  }
  for (var i = 0; i < frameCount; i++) {
    (function (idx) {
      var img = new Image();
      img.onload = img.onerror = function () { loaded++; };
      img.src = framePath(idx);
      frames[idx] = img;
    })(i);
  }

  /* ----------------------------------------------------------
     3. LOADING SCREEN
     ---------------------------------------------------------- */
  var loader = $("#loader");
  var loaderFill = $("#loaderFill");
  var loaderPct = $("#loaderPct");
  var loaderDone = false;

  function setLoader(p) {
    p = Math.max(0, Math.min(1, p));
    loaderFill.style.width = (p * 100).toFixed(0) + "%";
    loaderPct.textContent = (p * 100).toFixed(0) + "%";
  }
  function finishLoader() {
    if (loaderDone) return;
    loaderDone = true;
    setLoader(1);
    setTimeout(function () {
      loader.classList.add("is-done");
      document.body.style.overflow = "";
      start();
    }, 340);
  }

  document.body.style.overflow = "hidden";
  var loadStart = Date.now();
  var loaderTimer = setInterval(function () {
    setLoader(loaded / frameCount);
    // ready when the sequence is in, or after a hard timeout
    if (loaded >= frameCount || Date.now() - loadStart > 20000) {
      clearInterval(loaderTimer);
      finishLoader();
    }
  }, 120);

  if (reduceMotion) document.documentElement.classList.add("no-motion");

  /* ----------------------------------------------------------
     4. THE ENGINE  (runs after the loader clears)
     ---------------------------------------------------------- */
  function start() {
    var stage = $("#stage");
    var canvas = $("#filmCanvas");
    var ctx = canvas.getContext("2d");
    var scrollFill = $("#scrollbarFill");
    var header = $("#header");
    var cue = $("#scrollCue");
    var film = $("#film");
    var scenes = Array.prototype.slice.call(document.querySelectorAll(".scene"));

    /* --- 4a. scene + card reveal --- */
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.classList.add("is-in");
        });
      }, { rootMargin: "-16% 0px -16% 0px", threshold: 0.01 });
      scenes.forEach(function (s) { io.observe(s); });
      var cardsSec = $("#cards");
      if (cardsSec) io.observe(cardsSec);
    } else {
      scenes.forEach(function (s) { s.classList.add("is-in"); });
      var cs = $("#cards"); if (cs) cs.classList.add("is-in");
    }

    /* --- 4b. canvas sizing (devicePixelRatio aware, capped) --- */
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    }
    sizeCanvas();

    /* --- 4c. draw one frame, cover-fit, centered --- */
    var drawnIndex = -1;
    function drawFrame(index) {
      index = Math.max(0, Math.min(frameCount - 1, index));
      var img = frames[index];
      if (!img || !img.naturalWidth) {
        // fall back to the nearest already-decoded frame
        for (var d = 1; d < frameCount; d++) {
          if (frames[index - d] && frames[index - d].naturalWidth) { img = frames[index - d]; break; }
          if (frames[index + d] && frames[index + d].naturalWidth) { img = frames[index + d]; break; }
        }
        if (!img || !img.naturalWidth) return;
      }
      var cw = canvas.width, ch = canvas.height;
      var scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      var w = img.naturalWidth * scale, h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawnIndex = index;
    }

    /* --- 4d. film geometry --- */
    var geom = { top: 0, span: 1, bottom: 0 };
    function measure() {
      geom.top = film.offsetTop;
      geom.span = Math.max(1, film.offsetHeight - window.innerHeight);
      geom.bottom = film.offsetTop + film.offsetHeight;
    }
    measure();

    /* --- 4e. scroll-scrubbed frame sequence with rAF easing --- */
    var targetP = 0;     // 0..1 desired progress from scroll
    var currentP = 0;    // 0..1 eased progress
    var stageHidden = false;

    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;

      var docH = document.documentElement.scrollHeight - window.innerHeight;
      scrollFill.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
      header.classList.toggle("is-solid", y > window.innerHeight * 0.55);
      if (y > 60) cue.classList.add("is-gone");

      targetP = Math.max(0, Math.min(1, (y - geom.top) / geom.span));

      var past = y > geom.bottom - window.innerHeight * 0.2;
      if (past !== stageHidden) {
        stageHidden = past;
        stage.classList.toggle("is-hidden", past);
      }
    }

    function raf() {
      currentP += (targetP - currentP) * 0.14;
      if (Math.abs(targetP - currentP) < 0.0005) currentP = targetP;
      var index = Math.round(currentP * (frameCount - 1));
      if (index !== drawnIndex) drawFrame(index);
      requestAnimationFrame(raf);
    }

    /* --- 4f. poster handoff --- */
    drawFrame(0);
    poster.classList.add("is-gone");

    function onResize() { sizeCanvas(); measure(); drawnIndex = -1; drawFrame(Math.round(currentP * (frameCount - 1))); onScroll(); }
    window.addEventListener("resize", onResize);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduceMotion) {
      // no scrub: hold the opening frame, let the scenes carry the page
      drawFrame(0);
    } else {
      requestAnimationFrame(raf);
    }

    // re-measure once fonts and images settle
    window.addEventListener("load", function () { measure(); onScroll(); });
    setTimeout(function () { measure(); onScroll(); }, 1200);
  }

  /* ----------------------------------------------------------
     5. HEADER  ::  mobile menu + smooth anchor scroll
     ---------------------------------------------------------- */
  var menuBtn = $("#menuBtn");
  var nav = $("#headerNav");
  menuBtn.addEventListener("click", function () {
    nav.classList.toggle("is-open");
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var dest = document.querySelector(id);
    if (!dest) return;
    e.preventDefault();
    nav.classList.remove("is-open");
    dest.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
})();
