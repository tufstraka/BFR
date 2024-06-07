<template>
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0" class="cart-content">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" class="cart-item-image" />
        <div class="cart-item-details">
          <h2>{{ item.title }}</h2>
          <p class="price">{{ item.price | currency }}</p>
          <div class="quantity-controls">
            <button @click="updateCartQuantity({ product: item, quantity: item.quantity - 1 })">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateCartQuantity({ product: item, quantity: item.quantity + 1 })">+</button>
          </div>
          <button @click="removeFromCart(item)" class="remove-item">Remove</button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {{ cartItemCount }}</p>
        <p>Total Price: {{ cartTotal | currency }}</p>
        <button class="checkout-button">Checkout</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'cartItemCount'])
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartQuantity'])
  }
};
</script>

<style scoped>
body {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
}

.cart {
  padding: 40px;
  max-width: 650px;
  margin: 20px auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
  background-color: beige;

}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px dashed #ddd;
}

.cart-item-image {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h2 {
  font-size: 1.2rem;
  margin: 0 0 5px 0;
}

.cart-item-details .price {
  font-size: 1rem;
  color: #333;
  margin: 5px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 3px;
}

.quantity-controls span {
  margin: 0 10px;
  font-size: 1rem;
}

.remove-item {
  background-color: transparent;
  border: none;
  font-size: 1rem;
  color: #e91e63;
  cursor: pointer;
  margin-top: 10px;
  padding: 5px;
}

.cart-summary {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 20px;
}

.cart-summary h2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.cart-summary p {
  font-size: 1rem;
  margin: 5px 0;
}

.checkout-button {
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  max-width: 300px;
  border-radius: 5px;
  margin-top: 20px;
  display: block;
  width: 100%;
}

.checkout-button:hover {
  background-color: #d81b60;
}

.empty-cart {
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

