<template>
  <navbar />

  <div class="mx-20 relative">
    <div class="pr-8 pt-10">
      <navProducts />
    </div>

    <div class="grid grid-cols-4">
      <div class="my-12" v-for="show in products" :key="show.id">
        <img
          :src="require(`../assets/Bag/${show.image}`)"
          @click="showProduct(show.id)"
        />

        <div class="colorSlot justify-center pt-4">
          <div
            class="colors justify-center pt-4"
            v-for="colorProduct in show.colorBag"
            :key="colorProduct.color"
            :style="{ background: colorProduct.color }"
          ></div>
        </div>

        <h3 class="text-black">{{ show.name }}</h3>
        <h4 class="mb-10 font-extralight">{{ show.price }} $</h4>
      </div>

      <!-- popup -->
      <div
        v-if="show"
        class="bg-black bg-opacity-90 info absolute w-full h-screen"
      >
        <div>
          <span class="material-icons" @click="clickShow"> close </span>
        </div>
        <div v-for="product in popupProduct" :key="product.id">
          <img
            :src="require(`../assets/Bag/${product.image}`)"
            class="showImage"
          />
          <p>
            {{ product.name }}
          </p>
          <div class="colorSlot">
            <div
              class="colors"
              v-for="showColor in product.colorBag"
              :key="showColor.idColor"
              :style="{ background: showColor.color }"
            ></div>
          </div>
          <p>
            {{ product.price }}
          </p>
          <p>
            {{ product.date }}
          </p>
          <p>
            {{ product.description }}
          </p>
          <button class="bg-green-500" @click="ediProduct(product)">
            EDIT
          </button>
          <button class="bg-red-500" @click="deleteProduct(product.id)">
            DELETE
          </button>
        </div>
      </div>

      <!-- edit -->
      <div
        v-if="edit"
        class="bg-black bg-opacity-90 info my-10 absolute w-full"
      >
        <form @submit.prevent="editSubmit(submitEdit)"></form>
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
      popupProduct: [],
      url: " http://localhost:5000/products",
      image: "",
      price: null,
      name: "",
      colorBag: [],
      description: "",
      date: null,
      type: "",
      show: false,
      edit: false,
      delete: false,
      submitEdit: null,
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
        this.popupProduct = [];
        const res = await fetch(`${this.url}/${productId}`);
        const data = await res.json();
        this.popupProduct.push(data);
        this.clickShow();
        return this.popupProduct;
      } catch (error) {
        console.log(`Could not show member info! ${error}`);
      }
    },

    editProduct(product) {
      this.edit = true;
      this.name = product.name;
      this.price = product.price;
      this.description = product.description;
      this.type = product.type;
      this.date = product.date;
      this.color = product.color;

      this.submitEdit = product;
    },

    async editSubmit(editing) {
      const res = await fetch(`${this.url}/${editing.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: this.name,
          price: this.price,
          type: this.type,
          description: this.description,
          date: this.date,
          colorBag: this.colorBag,
        }),
      });
      const data = await res.json();
      this.products = this.products.map((product) =>
        product.id === data.id
          ? {
              ...product,
              name: data.name,
              price: data.price,
              description: data.description,
              type: data.type,
              colorBag: data.colorBag,
              date: data.date,
            }
          : product
      );
      (this.name = ""),
        (this.price = null),
        (this.type = ""),
        (this.description = ""),
        (this.colorBag = []),
        (this.date = null),
        (this.edit = false),
        (this.editSubmit = null);
    },

    // clickDelete() {
    //   this.delete = !this.delete;
    // },

    async deleteProduct(productId) {
      if (confirm(`Are you sure to delete ?`)) {
        const res = await fetch(`${this.url}/${productId}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.products = this.products.filter(
              (product) => product.productId !== productId
            ))
          : alert("Error to delete product");
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
.colorSlot {
  display: flex;
  width: 100%;
}
.showImage {
  width: 300px;
  height: 300px;
}
</style>