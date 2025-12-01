<!---estrutura da pagina home--->
<template>
  <div class="home-page">
    <div class="container-nav">
    <nav class="navbar">       
     <div class="nav-search"> 
      <img src="/images/my-shop-logo.png" alt="MyShop"/>
      <div class="search-container desktop-search">
      <input 
        type="text" 
        placeholder="Filtrar produtos..."
        maxlength="30"
        v-model="searchTerm"/> <!-- conecta esse input ao searchTerm, ATUALIZA o estado -->
                               <!--de searchTerm a cada tecla digitada-->                               
      <button class="filter-btn" @click="filteredProducts">
        <span class="material-symbols-rounded">
          search
        </span>
      </button>
      </div>
      </div>
      <button class="cart-btn desktop-cart" @click="toggleCart">
        <span class="material-symbols-rounded"><!-- botão do carrinho de compras -->
          shopping_cart
        </span>
        <div v-if="totalQuantity > 0" class="cart-badge"> <!--exibe o badge somente se-->
          {{ totalQuantity }}                             <!--produtos adiconados > 1-->
        </div>
      </button> 
      <!--menu burguer-->
      <button class="menu-burguer" @click="toggleMenu">
        <span class="material-symbols-rounded">
          menu
        </span>
      </button>
    </nav>
    </div>
    <!--container de lista de menu-->
    <Transition name="menu-slide">
      <div v-if="isMenuOpen" class="mobile-menu-overlay" @click="closeMenu">
        <div class="mobile-menu" @click.stop> <!--click.stop, para ele não fechar o menu quando clicar no input-->
          <div class="menu-item search-item">
            <div class="search-container mobile-search">
              <input 
                type="text" 
                placeholder="Filtrar produtos..."
                maxlength="30"
                v-model="searchTerm"
                @keyup.enter="handleMobileSearch"/>
              <button class="filter-btn" @click="filteredProducts">
                <span class="material-symbols-rounded">
                  search
                </span>
              </button>
            </div>
          </div>
          <button class="menu-item cart-item" @click="toggleCart">
            <span class="material-symbols-rounded"><!-- botão do carrinho de compras -->
              shopping_cart
            </span>
            <span class="cart-text">Carrinho de compras</span>
            <div v-if="totalQuantity > 0" class="cart-badge">
              {{ totalQuantity }}
            </div>
          </button>
        </div>
      </div>
    </Transition>

    <div class="container-catalog">
      <h2>NOSSOS PRODUTOS</h2>
      <div v-if="loading">
        <p>Carregando produtos...</p>
      </div>

      <div class="products-catalog" v-if="!loading && filteredProducts.length > 0">
        <!--componente de card dos produtos sendo renderizado-->
        <!--passando aqui valor de product e categories quais são capturados nessa-->
        <!-- página e passando como props para Productcard-->  
        <ProductCard          
         v-for="product in filteredProducts"
        :key="product.id" 
        :product="product"
        :category="categories"        
        /><!--:v-for um laço de repetição que percorre o array products -->
        <!--:key identifica unicamente cada card pelo id do produto-->
        <!--:product= é nome da prop que está sendo passada para o componente ProductCard-->   
      </div>
      <div class="no-products-message" v-else>
        <p>Nenhum produto encontrado :(</p>
        <p class="suggestion">Tente refinar sua busca por nome ou categoria.</p>
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
import { getProducts, type Product, getCategories, type Category} from '@/services/api'; // importa a função getProducts e a tipagem Product do api.ts
import { useCart } from '@/composables/useCart';

const { cartItems } = useCart();
const searchTerm = ref(''); //variavel reativa muda o estado para o que o usuário esta digitando
const allProducts = ref<Product[]>([]); //array de produtos. produtos sendo buscados serão armazenados aqui

const categories = ref<Category[]>([]); //array com valor das categorias, vindo de getCategories

const isCartOpen = ref(false); // estado para controlar a visibilidade do carrinho(começa em false)
const products = ref<Product[]>([]); //array de produtos no api, tipado como Product
const loading = ref(true); //carregando produtos, enquanto eles não foram exibidos
const error = ref<string | null>(null); //erro ao carregar produtos

const isMenuOpen = ref(false); //variavel de estado do menu quando for telas menores

const totalQuantity = computed(() => {
    // Se cartItems for um array de produtos/itens, você precisa somar as quantidades
    // Assumindo que cada item no cartItems tem uma propriedade 'quantity'
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const closeMenu = () => {
  isMenuOpen.value = false; //torna isMneuOpen como false, o fechando
};

const closeCart = () => {
  isCartOpen.value = false; //fecha o carrinho caso clique no overlay, no caso fora do carrinho
};

const toggleMenu = () =>{
  isMenuOpen.value = !isMenuOpen.value; //menu fica com seu valor diferente do atual sempre que chamado
}

const toggleCart = () => {
  // alterna o estado atual do carrinho entre aberto e fechado
  isCartOpen.value = !isCartOpen.value;
  if(isMenuOpen){
    closeMenu();
  }
};

const handleMobileSearch = () =>{
  filteredProducts.value;
  closeMenu();
}

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

const fetchCategories = async () => {
  try {
    const fetchedCategories = await getCategories(); //aguarda a captura de dados ser feita na chamada getCategories
    categories.value = fetchedCategories; //categories recebe valor de fetchedCategories
  } catch (err) { //caso de erro
    //console.error('Erro ao carregar categorias:', err);
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
  fetchProducts(); //só executa a função fetchproduts e fetchCategories quando 
  fetchCategories(); // o a página(homeview) for carregada, montada
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
  gap: 20px;
}
/* container da navbar */
.container-nav{
  width: 100%;
  max-width: 1100px;
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
  width:100%;
  max-width:457px;  
  gap: 10px;
  align-items:center;
  
}

.search-container{
  position:relative;
  display: inline-flex;
  width: 100%;
}

.search-container input{
  height:35px;
  width: 100%;
  max-width:330px;
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

.menu-burguer{
  display:none;
  height:40px;
  width:40px;
  border:none;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  justify-content:center;
  align-items: center;
  flex-shrink: 0;
  color:#221E6B;
}

.menu-burguer span{
  font-size: 28px;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;  
  z-index: 998;
}

.mobile-menu {  
  display: flex;
  flex-direction: column;
  position: absolute;  
  top: 90px;        
  right: 15px;      
  border-radius: 15px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  background-color: white;
  gap: 10px;
  z-index: 9999;
}

.menu-item {
  display:flex;
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  background-color: #f8f9fa;
  transition: background-color 0.2s;
}

.menu-item.search-item {
  padding: 10px;
}

.menu-item.cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  font-weight: 500;
  color: #221E6B;
}

.menu-item.cart-item:hover {
  background-color: #e9ecef;
}

.menu-item.cart-item span.material-symbols-rounded {
  font-size: 24px;
  color: #221E6B;
}

.cart-text {
  flex: 1;
  text-align: left;
}

.menu-item.cart-item .cart-badge {
  position: static;
  margin-left: auto;
}

/*caso da tela for menor que 572px, o input de filtro na navbar some */
@media (max-width: 571px) {
.desktop-search{
  display: none !important;
}
}

.mobile-search {
 width: 100%;
}

/* Transição do menu mobile */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: opacity 0.3s ease;
}

.menu-slide-enter-active .mobile-menu,
.menu-slide-leave-active .mobile-menu {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
}

.menu-slide-enter-from .mobile-menu,
.menu-slide-leave-to .mobile-menu {
  transform: translateY(-20px);
  opacity: 0;
}

.container-catalog{
  width: 100%;
  height: auto;
  display: flex;
  padding: 0px 10px;
  flex-direction: column;
  align-items: center;  
  /*border: 1px solid black;*/
}

.container-catalog h2{
  font-weight: 700;
  color: #221E6B;
  font-size: clamp(24px, 5vw, 38px); /*muda tamanho da fonte quando diminuir tamanho de tela */
}

.products-catalog  {
  width: 100%;
  max-width:1100px;   
  min-height: 400px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 23px;
  padding: 10px;
  justify-items: center;
}

/*overlay para quando o carrinho estiver aberto*/
.cart-overlay{
  position: fixed;
  width: 100vw;
  height: 100vh;
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

.no-products-message {
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    text-align: center;
    color: #221E6B;
}

.no-products-message p {
    font-size: clamp(20px, 4vw, 28px);
    font-weight: 700;
    margin: 0;
}

.no-products-message .suggestion {
   font-size: clamp(14px, 2vw, 16px);
    font-weight: 400;
    color: #5a5a5a;
    font-style:italic;
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  display: flex;
  justify-content: center;
  padding-top: 100px;
}

.desktop-search,
.desktop-cart {
  display: flex;
}

@media (max-width: 571px) {
  .desktop-search,
  .desktop-cart {
    display: none !important;
  }

  .menu-burguer {
    display: flex !important;
  }

  .nav-search {
    flex: 0;
  }

  .logo {
    width: 80px;
    height: 75px;
  }
}
</style> 