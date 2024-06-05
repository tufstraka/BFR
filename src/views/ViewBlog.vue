<template>
  <div>
    <div class="post-view" v-if="currentBlog">
      <div class="container">
        <h1 class="blog-title">{{ currentBlog.blogTitle }}</h1>
        <h4 class="blog-date">Posted on: {{ new Date(currentBlog.date).toLocaleString('en-us', { dateStyle: 'long' }) }}
        </h4>
        <div class="pic-wrapper">
          <img class="blog-pic" :src="currentBlog.blogCoverPhoto" alt="Blog Cover Photo" />
        </div>
        <div class="post-content ql-editor" v-html="currentBlog.blogHTML"></div>
        <div class="like-section">
          <i @click="toggleLike" :class="{ 'fas fa-heart liked': liked, 'far fa-heart': !liked }" class="like-icon"></i>
          <span>{{ currentBlog.likes }} likes</span>
        </div>
        <div class="comments-section">
          <h3>Comments</h3>
          <div class="comment-form">
            <textarea v-model="newComment" placeholder="Write a comment..." rows="3"></textarea>
            <button @click="submitComment" class="submit-comment-button">Post Comment</button>
          </div>
          <div class="comments-list">
            <div class="comment" v-for="comment in comments" :key="comment.id">
              <div class="comment-author">{{ comment.authorName }}</div>
              <div class="comment-content">{{ comment.content }}</div>
              <div class="comment-date">{{
              formatTimestamp(comment.timestamp.seconds) }}</div>
              <i v-if="canDeleteComment(comment)" class="fas fa-trash-alt" @click="deleteComment(comment.id)"></i>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="spinner-container">
      <div class="spinner"></div>
    </div>
  </div>
</template>





<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


export default {
  name: "ViewBlog",
  metaInfo() {
    return {
      title: this.currentBlog.blogTitle,
      meta: [
        { name: 'description', content: this.currentBlog.blogDescription },
        { property: 'og:title', content: this.currentBlog.blogTitle },
        { property: 'og:description', content: this.currentBlog.blogDescription },
        { property: 'og:image', content: this.currentBlog.blogCoverPhoto },
        { property: 'og:url', content: window.location.href },
        { name: 'twitter:card', content: this.currentBlog.blogCoverPhoto },
        { name: 'twitter:title', content: this.currentBlog.blogTitle },
        { name: 'twitter:description', content: this.currentBlog.blogDescription },
        { name: 'twitter:image', content: this.currentBlog.blogCoverPhoto }
      ]
    }
  },
  data() {
    return {
      currentBlog: null,
      liked: false,
      comments: [],
      newComment: '',
    };
  },
  async mounted() {
    const blogId = this.$route.params.blogid;
    const db = firebase.firestore();

    try {
      const doc = await db.collection('blogPosts').doc(blogId).get();
      if (doc.exists) {
        this.currentBlog = doc.data();
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }

    this.fetchComments();

    // Check if user has already liked the post
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userLikesDoc = await db.collection('userLikes').doc(user.uid).get();
        if (userLikesDoc.exists && userLikesDoc.data().likedPosts.includes(blogId)) {
          this.liked = true;
        }
      }
    });
  },
  methods: {
    async toggleLike() {
      const user = firebase.auth().currentUser;
      console.log('like clicked');
      if (!user) {
        this.$router.push({ name: 'Register' });
        return;
      }

      const blogId = this.$route.params.blogid;
      const db = firebase.firestore();
      const blogRef = db.collection('blogPosts').doc(blogId);
      const userLikesRef = db.collection('userLikes').doc(user.uid);

      try {
        await db.runTransaction(async (transaction) => {
          const blogDoc = await transaction.get(blogRef);
          const userLikesDoc = await transaction.get(userLikesRef);

          if (blogDoc.exists) {
            let newLikes = blogDoc.data().likes;
            const likedPosts = userLikesDoc.exists ? userLikesDoc.data().likedPosts || [] : [];

            if (this.liked) {
              newLikes -= 1;
              const index = likedPosts.indexOf(blogId);
              if (index > -1) likedPosts.splice(index, 1);
              this.liked = false;
            } else {
              newLikes += 1;
              likedPosts.push(blogId);
              this.liked = true;
            }

            transaction.update(blogRef, { likes: newLikes });
            transaction.set(userLikesRef, { likedPosts });

            this.currentBlog.likes = newLikes;
          }
        });
      } catch (error) {
        console.error('Transaction failed: ', error);
      }
    },
    async fetchComments() {
      const blogId = this.$route.params.blogid;
      const db = firebase.firestore();
      try {
        const commentsSnapshot = await db.collection('blogPosts').doc(blogId).collection('comments').orderBy('timestamp', 'desc').get();
        const comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("comments:", comments)

        for (let comment of comments) {
          const userDoc = await db.collection('users').doc(comment.userId).get();
          if (userDoc.exists) {
            comment.authorName = userDoc.data().userName;

          } else {
            comment.authorName = 'Unknown';
          }
        }

        this.comments = comments;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async submitComment() {
      const user = firebase.auth().currentUser;
      if (!user) {
        this.$router.push({ name: 'Register' });
        return;
      }

      const blogId = this.$route.params.blogid;
      const db = firebase.firestore();
      const commentRef = db.collection('blogPosts').doc(blogId).collection('comments').doc();

      try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userName = userDoc.exists ? userDoc.data().userName : 'Anonymous';

        await commentRef.set({
          authorName: userName,
          content: this.newComment,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userId: user.uid
        });

        this.fetchComments();
        this.newComment = ''; // Clear the textarea
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    },

    formatTimestamp(seconds) {
      const date = new Date(seconds * 1000);
      return date.toLocaleString();
    },

    canDeleteComment(comment) {
      const currentUser = firebase.auth().currentUser;
      // Check if the current user is the author of the comment or an admin
      return currentUser && (comment.userId === currentUser.uid || currentUser.isAdmin);
    },

    async deleteComment(commentId) {
      const db = firebase.firestore();
      const blogId = this.$route.params.blogid;
      const commentRef = db.collection('blogPosts').doc(blogId).collection('comments').doc(commentId);

      try {
        await commentRef.delete();
        // Remove the deleted comment from the local array
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
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

.like-section {
  display: flex;
  align-items: center;
  margin-top: 20px;

  .like-icon {
    cursor: pointer;
    font-size: 24px;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }

    &.liked {
      color: #e74c3c;
    }
  }

  span {
    margin-left: 8px;
    font-size: 1.125rem;
    color: #555;
  }
}

.comments-section {
  margin-top: 40px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .comment-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    textarea {
      resize: none;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-bottom: 10px;
      font-size: 1rem;
      font-family: inherit;
      line-height: 1.5;
    }

    .submit-comment-button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      align-self: flex-end;

      &:hover {
        background-color: #2980b9;
      }
    }
  }

  .comments-list {
    .comment {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .comment-author {
        font-weight: bold;
        margin-bottom: 5px;
      }

      .comment-content {
        margin-bottom: 5px;
        font-size: 1rem;
        color: #555;
      }

      .comment-date {
        font-size: 0.875rem;
        color: #888;
      }
    }
  }
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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