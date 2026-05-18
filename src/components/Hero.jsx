import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import profileImg from './1.png';


const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent pt-32 pb-24">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-400/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-300/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <span className="inline-block px-4 py-2 mb-6 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 rounded-full border border-sky-100 backdrop-blur-sm">
                        Welcome to my journey
                    </span>

                    {/* User Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8 relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full blur opacity-20 transition duration-1000"></div>
                        <img
                            src={profileImg}
                            alt="Profile"
                            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full object-cover object-top border-4 border-white shadow-2xl mx-auto"
                            onError={(e) => {
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230ea5e9'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'%3E%3C/path%3E%3C/svg%3E";
                            }}
                        />
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-sky-950 mb-8 leading-[1.1] tracking-tight break-words">
                        Professional Freelancer <br className="hidden lg:block" />
                        & <span className="bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Developer</span>
                    </h1>
                    <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-light">
                        Delivering impactful results through customized solutions, technical mastery, and creative project management.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-stretch sm:items-center">
                        <motion.a
                            href="#profile"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition-all duration-300 shadow-[0_10px_20px_rgba(14,165,233,0.2)] text-center"
                        >
                            Explore Profile
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(14,165,233,0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 border border-sky-200 text-sky-700 font-bold rounded-2xl transition-all duration-300 text-center"
                        >
                            Get In Touch
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Center Aligned correctly */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-20">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-1"
                >
                    <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold text-slate-400 mb-1">Scroll</span>
                    <ChevronDown size={20} className="text-sky-500" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
