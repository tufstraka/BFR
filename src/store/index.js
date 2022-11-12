import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards:[
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-1' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-2' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-3' , blogDate:'May 23, 2021'},
      {blogTitle:'hdjkhsjfhgkjghf', blogCoverPhoto:'stock-4' , blogDate:'May 23, 2021'},
    ],
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
    profileInitials: null

  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    setProfileAdmin(state, payload){
      state.profileAdmin = payload;
    },
    
    updateUser(state, payload){
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
      state.profileFirstName = payload
    },

    changeLastName(state, payload) {
      state.profileLastName = payload
    },

    changeUsername(state, payload) {
      state.profileUsername = payload
    },
    
  },
  actions: {
    async getCurrentUser({ commit }, user){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfileAdmin', admin); },
    
    async updateUserSettings({ commit, state}) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },  
  modules: {
    
  }
})
