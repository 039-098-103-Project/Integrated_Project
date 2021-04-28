<template>
  <div class="flex justify-end ">
      <div class="space-x-20 text-black font-semibold">
        <router-link to="/products" class="hover:text-red-600">All Product</router-link>
        <router-link to="/addProduct" class="hover:text-red-600">Add Product</router-link>
      </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap");

div {
  font-size: 20px;
  font-family: "Rajdhani", sans-serif;
}

div:visited{
    color: #E92B2B;
}
</style>