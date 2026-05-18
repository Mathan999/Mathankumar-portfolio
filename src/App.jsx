import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Education from './components/Education';
import Skill from './components/Skill';
import Project from './components/Project';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin/Admin';
import InstallPrompt from './components/InstallPrompt';

const Portfolio = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[60]"
                style={{ scaleX }}
            />

            <Navbar />

            <main>
                <Hero />
                <Profile />
                <Education />
                <Skill />
                <Project />
                <Certificates />
                <Contact />
            </main>

            <Footer />
            <InstallPrompt />
        </>
    );
};

const App = () => {
    return (
        <Router>
            <div className="bg-sky-50 selection:bg-sky-500/30 selection:text-sky-600 min-h-screen">
                <Routes>
                    <Route path="/" element={<Portfolio />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
