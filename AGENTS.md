# Repository Guidelines

## Project Structure

`index.html` contains the invitation layout, `styles.css` controls presentation, and `script.js` renders and wires up the interactive sections. Keep wedding details and photo paths in `wedding.js`. Store photos, audio, and video in `assets/`. `tools/site.js` discovers songs for local preview and the GitHub Pages build. See `README.md` for publishing instructions.

## Build, Test, and Development Commands

Run `node tools/site.js preview` to serve the site and discover songs in `assets/`. Open `http://127.0.0.1:8767/pre-wedding/`. Run `node tools/site.js build` with Node.js 18 or later to prepare `dist/` for GitHub Pages.

## Coding Style and Naming

Use two-space indentation, `camelCase` for JavaScript identifiers, and `kebab-case` for CSS classes and asset filenames. Use semantic HTML and keep interactive controls keyboard accessible. Use relative asset paths so the site works under a GitHub Pages project path.

## Testing

Preview changes at desktop and mobile widths. Check the countdown, venue and calendar links, photo chapters, keyboard navigation, music toggle, and playlist repeat. Verify that optional sections appear when configured and hide cleanly when disabled. Testing is manual.

## Commits and Pull Requests

Until Git history establishes a convention, use short imperative commit subjects such as `Add initial app entry point`. In pull requests, explain the change and how you verified it. Link any related issue and include screenshots for visible changes.
