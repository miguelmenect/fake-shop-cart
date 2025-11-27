import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category_id: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export default api;