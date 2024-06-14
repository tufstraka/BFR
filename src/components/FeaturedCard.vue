<template>
    <div class="featured-card">
      <img :src="post.image" alt="Post Image" class="post-image"/>
      <h2>{{ post.title }}</h2>
      <p>{{ post.excerpt }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "FeaturedCard",
    props: {
      post: Object
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .featured-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    padding: 20px;
  
    .post-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  
    h2 {
      font-size: 24px;
      margin: 10px 0;
      color: #34495e;
    }
  
    p {
      font-size: 16px;
      color: #7f8c8d;
    }
  }
  </style>
  