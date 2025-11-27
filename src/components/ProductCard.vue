<template>
  <div class="card-container">
    <div class="product-image">      
      <img src="" alt="" />
    </div>
    <div class="product-details">
      <h3>Product Name</h3>
      <p>R$ 99,99</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt. 
      </p>
      <div>
      <button class="add-cart">Add to Cart</button>
    </div>
    </div>
    
  </div>
</template>

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