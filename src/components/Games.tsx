'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const controls = useAnimation();

  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'Classic snake game with a modern twist',
      color: '#FF6B6B',
      icon: '🐍',
      gradient: 'from-pink-100 to-orange-100',
    },
    {
      id: 'memory',
      name: 'Memory Match',
      description: 'Test your memory with this card matching game',
      color: '#4ECDC4',
      icon: '🎴',
      gradient: 'from-cyan-100 to-teal-100',
    },
    {
      id: 'tetris',
      name: 'Tetris',
      description: 'The classic block-stacking puzzle game',
      color: '#45B7D1',
      icon: '🧊',
      gradient: 'from-blue-100 to-indigo-100',
    },
  ];

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return (
    <section id="games" className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden py-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={controls}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50/50 to-blue-50/50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Play & Explore
          </h2>
          <p className="text-xl text-gray-600">
            Take a break and enjoy some fun games!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, -2, 0],
                transition: { duration: 0.5 }
              }}
              className="relative group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${game.gradient} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div 
                className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl overflow-hidden cursor-pointer"
                onClick={() => setActiveGame(game.id)}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${game.gradient} rounded-full blur-2xl opacity-50`} />
                
                <div className="relative z-10">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{game.name}</h3>
                  <p className="text-gray-600 mb-6">{game.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 bg-gradient-to-r ${game.gradient} text-gray-900 rounded-full font-medium hover:shadow-lg transition-all duration-300`}
                  >
                    Play Now
                  </motion.button>
                </div>

                {/* Interactive Elements */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${game.gradient} rounded-full opacity-30`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Preview Modal */}
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveGame(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {games.find(g => g.id === activeGame)?.name}
                </h3>
                <button
                  onClick={() => setActiveGame(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="aspect-video bg-gray-50 rounded-xl mb-6 flex items-center justify-center border border-gray-100">
                <p className="text-gray-500">Game Preview Coming Soon!</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                {games.find(g => g.id === activeGame)?.description}
              </p>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r ${games.find(g => g.id === activeGame)?.gradient} text-gray-900 rounded-full font-medium hover:shadow-lg transition-all duration-300`}
                >
                  Launch Game
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Games; 