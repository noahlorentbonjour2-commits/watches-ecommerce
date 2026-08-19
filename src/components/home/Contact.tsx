"use client";

import { useId, useState, type FormEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { GoldButton } from "@/components/ui/GoldButton";

type Errors = Partial<Record<"nom" | "email" | "message", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const ids = {
    nom: useId(),
    email: useId(),
    sujet: useId(),
    message: useId(),
    newsletter: useId(),
  };

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nom = String(data.get("nom") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (nom.length < 2) next.nom = "Indiquez votre nom (2 caractères minimum).";
    if (!emailPattern.test(email))
      next.email = "Cette adresse e-mail ne semble pas valide.";
    if (message.length < 10)
      next.message = "Votre message doit contenir au moins 10 caractères.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Démonstration : aucun envoi réseau, le formulaire confirme localement.
    setSent(true);
    event.currentTarget.reset();
  };

  const fieldClass = (invalid?: string) =>
    `min-h-12 w-full border bg-navy-950/70 px-4 py-3 text-sm text-cream placeholder:text-silver-500/60 transition-colors duration-200 focus:border-gold-500 focus:outline-none ${
      invalid ? "border-red-400/70" : "border-white/12"
    }`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-titre"
      className="border-t border-white/8 bg-ink py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div id="contact-titre">
          <SectionHeading
            eyebrow="Contact"
            title="Parlons de votre montre"
            description="Une question sur un modèle, un projet sur mesure, une demande de gravure ? Écrivez-nous, nous répondons sous 24 h ouvrées."
          />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Formulaire de contact */}
          <Reveal>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="border border-white/10 bg-navy-950/50 p-7 sm:p-9"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={ids.nom}
                    className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-300"
                  >
                    Nom complet
                  </label>
                  <input
                    id={ids.nom}
                    name="nom"
                    type="text"
                    autoComplete="name"
                    placeholder="Camille Rousseau"
                    aria-invalid={Boolean(errors.nom)}
                    aria-describedby={errors.nom ? `${ids.nom}-erreur` : undefined}
                    className={fieldClass(errors.nom)}
                  />
                  {errors.nom ? (
                    <p id={`${ids.nom}-erreur`} className="text-xs text-red-300">
                      {errors.nom}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={ids.email}
                    className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-300"
                  >
                    Adresse e-mail
                  </label>
                  <input
                    id={ids.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? `${ids.email}-erreur` : undefined
                    }
                    className={fieldClass(errors.email)}
                  />
                  {errors.email ? (
                    <p id={`${ids.email}-erreur`} className="text-xs text-red-300">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <label
                  htmlFor={ids.sujet}
                  className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-300"
                >
                  Sujet
                </label>
                <select
                  id={ids.sujet}
                  name="sujet"
                  defaultValue="collection"
                  className={`${fieldClass()} cursor-pointer`}
                >
                  <option value="collection">Une montre de la collection</option>
                  <option value="sur-mesure">Un projet sur mesure</option>
                  <option value="gravure">Une gravure personnalisée</option>
                  <option value="sav">Entretien / service après-vente</option>
                </select>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <label
                  htmlFor={ids.message}
                  className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-300"
                >
                  Votre message
                </label>
                <textarea
                  id={ids.message}
                  name="message"
                  rows={5}
                  placeholder="Décrivez la montre que vous avez en tête…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? `${ids.message}-erreur` : undefined
                  }
                  className={`${fieldClass(errors.message)} resize-y`}
                />
                {errors.message ? (
                  <p id={`${ids.message}-erreur`} className="text-xs text-red-300">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <GoldButton type="submit">Envoyer ma demande</GoldButton>
                <p aria-live="polite" className="text-sm text-gold-400">
                  {sent
                    ? "Merci, votre message est bien noté. Nous revenons vers vous sous 24 h."
                    : ""}
                </p>
              </div>
            </form>
          </Reveal>

          {/* Coordonnées + newsletter */}
          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="border border-white/10 bg-navy-950/50 p-7 sm:p-9">
              <h3 className="text-2xl text-cream">L&apos;atelier</h3>
              <span aria-hidden="true" className="rule-gold mt-4 block h-px w-16" />
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
                    Adresse
                  </dt>
                  <dd className="mt-1.5 text-silver-300">
                    18 rue des Horlogers
                    <br />
                    75003 Paris, France
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
                    E-mail
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href="mailto:bonjour@mydial.fr"
                      className="text-gold-400 transition-colors hover:text-gold-500"
                    >
                      bonjour@mydial.fr
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
                    Sur rendez-vous
                  </dt>
                  <dd className="mt-1.5 text-silver-300">
                    Du mardi au samedi, 10 h – 19 h
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-gold-600/25 bg-[linear-gradient(140deg,var(--color-navy-800),var(--color-navy-950))] p-7 sm:p-9">
              <h3 className="text-2xl text-cream">La lettre My Dial</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver-500">
                Les nouvelles séries limitées, en avant-première. Un envoi par
                mois, pas davantage.
              </p>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!emailPattern.test(newsletterEmail)) return;
                  setNewsletterDone(true);
                  setNewsletterEmail("");
                }}
                className="mt-6"
              >
                <label
                  htmlFor={ids.newsletter}
                  className="text-[0.62rem] uppercase tracking-[0.18em] text-silver-300"
                >
                  Votre e-mail
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id={ids.newsletter}
                    type="email"
                    required
                    autoComplete="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="vous@exemple.fr"
                    className={`${fieldClass()} sm:flex-1`}
                  />
                  <GoldButton type="submit" className="sm:px-7">
                    S&apos;inscrire
                  </GoldButton>
                </div>
                <p aria-live="polite" className="mt-3 text-xs text-gold-400">
                  {newsletterDone ? "Inscription enregistrée. À très vite." : ""}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
