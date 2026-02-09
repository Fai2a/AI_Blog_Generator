'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="container flex-center" style={{ minHeight: '70vh', flexDirection: 'column', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <AlertCircle size={80} color="var(--accent)" style={{ marginBottom: '2rem' }} />
                <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ marginBottom: '2rem' }}>Oops! Page Not Found</h2>
                <p style={{ maxWidth: '500px', margin: '0 auto 3rem' }}>
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track to creating amazing content.
                </p>
                <Link href="/" className="btn btn-primary">
                    <Home size={18} /> Return Home
                </Link>
            </motion.div>
        </div>
    );
}
