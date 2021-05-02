<template>
  <navbar />
  <div class="mx-44 py-10">
    <navProducts />

    <div class="grid grid-cols-2 my-12">
      <div id="preview">
        <div class="">
          <div class="border-md"></div>
          <img v-if="url" :src="url" />
          <input type="file" @change="selectFile" class="text-center ml-20" />
        </div>
      </div>

      <div class="flex justify-end">
        <form>
          <div class="mb-6">
            <p>
              Product Name
              <input
                v-model="enteredName"
                class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                type="text"
                placeholder="Product Name"
              />
            </p>
          </div>

          <div class="mb-6">
            <p>
              Type
              <input
                v-model="enteredName"
                class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                type="text"
                placeholder="Product Name"
              />
            </p>
          </div>

          <div class="mb-6">
            <p>Color</p>
            <label
              v-for="color in colors"
              :key="color.id"
              class="label-checkbox"
              :class="{ checked: color.checked }"
              :for="color.id.toLowerCase()"
              :style="{ background: color.id}"
            >
              <input
                type="checkbox"
                v-model="color.checked"
                class="check-color"
                :id="color.id.toLowerCase()"
                :value="color.id"
                
              />
            </label>
          </div>

          <div class="mb-6">
            <p>
              Price
              <input
                v-model="enteredName"
                class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                type="text"
                placeholder="Product Name"
              />
            </p>
          </div>

          <div class="mb-6">
            <p>
              Will Be In Stock On
              <input
                v-model="enteredName"
                class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
                type="text"
                placeholder="Product Name"
              />
            </p>
          </div>

          <div class="mb-6">
            <p>
              Description
              <input
                v-model="enteredName"
                class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md break-words"
                type="text"
                placeholder="Product Name"
              />
            </p>
          </div>
        </form>
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
        { id: "#BF8B3F" },
        { id: "#7F8164" },
        { id: "#ffbfcb" },
        { id: "#ABC3C7" },
        { id: "#FFF3E4" },
        { id: "#D18E64" },
      ],
    };
  },
  methods: {
    selectFile(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
  },
};
</script>

<style scoped>
#preview img {
  width: 80%;
}

.label-checkbox {
  margin-right: 0.87rem;
  margin-left: auto;
  border: 1px solid #4273de;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 10px;
  text-align: center;
  display: inline-block;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}

.check-color {
  visibility: hidden;
  position: absolute;
  right: 0;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.checked {
  color: #000000;
}

.checked::before {
  content: "✔";
}
</style>