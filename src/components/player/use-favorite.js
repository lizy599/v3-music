import { useStore } from 'vuex'
import { computed } from 'vue'
import { save, remove } from '@/assets/js/array-store'
import { FAVORITE_KEY } from '@/assets/js/constant'

export default function useFavorite() {
  const store = useStore()
  // 收藏列表
  const favoriteList = computed(() => store.state.favoriteList)
  // 收藏限制
  const maxLen = 100

  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
  }
  // 点击按钮切换
  function toggleFavorite(song) {
    let list
    // 移除
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare)
    } else {
      // 添加
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.commit('setFavoriteList', list)

    function compare(item) {
      return item.id === song.id
    }
  }

  function isFavorite(song) {
    // 当前播放歌曲在收藏列表
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toggleFavorite
  }
}
