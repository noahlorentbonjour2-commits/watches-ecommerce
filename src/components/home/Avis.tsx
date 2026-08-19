import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    image: "/avis/client-1.jpg",
    quote:
      "Le rendu bicolore est exactement celui du configurateur. Rien à redire sur la finition.",
    author: "Camille R.",
    model: "Bicolore or & acier",
  },
  {
    image: "/avis/client-5.jpg",
    quote:
      "J'ai commandé un bracelet caoutchouc orange pour l'été. Le service a suivi ma demande à la lettre.",
    author: "Thomas L.",
    model: "Aquanaut Or Rose",
  },
  {
    image: "/avis/client-4.jpg",
    quote:
      "Cadran turquoise, boîtier acier : personne d'autre n'a la même. C'est tout ce que je cherchais.",
    author: "Sofiane B.",
    model: "Horizon sur mesure",
  },
  {
    image: "/avis/client-7.jpg",
    quote:
      "Livrée en huit jours, écrin numéroté, réglage parfait dès la sortie de boîte.",
    author: "Julien M.",
    model: "Royal Or Rose",
  },
];

export default function Avis() {
  return (
    <section
      aria-labelledby="avis-titre"
      className="border-t border-white/8 bg-navy-950 py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div id="avis-titre">
          <SectionHeading
            eyebrow="Ils portent My Dial"
            title="Au poignet de nos clients"
            description="Des photos envoyées par celles et ceux qui ont composé leur montre chez nous."
          />
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <li key={review.author}>
              <Reveal delay={index * 90}>
                <figure className="group h-full border border-white/8 bg-ink/60 transition-colors duration-500 hover:border-gold-500/35">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={review.image}
                      alt={`Montre My Dial portée par ${review.author}`}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-3 p-6">
                    <span aria-label="Note : 5 sur 5" className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="size-3.5 fill-gold-500"
                        >
                          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
                        </svg>
                      ))}
                    </span>
                    <blockquote className="text-sm leading-relaxed text-silver-300">
                      « {review.quote} »
                    </blockquote>
                    <p className="mt-auto text-[0.62rem] uppercase tracking-[0.18em] text-silver-500">
                      {review.author} — {review.model}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
