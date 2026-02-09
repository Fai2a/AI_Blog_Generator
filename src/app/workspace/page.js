'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Loader2,
    FileText,
    Save,
    Share,
    Edit3,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { generateBlog } from '@/lib/ai';

export default function Workspace() {
    const [loading, setLoading] = useState(false);
    const [generatedBlog, setGeneratedBlog] = useState(null);
    const [formData, setFormData] = useState({
        topic: '',
        tone: 'Professional',
        audience: 'Beginners',
        keywords: '',
        wordCount: '800'
    });
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!formData.topic) {
            showToast('Please enter a blog topic', 'error');
            return;
        }

        setLoading(true);
        setGeneratedBlog(null);

        try {
            const result = await generateBlog(formData);
            setGeneratedBlog(result);
            showToast('Blog generated successfully!');
        } catch (error) {
            showToast('Failed to generate blog', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        showToast('Draft saved to your library');
    };

    return (
        <div className="container section-padding" style={{ maxWidth: '1400px' }}>
            <div style={styles.header}>
                <h1 className="gradient-text">Creator Workspace</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Your AI-powered content engine. Configure and generate in seconds.</p>
            </div>

            <div style={styles.layout}>
                {/* Input Panel */}
                <aside style={styles.inputPanel} className="glass-card">
                    <form onSubmit={handleGenerate}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Blog Topic / Title</label>
                            <input
                                name="topic"
                                value={formData.topic}
                                onChange={handleInputChange}
                                placeholder="e.g. The future of sustainable energy"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.row}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tone</label>
                                <select name="tone" value={formData.tone} onChange={handleInputChange} style={styles.select}>
                                    <option value="Professional">Professional</option>
                                    <option value="Witty">Witty</option>
                                    <option value="Educational">Educational</option>
                                    <option value="Inspirational">Inspirational</option>
                                    <option value="Controversial">Controversial</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Audience</label>
                                <select name="audience" value={formData.audience} onChange={handleInputChange} style={styles.select}>
                                    <option value="Beginners">Beginners</option>
                                    <option value="Experts">Experts</option>
                                    <option value="General Public">General Public</option>
                                    <option value="Business Owners">Business Owners</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Keywords (comma separated)</label>
                            <input
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleInputChange}
                                placeholder="e.g. solar power, green-tech, 2026"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Target Word Count: {formData.wordCount}</label>
                            <input
                                type="range"
                                name="wordCount"
                                min="300"
                                max="2500"
                                step="100"
                                value={formData.wordCount}
                                onChange={handleInputChange}
                                style={styles.range}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={styles.generateBtn}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                            {loading ? 'Generating...' : 'Generate Blog Post'}
                        </button>
                    </form>
                </aside>

                {/* Output Panel */}
                <main style={styles.outputPanel} className="glass-card">
                    <AnimatePresence mode="wait">
                        {!loading && !generatedBlog && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={styles.emptyState}
                            >
                                <div style={styles.emptyIcon}>
                                    <FileText size={48} color="var(--text-muted)" />
                                </div>
                                <h3 style={{ color: 'var(--text-primary)' }}>Your AI Content Will Appear Here</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>Fill in the details on the left to get started.</p>
                            </motion.div>
                        )}

                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={styles.loadingState}
                            >
                                <div className="flex-center" style={{ flexDirection: 'column' }}>
                                    <div style={styles.spinnerWrapper}>
                                        <div style={styles.spinner}></div>
                                        <Sparkles className="spinner-sparkle" size={32} color="var(--primary)" />
                                    </div>
                                    <h3 style={{ color: 'var(--text-primary)' }}>Brewing your content...</h3>
                                    <p style={{ color: 'var(--text-secondary)' }}>Our AI is researching and writing your post.</p>
                                </div>
                            </motion.div>
                        )}

                        {!loading && generatedBlog && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={styles.resultView}
                            >
                                <div style={styles.resultActions}>
                                    <div>
                                        <h2 style={{ color: 'var(--text-primary)' }}>{generatedBlog.title}</h2>
                                        <div style={styles.wordBadge}>
                                            <FileText size={14} /> {generatedBlog.metadata.wordCount} Words
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => showToast('Editing enabled')} style={styles.actionBtn}><Edit3 size={18} /></button>
                                        <button onClick={handleSave} style={styles.actionBtn}><Save size={18} /></button>
                                        <button onClick={() => showToast('Published!')} style={{ ...styles.actionBtn, background: 'var(--primary)', color: 'white', borderColor: 'transparent' }}>
                                            <Share size={18} /> Publish
                                        </button>
                                    </div>
                                </div>

                                <div
                                    style={styles.blogContent}
                                    dangerouslySetInnerHTML={{ __html: generatedBlog.content }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{
                            ...styles.toast,
                            background: toast.type === 'error' ? 'var(--accent)' : 'var(--primary)'
                        }}
                    >
                        {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .spinner-sparkle {
          position: absolute;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
        </div>
    );
}

const styles = {
    header: {
        marginBottom: '3rem'
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        minHeight: '700px'
    },
    inputPanel: {
        padding: '2rem',
        height: 'fit-content'
    },
    outputPanel: {
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px'
    },
    formGroup: {
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--text-secondary)'
    },
    input: {
        padding: '0.75rem 1rem',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        outline: 'none',
        transition: 'border-color 0.2s ease',
        fontSize: '1rem'
    },
    select: {
        padding: '0.75rem 1rem',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        outline: 'none',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
    },
    range: {
        width: '100%',
        accentColor: 'var(--primary)',
        cursor: 'pointer'
    },
    generateBtn: {
        width: '100%',
        justifyContent: 'center',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '1.1rem'
    },
    emptyState: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem'
    },
    emptyIcon: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'var(--card-bg)', // corrected from rgba
        border: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
    },
    loadingState: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    spinnerWrapper: {
        position: 'relative',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem'
    },
    spinner: {
        width: '100%',
        height: '100%',
        border: '4px solid rgba(59, 130, 246, 0.1)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    resultView: {
        flex: 1,
        padding: '3rem',
        overflowY: 'auto'
    },
    resultActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '3rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid var(--glass-border)',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    wordBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.25rem 0.75rem',
        background: 'rgba(59, 130, 246, 0.1)',
        color: 'var(--primary)',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.8rem',
        fontWeight: '600',
        marginTop: '0.5rem'
    },
    actionBtn: {
        padding: '0.6rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        color: 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    blogContent: {
        color: 'var(--text-secondary)',
        lineHeight: '1.8'
        // Removed & h2 overrides to use theme defaults
    },
    toast: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: 1000
    }
};
