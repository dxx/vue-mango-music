<template>
  <div>
    <transition name="fade">
      <div class="bottom-container" v-show="show" @click="close">
        <div class="bottom-wrapper">
          <div class="item" @click="showSetting(true)">
            皮肤中心
          </div>
          <div class="item-close" @click="close">
            关闭
          </div>
        </div>
      </div>
    </transition>
    <skin :show="skinShow" @close="showSetting(false)"/>
  </div>
</template>

<script>
  import Skin from "./Skin"

  export default {
    name: "music-menu",
    props: {
      show: Boolean
    },
    data() {
      return {
        skinShow: false
      }
    },
    methods: {
      close() {
        this.$emit('closeMenu');
      },
      showSetting(status) {
        this.close();
        // menu关闭后打开设置
        setTimeout(() => {
          this.skinShow = status;
        }, 300);
      }
    },
    components: {
      Skin
    }
  }
</script>

<style lang="stylus" scoped>
  .bottom-container
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: @width
    z-index: 9999
    background-color: rgba(0, 0, 0, .7)
    &.fade-enter-active, &.fade-leave-active
      transition: opacity .3s
      transform: translate3d(0, 0, 0)
      opacity: 1
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .bottom-wrapper
      position: absolute
      bottom: 0
      width: 100%
      text-align: center
      font-size: 15px
      color: #333333
      background-color: #EEEEEE
      div
        height: 40px
        line-height: 40px
        background-color: #FFFFFF
      .item-close
        margin-top: 10px
</style>
