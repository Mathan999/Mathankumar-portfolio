import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, icon, subtitle }) => {
    return (
        <div className="text-center mb-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
            >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl border border-sky-100 text-sky-600 mb-4 shadow-sm">
                    {icon}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sky-950 mb-4 tracking-tight">
                    {title}
                </h2>
                {subtitle && <p className="text-sky-600/70 max-w-xl mx-auto">{subtitle}</p>}
                <div className="w-20 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mt-2" />
            </motion.div>
        </div>
    );
};

export default SectionHeader;
