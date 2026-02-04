<template>
  <div style="width: 100%; overflow: hidden">
    <ZoomImage
      image-url="https://avatars.githubusercontent.com/u/18308725?v=4"
    ></ZoomImage>

    <div style="position: relative; right: -50%">
      <ZoomImage
        image-url="https://avatars.githubusercontent.com/u/18308725?v=4"
        position="left"
      ></ZoomImage>
    </div>
  </div>
</template>

<script>
import ZoomImage from "vue2-zoom-image";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Home",
  components: {
    ZoomImage,
  },
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    ...mapMutations(["increment"]),
  },
};
</script>
