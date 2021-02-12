<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <MobileSidebar
        :visible="showMobileSidebar"
        @toggleMobileSidebar="toggleMobileSidebar"
    />
    <Sidebar />
    <div class="flex-1 overflow-auto focus:outline-none" tabindex="0">
      <TopHeader
          @toggleMobileSidebar="toggleMobileSidebar"
      />
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <Header />
        <div class="mt-8">
          <h2  class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Transactions
          </h2>
          <div class="block">
              <img class="w-1/3 mx-auto mt-10" src="/assets/images/empty-state.svg" />
              <div class="block mt-10">
                <button v-on:click="deposit" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Deposit money
                </button>
              </div>
          </div>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
import MobileSidebar from '@/components/layout/Sidebar.mobile'
import Sidebar from '@/components/layout/Sidebar.desktop'
import TopHeader from '@/components/layout/TopHeader'
import Header from '@/components/layout/Header'

export default {
  name: "deposit.account.vue",
  components: {
    MobileSidebar,
    Sidebar,
    TopHeader,
    Header
  },
  data () {
    return {
      activity: [],
      showMobileSidebar: false,
    }
  },
  methods: {
    deposit: function () {
      this.$router.push({ name: 'account.deposit'} );
    },
    toggleMobileSidebar: function () {
      this.showMobileSidebar = !this.showMobileSidebar;
    }
  }
}
</script>

<style scoped>

</style>