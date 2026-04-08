import styles from './ResultsCount.module.css';

function pluralize(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'бренд';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'бренда';
  return 'брендов';
}

interface ResultsCountProps {
  count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
  return (
    <p className={styles.count}>
      Найдено <strong>{count}</strong> {pluralize(count)}
    </p>
  );
}
