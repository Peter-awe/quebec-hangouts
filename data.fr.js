/*
 * Québec Hangouts: French (Québec) text for the content in data.js.
 * Keyed by id. Arrays (tags, facts, sources) line up index by index with the English ones.
 * Every number, price, time and date must match data.js; update both files together.
 * Anything missing here falls back to English.
 */
window.QH_FR = {
  categories: {
    nature: { label: 'Montagnes et lacs', note: 'Prévisions du pic des couleurs d’automne : Laurentides 1re semaine d’octobre · Mont-Orford et Montérégie 3e semaine · Montréal 3e–4e semaine' },
    eat: { label: 'Bouffe', note: 'Parfois, la sortie, c’est juste un très bon repas' },
    cepsum: { label: 'CEPSUM', note: 'Le centre sportif de l’UdeM, gratuit pour les étudiants de l’UdeM, de Polytechnique et de HEC avec leur carte étudiante · 2100, boul. Édouard-Montpetit · en semaine 6 h 30–23 h, la fin de semaine 8 h 30–20 h 30' },
    climb: { label: 'Escalade', note: 'La routine du vendredi soir de Qiwei. Viens avec nous.' },
    museums: { label: 'Musées', note: 'Bien n’importe quel jour, parfait quand il pleut' },
    events: { label: 'Saisons et spectacles', note: 'Matchs, concerts, lumières et marchés' },
    snow: { label: 'Neige', note: 'Saison de ski 2026–27' }
  },

  activities: {
    'oka-apples': {
      name: 'Pommes + parc national d’Oka',
      local: 'Excursion Navette Nature · Parc national d’Oka',
      blurb: 'Une excursion d’une journée en autobus : le matin au verger Labonté de la pomme, l’après-midi au parc national d’Oka et son sentier du Calvaire. Chacun rapporte un panier de pommes de 3 L.',
      alt: 'Une petite chapelle de pierre sur le sentier du Calvaire d’Oka, parmi les feuilles orangées de l’automne',
      tags: ['Pas besoin d’auto', '2 dates restantes'],
      facts: [
        ['Prix', 'Étudiants avec carte 47,50 $ · adultes 52,25 $ (autobus, entrée au parc et pommes inclus)'],
        ['Horaire', 'Départ de la Gare d’autocars de Montréal (Berri-UQAM) à 8 h 30, retour vers 17 h'],
        ['Réservation', 'Chacun réserve son billet auprès de Navette Nature. Remboursement complet si tu annules 14 jours avant.'],
        ['À noter', '20 au 27 sept. : rues fermées autour de la gare d’autocars pour les Championnats du monde de cyclisme. Prévois plus de temps.']
      ],
      notes: { '2026-09-19': 'Autobus 8 h 30', '2026-09-27': 'Autobus 8 h 30' },
      endedNote: 'Plus aucune excursion annoncée cette saison.',
      sources: ['Navette Nature · Excursion pommes à Oka 2026 (prix, horaire)', 'Navette Nature · Calendrier de septembre', 'Orléans Express · Avis de fermeture de la gare d’autocars']
    },
    'tremblant-park': {
      name: 'Parc national du Mont-Tremblant',
      local: 'Excursion Navette Nature · Secteur du Lac-Monroe',
      blurb: 'Une journée complète au lac Monroe, dans les Laurentides, en navette. Les couleurs devraient y être à moitié changées la dernière semaine de septembre.',
      alt: 'Une colline boisée qui se reflète dans l’eau calme du lac Monroe',
      tags: ['Pas besoin d’auto', '2 dates restantes'],
      facts: [
        ['Prix', 'Étudiants avec carte 61 $ · adultes 66 $ (autobus et entrée au parc inclus)'],
        ['Horaire', 'Départ de la Gare d’autocars de Montréal (Berri-UQAM) à 8 h, départ du lac Monroe à 17 h, retour vers 19 h 15'],
        ['Réservation', 'Chacun réserve son billet auprès de Navette Nature. Remboursement complet si tu annules 14 jours avant.'],
        ['À noter', '20 au 27 sept. : rues fermées autour de la gare d’autocars pour les Championnats du monde de cyclisme. Prévois plus de temps.']
      ],
      notes: { '2026-09-19': 'Autobus 8 h', '2026-09-27': 'Autobus 8 h' },
      endedNote: 'Plus aucune excursion annoncée cette saison.',
      sources: ['Navette Nature · Excursion Mont-Tremblant 2026 (prix, horaire)', 'Navette Nature · Calendrier de septembre', 'Bonjour Québec · Prévisions des couleurs d’automne 2026']
    },
    'orford-park': {
      name: 'Parc national du Mont-Orford',
      local: 'Excursion Navette Nature · Secteur du Lac-Stukely',
      blurb: 'Une journée au lac Stukely, dans les Cantons-de-l’Est, en navette. Les couleurs y arrivent plus tard : le pic est prévu la troisième semaine d’octobre.',
      alt: 'Le lac Stukely avec une montagne boisée et arrondie derrière',
      tags: ['Pas besoin d’auto', '1 date restante'],
      facts: [
        ['Prix', 'Étudiants avec carte 58,25 $ · adultes 65,25 $ (autobus et entrée au parc inclus)'],
        ['Horaire', 'Départ de la Gare d’autocars de Montréal (Berri-UQAM) à 8 h 30, retour vers 18 h 30'],
        ['Réservation', 'Chacun réserve son billet auprès de Navette Nature. Remboursement complet si tu annules 14 jours avant.'],
        ['À noter', '20 au 27 sept. : rues fermées autour de la gare d’autocars pour les Championnats du monde de cyclisme. Prévois plus de temps.']
      ],
      notes: { '2026-09-26': 'Autobus 8 h 30' },
      endedNote: 'Plus aucune excursion annoncée cette saison.',
      sources: ['Navette Nature · Excursion Mont-Orford 2026 (prix, horaire)', 'Navette Nature · Calendrier de septembre', 'Bonjour Québec · Prévisions des couleurs d’automne 2026']
    },
    'mont-royal': {
      name: 'Parc du Mont-Royal',
      local: 'Mount Royal Park',
      blurb: 'La montagne en plein cœur de la ville : sentiers en forêt, belvédères et le lac aux Castors, où l’on peut louer des chaloupes et des jeux extérieurs les fins de semaine de septembre.',
      alt: 'Le lac aux Castors sur le mont Royal, avec des arbres d’automne sous un ciel nuageux',
      tags: ['Pas besoin d’auto', 'Tous les jours'],
      facts: [
        ['Heures', 'De 6 h à minuit, tous les jours'],
        ['Coût', 'Aucun droit d’entrée indiqué; 5 stationnements payants'],
        ['Lac aux Castors', 'Location de chaloupes et de jeux extérieurs la fin de semaine, de midi à 18 h, jusqu’au 28 sept.'],
        ['Accès', 'L’autobus 11 traverse le parc · Pavillon du Lac-aux-Castors, 2000, chemin Remembrance'],
        ['À noter', 'Jusqu’au 4 oct., l’avenue du Parc est fermée au pied de la montagne pour les Championnats du monde de cyclisme (courses du 19 au 27 sept.).']
      ],
      sources: ['Ville de Montréal · Parc du Mont-Royal (heures, stationnement)', 'Les amis de la montagne · Chaloupes et jeux extérieurs', 'STM · Parc du Mont-Royal (autobus 11)', 'Ville de Montréal · Fermetures pour les championnats UCI']
    },
    'jean-drapeau': {
      name: 'Parc Jean-Drapeau',
      local: 'Île Sainte-Hélène et île Notre-Dame',
      blurb: 'Deux îles sur le Saint-Laurent, sur la ligne jaune du métro : vues sur le fleuve, sentiers et la Biosphère, musée de l’environnement installé dans l’ancien dôme d’Expo 67.',
      alt: 'Le dôme géodésique de la Biosphère derrière des arbres verts',
      tags: ['Pas besoin d’auto', 'Tous les jours'],
      facts: [
        ['Heures', 'Île Sainte-Hélène de 6 h à minuit · île Notre-Dame de 6 h à 23 h, tous les jours'],
        ['Biosphère', 'Billet de musée séparé : étudiants 18 ans et plus 19 $, adultes 25,50 $ (2026)'],
        ['Accès', [{ metro: 'yellow', station: 'Jean-Drapeau' }, ' · zone tarifaire A']]
      ],
      sources: ['Parc Jean-Drapeau · FAQ (heures)', 'Parc Jean-Drapeau · Se rendre au parc', 'Espace pour la vie · Droits d’entrée 2026']
    },
    'gault': {
      name: 'Mont Saint-Hilaire',
      local: 'Réserve naturelle Gault · Université McGill',
      blurb: 'La réserve naturelle de McGill autour du lac Hertel : 25 km de sentiers en forêt, avec des montées allant jusqu’à environ 280 m. Le pic des couleurs en Montérégie est prévu la troisième semaine d’octobre.',
      alt: 'Le lac Hertel entouré de collines boisées',
      tags: ['Plage horaire à réserver', 'Tous les jours'],
      facts: [
        ['Prix', 'Accès quotidien adulte 8,96 $ · 17 ans et moins gratuit · aucun tarif étudiant'],
        ['Réservation', 'En ligne seulement, pour une plage horaire d’arrivée. Les retardataires sont refusés, alors réservez tous la même plage.'],
        ['Sentiers', 'Ouverts tous les jours, 8 h–18 h à l’heure avancée, 8 h–16 h en hiver'],
        ['Accès', '422, chemin des Moulins, Mont-Saint-Hilaire. L’autobus 200, le transport à la demande exo 361 et un train sont indiqués; le covoiturage est le plus simple.']
      ],
      sources: ['Réserve naturelle Gault · Activités de plein air (prix, heures, règles)', 'Réserve naturelle Gault · Nous joindre (adresse, transport)', 'Bonjour Québec · Prévisions des couleurs d’automne 2026']
    },
    'acropole': {
      name: 'L’Acropole des Draveurs',
      local: 'Parc national des Hautes-Gorges-de-la-Rivière-Malbaie · Charlevoix',
      blurb: 'La randonnée au sommet la plus connue de Charlevoix : on monte à travers la forêt jusqu’à un sommet arctique-alpin, avec la rivière Malbaie tout en bas. Niveau difficile, et une escapade de fin de semaine depuis Montréal.',
      alt: 'Vue du sommet de l’Acropole des Draveurs sur la vallée de la rivière Malbaie, entre des falaises abruptes',
      tags: ['Difficile', 'Auto nécessaire', 'Escapade de fin de semaine', 'Sentier ouvert jusqu’au 12 oct.'],
      facts: [
        ['Sentier', '11,2 km aller-retour · 800 m de dénivelé · 4 à 6 heures'],
        ['Saison', 'Normalement ouvert du deuxième vendredi de juin au lundi de l’Action de grâce (12 octobre 2026), selon l’état du sentier'],
        ['Heure de départ', 'En septembre, départ entre le lever du soleil et midi, et descente du sommet au plus tard à 15 h 30. Du 1er octobre à la fermeture, départ avant midi et descente au plus tard à 15 h. Un garde-parc ferme le sentier.'],
        ['À apporter', 'Bottes de randonnée, au moins 2 L d’eau par personne, bâtons, vêtements chauds (il fait habituellement 5 à 10 °C de moins au sommet)'],
        ['Accès', 'Départ du sentier au camping Le Pin-Blanc (km 6). Le parc est à 170 km de Québec; en été, une navette obligatoire relie ses deux centres d’accueil.'],
        ['Droits d’accès', 'Accès quotidien Sépaq, 10,30 $ par adulte']
      ],
      endedNote: 'Le sentier est fermé pour la saison depuis le lundi de l’Action de grâce (12 octobre). Il rouvre normalement le deuxième vendredi de juin.',
      sources: ['Sépaq · Acropole-des-Draveurs : renseignements importants (saison, heures de départ et de descente)', 'Sépaq · Sentiers de randonnée des Hautes-Gorges', 'Sépaq · Accès et périodes d’exploitation des Hautes-Gorges', 'Sépaq · Tarifs d’accès aux parcs nationaux']
    },
    'sbl': {
      name: 'Station de biologie des Laurentides',
      local: 'SBL · Université de Montréal',
      blurb: 'La station de recherche en nature de l’Université de Montréal : 16,4 km² de forêt avec une quinzaine de lacs, à une heure au nord de la ville. On y dort, on mange à la cafétéria et on part en canot.',
      alt: 'Un lac calme avec un quai de bois et de petites embarcations, entouré de forêt',
      tags: ['Avec nuitée', 'Auto nécessaire', 'Ouvert jusqu’au 1er nov.'],
      facts: [
        ['Nuit + repas', 'Étudiants UdeM, Poly et HEC 52 $ · autres étudiants 88,55 $ · autres personnes 123,50 $ (dîner, souper et un lit en chambre double; taxes en sus)'],
        ['Visite d’un jour', 'Avec dîner : étudiants UdeM, Poly et HEC 16 $ · autres étudiants 27,25 $ · autres personnes 38 $'],
        ['À faire', 'Canot ou chaloupe, sentiers de randonnée, feu de camp, volleyball de plage, ping-pong, jeux de société'],
        ['Accès', '592, chemin du lac Croche, Saint-Hippolyte. Aucun arrêt de transport en commun sur ce chemin, alors il faut une auto.'],
        ['Réservation', 'Appelle au 450-563-3111 (poste 1) ou écris à sbl@iro.umontreal.ca. Les groupes de plus de 20 personnes doivent réserver par courriel.']
      ],
      endedNote: 'Fermé pour la saison après le 1er novembre.',
      sources: ['SBL · Planifier votre visite', 'SBL · Tarifs été 2026, UdeM (PDF)', 'SBL · Tarifs été 2026, externes (PDF)', 'SBL · Activités de loisirs', 'SBL · Site de réservation', 'SBL · Information sur le territoire']
    },

    'yokato': {
      name: 'Yokato Yokabai',
      local: 'Ramen · Plateau-Mont-Royal',
      blurb: 'Des ramens tonkotsu à la mode de Hakata, dans une petite adresse du Plateau qui partage ses locaux avec l’izakaya Ichigo Ichie. Au Guide MICHELIN, qui souligne que l’attente en vaut la peine.',
      board: { kicker: 'Guide MICHELIN', sub: 'Tonkotsu · Gomami · Végé' },
      tags: ['Guide MICHELIN', 'Sans réservation'],
      facts: [
        ['Ramens', 'Tonkotsu (bouillon de porc), Gomami (bouillon au sésame) et un ramen végétarien'],
        ['Prix', '$$ au Guide MICHELIN'],
        ['Heures', 'Lun–mer 11 h 30–14 h 30 et 17 h–22 h · jeu jusqu’à 22 h 30 · ven jusqu’à 23 h · sam 11 h 30–23 h · dim 11 h 30–22 h'],
        ['Attente', 'Pas de réservation côté ramen. Le resto suggère 17 h–18 h ou 20 h 30–21 h 45 pour attendre moins longtemps.'],
        ['Adresse', ['4185, rue Drolet · ', { metro: 'orange', station: 'Mont-Royal' }]]
      ],
      sources: ['Yokato Yokabai · Site officiel (heures, menu, réservations)', 'Guide MICHELIN · Yokato Yokabai']
    },
    'affaire-ketchup': {
      name: 'L’Affaire est Ketchup',
      local: 'Bistro · Saint-Roch, Québec',
      blurb: 'Un tout petit bistro de Saint-Roch qui fait de la cuisine maison réinventée, selon sa propre description, avec un menu qui change et s’écrit sur l’ardoise. Ça vaut une journée à Québec.',
      board: { kicker: 'Ville de Québec', sub: 'Menu sur l’ardoise' },
      tags: ['Réserver d’avance', 'Ville de Québec'],
      facts: [
        ['Prix', '$$$ sur leur page Facebook'],
        ['Réservations', 'Leur page dit de réserver d’avance (« Réserver d’avance!!! »). Appelle au 418-529-9020.'],
        ['Heures', 'Pas publiées en ligne. Confirme la journée quand tu appelles.'],
        ['Adresse', '46, rue Saint-Joseph Est, Québec (Saint-Roch)']
      ],
      sources: ['L’Affaire est Ketchup · Page Facebook (adresse, téléphone, prix, réservations)', 'Frommer’s · L’Affaire est Ketchup (menu sur ardoise)']
    },

    'cepsum-skate': {
      name: 'Patinage libre',
      local: 'Aréna du CEPSUM',
      blurb: 'Du patinage libre en musique, avec des surveillants sur la glace. Patinage vers l’avant seulement.',
      tags: ['Gratuit pour UdeM · Poly · HEC', 'Réservation jusqu’à 2 jours d’avance'],
      facts: [
        ['Prix', 'Étudiants UdeM, Poly et HEC gratuit · non-membres 16 ans et plus 7 $ · moins de 15 ans 4 $'],
        ['Horaire d’automne', 'Mer 12 h 05–13 h 35 · ven 16 h 15–17 h 45 · dim 11 h 55–12 h 50 (jusqu’au 20 déc.)'],
        ['Réservation', 'Jusqu’à 2 jours d’avance, à partir de 19 h : portail en ligne du CEPSUM, 514-343-6150 ou à l’accueil'],
        ['Saison', 'Le patinage libre a lieu de septembre à avril']
      ],
      dayNotes: { 0: '11 h 55', 3: '12 h 05', 5: '16 h 15' },
      endedNote: 'L’horaire de patinage d’automne a pris fin le 20 décembre. Consulte le CEPSUM pour l’horaire d’hiver.',
      sources: ['CEPSUM · Pratique libre (patinage : prix, horaires, réservation)']
    },
    'cepsum-badminton': {
      name: 'Badminton',
      local: 'Terrains du CEPSUM',
      blurb: 'Réserve un terrain et joue. Le temps de terrain fait partie de l’accès gratuit des étudiants de l’UdeM, de Poly et de HEC, qui sont membres du CEPSUM.',
      tags: ['Inclus pour UdeM · Poly · HEC', 'Réservé aux membres'],
      facts: [
        ['Qui', 'Les étudiants de l’UdeM, de Poly et de HEC sont membres automatiquement. Les non-membres ne peuvent pas réserver de terrain; un membre peut acheter un carton d’invité de 20 $ pour un ami, mais demande à l’accueil s’il couvre le temps de terrain.'],
        ['Quand', 'Tous les jours pendant les heures d’ouverture du CEPSUM (quelques exceptions)'],
        ['Réservation', 'Jusqu’à 2 jours d’avance, à partir de 19 h : portail en ligne du CEPSUM, 514-343-6150 ou à l’accueil'],
        ['Équipement', 'Location d’équipement offerte au CEPSUM']
      ],
      sources: ['CEPSUM · Pratique libre (sports de raquette : horaires, réservation)', 'CEPSUM · Étudiants du campus (accès gratuit, ce qui est inclus)']
    },
    'cepsum-tennis': {
      name: 'Tennis',
      local: 'Terrains du CEPSUM',
      blurb: 'Même principe que le badminton : les étudiants membres réservent du temps de terrain avec leur accès gratuit. Pour apprendre d’abord, il y a un cours pour adultes débutants.',
      tags: ['Inclus pour UdeM · Poly · HEC', 'Réservé aux membres'],
      facts: [
        ['Qui', 'Les étudiants de l’UdeM, de Poly et de HEC sont membres automatiquement. Les non-membres ne peuvent pas réserver de terrain; un membre peut acheter un carton d’invité de 20 $ pour un ami, mais demande à l’accueil s’il couvre le temps de terrain.'],
        ['Quand', 'Tous les jours pendant les heures d’ouverture du CEPSUM (quelques exceptions)'],
        ['Réservation', 'Jusqu’à 2 jours d’avance, à partir de 19 h : portail en ligne du CEPSUM, 514-343-6150 ou à l’accueil'],
        ['Cours', 'Adulte niveau 1, session d’automne dès le 14 sept. : 13 ou 14 séances de 1 h 15, lun 17 h 30, mer 18 h 45 ou jeu 20 h 15 · membres 280–302 $']
      ],
      sources: ['CEPSUM · Pratique libre (sports de raquette : horaires, réservation)', 'CEPSUM · Tennis niveau 1']
    },
    'cepsum-gym': {
      name: 'Salle d’entraînement',
      local: 'CEPSUM',
      blurb: 'La salle de musculation et de cardio ne fait pas partie de l’accès étudiant gratuit : il faut ajouter un abonnement ou payer à la visite. Consulte l’achalandage en direct pour choisir un moment tranquille.',
      tags: ['Abonnement requis', 'Achalandage en direct'],
      facts: [
        ['Abonnement étudiant', '110 $ + taxes pour 4 mois (payé en une fois) ou 18,33 $ + taxes par mois pendant 12 mois'],
        ['Une visite', '12 $ pour un membre'],
        ['Amener un ami', 'Carton d’invité 20 $ (16 ans et plus), accès à la salle et location d’équipement de base inclus; 5 cartons pour 91 $'],
        ['Heures', 'CEPSUM : en semaine 6 h 30–23 h, la fin de semaine 8 h 30–20 h 30'],
        ['Achalandage', [{ link: 'https://www.cepsum.umontreal.ca/achalandage-salle-d-entrainement', label: 'Achalandage en direct' }]]
      ],
      sources: ['CEPSUM · Étudiants du campus (prix des abonnements)', 'CEPSUM · Cartons d’invité', 'CEPSUM · Achalandage en direct']
    },

    'blocshop-mileex': {
      name: 'Escalade du vendredi au Bloc Shop',
      local: 'Bloc Shop Mile-Ex · bloc',
      blurb: 'Qiwei grimpe ici presque tous les vendredis soir, parce que le vendredi coûte 10 $ toute la journée. C’est du bloc : pas de corde, des murs de 3 à 4,5 m au-dessus d’épais tapis, et pas de réservation. Les débutants sont les bienvenus.',
      tags: ['10 $ le vendredi', 'Sans réservation', 'Débutants bienvenus'],
      facts: [
        ['Vendredis', '10 $ toute la journée (l’offre « Vendredix », achetée sur place) au lieu de 19 $ · prix avant taxes'],
        ['Autres jours', 'Heures creuses 15 $ (en semaine avant 15 h, la fin de semaine après 15 h) · 7 jours illimités 26 $'],
        ['Équipement', 'Location de chaussons 5 $ · sac à magnésie 3 $ · tenue sportive (un haut est obligatoire)'],
        ['Première fois', 'Signe la décharge en ligne ou à l’accueil; le personnel explique les règles de sécurité en 2 ou 3 minutes'],
        ['Heures', 'Lun–ven 10 h–23 h · sam–dim 9 h–21 h'],
        ['Adresse', '6595A, rue Saint-Urbain, Mile-Ex']
      ],
      dayNotes: { 5: 'soir' },
      sources: ['Bloc Shop · Tarifs (Vendredix, passes journalières, location, heures)', 'Bloc Shop · Première fois', 'Bloc Shop · Centres et adresses']
    },

    'redpath': {
      name: 'Musée Redpath',
      local: 'Université McGill',
      blurb: 'Un musée d’histoire naturelle victorien sur le campus de McGill, avec la plus grande collection de fossiles de dinosaures au Québec (salue le gorgosaure et le tricératops) et la deuxième collection d’artefacts égyptiens en importance au Canada.',
      alt: 'Squelette d’un gorgosaure sous le plafond orné du Musée Redpath',
      tags: ['Contribution volontaire', '45 à 60 min'],
      facts: [
        ['Prix', 'Contribution volontaire; 12 $ suggérés pour les adultes'],
        ['Heures', 'Mar–ven 9 h–16 h 30 · sam 10 h–16 h · fermé dim, lun et jours fériés'],
        ['Accès', ['859, rue Sherbrooke Ouest · ', { metro: 'green', station: 'McGill' }, ' ou ', { metro: 'green', station: 'Peel' }]],
        ['Bon à savoir', 'Les groupes de 7 personnes ou plus doivent réserver d’avance et payer des frais de groupe. Pas d’ascenseur, pas de climatisation, pas de nourriture dans les salles.']
      ],
      sources: ['Redpath · Visite (entrée, heures)', 'Redpath · FAQ (collections, transport, règles)', 'McGill · Dates importantes (congés 2026–27)']
    },
    'mbam': {
      name: 'Musée des beaux-arts de Montréal',
      local: 'MBAM',
      blurb: 'Le grand musée d’art de la ville, rue Sherbrooke. Si tu as 25 ans ou moins, l’entrée est gratuite.',
      alt: 'La façade néoclassique du Musée des beaux-arts de Montréal sous un ciel bleu',
      tags: ['Gratuit pour les 25 ans et moins'],
      facts: [
        ['Prix', 'Gratuit pour les 25 ans et moins · 32 $ pour les 26 ans et plus'],
        ['Journée gratuite', 'Le premier dimanche du mois, la collection est gratuite pour les résidents du Québec (réservation obligatoire)'],
        ['Heures', 'Mar 10 h–17 h · mer 10 h–21 h · jeu–dim 10 h–17 h · fermé lun'],
        ['Accès', ['1380, rue Sherbrooke Ouest · ', { metro: 'green', station: 'Peel' }, ' ou ', { metro: 'green', station: 'Guy-Concordia' }]]
      ],
      sources: ['MBAM · Planifiez votre visite (heures, prix, premiers dimanches)']
    },
    'mccord': {
      name: 'Musée McCord Stewart',
      local: 'Histoire sociale de Montréal',
      blurb: 'Le musée d’histoire sociale de Montréal, tout près du métro McGill. Gratuit le mercredi soir.',
      alt: 'Intérieur du Musée McCord Stewart : un grand atrium avec un mât totémique sculpté près de l’escalier',
      tags: ['Gratuit le mercredi dès 17 h', 'Tarif étudiant'],
      facts: [
        ['Prix', 'Étudiants 18–30 ans : 15 $ en ligne (+2 $ sur place, avec carte étudiante et preuve d’inscription à temps plein) · adultes 20 $ en ligne'],
        ['Moins cher', 'Le mercredi dès 17 h, gratuit (les expositions vedettes peuvent coûter 10 $) · le premier dimanche du mois, contribution volontaire'],
        ['Heures', 'Mar 10 h–17 h · mer 10 h–21 h · jeu–dim 10 h–17 h · fermé lun (ouvert le lun 12 oct.)'],
        ['Accès', [{ metro: 'green', station: 'McGill' }, ' · autobus 24']]
      ],
      sources: ['McCord Stewart · Tarifs', 'McCord Stewart · Heures d’ouverture']
    },
    'pac': {
      name: 'Pointe-à-Callière',
      local: 'Cité d’archéologie et d’histoire de Montréal',
      blurb: 'Le musée sur le lieu de fondation de Montréal, dans le Vieux-Montréal. À combiner avec une balade au Vieux-Port.',
      alt: 'La tour du musée Pointe-à-Callière dans le Vieux-Montréal',
      tags: ['Tarif jeunes adultes'],
      facts: [
        ['Prix', '18–30 ans : 20 $ · 31–64 ans : 30 $ (pièce d’identité requise, taxes incluses)'],
        ['Heures', 'Mar–ven 10 h–17 h · sam–dim 11 h–17 h · derniers billets une heure avant la fermeture'],
        ['Accès', '350, place Royale, Vieux-Montréal']
      ],
      sources: ['Pointe-à-Callière · Horaires et tarifs']
    },

    'gardens-of-light': {
      name: 'Jardins de lumière',
      local: 'Jardin botanique de Montréal',
      blurb: 'Une balade du soir parmi les lanternes dans les trois jardins culturels du Jardin botanique, jusqu’au lac de Rêve du Jardin de Chine. Ton billet donne aussi accès au Jardin toute la journée.',
      alt: 'Une lanterne en forme de dragon illuminée au-dessus du lac de Rêve, au Jardin de Chine, la nuit',
      tags: ['Jusqu’au 1er nov.', 'Billets horodatés'],
      facts: [
        ['Heures du soir', '3–17 sept. : 19 h 30–21 h · 18 sept.–3 oct. : 19 h–21 h · 4–20 oct. : 18 h 30–21 h · 21 oct.–1er nov. : 18 h–21 h'],
        ['Billets', 'Réserve un billet horodaté. Droits d’entrée 2026 pour un musée d’Espace pour la vie : étudiants 18 ans et plus 19 $ (14,75 $ pour les résidents de la région de Montréal), adultes 25,50 $'],
        ['Bon à savoir', 'Beau temps, mauvais temps'],
        ['Accès', ['4101, rue Sherbrooke Est · ', { metro: 'green', station: 'Pie-IX' }]]
      ],
      endedNote: 'Les Jardins de lumière ont pris fin le 1er novembre.',
      sources: ['Espace pour la vie · Jardins de lumière (dates, heures, billets)', 'Espace pour la vie · Droits d’entrée 2026', 'Espace pour la vie · Se rendre au Jardin botanique']
    },
    'carabins': {
      name: 'Football des Carabins',
      local: 'Université de Montréal · Stade du CEPSUM',
      blurb: 'Du football universitaire canadien sur le campus de l’UdeM. Tailgate sur la terrasse du CEPSUM avant le botté d’envoi.',
      alt: 'Des joueurs de football universitaire en maillots bleus et noirs sur la ligne de mêlée',
      tags: ['4 matchs locaux restants'],
      facts: [
        ['Billets', 'Matchs réguliers 13,00–34,25 $ · 16 oct. et 31 oct. 16,50–49,25 $ (frais de service et taxes en sus)'],
        ['Tailgate', 'Sur la terrasse du CEPSUM près de l’aréna, dès 3 heures avant le match; BBQ gratuits pour ta propre nourriture; canettes permises, pas de verre'],
        ['Accès', ['2100, boul. Édouard-Montpetit · ', { metro: 'blue', station: 'Édouard-Montpetit' }, ' · stationnement très limité']]
      ],
      notes: { '2026-09-18': 'vs Sherbrooke · 19 h', '2026-10-03': 'vs Concordia · 13 h', '2026-10-16': 'vs Laval · 19 h', '2026-10-31': 'Demi-finale · 14 h' },
      endedNote: 'Plus aucun match local cette saison.',
      sources: ['Carabins · Billetterie football (calendrier, prix)', 'Carabins · Guide partisan football (tailgate, transport)']
    },
    'udem-concerts': {
      name: 'Concerts gratuits à l’UdeM',
      local: 'Faculté de musique · Université de Montréal',
      blurb: 'La Faculté de musique présente des concerts gratuits en soirée toute la saison : professeurs, ensemble de musique contemporaine, jazz et musiques du monde, gamelan, chœur.',
      alt: 'La façade moderniste et courbe de la salle Claude-Champagne en hiver',
      tags: ['Gratuit', '19 h 30'],
      facts: [
        ['Prix', 'Gratuit'],
        ['Lieu', ['Surtout à la salle Claude-Champagne, 200, av. Vincent-d’Indy · ', { metro: 'blue', station: 'Édouard-Montpetit' }]],
        ['Autres lieux', '22 oct. et 14 janv. : église Saint-Viateur d’Outremont · 23 oct. et 15 janv. : salle Serge-Garant (B-484)']
      ],
      notes: {
        '2026-10-22': 'Professeurs', '2026-10-23': 'Professeurs', '2026-11-13': 'Contemporain', '2026-11-20': 'Professeurs',
        '2026-12-01': 'Jazz et monde', '2026-12-16': 'Ultrasons', '2026-12-17': 'Ultrasons', '2026-12-18': 'Ultrasons',
        '2026-12-19': 'Gamelan', '2026-12-20': 'Chœur', '2027-01-14': 'Professeurs', '2027-01-15': 'Professeurs'
      },
      endedNote: 'Plus aucun concert gratuit annoncé cette saison.',
      sources: ['Faculté de musique · Saison 2026–2027']
    },
    'xmas-market': {
      name: 'Grand Marché de Noël',
      local: 'Quartier des spectacles',
      blurb: 'Le marché des fêtes de la rue Jeanne-Mance, avec plus de 150 activités gratuites pendant la saison.',
      alt: 'Des gens marchent entre des kiosques de bois sous la neige à la Place des Arts',
      tags: ['13 nov. – 3 janv.', '150+ activités gratuites'],
      facts: [
        ['13 nov.–13 déc.', 'Mer–ven 15 h–22 h · sam 11 h–22 h · dim 11 h–20 h'],
        ['16 déc.–3 janv.', 'Tous les jours 15 h–22 h · 21–23 déc. dès 11 h · 24–25 déc. 11 h–19 h'],
        ['Lieu', 'Rue Jeanne-Mance, Quartier des spectacles']
      ],
      endedNote: 'Le marché a fermé le 3 janvier.',
      sources: ['Noël Montréal · Le Grand Marché de Noël (dates, heures)']
    },
    'mtl-en-lumiere': {
      name: 'MONTRÉAL EN LUMIÈRE',
      local: 'Festival d’hiver',
      blurb: 'Le grand festival de février à Montréal. Les dates de 2027 sont annoncées; les heures, la programmation et les prix ne sont pas encore publiés.',
      alt: 'Des gens marchent la nuit dans une rue illuminée de lumières bleues et roses',
      tags: ['18–28 févr. 2027'],
      facts: [
        ['Dates', 'Du 18 au 28 février 2027'],
        ['À venir', 'Heures, programmation et prix 2027']
      ],
      endedNote: 'Le festival 2027 est terminé.',
      sources: ['MONTRÉAL EN LUMIÈRE · Site officiel']
    },

    'bromont-ski': {
      name: 'Journée de ski à Bromont',
      local: 'Bromont, montagne d’expériences',
      blurb: 'Ski de jour et de soirée dans les Cantons-de-l’Est, avec des billets étudiants jusqu’à 25 ans.',
      alt: 'Une pente de ski enneigée au-dessus de maisons aux toits rouges à Bromont',
      tags: ['Tarif étudiant jusqu’à 25 ans', 'Auto nécessaire'],
      facts: [
        ['Étudiants 13–25 ans', 'Carte Apex 66 $ par billet (2 ou 3 billets) ou 61 $ (4 à 8) · 120 $ à la billetterie'],
        ['Adultes', 'Carte Apex 86 $ ou 80 $ · 142 $ à la billetterie'],
        ['Saison', 'Ouverture du Versant du Village prévue le vendredi 4 déc.; jour et soir, 7 jours sur 7'],
        ['Bon à savoir', 'Taxes en sus. Apporte une preuve d’âge ou de statut étudiant. Tarifs 2026–27.']
      ],
      sources: ['Bromont · Billets de ski 2026–27', 'Bromont · Horaire détaillé de l’hiver']
    },
    'tremblant-ski': {
      name: 'Journée de ski à Tremblant',
      local: 'Mont-Tremblant, Laurentides',
      blurb: 'Tremblant, dans les Laurentides. Pas de tarif étudiant, mais les billets de 2 à 7 jours achetés d’ici le 15 octobre coûtent moins cher par jour.',
      alt: 'Des épinettes couvertes de neige au sommet d’une montagne, avec vue sur les Laurentides',
      tags: ['Auto nécessaire', 'Ouverture le 26 nov.'],
      facts: [
        ['Adultes 18–69 ans', '1 jour à partir de 148 $ · haute saison 164–195 $ · jusqu’au 15 oct., billets de 2 à 7 jours dès 104 $ par jour'],
        ['Saison', 'Du 26 nov. 2026 au 18 avr. 2027 (fermé le 25 déc. et le 1er janv.)'],
        ['Haute saison', '27 déc.–2 janv., 13–19 févr., et du vendredi au dimanche chaque semaine en janvier, février et mars'],
        ['Bon à savoir', 'Redevance et taxes en sus. Aucune catégorie étudiante.']
      ],
      sources: ['Tremblant · Billets de remontée hiver 2026/27', 'Tremblant · Heures d’ouverture (dates de la saison)']
    }
  },

  movieCountries: {
    'USA': 'États-Unis', 'UK': 'Royaume-Uni', 'France': 'France', 'Canada': 'Canada', 'Japan': 'Japon', 'South Korea': 'Corée du Sud',
    'Mainland China': 'Chine continentale', 'Hong Kong': 'Hong Kong', 'Taiwan': 'Taïwan', 'India': 'Inde', 'Spain': 'Espagne',
    'Italy': 'Italie', 'Germany': 'Allemagne', 'Other': 'Autre'
  },
  movieGenres: {
    'Comedy': 'Comédie', 'Drama': 'Drame', 'Romance': 'Romance', 'Horror': 'Horreur', 'Thriller': 'Suspense', 'Sci-fi': 'Science-fiction',
    'Action': 'Action', 'Animation': 'Animation', 'Documentary': 'Documentaire', 'Crime': 'Policier', 'Fantasy': 'Fantastique', 'Family': 'Famille'
  },

  // Same order as DEALS in data.js.
  deals: [
    { name: 'Tarif réduit étudiants (STM)', what: 'Titre mensuel tous modes zone A à 66 $ au lieu de 110 $.', who: 'Étudiants à temps plein de 6 à 64 ans dans un établissement reconnu par le Québec, avec une carte OPUS avec photo (15 $ en ligne).' },
    { name: 'Carte Accès Montréal', what: '11 $ par année pour des rabais dans les lieux municipaux et chez les partenaires.', who: 'Toute personne qui habite sur l’île de Montréal. Une carte étudiante avec photo compte comme pièce d’identité.' },
    { name: 'Espace pour la vie', what: 'Biodôme, Jardin botanique, Insectarium, Planétarium, Biosphère : étudiants 18 ans et plus 19,00 $, ou 14,75 $ si tu habites la région métropolitaine de Montréal (prix 2026).', who: 'Montre ta carte étudiante.' },
    { name: 'Musée des beaux-arts de Montréal', what: 'Entrée gratuite pour les 25 ans et moins. Le premier dimanche du mois, la collection est gratuite pour les résidents du Québec.', who: 'Selon l’âge; les premiers dimanches demandent une réservation.' },
    { name: 'Musée McCord Stewart', what: '15 $ en ligne pour les étudiants; gratuit le mercredi soir dès 17 h; contribution volontaire le premier dimanche du mois.', who: 'Étudiants 18–30 ans avec carte étudiante et preuve d’inscription à temps plein.' },
    { name: 'Pointe-à-Callière', what: '20 $ au lieu de 30 $.', who: '18–30 ans, avec pièce d’identité.' },
    { name: 'Orchestre symphonique de Montréal (OSM)', what: 'Places à 30 $ en catégories 2 à 5, quantité limitée par concert.', who: '35 ans et moins, avec preuve d’âge. Pas pour les concerts POP, Jeux d’enfants ni les concerts-bénéfice.' },
    { name: 'Opéra de Montréal', what: 'Billets à 34 $; 15 % de rabais sur un abonnement de 3 opéras avec le code ODM1834.', who: '18–34 ans, pièce d’identité vérifiée à l’entrée.' },
    { name: 'Les Grands Ballets', what: '30 % de rabais sur les billets avec l’adhésion « Je me pointe! » à 15 $ (2 billets par spectacle; sauf Casse-Noisette).', who: '18–34 ans, avec preuve d’âge.' },
    { name: 'Parcs nationaux du Québec (Sépaq)', what: '10,30 $ par adulte par jour, ou 93 $ pour un an d’accès illimité à tous les parcs nationaux du Québec.', who: 'Aucun tarif étudiant. Gratuit pour les 17 ans et moins.' },
    { name: 'Carte d’entrée Découverte de Parcs Canada', what: '83,50 $ pour un adulte, valide de septembre 2026 à septembre 2027, taxes incluses.', who: 'Aucun tarif étudiant. Gratuit pour les 17 ans et moins.' },
    { name: 'Cours de français gratuits', what: 'Les cours de français à temps partiel du gouvernement du Québec sont gratuits.', who: '16 ans et plus et domicilié au Québec. Les étudiants internationaux sont admissibles si un programme d’études reconnu est leur occupation principale.' }
  ]
};
