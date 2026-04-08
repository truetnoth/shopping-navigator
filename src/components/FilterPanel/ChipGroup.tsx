import styles from './ChipGroup.module.css';

interface ChipGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  labels?: Record<string, string>;
}

export default function ChipGroup({ label, options, selected, onToggle, labels }: ChipGroupProps) {
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
