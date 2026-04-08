/**
 * Filters brands based on active filter criteria.
 * Category/type/priceSegment/styles/characteristics — OR within group, AND between groups.
 */
export function filterBrands(brands, filters) {
  const { categories, types, priceSegments, styles, characteristics, search } = filters;

  return brands.filter((brand) => {
    if (brand.isActive === false) return false;

    // Category filter (OR within group)
    if (categories.length > 0) {
      const brandCategories = brand.category
        ? brand.category.split(',').map((s) => s.trim())
        : [];
      if (!categories.some((cat) => brandCategories.includes(cat))) return false;
    }

    // Type filter (OR within group)
    if (types.length > 0) {
      const brandTypes = brand.type
        ? brand.type.split(',').map((s) => s.trim())
        : [];
      if (!types.some((t) => brandTypes.includes(t))) return false;
    }

    // Price segment filter (OR within group)
    if (priceSegments.length > 0) {
      if (!priceSegments.includes(brand.priceSegment)) return false;
    }

    // Style tags filter (OR within group)
    if (styles.length > 0) {
      const brandStyles = brand.tags
        ? brand.tags.split(',').map((s) => s.trim())
        : [];
      if (!styles.some((s) => brandStyles.includes(s))) return false;
    }

    // Characteristic filter (OR within group)
    if (characteristics.length > 0) {
      if (!characteristics.includes(brand.characteristic)) return false;
    }

    // Text search
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      const searchable = [brand.name, brand.fullDescription]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    return true;
  });
}

export const INITIAL_FILTERS = {
  categories: [],
  types: [],
  priceSegments: [],
  styles: [],
  characteristics: [],
  search: '',
};
