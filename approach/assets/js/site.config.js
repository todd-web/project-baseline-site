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
    title: "Four ways we build.",
    intro: "Every Project Baseline engagement opens with a baseline assessment. Where it goes next depends on what you are building.",
    items: [
      {
        img: "assets/media/card-1.jpg",
        kicker: "01 / Plan",
        title: "Project Management & Consultation",
        body: "Marketing, social enterprise, and program development run with disciplined budgets, timelines, and goals that a leadership team can actually deliver against.",
        alt: "Architectural foundation detail at dawn"
      },
      {
        img: "assets/media/card-2.jpg",
        kicker: "02 / Voice",
        title: "Brand & Business Development",
        body: "At the core of brand development is the story you tell. We help clients find their voice, strengthen it in the marketplace, and build audiences that stay.",
        alt: "Architectural structure detail at dusk"
      },
      {
        img: "assets/media/card-3.jpg",
        kicker: "03 / Build",
        title: "Innovation & Ideation",
        body: "Breaking through roadblocks with new technology and inventive branding. Includes our AI Implementation practice: readiness assessments, workflow automation, tool selection, and team adoption.",
        alt: "Architectural detail lit at night"
      },
      {
        img: "assets/media/card-4.jpg",
        kicker: "04 / Impact",
        title: "Social Enterprise & Philanthropy",
        body: "Strategies that reach business goals while enhancing human and environmental well-being. Includes our Nonprofit Consulting practice: strategic planning, grant writing, governance, and membership development.",
        alt: "Architectural form rising into the light"
      }
    ]
  },

  /* ---------- footer / closing CTA ---------- */
  footer: {
    eyebrow: "Start here",
    line: "Start at the [baseline].",
    cta: { label: "Submit an inquiry", href: "/contact.html" },
    meta: '<span>&copy; 2026 Project Baseline Inc.</span>' +
          '<span><a href="/contact.html">Start a project</a></span>'
  }
};
