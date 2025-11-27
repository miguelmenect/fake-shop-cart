<!---estrutura da pagina home--->
<template>
  <div class="home-page">
    <div class="container-nav">
    <nav class="navbar"> 
      <h3>MyShop!</h3>
      <button class="cart-btn" @click="toggleCart">O</button> <!-- botão do carrinho de compras -->
    </nav>
    </div>
    <div class="container-catalog">
      <h2>NOSSOS PRODUTOS</h2>
      <div class="products-catalog">
        <!--componente de card dos produtos sendo renderizado-->  
        <ProductCard />             
      </div>
    </div>
    <!--se o isCartOpen for vedadeiro ele exibe o container de overlay e o componente de carrinho-->
    <!--se o container de overlay for clicado ele deixa o isCartOpen como false, fechando overlay e carrinho-->
    <div v-if="isCartOpen" class="cart-overlay" @click="closeCart"> 
    <!--componente de carrinho sendo renderizado--> 
    <CartDrawer />                                                  
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import CartDrawer from '@/components/CartDrawer.vue';

const isCartOpen = ref(false); // estado para controlar a visibilidade do carrinho(começa em false)

const toggleCart = () => {
  // alterna o estado atual do carrinho entre aberto e fechado
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false; //fecha o carrinho caso clique no overlay, no caso fora do carrinho
};

</script>

<!--- estilização da pagina home --->
<style scoped>
* {
  box-sizing: border-box;
}

.home-page {
  min-height: 100vh; 
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
/* container da navbar */
.container-nav{
  width: 1100px; 
  height: 55px;
  /*border:1px solid black;*/
}

/* navbar */
.navbar{
  padding: 5px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%; 
  width:100%;  
  background-color:"#FFF";
  border-radius: 20px;
}
/* botão de carrinho de compras */
.cart-btn{
  height: 40px;
  width: 40px;  
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  background-color:#FFF;
  transition: background-color 0.3s ease;
}
/* hover do botão de carrinho */
.cart-btn:hover {
  background-color: #d61e1eff;
}

.container-catalog{
  width: 100%;
  height: auto;
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  /*border: 1px solid black;*/
}

.products-catalog  {
  width: 100%;   
  height: 400px;
  padding: 10px 20px;
  border: 1px solid black;
}

/*overlay para quando o carrinho estiver aberto*/
.cart-overlay{
  position: fixed;
  width: 100vw;
  height: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style> 