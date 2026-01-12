import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ListFilter } from "lucide-react";
import { useProduct } from "./hooks/useProduct";
import useUpdateSearchParams from "./hooks/useUpdateSearchParams";
import ProductList from "./components/product/product-list";
import ResultsCount from "./components/results-count/results-count";
import SortDropdown from "./components/sort-dropdown/sort-dropdown";
import Filters from "./components/filters/filters";
import FilterPanel from "./components/filters/filter-panel";

function App() {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const updateParam = useUpdateSearchParams();

  const page = Number(searchParams.get("page")) || 0;
  const sort = Number(searchParams.get("sort")) || 1;

  const { products, pagination, facets, loading, error, hasMore } = useProduct({
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
    <>
      <FilterPanel
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
        facets={facets}
      />

      <div className="flex flex-row gap-4">
        <div className="hidden lg:block bg-white max-w-1/6 w-full border border-gray-200 p-4">
          <h1 tabIndex={0} className="text-3xl font-bold">
            Filters
          </h1>
          <Filters facets={facets} />
        </div>

        <div className="lg:max-w-5/6 w-full">
          <h1 tabIndex={0} className="text-3xl font-bold">
            Showers for sale
          </h1>

          <div className="flex justify-between items-center my-4">
            <ResultsCount pagination={pagination} />
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex gap-4 py-2 px-6 lg:hidden bg-white border border-gray-200 w-full"
              >
                <ListFilter /> Filters
              </button>
              <SortDropdown />
            </div>
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
    </>
  );
}

export default App;
