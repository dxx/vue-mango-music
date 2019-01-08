<template>
  <div class="loading-container" :style="displayStyle">
    <div class="loading-wrapper">
      <img :src="loadingImg" width="18px" height="18px" alt="loading"/>
      <div class="loading-title">{{title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      show: {
        type: Boolean,
        required: true
      },
      title: String
    },
    data() {
      return {
        loadingImg: require("./loading.gif")
      }
    },
    computed: {
      displayStyle() {
        return {display: this.show === true ? "" : "none"};
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .loading-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 999
    display: flex
    justify-content: center
    align-items: center
    .loading-wrapper
      display: inline-block
      font-size: 12px
      text-align: center
      .loading-title
        margin-top: 5px
</style>
