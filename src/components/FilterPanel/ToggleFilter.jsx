import styles from './ToggleFilter.module.css';

export default function ToggleFilter({ label, checked, onToggle }) {
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
