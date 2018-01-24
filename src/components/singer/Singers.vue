<template>
  <div class="music-singers">
    <div class="nav">
      <scroll direction="horizontal">
        <div class="tag" ref="tag">
          <a v-for="type in types" :class="{choose: type.key === typeKey}" @click="handleTypeClick(type.key)">
            {{type.name}}
          </a>
        </div>
      </scroll>
      <scroll direction="horizontal">
        <div class="index" ref="index">
          <a v-for="type in indexs" :class="{choose: type.key === indexKey}" @click="handleIndexClick(type.key)">
            {{type.name}}
          </a>
        </div>
      </scroll>
    </div>
    <div class="singer-list">
      <scroll>
        <div class="singer-container">
          <div class="singer-wrapper" v-for="singer in singers" :key="singer.id" @click="toDetail(singer.mId)">
            <div class="singer-img">
                <img v-lazy="{src: singer.img, loading: loadingImg, error: errorImg}" width="100%" height="100%" :alt="singer.name" />
            </div>
            <div class="singer-name">
              {{singer.name}}
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <loading title="正在加载..." :show="loading" />
    <transition name="translate">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import Loading from "@/common/loading/Loading"
  import Scroll from "@/common/Scroll"
  import {getSingerList} from "@/api/singer"
  import {CODE_SUCCESS} from "@/api/config"
  import * as SingerModel from "@/model/singer"

  export default {
    name: "singers",
    data() {
      return {
        loading: true,
        typeKey: "all_all",
        indexKey: "all",
        singers: [],
        loadingImg: require("../../assets/imgs/music.png"),
        errorImg: require("../../assets/imgs/music.png")
      };
    },
    methods: {
      /**
       * 初始化导航滚动的宽度
       */
      _initNavScrollWidth() {
        let tagDOM = this.$refs.tag;
        let tagElems = tagDOM.querySelectorAll("a");
        let tagTotalWidth = 0;
        Array.from(tagElems).forEach(a => {
          tagTotalWidth += a.offsetWidth;
        });
        tagDOM.style.width = `${tagTotalWidth}px`;

        let indexDOM = this.$refs.index;
        let indexElems = indexDOM.querySelectorAll("a");
        let indexTotalWidth = 0;
        Array.from(indexElems).forEach(a => {
          indexTotalWidth += a.offsetWidth;
        });
        indexDOM.style.width = `${indexTotalWidth}px`;
      },
      getSingers() {
        getSingerList(1, `${this.typeKey + '_' + this.indexKey}`).then((res) => {
          // console.log("获取歌手列表：");
          if (res) {
            // console.log(res);
            if (res.code === CODE_SUCCESS) {
              let singers = [];
              res.data.list.forEach(data => {
                let singer = new SingerModel.Singer(data.Fsinger_id, data.Fsinger_mid, data.Fsinger_name,
                  `https://y.gtimg.cn/music/photo_new/T001R150x150M000${data.Fsinger_mid}.jpg?max_age=2592000`);
                singers.push(singer);
              });
              this.singers = singers;
              this.loading = false;
            }
          }
        });
      },
      handleTypeClick(key) {
        this.loading = true;
        this.typeKey = key;
        this.indexKey = "all";
        this.singers = [];
        this.getSingers();
      },
      handleIndexClick(key) {
        this.loading = true;
        this.indexKey = key;
        this.singers = [];
        this.getSingers();
      },
      toDetail(id) {
        // 跳转到歌手详情
        this.$router.push(`${this.$route.path + '/' + id}`);
      }
    },
    created() {
      this.types = [
        {key: "all_all", name: "全部"},
        {key: "cn_man", name: "华语男"},
        {key: "cn_woman", name: "华语女"},
        {key: "cn_team", name: "华语组合"},
        {key: "k_man", name: "韩国男"},
        {key: "k_woman", name: "韩国女"},
        {key: "k_team", name: "韩国组合"},
        {key: "j_man", name: "日本男"},
        {key: "j_woman", name: "日本女"},
        {key: "j_team", name: "日本组合"},
        {key: "eu_man", name: "欧美男"},
        {key: "eu_woman", name: "欧美女"},
        {key: "eu_team", name: "欧美组合"},
        {key: "other_other", name: "其它"}
      ];
      this.indexs = [
        {key: "all", name: "热门"},
        {key: "A", name: "A"},
        {key: "B", name: "B"},
        {key: "C", name: "C"},
        {key: "D", name: "D"},
        {key: "E", name: "E"},
        {key: "F", name: "F"},
        {key: "G", name: "G"},
        {key: "H", name: "H"},
        {key: "I", name: "I"},
        {key: "J", name: "J"},
        {key: "K", name: "K"},
        {key: "L", name: "L"},
        {key: "M", name: "M"},
        {key: "N", name: "N"},
        {key: "O", name: "O"},
        {key: "P", name: "P"},
        {key: "Q", name: "Q"},
        {key: "R", name: "R"},
        {key: "S", name: "S"},
        {key: "T", name: "T"},
        {key: "U", name: "U"},
        {key: "V", name: "V"},
        {key: "W", name: "W"},
        {key: "X", name: "X"},
        {key: "Y", name: "Y"},
        {key: "Z", name: "Z"}
      ];

      this.getSingers();
    },
    mounted() {
      this._initNavScrollWidth();
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style lang="stylus" scoped>
  .music-singers
    width: 100%
    height: 100%
    .nav
      padding: 10px 20px
      font-size: 14px
      .tag, .index
        display: flex
        align-items: center
        height: 30px
        overflow: hidden
        a
          flex: 0 0 auto
          padding: 3px 8px
          text-decoration: none
          color: inherit
          text-align: center
          border: 1px solid transparent
          box-sizing: border-box
          cursor: default
          &.choose
            color: #FFA500
            border: 1px solid #FFA500
            border-radius: 10px
    .singer-list
      position: absolute
      top: 80px
      left: 0
      right: 0
      bottom: 0
      padding: 0 20px
      .singer-container
        padding-bottom: 52px
      .singer-wrapper
        margin: 10px 0
        &:first-child
          margin-top: 0
        &:last-child
          padding-bottom: 10px
      .singer-img, .singer-name
        display: inline-block
      .singer-img
        width: 50px
        height: @width
        img
          border-radius: 50%
      .singer-name
        height: 50px
        max-width: 220px
        line-height: 50px
        margin-left: 10px
        vertical-align: top
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
