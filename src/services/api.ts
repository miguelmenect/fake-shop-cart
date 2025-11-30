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

export interface Category {
  id: number;
  name: string;
}

export const getProducts = async (): Promise<Product[]> => { //função que retorna valor de api produtcts
  const response = await api.get<Product[]>('/products'); //link de api com final do link /prodcuts
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};

export default api;