<template>

  <router-view/>
  

</template>

<script>
import  {provide} from "vue"
import * as echarts from "echarts"
import axios from "axios"
// axios.defaults.baseURL="http://localhost:5000"

export default {
  setup() {
    const api = axios.create({
      baseURL: "http://localhost:5000/"
    });
    
    // provider("名字", "内容")
    provide("echarts", echarts)
    provide("axios", api)

    return {
      api
    };
  },
}
</script>


<style lang="less">
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}

body{
  background-color: #c8c9cc;
  color: #000;
}

</style>
