import React, { useState, useEffect, useRef } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Cpu, GripHorizontal } from 'lucide-react';
import Footer from '../Components/Footer';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

const Login = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Draggable console widget
  useEffect(() => {
    const ctx = gsap.context(() => {
      Draggable.create(".draggable-login-console", {
        bounds: heroRef.current,
        inertia: true,
        edgeResistance: 0.65,
        type: "x,y",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050712] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative pt-24 flex flex-col justify-between"
    >
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(34,211,238,0.07),_transparent_34%),radial-gradient(circle_at_78%_22%,_rgba(168,85,247,0.06),_transparent_34%)]" />

      <div ref={heroRef} className="max-w-7xl mx-auto px-6 relative z-10 w-full flex-1 flex flex-col items-center justify-center py-10">
        
        {/* Glow Orb */}
        <motion.div
          className="absolute z-0 w-120 h-120 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen"
          animate={{ x: mousePos.x * 20, y: mousePos.y * 20 }}
        />

        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full justify-center">
          
          {/* Draggable Terminal Panel */}
          <div className="draggable-login-console cursor-grab active:cursor-grabbing hidden lg:block w-[340px]">
            <div className="bg-[#0b1020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400/80" />
                  <span className="w-2 h-2 rounded-full bg-yellow-300/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[9px] font-mono text-slate-500">auth_gate.sh</span>
              </div>
              <div className="p-4 font-mono text-[10px] text-slate-400 space-y-1">
                <p><span className="text-cyan-400">&gt;</span> ./auth_gate.sh --init</p>
                <p>Loading Clerk authentication client...</p>
                <p>Verifying secure session tokens...</p>
                <p className="text-cyan-400 animate-pulse">&gt; secure portal online</p>
              </div>
            </div>
          </div>

          {/* Clerk Login Container */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>SECURED GATEWAY</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white uppercase">Access Terminal</h2>
            </div>
            
            <div className="bg-[#0c0f1d] border border-[#1e293b] p-2 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] overflow-hidden">
              <SignIn routing="path" path="/login" signUpUrl="/login" />
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Login;
