'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 100;

type Position = { x: number; y: number };
type Direction = { x: number; y: number };

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(() => ({ x: 5, y: 5 }));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);
  const directionRef = useRef<Direction>(direction);

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood());
    setGameOver(false);
    setScore(0);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const currentDirection = directionRef.current;
    
    switch (e.key) {
      case 'ArrowUp':
        if (currentDirection.y !== 1) {
          setDirection({ x: 0, y: -1 });
          directionRef.current = { x: 0, y: -1 };
        }
        break;
      case 'ArrowDown':
        if (currentDirection.y !== -1) {
          setDirection({ x: 0, y: 1 });
          directionRef.current = { x: 0, y: 1 };
        }
        break;
      case 'ArrowLeft':
        if (currentDirection.x !== 1) {
          setDirection({ x: -1, y: 0 });
          directionRef.current = { x: -1, y: 0 };
        }
        break;
      case 'ArrowRight':
        if (currentDirection.x !== -1) {
          setDirection({ x: 1, y: 0 });
          directionRef.current = { x: 1, y: 0 };
        }
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        const currentDirection = directionRef.current;
        
        head.x += currentDirection.x;
        head.y += currentDirection.y;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(prev => prev + 1);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED);

    return () => {
      if (gameLoopRef.current !== null) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [food, gameOver, generateFood]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Snake Game
        </h1>
        <p className="text-xl text-gray-600">Score: {score}</p>
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4"
      >
        <div 
          className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE 
          }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          {/* Food */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="absolute bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg"
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
            }}
          />
          
          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bg-gradient-to-br from-green-400 to-green-500 rounded-sm shadow-md"
              style={{
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
              }}
            />
          ))}
        </div>
      </motion.div>
      
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-4">Game Over!</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Play Again
          </motion.button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Controls:</h3>
        <p className="text-gray-600">
          Use arrow keys to control the snake
        </p>
      </motion.div>
    </div>
  );
} 