// One place for every fact about the gym. Pages read from here, so a phone
// number or opening time is never typed twice.
//
// Anything marked SET WITH CLIENT is a placeholder until a real gym signs off.

export const site = {
  name: 'Grounded Gym',
  // One category statement, used everywhere.
  category: 'Strength and conditioning for real life',
  tagline: 'Get strong for real life.',
  offer: 'Free Trial Week', // one name for the offer: button, form, thank-you, WhatsApp
  area: 'Baneshwor',
  city: 'Kathmandu',

  // Demo sites stay out of search results so nobody looking for a real gym in
  // Baneshwor lands here. Flip to true for a real client launch.
  indexable: false,

  demo: {
    enabled: true,
    line: 'Demo site by Yogesh Kaphle. Grounded Gym is not a real gym.',
    author: 'Yogesh Kaphle',
    authorRole: 'Growth Marketing for Coaches',
    authorUrl: 'https://yogeshkaphle.com.np',
    // Your own WhatsApp number in international format without "+", e.g. '9779812345678'.
    // Gym owners who test the demo reach you. Leave null until you add it.
    authorWhatsApp: null as string | null,
  },

  address: {
    street: '2nd floor, above the sports shop',
    locality: 'New Baneshwor',
    city: 'Kathmandu',
    postcode: '44600',
    country: 'NP',
  },
  // People here find places by landmark. Keep this and the map pin in step.
  directions:
    'From New Baneshwor Chowk, walk towards Tinkune. We are on the left, on the second floor above the sports shop. About 5 minutes on foot.',
  landmark: 'New Baneshwor Chowk',
  walkMinutes: 5,
  map: {
    // SET WITH CLIENT: pin the real building. The demo pins the Chowk the directions start from.
    query: 'New Baneshwor Chowk, Kathmandu',
  },
  parking:
    'Free scooter and bike parking in front of the building. For cars, use the paid parking near New Baneshwor Chowk.',

  // dayIndexes: 0 = Sunday ... 6 = Saturday. Saturday is Nepal's weekly holiday.
  hours: [
    { days: 'Sun to Fri', dayIndexes: [0, 1, 2, 3, 4, 5], open: '5:30', close: '21:00' },
    { days: 'Sat', dayIndexes: [6], open: '7:00', close: '11:00' },
  ],
  openingLine: 'Open from 5:30, Sunday to Friday',

  // null = not set. Buttons for unset channels explain that this is a demo
  // instead of dialling or messaging a stranger's number.
  contact: {
    phoneDisplay: '+977 98XX XXX XXX',
    phone: null as string | null, // e.g. '+9779812345678'
    whatsapp: null as string | null, // e.g. '9779812345678'
    viber: null as string | null, // e.g. '+9779812345678'
    instagram: null as string | null, // full URL
    facebook: null as string | null, // full URL
  },

  // SET WITH CLIENT: only promise a call time the front desk really keeps.
  callback: {
    within: 'within 2 hours',
    window: '7:00 to 19:00',
  },

  tracking: {
    // Placeholders for the demo. Nothing loads until these are filled in.
    metaPixelId: '',
    ga4Id: '',
  },

  form: {
    // Web3Forms free plan: 250 submissions a month, sends to the email the key
    // is registered with. Get a key at web3forms.com. Empty = test mode (nothing is sent).
    web3formsKey: '',
    // The email field only appears when an auto-reply really goes out
    // (Web3Forms Pro or the client's GHL). No auto-reply, no promise of one.
    collectEmail: false,
  },
};

export type Site = typeof site;

export const whatsappLink = (text: string, number: string | null = site.contact.whatsapp) =>
  number ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : null;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.map.query)}`;
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(site.map.query)}&z=16&output=embed`;
