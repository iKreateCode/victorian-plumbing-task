import type { Facet } from "../../types/product";

function Filters({ facets }: { facets: Facet[] }) {
  const filtersPrioritised = facets.sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-4">
      {filtersPrioritised.map((filter) => (
        <h1 key={filter.displayName}>{filter.displayName}</h1>
      ))}
    </div>
  );
}

export default Filters;
