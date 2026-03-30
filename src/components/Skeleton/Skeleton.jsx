import styles from './Skeleton.module.css';

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={`${styles.shimmer} ${styles.image}`} />
      <div className={styles.body}>
        <div className={`${styles.shimmer} ${styles.line} ${styles.short}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.title}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.medium}`} />
        <div className={`${styles.shimmer} ${styles.line} ${styles.long}`} />
      </div>
    </div>
  );
}

export default function Skeleton({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
