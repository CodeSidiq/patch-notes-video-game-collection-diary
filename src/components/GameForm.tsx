import { useState, type FormEvent } from 'react';

import {
  FORMAT_LABELS,
  GAME_FORMATS,
  GAME_STATUSES,
  STATUS_LABELS,
  type Game,
  type GameDraft,
  type GameFormat,
  type GameStatus,
} from '../types/game';

interface GameFormProps {
  editingGame: Game | null;
  onSubmit: (game: GameDraft) => void;
  onCancelEdit: () => void;
}

const EMPTY_FORM: GameDraft = {
  title: '',
  platform: '',
  format: 'physical',
  status: 'not-started',
  note: '',
};

export function GameForm({
  editingGame,
  onSubmit,
  onCancelEdit,
}: GameFormProps) {
  const [title, setTitle] = useState(
    editingGame?.title ?? EMPTY_FORM.title,
  );

  const [platform, setPlatform] = useState(
    editingGame?.platform ?? EMPTY_FORM.platform,
  );

  const [format, setFormat] = useState<GameFormat>(
    editingGame?.format ?? EMPTY_FORM.format,
  );

  const [status, setStatus] = useState<GameStatus>(
    editingGame?.status ?? EMPTY_FORM.status,
  );

  const [note, setNote] = useState(
    editingGame?.note ?? EMPTY_FORM.note,
  );

  const [error, setError] = useState('');

  function resetForm() {
    setTitle(EMPTY_FORM.title);
    setPlatform(EMPTY_FORM.platform);
    setFormat(EMPTY_FORM.format);
    setStatus(EMPTY_FORM.status);
    setNote(EMPTY_FORM.note);
    setError('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanPlatform = platform.trim();
    const cleanNote = note.trim();

    if (!cleanTitle || !cleanPlatform) {
      setError('Title and platform are required.');
      return;
    }

    onSubmit({
      title: cleanTitle,
      platform: cleanPlatform,
      format,
      status,
      note: cleanNote,
    });

    if (!editingGame) {
      resetForm();
    }

    setError('');
  }

  function handleCancel() {
    resetForm();
    onCancelEdit();
  }

  return (
    <section className="form-panel" aria-labelledby="game-form-title">
      <div className="section-heading">
        <p className="eyebrow">
          {editingGame ? 'Update entry' : 'New entry'}
        </p>

        <h2 id="game-form-title">
          {editingGame ? 'Edit game' : 'Add a game'}
        </h2>
      </div>

      <form className="game-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="game-title">
            Title <span aria-hidden="true">*</span>
          </label>

          <input
            id="game-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Elden Ring"
            maxLength={80}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="game-platform">
            Platform <span aria-hidden="true">*</span>
          </label>

          <input
            id="game-platform"
            type="text"
            value={platform}
            onChange={(event) => setPlatform(event.target.value)}
            placeholder="e.g. Switch, PS5, PC"
            maxLength={40}
            required
          />
        </div>

        <fieldset className="field">
          <legend>Format</legend>

          <div className="segmented-control">
            {GAME_FORMATS.map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="format"
                  value={value}
                  checked={format === value}
                  onChange={() => setFormat(value)}
                />

                <span>{FORMAT_LABELS[value]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="game-status">Status</label>

          <select
            id="game-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as GameStatus)
            }
          >
            {GAME_STATUSES.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <div className="field-label-row">
            <label htmlFor="game-note">Personal note</label>
            <span>{note.length}/180</span>
          </div>

          <textarea
            id="game-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="e.g. Stuck on the final boss"
            maxLength={180}
            rows={4}
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button className="button button-primary" type="submit">
            {editingGame ? 'Save changes' : 'Add game'}
          </button>

          {editingGame && (
            <button
              className="button button-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
