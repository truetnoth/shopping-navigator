import Papa from 'papaparse';

// Maps Russian CSV headers to internal camelCase field names
const FIELD_MAP = {
  'Бренд': 'name',
  'Страна': 'country',
  'Категория': 'category',
  'Ценовой сегмент': 'priceSegmentRaw',
  'Для кого': 'type',
  'Ссылка': 'websiteUrl',
  'Теги': 'tags',
  'Характеристика': 'characteristic',
  'Описание': 'fullDescription',
};

const PRICE_MAP = { '1': '$', '3': '$$', '5': '$$$' };

function normalizeRow(row, index) {
  const result = {};

  // Remap Russian keys to camelCase
  for (const [ruKey, enKey] of Object.entries(FIELD_MAP)) {
    if (ruKey in row) {
      result[enKey] = row[ruKey];
    }
  }

  // Convert numeric price segment to symbol
  if (result.priceSegmentRaw !== undefined) {
    result.priceSegment = PRICE_MAP[String(result.priceSegmentRaw).trim()] || result.priceSegmentRaw;
    delete result.priceSegmentRaw;
  }

  // Generate stable id from index if not present
  if (!result.id) {
    result.id = `brand_${String(index + 1).padStart(3, '0')}`;
  }

  // All rows from sheet are considered active
  result.isActive = true;

  return result;
}

export async function fetchAndParseCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const brands = results.data.map(normalizeRow);
        resolve(brands);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}
