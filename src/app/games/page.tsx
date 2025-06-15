import Link from 'next/link';

export default function GamesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Choose a Game</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link 
          href="/games/snake"
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-2">Snake Game</h2>
          <p className="text-gray-600">
            Classic Snake game - use arrow keys to control the snake and eat the food to grow!
          </p>
        </Link>
        
        <Link 
          href="/games/memory"
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
          <p className="text-gray-600">
            Test your memory by matching pairs of cards. Find all pairs to win!
          </p>
        </Link>

        <Link 
          href="/games/tetris"
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-2xl font-bold mb-2">Tetris</h2>
          <p className="text-gray-600">
            The classic block-stacking puzzle game. Clear lines to score points!
          </p>
        </Link>
      </div>
    </div>
  );
} 