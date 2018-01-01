<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .w200 {
    width: 200px;
  }
  .disable-mask {
    overflow: hidden;
    background-color: rgba(0, 0, 0, .1);
  }
  .btn.px-btn {
    padding: 4px 15px;
    border-radius: 2px;
  }
  input:disabled {
    background-color: #fff;
  }
</style>
