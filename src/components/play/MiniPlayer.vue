<template>
  <transition name="mini-translate">
    <div class="mini-player skin-mini-player" v-show="!showStatus" @click="handleShow">
      <div class="player-img rotate" :style="imgStyle">
        <img :src="img" :alt="song.name"/>
      </div>
      <div class="player-center">
        <div class="progress-wrapper">
          <progress-bar :progress="progress" :disableButton="true" />
        </div>
        <span class="song">
          {{song.name}}
        </span>
        <span class="singer">
          {{song.singer}}
        </span>
      </div>
      <div class="player-right">
        <i :class="playButtonClass" @click.stop="playOrPause"></i>
        <i class="icon-next ml-10" @click.stop="handleNext"></i>
      </div>
    </div>
  </transition>
</template>

<script>
  import ProgressBar from "./ProgressBar"

  export default {
    name: "mini-player",
    props: {
      showStatus: Boolean,
      playStatus: Boolean,
      song: Object,
      progress: Number
    },
    computed: {
      img() {
        return this.song.img ? this.song.img : require('../../assets/imgs/music.png')
      },
      imgStyle() {
        let style = {};
        if (this.playStatus === true) {
          style["WebkitAnimationPlayState"] = "running";
          style["animationPlayState"] = "running";
        } else {
          style["WebkitAnimationPlayState"] = "paused";
          style["animationPlayState"] = "paused";
        }
        return style;
      },
      playButtonClass() {
        return this.playStatus === true ? "icon-pause" : "icon-play";
      }
    },
    methods: {
      handleShow() {
        if (this.song.url) {
          // 显示播放组件
          this.$emit("showPlayer");
        }
      },
      playOrPause() {
        if (this.song.url) {
          // 播放或暂停
          this.$emit("playOrPause");
        }
      },
      handleNext() {
        if (this.song.url) {
          // 下一首
          this.$emit("next");
        }
      }
    },
    components: {
      ProgressBar
    }
  }
</script>

<style lang="stylus" scoped>
  .mini-player
    position: fixed
    left: 0
    bottom: 0
    z-index: 1000
    width: 100%
    height: 54px
    /*background-color: #FFFFFF*/
    &.mini-translate-enter-active, &.mini-translate-leave-active
      transition: transform .3s
      transform: translate3d(0, 0, 0)
    &.mini-translate-enter, &.mini-translate-leave-to
      transform: translate3d(0, 100%, 0)
    .player-img
      position: absolute
      width: 48px
      height: 48px
      left: 10px
      top: -6px
      /*border: 2px solid #EEEEEE*/
      border-radius: 50%
      img
        width: 100%
        height: @width
        border-radius: 50%
    .player-center
      height: 54px
      padding: 8px 15px 0 68px
      box-sizing: border-box
      span
        display: block
      .song, .singer
        max-width: 220px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .song
        padding-top: 5px
        font-size: 14px
      .singer
        margin-top: 2px
        font-size: 12px
        /*color: rgba(0, 0, 0, .7)*/
      .progress-wrapper
        .progress-bar
          height: 2px
          /*background-color: rgba(0, 0, 0, .1)*/
    .player-right
      position: absolute
      top: 15px
      right: 15px
      padding: 1px
      /*color: #FFD700*/
      font-size: 26px
      .ml-10
        margin-left: 10px
</style>
