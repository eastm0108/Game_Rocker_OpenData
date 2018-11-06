<template>
  <div class="container-fluid p-0">
    <div class="carouselSize">
      <h1 class="text-center text-white font-weight-normal">熱門遊戲</h1>
      <carousel :autoplay="true" :nav="false" :loop="true" :items="1">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/Spqdt8.png" alt="2K19">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/zt9mFw.png" alt="汪達與巨像">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/cej3uE.png" alt="碧血狂殺2">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/r3XwqH.png" alt="戰神">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/H1Bkxl.png" alt="魔物獵人">
        <img style="width: 347px" src="https://upload.cc/i1/2018/11/03/qNWUV0.png" alt="驚奇蜘蛛俠">
      </carousel>
    </div>
  </div>
</template>


<script>
import carousel from 'vue-owl-carousel';

export default {
  data() {
    return {};
  },
  components: { carousel },
  methods: {
    getStart() {
    },
  },
  created() {
    this.getStart();
  },
};
</script>
