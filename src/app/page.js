'use client';

import { motion } from 'framer-motion';
import { Rocket, Zap, Search, Globe, ChevronRight, PenTool, Share2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const features = [
        {
            title: 'AI Content Generation',
            description: 'Generate long-form, SEO-friendly blog posts based on any topic or keyword in seconds.',
            icon: Zap,
        },
        {
            title: 'SEO Optimization',
            description: 'Built-in SEO tools to ensure your content ranks high on search engines automatically.',
            icon: Search,
        },
        {
            title: 'Customizable Tones',
            description: 'From professional to witty, choose the perfect tone that matches your brand voice.',
            icon: PenTool,
        },
        {
            title: 'One-Click Publish',
            description: 'Export your blogs directly to CMS or social platforms with a single click.',
            icon: Share2,
        },
        {
            title: 'Global Reach',
            description: 'Translate and generate content in over 50+ languages to reach a global audience.',
            icon: Globe,
        },
        {
            title: 'Advanced Analytics',
            description: 'Track how your AI-generated content performs with integrated tracking.',
            icon: TrendingUp,
        }
    ];

    const steps = [
        { title: 'Define Your Topic', description: 'Enter your target keywords and the core idea of your blog post.' },
        { title: 'Choose Style', description: 'Select the tone, target audience, and length of your article.' },
        { title: 'Generate & Refine', description: 'Our AI creates a high-quality draft for you to review and edit.' },
        { title: 'Publish & Grow', description: 'Instantly publish to your blog and watch your traffic grow.' }
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="container section-padding flex-center" style={{ flexDirection: 'column', textAlign: 'center', paddingTop: '8rem' }}>
                <motion.div {...fadeInUp}>
                    <div style={styles.badge}>Next-Gen Content AI</div>
                    <h1 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>
                        Scale Your Content with <br />
                        <span className="gradient-text">Intelligent Automation</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem', color: 'var(--text-secondary)' }}>
                        AIBlog uses cutting-edge AI to help you create high-ranking, engaging blog posts in seconds.
                        Focus on your strategy, let us handle the writing.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/workspace" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Create Your First Blog <ChevronRight size={20} />
                        </Link>
                        <Link href="/blogs" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            See Examples
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={styles.heroVisual}
                >
                    <div style={styles.glowEffect}></div>
                    <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                        alt="Dashboard Preview"
                        style={styles.heroImg}
                    />
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="container section-padding">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="gradient-text">Everything You Need to Succeed</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                        Powerful features designed to streamline your content creation process and improve ROI.
                    </p>
                </div>
                <div className="grid-cols-3">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card"
                        >
                            <div style={styles.iconBox}>
                                <f.icon size={24} color="var(--primary)" />
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="section-padding" style={{ background: 'var(--card-bg)', backdropFilter: 'blur(10px)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 className="gradient-text">How It Works</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>From idea to published post in 4 simple steps.</p>
                    </div>
                    <div style={styles.stepsGrid}>
                        {steps.map((step, i) => (
                            <div key={i} style={styles.stepCard}>
                                <div style={styles.stepNumber}>{i + 1}</div>
                                <h4>{step.title}</h4>
                                <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container section-padding">
                <div className="glass-card" style={styles.ctaCard}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center' }}
                    >
                        <Rocket size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                        <h2>Ready to skyrocket your content?</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: 'var(--text-secondary)' }}>
                            Join 10,000+ marketers and creators who are already using AIBlog to grow their audience.
                        </p>
                        <Link href="/workspace" className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.2rem' }}>
                            Get Started for Free
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

const styles = {
    badge: {
        display: 'inline-block',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(79, 70, 229, 0.1)',
        border: '1px solid rgba(79, 70, 229, 0.2)',
        color: 'var(--primary)',
        fontWeight: '600',
        fontSize: '0.875rem',
        marginBottom: '1.5rem'
    },
    heroVisual: {
        marginTop: '4rem',
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
    },
    glowEffect: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        background: 'var(--primary-glow)',
        borderRadius: '50%',
        zIndex: -1,
        filter: 'blur(80px)',
        opacity: 0.6
    },
    heroImg: {
        width: '100%',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow-lg)'
    },
    iconBox: {
        width: '50px',
        height: '50px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--primary-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: 'var(--primary)'
    },
    stepsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem'
    },
    stepCard: {
        position: 'relative',
        textAlign: 'center',
        background: 'transparent',
    },
    stepNumber: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
        fontWeight: '700',
        fontSize: '1.2rem',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)'
    },
    ctaCard: {
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, var(--card-bg), var(--primary-light))',
        border: '1px solid var(--card-border)',
    }
};
