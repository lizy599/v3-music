<template>
  <Header></Header>
  <Tab></Tab>
  <RouterView
    :style="viewStyle"
    v-slot="{Component}"
  >
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
  <RouterView
    :style="viewStyle"
    v-slot="{Component}"
    name="user"
  >
    <transition
      appear
      name="slide"
    >
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </RouterView>
  <Player />
</template>
<script>
import Header from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Header,
    Tab,
    Player
  },
  computed: {
    viewStyle() {
      const bottom = this.playlist.length ? '60px' : '0'
      return {
        bottom
      }
    },
    ...mapState([
      'playlist'
    ])
  }
}
</script>
<style lang="scss">

</style>
