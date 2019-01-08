<template>
  <div class="music-header">
    <span class="header-back" @click="$router.go(-1)">
      <i class="icon-back"></i>
    </span>
    <div class="header-title">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "music-header",
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .music-header
    position: fixed
    width: 100%
    height: 50px
    line-height: 50px
    color: #FFFFFF
    text-align: center
    font-size: 18px
    .header-back
      position: absolute
      left: 10px
      font-size: 22px
    .header-title
      margin: 0 40px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
</style>
