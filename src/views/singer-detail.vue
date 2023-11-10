<!--  -->
<template>
  <div class="singer-detail">
    <MusicList
      :songs="songs"
      :pic="pic"
      :title="title"
      :loading="loading"
    ></MusicList>
  </div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
import { processSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  data() {
    return {
      songs: [],
      loading: true
    }
  },
  props: {
    singer: Object
  },
  async created() {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path
      this.$router.push(path)
    }
    const res = await getSingerDetail(this.computedSinger)
    const songs = await processSongs(res.songs)
    this.songs = songs
    this.loading = false
    console.log(songs);
  },

  components: {
    MusicList
  },

  computed: {
    computedSinger() {
      let ret = null
      const singer = this.singer
      if (singer) {
        ret = singer
      } else {
        const cachedSinger = storage.session.get(SINGER_KEY)
        // 当前也刷新
        if (cachedSinger && cachedSinger.mid === this.$route.params.id) {
          ret = cachedSinger
        }
      }
      return ret
    },
    pic() {
      const singer = this.computedSinger
      return singer && singer.pic
    },
    title() {
      const singer = this.computedSinger
      return singer && singer.name
    }
  },

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