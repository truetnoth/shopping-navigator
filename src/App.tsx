import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import FilterPanel from './components/FilterPanel/FilterPanel';
import BrandGrid from './components/BrandGrid/BrandGrid';
import BrandDetail from './components/BrandDetail/BrandDetail';
import ResultsCount from './components/ResultsCount/ResultsCount';
import EmptyState from './components/EmptyState/EmptyState';
import Skeleton from './components/Skeleton/Skeleton';
import Pagination from './components/Pagination/Pagination';
import { useSheetData } from './hooks/useSheetData';
import { useFilters } from './hooks/useFilters';
import { usePagination } from './hooks/usePagination';
import type { Brand } from './types';
import styles from './App.module.css';

function Navigator() {
  const { brands, loading, error } = useSheetData();
  const {
    filters,
    filteredBrands,
    isActive,
    toggleArrayFilter,
    setSearch,
    resetFilters,
  } = useFilters(brands);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { page, setPage, pageItems, totalPages } = usePagination(filteredBrands);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Навигатор по российским брендам</h1>
            <p className={styles.subtitle}>Пам-пам</p>
          </div>

          <FilterPanel
            filters={filters}
            onToggleArray={toggleArrayFilter}
            onSearch={setSearch}
            onReset={resetFilters}
            isActive={isActive}
          />

          <div className={styles.results}>
            {loading ? (
              <Skeleton count={6} />
            ) : error ? (
              <EmptyState isError />
            ) : filteredBrands.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <ResultsCount count={filteredBrands.length} />
                <BrandGrid brands={pageItems} onCardClick={setSelectedBrand} />
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </main>

      {selectedBrand && (
        <BrandDetail brand={selectedBrand} onClose={() => setSelectedBrand(null)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  );
}
