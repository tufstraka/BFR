import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here ...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 1);
    },

    blogPostsCards(state) {
      return state.blogPosts.slice(0, 4);
    },

    cartTotal(state) {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    cartItemCount(state) {
      return state.cartItems.reduce((count, item) => count + item.quantity, 0);
    },

    cartItems(state) {
      return state.cartItems;
    }
  },
  mutations: {
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },

    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },

    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },

    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    
    updateUser(state, payload) {
      state.user = payload; 
    },
    
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().userName;
    },

    setProfileInitials(state) {
      state.profileInitials = 
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");                            
    },
    
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },

    // Cart mutations
    addToCart(state, product) {
      const existingProduct = state.cartItems.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart(state, product) {
      state.cartItems = state.cartItems.filter(item => item.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    updateCartQuantity(state, { product, quantity }) {
      const cartItem = state.cartItems.find(item => item.id === product.id);
      if (cartItem) {
        if (quantity < 1) {
          state.cartItems = state.cartItems.filter(item => item.id !== product.id);
        } else {
          cartItem.quantity = quantity;
        }
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },

  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin);
    },

    async getPost({ state }) {
      const dataBase = await db.collection('blogPosts').orderBy('date', 'desc');
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some(post => post.blogID == doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },

    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },

    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },

    // Cart actions
    addToCart({ commit }, product) {
      commit('addToCart', product);
    },

    removeFromCart({ commit }, product) {
      commit('removeFromCart', product);
    },

    updateCartQuantity({ commit }, payload) {
      commit('updateCartQuantity', payload);
    }
  },
  modules: {
    // if needed
  }
})
