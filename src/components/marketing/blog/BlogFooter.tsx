import type { ReactNode } from "react";
import Link from "next/link";

import { blogFooterContent } from "@/data/blog/footer";

const fontGeneral = `'General Sans', 'Google Sans', sans-serif`;

function FooterHeading({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p
      className="text-[20px]! font-medium leading-[normal]! text-[#212121] md:text-[24px]!"
      style={{ fontFamily: fontGeneral }}
    >
      {children}
    </p>
  );
}

function FooterLink({
  children,
  href,
  underline = false,
}: Readonly<{
  children: ReactNode;
  href?: string;
  underline?: boolean;
}>) {
  const className = [
    "text-[16px]! font-medium leading-[normal]! text-[#666666] transition-colors hover:text-[#089B7C]",
    underline ? "underline underline-offset-2 leading-6!" : "",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <p className={className}>{children}</p>;
}

function FooterLinkGroup({
  title,
  links,
}: Readonly<{
  title: string;
  links: Array<{ label: string; href: string }>;
}>) {
  return (
    <div className="flex flex-col gap-3 xl:gap-[12px]">
      <FooterHeading>{title}</FooterHeading>
      <div className="flex flex-col gap-3 xl:gap-[12px]">
        {links.map((link) => (
          <FooterLink key={link.label} href={link.href}>
            {link.label}
          </FooterLink>
        ))}
      </div>
    </div>
  );
}

function NewsletterForm() {
  const { newsletter } = blogFooterContent;
  const inputClassName =
    "w-full bg-transparent px-4 text-[16px]! font-normal leading-[normal]! tracking-[-0.5px] text-[#212121] placeholder:text-[#666666] focus:outline-none";
  const buttonClassName =
    "inline-flex items-center justify-center bg-[#089B7C] text-[16px]! font-medium leading-none! text-white hover:bg-[#07886E] transition-colors";

  return (
    <>
      <div className="flex w-full flex-col gap-3 xl:hidden">
        <div className="h-14 w-full rounded-[4px] border border-solid border-[#F1F1F1] bg-white">
          <input
            type="email"
            placeholder={newsletter.placeholder}
            aria-label="Email address"
            className={`${inputClassName} h-full rounded-[4px]`}
          />
        </div>
        <button
          type="button"
          className={`${buttonClassName} h-14 w-full rounded-[4px]`}
        >
          {newsletter.buttonText}
        </button>
      </div>

      <div className="relative hidden h-14 w-full max-w-[470px] shrink-0 overflow-hidden rounded-[4px] border border-solid border-[#F1F1F1] bg-white xl:block">
        <input
          type="email"
          placeholder={newsletter.placeholder}
          aria-label="Email address"
          className={`${inputClassName} h-full pr-[150px]`}
        />
        <button
          type="button"
          className={`${buttonClassName} absolute inset-y-0 right-0 flex h-full w-[138px] rounded-none rounded-r-[3px]`}
        >
          {newsletter.buttonText}
        </button>
      </div>
    </>
  );
}

export function BlogFooter() {
  const data = blogFooterContent;

  return (
    <footer className="bg-[#D2F9E9]">
      <div className="mx-auto w-full max-w-[1170px] px-4 pt-10 pb-8 md:px-6 md:pt-12 xl:px-0 xl:pt-12">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[369px_minmax(0,1fr)] xl:gap-[31px]">
          <div className="flex flex-col gap-6 xl:gap-[24px]">
            <div className="flex flex-col gap-3">
              <Link href="/" className="inline-block h-14 w-[220px] md:h-16 md:w-[266px]">
                <img
                  src="/logo.png"
                  alt="Sortorium Logo"
                  className="h-full w-full object-contain object-left"
                  width={266}
                  height={64}
                />
              </Link>
              <p className="max-w-[369px] text-[16px]! font-normal leading-[1.5]! text-[#666666]">
                {data.description}
              </p>
            </div>

            <div className="flex max-w-[270px] flex-col gap-[17px]">
              <FooterHeading>Follow Us</FooterHeading>
              <div className="flex flex-wrap items-center gap-3 xl:gap-[12px]">
                {data.socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="relative shrink-0 overflow-hidden"
                    style={{ width: social.size, height: social.size }}
                  >
                    <img
                      src={social.icon}
                      alt=""
                      className="size-full object-cover"
                      width={social.size}
                      height={social.size}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-[170px_270px_170px] xl:gap-x-[80px] xl:gap-y-0">
            <div className="flex flex-col gap-[10px] sm:col-span-1 xl:col-span-1">
              <FooterLinkGroup title="Explore Us" links={data.exploreLinks} />
              <FooterLinkGroup title="Support" links={data.supportLinks} />
            </div>

            <div className="flex flex-col gap-4 sm:col-span-1 xl:col-span-1 xl:gap-[16px]">
              <FooterHeading>Contact</FooterHeading>
              <div className="flex flex-col gap-3">
                <FooterLink>{data.contact.address}</FooterLink>
                <FooterLink>{data.contact.phone}</FooterLink>
                <FooterLink>{data.contact.email}</FooterLink>
                <FooterLink href={data.contact.whatsappHref} underline>
                  Whatsapp
                </FooterLink>
                <FooterLink href={data.contact.telegramHref} underline>
                  Telegram
                </FooterLink>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:col-span-2 xl:col-span-1 xl:col-start-3 xl:gap-[16px]">
              <FooterHeading>Blog</FooterHeading>
              <div className="flex flex-col gap-3">
                {data.blogLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-y border-[rgba(8,155,124,0.12)] py-8 xl:mt-[40px] xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:py-[32px]">
          <div className="max-w-[475px] shrink-0">
            <p
              className="text-[24px]! font-medium capitalize leading-[1.3]! text-[#212121] md:text-[28px]!"
              style={{ fontFamily: fontGeneral }}
            >
              {data.newsletter.title}
            </p>
            <p
              className="mt-3 text-[16px]! font-normal leading-[1.35]! text-[#666666] xl:mt-3"
              style={{ fontFamily: fontGeneral }}
            >
              {data.newsletter.description}
            </p>
          </div>

          <div className="w-full xl:w-auto">
            <NewsletterForm />
          </div>
        </div>

        <p className="inline-flex w-full items-center justify-center gap-[0.35em] pt-6 text-[16px]! font-normal leading-[1.35]! text-[#8C8C8C] xl:pt-[26px] xl:pb-[24px]">
          <span className="text-[1em] leading-none">©</span>
          <span className="text-[1em] leading-none">
            {data.copyright.replace(/^©\s*/, "")}
          </span>
        </p>
      </div>
    </footer>
  );
}
