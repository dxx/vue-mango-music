<template>
  <div class="progress-bar" ref="progressBar" @click="handleClick">
    <div class="progress-load"></div>
    <div class="progress" :style="progressWidth" ref="progress"></div>
    <div class="progress-button" :style="progressButtonOffsetLeft"
         v-show="disableButton === false" ref="progressBtn"></div>
  </div>
</template>

<script>
  export default {
    name: "progress-bar",
    props: {
      progress: {
        type: Number,
        required: true
      },
      disableButton: {
        type: Boolean,
        default: false
      },
      disableClick: {
        type: Boolean,
        default: true
      },
      disableDrag: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      progressWidth() {
        return {width: `${this.progress * 100}%`};
      },
      progressButtonOffsetLeft() {
        if (this.progressBarWidth) {
          return {left: `${this.progress * this.progressBarWidth}px`};
        } else {
          return {left: `${this.progress}px`};
        }
      }
    },
    methods: {
      handleClick(e) {
        if (this.disableClick !== true) {
          let left = this.$refs.progressBar.getBoundingClientRect().left;
          let clickedLeft = e.clientX - left;
          let progress = clickedLeft / this.progressBarWidth;
          this.$refs.progress.style.width = `${progress * 100}%`;
          this.$refs.progressBtn.style.left = `${clickedLeft}px`;
          this.$emit("click", progress);
        }
      }
    },
    updated() {
      // 组件更新后重新获取进度条总宽度
      if (!this.progressBarWidth) {
        this.progressBarWidth = this.$refs.progressBar.offsetWidth;
      }
    },
    mounted() {
      let progressBarDOM = this.$refs.progressBar;
      this.progressBarWidth = progressBarDOM.offsetWidth;
      if (this.disableButton !== true && this.disableDrag !== true) {
        let progressBtnDOM = this.$refs.progressBtn;
        // 触摸开始位置
        let downX = 0;
        // 按钮left值
        let buttonLeft = 0;

        progressBtnDOM.addEventListener("touchstart", (e) => {
          let touch = e.touches[0];
          downX = touch.clientX;
          buttonLeft = parseInt(touch.target.style.left, 10);
          // 触发drag start事件
          this.$emit("dragStart");
        });
        progressBtnDOM.addEventListener("touchmove", (e) => {
          e.preventDefault();

          let touch = e.touches[0];
          let diffX = touch.clientX - downX;

          let btnLeft = buttonLeft + diffX;
          if (btnLeft > progressBarDOM.offsetWidth) {
            btnLeft = progressBarDOM.offsetWidth;
          } else if (btnLeft < 0) {
            btnLeft = 0;
          }
          // 设置按钮left值
          touch.target.style.left = btnLeft + "px";
          // 设置进度width值
          this.$refs.progress.style.width = btnLeft / this.progressBarWidth * 100 + "%";
          // 触发drag事件
          this.$emit("drag", btnLeft / this.progressBarWidth);
        });
        progressBtnDOM.addEventListener("touchend", () => {
          // 触发drag end事件
          this.$emit("dragEnd");
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $zIndex = 1
  .progress-bar
    position: relative
    width: 100%
    height: 3px
    background-color: rgba(0, 0, 0, 0.3)
    .progress-load, .progress, .progress-button
      position: absolute
      top: 0
      left: 0
      height: 100%
    .progress-load
      z-index: $zIndex
    .progress
      z-index: $zIndex + 1
      background-color: #FFD700
    .progress-button
      width: 14px
      height: 14px
      border: 2px solid #FFFFFF
      border-radius: 50%
      box-sizing: border-box
      background-color: #FFD700
      z-index: $zIndex + 2
      top: -6px
      margin-left: -5px
</style>
