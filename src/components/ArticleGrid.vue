<template>

<div class="container">

  <div class="grid1">
    grid1
  </div>
  
  <div class="grid2">
    grid2
  </div>
  
  <div class="grid3">
    grid3
  </div>
  
  <div class="grid4">
    grid4
  </div>
  
</div>

</template>

<script>

</script>

<style scoped>

.container{
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 40% 40% 20%;
  height: 400px;
}
.grid1 {
  border: 3px solid blue;
  margin: 5px;
  padding: 60px;
  background-color: purple;
}
.grid2 {
  border: 2px dotted white;
  background-color:#77767b;
  grid-row: 2 / 4;  
  padding: 60px;
  margin: 5px;
}

.grid3{
  border: 2px solid red;
  background-color:lightseagreen;
  grid-row: 1 / 4;
  padding: 60px;
  margin: 5px;
}

.grid4{
  border: 2px solid azure;
  background-color:#e66100;
  padding: 60px;
  grid-row: 1 / 4;
  margin: 5px;
}

@media only screen and (max-width: 600px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}

</style>
