import heroPortrait from "@/assets/hero-portrait.jpg";
import treatmentRoom from "@/assets/treatment-room.jpg";
import ctaObject from "@/assets/cta-object.jpg";
import treatmentFacial from "@/assets/treatment-facial.jpg";
import treatmentSkin from "@/assets/treatment-skin.jpg";
import treatmentSerum from "@/assets/treatment-serum.jpg";
import treatmentWellness from "@/assets/treatment-wellness.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

export const images = {
  heroPortrait,
  treatmentRoom,
  ctaObject,
  treatmentFacial,
  treatmentSkin,
  treatmentSerum,
  treatmentWellness,
};

export type Treatment = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  duration: string;
  from: string;
  image: string;
  intro: string;
  what: string;
  results: string[];
  aftercare: string;
};

export const treatments: Treatment[] = [
  {
    slug: "facial-architecture",
    number: "01",
    name: "Signature Facial Architecture",
    tagline: "Structural sculpting through lymphatic and myofascial work.",
    duration: "90 minutes",
    from: "From ₦280,000",
    image: treatmentFacial,
    intro:
      "A ninety-minute ritual that re-sculpts the face from the inside out, working the deep tissue planes our practitioners trained in Lagos and Abuja have spent careers refining.",
    what:
      "Beginning with a warm enzymatic cleanse, your aesthetician moves through lymphatic drainage along the jaw and neck, then engages buccal release work to soften tension held in the masseter and temporalis. The session closes with a cold jade finish.",
    results: [
      "Defined jawline and lifted cheek plane",
      "Visible reduction in puffiness around the eyes",
      "Restored circulation and immediate luminosity",
      "Effects compound over a course of four sessions",
    ],
    aftercare:
      "We ask that you keep the skin bare for twelve hours. Drink generously. Your aesthetician will check in within forty-eight hours.",
  },
  {
    slug: "precision-injectables",
    number: "02",
    name: "Precision Injectables",
    tagline: "Restraint, in micro-doses. Never the cliché.",
    duration: "60 minutes",
    from: "From ₦395,000",
    image: treatmentSerum,
    intro:
      "Our injectable philosophy is built around a single principle: you should not look done. You should look rested, considered, and unmistakably yourself.",
    what:
      "Every session begins with a facial mapping consultation. Dr. Adaeze personally designs your plan, working in fractional doses placed with neuromodulator precision. We use only the formulations we would choose for ourselves.",
    results: [
      "Softened expression lines without frozen movement",
      "Subtle volume restoration in temples and midface",
      "Refined lip border without alteration of shape",
      "Effects develop over fourteen days",
    ],
    aftercare:
      "Avoid lying flat for four hours. No exercise for twenty-four hours. A follow-up review is scheduled at two weeks.",
  },
  {
    slug: "laser-renewal",
    number: "03",
    name: "Laser Renewal",
    tagline: "Wavelength-tuned correction. Quiet, calibrated, exact.",
    duration: "75 minutes",
    from: "From ₦430,000",
    image: treatmentSkin,
    intro:
      "Our laser program is built on platforms used by the most discerning dermatology clinics in Lagos and Nairobi. Each session is calibrated to your specific melanin-rich skin signature.",
    what:
      "After a topical preparation, your specialist works through targeted passes addressing hyperpigmentation, post-inflammatory marks, and textural concerns common to darker skin tones. Cooling between passes keeps the experience gentle.",
    results: [
      "Even tone, reduced hyperpigmentation",
      "Closed pores and refined surface texture",
      "Stimulated collagen response across eight weeks",
      "Best delivered in a course of three to five sessions",
    ],
    aftercare:
      "Strict SPF for two weeks. We provide a recovery balm and a written protocol with each session.",
  },
  {
    slug: "skin-resurfacing-ritual",
    number: "04",
    name: "Skin Resurfacing Ritual",
    tagline: "A studied acid exchange. Cellular turnover without compromise.",
    duration: "60 minutes",
    from: "From ₦240,000",
    image: treatmentFacial,
    intro:
      "A precisely layered chemical exchange that resets the skin's renewal cycle. Designed for those who want correction without recovery time.",
    what:
      "Mandelic, lactic, and salicylic acids are layered to your skin's tolerance, neutralised at the exact threshold, and followed by a restorative mask sequence using growth-factor and peptide infusions.",
    results: [
      "Refined surface and immediate clarity",
      "Smoothed fine lines and acne scarring",
      "Brighter, more even pigment over thirty days",
      "Ideal as a quarterly maintenance ritual",
    ],
    aftercare:
      "Minimal downtime. Light flaking possible at days three to five. Avoid retinoids for one week.",
  },
  {
    slug: "body-contour-sculpt",
    number: "05",
    name: "Body Contour Sculpt",
    tagline: "Non-invasive contouring through radiofrequency and lymphatic work.",
    duration: "90 minutes",
    from: "From ₦345,000",
    image: treatmentWellness,
    intro:
      "Targeted body work for the abdomen, flanks, and arms. We combine radiofrequency tightening with manual lymphatic technique to refine contour without surgery.",
    what:
      "Sessions begin with dry brushing and lymphatic drainage, followed by radiofrequency passes calibrated to your tissue response, and close with a contouring wrap infused with shea, baobab, and centella.",
    results: [
      "Visible tightening across four to six sessions",
      "Improved skin texture and elasticity",
      "Reduced fluid retention",
      "Best paired with hydration and movement",
    ],
    aftercare:
      "Drink three litres in the twenty-four hours following. Avoid heavy meals that evening.",
  },
  {
    slug: "wellness-infusion",
    number: "06",
    name: "Bespoke Wellness Infusion",
    tagline: "Physician-formulated IV therapy. Quiet recovery, restored balance.",
    duration: "75 minutes",
    from: "From ₦295,000",
    image: treatmentSerum,
    intro:
      "Formulated by Dr. Adaeze for the specific demands of high-output Lagos living. Travel recovery, immune support, skin radiance, and cellular hydration.",
    what:
      "After a brief intake, you settle into our suite for a seventy-five minute infusion. Each formulation is built around your concern, drawing from a library of vitamins, minerals, amino acids, and antioxidants.",
    results: [
      "Immediate hydration and restored energy",
      "Improved skin luminosity within forty-eight hours",
      "Cellular repair and immune resilience",
      "Recommended monthly or as needed",
    ],
    aftercare:
      "None. Resume your day. We recommend a light meal within the hour.",
  },
];

export { ctaObject };

export const team = [
  {
    name: "Dr. Adaeze Okonkwo",
    role: "Founder, Aesthetic Physician",
    bio: "Trained in dermatology at the University of Lagos and refined her practice through six years in London and Johannesburg. She founded Bloom & Glow to prove that restraint is the highest form of expertise.",
    image: team1,
  },
  {
    name: "Chidinma Eze",
    role: "Lead Aesthetician",
    bio: "A decade of facial work across Lagos, Abuja, and Accra. Chidinma leads our signature facial programme and trains every aesthetician on the floor.",
    image: team2,
  },
  {
    name: "Nneka Abubakar",
    role: "Laser Specialist",
    bio: "Certified across every laser platform we operate, with specialist training in melanin-rich skin. Nneka treats pigmentation and textural concerns with a calibration most clinics cannot match.",
    image: team3,
  },
  {
    name: "Tobiloba Adeyemi",
    role: "Wellness & Aftercare Lead",
    bio: "A registered nurse and aftercare strategist. Tobi designs the at-home protocols that compound your in-studio results — rooted in both clinical science and traditional Nigerian botanical care.",
    image: team4,
  },
];

export const values = [
  { label: "Discretion", body: "A private studio. Single appointments. No overlap, no waiting room culture." },
  { label: "Precision", body: "Physician-led mapping. Calibrated technology. Nothing administered without measurement." },
  { label: "Artistry", body: "Aesthetics, not procedures. Every face is read before it is touched." },
  { label: "Longevity", body: "Plans built for ten years, not ten minutes. We refuse short cycles." },
];

export const philosophy = [
  { n: "01", label: "Consultative", body: "Every plan begins with sixty minutes of listening before any recommendation is made." },
  { n: "02", label: "Tailored", body: "No two faces, no two protocols. Every plan is written for one person only." },
  { n: "03", label: "Evidence-led", body: "We follow the clinical literature and revise our protocols quarterly." },
  { n: "04", label: "Sustained", body: "We measure success in years, supported by ongoing review at every visit." },
];

export const problems = [
  { n: "I.", title: "Most plans are written before you walk in", body: "Standardised menus produce standardised faces. We refuse to begin a plan before we have read yours." },
  { n: "II.", title: "Most studios optimize for throughput", body: "Back-to-back bookings shorten the consultation, the treatment, and the result. Ours runs the opposite way." },
  { n: "III.", title: "Most outcomes peak too fast", body: "Aggressive courses look bright at week one and tired by month six. We build for the second year forward." },
];

export const process = [
  { n: "01", label: "Consultation", body: "Sixty unrushed minutes. Facial mapping, intake, and a written plan." },
  { n: "02", label: "Plan", body: "A multi-session protocol with cost, cadence, and expected milestones." },
  { n: "03", label: "Treatment", body: "Delivered in our private studio. One client per practitioner per session." },
  { n: "04", label: "Aftercare", body: "A written protocol, a take-home kit, and a forty-eight hour check-in." },
  { n: "05", label: "Review", body: "Quarterly reviews with photographic record and plan refinement." },
];
