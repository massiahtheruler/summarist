import Image from "next/image";
import Link from "next/link";
import { PlanSelector } from "@/components/PlanSelector";

export default function ChoosePlanPage() {
  return (
    <main className="choose-plan">
      <nav className="choose-plan__nav">
        <Link className="choose-plan__logo" href="/">
          <Image src="/assets/logo.png" alt="Summarist" width={495} height={114} />
        </Link>
      </nav>

      <section className="choose-plan__hero">
        <div className="choose-plan__copy">
          <h1>Get unlimited access to every summary.</h1>
          <p>
            Build the habit without buying every book first. Choose a plan and
            unlock premium reading and audio.
          </p>
        </div>
        <PlanSelector />
      </section>
    </main>
  );
}
