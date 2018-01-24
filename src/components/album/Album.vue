<template>
  <div class="music-album">
    <detail :title="title" :data="data" :loading="loading" />
    <toast :show="toastShow" content="加载失败..." />
  </div>
</template>

<script>
  import Toast from "@/common/Toast"
  import Detail from "../detail/Detail"
  import {getAlbumInfo} from "@/api/recommend"
  import {getSongVKey} from "@/api/song"
  import {CODE_SUCCESS} from "@/api/config"
  import * as AlbumModel from "@/model/album"
  import * as SongModel from "@/model/song"

  export default {
    name: "album",
    data() {
      return {
        loading: true,
        title: "专辑",
        data: {
          name: "",
          img: require("../../assets/imgs/play_bg.jpg"),
          desc: "",
          songs: []
        },
        toastShow: false
      };
    },
    methods: {
      // 获取歌曲文件地址
      getSongUrl(song, mId) {
        getSongVKey(mId).then((res) => {
          if (res) {
            if (res.code === CODE_SUCCESS) {
              if (res.data.items) {
                let item = res.data.items[0];
                song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`;
              }
            }
          }
        });
      }
    },
    created() {
      getAlbumInfo(this.$route.params.albumId).then((res) => {
        // console.log("获取专辑详情：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            let album = AlbumModel.createAlbumByDetail(res.data);
            album.desc = res.data.desc;

            let songList = res.data.list;
            let songs = [];
            songList.forEach(item => {
              let song = SongModel.createSong(item);
              // 获取歌曲vkey
              this.getSongUrl(song, item.songmid);
              songs.push(song);
            });
            this.data = {
              name: album.name,
              img: album.img,
              desc: album.desc,
              songs
            };
            this.loading = false;
          }
        }
      }).catch(() => {
        // 调用接口失败显示Toast，1秒后隐藏Loading组件
        this.toastShow = true;
        setTimeout(() => {
          this.toastShow = false;
          this.loading = false;
        }, 1000);
      });
    },
    components: {
      Toast,
      Detail
    }
  }
</script>

<style lang="stylus" scoped>
  .music-album
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: #F8F8FF
    z-index: 100
</style>
