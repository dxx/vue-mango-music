<template>
  <transition name="toast-fade" >
    <div class="toast-wrapper" v-show="show">
      <div class="toast-content">
        {{content}}
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "toast",
    props: {
      show: Boolean,
      content: String
    }
  }
</script>

<style lang="stylus" scoped>
  .toast-wrapper
    position: fixed
    bottom: 70px
    z-index: 99999
    width: 100%
    text-align center
    color: #FFFFFF
    font-size: 14px
    transform: translateZ(0)
    .toast-content
      display: inline-block
      padding: 8px 15px
      border-radius: 3px
      background-color: rgba(0, 0, 0, 0.9)

  .toast-fade-enter-active, .toast-fade-leave-active
    transition: opacity .5s linear
    opacity: 1
  .toast-fade-enter, .toast-fade-leave-to
    opacity: 0
</style>
