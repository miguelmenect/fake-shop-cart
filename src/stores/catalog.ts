// src/stores/catalog.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product } from './types'; // Importe a interface criada

// ⚠️ A URL é carregada do arquivo .env
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const useCatalogStore = defineStore('catalog', () => {
  // --- ESTADO (STATE) ---
  const products = ref<Product[]>([]);
  const isLoading = ref(false);

  // --- AÇÕES (ACTIONS) ---
  async function fetchProducts() {
    isLoading.value = true;
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Erro ao buscar produtos da API Fake');
      }
      products.value = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    isLoading,
    fetchProducts
  };
});