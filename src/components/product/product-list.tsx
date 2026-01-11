import type { Product } from "../../types/product";
import ProductCard from "./product-card";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 rounded-2xl">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
