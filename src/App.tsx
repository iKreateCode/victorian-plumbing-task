import ProductCard from "./components/product-card";
import { useProduct } from "./hooks/useProduct";

function App() {
  const { products, loading, error } = useProduct();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!products) {
    return <div>No products found</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Showers for sale</h1>
      <ProductCard products={products} />
    </>
  );
}

export default App;
