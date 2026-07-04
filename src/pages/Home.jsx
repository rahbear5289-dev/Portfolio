import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Briefcase, User, Zap, Layers, WifiOff, Cpu, Shield } from 'lucide-react';
import Footer from '../Components/Footer';

const RubiksCube = lazy(() => import('../../components/RubiksCube'));

const CubeLoading = () => (
    <div className="relative h-full min-h-[420px] w-full max-w-[480px]">
        <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent blur-2xl" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-400/30 bg-[#0b1020] shadow-[0_0_45px_rgba(34,211,238,0.18)] animate-pulse" />
    </div>
);

const revealViewport = { once: true, amount: 0.18, margin: '0px 0px -120px 0px' };

const revealUp = {
    hidden: { opacity: 0, y: 56, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const staggerReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

// CountUp animation component
const CountUp = ({ end, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();
                    const numEnd = typeof end === 'number' ? end : parseInt(end);

                    const animate = (now) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * numEnd));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
    const { scrollYProgress } = useScroll();
    const scrollScaleX = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 28,
        restDelta: 0.001,
    });
    const heroContentY = useTransform(scrollYProgress, [0, 0.22], [0, 70]);
    const heroContentOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.55]);
    const heroCubeY = useTransform(scrollYProgress, [0, 0.22], [0, -55]);

    // 16 brand technology icons mapped with names, inline SVGs and custom neon glow shadows
    const techStack = [
        { name: 'HTML', bg: '#1a0f00', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M1.5 22L0 0h24l-1.5 22L12 24L1.5 22z" fill="#E34F26"/><path d="M12 21.8L19.9 19.6L21 3H12v18.8z" fill="#F06529"/><path d="M12 11.2H7.7l-.3-3.3h4.6V4.8H4.2l.9 10H12v-3.6zM12 17.4l-.1.1l-3.3-.9l-.2-2.3H5.4l.4 5.4l6.2 1.7v-4z" fill="#EBEBEB"/><path d="M12 11.2h4.3l-.4 5.3l-3.9 1.1v-3.6zM12 4.8h7.5l-.3 3.1H12V4.8z" fill="#FFF"/></svg> },
        { name: 'CSS', bg: '#001220', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M1.5 22L0 0h24l-1.5 22L12 24L1.5 22z" fill="#1572B6"/><path d="M12 21.8L19.9 19.6L21 3H12v18.8z" fill="#33A9DC"/><path d="M12 11.2h4.3l-.5 5.3-3.8 1-3.3-.9-.2-2.3H5.4l.4 5.3 6.2 1.7 6.2-1.7.9-10.1H12v3.7z" fill="#FFF"/><path d="M12 4.8h7.5l-.3 3.2H12V4.8z" fill="#FFF"/><path d="M12 11.2H7.7l-.3-3.2h4.6V4.8H4.2l.9 10H12v-3.6z" fill="#EBEBEB"/><path d="M12 17.4l-.1.1-3.3-.9-.2-2.3H5.4l.4 5.4 6.2 1.7v-4z" fill="#EBEBEB"/></svg> },
        { name: 'JavaScript', bg: '#1a1800', icon: <svg className="w-8 h-8 rounded overflow-hidden" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" fill="#F7DF1E"/><path d="M18.8 17.2c-.4.8-1 1.2-1.8 1.4c-.8.2-1.6.1-2.2-.3c-.6-.4-.9-1-1-1.8h2.1c.1.5.3.8.5.9c.2.2.6.2.9.2c.4 0 .7-.1.8-.3c.2-.2.3-.5.3-.8V9.7h2.3v7.5zM12.9 15.3c0 .8-.2 1.4-.7 1.8c-.4.4-1.1.6-1.9.6c-.8 0-1.4-.2-1.8-.7c-.4-.5-.6-1.1-.6-2h2.2c0 .4.1.7.3.8c.2.2.5.3.9.3c.3 0 .6-.1.7-.3c.2-.2.2-.4.2-.7c0-.3-.1-.5-.3-.7c-.2-.2-.5-.3-1.1-.5c-.8-.2-1.4-.5-1.7-.8c-.3-.3-.5-.8-.5-1.4c0-.6.2-1.2.7-1.6c.5-.4 1.1-.6 1.9-.6c.7 0 1.3.2 1.7.5c.4.3.6.8.7 1.5h-2.1c0-.3-.1-.5-.3-.6c-.2-.1-.4-.2-.7-.2c-.3 0-.5.1-.6.2c-.1.1-.2.3-.2.5c0 .2.1.4.3.5c.2.1.6.3 1.2.5c.8.2 1.3.5 1.6.8c.4.3.5.8.5 1.4z" fill="#000"/></svg> },
        { name: 'React', bg: '#001520', icon: <svg className="w-8 h-8" viewBox="-11.5 -10.23 23 20.47" fill="none"><circle cx="0" cy="0" r="2.05" fill="#61DAFB"/><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg> },
        { name: 'Node.js', bg: '#001200', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 1.3L3.2 6.4v10.3l8.8 5.1 8.8-5.1V6.4L12 1.3zm6.6 14.2l-6.6 3.8v-7.6l6.6-3.8v7.6zm-7.7 4.4L4.3 16.1V8.5l6.6 3.8v7.6zm0-8.9L4.3 7.2l6.6-3.8 6.6 3.8-6.6 3.8z" fill="#339933"/></svg> },
        { name: 'Tailwind CSS', bg: '#001518', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 6.036c-2.286 0-3.81 1.144-4.572 3.432 1.143-1.524 2.476-2.095 4-1.714.87.217 1.492.848 2.18 1.547C14.73 10.42 16 11.714 18.286 11.714c2.286 0 3.81-1.144 4.571-3.432-1.142 1.524-2.476 2.095-4 1.714-.87-.217-1.492-.848-2.18-1.547-1.12-1.117-2.39-2.413-4.677-2.413zM7.429 11.714c-2.286 0-3.81 1.144-4.572 3.432 1.143-1.524 2.476-2.095 4-1.714.87.217 1.492.848 2.18 1.547 1.12 1.118 2.39 2.413 4.677 2.413 2.286 0 3.81-1.144 4.572-3.432-1.143 1.524-2.476 2.095-4-1.714-.87-.217-1.492-.848-2.18-1.547-1.12-1.118-2.39-2.413-4.677-2.413z" fill="#06B6D4"/></svg> },
        { name: 'MongoDB', bg: '#001200', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 .024c-.114 0-.228.014-.342.043C8.423 1.096 4.954 6.784 4.954 11.233c0 4.148 2.822 8.761 6.704 12.333.102.093.228.143.342.143s.24-.05.342-.143c3.882-3.572 6.704-8.185 6.704-12.333 0-4.449-3.469-10.137-6.704-11.166a1.353 1.353 0 0 0-.342-.043zm0 2.335v19.467c-2.822-2.91-4.789-6.602-4.789-10.593 0-3.324 2.012-7.55 4.789-8.874z" fill="#47A248"/></svg> },
        { name: 'Next.js', bg: '#111111', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11.4" stroke="#FFF" strokeWidth="1.2"/><path d="M18.8 19L9.5 7.1H7.8V17H9.2v-7.6l8 10.3c.5-.5 1-1.1 1.6-1.7zM16.2 7.1h-1.4v6.8l1.4 1.8V7.1z" fill="#FFF"/></svg> },
        { name: 'TypeScript', bg: '#001530', icon: <svg className="w-8 h-8 rounded overflow-hidden" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="3" fill="#3178C6" /><text x="12" y="16.5" fill="white" fontSize="9.5" fontWeight="black" fontFamily="system-ui, sans-serif" textAnchor="middle">TS</text></svg> },
        { name: 'Git', bg: '#180800', icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M22.6 11.4L12.6 1.4c-.6-.6-1.5-.6-2.1 0L1.4 10.5c-.6.6-.6 1.5 0 2.1l10 10c.3.3.7.4 1.1.4s.8-.1 1.1-.4l9-9c.6-.6.6-1.5 0-2.2zM12 18c-1.1 0-2-.9-2-2c0-.3.1-.7.2-1L8.5 13.3c-.3.1-.6.2-1 .2c-1.1 0-2-.9-2-2s.9-2 2-2c.4 0 .7.1 1 .2l1.7-1.7c-.1-.3-.2-.6-.2-1c0-1.1.9-2 2-2s2 .9 2 2c0 .4-.1.7-.2 1l1.7 1.7c.3-.1.6-.2 1-.2c1.1 0 2 .9 2 2s-.9 2-2 2c-.4 0-.7-.1-1-.2l-1.7 1.7c.1.3.2.6.2 1c0 1.1-.9 2-2 2z" fill="#F05032" /></svg> },
    ];

    return (
        <div className="min-h-screen bg-[#050712] text-white overflow-hidden relative">
            <motion.div
                className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_18px_rgba(34,211,238,0.65)]"
                style={{ scaleX: scrollScaleX }}
            />

            {/* Animated Nebula background lights */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.08),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.1),_transparent_40%),linear-gradient(135deg,_#02040f,_#050814)] z-0 pointer-events-none" />

            {/* Drifting Nebula Blobs */}
            <motion.div
                animate={{
                    x: [0, 45, -30, 0],
                    y: [0, -40, 50, 0],
                    scale: [1, 1.15, 0.92, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none z-0"
            />
            <motion.div
                animate={{
                    x: [0, -50, 40, 0],
                    y: [0, 50, -40, 0],
                    scale: [1, 0.95, 1.2, 1],
                }}
                transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[5%] right-[-10%] w-[650px] h-[650px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none z-0"
            />

            <header className="max-w-7xl mx-auto px-6 min-h-screen flex flex-col md:flex-row items-center justify-between z-20 relative pt-24 md:pt-0">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ y: heroContentY, opacity: heroContentOpacity }}
                    className="md:w-1/2 space-y-8 mt-10 md:mt-0 z-20 relative"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-5 py-2 rounded-full border border-blue-500/20 bg-blue-950/20 text-cyan-400 font-semibold text-sm shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md"
                    >
                        Full Stack Developer & UI/UX Designer
                    </motion.div>

                    <h1 className="text-5xl md:text-7.5xl font-black leading-tight tracking-tight">
                        Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-shimmer-gradient">Digital</span> <br />
                        Experiences
                    </h1>

                    <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                        I craft stunning, high-performance web applications with modern technologies.
                        From interactive frontends to robust backends, I bring ideas to life.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-full font-bold text-lg flex items-center space-x-3 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition-all cursor-pointer text-white"
                            >
                                <span>Let's Talk</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link to="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                className="border border-slate-800 bg-[#060a17]/50 text-white font-bold px-8 py-4 rounded-full flex items-center justify-center hover:bg-slate-900/50 transition-all cursor-pointer"
                            >
                                View Work
                            </motion.button>
                        </Link>
                    </div>

                    {/* Tech Stack â€” dark pill with icons, matching reference image */}
                    <div className="mt-10 w-full max-w-xl">
                        <div
                            className="inline-flex items-center gap-5 px-6 py-3"
                            style={{
                                borderRadius: '999px',
                                background: 'rgba(8,12,24,0.85)',
                                border: '1px solid rgba(34,211,238,0.15)',
                                boxShadow: '0 0 20px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.04)',
                            }}
                        >
                            {techStack.map((tech) => (
                                <motion.div
                                    key={tech.name}
                                    whileHover={{ y: -3, scale: 1.15 }}
                                    title={tech.name}
                                    className="flex items-center justify-center flex-shrink-0 cursor-pointer"
                                    style={{ transition: 'transform 0.15s ease' }}
                                >
                                    {tech.icon}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Graphic: REAL INTERACTIVE 3D Rubik's Cube */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ y: heroCubeY }}
                    className="md:w-1/2 w-full relative min-h-[480px] flex items-center justify-center mt-12 md:mt-0 z-20"
                >
                    <div className="w-full h-full max-w-[480px] aspect-square flex items-center justify-center relative">
                        <Suspense fallback={<CubeLoading />}>
                            <RubiksCube />
                        </Suspense>
                    </div>
                </motion.div>
            </header>

            <motion.section
                className="py-24 bg-slate-900 relative"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
            >
                <div className="max-w-7xl mx-auto px-6">
                    {/* Stats cards â€” stretched full-width row with counting animation */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={staggerReveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={revealViewport}
                    >
                        {[
                            { value: 3, suffix: '+', label: 'Years Exp.' },
                            { value: 50, suffix: '+', label: 'Projects' },
                            { value: 20, suffix: 'k', label: 'Lines of Code' },
                            { value: 100, suffix: '%', label: 'Satisfaction' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                variants={revealUp}
                                className="p-8 bg-slate-800 rounded-2xl border border-slate-700"
                            >
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                                </h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Hosting platforms marquee â€” left to right scrolling */}
                <div className="mt-16 overflow-hidden relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

                    <div
                        className="flex items-center gap-16 whitespace-nowrap py-6"
                        style={{
                            animation: 'marquee-scroll 25s linear infinite',
                        }}
                    >
                        {[...Array(2)].map((_, setIdx) => (
                            <React.Fragment key={setIdx}>
                                {[
                                    'Vercel', 'Netlify', 'Render', 'Railway', 'Fly.io',
                                    'AWS', 'DigitalOcean', 'Firebase', 'Heroku', 'Cloudflare'
                                ].map((name) => (
                                    <span
                                        key={`${setIdx}-${name}`}
                                        className="text-gray-500 text-sm font-semibold uppercase tracking-[0.2em] select-none"
                                    >
                                        {name}
                                    </span>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>

                    <style>{`
                        @keyframes marquee-scroll {
                            0% { transform: translateX(-50%); }
                            100% { transform: translateX(0); }
                        }
                    `}</style>
                </div>
            </motion.section>

            <motion.section
                className="py-24 bg-[#090b15] border-t border-slate-900 relative"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Feature List with staggered entrance animations */}
                    <div className="space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex gap-5 items-start"
                        >
                            <div className="p-3 rounded-lg bg-red-500/10 text-red-500 mt-1 border border-red-500/20">
                                <WifiOff className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Latency Bottlenecks</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Web apps depend on constant internet. Refresh, buffering, and lost connection kill your flow state.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                            className="flex gap-5 items-start"
                        >
                            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500 mt-1 border border-amber-500/20">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Context Switching</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Alt-tabbing between IDE, Chat, and browser tabs destroys focus. Every switch costs mental energy.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className="flex gap-5 items-start"
                        >
                            <div className="p-3 rounded-lg bg-slate-500/10 text-slate-400 mt-1 border border-slate-500/20">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Limited System Access</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Standard web apps can't access your file system or run low-level scripts directly. You're boxed in.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Engine Card with entrance & infinite breathing/float glow animation */}
                    <div className="flex justify-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            whileHover={{ y: -5 }}
                            className="w-full max-w-[420px] aspect-[4/3] rounded-3xl bg-[#0d1020]/90 border border-slate-800/80 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Inner Radial Glow pulsing */}
                            <motion.div 
                                animate={{ opacity: [0.4, 0.8, 0.4] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.08),_transparent_70%)] pointer-events-none" 
                            />
                            
                            {/* Glowing Circle and Lightning Bolt (Floating & Pulsing glow) */}
                            <motion.div 
                                animate={{ y: [0, -6, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="relative mb-6"
                            >
                                <div className="absolute -inset-4 rounded-full bg-yellow-500/15 blur-xl pointer-events-none animate-pulse" />
                                <motion.div 
                                    animate={{ boxShadow: ["0 0 20px rgba(234,179,8,0.1)", "0 0 40px rgba(234,179,8,0.3)", "0 0 20px rgba(234,179,8,0.1)"] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="w-20 h-20 rounded-full border-2 border-yellow-500/30 flex items-center justify-center bg-yellow-500/5 shadow-[0_0_30px_rgba(234,179,8,0.2),_inset_0_0_15px_rgba(234,179,8,0.1)]"
                                >
                                    <Zap className="w-9 h-9 text-yellow-400 fill-yellow-400/20 filter drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                </motion.div>
                            </motion.div>

                            {/* Text Details */}
                            <h4 className="text-2xl font-black text-white tracking-wide mb-2">
                                The XBLT Hybrid Engine
                            </h4>
                            <p className="text-sm font-semibold text-yellow-400 uppercase tracking-widest opacity-80">
                                Web Accessibility + Native Power
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>


            <motion.section
                className="py-24 bg-[#050712] border-t border-slate-900/60 relative"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
            >
                <div className="max-w-7xl mx-auto px-6 space-y-10">

                    {/* Top Grid Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Desktop Core Engine */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -4, borderColor: 'rgba(255, 235, 59, 0.2)' }}
                            className="lg:col-span-2 p-8 bg-[#090b15] rounded-3xl border border-slate-800/80 relative overflow-hidden flex flex-col justify-between min-h-[300px] transition-colors"
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-4 max-w-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping absolute" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 relative" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-wide">Desktop Core Engine</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        Built using native runtime (Electron/Tauri) with Node.js backend logic. This allows direct file manipulation, persistent background services, and 0ms latency.
                                    </p>
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="hidden sm:block text-slate-500"
                                >
                                    <Cpu className="w-28 h-28 stroke-[1] filter drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]" />
                                </motion.div>
                            </div>
                            <div className="flex gap-2 mt-8">
                                {['Node.js', 'Rust', 'Electron'].map((badge) => (
                                    <span key={badge} className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800/40 border border-slate-700/50 text-gray-400 hover:border-gray-500 transition-colors">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Hybrid Cloud Sync */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            whileHover={{ y: -4, borderColor: 'rgba(34, 211, 238, 0.3)' }}
                            className="p-8 bg-[#090b15] rounded-3xl border border-slate-800/80 flex flex-col justify-between min-h-[300px] transition-colors"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                                >
                                    <Globe className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-white">Hybrid Cloud Sync</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Core logic runs locally. Heavy AI inference and syncing handled via server. Smart caching reduces server calls.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Grid Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Enterprise Auth */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.3)' }}
                            className="p-8 bg-[#090b15] rounded-3xl border border-slate-800/80 flex flex-col justify-between min-h-[280px] transition-colors"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    animate={{ scale: [1, 1.08, 1] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                >
                                    <Shield className="w-6 h-6" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-white">Enterprise Auth</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    Google OAuth, JWT tokens, and Passport strategy. Authenticate once, stay connected securely forever.
                                </p>
                            </div>
                        </motion.div>

                        {/* Plugin Architecture */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            whileHover={{ y: -4, borderColor: 'rgba(234, 179, 8, 0.2)' }}
                            className="lg:col-span-2 p-8 bg-[#090b15] rounded-3xl border border-slate-800/80 relative overflow-hidden flex flex-col sm:flex-row justify-between items-stretch gap-6 min-h-[280px] transition-colors"
                        >
                            <div className="flex flex-col justify-between max-w-md space-y-6 flex-1">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-white">Plugin Architecture</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        XBLT is not just a tool, it is a platform. Extend functionality with local automation scripts.
                                    </p>
                                </div>
                                <div>
                                    <a href="#marketplace" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors">
                                        Explore Marketplace <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex-1 min-w-[200px] rounded-xl bg-[#050710] border border-slate-800/80 p-4 flex flex-col justify-between font-mono text-[11px] text-emerald-400/90 shadow-inner">
                                <div className="flex items-center gap-1.5 pb-3 border-b border-slate-800/40">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                </div>
                                <div className="pt-3 space-y-1.5 flex-1">
                                    <div className="flex items-center"><span className="text-slate-500 mr-1.5">$</span> npm run build <span className="w-1.5 h-3 ml-1 bg-emerald-400 animate-[pulse_1s_infinite]" /></div>
                                    <div className="text-slate-400">&gt; xblt-engine@1.0.0 build</div>
                                    <div className="text-slate-400">&gt; tsc &amp;&amp; vite build</div>
                                    <div className="text-emerald-400 font-bold">&#10003; built in 420ms</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </motion.section>

            {/* RAHBEAR Outline Banner */}
            <section className="relative overflow-hidden bg-[#050712] border-t border-white/5 py-16 select-none">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full" />
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 flex items-center justify-center overflow-hidden px-4">
                    <div
                        className="flex items-center justify-center font-black uppercase leading-none"
                        style={{ fontSize: 'clamp(4rem, 17vw, 17rem)', letterSpacing: '-0.04em' }}
                    >
                        {'RAHBEAR'.split('').map((letter, i) => (
                            <span
                                key={i}
                                style={{
                                    WebkitTextStroke: '2px rgba(34,211,238,0.35)',
                                    color: 'transparent',
                                    WebkitTextFillColor: 'transparent',
                                    display: 'inline-block',
                                    transition: 'filter 0.2s ease, -webkit-text-stroke 0.2s ease',
                                    cursor: 'default',
                                    filter: 'none',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.WebkitTextStroke = '2px rgba(34,211,238,1)';
                                    e.currentTarget.style.filter =
                                        'drop-shadow(0 0 6px rgba(34,211,238,1)) drop-shadow(0 0 18px rgba(34,211,238,0.85)) drop-shadow(0 0 40px rgba(34,211,238,0.6)) drop-shadow(0 0 80px rgba(34,211,238,0.3))';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.WebkitTextStroke = '2px rgba(34,211,238,0.35)';
                                    e.currentTarget.style.filter = 'none';
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-center gap-4 px-6">
                    <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-transparent to-cyan-500/30" />
                    <span className="text-xs text-gray-600 uppercase tracking-widest font-semibold">Full Stack Developer</span>
                    <div className="flex-1 max-w-xs h-px bg-gradient-to-l from-transparent to-purple-500/30" />
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
