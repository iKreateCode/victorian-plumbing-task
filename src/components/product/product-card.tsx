import { Star } from "lucide-react";
import type {
  Product,
  ProductAttributes,
  ProductPrice,
  ProductStockStatus,
} from "../../types/product";
import React from "react";

function ProductPill({ text }: { text: string }) {
  const isSale = text === "SALE";

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
        isSale ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {text}
    </span>
  );
}

function ProductAttributes({ attributes }: { attributes: ProductAttributes }) {
  if (!attributes) {
    return null;
  }

  const { isBestSeller, isNew, isShortProjection, isEco } = attributes;

  return (
    <div className="flex gap-2">
      {isBestSeller && <ProductPill text={"Best Seller"} />}
      {isNew && <ProductPill text={"New"} />}
      {isShortProjection && <ProductPill text={"Short Projection"} />}
      {isEco && <ProductPill text={"Eco"} />}
    </div>
  );
}

function ProductBrandAndRating({ product }: { product: Product }) {
  return (
    <div className="flex justify-between items-center">
      {product.brand.brandImage?.url ? (
        <img
          className="h-6 w-auto"
          src={product.brand.brandImage.url}
          alt={product.brand.name}
        />
      ) : (
        product.brand.name
      )}
      {product.reviewsCount && (
        <div tabIndex={0} className="flex flex-row gap-1">
          {product.averageRating}
          <Star fill="orange" strokeWidth={0} />({product.reviewsCount})
        </div>
      )}
    </div>
  );
}

function ProductImage({ product }: { product: Product }) {
  return (
    <div className="relative">
      {product.price.isOnPromotion && (
        <div className="absolute top-2 left-2 z-10">
          <ProductPill text={"SALE"} />
        </div>
      )}
      <img
        src={product.image.url}
        alt={product.image.attributes.imageAltText}
      />
    </div>
  );
}

function ProductPrice({ price }: { price: ProductPrice }) {
  const isPromotion = price.isOnPromotion;

  return (
    <div tabIndex={0} className="flex gap-2 items-center">
      <p className={`font-bold ${isPromotion ? "text-red-500" : "text-black"}`}>
        £{price.priceIncTax}
      </p>
      {isPromotion && (
        <p className="text-gray-500 line-through">£{price.wasPriceIncTax}</p>
      )}
    </div>
  );
}

/**
 * Stock status codes:
 * G = in Stock
 * D = left in stock
 * A = Low stock
 * X = discounted
 * E = Due 12 stock
 * R = estimated restock date
 * U = out of stock
 */
function ProductStockStatus({
  stockStatus,
}: {
  stockStatus: ProductStockStatus;
}) {
  switch (stockStatus.status) {
    case "G":
      return (
        <span tabIndex={0} className="text-green-600 font-semibold">
          In Stock
        </span>
      );
    case "D":
      return (
        <span tabIndex={0} className="text-yellow-600 font-semibold">
          `${stockStatus.stockLevel} Left in Stock`
        </span>
      );
    case "A":
      return (
        <span tabIndex={0} className="text-orange-600 font-semibold">
          Low Stock
        </span>
      );
    case "U":
      return (
        <span tabIndex={0} className="text-red-600 font-semibold">
          Out of Stock
        </span>
      );
    default:
      return null;
  }
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div
      tabIndex={0}
      key={product.id}
      className="border border-gray-200 p-4 space-y-2"
    >
      <ProductImage product={product} />
      <ProductBrandAndRating product={product} />
      <h1 tabIndex={0}>{product.productName}</h1>
      <ProductAttributes attributes={product.attributes} />
      <ProductPrice price={product.price} />
      <ProductStockStatus stockStatus={product.stockStatus} />
    </div>
  );
}

export default React.memo(ProductCard);
