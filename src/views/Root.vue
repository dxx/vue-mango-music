<template>
  <div class="root skin-root">
    <header class="app-header skin-app-header">
      <i class="icon-et-more app-more" @click="menuShow = true"></i>
      <img :src="logo" class="app-logo" alt="logo" />
      <h1 class="app-title">Mango Music</h1>
    </header>
    <nav class="music-tab skin-music-tab">
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
    <music-menu :show="menuShow" @closeMenu="menuShow = false"/>
  </div>
</template>

<script>
  import MusicPlayer from "./play/MusicPlayer"
  import MusicMenu from "./setting/Menu"

  import logo from "../assets/imgs/logo.png"
  import "../assets/stylus/reset.styl"
  import "../assets/stylus/font.styl"
  import "../assets/stylus/animation.styl"

  export default {
    name: "root",
    data() {
      return {
        logo,
        menuShow: false
      }
    },
    components: {
      MusicPlayer,
      MusicMenu
    }
  }
</script>

<style lang="stylus" scoped>
  .root
    width: 100%
    height: 100%
    /*color: #333333*/
    /*background-color: #F8F8FF*/
    .app-header
      height: 50px
      line-height: 50px
      text-align: center
      position: relative
      /*background-color: #FFA500*/
      .app-more
        position: absolute
        top: 15px
        left: 15px
        font-size: 20px
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
        /*color: #FFFFF0*/
    .music-tab
      display: flex
      height: 30px
      padding: 2px 0
      line-height: 30px
      text-align: center
      /*color: rgba(0, 0, 0, .7)*/
      /*background-color: #FFFFFF*/
      .tab-item
        flex: 1
    .music-view
      position: fixed
      top: 84px
      left: 0
      bottom: 54px
      width: 100%
  .router-link
    display: block
    color: inherit
    text-decoration: none
    /*&.router-link-active
      color: #FFA500
      border-bottom: 2px solid #FFA500*/
</style>
