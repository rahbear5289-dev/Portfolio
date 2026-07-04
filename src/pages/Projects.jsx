import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Terminal, Sparkles, Filter, Code, Cpu, GripHorizontal } from 'lucide-react';
import Footer from '../Components/Footer';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = ['All', 'Full Stack', 'Frontend', '3D / WebGL'];

  const projectsData = [
    {
      id: 1,
      title: 'NeonNexus Hub',
      category: 'Full Stack',
      description: 'A premium cybersecurity dashboard built with Next.js, Node.js, and MongoDB. Tracks real-time traffic statistics with WebSockets.',
      tech: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-blue-600 via-indigo-950 to-purple-600'
    },
    {
      id: 2,
      title: 'Solana Matrix Engine',
      category: '3D / WebGL',
      description: 'A decentralized finance trading visualizer showing blocks in real-time in a 3D matrix. Powered by Three.js and Framer Motion.',
      tech: ['Three.js', 'TypeScript', 'Web3', 'Framer Motion'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-purple-600 via-pink-950 to-red-600'
    },
    {
      id: 3,
      title: 'E-commerce Cyberpunk Store',
      category: 'Full Stack',
      description: 'Futuristic apparel marketplace with responsive interactive checkout flow, cart persistence, and Stripe payment gateway.',
      tech: ['React', 'Express', 'Tailwind CSS', 'Stripe'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-cyan-500 via-slate-900 to-blue-800'
    },
    {
      id: 4,
      title: 'Hyperion UI Kit',
      category: 'Frontend',
      description: 'Apple + Framer style design system library. Contains dark glassmorphic components, custom hover micro-interactions, and pre-built code blocks.',
      tech: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-emerald-500 via-teal-955 to-indigo-950'
    },
    {
      id: 5,
      title: 'Interactive 3D Planetarium',
      category: '3D / WebGL',
      description: 'WebGL-driven orbital solar system explorer with realistic texture mapping, orbital physics simulation, and custom shader atmosphere.',
      tech: ['React Three Fiber', 'Three.js', 'GSAP', 'CSS Shaders'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-orange-500 via-rose-950 to-purple-800'
    },
    {
      id: 6,
      title: 'Terminal.io Code Sandbox',
      category: 'Frontend',
      description: 'A browser-based code visualizer and terminal emulator. Translates abstract code structures into tree diagrams dynamically.',
      tech: ['HTML', 'CSS', 'JavaScript', 'D3.js'],
      demoLink: '#',
      gitLink: '#',
      imageGradient: 'from-sky-500 via-blue-955 to-fuchsia-955'
    }
  ];

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Draggable Console
  useEffect(() => {
    const ctx = gsap.context(() => {
      Draggable.create(".draggable-projects-console", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050712] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative pt-24"
    >
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(34,211,238,0.07),_transparent_34%),radial-gradient(circle_at_78%_22%,_rgba(168,85,247,0.06),_transparent_34%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* --- HERO SECTION --- */}
        <section
          ref={heroRef}
          className="relative h-[65vh] flex flex-col justify-center items-center overflow-hidden rounded-3xl border border-white/5 bg-[#080b18]/40 mb-20 px-6"
        >
          <motion.div
            className="absolute z-0 w-150 h-150 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
            animate={{ x: mousePos.x * 25, y: mousePos.y * 25 }}
          />

          <div className="relative z-10 text-center pointer-events-none">
            <motion.div
              animate={{
                x: mousePos.x * 8,
                y: mousePos.y * 8,
                rotateX: mousePos.y * -4,
                rotateY: mousePos.x * 4,
              }}
            >
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Premium Engineering Showcase</span>
              </div>

              <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                MY CREATIONS.
              </h1>
              <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                A selection of high-end software solutions, visual tools, and custom backend engines.
              </p>
            </motion.div>
          </div>

          {/* Draggable Log Terminal */}
          <div className="draggable-projects-console absolute z-20 top-[15%] right-[5%] cursor-grab active:cursor-grabbing hidden md:block">
            <div className="w-80 bg-[#0b1020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-300/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[9px] font-mono text-slate-500">git_status.log</span>
              </div>
              <div className="p-4 font-mono text-[10px] text-slate-400 space-y-1">
                <p><span className="text-cyan-400">&gt;</span> git status</p>
                <p>On branch production</p>
                <p>Your branch is up to date.</p>
                <p className="text-cyan-400 animate-pulse">&gt; 6 modules deployed ✓</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Categories Filter --- */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_24px_rgba(34,211,238,0.35)]'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Projects Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0c0f1d] border border-[#1e293b] hover:border-cyan-500/40 rounded-2xl p-5 shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Decorative Project Header */}
                  <div className={`h-40 rounded-xl bg-gradient-to-br ${project.imageGradient} p-4 flex flex-col justify-between relative overflow-hidden mb-5 border border-white/5`}>
                    <div className="absolute inset-0 bg-size-[20px_20px] bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]" />
                    <div className="flex justify-between items-center relative z-10">
                      <span className="px-2 py-0.5 bg-black/40 border border-white/10 rounded text-[9px] font-black uppercase tracking-wider text-slate-200">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <a href={project.gitLink} className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 text-white transition-colors">
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        <a href={project.demoLink} className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full border border-white/10 text-white transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white tracking-wide">{project.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6">{project.description}</p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 text-[9px] font-mono text-slate-300 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Projects;
