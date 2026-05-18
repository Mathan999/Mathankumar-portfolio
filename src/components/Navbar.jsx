import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, BookOpen, Code, Briefcase, Award, Mail, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timer);
        };
    }, []);

    const navItems = [
        { title: 'Home', icon: <Home size={18} />, href: '#home' },
        { title: 'Profile', icon: <User size={18} />, href: '#profile' },
        { title: 'Education', icon: <BookOpen size={18} />, href: '#education' },
        { title: 'Skill', icon: <Code size={18} />, href: '#skill' },
        { title: 'Project', icon: <Briefcase size={18} />, href: '#project' },
        { title: 'Certificates', icon: <Award size={18} />, href: '#certificates' },
        { title: 'Contact', icon: <Mail size={18} />, href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-lg border-b border-sky-100' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col"
                >
                    <span className="text-sm sm:text-lg font-black bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent tracking-tighter leading-none">
                        TIME: {time}
                    </span>
                    <span className="text-[8px] font-bold text-sky-400 uppercase tracking-widest mt-0.5">
                        Live Sync
                    </span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.href}
                            className="group flex items-center space-x-2 text-sky-700/70 hover:text-sky-600 transition-colors duration-300 text-sm font-bold"
                        >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.icon}</span>
                            <span>{item.title}</span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-sky-700 hover:text-sky-500">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-sky-100"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-sky-700/70 hover:bg-sky-50 hover:text-sky-500"
                                >
                                    {item.icon}
                                    <span className="text-lg font-medium">{item.title}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
