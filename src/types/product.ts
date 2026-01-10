export interface ApiRequest {
  query: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: number;
  facets?: Record<
    string,
    Array<{
      identifier: string;
      value: string | { gte: number; lte: number } | boolean;
    }>
  >;
}

export type ApiResponse = {
  pagination: string;
  facets: Facet[];
  products: Product[];
};

export type Product = {
  id: string;
  legacyId?: string;
  legacyVariantId?: string;
  cultureCode: string;
  isDefaultVariant: boolean;
  sku: string;
  productName: string;
  slug: string;
  averageRating: number;
  reviewsCount: number;
  questionsCount: number;
  image: ProductImage;
  stockStatus: ProductStockStatus;
  price: ProductPrice;
  attributes: ProductAttributes;
  defaultCategory: ProductCategory;
  brand: ProductBrand;
  score?: number;
};

export type ProductImage = {
  externalId: string;
  url: string;
  priority: number;
  isDefault: boolean;
  attributes: {
    imageAltText: string;
  };
};

export type ProductStockStatus = {
  status: string;
  stockLevel?: number;
};

export type ProductPrice = {
  currencyCode: string;
  wasPriceIncTax?: number;
  wasPriceExcTax?: number;
  priceIncTax: number;
  priceExcTax: number;
  isOnPromotion: boolean;
};

export interface ProductAttributes {
  isBestSeller?: boolean;
  isNew?: boolean;
  isShortProjection?: boolean;
  isEco?: boolean;
}

export type ProductCategory = {
  externalId: string;
  slug: string;
  name: string;
  isDefault: boolean;
  ancestors: Array<{
    externalId: string;
    slug: string;
    name: string;
    depth: number;
  }>;
};

export type ProductBrand = {
  externalId: string;
  slug: string;
  name: string;
  brandImage?: {
    externalId: string;
    url: string;
    priority: number;
    isDefault: boolean;
    attributes: {
      imageAltText: string;
    };
  };
};

export type Facet = {
  identifier: string;
  displayName: string;
  priority: number;
  facetType: number;
  options: FacetOption[];
};

export type FacetOption = {
  identifier: string;
  value: string | { gte: number; lte: number } | boolean;
  displayValue: string;
  productCount: number;
  priority: number;
};
