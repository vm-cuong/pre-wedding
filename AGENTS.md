# Repository Guidelines

## Project Structure

`index.html` contains the invitation layout, `styles.css` controls presentation, and `script.js` renders and wires up the interactive sections. Keep wedding details and media paths in `wedding.js`. Store photos, audio, and video in `assets/`. See `README.md` for personalization and GitHub Pages deployment.

## Build, Test, and Development Commands

Open `index.html` in a modern browser. The site has no install or build step. For a local HTTP preview, run `python -m http.server 8000` from the root if Python is installed, then visit `http://localhost:8000/`.

## Coding Style and Naming

Use two-space indentation, `camelCase` for JavaScript identifiers, and `kebab-case` for CSS classes and asset filenames. Use semantic HTML and keep interactive controls keyboard accessible. Use relative asset paths so the site works under a GitHub Pages project path.

## Testing

Preview changes at desktop and mobile widths. Check the countdown, venue and calendar links, album switching, keyboard navigation, and music. Verify that optional sections appear when configured and hide cleanly when disabled. Testing is manual.

## Commits and Pull Requests

Until Git history establishes a convention, use short imperative commit subjects such as `Add initial app entry point`. In pull requests, explain the change and how you verified it. Link any related issue and include screenshots for visible changes.
