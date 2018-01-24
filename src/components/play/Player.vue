<template>
  <div class="player-container">
    <transition name="player-rotate">
      <div class="player" v-show="showStatus">
        <div class="header">
              <span class="header-back" @click="hidePlayer">
                <i class="icon-back"></i>
              </span>
          <div class="header-title">
            {{song.name}}
          </div>
        </div>
        <div class="singer-top">
          <div class="singer">
            <div class="singer-name">{{song.singer}}</div>
          </div>
        </div>
        <div class="singer-middle">
          <div class="singer-img" ref="singerImg">
            <img :src="playBg" :alt="song.name" @load="handleLoad"/>
          </div>
        </div>
        <div class="singer-bottom">
          <div class="controller-wrapper">
            <div class="progress-wrapper">
              <span class="current-time">{{currentTime | getTime}}</span>
              <div class="play-progress">
                <progress-bar :progress="playProgress"
                              :disableClick="false" @click="click"
                              :disableDrag="false" @drag="drag" @dragEnd="dragEnd"/>
              </div>
              <span class="total-time">{{song.duration | getTime}}</span>
            </div>
            <div class="play-wrapper">
              <div class="play-model-button" @click="changePlayMode">
                <i :class="'icon-' + this.playModes[this.currentPlayMode] + '-play'"></i>
              </div>
              <div class="previous-button" @click="previous">
                <i class="icon-previous"></i>
              </div>
              <div class="play-button" @click="playOrPause">
                <i :class="playButtonClass"></i>
              </div>
              <div class="next-button" @click="next">
                <i class="icon-next"></i>
              </div>
              <div class="play-list-button" @click="showPlayList">
                <i class="icon-play-list"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="player-bg" ref="playerBg"></div>
        <audio ref="audio"></audio>
      </div>
    </transition>
    <mini-player :song="song" :progress="playProgress" :showStatus="showStatus" :playStatus="playStatus"
                 @showPlayer="showPlayer"
                 @playOrPause="playOrPause"
                 @next="next"/>
    <toast :show="toastShow" :content="toastContent"/>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex"
  import {SHOW_PLAYER, CHANGE_SONG} from "../../store/mutation-types"
  import Toast from "@/common/Toast"
  import MiniPlayer from "./MiniPlayer"
  import ProgressBar from "./ProgressBar"
  import {Song} from "@/model/song"

  export default {
    name: "player",
    props: ["currentIndex"],
    data() {
      return {
        /* song: new Song(
          201773975,
          "000OFXjz0Nljbh",
          "变坏",
          "https://y.gtimg.cn/music/photo_new/T002R300x300M000002QIEJo1LUz7p.jpg?max_age=2592000",
          244,
          "http://dl.stream.qqmusic.qq.com/C400000OFXjz0Nljbh.m4a?vkey=7A7C2C0079A3E28FFFE4F42FECBCA0EEF0E9FED1D896EC971A91ED8BB045D781518ECD8DFED3F8A4184B624CAAED6CDD0257C608A9E9E457&guid=3655047200&fromtag=66",
          "渔圈/欧阳朵"
        ), */
        playStatus: false,
        currentTime: 0,
        playProgress: 0,
        currentPlayMode: 0,
        toastShow: false,
        toastContent: ""
      };
    },
    computed: {
      song() {
        // 计算state中的歌曲
        let song = this.$store.state.song;
        if (song.url) {
          // 如果有歌曲地址设置audio的src
          if (this.audioDOM) {
            this.audioDOM.src = song.url;
            // 加载资源，ios需要调用此方法
            this.audioDOM.load();
          }
          return song;
        } else {
          return new Song(0, "", "", "", 0, "", "");
        }
      },
      playBg() {
        return this.song.img ? this.song.img : require("@/assets/imgs/play_bg.jpg");
      },
      playButtonClass() {
        return this.playStatus === true ? "icon-pause" : "icon-play";
      },
      // 映射showStatus到state中的showStatus
      ...mapState(["showStatus"])
    },
    methods: {
      /**
       * 开始旋转图片
       */
      _startImgRotate() {
        if (this.$refs.singerImg.className.indexOf("rotate") === -1) {
          this.$refs.singerImg.classList.add("rotate");
        } else {
          this.$refs.singerImg.style["webkitAnimationPlayState"] = "running";
          this.$refs.singerImg.style["animationPlayState"] = "running";
        }
      },
      /**
       * 停止旋转图片
       */
      _stopImgRotate() {
        this.$refs.singerImg.style["webkitAnimationPlayState"] = "paused";
        this.$refs.singerImg.style["animationPlayState"] = "paused";
      },
      handleLoad(e) {
        this.$refs.playerBg.style.backgroundImage = `url("${e.currentTarget.src}")`;
      },
      /**
       * 播放或暂停
       */
      playOrPause() {
        if (this.playStatus === false) {
          // 表示第一次播放
          if (this.first === undefined) {
            this.audioDOM.src = this.song.url;
            this.first = true;
          }
          this.audioDOM.play();
          this._startImgRotate();

          this.playStatus = true;
        } else {
          this.audioDOM.pause();
          this._stopImgRotate();

          this.playStatus = false;
        }
      },
      /**
       * 上一首
       */
      previous() {
        // 从store中获取歌曲播放列表
        let playSongs = this.$store.state.songs;
        if (playSongs.length > 0 && playSongs.length !== 1) {
          let currentIndex = this.currentIndex;
          if (this.currentPlayMode === 0) {  // 列表播放
            if (currentIndex === 0) {
              currentIndex = playSongs.length - 1;
            } else {
              currentIndex = currentIndex - 1;
            }
          } else if (this.currentPlayMode === 1) {  // 随机播放
            currentIndex = parseInt(Math.random() * playSongs.length, 10);
          } else {  // 单曲循环
            this.audioDOM.play();
            return;
          }
          this.playProgress = 0;
          this.changeCurrentSong(playSongs[currentIndex]);
          // 调用父组件修改当前歌曲位置
          this.$emit("changeCurrentIndex", currentIndex);
        }
      },
      /**
       * 下一首
       */
      next() {
        let playSongs = this.$store.state.songs;
        if (playSongs.length > 0 && playSongs.length !== 1) {
          let currentIndex = this.currentIndex;
          if (this.currentPlayMode === 0) {  // 列表播放
            if (currentIndex === playSongs.length - 1) {
              currentIndex = 0;
            } else {
              currentIndex = currentIndex + 1;
            }
          } else if (this.currentPlayMode === 1) {  // 随机播放
            currentIndex = parseInt(Math.random() * playSongs.length, 10);
          } else {  // 单曲循环
            this.audioDOM.play();
            return;
          }
          this.playProgress = 0;
          this.changeCurrentSong(playSongs[currentIndex]);
          // 调用父组件修改当前歌曲位置
          this.$emit("changeCurrentIndex", currentIndex);
        }
      },
      /**
       * 改变播放模式
       */
      changePlayMode() {
        if (this.currentPlayMode === this.playModes.length - 1) {
          this.currentPlayMode = 0;
        } else {
          this.currentPlayMode = this.currentPlayMode + 1;
        }
        switch (this.currentPlayMode) {
          case 0:
            this.toastShow = true;
            this.toastContent = "列表播放";
            break;
          case 1:
            this.toastShow = true;
            this.toastContent = "随机播放";
            break;
          case 2:
            this.toastShow = true;
            this.toastContent = "单曲循环";
            break;
        }
        setTimeout(() => {
          this.toastShow = false;
        }, 1000);
      },
      /**
       * 点击
       */
      click(progress) {
        if (this.audioDOM.duration > 0) {
          let currentTime = this.audioDOM.duration * progress;
          this.playProgress = progress;
          this.currentTime = currentTime;

          this.audioDOM.currentTime = currentTime;
          this.audioDOM.play();
        }
      },
      /**
       * 拖拽中
       */
      drag(progress) {
        if (this.audioDOM.duration > 0) {
          this.audioDOM.pause();

          this._stopImgRotate();
          this.playStatus = false;
          this.dragProgress = progress;
        }
      },
      /**
       * 拖拽结束
       */
      dragEnd() {
        if (this.audioDOM.duration > 0) {
          let currentTime = this.audioDOM.duration * this.dragProgress;
          this.playProgress = this.dragProgress;
          this.currentTime = currentTime;

          this.$nextTick(() => {
            this.audioDOM.currentTime = currentTime;
            this.audioDOM.play();

            this._startImgRotate();

            this.playStatus = true;
            this.dragProgress = 0;
          });
        }
      },
      hidePlayer() {
        this.show(false);
      },
      showPlayer() {
        this.show(true);
      },
      showPlayList() {
        // 显示播放列表
        this.$emit("showList", true);
      },
      ...mapMutations({
        show: SHOW_PLAYER,  //  映射show方法到mutations的SHOW_PLAYER方法
        changeCurrentSong: CHANGE_SONG
      })
    },
    filters: {
      // 格式化时间
      getTime(second) {
        second = Math.floor(second);
        let minute = Math.floor(second / 60);
        second = second - minute * 60;
        return minute + ":" + formatTime(second);
      }
    },
    created() {
      // 播放模式： list-列表 shuffle-随机 single-单曲
      this.playModes = ["list", "shuffle", "single"];
      this.dragProgress = 0;
    },
    mounted() {
      this.audioDOM = this.$refs.audio;
      this.audioDOM.addEventListener("canplay", () => {
        // 当音频可以播放时，播放音频
        this.audioDOM.play();
        this._startImgRotate();
        this.playStatus = true;
      }, false);

      this.audioDOM.addEventListener("timeupdate", () => {
        if (this.playStatus === true) {
          // 修改播放进度和当前播放时间
          this.playProgress = this.audioDOM.currentTime / this.audioDOM.duration;
          this.currentTime = this.audioDOM.currentTime;
        }
      }, false);

      this.audioDOM.addEventListener("ended", () => {
        let playSongs = this.$store.state.songs;
        if (playSongs.length > 1) {
          // 播放下一首
          this.next();
        } else {
          if (this.currentPlayMode === 2) {  // 单曲循环
            // 继续播放当前歌曲
            this.audioDOM.play();
          } else {
            // 暂停
            this.audioDOM.pause();
            this._stopImgRotate();
            this.playProgress = 0;
            this.currentTime = 0;
            this.playStatus = false;
          }
        }
      }, false);

      this.audioDOM.addEventListener("error", () => {
        this.toastShow = true;
        this.toastContent = "加载歌曲出错！";
        setTimeout(() => {
          this.toastShow = false;
        }, 1000);
      }, false);

      // 解决手机端有些浏览器无法自动播放的问题
      let handle = () => {
        this.audioDOM.load();
        document.removeEventListener("click", handle);
      };
      document.addEventListener("click", handle);
    },
    components: {
      MiniPlayer,
      ProgressBar,
      Toast
    }
  }

  function formatTime(time) {
    let timeStr = "00";
    if (time > 0 && time < 10) {
      timeStr = "0" + time;
    } else if (time >= 10) {
      timeStr = time;
    }
    return timeStr;
  }
</script>

<style lang="stylus" scoped>
  .player
    position: fixed
    top: 0
    left: 0
    z-index: 1001
    width: 100%
    height: 100%
    overflow: hidden
    color: #FFFFFF
    background-color: #212121
    transform-origin: right bottom
    &.player-rotate-enter-active, &.player-rotate-leave-active
      transition: transform .3s
      transform: rotateZ(0deg) translate3d(0, 0, 0)
    &.player-rotate-enter, &.player-rotate-leave-to
      transform: rotateZ(30deg) translate3d(100%, 0, 0)
    .header
      position: fixed
      width: 100%
      height: 55px
      line-height: 55px
      color: #FFFFFF
      text-align: center
      font-size: 18px
      .header-back
        position: absolute
        left: 10px
        font-size: 22px
      .header-title
        margin: 0 40px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .player-bg
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: -1
      margin: -35px
      background-repeat: no-repeat
      background-position: center center
      background-size: cover
      filter: blur(20px);
      opacity: .6
      transform: translate3d(0, 0, 0)
      transition: background-image .3s
    .singer-top
      margin-top: 70px
      text-align: center
      .singer
        height: 16px
        overflow: hidden
        text-align: center
        .singer-name
          display: inline-block
          position: relative
          &:before, &:after
            content: ""
            width: 15px
            position: absolute
            top: 50%
            border-top: 1px solid #FFFFFF
          &:before
            left: -20px
          &:after
            right: -20px
    .singer-middle
      position: absolute
      top: 100px
      bottom: 120px
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      .singer-img
        width: 260px
        height: @width
        border-radius: 50%
        border: 8px solid rgba(221, 221, 221, 0.3)
        img
          width: 100%
          height: @width
          border-radius: 50%
    .singer-bottom
      position: absolute
      bottom: 0
      width: 100%
      height: 120px
      .controller-wrapper
        padding: 0 30px
        .progress-wrapper
          display: flex
          align-items: center
          height: 30px
          line-height: 30px
          font-size: 12px
          font-weight: 400
          .current-time, .total-time
            width: 40px
          .current-time
            text-align: left
          .total-time
            text-align: right
          .play-progress
            flex: 1
        .play-wrapper
          display: flex
          margin-top: 10px
          color: #FFD700
          font-size: 36px
          text-align: center
          align-items: center
          div
            flex: 1
          .play-button
            font-size: 45px
          .play-model-button
            text-align: left
            text-shadow: 0 0 3px #FFD700
          .play-list-button
            text-align: right
</style>
