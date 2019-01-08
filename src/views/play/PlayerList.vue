<template>
  <div class="player-list">
    <transition name="fade" @enter="enter">
      <div class="play-list-bg" v-show="show" @click="hidePlayList">
      <!-- 播放列表 -->
        <div class="play-list-wrap" @click.stop="">
          <div class="play-list-head">
            <span class="head-title">播放列表</span>
            <span class="close" @click="hidePlayList">关闭</span>
          </div>
          <div class="play-list">
            <scroll ref="scroll">
              <div>
                <div class="play-list-item" v-for="(item, index) in songs" :key="item.id" :ref="'item' + index">
                  <div class="item-left">{{index + 1 < 10 ? `0${index + 1}` : index + 1}}</div>
                  <div class="item-right">
                    <div class="song" :class="{current: item.id === song.id ? 'current' : ''}"
                         @click="playSong(item, index)">
                      <span class="song-name">{{item.name}}</span>
                      <span class="song-singer">{{item.singer}}</span>
                    </div>
                    <i class="icon-delete delete" @click="removeSong(item.id, index)"></i>
                  </div>
                </div>
              </div>
            </scroll>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex"
  import { CHANGE_SONG, REMOVE_SONG_FROM_LIST } from "../../store/mutation-types"
  import Scroll from "@/components/Scroll"

  export default {
    name: "player-list",
    props: {
      show: Boolean,
      currentIndex: Number
    },
    computed: {
      ...mapState(["song", "songs"])
    },
    methods: {
      hidePlayList() {
        this.$emit("showList", false);
      },
      playSong(song, index) {
        this.changeCurrentSong(song);
        this.hidePlayList();
        this.$emit("changeCurrentIndex", index);
      },
      removeSong(id, index) {
        if (this.song.id !== id) {
          this.remove(id);
          if (index < this.currentIndex) {
            // 调用父组件修改当前歌曲位置
            this.$emit("changeCurrentIndex", this.currentIndex - 1);
          }
        }
      },
      enter() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.bScroll.scrollToElement(
          this.$refs[`item${this.currentIndex}`][0]
        )
      },
      ...mapMutations({
        changeCurrentSong: CHANGE_SONG,
        remove: REMOVE_SONG_FROM_LIST
      })
    },
    components: {
      Scroll
    },
    updated() {
      // 判断播放列表是否变化，如果变化，修改当前播放歌曲的位置
      if (this.previousLength !== this.songs.length) {
        this.previousLength = this.songs.length;
        for (let i = 0; i < this.songs.length; i++) {
          if (this.songs[i].id === this.song.id) {
            this.$emit("changeCurrentIndex", i);
            return;
          }
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .play-list-bg
    position: fixed
    top: 0
    left: 0
    z-index: 1002
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.3)
    transform: translate3d(0, 0, 0)
    &.fade-enter-active, &.fade-leave-active
      opacity: 1
      transition: opacity .5s
      .play-list-wrap
        transform: translate3d(0, 0, 0)
        transition: transform .5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      .play-list-wrap
        transform: translate3d(0, 100%, 0)
    .play-list-wrap
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      font-size: 16px
      color: #FFFFFF
      background: url("../../assets/imgs/play_bg.jpg") no-repeat center
      background-size: cover
      transform: translate3d(0, 0, 0)
      &:after
        content: ""
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        z-index: -1
        background-color: rgba(0, 0, 0, .5)
      .play-list-head
        position: relative
        height: 40px
        line-height: 40px
        &:after
          content: ""
          position: absolute
          left: 0
          bottom: 0
          width: 100%
          height: 1px
          background-color: #CCCCCC
          transform: scaleY(0.5)
        .head-title, .close
          font-weight: 400
        .head-title
          float: left
          margin-left: 12px
        .close
          float: right
          margin-right: 20px
      .play-list
        height: 250px
        .play-list-item
          .item-left
            float: left
            width: 50px
            height: 50px
            line-height: 50px
            text-align: center
          .item-right
            position: relative
            height: 50px
            margin-left: 50px
            padding-top: 2px
            &:after
              position: absolute
              content: ""
              bottom:  0
              width: 100%
              height: 1px
              background-color: #CCCCCC
              transform: scaleY(0.5)
            .song
              padding-top: 5px
              line-height: 18px
              margin-right: 50px
              .song-name, .song-singer
                display: block
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
              .song-singer
                color: rgba(211, 211, 211, 0.7)
                font-size: 14px
              &.current
                .song-name, .song-singer
                  color: #FFF68F
            .delete
              position: absolute
              right: 30px
              top: 16px
              font-size: 14px
          &:last-child
            .item-right:after
              height: 0
</style>
