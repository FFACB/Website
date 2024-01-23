# Svelte-kit CMS

## Description

Svelte-kit CMS est un projet basé sur le full stack framework sveltekit.
- Un combiné entre du svelte , scss et du tailwind pour accélerer le développement front.
- Un ORM Prisma pour la gestion des données en SQLite.
- Un back-office personnalisé pour les clients avec une authentification sécurisé utilisant Lucia-Auth. 
- Une librairie UI pour la partie ergonomique du back-office.
- Du typescript permettant une meilleur gestion d'erreurs pour l'api ainsi qu'une gestion des logs.

## Prérequis

1. [node](https://nodejs.org/en) >= 18.0.0
2. [pnpm](https://pnpm.io/fr/installation) >= 8.0.0
3. [prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli)  >= 5.8.0

## Déploiement

### Setup

`1. Télécharger le code en tant que fichier .zip`
`2. Extraire le zip téléchargé`
`3. Copier le .env.exemple en .env et changer les valeurs`
`4. $ pnpm add prisma --save-dev`
`5. $ pnpm install`
`6. $ npx prisma migrate deploy`
`7. $ npx prisma generate`


### Developpement

`1. $ pnpm run devSECRET_ADMIN_EMAIL:`

### Build

`1. $ pnpm run build`
`2. $ node server.js`


## Utilisation

### Architecture

cms/
├ conf/
│ ├ auth/
│ ├ parametes/
├ logs/app.log
├ prisma/
│ ├ migrations/
│ └ schema.prisma
├ themes/
│ └ [back-office themes]
├ uploads/
│ └ [back-office uploads files]
├ modules/server/
│ ├ logs/
│ ├ middlewares/
│ ├ sharp/
├ src/
│ ├ lib/
│ │ ├ client/
│ │ ├ components/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ ├ hooks.server.js
│ └ service-worker.js
├ static/
│ └ [your static assets]
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ gsap-bonus.tgz
├ pnpm-lock.yaml
├ postcss.config.cjs
├ server.js
├ tailwind.config.cjs
├ tsconfig.json
└ vite.config.js

### Back-office

* Connectez vous en tant qu'administrateur pour gerer votre site internet depuis le panel Admin.

* En développement accedez avec `http://localhost:<PORT (dev=5173|build=3000)>/admin/login` à votre administration.
* Connectez vous avec les crédentials indiqués dans le fichier .env (SECRET_ADMIN_EMAIL:SECRET_ADMIN_PASSWORD)

* Vous voila connecté. Depuis l'administration vous avez accès :

- Homepage
- Actualités
- Formulaires
- Paramètres

### Prisma models

Pour ajouter des tables (models) vous pouver créer de nouveaux models dans le schema.prisma. Une fois celui-ci ajouté, voici les commandes à effectuer pour déployer les modifications : 

`1. $ npx prisma migrate dev --name <nomModification> --create-only`
`2. $ npx prisma migrate deploy`
`3. $ npx prisma generate`

une fois fait, vous pouvez désormais utiliser votre nouvelle table doc ici : [prisma CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud).

__Attention PrismaClient est disponible uniquement coté serveur__

``
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const user = await prisma.user.create({
  data: {
    email: 'elsa@prisma.io',
    name: 'Elsa Prisma',
  },
})
``


