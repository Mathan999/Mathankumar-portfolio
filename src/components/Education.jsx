import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';

const Education = () => {
    const education = [
        { year: '09/2024 - 05/2026', degree: 'MCA (Master of Computer Applications)', school: 'Rathinam Technical Campus', desc: 'Coimbatore, India' },
        { year: '07/2021 - 05/2024', degree: 'BCA (Bachelor of Computer Applications)', school: 'Sri Kaliswari College (Autonomous)', desc: 'Sivakasi, India' },
    ];

    return (
        <section id="education" className="py-24 bg-transparent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="Education" icon={<BookOpen size={24} />} />

                <div className="relative border-l-2 border-sky-100 ml-4 md:ml-0 space-y-12">
                    {education.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative pl-12"
                        >
                            {/* Timeline Connector Dot */}
                            <div className="absolute left-[-9px] top-1.5 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-[0_0_15px_rgba(14,165,233,0.3)]" />

                            <div className="bg-white p-8 rounded-3xl border border-sky-100 hover:border-sky-500/30 transition-colors duration-300 shadow-lg shadow-sky-500/5 hover:shadow-xl group">
                                <span className="text-sky-600 font-bold text-sm tracking-widest">{item.year}</span>
                                <h4 className="text-xl font-bold text-sky-950 mt-2 group-hover:text-sky-600 transition-colors">{item.degree}</h4>
                                <h5 className="text-sky-600/70 font-medium mb-4">{item.school}</h5>
                                <p className="text-sky-800 leading-relaxed font-light">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
