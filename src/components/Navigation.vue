<template>
    <header class="site-header">
      <nav class="container navbar">
        <div class="branding">
          <router-link class="brand" :to="{name:'Home'}">
            <img src="@/assets/BiasedFilmReviewLogo.png" alt="BFR Logo" class="logo" />
            <span class="site-name">Biased Film Review</span>
          </router-link>                
        </div>
        
        <div class="nav-links">
          <ul v-show="!mobile" class="desktop-menu">
            <li><router-link :to="{name:'Blogs'}">Movies</router-link></li>
            <li><router-link :to="{name:'Blogs'}">TV Shows</router-link></li>
            <li><router-link to="#">Books</router-link></li>
            <li><router-link to="#">Games</router-link></li>
            <li><router-link :to="{name:'News'}">News</router-link></li>
            <li v-if="admin"><router-link :to="{name:'CreatePost'}" class="create-btn">Create Review</router-link></li>
            <li v-if="!user"><router-link :to="{name:'Login'}" class="login-btn">Sign in</router-link></li>
          </ul>
          
          <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
            <span>{{ this.$store.state.profileInitials }}</span>
            <transition name="fade">
              <div v-show="profileMenu" class="profile-menu">
                <div class="info">
                  <p class="initials">{{ this.$store.state.profileInitials }}</p>
                  <div class="right">
                    <p class="name">{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                    <p class="username">@{{ this.$store.state.profileUsername }}</p>
                    <p class="email">{{ this.$store.state.profileEmail }}</p>
                  </div>
                </div>
                <div class="options">
                  <router-link class="option" :to="{name:'Profile'}">
                    <userIcon class="icon"/>
                    <span>Profile</span>
                  </router-link>
                  <router-link v-if="admin" class="option" :to="{name:'Admin'}">
                    <adminIcon class="icon"/>
                    <span>Admin</span>
                  </router-link>
                  <button @click="signOut" class="option">
                    <signOutIcon class="icon"/>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
        
        <button @click="toggleMobileNav" class="menu-toggle" :class="{'is-active': mobileNav}" v-show="mobile" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
  
      <transition name="mobile-nav">
        <div class="mobile-menu" v-show="mobileNav">
          <nav>
            <router-link :to="{name:'Blogs'}" @click="mobileNav = false">Movies</router-link>
            <router-link :to="{name:'Blogs'}" @click="mobileNav = false">TV Shows</router-link>
            <router-link :to="{name:'News'}" @click="mobileNav = false">News</router-link>
            <router-link to="#" @click="mobileNav = false">Books</router-link>
            <router-link to="#" @click="mobileNav = false">Games</router-link>
            <router-link v-if="admin" :to="{name:'CreatePost'}" @click="mobileNav = false">Create Review</router-link>
            
            <div class="mobile-user-section">
              <template v-if="user">
                <div class="mobile-user-info">
                  <div class="mobile-avatar">{{ this.$store.state.profileInitials }}</div>
                  <div class="mobile-user-name">
                    <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                    <p class="mobile-username">@{{ this.$store.state.profileUsername }}</p>
                  </div>
                </div>
                <router-link :to="{name:'Profile'}" @click="mobileNav = false" class="mobile-nav-btn">Profile</router-link>
                <router-link v-if="admin" :to="{name:'Admin'}" @click="mobileNav = false" class="mobile-nav-btn">Admin</router-link>
                <button @click="signOut" class="mobile-nav-btn mobile-signout">Sign Out</button>
              </template>
              
              <router-link v-else :to="{name:'Login'}" @click="mobileNav = false" class="mobile-login-btn">
                Sign in
              </router-link>
            </div>
          </nav>
        </div>
      </transition>     
    </header>
  </template>
  
  <script>
  import userIcon from '../assets/Icons/user-alt-light.svg';
  import adminIcon from '../assets/Icons/user-crown-light.svg';
  import signOutIcon from '../assets/Icons/sign-out-alt-regular.svg';
  import firebase from 'firebase/app';
  import 'firebase/auth';
  
  export default {
    name:'Navigation',
    components:{
      userIcon,
      adminIcon,
      signOutIcon,
    },
    data() {
      return{
        profileMenu: null,
        mobile: null,
        mobileNav: null,
        windowWidth: null, 
      };
    },
    created() {
      window.addEventListener('resize', this.checkScreen);
      this.checkScreen();
      this.$router.beforeEach((to, from, next) => {
        if (this.mobileNav) {
          this.mobileNav = false;
        }
        next();
      });
      
      // Close profile menu when clicking outside
      document.addEventListener('click', this.closeProfileMenu);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.closeProfileMenu);
      window.removeEventListener('resize', this.checkScreen);
    },
    methods: {
      checkScreen() {
        this.windowWidth = window.innerWidth;
        this.mobile = this.windowWidth <= 768;
        if (!this.mobile) {
          this.mobileNav = false;
        }
      },
      toggleMobileNav() {
        this.mobileNav = !this.mobileNav;
        document.body.classList.toggle('menu-open', this.mobileNav);
      },
      toggleProfileMenu(e) {
        e.stopPropagation();
        this.profileMenu = !this.profileMenu;
      },
      closeProfileMenu(e) {
        if (this.profileMenu && this.$refs.profile && !this.$refs.profile.contains(e.target)) {
          this.profileMenu = false;
        }
      },
      signOut() {
        firebase.auth().signOut();
        window.location.reload();
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      admin() {
        return this.$store.state.profileAdmin;
      },
    }
  };
  </script>
  
  <style lang='scss' scoped>
  .site-header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }
  
  .branding {
    display: flex;
    align-items: center;
  }
  
  .brand {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  
  .logo {
    height: 40px;
    width: auto;
  }
  
  .site-name {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: var(--text-dark);
    margin-left: 12px;
    
    @media (max-width: 480px) {
      display: none;
    }
  }
  
  .nav-links {
    display: flex;
    align-items: center;
  }
  
  .desktop-menu {
    display: flex;
    align-items: center;
    list-style: none;
    
    li {
      margin-left: 24px;
      
      &:first-child {
        margin-left: 0;
      }
      
      a {
        font-size: 15px;
        font-weight: 500;
        color: var(--text-dark);
        text-decoration: none;
        position: relative;
        padding: 6px 0;
        transition: color var(--transition-fast);
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--primary-color);
          transition: width var(--transition-normal);
        }
        
        &:hover, &.router-link-active {
          color: var(--primary-color);
          
          &::after {
            width: 100%;
          }
        }
        
        &.create-btn {
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
          padding: 8px 16px;
          border-radius: 6px;
          transition: all var(--transition-fast);
          
          &:hover {
            background-color: var(--primary-color);
            color: white;
          }
          
          &::after {
            display: none;
          }
        }
        
        &.login-btn {
          background-color: var(--primary-color);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          transition: background-color var(--transition-fast);
          
          &:hover {
            background-color: darken(#2a41e8, 10%);
          }
          
          &::after {
            display: none;
          }
        }
      }
    }
  }
  
  .profile {
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
    
    span {
      color: white;
      font-weight: 600;
      font-size: 16px;
    }
    
    &:hover {
      box-shadow: 0 0 0 4px rgba(42, 65, 232, 0.3);
    }
    
    .profile-menu {
      position: absolute;
      top: calc(100% + 12px);
      right: 0;
      width: 280px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.15);
      overflow: hidden;
      
      .info {
        padding: 16px;
        display: flex;
        align-items: center;
        background-color: var(--primary-light);
        
        .initials {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }
        
        .right {
          margin-left: 12px;
          overflow: hidden;
          
          .name {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 2px;
            font-size: 15px;
          }
          
          .username, .email {
            color: var(--text-light);
            font-size: 13px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      
      .options {
        padding: 8px 0;
        
        .option {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          text-decoration: none;
          color: var(--text-dark);
          transition: background-color var(--transition-fast);
          cursor: pointer;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-family: inherit;
          font-size: 15px;
          
          &:hover {
            background-color: #f5f5f5;
          }
          
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 12px;
            
            path {
              fill: var(--text-light);
            }
          }
        }
      }
    }
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 24px;
    position: relative;
    z-index: 200;
    padding: 0;
    
    @media (max-width: 768px) {
      display: block;
    }
    
    span {
      display: block;
      width: 100%;
      height: 2px;
      background-color: var(--text-dark);
      position: absolute;
      left: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
      
      &:nth-child(1) {
        top: 0;
      }
      
      &:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
      }
      
      &:nth-child(3) {
        bottom: 0;
      }
    }
    
    &.is-active {
      span {
        &:nth-child(1) {
          transform: translateY(11px) rotate(45deg);
        }
        
        &:nth-child(2) {
          opacity: 0;
        }
        
        &:nth-child(3) {
          transform: translateY(-11px) rotate(-45deg);
        }
      }
    }
  }
  
  .mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    z-index: 99;
    padding: 80px 24px 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    
    nav {
      display: flex;
      flex-direction: column;
      
      a {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-dark);
        text-decoration: none;
        padding: 16px 0;
        border-bottom: 1px solid #eee;
        
        &:hover {
          color: var(--primary-color);
        }
      }
    }
    
    .mobile-user-section {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #eee;
      
      .mobile-user-info {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        
        .mobile-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
        }
        
        .mobile-user-name {
          margin-left: 16px;
          
          p:first-child {
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 4px;
          }
          
          .mobile-username {
            color: var(--text-light);
            font-size: 14px;
          }
        }
      }
      
      .mobile-nav-btn {
        display: block;
        width: 100%;
        padding: 14px 0;
        margin-bottom: 12px;
        text-align: center;
        background-color: var(--primary-light);
        color: var(--primary-color);
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        border: none;
        font-family: inherit;
        font-size: 16px;
        cursor: pointer;
        transition: var(--transition-fast);
        
        &:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        &.mobile-signout {
          background-color: #ffeaea;
          color: var(--secondary-color);
          
          &:hover {
            background-color: var(--secondary-color);
            color: white;
          }
        }
      }
      
      .mobile-login-btn {
        display: block;
        width: 100%;
        padding: 16px 0;
        text-align: center;
        background-color: var(--primary-color);
        color: white;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
          background-color: darken(#2a41e8, 10%);
        }
      }
    }
  }
  
  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    body.menu-open {
      overflow: hidden;
    }
    
    .profile {
      display: none;
    }
  }
  </style>