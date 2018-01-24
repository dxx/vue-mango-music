<template>
  <transition name="pop">
    <div class="music-theme" v-show="show">
      <div class="header">
        主题中心
        <span class="cancel" @click="$emit('close')">取消</span>
      </div>
      <div class="theme-title">推荐主题</div>
      <div class="theme-container">
        <div class="theme-wrapper" v-for="theme in themes" @click="setCurrentTheme(theme.key)">
          <div class="theme-color" :style="{backgroundColor: theme.color, boxShadow: `0 0 3px ${theme.color}`}">
            <i class="icon-right" v-show="theme.key === currentTheme"></i>
          </div>
          <div>{{theme.name}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState, mapMutations} from "vuex"
  import {SET_THEME} from "../../store/mutation-types"
  import {theme, setThemeStyle} from "../../utils/theme"

  export default {
    name: "theme",
    props: {
      show: Boolean
    },
    data() {
      return {
        themes: [
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
        currentTheme: "theme"
      })
    },
    methods: {
      setCurrentTheme(key) {
        //  设置主题
        setThemeStyle(theme[key]);
        this.setTheme(key);
        //  关闭当前页面
        this.$emit('close');
      },
      ...mapMutations({
        "setTheme": SET_THEME
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .music-theme
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
    .theme-title
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
    .theme-container
      display: flex
      margin-top: 20px
      flex-wrap: wrap
      font-size: 14px
      .theme-wrapper
        flex: 0 0 33%
        width: 33%
        text-align: center
        padding-left: 10px
        margin-bottom: 10px
        box-sizing: border-box
        .theme-color
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
