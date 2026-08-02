import Link from "next/link";

import { blogDetailPromoData } from "@/data/blog/detail-promo";

import styles from "./BlogDetailPromoCard.module.css";

export function BlogDetailPromoCard() {
  const { titleLine1, titleLine2, image, imageAlt, buttonText, buttonHref } =
    blogDetailPromoData;

  return (
    <aside className="w-full min-w-0 shrink-0 self-stretch xl:min-w-[270px]">
      <div className={styles.card}>
        <p className={styles.title}>
          <span className={styles.titleLine}>{titleLine1}</span>
          <span className={styles.titleLine}>{titleLine2}</span>
        </p>

        <div className={styles.imageFrame}>
          <img
            src={image}
            alt={imageAlt}
            className={styles.image}
            width={238}
            height={103}
          />
        </div>

        <Link href={buttonHref} className={styles.button}>
          {buttonText}
        </Link>
      </div>
    </aside>
  );
}
