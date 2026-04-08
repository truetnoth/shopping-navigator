import { useEffect, useCallback, useState } from 'react';
import type { Brand } from '../../types';
import styles from './BrandDetail.module.css';

const PRICE_LABELS: Record<string, string> = {
  '$': 'доступный',
  '$$': 'средний',
  '$$$': 'премиум',
};

interface BrandDetailProps {
  brand: Brand;
  onClose: () => void;
}

export default function BrandDetail({ brand, onClose }: BrandDetailProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  async function handleCopyLink() {
    const url = `${window.location.origin}${window.location.pathname}?brand=${brand.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback ignored
    }
  }

  const categories = brand.category ? brand.category.split(',').map((s) => s.trim()) : [];
  const tagList = brand.tags ? brand.tags.split(',').map((s) => s.trim()).filter(Boolean) : [];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={brand.imageUrl || `https://placehold.co/800x450/f5f5f5/333?text=${encodeURIComponent(brand.name)}`}
            alt={brand.name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          {/* Categories + type */}
          <div className={styles.tags}>
            {categories.map((cat) => (
              <span key={cat} className={styles.tag}>{cat}</span>
            ))}
            {brand.type && (
              <span className={`${styles.tag} ${styles.tagType}`}>{brand.type}</span>
            )}
          </div>

          {/* Title */}
          <h2 className={styles.name}>{brand.name}</h2>

          {/* CTA — website button */}
          {brand.websiteUrl && (
            <a
              className={styles.websiteBtn}
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Перейти в интернет-магазин →
            </a>
          )}

          {/* Price segment */}
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Цена</span>
            <span className={styles.priceValue}>
              {brand.priceSegment}
              {PRICE_LABELS[brand.priceSegment] && (
                <span className={styles.priceHint}> — {PRICE_LABELS[brand.priceSegment]}</span>
              )}
            </span>
          </div>

          {/* Characteristic */}
          {brand.characteristic && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Характер</span>
              <span>{brand.characteristic}</span>
            </div>
          )}

          {/* Style tags */}
          {tagList.length > 0 && (
            <div className={styles.badges}>
              {tagList.map((tag) => (
                <span key={tag} className={styles.badgeGray}>{tag}</span>
              ))}
            </div>
          )}

          {/* Description */}
          {brand.fullDescription && (
            <p className={styles.description}>{brand.fullDescription}</p>
          )}

          {/* Copy link */}
          <button className={styles.copyBtn} onClick={() => void handleCopyLink()}>
            {copied ? '✓ Ссылка скопирована' : 'Скопировать ссылку на бренд'}
          </button>
        </div>
      </div>
    </div>
  );
}
