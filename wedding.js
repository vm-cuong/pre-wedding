// Replace the sample details here before sharing your invitation.
window.wedding = {
  locale: 'en-GB',
  timeZone: 'Asia/Ho_Chi_Minh',
  demo: true,
  location: 'Đà Lạt, Việt Nam',
  hero: {
    src: 'assets/garden-walk.jpg',
    alt: 'A bride and groom walking together under a canopy of green trees',
    caption: 'Đà Lạt, Việt Nam',
  },
  storyPhoto: {
    src: 'assets/wedding-details.jpg',
    alt: 'White flowers and gold wedding rings on linen',
  },
  partners: [
    {
      name: 'Linh',
      role: 'The bride',
      photo: 'assets/bride.jpg',
      bio: 'Happiest with flowers on the table, a camera in hand, and friends around the room.',
    },
    {
      name: 'Minh',
      role: 'The groom',
      photo: 'assets/groom.jpg',
      bio: 'Always looking for a good cup of coffee and a quiet road into the hills.',
    },
  ],
  // Times must include a UTC offset. The date of the first event appears on the cover.
  events: [
    {
      title: 'The wedding ceremony',
      start: '2027-04-24T15:30:00+07:00',
      end: '2027-04-24T17:30:00+07:00',
      venue: 'Đà Lạt Botanical Garden',
      address: 'Trần Quốc Toản, Đà Lạt, Lâm Đồng',
      directions: 'https://www.google.com/maps/search/?api=1&query=Da+Lat+Flower+Garden',
      lunarDate: '',
      phone: '',
    },
    {
      title: 'The wedding reception',
      start: '2027-04-24T18:00:00+07:00',
      end: '2027-04-24T21:00:00+07:00',
      venue: 'Dalat Palace',
      address: '2 Trần Phú, Đà Lạt, Lâm Đồng',
      directions: 'https://www.google.com/maps/search/?api=1&query=Dalat+Palace+Heritage+Hotel',
      lunarDate: '',
      phone: '',
    },
  ],
  detailsIntro: 'We’d love for you to join us for our vows in the garden and dinner together afterward.',
  schedule: [
    { time: '15:00', title: 'Guest arrival' },
    { time: '15:30', title: 'Exchange of vows' },
    { time: '18:00', title: 'Dinner & toasts' },
    { time: '19:30', title: 'Dancing' },
  ],
  milestones: [
    { year: '2020', title: 'Coffee for two', text: 'A friend introduced us over iced coffee. We were still talking when the café closed.' },
    { year: '2022', title: 'Our first trip to Đà Lạt', text: 'We borrowed a motorbike, missed a turn, and found the lake we return to every year.' },
    { year: '2026', title: 'The proposal', text: 'Minh asked at the lake just after sunrise. Linh said yes before he could finish.' },
  ],
  albums: [
    {
      name: 'Pre-wedding',
      photos: [
        { src: 'assets/garden-walk.jpg', alt: 'The couple on a garden path', caption: 'A walk in the garden' },
        { src: 'assets/bride.jpg', alt: 'Linh holding white flowers', caption: 'Linh' },
        { src: 'assets/groom.jpg', alt: 'Minh in a black tuxedo', caption: 'Minh' },
      ],
    },
    {
      name: 'Wedding details',
      photos: [
        { src: 'assets/wedding-details.jpg', alt: 'Wedding rings, flowers, and linen', caption: 'Rings and flowers' },
      ],
    },
  ],
  // Optional films use { title, src, poster, captions }. Use MP4 and WebVTT files.
  films: [],
  music: 'assets/garden-theme.wav',
  // Add only gift details you want guests to see. An option can have a QR image, a link, or both.
  gifts: {
    message: 'Celebrating with you is the best gift we could ask for.',
    options: [],
  },
  closing: 'We’re looking forward to having the people we love in one place. See you in Đà Lạt!',
};
