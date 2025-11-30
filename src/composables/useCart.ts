//arquivo de composable com diversas funções para manipular carrinho de compras

import { ref } from 'vue';
import type { Product } from '../services/api';

// interface para item do carrinho (produto + quantidade)
export interface CartItem extends Product {
  quantity: number;
}

// aqui armazenamos os itens do carrinho no array reativo
const cartItems = ref<CartItem[]>([]);

export function useCart() {
  const addToCart = (product: Product) => {
    // verifica se o produto que esta a ser adicionado já existe no carrinho
    const existingItem = cartItems.value.find(item => item.id === product.id);

    if (existingItem) {//se o produto ja existe no carrinho, ele apenas adiciona em +1 sua quantidade      
      existingItem.quantity++; //somando sempre em +1 sua quantidade
    } else {
      //caso não exista ele cai nesse else, que ele adiciona o produto no carrinho com quantidade igual a 1 
      cartItems.value.push({
        ...product,
        quantity: 1 //adicionado com a quantidade igual a 1
      });
    }
  };

  // remove o produto do carrinho
  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  //subtrair produto do carrinho
  const decreaseItem = (product: Product) => {
    //verifica se existe o item no carrinho
    const existItem = cartItems.value.find(item => item.id === product.id);

    if (existItem) {
      if (existItem.quantity > 1) { //se tiver no minimo um o produto se mantem no carrinho
        existItem.quantity--;    //ele subtrair o produto em 1 até que chegue a 1, menos que 1(0) cai no else
      } else { //se tiver menos que um, no caso 0 cai nesse else que o remove completamente do carrinho
        removeFromCart(existItem.id);
      }
    }
  }

  // calcula valor total de produtos no carrinho
  const cartTotal = () => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity); // multiplca preço pela quantidade
    }, 0);
  };

  //retornando as funções e o estado do carrinho
  return {
    cartItems,
    addToCart,
    decreaseItem,
    removeFromCart,
    cartTotal
  };
}