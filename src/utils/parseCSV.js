import Papa from 'papaparse';

const BOOLEAN_FIELDS = ['hasOwnProduction', 'isActive'];

function castRow(row) {
  const result = { ...row };
  BOOLEAN_FIELDS.forEach((field) => {
    if (field in result) {
      result[field] = result[field] === 'TRUE' || result[field] === 'true' || result[field] === '1';
    }
  });
  return result;
}

export async function fetchAndParseCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const brands = results.data.map(castRow);
        resolve(brands);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
