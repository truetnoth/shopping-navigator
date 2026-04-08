import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './FilterPanel.module.css';
import ChipGroup from './ChipGroup';
import SearchInput from './SearchInput';

const CATEGORIES = [
  'Одежда',
  'Верхняя одежда',
  'Обувь',
  'Сумки',
  'Аксессуары',
  'Нижнее белье',
];

const TYPES = ['Для женщин', 'Для мужчин', 'Унисекс'];

const PRICE_SEGMENTS = [
  { value: '$', label: '$ — доступный' },
  { value: '$$', label: '$$ — средний' },
  { value: '$$$', label: '$$$ — премиум' },
];

const STYLES = ['Кэжуал', 'Деловой стиль', 'Ледилайк', 'Ворквир', 'Аутдор', 'Авангард'];

const CHARACTERISTICS = [
  { value: 'Базовое', label: 'Базовое' },
  { value: 'Акцентное', label: 'Акцентное' },
];

export default function FilterPanel({ filters, onToggleArray, onSearch, onReset, isActive }) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const debounceTimer = useRef(null);

  const handleSearch = useCallback((value) => {
    setSearchValue(value);
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  }, [onSearch]);

  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  return (
    <div className={styles.panel}>
      <SearchInput value={searchValue} onChange={handleSearch} />

      <div className={styles.groups}>
        <ChipGroup
          label="Категория"
          options={CATEGORIES}
          selected={filters.categories}
          onToggle={(val) => onToggleArray('categories', val)}
        />

        <ChipGroup
          label="Для кого"
          options={TYPES}
          selected={filters.types}
          onToggle={(val) => onToggleArray('types', val)}
        />

        <ChipGroup
          label="Цена"
          options={PRICE_SEGMENTS.map((p) => p.value)}
          labels={Object.fromEntries(PRICE_SEGMENTS.map((p) => [p.value, p.value]))}
          selected={filters.priceSegments}
          onToggle={(val) => onToggleArray('priceSegments', val)}
        />

        <ChipGroup
          label="Стиль"
          options={STYLES}
          selected={filters.styles}
          onToggle={(val) => onToggleArray('styles', val)}
        />

        <ChipGroup
          label="Характер"
          options={CHARACTERISTICS.map((c) => c.value)}
          selected={filters.characteristics}
          onToggle={(val) => onToggleArray('characteristics', val)}
        />
      </div>

      {isActive && (
        <button className={styles.resetBtn} onClick={onReset}>
          Сбросить фильтры
        </button>
      )}
    </div>
  );
}
