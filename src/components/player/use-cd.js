import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  // 唱片dom
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  // 播放状态
  const playing = computed(() => store.state.playing)
  // 计算样式，暂停不旋转
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  // 暂停时同步唱片图片的旋转角度
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform(wrapper, inner) {
    // 外层旋转角度
    const wrapperTransform = getComputedStyle(wrapper).transform
    // 内层图片旋转角度
    const innerTransform = getComputedStyle(inner).transform
    // 当外层也有角度，需要叠加
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
