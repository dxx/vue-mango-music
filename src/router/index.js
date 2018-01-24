import Vue from 'vue'
import Router from 'vue-router'

import Recommend from "../components/recommend/Recommend"
import Ranking from "../components/ranking/Ranking"
import Singer from "../components/singer/Singers"
import Search from "../components/search/Search"

import Album from "../components/album/Album"
import RankingInfo from "../components/ranking/RankingInfo"
import SingerInfo from "../components/singer/Singer"

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/recommend"
  },
  {
    path: "/recommend",
    name: "recommend",
    component: Recommend,
    children: [
      {
        path: ":albumId",
        name: "AlbumInfo",
        component: Album
      }
    ]
  },
  {
    path: "/ranking",
    name: "ranking",
    component: Ranking,
    children: [
      {
        path: ":rankingId",
        name: "RankingInfo",
        component: RankingInfo
      }
    ]
  },
  {
    path: "/singer",
    name: "singer",
    component: Singer,
    children: [
      {
        path: ":singerId",
        name: "SingerInfo",
        component: SingerInfo
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    children: [
      {
        path: "album/:albumId",
        name: "SearchAlbum",
        component: Album
      },
      {
        path: "singer/:singerId",
        name: "SearchSinger",
        component: SingerInfo
      }
    ]
  },
  {
    path: "*",
    name: "NotMatch",
    component: Recommend
  }
];

let base = "/";
if (process.env.NODE_ENV === "production") {
  base = "/";
  // base = "/vue-mango-music/";
}

export default new Router({
  base,
  routes
})
