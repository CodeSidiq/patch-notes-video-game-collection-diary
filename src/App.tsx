import { useState } from 'react';

import { GameForm } from './components/GameForm';
import { GameList } from './components/GameList';
import { SummaryBar } from './components/SummaryBar';
import { loadGames, saveGames } from './lib/storage';
import type { Game, GameDraft } from './types/game';

function App() {
  const [games, setGames] = useState<Game[]>(loadGames);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [storageError, setStorageError] = useState(false);

  function commitGames(nextGames: Game[]) {
    setGames(nextGames);
    setStorageError(!saveGames(nextGames));
  }

  function handleSaveGame(gameDraft: GameDraft) {
    if (editingGame) {
      const nextGames = games.map((game) =>
        game.id === editingGame.id
          ? { ...gameDraft, id: game.id }
          : game,
      );

      commitGames(nextGames);
      setEditingGame(null);
      return;
    }

    const newGame: Game = {
      id: crypto.randomUUID(),
      ...gameDraft,
    };

    commitGames([newGame, ...games]);
  }

  function handleDeleteGame(game: Game) {
    const confirmed = window.confirm(
      `Delete "${game.title}" from your collection?`,
    );

    if (!confirmed) {
      return;
    }

    const nextGames = games.filter((item) => item.id !== game.id);

    commitGames(nextGames);

    if (editingGame?.id === game.id) {
      setEditingGame(null);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Personal game diary</p>
          <h1>Patch Notes</h1>
          <p className="header-copy">
            Keep the games you own, the ones you finished, and the backlog
            quietly judging you all in one place.
          </p>
        </div>

        <span className="collection-pill">
          {games.length} {games.length === 1 ? 'title' : 'titles'}
        </span>
      </header>

      {storageError && (
        <div className="storage-warning" role="alert">
          Changes could not be saved to local storage.
        </div>
      )}

      <SummaryBar games={games} />

      <div className="dashboard">
        <GameForm
          key={editingGame?.id ?? 'new-game'}
          editingGame={editingGame}
          onSubmit={handleSaveGame}
          onCancelEdit={() => setEditingGame(null)}
        />

        <section
          className="collection-panel"
          aria-labelledby="collection-heading"
        >
          <div className="section-heading collection-heading">
            <div>
              <p className="eyebrow">Library</p>
              <h2 id="collection-heading">Your collection</h2>
            </div>

            <span className="collection-count">
              {games.length} {games.length === 1 ? 'game' : 'games'}
            </span>
          </div>

          <GameList
            games={games}
            onEdit={setEditingGame}
            onDelete={handleDeleteGame}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
