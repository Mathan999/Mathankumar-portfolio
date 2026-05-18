import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import SectionHeader from './SectionHeader';

const Skill = () => {
    const skills = [
        { category: 'Technical Skills', items: ['AI-Assisted Mobile Developer', 'Software Testing (Manual)', 'Prompt Engineering', 'AI-Assisted Full-Stack Development', 'Java (OOPS)', 'Data Analytics (Power BI)'], color: 'from-sky-500 to-cyan-400' },
        { category: 'Soft Skills', items: ['Communication', 'Time Management', 'Creative Solutions', 'Teamwork', 'Adaptability'], color: 'from-cyan-400 to-sky-600' }
    ];

    return (
        <section id="skill" className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="Skills" icon={<Code size={24} />} subtitle="Technical and interpersonal expertise" />

                <div className="grid md:grid-cols-2 gap-8">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-sky-100 shadow-lg shadow-sky-500/5"
                        >
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                                <span className={`w-2 h-8 bg-gradient-to-b ${skillGroup.color} rounded-full mr-4`} />
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((item, i) => (
                                    <motion.span
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-4 py-2 bg-white text-sky-700 rounded-xl text-sm font-medium border border-sky-100 shadow-sm"
                                    >
                                        {item}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skill;
