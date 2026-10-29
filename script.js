// script.js - Troy Prado Jr. Portfolio Interaction System

// ==========================================
// 1. Mobile Hamburger Menu Toggle
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    // Change menu icon between bars and times
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when clicking any nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  });
}

// Add CSS active class transitions dynamically in header; keep the header
// out of the way over the intro and hero until the About section arrives.
const aboutSection = document.getElementById('about');
const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  if (aboutSection) {
    header.classList.toggle('header-hidden', aboutSection.getBoundingClientRect().top > header.offsetHeight + 1);
  }
};
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader);
updateHeader();

// Add styles dynamically to support active/scrolled mobile menu
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .header.scrolled {
    box-shadow: 0 8px 30px rgba(91, 109, 70, 0.12);
    background-color: rgba(228, 215, 176, 0.95);
  }
  @media (max-width: 768px) {
    .nav-links {
      display: flex;
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      background-color: var(--bg-color);
      border-bottom: 1px solid var(--border-color);
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem 0;
      opacity: 0;
      pointer-events: none;
      transform: translateY(-10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 20px rgba(91, 109, 70, 0.1);
    }
    .nav-links.active {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }
  .project-card {
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .project-card.hidden {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    position: absolute;
    pointer-events: none;
    visibility: hidden;
  }
  .project-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    position: relative;
    pointer-events: auto;
    visibility: visible;
  }
`;
document.head.appendChild(styleSheet);


// ==========================================
// 2. Smooth Scrolling for Navigation
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ==========================================
// 3. Portfolio Grid Filtering System
// ==========================================



/* Portfolio Grid Filtering System */
const filterTabs = document.querySelectorAll('.filter-tab');
const projectGrid = document.getElementById('projectGrid');
// Set default active filter (featured if exists)
const defaultTab = document.querySelector('.filter-tab[data-filter="featured"]') || filterTabs[0];
if (defaultTab) defaultTab.classList.add('active');
function applyFilter(filter) {
  document.querySelectorAll('.project-card').forEach(card => {
    // Featured cards repeat projects already in the grid, so "Show All" skips them
    if ((filter === 'all' && card.dataset.category !== 'featured') || card.dataset.category === filter) {
      card.classList.remove('hidden');
      card.classList.add('visible');
    } else {
      card.classList.remove('visible');
      card.classList.add('hidden');
    }
  });
}
applyFilter(defaultTab ? defaultTab.dataset.filter : 'all');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyFilter(tab.dataset.filter);
  });
});
// Featured cards: crossfade photos every 4.5s with clickable dots; pauses on hover.
document.querySelectorAll('.featured-slides').forEach((wrap, w) => {
  const slides = [...wrap.querySelectorAll('.featured-slide')];
  if (slides.length < 2) return;
  const dots = document.createElement('div');
  dots.className = 'featured-dots';
  let i = 0;
  const show = n => {
    slides[i].classList.remove('active');
    dots.children[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
    dots.children[i].classList.add('active');
  };
  slides.forEach((s, n) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show photo ${n + 1} of ${slides.length}`);
    if (n === 0) dot.classList.add('active');
    dot.addEventListener('click', e => { e.stopPropagation(); show(n); });
    dots.appendChild(dot);
  });
  wrap.appendChild(dots);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let paused = false;
  wrap.addEventListener('mouseenter', () => paused = true);
  wrap.addEventListener('mouseleave', () => paused = false);
  // stagger start so the three cards don't flip in unison
  setTimeout(() => setInterval(() => { if (!paused && !document.hidden) show(i + 1); }, 4500), w * 1500);
});

// 4. Subsystem Modal Detail Data Mapping
// ==========================================
const projectDetails = {
  roboboat: {
    title: "Roboboat 2026 Autonomous Systems",
    category: "Robotics & Autonomous",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "A fully autonomous boat project where I spearheaded the 3D modeling, mechanical design, physical assembly, and electrical integration. I conducted extensive field testing and iterative hardware refinement to ensure obstacle course reliability and hardware durability in marine environments. Team Inspiration won 1st place for Best Website at RoboBoat 2026 — <a href='https://www.teaminspiration.global/crusader-mechanical-2026-1' target='_blank' rel='noopener'>check out the official team website</a>.",
        highlights: [
          { icon: "fa-trophy text-yellow-500", title: "1st Place — Best Website", text: "recognized for the best team website among all competing teams at Roboboat 2026." },
          { icon: "fa-award", title: "3rd Place — TDR (Technical Design Report)", text: "awarded for excellence in engineering documentation and design presentation." },
          { icon: "fa-star", title: "Prefinalists — 7th Place Overall", text: "advanced to the prefinalist round out of an international field of 40+ teams, securing a top-tier ranking and outperforming elite global institutions, including MIT." }
        ],
        images: [
          { src: "images/roboboat/awards.jpg", label: "Team Inspiration at RoboBoat 2026 — 1st Place Website, 3rd Place Design Documentation", class: "modal-parts-img" }
        ]
      },
      {
        id: "mechanical",
        name: "Mechanical Design",
        content: "Led the complete 3D modeling and mechanical design of the autonomous boat hull and component housing. Focused on waterproofing, buoyancy optimization, and modular mounting systems for sensors and electronics. Conducted iterative physical assembly and field testing to ensure marine environment durability.",
        highlights: [
          { icon: "fa-drafting-compass", title: "3D CAD Modeling", text: "Full design of structural hulls and instrument trays in Fusion 360 to optimize CG (center of gravity)." },
          { icon: "fa-water", title: "Buoyancy & Sealing", text: "Integrated custom gasket enclosures and waterproof wire-entry glands to prevent leaks." }
        ],
        images: [
          { src: "images/roboboat/full-cad.png", label: "Full catamaran CAD model with sensor mounts and electronics enclosure", class: "modal-cad-img" },
          { src: "images/roboboat/parts-list.png", label: "Complete list of all 3D modeled and printed components", class: "modal-parts-img" }
        ]
      },
      {
        id: "electrical",
        name: "Electrical Integration",
        content: "Spearheaded the electrical integration including power distribution systems, motor controllers, and sensor arrays. Implemented robust waterproof connections and managed power budgets to ensure reliable operation during extended autonomous missions in marine conditions.",
        highlights: [
          { icon: "fa-bolt", title: "Power Distribution Layout", text: "Developed complete system wiring diagrams utilizing custom isolation switches for high-current loads." },
          { icon: "fa-box-open", title: "Waterproof Box Interior", text: "Assembled the waterproof electrical box interior containing motor drivers, relays, and main computer." }
        ],
        images: [
          { src: "images/roboboat/electrical-diagram.png", label: "Complete electrical system wiring diagram", class: "modal-wiring-img" },
          { src: "images/roboboat/electrical-box.png", label: "Inside view of the waterproof electrical enclosure", class: "modal-enclosure-img" }
        ]
      },
      {
        id: "software",
        name: "Software & Nav",
        content: "Contributed to the navigation and control software stack, integrating GPS, compass, and obstacle detection systems. Developed autonomous waypoint navigation algorithms and collision avoidance logic for reliable obstacle course completion.",
        highlights: [
          { icon: "fa-location-crosshairs", title: "Waypoint Navigation Stack", text: "Implemented ROS2-based waypoint navigations that process GPS coordinates and adjust rudder targets." },
          { icon: "fa-gauge-high", title: "Safety Configs & Failsafes", text: "Used QGroundControl to configure failsafe triggers, leak sensor alerts, and automated geofence aborts." }
        ],
        images: [
          { src: "images/roboboat/software-pipeline.png", label: "YOLOv8 obstacle detection pipeline running on the Oak-D camera", class: "modal-soft-img" },
          { src: "images/roboboat/mission-script.png", label: "Mission script state machine — task states and transitions", class: "modal-safety-img" }
        ]
      }
    ]
  },
  robosub: {
    title: "Robosub 2026 Autonomous Underwater Vehicle",
    category: "Robotics & Autonomous",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Served as co-lead and lab manager for Team Inspiration's RoboSub 2026 campaign. Spearheaded deep bill-of-materials and parts list creation across all vehicle subsystems, and managed lab organization by meticulously documenting the physical location of every component and tool — keeping the team efficient and build-ready at all times. At the international RoboSub competition in July 2026, Team Inspiration designed and deployed our AUV poolside, solving complex engineering challenges in real time and finishing 9th overall and 3rd nationally.",
        highlights: [
          { icon: "fa-trophy text-yellow-500", title: "9th Place Overall — 3rd Nationally", text: "finished 9th overall out of an international field at RoboSub 2026, and 3rd among U.S. teams." },
          { icon: "fa-hand-holding-heart", title: "Community Outreach Award", text: "recognized for Team Inspiration's STEM engagement efforts." },
          { icon: "fa-folder-open", title: "Strategic Navigation", text: "Created a master document covering all parts, tools, tasks, and deadlines to onboard new members rapidly." }
        ],
        images: [
          { src: "images/new-project/main.jpg", label: "Team Inspiration poolside with the RoboSub AUVs", class: "modal-parts-img" },
          { src: "images/new-project/main-2.jpg", label: "GRAEY and ONYX autonomous underwater vehicles", class: "modal-parts-img" }
        ]
      },
      {
        id: "mechanical",
        name: "Mechanical & Organization",
        content: "Developed the documented layouts of all lab equipment, wire racks, and vehicle storage. Mapped ONYX configuration components including thruster layouts, torpedo launcher subsystems, and pneumatic arm grippers.",
        highlights: [
          { icon: "fa-sitemap", title: "Lab Layout Floor Plan", text: "Documented layout of all equipment, wire racks, and vehicle storage locations to optimize team workspace speed." },
          { icon: "fa-clipboard-list", title: "Deep Bill-of-Materials (BOM)", text: "Complete parts inventory cataloging component weights, costs, supplier links, and shelf locations." }
        ],
        images: [
          { src: "images/new-project/mech-1.png", label: "ONYX AUV configuration — torpedo, gripper, hydrophones, DVL, and holonomic motor layout", class: "modal-cad-img" },
          { src: "images/new-project/mech-2.png", label: "Lab floor plan — layout of all equipment, wire racks, and vehicle storage", class: "modal-cad-img" },
          { src: "images/new-project/mech-3.png", label: "Deep BOM — full parts list with component codes, costs, spare locations, and supplier links", class: "modal-parts-img" }
        ]
      },
      {
        id: "electrical",
        name: "Electrical Integration",
        content: "Coordinated power distribution system assembly and wiring layouts for the GRAEY and ONYX vehicle configurations, ensuring high-fidelity system communication and robust power budgets across all subsystems.",
        highlights: [
          { icon: "fa-bolt", title: "Dual System Diagrams", text: "Maintained wiring schematics mapping batteries, power regulators, thrusters, and onboard telemetry." }
        ],
        images: [
          { src: "images/new-project/elec-1.png", label: "GRAEY 2025 — full electrical wiring and power distribution diagram", class: "modal-wiring-img" },
          { src: "images/new-project/elec-2.png", label: "ONYX — complete system wiring diagram with power and data routing", class: "modal-wiring-img" }
        ]
      },
      {
        id: "software",
        name: "Software & Mission Config",
        content: "Developed test plans and QGroundControl safety configurations to prepare for sub-surface operations. Integrated sensory arrays and safety boundaries.",
        highlights: [
          { icon: "fa-file-shield", title: "Pre-Mission Planning", text: "Structured pre-mission files detailing task sequences, safety thresholds, and abort conditions." },
          { icon: "fa-shield-halved", title: "QGroundControl Safety Setup", text: "Configured leak detection warnings, battery voltage failsafes, and automated motor arming checks." }
        ],
        images: [
          { src: "images/new-project/soft-1.png", label: "QGroundControl safety configuration — failsafes, leak detection, and arming checks", class: "modal-soft-img" },
          { src: "images/new-project/soft-2.png", label: "Station keeping test plan", class: "modal-safety-img" }
        ]
      }
    ]
  },
  battlebot: {
    title: "Beetleweight BattleBot Design",
    category: "School & SHPE",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Team captain of a Beetleweight BattleBot competition. Led the design and build of a 3 lb combat robot, coordinating the team across mechanical design, electronics integration, and competition strategy.",
        highlights: [
          { icon: "fa-crown", title: "Team Leadership", text: "Captained a 5-student team through rapid assembly, prototyping, and active arena matches." },
          { icon: "fa-shield-heart", title: "CAD & Structural Weld", text: "Engineered hard carbon-steel armor plate mounts in SolidWorks to absorb high-impact mechanical stress." }
        ],
        images: [
          { src: "images/shpe/battlebot-2.jpg", label: "CAD design in Fusion 360", class: "modal-cad-img" },
          { src: "images/shpe/battlebot-3.png", label: "Electrical wiring diagram", class: "modal-wiring-img" },
          { src: "images/shpe/battlebot-1.png", label: "Parts & weight registry — a master document of every part, the reasoning behind each selection, and tasks and deadlines to help new members through their first robotics competition", class: "modal-parts-img" },
          { src: "images/shpe/beetleweight.png", label: "CSUN Beetleweight Combat Robot Competition rules", class: "modal-parts-img" }
        ]
      }
    ]
  },
  tensile: {
    title: "Tensile Strength Tester Application",
    category: "School & SHPE",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Developed a tensile strength testing application in MATLAB to analyze material properties and stress-strain relationships. The project combines engineering principles with creative coding to visualize and interpret mechanical testing data.",
        highlights: [
          { icon: "fa-chart-line", title: "Stress-Strain Plots", text: "Calculates and plots Young's Modulus, yield strength limits, and ultimate mechanical tensile stress." },
          { icon: "fa-bolt", title: "Automatic Limits", text: "Identifies elastic vs plastic deformation thresholds, ultimate strain limits, and specimen fracture points." }
        ],
        images: [
          { src: "images/projects/tensile-tester-1.png", label: "Tensile testing machine and data acquisition station", class: "modal-matlab-img" },
          { src: "images/projects/tensile-tester-2.png", label: "Specimen necking before fracture", class: "modal-matlab-img" },
          { src: "images/projects/tensile-tester-3.png", label: "MATLAB elongation and stress-strain curves with ultimate stress and fracture point", class: "modal-matlab-img" }
        ]
      }
    ]
  },
  leadership: {
    title: "SD Mesa Engineering Outreach",
    category: "School & Leadership",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "In Early 2025, I stepped into the role of President of the San Diego Mesa College Engineering Club, serving a one-year term focused on expanding student engagement through hands-on projects, competitions, and community-building events. Alongside participation in the Beetleweight BattleBot and RoboBoat competitions, I helped organize technical workshops ranging from Python and Arduino-based projects to robotic arm and bridge design challenges.",
        highlights: [
          { icon: "fa-users", title: "Student Community Building", text: "Collaborated with SASE, SAE, and SHPE societies to organize student panels, guest lecturers, and networking mixers." },
          { icon: "fa-graduation-cap", title: "Technical Tutoring", text: "Assembled academic study panels and support groups in calculus, physics, and computer science." }
        ],
        images: [
          { src: "images/shpe-leadership.jpg", label: "Troy Prado Jr. with SHPE Chapter members and officers", class: "modal-parts-img" },
          { src: "images/shpe/engineering-group.jpg", label: "SD Mesa Engineering Club members", class: "modal-parts-img" },
          { src: "images/shpe/workshop.png", label: "Engineering Club Workshop #1 — build a 1-axis robot arm", class: "modal-cad-img" },
          { src: "images/shpe/engineer-panel.png", label: "SHPE Engineer Panel with SWE and the Mesa Engineering Club", class: "modal-cad-img" },
          { src: "images/shpe/robosub.png", label: "RoboSub 2026 recruitment flyer", class: "modal-cad-img" }
        ]
      }
    ]
  },
  trapbar: {
    title: "Custom Heavy Trap Bar",
    category: "Gym Innovations",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Designed and fabricated a custom trap bar with dual-handle heights and reinforced welding for heavy strength training. Implemented industrial structural joints and durable sleeves.",
        highlights: [
          { icon: "fa-dumbbell", title: "Heavy Loading Specs", text: "Dual handles optimized for neutral wrist alignment. Handles 600 lbs load capacity." },
          { icon: "fa-screwdriver", title: "Structural Welding", text: "Fabricated using high-strength steel hollow sections with clean, deep reinforced structural welds." }
        ],
        images: [
          { src: "trap_bar.jpg", label: "Custom Trap Bar", class: "modal-parts-img" }
        ]
      }
    ]
  },
  dumbrack: {
    title: "Upcycled Dumbbell Storage Rack",
    category: "Gym Innovations",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "A space-saving vertical storage rack designed and fabricated using upcycled/recycled steel frame profiles to optimize home gym footprint.",
        highlights: [
          { icon: "fa-recycle", title: "Upcycled Materials", text: "Diverted square steel tube frame waste products from scrap bins to weld a structural storage organizer." },
          { icon: "fa-maximize", title: "Vertical Space Saving", text: "Saves 75% footprint compared to traditional horizontal racks." }
        ],
        images: [
          { src: "dumbbell_rack.jpg", label: "Dumbbell Storage Rack", class: "modal-parts-img" }
        ]
      }
    ]
  },
  sled: {
    title: "Custom Outdoor Conditioning Sled",
    category: "Gym Innovations",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Heavy-duty training sled designed for outdoor conditioning and explosive power development. Features a durable steel frame and a custom weight-loading pin.",
        highlights: [
          { icon: "fa-bolt", title: "Explosive Conditioning", text: "Bottom runners curved to glide smoothly over grass, dirt, and concrete surfaces." },
          { icon: "fa-lock", title: "Weight-Loading Pin", text: "Engineered centering loading post to maintain balance during acceleration." }
        ],
        images: [
          { src: "sled.jpg", label: "Custom Training Sled", class: "modal-parts-img" }
        ]
      }
    ]
  },
  rowmachine: {
    title: "Chest-Supported Row Machine",
    category: "Gym Innovations",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Custom-built chest-supported row machine designed for targeted back development and ergonomic lifting posture. Features optimized pivot leverages.",
        highlights: [
          { icon: "fa-heart", title: "Back Isolation", text: "Structure isolates middle back muscles, removing stress from the lumbar spine." },
          { icon: "fa-user-check", title: "Wrist Biomechanics", text: "Adjustable angle handlebars facilitate a natural, comfortable pronated/supinated motion line." }
        ],
        images: [
          { src: "images/backrow-machine.jpg", label: "Chest-Supported Row Machine", class: "modal-parts-img" }
        ]
      }
    ]
  },
  bench: {
    title: "Incline/Decline Adjustable Bench System",
    category: "Gym Innovations",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Custom-engineered adjustment mechanism for weight benches, providing multiple incline angles with a secure locking system.",
        highlights: [
          { icon: "fa-sliders", title: "Angular Flexibility", text: "Fast-locking safety pin selector supports inclination increments from flat to 85 degrees." },
          { icon: "fa-shield", title: "Pivot Safety", text: "Heavily reinforced double-pivot mounts ensure full occupant weight load capacity is met safely." }
        ],
        images: [
          { src: "bench_support.jpg", label: "Adjustable Bench Supports", class: "modal-parts-img" }
        ]
      }
    ]
  },
  vintage: {
    title: "Upcycled Curated Vintage Store",
    category: "Creative Projects & Sustainable Store",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Co-founded and managed a three-person collaborative upcycling venture, focusing on transforming waste-stream textiles into high-quality curated fashion. Maintained a consistent 5-star rating through dedicated quality control, rapid shipping, and a shared commitment to sustainable circular fashion.",
        highlights: [
          { icon: "fa-leaf", title: "Circular Economy", text: "Reused vintage denim and distressed cotton fabrics, avoiding consumer waste cycles." },
          { icon: "fa-star text-yellow-500", title: "5-Star Rating Curation", text: "Built a reputation for high-quality packaging, rapid delivery, and immaculate stitching standards." }
        ],
        images: [
          { src: "store.jpg", label: "Upcycled Curated Vintage Store", class: "modal-parts-img" }
        ]
      }
    ]
  },
  hoodie: {
    title: "Sustainable Fashion Upcycled Hoodie",
    category: "Creative Projects",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Custom upcycled hoodie featuring hand-sewn graphic elements and a faux-fur lined hood, created as part of my focus on circular fashion and waste reduction.",
        highlights: [
          { icon: "fa-shirt", title: "Repurposed Fleece", text: "Crafted using excess factory fleece rolls and upcycled liner materials." },
          { icon: "fa-recycle", title: "Waste Stream Reduction", text: "Showcases how post-consumer textiles can be transformed into premium bespoke winter garments." }
            ],
    images: [
      { src: "Fur%20hoodie.webp", label: "Upcycled Hoodie", class: "modal-parts-img" }
    ]
      }
    ]
  },
    shirt: {
    title: "Upcycled Dress Shirt",
    category: "Creative Projects",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Custom-modified stripe dress shirt featuring hand‑sewn detailed embroidery, blending bespoke formalwear with modern streetwear aesthetics.",
        highlights: [
          { icon: "fa-scissors", title: "Bespoke Hand Embroidery", text: "Crafted hours of detailed manual embroidery on vintage formal striped cotton garments." },
          { icon: "fa-palette", title: "Eco‑Aesthetic Fusion", text: "Combined corporate aesthetics with sustainable street fashion motifs." }
        ],
        images: [
          { src: "Dress%20shirt%20DIY.webp", label: "Upcycled Dress Shirt", class: "modal-parts-img" }
        ]
      }
    ]
  },
  nablanotes: {
    title: "NablaNotes — AI-Powered STEM Note-Taking Platform",
    category: "Founder & Full-Stack Engineer",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Founded and engineered NablaNotes, an AI-powered STEM note-taking platform targeting community college students across San Diego. Architected and shipped the full product from concept to working beta using React, Vite, TanStack Start, and Supabase — including a real-time handwriting OCR pipeline powered by Gemini 2.5 Flash that converts handwritten equations into solved, graphed, and step-by-step explained results directly within the note canvas. NablaNotes is live on iPad through an open TestFlight beta at <a href='https://nablanotes.com' target='_blank' rel='noopener'>nablanotes.com</a>.",
        highlights: [
          { icon: "fa-layer-group", title: "Multi-Layer Local-First Persistence", text: "Built a localStorage → IndexedDB → Supabase cloud sync architecture ensuring zero data loss across sessions and devices." },
          { icon: "fa-robot", title: "AI Tutor System", text: "Designed contextual equation lookup, YouTube video recommendations, and Socratic chat — all grounded in the student's actual handwritten work via canvas region capture." },
          { icon: "fa-pen-nib", title: "Two-Canvas GPU-Composited Rendering", text: "Engineered pressure-sensitive stylus input, multi-page notebooks, custom template overlays, and real-time stroke timestamping synced to lecture audio." },
          { icon: "fa-puzzle-piece", title: "Chrome Extension", text: "Built and published a companion Chrome extension enabling cross-platform screenshot capture from any homework platform directly into the note canvas." },
          { icon: "fa-credit-card", title: "Stripe Subscription Infrastructure", text: "Implemented role-based feature gating, a promo code system for tracking student acquisition by institution, and full payment flows." },
          { icon: "fa-user-gear", title: "Sole Engineer — Full Stack", text: "Product, infrastructure, AI integrations, database schema, auth, payments, and Chrome extension — all solo." }
        ],
        images: [
          { src: "images/nablanotes/solve.webp", label: "Write it. Circle it. Solved. — handwriting in, every step out, right beside the problem", class: "modal-soft-img" }
        ]
      },
      {
        id: "features",
        name: "Product Features",
        content: "Fewer tabs, better work: everything a STEM student would open a browser for, on the page they're already writing on. Each feature reads the student's own handwriting, so nothing gets retyped.",
        highlights: [
          { icon: "fa-calculator", title: "Handwritten Equation Solving", text: "Circle any handwritten equation and get the solution with every step shown beside the problem." },
          { icon: "fa-robot", title: "Context-Aware AI Tutor", text: "The tutor already sees the equation on the page — no copying problems into a chat window or explaining what class you're in." },
          { icon: "fa-chart-line", title: "2D & 3D Graphing", text: "Graph handwritten functions in 2D and 3D, with adjustable axis ranges, tick spacing, and one-tap zoom reset." },
          { icon: "fa-table-cells", title: "Linear Algebra From Handwriting", text: "Row-reduce a handwritten matrix to RREF with determinant and inverse a tap away; compute dot and cross products of handwritten vectors." },
          { icon: "fa-laptop", title: "Laptop-to-iPad Capture", text: "Capture any homework page with the Chrome extension and it lands on the iPad, ready to annotate." }
        ],
        images: [
          { src: "images/nablanotes/tutor.webp", label: "AI tutor answering questions about the student's handwritten integral", class: "modal-soft-img" },
          { src: "images/nablanotes/graphing.webp", label: "Graphing a handwritten function with Graph Settings", class: "modal-soft-img" },
          { src: "images/nablanotes/3d-graphing-still.webp", label: "3D surface graphing", class: "modal-soft-img" },
          { src: "images/nablanotes/matrix.webp", label: "Handwritten matrix reduced to RREF", class: "modal-soft-img" },
          { src: "images/nablanotes/vectors.webp", label: "Dot and cross products from handwritten vectors", class: "modal-soft-img" },
          { src: "images/nablanotes/cross-device.webp", label: "Homework page captured on a laptop, annotated on the iPad", class: "modal-soft-img" }
        ]
      },
      {
        id: "stack",
        name: "Tech Stack",
        content: "NablaNotes is built on a modern full-stack architecture optimized for real-time collaboration, offline-first reliability, and AI-augmented learning experiences. Every layer was designed and implemented solo — from database schema to edge functions to the native iOS build pipeline.",
        highlights: [
          { icon: "fa-code", title: "Frontend", text: "React · Vite · TanStack Start — component-driven canvas architecture with GPU-composited dual-layer rendering." },
          { icon: "fa-database", title: "Backend & Database", text: "Supabase · PostgreSQL — real-time subscriptions, row-level security, and cloud sync layered over local-first storage." },
          { icon: "fa-wand-magic-sparkles", title: "AI & OCR", text: "Gemini 2.5 Flash — handwriting OCR pipeline converting equations to solved, graphed, and step-by-step explained results." },
          { icon: "fa-mobile-screen", title: "Mobile & Extensions", text: "Capacitor (iPad app, live in TestFlight beta) · Chrome Extensions API — cross-platform capture and native deployment." },
          { icon: "fa-dollar-sign", title: "Payments & Auth", text: "Stripe · Supabase Auth — subscription tiers, promo codes, and role-based feature gating." },
          { icon: "fa-flask", title: "Utilities", text: "Python · SymPy — server-side symbolic math processing for equation validation and step generation." }
        ]
      }
    ]
  },
  southcoast: {
    title: "AI Automations Engineer — South Coast Accounting",
    category: "Work Experience · San Diego, CA · 2024 – Present",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Embedded as an AI Automations Engineer at a financial services firm, leading the systematic conversion of institutional knowledge into scalable, AI-executable workflow automations. Designed and implemented a documentation extraction pipeline that transforms existing staff procedures and compliance workflows into structured Claude AI skill sets — enabling non-technical team members to execute complex accounting and tax processes through guided AI assistance with zero prior AI experience.",
        highlights: [
          { icon: "fa-brain", title: "Knowledge Extraction Methodology", text: "Developed a proprietary process for capturing tacit institutional expertise from staff interviews and existing documentation into structured, version-controlled AI skill specifications." },
          { icon: "fa-gears", title: "Claude-Powered Automation Skills", text: "Engineered a suite of automation skills covering tax intake, client onboarding, document processing, and compliance review — reducing manual processing time and standardizing output quality." },
          { icon: "fa-book-open", title: "Firm-Wide AI Documentation Guide", text: "Produced technical documentation frameworks enabling staff to independently contribute to the automation library without engineering support." },
          { icon: "fa-sitemap", title: "AI-Assisted Intake Interview Systems", text: "Designed multi-variable tax scenario intake systems that structure complex client situations into actionable, auditable decision trees." }
        ]
      },
      {
        id: "stack",
        name: "Stack & Approach",
        content: "All automations are built around Claude AI as the execution layer, with custom prompt engineering and skill architecture translating institutional accounting workflows into reliable, repeatable AI-driven processes accessible to non-technical staff.",
        highlights: [
          { icon: "fa-robot", title: "Claude AI", text: "Core AI execution layer for all automation skills — tax intake, onboarding, compliance review, and document processing." },
          { icon: "fa-pen-fancy", title: "Prompt Engineering", text: "Systematic prompt design translating complex multi-step accounting procedures into structured, auditable AI workflows." },
          { icon: "fa-file-invoice-dollar", title: "Financial Document Processing", text: "Automated extraction and structuring of client financial documents for intake and review workflows." },
          { icon: "fa-diagram-project", title: "Workflow Automation", text: "End-to-end automation covering client lifecycle touchpoints from initial intake through compliance delivery." }
        ]
      }
    ]
  },
  monkeybot: {
    title: "Monkey Bot — Autonomous RC Car",
    category: "Robotics & Autonomous",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Developed in collaboration with a 3-person team, Monkey Bot is a fully autonomous RC car. My contributions included the complete 3D design of the chassis, complex wiring of the sensor suite, and developing the core autonomous navigation code. The project highlights our ability to integrate custom hardware with real-time software processing.",
        highlights: [
          { icon: "fa-robot", title: "3D CAD Chassis", text: "3D modeled and 3D printed custom chassis, utilizing heat-set inserts for secure component layouts." },
          { icon: "fa-camera", title: "Computer Vision Harness", text: "Sensor integration harness carrying Raspberry Pi 4, Arduino Uno, LiDAR sensor, and camera gear." }
        ],
        images: [
          { src: "images/monkeybot/main-action.jpg", label: "Monkey Bot navigating the red/blue obstacle course autonomously", class: "modal-parts-img" }
        ]
      },
      {
        id: "mechanical",
        name: "Mechanical Assembly",
        content: "Designed and assembled a custom RC-based autonomous vehicle using 3D-modeled and 3D-printed components. The mechanical build focused on durability and modularity, using heat-set inserts for secure fastening and careful wire routing for reliability. Multiple camera placements and mounts were tested to determine the most effective configuration for vision-based navigation and obstacle detection.",
        highlights: [
          { icon: "fa-cubes", title: "Modular Fasteners", text: "Used heat-set brass threaded inserts to support modular accessory mounts." }
        ],
        images: [
          { src: "images/monkeybot/mech.png", label: "3D CAD model of the custom chassis and electronics mounts", class: "modal-cad-img" }
        ]
      },
      {
        id: "electrical",
        name: "Electrical Integration",
        content: "Integrated an Arduino and Raspberry Pi to manage sensors, motors, and control logic. Gained hands-on experience with electrical wiring, power distribution, and current limits to prevent short circuits or overheating. Used SSH and VS Code to remotely run programs, troubleshoot issues, and fine-tune hardware-software interactions through repeated testing until the system reliably completed the obstacle course.",
        highlights: [
          { icon: "fa-microchip", title: "Dual Processor Logic", text: "Arduino acts as motor controller (PWM limits), while Raspberry Pi processes sensory stack inputs." }
        ],
        images: [
          { src: "images/monkeybot/elec.png", label: "Wiring diagram — battery, Raspberry Pi, Arduino, and motor drivers", class: "modal-wiring-img" }
        ]
      },
      {
        id: "software",
        name: "Software",
        content: "Developed autonomous navigation software using VS Code in collaboration with a small team. Leveraging libraries such as NumPy and OpenCV, the system was first implemented in manual (remote-controlled) mode and later transitioned to autonomous behaviors, including predefined paths like circles and squares. Vision algorithms were created to detect red and blue obstacles, calculate their center positions, and dynamically adjust steering so the vehicle could successfully navigate through the course.",
        images: [
          { src: "images/monkeybot/soft.jpg", label: "Live OpenCV red/blue obstacle detection during testing", class: "modal-soft-img" }
        ]
      }
    ]
  }
};


// ==========================================
// 5. Dynamic Subsystem Modal Injector
// ==========================================
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalTabsContainer = document.getElementById('modalTabsContainer');
const modalContentContainer = document.getElementById('modalContentContainer');

let currentProjectData = null;

// Open Modal when clicking "View Details" or "View Subsystems"
document.querySelectorAll('.open-details-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-card');
    if (!card) return;
    
    const projectId = card.getAttribute('data-id');
    currentProjectData = projectDetails[projectId];
    
    if (!currentProjectData) return;

    // Inject title and category
    modalTitle.textContent = currentProjectData.title;
    modalCategory.textContent = currentProjectData.category;

    // Build Tabs
    modalTabsContainer.innerHTML = '';
    currentProjectData.tabs.forEach((tab, index) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `modal-tab-btn ${index === 0 ? 'active' : ''}`;
      tabBtn.setAttribute('data-tab-id', tab.id);
      tabBtn.textContent = tab.name;
      
      tabBtn.addEventListener('click', () => {
        // Toggle active tab buttons
        modalTabsContainer.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
        // Inject Tab Content
        injectTabContent(tab);
      });
      
      modalTabsContainer.appendChild(tabBtn);
    });

    // Inject first tab content by default
    injectTabContent(currentProjectData.tabs[0]);

    // Show Modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  });
});

// Function to inject specific Tab Content: text and highlights on the left,
// an image viewer (main image + thumbnails, click to enlarge) on the right.
function injectTabContent(tab) {
  const highlightsHTML = (tab.highlights || []).length ? `
    <ul class="modal-highlights">
      ${tab.highlights.map(h => `
        <li>
          <span class="modal-highlight-icon"><i class="fa-solid ${h.icon}" aria-hidden="true"></i></span>
          <div>
            <h4>${h.title}</h4>
            <p>${h.text}</p>
          </div>
        </li>
      `).join('')}
    </ul>` : '';

  const images = tab.images || [];
  const mediaHTML = images.length ? `
    <div class="modal-media">
      <figure class="modal-figure">
        <button class="modal-figure-zoom" type="button" aria-label="View image full size">
          <img src="${images[0].src}" alt="${images[0].label}" class="modal-figure-img" />
        </button>
        <figcaption class="modal-figure-caption">${images[0].label}</figcaption>
      </figure>
      ${images.length > 1 ? `
        <div class="modal-thumbs">
          ${images.map((img, i) => `
            <button class="modal-thumb ${i === 0 ? 'active' : ''}" type="button" data-index="${i}" aria-label="Show ${img.label}">
              <img src="${img.src}" alt="" />
            </button>
          `).join('')}
        </div>` : ''}
    </div>` : '';

  modalContentContainer.innerHTML = `
    <div class="modal-layout ${images.length ? 'has-media' : ''}">
      <div class="modal-text">
        <p class="modal-subsystem-desc">${tab.content}</p>
        ${highlightsHTML}
      </div>
      ${mediaHTML}
    </div>
  `;
  modalContentContainer.closest('.modal-content').scrollTop = 0; // desktop: content pane scrolls

  const mainImg = modalContentContainer.querySelector('.modal-figure-img');
  const caption = modalContentContainer.querySelector('.modal-figure-caption');
  modalContentContainer.querySelectorAll('.modal-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const img = images[thumb.dataset.index];
      mainImg.src = img.src;
      mainImg.alt = img.label;
      caption.textContent = img.label;
      modalContentContainer.querySelectorAll('.modal-thumb').forEach(t => t.classList.toggle('active', t === thumb));
    });
  });
  modalContentContainer.querySelector('.modal-figure-zoom')?.addEventListener('click', () => openLightbox(mainImg.src, mainImg.alt));
}

// Full-size image viewer
const imageLightbox = document.getElementById('imageLightbox');
function openLightbox(src, label) {
  imageLightbox.querySelector('img').src = src;
  imageLightbox.querySelector('img').alt = label;
  imageLightbox.querySelector('p').textContent = label;
  imageLightbox.classList.add('active');
}
const closeLightbox = () => imageLightbox.classList.remove('active');
imageLightbox.addEventListener('click', closeLightbox);

// Close Modal functions
const closeModal = () => {
  projectModal.classList.remove('active');
  document.body.style.overflow = ''; // Restore background scrolling
};

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking on overlay background
if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (imageLightbox.classList.contains('active')) closeLightbox();
    else if (projectModal.classList.contains('active')) closeModal();
  });
}


// ==========================================
// 6. Perspective Tunnel Intro
// ==========================================
// Vanilla port of 21st.dev's PerspectiveTunnelHero. Driven by normal page
// scroll (sticky stage) instead of hijacking the wheel, so visitors can always
// scroll past it and it works on touch. Clicking a card opens that project.
const tunnel = document.getElementById('tunnel');

if (tunnel) {
  const TUNNEL_ITEMS = [
    { src: "boat-in-water.jpg", title: "RoboBoat 2026", id: "roboboat" },
    { src: "images/new-project/main-2.jpg", title: "RoboSub AUVs", id: "robosub" },
    { src: "images/nablanotes/solve.webp", title: "NablaNotes", id: "nablanotes" },
    { src: "images/monkeybot/main-action.jpg", title: "Monkey Bot", id: "monkeybot" },
    { src: "trap_bar.jpg", title: "Custom Trap Bar", id: "trapbar" },
    { src: "images/shpe/battlebot-2.jpg", title: "BattleBot CAD", id: "battlebot" },
    { src: "Fur%20hoodie.webp", title: "Upcycled Hoodie", id: "hoodie" },
    { src: "images/roboboat/electrical-box.png", title: "RoboBoat Electrical", id: "roboboat" },
    { src: "images/projects/tensile-tester-1.png", title: "Tensile Tester", id: "tensile" },
    { src: "sled.jpg", title: "Training Sled", id: "sled" },
    { src: "images/roboboat/full-cad.png", title: "RoboBoat CAD", id: "roboboat" },
    { src: "images/shpe-leadership.jpg", title: "Engineering Club", id: "leadership" },
    { src: "Dress%20shirt%20DIY.webp", title: "Upcycled Shirt", id: "shirt" },
    { src: "dumbbell_rack.jpg", title: "Dumbbell Rack", id: "dumbrack" }
  ];

  const space = document.getElementById('tunnelSpace');
  const title = document.getElementById('tunnelTitle');
  const prompt = document.getElementById('tunnelPrompt');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const total = TUNNEL_ITEMS.length;
  const STAGGER_SPAN = 0.55;

  // Piecewise-linear map of x through (xs -> ys), clamped at the ends.
  const mapRange = (x, xs, ys) => {
    if (x <= xs[0]) return ys[0];
    for (let i = 1; i < xs.length; i++) {
      if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
    }
    return ys[ys.length - 1];
  };

  // Golden-angle placement around the tunnel, same as the original component.
  const cards = TUNNEL_ITEMS.map((item, i) => {
    const angle = i * 137.5 * (Math.PI / 180);
    const el = document.createElement('button');
    el.className = 'tunnel-card';
    el.setAttribute('aria-label', `Open ${item.title}`);
    el.innerHTML = `<img src="${item.src}" alt="" draggable="false" decoding="async" /><span>${item.title}</span>`;
    el.addEventListener('click', () => {
      document.querySelector(`.project-card[data-id="${item.id}"] .open-details-btn`)?.click();
    });
    space.appendChild(el);
    return {
      el,
      cos: Math.cos(angle),
      sin: Math.sin(angle),
      rx: 0.28 + (i % 3) * 0.08,
      ry: 0.26 + (i % 2) * 0.09,
      rotZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      start: (i / total) * (1 - STAGGER_SPAN)
    };
  });

  let stage = {};
  const measure = () => {
    const w = window.innerWidth, h = window.innerHeight, isMobile = w < 768;
    stage = { w, h, isMobile };
    tunnel.querySelector('.tunnel-stage').style.perspective = isMobile ? '900px' : '1200px';
    const cardWidth = isMobile ? Math.max(130, Math.min(180, w * 0.38)) : Math.max(180, Math.min(270, w * 0.18));
    cards.forEach(c => { c.el.style.width = `${cardWidth}px`; });
  };
  measure();
  window.addEventListener('resize', measure);

  // Mouse parallax target in [-1, 1]
  let targetX = 0, targetY = 0, px = 0, py = 0, progress = 0;
  if (!reduceMotion) {
    window.addEventListener('pointermove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  const frame = () => {
    const rect = tunnel.getBoundingClientRect();
    // Only animate while the intro is on screen.
    if (rect.bottom > 0) {
      const target = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
      const ease = reduceMotion ? 1 : 0.12;
      progress += (target - progress) * ease;
      px += (targetX - px) * 0.08;
      py += (targetY - py) * 0.08;

      const farZ = stage.isMobile ? -1200 : -1700;
      const nearZ = stage.isMobile ? 350 : 500;
      const pan = stage.isMobile ? 20 : 45;

      cards.forEach(c => {
        const local = Math.min(1, Math.max(0, (progress - c.start) / STAGGER_SPAN));
        const z = farZ + (nearZ - farZ) * local;
        const x = c.cos * stage.w * c.rx - px * pan;
        const y = c.sin * stage.h * c.ry - py * pan;
        const opacity = mapRange(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);
        c.el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateZ(${c.rotZ}deg)`;
        c.el.style.opacity = opacity;
        c.el.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
      });

      title.style.transform = `scale(${mapRange(progress, [0, 0.5, 1], [0.85, 1, 1.35])})`;
      title.style.opacity = mapRange(progress, [0, 0.85, 1], [1, 1, 0]);
      prompt.style.opacity = mapRange(progress, [0, 0.12], [1, 0]);
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}


// ==========================================
// 7. Hero "Ink Garden" ASCII Dither Art
// ==========================================
// Canvas2D take on 21st.dev's Ink Garden preset (renderMode "dither",
// cellSize 9, contrast 158%, no background, pulse animation). Each 9px cell
// samples the fern photo in full color; cells brighter than an ordered
// (Bayer 4x4) threshold draw a square. On top of the preset: a ripple pulse
// radiating from the fern's curl, a cursor "flashlight" that lights up the
// garden, parallax drift, and a bloom layer.
const heroAscii = document.getElementById('heroAscii');

if (heroAscii) {
  const CELL = 9;
  const CONTRAST = 1.58;
  const SATURATION = 1.15;
  const MOSS = [38, 58, 24];          // what the dark parts of the garden reveal under the cursor
  const PULSE_AMOUNT = 0.6 * 0.25;   // animIntensity 60
  const PULSE_HZ = 0.5;              // animSpeed 100
  const RIPPLE_WAVELENGTH = 90;      // px between ripple crests
  const LIGHT_RADIUS = 170;          // cursor flashlight radius, px
  const LIGHT_BOOST = 0.85;
  const FERN = { sx: 470, sy: 0, sw: 720, sh: 864, cx: 790, cy: 190 }; // crop + curl center in the source photo
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16);

  const hero = heroAscii.closest('.hero-section');
  const glow = document.getElementById('heroAsciiGlow');
  const ctx = heroAscii.getContext('2d');
  const gctx = glow.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const img = new Image();
  let cells = [], width = 0, height = 0, visible = true;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0, strength: 0, target: 0 };

  const sample = () => {
    const rect = heroAscii.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    for (const c of [heroAscii, glow]) {
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = Math.ceil(width / CELL), rows = Math.ceil(height / CELL);

    // One pixel per cell: the browser's downscale averages each cell's color.
    // The fern fills the full height, anchored right (centered on mobile).
    const small = document.createElement('canvas');
    small.width = cols;
    small.height = rows;
    const sctx = small.getContext('2d', { willReadFrequently: true });
    sctx.imageSmoothingQuality = 'high';
    const scale = rows / FERN.sh;
    const dx = window.innerWidth > 992 ? cols - FERN.sw * scale : (cols - FERN.sw * scale) / 2;
    sctx.drawImage(img, FERN.sx, FERN.sy, FERN.sw, FERN.sh, dx, 0, FERN.sw * scale, rows);
    const data = sctx.getImageData(0, 0, cols, rows).data;
    const curlX = (dx + (FERN.cx - FERN.sx) * scale) * CELL, curlY = FERN.cy * scale * CELL;

    const raw = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const rgb = [data[i], data[i + 1], data[i + 2]];
        const lum = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
        raw.push({ x: x * CELL, y: y * CELL, lum, rgb, t: BAYER[(y % 4) * 4 + (x % 4)] });
      }
    }

    // The fern is dark on black: stretch brightness (95th percentile -> 1)
    // before the 158% contrast, and lift its true colors the same way.
    const bright = raw.map(c => c.lum).filter(l => l > 0.04).sort((a, b) => a - b);
    const level = bright[Math.floor(bright.length * 0.95)] || 1;
    cells = raw.map(c => {
      const stretched = Math.min(1, c.lum / level);
      const lift = Math.min(1 / level, 225 / Math.max(1, ...c.rgb));
      const lifted = c.rgb.map(v => v * lift);
      const gray = (lifted[0] + lifted[1] + lifted[2]) / 3;
      // dim cells lean toward deep moss so the flashlight reveals a garden, not grey noise
      const color = lifted.map((v, k) => Math.round(Math.min(255, Math.max(0,
        (gray + (v - gray) * SATURATION) * stretched + MOSS[k] * (1 - stretched)))));
      const cx = c.x + CELL / 2, cy = c.y + CELL / 2;
      return {
        x: c.x, y: c.y, cx, cy, t: c.t,
        lum: Math.min(1, Math.max(0, (stretched - 0.5) * CONTRAST + 0.5)),
        phase: Math.hypot(cx - curlX, cy - curlY) / RIPPLE_WAVELENGTH,
        color: `rgb(${color.join(',')})`
      };
    });
  };

  const draw = (time) => {
    const t = time / 1000 * Math.PI * 2 * PULSE_HZ;
    pointer.x += (pointer.tx - pointer.x) * 0.15;
    pointer.y += (pointer.ty - pointer.y) * 0.15;
    pointer.strength += (pointer.target - pointer.strength) * 0.08;

    ctx.clearRect(0, 0, width, height);
    for (const c of cells) {
      let v = c.lum + (reduceMotion ? 0 : Math.sin(t - c.phase) * PULSE_AMOUNT);
      if (pointer.strength > 0.01) {
        const d = Math.hypot(c.cx - pointer.x, c.cy - pointer.y);
        if (d < LIGHT_RADIUS) {
          const near = 1 - d / LIGHT_RADIUS;
          v += near * near * LIGHT_BOOST * pointer.strength;
        }
      }
      if (v > c.t) {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, CELL - 1, CELL - 1);
      }
    }
    gctx.setTransform(1, 0, 0, 1, 0, 0);
    gctx.clearRect(0, 0, glow.width, glow.height);
    gctx.drawImage(heroAscii, 0, 0);

    // parallax: the art drifts opposite the cursor
    const nx = pointer.strength * ((pointer.x / width) - 0.5), ny = pointer.strength * ((pointer.y / height) - 0.5);
    const shift = `translate3d(${(-nx * 12).toFixed(2)}px, ${(-ny * 12).toFixed(2)}px, 0)`;
    heroAscii.style.transform = glow.style.transform = shift;
  };

  const loop = (time) => {
    if (visible) draw(time);
    requestAnimationFrame(loop);
  };

  img.onload = () => {
    sample();
    if (reduceMotion) { draw(0); return; }
    hero.addEventListener('pointermove', (e) => {
      const r = heroAscii.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      if (pointer.target === 0) { pointer.x = pointer.tx; pointer.y = pointer.ty; }
      pointer.target = 1;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { pointer.target = 0; });
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(hero);
    requestAnimationFrame(loop);
  };
  img.src = 'images/ink-garden.webp';

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (img.complete) { sample(); draw(performance.now()); } }, 150);
  });
}


// ==========================================
// 8. Tunnel Intro "Mesh drift" Shader Background
// ==========================================
// 21st.dev Shader Builder preset, rendered as a fullscreen triangle in plain
// WebGL1. Uniforms are fed exactly as the preset lists them; cursor is off.
// If WebGL is unavailable the CSS gradient on .tunnel-stage shows instead.
const tunnelShader = document.getElementById('tunnelShader');
const gl = tunnelShader && tunnelShader.getContext('webgl', { antialias: false, premultipliedAlpha: false });

if (gl) {
  const FRAGMENT = `// "Mesh drift" — made with the 21st.dev Shader Builder
// Packed WebGL1 uniforms (the shader exposes readable u_* aliases as macros):
//   u_colors[8] (first 4 used)
//   vec3(0.043, 0.063, 0.149)
//   vec3(0.239, 0.275, 0.910)
//   vec3(0.694, 0.549, 1.000)
//   vec3(1.000, 0.839, 0.906)
//   u_scene = vec4(canvas width, canvas height, seconds * -0.73, 4.0)
//   u_shape = vec4(1.90, 0.10, 0.47, 0.04)
//   u_surface = vec4(1.54, 0.65, 0.00, 1.00)
//   u_finish = vec4(0.00, 0.21, 0.002, 0.10)
//   u_transform = vec4(4012.0, 5.65, 0.12, 0.0)
//   u_space = vec4(0.11, -0.19, pointer x, pointer y)
//   u_cursor = vec4(presence, 2.0, 0.65, 0.46)

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
// Seven packed vectors + eight colour vectors = 15 fragment uniform vectors,
// one below WebGL1's guaranteed minimum. Macros preserve the public u_* API.
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
// Keep hash inputs inside mediump's guaranteed ±2^14 range.
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Even, un-structured white noise for film grain (Dave Hoskins hash12). The
// multiply hash above is fine for value noise but shows a faint axis-aligned
// mesh at integer fragment coords, which reads as a net over flat areas.
float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

// --- OKLab colour mixing (perceptual), gated by u_oklab -----------------------
vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  // max() guards the sRGB branch: out-of-gamut OKLab interpolations can send a
  // channel negative, and pow(negative, …) is NaN which mix()/step() would
  // then propagate. The linear branch clips such channels to 0 downstream.
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

// Mix through the recipe colours; x is clamped to 0..1. WebGL1 forbids
// dynamic uniform indexing in fragment shaders, hence the constant loop.
vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec3 acc = u_colors[0] * 0.15;
  float total = 0.15;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= u_colorCount) break;
    float fi = float(i);
    vec2 c = vec2(
      sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
      cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
    float w = exp(-dot(p - c, p - c) * 6.0);
    acc += u_colors[i] * w;
    total += w;
  }
  return acc / total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  // Cursor modes 1–3 are local distortions. Push shifts the same screen-space
  // coordinates before field transforms, so Zoom/Rotate don't change its feel.
  if (u_cursorPresence > 0.001) {
    // u_mouse is normalized to -1..1 in canvas space. Convert it to the same
    // aspect-corrected screen space as p so effects stay under the cursor.
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  // Keep presets that read uv (rather than p) in the same warped space.
  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  // Field transform: rotate, pan, pointer push, slow drift.
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  // Organic domain warp.
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  // Shade, with an optional soft 5-tap blur.
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  // Post: contrast, saturation, hue, brightness, vignette, grain.
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
  const VERTEX = 'attribute vec2 a_pos; void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }';

  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
    return sh;
  };

  try {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);

    // One triangle that covers the whole viewport.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = name => gl.getUniformLocation(program, name);
    const colors = new Float32Array(24);
    colors.set([0.043, 0.063, 0.149, 0.239, 0.275, 0.910, 0.694, 0.549, 1.000, 1.000, 0.839, 0.906]);
    gl.uniform3fv(u('u_colors'), colors);
    gl.uniform4f(u('u_shape'), 1.90, 0.10, 0.47, 0.04);
    gl.uniform4f(u('u_surface'), 1.54, 0.65, 0.00, 1.00);
    gl.uniform4f(u('u_finish'), 0.00, 0.21, 0.002, 0.10);
    gl.uniform4f(u('u_transform'), 4012.0, 5.65, 0.12, 0.0);
    gl.uniform4f(u('u_space'), 0.11, -0.19, 0.0, 0.0);
    gl.uniform4f(u('u_cursor'), 0.0, 2.0, 0.65, 0.46);
    const uScene = u('u_scene');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      tunnelShader.width = Math.round(tunnelShader.clientWidth * dpr);
      tunnelShader.height = Math.round(tunnelShader.clientHeight * dpr);
      gl.viewport(0, 0, tunnelShader.width, tunnelShader.height);
    };
    resize();
    new ResizeObserver(resize).observe(tunnelShader);

    const render = (ms) => {
      gl.uniform4f(uScene, tunnelShader.width, tunnelShader.height, (ms / 1000) * -0.73, 4.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(0);
    } else {
      let onScreen = true, rafId = 0;
      const loop = (ms) => { render(ms); rafId = requestAnimationFrame(loop); };
      const sync = () => {
        cancelAnimationFrame(rafId);
        if (!document.hidden && onScreen) rafId = requestAnimationFrame(loop);
      };
      document.addEventListener('visibilitychange', sync);
      new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); }).observe(tunnelShader);
      sync();
    }
  } catch (err) {
    console.warn('Mesh drift shader unavailable, using CSS gradient:', err);
    tunnelShader.remove();
  }
}
