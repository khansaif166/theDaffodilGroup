import { PlaceholderImage } from "@/components";
import type { VentureRecord } from "@/data/ventures";

import styles from "./VentureCard.module.css";

type VentureCardProps = {
  venture: VentureRecord;
  variant: "large" | "standard";
};

export function VentureCard({ venture, variant }: VentureCardProps) {
  return (
    <a
      href={venture.website}
      target="_blank"
      rel="noreferrer"
      className={`${styles.card} ${variant === "large" ? styles.large : styles.standard}`}
      data-venture-card
      data-cursor="image"
    >
      <div className={styles.imageWrap}>
        <PlaceholderImage
          src={venture.listingImage ?? venture.image}
          alt={venture.listingImageAlt ?? venture.imageAlt}
          sizes={
            variant === "large"
              ? "(max-width: 768px) 100vw, (max-width: 1120px) 50vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1120px) 33vw, 33vw"
          }
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <span className={styles.tag}>{venture.sector}</span>
        <h2 className={styles.name}>{venture.name}</h2>
        <p className={styles.description}>{venture.listingDescription ?? venture.tagline}</p>
        <span className={styles.link}>
          <span>Explore</span>
          <span className={styles.arrow}>→</span>
        </span>
      </div>
    </a>
  );
}
