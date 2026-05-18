import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SectionHeader from './SectionHeader';
import profileImg2 from './2.jpg';


const Profile = () => {
    const [displayText, setDisplayText] = React.useState('');
    const fullText = "Mathan Kumar B";

    React.useEffect(() => {
        let currentIndex = 0;
        let isDeleting = false;
        let timeout;

        const type = () => {
            if (!isDeleting) {
                setDisplayText(fullText.substring(0, currentIndex + 1));
                currentIndex++;
                if (currentIndex === fullText.length) {
                    isDeleting = true;
                    timeout = setTimeout(type, 2000); // Pause when word is complete
                } else {
                    timeout = setTimeout(type, 150);
                }
            } else {
                setDisplayText(fullText.substring(0, currentIndex - 1));
                currentIndex--;
                if (currentIndex === 0) {
                    isDeleting = false;
                    timeout = setTimeout(type, 500); // Pause when empty
                } else {
                    timeout = setTimeout(type, 100);
                }
            }
        };

        type();
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="profile" className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader title="Profile" icon={<User size={24} />} />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            initial: { duration: 0.8 },
                            animate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        viewport={{ once: true }}
                        className="flex justify-center"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative w-72 h-72 md:w-96 md:h-96 bg-white rounded-3xl overflow-hidden flex items-center justify-center border border-sky-100 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                                <img
                                    src={profileImg2}
                                    alt="Profile"
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230ea5e9'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'%3E%3C/path%3E%3C/svg%3E";
                                    }}
                                />
                                <div className="absolute inset-0 bg-sky-500/5 group-hover:bg-transparent transition-colors duration-300" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-950 leading-tight min-h-[1.5em] flex items-center">
                            Hello, I'm
                            <motion.span
                                animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="text-sky-600 ml-2 relative inline-block"
                            >
                                {displayText}
                                <span className="absolute -right-1 top-0 bottom-0 w-[2px] bg-sky-600 animate-[pulse_1s_infinite]"></span>
                            </motion.span>
                        </h3>
                        <p className="text-lg text-sky-800 leading-relaxed font-light">
                            Professional freelancer with a deep understanding of client needs and project management.
                            Known for delivering impactful results and maintaining high standards in every assignment.
                            Collaborative team player who swiftly adapts to changing requirements to achieve goals.
                            Skilled in communication, time management, and creative solutions.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6 pt-6">
                            {[
                                { label: 'Focus', value: 'Applications & AI-Assisted Developer' },
                                { label: 'Location', value: 'Sivakasi, India' },
                                { label: 'Experience', value: 'Freelancer & Intern' },
                                { label: 'Mission', value: 'Impactful Solutions' }
                            ].map((info, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white border border-sky-100 shadow-sm">
                                    <span className="block text-sky-600 text-xs font-bold uppercase tracking-widest mb-1">{info.label}</span>
                                    <span className="text-sky-950 font-medium">{info.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
