import styles from './EmptyState.module.css';

interface EmptyStateProps {
  isError?: boolean;
}

export default function EmptyState({ isError }: EmptyStateProps) {
  if (isError) {
    return (
      <div className={styles.wrapper}>
        <span className={styles.emoji}>⚠️</span>
        <p className={styles.title}>Данные временно недоступны</p>
        <p className={styles.text}>Попробуйте обновить страницу чуть позже</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.emoji}>🔍</span>
      <p className={styles.title}>По вашему запросу ничего не найдено</p>
      <p className={styles.text}>Попробуйте изменить фильтры или сбросить их</p>
    </div>
  );
}
