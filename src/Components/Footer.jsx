import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Globe, Briefcase, User } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#050712] border-t border-white/5 pt-20 pb-8 relative z-20 overflow-hidden">
      
      {/* ─── HUGE OUTLINE TYPOGRAPHY BANNER ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-16 relative group select-none">
        {/* Hover Radial Light source */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[100px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-600/0 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <h2 
          className="text-[clamp(3.2rem,12vw,9.5rem)] font-black tracking-[0.2em] text-center text-transparent transition-all duration-1000 ease-out cursor-default uppercase font-sans
            [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] 
            group-hover:[-webkit-text-stroke:1px_rgba(34,211,238,0.7)] 
            group-hover:drop-shadow-[0_0_35px_rgba(34,211,238,0.45)]"
        >
          RAHBEAR
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
        {/* Left Column: Brand details */}
        <div className="md:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2 font-black text-white tracking-widest text-lg">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>
              <span className="text-cyan-400">RAH</span>BEAR
            </span>
          </Link>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            I craft premium digital experiences using modern frameworks and cutting-edge design concepts.
          </p>
          <div className="flex gap-3 pt-2">
            {[
              { icon: <Globe className="w-4 h-4" />, href: "#" },
              { icon: <Briefcase className="w-4 h-4" />, href: "/projects" },
              { icon: <User className="w-4 h-4" />, href: "/about" }
            ].map((item, idx) => (
              <a 
                key={idx} 
                href={item.href}
                className="p-2.5 rounded-full bg-white/[0.02] border border-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Column 1: Navigation Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Links</h4>
          <ul className="space-y-2.5 text-xs font-mono text-slate-500">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link></li>
            <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Projects</Link></li>
            <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
          </ul>
        </div>

        {/* Middle Column 2: Status/Location */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Connect</h4>
          <ul className="space-y-2.5 text-xs font-mono text-slate-500">
            <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Get in Touch</Link></li>
            <li className="text-slate-600 flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600">
        <p>&copy; {new Date().getFullYear()} RAHBEAR. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:text-cyan-400 transition-colors">PRIVACY POLICY</a>
          <a href="#terms" className="hover:text-cyan-400 transition-colors">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
