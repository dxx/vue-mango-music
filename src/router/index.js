import Vue from "vue"
import Router from "vue-router"

Vue.use(Router);

const Recommend = () => import("../views/recommend/Recommend");
const Ranking = () => import("../views/ranking/Ranking");
const Singer = () => import("../views/singer/Singers");
const Search = () => import("../views/search/Search");

const Album = () => import("../views/album/Album");
const RankingInfo = () => import("../views/ranking/RankingInfo");
const SingerInfo = () => import("../views/singer/Singer")

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
