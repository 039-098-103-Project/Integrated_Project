<template>
  <div class="flex justify-center sticky top-0 z-10 bg-black ">
    <div>
      <div class="py-6 flex justify-center">
        <p>JW PEI</p>
      </div>
      <div class="space-x-44 pb-4 text-white ">
        <router-link to="/" class="hover:text-indigo-300">Home</router-link>
        <router-link to="/products" class="hover:text-indigo-400">Products</router-link>
        <router-link to="/about" class="hover:text-indigo-400">About</router-link>
        <router-link to="/team" class="hover:text-indigo-500">Team</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@200&display=swap");

div {
  font-size: 20px;
  font-family: "Mitr", sans-serif;
  text-decoration: none;
  /* background-color: #1c1c1c; */
}
p {
  font-family: "Bebas Neue", sans-serif;
  font-size: 36px;
  color: white;
}
</style>