import {
  GAME_FORMATS,
  GAME_STATUSES,
  type Game,
  type GameFormat,
  type GameStatus,
} from '../types/game';

const STORAGE_KEY = 'patch-notes:v1:games';

function isGameFormat(value: unknown): value is GameFormat {
  return GAME_FORMATS.some((format) => format === value);
}

function isGameStatus(value: unknown): value is GameStatus {
  return GAME_STATUSES.some((status) => status === value);
}

function isValidGame(value: unknown): value is Game {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const game = value as Record<string, unknown>;

  return (
    typeof game.id === 'string' &&
    game.id.trim().length > 0 &&
    typeof game.title === 'string' &&
    game.title.trim().length > 0 &&
    typeof game.platform === 'string' &&
    game.platform.trim().length > 0 &&
    isGameFormat(game.format) &&
    isGameStatus(game.status) &&
    typeof game.note === 'string'
  );
}

export function loadGames(): Game[] {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidGame);
  } catch {
    return [];
  }
}

export function saveGames(games: Game[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
    return true;
  } catch {
    return false;
  }
}
