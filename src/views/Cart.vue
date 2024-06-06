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
          <button @click="removeFromCart(item)">Remove</button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {{ cartItemCount }}</p>
        <p>Total Price: {{ cartTotal | currency }}</p>
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
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 100px;
  height: auto;
  margin-right: 20px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h2 {
  font-size: 1.5rem;
  margin: 0 0 10px 0;
}

.cart-item-details p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-controls button {
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 5px 10px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.quantity-controls span {
  margin: 0 10px;
  font-size: 1.2rem;
}

.remove-item {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: #e91e63;
  cursor: pointer;
}

.cart-summary {
  text-align: right;
  margin-top: 20px;
}

.cart-summary h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.checkout-button {
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  justify-content: center;
  height: 100vh;
}
</style>
