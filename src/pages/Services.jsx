import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, Smartphone, Database, Layout, Shield, Search, Zap, CheckCircle, Cpu, GripHorizontal } from 'lucide-react';
import { useRazorpay } from 'react-razorpay';
import { toast } from 'react-toastify';
import Footer from '../Components/Footer';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';

if (typeof window !== "undefined") {
    gsap.registerPlugin(Draggable);
}

const Services = () => {
    const { Razorpay, isLoading } = useRazorpay();
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedService, setSelectedService] = useState(null);

    // Mouse movement handler for interactive parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // GSAP Draggable logic for console
    useEffect(() => {
        const ctx = gsap.context(() => {
            Draggable.create(".draggable-service-console", {
                bounds: heroRef.current,
                inertia: true,
                edgeResistance: 0.65,
                type: "x,y",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handlePayment = (plan) => {
        const RazorpayConstructor = Razorpay || window.Razorpay;

        if (!RazorpayConstructor) {
            if (isLoading) {
                toast.info("Payment system is loading, please wait...");
                return;
            }
            toast.error("Failed to load payment system. Please refresh the page.");
            return;
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_1234567890";

        if (razorpayKey === "rzp_test_1234567890") {
            toast.error("CONFIGURATION ERROR: You are using a dummy Razorpay Key.");
            toast.warn("Please update .env with your real Key ID from Razorpay Dashboard.", { autoClose: 8000 });
            return;
        }

        const options = {
            key: razorpayKey,
            amount: Math.round(plan.conversionPrice * 100),
            currency: "INR",
            name: "Rahbear Portfolio",
            description: `Payment for ${plan.title} Plan`,
            handler: function (response) {
                toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: "Rahbear User",
                email: "user@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#22d3ee",
            },
            modal: {
                ondismiss: function () {
                    toast.info("Payment cancelled.");
                }
            }
        };

        try {
            const rzp1 = new RazorpayConstructor(options);
            rzp1.on("payment.failed", function (response) {
                toast.error(`Payment Failed: ${response.error.description || "Something went wrong"}`);
            });
            rzp1.open();
        } catch (err) {
            toast.error("Failed to open payment modal. Please check your network connection.");
        }
    };

    const services = [
        { icon: <Layout className="w-8 h-8 text-cyan-400" />, title: "Frontend Development", desc: "Pixel-perfect, ultra-responsive interactive UI creation using React, TailwindCSS and custom GSAP/Framer Motion timelines.", details: "Custom animations, interactive components, performance tuning, semantic HTML structures, state management integration." },
        { icon: <Server className="w-8 h-8 text-fuchsia-400" />, title: "Backend Systems", desc: "Robust, secure APIs and modular microservice logic built on Node.js, Express, FastAPI and scalable web architecture.", details: "WebSockets, secure sessions, JWT authorization, tRPC type-safe interfaces, custom serverless integrations." },
        { icon: <Database className="w-8 h-8 text-emerald-400" />, title: "Database Design", desc: "Optimized relational and document store schemas utilizing PostgreSQL, Neon serverless DB and MongoDB systems.", details: "Schema design, aggregation queries, Prisma ORM connector mapping, speed optimization, and data caching." },
        { icon: <Smartphone className="w-8 h-8 text-pink-400" />, title: "Mobile Apps", desc: "Native cross-platform applications constructed on React Native, Expo CLI and Flutter SDK workflows.", details: "Push notifications, local persistence SQLite stores, device hardware integrations, dynamic UI matching." },
        { icon: <Shield className="w-8 h-8 text-purple-400" />, title: "Authentication", desc: "Ironclad client-server auth systems using Clerk providers, Firebase security parameters, and OAuth options.", details: "Multi-factor authentication (MFA), secure cookies, token expiration validation, secure profile storage." },
        { icon: <Globe className="w-8 h-8 text-lime-400" />, title: "SEO Optimization", desc: "Dynamic structural auditing, speed improvements, search console integration to boost ranking positions.", details: "Schema tags, OpenGraph validation, static site generation (SSG) with Next.js, and core web vitals optimization." },
    ];

    const process = [
        { step: "01", title: "Discovery", desc: "Defining project objectives, technical scope, and user flows." },
        { step: "02", title: "Design", desc: "Wireframing custom components and interface interaction systems." },
        { step: "03", title: "Development", desc: "Writing modular clean code with zero TypeScript/JS runtime compile issues." },
        { step: "04", title: "Launch", desc: "Automated pipelines deploying components to Vercel/AWS staging shells." },
    ];

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
                                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                                <span>Production-Grade Architecture</span>
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none">
                                DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">SERVICES.</span>
                            </h1>
                            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                                Custom engineering solutions designed for absolute visual excellence and high performance.
                            </p>
                        </motion.div>
                    </div>

                    {/* Draggable Info Terminal */}
                    <div className="draggable-service-console absolute z-20 top-[15%] right-[5%] cursor-grab active:cursor-grabbing hidden md:block">
                        <div className="w-80 bg-[#0b1020]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden transform rotate-2 hover:rotate-0 transition-transform">
                            <div className="h-8 bg-white/5 border-b border-white/5 flex items-center justify-between px-3 cursor-grab">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-400/80" />
                                    <span className="w-2 h-2 rounded-full bg-yellow-300/80" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                                </div>
                                <span className="text-[9px] font-mono text-slate-500">sys_shell.log</span>
                            </div>
                            <div className="p-4 font-mono text-[10px] text-slate-400 space-y-1">
                                <p><span className="text-cyan-400">&gt;</span> init services_pipeline...</p>
                                <p><span className="text-cyan-400">&gt;</span> active plan: standard_prod</p>
                                <p><span className="text-cyan-400">&gt;</span> deployment: Vercel Edge Server</p>
                                <p className="text-cyan-400 animate-pulse">&gt; system active</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- Services Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            onClick={() => setSelectedService(service)}
                            className="bg-[#0c0f1d] p-6 rounded-2xl border border-[#1e293b] hover:border-cyan-500/40 shadow-xl transition-all cursor-pointer group hover:bg-[#11162b]"
                        >
                            <div className="bg-[#181d30] w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/5 group-hover:scale-105 transition-all">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-4">{service.desc}</p>
                            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 group-hover:underline">
                                READ CORE SPECS &gt;
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Spec Modal */}
                <AnimatePresence>
                    {selectedService && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050712]/80 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="w-full max-w-lg bg-[#0d111e] border border-white/10 rounded-2xl p-6 relative shadow-2xl"
                            >
                                <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-[#181d30] rounded-lg border border-white/5">
                                            {selectedService.icon}
                                        </div>
                                        <h4 className="font-bold text-white">{selectedService.title}</h4>
                                    </div>
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="text-slate-500 hover:text-white font-bold font-mono text-sm px-2 py-1 rounded bg-white/5"
                                    >
                                        ESC
                                    </button>
                                </div>
                                <p className="text-slate-300 text-xs leading-relaxed mb-4">{selectedService.desc}</p>
                                <div className="bg-[#050712] border border-white/5 p-4 rounded-xl font-mono text-[10px] text-cyan-400 space-y-1">
                                    <span className="text-slate-500 font-bold block mb-1 uppercase tracking-wider text-[9px]">Included Specs:</span>
                                    {selectedService.details.split(",").map((detail, idx) => (
                                        <p key={idx}><span className="text-slate-600 mr-2 select-none">{String(idx + 1).padStart(2, "0")}</span> {detail.trim()}</p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- Workflow Section --- */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black mb-3 text-white tracking-tighter">
                            DEVELOPMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">WORKFLOW.</span>
                        </h2>
                        <p className="text-slate-500 text-sm">A highly coordinated multi-agent execution pipeline.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {process.map((item, idx) => (
                            <div key={idx} className="relative p-5 bg-[#0c0f1d] rounded-2xl border border-[#1e293b] hover:border-cyan-500/20 transition-all group">
                                <div className="text-5xl font-black text-slate-800 absolute top-2 right-4 select-none group-hover:text-cyan-500/10 transition-colors">{item.step}</div>
                                <div className="relative z-10 pt-4">
                                    <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Pricing Packages --- */}
                <div className="mb-24">
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-white tracking-tighter">
                        FLEXIBLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PRICING plans.</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Starter", price: "$999", conversionPrice: 80000, features: ["5 Page Website", "Mobile Responsive", "Contact Form", "Basic SEO"], color: "border-slate-800" },
                            { title: "Business", price: "$2499", conversionPrice: 200000, features: ["10 Page Website", "CMS Integration", "Analytics Setup", "Speed Optimization", "1 Month Support"], color: "border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.15)]", popular: true },
                            { title: "Enterprise", price: "Custom", conversionPrice: 500000, features: ["Full Web App", "Database Integration", "User Auth", "Custom API", "Priority Support"], color: "border-slate-800" }
                        ].map((plan, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className={`bg-[#0c0f1d] p-6 rounded-2xl border ${plan.color} relative flex flex-col justify-between`}
                            >
                                <div>
                                    {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">Most Popular</div>}
                                    <h3 className="text-xl font-bold mb-1 text-white">{plan.title}</h3>
                                    <div className="text-3xl font-black text-cyan-400 mb-6">{plan.price}</div>
                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((f, i) => (
                                            <li key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                                                <CheckCircle className="w-4 h-4 text-cyan-400" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => handlePayment(plan)}
                                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-colors cursor-pointer ${plan.popular ? 'bg-cyan-500 text-black hover:bg-cyan-400' : 'bg-[#181d30] text-slate-300 border border-white/5 hover:bg-[#1f253d]'}`}
                                >
                                    Choose Plan
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Services;
