<template>
  <navbar />

  <div class="mx-20 relative">
    <div class="pr-8 pt-10">
      <navProducts />
    </div>

    <div class="grid grid-cols-4">
      <div class="my-12" v-for="show in products" :key="show.id">
        <img
          :src="require(`../assets/Bag/${show.imageName}`)"
          @click="showProduct(show.id)"
        />

        <div class="colorSlot justify-center pt-4">
          <div
            class="colors justify-center pt-4"
            v-for="colorProduct in show.colors"
            :key="colorProduct.colorName"
            :style="{ background: colorProduct.colorName }"
          ></div>
        </div>

        <h3 class="text-black">{{ show.productName }}</h3>
        <h4 class="mb-10 font-extralight">{{ show.price }} $</h4>
      </div>

      <!-- popup -->
      <div
        v-if="show"
        class="bg-black bg-opacity-90 info absolute w-full h-screen"
      >
        <div class="text-white flex justify-end px-10 py-8 text-lg" @click="clickShow">
          X
        </div>
        <div v-for="product in popupProduct" :key="product.id">
          <img
            :src="require(`../assets/Bag/${product.imageName}`)"
            class="showImage"
          />
          <p>
            {{ product.productName }}
          </p>
          <div class="colorSlot">
            <div
              class="colors"
              v-for="showColor in product.colors"
              :key="showColor.colorName"
              :style="{ background: showColor.colorName }"
            ></div>
          </div>
          <p>
            {{ product.price }}
          </p>
          <p>
            {{ product.inStockDate }}
          </p>
          <p>
            {{ product.productDescrip }}
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
      url: "http://localhost:5000/products",
      imageName: "",
      price: null,
      productName: "",
      colors: [],
      productDescrip: "",
      inStockDate: null,
      bagType: "",
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
      if (this.show) {
        window.scrollTo(0, 0);
      }
    },

    async showProduct(id) {
      try {
        console.log(id);
        this.popupProduct = [];
        const res = await fetch(`${this.url}/${id}`);
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
      this.productName = product.productName;
      this.price = product.price;
      this.productDescrip = product.productDescrip;
      this.bagType = product.bagType;
      this.inStockDate = product.inStockDate;
      this.colors = product.colors;

      this.submitEdit = product;
    },

    async editSubmit(editing) {
      const res = await fetch(`${this.url}/${editing.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          productName: this.productName,
          price: this.price,
          bagType: this.bagType,
          productDescrip: this.productDescrip,
          inStockDate: this.inStockDate,
          colors: this.colors,
        }),
      });
      const data = await res.json();
      this.products = this.products.map((product) =>
        product.id === data.id
          ? {
              ...product,
              productName: data.productName,
              price: data.price,
              productDescrip: data.productDescrip,
              productType: data.productType,
              colors: data.colors,
              inStockDate: data.inStockDate,
            }
          : product
      );
      (this.productName = ""),
        (this.price = null),
        (this.productType = ""),
        (this.productDescrip = ""),
        (this.colors = []),
        (this.inStockDate = null),
        (this.edit = false),
        (this.editSubmit = null);
    },

    async deleteProduct(id) {
      if (confirm(`Are you sure to delete ?`)) {
        const res = await fetch(`${this.url}/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.products = this.products.filter(
              (product) => product.id !== id
            ))
          : alert("Error to delete product");
      }
    },
  },

  async created() {
    this.products = await this.getProduct();
  },

  watch: {
    show: function () {
      if (this.show) {
        document.documentElement.style.overflow = "hidden";
        return;
      }
      document.documentElement.style.overflow = "auto";
    },
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