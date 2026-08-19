import Image from "next/image";
import type { PartOption } from "@/lib/parts";

type OptionThumbProps = {
  option: PartOption;
  zoom: number;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionThumb({
  option,
  zoom,
  selected,
  onSelect,
}: OptionThumbProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group flex cursor-pointer flex-col items-center gap-2 border p-2.5 text-center transition-all duration-300 ${
        selected
          ? "border-gold-500 bg-gold-500/10"
          : "border-white/10 bg-navy-950/50 hover:border-white/30"
      }`}
    >
      <span className="relative block aspect-square w-full overflow-hidden bg-[radial-gradient(circle,var(--color-navy-800)_0%,var(--color-navy-950)_75%)]">
        <Image
          src={option.image}
          alt=""
          aria-hidden="true"
          fill
          sizes="120px"
          style={{ transform: `scale(${zoom})` }}
          className="object-contain transition-transform duration-300 group-hover:brightness-110"
        />
      </span>
      <span
        className={`text-[0.62rem] leading-tight ${
          selected ? "text-gold-400" : "text-silver-300"
        }`}
      >
        {option.label}
      </span>
      <span className="text-[0.58rem] uppercase tracking-[0.12em] text-silver-500">
        {option.extra === 0 ? "Inclus" : `+ ${option.extra} €`}
      </span>
    </button>
  );
}
