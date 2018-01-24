<template>
  <div class="music-recommend">
    <scroll direction="vertical">
      <div class="recommend-wrapper">
        <div class="slider-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="slider in sliderList" :key="slider.id">
              <a class="slider-nav" @click="toLink(slider.linkUrl)">
                <img :src="slider.picUrl" width="100%" height="100%" alt="推荐"/>
              </a>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="album-container" :style="{display: this.loading === true ? 'none' : ''}">
          <h1 class="title theme-recommend-title">最新专辑</h1>
          <div class="album-list">
            <div class="album-wrapper theme-album-wrapper" v-for="album in newAlbums" :key="album.id" @click="toAlbumDetail(album.mId)">
              <div class="left">
                  <img v-lazy="{src: album.img, loading: loadingImg}" width="100%" height="100%" :alt="album.name" />
              </div>
              <div class="right">
                <div class="album-name">
                  {{album.name}}
                </div>
                <div class="singer-name">
                  {{album.singer}}
                </div>
                <div class="public-time">
                  {{album.publicTime}}
                </div>
              </div>
          </div>
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
  import Swiper from "swiper"
  import Loading from "@/common/loading/Loading"
  import Scroll from "@/common/Scroll"
  import {getCarousel, getNewAlbum} from "@/api/recommend"
  import {CODE_SUCCESS} from "@/api/config"
  import * as AlbumModel from "@/model/album"

  import "swiper/dist/css/swiper.css"

  export default {
    name: "recommend",
    data() {
      return {
        loading: true,
        sliderList: [],
        newAlbums: [],
        loadingImg: require("../../assets/imgs/music.png")
      };
    },
    methods: {
      toLink(linkUrl) {
        window.location.href = linkUrl;
      },
      toAlbumDetail(mId) {
        // 跳转到专辑详情，这里使用编程式路由跳转
        this.$router.push(`${this.$route.path + '/' + mId}`);
      }
    },
    created() {
      getCarousel().then((res) => {
        // console.log("获取轮播：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            this.sliderList = res.data.slider;
            this.$nextTick(() => {
              if (!this.sliderSwiper) {
                // 初始化轮播图
                this.sliderSwiper = new Swiper(".slider-container", {
                  loop: true,
                  autoplay: 3000,
                  autoplayDisableOnInteraction: false,
                  pagination: '.swiper-pagination'
                });
              }
            });
          }
        }
      });

      getNewAlbum().then((res) => {
        // console.log("获取最新专辑：");
        if (res) {
          // console.log(res);
          if (res.code === CODE_SUCCESS) {
            // 根据发布时间降序排列
            let albumList = res.albumlib.data.list;
            albumList.sort((a, b) => {
              return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
            });
            let albums = [];
            albumList.forEach((item) => {
              albums.push(AlbumModel.createAlbumByList(item));
            });
            this.newAlbums = albums;
            this.loading = false;
          }
        }
      });
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .music-recommend
    width: 100%
    height: 100%
    .recommend-wrapper
      padding-bottom: 52px
    .slider-container
      height: 160px
      position: relative
      .slider-nav
        display: block
        width: 100%
        height: 100%
    .album-container
      .title
        height: 50px
        line-height: 50px
        text-align: center
        font-size: 15px
        font-weight: 400
        /*color: #FFA500*/
      .album-list
        font-size: 15px
        padding-bottom: 20px
        .album-wrapper
          margin: 20px
          /*color: rgba(0, 0, 0, 0.6)*/
          .left
            float: left
            width: 60px
            height: 60px
            vertical-align: top
          .right
            margin-left: 80px
            line-height: 30px
            position: relative
            .album-name, .singer-name
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
            .album-name
              /*color: #333333*/
              font-weight: 500
            .public-time
              position: absolute
              right: 0
              top: 50%
              margin-top: -15px
              font-size: 14px
        .album-wrapper:first-child
          margin-top: 0
        .album-wrapper:last-child
          margin-bottom: 0
</style>

<style lang="stylus">
  .swiper-pagination-bullet-active
    background-color: #DDDDDD !important
</style>
