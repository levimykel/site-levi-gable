import Image from "next/image";
import Link from "next/link";
import { LostEgg } from "@/components/chaos/LostEgg";

export default function NotFound() {
  return (
    <section className="lost">
      <h1>404</h1>
      <p className="lost-big">You got lost after practice.</p>
      <p>
        This page doesn&rsquo;t exist. Or it did and someone spilled a beer on it. Either way, the bar is that way
        <span className="lost-arrow"> 👉</span>
      </p>
      <Image src="/legacy/zati.jpg" alt="Someone who also got lost" width={320} height={320} className="shaky-img lost-img" />
      <Link href="/" className="chaos-button">
        Take me home (I&rsquo;m fine, I can drive)
      </Link>
      <LostEgg />
    </section>
  );
}
