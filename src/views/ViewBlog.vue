<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container">
      <h2 class="blog-title">{{ currentBlog[0].blogTitle }}</h2>
      <h4 class="blog-date">Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString('en-us', { dateStyle: 'long' }) }}</h4>
      <div class="pic-wrapper">
        <img class="blog-pic" :src="currentBlog[0].blogCoverPhoto" alt="Blog Cover Photo" />
      </div>
      <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter(post => post.blogID == this.$route.params.blogid);
  },
};
</script>

<style lang="scss" scoped>
.post-view {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  padding: 16px;
  background: #f9f9f9;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.blog-title {
  font-size: 2rem;
  margin-bottom: 8px;
  color: #333;
}

.blog-date {
  font-size: 1rem;
  margin-bottom: 24px;
  color: #777;
}

.pic-wrapper {
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.blog-pic {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.post-content {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

@media (max-width: 768px) {
  .container {
    padding: 12px;
  }

  .blog-title {
    font-size: 1.75rem;
  }

  .blog-date {
    font-size: 0.9rem;
  }

  .blog-pic {
    max-height: 300px;
  }
}
</style>

