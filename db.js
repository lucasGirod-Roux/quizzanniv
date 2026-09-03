// ==========================================================================
// QC'aime — Connexion à la base de données partagée (Firebase Firestore)
// ==========================================================================
// Ce fichier permet à TOUS les joueurs (sur leurs propres téléphones) de
// voir le même classement, qui ne se vide jamais et reste visible pour tout
// le monde, en direct.
//
// ÉTAPES POUR ACTIVER (5 minutes, gratuit) :
// 1. Va sur https://console.firebase.google.com et crée un projet.
// 2. Dans le projet, ajoute une "application Web" (icône </>) et copie
//    l'objet de config qu'on te donne (apiKey, authDomain, etc.) ci-dessous,
//    à la place des valeurs "REMPLACE_MOI".
// 3. Dans le menu de gauche : Firestore Database -> Créer une base de
//    données -> mode "production" (peu importe la région).
// 4. Dans l'onglet "Règles" de Firestore, remplace le contenu par :
//
//      rules_version = '2';
//      service cloud.firestore {
//        match /databases/{database}/documents {
//          match /scores/{scoreId} {
//            allow read: if true;
//            allow create: if request.resource.data.keys().hasOnly(['name', 'score', 'total', 'date'])
//                          && request.resource.data.name is string
//                          && request.resource.data.name.size() <= 30
//                          && request.resource.data.score is int
//                          && request.resource.data.total is int;
//            allow update, delete: if false;
//          }
//        }
//      }
//
//    (Ça autorise tout le monde à lire le classement et à ajouter SON score,
//    mais personne ne peut modifier ou supprimer les scores existants.)
// 5. Publie les règles, et c'est prêt !
// ==========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "REMPLACE_MOI",
  authDomain: "REMPLACE_MOI",
  projectId: "REMPLACE_MOI",
  storageBucket: "REMPLACE_MOI",
  messagingSenderId: "REMPLACE_MOI",
  appId: "REMPLACE_MOI",
};

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const scoresCol = collection(db, "scores");
  const scoresQuery = query(scoresCol, orderBy("date", "desc"));

  window.QcaimeDB = {
    saveScoreEntry(entry) {
      return addDoc(scoresCol, entry).catch(err => {
        console.error("[QC'aime] Impossible d'enregistrer le score :", err);
      });
    },
    subscribeScores(callback) {
      return onSnapshot(
        scoresQuery,
        snapshot => callback(snapshot.docs.map(doc => doc.data())),
        err => console.error("[QC'aime] Impossible de charger le classement :", err)
      );
    },
  };

  document.dispatchEvent(new CustomEvent('qcaime-db-ready'));
} catch (err) {
  console.error("[QC'aime] Firebase n'a pas pu être initialisé — as-tu bien renseigné firebaseConfig dans db.js ?", err);
}
