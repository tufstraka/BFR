<template>
<div class="create-post">
    <div class="container">
        <div :class="{invisible: !error}" class="err-message">
            <p><span>Error:</span>{{ this.errorMsg }}</p>
        </div>
        <div class="blog-info">
            <input type="text" placeholder="Enter Title" v-model="blogTitle">
            <div class="upload-file">
                <label for="blog-photo">Upload Cover Photo</label>
                <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg"/>
                <button class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview Photo</button>
                <span>File chosen: {{ this.$store.state.blogPhotoName }}</span>
            </div>
        </div>
        <div class="editor">
            <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
        </div>
    </div>
</div>
</template>

<script>
import Quill from "quill";
window.Quill = Quill;

const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
name: "CreatePost",
data(){
    return {
        error: null,
        errorMsg: null,
        editorSettings:{
            modules:{
                ImageResize: {},
            },
        },
    };
},

};
</script>

<style>

</style>