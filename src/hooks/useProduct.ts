import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../api/product";

export function useProduct(query: string = "showers") {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const payload = {
    query,
    pageNumber: 0,
    size: 32,
    additionalPages: 0,
    sort: 1,
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getProducts(payload)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
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
  }, [query]);

  return { products, loading, error };
}
