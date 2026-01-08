import type { ApiRequest, ApiResponse, Product } from "../types/product";
import apiClient from "./client";

export async function getProducts(payload: ApiRequest): Promise<Product[]> {
  const response = await apiClient<ApiResponse>(payload);

  return response.products;
}
