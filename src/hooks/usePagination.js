import { useState, useEffect, useMemo } from 'react';

function getColumns() {
  const w = window.innerWidth;
  if (w > 1024) return 3;
  if (w > 768) return 2;
  return 1;
}

function getPageSize() {
  return getColumns() * 4;
}

export function usePagination(items) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);

  // Update page size on resize
  useEffect(() => {
    function onResize() {
      const next = getPageSize();
      setPageSize((prev) => {
        if (prev !== next) setPage(1);
        return next;
      });
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Reset to page 1 when items list changes (filters applied)
  const itemsKey = items.length;
  useEffect(() => {
    setPage(1);
  }, [itemsKey]);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const pageItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page, pageSize]
  );

  return { page, setPage, pageItems, totalPages, pageSize };
}
