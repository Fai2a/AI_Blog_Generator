'use client';

// Note: In Next.js App Router, 'page.js' for dynamic routes receives 'params'. 
// However, since we need to use 'use client' for some interactive parts or simply for consistent styling 
// (though this page seems mostly static, the style object approach in this project is mixed).
// Wait, the previous file was 'export default async function', which is a Server Component.
// I should keep it as a Server Component if possible, but the 'styles' object with dynamic theme variables 
// works best if we use CSS classes or if the variables are CSS variables (which they are).
// CSS variables work in Server Components because they are just strings in the class/style attribute.
// ALL 'styles' objects in this project are JS objects passed to style prop. 
// If I use 'var(--...)' in JS styles, it works on both server and client.

// However, I noticed the user's previous code was:
// export default async function BlogDetails({ params }) ...
// and it imported notFound.

// I will keep it as a Server Component.

import { BLOGS } from '@/lib/mockData';
import { Calendar, User, Clock, Share2, ArrowLeft, Twitter, Linkedin, Facebook } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = BLOGS.find(b => b.slug === slug);

    if (!blog) return {};

    return {
        title: `${blog.title} | AIBlog`,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: [blog.image],
        },
    };
}

export default async function BlogDetails({ params }) {
    const { slug } = await params;
    const blog = BLOGS.find(b => b.slug === slug);

    if (!blog) {
        notFound();
    }

    const relatedPosts = BLOGS.filter(b => b.slug !== slug).slice(0, 2);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.description,
        image: blog.image,
        datePublished: new Date(blog.date).toISOString(),
        author: {
            '@type': 'Person',
            name: blog.author,
        },
    };

    return (
        <article className="container section-padding">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Link href="/blogs" style={styles.backLink}>
                <ArrowLeft size={18} /> Back to Blogs
            </Link>

            <div style={styles.header}>
                <div style={styles.badge}>{blog.category}</div>
                <h1 style={styles.title}>{blog.title}</h1>

                <div style={styles.meta}>
                    <div style={styles.authorGroup}>
                        <div style={styles.avatar}>{blog.author[0]}</div>
                        <div>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{blog.author}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Content Creator</div>
                        </div>
                    </div>
                    <div style={styles.metaInfo}>
                        <span style={styles.metaItem}><Calendar size={16} /> {blog.date}</span>
                        <span style={styles.metaItem}><Clock size={16} /> {blog.readTime} read</span>
                    </div>
                </div>
            </div>

            <div style={styles.imageWrapper}>
                <img src={blog.image} alt={blog.title} style={styles.heroImage} />
            </div>

            <div style={styles.layout}>
                <div style={styles.content}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '500', marginBottom: '2rem' }}>
                        {blog.description}
                    </p>

                    <div className="body-content">
                        <h2>The Evolution of Content Creation</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <h3>Why AI Matters in 2026</h3>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <ul>
                            <li>Efficiency at scale</li>
                            <li>Data-driven insights for SEO</li>
                            <li>Multilingual support</li>
                            <li>Personalized content versions</li>
                        </ul>

                        <blockquote>
                            "AI will not replace humans, but humans who use AI will replace those who don't."
                        </blockquote>

                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                    </div>

                    <div style={styles.shareSection}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Share this article</h4>
                        <div style={styles.shareButtons}>
                            <button style={styles.shareBtn}><Twitter size={20} /></button>
                            <button style={styles.shareBtn}><Linkedin size={20} /></button>
                            <button style={styles.shareBtn}><Facebook size={20} /></button>
                            <button style={styles.shareBtn}><Share2 size={20} /></button>
                        </div>
                    </div>
                </div>

                <aside style={styles.sidebar}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Related Posts</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {relatedPosts.map(post => (
                                <Link key={post.slug} href={`/blogs/${post.slug}`} style={styles.relatedCard}>
                                    <img src={post.image} alt={post.title} style={styles.relatedImg} />
                                    <div>
                                        <h4 style={styles.relatedTitle}>{post.title}</h4>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={styles.newsletter}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Newsletter</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Get the latest AI tips delivered to your inbox.</p>
                        <input type="email" placeholder="email@example.com" style={styles.input} />
                        <button className="btn btn-primary" style={{ width: '100%' }}>Subscribe</button>
                    </div>
                </aside>
            </div>
            {/* Global style for this component's inner HTML content to handle theme colors properly */}
            <style>{`
                .body-content h2, .body-content h3 { color: var(--text-primary); margin-top: 2rem; margin-bottom: 1rem; }
                .body-content ul { margin-bottom: 1.5rem; padding-left: 1.5rem; color: var(--text-secondary); }
                .body-content blockquote {
                    border-left: 4px solid var(--primary);
                    padding: 1rem 1.5rem;
                    background: var(--card-bg);
                    font-style: italic;
                    font-size: 1.2rem;
                    margin: 2rem 0;
                    color: var(--text-primary);
                }
            `}</style>
        </article>
    );
}

const styles = {
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
        textDecoration: 'none',
        fontSize: '0.9rem'
    },
    header: {
        maxWidth: '800px',
        marginBottom: '3rem'
    },
    badge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        background: 'var(--primary)',
        color: 'white',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.8rem',
        fontWeight: '600',
        marginBottom: '1rem'
    },
    title: {
        fontSize: '3rem',
        lineHeight: '1.1',
        marginBottom: '2rem',
        color: 'var(--text-primary)'
    },
    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)'
    },
    authorGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        color: 'white'
    },
    metaInfo: {
        display: 'flex',
        gap: '1.5rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    imageWrapper: {
        width: '100%',
        height: '500px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: '4rem'
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    layout: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 350px',
        gap: '4rem'
    },
    content: {
        color: 'var(--text-secondary)',
        lineHeight: '1.8'
    },
    // bodyContent style is handled via <style> tag now for better pseudo-selector support in Server Components
    bodyContent: {
        className: "body-content"
        // Note: styles.bodyContent usage in JSX needs to be replaced with className="body-content"
    },
    shareSection: {
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid var(--glass-border)'
    },
    shareButtons: {
        display: 'flex',
        gap: '1rem'
    },
    shareBtn: {
        width: '40px',
        height: '40px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        background: 'transparent'
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    relatedCard: {
        display: 'flex',
        gap: '1rem',
        textDecoration: 'none',
        transition: 'transform 0.2s ease'
    },
    relatedImg: {
        width: '80px',
        height: '60px',
        borderRadius: 'var(--radius-sm)',
        objectFit: 'cover'
    },
    relatedTitle: {
        fontSize: '0.95rem',
        lineHeight: '1.3',
        marginBottom: '0.25rem',
        color: 'var(--text-primary)'
    },
    newsletter: {
        padding: '2rem',
        textAlign: 'center'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        margin: '1rem 0',
        outline: 'none'
    }
};
