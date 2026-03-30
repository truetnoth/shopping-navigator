import styles from './BrandCard.module.css';

export default function BrandCard({ brand, onClick }) {
  const categories = brand.category
    ? brand.category.split(',').map((s) => s.trim())
    : [];

  function handleWebsiteClick(e) {
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
        {brand.hasOwnProduction && (
          <span className={styles.badge}>Собственное производство</span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          {categories.slice(0, 2).map((cat) => (
            <span key={cat} className={styles.category}>{cat}</span>
          ))}
          <span className={styles.price}>{brand.priceSegment}</span>
        </div>

        <h3 className={styles.name}>{brand.name}</h3>

        {brand.city && (
          <p className={styles.city}>{brand.city}</p>
        )}

        <p className={styles.description}>{brand.shortDescription}</p>

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
