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
                <sup v-show="inputName">
                  Please enter product name!
                </sup>

                <div>
                  <p class="">Price</p>
                  <input
                    class="w-full placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                    type="text"
                    placeholder="Price"
                    v-model="productPrice"
                  />
                </div>
              </div>
              <sup v-show="inputPrice">
                  Please enter product price!
                </sup>

              <div class="mb-6 grid grid-cols-2">
                <div class="">
                  Bag Type
                  <form name="dropdown" action="/action_page.php">
                    <select v-model="productType">
                      <option>Mini Flap Bag</option>
                      <option>The Fae Bag</option>
                      <option>Gabbi Bag</option>
                      <option>Rantan Bag</option>
                      <option>Envelope Bag</option>
                      <option>Eva Shoulder Bag</option>
                      <option>Maze Bag</option>
                      <option>Mila Shoulder Bag</option>
                      <option>Quinn Phone Bag</option>
                      <option>Cloud Top Bag</option>
                    </select>
                  </form>
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
              <sup v-show="inputDate">
                  Please enter stock date!
              </sup>

              <div>Color</div>
              <div class="mb-6 flex justify-between">
                <label
                  class="checkbox rounded"
                  v-for="color in colors"
                  :key="color.id"
                  :style="{ background: color.id }"
                >
                  <input
                    type="checkbox"
                    :value="color.id"
                    v-model="productColor"
                  />
                </label>
              </div>
              <sup v-show="inputColor">
                  Please enter product color more than one!
                </sup>

              <div class="mb-6">
                <p class="">Description</p>
                <input
                  v-model="productDescreiption"
                  class="w-full h-40 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md break-words text-justify whitespace-normal"
                  type="text"
                  placeholder="Description..."
                />
              </div>
              <sup v-show="inputDescription">
                  Please enter description!
                </sup>
            </div>
          </form>
        </div>

        <div class="flex justify-center">
          <button
            class="bg-green-500 rounded-lg px-4 py-2 my-10"
            @click="addProduct"
          >
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
      colors: [
        { id: "#242423" },
        { id: "#7F8164" },
        { id: "#BF8B3F" },
        { id: "#D18E64" },
        { id: "#FFF3E4" },
        { id: "#E7DCD5" },
        { id: "#FEA46D" },
        { id: "#F9E37C" },
        { id: "#ffbfcb" },
        { id: "#ABC3C7" },
      ],
      enteredDate: "",
      check: false,
      url: "http://localhost:5000/products",
      inputName: false,
      inputPrice: false,
      inputColor: false,
      inputType: false,
      inputDate: false,
      inputDescription: false,
      products: [],
      productName: "",
      productPrice: null,
      productDescreiption: "",
      productType: "",
      productColor: [],
      productDate: "",
    };
  },

  methods: {
    // selectFile(e) {
    //   const file = e.target.files[0];
    //   this.urlData = URL.createObjectURL(file);
    // },

    checkColor() {
      this.check = !this.check;
    },

    submitFrom() {
      this.inputName = this.productName === "" ? true : false;
      this.inputPrice = this.productPrice === null ? true : false;
      this.inputColor = this.productColor === [] ? true : false;
      this.inputType = this.productType === "" ? true : false;
      this.inputDate = this.productDate === "" ? true : false;
      this.inputDescription = this.productDescreiption === "" ? true : false;
      this.addProduct();
      this.productName = "";
      this.productPrice = null;
      if(
        this.inputName ||
        this.inputPrice ||
        this.inputColor ||
        this.inputType ||
        this.inputDate ||
        this.inputDescription
      ){
        return;
      }
      this.inputPrice = parseInt(this.inputPrice);

    },

    async addProduct() {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: this.productName,
            // color: this.color.id,
            price: this.productPrice,
            date: this.productDate,
            description: this.productDescreiption,
            colorBag: this.productColor,
            type: this.productType,
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
};
</script>

<style scoped>
#preview img {
  width: 100%;
}

.checkbox {
  display: flex;
  cursor: pointer;
}

.checkbox > input {
  height: 30px;
  width: 30px;
  appearance: none;
  border-radius: 4px;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;
}

.checkbox > input:checked {
  border: 2px solid red;
}
sup{
  color: red;
}
</style>