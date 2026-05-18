import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

const Project = () => {
    const [dbProjects, setDbProjects] = useState([]);


    useEffect(() => {
        const projectsRef = ref(db, 'projects');
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setDbProjects(list.reverse());
            } else {
                setDbProjects([]);
            }
        });
    }, []);


    return (
        <section id="project" className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="Projects" icon={<Briefcase size={24} />} subtitle="Practical implementations and coding experiments" />

                <div className="flex overflow-x-auto gap-8 pb-10 scroll-smooth snap-x snap-mandatory hide-scrollbar">
                    {dbProjects.map((proj, idx) => (
                        <motion.div
                            key={proj.id || idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[320px] md:w-[400px] snap-center group bg-white rounded-[2.5rem] overflow-hidden border border-sky-100 hover:border-sky-500/30 transition-all duration-500 shadow-lg shadow-sky-500/5 hover:shadow-xl"
                        >
                            {/* Project Image */}
                            <div className="h-56 relative overflow-hidden bg-sky-50">
                                {proj.image ? (
                                    <img
                                        src={proj.image}
                                        alt={proj.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-sky-200">
                                        <Briefcase size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                                    <a href={proj.github || '#'} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-sky-600 hover:scale-110 transition-transform">
                                        <Github size={20} />
                                    </a>
                                    <a href={proj.live || '#'} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full text-sky-600 hover:scale-110 transition-transform">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <div className="p-8">
                                <h4 className="text-2xl font-bold text-sky-950 group-hover:text-sky-600 transition-colors mb-3">
                                    {proj.name}
                                </h4>
                                <p className="text-sky-800 mb-6 font-light leading-relaxed line-clamp-2">
                                    {proj.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.tech && proj.tech.map(t => (
                                        <span key={t} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white text-sky-600 rounded-full border border-sky-100 shadow-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Project;
