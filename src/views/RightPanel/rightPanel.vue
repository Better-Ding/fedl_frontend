<template>
  <div>
    <polarchart />
    <histogram/>
    <performanceBottom />
  </div>
</template>

<script>
import { ref} from 'vue'
import performanceBottom from "@/components/performanceBottom.vue"
import polarchart from "@/components/polarChart.vue"
import histogram from "@/components/rightHistogram.vue"
// 滑动条数值
const learningRate = ref(0)
const iterationNum = ref(40)
const batchsize = ref(16)


export default {
  components:{
      polarchart,
      histogram,
      performanceBottom
  },
  // setup() {
  //   const params = computed(() => {
  //     const max = 512;
  //     const min = 16;
  //     // const step = 1;
  //     const stops = [];

  //     for (let i = Math.log2(min); i <= Math.log2(max); i++) {
  //       if (Math.pow(2, i) >= min && Math.pow(2, i) <= max) {
  //         stops.push(Math.pow(2, i));
  //       }
  //       console.log(stop)
  //     }
     
  //     return {
  //       min,
  //       max,
  //       stop,
  //       step: stops[1]-stops[0],
  //       marks: stops.reduce((prev, current) => {
  //         return { ...prev, [current]: '' };
  //       }, {}),
  //     };
  //   });

  //   return {
  //     params
  //   };
  // },
  data(){
    return({
      learningRate: learningRate,
      iterationNum: iterationNum,
      batchsize: batchsize
    })
  },

}
</script>

<style lang="less" scoped>
.parameterTune{
  border: 1px solid rgb(189, 188, 185);
  // padding: 10px;
  position: relative;
  h1{
    font-size: 15px;
    padding: 1px 4px;
  }

}


h4{
  position: absolute;
  right: 15px;
}

</style>