import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple mock authentication
        if (email === 'admin@gmail.com' && password === 'admin123') {
            onLogin(true);
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-white p-10 rounded-[2.5rem] border border-sky-100 shadow-2xl shadow-sky-500/10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-sky-500/20">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-sky-950 tracking-tighter">Admin Login</h2>
                        <p className="text-sky-600/70 mt-2 font-medium">Access your portfolio dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sky-700/70 ml-1 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-12 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all shadow-sm"
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-sky-700/70 ml-1 uppercase tracking-widest">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-12 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/5 transition-all shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full flex items-center justify-center space-x-3 py-5 bg-sky-500 hover:bg-sky-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-500/20"
                        >
                            <span>Sign In</span>
                            <LogIn size={20} />
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
