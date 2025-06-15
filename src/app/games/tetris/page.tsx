'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 20;
const DROP_INTERVAL = 200; // ms

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
];

const COLORS = [
  'from-cyan-400 to-cyan-600',
  'from-yellow-400 to-yellow-600',
  'from-purple-400 to-purple-600',
  'from-orange-400 to-orange-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-red-400 to-red-600',
];

export default function TetrisGame() {
  const [board, setBoard] = useState<number[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<{ shape: number[][]; color: string; x: number; y: number } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const checkLines = useCallback((newBoard: number[][]) => {
    let linesCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every(cell => cell === 1)) {
        newBoard.splice(row, 1);
        newBoard.unshift(Array(BOARD_WIDTH).fill(0));
        linesCleared++;
        row++;
      }
    }
    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
      setBoard(newBoard);
    }
  }, []);

  const initializeBoard = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    spawnNewPiece();
  }, []);

  const spawnNewPiece = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SHAPES.length);
    const newPiece = {
      shape: SHAPES[randomIndex],
      color: COLORS[randomIndex],
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(SHAPES[randomIndex][0].length / 2),
      y: 0,
    };
    setCurrentPiece(newPiece);
  }, []);

  const checkCollision = useCallback((piece: typeof currentPiece, x: number, y: number) => {
    if (!piece) return true;
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = x + col;
          const newY = y + row;
          if (
            newX < 0 ||
            newX >= BOARD_WIDTH ||
            newY >= BOARD_HEIGHT ||
            (newY >= 0 && board[newY][newX])
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board]);

  const mergePiece = useCallback(() => {
    if (!currentPiece) return;
    const newBoard = board.map(row => [...row]);
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const y = currentPiece.y + row;
          const x = currentPiece.x + col;
          if (y >= 0) {
            newBoard[y][x] = 1;
          }
        }
      }
    }
    setBoard(newBoard);
    checkLines(newBoard);
    spawnNewPiece();
  }, [currentPiece, board, checkLines]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver || isPaused) return;
    const newX = currentPiece.x + dx;
    const newY = currentPiece.y + dy;
    if (!checkCollision(currentPiece, newX, newY)) {
      setCurrentPiece({ ...currentPiece, x: newX, y: newY });
    } else if (dy > 0) {
      mergePiece();
    }
  }, [currentPiece, gameOver, isPaused, checkCollision, mergePiece]);

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotated = currentPiece.shape[0].map((_, i) =>
      currentPiece.shape.map(row => row[i]).reverse()
    );
    if (!checkCollision({ ...currentPiece, shape: rotated }, currentPiece.x, currentPiece.y)) {
      setCurrentPiece({ ...currentPiece, shape: rotated });
    }
  }, [currentPiece, gameOver, isPaused, checkCollision]);

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePiece]);

  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, DROP_INTERVAL);
    return () => clearInterval(interval);
  }, [gameOver, isPaused, movePiece]);

  useEffect(() => {
    if (currentPiece && checkCollision(currentPiece, currentPiece.x, currentPiece.y)) {
      setGameOver(true);
    }
  }, [currentPiece, checkCollision]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Tetris
        </h1>
        <p className="text-xl text-gray-300">Score: {score}</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-white/10 p-4"
      >
        <div
          className="relative bg-gray-900/50 rounded-xl overflow-hidden"
          style={{
            width: BOARD_WIDTH * BLOCK_SIZE,
            height: BOARD_HEIGHT * BLOCK_SIZE,
          }}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          {/* Board */}
          {board.map((row, y) =>
            row.map((cell, x) => (
              cell === 1 && (
                <motion.div
                  key={`${y}-${x}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bg-gradient-to-br from-purple-500 to-pink-500 rounded-sm shadow-lg"
                  style={{
                    width: BLOCK_SIZE - 2,
                    height: BLOCK_SIZE - 2,
                    left: x * BLOCK_SIZE,
                    top: y * BLOCK_SIZE,
                  }}
                />
              )
            ))
          )}

          {/* Current Piece */}
          {currentPiece && currentPiece.shape.map((row, y) =>
            row.map((cell, x) => (
              cell === 1 && (
                <motion.div
                  key={`piece-${y}-${x}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute bg-gradient-to-br ${currentPiece.color} rounded-sm shadow-lg`}
                  style={{
                    width: BLOCK_SIZE - 2,
                    height: BLOCK_SIZE - 2,
                    left: (currentPiece.x + x) * BLOCK_SIZE,
                    top: (currentPiece.y + y) * BLOCK_SIZE,
                  }}
                />
              )
            ))
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-gray-800 rounded-2xl p-8 text-center max-w-md mx-4"
            >
              <h2 className="text-3xl font-bold text-purple-400 mb-4">Game Over!</h2>
              <p className="text-gray-300 mb-6">Final Score: {score}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeBoard}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Play Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-gray-300"
      >
        <h3 className="text-lg font-semibold mb-2">Controls:</h3>
        <p>← → : Move</p>
        <p>↑ : Rotate</p>
        <p>↓ : Drop</p>
        <p>Space : Pause</p>
      </motion.div>
    </div>
  );
} 