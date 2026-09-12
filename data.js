/*
 * Québec Hangouts: content.
 * Every price, hour and date below was read on the official page linked in `sources`
 * on CHECKED. Update the facts and CHECKED together.
 *
 * schedule.type:
 *   'weekly' → days: [0=Sun … 6=Sat], optional from / to (yyyy-mm-dd), closed: [dates], extraOpen: [dates]
 *              or periods: [{ from, to, days }] when the pattern changes during the season
 *              dayNotes: { weekday: 'short note' } shows e.g. a start time on that weekday
 *
 * Pictures: img (photo with credit) · board (restaurant chalkboard) · art ('tennis' | 'badminton' | 'rink' | 'gym' | 'boulder')
 *
 * tags: { label, kind } · add left: 'dates' or 'games' to show a live "N dates left" count instead of the label
 *
 * dice (for "Roll the dice"; leave it out to keep a card out of the dice):
 *   tier    0 free · 1 up to $25 · 2 up to $75 · 3 more (cheapest usual price per person; restaurants use their own $ signs)
 *   hours   rough time needed, getting there included · weekend: true for trips that need a weekend
 *   day / evening   true, false, or [weekdays] when only some days are open that part of the day
 *   car     true if you realistically need a car; the dice leave these out, since outings go by public transit
 *   dates-type schedules can set part: 'day' | 'evening' on each date
 *   'dates'  → dates: [{ date, note }]
 */
window.QH_DATA = {
  CHECKED: '2026-09-12',

  CATEGORIES: [
    { id: 'nature', label: 'Mountains & lakes', note: 'Fall colour peak forecast: Laurentians 1st week of October · Mont-Orford and Montérégie 3rd week · Montréal 3rd–4th week' },
    { id: 'eat', label: 'Food', note: 'Sometimes the outing is just a really good meal' },
    { id: 'cepsum', label: 'CEPSUM', note: 'UdeM’s sports centre, free for UdeM, Polytechnique and HEC students with a student card · 2100 boul. Édouard-Montpetit · weekdays 6:30–23:00, weekends 8:30–20:30' },
    { id: 'climb', label: 'Climbing', note: 'Qiwei’s Friday-night habit. Come along.' },
    { id: 'museums', label: 'Museums', note: 'Good on any day, great on a rainy one' },
    { id: 'events', label: 'Seasonal & shows', note: 'Games, concerts, lights and markets' },
    { id: 'snow', label: 'Snow', note: 'Ski season 2026–27' }
  ],

  ACTIVITIES: [
    // ---------------- Mountains & lakes ----------------
    {
      id: 'oka-apples',
      cat: 'nature',
      name: 'Apple picking + Oka park',
      local: 'Navette Nature day trip · Parc national d’Oka',
      blurb: 'A bus day trip: morning at the Labonté de la pomme orchard, afternoon at Oka National Park and its Calvaire trail. Everyone takes home a 3 L basket of apples.',
      img: { src: 'assets/img/oka-apples.jpg', alt: 'A small stone chapel on the Calvaire d’Oka trail among orange autumn leaves', credit: 'Stef-wiki · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Parc_national_d%27Oka.jpg' },
      tags: [{ label: 'No car needed', kind: 'free' }, { label: '2 dates left', kind: 'limited', left: 'dates' }],
      facts: [
        ['Price', 'Students with ID $47.50 · adults $52.25 (bus, park entry and apples included)'],
        ['Schedule', 'Leaves the Montréal bus station (Berri-UQAM) at 8:30, back around 17:00'],
        ['Booking', 'Each person books their own ticket with Navette Nature. Full refund if you cancel 14 days before.'],
        ['Heads-up', 'Sept 20–27: street closures around the bus station for the cycling world championships. Leave extra time.']
      ],
      dice: { tier: 2, hours: 9, day: true, evening: false, car: false },
      schedule: { type: 'dates', endedNote: 'No more trips listed this season.', dates: [{ date: '2026-09-19', note: '8:30 bus' }, { date: '2026-09-27', note: '8:30 bus' }] },
      sources: [
        { label: 'Navette Nature · Oka apple trip 2026 (prices, schedule)', url: 'https://navettenature.zaui.net/booking/web/#/default/activity/398' },
        { label: 'Navette Nature · September calendar', url: 'https://www.navettenature.com/' },
        { label: 'Orléans Express · bus station closure notice', url: 'https://orleansexpress.com/fr/' }
      ]
    },
    {
      id: 'tremblant-park',
      cat: 'nature',
      name: 'Mont-Tremblant National Park',
      local: 'Navette Nature day trip · Lac-Monroe sector',
      blurb: 'A full day at Lac Monroe in the Laurentians by shuttle bus. Colours there are forecast to be halfway turned in the last week of September.',
      img: { src: 'assets/img/tremblant-park.jpg', alt: 'A forested hill reflected in a still lake at Lac Monroe', credit: 'Mhsheikholeslami · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Parc_national_du_Mont-Tremblant-_Lac_Monroe-_Quebec_(1).jpg' },
      tags: [{ label: 'No car needed', kind: 'free' }, { label: '2 dates left', kind: 'limited', left: 'dates' }],
      facts: [
        ['Price', 'Students with ID $61 · adults $66 (bus and park entry included)'],
        ['Schedule', 'Leaves the Montréal bus station (Berri-UQAM) at 8:00, leaves Lac Monroe at 17:00, back around 19:15'],
        ['Booking', 'Each person books their own ticket with Navette Nature. Full refund if you cancel 14 days before.'],
        ['Heads-up', 'Sept 20–27: street closures around the bus station for the cycling world championships. Leave extra time.']
      ],
      dice: { tier: 2, hours: 12, day: true, evening: false, car: false },
      schedule: { type: 'dates', endedNote: 'No more trips listed this season.', dates: [{ date: '2026-09-19', note: '8:00 bus' }, { date: '2026-09-27', note: '8:00 bus' }] },
      sources: [
        { label: 'Navette Nature · Mont-Tremblant trip 2026 (prices, schedule)', url: 'https://navettenature.zaui.net/booking/web/#/default/activity/387' },
        { label: 'Navette Nature · September calendar', url: 'https://www.navettenature.com/' },
        { label: 'Bonjour Québec · 2026 fall colour forecast', url: 'https://bonjourquebec.com/en-ca/blog/tips/fall-colours-peak-forecasts' }
      ]
    },
    {
      id: 'orford-park',
      cat: 'nature',
      name: 'Mont-Orford National Park',
      local: 'Navette Nature day trip · Lac-Stukely sector',
      blurb: 'A shuttle-bus day at Lac Stukely in the Eastern Townships. The colours there peak later, forecast for the third week of October.',
      img: { src: 'assets/img/orford-park.jpg', alt: 'Lac Stukely with a rounded forested mountain behind it', credit: 'Boréal · CC BY-SA 3.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:2007-07_Parc_du_Mont-Orford_-_Lac_Stukeley_et_Mont_Chauve.jpg' },
      tags: [{ label: 'No car needed', kind: 'free' }, { label: '1 date left', kind: 'limited', left: 'dates' }],
      facts: [
        ['Price', 'Students with ID $58.25 · adults $65.25 (bus and park entry included)'],
        ['Schedule', 'Leaves the Montréal bus station (Berri-UQAM) at 8:30, back around 18:30'],
        ['Booking', 'Each person books their own ticket with Navette Nature. Full refund if you cancel 14 days before.'],
        ['Heads-up', 'Sept 20–27: street closures around the bus station for the cycling world championships. Leave extra time.']
      ],
      dice: { tier: 2, hours: 10, day: true, evening: false, car: false },
      schedule: { type: 'dates', endedNote: 'No more trips listed this season.', dates: [{ date: '2026-09-26', note: '8:30 bus' }] },
      sources: [
        { label: 'Navette Nature · Mont-Orford trip 2026 (prices, schedule)', url: 'https://navettenature.zaui.net/booking/web/#/default/activity/399' },
        { label: 'Navette Nature · September calendar', url: 'https://www.navettenature.com/' },
        { label: 'Bonjour Québec · 2026 fall colour forecast', url: 'https://bonjourquebec.com/en-ca/blog/tips/fall-colours-peak-forecasts' }
      ]
    },
    {
      id: 'mont-royal',
      cat: 'nature',
      name: 'Mount Royal Park',
      local: 'Parc du Mont-Royal',
      blurb: 'The mountain in the middle of the city: forest paths, lookouts and Beaver Lake, where you can rent rowboats and lawn games on September weekends.',
      img: { src: 'assets/img/mont-royal.jpg', alt: 'Beaver Lake on Mount Royal with autumn trees under a cloudy sky', credit: 'Andre Carrotflower · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:20181012_-_14_-_Montreal_(Mount_Royal_Park).jpg' },
      tags: [{ label: 'No car needed', kind: 'free' }, { label: 'Every day' }],
      facts: [
        ['Hours', '6:00 to midnight, every day'],
        ['Cost', 'No admission fee listed; 5 paid parking lots'],
        ['Beaver Lake', 'Rowboat and outdoor-game rentals on weekends, noon to 18:00, until Sept 28'],
        ['Getting there', 'Bus 11 crosses the park · Beaver Lake pavilion, 2000 chemin Remembrance'],
        ['Heads-up', 'Until Oct 4, Avenue du Parc is closed at the foot of the mountain for the cycling world championships (races Sept 19–27).']
      ],
      dice: { tier: 0, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'Ville de Montréal · Parc du Mont-Royal (hours, parking)', url: 'https://montreal.ca/en/places/parc-du-mont-royal' },
        { label: 'Les amis de la montagne · Rowboats and outdoor games', url: 'https://www.lemontroyal.qc.ca/en/rowboats-and-outdoor-games' },
        { label: 'STM · Parc du Mont-Royal (bus 11)', url: 'https://www.stm.info/en/offers-and-outings/discover-montreal/parc-du-mont-royal' },
        { label: 'Ville de Montréal · UCI championships closures', url: 'https://montreal.ca/actualites/championnats-du-monde-route-uci-montreal-2026-impacts-et-renseignements-115328' }
      ]
    },
    {
      id: 'jean-drapeau',
      cat: 'nature',
      name: 'Parc Jean-Drapeau',
      local: 'Île Sainte-Hélène & Île Notre-Dame',
      blurb: 'Two islands in the St. Lawrence on the yellow metro line: river views, paths, and the Biosphère environment museum inside the old Expo 67 dome.',
      img: { src: 'assets/img/jean-drapeau.jpg', alt: 'The geodesic dome of the Biosphère behind green trees', credit: 'Idej Elixe · CC BY-SA 3.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Biosph%C3%A8re_de_Montr%C3%A9al_en_juillet_2011.jpg' },
      tags: [{ label: 'No car needed', kind: 'free' }, { label: 'Every day' }],
      facts: [
        ['Hours', 'Île Sainte-Hélène 6:00 to midnight · Île Notre-Dame 6:00 to 23:00, every day'],
        ['Biosphère', 'Separate museum ticket: students 18+ $19, adults $25.50 (2026)'],
        ['Getting there', [{ metro: 'yellow', station: 'Jean-Drapeau' }, ' · fare zone A']]
      ],
      dice: { tier: 0, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'Parc Jean-Drapeau · FAQ (hours)', url: 'https://www.parcjeandrapeau.com/en/faq/' },
        { label: 'Parc Jean-Drapeau · Getting to the park', url: 'https://www.parcjeandrapeau.com/en/getting-to-the-parc-metro-car-bike-river-shuttle/' },
        { label: 'Espace pour la vie · 2026 admission', url: 'https://espacepourlavie.ca/droits-dentree-pour-un-musee' }
      ]
    },
    {
      id: 'gault',
      cat: 'nature',
      name: 'Mont Saint-Hilaire',
      local: 'Gault Nature Reserve · McGill University',
      blurb: 'McGill’s nature reserve around Lac Hertel: 25 km of forest trails, with climbs of up to about 280 m. Montérégie colours are forecast to peak in the third week of October.',
      img: { src: 'assets/img/gault.jpg', alt: 'Lac Hertel surrounded by forested hills', credit: 'Atilin · CC BY-SA 3.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Mont_St_Hilaire_lac_Hertel.JPG' },
      tags: [{ label: 'Book a time slot', kind: 'limited' }, { label: 'Every day' }],
      facts: [
        ['Price', 'Adult day pass $8.96 · 17 and under free · no student price'],
        ['Booking', 'Online only, for a set arrival time slot. Late arrivals are turned away, so book the same slot for everyone.'],
        ['Trails', 'Open every day, 8:00–18:00 in daylight-saving time, 8:00–16:00 in winter'],
        ['Getting there', '422 chemin des Moulins, Mont-Saint-Hilaire. Bus 200, exo on-demand 361 and a train are listed; carpooling is simplest.']
      ],
      dice: { tier: 1, hours: 5, day: true, evening: false, car: true },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'Gault Nature Reserve · Outdoor activities (prices, hours, rules)', url: 'https://gault.mcgill.ca/en/outdoor-activities/' },
        { label: 'Gault Nature Reserve · Contact (address, transit)', url: 'https://gault.mcgill.ca/en/contact/' },
        { label: 'Bonjour Québec · 2026 fall colour forecast', url: 'https://bonjourquebec.com/en-ca/blog/tips/fall-colours-peak-forecasts' }
      ]
    },
    {
      id: 'acropole',
      cat: 'nature',
      name: 'L’Acropole des Draveurs',
      local: 'Hautes-Gorges-de-la-Rivière-Malbaie National Park · Charlevoix',
      blurb: 'Charlevoix’s famous summit hike: up through the forest to an Arctic-alpine top, with the Malbaie River far below. Rated difficult, and a weekend trip from Montréal.',
      img: { src: 'assets/img/acropole.jpg', alt: 'View from the Acropole des Draveurs summit down the Malbaie River valley between steep cliffs', credit: 'Cephas · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Acropole_des_Draveurs_05.jpg' },
      tags: [{ label: 'Difficult', kind: 'limited' }, { label: 'Car needed', kind: 'limited' }, { label: 'Weekend trip' }, { label: 'Trail open until Oct 12', kind: 'limited' }],
      facts: [
        ['Trail', '11.2 km round trip · 800 m climb · 4 to 6 hours'],
        ['Season', 'Normally open from the second Friday of June to Thanksgiving Monday (October 12, 2026), depending on trail conditions'],
        ['Start time', 'In September, start between sunrise and noon and be off the summit by 15:30. From October 1 to closing, start by noon and be off the summit by 15:00. A park warden closes the trail.'],
        ['Bring', 'Hiking boots, at least 2 L of water each, poles, warm layers (it’s usually 5–10 °C colder on top)'],
        ['Getting there', 'Trailhead at Le Pin-Blanc campground (km 6). The park is 170 km from Québec City; in summer a mandatory shuttle runs between its two visitor centres.'],
        ['Park entry', 'Sépaq day access, $10.30 per adult']
      ],
      dice: { tier: 1, hours: 0, weekend: true, day: true, evening: false, car: true },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6], to: '2026-10-12', endedNote: 'The trail closed for the season after Thanksgiving Monday (October 12). It normally reopens on the second Friday of June.' },
      sources: [
        { label: 'Sépaq · Acropole-des-Draveurs: important information (season, start and descent times)', url: 'https://www.sepaq.com/pq/hgo/annexes/acropole-draveurs-renseignements-importants.dot?language_id=1' },
        { label: 'Sépaq · Hautes-Gorges hiking trails', url: 'https://www.sepaq.com/pq/hgo/annexes/sentiers_pedestre.dot?language_id=1' },
        { label: 'Sépaq · Hautes-Gorges access and operating periods', url: 'https://www.sepaq.com/pq/hgo/information.dot?language_id=1' },
        { label: 'Sépaq · National park access rates', url: 'https://www.sepaq.com/pq/tarification-parcs-nationaux.dot' }
      ]
    },
    {
      id: 'sbl',
      cat: 'nature',
      name: 'Laurentians Biology Station',
      local: 'Station de biologie des Laurentides (UdeM)',
      blurb: 'Université de Montréal’s field station: 16.4 km² of forest with about fifteen lakes, an hour north of the city. Stay the night, eat in the cafeteria, take a canoe out.',
      img: { src: 'assets/img/sbl.jpg', alt: 'A calm lake with a wooden dock and small boats, surrounded by forest', credit: 'Vincent Belanger M · CC0', page: 'https://commons.wikimedia.org/wiki/File:Lac_Cromwell,_Station_de_Biologie_des_Laurentides.jpg' },
      tags: [{ label: 'Overnight' }, { label: 'Car needed', kind: 'limited' }, { label: 'Open until Nov 1' }],
      facts: [
        ['Night + meals', 'UdeM, Poly & HEC students $52 · other students $88.55 · everyone else $123.50 (lunch, dinner and a bed in a double room; taxes extra)'],
        ['Day visit', 'With lunch: UdeM, Poly & HEC students $16 · other students $27.25 · everyone else $38'],
        ['To do', 'Canoe or rowboat, hiking trails, campfire, beach volleyball, ping-pong, board games'],
        ['Getting there', '592 chemin du lac Croche, Saint-Hippolyte. No transit stop on this road, so you need a car.'],
        ['Booking', 'Call 450-563-3111 (ext. 1) or email sbl@iro.umontreal.ca. Groups of more than 20 must book by email.']
      ],
      dice: { tier: 1, hours: 8, day: true, evening: false, car: true },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6], to: '2026-11-01', endedNote: 'Closed for the season after November 1.' },
      sources: [
        { label: 'SBL · Plan your visit', url: 'https://sbl.umontreal.ca/planifier-votre-visite/' },
        { label: 'SBL · 2026 summer rates, UdeM (PDF)', url: 'https://sbl.umontreal.ca/public/FAS/sbl/Documents/5-Planification-visite/Tarif_2026_-_E%CC%81TE%CC%81_GL_UdeM.pdf' },
        { label: 'SBL · 2026 summer rates, external (PDF)', url: 'https://sbl.umontreal.ca/public/FAS/sbl/Documents/5-Planification-visite/Tarif_2026_-_E%CC%81TE%CC%81_GL_externes.pdf' },
        { label: 'SBL · Leisure activities', url: 'https://sbl.umontreal.ca/nos-activites/activites-de-loisirs/' },
        { label: 'SBL · Booking site', url: 'https://sbl.iro.umontreal.ca/' },
        { label: 'SBL · Territory', url: 'https://sbl.umontreal.ca/territoire-et-biodiversite/information-sur-le-territoire/' }
      ]
    },

    // ---------------- Food ----------------
    {
      id: 'yokato',
      cat: 'eat',
      name: 'Yokato Yokabai',
      local: 'Ramen · Plateau-Mont-Royal',
      blurb: 'Hakata-style tonkotsu ramen in a small Plateau shop that shares its space with the izakaya Ichigo Ichie. In the MICHELIN Guide, tagged “Worth queueing for”.',
      board: { kicker: 'MICHELIN Guide', title: 'Yokato Yokabai', sub: 'Tonkotsu · Gomami · Vegetarian', price: '$$' },
      tags: [{ label: 'MICHELIN Guide' }, { label: 'No reservations', kind: 'limited' }],
      facts: [
        ['Ramen', 'Tonkotsu (pork broth), Gomami (sesame broth), and a vegetarian ramen'],
        ['Price', '$$ in the MICHELIN Guide'],
        ['Hours', 'Mon–Wed 11:30–14:30 & 17:00–22:00 · Thu until 22:30 · Fri until 23:00 · Sat 11:30–23:00 · Sun 11:30–22:00'],
        ['Lines', 'No reservations for the ramen side. The shop suggests 17:00–18:00 or 20:30–21:45 for a shorter wait.'],
        ['Where', ['4185 rue Drolet · ', { metro: 'orange', station: 'Mont-Royal' }]]
      ],
      dice: { tier: 2, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'Yokato Yokabai · official site (hours, menu, reservations)', url: 'https://yoka.ca/' },
        { label: 'MICHELIN Guide · Yokato Yokabai', url: 'https://guide.michelin.com/us/en/quebec/montreal_2433514/restaurant/yokato-yokabai' }
      ]
    },
    {
      id: 'affaire-ketchup',
      cat: 'eat',
      name: 'L’Affaire est Ketchup',
      local: 'French bistro · Saint-Roch, Québec City',
      blurb: 'A tiny Saint-Roch bistro serving “home cooking, reinvented” (their words), with a menu that changes and is written on a chalkboard. Worth building a Québec City day around.',
      board: { kicker: 'Québec City', title: 'L’Affaire est Ketchup', sub: 'Menu on the chalkboard', price: '$$$' },
      tags: [{ label: 'Reserve ahead', kind: 'limited' }, { label: 'Québec City' }],
      facts: [
        ['Price', '$$$ on their Facebook page'],
        ['Reservations', 'Their page says to book ahead (“Réserver d’avance!!!”). Call 418-529-9020.'],
        ['Hours', 'Not posted online. Confirm the day when you call.'],
        ['Where', '46 rue Saint-Joseph Est, Québec (Saint-Roch)']
      ],
      dice: { tier: 3, hours: 12, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'L’Affaire est Ketchup · Facebook page (address, phone, price, reservations)', url: 'https://www.facebook.com/laffaireest.ketchup/' },
        { label: 'Frommer’s · L’Affaire est Ketchup (chalkboard menu)', url: 'https://www.frommers.com/destinations/quebec-city/restaurants/laffaire-est-ketchup/' }
      ]
    },

    // ---------------- CEPSUM ----------------
    {
      id: 'cepsum-skate',
      cat: 'cepsum',
      name: 'Free skating',
      local: 'CEPSUM arena',
      blurb: 'Public skating to music, with supervisors on the ice. Forward skating only.',
      art: 'rink',
      tags: [{ label: 'Free for UdeM · Poly · HEC', kind: 'free' }, { label: 'Book 2 days ahead' }],
      facts: [
        ['Price', 'UdeM, Poly and HEC students free · non-members 16+ $7 · under 15 $4'],
        ['Fall times', 'Wed 12:05–13:35 · Fri 16:15–17:45 · Sun 11:55–12:50 (until Dec 20)'],
        ['Booking', 'Reserve up to 2 days ahead, from 19:00: CEPSUM online portal, 514-343-6150, or the front desk'],
        ['Season', 'Free skating runs September to April']
      ],
      dice: { tier: 0, hours: 2, day: true, evening: false, car: false },
      schedule: { type: 'weekly', days: [0, 3, 5], to: '2026-12-20', dayNotes: { 3: '12:05', 5: '16:15', 0: '11:55' }, endedNote: 'The fall skating schedule ended December 20. Check CEPSUM for the winter times.' },
      sources: [
        { label: 'CEPSUM · Pratique libre (Patinage: prices, times, booking)', url: 'https://www.cepsum.umontreal.ca/pratique-libre' }
      ]
    },
    {
      id: 'cepsum-badminton',
      cat: 'cepsum',
      name: 'Badminton',
      local: 'CEPSUM courts',
      blurb: 'Book a court and play. Court time is part of the free access UdeM, Poly and HEC students get as CEPSUM members.',
      art: 'badminton',
      tags: [{ label: 'Included for UdeM · Poly · HEC', kind: 'free' }, { label: 'Members book', kind: 'limited' }],
      facts: [
        ['Who', 'UdeM, Poly and HEC students are members automatically. Non-members can’t book courts; a member can buy a friend a $20 guest card, but ask the front desk whether it covers court time.'],
        ['When', 'Every day during CEPSUM opening hours (some exceptions)'],
        ['Booking', 'Up to 2 days ahead, from 19:00: CEPSUM online portal, 514-343-6150, or the front desk'],
        ['Gear', 'Equipment rental is available at CEPSUM']
      ],
      dice: { tier: 0, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'CEPSUM · Pratique libre (racquet sports: times, booking)', url: 'https://www.cepsum.umontreal.ca/pratique-libre' },
        { label: 'CEPSUM · Campus students (free access, what’s included)', url: 'https://www.cepsum.umontreal.ca/abonnements/etudiants-du-campus' }
      ]
    },
    {
      id: 'cepsum-tennis',
      cat: 'cepsum',
      name: 'Tennis',
      local: 'CEPSUM courts',
      blurb: 'Same deal as badminton: student members book court time as part of their free access. If you’d rather learn first, there’s an adult beginner course.',
      art: 'tennis',
      tags: [{ label: 'Included for UdeM · Poly · HEC', kind: 'free' }, { label: 'Members book', kind: 'limited' }],
      facts: [
        ['Who', 'UdeM, Poly and HEC students are members automatically. Non-members can’t book courts; a member can buy a friend a $20 guest card, but ask the front desk whether it covers court time.'],
        ['When', 'Every day during CEPSUM opening hours (some exceptions)'],
        ['Booking', 'Up to 2 days ahead, from 19:00: CEPSUM online portal, 514-343-6150, or the front desk'],
        ['Lessons', 'Adult Level 1, fall session from Sept 14: 13–14 sessions of 1 h 15, Mon 17:30, Wed 18:45 or Thu 20:15 · members $280–302']
      ],
      dice: { tier: 0, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'CEPSUM · Pratique libre (racquet sports: times, booking)', url: 'https://www.cepsum.umontreal.ca/pratique-libre' },
        { label: 'CEPSUM · Tennis Level 1', url: 'https://www.cepsum.umontreal.ca/activite/tennis-niveau-1' }
      ]
    },
    {
      id: 'cepsum-gym',
      cat: 'cepsum',
      name: 'Gym',
      local: 'CEPSUM training room',
      blurb: 'The weights and cardio room isn’t part of free student access: you add a gym pass, or pay per visit. Check the live crowd meter to pick a quiet time.',
      art: 'gym',
      tags: [{ label: 'Pass needed' }, { label: 'Live crowd meter' }],
      facts: [
        ['Student pass', '$110 + tax for 4 months (paid at once) or $18.33 + tax a month for 12 months'],
        ['One visit', '$12 for a member'],
        ['Bring a friend', 'Guest card $20 (16+), includes gym access and basic equipment rental; 5 cards for $91'],
        ['Hours', 'CEPSUM: weekdays 6:30–23:00, weekends 8:30–20:30'],
        ['Crowds', [{ link: 'https://www.cepsum.umontreal.ca/achalandage-salle-d-entrainement', label: 'Live crowd meter' }]]
      ],
      dice: { tier: 1, hours: 2, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'CEPSUM · Campus students (gym pass prices)', url: 'https://www.cepsum.umontreal.ca/abonnements/etudiants-du-campus' },
        { label: 'CEPSUM · Guest cards', url: 'https://www.cepsum.umontreal.ca/cartons-dinvite' },
        { label: 'CEPSUM · Live crowd meter', url: 'https://www.cepsum.umontreal.ca/achalandage-salle-d-entrainement' }
      ]
    },

    // ---------------- Climbing ----------------
    {
      id: 'blocshop-mileex',
      cat: 'climb',
      name: 'Friday climbing at Bloc Shop',
      local: 'Bloc Shop Mile-Ex · bouldering',
      blurb: 'Qiwei climbs here most Friday nights, because Fridays cost $10 all day. It’s bouldering: no ropes, walls 3 to 4.5 m high over thick mats, and no reservation. First-timers welcome.',
      art: 'boulder',
      tags: [{ label: '$10 on Fridays', kind: 'free' }, { label: 'No reservation' }, { label: 'Beginners welcome' }],
      facts: [
        ['Fridays', '$10 all day (the “Vendredix” deal, bought on site) instead of $19 · prices before tax'],
        ['Other days', 'Off-peak $15 (weekdays before 15:00, weekends after 15:00) · 7 days unlimited $26'],
        ['Gear', 'Shoe rental $5 · chalk bag $3 · wear sports clothes (a top is required)'],
        ['First time', 'Sign the waiver online or at the desk; staff go over the safety rules in 2–3 minutes'],
        ['Hours', 'Mon–Fri 10:00–23:00 · Sat–Sun 9:00–21:00'],
        ['Where', '6595A rue Saint-Urbain, Mile-Ex']
      ],
      dice: { tier: 1, hours: 3, day: true, evening: true, car: false },
      schedule: { type: 'weekly', days: [5], dayNotes: { 5: 'evening' } },
      sources: [
        { label: 'Bloc Shop · Rates (Vendredix, day passes, rentals, hours)', url: 'https://blocshop.com/tarifs/' },
        { label: 'Bloc Shop · First time', url: 'https://blocshop.com/premiere-fois/' },
        { label: 'Bloc Shop · Gyms and addresses', url: 'https://blocshop.com/' }
      ]
    },

    // ---------------- Museums ----------------
    {
      id: 'redpath',
      cat: 'museums',
      name: 'Redpath Museum',
      local: 'McGill University',
      blurb: 'A Victorian natural-history museum on McGill’s campus with the largest dinosaur fossil collection in Québec (say hi to the Gorgosaurus and the Triceratops) and Canada’s second-largest collection of Egyptian artifacts.',
      img: { src: 'assets/img/redpath.jpg', alt: 'Skeleton of a Gorgosaurus under the ornate ceiling of the Redpath Museum', credit: 'Captmondo · CC BY-SA 3.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:DinosaurInRedpathMuseum_Montreal_March2003.JPG' },
      tags: [{ label: 'Pay what you can', kind: 'free' }, { label: '45–60 min' }],
      facts: [
        ['Price', 'Voluntary contribution; suggested $12 for adults'],
        ['Hours', 'Tue–Fri 9:00–16:30 · Sat 10:00–16:00 · closed Sun, Mon and statutory holidays'],
        ['Getting there', ['859 Sherbrooke St. W · ', { metro: 'green', station: 'McGill' }, ' or ', { metro: 'green', station: 'Peel' }]],
        ['Good to know', 'Groups of 7 or more must reserve ahead and pay a group fee. No elevator, no air conditioning, no food in the galleries.']
      ],
      dice: { tier: 0, hours: 2, day: true, evening: false, car: false },
      // Closed on McGill legal holidays: Thanksgiving, the Dec 24–Jan 1 break, Good Friday.
      schedule: { type: 'weekly', days: [2, 3, 4, 5, 6], to: '2027-06-24', closed: ['2026-10-12', '2026-12-24', '2026-12-25', '2026-12-26', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01', '2027-03-26'] },
      sources: [
        { label: 'Redpath · Visit (admission, hours)', url: 'https://www.mcgill.ca/redpath/visit' },
        { label: 'Redpath · FAQ (collections, transit, rules)', url: 'https://www.mcgill.ca/redpath/faqs' },
        { label: 'McGill · Key dates (legal holidays 2026–27)', url: 'https://www.mcgill.ca/importantdates/key-dates' }
      ]
    },
    {
      id: 'mbam',
      cat: 'museums',
      name: 'Montréal Museum of Fine Arts',
      local: 'Musée des beaux-arts de Montréal (MBAM)',
      blurb: 'The city’s big art museum on Sherbrooke Street. If you’re 25 or under, you get in free.',
      img: { src: 'assets/img/mbam.jpg', alt: 'The neoclassical facade of the Montreal Museum of Fine Arts under a blue sky', credit: 'Acediscovery · CC BY 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Montreal-Museum-of-Fine-Arts-May-2024.jpg' },
      tags: [{ label: 'Free at 25 and under', kind: 'free' }],
      facts: [
        ['Price', 'Free at 25 and under · $32 at 26 and over'],
        ['Free day', 'First Sunday of each month the collection is free for Québec residents (reservation required)'],
        ['Hours', 'Tue 10–17 · Wed 10–21 · Thu–Sun 10–17 · closed Mon'],
        ['Getting there', ['1380 Sherbrooke St. W · ', { metro: 'green', station: 'Peel' }, ' or ', { metro: 'green', station: 'Guy-Concordia' }]]
      ],
      dice: { tier: 2, hours: 3, day: true, evening: [3], car: false },
      schedule: { type: 'weekly', days: [0, 2, 3, 4, 5, 6], closed: ['2026-12-25', '2027-01-01'] },
      sources: [
        { label: 'MBAM · Plan your visit (hours, prices, first Sundays)', url: 'https://www.mbam.qc.ca/fr/renseignements/planifiez-votre-visite/' }
      ]
    },
    {
      id: 'mccord',
      cat: 'museums',
      name: 'McCord Stewart Museum',
      local: 'Musée McCord Stewart',
      blurb: 'Montréal’s social-history museum, right by McGill metro. Wednesday evenings are free.',
      img: { src: 'assets/img/mccord.jpg', alt: 'Inside the McCord Stewart Museum: a tall atrium with a carved totem pole beside the stairs', credit: 'Canmenwalker · CC BY 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:McCord_Stewart_Museum_interior_2026.JPG' },
      tags: [{ label: 'Free Wed after 5 pm', kind: 'free' }, { label: 'Student price' }],
      facts: [
        ['Price', 'Students 18–30: $15 online (+$2 at the door, bring student card and proof of full-time enrollment) · adults $20 online'],
        ['Cheaper times', 'Wednesdays from 17:00 free (featured exhibitions may cost $10) · first Sunday of the month pay what you can'],
        ['Hours', 'Tue 10–17 · Wed 10–21 · Thu–Sun 10–17 · closed Mon (open Mon Oct 12)'],
        ['Getting there', [{ metro: 'green', station: 'McGill' }, ' · bus 24']]
      ],
      dice: { tier: 1, hours: 2, day: true, evening: [3], car: false },
      schedule: { type: 'weekly', days: [0, 2, 3, 4, 5, 6], extraOpen: ['2026-10-12'] },
      sources: [
        { label: 'McCord Stewart · Prices', url: 'https://www.musee-mccord-stewart.ca/fr/tarifs/' },
        { label: 'McCord Stewart · Opening hours', url: 'https://www.musee-mccord-stewart.ca/fr/heures-ouverture/' }
      ]
    },
    {
      id: 'pac',
      cat: 'museums',
      name: 'Pointe-à-Callière',
      local: 'Montréal Archaeology and History Complex',
      blurb: 'The museum on the birthplace of Montréal, in Old Montréal. Good pairing with a walk along the Old Port.',
      img: { src: 'assets/img/pac.jpg', alt: 'The tower of the Pointe-à-Callière museum in Old Montréal', credit: 'Antony-22 · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Pointe-%C3%A0-Calli%C3%A8re_Museum_2023a.jpg' },
      tags: [{ label: 'Young-adult price' }],
      facts: [
        ['Price', 'Ages 18–30: $20 · ages 31–64: $30 (ID required, taxes included)'],
        ['Hours', 'Tue–Fri 10–17 · Sat–Sun 11–17 · last tickets one hour before closing'],
        ['Getting there', '350 place Royale, Old Montréal']
      ],
      dice: { tier: 1, hours: 2, day: true, evening: false, car: false },
      schedule: { type: 'weekly', days: [0, 2, 3, 4, 5, 6] },
      sources: [
        { label: 'Pointe-à-Callière · Hours and prices', url: 'https://pacmusee.qc.ca/fr/planifiez-votre-visite/horaires-et-tarifs/' }
      ]
    },

    // ---------------- Seasonal & shows ----------------
    {
      id: 'gardens-of-light',
      cat: 'events',
      name: 'Gardens of Light',
      local: 'Jardins de lumière · Montréal Botanical Garden',
      blurb: 'An evening lantern walk through the Botanical Garden’s three cultural gardens, ending at the Chinese Garden’s Dream Lake. Your ticket also covers the garden all day.',
      img: { src: 'assets/img/gardens-of-light.jpg', alt: 'A glowing dragon lantern over Dream Lake in the Chinese Garden at night', credit: 'Thomas1313 · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Dream_Lake_(Jardin_Botanique_Montr%C3%A9al)_24.jpg' },
      tags: [{ label: 'Until Nov 1', kind: 'limited' }, { label: 'Timed tickets' }],
      facts: [
        ['Evening hours', 'Sept 3–17: 19:30–21:00 · Sept 18–Oct 3: 19:00–21:00 · Oct 4–20: 18:30–21:00 · Oct 21–Nov 1: 18:00–21:00'],
        ['Tickets', 'Reserve a timed ticket. 2026 admission for one Espace pour la vie museum: students 18+ $19 ($14.75 for Montréal-area residents), adults $25.50'],
        ['Good to know', 'Rain or shine'],
        ['Getting there', ['4101 Sherbrooke St. E · ', { metro: 'green', station: 'Pie-IX' }]]
      ],
      dice: { tier: 1, hours: 3, day: false, evening: true, car: false },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6], to: '2026-11-01', endedNote: 'Gardens of Light ended on November 1.' },
      sources: [
        { label: 'Espace pour la vie · Gardens of Light (dates, hours, tickets)', url: 'https://calendrier.espacepourlavie.ca/gardens-of-light' },
        { label: 'Espace pour la vie · 2026 admission', url: 'https://espacepourlavie.ca/droits-dentree-pour-un-musee' },
        { label: 'Espace pour la vie · Getting to the Jardin botanique', url: 'https://espacepourlavie.ca/en/access/botanical-garden' }
      ]
    },
    {
      id: 'carabins',
      cat: 'events',
      name: 'Carabins football',
      local: 'Université de Montréal · CEPSUM stadium',
      blurb: 'Canadian university football on the UdeM campus. Tailgate on the CEPSUM terrace before kickoff.',
      img: { src: 'assets/img/carabins.jpg', alt: 'University football players in blue and black jerseys at the line of scrimmage', credit: 'Wilfredor · CC0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Universite_Laval_vs_Universite_de_Montreal,_Quebec_city,_Canada_04.jpg' },
      tags: [{ label: '4 home games left', left: 'games' }],
      facts: [
        ['Tickets', 'Regular games $13.00–$34.25 · Oct 16 and Oct 31 $16.50–$49.25 (service fees and taxes extra)'],
        ['Tailgate', 'On the CEPSUM terrace near the arena from 3 hours before kickoff; free BBQ grills for your own food; cans OK, no glass'],
        ['Getting there', ['2100 boul. Édouard-Montpetit · ', { metro: 'blue', station: 'Édouard-Montpetit' }, ' · parking is very limited']]
      ],
      dice: { tier: 1, hours: 4, car: false },
      schedule: {
        type: 'dates', endedNote: 'No home games left this season.',
        dates: [
          { date: '2026-09-18', part: 'evening', note: 'vs Sherbrooke · 19:00' },
          { date: '2026-10-03', part: 'day', note: 'vs Concordia · 13:00' },
          { date: '2026-10-16', part: 'evening', note: 'vs Laval · 19:00' },
          { date: '2026-10-31', part: 'day', note: 'Semi-final · 14:00' }
        ]
      },
      sources: [
        { label: 'Carabins · Football tickets (schedule, prices)', url: 'https://carabins.umontreal.ca/billetterie-football-carabins/' },
        { label: 'Carabins · Fan guide (tailgate, transit)', url: 'https://carabins.umontreal.ca/la-zone-des-partisans/guide-partisan-football/' }
      ]
    },
    {
      id: 'udem-concerts',
      cat: 'events',
      name: 'Free concerts at UdeM',
      local: 'Faculté de musique · Université de Montréal',
      blurb: 'The Faculty of Music puts on free evening concerts all season: professors, a contemporary ensemble, jazz and world music, gamelan, choir.',
      img: { src: 'assets/img/udem-concerts.jpg', alt: 'The curved modernist facade of Salle Claude-Champagne in winter', credit: 'D. Benjamin Miller · CC0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Vue_ext%C3%A9rieur_de_la_Salle_Claude-Champagne,_December_9,_2023.jpg' },
      tags: [{ label: 'Free', kind: 'free' }, { label: '19:30' }],
      facts: [
        ['Price', 'Free'],
        ['Where', ['Mostly Salle Claude-Champagne, 200 av. Vincent-d’Indy · ', { metro: 'blue', station: 'Édouard-Montpetit' }]],
        ['Other venues', 'Oct 22 and Jan 14: Église Saint-Viateur d’Outremont · Oct 23 and Jan 15: Salle Serge-Garant (B-484)']
      ],
      dice: { tier: 0, hours: 2, day: false, evening: true, car: false },
      schedule: {
        type: 'dates', endedNote: 'No more free concerts listed this season.',
        dates: [
          { date: '2026-10-22', note: 'Professors' },
          { date: '2026-10-23', note: 'Professors' },
          { date: '2026-11-13', note: 'Contemporary' },
          { date: '2026-11-20', note: 'Professors' },
          { date: '2026-12-01', note: 'Jazz & world' },
          { date: '2026-12-16', note: 'Ultrasons' },
          { date: '2026-12-17', note: 'Ultrasons' },
          { date: '2026-12-18', note: 'Ultrasons' },
          { date: '2026-12-19', note: 'Gamelan' },
          { date: '2026-12-20', note: 'Choir' },
          { date: '2027-01-14', note: 'Professors' },
          { date: '2027-01-15', note: 'Professors' }
        ]
      },
      sources: [
        { label: 'Faculté de musique · 2026–2027 season', url: 'https://musique.umontreal.ca/concerts-et-evenements/saison-2026-2027/' }
      ]
    },
    {
      id: 'xmas-market',
      cat: 'events',
      name: 'Great Christmas Market',
      local: 'Grand Marché de Noël · Quartier des spectacles',
      blurb: 'The holiday market on Jeanne-Mance Street, with more than 150 free activities through the season.',
      img: { src: 'assets/img/xmas-market.jpg', alt: 'People walking between wooden market stalls in the snow at Place des Arts', credit: 'Jeangagnon · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Marche_de_Noel_-_04.jpg' },
      tags: [{ label: 'Nov 13 – Jan 3' }, { label: '150+ free activities', kind: 'free' }],
      facts: [
        ['Nov 13–Dec 13', 'Wed–Fri 15:00–22:00 · Sat 11:00–22:00 · Sun 11:00–20:00'],
        ['Dec 16–Jan 3', 'Every day 15:00–22:00 · Dec 21–23 from 11:00 · Dec 24–25 11:00–19:00'],
        ['Where', 'Jeanne-Mance Street, Quartier des spectacles']
      ],
      dice: { tier: 0, hours: 2, day: [0, 6], evening: true, car: false },
      schedule: {
        type: 'weekly', endedNote: 'The market closed on January 3.',
        periods: [
          { from: '2026-11-13', to: '2026-12-13', days: [0, 3, 4, 5, 6] },
          { from: '2026-12-16', to: '2027-01-03', days: [0, 1, 2, 3, 4, 5, 6] }
        ]
      },
      sources: [
        { label: 'Noël Montréal · The Great Christmas Market (dates, hours)', url: 'https://noelmontreal.ca/grandmarchedenoel/en/the-great-christmas-market/' }
      ]
    },
    {
      id: 'mtl-en-lumiere',
      cat: 'events',
      name: 'MONTRÉAL EN LUMIÈRE',
      local: 'Winter festival',
      blurb: 'Montréal’s big February festival. The 2027 dates are announced; hours, program and prices aren’t published yet.',
      img: { src: 'assets/img/mtl-en-lumiere.jpg', alt: 'People walking on a street lit with blue and pink festival lights at night', credit: 'Vinckie · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Montr%C3%A9al_en_lumi%C3%A8re.JPG' },
      tags: [{ label: 'Feb 18–28, 2027' }],
      facts: [
        ['Dates', 'February 18 to 28, 2027'],
        ['Still to come', '2027 hours, program and prices']
      ],
      schedule: {
        type: 'dates', endedNote: 'The 2027 festival is over.',
        dates: ['2027-02-18', '2027-02-19', '2027-02-20', '2027-02-21', '2027-02-22', '2027-02-23', '2027-02-24', '2027-02-25', '2027-02-26', '2027-02-27', '2027-02-28'].map((date) => ({ date }))
      },
      sources: [
        { label: 'MONTRÉAL EN LUMIÈRE · official site', url: 'https://www.montrealenlumiere.com/' }
      ]
    },

    // ---------------- Snow ----------------
    {
      id: 'bromont-ski',
      cat: 'snow',
      name: 'Ski day at Bromont',
      local: 'Bromont, montagne d’expériences',
      blurb: 'Day and evening skiing in the Eastern Townships, with student tickets up to age 25.',
      img: { src: 'assets/img/bromont-ski.jpg', alt: 'A snowy ski hill above red-roofed houses in Bromont', credit: 'Martin Boyer · CC BY-SA 2.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Bromont_QC_CA.jpg' },
      tags: [{ label: 'Student price to 25', kind: 'free' }, { label: 'Car needed', kind: 'limited' }],
      facts: [
        ['Students 13–25', 'Apex card $66 per ticket (2–3 tickets) or $61 (4–8) · $120 at the ticket booth'],
        ['Adults', 'Apex card $86 or $80 · $142 at the ticket booth'],
        ['Season', 'Versant du Village planned to open Friday Dec 4; day and evening, 7 days a week'],
        ['Good to know', 'Taxes extra. Bring proof of age or student status. Rates are for 2026–27.']
      ],
      dice: { tier: 2, hours: 10, day: true, evening: true, car: true },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6], from: '2026-12-04' },
      sources: [
        { label: 'Bromont · Ski tickets 2026–27', url: 'https://www.bromontmontagne.com/en/ski-tickets/' },
        { label: 'Bromont · Detailed winter schedule', url: 'https://www.bromontmontagne.com/en/detailed-schedule/' }
      ]
    },
    {
      id: 'tremblant-ski',
      cat: 'snow',
      name: 'Ski day at Tremblant',
      local: 'Mont-Tremblant, Laurentians',
      blurb: 'Tremblant in the Laurentians. There’s no student price, but 2-to-7-day tickets bought by October 15 are cheaper per day.',
      img: { src: 'assets/img/tremblant-ski.jpg', alt: 'Snow-covered spruce trees at a mountain summit looking over the Laurentians', credit: 'ericahan.38 · CC BY-SA 4.0 · cropped', page: 'https://commons.wikimedia.org/wiki/File:Mont-Tremblant-1.jpg' },
      tags: [{ label: 'Car needed', kind: 'limited' }, { label: 'Opens Nov 26' }],
      facts: [
        ['Adults 18–69', '1 day from $148 · high season $164–$195 · until Oct 15, 2–7-day tickets from $104 a day'],
        ['Season', 'Nov 26, 2026 to Apr 18, 2027 (closed Dec 25 and Jan 1)'],
        ['High season', 'Dec 27–Jan 2, Feb 13–19, and every Fri–Sun in January, February and March'],
        ['Good to know', 'Royalty and taxes extra. No student category.']
      ],
      dice: { tier: 3, hours: 12, day: true, evening: false, car: true },
      schedule: { type: 'weekly', days: [0, 1, 2, 3, 4, 5, 6], from: '2026-11-26', to: '2027-04-18', closed: ['2026-12-25', '2027-01-01'] },
      sources: [
        { label: 'Tremblant · 2026/27 winter lift tickets', url: 'https://www.tremblant.ca/plan/tickets-and-passes/winter-lift-tickets' },
        { label: 'Tremblant · Opening hours (season dates)', url: 'https://www.tremblant.ca/mountain-village/opening-hours' }
      ]
    }
  ],

  // Movie night: filters for the movie dice. Add films to MOVIES; each needs a source link.
  MOVIE_COUNTRIES: ['USA', 'UK', 'France', 'Canada', 'Japan', 'South Korea', 'Mainland China', 'Hong Kong', 'Taiwan', 'India', 'Spain', 'Italy', 'Germany', 'Other'],
  MOVIE_DECADES: [2020, 2010, 2000, 1990, 1980, 1970, 1960, 1950],
  MOVIE_GENRES: ['Comedy', 'Drama', 'Romance', 'Horror', 'Thriller', 'Sci-fi', 'Action', 'Animation', 'Documentary', 'Crime', 'Fantasy', 'Family'],
  // { title: 'English title', original: 'Original title', year: 1999, countries: ['USA'], genres: ['Drama'], minutes: 120, link: 'https://…' }
  MOVIES: [],

  DEALS: [
    { name: 'Student transit pass (STM)', what: '$66 a month instead of $110 for the zone A all-modes monthly pass.', who: 'Full-time students aged 6–64 at a Québec-recognized school, with a photo OPUS card ($15 online).', url: 'https://www.stm.info/fr/tarifs/carte-opus-et-autres-supports/opus-tarif-reduit-etudiants' },
    { name: 'Carte Accès Montréal', what: '$11 a year for discounts at city venues and partners.', who: 'Anyone living on the island of Montréal. A student card with photo counts as ID.', url: 'https://montreal.ca/demarches/obtenir-une-carte-acces-montreal' },
    { name: 'Espace pour la vie', what: 'Biodôme, Botanical Garden, Insectarium, Planetarium, Biosphère: students 18+ pay $19.00, or $14.75 if you live in the Montréal metro area (2026 prices).', who: 'Show a student ID card.', url: 'https://espacepourlavie.ca/droits-dentree-pour-un-musee' },
    { name: 'Montréal Museum of Fine Arts', what: 'Free admission at 25 and under. First Sunday of each month the collection is free for Québec residents.', who: 'Age-based; first Sundays need a reservation.', url: 'https://www.mbam.qc.ca/fr/renseignements/planifiez-votre-visite/' },
    { name: 'McCord Stewart Museum', what: '$15 online for students; free Wednesday evenings from 17:00; pay what you can on first Sundays.', who: 'Students 18–30 with student card and proof of full-time enrollment.', url: 'https://www.musee-mccord-stewart.ca/fr/tarifs/' },
    { name: 'Pointe-à-Callière', what: '$20 instead of $30.', who: 'Ages 18–30, with ID.', url: 'https://pacmusee.qc.ca/fr/planifiez-votre-visite/horaires-et-tarifs/' },
    { name: 'Montréal Symphony Orchestra (OSM)', what: '$30 seats in categories 2–5, limited quantity per concert.', who: '35 and under, proof of age. Not for POP, Jeux d’enfants or benefit concerts.', url: 'https://osm.ca/fr/35-ans/' },
    { name: 'Opéra de Montréal', what: '$34 tickets; 15% off a 3-opera subscription with code ODM1834.', who: 'Ages 18–34, ID checked at the door.', url: 'https://operademontreal.com/billets-jeunes/' },
    { name: 'Les Grands Ballets', what: '30% off tickets after a $15 “Je me pointe!” membership (2 tickets per show; not The Nutcracker).', who: 'Ages 18–34, proof of age.', url: 'https://grandsballets.com/fr/billetterie/forfaits/programme-pour-les-34-ans-et-moins/' },
    { name: 'Québec national parks (Sépaq)', what: '$10.30 per adult per day, or $93 for a year of unlimited access to all Québec national parks.', who: 'No student price. 17 and under free.', url: 'https://www.sepaq.com/pq/tarification-parcs-nationaux.dot' },
    { name: 'Parks Canada Discovery Pass', what: '$83.50 for an adult, valid September 2026 to September 2027, taxes included.', who: 'No student price. 17 and under free.', url: 'https://reservation.pc.gc.ca/store/product/-2147479946' },
    { name: 'Free French classes', what: 'The Québec government’s part-time French courses are free.', who: '16+ and living in Québec. International students qualify if a recognized study program is their main occupation.', url: 'https://www.quebec.ca/education/apprendre-le-francais/cours-temps-partiel/personnes-immigrantes/conditions-admission' }
  ]
};
