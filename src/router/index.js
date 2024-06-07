import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditPost from "../views/EditPost.vue"
import News from "../views/News.vue";
import Shop from "../views/Shop.vue";
import Cart from "../views/Cart.vue";
import ResetPassword from "../views/ResetPassword.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const auth = firebase.auth();

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: "/film-reviews",
    name: "Blogs",
    component: Blog,
    meta: {
      title: 'Reviews'
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login'
    }
  },
    {
    path: "/auth/reset-password",
    name: "ResetPassword",
    component: ResetPassword,
    meta: {
      title: 'Reset Password'
    }
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      title: 'News'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: "/forgot-password ",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'Preview Blog  Post'
    }
  },
  {
    path: "/view-post/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
     meta: {
      title: 'Chronicles',
    }
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    meta: {
      title: 'Shop',
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      title: 'Cart',
    }
  },
  
  {
    path: "/edit-post/:blogid",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: 'Edit Blog Post',
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BFR`;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/Login");
  } else {
    next();
  }

})

export default router;
