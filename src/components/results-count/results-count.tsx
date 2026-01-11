import type { Pagination } from "../../types/product";

function ResultsCount({ pagination }: { pagination: Pagination | null }) {
  if (!pagination) return null;

  return (
    <span tabIndex={0} className="font-bold">
      {pagination.size} of {pagination.total} results
    </span>
  );
}
export default ResultsCount;
