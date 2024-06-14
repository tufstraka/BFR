<template>
    <div class="reviewer-card">
      <img :src="reviewer.avatar" alt="Reviewer Avatar" class="reviewer-avatar"/>
      <h3>{{ reviewer.name }}</h3>
      <p>{{ reviewer.bio }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "ReviewerCard",
    props: {
      reviewer: Object
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .reviewer-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: center;
    padding: 20px;
  
    .reviewer-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
  
    h3 {
      font-size: 20px;
      margin: 10px 0;
      color: #34495e;
    }
  
    p {
      font-size: 16px;
      color: #7f8c8d;
    }
  }
  </style>
  