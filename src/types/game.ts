export const GAME_FORMATS = ['physical', 'digital'] as const;

export const GAME_STATUSES = [
  'not-started',
  'in-progress',
  'completed',
  'dropped',
] as const;

export type GameFormat = (typeof GAME_FORMATS)[number];
export type GameStatus = (typeof GAME_STATUSES)[number];

export interface Game {
  id: string;
  title: string;
  platform: string;
  format: GameFormat;
  status: GameStatus;
  note: string;
}

export type GameDraft = Omit<Game, 'id'>;

export const FORMAT_LABELS: Record<GameFormat, string> = {
  physical: 'Physical',
  digital: 'Digital',
};

export const STATUS_LABELS: Record<GameStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
  dropped: 'Dropped',
};
