'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [positions, setPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-200 rounded-full"
            initial={pos}
            animate={{
              y: [pos.y, pos.y - 20, pos.y],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Organic Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-pink-100 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-orange-100 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="min-h-[calc(100vh-10rem)] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                Priya Jain
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              Full-Stack Developer & AI Enthusiast
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Diligent full-stack developer and machine-learning enthusiast with a strong passion for artificial intelligence. 
              Proficient in backend/frontend technologies, cloud infrastructure, and AI/ML frameworks. 
              Experienced in developing scalable, AI-driven solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.a
                href="mailto:15priya12jain@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                15priya12jain@gmail.com
              </motion.a>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a
                href="https://linkedin.com/in/15priya-12jain"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </motion.a>
              <motion.a
                href="https://github.com/15priya12"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-1/3"
          >
            <div className="relative w-full h-full">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 border-2 border-pink-200 rounded-full"
              ></motion.div>
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-8 border-2 border-orange-200 rounded-full"
              ></motion.div>
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-16 border-2 border-pink-200 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-pink-200 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-pink-500 rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 