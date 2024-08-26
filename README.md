# forum-associatif-numerique.fr

Le forum associatif numérique est la version en ligne du forum associatif du Pôle Léonard de Vinci. Il a pour but de présenter les différentes associations du Pôle et de communiquer sur leurs événements.

## Technologies utilisées 🛠️

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.io/)

## Installation 🚀

1. Cloner le dépôt

```bash
git clone https://github.com/Kan-A-Pesh/forum-associatif-numerique.fr.git
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier `.env.local` à la racine du projet et ajouter les variables d'environnement suivantes

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

4. Lancer la base de données Supabase

```bash
npm run db:start
```

5. Lancer le serveur de développement

```bash
npm run dev
```

## Licence 📜

Ce projet est sous licence GNU GPL v3.0 - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Participants 👥

- [**Kan-A-Pesh**](https://github.com/Kan-A-Pesh) - Développement
- [**Quentin Garnier**](https://github.com/F1n3x) - Traductions
- [**Pôle Universitaire Léonard de Vinci**](https://www.devinci.fr/) - Commanditaire
