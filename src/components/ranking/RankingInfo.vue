<template>
  <div class="ranking-info">
    <detail :title="title" :data="data" :loading="loading" />
  </div>
</template>

<script>
  import Detail from "../detail/Detail"
  import {getRankingInfo} from "@/api/ranking"
  import {getSongVKey} from "@/api/song"
  import {CODE_SUCCESS} from "@/api/config"
  import * as RankingModel from "@/model/ranking"
  import * as SongModel from "@/model/song"

  export default {
    name: "ranking-info",
    data() {
      return {
        loading: true,
        title: "排行榜",
        data: {
          name: "",
          img: require("../../assets/imgs/play_bg.jpg"),
          desc: "",
          songs: []
        }
      };
    },
    methods: {
      getSongUrl(song, mId) {
        getSongVKey(mId).then((res) => {
          if (res) {
            if (res.code === CODE_SUCCESS) {
              if (res.data.items) {
                let item = res.data.items[0];
                song.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
              }
            }
          }
        });
      }
    },
    created() {
      getRankingInfo(this.$route.params.rankingId).then((res) => {
        // console.log("获取排行榜详情：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            let ranking = RankingModel.createRankingByDetail(res.topinfo);
            ranking.info = res.topinfo.info;
            let songs = [];
            res.songlist.forEach(item => {
              if (item.data.pay.payplay === 1) { return }
              let song = SongModel.createSong(item.data);
              // 获取歌曲vkey
              this.getSongUrl(song, item.data.songmid);
              songs.push(song);
            });
            this.data = {
              name: ranking.title,
              img: ranking.img,
              desc: ranking.info,
              songs
            };
            this.loading = false;
          }
        }
      });
    },
    components: {
      Detail
    }
  }
</script>

<style lang="stylus" scoped>
  .ranking-info
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 100
    /*background-color: #F8F8FF*/
</style>
