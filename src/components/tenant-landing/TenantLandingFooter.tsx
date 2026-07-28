import Link from "next/link";
import type { LandingFooterLink } from "@/lib/tenant-landing";

const SOCIAL_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
};

type Props = {
  tenantName: string;
  socialLinks: Record<string, string>;
  footerLinks: LandingFooterLink[];
};

export default function TenantLandingFooter({
  tenantName,
  socialLinks,
  footerLinks,
}: Props) {
  const socialEntries = Object.entries(socialLinks || {}).filter(([, url]) => url);
  const links = footerLinks || [];

  return (
    <footer className="tenant-landing__footer">
      <div className="tenant-landing__footer-inner">
        {socialEntries.length > 0 ? (
          <nav className="tenant-landing__social" aria-label="Social links">
            {socialEntries.map(function ([key, url]) {
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tenant-landing__social-link"
                >
                  {SOCIAL_LABELS[key] || key}
                </a>
              );
            })}
          </nav>
        ) : null}
        {links.length > 0 ? (
          <nav className="tenant-landing__footer-links" aria-label="Footer links">
            {links.map(function (link) {
              const isExternal = link.url.startsWith("http");
              if (isExternal) {
                return (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={`${link.label}-${link.url}`} href={link.url}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
        <p className="tenant-landing__footer-copy">
          © {new Date().getFullYear()} {tenantName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
