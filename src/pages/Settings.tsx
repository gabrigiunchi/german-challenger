import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, Swords } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState<'noun' | 'verb'>('verb');
  const [difficulty, setDifficulty] = React.useState<'easy' | 'medium' | 'hard'>('medium');

  const handleStartGame = () => {
    navigate(`/game?category=${category}&difficulty=${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Learn German</h1>
          </div>
          <p className="text-gray-600">Choose your learning preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Category</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCategory('noun')}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  category === 'noun'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <BookOpen size={24} />
                <span>Nouns</span>
              </button>
              <button
                onClick={() => setCategory('verb')}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  category === 'verb'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Swords size={24} />
                <span>Verbs</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Difficulty</h2>
            <div className="grid grid-cols-3 gap-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`p-4 rounded-lg capitalize transition-colors ${
                    difficulty === level
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  );
}