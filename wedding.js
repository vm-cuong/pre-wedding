// Replace the sample details here before sharing your invitation.
window.wedding = {
  locale: 'en-GB',
  timeZone: 'Asia/Ho_Chi_Minh',
  demo: true,
  location: 'Đà Lạt, Việt Nam',
  hero: {
    src: 'assets/rose-pavilion.jpg',
    alt: 'A bride holding a rose bouquet and a groom holding her hand under a white pavilion',
    caption: 'Đà Lạt, Việt Nam',
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
  albums: [
    {
      name: 'Pre-wedding',
      photos: [
        { src: 'assets/coffee-veranda.jpg', alt: 'The couple laughing together over coffee', caption: 'Coffee on the veranda' },
        { src: 'assets/bride.jpg', alt: 'Linh holding white flowers', caption: 'Linh' },
        { src: 'assets/groom.jpg', alt: 'Minh in a black tuxedo', caption: 'Minh' },
        { src: 'assets/garden-walk.jpg', alt: 'The couple walking along a shaded path', caption: 'A walk in the garden' },
        { src: 'assets/rose-bouquet.jpg', alt: 'A bride looking down at a red and pink bouquet', caption: 'A bouquet of roses' },
        { src: 'assets/garden-pergola.jpg', alt: 'The couple together under a white pergola', caption: 'Under the pergola' },
        { src: 'assets/pink-garden.jpg', alt: 'The couple walking away together between pink flowers', caption: 'Just the two of us' },
      ],
    },
    {
      name: 'Wedding day',
      photos: [
        { src: 'assets/ceremony-aisle.jpg', alt: 'An outdoor wedding aisle with pink flowers', caption: 'The ceremony aisle' },
        { src: 'assets/rose-pavilion.jpg', alt: 'The couple standing together in a garden pavilion', caption: 'In the pavilion' },
        { src: 'assets/holding-hands.jpg', alt: 'A bride and groom holding hands', caption: 'Hand in hand' },
        { src: 'assets/candlelit-table.jpg', alt: 'Wedding place settings with flowers and candles', caption: 'A table set for dinner' },
        { src: 'assets/strawberry-cake.jpg', alt: 'A cake with pink piping and strawberries', caption: 'The wedding cake' },
        { src: 'assets/wedding-details.jpg', alt: 'Wedding rings, flowers, and linen', caption: 'Rings and flowers' },
      ],
    },
  ],
  // Optional films use { title, src, poster, captions }. Use MP4 and WebVTT files.
  films: [],
  // Add only gift details you want guests to see. An option can have a QR image, a link, or both.
  gifts: {
    message: 'If you’d like to send a gift, choose the bride’s or groom’s QR code.',
    sample: true,
    options: [
      { title: 'For the bride', qrImage: 'assets/bride-gift-qr.png' },
      { title: 'For the groom', qrImage: 'assets/groom-gift-qr.png' },
    ],
  },
  closing: 'We’re looking forward to having the people we love in one place. See you in Đà Lạt!',
};
