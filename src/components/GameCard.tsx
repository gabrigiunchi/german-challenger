import React, {useEffect} from 'react';
import {CheckCircle2, XCircle} from 'lucide-react';

interface GameCardProps {
  germanWord: string;
  options: string[];
  onSelect: (answer: string) => void;
  isCorrect: boolean | null;
  selectedAnswer: string | null;
  correctAnswer: string;
  onNextWord: () => void;
}

export function GameCard({
  germanWord,
  options,
  onSelect,
  isCorrect,
  selectedAnswer,
  correctAnswer,
  onNextWord
}: GameCardProps) {
  useEffect(() => {
    if (isCorrect) {
      const timer = setTimeout(() => {
        onNextWord();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, onNextWord]);

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">{germanWord}</h2>
        <p className="text-sm text-gray-500 mt-2">Select the correct translation</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => !selectedAnswer && onSelect(option)}
            className={`w-full p-4 text-left rounded-lg transition-all ${selectedAnswer
              ? option === correctAnswer
                ? 'bg-green-100 border-green-500'
                : option === selectedAnswer
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-100 opacity-50'
              : 'bg-gray-100 hover:bg-gray-200'
              } ${selectedAnswer ? 'cursor-default' : 'cursor-pointer'
              }`}
            disabled={!!selectedAnswer}
          >
            {option}
            {selectedAnswer && option === correctAnswer && (
              <CheckCircle2 className="float-right text-green-500" size={20} />
            )}
            {selectedAnswer && option === selectedAnswer && option !== correctAnswer && (
              <XCircle className="float-right text-red-500" size={20} />
            )}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className={`text-center p-3 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {isCorrect ? 'Correct! 🎉' : `Incorrect. The correct answer was "${correctAnswer}"`}
        </div>
      )}
    </div>
  );
}
