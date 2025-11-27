<template>
  <div class="card-container">
    <div class="product-image">      
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <h3>{{ product.name }}</h3>
      <p>R$ {{ formatPrice(product.price) }}</p>
      <p>{{ product.description }}</p>
      <div>
        <button class="add-cart" @click="handleAddToCart">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/services/api';
import { useCart } from '@/composables/useCart'; // importa o composable useCart

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const { addToCart } = useCart(); // aqui estamos pegando a função addToCart do composable useCart para usar

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

// funçao que adiciona o produto ao carrinho
const handleAddToCart = () => {
  addToCart(props.product); //adiciona o produto ao carrinho, produtos são os que
  };                       //foram passados como props através do v-for em Homeview
</script>

<style scoped>
.card-container {
  width: 250px;
  height: 365px;
  padding: 13px 18px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px solid black;
}

.product-image {
  width: 100%;
  height: 190px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid black;
}

.product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 12px;
  border: 1px solid black;
}

.product-details h3,
.product-details p {
  margin: 0;
}

.add-cart {
  width: 100%;
  padding: 3px 0;
  border: none;
  border-radius: 15px;  
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid black;
}

.add-cart:hover {
  
}
</style>