import type { Product } from "../../types/product";
import ProductCard from "./product-card";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-2xl">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;
