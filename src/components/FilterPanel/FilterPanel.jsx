import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './FilterPanel.module.css';
import ChipGroup from './ChipGroup';
import SearchInput from './SearchInput';
import ToggleFilter from './ToggleFilter';

// v1: только гардероб
const CATEGORIES = [
  'Одежда',
  'Обувь',
  'Сумки',
  'Аксессуары',
  'Нижнее бельё',
  'Украшения',
  // Закомментировано для v1:
  // 'Очки',
  // 'Косметика уходовая',
  // 'Косметика декоративная',
  // 'Парфюм',
  // 'Косметика для волос',
  // 'Декор для дома',
  // 'Мебель',
  // 'Посуда',
  // 'Текстиль',
  // 'Освещение',
  // 'Товары для животных',
  // 'Спортивные товары',
  // 'Гаджеты',
  // 'Товары 18+',
];

const TYPES = ['Женское', 'Мужское', 'Для всех', 'Детское'];

const PRICE_SEGMENTS = [
  { value: '$', label: '$ — доступный' },
  { value: '$$', label: '$$ — средний' },
  { value: '$$$', label: '$$$ — премиум' },
];

export default function FilterPanel({ filters, onToggleArray, onToggleBoolean, onSearch, onReset, isActive }) {
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
          label="Тип"
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

        <ToggleFilter
          label="Собственное производство"
          checked={filters.hasOwnProduction}
          onToggle={() => onToggleBoolean('hasOwnProduction')}
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
