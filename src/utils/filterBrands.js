/**
 * Filters brands based on active filter criteria.
 * Category/type/priceSegment — OR within group, AND between groups.
 */
export function filterBrands(brands, filters) {
  const { categories, types, priceSegments, hasOwnProduction, search } = filters;

  return brands.filter((brand) => {
    if (!brand.isActive) return false;

    // Category filter (OR within group)
    if (categories.length > 0) {
      const brandCategories = brand.category
        ? brand.category.split(',').map((s) => s.trim())
        : [];
      const matches = categories.some((cat) => brandCategories.includes(cat));
      if (!matches) return false;
    }

    // Type filter (OR within group)
    if (types.length > 0) {
      const brandTypes = brand.type
        ? brand.type.split(',').map((s) => s.trim())
        : [];
      const matches = types.some((t) => brandTypes.includes(t));
      if (!matches) return false;
    }

    // Price segment filter (OR within group)
    if (priceSegments.length > 0) {
      if (!priceSegments.includes(brand.priceSegment)) return false;
    }

    // Toggle: own production
    if (hasOwnProduction && !brand.hasOwnProduction) return false;

    // Text search
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      const searchable = [brand.name, brand.shortDescription, brand.city]
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
  hasOwnProduction: false,
  search: '',
};
