# Pre-Wedding

A lightweight wedding invitation built with HTML, CSS, and browser JavaScript. Run `node tools/site.js preview` and open `http://127.0.0.1:8767/pre-wedding/` to preview with automatic music discovery. The preview uses Node.js and has no package install step. Opening `index.html` directly uses the sample playlist.

## Reference and plan

The [reference invitation](https://htmlcodex.com/10-best-free-wedding-website-templates-2026/)) opens with a welcome and optional music, then takes guests through the couple’s profiles, countdown, two venues, schedule, story, albums, films, and gifts. This version uses a split cover and garden photography with the same guest journey. It adds downloadable calendar entries for both events and a photo viewer that supports arrow keys and Escape.

The sample invitation is ready to preview. Replace the sample content and media, check the guest links and calendar times, and publish the static files on GitHub Pages. The site switches from a countdown to a time-since counter on the day of the first event.

## Personalize the invitation

- Edit `wedding.js` to change the names, date, venue, schedule, and closing message. Enter event times with an explicit offset such as `2027-04-24T15:30:00+07:00`. Set `timeZone` to the venue’s time zone for on-page dates and times.
- Put photos in `assets/` and update the paths and alternative text in `wedding.js`. Arrange the photos in each `albums` entry in the order you want guests to see them. Photos fade into view as guests scroll. Update the fallback photo and page title in `index.html` when personalizing the cover.
- Put songs directly in `assets/`. The preview server scans the folder on every reload, and the GitHub Pages workflow scans it on each build. Use `.mp3`, `.wav`, `.m4a`, `.aac`, `.ogg`, `.oga`, `.opus`, or `.flac` files. Filenames determine playback order, so you can use names like `01-first-song.mp3` and `02-next-song.mp3`. Remove the sample audio files when you want a playlist of your own songs. The playlist repeats and the speaker button turns sound on and off. If autoplay is blocked, music starts on the guest’s first click or tap.
- Replace `assets/bride-gift-qr.png` and `assets/groom-gift-qr.png` with your own QR images, or update their paths in `gifts.options`. Change `gifts.sample` to `false` once both are ready. The sample codes encode plain text. Set `gifts` to `null` to hide the gift card.
- Add films to `films` as objects with `title`, `src`, and optional `poster` and `captions` paths. Leave `films` empty to hide the section. Set `demo` to `false` when replacing the sample wedding details.

The sample photos in `assets/` were generated with ImageGen for a fictional Vietnamese couple in Đà Lạt. The prompts called for a rose-covered white pavilion cover, an engagement album with a pergola, rose bouquet, veranda coffee, and pink garden, and wedding-day details including a strawberry cake, floral aisle, candlelit table, and the couple holding hands. The site also includes two original sample instrumentals.

## Deploy free with GitHub Pages

1. When ready to publish, commit the updated files to `main` in your public repository. Include `assets/`, `tools/site.js`, and `.github/workflows/pages.yml` with their paths intact.
2. Under **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Open **Actions → Publish wedding website → Run workflow** and select `main`. The workflow builds and publishes the site, including the generated playlist. Later commits to `main` build and publish it automatically.
4. After the run succeeds, use **Settings → Pages → Visit site** to check the invitation, images, calendar files, and music. A project named `pre-wedding` uses an address like `https://your-username.github.io/pre-wedding/`.

Hosting is free with a public repository. The repo and website are publicly readable, including files you add to `assets/`. [GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
