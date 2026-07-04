import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";
import {
  Zap,
  Code2,
  Globe,
  Terminal,
  HardDrive,
  Brain,
  GripHorizontal,
  Database,
  Cpu,
  Layers,
  Rocket,
  Sparkles,
  Smartphone,
  Package,
  Monitor,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Register GSAP Plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

/* ─── Skill Chapters ─── */
const chapters = [
  { num: "01", title: "Frontend Mastery",   text: "React, Vue, Svelte, Next.js — every UI framework mastered. Pixel-perfect designs built with Tailwind, GSAP animations, and Framer Motion make the interface come alive.", icon: <Code2 className="w-24 h-24 text-cyan-400" />,    sub: "React · Vue · Svelte" },
  { num: "02", title: "Backend Engine",     text: "Node.js, Express, FastAPI, Django. REST APIs, GraphQL, gRPC. tRPC for full type safety from server to client. Scalable micro-service architectures built to survive production.", icon: <Zap className="w-24 h-24 text-yellow-400" />,     sub: "Node · FastAPI · gRPC" },
  { num: "03", title: "Mobile Dev",         text: "React Native, Flutter, Kotlin, and Swift. Cross-platform apps that feel native on both iOS and Android. Expo-powered rapid workflows with push notifications and offline sync.", icon: <Smartphone className="w-24 h-24 text-pink-500" />, sub: "RN · Flutter · Swift" },
  { num: "04", title: "AI / LLM Arsenal",   text: "LangChain, OpenAI API, Ollama, HuggingFace, LlamaIndex. Local LLMs with RAG pipelines. Multi-agent workflows with CrewAI and AutoGen. Pinecone vector memory.", icon: <Brain className="w-24 h-24 text-purple-400" />,   sub: "LangChain · GPT-4o · Ollama" },
  { num: "05", title: "Database Layer",     text: "MongoDB, PostgreSQL, MySQL, Redis. Modern serverless databases: Supabase, Neon, PlanetScale, Firebase. Prisma ORM for type-safe queries and schema migrations.", icon: <Database className="w-24 h-24 text-emerald-400" />, sub: "Postgres · Supabase · Neon" },
  { num: "06", title: "Desktop Apps",       text: "Electron and Tauri for cross-platform desktop experiences. .NET MAUI, Qt, Wails (Go). Apps that live on your taskbar with full OS file-system access.", icon: <Monitor className="w-24 h-24 text-orange-400" />,  sub: "Electron · Tauri · MAUI" },
  { num: "07", title: "DevOps & Cloud",     text: "Docker containerisation, Kubernetes orchestration. CI/CD with GitLab CI and GitHub Actions. Cloud deployments on AWS, GCP and Vercel. Nginx reverse-proxy configurations.", icon: <Rocket className="w-24 h-24 text-blue-400" />,    sub: "Docker · K8s · AWS" },
  { num: "08", title: "IDE · CLI · SDK",    text: "VS Code extensions, JetBrains plugins. CLIs with Commander.js, Cobra (Go), Click (Python). SDKs for Stripe, AWS, Twilio — integrating everything into cohesive developer experiences.", icon: <Terminal className="w-24 h-24 text-lime-400" />,   sub: "VSCode · Commander · SDK" },
  { num: "09", title: "EXE & Distribution", text: "PyInstaller bundles Python into standalone EXE. pkg packages Node.js into binaries. Electron Forge, NSIS, AppImage, Flatpak — ship to Windows, macOS, and Linux simultaneously.", icon: <Package className="w-24 h-24 text-rose-400" />,   sub: "PyInstaller · pkg · NSIS" },
  { num: "10", title: "Languages Core",     text: "JavaScript, TypeScript, Python, Go, Rust, Java, C++, C#, Ruby, PHP, Bash, Kotlin, Swift, Dart. Each language a tool, each tool chosen deliberately for the task at hand.", icon: <HardDrive className="w-24 h-24 text-gray-400" />,  sub: "JS · Go · Rust · Python" },
  { num: "11", title: "The Full Stack",     text: "From database schema to UI animation — every layer owned. tRPC, Prisma, Turbopack, SvelteKit, Remix. Full-stack TypeScript codebases that scale from solo MVP to enterprise.", icon: <Layers className="w-24 h-24 text-cyan-300" />,    sub: "Full Stack · End-to-End" },
  { num: "12", title: "The Arsenal",        text: "80+ technologies across every domain. Not a generalist, not a specialist — an architect. Every choice deliberate, every implementation production-grade and battle-tested.", icon: <Sparkles className="w-24 h-24 text-white" />,     sub: "80+ Technologies · Ready" },
];

const techMarquee = [
  { icon: <Code2 className="w-5 h-5" />, label: "REACT / NEXT.JS" },
  { icon: <Cpu className="w-5 h-5" />, label: "NODE.JS" },
  { icon: <Database className="w-5 h-5" />, label: "SUPABASE" },
  { icon: <Brain className="w-5 h-5" />, label: "LANGCHAIN" },
  { icon: <Smartphone className="w-5 h-5" />, label: "FLUTTER" },
  { icon: <Terminal className="w-5 h-5" />, label: "OLLAMA" },
  { icon: <Package className="w-5 h-5" />, label: "DOCKER" },
  { icon: <Rocket className="w-5 h-5" />, label: "KUBERNETES" },
  { icon: <Globe className="w-5 h-5" />, label: "GRAPHQL" },
  { icon: <Sparkles className="w-5 h-5" />, label: "FRAMER MOTION" },
];

/* ─── Domain Cards ─── */
const domains = [
  { id: "mobile",   label: "Mobile Dev",       icon: <Smartphone className="w-5 h-5" />, color: "from-pink-500 to-rose-600",    items: ["React Native", "Flutter", "Kotlin", "Swift", "Dart", "Expo", "Ionic", "Capacitor"] },
  { id: "ai",       label: "AI / LLM",         icon: <Brain className="w-5 h-5" />,      color: "from-fuchsia-500 to-purple-600", items: ["LangChain", "OpenAI API", "Ollama", "HuggingFace", "LlamaIndex", "CrewAI", "AutoGen", "Pinecone"] },
  { id: "database", label: "Databases",        icon: <Database className="w-5 h-5" />,   color: "from-emerald-500 to-teal-600", items: ["MongoDB", "PostgreSQL", "Supabase", "Neon", "MySQL", "Redis", "Firebase", "PlanetScale"] },
  { id: "fullstack",label: "Full Stack",       icon: <Layers className="w-5 h-5" />,     color: "from-cyan-500 to-blue-600",    items: ["Next.js", "Nuxt.js", "SvelteKit", "Remix", "tRPC", "GraphQL", "Prisma", "Turbopack"] },
  { id: "desktop",  label: "Desktop Apps",     icon: <Monitor className="w-5 h-5" />,    color: "from-orange-500 to-amber-600", items: ["Electron", "Tauri", ".NET MAUI", "Qt Framework", "Flutter Desktop", "SwiftUI macOS", "Wails", "PyQt6"] },
  { id: "backend",  label: "Backend Advanced", icon: <Zap className="w-5 h-5" />,        color: "from-red-500 to-pink-600",     items: ["gRPC", "WebSockets", "Kafka", "RabbitMQ", "Nginx", "Hono.js", "Bun.js", "Deno"] },
  { id: "tools",    label: "IDE / CLI / SDK",  icon: <Code2 className="w-5 h-5" />,      color: "from-violet-500 to-indigo-600",items: ["VS Code Ext.", "JetBrains Plugin", "Commander.js", "Click (Python)", "Cobra (Go)", "AWS SDK", "Stripe SDK", "Twilio SDK"] },
  { id: "exe",      label: "EXE / Distribution",icon: <Package className="w-5 h-5" />,   color: "from-slate-500 to-gray-600",   items: ["PyInstaller", "pkg (Node)", "Electron Forge", "NSIS", "AppImage", "Snapcraft", "WiX Toolset", "Flatpak"] },
];

/* ─── Chapter Visual ─── */
const ChapterVisual = ({ index }) => {
  const item = chapters[index] || chapters[0];
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "backOut" }}
      className="flex flex-col items-center justify-center h-full w-full"
    >
      <div className="mb-8 p-10 bg-white/5 rounded-full border border-white/10 shadow-[0_0_60px_rgba(255,255,255,0.05)] scale-110">
        {item.icon}
      </div>
      <h3 className="text-4xl md:text-5xl font-bold mb-2 text-white uppercase tracking-tighter text-center">{item.title}</h3>
      <div className="px-3 py-1 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-xs tracking-widest uppercase rounded">
        SKILL_CORE :: {item.sub}
      </div>
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/20" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/20" />
    </motion.div>
  );
};

/* ─── Story Chapter ─── */
const SkillChapter = ({ num, title, text }) => (
  <div className="story-step min-h-[60vh] flex flex-col justify-center border-l-2 border-transparent pl-8 ml-4 transition-all duration-500">
    <div className="chapter-num text-cyan-400 font-mono text-sm mb-4 font-bold tracking-widest flex items-center gap-2">
      <span className="w-2 h-2 bg-cyan-400 rounded-full" /> DOMAIN {num}
    </div>
    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">{title}</h2>
    <p className="text-gray-400 text-lg leading-relaxed max-w-lg">{text}</p>
  </div>
);

/* ─── Keyboard Rows for the interactive 3D component ─── */
const keyboardRows = [
  // ROW 1: Numbers & Specials (14 keys)
  [
    { key: "ESC", code: "Escape", name: "Git", desc: "Distributed version control system." },
    { key: "1", code: "Digit1", name: "HTML5", desc: "Semantic markup parser engine." },
    { key: "2", code: "Digit2", name: "CSS3", desc: "Vanilla cascading layout design module." },
    { key: "3", code: "Digit3", name: "JavaScript", desc: "Dynamic script processor." },
    { key: "4", code: "Digit4", name: "TypeScript", desc: "Strict typed superset language." },
    { key: "5", code: "Digit5", name: "Python", desc: "High-level language for automation." },
    { key: "6", code: "Digit6", name: "Golang", desc: "Compiled fast concurrent backend runner." },
    { key: "7", code: "Digit7", name: "Rust", desc: "Systems language with compile safety." },
    { key: "8", code: "Digit8", name: "Java", desc: "Object-oriented backend framework core." },
    { key: "9", code: "Digit9", name: "C++", desc: "Native memory efficiency engine." },
    { key: "0", code: "Digit0", name: "C#", desc: "Microsoft core software programming platform." },
    { key: "-", code: "Minus", name: "Ruby", desc: "Dynamic object structure system." },
    { key: "=", code: "Equal", name: "PHP", desc: "Server scripting module wrapper." },
    { key: "BACK", code: "Backspace", name: "Bash", desc: "Shell terminal control engine." },
  ],
  // ROW 2: QWERTY Row (13 keys)
  [
    { key: "TAB", code: "Tab", name: "Vite", desc: "Ultra-fast frontend build engine." },
    { key: "Q", code: "KeyQ", name: "React", desc: "Virtual DOM UI component system." },
    { key: "W", code: "KeyW", name: "Vue.js", desc: "Progressive reactive framework module." },
    { key: "E", code: "KeyE", name: "Svelte", desc: "Compile-time vanilla client optimizer." },
    { key: "R", code: "KeyR", name: "Next.js", desc: "Full-stack SSR React production setup." },
    { key: "T", code: "KeyT", name: "Nuxt.js", desc: "Server-rendered Vue web application." },
    { key: "Y", code: "KeyY", name: "Angular", desc: "Robust typescript enterprise layout." },
    { key: "U", code: "KeyU", name: "Node.js", desc: "V8 engine server platform runner." },
    { key: "I", code: "KeyI", name: "Express", desc: "Minimalist routing connector." },
    { key: "O", code: "KeyO", name: "FastAPI", desc: "Python auto-documentation API framework." },
    { key: "P", code: "KeyP", name: "Django", desc: "Battery-included Python structure." },
    { key: "[", code: "BracketLeft", name: "Spring", desc: "Java microservices controller core." },
    { key: "]", code: "BracketRight", name: "Laravel", desc: "PHP MVC application architect setup." },
  ],
  // ROW 3: ASDF Row (13 keys)
  [
    { key: "CAPS", code: "CapsLock", name: "Tailwind", desc: "Utility utility-first layout builder." },
    { key: "A", code: "KeyA", name: "MongoDB", desc: "NoSQL document storage server." },
    { key: "S", code: "KeyS", name: "Postgres", desc: "Advanced SQL relational schema core." },
    { key: "D", code: "KeyD", name: "MySQL", desc: "Classic database query connector." },
    { key: "F", code: "KeyF", name: "Redis", desc: "High speed server session cache." },
    { key: "G", code: "KeyG", name: "SQLite", desc: "Serverless local database system." },
    { key: "H", code: "KeyH", name: "GraphQL", desc: "Type-safe query language adapter." },
    { key: "J", code: "KeyJ", name: "Docker", desc: "Virtual containers for code packaging." },
    { key: "K", code: "KeyK", name: "K8s", desc: "Kubernetes cloud management platform." },
    { key: "L", code: "KeyL", name: "AWS", desc: "Amazon web cloud engine." },
    { key: ";", code: "Semicolon", name: "GCP", desc: "Google cloud microservices runner." },
    { key: "'", code: "Quote", name: "Firebase", desc: "Real-time key collection store." },
    { key: "ENTER", code: "Enter", name: "GitLab CI", desc: "Pipeline automated compilation." },
  ],
  // ROW 4: ZXCV Row (12 keys)
  [
    { key: "SHIFT", code: "ShiftLeft", name: "Zustand", desc: "Atomic global state manager." },
    { key: "Z", code: "KeyZ", name: "Redux", desc: "Immutable state dispatch model." },
    { key: "X", code: "KeyX", name: "RxJS", desc: "Async stream observable processor." },
    { key: "C", code: "KeyC", name: "Webpack", desc: "Classic package build bundler." },
    { key: "V", code: "KeyV", name: "Three.js", desc: "Interactive WebGL 3D rendering." },
    { key: "B", code: "KeyB", name: "Electron", desc: "HTML/JS crossplatform window module." },
    { key: "N", code: "KeyN", name: "Tauri", desc: "Lightweight Rust shell backend." },
    { key: "M", code: "KeyM", name: "Figma", desc: "Collaborative design mapping vector." },
    { key: ",", code: "Comma", name: "Apollo", desc: "GraphQL server state fetch client." },
    { key: ".", code: "Period", name: "Prisma", desc: "Modern type-safe ORM library." },
    { key: "/", code: "Slash", name: "Postman", desc: "Route fetch verification panel." },
    { key: "S-SHIFT", code: "ShiftRight", name: "Vercel", desc: "Edge serverless cloud publisher." },
  ],
  // ROW 5: Spacebar & Modifiers (7 keys)
  [
    { key: "CTRL", code: "ControlLeft", name: "Linux", desc: "Kernel terminal system processor." },
    { key: "ALT", code: "AltLeft", name: "Jest", desc: "Automated assertion testing module." },
    { key: "SPACEBAR", code: "Space", name: "WebAssembly", desc: "High performance binary bytecodes." },
    { key: "SWIFT", code: "KeyS", name: "Swift", desc: "Native Apple programming script." },
    { key: "KOTLIN", code: "KeyK", name: "Kotlin", desc: "Native Android system runner." },
    { key: "DART", code: "KeyD", name: "Dart", desc: "Client side framework system driver." },
    { key: "FN", code: "ControlRight", name: "Sass", desc: "Pre-compiled cascading design modules." },
  ],
];

/* ─── MAIN COMPONENT ─── */
const Skills = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeDomain, setActiveDomain] = useState(null);

  // Bottom Keyboard Interactive States
  const [selectedKey, setSelectedKey] = useState(keyboardRows[1][1]); // Q - React
  const [pressedKeyCode, setPressedKeyCode] = useState(null);

  // Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP animations for the Pinned Visual and Draggable Widget
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draggable Terminal
      Draggable.create(".draggable-skills-code", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });

      // Pin the Skill Visual
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pinned-skill-visual",
        scrub: 1,
      });

      // Animate Text Steps
      gsap.utils.toArray(".story-step").forEach((step, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play reverse play reverse",
            onEnter: () => setActiveChapter(index),
            onEnterBack: () => setActiveChapter(index),
          },
        });
        tl.fromTo(
          step,
          { opacity: 0.5, x: -30, filter: "blur(4px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.5 }
        ).to(
          step.querySelector(".chapter-num"),
          { x: 10, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Key Event Listeners for the Bottom Keyboard Component
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if key exists in keyboard rows
      for (const row of keyboardRows) {
        const found = row.find((k) => k.code === e.code);
        if (found) {
          setPressedKeyCode(e.code);
          setSelectedKey(found);
          break;
        }
      }
    };

    const handleKeyUp = () => {
      setPressedKeyCode(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050712] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative"
    >
      <Header />

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(34,211,238,0.07),_transparent_34%),radial-gradient(circle_at_78%_22%,_rgba(168,85,247,0.06),_transparent_34%)]" />

      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden border-b border-white/10 perspective-1000 bg-[#050712]"
      >
        {/* Glow Orb */}
        <motion.div
          className="absolute z-0 w-200 h-200 bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none mix-blend-screen"
          animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
        />

        {/* Hero Text */}
        <div className="relative z-10 text-center px-6 pointer-events-none">
          <motion.div
            animate={{
              x: mousePos.x * 10,
              y: mousePos.y * 10,
              rotateX: mousePos.y * -5,
              rotateY: mousePos.x * 5,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Cpu className="w-3 h-3" />
              <span>80+ PROFICIENCIES • THE FULL ARSENAL</span>
            </div>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-6 leading-[0.9] text-white drop-shadow-2xl">
              THE SKILL<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                ARSENAL.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every tool is{" "}
              <span className="text-white font-bold border-b border-cyan-400">
                chosen deliberately
              </span>{" "}
              — languages, frameworks, databases, AI and deployment systems working as one.
            </p>
          </motion.div>
        </div>

        {/* Draggable Terminal */}
        <div className="draggable-skills-code absolute z-20 top-[18%] right-[8%] cursor-grab active:cursor-grabbing hidden md:block">
          <div className="w-80 md:w-[360px] bg-[#0b1020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-300 hover:border-cyan-500/50">
            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                <GripHorizontal className="w-3 h-3" /> rahbear_skills.ts
              </div>
            </div>
            <div className="p-4 font-mono text-xs text-gray-400 leading-relaxed pointer-events-none select-none">
              <p>
                <span className="text-purple-400">import</span>{" "}
                {"{ Skills }"}{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'@rahbear/arsenal'</span>;
              </p>
              <br />
              <p>
                <span className="text-blue-400">const</span> dev ={" "}
                <span className="text-yellow-300">new</span> Skills();
              </p>
              <br />
              <p>
                <span className="text-blue-400">await</span> dev
                <span className="text-cyan-400">.build</span>({"{"}
              </p>
              <p className="pl-4">
                stack: <span className="text-green-400">"full"</span>,
              </p>
              <p className="pl-4">
                domains: <span className="text-yellow-300">80</span>+,
              </p>
              <p>{"}"});</p>
              <br />
              <p className="text-cyan-400 animate-pulse">{"> System Ready..."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH MARQUEE ─── */}
      <section className="py-10 border-b border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-4 text-center text-xs font-mono text-gray-500 uppercase tracking-widest">
          Core Technologies & Tooling Arsenal
        </div>
        <div className="flex gap-10 justify-center items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap px-6">
          {techMarquee.map((t, i) => (
            <span key={i} className="text-base font-bold flex items-center gap-2">
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </section>

      {/* ─── PINNED SKILL CHAPTERS ─── */}
      <section ref={triggerRef} className="relative w-full bg-[#050712]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* LEFT: Scrolling chapters */}
          <div className="md:w-1/2 py-32 px-6 pb-[50vh]">
            {chapters.map((ch) => (
              <SkillChapter key={ch.num} num={ch.num} title={ch.title} text={ch.text} />
            ))}
          </div>

          {/* RIGHT: Pinned visual */}
          <div className="hidden md:flex md:w-1/2 h-screen pinned-skill-visual sticky top-0 items-center justify-center p-12">
            <div className="relative w-full h-96 bg-[#0b1020]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Grid inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

              <AnimatePresence mode="wait">
                <ChapterVisual index={activeChapter} />
              </AnimatePresence>

              {/* Progress bar */}
              <div className="absolute bottom-10 left-12 right-12 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400"
                  animate={{ width: `${((activeChapter + 1) / chapters.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOMAIN EXPLORER ─── */}
      <section className="py-24 bg-[#050712] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <Cpu className="w-3 h-3 animate-pulse" /> DOMAIN EXPLORER
            </div>
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-4">
              BROWSE THE{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ARSENAL.
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">Click any domain to see the full technology lineup.</p>
          </div>

          {/* Domain Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDomain(activeDomain === d.id ? null : d.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeDomain === d.id
                    ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
                    : "bg-white/[0.03] border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-white"
                }`}
              >
                {d.icon} {d.label}
              </button>
            ))}
          </div>

          {/* Domain Panel */}
          <AnimatePresence>
            {activeDomain && (() => {
              const domain = domains.find((d) => d.id === activeDomain);
              if (!domain) return null;
              return (
                <motion.div
                  key={activeDomain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`p-[2px] rounded-2xl bg-gradient-to-r ${domain.color}`}>
                    <div className="bg-[#050712] rounded-[14px] p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${domain.color} text-white`}>{domain.icon}</div>
                        <h3 className="font-black text-2xl text-white">{domain.label}</h3>
                        <span className="text-slate-500 text-sm font-mono">{domain.items.length} technologies</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {domain.items.map((item, i) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/[0.03] border border-white/5 hover:border-cyan-500/20 rounded-xl p-4 transition-all duration-200"
                          >
                            <h4 className="font-black text-white text-sm">{item}</h4>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {!activeDomain && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {domains.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDomain(d.id)}
                  className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-all duration-200 text-left group"
                >
                  <div className={`mb-3 p-2 rounded-lg bg-gradient-to-r ${d.color} text-white inline-flex`}>{d.icon}</div>
                  <div className="font-black text-white text-sm group-hover:text-cyan-300 transition-colors">{d.label}</div>
                  <div className="text-slate-500 text-xs mt-1">{d.items.length} tools</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── 3D KEYBOARD SECTION ABOVE FOOTER ─── */}
      <section className="py-20 bg-[#050712] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6">
              <Zap className="w-3 h-3 text-yellow-400" /> INTERACTIVE HARDWARE ENGINE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              THE MECHANICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">KEYBOARD.</span>
            </h2>
            <p className="text-slate-500 text-sm mt-3">Click on virtual keys or use your physical keyboard to display module logs.</p>
          </div>

          {/* Mini-Console / Monitor for the Keyboard */}
          <div className="max-w-3xl mx-auto mb-10 bg-[#0b1020] border border-white/10 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none" />
            <div className="relative font-mono text-xs text-cyan-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">Active Module</span>
                <span className="text-white text-lg font-black">{selectedKey.name}</span>
              </div>
              <div className="flex-1 sm:max-w-md">
                <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">Functional Description</span>
                <span className="text-slate-300 text-xs mt-0.5 block">{selectedKey.desc}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-600 font-bold uppercase tracking-wider text-[10px] block">Keycode</span>
                <span className="text-cyan-300 text-sm font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded inline-block mt-0.5">{selectedKey.key}</span>
              </div>
            </div>
          </div>

          {/* 3D Mechanical Keyboard Grid */}
          <div className="overflow-x-auto pb-4">
            <div
              className="min-w-[860px] bg-[#0c0f1d] border-4 border-[#1e293b] rounded-2xl p-4 mx-auto relative shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_4px_12px_rgba(255,255,255,0.04)]"
              style={{ transform: "rotateX(14deg) rotateY(-2deg)", transformStyle: "preserve-3d" }}
            >
              <div className="space-y-2">
                {keyboardRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex justify-center gap-1.5">
                    {row.map((keycap, kIdx) => {
                      const isActive = selectedKey.name === keycap.name;
                      const isPressed = pressedKeyCode === keycap.code;

                      // Dynamic width helper based on key labels
                      let kw = "w-10";
                      if (keycap.key === "SPACEBAR") kw = "w-64";
                      else if (["BACK", "ENTER", "SHIFT", "S-SHIFT"].includes(keycap.key)) kw = "w-20";
                      else if (["TAB", "CAPS", "CTRL", "ALT", "ALT GR", "WIN", "FN"].includes(keycap.key)) kw = "w-14";

                      return (
                        <button
                          key={kIdx}
                          onClick={() => setSelectedKey(keycap)}
                          title={`${keycap.key}: ${keycap.name}`}
                          className={`h-10 ${kw} rounded-lg text-[8px] font-black font-mono flex flex-col justify-between p-1 transition-all cursor-pointer select-none active:translate-y-1 active:shadow-[0_1px_0_#0f172a,0_2px_4px_rgba(0,0,0,0.5)] ${
                            isPressed || isActive
                              ? "bg-cyan-500 text-black translate-y-[3px] shadow-[0_1px_0_#0f172a]"
                              : "bg-[#181d30] text-slate-400 shadow-[0_4px_0_#090b16,0_8px_10px_rgba(0,0,0,0.5)] border-t border-white/5 hover:bg-[#1f253d] hover:text-white"
                          }`}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="self-start text-[7px] opacity-40">{keycap.key}</div>
                          <div className="self-end font-bold text-[8px] overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                            {keycap.name.split(" ")[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;
