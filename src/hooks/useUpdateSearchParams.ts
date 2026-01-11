import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

function useUpdateSearchParams() {
  const [, setSearchParams] = useSearchParams();

  return useCallback(
    (key: string, value: string | number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, String(value));
        return next;
      });
    },
    [setSearchParams]
  );
}

export default useUpdateSearchParams;
