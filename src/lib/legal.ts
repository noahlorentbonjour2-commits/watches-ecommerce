/**
 * Identité légale de la boutique.
 *
 * C'est le SEUL endroit à compléter : les quatre pages légales lisent ces
 * valeurs. Un champ laissé à `null` s'affiche en évidence sur le site sous la
 * forme « [à compléter : … ] », pour qu'un oubli ne passe pas inaperçu.
 */
export const entreprise = {
  /** Nom commercial. */
  denomination: "My Dial",

  /** Ex. « Entreprise individuelle (auto-entrepreneur) », « SASU au capital de 1 000 € ». */
  formeJuridique: null as string | null,

  /** Nom et prénom de l'exploitant ou du représentant légal. */
  responsable: null as string | null,

  /** Adresse du siège, sur une seule ligne. */
  adresse: null as string | null,

  /** 14 chiffres. */
  siret: null as string | null,

  /** Ex. « RCS Paris 900 000 000 ». Laisser `null` si non immatriculé au RCS. */
  rcs: null as string | null,

  /** Ex. « FR00900000000 ». `null` si franchise en base de TVA. */
  tvaIntracommunautaire: null as string | null,

  /** Téléphone joignable par les clients. */
  telephone: null as string | null,

  email: "mydial77@gmail.com",

  /**
   * Médiateur de la consommation. L'adhésion à un dispositif de médiation est
   * obligatoire pour tout professionnel vendant à des consommateurs
   * (art. L612-1 du code de la consommation).
   */
  mediateur: {
    nom: null as string | null,
    site: null as string | null,
    adresse: null as string | null,
  },
} as const;

/** Hébergeur du site, à mentionner au titre de la LCEN. */
export const hebergeur = {
  denomination: "Vercel Inc.",
  adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
  site: "https://vercel.com",
} as const;

/** Sous-traitants qui reçoivent des données personnelles. */
export const sousTraitants = [
  {
    nom: "Stripe",
    role: "Traitement des paiements",
    donnees: "Identité, e-mail, téléphone, adresse de livraison et de facturation, données de carte",
    lieu: "Irlande et États-Unis",
    politique: "https://stripe.com/fr/privacy",
  },
  {
    nom: "Resend",
    role: "Acheminement des e-mails de commande et de contact",
    donnees: "Identité, e-mail, contenu du message, détail de la commande",
    lieu: "États-Unis",
    politique: "https://resend.com/legal/privacy-policy",
  },
  {
    nom: "Vercel",
    role: "Hébergement du site",
    donnees: "Adresse IP et journaux techniques de connexion",
    lieu: "États-Unis",
    politique: "https://vercel.com/legal/privacy-policy",
  },
] as const;

/** Date de dernière révision affichée en pied de page légale. */
export const derniereMiseAJour = "16 septembre 2026";
