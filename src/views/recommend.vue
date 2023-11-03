<!-- 推荐 -->
<template>
  <div class="recommend">推荐</div>
</template>

<script>
import { getRecommend } from '@/service/recommend'
export default {
  data() {
    return {
      recommendData: []
    }
  },

  components: {},

  computed: {},
  async created() {
    try {
      const res = await getRecommend()
      this.recommendData = res
    } catch (error) {
      console.log('推荐数据获取失败', error);
    }

  },
  mounted() { },

  methods: {}
}

</script>
<style lang='less' scoped>
</style>