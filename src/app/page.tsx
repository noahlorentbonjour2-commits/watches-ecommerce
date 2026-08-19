import Hero from "@/components/home/Hero";
import CollectionGrid from "@/components/home/CollectionGrid";
import SavoirFaire from "@/components/home/SavoirFaire";
import Signature from "@/components/home/Signature";
import Avis from "@/components/home/Avis";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <CollectionGrid />
      <SavoirFaire />
      <Signature />
      <Avis />
      <Contact />
    </>
  );
}
