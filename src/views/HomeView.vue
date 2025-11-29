<!---estrutura da pagina home--->
<template>
  <div class="home-page">
    <div class="container-nav">
    <nav class="navbar">       
     <div class="nav-search"> 
      <img src="/images/my-shop-logo.png" alt="MyShop"/>
      <div class="search-container">
      <input 
        type="text" 
        placeholder="Filtrar produtos..."
        v-model="searchTerm"/> <!-- conecta esse input ao searchTerm, ATUALIZA o estado -->
                               <!--de searchTerm a cada tecla digitada-->                               
      <button class="filter-btn" @click="filteredProducts">
        <span class="material-symbols-rounded">
          search
        </span>
      </button>
      </div>
      </div>
      <button class="cart-btn" @click="toggleCart">
        <span class="material-symbols-rounded"><!-- botão do carrinho de compras -->
          shopping_cart
        </span>
        <div v-if="totalQuantity > 0" class="cart-badge">
          {{ totalQuantity }}
        </div>
      </button> 
    </nav>
    </div>
    <div class="container-catalog">
      <h2>NOSSOS PRODUTOS</h2>

      <div v-if="loading">
        <p>Carregando produtos...</p>
      </div>

      <div class="products-catalog">
        <!--componente de card dos produtos sendo renderizado-->  
        <ProductCard 
         v-for="product in filteredProducts"
        :key="product.id" 
        :product="product"        
        />    
        <!--:v-for um laço de repetição que percorre o array products -->
        <!--:key identifica unicamente cada card pelo id do produto-->
        <!--:product= é nome da prop que está sendo passada para o componente ProductCard-->   
      </div>
    </div>
    <Transition name="cart-slide">
    <!--se o isCartOpen for vedadeiro ele exibe o container de overlay e o componente de carrinho-->
    <!--se o container de overlay for clicado ele deixa o isCartOpen como false, fechando overlay e carrinho-->
    <div v-if="isCartOpen" class="cart-overlay" @click="closeCart"> 
    <!--componente de carrinho sendo renderizado-->
     <div @click.stop> <!-- modificador de evento que impede o clique de propagar para o carrinho--> 
       <CartDrawer 
       @close="closeCart" 
       /> <!-- aqui estou passando para cartdrawer o evento close de fechar carrinho-->                                                 
     </div>
    </div>
  </Transition>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'; //ref = ao usestate em react
import ProductCard from '@/components/ProductCard.vue';
import CartDrawer from '@/components/CartDrawer.vue';
import { getProducts, type Product } from '@/services/api'; // importa a função getProducts e a tipagem Product do api.ts
import { useCart } from '@/composables/useCart';


const searchTerm = ref(''); //variavel reativa muda o estado para o que o usuário esta digitando
const allProducts = ref<Product[]>([]); //array de produtos. produtos sendo buscados serão armazenados aqui
const categories = ref([
    { id: 101, name: "Vestuário" },
    { id: 102, name: "Alimentação" },
    { id: 103, name: "Ferramentas" }
]);

const { cartItems } = useCart();
const isCartOpen = ref(false); // estado para controlar a visibilidade do carrinho(começa em false)
const products = ref<Product[]>([]); //array de produtos no api, tipado como Product
const loading = ref(true); //carregando produtos, enquanto eles não foram exibidos
const error = ref<string | null>(null); //erro ao carregar produtos

const totalQuantity = computed(() => {
    // Se cartItems for um array de produtos/itens, você precisa somar as quantidades
    // Assumindo que cada item no cartItems tem uma propriedade 'quantity'
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const toggleCart = () => {
  // alterna o estado atual do carrinho entre aberto e fechado
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false; //fecha o carrinho caso clique no overlay, no caso fora do carrinho
};

const fetchProducts = async () => { // função assíncrona (espera api retornar) para buscar produtos da API
  try{
    loading.value = true; //exibe carregando enquanto busca produtos
    error.value = null; //limpa qualquer erro anterior
    const fetchedProducts = await getProducts(); //aguarda a chagada dos itens na chamada da 
                                                //função getProducts(await) e os armazena em fetchedProducts
    allProducts.value = fetchedProducts; //allProducts recebe fetchedProducts   
  }catch (err){
    error.value = 'Erro ao carregar produtos!!!';
    //console.log("ERRO: ", err);
  }finally{
    loading.value = false; //desativa carregando após tentativa de busca
  }
};

const filteredProducts = computed(() => {//função é chamada toda vez que searchTerm atualiza/muda seu estado
    
    if (!searchTerm.value) {// se busca/input estiver vazio exibe todos os produtos no catalogo
        return allProducts.value;//retornando lista de produtos completa
    }
    //variavel que captura valor de pesquisa, para não fazer diferença de minuscula e espaços desneceassrios no input
    const lowerCaseSearch = searchTerm.value.toLowerCase().trim();

    return allProducts.value.filter(product => {
        //busca o produto com aquele nome especifico(NOME), se for retorna true
        const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);

        //tenta encontrar o objeto de categoria completo (ex: { id: 101, name: "Vestuário" }) 
        //dentro do array 'categories' usando o 'category_id' do produto atual.
       //caso encontrado, 'category' armazena o objeto; se não, armazena 'undefined'
        const category = categories.value.find(c => c.id === product.category_id);

        //verifica se o produto encontrado por categoria atraves por id tem o name digitado no input
        const categoryMatch = category ? category.name.toLowerCase().includes(lowerCaseSearch) : false;

        //retorna o produto que a busca "casar"/tiver dado true, com nome ou categoria escrito no input
        //se for true ele incluido na nova lista filteredProducts
        return nameMatch || categoryMatch;
    });
});

onMounted(() => {
  fetchProducts(); //só executa a função fetchproduts quando o a página(homeview) for carregada, montada
});

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
  width: 100%;  
  background-color: white;
  border-radius: 20px;
}

.nav-search{  
  display:flex;
  justify-content:space-between;
  gap:10px;
  align-items:center
}

.search-container{
  position:relative;
  display: inline-flex;
}

.search-container input{
  height:35px;
  width: 330px;
  border-radius:18px;
  padding: 0px 15px;
  outline: none;
  border:1.3px solid #221E6B;
}

.search-container input::placeholder{
  font-style: italic;
}

.filter-btn{
  display:flex;
  height:100%;
  position:absolute;
  right:2px;
  align-items:center;  
  background-color: transparent;
  border:none;
  outline:none;
  cursor:pointer;
  color: #221E6B;
  /*transform: scaleX(-1);*/
}

.nav-search img{  
  width:115px;
  height:110px;
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
  display:flex;  
  justify-content: center;
  align-items:center;
  position: relative;  
}

/* icone do botão de carrinho */
.cart-btn span{
    color: #221E6B;
    font-size: 27.5px;
}

.cart-badge {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: #36CA6A;
    color: white;
    font-size: 10px;
    font-weight: bold;
    border-radius: 50%;
    min-width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    padding: 1px;
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

.container-catalog h2{
  font-weight: 700;
  color: #221E6B;
  font-size: 38px;
}

.products-catalog  {
  width: 100%;   
  height: 400px;
  align-items: center;
  display: flex;
  gap: 23px;
  padding: 10px 20px;
  /*border: 1px solid black;*/ 
  justify-content: center;
}

/*overlay para quando o carrinho estiver aberto*/
.cart-overlay{
  position: fixed;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.cart-slide-enter-active,
.cart-slide-leave-active {
    transition: transform 0.4s ease;
}

.cart-slide-enter-active .cart-drawer,
.cart-slide-leave-active .cart-drawer {    
    transition: transform 0.4s ease; 
}

.cart-slide-enter-from .cart-drawer,
.cart-slide-leave-to .cart-drawer {    
    transform: translateX(100%);
}

</style> 