import Link from 'next/link';
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container" style={styles.container}>
                <div style={styles.info}>
                    <Link href="/" style={styles.logo}>
                        <Sparkles className="gradient-text" style={{ marginRight: '8px' }} />
                        <span className="gradient-text" style={{ fontWeight: '800', fontSize: '1.5rem' }}>AIBlog</span>
                    </Link>
                    <p style={styles.description}>
                        Empowering creators with AI-driven content generation. Build your blog with speed and style.
                    </p>
                    <div style={styles.socials}>
                        <Twitter size={20} />
                        <Github size={20} />
                        <Linkedin size={20} />
                    </div>
                </div>

                <div style={styles.grid}>
                    <div>
                        <h4 style={styles.title}>Product</h4>
                        <ul style={styles.list}>
                            <li><Link href="/workspace">Generator</Link></li>
                            <li><Link href="/#features">Features</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={styles.title}>Resources</h4>
                        <ul style={styles.list}>
                            <li><Link href="/blogs">Blog</Link></li>
                            <li><Link href="/docs">Documentation</Link></li>
                            <li><Link href="/help">Help Center</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={styles.title}>Legal</h4>
                        <ul style={styles.list}>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container" style={styles.bottom}>
                <p>&copy; 2026 AIBlog Generator. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'var(--card-bg)',
        borderTop: '1px solid var(--glass-border)',
        padding: '4rem 0 2rem',
        marginTop: '4rem',
        backdropFilter: 'blur(10px)'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '3rem'
    },
    info: {
        flex: '1 1 300px'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
        textDecoration: 'none'
    },
    description: {
        maxWidth: '300px',
        color: 'var(--text-secondary)',
        marginBottom: '1.5rem'
    },
    socials: {
        display: 'flex',
        gap: '1.5rem',
        color: 'var(--text-secondary)'
    },
    grid: {
        display: 'flex',
        gap: '4rem',
        flexWrap: 'wrap'
    },
    title: {
        marginBottom: '1.5rem',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: 'var(--text-primary)'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        color: 'var(--text-secondary)'
    },
    bottom: {
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
    }
};

export default Footer;
