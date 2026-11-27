# Pre-Wedding

A lightweight wedding invitation built with HTML, CSS, and browser JavaScript. Open `index.html` to preview it. It has no install or build step.

## Reference and plan

The [reference invitation](https://tynab.github.io/Yami-Buzzy/) opens with a welcome and optional music, then takes guests through the couple’s profiles, countdown, two venues, schedule, story, albums, films, and gifts. This version uses a split cover and garden photography with the same guest journey. It adds downloadable calendar entries for both events and a photo viewer that supports arrow keys and Escape.

The sample invitation is ready to preview. Replace the sample content and media, check the guest links and calendar times, and publish the static files on GitHub Pages. The site switches from a countdown to a time-since counter on the day of the first event.

## Personalize the invitation

- Edit `wedding.js` to change the names, date, venue, schedule, story, and closing message. Enter event times with an explicit offset such as `2027-04-24T15:30:00+07:00`. Set `timeZone` to the venue’s time zone for on-page dates and times.
- Put photos in `assets/` and update the paths and alternative text in `wedding.js`. The `albums` entries can hold separate pre-wedding and wedding galleries. To replace the fallback cover photo and page title shown before JavaScript runs, update `index.html` too.
- Set `music` to an audio file or to `''` to hide the toggle. Music plays after a guest turns it on. Add films to `films` as objects with `title`, `src`, and optional `poster` and `captions` paths. Leave `films` empty to hide the section.
- Add approved gift QR images or links to `gifts.options`, or set `gifts` to `null` to hide the gift card. Set `demo` to `false` when replacing the sample details.

The sample assets in `assets/` include a garden walk photograph, separate portraits, and a rings-and-flowers photograph generated with ImageGen, plus an original short instrumental loop. The image prompts called for a fictional Vietnamese couple in a cream satin gown and black tuxedo on a shaded Đà Lạt garden path, and a matching three-panel editorial with individual portraits and rings on linen.

## Deploy free with GitHub Pages

1. Create or choose a public GitHub repository and upload `index.html`, `styles.css`, `script.js`, `wedding.js`, `.nojekyll`, and the `assets/` folder with its structure intact. Commit to `main`.
2. Under **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.
3. When Pages reports a successful deployment, open the link in **Settings → Pages** and check the invitation, directions, calendar files, album, and music. A project named `pre-wedding` uses an address like `https://your-username.github.io/pre-wedding/`.

Hosting is free with a public repository. The repo and website are publicly readable, including files you add to `assets/`. [GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
