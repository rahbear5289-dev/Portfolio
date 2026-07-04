import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Cpu, Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Skills', href: '/skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] transition-all duration-500 px-4 py-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 flex items-center justify-between px-6 md:px-8 py-3 md:py-4 pointer-events-auto border
          ${isScrolled
            ? 'bg-[#050712]/75 backdrop-blur-xl border-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
            : 'bg-transparent border-transparent'}`}
      >
        {/* Logo with Glow */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 font-black cursor-pointer tracking-widest text-lg md:text-xl"
          >
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span>
              <span className="text-cyan-400">RAH</span>
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">BEAR</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href}>
              <motion.div
                className="relative px-4 py-2 rounded-full transition-all group"
                whileHover={{ scale: 1.05 }}
              >
                <span className={`relative z-10 font-semibold text-sm transition-colors duration-300 ${location.pathname === link.href ? 'text-cyan-400 font-bold' : 'text-slate-400 group-hover:text-white'}`}>
                  {link.name}
                </span>
                
                {/* Active Underline Glow */}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full -z-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  />
                )}
              </motion.div>
            </Link>
          ))}

          {/* Authentication Section */}
          <div className="ml-6 pl-6 border-l border-white/10 flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(34,211,238,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-500 text-black px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </motion.button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 border-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]" } }} />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 rounded-full bg-white/5 border border-white/10 focus:outline-none"
          >
            {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Responsive Navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-4 bg-[#050712]/95 backdrop-blur-2xl rounded-3xl p-6 flex flex-col space-y-2 shadow-2xl border border-white/10 overflow-hidden pointer-events-auto"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl font-bold text-sm tracking-wide transition-all ${location.pathname === link.href ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-white/5'}`}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-cyan-500 text-black w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer">
                    Login
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center p-2">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border-2 border-cyan-400" } }} showName />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;