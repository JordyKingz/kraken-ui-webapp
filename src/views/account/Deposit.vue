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
        <div class="max-w-6xl mt-5 mx-auto px-4 sm:px-6 lg:px-8">
          <div class="w-full bg-white px-2 py-3 align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
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
        <div class="block mt-5">
          <div v-if="user && user.payments &&  user.payments.length > 0" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col mt-2">
              <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                    <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                      Status
                    </th>
                    <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(activity, key) in user.payments" :key="key" class="bg-white">
                    <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div class="flex">
                        <a href="#" class="group inline-flex space-x-2 truncate text-sm">
                          <!-- Heroicon name: solid/cash -->
                          <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                          </svg>
                          <p class="text-gray-500 truncate group-hover:text-gray-900">
                            Deposit to account
                          </p>
                        </a>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      <span class="text-gray-900 font-medium">€{{ activity.amount }},-</span>
                      EURO
                    </td>
                    <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span v-if="activity.paid === '1'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          success
                        </span>
                      <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">
                          failed
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(activity.created_at) }}
                    </td>
                  </tr>

                  <!-- More items... -->
                  </tbody>
                </table>
                <!-- Pagination -->
                <nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" aria-label="Pagination">
                  <div class="hidden sm:block">
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">1</span>
                      to
                      <span class="font-medium">10</span>
                      of
                      <span class="font-medium">20</span>
                      results
                    </p>
                  </div>
                  <div class="flex-1 flex justify-between sm:justify-end">
                    <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Previous
                    </a>
                    <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div v-else>
            <img class="w-1/3 mx-auto mt-10" src="/assets/images/empty-state.svg" />
          </div>
        </div>
      </main>
    </div>

    <div class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
      <!--
        Notification panel, show/hide based on alert state.

        Entering: "transform ease-out duration-300 transition"
          From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          To: "translate-y-0 opacity-100 sm:translate-x-0"
        Leaving: "transition ease-in duration-100"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div v-if="error" class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                Something went wrong
              </p>
              <p class="mt-1 text-sm font-medium text-gray-500">
                {{  error.exception }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{  error.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button v-on:click="close" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="sr-only">Close</span>
                <!-- Heroicon name: solid/x -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
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
      id: this.$route.params.id,
      paymentId: this.$route.params.paymentId,
      activity: [],
      depositAmount: null,
      showMobileSidebar: false,
      error: this.$route.params.error,
      user: this.$store.getters.user,
    }
  },
  beforeMount: async function () {
    if (this.paymentId) {
      const dto = {
        paymentId: this.paymentId,
        bearer: sessionStorage.getItem('crypto.auth.bearer')
      }

      await axios.post(`${process.env.VUE_APP_SERVICE_URL}/deposit/status`, dto, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          if (response.data.payment.paid) {
            this.$router.push({name: 'dashboard', params: {id: this.id}});
          } else {
            this.error.exception = "Payment failed";
            this.error.message = "We didn't received the payment. Try again."
          }
        }
      }).catch(e => {
        this.$router.push({name: 'dashboard', params: {id: this.id}});
      });
    }
  },
  methods: {
    deposit: async function () {
      const dto = {
        depositAmount: `${this.depositAmount}.00`,
        bearer: sessionStorage.getItem('crypto.auth.bearer')
      }

      await axios.post(`${process.env.VUE_APP_SERVICE_URL}/deposit`, dto, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          window.location = response.data.url;
        }
      }).catch(e => {
        this.error = JSON.parse(e.request.response);
        console.log(this.error);
      });
    },
    toggleMobileSidebar: function () {
      this.showMobileSidebar = !this.showMobileSidebar;
    },
    formatDate: function(date) {
      return new Date(date).toLocaleDateString();
    }
  }
}
</script>

<style scoped>

</style>