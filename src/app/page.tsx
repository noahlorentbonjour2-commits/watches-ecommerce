import Annonces from "@/components/home/Annonces";
import Hero from "@/components/home/Hero";
import CollectionGrid from "@/components/home/CollectionGrid";
import SavoirFaire from "@/components/home/SavoirFaire";
import Signature from "@/components/home/Signature";
import Avis from "@/components/home/Avis";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Annonces />
      <Hero />
      <CollectionGrid />
      <SavoirFaire />
      <Signature />
      <Avis />
      <Contact />
    </>
  );
}
