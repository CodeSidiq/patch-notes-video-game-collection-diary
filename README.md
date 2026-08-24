# Patch Notes

Patch Notes is a single-page personal video game collection diary for tracking physical and digital games, progress, and personal notes.

## Features

- Add games with title, platform, format, status, and optional notes
- Edit existing collection entries
- Delete games with confirmation
- Track Not Started, In Progress, Completed, and Dropped totals
- Persist the collection with localStorage
- Handle malformed persisted data defensively
- Responsive and keyboard-friendly interface
- Scrollable game collection

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- localStorage

## Architecture

The collection is kept as a single React state source of truth. Status summaries are derived from the collection rather than stored independently.

localStorage is used only as the persistence boundary. Persisted data is parsed defensively so malformed storage does not crash the application.

## Local Development

Run:

    npm install
    npm run dev

## Quality Checks

Run:

    npm run lint
    npm run typecheck
    npm run build

## Production Preview

Run:

    npm run preview
