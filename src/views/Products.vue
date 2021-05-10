<template>
  <navbar />

  <div class="allProduct relative">
    <div class="navProduct">
      <navProducts />
    </div>

    <div class="content">
      <div class="product" v-for="show in products" :key="show.id">
        <img
          :src="require(`../assets/Bag/${show.imageName}`)"
          @click="showProduct(show.id)"
        />

        <div class="colorSlot pt-4">
          <div
            class="colors pt-4"
            v-for="colorProduct in show.colors"
            :key="colorProduct.colorName"
            :style="{ background: colorProduct.colorName }"
          ></div>
        </div>

        <h3 class="productName text-black">{{ show.productName }}</h3>
        <h4 class="productPrice font-extralight">{{ show.price }} $</h4>
      </div>

      <!-- popup -->
      <div v-if="show" class="popUp bg-black bg-opacity-75 info">
        <div class="exit text-white" @click="clickShow">X</div>

        <div class="flex justify-center">
          <div
            class="popwhite bg-white"
            v-for="product in popupProduct"
            :key="product.id"
          >
            <div class="flex justify-center">
              <img
                :src="require(`../assets/Bag/${product.imageName}`)"
                class="showImage"
              />
            </div>

            <div class="contentPop" v-if="hiddenEdit == false">
              <p class="jwpei">JW PEI</p>
              <p class="name">
                {{ product.productName }}
              </p>
              <p class="price">{{ product.price }} $</p>

              <div class="colorSlot colorPop py-2">
                <div
                  class="colors"
                  v-for="showColor in product.colors"
                  :key="showColor.colorName"
                  :style="{ background: showColor.colorName }"
                ></div>
              </div>

              <p class="stock">Will Be In Stock On {{ product.inStockDate }}</p>
              <p class="descrip">
                {{ product.productDescrip }}
              </p>

              <div class="editAndDelete">
                <div class="edit">
                  <button
                    class="bg-green-500"
                    @click="hiddenEdit = !hiddenEdit && editProduct(product)"
                    :class="{ show: hiddenEdit == false }"
                  >
                    EDIT
                  </button>
                </div>

                <div class="delete">
                  <button class="bg-red-500" @click="deleteProduct(product.id)">
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
                      <div class="mr-10">
                        <input
                          v-model="productName"
                          class="w-full placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-grayFigma focus:border-transparent focus:ring-2 px-4 rounded border border-grayFigma"
                          type="text"
                          placeholder="Product Name"
                        />
                      </div>
                    </div>
                    <sup v-show="inputName"> Please enter product name! </sup>

                    <div>
                      <p class="">Price</p>
                      <input
                        class="w-full placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:ring-grayFigma focus:border-transparent focus:ring-2 px-4 rounded border border-grayFigma"
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
                      style="height: 140px"
                      placeholder="Description..."
                    />
                  </div>
                  <sup v-show="inputDescription">
                    Please enter description!
                  </sup>

                  <div class="grid grid-cols-2">
                    <button class="bg-green-500 rounded-lg py-2 mx-16">
                      CONFIRM
                    </button>
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
      console.log(this.selectColor);
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

.content {
  @apply grid grid-cols-2 sm:grid sm:grid-cols-4 md:grid md:grid-cols-4 lg:grid lg:grid-cols-4;
}
img {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.productName {
  font-family: "Mitr", sans-serif;
  text-align: center;
  padding-top: 10px;
  font-size: 12px;
  @apply sm:text-sm;
}
.productPrice {
  font-family: "Mitr", sans-serif;
  text-align: center;
  padding-top: 6px;
  font-size: 10px;
  @apply sm:text-xs;
}
.colors {
  width: 15px;
  height: 15px;
  border-radius: 50px;
  transition: 0.6s linear;
  align-items: center;
  @apply mx-1 justify-center sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5;
}
.colorSlot {
  display: flex;
  width: 100%;
  @apply justify-center;
}
.showImage {
  /* width: 100px;
  height: 100px; */
  @apply w-28 h-28 md:w-52 md:h-52 md:items-center md:flex lg:w-80 lg:h-80;
}
.popwhite {
  border-radius: 30px;
  @apply grid grid-cols-1  w-4/5 py-6 md:grid md:grid-cols-2 lg:py-12;
}
.popUp {
  @apply absolute w-full h-screen;
}
.exit {
  cursor: pointer;
  @apply flex justify-end px-4 pt-12 pb-4 text-sm sm:pt-12 md:text-base lg:pt-12 lg:mr-6 lg:text-2xl;
}
.contentPop {
  @apply grid grid-cols-1;
}
.jwpei {
  font-size: 8px;
  @apply flex justify-center my-2 
  md:flex md:justify-start
  lg:text-xs lg:flex lg:justify-start lg:my-1;
}
.name {
  @apply text-xs flex justify-center 
  md:flex md:justify-start md:font-bold md:text-base
  lg:text-xl lg:flex lg:justify-start lg:font-bold lg:text-2xl;
}
.price {
  @apply text-xs flex justify-center 
  md:flex md:justify-start
  lg:text-base lg:flex lg:justify-start;
}
.colorPop{
  @apply justify-center md:justify-start lg:justify-start
}
.stock {
  font-size: 10px;
  @apply flex justify-center font-bold 
  md:flex md:justify-start md:text-xs md:font-bold
  lg:text-sm lg:flex lg:justify-start;
}
.descrip {
  font-size: 10px;
  @apply mb-2 text-xs flex justify-center px-2 break-words py-2 
  md:flex md:justify-start md:pl-0 md:text-xs
  lg:text-sm lg:flex lg:justify-start lg:px-0 lg:pr-4;
}
.editAndDelete {
  @apply grid grid-cols-2 flex justify-center sm:justify-center md:mr-4;
}
button {
  @apply px-4 py-1.5 rounded;
}
.edit {
  font-size: 10px;
  @apply flex justify-center;
}
.delete {
  font-size: 10px;
  @apply flex justify-center;
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
.form {
  font-family: "Mitr", sans-serif;
  font-size: 13px;
}
.navProduct {
  @apply mt-4 my-4 flex justify-center sm:flex sm:justify-end lg:flex lg:justify-end lg:my-10;
}
.product {
  @apply my-0 sm:mb-8 md:mb-10 lg:mb-12;
}
.allProduct {
  @apply mx-2 sm:mx-10 md:mx-20 lg:mx-20;
}
</style>