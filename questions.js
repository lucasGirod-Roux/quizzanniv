// ==========================================================================
// QC'aime — Fichier des questions
// ==========================================================================
// Complète ou modifie librement les questions ci-dessous.
//
// Structure d'une question :
// {
//   theme: "Boissons",              -> catégorie affichée (emoji + texte libre)
//   emoji: "🍹",                    -> emoji affiché à côté du thème
//   question: "Parmi ces boissons, laquelle je préfère ?",
//   options: ["Mojito", "Piña Colada", "Jus d'ananas", "Coco Loco"],
//   answerIndex: 1,                 -> index (0 à 3) de la bonne réponse dans "options"
//   info: "Un petit texte affiché sous la réponse une fois que le joueur a répondu (facultatif)"
// }
//
// -> Tu peux ajouter autant de questions que tu veux, dans n'importe quel ordre.
// -> Chaque question DOIT avoir exactement 4 propositions.
// ==========================================================================

const QUESTIONS = [
  {
    theme: "Séries d'animation",
    emoji: "📺",
    question: "Parmi ces séries d'animation, laquelle je préfère ?",
    options: ["Invincible", "Vox Machina", "Rick et Morty", "Final Space"],
    answerIndex: 0,
    info: "Ma préférée de toutes doit sûrement être Arcane, ma série chouchou reste Invincible"
  },
  {
    theme: "Dessert",
    emoji: "🍰",
    question: "Parmi ces desserts, lequel je préfère ?",
    options: ["Mousse chocolat", "Dame Blanche", "Roulé chocolat", "Cookies"],
    answerIndex: 1,
    info: "Mon numéro 1 tout confondu"
  },
  {
    theme: "Film",
    emoji: "🎬",
    question: "Parmi ces films, lequel je préfère ?",
    options: ["King Kong", "Kingsman", "Spiderman 3", "Inception"],
    answerIndex: 0,
    info: "Mon film préféré est toujours Avengers : Infinity War"
  },
  {
    theme: "Animal",
    emoji: "🐾",
    question: "Parmi ces animaux, lequel je préfère ?",
    options: ["Chat", "Loup", "Ours", "Lama"],
    answerIndex: 2,
    info: "C'est mon animal préféré"
  },
  {
    theme: "Jeux de société",
    emoji: "🎲",
    question: "Parmi ces jeux de société, lequel je préfère ?",
    options: ["Leaders", "Shadow Hunters", "7 Wonders", "Time Bomb"],
    answerIndex: 0,
    info: "Mon jeu favori reste King of Tokyo, pour la nostalgie etc. Mais 'Leaders' et 'Duel pour Cardia' le rejoignent désormais dans mes jeux préférés"
  },
  {
    theme: "Plat",
    emoji: "🍽️",
    question: "Parmi ces plats, lequel je préfère ?",
    options: ["Lasagne", "Carbonnade frite", "Pâtes carbonara", "Jambonneau frites"],
    answerIndex: 3,
    info: "Ma viande préférée est le jambonneau. Mon plat favori reste la pizza, une valeur sûre"
  },
  {
    theme: "Groupe de musique",
    emoji: "🎵",
    question: "Parmi ces groupes de musique, lequel je préfère ?",
    options: ["Imagine Dragon", "Daft Punk", "Ultra Vomit", "Little Big"],
    answerIndex: 3,
    info: "Little Big est l'un des rares groupes que je mets volontairement. Mon artiste musical favori"
  },
  {
    theme: "Série",
    emoji: "📺",
    question: "Parmi ces séries, laquelle je préfère ?",
    options: ["Gotham", "The Boys", "Stranger Things", "Squid Game"],
    answerIndex: 1,
    info: "Pour ma série préférée, j'ai encore du mal à me décider. Peut-être Prison Break ou Arcane"
  },
  {
    theme: "Boisson sucrée",
    emoji: "🥤",
    question: "Parmi ces boissons sucrées, laquelle je préfère ?",
    options: ["Chocolat chaud", "Café glacé", "Cappuccino", "Granita"],
    answerIndex: 1,
    info: "Avec sirop de noisette ou caramel, miam !"
  },
  {
    theme: "Youtuber",
    emoji: "🎥",
    question: "Parmi ces Youtubers, lequel je préfère ?",
    options: ["Squeezie", "Amixem", "Joyca", "Cyprien"],
    answerIndex: 1,
    info: "Mon Youtuber numéro 1. Même si je ne regarde plus trop YouTube"
  },
  {
    theme: "Jeux vidéo",
    emoji: "🎮",
    question: "Parmi ces jeux vidéo, lequel je préfère ?",
    options: ["Detroit: Become Human", "Spiderman ps4", "The Quarry", "The last of us"],
    answerIndex: 0,
    info: "Mon jeu préféré, et de loin"
  },
  {
    theme: "Film de MCU",
    emoji: "🦸",
    question: "Parmi ces films du MCU, lequel je préfère ?",
    options: ["Gardien de la galaxie 3", "Spiderman Brand New Day", "Avengers : L'Ère d'Ultron", "Les Éternels"],
    answerIndex: 3,
    info: "Tellement sous-coté"
  },
  {
    theme: "Apéro",
    emoji: "🍿",
    question: "Parmi ces apéros, lequel je préfère ?",
    options: ["Chips", "Cacahuète", "Pistache", "Curly"],
    answerIndex: 1,
    info: "Cacahuète grillée à sec pour passer mes mal de crâne"
  },
  {
    theme: "Activité",
    emoji: "🎳",
    question: "Parmi ces activités, laquelle je préfère ?",
    options: ["Bowling", "Billard", "Laser game", "Mini golf"],
    answerIndex: 3,
    info: "Sinon il y a les escape games, mais c'est cher"
  },
  {
    theme: "Couleur",
    emoji: "🎨",
    question: "Parmi ces couleurs, laquelle je préfère ?",
    options: ["Rouge", "Jaune", "Bleu", "Vert"],
    answerIndex: 0,
    info: "Depuis toujours, pour toujours"
  },
  {
    theme: "Voyage",
    emoji: "✈️",
    question: "Parmi ces types de voyage, lequel je préfère ?",
    options: ["Plage", "Ville touristique", "Montagne", "Ville historique"],
    answerIndex: 2,
    info: "Bien évidemment, ça dépend de plein de choses, mais là j'aimerais beaucoup partir en montagne."
  },
  {
    theme: "Fast-food",
    emoji: "🍔",
    question: "Parmi ces fast-foods, lequel je préfère ?",
    options: ["Mcdo", "Burger king", "KFC", "Quick"],
    answerIndex: 2,
    info: "De loin par rapport aux 3 autres"
  },
  {
    theme: "Livre",
    emoji: "📚",
    question: "Parmi ces livres, lequel je préfère ?",
    options: ["Red rising", "Dungeon Crawler Carl", "Invincible", "Spider-verse"],
    answerIndex: 2,
    info: "Invincible est mon œuvre favorite, mais si on ne compte que les romans, alors Dungeon Crawler Carl est tout en haut sans hésitation"
  },
  {
    theme: "Fête",
    emoji: "🎉",
    question: "Parmi ces fêtes, laquelle je préfère ?",
    options: ["Halloween", "Noël", "Pâque", "Carnaval"],
    answerIndex: 1,
    info: "Une ambiance unique"
  },
  {
    theme: "Parfum de glace",
    emoji: "🍦",
    question: "Parmi ces parfums de glace, lequel je préfère ?",
    options: ["Chocolat", "Menthe", "Noisette", "Café"],
    answerIndex: 3,
    info: "Et si je peux prendre 2 boules, alors ça sera café et... bah café encore, c'est le meilleur"
  }
];
