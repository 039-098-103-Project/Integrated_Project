<template>
      <div class="text-black">
        <router-link to="/products" class="nav hover:text-red-600 inline">All Product</router-link>
        <router-link to="/addProduct" class="nav hover:text-red-600 inline">Add Product</router-link>
      </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@300&display=swap");

.nav {
  font-size: 12px;
  font-family: "Rajdhani", sans-serif;
  @apply mr-2 sm:text-sm sm:mr-6 lg:text-base lg:mr-12
}

nav:visited{
    color: #E92B2B;
}
</style>