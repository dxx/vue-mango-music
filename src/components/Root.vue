<template>
  <div class="root">
    <header class="app-header">
      <img :src="logo" class="app-logo" alt="logo" />
      <h1 class="app-title">Mango Music</h1>
    </header>
    <nav class="music-tab">
      <div class="tab-item">
        <router-link to="/recommend" class="router-link">
          <span>推荐</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ranking" class="router-link">
          <span>排行榜</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/singer" class="router-link">
          <span>歌手</span>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/search" class="router-link">
          <span>搜索</span>
        </router-link>
      </div>
    </nav>
    <div class="music-view">
      <router-view />
    </div>
    <music-player />
  </div>
</template>

<script>
  import MusicPlayer from "./play/MusicPlayer"

  import logo from "../assets/imgs/logo.png"
  import "../assets/stylus/reset.styl"
  import "../assets/stylus/font.styl"
  import "../assets/stylus/animation.styl"

  export default {
    name: "root",
    data() {
      return {
        logo
      }
    },
    components: {
      MusicPlayer
    }
  }
</script>

<style lang="stylus" scoped>
  .root
    width: 100%
    height: 100%
    color: #333333
    background-color: #F8F8FF
    .app-header
      height: 50px
      line-height: 50px
      text-align: center
      background-color: #FFA500
      .app-logo
        width: 30px
        height: 25px
        margin-top: -5px
        vertical-align: middle
      .app-title
        display: inline-block
        height: 50px
        margin-left: 6px
        font-size: 18px
        font-weight: 300
        color: #FFFFF0
    .music-tab
      display: flex
      height: 30px
      padding: 2px 0
      line-height: 30px
      color: rgba(0, 0, 0, .7)
      text-align: center
      background-color: #FFFFFF
      .tab-item
        flex: 1
    .music-view
      position: fixed
      top: 84px
      left: 0
      bottom: 0
      width: 100%
  .router-link
    display: block
    color: inherit
    text-decoration: none
    &.router-link-active
      color: #FFA500
      border-bottom: 2px solid #FFA500
</style>
