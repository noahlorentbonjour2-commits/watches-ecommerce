# My Dial — site vitrine

Site vitrine et configurateur de la manufacture horlogère **My Dial**.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.

## Démarrer

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000.

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |

## Structure

```
src/
├─ app/
│  ├─ layout.tsx              en-tête, pied de page, polices, métadonnées
│  ├─ page.tsx                page d'accueil (hero, collection, savoir-faire…)
│  ├─ montre-personnalisee/   configurateur
│  ├─ globals.css             jetons de design (couleurs, typo, utilitaires)
│  ├─ sitemap.ts / robots.ts  SEO
│  └─ icon.png                favicon dérivé du logo
├─ components/
│  ├─ layout/                 Header, Footer
│  ├─ ui/                     Reveal, SectionHeading, GoldButton
│  ├─ home/                   sections de la page d'accueil
│  └─ configurator/           Configurator, WatchPreview, OptionThumb, Summary
└─ lib/
   ├─ watches.ts              catalogue des 12 modèles
   └─ parts.ts                composants du configurateur + tarifs
```

## Design

- **Couleurs** : bleu nuit (`--color-ink`, `--color-navy-*`) et or (`--color-gold-*`),
  déclarés dans `@theme` de `globals.css` — aucun hexadécimal en dur dans les composants.
- **Typographie** : Cormorant Garamond (titres) + Montserrat (texte), chargées via `next/font`.
- **Animations** : apparition au défilement (`Reveal`, IntersectionObserver) et parallaxe
  légère du hero. Tout est neutralisé sous `prefers-reduced-motion: reduce`.
- **Accessibilité** : lien d'évitement, cibles tactiles ≥ 44 px, focus visible doré,
  onglets du configurateur navigables au clavier (flèches, Début, Fin), aperçu décrit
  par un `aria-label` mis à jour à chaque choix.

## Configurateur

Les visuels sont six calques PNG 1000 × 1000 parfaitement alignés, empilés dans
l'ordre physique défini par `layerOrder` (`src/lib/parts.ts`) :

```
bracelet → boîtier → cadran → lunette → aiguilles → trotteuse
```

Le cadran passe **au-dessus** du boîtier : les boîtiers ont un fond intérieur opaque
qui le masquerait s'il était dessiné en dessous.

Catalogue actuel : 16 boîtiers, 15 lunettes (dont « Aucune », qui conserve la lunette
d'origine du boîtier), 20 cadrans, 14 jeux d'aiguilles, 16 trotteuses, 25 bracelets.

Ajouter une variante = déposer le PNG 1000 × 1000 dans `public/parts/<catégorie>/`
(`case`, `bezel`, `dial`, `hands`, `seconds`, `bracelet`) puis ajouter une entrée dans
la catégorie correspondante de `categories`, avec son `group` (famille affichée en
sous-titre). Aucun autre fichier à toucher.

Les variantes de la catégorie ouverte sont préchargées en opacité 0 : changer de pièce
est instantané, sans clignotement.

La validation est un simple récapitulatif — aucun paiement n'est branché.

## Images

Tous les visuels proviennent des photos de production (`public/brand`, `public/collection`,
`public/parts`, `public/avis`) et sont servis via `next/image` (AVIF/WebP, tailles
responsives). Aucun visuel n'est généré.

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub, puis « Import Project » sur Vercel.
2. Framework détecté automatiquement : Next.js. Aucune configuration de build à ajouter.
3. Renseigner la variable d'environnement `NEXT_PUBLIC_SITE_URL` avec le domaine final
   (utilisée par les métadonnées Open Graph, le sitemap et `robots.txt`).
