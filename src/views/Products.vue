<template>
  <navbar />

  <div class="mx-20 pt-10">
    <div class="pr-8">
      <navProducts />
    </div>

    <div class="my-12 grid grid-cols-4">
      <div class="" v-for="show in products" :key="show.id">
        <img
          :src="require(`../assets/Bag/${show.image}`)"
          @click="showProduct(show.id)"
        />

        <div class="colorSlot justify-center pt-4">
          <div
            class="colors justify-center pt-4"
            v-for="colorProduct in show.colorBag"
            :key="colorProduct.idColor"
            :style="{ background: colorProduct.idColor }"
          ></div>
        </div>

        <h3 class="text-black">{{ show.name }} - {{ show.color }}</h3>
        <h4 class="mb-10 font-extralight">{{ show.price }} $</h4>
      </div>
    </div>

    
  </div><div v-show="show" class="bg-black bg-opacity-70 info my-10 h-3/5">
      <span class="material-icons" @click="clickShow"> close </span>
      <div
        class="flex flex-col justify-center items-center"
        v-for="product in products"
        :key="product.id"
      >
        <div class="pt-10">
          <img
            :src="require(`../assets/Bag/${product.image}`)"
            class="h-96 w-64"
          />
        </div>
        <div class="pt-5">
          <p class="text-white text-xl p-2">
            <span class="font-bold">NAME: </span> {{ product.name }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">POSITION: </span> {{ product.colorBag }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BIRTH DATE: </span> {{ product.price }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BLOOD TYPE: </span>
            {{ product.date }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">NATIONALITY: </span>
            {{ product.description }}
          </p>
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
      description: "",
      date: null,
      show: false,
      edit: false,
      isEdit: false,
      change: false,
      editId: null,
      adminMode: false,
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

    clickShow() {
      this.show = !this.show;
    },

    async showProduct(productId) {
      try {
        this.products = [];
        const res = await fetch(`${this.url}/${productId}`);
        const data = await res.json();
        this.products.push(data);
        if (this.adminMode && !this.isEdit) {
          this.toggleEdit();
          this.isEdit = true;
          this.editId = data.id;
          this.image = data.image;
          this.name = data.name;
          this.date = data.date;
          this.description = data.description;
        } else if (!this.adminMode) {
          this.clickShow();
        }
        return;
      } catch (error) {
        console.log(`Could not show member info! ${error}`);
      }
    },

    toggleadminMode() {
      this.adminMode = !this.adminMode;
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
.colorSlot {
  display: flex;
  width: 100%;
}
</style>