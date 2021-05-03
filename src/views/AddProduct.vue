<template>
  <navbar />
  <div class="mx-44 py-10">
    <navProducts />

    <div class="grid grid-cols-2 my-12">
      <label
        class="border-2 border-blue-800 h-64 w-64 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-lg"
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

      <div class="">
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <div class="mb-6 flex justify-between">
                <p>Product Name</p>
                <input
                  v-model="enteredName"
                  class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                  type="text"
                  placeholder="Product Name"
                />
              </div>

              <div class="mb-6 flex justify-between">
                <div class="inline">Bag Type</div>
                <div>
                  <form
                    name="dropdown"
                    action="/action_page.php"
                    class="inline"
                  >
                    <select name="cars" id="cars">
                      <option value="volvo">Mini Flap Bag</option>
                      <option value="saab">The Fae Bag</option>
                      <option value="opel">Gabbi Bag</option>
                      <option value="audi">Rantan Bag</option>
                      <option value="audi">Envelope Bag</option>
                      <option value="audi">Eva Shoulder Bag</option>
                      <option value="audi">Maze Bag</option>
                      <option value="audi">Mila Shoulder Bag</option>
                      <option value="audi">Quinn Phone Bag</option>
                      <option value="audi">Cloud Top Bag</option>
                    </select>
                  </form>
                </div>
              </div>

              <div class="mb-6 flex justify-between">
                <div class="inline">Color</div>

                <div class="showColor inline">
                  <button
                    class="checkColor mx-1 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none focus:ring-opacity-50"
                    v-for="color in colors"
                    :key="color.id"
                    :style="{ background: color.id }"
                  ></button>
                </div>
              </div>

              <div class="mb-6 flex justify-between">
                <p class="inline">Price</p>
                <input
                  class="inline w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                  type="text"
                  placeholder="Price"
                />
              </div>

              <div class="mb-6 flex justify-between">
                <p class="inline">Will Be In Stock On</p>
                <input
                  class="border border-black rounded inline"
                  type="date"
                  v-model="enteredDate"
                />
              </div>

              <div class="mb-6 flex justify-between">
                <p class="inline">Description</p>
                <input
                  v-model="enteredName"
                  class="inline w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md break-words"
                  type="text"
                  placeholder="Product Name"
                />
              </div>
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
      url: null,
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
      urlData: "http://localhost:5000/products",
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
      productType: null,
      productColor: [],
    };
  },

  methods: {
    selectFile(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },

    submitFrom() {
      this.inputName = this.productName === "" ? true : false;
      this.inputPrice = this.productPrice === null ? true : false;
      this.inputColor = this.productColor === [] ? true : false;
      this.inputType = this.productType === null ? true : false;
      this.inputDate = this.enteredDate === "" ? true : false;
      this.inputDescription = this.productDescreiption === "" ? true : false;
      this.addP roduct();
      this.productName = "";
      this.productPrice = null;
    },

    async addProduct() {
      try {
        const res = await fetch(this.urlData, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: this.productName,
            color: this.productColor,
            price: this.productPrice,
            date: this.enteredDate,
            description: this.productDescreiption,
            colorBag: this.productColor,
          }),
        });

        const data = await res.json();
        this.products = [...this.products, data];
        this.productName = "";
        this.productPrice = null;
        this.productDescreiption = "";
        this.productType = null;
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

.checkColor {
  width: 30px;
  height: 30px;
}

.showColor {
  display: flex;
}
</style>