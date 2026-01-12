import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "./hooks/useProduct";
import ProductList from "./components/product/product-list";
import ResultsCount from "./components/results-count/results-count";
import SortDropdown from "./components/sort-dropdown/sort-dropdown";
import useUpdateSearchParams from "./hooks/useUpdateSearchParams";

function App() {
  const [searchParams] = useSearchParams();
  const updateParam = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 0;
  const sort = Number(searchParams.get("sort")) || 1;

  const { products, pagination, loading, error, hasMore } = useProduct({
    query: "showers",
    page,
    sort,
  });

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    updateParam("page", page + 1);
  }, [loading, hasMore, page, updateParam]);

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
    <div className="flex flex-row gap-4">
      <div className="bg-white max-w-1/6 w-full border border-gray-200 p-4">
        <h1 tabIndex={0} className="text-3xl font-bold">
          Filters
        </h1>
      </div>
      <div className="max-w-5/6 w-full">
        <h1 tabIndex={0} className="text-3xl font-bold">
          Showers for sale
        </h1>

        <div className="flex justify-between items-center my-4">
          <ResultsCount pagination={pagination} />
          <SortDropdown />
        </div>

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
      </div>
    </div>
  );
}

export default App;
