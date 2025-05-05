<template>
  <div class="blog-card" :class="{ 'is-editable': editPost }">
    <div v-show="editPost" class="edit-controls">
      <button @click="editBlog" class="edit-btn" aria-label="Edit post">
        <Edit class="edit-icon"/>
      </button>
      <button @click="showDeleteConfirm = true" class="delete-btn" aria-label="Delete post">
        <Delete class="delete-icon"/>
      </button>
    </div>
    
    <div class="card-thumbnail">
      <img :src="post.blogCoverPhoto" alt="Blog thumbnail">
    </div>
    
    <div class="card-content">
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.blogDate) }}</span>
      </div>
      
      <h3 class="post-title">{{ post.blogTitle }}</h3>
      
      <router-link class="read-more" :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
        Read More <Arrow class="arrow"/>
      </router-link>
    </div>
    
    <div v-if="showDeleteConfirm" class="delete-modal">
      <div class="modal-content">
        <h4>Delete Post</h4>
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="showDeleteConfirm = false" class="cancel-btn">Cancel</button>
          <button @click="confirmDelete" class="confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import Edit from "../assets/Icons/edit-regular.svg"
import Delete from "../assets/Icons/trash-regular.svg"

export default {
  name: 'blogCard',
  props: ['post'],
  components: {
    Arrow,
    Edit,
    Delete,
  },
  data() {
    return {
      showDeleteConfirm: false
    }
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.post.blogID)
    },
    editBlog() {
      this.$router.push({name: "EditPost", params: {blogid: this.post.blogID}})
    },
    confirmDelete() {
      this.deletePost();
      this.showDeleteConfirm = false;
    },
    formatDate(timestamp) {
      if (!timestamp) return '';
      return new Date(timestamp).toLocaleString("en-us", { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  },
  computed:{
    editPost(){
      return this.$store.state.editPost; 
    }
  }
};
</script>

<style lang='scss' scoped>
.blog-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--background-primary);
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  }
  
  &.is-editable {
    border: 2px solid transparent;
    
    &:hover {
      border-color: var(--primary-color);
    }
  }
  
  .edit-controls {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 5;
    display: flex;
    gap: 8px;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    
    button {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transition: var(--transition-fast);
    }
    
    .edit-btn:hover {
      background-color: var(--primary-color);
      .edit-icon path {
        fill: white;
      }
    }
    
    .delete-btn:hover {
      background-color: var(--secondary-color);
      .delete-icon path {
        fill: white;
      }
    }
    
    .edit-icon, .delete-icon {
      width: 16px;
      height: 16px;
    }
  }
  
  &:hover .edit-controls {
    opacity: 1;
    transform: translateY(0);
  }
  
  .card-thumbnail {
    position: relative;
    padding-bottom: 60%;
    overflow: hidden;
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }
  
  &:hover .card-thumbnail img {
    transform: scale(1.05);
  }
  
  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .post-meta {
    margin-bottom: 12px;
    
    .post-date {
      font-size: 14px;
      color: var(--text-light);
    }
  }
  
  .post-title {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-dark);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color var(--transition-fast);
  }
  
  &:hover .post-title {
    color: var(--primary-color);
  }
  
  .read-more {
    display: inline-flex;
    align-items: center;
    color: var(--primary-color);
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    margin-top: auto;
    padding-top: 16px;
    transition: color var(--transition-fast);
    
    .arrow {
      margin-left: 6px;
      width: 14px;
      transition: transform 0.2s ease;
      
      path {
        fill: var(--primary-color);
      }
    }
    
    &:hover {
      color: darken(#2a41e8, 10%);
      
      .arrow {
        transform: translateX(4px);
      }
    }
  }
  
  .delete-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .modal-content {
      background-color: white;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      padding: 24px;
      
      h4 {
        font-size: 20px;
        margin-bottom: 16px;
        color: var(--text-dark);
      }
      
      p {
        font-size: 16px;
        line-height: 1.5;
        color: var(--text-light);
        margin-bottom: 24px;
      }
      
      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        
        button {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        
        .cancel-btn {
          background-color: #f1f1f1;
          border: none;
          color: var(--text-dark);
          
          &:hover {
            background-color: #e1e1e1;
          }
        }
        
        .confirm-btn {
          background-color: var(--secondary-color);
          border: none;
          color: white;
          
          &:hover {
            background-color: darken(#e74c3c, 10%);
          }
        }
      }
    }
  }
}
</style>