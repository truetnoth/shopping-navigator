import { useState, useEffect } from 'react';
import { fetchAndParseCSV } from '../utils/parseCSV';
import mockBrands from '../data/mockBrands.json';

const SHEET_URL = import.meta.env.VITE_SHEET_URL;

export function useSheetData() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      if (!SHEET_URL) {
        // Dev mode: use mock data
        await new Promise((r) => setTimeout(r, 600)); // simulate network
        setBrands(mockBrands);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchAndParseCSV(SHEET_URL);
        setBrands(data);
      } catch (err) {
        console.error('CSV fetch failed:', err);
        setError(err);
        setBrands([]); // show empty state with error
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { brands, loading, error };
}
