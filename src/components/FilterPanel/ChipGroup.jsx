import styles from './ChipGroup.module.css';

export default function ChipGroup({ label, options, selected, onToggle, labels }) {
  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <div className={styles.chips}>
        {options.map((option) => (
          <button
            key={option}
            className={`${styles.chip} ${selected.includes(option) ? styles.active : ''}`}
            onClick={() => onToggle(option)}
          >
            {labels ? labels[option] : option}
          </button>
        ))}
      </div>
    </div>
  );
}
