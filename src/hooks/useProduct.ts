import { useEffect, useState } from "react";
import type { Pagination, Product } from "../types/product";
import { getProducts } from "../api/product";

export function useProduct({ query, page }: { query: string; page: number }) {
  const SIZE = 32;

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const payload = {
    query,
    pageNumber: 0,
    size: SIZE,
    additionalPages: page,
    sort: 1,
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    getProducts(payload)
      .then((data) => {
        if (isMounted) {
          setProducts(data.products);
          setHasMore(data.products.length === SIZE * (page + 1));

          setPagination(data.pagination);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError((error as Error).message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
  }, [query, page]);

  return { products, pagination, loading, error, hasMore };
}
