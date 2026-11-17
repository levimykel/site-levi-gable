import Image from "next/image";
import Link from "next/link";
import { LostEgg } from "@/components/chaos/LostEgg";

export default function NotFound() {
  return (
    <section className="lost">
      <h1>404</h1>
      <p className="lost-big">You got lost in the desert rock region.</p>
      <p>
        This page doesn&rsquo;t exist. Or it did, and a tumbleweed took it. Either way, the bar is that way
        <span className="lost-arrow"> 👉</span>
      </p>
      <Image src="/legacy/zati.jpg" alt="Someone who also got lost" width={320} height={320} className="shaky-img lost-img" />
      <Link href="/" className="chaos-button">
        Take me home (I know a shortcut through the dunes)
      </Link>
      <LostEgg />
    </section>
  );
}
