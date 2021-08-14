import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards:[
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-1' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-2' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-3' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-4' , blogDate:'May 23, 2021'},
    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload){
      state.editPost = payload;
      
    }
  },
  actions: {
  },
  modules: {
  }
})
