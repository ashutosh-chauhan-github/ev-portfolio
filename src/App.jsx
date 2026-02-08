import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  Terminal, 
  Layers, 
  Settings, 
  Database, 
  ArrowRight, 
  Linkedin, 
  Code, 
  Box, 
  Workflow, 
  ChevronRight, 
  MoveRight, 
  Cpu, 
  Zap, 
  Globe, 
  Battery, 
  Plug, 
  RefreshCw, 
  ChevronLeft, 
  Truck,
  PenTool,
  FileSpreadsheet,
  LayoutGrid,
  ListTodo,
  Search,
  BatteryCharging,
  FileText,
  Download,
  Lock,
  Unlock,
  ScanLine,
  Mail,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/* --- ASSETS --- */
// 1. SEPARATE IMAGES FOR HERO AND CONTACT
const HERO_BG_IMG = "/hero-bg.jpg"; 
const CONTACT_PROFILE_IMG = "/CONTACT_PROFILE_IMG.jpg";

/* --- DESIGN SYSTEM CONSTANTS --- */
const COLORS = {
  bg: '#0B0D10',
  panel: '#111418',
  text: '#FFFFFF',
  secondary: '#B0B4BA',
  muted: '#8A8F98',
  accent: '#FF7A18', // Neon Orange
  success: '#4ADE80', // Status Green
  grid: 'rgba(255, 255, 255, 0.03)'
};

/* --- DATA --- */
const PROJECTS = [
  {
    id: 1,
    title: "Gen-3 Swap Station",
    subtitle: "HARDWARE & MANUFACTURING",
    desc: "End-to-end development of next-gen swap station hardware with BOM optimization and DFM readiness.",
    tags: ["BOM MGMT", "DFM", "COST OPTIMIZATION"]
  },
  {
    id: 2,
    title: "Station UI Overhaul",
    subtitle: "FIELD UX / HMI",
    desc: "Redesigned UI for 350+ live swap stations optimized for high-glare, time-critical environments.",
    tags: ["HMI", "FIELD UX", "SYSTEM FLOWS"]
  },
  {
    id: 3,
    title: "IoT & Firmware OTA",
    subtitle: "SYSTEMS ENGINEERING",
    desc: "Implemented OTA firmware update protocols and remote fleet monitoring for distributed EV infrastructure.",
    tags: ["FIRMWARE", "OTA", "IOT SYSTEMS"]
  },
  {
    id: 4,
    title: "FSM Logic Implementation",
    subtitle: "SAFETY & RELIABILITY",
    desc: "Designed FSM logic to manage charging, locking, and swap states, eliminating undefined transitions.",
    tags: ["FSM", "SAFETY LOGIC", "EDGE CASES"]
  },
  {
    id: 5,
    title: "Predictive Maintenance",
    subtitle: "DATA & RELIABILITY",
    desc: "Built telemetry-driven models to predict component failures and reduce unplanned downtime.",
    tags: ["ANALYTICS", "RELIABILITY", "FAILURE PREDICTION"]
  },
  {
    id: 6,
    title: "Hardware R&D",
    subtitle: "COMPONENT VALIDATION",
    desc: "Tested alternative E-locks, chargers, and IoT modules to reduce vendor dependency.",
    tags: ["HARDWARE TESTING", "R&D", "VENDOR DEV"]
  },
  {
    id: 7,
    title: "Operational SOPs",
    subtitle: "PROCESS & SCALE ENGINEERING",
    desc: "Defined SOPs enabling scale from 50 → 350+ swap stations.",
    tags: ["SOPS", "SCALABILITY", "OPERATIONS"]
  }
];

const EXPERIENCE = [
  {
    role: "Associate Product Manager",
    company: "Baaz Bikes",
    domain: "EV Infrastructure | Battery Swapping",
    period: "Dec 2024 – Present",
    highlight: "Scaled network from 50 → 350+ stations",
    details: "Owned reliability, ops tooling, failure management",
    ecosystemBrands: ["Vecmocon", "Bytebeam", "JioThings", "Accord Chargers", "RapidTron Electronika", "Solterra", "Blecter"],
    expandedContent: [
      {
        title: "Scale & Impact",
        items: [
          "Scaled EV battery-swapping network from 50 to 300+ stations during rapid expansion.",
          "Ensured system reliability, uptime, and operational stability at scale."
        ]
      },
      {
        title: "Product & Delivery",
        items: [
          "Led end-to-end feature delivery across hardware, firmware, and software.",
          "Shipped UI, FSM redesign, OTA updates, and IoT dashboards to production."
        ]
      },
      {
        title: "Product Ops & Data",
        items: [
          "Owned KPIs, RCA, and issue triage for field and system failures.",
          "Built predictive & preventive maintenance frameworks using operational data."
        ]
      },
      {
        title: "Strategy & Execution",
        items: [
          "Drove next-gen swap station development, vendor management, and cost estimation.",
          "Created SOPs for installation, site design, and seasonal maintenance."
        ]
      }
    ]
  },
  {
    role: "Product Management Intern",
    company: "Meron Scientific",
    domain: "Industrial Hardware",
    period: "2024",
    highlight: "Industrial Hardware Ecosystem Integration",
    details: "Worked with clients like Dr Lal PathLabs, TION",
    ecosystemBrands: [],
    expandedContent: [
      {
        title: "Market Strategy & Growth",
        items: [
          "Collaborated on ESR Analyzer product lifecycle, boosting conversion rate by 15% through targeted market research.",
          "Developed and executed market strategy for Biochemistry Analyzer, resulting in 20% sales growth.",
          "Reduced time-to-market by 15% by optimizing marketing and sales channels."
        ]
      },
      {
        title: "Cost Optimization",
        items: [
          "TION India Project: Analyzed product metrics, identified and filled product gaps that nearly led to 90% cost reduction."
        ]
      }
    ]
  },
  {
    role: "Business / Product Intern",
    company: "Prodo Technologies",
    domain: "Enterprise Operations",
    period: "2023",
    highlight: "Managed enterprise clients",
    details: "Burger Singh, Cult.fit, Delhivery, Eggoz Nutrition",
    ecosystemBrands: [],
    expandedContent: [
      {
        title: "Efficiency & Operations",
        items: [
          "Collaborated with cross-functional teams in proposal development, successfully reducing product delivery timelines by 20%.",
          "Analyzed RFQs and negotiated prices with suppliers, achieving cost savings of 10%."
        ]
      },
      {
        title: "Technical Implementation",
        items: [
          "Conducted research to reduce data gaps, developed web scraper that improved data collection efficiency by 40%."
        ]
      }
    ]
  }
];

/* Reorganized for Infinite Scrolls */
const SCROLL_ROWS = [
  // Row 1: Languages & Core Tech
  [
    { name: "Python", icon: <Terminal size={20} /> },
    { name: "SQL", icon: <Database size={20} /> },
    { name: "C Language", icon: <Code size={20} /> },
    { name: "HTML5", icon: <Globe size={20} /> },
    { name: "CSS3", icon: <Layers size={20} /> },
    { name: "NumPy", icon: <Box size={20} /> },
    { name: "Pandas", icon: <Box size={20} /> },
  ],
  // Row 2: Concepts & Skills
  [
    { name: "Product Mgmt", icon: <Workflow size={20} /> },
    { name: "Machine Learning", icon: <Cpu size={20} /> },
    { name: "Data Analytics", icon: <BarChart3 size={20} /> },
    { name: "Web Scraping", icon: <Search size={20} /> },
    { name: "System Design", icon: <Settings size={20} /> },
    { name: "A/B Testing", icon: <Activity size={20} /> },
  ],
  // Row 3: Tools & Platforms
  [
    { name: "Figma", icon: <PenTool size={20} /> },
    { name: "Power BI", icon: <Activity size={20} /> },
    { name: "Excel", icon: <FileSpreadsheet size={20} /> },
    { name: "Jira", icon: <ListTodo size={20} /> },
    { name: "Miro", icon: <LayoutGrid size={20} /> },
    { name: "Asana", icon: <ListTodo size={20} /> },
    { name: "Tableau", icon: <BarChart3 size={20} /> },
  ],
  // Row 4: Domain Expertise (Derived from Project Tags)
  [
    { name: "BOM Mgmt", icon: <FileSpreadsheet size={20} /> },
    { name: "DFM", icon: <Settings size={20} /> },
    { name: "Cost Ops", icon: <Activity size={20} /> },
    { name: "HMI Design", icon: <LayoutGrid size={20} /> },
    { name: "OTA Updates", icon: <Globe size={20} /> },
    { name: "IoT Systems", icon: <Cpu size={20} /> },
    { name: "State Machines", icon: <Workflow size={20} /> },
    { name: "Reliability", icon: <Activity size={20} /> },
    { name: "Scalability", icon: <BarChart3 size={20} /> },
  ]
];

/* --- ANIMATION COMPONENTS --- */

// The "Module" wrapper that simulates a battery locking into a slot
const BatteryModule = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0, scale: 0.98 }}
      whileInView={{ 
        y: 0, 
        opacity: 1, 
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 100, 
          damping: 20, 
          mass: 1 
        } 
      }}
      viewport={{ once: true, margin: "-5%" }}
      className={`relative pl-8 md:pl-12 border-l-2 border-[#FF7A18]/20 ${className}`}
    >
      {/* Connector Node - "Clicks" in */}
      <motion.div 
        initial={{ scale: 0, backgroundColor: "#111" }}
        whileInView={{ scale: 1, backgroundColor: "#0B0D10" }}
        transition={{ delay: 0.2, duration: 0.2 }}
        className="absolute left-[-9px] top-8 w-4 h-4 rounded-full border-2 border-[#FF7A18] z-10"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full h-full bg-[#FF7A18] rounded-full animate-pulse"
        />
      </motion.div>
      
      {/* Mechanical "Flash" on entry */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.1, 0] }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute inset-0 bg-[#FF7A18] pointer-events-none z-0 mix-blend-overlay"
      />

      {children}
    </motion.div>
  );
};

const JourneyLine = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed left-6 md:left-[80px] top-0 bottom-0 w-[2px] bg-[#FFFFFF]/5 z-0 hidden md:block">
      <motion.div 
        style={{ scaleY, transformOrigin: "top" }}
        className="w-full h-full bg-[#FF7A18] shadow-[0_0_15px_#FF7A18]"
      />
    </div>
  );
};

const ChargeLevel = () => {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const color = useTransform(scrollYProgress, [0, 1], ["#FF7A18", "#4ADE80"]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50">
        <BatteryCharging size={16} className="text-[#8A8F98]" />
        <div className="w-2 h-32 border border-white/20 rounded-full p-[2px] relative">
            <motion.div 
                style={{ height, backgroundColor: color }}
                className="w-full rounded-full absolute bottom-[2px] left-[2px] right-[2px]"
            />
        </div>
        <span className="font-mono text-[10px] text-[#8A8F98] writing-vertical">CHARGE</span>
    </div>
  );
};

/* --- COMPONENTS --- */

const SystemStatus = () => (
  <div className="fixed top-6 right-6 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full font-mono text-xs tracking-wider shadow-xl">
    <div className="flex items-center gap-2">
      <span className="text-[#8A8F98] hidden sm:inline">GRID STATUS:</span>
      <span className="text-[#4ADE80] font-bold">ONLINE</span>
    </div>
    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
      <Zap size={12} className="text-[#FF7A18] animate-pulse" fill="#FF7A18" />
      <span>AC-EV-SYS</span>
    </div>
  </div>
);

const SectionHeading = ({ children, num }) => (
  <div className="flex flex-col gap-2 mb-8">
    <div className="flex items-center gap-3">
        <span className="font-mono text-[#FF7A18] text-sm tracking-widest bg-[#FF7A18]/10 px-2 py-1 rounded-sm border border-[#FF7A18]/20">
        MOD // {num}
        </span>
        <div className="h-[1px] w-12 bg-[#FF7A18]/50" />
    </div>
    <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight uppercase text-white mt-2">
      {children}
    </h2>
  </div>
);

const BackgroundGrid = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-[#0B0D10]" />
    
    {/* Floating "Sparks" */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[#FF7A18] rounded-full opacity-30"
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight 
        }}
        animate={{ 
          y: [null, Math.random() * window.innerHeight],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 5 + Math.random() * 5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
    ))}
  </div>
);

/* --- SECTIONS --- */

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden pt-12 md:pt-20 ml-0 md:ml-12">
      
      {/* Parallax Background Image - using HERO_BG_IMG */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG_IMG})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/90 to-black/60" />
      </motion.div>

      <BackgroundGrid />
      
      <div className="relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[#FF7A18] mb-4 text-xs md:text-sm tracking-widest bg-black/50 backdrop-blur-sm w-fit px-3 py-1 border border-[#FF7A18]/20 rounded-sm flex items-center gap-2"
        >
          <Plug size={12} className="animate-pulse" /> SYSTEM ONLINE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl text-white"
        >
          Ashutosh
          <br />
          Chauhan
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pl-4 border-l-2 border-[#FF7A18] mb-8"
        >
          <h2 className="text-lg md:text-3xl font-medium text-[#B0B4BA] uppercase tracking-tight drop-shadow-lg">
            Engineering the future of <br />
            <span className="text-[#FF7A18] font-bold glow-text">Mobility Infrastructure</span>
          </h2>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-6 md:left-20 font-mono text-xs text-[#555] flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>COORD: 28.6139° N, 77.2090° E</span>
        <span>ID: AC-EV-SYS-01</span>
      </motion.div>
    </section>
  );
};

const Intro = () => {
  return (
    <section className="py-8 md:py-12 px-6 md:px-20 relative z-10 bg-[#0B0D10] ml-0 md:ml-12">
      <BatteryModule>
        <div className="max-w-3xl">
            <motion.div 
            className="text-xl md:text-3xl leading-relaxed text-[#B0B4BA]"
            >
            <span className="text-white font-medium block mb-8">
                I’m a builder obsessed with solving the physical and digital challenges of electric mobility infrastructure.
            </span>
            </motion.div>
            
            <motion.p 
            className="text-lg md:text-2xl leading-relaxed text-[#B0B4BA] mt-8 font-light"
            >
            From hardware and firmware integration to operational intelligence, I work on systems that help India move.
            </motion.p>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-4 font-mono text-xs md:text-sm text-[#FF7A18]">
            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><Cpu size={14}/> DRIVEN BY CURIOSITY</span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><Database size={14}/> FUELED BY DATA</span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full"><Zap size={14}/> GROUNDED IN CONSTRAINTS</span>
            </div>
        </div>
      </BatteryModule>
    </section>
  );
};

const VennSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3. Venn Diagram Logic: Buffer added. Merge 0-0.4, Text 0.4-0.6, Hold 0.6-1.0
  const circle1X = useTransform(scrollYProgress, [0, 0.4], ["-35%", "-10%"]); 
  const circle1Y = useTransform(scrollYProgress, [0, 0.4], ["-35%", "-10%"]);
  
  const circle2X = useTransform(scrollYProgress, [0, 0.4], ["35%", "10%"]);
  const circle2Y = useTransform(scrollYProgress, [0, 0.4], ["-35%", "-10%"]);
  
  const circle3Y = useTransform(scrollYProgress, [0, 0.4], ["35%", "15%"]);
  
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]); 
  
  const finalOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const finalBlur = useTransform(scrollYProgress, [0.4, 0.6], ["blur(10px)", "blur(0px)"]);

  return (
    <section ref={containerRef} className="h-[350vh] relative z-10 bg-[#0B0D10] hidden md:block ml-0 md:ml-12">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        <div className="absolute top-20 left-6 z-20">
          <SectionHeading num="03">What I Can Do</SectionHeading>
        </div>

        <div className="relative w-full h-full flex items-center justify-center scale-90 translate-y-12">
          {/* Circle 1: DESIGN */}
          <motion.div 
            style={{ x: circle1X, y: circle1Y }}
            className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-white/20 bg-[#111418]/80 backdrop-blur-sm flex items-center justify-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.span style={{ opacity: opacityText }} className="font-mono text-xl tracking-widest text-white font-bold">DESIGN</motion.span>
          </motion.div>

          {/* Circle 2: TECHNOLOGY */}
          <motion.div 
            style={{ x: circle2X, y: circle2Y }}
            className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-white/20 bg-[#111418]/80 backdrop-blur-sm flex items-center justify-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.span style={{ opacity: opacityText }} className="font-mono text-xl tracking-widest text-white font-bold">TECHNOLOGY</motion.span>
          </motion.div>

          {/* Circle 3: ANALYTICS */}
          <motion.div 
            style={{ y: circle3Y }}
            className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-white/20 bg-[#111418]/80 backdrop-blur-sm flex items-center justify-center z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <motion.span style={{ opacity: opacityText }} className="font-mono text-xl tracking-widest text-white font-bold">ANALYTICS</motion.span>
          </motion.div>

          {/* Final Merged Text */}
          <motion.div 
            style={{ opacity: finalOpacity }}
            className="absolute z-50 text-center w-full"
          >
            <motion.h2 
              style={{ 
                filter: finalBlur
              }}
              className="text-5xl lg:text-7xl font-black uppercase text-white whitespace-nowrap drop-shadow-[0_0_30px_rgba(255,122,24,0.3)]"
            >
              Build Scalable
              <br />
              <span className="text-[#FF7A18]">Products</span>
            </motion.h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MobileVennFallback = () => (
  <section className="py-8 px-6 md:hidden bg-[#0B0D10]">
     <SectionHeading num="03">What I Can Do</SectionHeading>
     <div className="flex flex-col gap-4">
        {/* Simplified mobile view without heavy transforms */}
        <div className="p-8 border border-white/10 bg-[#111418] rounded-2xl relative overflow-hidden">
           <h3 className="text-2xl font-bold text-white mb-2">DESIGN</h3>
           <p className="text-[#B0B4BA] text-sm">User-centric interfaces and hardware aesthetics.</p>
        </div>
        <div className="p-8 border border-white/10 bg-[#111418] rounded-2xl relative overflow-hidden">
           <h3 className="text-2xl font-bold text-white mb-2">TECHNOLOGY</h3>
           <p className="text-[#B0B4BA] text-sm">Hardware-software integration and firmware logic.</p>
        </div>
        <div className="p-8 border border-white/10 bg-[#111418] rounded-2xl relative overflow-hidden">
           <h3 className="text-2xl font-bold text-white mb-2">ANALYTICS</h3>
           <p className="text-[#B0B4BA] text-sm">Data-driven decision making and fleet optimization.</p>
        </div>
     </div>
  </section>
);

const ExperienceTimeline = () => {
  const scrollContainerRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  
  const velocity = useRef(0);
  const lastMouseX = useRef(0);
  const rafId = useRef(null);
  const isDragging = useRef(false);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    setIsDown(true);
    isDragging.current = true;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    lastMouseX.current = e.pageX;
    cancelAnimationFrame(rafId.current);
    velocity.current = 0;
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2; 
    
    const currentMouseX = e.pageX;
    const delta = currentMouseX - lastMouseX.current;
    velocity.current = delta; 
    lastMouseX.current = currentMouseX;

    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDragging = () => {
    if (!isDown) return;
    setIsDown(false);
    isDragging.current = false;
    startMomentum();
  };
  
  const startMomentum = () => {
    cancelAnimationFrame(rafId.current);
    
    const momentumLoop = () => {
      if (!scrollContainerRef.current) return;
      velocity.current *= 0.95; 
      if (Math.abs(velocity.current) > 0.5) {
        scrollContainerRef.current.scrollLeft -= velocity.current * 1.5; 
        rafId.current = requestAnimationFrame(momentumLoop);
      }
    };
    momentumLoop();
  };

  return (
    <section className="py-8 bg-[#0B0D10] overflow-hidden relative select-none ml-0 md:ml-12">
      <BatteryModule>
        <div className="pr-6 md:pr-20 mb-8 md:mb-12 flex items-end justify-between">
            <div>
                {/* SWAPPED: Experience is now Mod 04 */}
                <SectionHeading num="04">Experience</SectionHeading>
            </div>
            
            <div className="hidden md:flex gap-2 mb-8">
                <button 
                    onClick={() => scroll('left')}
                    className="p-3 border border-white/10 hover:border-[#FF7A18] hover:text-[#FF7A18] hover:bg-[#FF7A18]/10 rounded-full transition-all active:scale-95"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={() => scroll('right')}
                    className="p-3 border border-white/10 hover:border-[#FF7A18] hover:text-[#FF7A18] hover:bg-[#FF7A18]/10 rounded-full transition-all active:scale-95"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="flex md:hidden items-center gap-2 text-[#FF7A18] font-mono text-xs animate-pulse mb-8">
            <MoveRight size={14} /> <span>SWIPE / DRAG</span>
            </div>
        </div>

        <div 
            ref={scrollContainerRef}
            className={`w-full overflow-x-auto flex gap-6 px-6 md:px-0 pb-12 hide-scrollbar items-start ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
            onMouseDown={onMouseDown}
            onMouseLeave={stopDragging}
            onMouseUp={stopDragging}
            onMouseMove={onMouseMove}
        >
            <div className="absolute left-0 w-full h-[1px] bg-white/5 top-[55%] -z-0 hidden md:block" />
            
            {EXPERIENCE.map((exp, index) => {
              const isExpanded = expandedId === index;
              return (
                <div key={index} className="relative min-w-[75vw] md:min-w-[500px] shrink-0 snap-center transition-all duration-300">
                    <div className={`hidden md:block absolute top-[55%] left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 bg-[#0B0D10] z-20 ${index === 0 ? 'border-[#FF7A18] shadow-[0_0_10px_#FF7A18]' : 'border-white/20'}`} />
                    
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : index)}
                      className={`
                        p-6 md:p-8 border bg-[#111418] relative group flex flex-col justify-between rounded-xl transition-all duration-300 cursor-pointer
                        ${index === 0 ? 'border-[#FF7A18]/30 shadow-[0_0_30px_-10px_rgba(255,122,24,0.1)]' : 'border-white/10'}
                        ${isExpanded ? 'bg-[#161a1f] border-[#FF7A18]/50 ring-1 ring-[#FF7A18]/20' : 'hover:bg-[#161a1f]'}
                      `}
                    >
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                <div className="text-[#FF7A18] font-mono text-sm flex items-center gap-2">
                                    {index === 0 && <Battery size={14} className="animate-pulse" />} 
                                    {exp.company}
                                </div>
                            </div>
                            <span className="font-mono text-xs text-[#555] border border-[#333] px-2 py-1 rounded w-fit bg-black">{exp.period}</span>
                            </div>
                            
                            <div className="mb-4">
                            <span className="text-[#8A8F98] text-sm block mb-2 font-mono">{exp.domain}</span>
                            <p className="text-white text-lg font-medium border-l-2 border-[#FF7A18] pl-3 py-1 bg-white/5">{exp.highlight}</p>
                            <p className="text-[#B0B4BA] text-sm mt-4 leading-relaxed">{exp.details}</p>
                            </div>
                        </div>

                        {/* Expandable Content Area */}
                        <AnimatePresence>
                          {isExpanded && exp.expandedContent && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6 border-t border-white/10 mt-2 space-y-6">
                                {exp.expandedContent.map((section, idx) => (
                                  <div key={idx}>
                                    <h4 className="text-[#FF7A18] font-mono text-xs mb-2 uppercase tracking-wider">{section.title}</h4>
                                    <ul className="space-y-2">
                                      {section.items.map((item, i) => (
                                        <li key={i} className="text-[#B0B4BA] text-sm leading-relaxed flex items-start gap-2">
                                          <span className="mt-1.5 w-1 h-1 bg-[#FF7A18] rounded-full shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mt-auto pt-6 border-t border-white/5">
                            {exp.ecosystemBrands.length > 0 && (
                                <div className="mb-4">
                                <h4 className="font-mono text-[10px] text-[#555] mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <Truck size={12} /> Ecosystem Partners
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.ecosystemBrands.map((brand, i) => (
                                    <span key={i} className="px-2 py-1 bg-black/20 border border-white/5 text-[#8A8F98] text-[10px] font-mono uppercase rounded-sm hover:text-white transition-colors">
                                        {brand}
                                    </span>
                                    ))}
                                </div>
                                </div>
                            )}
                            
                            <div className="flex justify-center w-full text-[#555]">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </div>
                    </div>
                </div>
              );
            })}
            <div className="min-w-[20px] md:min-w-[100px]" />
        </div>
      </BatteryModule>
    </section>
  );
};

const ProjectsGrid = () => {
  return (
    <section className="py-8 px-6 md:px-20 relative z-10 bg-[#0B0D10] ml-0 md:ml-12">
      <BatteryModule>
        {/* SWAPPED: Projects is now Mod 05 */}
        <SectionHeading num="05">Projects</SectionHeading>
        <div className="font-mono text-[#B0B4BA] mb-12 -mt-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF7A18] rounded-full animate-pulse"></span>
            Proof of scale. Real systems. Real constraints.
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 hide-scrollbar">
            {PROJECTS.map((project) => (
            <div
                key={project.id}
                className="
                  min-w-[85vw] md:min-w-0 snap-center
                  relative bg-[#111418] border border-white/5 p-8 overflow-hidden group hover:border-[#FF7A18]/50 hover:bg-[#161a1f] transition-all duration-300 rounded-lg flex flex-col h-full
                "
            >
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF7A18] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF7A18] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* EV Icon Decoration */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity text-[#FF7A18]">
                    {project.id % 2 === 0 ? <Zap /> : <RefreshCw />}
                </div>

                <div className="flex flex-col h-full">
                <div className="mb-4">
                    <span className="font-mono text-[10px] text-[#FF7A18] mb-2 block tracking-wider border border-[#FF7A18]/20 w-fit px-1 rounded-sm">{project.subtitle}</span>
                    <h3 className="text-xl font-bold text-white uppercase leading-tight">{project.title}</h3>
                </div>

                <p className="text-[#B0B4BA] text-sm leading-relaxed mb-6">
                    {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-[#8A8F98] border border-white/5 uppercase rounded-sm">
                        {tag}
                    </span>
                    ))}
                </div>
                </div>
            </div>
            ))}
        </div>
      </BatteryModule>
    </section>
  );
};

/* 2. CAPABILITIES - PAUSE ON HOVER VIA CSS */
const Capabilities = () => {
  return (
    <section className="py-8 bg-[#0B0D10] relative z-10 border-t border-white/5 overflow-hidden ml-0 md:ml-12">
      <BatteryModule>
        <div className="pr-6 md:pr-20 mb-12">
            <SectionHeading num="06">Capabilities</SectionHeading>
        </div>

        <div className="flex flex-col gap-10">
            {SCROLL_ROWS.map((rowItems, rowIndex) => (
            <div key={rowIndex} className="relative w-full overflow-hidden mask-gradient-x group">
                <div
                  className={`flex gap-4 md:gap-8 whitespace-nowrap w-fit ${rowIndex % 2 === 0 ? 'animate-scroll' : 'animate-scroll-reverse'} pause-on-hover`}
                >
                    {/* Quadruple duplication for smooth loop */}
                    {[...rowItems, ...rowItems, ...rowItems, ...rowItems].map((skill, index) => (
                    <div 
                        key={index} 
                        className="
                        flex items-center gap-3 px-6 py-4 bg-[#111418] 
                        border border-white/10 rounded-lg 
                        hover:border-[#FF7A18]/50 hover:bg-[#FF7A18]/5 transition-all
                        min-w-[180px] md:min-w-[220px]
                        "
                    >
                        <div className="text-[#B0B4BA] transition-colors">
                        {skill.icon}
                        </div>
                        <span className="font-mono text-sm font-medium text-white transition-colors">
                        {skill.name}
                        </span>
                    </div>
                    ))}
                </div>
            </div>
            ))}
        </div>
      </BatteryModule>
    </section>
  );
};

/* 4. CERTIFICATIONS - LOGO PLACEHOLDERS */
const Certifications = () => {
  const certs = [
    { 
      org: "Aha!", 
      logo: "/logo-aha.png", 
      name: "Product Management Professional Certificate", 
      link: "https://www.linkedin.com/learning/certificates/8424e7f74260c9f1ba5deee9c4f87ab7b671c1bd4cd9c8cad65f5544774ca134" 
    },
    { 
      org: "Accenture", 
      logo: "/logo-accenture.png",
      name: "PM Job Simulation",
      link: "https://drive.google.com/file/d/1fy-fYIaNSYvXvcog2uyeN1abhj4ohYNL/view"
    },
    { 
      org: "PMI", 
      logo: "/logo-pmi.png",
      name: "Technical Product Management",
      link: "https://drive.google.com/file/d/1IG6xX6a0Rv5h1Qa0qHpmB3NcZFlhddUw/view"
    },
    { 
      org: "TATA", 
      logo: "/logo-tata.png",
      name: "Data Visualization",
      link: "https://drive.google.com/file/d/1UX3k0p6Yu_nxyV8Gt9wfdxVDVyvFCaQ0/view"
    },
    { 
      org: "KPMG", 
      logo: "/logo-kpmg.png",
      name: "Analytics Consulting",
      link: "https://drive.google.com/file/d/1BnSf2bTj-SlYuCiLRBLM_J6LP7FDDMxa/view"
    },
    { 
      org: "GeeksForGeeks", 
      logo: "/logo-gfg.png",
      name: "SQL Foundations",
      link: "https://media.geeksforgeeks.org/courses/certificates/fbba4e1e4d793c401352c259921b59b9.pdf"
    }
  ];

  return (
    <section className="py-8 px-6 md:px-20 bg-[#0B0D10] relative z-10 ml-0 md:ml-12">
      <BatteryModule>
        <div className="flex items-center gap-4 mb-8">
           <span className="font-mono text-[#FF7A18] text-sm tracking-widest">//07</span>
           <h3 className="text-2xl font-bold uppercase text-white">Certifications</h3>
        </div>
        
        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-12 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-6 hide-scrollbar">
          {certs.map((cert, i) => (
            <a 
              key={i}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                min-w-[70vw] md:min-w-0 snap-center
                relative p-4 border border-white/5 hover:border-white/20 bg-[#111418] transition-all hover:-translate-y-1 group rounded-lg overflow-hidden cursor-pointer block text-center
              "
            >
              {/* Holographic Scan Animation */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-[#FF7A18] shadow-[0_0_15px_#FF7A18] z-20 opacity-0 group-hover:opacity-100"
                initial={{ y: -10 }}
                whileHover={{ 
                    y: 150,
                    transition: { duration: 1.5, repeat: Infinity, ease: "linear" } 
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-[#FF7A18]/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity" 
              />

              <div className="relative z-0 flex flex-col items-center">
                <div className="w-16 h-16 mb-4 rounded-full border-2 border-white/10 overflow-hidden flex items-center justify-center bg-black">
                    <img src={cert.logo} alt={cert.org} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{cert.org}</h4>
                <p className="text-xs text-[#B0B4BA] font-mono leading-tight">{cert.name}</p>
              </div>
            </a>
          ))}
        </div>
      </BatteryModule>
    </section>
  );
};

/* --- REFINED FOOTER --- */
const Footer = () => {
  const containerRef = useRef(null);

  return (
    <footer ref={containerRef} className="relative flex flex-col justify-center items-center bg-[#0B0D10] overflow-hidden pt-12 pb-6">
      <BackgroundGrid />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF7A18]/5 to-transparent pointer-events-none" />

      {/* 5. Trigger Earlier: margin -10% */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        viewport={{ amount: 0.2, margin: "0px 0px -100px 0px" }} 
        className="w-full max-w-4xl mx-auto px-6 relative z-10"
      >
        <div className={`
            relative bg-[#111418] rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-700 overflow-hidden
            border border-white/10 hover:border-[#FF7A18]/30 group/footer
        `}>
            {/* Fun decorative corners appearing on hover */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF7A18] opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FF7A18] opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FF7A18] opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF7A18] opacity-0 group-hover/footer:opacity-100 transition-opacity duration-300" />

            {/* Header Content - using CONTACT_PROFILE_IMG */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-10 mt-4">
                <div className="relative w-24 h-24 shrink-0 rounded-full border border-white/10 p-1 bg-black/50">
                    <img 
                        src={CONTACT_PROFILE_IMG} 
                        alt="Ashutosh" 
                        className="w-full h-full rounded-full object-cover grayscale group-hover/footer:grayscale-0 transition-all duration-500" 
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -bottom-1 -right-1 bg-[#4ADE80] text-black rounded-full p-1 border-2 border-[#111418]"
                    >
                        <CheckCircle2 size={12} />
                    </motion.div>
                </div>
                <div className="text-left">
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-white leading-none mb-2">
                      Let’s Build<br />
                      <span className="text-[#FF7A18]">The Future.</span>
                    </h2>
                    <p className="text-[#B0B4BA] max-w-lg mt-3 flex items-center justify-start gap-2">
                      <span className="hidden md:block w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
                      Electrifying the way India moves.
                    </p>
                </div>
            </div>
            
            {/* Buttons Grid - Creative & Professional */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="mailto:ashutoshchauhan3203@gmail.com"
                className="md:col-span-1 group/btn h-12 bg-[#FF7A18] text-black font-bold text-sm tracking-wide rounded-lg hover:bg-[#FF9A50] transition-colors flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <Mail size={16} className="fill-black" /> Let's Connect
                </span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/ashutoshchauhan-?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BsZvEc7E6TkSiN2tMmAXeeg%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-1 group/btn h-12 border border-white/10 bg-white/5 text-white font-medium text-sm tracking-wide rounded-lg hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all flex items-center justify-center gap-2"
              >
                <Linkedin size={16} /> LinkedIn
              </a>

              <a 
                href="https://drive.google.com/file/d/1HhhBHAmWPNXSK01EQqaYy7U1yXi7ogO8/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="md:col-span-1 group/btn h-12 border border-white/10 bg-white/5 text-white font-medium text-sm tracking-wide rounded-lg hover:border-[#4ADE80] hover:text-[#4ADE80] hover:bg-[#4ADE80]/10 transition-all flex items-center justify-center gap-2 overflow-hidden relative"
              >
                <FileText size={16} /> Access Resume
                <div className="absolute inset-0 bg-[#4ADE80]/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <Download size={14} className="opacity-50 group-hover/btn:opacity-100 ml-1" />
              </a>
            </div>
        </div>

        {/* Footer Bottom - Minimal */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#555] font-mono border-t border-white/5 pt-6">
          <div className="flex items-center gap-2">
            <span>SYSTEM STATUS: OPERATIONAL</span>
            <div className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-pulse" />
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
             <Zap size={12} className="group-hover:text-[#FF7A18] transition-colors" /> 
             <span className="group-hover:text-white transition-colors">POWERED BY REACT</span>
          </div>
          <div>© 2026 ASHUTOSH CHAUHAN</div>
        </div>
      </motion.div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[#0B0D10] text-white min-h-screen selection:bg-[#FF7A18] selection:text-black font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-gradient-x {
           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
           -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .writing-vertical {
            writing-mode: vertical-rl;
            text-orientation: mixed;
        }
        
        /* 2. Keyframes for Pause-on-Hover Marquee */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-scroll {
          animation: marquee 40s linear infinite;
        }
        .animate-scroll-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* GLOBAL JOURNEY VISUALS */}
      <JourneyLine />
      <ChargeLevel />
      <SystemStatus />

      <Hero />
      <Intro />
      <VennSection />
      <MobileVennFallback />
      {/* Reordered: Experience First (04), Projects Second (05) */}
      <ExperienceTimeline />
      <ProjectsGrid />
      <Capabilities />
      <Certifications />
      <Footer />
    </div>
  );
}
