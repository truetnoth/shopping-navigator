import styles from './ToggleFilter.module.css';

interface ToggleFilterProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export default function ToggleFilter({ label, checked, onToggle }: ToggleFilterProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.on : ''}`}
        onClick={onToggle}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
