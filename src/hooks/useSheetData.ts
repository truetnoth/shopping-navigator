import { useState, useEffect } from 'react';
import { fetchAndParseCSV } from '../utils/parseCSV';
import type { Brand } from '../types';
import mockBrands from '../data/mockBrands.json';

const SHEET_URL = import.meta.env.VITE_SHEET_URL as string | undefined;

export function useSheetData(): {
  brands: Brand[];
  loading: boolean;
  error: Error | null;
} {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      if (!SHEET_URL) {
        // Dev mode: use mock data
        await new Promise<void>((r) => setTimeout(r, 600)); // simulate network
        setBrands(mockBrands as Brand[]);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAndParseCSV(SHEET_URL);
        setBrands(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('CSV fetch failed:', error);
        setError(error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return { brands, loading, error };
}
