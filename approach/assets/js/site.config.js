/* ============================================================
   CINEMATIC SCROLL WEBSITE  ::  site configuration
   CLIENT: Project Baseline (self-promo demo / worked example)

   This is the ONLY file that changes per client (plus the media
   in assets/media/). The engine reads everything from here.

   Bracketed [words] in scene titles and the footer line render
   in the brand accent colour.
   ============================================================ */
window.CINEMATIC_CONFIG = {

  /* ---------- brand ---------- */
  brand: {
    name: "Project Baseline",
    pageTitle: "Project Baseline | Strategy, Structure, Systems"
  },

  /* ---------- fixed header ---------- */
  header: {
    links: [
      { label: "Home",     href: "/" },
      { label: "Approach", href: "#top" },
      { label: "Services", href: "#cards" },
      { label: "Contact",  href: "#contact" }
    ],
    cta: { label: "Start a project", href: "/contact.html" }
  },

  /* ---------- cinematic background (frame sequence) ----------
     The film is delivered as numbered frame images, scrubbed by
     scroll and drawn to a canvas. Files: dir + prefix + zero-padded
     number + "." + ext  (e.g. assets/media/frames/f-001.jpg).
     poster is the first frame, shown before the sequence loads. */
  frames: {
    dir: "assets/media/frames/",
    prefix: "f-",
    count: 121,
    pad: 3,
    ext: "jpg",
    poster: "assets/media/poster.jpg"
  },

  /* ---------- scroll narrative ----------
     Each scene is one full screen of the journey. The cinematic
     frames scrub continuously beneath them. */
  scenes: [
    {
      align: "center",
      eyebrow: "Project Baseline",
      title: "Every build starts at a [baseline].",
      body: "Most organizations move before they measure. We start where you actually are, name it honestly, and mark the point everything else gets built from."
    },
    {
      align: "left",
      eyebrow: "The Drawing",
      title: "Strategy is the [drawing] before the building.",
      body: "A baseline becomes a plan. The structure, the sequence, the decisions made on purpose instead of under pressure. Lines on the ground before a dollar is spent."
    },
    {
      align: "left",
      eyebrow: "The Foundation",
      title: "We design the [foundation] others build on.",
      body: "Operating model, organizational design, the systems underneath the work. The parts nobody notices until they fail, done right the first time."
    },
    {
      align: "right",
      eyebrow: "The Structure",
      title: "Structure turns vision into something that [holds].",
      body: "Membership models, revenue architecture, the operating rhythm of a real organization. Vision is cheap. Structure is the work."
    },
    {
      align: "left",
      eyebrow: "The Standard",
      title: "Built to outlast the people who [built it].",
      body: "A baseline you can hand to the next leader. We measure the work by what still stands when we are no longer in the room."
    },
    {
      align: "center",
      eyebrow: "The Baseline",
      title: "A foundation you can build a [kingdom] on.",
      body: "Quiet, structural work for leaders building something meant to last longer than a funding cycle."
    }
  ],

  /* ---------- service cards ---------- */
  cards: {
    eyebrow: "What we do",
    title: "Three ways we build.",
    intro: "Every Project Baseline engagement opens with a baseline assessment. Where it goes next depends on what you are building.",
    items: [
      {
        img: "assets/media/card-1.jpg",
        kicker: "01 / Clarity",
        title: "Strategy & Org Design",
        body: "Operating models, organizational structure, and the strategic baseline a leadership team can actually run on.",
        alt: "Architectural foundation detail at dawn"
      },
      {
        img: "assets/media/card-2.jpg",
        kicker: "02 / Structure",
        title: "Membership & Revenue",
        body: "Membership architecture, pricing, and revenue systems designed to compound instead of leak.",
        alt: "Architectural structure detail at dusk"
      },
      {
        img: "assets/media/card-3.jpg",
        kicker: "03 / Systems",
        title: "Systems & AI Operations",
        body: "The automation and operating systems that let a small team run like a much larger one.",
        alt: "Architectural detail lit at night"
      }
    ]
  },

  /* ---------- footer / closing CTA ---------- */
  footer: {
    eyebrow: "Start here",
    line: "Start at the [baseline].",
    cta: { label: "Book a baseline call", href: "mailto:todd@project-baseline.com?subject=Baseline%20call" },
    meta: '<span>&copy; 2026 Project Baseline Inc.</span>' +
          '<span><a href="mailto:todd@project-baseline.com">todd@project-baseline.com</a></span>'
  }
};
