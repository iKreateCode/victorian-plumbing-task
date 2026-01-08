import type { Product } from "../types/product";
import apiClient from "./client";

export async function getProducts() {
  const products = apiClient<Product[]>("/listings");
  return products;
}
