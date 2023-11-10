import { PLAY_MODE, SEARCH_KEY, FAVORITE_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
import storage from 'good-storage'
const state = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: load(FAVORITE_KEY),
  searchHistory: load(SEARCH_KEY),
  playHistory: []
}

export default state
