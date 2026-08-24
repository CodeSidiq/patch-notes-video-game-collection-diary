import type { Game } from '../types/game';
import { EmptyState } from './EmptyState';
import { GameCard } from './GameCard';

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

export function GameList({
  games,
  onEdit,
  onDelete,
}: GameListProps) {
  if (games.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="game-list" aria-label="Video game collection">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
