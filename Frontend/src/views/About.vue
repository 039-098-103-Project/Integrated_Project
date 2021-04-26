<template>
  <navbar />

  <div class="mx-20 py-10">
    <div class="px-16">
      <h1 class="flex justify-center">Accessible, Effortless, Empowering</h1>
      <p class="mt-4 text-center text-sm">
        JW PEI is a Los Angeles based accessories brand founded by a husband and
        wife duo. The inspiration behind the brand was upon the idea that
        fashion should be accessible, effortless and empowering. Minimalist
        design in sustainable vegan materials is at the heart of the brand.
      </p>

      <div class="mt-24 grid grid-cols-2">
        <div>
          <img src="../../src/assets/about.jpg" />
        </div>

        <div class="flex items-center">
          <div class="mx-10">
            <h6 class="tracking-widest">DESIGN</h6>
            <h1>Made for Each Woman</h1>
            <p>
              JW PEI with its modern minimalist aesthetic, puts forward and
              seeks to celebrate feminine beauty and strength through fun and
              creative fashion.
            </p>
            
            <button class="bg-black text-white px-6 py-2.5 mt-4">
              <router-link to="/products"> SHOP NOW</router-link>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-24 grid grid-cols-2">
        <div class="flex items-center">
          <div class="">
            <h6 class="tracking-widest">SUSTAINABILITY</h6>
            <h1>Vegan Leather + Recycled Plastic</h1>
            <p>
              Sustainability is in JW PEI's DNA. We use high quality canvas,
              polyurethane, and certified fabric made from recycled plastic
              bottles.
            </p>
          </div>
        </div>

        <div class="mx-10">
          <img src="../../src/assets/recycle.jpg" />
        </div>
      </div>
    </div>
  </div>
  <!-- <footer/> -->
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;500;600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Antonio&family=Hammersmith+One&display=swap");

h1 {
  font-family: "Rajdhani", sans-serif;
  width: 600;
  font-size: 30px;
}
h6 {
  font-family: "Rajdhani", sans-serif;
  width: 300;
  font-size: 15px;
}
img {
  width: 90%;
}
button {
  font-family: "Hammersmith One", sans-serif;
  font-size: 15px;
}
</style>