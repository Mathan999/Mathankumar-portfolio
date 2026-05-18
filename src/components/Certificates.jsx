import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, X, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

const Certificates = () => {
    const [dbCerts, setDbCerts] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const certsRef = ref(db, 'certificates');
        onValue(certsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setDbCerts(list.reverse()); // Newest first
            } else {
                setDbCerts([]);
            }
        });
    }, []);

    return (
        <section id="certificates" className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Certificates"
                    icon={<Award size={24} />}
                    subtitle="Official recognition of specialized training and academic excellence"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {dbCerts.map((cert, idx) => (
                        <motion.div
                            key={cert.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-3 sm:space-x-6 bg-white p-4 sm:p-6 rounded-[2rem] border border-sky-100 hover:border-sky-500/30 transition-all duration-300 group shadow-lg shadow-sky-500/5 hover:shadow-xl relative"
                        >
                            <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform overflow-hidden border border-sky-50 shadow-inner">
                                {cert.image ? (
                                    <img src={cert.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <Award size={22} className="sm:w-6 sm:h-6" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-base sm:text-lg font-bold text-sky-950 group-hover:text-sky-600 transition-colors uppercase tracking-tight truncate leading-tight mb-0.5">{cert.name}</h4>
                                <p className="text-sky-600/70 text-[11px] sm:text-sm font-medium truncate">{cert.issuer} • {cert.date}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCert(cert)}
                                className="flex-shrink-0 p-2.5 sm:p-2 bg-sky-500 text-white rounded-xl transition-all duration-300 hover:bg-sky-600 hover:scale-110 shadow-lg shadow-sky-500/20 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                title="Preview Certificate"
                            >
                                <Eye size={18} />
                            </button>
                        </motion.div>
                    ))}
                    {dbCerts.length === 0 && (
                        <div className="col-span-full text-center py-20 text-sky-400 font-bold bg-white/50 rounded-[2rem] border-2 border-dashed border-sky-100 font-mono">
                            // NO_CERTIFICATES_SYNCED
                        </div>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCert(null)}
                            className="absolute inset-0 bg-sky-950/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-sky-100 max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-5 right-5 p-2 bg-white/90 backdrop-blur-xl text-sky-950 hover:text-red-500 hover:rotate-90 rounded-full transition-all duration-300 shadow-xl z-[110] border border-sky-100"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-full md:w-3/5 bg-sky-50 flex items-center justify-center p-4">
                                {selectedCert.image ? (
                                    <img
                                        src={selectedCert.image}
                                        alt={selectedCert.name}
                                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-sky-200">
                                        <Award size={120} strokeWidth={1} />
                                        <p className="mt-4 font-bold text-sky-400/50 uppercase tracking-widest text-sm">No Preview Available</p>
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-2/5 p-8 pt-12 md:pt-8 flex flex-col justify-center bg-white">
                                <div className="space-y-6">
                                    <div>
                                        <div className="inline-flex items-center space-x-2 text-sky-500 mb-2">
                                            <Award size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Certification Detail</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-sky-950 leading-tight">
                                            {selectedCert.name}
                                        </h3>
                                        <p className="text-sky-500 font-bold mt-1">{selectedCert.issuer} • {selectedCert.date}</p>
                                    </div>

                                    {selectedCert.desc && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Description / Achievements</label>
                                            <p className="text-sky-950/70 font-medium leading-relaxed bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                                                {selectedCert.desc}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setSelectedCert(null)}
                                        className="w-full py-4 bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:bg-sky-400 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;

