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
        class="bg-black bg-opacity-75 info absolute w-full h-screen"
      >
        <div
          class="text-white flex justify-end px-10 pt-10 pb-4 text-3xl exit"
          @click="clickShow"
        >
          X
        </div>

        <div class="flex justify-center">
          <div
            class="popwhite grid grid-cols-2 bg-white w-4/5 py-12"
            v-for="product in popupProduct"
            :key="product.id"
          >
            <div>
              <img
                :src="require(`../assets/Bag/${product.imageName}`)"
                class="showImage items-center"
              />
            </div>

            <div class="py-2" v-if="hiddenEdit == false">
              <p class="text-xs">JW PEI</p>
              <p class="text-3xl">
                {{ product.productName }}
              </p>
              <p>{{ product.price }} $</p>

              <div class="colorSlot py-2">
                <div
                  class="colors"
                  v-for="showColor in product.colors"
                  :key="showColor.colorName"
                  :style="{ background: showColor.colorName }"
                ></div>
              </div>

              <p class="mt-6 text-base font-bold">
                Will Be In Stock On {{ product.inStockDate }}
              </p>
              <p class="text-sm text-justify pr-20">
                {{ product.productDescrip }}
              </p>
              <div class="grid grid-cols-2 pt-28">
                <div class="flex justify-center">
                  <button
                    class="bg-green-500 px-6 py-1 rounded"
                    @click="hiddenEdit = !hiddenEdit && editProduct(product)"
                    :class="{ show: hiddenEdit == false }"
                  >
                    EDIT
                  </button>
                </div>

                <div class="flex justify-start">
                  <button
                    class="bg-red-500 px-6 py-1 rounded"
                    @click="deleteProduct(product.id)"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>

            <!-- edit -->
            <div v-else>
              <form @submit.prevent="editSubmit(submitEdit)">
                <div class="form mr-20">
                  <div class="mb-4 grid grid-cols-2">
                    <div>
                      <div>
                        <p>Product Name</p>
                      </div>
                      <div>
                        <input
                          v-model="productName"
                          class="w-full placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                          type="text"
                          placeholder="Product Name"
                        />
                      </div>
                    </div>
                    <sup v-show="inputName"> Please enter product name! </sup>

                    <div>
                      <p class="">Price</p>
                      <input
                        class="w-full placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                        type="number"
                        placeholder="Price"
                        v-model="price"
                      />
                    </div>
                  </div>
                  <sup v-show="inputPrice"> Please enter product price! </sup>

                  <div class="mb-4 grid grid-cols-2">
                    <div class="">
                      Bag Type
                      <form name="dropdown">
                        <select v-model="selectType">
                          <option
                            v-for="bagType in bagType"
                            :value="bagType"
                            :key="bagType.id"
                          >
                            {{ bagType.bagTypeName }}
                          </option>
                        </select>
                      </form>
                    </div>
                    <div class="justify-end">
                      <p class="">Will Be In Stock On</p>
                      <input
                        class="border border-black rounded"
                        type="date"
                        v-model="inStockDate"
                      />
                    </div>
                  </div>
                  <sup v-show="inputDate"> Please enter stock date! </sup>

                  <div>Color</div>
                  <div class="mb-6 flex justify-start">
                    <label
                      class="checkbox rounded mr-2"
                      v-for="color in colors"
                      :key="color.id"
                      :style="{ background: color.colorName }"
                    >
                      <input
                        type="checkbox"
                        :value="color"
                        v-model="selectColor"
                      />

                    </label>
                  </div>
                  <sup v-show="inputColor">
                    Please enter product color more than one!
                  </sup>

                  {{ colorsSelect }}
                  <div class="mb-6">
                    <p class="">Description</p>
                    <textarea
                      v-model="productDescrip"
                      class="w-full h-40 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md break-words text-justify whitespace-normal pr-12 py-2"
                      style="height:140px"
                      placeholder="Description..."
                    />
                  </div>
                  <sup v-show="inputDescription">
                    Please enter description!
                  </sup>

                  <div class="grid grid-cols-2 ">
                    <button class="bg-green-500 rounded-lg py-2 mx-16">CONFIRM</button>
                    <button
                      class="bg-red-500 rounded-lg py-2 mx-16"
                      @click="hiddenEdit = !hiddenEdit"
                    >
                      CANCLE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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
      bagType: null,
      ColorsSelect: null,
      hiddenEdit: false,
      show: false,
      delete: false,
      selectColor: [],
      selectType: null,
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

    async getData() {
      try {
        const response = await fetch("http://localhost:5000/colors");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getBagType() {
      try {
        const response = await fetch("http://localhost:5000/bagType");
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    clickShow() {
      this.show = !this.show;
      this.hiddenEdit = false;
      if (this.show) {
        window.scrollTo(450, 100);
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
      this.hiddenEdit = true;
      this.productName = product.productName;
      this.price = product.price;
      this.productDescrip = product.productDescrip;
      this.selectType = product.bagType;
      this.inStockDate = product.inStockDate;
      this.selectColor = product.colors;
      console.log(this.selectColor)
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
          bagType: this.selectType,
          productDescrip: this.productDescrip,
          inStockDate: this.inStockDate,
          colors: this.selectColor,
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
              productType: data.selectType,
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
    this.colors = await this.getData();
    this.bagType = await this.getBagType();
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
  width: 400px;
  height: 400px;
}
.popwhite {
  border-radius: 30px;
}
.exit {
  cursor: pointer;
}
.checkbox {
  display: flex;
  cursor: pointer;
  border-radius: 50px;
}
.checkbox > input {
  height: 25px;
  width: 25px;
  appearance: none;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
  border-radius: 50px;
}

.checkbox > input:checked {
  border: 2px solid red;
}
.form{
  font-family: "Mitr", sans-serif;
  font-size: 13px;
}
</style>