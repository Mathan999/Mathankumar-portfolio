import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 bg-white border-t border-sky-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left: Map Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl blur opacity-10 transition duration-1000"></div>
                        <div className="relative h-48 sm:h-56 bg-sky-50 rounded-2xl overflow-hidden border border-sky-100 shadow-xl shadow-sky-500/5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31464.218556636757!2d77.77666327425313!3d9.45287514101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cee836750341%3A0xc3f6089771e8470a!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1740391200000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="space-y-6">


                        <p className="text-sky-800/70 text-sm font-light leading-relaxed max-w-md">
                            Delivering professional excellence through customized AI-assisted solutions and technical mastery.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 py-4 border-y border-sky-50">
                            <div className="flex items-center space-x-3 text-sky-800">
                                <MapPin size={16} className="text-sky-500" />
                                <span className="text-xs font-medium uppercase tracking-wider">Sivakasi, India</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sky-800">
                                <Mail size={16} className="text-sky-500" />
                                <span className="text-xs font-medium">itsmemathankumar@gmail.com</span>
                            </div>
                        </div>

                        <p className="text-sky-600/50 text-[10px] uppercase tracking-[0.2em] font-bold">
                            &copy; {new Date().getFullYear()} Mathan Kumar B.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
