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
for (const [id, image] of [['hero-image', wedding.hero], ['story-image', wedding.storyPhoto]]) {
  const target = byId(id);
  if (target.getAttribute('src') !== image.src) target.src = image.src;
  target.alt = image.alt;
}
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

for (const milestone of wedding.milestones) {
  const row = element('li');
  const story = element('div');
  story.append(element('h3', milestone.title), element('p', milestone.text));
  row.append(element('span', milestone.year, 'year'), story);
  byId('milestones').append(row);
}

const lightbox = byId('lightbox');
const lightboxImage = byId('lightbox-image');
const previousPhoto = byId('photo-previous');
const nextPhoto = byId('photo-next');
const albumGrid = byId('album-grid');
const albumControls = byId('album-controls');
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

function showAlbum(index) {
  activePhotos = wedding.albums[index].photos;
  [...albumControls.children].forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
  albumGrid.replaceChildren(...activePhotos.map((item, position) => {
    const button = element('button', '', 'photo-button');
    button.type = 'button';
    button.setAttribute('aria-label', `Enlarge ${item.caption || item.alt}`);
    const icon = element('span', '↗');
    icon.setAttribute('aria-hidden', 'true');
    button.append(photo(item.src, item.alt), icon);
    button.addEventListener('click', () => {
      showPhoto(position);
      lightbox.showModal();
    });
    return button;
  }));
}

for (const [index, album] of wedding.albums.entries()) {
  const button = element('button', album.name);
  button.type = 'button';
  button.setAttribute('aria-controls', 'album-grid');
  button.addEventListener('click', () => showAlbum(index));
  albumControls.append(button);
}

if (wedding.albums.length) {
  showAlbum(0);
  albumControls.hidden = wedding.albums.length < 2;
} else {
  byId('album').hidden = true;
  document.querySelector('nav a[href="#album"]').hidden = true;
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
const soundToggle = byId('sound-toggle');

function updateSoundButton() {
  soundToggle.setAttribute('aria-pressed', String(!music.paused));
  byId('sound-label').textContent = music.paused ? 'Music off' : 'Music on';
}

if (wedding.music) {
  music.src = wedding.music;
  soundToggle.hidden = false;
  music.addEventListener('play', updateSoundButton);
  music.addEventListener('pause', updateSoundButton);
  soundToggle.addEventListener('click', async () => {
    if (music.paused) {
      try {
        await music.play();
      } catch {
        byId('sound-label').textContent = 'Music unavailable';
      }
    } else {
      music.pause();
    }
  });
}

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
const giftOpen = byId('gift-open');
if (wedding.gifts) {
  byId('gift-message').textContent = wedding.gifts.message;
  for (const option of wedding.gifts.options) {
    const item = element('div');
    item.append(element('h3', option.title));
    if (option.qrImage) item.append(photo(option.qrImage, `Gift QR code for ${option.title}`));
    if (option.url) item.append(link('Open gift link ↗', option.url));
    byId('gift-options').append(item);
  }
  giftOpen.hidden = false;
  giftOpen.addEventListener('click', () => giftDialog.showModal());
}
