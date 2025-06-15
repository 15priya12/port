'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const IMAGE_COUNT = 8;
const IMAGES = Array.from({ length: IMAGE_COUNT }, (_, i) => `/tiles/${i + 1}.png`);

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const initializeGame = () => {
    const cardPairs = [...IMAGES, ...IMAGES]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({
        id: index,
        value: img,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedId) ||
      cards[clickedId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedId];
    setFlippedCards(newFlippedCards);

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === clickedId ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.value === secondCard.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameOver(true);
      if (confettiRef.current) {
        confettiRef.current.classList.remove('opacity-0');
        confettiRef.current.classList.add('opacity-100');
        setTimeout(() => {
          if (confettiRef.current) confettiRef.current.classList.add('opacity-0');
        }, 2500);
      }
    }
  }, [cards]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-200 via-pink-100 to-purple-200 opacity-80" />

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Memory Match</h1>
        <p className="text-xl text-gray-600">Moves: {moves}</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-2xl">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-20 h-20 rounded-xl transform transition-all duration-300 flex items-center justify-center shadow-lg border border-white/40 backdrop-blur-md
              ${card.isFlipped || card.isMatched
                ? 'bg-white'
                : 'bg-gradient-to-br from-white/60 via-purple-100 to-pink-100 hover:from-white/80 hover:to-purple-200'}
            `}
            style={{ boxShadow: card.isFlipped || card.isMatched ? '0 4px 24px 0 rgba(80,80,120,0.10)' : '0 4px 24px 0 rgba(120,80,180,0.15)' }}
            disabled={card.isMatched}
          >
            {card.isFlipped || card.isMatched ? (
              <Image src={card.value} alt="tile" width={48} height={48} className="object-contain" />
            ) : (
              <span className="text-purple-400 text-3xl font-bold drop-shadow">?</span>
            )}
          </button>
        ))}
      </div>

      {gameOver && (
        <>
          {/* Confetti Animation */}
          <div ref={confettiRef} className="pointer-events-none fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-700 opacity-0">
            {[...Array(40)].map((_, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60 + 10}%`,
                  fontSize: `${Math.random() * 1.5 + 1}rem`,
                  color: [
                    '#a78bfa', '#f472b6', '#facc15', '#34d399', '#60a5fa', '#f87171', '#fbbf24', '#38bdf8', '#f472b6', '#a3e635'
                  ][i % 10],
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                {['🎉','✨','🎊','💜','💖','⭐','💎','🎈','🥳','🌈'][i % 10]}
              </span>
            ))}
          </div>
          {/* Win Modal Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl px-10 py-10 max-w-md w-full mx-4 flex flex-col items-center border border-white/40">
              <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent text-center drop-shadow-lg">
                🎉 Congratulations! 
              </h2>
              <p className="text-lg text-gray-700 mb-8 text-center">You won in <span className="font-bold text-purple-500">{moves}</span> moves!</p>
              <button
                onClick={initializeGame}
                className="px-8 py-3 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 text-white rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-bounce"
              >
                <span className="inline-block mr-2">🔄</span> Play Again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* Add this to your global CSS or tailwind config for animation */
/*
@keyframes gradient-move {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-move 8s ease-in-out infinite;
}
*/