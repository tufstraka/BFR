<template>
    <div class="sphere-container">
      <div class="sphere" :style="{ transform: `rotateY(${angle}deg)` }">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="side"
          :style="getSideStyle(index, images.length)"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  //import axios from 'axios';
  
  export default {
    data() {
      return {
        images: [],
        angle: 0,
        intervalId: null,
      };
    },
    methods: {
      fetchImages() {
        const urls = Array.from({ length: 200 }, (_, i) => `https://source.unsplash.com/random/100x100?sig=${i + 1}`);
        this.images = urls;
      },
      getSideStyle(index, total) {
        const phi = Math.acos(-1 + (2 * index) / total);
        const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  
        return {
          backgroundImage: `url(${this.images[index]})`,
          transform: `rotateY(${theta}rad) rotateX(${phi}rad) translateZ(200px)`,
        };
      },
      startRotation() {
        this.intervalId = setInterval(() => {
          this.angle += 0.5;
        }, 16);
      },
      stopRotation() {
        clearInterval(this.intervalId);
        this.intervalId = null;
      },
    },
    mounted() {
      this.fetchImages();
      this.startRotation();
    },
    beforeDestroy() {
      this.stopRotation();
    },
  };
  </script>
  
  <style scoped>
  .sphere-container {
    perspective: 1000px;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  .sphere {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }
  .side {
    position: absolute;
    width: 80px;
    height: 80px;
    background-size: cover;
    background-position: center;
  }
  </style>
  