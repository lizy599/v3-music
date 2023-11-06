<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>
<script>
import useScroll from './use-scroll.js';
import { ref } from 'vue'
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const rootRef = ref(null)
    useScroll(rootRef, props)
    return {
      rootRef
    }
  }
}
</script>