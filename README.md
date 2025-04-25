# Svelte-kit CMS

## Description

Svelte-kit CMS est un projet basé sur le full stack framework sveltekit.

- Un combiné entre du svelte , scss et du tailwind pour accélerer le développement front.
- Un ORM Prisma pour la gestion des données en SQLite.
- Un back-office personnalisé pour les clients avec une authentification sécurisé utilisant Lucia-Auth 3.0.
- Une librairie UI pour la partie ergonomique du back-office.
- Du typescript permettant une meilleur gestion d'erreurs pour l'api ainsi qu'une gestion des logs.

## Prérequis

1. [node](https://nodejs.org/en) >= 23.11.0<br>
2. [pnpm](https://pnpm.io/fr/installation) >= 8.0.0<br>
3. [prisma CLI](https://www.prisma.io/docs/orm/tools/prisma-cli) >= 5.8.0<br>

## Déploiement

### Setup

`1. Télécharger le code en tant que fichier .zip`<br>
`2. Extraire le zip téléchargé`<br>
`3. Copier le .env.exemple en .env et changer les valeurs`<br>
`4. Télécharger la version correct de node avec pnpm : $ pnpm env use --global 23.11.0`<br>
`4. $ pnpm add prisma --save-dev`<br>
`5. $ pnpm install`<br>
`6. $ npx prisma migrate deploy`<br>
`7. $ npx prisma generate`<br>

#### Analytics Report

Pour utiliser l'API Google Analytics Report, vous devez vous connecter à votre compte [Google Cloud Console](https://console.cloud.google.com)

1. Sélectionner un projet existant ou créer un nouveau projet
2. Activer l'api [Google Analytics](https://console.cloud.google.com/apis/library/analyticsadmin.googleapis.com)
3. Aller dans API & Services > Identifiants > Clés API
4. Créer un nouveau compte de service role Propiétaire
5. Créer une clé dans le compte de service format JSON
6. enregistrer la clé dans le fichier conf/googleapis/keys/credentials.json
7. Aller sur la propriété de l'API Analytics
8. Gestion d'acces au compte et ajouter l'email du compte de service role Administrateur
9. Aller dans détails de la propriété et copier l'Id de la propriété (ex: 428920187) dans le fichier .env
10. Tester le dashboard de /admin/home

#### Google Recaptcha

1. Créer un reCAPTCHA (Google)[https://console.cloud.google.com/security/recaptcha/]

#### Google Tag Manager

1. Créer un compte (Google Tag Manager)[https://tagmanager.google.com/]

### Developpement

`1. $ pnpm run dev`

### Build

`1. $ pnpm run build`<br>
`2. $ node server.js`

### VPS

#### 1er installation

`1. Cloner le projet sur le VPS, git clone https://github.com/guillian/CMS.git`<br>
`2. Aller dans le dossier du projet`<br>
`3. Copier le .env.exemple en .env et changer les valeurs`<br>
`3.B Ajouter crédentials.json dans le dossier du projet pour la partie analytics du backoffice`<br>
`4. docker compose up --force-recreate --build -d --remove-orphans`<br>

#### Mise à jour manuelle

`1. Aller dans le dossier du projet`<br>
`2. git pull`<br>
`3. docker compose up --force-recreate --build -d --remove-orphans`<br>

## Utilisation

### Back-office

- Connectez vous en tant qu'administrateur pour gerer votre site internet depuis le panel Admin.

- En développement accedez avec `http://localhost:<PORT (dev=5173|build=3000)>/admin/login` à votre administration.
- Connectez vous avec les crédentials indiqués dans le fichier .env (SECRET_ADMIN_EMAIL:SECRET_ADMIN_PASSWORD)

_Vous voila connecté. Depuis l'administration vous avez accès :_

- Homepage
- Actualités
- Formulaires
- Paramètres

### Prisma models

Pour ajouter des tables (models) vous pouver créer de nouveaux models dans le schema.prisma. Une fois celui-ci ajouté, voici les commandes à effectuer pour déployer les modifications :

`1. $ npx prisma migrate dev --name <nomModification> --create-only`<br>
`2. $ npx prisma migrate deploy`<br>
`3. $ npx prisma generate`<br>

une fois fait, vous pouvez désormais utiliser votre nouvelle table doc ici : [prisma CRUD](https://www.prisma.io/docs/orm/prisma-client/queries/crud).

**! Attention PrismaClient est disponible uniquement coté serveur !**

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const user = await prisma.user.create({
	data: {
		email: 'elsa@prisma.io',
		name: 'Elsa Prisma'
	}
});
```

## Conventions de nommage / structure

### Conventions

Les conventions utilisés sont :

- [Javascript](https://google.github.io/styleguide/jsguide.html)
- [git](https://www.conventionalcommits.org/en/v1.0.0/)

### Structure

### Architecture

Voici la structure du projet :

cms/<br>
├ conf/<br>
│ ├ auth/<br>
│ ├ parametes/<br>
│ ├ googleapis/<br>
│ └ assets/<br>
├ logs/app.log<br>
├ prisma/<br>
│ ├ migrations/<br>
│ └ schema.prisma<br>
├ themes/<br>
│ └ [back-office themes]<br>
├ uploads/<br>
│ └ [back-office uploads files]<br>
├ modules/server/<br>
│ ├ logs/<br>
│ ├ middlewares/<br>
│ ├ sharp/<br>
├ src/<br>
│ ├ lib/<br>
│ │ ├ client/<br>
│ │ ├ components/<br>
│ │ ├ server/<br>
│ │ │ └ [your server-only lib files]<br>
│ │ └ [your lib files]<br>
│ ├ params/<br>
│ │ └ [your param matchers]<br>
│ ├ routes/<br>
│ │ ├ (admin)/<br>
│ │ │ └ [back-office files]/<br>
│ │ ├ (api)/<br>
│ │ │ └ [api files]/<br>
│ │ ├ (front)/<br>
│ │ │ └ [client side files]/<br>
│ ├ app.html<br>
│ ├ error.html<br>
│ ├ hooks.client.js<br>
│ ├ hooks.server.js<br>
│ └ service-worker.js<br>
├ static/<br>
│ └ [your static assets]<br>
├ tests/<br>
│ └ [your tests]<br>
├ package.json<br>
├ svelte.config.js<br>
├ gsap-bonus.tgz<br>
├ pnpm-lock.yaml<br>
├ postcss.config.cjs<br>
├ server.js<br>
├ tailwind.config.mjs<br>
├ tsconfig.json<br>
└ vite.config.js<br>
