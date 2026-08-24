import {
  FORMAT_LABELS,
  STATUS_LABELS,
  type Game,
} from '../types/game';

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (game: Game) => void;
}

export function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <article className="game-card">
      <div className="game-card-header">
        <div className="game-card-title-group">
          <h3>{game.title}</h3>
          <p className="game-meta">
            {game.platform}
            <span aria-hidden="true"> • </span>
            {FORMAT_LABELS[game.format]}
          </p>
        </div>

        <span className={`status-badge status-${game.status}`}>
          {STATUS_LABELS[game.status]}
        </span>
      </div>

      {game.note && <p className="game-note">“{game.note}”</p>}

      <div className="game-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={() => onEdit(game)}
        >
          Edit
        </button>

        <button
          className="button button-danger"
          type="button"
          onClick={() => onDelete(game)}
          aria-label={`Delete ${game.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
