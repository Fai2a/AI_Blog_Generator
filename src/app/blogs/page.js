'use client';

import { useState } from 'react';
import { BLOGS } from '@/lib/mockData';
import { Search, Calendar, User, Clock, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BlogsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'AI', 'SEO', 'Business', 'Development', 'Marketing'];

    const filteredBlogs = BLOGS.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container section-padding">
            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 className="gradient-text">Our Latest Articles</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Explore the latest insights on AI, marketing, and business growth.</p>
            </div>

            {/* Search and Filter Bar */}
            <div style={styles.searchBar}>
                <div style={styles.inputContainer}>
                    <Search size={20} style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.categories}>
                    <Filter size={18} style={{ marginRight: '8px', color: 'var(--text-muted)' }} />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                ...styles.catBtn,
                                background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                                color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--card-border)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid-cols-3">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card"
                            style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={styles.imgContainer}>
                                <img src={blog.image} alt={blog.title} style={styles.cardImg} />
                                <div style={styles.categoryBadge}>{blog.category}</div>
                            </div>
                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={styles.meta}>
                                    <span style={styles.metaItem}><User size={14} /> {blog.author}</span>
                                    <span style={styles.metaItem}><Calendar size={14} /> {blog.date}</span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', height: '3rem', overflow: 'hidden', color: 'var(--text-primary)' }}>
                                    {blog.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, color: 'var(--text-secondary)' }}>
                                    {blog.description}
                                </p>
                                <Link href={`/blogs/${blog.slug}`} style={styles.readMore}>
                                    Read Experience <ChevronRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>
                        <h3 style={{ color: 'var(--text-primary)' }}>No articles found matching your criteria.</h3>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div style={styles.pagination}>
                <button style={styles.pageBtn} disabled>&laquo;</button>
                <button style={{ ...styles.pageBtn, background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' }}>1</button>
                <button style={styles.pageBtn}>2</button>
                <button style={styles.pageBtn}>3</button>
                <button style={styles.pageBtn}>&raquo;</button>
            </div>
        </div>
    );
}

const styles = {
    searchBar: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        padding: '1.5rem',
        background: 'var(--card-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--card-border)',
        backdropFilter: 'blur(10px)'
    },
    inputContainer: {
        position: 'relative',
        flex: '1 1 300px'
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--text-muted)'
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem 0.75rem 3rem',
        background: 'transparent',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-primary)',
        outline: 'none',
        fontSize: '1rem'
    },
    categories: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
    },
    catBtn: {
        padding: '0.4rem 1rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.85rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        border: '1px solid var(--card-border)',
        cursor: 'pointer'
    },
    imgContainer: {
        position: 'relative',
        height: '200px',
        width: '100%'
    },
    cardImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    categoryBadge: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'var(--primary)',
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: '600'
    },
    meta: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
    },
    metaItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem'
    },
    readMore: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: 'var(--primary)',
        fontWeight: '600',
        fontSize: '0.9rem',
        marginTop: 'auto'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '4rem'
    },
    pageBtn: {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        fontWeight: '600',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    }
};
