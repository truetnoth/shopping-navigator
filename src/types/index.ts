export interface Brand {
  id: string;
  name: string;
  category: string;
  type: string;
  priceSegment: string;
  city?: string;
  region?: string;
  hasOwnProduction?: boolean;
  tags?: string;
  characteristic?: string;
  shortDescription?: string;
  fullDescription?: string;
  imageUrl?: string;
  additionalImages?: string;
  websiteUrl?: string;
  offlineStores?: string;
  tjArticleUrl?: string;
  tjArticleTitle?: string;
  shoppingLink?: string;
  promoText?: string;
  isActive: boolean;
  country?: string;
}

export interface Filters {
  categories: string[];
  types: string[];
  priceSegments: string[];
  styles: string[];
  characteristics: string[];
  search: string;
}

export type ArrayFilterKey =
  | 'categories'
  | 'types'
  | 'priceSegments'
  | 'styles'
  | 'characteristics';
