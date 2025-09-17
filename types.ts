export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  statement: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  examples: Example[];
}

export interface Category {
  name: string;
  problems: Problem[];
}

export enum Language {
  Python = 'Python',
  JavaScript = 'JavaScript',
  Java = 'Java',
  CPP = 'C++',
}

export enum Mode {
  Learning = 'Learning',
  Challenge = 'Challenge',
}

export interface TestCaseResult {
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
}

export interface AIFeedback {
  isCorrect: boolean;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  suggestions: string[];
  testCaseResults?: TestCaseResult[];
}

export interface TestResult {
  status: 'Pass' | 'Fail' | 'Error';
  feedback: AIFeedback | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
