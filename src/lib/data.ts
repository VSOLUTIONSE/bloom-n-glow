export const images = {
  heroPortrait: "/images/hero-portrait.jpg",
  treatmentRoom: "/images/treatment-room.jpg",
  ctaObject: "/images/cta-object.jpg",
  treatmentFacial: "/images/treatment-facial.jpg",
  treatmentSkin: "/images/treatment-skin.jpg",
  treatmentSerum: "/images/treatment-serum.jpg",
  treatmentWellness: "/images/treatment-wellness.jpg",
};

export type Treatment = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  duration: string;
  price: number; // Price in NGN
  category: string;
  image: string;
  intro: string;
  what: string;
  results: string[];
  aftercare: string;
};

export const treatments: Treatment[] = [
  // --- FACIAL TREATMENTS ---
  {
    slug: "classic-facials",
    number: "07",
    name: "Classic Facials",
    tagline: "Essential cleansing, exfoliation, and targeted skin hydration.",
    duration: "30 minutes",
    price: 25000,
    category: "Facial Treatments",
    image: "/images/classic-facial.jpg",
    intro: "The perfect starting point for anyone seeking to maintain a healthy, vibrant complexion.",
    what: "A thorough deep cleanse removes impurities, followed by gentle exfoliation to slough off dead skin cells, and a nourishing mask tailored to your skin type. The session concludes with a hydrating moisturizer and protective serum, leaving your skin refreshed, balanced, and radiating a natural glow.",
    results: [
      "Unclogged pores and smoother skin texture",
      "Instant hydration and a relaxed facial complexion",
      "Revitalized skin prepared for the demands of daily life",
    ],
    aftercare: "Avoid direct sun exposure for 12 hours. Apply broad-spectrum sunscreen daily.",
  },
  {
    slug: "diamond-glow-facials",
    number: "08",
    name: "Diamond Glow Facials",
    tagline: "Advanced skin-resurfacing treatment combining exfoliation and serum infusion.",
    duration: "60 minutes",
    price: 30000,
    category: "Facial Treatments",
    image: "/images/diamond-glow.jpg",
    intro: "Elevate your skincare experience with this luxurious, non-invasive treatment that simultaneously exfoliates, extracts, and infuses.",
    what: "Using a diamond-tipped wand, dead skin cells are gently removed while potent condition-specific serums are delivered deep into the skin. The result is immediate radiance, improved texture, reduced appearance of fine lines, and a visibly brighter, more even-toned complexion.",
    results: [
      "Deeply hydrated, refreshed, and luminous skin",
      "Visibly reduced blackheads and refined skin tone",
      "Transformative power of a premium facial for a truly luminous finish",
    ],
    aftercare: "Avoid aggressive physical exfoliants or retinoids for 48 hours.",
  },
  {
    slug: "dermaplaning-facial",
    number: "09",
    name: "Dermaplaning Facial",
    tagline: "Exfoliation treatment removing peach fuzz and dead surface cells.",
    duration: "60 minutes",
    price: 30000,
    category: "Facial Treatments",
    image: "/images/dermaplaning.jpg",
    intro: "Unveil remarkably smooth and soft skin with this meticulous exfoliation treatment.",
    what: "A sterile surgical blade gently scrapes the surface to remove dead skin cells and fine vellus hair (peach fuzz). Beyond immediate smoothness, dermaplaning enhances product penetration and creates an impeccably smooth canvas for flawless makeup application.",
    results: [
      "Flawless makeup application and high product absorption",
      "Instant baby-smooth skin surface",
      "An instant glow and refined skin texture",
    ],
    aftercare: "Be gentle with your skin. Apply generous moisturizer and SPF. Avoid active acids for 4 days.",
  },
  {
    slug: "microdermabrasion-facial",
    number: "10",
    name: "Microdermabrasion Facial",
    tagline: "Deep physical exfoliation to reduce fine lines and light scars.",
    duration: "90 minutes",
    price: 35000,
    category: "Facial Treatments",
    image: "/images/microdermabrasion.jpg",
    intro: "A powerful yet gentle solution for skin resurfacing using micro-crystal technology.",
    what: "A specialized device sprays micro-crystals onto the skin to gently remove the outermost layer while vacuuming up debris. This non-invasive procedure effectively treats light scarring, uneven skin tone, sun damage, and age spots, stimulating cell renewal for a fresher, smoother complexion.",
    results: [
      "Diminished appearance of sun spots and fine lines",
      "Stimulated cellular turnover and fresh radiance",
      "A clearer, more radiant appearance with refined texture",
    ],
    aftercare: "Keep skin hydrated. Avoid swimming pools or intense sweating for 24 hours.",
  },
  {
    slug: "gentleman-facial",
    number: "11",
    name: "Gentleman Facial",
    tagline: "Tailored skincare targeting shaving irritation and deep pores.",
    duration: "60 minutes",
    price: 35000,
    category: "Facial Treatments",
    image: "/images/classic-facial.jpg",
    intro: "Tailored specifically for the unique needs of men's skin, addressing razor burn, ingrown hairs, and environmental damage.",
    what: "A deep pore cleanse, thorough exfoliation, and a soothing mask designed to calm irritation and hydrate the skin. The treatment revitalizes the complexion, reduces redness, and promotes a healthier, more refined appearance.",
    results: [
      "Cleared beard congestion and reduced razor burn",
      "Deeply purified and balanced skin barrier",
      "Healthier, more refined appearance with reduced redness",
    ],
    aftercare: "Avoid shaving for 24 hours post-treatment. Moisturize daily.",
  },
  {
    slug: "acne-facials",
    number: "13",
    name: "Acne Facials",
    tagline: "Clarifying treatment targeting active acne breakouts and congestion.",
    duration: "90 minutes",
    price: 45000,
    category: "Facial Treatments",
    image: "/images/acne-facial.jpg",
    intro: "Designed to combat breakouts, reduce inflammation, and prevent future blemishes with a comprehensive approach.",
    what: "Deep cleansing, gentle exfoliation, meticulous extractions to clear clogged pores, and a calming mask infused with anti-bacterial and soothing ingredients. We focus on balancing oil production and promoting skin healing.",
    results: [
      "Calmed active breakouts and reduced redness",
      "Deeply cleared pores and regulated sebum production",
      "A clearer, calmer complexion on the path to lasting health",
    ],
    aftercare: "Use a clean towel. Avoid touching your face. Keep up with your hydration.",
  },
  {
    slug: "microneedling-facial",
    number: "08",
    name: "Microneedling & PRP Facials",
    tagline: "Collagen induction with PRP for deep scarring and texture.",
    duration: "90 minutes",
    price: 90000,
    category: "Facial Treatments",
    image: "/images/dermaplaning.jpg",
    intro: "Experience advanced skin rejuvenation with collagen-induction therapy combined with Platelet-Rich Plasma derived from your own blood.",
    what: "A blood draw is processed in a centrifuge to isolate PRP. Fine needles create micro-channels in the skin, then PRP is applied and absorbed, delivering concentrated growth factors that accelerate skin repair and regeneration. This powerful duo effectively treats deep scars, fine lines, wrinkles, and improves overall skin texture and firmness.",
    results: [
      "Dramatic reduction in fine lines and hyperpigmentation",
      "Unparalleled tissue rejuvenation and glowing skin",
      "Improved overall skin texture and firmness",
    ],
    aftercare: "Keep skin clean and bare for 24 hours. Avoid direct sunlight. Hydrate extensively.",
  },
  {
    slug: "chemical-peel",
    number: "16",
    name: "Chemical Peel",
    tagline: "Medical-grade exfoliation for hyperpigmentation and aging.",
    duration: "60 minutes",
    price: 100000,
    category: "Facial Treatments",
    image: "/images/classic-facial.jpg",
    intro: "Transform your skin with a carefully selected chemical solution that gently exfoliates and removes damaged outer layers.",
    what: "Calibrated chemical peel layers are applied based on skin type (glycolic, lactic, or TCA), then neutralized and finished with barrier cream. The depth is customized to your concerns, targeting hyperpigmentation, fine lines, acne scars, and uneven tone.",
    results: [
      "Diminished dark spots and melasma",
      "Significantly refined skin texture and tone",
      "A smoother, brighter, more even-toned complexion",
    ],
    aftercare: "Peeling will occur in 3-5 days. Do not pull or peel loose skin. Strictly apply SPF 50+.",
  },

  // --- BODY WAXING ---
  {
    slug: "facial-waxing",
    number: "17",
    name: "Facial Waxing",
    tagline: "Precise hair removal for upper lip, chin, and face.",
    duration: "30 minutes",
    price: 7000,
    category: "Body Waxing",
    image: "/images/facial-waxing.jpg",
    intro: "Achieve a polished and refined look with precise facial waxing using high-quality, gentle waxes.",
    what: "Our skilled therapists meticulously remove unwanted hair from the upper lip, chin, or full face. The service leaves skin incredibly smooth and helps define your features for a clean, elegant appearance.",
    results: ["Silky smooth skin for up to 4 weeks", "Softer and finer hair regrowth over time", "Long-lasting smoothness with minimal discomfort"],
    aftercare: "Avoid heavy makeup or touching the area for 12 hours.",
  },
  {
    slug: "underarm-wax",
    number: "18",
    name: "Underarm Waxing",
    tagline: "Clean, hygienic hair removal for smooth underarms.",
    duration: "30 minutes",
    price: 10000,
    category: "Body Waxing",
    image: "/images/body-waxing.webp",
    intro: "Experience the freedom of smooth, hair-free underarms with this quick and efficient treatment.",
    what: "Cleansing, dusting of soothing powder, application of premium wax, and aloe vera gel post-treatment. Hair is removed from the root for longer-lasting results compared to shaving, significantly reducing razor bumps and irritation.",
    results: ["Completely hair-free underarms", "Smooth skin without shaving bumps or darkness", "Weeks of confidence without daily maintenance"],
    aftercare: "Avoid deodorants or antiperspirants for 24 hours.",
  },
  {
    slug: "full-legs-wax",
    number: "19",
    name: "Full Arms & Legs",
    tagline: "Complete hair removal from arms and legs.",
    duration: "45 minutes",
    price: 20000,
    category: "Body Waxing",
    image: "/images/body-waxing.webp",
    intro: "Indulge in the luxury of silky-smooth skin with thorough hair removal from the entire arm and leg area.",
    what: "Cleansing of both legs and arms, application of high-quality strip or hot wax, swift removal, and body oil finish. Our expert therapists ensure a thorough, even result providing weeks of smooth skin.",
    results: ["Perfectly smooth arms and legs", "Exfoliated skin with long-lasting hair reduction", "Eliminates the need for frequent shaving"],
    aftercare: "Avoid wearing tight trousers or taking hot baths for 24 hours.",
  },
  {
    slug: "brazilian-wax",
    number: "12",
    name: "Brazilian Wax",
    tagline: "Professional intimate hair removal for all clients.",
    duration: "45 minutes",
    price: 26000,
    category: "Body Waxing",
    image: "/images/brazilian-wax.jpg",
    intro: "Professional and discreet intimate hair removal using high-quality, gentle waxes and expert techniques for both female and male clients.",
    what: "Skin sanitation, soothing oil barrier application, precise application of warm hard wax, detailed hair removal from the entire pubic region, and a calming finish. Our skilled therapists ensure a clean, smooth result with the utmost care and minimal discomfort.",
    results: ["Complete hair removal from the entire pubic region", "Smooth skin with minimized discomfort", "Long-lasting solution for intimate grooming"],
    aftercare: "Avoid friction, exercise, or hot tubs for 24-48 hours.",
  },

  {
    slug: "full-body-wax",
    number: "22",
    name: "Full Body Wax",
    tagline: "Complete head-to-toe hair removal package.",
    duration: "60 minutes",
    price: 90000,
    category: "Body Waxing",
    image: "/images/body-waxing.webp",
    intro: "The ultimate grooming experience providing a completely smooth and refreshed feeling from head to toe.",
    what: "A coordinated full-body waxing process using specialized waxes suited to different body regions, covering arms, legs, underarms, back, chest, and intimate areas. Enjoy weeks of hair-free skin without daily maintenance.",
    results: ["Head-to-toe hair-free, exfoliated, and glowing skin", "Reduced hair density over time", "Liberation from daily shaving and grooming"],
    aftercare: "Avoid intense heat, sun beds, or tight synthetic fabrics for 48 hours.",
  },

  // --- TEETH WHITENING ---
  {
    slug: "standard-whitening",
    number: "23",
    name: "Standard Whitening",
    tagline: "Brighten your smile in a single session.",
    duration: "30 minutes",
    price: 40000,
    category: "Teeth Whitening",
    image: "/images/standard-whitening.jpg",
    intro: "Brighten your smile and enhance your natural radiance with this effective and safe whitening session.",
    what: "Pre-treatment check, application of gentle whitening gel, and a 20-minute LED light activation cycle. Lifts surface stains caused by coffee, tea, and other common culprits, revealing a noticeably brighter smile in just one session.",
    results: ["Instant, noticeably brighter smile", "Refreshed dental aesthetic", "Visible difference and renewed confidence"],
    aftercare: "Avoid dark foods and drinks (coffee, tea, red wine, stew) for 24 hours.",
  },
  {
    slug: "premium-whitening",
    number: "22",
    name: "Premium & Diamond Whitening",
    tagline: "Advanced whitening for stubborn dental stains.",
    duration: "60 minutes",
    price: 60000,
    category: "Teeth Whitening",
    image: "/images/premium-whitening.jpg",
    intro: "For those seeking a more dramatic transformation, this advanced session delivers enhanced results.",
    what: "Dual application of professional-grade whitening gel activated by custom blue LED laser cycles. Pre-whitening enamel protection and triple gel applications target even the most stubborn, deep-set stains while maintaining zero tooth sensitivity. Achieve a visibly whiter, celebrity-level smile that radiates confidence.",
    results: ["Smile brightened by up to 6-8 shades", "Removal of deep tooth enamel stains with zero sensitivity", "Visibly whiter, dazzling smile"],
    aftercare: "Follow the 'white diet' (poultry, rice, water, milk) for 48 hours.",
  },

  {
    slug: "platinum-whitening",
    number: "26",
    name: "Platinum Whitening",
    tagline: "The ultimate multi-cycle teeth shade correction.",
    duration: "120 minutes",
    price: 90000,
    category: "Teeth Whitening",
    image: "/images/platinum-whitening.jpg",
    intro: "Our most advanced and comprehensive treatment. Unleash the full potential of your smile.",
    what: "Full oral rinse, four sequential rounds of whitening gel application, laser activation, and an enamel sealing treatment. Engineered for maximum results, this intensive session delivers a truly dazzling, celebrity-level smile.",
    results: ["Maximum shade correction possible", "Sealed enamel preventing new stains from locking in", "An unparalleled transformation for the brightest possible smile"],
    aftercare: "Use the provided post-whitening touch-up paste and follow the diet guide.",
  },

  // --- SPA, MASSAGES, AND BODY CONTOURING ---
  {
    slug: "manicure",
    number: "16",
    name: "Manicure & Pedicure",
    tagline: "Complete nail care, cuticle hydration, and polish.",
    duration: "60 minutes",
    price: 23000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/deep-tissue-massage.jpg",
    intro: "Treat your hands and feet to the pampering they deserve with meticulous grooming and care.",
    what: "Hand soak, nail shaping, cuticle push-back, relaxing hand massage, and professional polish or buffing. Followed by a warm aromatherapy foot bath, heel filing, exfoliating scrub, and deep foot massage. Each session concludes with your chosen finish, leaving hands and feet impeccably groomed.",
    results: ["Neat, healthy-looking nails", "Soft, hydrated skin on hands and feet", "Impeccably groomed, refreshed hands and feet"],
    aftercare: "Let the polish dry completely. Moisturize cuticles and heels daily.",
  },

  {
    slug: "swedish-massage",
    number: "29",
    name: "Swedish Massage",
    tagline: "Gentle, flowing strokes to restore relaxation and circulation.",
    duration: "60 minutes",
    price: 40000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/swedish-massage.jpg",
    intro: "Indulge in the timeless art of relaxation with long, gliding strokes that soothe both body and mind.",
    what: "Employing effleurage, kneading, rhythmic tapping, and gentle friction to ease muscle tension, improve circulation, and promote tranquility. Perfect for reducing stress, alleviating minor aches, and fostering profound calm.",
    results: ["Deep mental relaxation and stress relief", "Improved circulation and reduced physical tension", "A profound sense of calm and well-being"],
    aftercare: "Drink plenty of water to flush out released toxins. Avoid alcohol.",
  },
  {
    slug: "deep-tissue-massage",
    number: "30",
    name: "Deep Tissue Massage",
    tagline: "Firm, targeted pressure to relieve chronic muscle knots.",
    duration: "60 minutes",
    price: 45000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/deep-tissue-massage.jpg",
    intro: "For those seeking relief from chronic muscle tension and discomfort, this powerful therapeutic experience delivers.",
    what: "Slow, deliberate strokes applying deep, concentrated pressure on tight muscle channels and knots. Focuses on realigning deeper layers of muscles and connective tissue, ideal for persistent aches in the neck, shoulders, and back.",
    results: ["Release of chronic tension in neck, shoulders, and lower back", "Increased range of motion and flexibility", "Profound relief as tension melts away"],
    aftercare: "Some soreness is normal for 24 hours. Take a warm bath and drink water.",
  },
  {
    slug: "butt-enhancement",
    number: "31",
    name: "Butt & Hip Enhancement",
    tagline: "Non-invasive lifting, firming, and contouring.",
    duration: "60 minutes",
    price: 30000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/body-contouring.webp",
    intro: "Enhance your natural curves and achieve a more sculpted physique with non-surgical contouring.",
    what: "Advanced vacuum therapy and radiofrequency techniques lift, firm, and add volume to the gluteal and hip areas. Improves contour, reduces the appearance of cellulite, and creates a more shapely, proportionate lower body.",
    results: ["Firmed, lifted, and more contoured silhouette", "Temporary reduction in cellulite appearance", "Enhanced natural curves and boosted confidence"],
    aftercare: "Avoid heavy squats or direct pressure on the buttocks for 12 hours.",
  },
  {
    slug: "vajacial",
    number: "32",
    name: "Vajacial & Coochie Care",
    tagline: "Soothing skin treatment for the intimate zone.",
    duration: "60 minutes",
    price: 35000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/vajacial.png",
    intro: "Dedicated to the delicate skin of the intimate area, designed post-waxing or as a standalone treatment.",
    what: "Intimate steam, light exfoliation, extractions of ingrown hairs, calming sheet mask, and high-frequency light therapy. Focuses on soothing the skin, preventing ingrown hairs, and reducing redness using gentle, nourishing products.",
    results: ["Faded dark spots and reduced ingrown hairs", "Calmed, smooth skin in the intimate area", "Fresh, revitalized, and comfortable intimate skin"],
    aftercare: "Wear loose cotton underwear. Keep the area clean and dry.",
  },
  {
    slug: "tummy-blast",
    number: "19",
    name: "Body Contouring",
    tagline: "Non-invasive midsection sculpting and fat reduction.",
    duration: "120 minutes",
    price: 95000,
    category: "Spa, Massages, and Body Contouring",
    image: "/images/body-contouring.webp",
    intro: "Achieve your desired silhouette with advanced non-invasive body contouring targeting stubborn fat and loose skin.",
    what: "Ultrasound cavitation disrupts fat cells, vacuum therapy mobilizes them, and multi-polar radiofrequency tightens skin across the abdomen, flanks, and lower back. Designed to reduce inches and sculpt a defined midsection without surgery.",
    results: ["Slimmer, sculpted midsection", "Firmer skin texture with reduced fluid retention", "All-around contoured, defined silhouette"],
    aftercare: "Avoid carbohydrates and heavy meals for 24 hours. Drink 3 liters of water.",
  },
];

export const ctaObject = images.ctaObject;

export const team = [
  {
    name: "Dr. Adaeze Okonkwo",
    role: "Founder, Aesthetic Physician",
    bio: "Trained in dermatology at the University of Lagos and refined her practice through six years in London and Johannesburg. She founded Bloom & Glow to prove that restraint is the highest form of expertise.",
    image: "/images/team-1.jpg",
  },
  {
    name: "Chidinma Eze",
    role: "Lead Aesthetician",
    bio: "A decade of facial work across Lagos, Abuja, and Accra. Chidinma leads our signature facial programme and trains every aesthetician on the floor.",
    image: "/images/team-2.jpg",
  },
  {
    name: "Nneka Abubakar",
    role: "Laser Specialist",
    bio: "Certified across every laser platform we operate, with specialist training in melanin-rich skin. Nneka treats pigmentation and textural concerns with a calibration most clinics cannot match.",
    image: "/images/team-3.jpg",
  },
  {
    name: "Tobiloba Adeyemi",
    role: "Wellness & Aftercare Lead",
    bio: "A registered nurse and aftercare strategist. Tobi designs the at-home protocols that compound your in-studio results - rooted in both clinical science and traditional Nigerian botanical care.",
    image: "/images/team-4.jpg",
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

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[,.]/g, "")
    .replace(/\s+/g, "-");
}

export const categories = [
  { name: "Facial Treatments", slug: "facial-treatments", description: "From classic upkeep to advanced resurfacing. Every facial is written for one face only." },
  { name: "Body Waxing", slug: "body-waxing", description: "Premium waxing services across all areas, using low-temperature hard wax for sensitive skin." },
  { name: "Teeth Whitening", slug: "teeth-whitening", description: "Professional-grade whitening from a single session to maximum correction." },
  { name: "Spa, Massages, and Body Contouring", slug: "spa-massages-and-body-contouring", description: "Non-invasive contouring, deep-tissue work, and restorative body treatments." },
];

export function treatmentsByCategory(slug: string) {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return [];
  return treatments.filter((t) => t.category === cat.name);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug) || null;
}
