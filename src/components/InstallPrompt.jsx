import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone } from 'lucide-react';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Clear dismissal for testing
        // sessionStorage.removeItem('pwa-prompt-dismissed');

        const handleBeforeInstallPrompt = (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        // Show the UI after a short delay
        const timer = setTimeout(() => {
            if (!isVisible) {
                console.log('PWA: Triggering visibility');
                setIsVisible(true);
            }
        }, 3000);

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            clearTimeout(timer);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            alert('To install: Click the "Share" or "Menu" button in your browser and select "Add to Home Screen".');
            return;
        }

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsVisible(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[100]"
                >
                    <div className="bg-white/95 backdrop-blur-xl border border-sky-100 rounded-[2.5rem] p-6 shadow-2xl shadow-sky-500/20 relative overflow-hidden group">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />

                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30 flex-shrink-0">
                                <Smartphone size={24} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-sky-950 tracking-tight leading-tight">Install App</h4>
                                <p className="text-sky-600 text-sm font-medium mt-1">Get the APK experience on your phone for faster access.</p>

                                <div className="mt-5 flex space-x-3">
                                    <button
                                        onClick={handleInstall}
                                        className="flex-1 bg-sky-500 text-white font-bold py-3 px-4 rounded-2xl shadow-lg shadow-sky-500/20 hover:bg-sky-400 active:scale-95 transition-all flex items-center justify-center space-x-2 text-sm"
                                    >
                                        <Download size={16} />
                                        <span>Install Now</span>
                                    </button>
                                    <button
                                        onClick={handleDismiss}
                                        className="py-3 px-5 text-sky-500 font-bold hover:bg-sky-50 rounded-2xl transition-all text-sm"
                                    >
                                        Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InstallPrompt;
