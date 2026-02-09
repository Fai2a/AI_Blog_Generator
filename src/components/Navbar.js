'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, LayoutDashboard, Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Blogs', href: '/blogs', icon: Library },
    { name: 'Workspace', href: '/workspace', icon: LayoutDashboard },
  ];

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: scrolled ? 'var(--nav-bg)' : 'transparent',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
    padding: '1rem 0',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={navStyle} className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.5rem', color: 'var(--foreground)' }}>
          <Sparkles className="gradient-text" />
          <span className="gradient-text">AIBlog</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="nav-actions">
          <div style={{ display: 'flex', gap: '2rem', marginRight: '1rem' }} className="nav-links hidden-mobile">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.name} href={link.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}>
                  {link.icon && <link.icon size={18} />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          <button
            onClick={toggleTheme}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'all 0.2s ease',
              width: '40px',
              height: '40px'
            }}
            aria-label="Toggle Theme"
          >
            {mounted ? (theme === 'light' ? <Moon size={20} /> : <Sun size={20} />) : <div style={{ width: 20, height: 20 }} />}
          </button>

          <Link href="/workspace" className="btn btn-primary hidden-mobile">
            Start Writing
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              padding: '0.5rem',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--nav-bg)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--nav-border)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: '1.1rem',
                      fontWeight: '500',
                      color: isActive ? 'var(--primary)' : 'var(--text-primary)'
                    }}
                  >
                    {link.icon && <link.icon size={20} />}
                    {link.name}
                  </Link>
                );
              })}
              <Link href="/workspace" className="btn btn-primary" style={{ width: '100%' }}>
                Start Writing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
                @media (max-width: 768px) {
                    .hidden-mobile {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: flex !important;
                    }
                }
            `}</style>
    </nav>
  );
};

export default Navbar;

