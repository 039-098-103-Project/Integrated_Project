<template>
  <navbar />

  <div class="mx-20 pt-10">
    <div class="pr-8">
      <navProducts />
    </div>

    <div class="my-12 grid grid-cols-4">
      <div class="" v-for="show in products" :key="show.id">
        <img :src="require(`../assets/Bag/${show.image}`)" />

        <div class="colorSlot justify-center pt-4">
          <div
            class="colors justify-center pt-4"
            v-for="colorProduct in show.colorBag"
            :key="colorProduct.idColor"
            :style="{ background: colorProduct.idColor}"

          ></div>
        </div>

        <h3 class="text-black">{{ show.name }} - {{ show.color }}</h3>
        <h4 class="mb-10 font-extralight">{{ show.price }} $</h4>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
export default {
  name: "Products",
  components: {},

  data() {
    return {
      products: [],
      url: " http://localhost:5000/products",
      image: "",
      price: null,
      name: "",
      color: "",
      colorBag: [],
    };
  },

  methods: {
    async getProduct() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get! ${error}`);
      }
    },
  },

  async created() {
    this.products = await this.getProduct();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mitr:wght@300&display=swap");

img {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
h3 {
  font-family: "Mitr", sans-serif;
  text-align: center;
  padding-top: 18px;
}
h4 {
  font-family: "Mitr", sans-serif;
  text-align: center;
  padding-top: 14px;
}
.colors {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50px;
  transition: 0.6s linear;
}
.colorSlot{
  display: flex;
  width: 100%;
}

</style>