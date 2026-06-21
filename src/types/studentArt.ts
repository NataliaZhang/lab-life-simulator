// Student visual art types — portrait + expression system

export const STUDENT_EXPRESSIONS = [
  'neutral', 'happy', 'sad', 'angry',
  'surprised', 'shy', 'smug', 'special',
] as const;

export type StudentExpression = typeof STUDENT_EXPRESSIONS[number];

export interface StudentArt {
  /** Absolute public path to the half-body portrait (e.g. /img/students/portrait/foo.PNG) */
  portrait: string;
  /** Directory containing the 8 expression images (e.g. /img/students/expressions/foo) */
  expressionDir: string;
}
