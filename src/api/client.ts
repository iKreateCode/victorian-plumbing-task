import type { ApiRequest } from "../types/product";

async function apiClient<T>({
  query,
  pageNumber,
  size,
  additionalPages,
  sort,
}: ApiRequest): Promise<T> {
  const BASE_URL = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${
    import.meta.env.VITE_API_KEY
  }`;

  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      body: JSON.stringify({
        query,
        pageNumber,
        size,
        additionalPages,
        sort,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error occurred while fetching API:", error);
    throw error;
  }
}

export default apiClient;
