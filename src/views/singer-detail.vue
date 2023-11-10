<!--  -->
<template>
  <div class="singer-detail"></div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
export default {
  data() {
    return {
    }
  },
  props: {
    singer: Object
  },
  async created() {
    const res = await getSingerDetail(this.singer)
    const songs = await processSongs(res.songs)
    console.log(songs);
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {}
}

</script>
<style lang='scss' scoped>
.singer-detail {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
  }
</style>