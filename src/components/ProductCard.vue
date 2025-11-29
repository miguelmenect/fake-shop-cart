<template>
  <div class="card-container">
    <div class="product-image">
      <div class="category-label"></div>    
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-details">
      <h3>{{ product.name }}</h3>
      <p>R$ {{ formatPrice(product.price) }}</p>
      <span>{{ product.description }}</span>
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
  };                       //foram passados como props através do v-for em HomeView
</script>

<style scoped>
.card-container {
  width: 250px;
  height: 100%;
  max-height: 373px;
  padding: 13px 18px;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease; 
  cursor: pointer; 
}

.card-container:hover{
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
  border-color: #36CA6A;
}

.product-image {
  width: 100%;
  height: 190px;
  border-radius: 8px;
  overflow: hidden;  
}

.product-image img{
  width: 100%;
  height: 100%;
  object-fit:cover;
}

.category-label{
  display:flex;
  margin-top:7px;
  margin-left:5px;
  width:70px;
  height:20px;
  position:absolute;
  background-color: white;
  border-radius: 12px;
  justify-content:center;
  align-items:center;
  font-size:12px;
  color:#221E6B;
}

.product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 12px;  
}

.product-details h3{
  margin: 0;
  color: #221E6B;
  font-weight: 600;
  font-size: 17px;
}

.product-details p {
  margin: 0;
  color: #221E6B;
  font-weight: 700;
  font-size: 19px;
}

.product-details span {
  margin: 0;
  color: #221E6B;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
}

.product-details div{
  /*border: 1px solid black;*/
  height:40px;  
  display:flex;
  align-items:center;
  justify-content: center;
}

.add-cart {
  width: 100%;
  height: 38px;
  padding: 3px 0;
  border: none;
  border-radius: 18px;
  font-weight: 700;  
  color: white;
  font-size: 16px;
  background-color: #36CA6A;  
  cursor: pointer;
  transition: background-color 0.3s ease;  
}

.add-cart:hover {
  background-color: #27b458ff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}
</style>