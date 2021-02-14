<template>
  <div class="bg-white shadow">
    <div class="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
      <div class="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
        <div class="flex-1 min-w-0">
          <!-- Profile -->
          <div class="flex items-center">
            <div>
              <div class="flex items-center">
                <h1 class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  Welcome
                </h1>
              </div>
              <div class="flex items-center">
                <h3 class="ml-3 text-1xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  Available balance: €{{balance}},-
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex space-x-3 md:mt-0 md:ml-4">
          <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Withdraw money
          </button>
          <button v-on:click="deposit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Deposit money
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "header.layout.vue",
  props: {
    balance: String,
  },
  methods: {
    deposit: function () {
      this.$emit('deposit');
    }
  }
}
</script>

<style scoped>

</style>