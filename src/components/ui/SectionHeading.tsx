import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      <span className="text-[0.7rem] tracking-luxe uppercase text-gold-500">
        {eyebrow}
      </span>
      <h2 className="text-4xl leading-tight text-cream sm:text-5xl">{title}</h2>
      <span
        aria-hidden="true"
        className={`rule-gold h-px w-24 ${align === "center" ? "" : "self-start"}`}
      />
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-silver-500">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
