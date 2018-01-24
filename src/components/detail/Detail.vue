<template>
  <div>
    <MusicHeader :title="data.name" />
    <div :style="{position: 'relative'}">
      <div ref="bg" class="detail-img" :style="{backgroundImage: `url(${data.img})`}">
        <div class="filter"></div>
      </div>
      <div ref="fixedBg" class="detail-img fixed" :style="{backgroundImage: `url(${data.img})`}">
        <div class="filter"></div>
      </div>
      <div class="play-wrapper" ref="playButtonWrapper">
        <div class="play-button" @click="playAll">
          <i class="icon-play"></i>
          <span>播放全部</span>
        </div>
      </div>
    </div>
    <div ref="container" class="detail-container">
      <div class="detail-scroll" :style="{display: loading ===  true ? 'none' : ''}">
        <scroll @scroll="handleScroll">
          <div class="detail-wrapper theme-detail-wrapper">
            <div class="song-count">{{title}} 共{{data.songs.length}}首</div>
            <div class="song-list">
              <div class="song" v-for="(song, index) in data.songs" :key="song.id" @click="playSong(song, $event)">
                <div class="song-index" v-if="title === '排行榜'">{{index + 1}}</div>
                <div class="song-name">{{song.name}}</div>
                <div class="song-singer">{{song.singer}}</div>
              </div>
            </div>
            <div class="detail-info" :style="{display: data.desc ? '' : 'none'}">
              <h1 class="detail-title">简介</h1>
              <div class="detail-desc" v-html="data.desc">
              </div>
            </div>
          </div>
        </scroll>
      </div>
      <loading title="正在加载..." :show="loading" />
    </div>
    <div class="music-ico" ref="musicIco1">
      <div class="icon-fe-music"></div>
    </div>
    <div class="music-ico" ref="musicIco2">
      <div class="icon-fe-music"></div>
    </div>
    <div class="music-ico" ref="musicIco3">
      <div class="icon-fe-music"></div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from "vuex"
  import {SHOW_PLAYER, CHANGE_SONG, SET_SONGS} from "../../store/mutation-types"
  import Loading from "@/common/loading/Loading"
  import MusicHeader from "@/common/Header"
  import Scroll from "@/common/Scroll"
  import {getTransitionEndName} from "@/utils/event"

  export default {
    name: "detail",
    props: {
      loading: Boolean,
      title: String,
      data: {
        type: Object
      }
    },
    methods: {
      /**
       * 初始化音符图标
       */
      _initMusicIco() {
        this.musicIcos = [];
        this.musicIcos.push(this.$refs.musicIco1);
        this.musicIcos.push(this.$refs.musicIco2);
        this.musicIcos.push(this.$refs.musicIco3);

        this.musicIcos.forEach((item) => {
          // 初始化状态
          item.run = false;
          let transitionEndName = getTransitionEndName(item);
          item.addEventListener(transitionEndName, function() {
            this.style.display = "none";
            this.style["webkitTransform"] = "translate3d(0, 0, 0)";
            this.style["transform"] = "translate3d(0, 0, 0)";
            this.run = false;

            let icon = this.querySelector("div");
            icon.style["webkitTransform"] = "translate3d(0, 0, 0)";
            icon.style["transform"] = "translate3d(0, 0, 0)";
          }, false);
        });
      },
      /**
       * 开始音符下落动画
       */
      _startMusicIcoAnimation({clientX, clientY}) {
        if (this.musicIcos.length > 0) {
          for (let i = 0; i < this.musicIcos.length; i++) {
            let item = this.musicIcos[i];
            // 选择一个未在动画中的元素开始动画
            if (item.run === false) {
              item.style.top = clientY + "px";
              item.style.left = clientX + "px";
              item.style.display = "inline-block";
              setTimeout(() => {
                item.run = true;
                item.style["webkitTransform"] = "translate3d(0, 1000px, 0)";
                item.style["transform"] = "translate3d(0, 1000px, 0)";

                let icon = item.querySelector("div");
                icon.style["webkitTransform"] = "translate3d(-30px, 0, 0)";
                icon.style["transform"] = "translate3d(-30px, 0, 0)";
              }, 10);
              break;
            }
          }
        }
      },
      /**
       * 播放歌曲
       */
      playSong(song, e) {
        this.setSongs([song]);
        this.changeCurrentSong(song);
        this._startMusicIcoAnimation(e);
      },
      /**
       * 播放全部
       */
      playAll() {
        this.setSongs(this.data.songs);
        this.changeCurrentSong(this.data.songs[0]);
        this.showPlayer(true);
      },
      /**
       * 处理scroll
       */
      handleScroll({y}) {
        let bgDOM = this.$refs.bg;
        let fixedBgDOM = this.$refs.fixedBg;
        let playButtonWrapperDOM = this.$refs.playButtonWrapper;
        if (y < 0) {
          if (Math.abs(y) + 50 > bgDOM.offsetHeight) {
            fixedBgDOM.style.display = "block";
          } else {
            fixedBgDOM.style.display = "none";
          }
        } else {
          let transform = `scale(${1 + y * 0.004}, ${1 + y * 0.004})`;
          bgDOM.style["webkitTransform"] = transform;
          bgDOM.style["transform"] = transform;
          playButtonWrapperDOM.style.marginTop = `${y}px`;
        }
      },
      ...mapMutations({
        showPlayer: SHOW_PLAYER,  // 映射showPlayer方法到mutations的SHOW_PLAYER方法
        changeCurrentSong: CHANGE_SONG,
        setSongs: SET_SONGS
      })
    },
    mounted() {
      //  初始化列表距离顶部的距离
      let bgDOM = this.$refs.bg;
      let containerDOM = this.$refs.container;
      containerDOM.style.top = bgDOM.offsetHeight + "px";
      this._initMusicIco();
    },
    components: {
      Loading,
      MusicHeader,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .music-header
    z-index: 10
  .detail-img
    position: relative
    z-index: -1
    width: 100%
    padding-top: 70%
    background-repeat: no-repeat
    background-size: cover
    transform-origin: top center
    transition: transform
    &.fixed
      position: fixed
      top: 0
      height: 50px
      z-index: 1
      background-position: 0 0
      padding: 0
      display: none
  .play-wrapper
    position: absolute
    bottom: 20px
    width: 100%
    text-align: center
    color: #FFD700
    .play-button
      display: inline-block
      width: 120px
      padding: 8px 0
      border-radius: 50px
      border: 1px solid #FFD700
      i
        display: inline-block
        vertical-align: middle
        margin-top: -2px
        margin-right: 5px
        font-size: 16px
        font-weight: 600
      span
        font-size: 14px
  .filter
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.3)
  .detail-container
    position: absolute
    bottom: 52px
    width: 100%
    .detail-scroll
      width: 100%
      height: @width
    .scroll-view
      overflow: visible
    .detail-wrapper
      padding: 25px 25px 0 25px
      /*background-color: #F8F8FF*/
      .song-count
        font-size: 14px
      .song-list
        margin-top: 20px
        .song
          padding-bottom: 25px
          .song-index
            float: left
            height: 35px
            width: 45px
            line-height: 35px
            margin-left: -18px
            text-align: center
          &:nth-child(1)
            color: #FFA500
          &:nth-child(2)
            color: #FF7F50
          &:nth-child(3)
            color: #FF7F00
          .song-name
            height: 16px
            /*color: #000000*/
          .song-singer
            font-size: 14px
            padding-top: 8px
            /*color: rgba(0, 0, 0, 0.6)*/
          .song-name, .song-singer
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .detail-info
        padding-bottom: 25px
        .detail-title
          font-size: 18px
          font-weight: 100
          text-align: center
        .detail-desc
          font-size: 14px
          margin-top: 15px
          line-height: 22px

  /*音符样式*/
  .music-ico
    position: fixed
    z-index: 1000
    margin-top: -7px
    margin-left: -7px
    color: #FFD700
    font-size: 14px
    display: none
    transition: transform 1s cubic-bezier(.59, -0.1, .83, .67)
    transform: translate3d(0, 0, 0)
    div
      transition: transform 1s
</style>
