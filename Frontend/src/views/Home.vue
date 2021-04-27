<template>
  <navbar></navbar> 
  <div class="container flex justify-center">
    <img src="../../src/assets/bg-img.jpg" style="width: 100%" />

    <div class="textcenter">
      <div class="text-sm mb-4">C O D</div>
      <marquee direction="UP">Hello</marquee>
      <div class="text-6xl mb-5">Treding For Spring</div>
      <div>Product By JW PEI</div>
    </div>
  </div>
 
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@300&display=swap");

.container {
  position: relative;
  text-align: center;
  color: white;
}
.textcenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Mitr", sans-serif;
}

</style>