<template>
    <div class="welcome-section">
      <img :src="post.photo" alt="Welcome Image" class="welcome-image"/>
      <h1>{{ post.title }}</h1>
      <p>{{ post.blogPost }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "WelcomeSection",
    props: {
      post: Object
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .welcome-section {
    text-align: center;
    margin: 20px 0;
  
    .welcome-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }
  
    h1 {
      font-size: 36px;
      margin: 20px 0;
      color: #2c3e50;
    }
  
    p {
      font-size: 18px;
      color: #7f8c8d;
    }
  }
  </style>
  