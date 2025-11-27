<template>
  <div class="cart-drawer"> 
    <!-- header do carrinho com título e botão de fechar --> 
    <div class="cart-header">     
    <h2>Carrinho de Compras</h2>    
       <button class="close-btn" @click="handleClose">✕</button>
    </div>
    <div class="cart-list">
      <!-- se cartItems for igual a 0, ou seja vazio, ele exibirá essa mensagem-->
      <div v-if="cartItems.length == 0" class="empty-cart">
        <p>Seu carrinho está vazio :(</p>
      </div>
      <!-- lista de produtos, que exibe os produtos quando adicionados ao carrinho-->
      <div v-else>
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="product-container"
        >
          <div class="product-details">
            <img :src="item.image" :alt="item.name" />
            <div class="content-details">
              <p>{{ item.name }}</p>
              <div class="price-remove-container">
                <div>   
                  <p class="item-price">R$ {{ formatPrice(item.price) }}</p>
                  <span class="item-quantity">Qtd: {{ item.quantity }}</span>
                </div>               
                <button @click="handleRemove(item.id)">Remover</button>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </div>

  <!-- div que exibe valor total da compra e botão de finalizar compra quando -->
  <!-- cartItems é maior que 0, ou seja quando tem itens no carrinho--> 
    <div v-if="cartItems.length > 0" class="cart-footer">
      <div class="total">
        <strong>Total:</strong>
        <strong>R$ {{ formatPrice(cartTotal()) }}</strong>
      </div>
      <div class="checkout-div">
        <button @click="handleCheckout">Finalizar Compras</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/composables/useCart';

const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

//usando emit, pois ele permite que um filho consiga usar eventos/funções do componente pai
const emit = defineEmits<{ //declarando o emit para o evento de fechar o carrinho de seu pai, Homeview
  close: [] //aqui digo que o evento close não precisa de argumentos
}>();

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

const handleRemove = (productId: number) => {
  removeFromCart(productId);
};

const handleCheckout = () => { //funçao que exibe um alert com valor total da compra
  alert(`Total de suas compras: R$ ${formatPrice(cartTotal())}`);  
  clearCart();// limpa o carrinho pos finalizar a compra
};

const handleClose = () => { //função de fato que chama o evento de fechar o carrinho
  emit('close'); 
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.cart-drawer {
  width: 340px;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: red;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  z-index: 10000;
}

.cart-drawer h2 {
  margin: 0 0 15px 0;
}

.cart-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
}

.cart-list {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid black;
  margin-bottom: 15px;
}

.product-container {
  width: 100%; 
}

.product-details {
  width: 100%;
  display: flex;
  gap: 10px;
  border: 1px solid black;
  align-items: center;
  padding: 10px;
}

.product-details img {
  width: 90px;
  min-width: 90px;
  height: 90px;
  flex-shrink: 0;
  border: 1px solid black;
  border-radius: 8px;
  object-fit: cover;
}

.content-details {
  flex: 1; 
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid blue;
}

.content-details > p {
  margin: 0;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-cart {
  padding: 20px;
  text-align: center;
  color: #666;
}

.cart-footer {
  border-top: 1px solid #ddd;
  padding-top: 15px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 15px;
}

.price-remove-container {
  width: 100%;
  margin-top: 8px;
  justify-content: space-between;
  display: flex;
  gap: 10px;
  align-items: center;
}

.price-remove-container span {
  font-size: 14px;
  color: #666;
}

.price-remove-container div { 
  display: flex;
  flex-direction: column;  
  gap: 2px;
  align-items: flex-start;
  
}
.price-remove-container div p{ 
  margin: 0;  
}
.checkout-div {
  width: 100%;
  height: 50px;
}

.checkout-div button {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 15px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.checkout-div button:hover {
  background-color: #218838;
}
</style>