import { useEffect, useCallback, useState } from 'react';
import styles from './BrandDetail.module.css';

const PRICE_LABELS = {
  '$': 'до ~3 000 ₽ за вещь',
  '$$': '3 000 – 15 000 ₽',
  '$$$': 'от 15 000 ₽',
};

export default function BrandDetail({ brand, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleKeyDown = useCallback((e) => {
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
  const types = brand.type ? brand.type.split(',').map((s) => s.trim()) : [];
  const tags = brand.tags ? brand.tags.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const offlineStores = brand.offlineStores ? brand.offlineStores.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const tjUrls = brand.tjArticleUrl ? brand.tjArticleUrl.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const tjTitles = brand.tjArticleTitle ? brand.tjArticleTitle.split(',').map((s) => s.trim()).filter(Boolean) : [];

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
            {types.map((t) => (
              <span key={t} className={`${styles.tag} ${styles.tagType}`}>{t}</span>
            ))}
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

          {/* City */}
          {brand.city && (
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Город</span>
              <span>{brand.city}{brand.region ? `, ${brand.region}` : ''}</span>
            </div>
          )}

          {/* Tags */}
          {(brand.hasOwnProduction || tags.length > 0) && (
            <div className={styles.badges}>
              {brand.hasOwnProduction && (
                <span className={styles.badgeYellow}>Собственное производство</span>
              )}
              {tags.filter((t) => t !== 'Собственное производство').map((tag) => (
                <span key={tag} className={styles.badgeGray}>{tag}</span>
              ))}
            </div>
          )}

          {/* Description */}
          {brand.fullDescription && (
            <p className={styles.description}>{brand.fullDescription}</p>
          )}

          {/* Offline stores */}
          {offlineStores.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Офлайн-магазины</h4>
              <p className={styles.sectionText}>{offlineStores.join(' · ')}</p>
            </div>
          )}

          {/* TJ articles */}
          {tjUrls.length > 0 && (
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Бренд в Т—Ж</h4>
              <div className={styles.articles}>
                {tjUrls.map((url, i) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.articleLink}
                  >
                    {tjTitles[i] || 'Читать статью'}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Promo */}
          {brand.promoText && (
            <div className={styles.promoBlock}>
              <span className={styles.promoIcon}>🎁</span>
              <p className={styles.promoText}>{brand.promoText}</p>
            </div>
          )}

          {/* Shopping Tinkoff */}
          {brand.shoppingLink && (
            <a
              className={styles.shoppingBtn}
              href={brand.shoppingLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Найти в Шоппинге Т-Банка
            </a>
          )}

          {/* Copy link */}
          <button className={styles.copyBtn} onClick={handleCopyLink}>
            {copied ? '✓ Ссылка скопирована' : 'Скопировать ссылку на бренд'}
          </button>
        </div>
      </div>
    </div>
  );
}
