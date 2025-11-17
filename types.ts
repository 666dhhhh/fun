
export interface Question {
  id: number;
  key: string;
  text: string;
  type: 'radio' | 'text';
  options?: string[];
}

export interface Answers {
  [key: string]: string;
}
