'use client';

import { useState, useEffect } from 'react';
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
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Congratulations! You won in {moves} moves!
          </h2>
          <button
            onClick={initializeGame}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Play Again
          </button>
        </div>
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