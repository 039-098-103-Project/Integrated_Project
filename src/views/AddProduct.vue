<template>
  <navbar />
  <div class="mx-44 py-10">
    <navProducts />

    <div class="grid grid-cols-2 my-12">
      <label
        class="border-2 border-blue-800 h-80 w-80 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-lg"
        id="preview"
      >
        <svg
          class="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
          />
        </svg>
        <span class="mt-2 text-base leading-normal">Upload a Image</span>
        <input
          type="file"
          accept="image/*"
          @change="selectFile"
          class="hidden form-control-file"
        />
      </label>

      <div>
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <div class="mb-6 grid grid-cols-2">
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
                    v-model="productPrice"
                  />
                </div>
              </div>
              <sup v-show="inputPrice"> Please enter product price! </sup>

              <div class="mb-6 grid grid-cols-2">
                <div class="">
                  Bag Type
                  <form name="dropdown">
                    <select v-model="selectType" >
                        <option v-for="bagType in productType" :value="bagType" :key="bagType.id">
                          {{ bagType.bagTypeName }}</option>
                    </select>
                  </form>

                  <!-- {{ selectType }} -->
                </div>
                <div class="justify-end">
                  <p class="">Will Be In Stock On</p>
                  <input
                    class="border border-black rounded"
                    type="date"
                    v-model="productDate"
                  />
                </div>
              </div>
              <sup v-show="inputDate"> Please enter stock date! </sup>

              <div>Color</div>
              <div class="mb-6 flex justify-between">
                <label
                  class="checkbox rounded"
                  v-for="color in productColor"
                  :key="color.id"
                  :style="{ background: color.colorName }"
                >
                  <input
                    type="checkbox"
                    :value="color"
                    v-model="colorsSelect"
                  />
                </label>
              </div>
              <sup v-show="inputColor">
                Please enter product color more than one!
              </sup>

              <!-- {{ colorsSelect }} -->
              <div class="mb-6">
                <p class="">Description</p>
                <textarea v-model="productDescreiption"
                  class="w-full h-40 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md break-words text-justify whitespace-normal px-4 py-2"
                  style="height:150px"
                  placeholder="Description...">
                </textarea>
              </div>
              <sup v-show="inputDescription"> Please enter description! </sup>
            </div>
          </form>
        </div>

        <div class="flex justify-center">
          <button
            class="bg-green-500 rounded-lg px-4 py-2"
            @click="addProduct">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // urlData: null,
      check: false,
      url: "http://localhost:5000/products",
      inputName: false,
      inputPrice: false,
      inputColor: false,
      inputType: false,
      inputDate: false,
      inputDescription: false,
      products: [],
      colorsSelect: [],
      productName: "",
      productPrice: null,
      productDescreiption: "",
      productDate: "",
      productColor: [],
      productType: null,
      selectType: null,
    };
  },

  methods: {
    // selectFile(e) {
    //   const file = e.target.files[0];
    //   this.urlData = URL.createObjectURL(file);
    // },
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

    checkColor() {
      this.check = !this.check;
    },

    submitFrom() {
      this.inputName = this.productName === "" ? true : false;
      this.inputPrice = this.productPrice === null || this.productPrice === "" ? true : false;
      this.inputColor = this.productColor === [] ? true : false;
      this.inputType = this.productType === "" ? true : false;
      this.inputDate = this.productDate === "" ? true : false;
      this.inputDescription = this.productDescreiption === "" ? true : false;
      this.addProduct();
      if (
        this.inputName ||
        this.inputPrice ||
        this.inputColor ||
        this.inputType ||
        this.inputDate ||
        this.inputDescription
      ) {
        return;
      }
      this.inputPrice = parseFloat(this.productPrice);

    },

    async addProduct() {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            productName: this.productName,
            price: this.productPrice,
            inStockDate: this.productDate,
            productDescrip: this.productDescreiption,
            // imageName: ""
            bagType: this.selectType,
            colors: this.colorsSelect,
          }),
        });

        const data = await res.json();
        this.products = [...this.products, data];
        this.productName = "";
        this.productPrice = null;
        this.productDescreiption = "";
        this.productType = "";
        this.productColor = [];
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    },
  },
  async created() {
    this.productColor = await this.getData();
    this.productType = await this.getBagType();
  },

  computed: {
    
  },
};
</script>

<style scoped>
#preview img {
  width: 100%;
}

.checkbox {
  display: flex;
  cursor: pointer;
  border-radius: 50px;
}

.checkbox > input {
  height: 30px;
  width: 30px;
  appearance: none;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
  border-radius: 50px;
}

.checkbox > input:checked {
  border: 2px solid red;
}
sup {
  color: red;
}
</style>