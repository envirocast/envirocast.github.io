'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Brain } from 'lucide-react';

interface GameState {
  score: number;
  level: number;
  streak: number;
  timeLeft: number;
  currentPrediction: number | null;
  actualValue: number;
  isGameActive: boolean;
  history: Array<{ predicted: number; actual: number; accuracy: number }>;
}

export const PredictionGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    streak: 0,
    timeLeft: 30,
    currentPrediction: null,
    actualValue: 35,
    isGameActive: false,
    history: []
  });

  const [selectedPrediction, setSelectedPrediction] = useState<number>(35);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.isGameActive && gameState.timeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
          actualValue: Math.max(0, Math.min(100, prev.actualValue + (Math.random() - 0.5) * 10))
        }));
      }, 1000);
    } else if (gameState.timeLeft === 0) {
      setGameState(prev => ({ ...prev, isGameActive: false }));
    }

    return () => clearInterval(interval);
  }, [gameState.isGameActive, gameState.timeLeft]);

  const startGame = () => {
    setGameState({
      score: 0,
      level: 1,
      streak: 0,
      timeLeft: 30,
      currentPrediction: null,
      actualValue: Math.random() * 100,
      isGameActive: true,
      history: []
    });
  };

  const submitPrediction = () => {
    const accuracy = 100 - Math.abs(selectedPrediction - gameState.actualValue);
    const points = Math.floor(accuracy * gameState.level);
    const newStreak = accuracy > 80 ? gameState.streak + 1 : 0;

    setGameState(prev => ({
      ...prev,
      score: prev.score + points,
      streak: newStreak,
      level: Math.floor(prev.score / 500) + 1,
      currentPrediction: selectedPrediction,
      history: [...prev.history, { predicted: selectedPrediction, actual: prev.actualValue, accuracy }]
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentPrediction: null,
        actualValue: Math.max(0, Math.min(100, prev.actualValue + (Math.random() - 0.5) * 15))
      }));
    }, 2000);
  };

  const getAIRecommendation = () => {
    // Simulate quantum-enhanced AI recommendation
    const trend = gameState.history.slice(-3).map(h => h.actual);
    const avgTrend = trend.length > 1 ? trend.reduce((a, b) => a + b, 0) / trend.length : gameState.actualValue;
    return Math.max(0, Math.min(100, avgTrend + (Math.random() - 0.5) * 5));
  };

  const aiRecommendation = getAIRecommendation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{gameState.score}</div>
            <p className="text-sm text-gray-600">Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{gameState.streak}</div>
            <p className="text-sm text-gray-600">Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">L{gameState.level}</div>
            <p className="text-sm text-gray-600">Level</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{gameState.timeLeft}s</div>
            <Progress value={(gameState.timeLeft / 30) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Air Quality Prediction Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!gameState.isGameActive ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 mb-6">
                Test your prediction skills against our quantum-enhanced AI. 
                Predict the PM2.5 levels and see how you compare!
              </p>
              <Button size="lg" onClick={startGame} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Start Game
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Current PM2.5 Level</h3>
                <motion.div
                  key={gameState.actualValue}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-bold text-blue-600 mb-4"
                >
                  {gameState.actualValue.toFixed(1)}
                </motion.div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  μg/m³
                </Badge>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Your Prediction:</h4>
                  <div className="text-lg font-bold">{selectedPrediction}</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={selectedPrediction}
                  onChange={(e) => setSelectedPrediction(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0 (Good)</span>
                  <span>50 (Moderate)</span>
                  <span>100 (Hazardous)</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">AI Recommendation:</span>
                  <span className="font-bold text-blue-600">{aiRecommendation.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Based on quantum-enhanced pattern analysis
                </p>
              </div>

              <Button
                onClick={submitPrediction}
                disabled={gameState.currentPrediction !== null}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                size="lg"
              >
                {gameState.currentPrediction !== null ? 'Processing...' : 'Submit Prediction'}
              </Button>

              {gameState.currentPrediction !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-blue-200 p-4 rounded-lg"
                >
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">Result</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Your Prediction</p>
                        <p className="font-bold">{gameState.currentPrediction}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actual Value</p>
                        <p className="font-bold">{gameState.actualValue.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Accuracy</p>
                        <p className="font-bold text-green-600">
                          {(100 - Math.abs(gameState.currentPrediction - gameState.actualValue)).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
