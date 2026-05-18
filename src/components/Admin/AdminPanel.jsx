import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Briefcase,
    Award,
    LogOut,
    Image as ImageIcon,
    LayoutDashboard,
    Settings,
    ChevronRight,
    Search,
    Trash2,
    Edit3,
    Upload,
    X,
    Menu,
    Eye
} from 'lucide-react';
import { db } from '../../firebase';
import { ref, push, set, onValue, remove } from "firebase/database";

const AdminPanel = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('projects');
    const [showAddForm, setShowAddForm] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default on desktop
    const [selectedPreview, setSelectedPreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        tech: '',
        github: '',
        live: '',
        issuer: '',
        date: '',
        desc: ''
    });

    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);

    React.useEffect(() => {
        const projectsRef = ref(db, 'projects');
        onValue(projectsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setProjects(list);
            } else {
                setProjects([]);
            }
        });

        const certsRef = ref(db, 'certificates');
        onValue(certsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setCertificates(list);
            } else {
                setCertificates([]);
            }
        });
    }, []);

    const handleEdit = (item) => {
        setEditId(item.id);
        setFormData({
            name: item.name || '',
            tech: item.tech ? item.tech.join(', ') : '',
            github: item.github || '',
            live: item.live || '',
            issuer: item.issuer || '',
            date: item.date || '',
            desc: item.desc || ''
        });
        setPreviewImage(item.image || null);
        setShowAddForm(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!formData.name) return alert('Name is required');
        setLoading(true);

        try {
            let imageUrl = previewImage;
            if (selectedFile) {
                const data = new FormData();
                data.append("file", selectedFile);
                data.append("upload_preset", "akshay");
                data.append("cloud_name", "dym1sjtph");

                const res = await fetch("https://api.cloudinary.com/v1_1/dym1sjtph/image/upload", {
                    method: "POST",
                    body: data
                });
                const file = await res.json();
                imageUrl = file.secure_url;
            }

            const itemRef = editId
                ? ref(db, `${activeTab}/${editId}`)
                : push(ref(db, activeTab));

            const dataToSave = {
                name: formData.name,
                desc: formData.desc,
                image: imageUrl || (activeTab === 'projects' ? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070' : ''),
                timestamp: Date.now()
            };

            if (activeTab === 'projects') {
                dataToSave.tech = formData.tech.split(',').map(s => s.trim()).filter(s => s !== '');
                dataToSave.github = formData.github;
                dataToSave.live = formData.live;
            } else {
                dataToSave.issuer = formData.issuer;
                dataToSave.date = formData.date;
            }

            await set(itemRef, dataToSave);

            setShowAddForm(false);
            setEditId(null);
            setPreviewImage(null);
            setSelectedFile(null);
            setFormData({ name: '', tech: '', github: '', live: '', issuer: '', date: '', desc: '' });
            alert(editId ? 'Updated successfully!' : 'Saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;

        const itemType = activeTab === 'projects' ? 'Project' : 'Certificate';
        if (window.confirm(`Are you sure you want to permanently delete this ${itemType}? This action cannot be undone.`)) {
            setLoading(true);
            try {
                const itemRef = ref(db, `${activeTab}/${id}`);
                await remove(itemRef);
                alert(`${itemType} has been removed permanently from the database.`);
            } catch (error) {
                console.error("Delete error:", error);
                alert(`Error: Failed to delete the ${itemType}. Please try again.`);
            } finally {
                setLoading(false);
            }
        }
    };

    const tabs = [
        { id: 'projects', label: 'Projects', icon: <Briefcase size={20} /> },
        { id: 'certificates', label: 'Certificates', icon: <Award size={20} /> },
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-sky-50 flex overflow-hidden">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-sky-950/40 backdrop-blur-sm z-[90] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 bottom-0 h-screen
                bg-white border-r border-sky-100 flex flex-col shadow-2xl z-[100]
                transition-all duration-300 ease-in-out overflow-hidden
                ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
            `}>
                <div className="p-6 flex items-center justify-between border-b border-sky-50 min-h-[88px]">
                    <div className={`flex items-center space-x-3 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 font-bold' : 'opacity-0'}`}>
                        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20 flex-shrink-0">
                            <Settings size={22} />
                        </div>
                        <div className="overflow-hidden">
                            <h1 className="text-xl font-black text-sky-950 tracking-tighter leading-none whitespace-nowrap">Admin Panel</h1>
                            <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mt-1">v1.2.0 Control</p>
                        </div>
                    </div>
                    {isSidebarOpen && (
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all">
                            <X size={20} />
                        </button>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                if (window.innerWidth < 1024) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center px-4 py-4 rounded-2xl transition-all font-bold text-sm group ${activeTab === tab.id
                                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                : 'text-sky-700/60 hover:bg-sky-50 hover:text-sky-600'
                                }`}
                        >
                            <div className={`flex items-center ${isSidebarOpen ? 'space-x-3' : 'mx-auto'}`}>
                                <span className={`${activeTab === tab.id ? 'text-white' : 'text-sky-400 group-hover:text-sky-600'}`}>{tab.icon}</span>
                                {isSidebarOpen && <span className="whitespace-nowrap">{tab.label}</span>}
                            </div>
                            {isSidebarOpen && activeTab === tab.id && <ChevronRight className="ml-auto" size={16} />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-sky-50">
                    <button
                        onClick={onLogout}
                        className={`w-full flex items-center px-4 py-4 rounded-2xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3">Logout Session</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 relative ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
                {/* Fixed Header / Top Navbar */}
                <header className="sticky top-0 z-[80] bg-white border-b border-sky-100 px-6 py-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl transition-all shadow-sm"
                            title={isSidebarOpen ? "Collapse Menu" : "Expand Menu"}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-sky-950 tracking-tight capitalize leading-none">
                                Manage {activeTab}
                            </h2>
                            <p className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mt-1 font-mono">Real-time Synchronization</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {(activeTab === 'projects' || activeTab === 'certificates') && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="flex items-center space-x-2 bg-sky-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-sky-500/20 hover:bg-sky-400 hover:-translate-y-0.5 transition-all"
                            >
                                <Plus size={18} />
                                <span className="hidden sm:inline">Add {activeTab === 'projects' ? 'Project' : 'Certificate'}</span>
                            </button>
                        )}
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-sky-50/30 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            {activeTab === 'projects' && (
                                <motion.div
                                    key="projects"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {projects.map((proj) => (
                                        <div key={proj.id} className="group bg-white rounded-[2rem] border border-sky-100 shadow-xl shadow-sky-500/5 hover:shadow-2xl hover:shadow-sky-500/10 transition-all p-5">
                                            <div className="w-full h-48 bg-sky-50 rounded-2xl mb-6 flex items-center justify-center text-sky-200 group-hover:scale-[1.02] transition-transform overflow-hidden relative">
                                                {proj.image ? (
                                                    <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon size={48} />
                                                )}
                                                <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                    <button onClick={() => setSelectedPreview({ ...proj, type: 'projects' })} className="p-3 bg-white rounded-full text-sky-500 hover:scale-110 transition-transform shadow-lg" title="Preview">
                                                        <Eye size={18} />
                                                    </button>
                                                    <button onClick={() => handleEdit(proj)} className="p-3 bg-white rounded-full text-sky-600 hover:scale-110 transition-transform shadow-lg">
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(proj.id)} className="p-3 bg-white rounded-full text-red-500 hover:scale-110 transition-transform shadow-lg">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-sky-950 text-xl mb-2">{proj.name}</h4>
                                            <p className="text-sky-600/70 text-sm line-clamp-2 mb-4 font-medium">{proj.desc}</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(proj)} className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-sky-50 text-sky-600 rounded-xl font-bold text-xs hover:bg-sky-500 hover:text-white transition-all">
                                                    <Edit3 size={14} />
                                                    <span>Edit Content</span>
                                                </button>
                                                <button onClick={() => handleDelete(proj.id)} className="px-3 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {projects.length === 0 && <p className="col-span-full text-center py-20 text-sky-400 font-bold text-xl bg-white rounded-[2.5rem] border border-dashed border-sky-200">No projects added yet.</p>}
                                </motion.div>
                            )}

                            {activeTab === 'certificates' && (
                                <motion.div
                                    key="certificates"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid gap-4"
                                >
                                    {certificates.map((cert) => (
                                        <div className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-sky-100 shadow-lg shadow-sky-500/5 hover:shadow-xl transition-all">
                                            <div className="flex items-center space-x-5">
                                                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 border border-sky-100 shadow-inner overflow-hidden">
                                                    {cert.image ? (
                                                        <img src={cert.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Award size={28} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sky-950 text-lg">{cert.name}</h4>
                                                    <p className="text-xs text-sky-500 font-black uppercase tracking-widest mt-1">{cert.issuer} • {cert.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => setSelectedPreview({ ...cert, type: 'certificates' })}
                                                    className="p-3 bg-sky-50 rounded-xl text-sky-500 border border-sky-100 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                                                    title="Preview"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(cert)}
                                                    className="p-3 bg-sky-50 rounded-xl text-sky-600 border border-sky-100 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cert.id)}
                                                    className="p-3 bg-red-50 rounded-xl text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {certificates.length === 0 && <p className="text-center py-20 text-sky-400 font-bold text-xl bg-white rounded-[2.5rem] border border-dashed border-sky-200">No certificates added yet.</p>}
                                </motion.div>
                            )}

                            {(activeTab === 'dashboard' || activeTab === 'settings') && (
                                <motion.div
                                    key="other"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-sky-100"
                                >
                                    <div className="p-12 bg-sky-50 rounded-full mb-8 shadow-inner">
                                        <Settings size={64} className="text-sky-200 animate-spin-slow" />
                                    </div>
                                    <h3 className="text-2xl font-black text-sky-950">Module Under Construction</h3>
                                    <p className="text-sky-600/70 mt-3 font-medium text-center max-w-sm">We're building something amazing. This feature will be available in the next update.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setShowAddForm(false); setEditId(null); setPreviewImage(null); }}
                            className="absolute inset-0 bg-sky-950/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-sky-100"
                        >
                            <div className="p-8 pb-4 flex justify-between items-center border-b border-sky-50">
                                <div>
                                    <h2 className="text-2xl font-black text-sky-950 tracking-tighter">
                                        {editId ? 'Edit Entry' : 'Add New Content'}
                                    </h2>
                                    <p className="text-xs text-sky-500 font-bold uppercase tracking-widest mt-1">v.1.2.0 {activeTab}</p>
                                </div>
                                <button
                                    onClick={() => { setShowAddForm(false); setEditId(null); setPreviewImage(null); }}
                                    className="p-3 text-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-2xl transition-all shadow-sm"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Media Assets</label>
                                    <div className="group relative h-56 bg-sky-50/50 border-2 border-dashed border-sky-200 rounded-[2rem] flex flex-col items-center justify-center transition-all hover:border-sky-500 hover:bg-sky-50 cursor-pointer overflow-hidden">
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" onChange={handleImageChange} />
                                        {previewImage ? (
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center text-sky-300">
                                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                                                    <Upload size={32} />
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest text-sky-600">Drop content here</span>
                                                <span className="text-[10px] mt-2 font-medium">JPEG, PNG, WEBP (MAX 10MB)</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-sky-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white text-sky-600 px-6 py-2 rounded-full font-bold text-xs shadow-lg">Change Image</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Identity Detail</label>
                                        <input
                                            className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                            placeholder={`Specific name of ${activeTab}...`}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    {activeTab === 'projects' ? (
                                        <>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Technology Pipeline</label>
                                                <input
                                                    className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                                    placeholder="React, Firebase, Tailwind..."
                                                    value={formData.tech}
                                                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Repo Access</label>
                                                    <input
                                                        className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                                        placeholder="GitHub URL..."
                                                        value={formData.github}
                                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Deployment</label>
                                                    <input
                                                        className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                                        placeholder="Live URL..."
                                                        value={formData.live}
                                                        onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Organization</label>
                                                <input
                                                    className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                                    placeholder="Issuing body..."
                                                    value={formData.issuer}
                                                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Timeline</label>
                                                <input
                                                    className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold placeholder:text-sky-300"
                                                    placeholder="Certification date..."
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] ml-1">Context / Description</label>
                                        <textarea
                                            rows="4"
                                            className="w-full bg-sky-50/50 border border-sky-100 rounded-2xl px-6 py-4 text-sky-950 focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none font-bold placeholder:text-sky-300"
                                            placeholder="Write a brief overview..."
                                            value={formData.desc}
                                            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 pb-4">
                                    <button
                                        disabled={loading}
                                        onClick={() => { setShowAddForm(false); setEditId(null); setPreviewImage(null); }}
                                        className="flex-1 py-4 border border-sky-100 text-sky-600 font-bold rounded-2xl hover:bg-sky-50 transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={handleSave}
                                        className="flex-1 py-4 bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:bg-sky-400 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Processing...' : (editId ? 'Commit Update' : 'Publish Content')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Preview Modal */}
            <AnimatePresence>
                {selectedPreview && (
                    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPreview(null)}
                            className="absolute inset-0 bg-sky-950/70 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden border border-sky-100 max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedPreview(null)}
                                className="absolute top-5 right-5 p-2 bg-white/90 backdrop-blur-xl text-sky-950 hover:text-red-500 hover:rotate-90 rounded-full transition-all duration-300 shadow-xl z-[110] border border-sky-100"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-full md:w-3/5 bg-sky-50 flex items-center justify-center p-6 min-h-[300px]">
                                {selectedPreview.image ? (
                                    <img
                                        src={selectedPreview.image}
                                        alt={selectedPreview.name}
                                        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-sky-200">
                                        {selectedPreview.type === 'projects' ? <ImageIcon size={80} strokeWidth={1} /> : <Award size={80} strokeWidth={1} />}
                                        <p className="mt-4 font-bold text-sky-400/50 uppercase tracking-widest text-xs">No Asset Preview</p>
                                    </div>
                                )}
                            </div>

                            <div className="w-full md:w-2/5 p-8 pt-12 md:pt-8 flex flex-col justify-center bg-white border-l border-sky-50">
                                <div className="space-y-6">
                                    <div>
                                        <div className="inline-flex items-center space-x-2 text-sky-500 mb-2">
                                            {selectedPreview.type === 'projects' ? <Briefcase size={16} /> : <Award size={16} />}
                                            <span className="text-[10px] font-black uppercase tracking-widest">{selectedPreview.type === 'projects' ? 'Project' : 'Certificate'} Detail</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-sky-950 leading-tight">
                                            {selectedPreview.name}
                                        </h3>
                                        <p className="text-sky-500 font-bold mt-1">
                                            {selectedPreview.type === 'projects' ? (selectedPreview.tech?.join(', ')) : (`${selectedPreview.issuer} • ${selectedPreview.date}`)}
                                        </p>
                                    </div>

                                    {selectedPreview.desc && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Description</label>
                                            <div className="text-sky-950/70 font-medium leading-relaxed bg-sky-50/50 p-4 rounded-2xl border border-sky-100 max-h-40 overflow-y-auto text-sm custom-scrollbar">
                                                {selectedPreview.desc}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                const item = selectedPreview;
                                                setSelectedPreview(null);
                                                handleEdit(item);
                                            }}
                                            className="flex-1 py-4 bg-sky-50 text-sky-600 font-black rounded-2xl hover:bg-sky-100 transition-all text-xs uppercase tracking-widest"
                                        >
                                            Edit Data
                                        </button>
                                        <button
                                            onClick={() => setSelectedPreview(null)}
                                            className="flex-1 py-4 bg-sky-500 text-white font-black rounded-2xl shadow-xl shadow-sky-500/20 hover:bg-sky-400 transition-all text-xs uppercase tracking-widest"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPanel;
