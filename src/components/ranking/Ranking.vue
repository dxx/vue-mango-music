<template>
  <div class="music-ranking">
    <scroll>
      <div class="ranking-list" :style="{display: this.loading === true ? 'none' : ''}">
        <div class="ranking-wrapper skin-ranking-wrapper" v-for="ranking in rankingList" :key="ranking.id" @click="toDetail(ranking.id)">
          <div class="left">
              <img v-lazy="{src: ranking.img, loading: loadingImg}" :alt="ranking.title" />
          </div>
          <div class="right">
            <h1 class="ranking-title">
              {{ranking.title}}
            </h1>
            <div class="top-song" v-for="(song, index) in ranking.songs" :key="index">
              <span class="index">{{index + 1}}</span>
              <span>{{song.name}}</span>
              &nbsp;-&nbsp;
              <span class="singer">{{song.singer}}</span>
            </div>
            <i class="arrow"></i>
          </div>
        </div>
      </div>
    </scroll>
    <loading title="正在加载..." :show="loading"/>
    <transition name="translate">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import Loading from "@/common/loading/Loading"
  import Scroll from "@/common/Scroll"
  import {getRankingList} from "@/api/ranking"
  import {CODE_SUCCESS} from "@/api/config"
  import * as RankingModel from "@/model/ranking"

  export default {
    name: "ranking",
    data() {
      return {
        loading: true,
        rankingList: [],
        loadingImg: require("../../assets/imgs/music.png")
      };
    },
    created() {
      getRankingList().then((res) => {
        // console.log("获取排行榜：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            let topList = [];
            res.data.topList.forEach(item => {
              if (/MV/i.test(item.topTitle)) {
                return;
              }
              topList.push(RankingModel.createRankingByList(item));
            });
            this.rankingList = topList;
            this.loading = false;
          }
        }
      });
    },
    methods: {
      toDetail(id) {
        // 跳转到排行榜详情
        this.$router.push(`${this.$route.path + '/' + id}`);
      }
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .music-ranking
    width: 100%
    height: 100%
    .ranking-list
      padding-bottom: 15px
      .ranking-wrapper
        display: flex
        margin: 15px
        /*background-color: #FFFFFF*/
        .left
          flex: 0 0 100px
          width: w = 100px
          height: h = @width
          img
            width: w
            height: h
        .right
          flex: 1
          line-height: 22px
          font-size: 14px
          padding: 0 10px
          overflow: hidden
          position: relative
          .ranking-title
            font-size: 16px
            margin: 4px 0 6px 0
          .top-song, .ranking-title
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            .index
              margin-right: 6px
            /*.singer
              color: rgba(0, 0, 0, 0.5)*/
          .arrow
            position: absolute
            top: 50%
            right: 10px
            width: 6px
            height: @width
            margin-top: -3px
            border-right: 1px solid #B2B2B2
            border-bottom: 1px solid #B2B2B2
            transform: rotate(-45deg)
</style>
