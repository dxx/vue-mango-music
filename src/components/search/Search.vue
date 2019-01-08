<template>
  <div class="music-search skin-search">
    <div class="search-box-wrapper skin-search-box-wrapper">
      <div class="search-box skin-search-box">
        <i class="icon-search"></i>
        <input type="text" class="search-input" placeholder="搜索歌曲、歌手、专辑" v-model="w" @keydown="handleKeyDown" />
      </div>
      <div class="cancel-button" :style="cancelButtonStyle" @click="w = ''">取消</div>
    </div>
    <div class="search-hot" :style="searchHotStyle">
      <h1 class="title">热门搜索</h1>
      <div class="hot-list">
        <template v-for="(hot, index) in hotKeys">
          <div class="hot-item" :key="hot.index" @click="handleSearch(hot.k)" v-if="index <= 10">{{hot.k}}</div>
        </template>
      </div>
    </div>
    <div class="search-result skin-search-result" :style="cancelButtonStyle">
      <scroll>
        <div class="result-container">
          <!-- 专辑 -->
          <div class="album-wrapper" :style="albumStyle" @click="handleClick(album.mId, 'album', $event)">
            <div class="left">
              <img :src="album.img" :alt="album.name" />
            </div>
            <div class="right">
              <div class="song">{{album.name}}</div>
              <div class="singer">{{album.singer}}</div>
            </div>
          </div>
          <!-- 歌手 -->
          <div class="singer-wrapper" :style="singerStyle" @click="handleClick(singer.mId, 'singer', $event)">
            <div class="left">
              <img :src="singer.img" :alt="singer.name" />
            </div>
            <div class="right">
              <div class="singer">{{singer.name}}</div>
              <div class="info">单曲{{singer.songNum}} 专辑{{singer.albumNum}}</div>
            </div>
          </div>
          <!-- 歌曲列表 -->
          <div class="song-wrapper" v-for="song in songs" :key="song.id" @click="handleClick(song, 'song', $event)">
            <div class="left">
              <i class="icon-fe-music"></i>
            </div>
            <div class="right">
              <div class="song">{{song.name}}</div>
              <div class="singer">{{song.singer}}</div>
            </div>
          </div>
        </div>
        <loading title="正在加载..." :show="loading"/>
      </scroll>
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
    <transition name="translate">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import {mapMutations} from "vuex"
  import {CHANGE_SONG, SET_SONGS} from "../../store/mutation-types"
  import Loading from "@/common/loading/Loading"
  import Scroll from "@/common/Scroll"
  import {getTransitionEndName} from "@/utils/event"
  import {getHotKey, search} from "@/api/search"
  import {getSongVKey} from "@/api/song"
  import {CODE_SUCCESS} from "@/api/config"
  import * as SingerModel from "@/model/singer"
  import * as AlbumModel from "@/model/album"
  import * as SongModel from "@/model/song"

  export default {
    name: "search",
    data() {
      return {
        loading: false,
        hotKeys: [],
        singer: {},
        album: {},
        songs: [],
        w: ""
      };
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
       * 搜索
       */
      search(w) {
        this.w = w;
        this.singer = [];
        this.album = {};
        this.songs = [];
        this.loading = true;
        search(w).then((res) => {
          // console.log("搜索：");
          if (res) {
            // console.log(res);
            if (res.code === CODE_SUCCESS) {
              let zhida = res.data.zhida;
              let type = zhida.type;
              let singer = {};
              let album = {};
              switch (type) {
                // 0：表示歌曲
                case 0:
                  break;
                // 1：表示歌手
                case 1:
                  let zhiDaSinger = zhida.zhida_singer;
                  singer = SingerModel.createSingerBySearch(zhiDaSinger);
                  singer.songNum = zhiDaSinger.songNum;
                  singer.albumNum = zhiDaSinger.albumNum;
                  break;
                // 2: 表示专辑
                case 2:
                  let zhiDaAlbum = zhida.zhida_album;
                  album = AlbumModel.createAlbumBySearch(zhiDaAlbum);
                  break;
                default:
                  break;
              }

              let songs = [];
              res.data.song.list.forEach((data) => {
                if (data.pay.payplay === 1) { return }
                songs.push(SongModel.createSong(data));
              });
              this.album = album;
              this.singer = singer;
              this.songs = songs;
              this.loading = false;
            }
          }
        });
      },
      handleSearch(k) {
        this.search(k);
      },
      handleKeyDown(e) {
        this.album = {};
        this.singer = {};
        this.songs = [];
        if (e.keyCode === 13) {
          this.search(e.currentTarget.value);
        }
      },
      handleClick(data, type, e) {
        switch (type) {
          case "album":
            // 跳转到专辑详情
            this.$router.push({
              path: `${this.$route.path}/album/${data}`
            });
            break;
          case "singer":
            // 跳转到歌手详情
            this.$router.push({
              path: `${this.$route.path}/singer/${data}`
            });
            break;
          case "song":
            this._startMusicIcoAnimation(e);
            getSongVKey(data.mId).then((res) => {
              if (res) {
                if (res.code === CODE_SUCCESS) {
                  if (res.data.items) {
                    let item = res.data.items[0];
                    data.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
                    this.setSongs([data]);
                    this.changeCurrentSong(data);
                  }
                }
              }
            });
            break;
          default:
            break;
        }
      },
      ...mapMutations({
        changeCurrentSong: CHANGE_SONG,
        setSongs: SET_SONGS
      })
    },
    computed: {
      cancelButtonStyle() {
        return {display: this.w ? "block" : "none"};
      },
      searchHotStyle() {
        return {display: this.w ? "none" : "block"};
      },
      albumStyle() {
        return {display: this.album.id ? "block" : "none"};
      },
      singerStyle() {
        return {display: this.singer.id ? "block" : "none"};
      }
    },
    created() {
      getHotKey().then((res) => {
        // console.log("获取热搜：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            this.hotKeys = res.data.hotkey;
          }
        }
      });
    },
    mounted() {
      this._initMusicIco();
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .music-search
    height: 100%
    /*background-color: #FFFFFF*/
    .search-box-wrapper
      position: relative
      padding: 20px
      /*background-color: #F8F8FF*/
    .search-box
      padding: 10px
      border-radius: 3px
      line-height: 0
      /*background-color: #FFFFFF*/
      i
        vertical-align: middle
      .search-input
        width: 80%
        margin-left: 8px
        background: none
        border: none
        outline: none
        /*color: #000000*/
    .cancel-button
      position: absolute
      top: 50%
      right: 30px
      margin-top: -8px
      height: 16px
      line-height: 1
      font-size: 14px
      display: none
    .search-hot
      position: absolute
      left: 20px
      right: 20px
      padding-top: 10px
      display: none
      .title
        font-size: 14px
        /*color: rgba(0, 0, 0, .7)*/
      .hot-list
        .hot-item
          float: left
          padding: 5px 8px
          margin-right: 10px
          margin-top: 10px
          border-radius: 10px
          font-size: 14px
          /*color: #000000
          border: 1px solid rgba(0, 0, 0, .7)*/
    .search-result
      position: absolute
      left: 0
      right: 0
      top: 77px
      bottom: 0
      .album-wrapper
        padding: 5px 10px
        font-size: 0
        /*border-top: 1px solid #E5E5E5*/
        .left
          display: inline-block
          width: 40px
          height: 40px
          img
            width: 100%
            height: @width
        .right
          display: inline-block
          margin-left: 10px
          vertical-align: top
          max-width: 80%
          .song, .singer
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .song
            margin-top: 3px
            padding: 1px 0
            font-size: 14px
            /*color: #000000*/
          .singer
            margin-top: 5px
            font-size: 12px
            /*color: rgba(0, 0, 0, .6)*/
      .singer-wrapper
        padding: 5px 10px
        font-size: 0
        /*border-top: 1px solid #E5E5E5*/
        .left
          display: inline-block
          width: 40px
          height: 40px
          border-radius: 50%
          img
            width: 100%
            height: @width
            border-radius: 50%
        .right
          display: inline-block
          margin-left: 10px
          vertical-align: top
          .singer
            margin-top: 5px
            font-size: 14px
            /*color: #000000*/
          .info
            margin-top: 5px
            font-size: 12px
            /*color: rgba(0, 0, 0, .6)*/
      .song-wrapper
        padding: 5px 10px
        font-size: 0
        /*border-top: 1px solid #E5E5E5*/
        .left
          display: inline-block
          width: 40px
          height: 40px
          line-height: 42px
          text-align: center
          font-size: 22px
        .right
          display: inline-block
          margin-left: 10px
          vertical-align: top
          max-width: 80%
          .song, .singer
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .song
            padding: 3px 0 1px 0
            font-size: 14px
            /*color: #000000*/
          .singer
            margin-top: 5px
            font-size: 12px
            /*color: rgba(0, 0, 0, .6)*/

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
