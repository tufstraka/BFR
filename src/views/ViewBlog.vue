<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container">
      <h1 class="blog-title">{{ currentBlog[0].blogTitle }}</h1>
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
  font-family: 'Georgia', 'Times New Roman', Times, serif;
  padding: 32px 16px;
  background: #f4f4f4;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.blog-title {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #333;
  font-weight: bold;
  line-height: 1.2;
}

.blog-date {
  font-size: 1rem;
  margin-bottom: 32px;
  color: #888;
  font-style: italic;
}

.pic-wrapper {
  width: 100%;
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
}

.blog-pic {
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: cover;
  border-radius: 10px;
}

.post-content {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  word-break: break-word;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-date {
    font-size: 0.9rem;
  }

  .blog-pic {
    max-height: 300px;
  }
}
</style>

