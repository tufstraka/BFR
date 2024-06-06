<template>
  <div class="shop">
    <div v-if="loading" class="spinner-container">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <router-link class='link' :to="{name:'Cart'}">
        <div class="cart-icon-wrapper">
          <img src="@/assets/Icons/cart.png" alt="Cart Icon" class="carticon" />
          <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </div>
      </router-link>
      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.title" />
          <div class="product-info">
            <h2>{{ product.title }}</h2>
            <p class="description">{{ product.description }}</p>
            <div class="rating">
              <span v-for="n in 5" :key="n" class="star">
                <i :class="n <= product.rating.rate ? 'fas fa-star' : 'far fa-star'"></i>
              </span>
              <span class="rating-count">({{ product.rating.count }})</span>
            </div>
            <p class="price">{{ product.price | currency }} USD</p>
            <button @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      products: [],
      loading: true
    };
  },
  computed: {
    ...mapGetters(['cartItemCount']),
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['addToCart']),

    async fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        this.products = data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.shop {
  padding: 20px;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cart-icon-wrapper {
  position: fixed;
  top: 50%;
  right: 20px; 
  transform: translateY(-50%);
  z-index: 5999999;
  
  &:hover 
  {
    transform: scale(1.12);
    }
}

.carticon {
  width: 40px;
  height: auto;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background: #e91e63;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-card img {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.product-info h2 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.product-info .description {
  color: #555;
  font-size: 0.9rem;
  margin: 10px 0;
}

.product-info .rating {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.product-info .rating .star {
  color: #ffc107;
  margin-right: 2px;
}

.product-info .rating .rating-count {
  font-size: 0.8rem;
  color: #888;
  margin-left: 5px;
}

.product-info .price {
  color: #e91e63;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 10px 0;
}

.product-info button {
  background-color: #e91e63;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.product-info button:hover {
  background-color: #d81b60;
}
</style>


