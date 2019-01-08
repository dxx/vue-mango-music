<template>
  <div class="scroll-view" ref="scroller">
    <slot />
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "scroll",
    props: {
      direction: {
        type: String,
        default: "vertical",
        validator: function(value) {
          return value === "vertical" || value === "horizontal"
        }
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      refresh() {
        if (this.bScroll) {
          this.bScroll.refresh();
        }
      }
    },
    mounted() {
      if (!this.bScroll) {
        this.bScroll = new BScroll(this.$refs.scroller, {
          scrollX: this.direction === "horizontal",
          scrollY: this.direction === "vertical",
          click: this.click,
          probeType: 3
        });

        if (this.listenScroll) {
          this.bScroll.on("scroll", (scroll) => {
            this.$emit("scroll", scroll);
          });
        }
      }
    },
    beforeDestroy() {
      if (this.listenScroll === true) {
        this.bScroll.off("scroll");
      }
      this.bScroll = null;
    }
  }
</script>

<style lang="stylus" scoped>
  .scroll-view
    width: 100%
    height: 100%
    overflow: hidden
</style>
