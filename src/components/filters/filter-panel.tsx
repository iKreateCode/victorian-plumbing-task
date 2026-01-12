import { X } from "lucide-react";
import type { Facet } from "../../types/product";

interface FilterPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  facets: Facet[];
}

function FilterPanel({ isOpen, setIsOpen, facets }: FilterPanelProps) {
  if (!isOpen) return null;

  const filtersPrioritised = facets.sort((a, b) => a.priority - b.priority);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 tabIndex={0} className="text-2xl font-bold">
              Filters
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {filtersPrioritised.map((filter) => (
              <div
                key={filter.displayName}
                className="pb-4 border-b border-gray-200"
              >
                <h2 className="font-semibold text-lg">{filter.displayName}</h2>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterPanel;
