import BrandCard from '../BrandCard/BrandCard';
import styles from './BrandGrid.module.css';

export default function BrandGrid({ brands, onCardClick }) {
  return (
    <div className={styles.grid}>
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          onClick={() => onCardClick(brand)}
        />
      ))}
    </div>
  );
}
