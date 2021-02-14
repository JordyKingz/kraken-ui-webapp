<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div>
          <div class="mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Configure your bot to your preferences and start earning money.
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                There is always a risk that you lose your money. Only invest with money you can miss. You only pay 7.5% fee over profit made transactions.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <div>
            <div class="block">
              <label :for="amount" class="text-sm font-medium text-gray-700">You can spend €{{balance}},-</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  €
                </span>
                <input type="text" v-model="amount" required class="flex-1 min-w-0 block border w-full px-3 py-2 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300" placeholder="Enter € amount">
              </div>
              <p v-if="error.amount" class="mt-2 text-sm text-red-600">{{ error.amount }}</p>
            </div>
            <div v-if="Number(amount) > 0 && Number(amount) <= Number(balance)" class="block mt-3">
              <label :for="cryptocurrency" class="text-sm font-medium text-gray-700">Which cryptocurrency you want to trade?</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <select v-on:change="calculateAmount" v-model="cryptocurrency" class="flex-1 min-w-0 block border w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300">
                  <option disabled readonly value="null">Select Cryptocurrency</option>
                  <option value="BTC">Bitcoin</option>
                  <option value="ETH">Ethereum</option>
                  <option value="XRP">Ripple</option>
                  <option value="ADA">Cardano</option>
                </select>
              </div>
              <p v-if="error.amount" class="mt-2 text-sm text-red-600">{{ error.amount }}</p>
            </div>
            <div v-if="amountInCrypto" class="block mt-3">
              <p class="block text-sm">{{cryptocurrency}} price: {{cryptoPrice}}</p>
              <label :for="amountInCrypto" class="text-sm font-medium text-gray-700">You'll purchase: {{amountInCrypto}} {{cryptocurrency}}</label>
            </div>
            <div v-if="amountInCrypto" class="block mt-3">
              <label :for="sellHighValue" class="text-sm font-medium text-gray-700">Set your sell high percentage</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  %
                </span>
                <input type="text" v-model="sellHighPercentage" required class="flex-1 min-w-0 block border w-full px-3 py-2 rounded-none rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300" placeholder="Enter € amount">
              </div>
              <p v-if="error.sellHighPercentage" class="mt-2 text-sm text-red-600">{{ error.sellHighPercentage }}</p>
            </div>
            <div v-if="sellHighValue" class="block mt-3">
              <p class="block text-sm">You'll sell your {{amountInCrypto}} {{cryptocurrency}} when {{cryptocurrency}} reach {{sellHighValue}}</p>
              <p class="block text-sm">Transferred back to your account: €{{transferAmount}}.</p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <button v-on:click="createBot" :disabled="submitDisabled"  class="w-full inline-flex disabled:opacity-50 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
            Activate bot
          </button>
          <button v-on:click="closeModal" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "trade.modal.vue",
  props: {
    balance: String,
  },
  data: function () {
    return {
      amount: 0,
      cryptocurrency: null,
      amountInCrypto: null,
      cryptoPrice: null,
      sellHighPercentage: null,
      sellHighValue: null,
      transferAmount: null,
      fee: null,
      submitDisabled: true,
      error: {
        amount: null,
        sellHighPercentage: null,
      }
    }
  },
  methods: {
    createBot: function () {
    // TODO Implement
      console.log('clicked');
    },
    calculateAmount: async function () {
      const pair = `${this.cryptocurrency}EUR`;
      await axios.get(`${process.env.VUE_APP_KRAKEN_API}${pair}`).then(response => {

        let result = null;
        switch (this.cryptocurrency) {
          case "BTC":
            result = response.data.result.XXBTZEUR.c[0];
            break;
          case "ETH":
            result = response.data.result.XETHZEUR.c[0];
            break;
          case "XRP":
            result = response.data.result.XXRPZEUR.c[0];
            break;
          case "ADA":
            result = response.data.result.ADAEUR.c[0];
            break;
        }
        this.cryptoPrice = result;
        this.amountInCrypto = (this.amount / Number(result)).toFixed(5);
      });
    },
    calculateFeeAndProfit: async function () {
      // Calculate fee
      // this.fee = ((this.amountInCrypto * this.sellHighValue) / 100 * 2.5).toFixed(2);
      // total profit transferred back to account
      const amount = ((this.amountInCrypto * this.sellHighValue)).toFixed(2);
      const profit = (amount - this.cryptoPrice).toFixed(2);

      this.fee = (profit / 100 * 7.5).toFixed(2); // fee

      this.transferAmount = ((this.amountInCrypto * this.sellHighValue) - this.fee).toFixed(2);
    },
    calculatePercentage: async function () {
      if (this.sellHighPercentage < 100 && this.sellHighPercentage > 0) {
        if (this.sellHighPercentage < 10) {
          const percentage = this.sellHighPercentage.replace('.', '');
          const multiplier = `1.0${percentage}`;
          this.sellHighValue = (Number(this.cryptoPrice) * multiplier).toFixed(2);
        } else {
          const percentage = this.sellHighPercentage.replace('.', '');
          const multiplier = `1.${percentage}`;
          this.sellHighValue = (Number(this.cryptoPrice) * multiplier).toFixed(2);
        }
      } else if (this.sellHighPercentage > 0 && this.sellHighPercentage >= 100) {
        this.sellHighValue = (Number(this.cryptoPrice) + Number(this.cryptoPrice)).toFixed(2);
      } else if (this.sellHighPercentage < 0) {
        this.error.sellHighPercentage = "What are you doing?";
      }

      if (this.sellHighValue !== null)
        await this.calculateFeeAndProfit();
    },
    closeModal: function () {
      this.$emit('closeModal');
    }
  },
  watch: {
    amount: {
      handler: async function () {
        if (this.amount < 0) {
          this.error.amount = "What are you doing?"
          return;
        }

        if (Number(this.amount) > Number(this.balance)) {
          this.error.amount = "Not enough balance in your account."
        } else {
          this.error.amount = null;
        }

        if (this.cryptoPrice > 0)
          await this.calculateAmount();
        if (this.sellHighPercentage > 0)
          await this.calculatePercentage();
      },
      deep: true,
    },
    sellHighPercentage: {
      handler: function () {
        this.error.sellHighPercentage = null;
        this.sellHighValue = Number(this.cryptoPrice);

        if (this.sellHighPercentage < 100 && this.sellHighPercentage > 0) {
          if (this.sellHighPercentage < 10) {
            const percentage = this.sellHighPercentage.replace('.', '');
            const multiplier = `1.0${percentage}`;
            this.sellHighValue = (Number(this.cryptoPrice) * multiplier).toFixed(2);
          } else {
            const percentage = this.sellHighPercentage.replace('.', '');
            const multiplier = `1.${percentage}`;
            this.sellHighValue = (Number(this.cryptoPrice) * multiplier).toFixed(2);
          }
        } else if (this.sellHighPercentage > 0 && this.sellHighPercentage >= 100) {
          this.sellHighValue = (Number(this.cryptoPrice) + Number(this.cryptoPrice)).toFixed(2);
        } else if (this.sellHighPercentage < 0) {
          this.error.sellHighPercentage = "What are you doing?";
        }

        if (this.sellHighValue !== null)
          this.calculateFeeAndProfit();

        return this.sellHighValue;
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>