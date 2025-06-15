'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'projects', 'experience', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'Projects', href: '#projects', icon: '💻' },
    { name: 'Experience', href: '#experience', icon: '📚' },
    { name: 'Contact', href: '#contact', icon: '📧' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Navigation items in a unique layout */}
          <div className="hidden md:flex items-center justify-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
              >
                <motion.a
                  href={item.href}
                  className={`relative group px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-pink-600'
                      : 'text-gray-600 hover:text-pink-500'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {item.icon}
                  </motion.span>
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
                {index < navItems.length - 1 && (
                  <span className="text-gray-300 mx-2">•</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-pink-500 focus:outline-none relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{
                rotate: isMobileMenuOpen ? 180 : 0,
                scale: isMobileMenuOpen ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/80 backdrop-blur-lg shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                    activeSection === item.href.slice(1)
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-gray-600 hover:text-pink-500 hover:bg-pink-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 