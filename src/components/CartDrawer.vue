<template>
  <div class="cart-drawer"> 
    <!-- header do carrinho com título e botão de fechar --> 
    <div class="cart-header"> 
      <div>         
        <h2>Carrinho de Compras</h2>   
      </div> 
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
                <div class="price">   
                  <p>R$ {{ formatPrice(item.price) }}</p>
                  <div class="stepper">
                    <button @click="handleDecrease(item)">-</button>
                    <span>{{item.quantity}}</span>
                    <button @click="handleIncrease(item)">+</button>
                  </div>
                </div>               
                <button class="remove-btn" @click="handleRemove(item.id)">
                  <span class="material-symbols-rounded">
                    delete
                  </span>
                </button>
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

const { cartItems, removeFromCart, decreaseItem, cartTotal, clearCart, addToCart} = useCart();

//usando emit, pois ele permite que um filho consiga usar eventos/funções do componente pai
const emit = defineEmits<{ //declarando o emit para o evento de fechar o carrinho de seu pai, Homeview
  close: [] //aqui digo que o evento close não precisa de argumentos
}>();

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace('.', ',');
};

const handleRemove = (productId: number) => {
  removeFromCart(productId); //função que 0 quantidade daquele produto baseado no id do produto
};

const handleDecrease = (product) =>{
  decreaseItem(product); //função que subtrai o item qual esta no carrinho, quanndo clicado em "-"
} 

const handleIncrease = (product) =>{
  addToCart(product);//função (addtocart) que adiciona o item qual esta no carrinho, quanndo clicado em "+"
} 

const handleCheckout = () => { //funçao que exibe um alert com valor total da compra
  alert(`Total de suas compras: R$ ${formatPrice(cartTotal())}`);  
  clearCart();// limpa o carrinho pos finalizar a compra
};

const handleClose = () => { //função de fato que chama o evento de fechar o carrinho
  emit('close'); //emit, para que os filhos consigam usar funções/eventos de seus pais
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
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 10000;
}

@media (max-width: 400px) { 
.cart-drawer{ /*se tela for menor que 401 ele cart-drawer preenche toda largura disponivel */
  width: 100% !important;
}
}

.cart-header {
  padding-bottom: 8.5px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:2px solid #ddd;
}

.cart-header h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  color: #221E6B;
}

.close-btn{
  background-color:white;
  border: none;
  font-size: 19px;
  color:#221E6B;
  font-weight:600;
  cursor: pointer;
}

.cart-list {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;  
  margin-bottom: 15px;
}

.product-container {
  width: 100%; 
  padding: 5px 0px;
  border-top: 1.5px solid #ddd; 
}

.product-container:first-child {
  border-top: none;
}

.product-container:last-child {
  border-bottom: 1.5px solid #ddd;
}

.product-details {
  width: 100%;
  display: flex;
  gap: 10px;  
  align-items: center;
  padding: 10px;
}

.product-details img {
  width: 90px;
  min-width: 90px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 8px;
  object-fit: cover;
}

.content-details {
  flex: 1; 
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.content-details > p {
  margin: 0;
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #221E6B;
  font-size:16px;
  font-weight:600;
}

.price-remove-container {
  width: 100%;
  margin-top: 8px;
  justify-content: space-between;
  display: flex;  
  align-items: center;
}

.price{
  display:flex;
  justify-content: space-between;
  height: 50px;
  gap: 15px;
}

.price p{ 
  margin: 0;
  color: #221E6B;
  font-size:16px;
  font-weight:600;
}

.stepper {
  display: flex !important;      /*para que o stepper tenha seu proprio*/
  flex-direction: row !important;/*comportamento, sem ser afetado pelo comportamento de seu pai*/
  justify-content: space-between;
  align-items: center;
  width: 75px;
  height: 25px;
  background-color: #ddd;
  border-radius: 10px;
  padding-inline:3px;  
}

.stepper button {
  background: transparent;
  border: none;
  font-size: 19px;
  cursor: pointer;
  color: #221E6B;
  font-weight: 500;
}

.stepper span {
  font-size: 15px;
  color: #221E6B;
  font-weight: 600;
  line-height: 25px;
}

.price-remove-container div { 
  display: flex;
  flex-direction: column;  
  gap: 2px;
  align-items: flex-start;  
}

.remove-btn{
  background-color: white;
  width:50px;
  height:50px;
  border:none;
  cursor: pointer;  
}

.remove-btn span{
  margin:0;
  color: #EA3323;
  font-size: 22px;
  font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
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
  color: #221E6B;
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