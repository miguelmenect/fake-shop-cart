# 🛒 Fake Shop Cart

### Uma loja online moderna e responsiva com sistema simples de carrinho de compras, desenvolvida com Vue 3 e TypeScript.

---

## ✨ Recursos Principais

Fake Shop Cart é uma aplicação de e-commerce que simula uma experiência real de compras online. O projeto foi desenvolvido como resposta a um desafio técnico,
demonstrando habilidades em desenvolvimento front-end moderno, gerenciamento de estado e criação de interfaces responsivas.

* **Catálogo de Produtos:** Exibição de diversos produtos em um catálogo online.
* **Carrinho Deslizante (Cart-Drawer): O carrinho é um painel que desliza, garantindo uma experiência visualmente coesa
    e de alta usabilidade, pois permite ao usuário interagir com o carrinho sem sair da página atual.
* **Gestão de Quantidade:**
    * Incrementar (+) e Subtrair (-) a quantidade de cada item no carrinho.
    * Remoção total do produto através do ícone de lixeira vermelho.
* **Cálculo de Total:** Soma automática e em tempo real do valor total dos produtos no carrinho, enquanto adiciona ou remove produtos.
* **Contador Inteligente:** O botão do ícone do carrinho no cabeçalho exibe a contagem exata de itens.
    * Para evitar poluição visual, o contador exibe o valor fixo **`+10`** quando há dez ou mais produtos no carrinho.
    *Limite de categoria, apenas um produto por categoria pode ser adicionado ao carrinho.
    *Sistema de notificações toast para feedback ao usuário de acordo com a ação executada no projeto.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído sobre o ecossistema Vue, utilizando ferramentas modernas para gerenciamento de estado e roteamento, além de Vite como *build tool*.

| Tecnologia | Descrição |
| :--- | :--- |
| **Vue.js** | Framework progressivo para a construção da interface do usuário. |
| **Pinia** | Erssencial para o Carrinho de Compras (cartItems, totalQuantity). 
Permite compartilhar o estado (ex: a lista de produtos no carrinho e a quantidade total) de forma reativa
entre os componentes, como a HomeView, CartDrawer e ProductCard. |
| **Vue Router** | Embora seja uma Single Page Application (SPA), o RouterView é crucial. Ele é a âncora
que renderiza o componente da página atual (HomeView), permitindo que a aplicação seja modular e escalável,
mesmo que o foco inicial seja apenas a Home no caso deste projeto. |
| **Axios** | Cliente HTTP baseado em Promises, utilizado para fazer requisições a APIs (simulação do catálogo de produtos). |

---

## ☁️ API REST (Backend Mockado)

O projeto utiliza o **Axios** para consumir uma **API REST mockada** (simulada) através do serviço gratuito [My JSON Server](https://my-json-server.typicode.com/), uma API fake.

| Recurso | Endpoint |
| :--- | :--- |
| **Produtos** | `https://my-json-server.typicode.com/miguelmenect/fake-shop-cart/products` |
| **Categorias** | `https://my-json-server.typicode.com/miguelmenect/fake-shop-cart/categories` |

---

## 🚀 Primeiros Passos (Project Setup)

Siga as instruções abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

Você precisa ter o **Node.js** e o **npm** (ou Yarn/pnpm) instalados em sua máquina.

### Instalação de Dependências
npm install

### Rode o projeto com
npm run dev

Autor:
Miguel Menezes.
GitHub: [@miguelmenect](https://github.com/miguelmenect)
