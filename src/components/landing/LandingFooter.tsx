import Link from "next/link";
import { all_routes } from "@/data/all_routes";
import { copyrightNotice } from "@/lib/branding";

export default function LandingFooter() {
  return (
    <footer className="landing-page__footer">
      <div className="landing-page__footer-links">
        <Link href={all_routes.signin}>Login</Link>
        <Link href={all_routes.register}>Register</Link>
        <a href="#pricing">Pricing</a>
      </div>
      <p className="mb-0">{copyrightNotice()}</p>
    </footer>
  );
}
