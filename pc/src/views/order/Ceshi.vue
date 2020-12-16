<template>
  <div class="ceshi">测试</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      old: 1,
      new: 2,
      http: 'http://wthrcdn.etouch.cn/weather_mini?city=沈阳'
    }
  },
  methods: {
    async zhengze () {
      const res = await axios.get('http://wthrcdn.etouch.cn/weather_mini?city=沈阳')
    }
  },
  created () {
    this.zhengze()
  }
}
</script>

<style>
</style>