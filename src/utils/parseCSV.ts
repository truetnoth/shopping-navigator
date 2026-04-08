import Papa from 'papaparse';
import type { Brand } from '../types';

// Maps Russian CSV headers to internal camelCase field names
const FIELD_MAP: Record<string, keyof RawBrand> = {
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

const PRICE_MAP: Record<string, string> = { '1': '$', '3': '$$', '5': '$$$' };

interface RawBrand {
  name?: string;
  country?: string;
  category?: string;
  priceSegmentRaw?: string;
  type?: string;
  websiteUrl?: string;
  tags?: string;
  characteristic?: string;
  fullDescription?: string;
}

function normalizeRow(row: Record<string, string>, index: number): Brand {
  const result: RawBrand = {};

  for (const [ruKey, enKey] of Object.entries(FIELD_MAP)) {
    if (ruKey in row) {
      (result as Record<string, string>)[enKey] = row[ruKey];
    }
  }

  let priceSegment = result.priceSegmentRaw ?? '';
  if (result.priceSegmentRaw !== undefined) {
    priceSegment = PRICE_MAP[String(result.priceSegmentRaw).trim()] ?? result.priceSegmentRaw;
  }

  return {
    id: `brand_${String(index + 1).padStart(3, '0')}`,
    name: result.name ?? '',
    category: result.category ?? '',
    type: result.type ?? '',
    priceSegment,
    country: result.country,
    websiteUrl: result.websiteUrl,
    tags: result.tags,
    characteristic: result.characteristic,
    fullDescription: result.fullDescription,
    isActive: true,
  };
}

export async function fetchAndParseCSV(url: string): Promise<Brand[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(url, {
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
