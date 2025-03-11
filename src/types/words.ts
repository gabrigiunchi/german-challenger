export interface Word {
  german: string;
  english: string;
  category: 'noun' | 'verb';
  difficulty: 'easy' | 'medium' | 'hard';
}