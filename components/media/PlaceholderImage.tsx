import Image from "next/image";

import styles from "./PlaceholderImage.module.css";

type PlaceholderImageProps = {
  label?: string;
  src?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  objectPosition?: string;
};

function buildPlaceholder(label: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ece4d8"/>
          <stop offset="55%" stop-color="#d9d0c3"/>
          <stop offset="100%" stop-color="#f6f1ea"/>
        </linearGradient>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(14,13,12,0.06)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill="url(#bg)"/>
      <rect width="1600" height="1000" fill="url(#grid)" opacity="0.45"/>
      <circle cx="1280" cy="220" r="220" fill="rgba(209,169,114,0.16)"/>
      <circle cx="360" cy="820" r="250" fill="rgba(14,13,12,0.05)"/>
      <text x="800" y="470" text-anchor="middle" fill="#2b2723" font-family="Arial, sans-serif" font-size="32" opacity="0.78">${label}</text>
      <line x1="730" y1="520" x2="870" y2="520" stroke="#d1a972" stroke-width="3"/>
    </svg>
  `)}`;
}

export function PlaceholderImage({
  label,
  src,
  alt,
  sizes,
  priority = false,
  quality = 88,
  className = "",
  objectPosition,
}: PlaceholderImageProps) {
  const resolvedAlt = alt ?? label ?? "Decorative image";
  const imageSrc = src ?? buildPlaceholder(resolvedAlt);
  const isPlaceholder = !src;

  return (
    <Image
      src={imageSrc}
      alt={resolvedAlt}
      fill
      unoptimized={isPlaceholder}
      priority={priority}
      sizes={sizes}
      quality={quality}
      loading={priority ? "eager" : "lazy"}
      placeholder={isPlaceholder ? "blur" : "empty"}
      blurDataURL={isPlaceholder ? imageSrc : undefined}
      style={objectPosition ? { objectPosition } : undefined}
      className={`${styles.image} ${className}`.trim()}
    />
  );
}
