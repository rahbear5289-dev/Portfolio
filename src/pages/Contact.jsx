import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Linkedin, Github, Twitter, Facebook, Cpu, GripHorizontal } from 'lucide-react';
import Footer from '../Components/Footer';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

const Contact = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const faqs = [
        { q: "What is your typical turnaround time?", a: "For standard websites, it takes about 1-2 weeks. Complex apps may take 4+ weeks." },
        { q: "Do you offer maintenance?", a: "Yes! I offer monthly maintenance packages to keep your site secure and updated." },
        { q: "What is your pricing model?", a: "I usually charge per project, but I am open to hourly rates for consulting." },
    ];

    // Mouse movement handler
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Draggable terminal logger
    useEffect(() => {
        const ctx = gsap.context(() => {
            Draggable.create(".draggable-contact-console", {
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
            className="min-h-screen bg-[#050712] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden relative pt-24"
        >
            {/* Background Glow */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,_rgba(34,211,238,0.07),_transparent_34%),radial-gradient(circle_at_78%_22%,_rgba(168,85,247,0.06),_transparent_34%)]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HERO SECTION --- */}
                <section
                    ref={heroRef}
                    className="relative h-[55vh] flex flex-col justify-center items-center overflow-hidden rounded-3xl border border-white/5 bg-[#080b18]/40 mb-20 px-6"
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
                                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                                <span>Direct Communication Link</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                                GET IN <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">TOUCH.</span>
                            </h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                                Let's build something exceptional. Get in touch to schedule an architecture design session.
                            </p>
                        </motion.div>
                    </div>

                    {/* Draggable Terminal Panel */}
                    <div className="draggable-contact-console absolute z-20 top-[15%] right-[5%] cursor-grab active:cursor-grabbing hidden md:block">
                        <div className="w-80 bg-[#0b1020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-3 hover:rotate-0 transition-transform">
                            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-400/80" />
                                    <span className="w-2 h-2 rounded-full bg-yellow-300/80" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                                </div>
                                <span className="text-[9px] font-mono text-slate-500">mail_server.log</span>
                            </div>
                            <div className="p-4 font-mono text-[10px] text-slate-400 space-y-1">
                                <p><span className="text-cyan-400">&gt;</span> connect mail_agent...</p>
                                <p><span className="text-cyan-400">&gt;</span> port: 465 (secured)</p>
                                <p><span className="text-cyan-400">&gt;</span> status: awaiting message</p>
                                <p className="text-cyan-400 animate-pulse">&gt; ready</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col md:flex-row gap-12 mb-24">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/3 space-y-6"
                    >
                        <h2 className="text-2xl font-black text-white tracking-tight">Channel Logs</h2>
                        <p className="text-slate-400 text-xs leading-relaxed">
                            Have a project outline, product spec sheet, or just an initial idea? Ping me directly.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-4 bg-[#0c0f1d] border border-[#1e293b] p-4 rounded-xl">
                                <div className="w-10 h-10 bg-[#181d30] border border-white/5 rounded-lg flex items-center justify-center text-cyan-400">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</h3>
                                    <p className="text-white text-xs font-mono font-bold">+1 234 567 890</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-[#0c0f1d] border border-[#1e293b] p-4 rounded-xl">
                                <div className="w-10 h-10 bg-[#181d30] border border-white/5 rounded-lg flex items-center justify-center text-cyan-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</h3>
                                    <p className="text-white text-xs font-mono font-bold">hello@rahbear.dev</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-[#0c0f1d] border border-[#1e293b] p-4 rounded-xl">
                                <div className="w-10 h-10 bg-[#181d30] border border-white/5 rounded-lg flex items-center justify-center text-cyan-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</h3>
                                    <p className="text-white text-xs font-bold">New York, USA</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-6 border-t border-[#1e293b]">
                            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider mb-4">Direct Socials</h3>
                            <div className="flex space-x-3">
                                <div className="p-2.5 bg-[#0c0f1d] border border-[#1e293b] rounded-lg hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"><Linkedin className="w-4 h-4" /></div>
                                <div className="p-2.5 bg-[#0c0f1d] border border-[#1e293b] rounded-lg hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"><Github className="w-4 h-4" /></div>
                                <div className="p-2.5 bg-[#0c0f1d] border border-[#1e293b] rounded-lg hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"><Twitter className="w-4 h-4" /></div>
                                <div className="p-2.5 bg-[#0c0f1d] border border-[#1e293b] rounded-lg hover:bg-cyan-500 hover:text-black transition-colors cursor-pointer"><Facebook className="w-4 h-4" /></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="md:w-2/3"
                    >
                        <form className="bg-[#0c0f1d] border border-[#1e293b] p-6 rounded-2xl shadow-xl space-y-5 relative">
                            <div className="absolute inset-0 bg-cyan-500/5 blur-2xl pointer-events-none" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-[#050712] border border-[#1e293b] rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all text-xs text-white placeholder:text-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-[#050712] border border-[#1e293b] rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all text-xs text-white placeholder:text-slate-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 relative z-10">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Brief outline of your project..."
                                    className="w-full bg-[#050712] border border-[#1e293b] rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-all text-xs text-white placeholder:text-slate-700"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.2)] relative z-10"
                            >
                                <Send className="w-3.5 h-3.5" /> Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Contact;