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
        <div class="block mt-5 pl-5 pr-5">
          <div class="border border-purple-100 w-full bg-white px-2 py-3">
            <div>
              <h2 class="max-w-6xl mx-auto text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                iDeal payment
              </h2>
              <div class="w-2/6 m-auto text-center">
                <label :for="depositAmount" class="text-sm font-medium text-gray-700">Enter a valid &euro; amount</label>
                <div class="block">
                  <input type="text" v-model="depositAmount" class="mt-3 py-3 px-3 rounded-md border border-gray-300 text-blue-900 placeholder-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" placeholder="Enter € amount" aria-invalid="true" aria-describedby="email-error">
                </div>
                <p class="mt-5 text-sm text-blue-600" id="email-error">Payments between €5,- and €10.000,- are accepted.</p>
              </div>
              <div v-if="depositAmount >= 5 && depositAmount <= 10000" class="block mt-8">
                <button v-on:click="deposit" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Deposit money
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="mt-8">
            <h2  class="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Transactions
            </h2>
            <img class="w-1/3 mx-auto mt-10" src="/assets/images/empty-state.svg" />
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
import axios from "axios";

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
      depositAmount: null,
      showMobileSidebar: false,
      error: this.$route.params.error,
    }
  },
  methods: {
    deposit: async function () {
      const dto = {
        depositAmount: `${this.depositAmount}.00`,
        bearer: sessionStorage.getItem('crypto.auth.bearer')
      }

      console.log(JSON.stringify(dto));

      await axios.post(`${process.env.VUE_APP_SERVICE_URL}/deposit`, dto, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data.url);

          window.location = response.data.url;
          // const code = sessionStorage.getItem('crypto.auth.id');
          // this.$router.push({name: 'dashboard', params: {id: code}});
        }
      }).catch(e => {
        this.error = JSON.parse(e.request.response);
        console.log(this.error);
      });
    },
    toggleMobileSidebar: function () {
      this.showMobileSidebar = !this.showMobileSidebar;
    }
  }
}
</script>

<style scoped>

</style>