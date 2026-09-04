// ==========================================================================
// QC'aime — Connexion à la base de données partagée (Supabase)
// ==========================================================================
// Permet à TOUS les joueurs (sur leurs propres téléphones) de voir le même
// classement, en direct, sans qu'il ne se vide jamais.
//
// ÉTAPES POUR ACTIVER :
// 1. Dans ton projet Supabase (quizzanniv) -> Project Settings -> API,
//    récupère "Project URL" et la clé "anon public", colle-les ci-dessous
//    à la place des valeurs "REMPLACE_MOI".
// 2. Dans SQL Editor, exécute :
//
//      create table scores (
//        id uuid primary key default gen_random_uuid(),
//        name text not null check (char_length(name) <= 30),
//        score int not null,
//        total int not null,
//        date timestamptz not null default now()
//      );
//
//      alter table scores enable row level security;
//
//      create policy "Public can read scores" on scores
//        for select using (true);
//
//      create policy "Public can insert scores" on scores
//        for insert with check (true);
//
//      alter publication supabase_realtime add table scores;
//
//    (Ça crée la table, autorise tout le monde à lire le classement et à
//    ajouter SON score, et active le temps réel pour la mise à jour live.)
// ==========================================================================

const SUPABASE_URL = "https://wkujhivyacosmfaioyhq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_h4DGrLTi7hb0mRqPSAnyxA_PCtqmE8K";

try {
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  window.QcaimeDB = {
    async saveScoreEntry(entry) {
      const { error } = await client.from('scores').insert(entry);
      if (error) console.error("[QC'aime] Impossible d'enregistrer le score :", error);
    },

    subscribeScores(callback) {
      async function fetchAndEmit() {
        const { data, error } = await client
          .from('scores')
          .select('*')
          .order('date', { ascending: false });
        if (error) {
          console.error("[QC'aime] Impossible de charger le classement :", error);
          return;
        }
        callback(data);
      }

      fetchAndEmit();

      client
        .channel('public:scores')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'scores' }, fetchAndEmit)
        .subscribe();
    },
  };
} catch (err) {
  console.error("[QC'aime] Supabase n'a pas pu être initialisé — as-tu bien renseigné SUPABASE_URL et SUPABASE_ANON_KEY dans db.js ?", err);
}
