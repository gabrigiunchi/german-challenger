import React from 'react';

interface GameControlsProps {
  score: number;
  totalQuestions: number;
  onNextWord: () => void;
  hasAnswer: boolean;
}

export function GameControls({
  score,
  totalQuestions,
  onNextWord,
  hasAnswer,
}: GameControlsProps) {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-4">
        <div className="text-lg font-semibold">
          Score: {score}/{totalQuestions}
        </div>
        {hasAnswer && (
          <button
            onClick={onNextWord}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Next Word →
          </button>
        )}
      </div>
    </div>
  );
}