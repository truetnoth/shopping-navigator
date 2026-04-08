import BrandCard from '../BrandCard/BrandCard';
import type { Brand } from '../../types';
import styles from './BrandGrid.module.css';

interface BrandGridProps {
  brands: Brand[];
  onCardClick: (brand: Brand) => void;
}

export default function BrandGrid({ brands, onCardClick }: BrandGridProps) {
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
