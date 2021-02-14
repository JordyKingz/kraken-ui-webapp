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
        <Header :balance="user.balance" @deposit="deposit" />
        <div class="mt-8">
          <div v-if="user && user.portfolio && user.portfolio.length > 0" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-lg leading-6 font-medium text-gray-900">Portfolio overview</h2>
            <div  class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="(portfolio, key) in user.portfolio" :key="key" class="bg-white overflow-hidden shadow rounded-lg">
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate">
                          {{ portfolio.name }}
                        </dt>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            {{ portfolio.amount }}
                          </div>
                        </dd>
                        <dd>
                          <div class="text-lg font-medium text-gray-900">
                            €{{ portfolio.value }},-
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h2 class="text-lg leading-6 font-medium text-gray-900">Empty portfolio</h2>
            <img class="w-1/3 mx-auto mt-10" src="/assets/images/empty-state.svg" />

            <div class="block mt-10">
              <button v-on:click="toggleTradeModal" type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                Start trading
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    <TradeModal
        v-if="showTradeModal"
        :balance="user.balance"
        @closeModal="toggleTradeModal"  />
  </div>
</template>

<script>
import axios from "axios";

import MobileSidebar from '@/components/layout/Sidebar.mobile'
import Sidebar from '@/components/layout/Sidebar.desktop'
import TopHeader from '@/components/layout/TopHeader'
import Header from '@/components/layout/Header'
import TradeModal from '@/components/modals/Trade.modal'

export default {
  name: "portfolio.cp.vue",
  components: {
    MobileSidebar,
    Sidebar,
    TopHeader,
    Header,
    TradeModal
  },
  data: function () {
    return {
      id: this.$route.params.id,
      user: {},
      showMobileSidebar: false,
      showTradeModal: true,
      sessionToken: sessionStorage.getItem('crypto.auth.bearer'),
    }
  },
  mounted: async function () {
    if (this.sessionToken === undefined || this.sessionToken === null) {
      this.$router.push({ name: 'sign-in', params: {
          error: {
            exception: "Token is not valid.",
            message:  "Your authentication token expired."
          }
        }});
    }

    await this.fetchUserData();
  },
  methods: {
    fetchUserData: async function () {
      await axios.get(`${process.env.VUE_APP_SERVICE_URL}/profile/${this.sessionToken}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 200) {
          this.user = response.data.user;
        }
      }).catch(e => {
        if (e.request.status === 404) {
          // No user found with token. Return to sign-in page
          this.$router.push({ name: 'sign-in', params: {
              error: {
                exception: "Token is not valid.",
                message:  "Your authentication token expired."
              }
            }});
        }
        this.error = JSON.parse(e.request.response);
      });
    },
    deposit: function () {
      this.$store.state.user = this.user;
      this.$router.push({ name: 'account.deposit', params: {id: this.id}} );
    },
    toggleMobileSidebar: function () {
      this.showMobileSidebar = !this.showMobileSidebar;
    },
    toggleTradeModal: function () {
      this.showTradeModal = !this.showTradeModal;
    },
    formatDate: function(date) {
      return new Date(date).toLocaleDateString();
    },
  }
}
</script>

<style scoped>

</style>