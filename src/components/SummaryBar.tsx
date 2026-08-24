import {
  GAME_STATUSES,
  STATUS_LABELS,
  type Game,
} from '../types/game';

interface SummaryBarProps {
  games: Game[];
}

export function SummaryBar({ games }: SummaryBarProps) {
  const counts = Object.fromEntries(
    GAME_STATUSES.map((status) => [
      status,
      games.filter((game) => game.status === status).length,
    ]),
  ) as Record<(typeof GAME_STATUSES)[number], number>;

  return (
    <section className="summary-bar" aria-label="Collection status summary">
      <div className="summary-total">
        <span className="summary-total-value">{games.length}</span>
        <span className="summary-total-label">
          {games.length === 1 ? 'Game' : 'Games'}
        </span>
      </div>

      <dl className="summary-grid">
        {GAME_STATUSES.map((status) => (
          <div className="summary-item" key={status}>
            <dt>{STATUS_LABELS[status]}</dt>
            <dd>{counts[status]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
