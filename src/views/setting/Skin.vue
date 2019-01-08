<template>
  <transition name="pop">
    <div class="music-skin" v-show="show">
      <div class="header">
        皮肤中心
        <span class="cancel" @click="$emit('close')">取消</span>
      </div>
      <div class="skin-title">推荐皮肤</div>
      <div class="skin-container">
        <div class="skin-wrapper" v-for="skin in skins" @click="setCurrentSkin(skin.key)" :key="skin.key">
          <div class="skin-color" :style="{backgroundColor: skin.color, boxShadow: `0 0 3px ${skin.color}`}">
            <i class="icon-right" v-show="skin.key === currentSkin"></i>
          </div>
          <div>{{skin.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import { SET_SKIN } from "../../store/mutation-types"
  import { skin, setSkinStyle } from "../../util/skin"

  export default {
    name: "skin",
    props: {
      show: Boolean
    },
    data() {
      return {
        skins: [
          {key: "mangoYellow", name: "芒果黄", color: "#FFD700"},
          {key: "coolBlack", name: "炫酷黑", color: "#212121"},
          {key: "kuGouBlue", name: "酷狗蓝", color: "#2CA2F9"},
          {key: "netBaseRed", name: "网易红", color: "#D43C33"},
          {key: "qqGreen", name: "QQ绿", color: "#31C27C"}
        ]
      }
    },
    computed: {
      ...mapState({
        currentSkin: "skin"
      })
    },
    methods: {
      setCurrentSkin(key) {
        //  设置皮肤
        setSkinStyle(skin[key]);
        this.setSkin(key);
        //  关闭当前页面
        this.$emit('close');
      },
      ...mapMutations({
        "setSkin": SET_SKIN
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .music-skin
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: @width
    z-index: 9999
    color: #FFFFFF
    background: url("../../assets/imgs/play_bg.jpg") no-repeat center
    background-size: cover
    &:after
      content: ""
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: -1
      background-color: rgba(0, 0, 0, .3)
    &.pop-enter-active, &.pop-leave-active
      transition: transform .3s
      transform: translate3d(0, 0, 0)
    &.pop-enter, &.pop-leave-to
      transform: translate3d(0, 100%, 0)
    .header
      height: 50px
      line-height: 50px
      text-align: center
      font-size: 18px
      position: relative
      .cancel
        position: absolute
        right: 15px
        font-size: 16px
    .skin-title
      height: 15px
      line-height: 15px
      padding-left: 15px
      font-size: 15px
      position: relative
      &:before
        content: ""
        position: absolute
        left: 0
        width: 3px
        height: 100%
        background-color: #FAEBD7
    .skin-container
      display: flex
      margin-top: 20px
      flex-wrap: wrap
      font-size: 14px
      .skin-wrapper
        flex: 0 0 32%
        width: 32%
        text-align: center
        padding-left: 4%
        margin-bottom: 10px
        box-sizing: border-box
        .skin-color
          padding-bottom: 110%
          margin-bottom: 5px
          box-shadow: 0 0 3px #FFFFFF
          position: relative
          .icon-right
            position: absolute
            right: 5px
            bottom: 5px
            font-size: 20px
</style>
