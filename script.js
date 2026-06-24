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

// Add CSS active class transitions dynamically in header
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Add styles dynamically to support active/scrolled mobile menu
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .header.scrolled {
    box-shadow: 0 8px 30px rgba(44, 40, 37, 0.08);
    background-color: rgba(244, 241, 235, 0.95);
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
      box-shadow: 0 10px 20px rgba(0,0,0,0.05);
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
// Set default active filter (all if exists)
const defaultTab = document.querySelector('.filter-tab[data-filter="all"]') || filterTabs[0];
if (defaultTab) defaultTab.classList.add('active');
function applyFilter(filter) {
  document.querySelectorAll('.project-card').forEach(card => {
    if (filter === 'all' || card.dataset.category === filter) {
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
        content: "A fully autonomous boat project where I spearheaded the 3D modeling, mechanical design, physical assembly, and electrical integration. I conducted extensive field testing and iterative hardware refinement to ensure obstacle course reliability and hardware durability in marine environments.",
        highlights: [
          { icon: "fa-trophy text-yellow-500", title: "1st Place — Best Website", text: "recognized for the best team website among all competing teams at Roboboat 2026." },
          { icon: "fa-award", title: "3rd Place — TDR (Technical Design Report)", text: "awarded for excellence in engineering documentation and design presentation." },
          { icon: "fa-star", title: "Prefinalists — 7th Place Overall", text: "advanced to the prefinalist round out of an international field of 40+ teams, securing a top-tier ranking and outperforming elite global institutions, including MIT." }
        ],
        images: [
          { src: "roboboat-awards.png", label: "Roboboat 2026 Team Awards Photo", class: "modal-parts-img" }
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
          { src: "roboboat-mechanical.png", label: "Mechanical Hull Assembly & CAD Model List", class: "modal-cad-img" },
          { src: "master-bom.png", label: "RoboSub / RoboBoat Master BOM & Parts List", class: "modal-parts-img" }
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
          { src: "roboboat-electrical.png", label: "System Wiring Diagram & Waterproof Box Interior Enclosure", class: "modal-wiring-img" }
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
          { src: "roboboat-software-qgc.png", label: "Safety and Parameter Configs in QGroundControl", class: "modal-soft-img" },
          { src: "robosub-software.png", label: "ROS2 Autonomous Navigation & Station Keeping Test Plans", class: "modal-safety-img" }
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
        content: "Serving as co-lead and lab manager for Team Inspiration's RoboSub 2026 campaign. Spearheading deep bill-of-materials and parts list creation across all vehicle subsystems, and managing lab organization by meticulously documenting the physical location of every component and tool — keeping the team efficient and build-ready at all times.",
        highlights: [
          { icon: "fa-calendar-check", title: "Competition Schedule", text: "Active campaign targeting the final competition on July 11-16. Official website and final awards will be posted after competition." },
          { icon: "fa-folder-open", title: "Strategic Navigation", text: "Created a master document covering all parts, tools, tasks, and deadlines to onboard new members rapidly." }
        ],
        images: [
          { src: "robosub-card.png", label: "Team Inspiration next to the pool with RoboSub AUVs", class: "modal-parts-img" }
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
          { src: "robosub-mechanical.png", label: "ONYX AUV Configuration Mechanical layout / Lab floor plan", class: "modal-cad-img" }
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
          { src: "robosub-electrical.png", label: "GRAEY and ONYX Autonomous System Wiring Diagram", class: "modal-wiring-img" }
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
          { src: "robosub-software.png", label: "QGroundControl Safety configuration and test checklists", class: "modal-soft-img" }
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
          { src: "battlebot-details.png", label: "BattleBot Mechanical CAD Design & System Diagrams Details", class: "modal-wiring-img" }
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
          { src: "tensile-tester-details.png", label: "MATLAB Tensile Testing App Stress-Strain Curve Analyzer", class: "modal-matlab-img" }
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
        content: "In Early 2025, I stepped into the role of Director of Membership and Outreach for the San Diego Mesa College Engineering Club, focusing on expanding student engagement through hands-on projects, competitions, and community-building events. Alongside participation in the Beetleweight BattleBot and RoboBoat competitions, I helped organize technical workshops ranging from Python and Arduino-based projects to robotic arm and bridge design challenges.",
        highlights: [
          { icon: "fa-users", title: "Student Community Building", text: "Collaborated with SASE, SAE, and SHPE societies to organize student panels, guest lecturers, and networking mixers." },
          { icon: "fa-graduation-cap", title: "Technical Tutoring", text: "Assembled academic study panels and support groups in calculus, physics, and computer science." }
        ],
        images: [
          { src: "shpe-leadership.png", label: "Troy Prado Jr. with SHPE Chapter members and officers", class: "modal-parts-img" },
          { src: "shpe-flyers.png", label: "SHPE & Mesa Engineering Club Workshop Flyers Collection", class: "modal-cad-img" }
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
          { src: "row_machine.jpg", label: "Chest-Supported Row Machine", class: "modal-parts-img" }
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
  shirt: {
    title: "Custom Hand-Sewn Stripe Dress Shirt",
    category: "Creative Projects",
    tabs: [
      {
        id: "overview",
        name: "Overview",
        content: "Custom-modified dress shirt featuring intricate hand-sewn graphic embroidery on the chest and shoulder, showcasing a blend of formal-wear with contemporary streetwear elements.",
        highlights: [
          { icon: "fa-scissors", title: "Bespoke Hand Embroidery", text: "Crafted hours of detailed manual embroidery on vintage formal striped cotton garments." },
          { icon: "fa-palette", title: "Eco-Aesthetic Fusion", text: "Combined corporate aesthetics with sustainable street fashion motifs." }
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
      { src: "hoodie.jpg", label: "Upcycled Hoodie", class: "modal-parts-img" }
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
          { src: "shirt.jpg", label: "Upcycled Dress Shirt", class: "modal-parts-img" }
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
        content: "Founded and engineered NablaNotes, an AI-powered STEM note-taking platform targeting community college students across San Diego. Architected and shipped the full product from concept to working beta using React, Vite, TanStack Start, and Supabase — including a real-time handwriting OCR pipeline powered by Gemini 2.5 Flash that converts handwritten equations into solved, graphed, and step-by-step explained results directly within the note canvas.",
        highlights: [
          { icon: "fa-layer-group", title: "Multi-Layer Local-First Persistence", text: "Built a localStorage → IndexedDB → Supabase cloud sync architecture ensuring zero data loss across sessions and devices." },
          { icon: "fa-robot", title: "AI Tutor System", text: "Designed contextual equation lookup, YouTube video recommendations, and Socratic chat — all grounded in the student's actual handwritten work via canvas region capture." },
          { icon: "fa-pen-nib", title: "Two-Canvas GPU-Composited Rendering", text: "Engineered pressure-sensitive stylus input, multi-page notebooks, custom template overlays, and real-time stroke timestamping synced to lecture audio." },
          { icon: "fa-puzzle-piece", title: "Chrome Extension", text: "Built and published a companion Chrome extension enabling cross-platform screenshot capture from any homework platform directly into the note canvas." },
          { icon: "fa-credit-card", title: "Stripe Subscription Infrastructure", text: "Implemented role-based feature gating, a promo code system for tracking student acquisition by institution, and full payment flows." },
          { icon: "fa-user-gear", title: "Sole Engineer — Full Stack", text: "Product, infrastructure, AI integrations, database schema, auth, payments, and Chrome extension — all solo." }
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
          { icon: "fa-mobile-screen", title: "Mobile & Extensions", text: "Capacitor (iOS, incoming) · Chrome Extensions API — cross-platform capture and native deployment." },
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
          { src: "monkey_bot.jpg", label: "Monkey Bot – Autonomous RC Car", class: "modal-parts-img" },
{ src: "monkey_bot_2.jpg", label: "Monkey Bot – Sensor Suite Detail", class: "modal-parts-img" },
{ src: "monkey_bot_3.jpg", label: "Monkey Bot – Chassis Overview", class: "modal-parts-img" },
{ src: "monkey_bot_4.jpg", label: "Monkey Bot – Final Build", class: "modal-parts-img" }
        ]
      },
      {
        id: "mechanical",
        name: "Mechanical Assembly",
        content: "Designed and assembled a custom RC-based autonomous vehicle using 3D-modeled and 3D-printed components. The mechanical build focused on durability and modularity, using heat-set inserts for secure fastening and careful wire routing for reliability. Multiple camera placements and mounts were tested to determine the most effective configuration for vision-based navigation and obstacle detection.",
        highlights: [
          { icon: "fa-cubes", title: "Modular Fasteners", text: "Used heat-set brass threaded inserts to support modular accessory mounts." }
        ]
      },
      {
        id: "electrical",
        name: "Electrical Integration",
        content: "Integrated an Arduino and Raspberry Pi to manage sensors, motors, and control logic. Gained hands-on experience with electrical wiring, power distribution, and current limits to prevent short circuits or overheating. Used SSH and VS Code to remotely run programs, troubleshoot issues, and fine-tune hardware-software interactions through repeated testing until the system reliably completed the obstacle course.",
        highlights: [
          { icon: "fa-microchip", title: "Dual Processor Logic", text: "Arduino acts as motor controller (PWM limits), while Raspberry Pi processes sensory stack inputs." }
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

// Function to inject specific Tab Content
function injectTabContent(tab) {
  let highlightsHTML = '';
  if (tab.highlights && tab.highlights.length > 0) {
    highlightsHTML = `
      <ul class="modal-highlights">
        ${tab.highlights.map(h => `
          <li>
            <div>
              <h4>${h.title}</h4>
              <p>${h.text}</p>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  }

  let imagesHTML = '';
  if (tab.images && tab.images.length > 0) {
    imagesHTML = `
      <div class="modal-images-grid">
        ${tab.images.map(img => `
          <div class="modal-img-card">
            <img src="${img.src}" alt="${img.label}" class="modal-img-element" />
            <span class="modal-img-label">${img.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  modalContentContainer.innerHTML = `
    <p class="modal-subsystem-desc">${tab.content}</p>
    ${highlightsHTML}
    ${imagesHTML}
  `;
}

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
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });
}
