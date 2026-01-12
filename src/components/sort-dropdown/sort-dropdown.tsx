import { useSearchParams } from "react-router-dom";
import useUpdateSearchParams from "../../hooks/useUpdateSearchParams";

function SortDropdown() {
  const [searchParams] = useSearchParams();
  const updateParam = useUpdateSearchParams();
  const currentSort = searchParams.get("sort") || "1";

  return (
    <select
      aria-label="Sort By"
      className="border bg-white border-gray-300 p-2 rounded"
      onChange={(e) => {
        updateParam("sort", e.target.value);
      }}
      value={currentSort}
    >
      <option value="1">Recommended</option>
      <option value="2">Price: Low to High</option>
      <option value="3">Price: High to Low</option>
      <option value="4">Highest Discounts</option>
    </select>
  );
}

export default SortDropdown;
