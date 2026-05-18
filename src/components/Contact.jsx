import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            return;
        }

        setStatus('loading');

        const apiKey = import.meta.env.VITE_BREVO_API_KEY;
        if (!apiKey) {
            console.error("Brevo API key is not loaded! Did you restart the server?");
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': apiKey
                },
                body: JSON.stringify({
                    sender: { name: "Portfolio Contact Form", email: "itsmemathankumar@gmail.com" },
                    to: [{ email: "itsmemathankumar@gmail.com", name: "Mathan Kumar" }],
                    replyTo: { email: formData.email, name: formData.name },
                    subject: `New Contact Message from ${formData.name}`,
                    htmlContent: `
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            <div style="width: 100%; height: 200px; background-color: #0ea5e9; background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'); background-size: cover; background-position: center;"></div>
                            <div style="padding: 30px; background-color: #ffffff;">
                                <h2 style="color: #0369a1; margin-top: 0; font-size: 24px; border-bottom: 2px solid #f0f9ff; padding-bottom: 15px;">New Portfolio Inquiry</h2>
                                
                                <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px;">
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; width: 80px; color: #64748b; font-weight: 600;">Name:</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${formData.name}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Email:</td>
                                        <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                                            <a href="mailto:${formData.email}" style="color: #0ea5e9; text-decoration: none;">${formData.email}</a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <div style="margin-top: 30px;">
                                    <span style="color: #64748b; font-weight: 600; display: block; margin-bottom: 12px; font-size: 15px;">Message:</span>
                                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; color: #475569; line-height: 1.6; border-left: 4px solid #0ea5e9; font-size: 15px;">
                                        ${formData.message.replace(/\n/g, '<br>')}
                                    </div>
                                </div>
                                
                                <div style="margin-top: 40px; text-align: center; color: #94a3b8; font-size: 13px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                                    <p style="margin: 0;">Sent directly from your Portfolio Contact Form.</p>
                                </div>
                            </div>
                        </div>
                    `
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader
                    title="Contact"
                    icon={<Mail size={24} />}
                    subtitle="Let's build something amazing together. Reach out for collaborations or just a friendly chat."
                />

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {[
                            { icon: <Mail />, title: 'Email', value: 'itsmemathankumar@gmail.com' },
                            { icon: <Phone />, title: 'Phone', value: '+91 8778915065' },
                            { icon: <MapPin />, title: 'Location', value: 'Sivakasi, India' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-5"
                            >
                                <div className="w-12 h-12 bg-white border border-sky-100 rounded-2xl flex items-center justify-center text-sky-600 shadow-sm">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-sky-600/70 text-xs font-bold uppercase tracking-widest">{item.title}</h4>
                                    <p className="text-sky-950 font-medium">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[2.5rem] border border-sky-100 shadow-xl shadow-sky-500/5"
                    >
                        <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-sky-600/70 ml-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full bg-white border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all shadow-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-sky-600/70 ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full bg-white border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all shadow-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-sm font-semibold text-sky-600/70 ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={status === 'loading'}
                                    className="w-full bg-white border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all resize-none shadow-sm"
                                    placeholder="How can I help you?"
                                />
                            </div>
                            <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                                <div className="text-sm font-medium">
                                    {status === 'success' && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center text-emerald-500"
                                        >
                                            <CheckCircle2 size={18} className="mr-2" /> Message sent successfully!
                                        </motion.span>
                                    )}
                                    {status === 'error' && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-center text-red-500"
                                        >
                                            <AlertCircle size={18} className="mr-2" /> Failed to send message.
                                        </motion.span>
                                    )}
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                    className={`flex items-center justify-center space-x-3 px-10 py-4 ${status === 'loading' ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-500'} text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-500/20 w-full sm:w-auto`}
                                >
                                    <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                                    {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
