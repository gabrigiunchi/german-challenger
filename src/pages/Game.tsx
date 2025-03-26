import React, {useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import nounsData from '../data/nouns.json';
import verbsData from '../data/verbs.json';
import {Word} from '../types/words';
import {GameCard} from '../components/GameCard';
import {GameControls} from '../components/GameControls';
import {GraduationCap, Settings} from 'lucide-react';

export function Game() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') as 'noun' | 'verb';
  const difficulty = searchParams.get('difficulty') as 'easy' | 'medium' | 'hard';

  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [i, setI] = useState(0);

  const loadWords = (): Word[] => {
    const wordsData = category === 'noun' ? nounsData : verbsData;
    const filteredWords: Word[] = wordsData.words.filter(
      (word) => word.difficulty === difficulty
    );
    filteredWords.sort(() => Math.random());
    return filteredWords;
  };

  const [words, setWords] = useState<Word[]>(loadWords());

  useEffect(() => {
    if (!category || !difficulty) {
      navigate('/settings');
    }
  }, [category, difficulty, navigate]);


  const generateOptions = (correctWord: Word) => {
    const wordsData = category === 'noun' ? nounsData : verbsData;
    const incorrectOptions = wordsData.words
      .filter(
        (word) =>
          word.english !== correctWord.english &&
          word.difficulty === difficulty
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((word) => word.english);

    return [...incorrectOptions, correctWord.english].sort(() => Math.random() - 0.5);
  };

  const nextWord = () => {
    let nextI = i;
    if (nextI === words.length) {
      setWords(loadWords());
      nextI = 0
      setScore(0);
      setTotalQuestions(0);
    }

    const newWord = words[nextI];
    setI(nextI + 1);
    setCurrentWord(newWord);
    setOptions(generateOptions(newWord));
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentWord?.english) {
      setScore((prev) => prev + 1);
    }
    setTotalQuestions((prev) => prev + 1);
  };

  useEffect(() => {
    if (category && difficulty) {
      nextWord();
    }
  }, [category, difficulty]);

  if (!category || !difficulty) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center relative">
          <button
            onClick={() => navigate('/settings')}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
          >
            <Settings size={24} />
          </button>
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-blue-500" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Learn German</h1>
          </div>
          <p className="text-gray-600">Challenge yourself with German vocabulary!</p>
          <p>{words.length} words</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {currentWord && (
            <GameCard
              germanWord={currentWord.german}
              options={options}
              onSelect={handleAnswer}
              isCorrect={selectedAnswer ? selectedAnswer === currentWord.english : null}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentWord.english}
              onNextWord={nextWord}
            />
          )}

          <GameControls
            score={score}
            totalQuestions={totalQuestions}
            onNextWord={nextWord}
            hasAnswer={!!selectedAnswer}
          />
        </div>
      </div>
    </div>
  );
}