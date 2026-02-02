<!-- ZoomImage  -->
<template>
  <div class="ZoomImage" :style="{ width }">
    <div
      ref="choose"
      class="box"
      @mousemove="mousemove"
      @mouseleave="mouseleave"
    >
      <div v-show="showImage" ref="mask" class="mask"></div>
      <img :src="imageUrl" alt="" />
    </div>
    <div v-show="showImage" ref="largeBox" class="box1" :style="largeBoxStyle">
      <img ref="large" :src="imageUrl" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "vue2-zoom-image",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //prop属性
  props: {
    //原来图片宽度
    width: {
      type: String,
      default: "50%",
    },
    //图片地址
    imageUrl: {
      type: String,
      default: "",
    },
    //图片位置
    position: {
      type: String,
      default: "right", //left right
    },
    //间隔
    zoomGap: {
      type: Number,
      default: 8, //间隔默认8px
    },
  },
  data() {
    //这里存放数据
    return {
      showImage: false,
      largeBoxStyle: {},
      maskWidth: 0,
      maskHeight: 0,
      largeBoxWidth: 0,
      largeBoxHeight: 0,
      choosePos: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  //方法集合
  methods: {
    // 获取元素到文档区域的坐标
    getPosition: function (element) {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
      var dc = document,
        rec = element.getBoundingClientRect(),
        x = rec.left, // 获取元素相对浏览器视窗window的左、上坐标
        y = rec.top;
      // x += dc.documentElement.scrollLeft || dc.body.scrollLeft
      // y += dc.documentElement.scrollTop || dc.body.scrollTop
      return {
        left: x,
        top: y,
        right: rec.right,
        width: rec.width,
        height: rec.height,
      };
    },
    mousemove(event) {
      this.showImage = true;
      // 获取图片
      let choose = this.$refs.choose;
      let mask = this.$refs.mask;
      let largeImage = this.$refs.large;
      let largeBox = this.$refs.largeBox;

      if (!this.maskWidth || !this.maskHeight) {
        let maskPos = this.getPosition(mask);
        this.maskWidth = maskPos.width;
        this.maskHeight = maskPos.height;
      }
      if (!this.largeBoxWidth || !this.largeBoxHeight) {
        let largeBoxPos = this.getPosition(largeBox);
        this.largeBoxWidth = largeBoxPos.width;
        this.largeBoxHeight = largeBoxPos.height;
      }

      //图片框
      // let choosePos = this.getPosition(choose)
      // if (!this.choosePos || !this.choosePos.width || !this.choosePos.height) {
      //     this.choosePos = this.getPosition(choose)
      // }
      this.choosePos = this.getPosition(choose);

      if (this.position === "left") {
        this.largeBoxStyle = {
          // left: this.choosePos.left - this.largeBoxWidth - this.zoomGap + 'px',
          top: this.choosePos.top + "px",
          right: this.choosePos.width + this.zoomGap + 2.5 + "px",
        };
      } else {
        this.largeBoxStyle = {
          left: this.choosePos.right + this.zoomGap + "px",
          top: this.choosePos.top + "px",
          right: "auto",
        };
      }

      let left = event.clientX - this.choosePos.left - mask.offsetWidth / 2;
      let top = event.clientY - this.choosePos.top - mask.offsetHeight / 2;
      // 约束范围
      if (left <= 0) {
        left = 0;
      }
      let maxX = this.choosePos.width - this.maskWidth;
      if (left >= maxX) {
        left = maxX;
      }
      if (top <= 0) {
        top = 0;
      }
      let maxY = this.choosePos.height - this.maskHeight;
      if (top >= maxY) {
        top = maxY;
      }
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      let scale = (this.largeBoxWidth / this.maskWidth) * -1;
      //设置大图片的宽高
      // console.log(`this.choosePos.width * (scale *-1) + 'px'`, scale, this.choosePos.width * (scale * -1) + 'px')
      // console.log(`this.choosePos.height * (scale *-1) + 'px'`, scale, this.choosePos.height * (scale * -1) + 'px')
      largeImage.style.width = this.choosePos.width * (scale * -1) + "px";
      largeImage.style.height = this.choosePos.height * (scale * -1) + "px";
      largeImage.style.left = scale * left + "px";
      largeImage.style.top = scale * top + "px";
    },
    mouseleave(event) {
      this.showImage = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.ZoomImage {
  width: 100%;
  height: 100%;
  position: relative;
  .box {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    //position: absolute;
    //left: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mask {
      pointer-events: none;
      width: 160px;
      height: 160px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  .box1 {
    width: 420px;
    height: 420px;
    border-radius: 8px;
    position: absolute;
    position: fixed;
    //left: 246px;
    overflow: hidden;
    z-index: 900000;
    pointer-events: none;
    img {
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
