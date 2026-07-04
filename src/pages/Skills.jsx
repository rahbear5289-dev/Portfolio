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

/* ─── Animated Skill Cards ─── */
const animatedSkills = [
  { name: "React", tag: "UI", desc: "Interactive interfaces and component architecture.", icon: <Code2 className="w-5 h-5" />, accent: "from-cyan-500 to-blue-500" },
  { name: "Next.js", tag: "Full Stack", desc: "SSR, routing, and production-ready app flows.", icon: <Globe className="w-5 h-5" />, accent: "from-slate-500 to-zinc-600" },
  { name: "Tailwind", tag: "Styling", desc: "Rapid, modern, responsive design systems.", icon: <Layers className="w-5 h-5" />, accent: "from-sky-500 to-cyan-500" },
  { name: "Framer Motion", tag: "Animation", desc: "Liquid motion, transitions, and polished interactions.", icon: <Sparkles className="w-5 h-5" />, accent: "from-fuchsia-500 to-purple-500" },
  { name: "GSAP", tag: "Animation", desc: "Timeline-driven scroll and canvas effects.", icon: <Zap className="w-5 h-5" />, accent: "from-amber-500 to-orange-500" },
  { name: "JavaScript", tag: "Core", desc: "Modern logic, async flows, and browser APIs.", icon: <Cpu className="w-5 h-5" />, accent: "from-yellow-500 to-amber-500" },
  { name: "TypeScript", tag: "Core", desc: "Strong typing for safer, scalable products.", icon: <Terminal className="w-5 h-5" />, accent: "from-blue-500 to-indigo-500" },
  { name: "Node.js", tag: "Backend", desc: "Fast server-side JavaScript experiences.", icon: <HardDrive className="w-5 h-5" />, accent: "from-emerald-500 to-green-500" },
  { name: "Express", tag: "Backend", desc: "Flexible API routing and middleware design.", icon: <Monitor className="w-5 h-5" />, accent: "from-rose-500 to-pink-500" },
  { name: "MongoDB", tag: "Database", desc: "Flexible document storage for modern apps.", icon: <Database className="w-5 h-5" />, accent: "from-green-500 to-lime-500" },
  { name: "PostgreSQL", tag: "Database", desc: "Relational data with high reliability.", icon: <Database className="w-5 h-5" />, accent: "from-cyan-600 to-blue-700" },
  { name: "Git & GitHub", tag: "Workflow", desc: "Version control and team collaboration.", icon: <Rocket className="w-5 h-5" />, accent: "from-slate-500 to-gray-600" },
  { name: "Docker", tag: "DevOps", desc: "Portable containers for consistent deployment.", icon: <Package className="w-5 h-5" />, accent: "from-sky-500 to-indigo-500" },
  { name: "Vercel", tag: "Deploy", desc: "Smooth deployment for frontend and full-stack apps.", icon: <Globe className="w-5 h-5" />, accent: "from-teal-500 to-cyan-500" },
  { name: "Figma", tag: "Design", desc: "UI wireframes and polished user journeys.", icon: <Sparkles className="w-5 h-5" />, accent: "from-pink-500 to-rose-500" },
  { name: "Python", tag: "Automation", desc: "Scripts, APIs, and intelligent tooling.", icon: <Brain className="w-5 h-5" />, accent: "from-violet-500 to-purple-500" },
  { name: "AI / LLM", tag: "Innovation", desc: "Modern assistants, prompts, and smart workflows.", icon: <Brain className="w-5 h-5" />, accent: "from-fuchsia-500 to-violet-500" },
  { name: "REST APIs", tag: "Integration", desc: "Connected services and reliable data exchange.", icon: <Terminal className="w-5 h-5" />, accent: "from-orange-500 to-amber-500" },
  { name: "Supabase", tag: "Backend", desc: "Open-source backend with auth and storage.", icon: <Database className="w-5 h-5" />, accent: "from-emerald-500 to-teal-500" },
  { name: "UI/UX", tag: "Experience", desc: "User-centered design with clarity and impact.", icon: <Layers className="w-5 h-5" />, accent: "from-cyan-400 to-fuchsia-500" },
];

/* ─── MAIN COMPONENT ─── */
const Skills = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeDomain, setActiveDomain] = useState(null);

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

      {/* ─── ANIMATED SKILLS SECTION ABOVE FOOTER ─── */}
      <section className="py-20 bg-[#050712] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-mono mb-6">
              <Zap className="w-3 h-3 text-yellow-400" /> ANIMATED SKILL MATRIX
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              20 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">SKILLS</span> IN MOTION.
            </h2>
            <p className="text-slate-500 text-sm mt-3">A modern stack of tools, frameworks, and workflows crafted for fast, polished product delivery.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {animatedSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.04, duration: 0.35 }}
                whileHover={{ scale: 1.03, y: -6, rotate: -1 }}
                animate={{ y: [0, -6, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 0.4, delay: index * 0.15, ease: "easeInOut" }}
                className={`p-[1px] rounded-2xl bg-gradient-to-br ${skill.accent} shadow-[0_10px_40px_rgba(0,0,0,0.2)]`}
              >
                <div className="bg-[#050712] rounded-[15px] p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-white/10 text-white">{skill.icon}</div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">{skill.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;
