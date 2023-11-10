export const currentSong = (state) => {
  // 防止首次渲染为空
  return state.playlist[state.currentIndex] || {}
}
