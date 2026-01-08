import { useProduct } from "./hooks/useProduct";

function App() {
  const { products, loading, error } = useProduct();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Showers for sale</h1>;
      <ul>
        {products?.map((product) => {
          return <li key={product.id}>{product.productName}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
