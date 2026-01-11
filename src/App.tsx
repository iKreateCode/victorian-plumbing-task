import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "./hooks/useProduct";
import ProductList from "./components/product/product-list";
import ResultsCount from "./components/pagination/results-count";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;

  const { products, pagination, loading, error, hasMore } = useProduct({
    query: "showers",
    page,
  });

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(page + 1));
      return next;
    });
  }, [loading, hasMore, page, setSearchParams]);

  if (loading && page === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  if (!products.length) {
    return <div>No products found</div>;
  }

  return (
    <>
      <h1 tabIndex={0} className="text-3xl font-bold underline">
        Showers for sale
      </h1>

      <ResultsCount pagination={pagination} />

      <ProductList products={products} />

      {hasMore && (
        <div className="flex flex-col items-center mt-4 gap-4">
          <ResultsCount pagination={pagination} />

          <button
            className="bg-sky-500 text-white px-4 py-2 rounded"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}

export default App;
