<template>
  <div id="app">
    <root />
  </div>
</template>

<script>
  import Root from "./components/Root"

  export default {
    name: 'app',
    components: {
      Root
    }
  }
</script>

<style lang="stylus">
  html, body, #app
    width: 100%
    height: 100%
  body
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    margin: 0
    padding: 0
  ::-webkit-scrollbar
    width: 0
    height: 0
</style>
