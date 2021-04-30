<template>
  <navbar />
  <div class="mx-44 py-10">
    <navProducts />

    <div class="grid grid-cols-2 my-12">
      <div id="preview">
        <div class="">
          <div class="bg-yellow-500 border-md"></div>
          <img v-if="url" :src="url" />
          <input type="file" @change="selectFile" />
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
            Product Name
            <input
              v-model="enteredName"
              class="ml-2 w-80 placeholder-gray-500 placeholder-opacity-50 focus:outline-none rounded focus:ring-purple-600 focus:border-transparent focus:ring-2 shadow-md"
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

</style>