import styles from './SearchInput.module.css';

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="#999" strokeWidth="1.5" />
        <path d="M11 11L14 14" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск по названию или городу"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')} aria-label="Очистить поиск">
          ×
        </button>
      )}
    </div>
  );
}
