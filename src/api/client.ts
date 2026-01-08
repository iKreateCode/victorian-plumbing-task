async function apiClient<T>(endpoint: string): Promise<T> {
  const BASE_URL = `https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=${
    import.meta.env.VITE_API_KEY
  }`;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

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
