'use strict';

const wedding = window.wedding;
const byId = (id) => document.getElementById(id);
const formatDate = new Intl.DateTimeFormat(wedding.locale, {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: wedding.timeZone,
});
const formatTime = new Intl.DateTimeFormat(wedding.locale, {
  hour: 'numeric', minute: '2-digit', timeZone: wedding.timeZone,
});

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function photo(src, alt) {
  const image = element('img');
  image.src = src;
  image.alt = alt;
  image.loading = 'lazy';
  image.decoding = 'async';
  return image;
}

function link(text, url) {
  const anchor = element('a', text, 'text-link');
  anchor.href = url;
  return anchor;
}

const names = wedding.partners.map((partner) => partner.name).join(' & ');
const initials = wedding.partners.map((partner) => Array.from(partner.name)[0]);
const monogram = byId('monogram');
monogram.replaceChildren(`${initials[0]} `, element('i', '&'), ` ${initials[1]}`);
document.title = `${names} · Wedding Invitation`;
document.querySelectorAll('[data-partner]').forEach((node) => {
  node.textContent = wedding.partners[Number(node.dataset.partner)].name;
});
byId('hero-date').textContent = formatDate.format(new Date(wedding.events[0].start));
byId('hero-location').textContent = wedding.location;
byId('hero-caption').textContent = wedding.hero.caption;
const heroImage = byId('hero-image');
if (heroImage.getAttribute('src') !== wedding.hero.src) heroImage.src = wedding.hero.src;
heroImage.alt = wedding.hero.alt;
byId('details-intro').textContent = wedding.detailsIntro;
byId('closing-message').textContent = wedding.closing;
byId('footer-note').textContent = wedding.demo ? 'Sample wedding invitation' : `${names} · ${wedding.location}`;

function startClock(start) {
  const title = byId('countdown-title');
  const kicker = byId('countdown-kicker');
  const units = ['days', 'hours', 'minutes', 'seconds'].map(byId);
  let wasMarried;

  function tick() {
    const difference = start - Date.now();
    const married = difference <= 0;
    if (married !== wasMarried) {
      title.textContent = married ? 'Together for' : 'Counting down';
      kicker.textContent = married ? 'Since our wedding day' : 'Save the date';
      wasMarried = married;
    }
    const seconds = married ? Math.floor(-difference / 1000) : Math.ceil(difference / 1000);
    const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
    units.forEach((node, index) => {
      const value = String(values[index]).padStart(2, '0');
      if (node.textContent !== value) node.textContent = value;
    });
  }

  tick();
  setInterval(tick, 1000);
}

startClock(Date.parse(wedding.events[0].start));

for (const partner of wedding.partners) {
  const card = element('article', '', 'couple-card');
  const portrait = element('figure');
  portrait.append(photo(partner.photo, `Portrait of ${partner.name}`));
  card.append(portrait, element('p', partner.role, 'eyebrow'), element('h3', partner.name), element('p', partner.bio));
  byId('couple').append(card);
}

function saveCalendar(event, index) {
  const stamp = (date) => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const escape = (value) => value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/[,;]/g, '\\$&');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Calendar//EN',
    'BEGIN:VEVENT',
    `UID:${stamp(event.start)}-${index}@${location.hostname || 'wedding-invitation.local'}`,
    `DTSTAMP:${stamp(Date.now())}`,
    `DTSTART:${stamp(event.start)}`,
    `DTEND:${stamp(event.end)}`,
    `SUMMARY:${escape(`${names} · ${event.title}`)}`,
    `LOCATION:${escape(`${event.venue}, ${event.address}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([`${lines.join('\r\n')}\r\n`], { type: 'text/calendar;charset=utf-8' }));
  const download = element('a');
  download.href = url;
  download.download = `wedding-event-${index + 1}.ics`;
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

wedding.events.forEach((event, index) => {
  const card = element('article', '', 'event-card');
  const date = new Date(event.start);
  const dateLabel = element('time', formatDate.format(date), 'eyebrow');
  dateLabel.dateTime = event.start;
  const timeLabel = element('time', formatTime.format(date));
  timeLabel.dateTime = event.start;
  const calendar = element('button', 'Add to calendar', 'button button-dark');
  calendar.type = 'button';
  calendar.addEventListener('click', () => saveCalendar(event, index));
  const actions = element('div', '', 'actions');
  actions.append(calendar);
  if (event.directions) actions.append(link('Directions ↗', event.directions));
  if (event.phone) actions.append(link('Call venue', `tel:${event.phone}`));
  card.append(dateLabel, element('h3', event.title), timeLabel, element('p', event.venue), element('address', event.address));
  if (event.lunarDate) card.append(element('p', event.lunarDate));
  card.append(actions);
  byId('events').append(card);
});

for (const item of wedding.schedule) {
  const row = element('li');
  const time = element('time', item.time);
  time.dateTime = item.time;
  row.append(time, element('span', item.title));
  byId('schedule').append(row);
}

const lightbox = byId('lightbox');
const lightboxImage = byId('lightbox-image');
const previousPhoto = byId('photo-previous');
const nextPhoto = byId('photo-next');
const albumChapters = byId('album-chapters');
let activePhotos = [];
let photoIndex = 0;

function showPhoto(index) {
  photoIndex = (index + activePhotos.length) % activePhotos.length;
  const current = activePhotos[photoIndex];
  lightboxImage.src = current.src;
  lightboxImage.alt = current.alt;
  byId('lightbox-caption').textContent = current.caption;
  byId('photo-position').textContent = `${photoIndex + 1} / ${activePhotos.length}`;
  previousPhoto.hidden = activePhotos.length < 2;
  nextPhoto.hidden = activePhotos.length < 2;
}

for (const album of wedding.albums) {
  if (!album.photos.length) continue;
  const chapter = element('section', '', 'album-chapter');
  const grid = element('div', '', 'album-grid');
  album.photos.forEach((item, position) => {
    const figure = element('figure', '', 'album-photo');
    const button = element('button', '', 'photo-button');
    button.type = 'button';
    button.setAttribute('aria-label', `Enlarge ${item.caption || item.alt}`);
    const icon = element('span', '↗');
    icon.setAttribute('aria-hidden', 'true');
    button.append(photo(item.src, item.alt), icon);
    button.addEventListener('click', () => {
      activePhotos = album.photos;
      showPhoto(position);
      lightbox.showModal();
    });
    figure.append(button);
    if (item.caption) figure.append(element('figcaption', item.caption));
    grid.append(figure);
  });
  chapter.append(element('h3', album.name), grid);
  albumChapters.append(chapter);
}

if (!albumChapters.childElementCount) {
  byId('album').hidden = true;
  document.querySelector('nav a[href="#album"]').hidden = true;
}

const header = document.querySelector('.site-header');
const navigationSections = [...header.querySelectorAll('nav a:not([hidden])')].map((link) => ({
  link,
  section: byId(link.hash.slice(1)),
}));
let currentSectionLink = navigationSections[0].link;

function updateCurrentSection() {
  const marker = header.getBoundingClientRect().bottom + 18;
  let current = navigationSections[0].link;
  for (const { link, section } of navigationSections) {
    if (section.getBoundingClientRect().top > marker) break;
    current = link;
  }
  if (current === currentSectionLink) return;
  currentSectionLink.removeAttribute('aria-current');
  current.setAttribute('aria-current', 'location');
  currentSectionLink = current;
}

window.addEventListener('scroll', updateCurrentSection, { passive: true });
window.addEventListener('resize', updateCurrentSection);
window.addEventListener('pageshow', updateCurrentSection);
updateCurrentSection();

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const item = entry.target;
      if (!entry.isIntersecting) {
        item.classList.toggle('reveal-from-above', entry.boundingClientRect.bottom <= 0);
      }
      item.classList.toggle('is-revealed', entry.isIntersecting);
    }
  });

  const items = document.querySelectorAll([
    '.countdown-copy', '.countdown-grid div', '.section-heading', '.couple-card',
    '.event-card', '.schedule h3', '.schedule li', '.album-chapter h3', '.album-photo', '.closing > *',
  ].join(', '));
  for (const item of items) {
    item.classList.add('scroll-reveal');
    observer.observe(item);
  }
}

previousPhoto.addEventListener('click', () => showPhoto(photoIndex - 1));
nextPhoto.addEventListener('click', () => showPhoto(photoIndex + 1));
lightbox.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(photoIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});

const music = byId('background-music');

function setupMusic(tracks) {
  if (!tracks.length) return;
  const toggle = byId('sound-toggle');
  let trackIndex = 0;
  let playRequest = 0;
  let failedTracks = 0;
  let waitingForClick = false;

  function updateSoundButton() {
    const playing = !music.paused && !music.ended;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.title = playing ? 'Turn music off' : 'Turn music on';
  }

  function playNextTrack() {
    trackIndex = (trackIndex + 1) % tracks.length;
    music.src = tracks[trackIndex];
    playMusic();
  }

  async function playMusic() {
    const request = ++playRequest;
    waitingForClick = false;
    try {
      await music.play();
      if (request === playRequest) failedTracks = 0;
    } catch (error) {
      if (request !== playRequest || error.name === 'AbortError') return;
      if (error.name === 'NotAllowedError') {
        waitingForClick = true;
      } else if (++failedTracks < tracks.length) {
        playNextTrack();
      }
      updateSoundButton();
    }
  }

  toggle.hidden = false;
  music.src = tracks[trackIndex];
  music.addEventListener('play', updateSoundButton);
  music.addEventListener('pause', updateSoundButton);
  music.addEventListener('ended', playNextTrack);
  toggle.addEventListener('click', () => {
    if (!music.paused && !music.ended) {
      playRequest++;
      music.pause();
      return;
    }
    failedTracks = 0;
    if (music.error) music.src = tracks[trackIndex];
    playMusic();
  });
  document.addEventListener('click', (event) => {
    if (waitingForClick && !toggle.contains(event.target)) playMusic();
  });
  playMusic();
}

setupMusic(window.weddingPlaylist || []);

for (const film of wedding.films) {
  const card = element('article');
  const video = element('video');
  video.src = film.src;
  if (film.poster) video.poster = film.poster;
  video.controls = true;
  video.playsInline = true;
  video.preload = 'none';
  video.addEventListener('play', () => music.pause());
  if (film.captions) {
    const track = element('track');
    track.kind = 'captions';
    track.src = film.captions;
    track.srclang = film.captionLanguage || 'en';
    track.label = film.captionLabel || 'English';
    video.append(track);
  }
  video.append(link('Open video', film.src));
  card.append(video, element('h3', film.title));
  byId('films').append(card);
}
byId('film').hidden = wedding.films.length === 0;

const giftDialog = byId('gift-dialog');
if (wedding.gifts) {
  byId('gift-message').textContent = wedding.gifts.message;
  byId('gift-note').hidden = !wedding.gifts.sample;
  for (const option of wedding.gifts.options) {
    const item = element('article', '', 'gift-option');
    item.append(element('h3', option.title));
    if (option.qrImage) item.append(photo(option.qrImage, `Gift QR code (${option.title})`));
    if (option.url) item.append(link('Open gift link ↗', option.url));
    byId('gift-options').append(item);
  }
  for (const button of [byId('gift-nav'), byId('gift-open')]) {
    button.hidden = false;
    button.addEventListener('click', () => giftDialog.showModal());
  }
}
