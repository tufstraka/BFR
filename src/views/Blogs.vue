<template>
    <div class='blog-card-wrap'>
        <div class="blog-cards container">
            <div v-if="admin" class="toggle-edit">
                <span>Toggle Editing Post</span> <br>
                <label class="switch">
                    <input type="checkbox" v-model='editPost'>
                    <span class="slider"></span>
                </label>
            </div>
            <BlogCards :post='post' v-for="(post, index) in blogPosts" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCards from '../components/BlogCard.vue';
export default {
    name: 'Blogs',
    components: { BlogCards },
    computed: {
        admin() {
            return this.$store.state.profileAdmin;
        },
        blogPosts() {
            return this.$store.state.blogPosts;
        },
        editPost: {
            get() {
                return this.$store.state.editPost;
            },
            set(payload) {
                this.$store.commit('toggleEditPost', payload);
            },
        },
    },
    beforeDestroy() {
        this.$store.commit("toggleEditPost", false);
    }
}
</script>

<style lang='scss' scoped>
.blog-cards {
    position: relative;
    z-index: 1;

    .toggle-edit {
        display: flex;
        align-items: center;
        position: absolute;
        top: -70px;
        right: 0;

        span {
            margin-right: 16px;
        }
    }
}

.switch {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 40px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 18px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 36px;
    width: 36px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
}

input:checked+.slider:before {
    transform: translateX(25px);
}

input:checked+.slider {
    background-color: #4caf50;
}

.slider.round {
    border-radius: 20px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
