<template>
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow bg-purple-800 pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <h1 class="text-2xl text-white font-medium">Crypto trader</h1>
        </div>
        <nav class="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
          <div class="px-2 space-y-1">
            <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" -->
            <router-link :to="{name: 'dashboard', params: {id: id}}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-purple-100 hover:text-white hover:bg-purple-600" aria-current="page">
              <!-- Heroicon name: outline/home -->
              <svg class="mr-4 h-6 w-6 text-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </router-link>

            <router-link :to="{name: 'portfolio', params: {id: id}}" class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-purple-100 hover:text-white hover:bg-purple-600">
              <!-- Heroicon name: outline/credit-card -->
              <svg class="mr-4 h-6 w-6 text-purple-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Portfolio
            </router-link>

          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar.layout.vue",
  data: function () {
    return {
      id: sessionStorage.getItem('crypto.auth.id'),
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #8b5cf6;
  color: #FFFFFF;
}
</style>