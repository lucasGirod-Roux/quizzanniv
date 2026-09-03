// ==========================================================================
// QC'aime — Fichier des questions
// ==========================================================================
// Complète ou modifie librement les questions ci-dessous.
//
// Structure d'une question :
// {
//   theme: "Boissons",              -> catégorie affichée (emoji + texte libre)
//   emoji: "🍹",                    -> emoji affiché à côté du thème
//   question: "Quelle est ma boisson préférée ?",
//   options: ["Mojito", "Piña Colada", "Jus d'ananas", "Coco Loco"],
//   answerIndex: 1                  -> index (0 à 3) de la bonne réponse dans "options"
// }
//
// -> Tu peux ajouter autant de questions que tu veux, dans n'importe quel ordre.
// -> Chaque question DOIT avoir exactement 4 propositions.
// ==========================================================================

const QUESTIONS = [
  {
    theme: "Séries d'animation",
    emoji: "📺",
    question: "Quelle est la série d'animation préférée de Lucas ?",
    options: ["Invincible", "Vox Machina", "Les Simpson", "Final Space"],
    answerIndex: 0
  },
  {
    theme: "Dessert",
    emoji: "🍰",
    question: "Quel est le dessert préféré de Lucas ?",
    options: ["Mousse chocolat", "Dame Blanche", "Roulé chocolat", "Cookies"],
    answerIndex: 1
  },
  {
    theme: "Film",
    emoji: "🎬",
    question: "Quel est le film préféré de Lucas ?",
    options: ["King Kong", "Kingsman", "Spiderman 3", "Inception"],
    answerIndex: 0
  },
  {
    theme: "Animal",
    emoji: "🐾",
    question: "Quel est l'animal préféré de Lucas ?",
    options: ["Chat", "Loup", "Ours", "Lama"],
    answerIndex: 2
  },
  {
    theme: "Jeux de société",
    emoji: "🎲",
    question: "Quel est le jeu de société préféré de Lucas ?",
    options: ["Leaders", "Shadow Hunters", "7 Wonders", "Time Bomb"],
    answerIndex: 0
  },
  {
    theme: "Plat",
    emoji: "🍽️",
    question: "Quel est le plat préféré de Lucas ?",
    options: ["Lasagne", "Carbonnade frite", "Pâtes carbonara", "Jambonneau frites"],
    answerIndex: 3
  },
  {
    theme: "Groupe de musique",
    emoji: "🎵",
    question: "Quel est le groupe de musique préféré de Lucas ?",
    options: ["Imagine Dragon", "Daft Punk", "Ultra Vomit", "Little Big"],
    answerIndex: 3
  }
];
