import type { Pagination } from "../../types/product";

function ResultsCount({ pagination }: { pagination: Pagination | null }) {
  if (!pagination) return null;

  return (
    <p>
      {pagination.size} of {pagination.total} results
    </p>
  );
}
export default ResultsCount;
