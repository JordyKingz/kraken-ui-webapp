<template>
  <div id="app" >
    <router-view @toggleIsBusy="toggleIsBusy"  />

    <Cookie
        v-if="showCookie"
        @setCookie="setCookie" />
  </div>
</template>
<script>
import Cookie from '@/components/Cookie'

export default {
  name: 'app',
  components: {
    Cookie
  },
  data: () => ({
    showCookie: true,
  }),
  beforeMount: function () {
    this.$store.dispatch("initTheme");

    const cookie = localStorage.getItem('crypto-bot.cookie');
    if (cookie)
      this.showCookie = !this.showCookie;
  },
  methods: {
    setCookie: function () {
      const date = new Date();
      localStorage.setItem('crypto-bot.cookie', `${date}`);
      this.showCookie = false;
    },
    toggleIsBusy: function (bool) {
      // bool ? this.$refs.isBusy.isBusy() :  this.$refs.isBusy.isBusyStop();
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
