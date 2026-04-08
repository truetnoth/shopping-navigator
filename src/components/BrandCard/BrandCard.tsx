import type { Brand } from '../../types';
import styles from './BrandCard.module.css';

interface BrandCardProps {
  brand: Brand;
  onClick: () => void;
}

export default function BrandCard({ brand, onClick }: BrandCardProps) {
  const categories = brand.category
    ? brand.category.split(',').map((s) => s.trim())
    : [];

  const tagList = brand.tags
    ? brand.tags.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  function handleWebsiteClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={brand.imageUrl || `https://placehold.co/600x400/f5f5f5/333?text=${encodeURIComponent(brand.name)}`}
          alt={brand.name}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {categories.slice(0, 2).map((cat) => (
            <span key={cat} className={styles.category}>{cat}</span>
          ))}
          <span className={styles.price}>{brand.priceSegment}</span>
        </div>

        <h3 className={styles.name}>{brand.name}</h3>

        {brand.type && (
          <p className={styles.city}>{brand.type}</p>
        )}

        {tagList.length > 0 && (
          <div className={styles.tags}>
            {tagList.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        {brand.fullDescription && (
          <p className={styles.description}>
            {brand.fullDescription.length > 100
              ? brand.fullDescription.slice(0, 100).trimEnd() + '…'
              : brand.fullDescription}
          </p>
        )}

        {brand.websiteUrl && (
          <a
            className={styles.shopBtn}
            href={brand.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWebsiteClick}
          >
            Интернет-магазин
          </a>
        )}
      </div>
    </article>
  );
}
