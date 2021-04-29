<template>
  <navbar/> 
  <footer/>
  <div class="container flex justify-center">
    <img src="../../src/assets/bg-img.jpg" style="width: 100%" />

    <div class="textcenter">
      <div class="text-sm mb-4">C O D</div>
      <div class="tred text-6xl mb-5">Treding For Spring</div>
      <div>Product By JW PEI</div>
    </div>
  </div>
 <Footer/>
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

// <script>
//   var textWrapper = document.querySelector('.tred');
//   anime.timeline({loop: true})
//   .add({
//     targets: '.tred',
//     opacity: [0,1],
//     easing: "easeInOutQuad",
//     duration: 2250,
//     delay: (el, i) => 150 * (i+1)
//   }).add({
//     targets: '.tred',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

// </script>