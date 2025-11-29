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
  const addToCart = (product: Product) => {// adiciona produto no carrinho através do botão "Adicionar ao carrinho"
    //abaixo verifica se o produto adicionado já esta no carrinho
    const existingItem = cartItems.value.find(item => item.id === product.id);

    //verifica se ja existe produto da mesma categoria no carrinho, verificando pelo o id da categoria
    const categoryExists = cartItems.value.find(item => item.category_id === product.category_id);

    //caso o ID JÁ exista e NÃO seja o mesmo produto, ele exibe um alert na tela e não coloca no carrinho
    //não permitindo colocar mais de um produto da mesma categoria no carrinho
    if (categoryExists && !existingItem) {
      alert("Você não pode adicionar mais de um produto da mesma categoria no carrinho");
    } else { //caso não, ele entra nesse else com mais condicionais
      if (existingItem) {         //caso o produto já esteja no carrinho ele 
        existingItem.quantity++; //aumenta/soma +1 na quantidade      
      } else {
        // se não existe, cai nesse else que adiciona o produto com quantidade 1
        cartItems.value.push({
          ...product, //pega todas as propriedades do produto
          quantity: 1 //adciona quantidade em 1
        });
      }
    }
  };

  // remove o produto do carrinho
  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  const decreaseItem = (product: Product) => {
    const existItem = cartItems.value.find(item => item.id === product.id);

    if (existItem) {
      if (existItem.quantity > 1) {
        existItem.quantity--;
      } else {
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