// 滚动组件
import BScroll from "@better-scroll/core"
import ObserveDOM from "@better-scroll/observe-dom"
import { onMounted, onUnmounted, ref } from "vue"
BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    // 内容高度变化时重新计算
    scroll.value = new BScroll(wrapperRef.value, { observeDOM: true, ...options })
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
}