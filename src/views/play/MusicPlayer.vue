<template>
  <div class="music-player">
    <player :currentIndex="currentIndex" @changeCurrentIndex="changeCurrentIndex"
            @showList="showList"/>
    <player-list :currentIndex="currentIndex" @changeCurrentIndex="changeCurrentIndex"
                 :show="playListShow" @showList="showList"/>
  </div>
</template>

<script>
  import Player from "./Player"
  import PlayerList from "./PlayerList"

  export default {
    name: "music-player",
    data() {
      return {
        currentIndex: 0,
        playListShow: false
      }
    },
    methods: {
      showList(status) {
        this.playListShow = status;
      },
      changeCurrentIndex(index) {
        this.currentIndex = index;
      }
    },
    components: {
      Player,
      PlayerList
    }
  }
</script>
