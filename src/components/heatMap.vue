<template>
  <div class="item">
    <div class="heatmap">
      <h1>
        Labels Features Heatmap
      </h1>
      <div class="charts" id="oneChart">
        热力图图表
      </div>
    </div>
    
    <!-- <div id="70083d2a461840d2ad0e35817d404160" class="chart-container"></div> -->
  </div>
</template>

<script>

import {inject, onMounted,reactive, toRefs} from "vue";

export default {

    setup(){
        let data = reactive({})
        let $echarts = inject("echarts")
        let $axios = inject("axios")
        let options = reactive({})

        function getOptions(){

            options.value = data

            console.log(options.value)
            
        }

        // 请求后端的数据
        async function getData(){
            try {
                const response = await $axios({url:"/heatmap"})
                data = response.data
                console.log(data)
                getOptions()
            } catch (error) {
                console.error(error)
            }
        }

        // 项目刚挂载的时候运行
        onMounted(()=>{
            let myChart = $echarts.init(document.getElementById("oneChart"), 'white')
            getData().then(()=>{
                // getOptions()
                myChart.setOption(options.value)
                myChart.setOption({
                  grid: {
                    left: '2%',   // 左侧留白距离为 10%
                    right: '10%',  // 右侧留白距离为 10%
                    top: '5%',
                    bottom: '10%', // 底部留白距离为 10%
                    containLabel: true // 绘制区域包含坐标轴标签
                  },
                  // dataZoom: [{
                  //   type: 'slider',
                  //   start: 0,
                  //   end: 100
                  // }],
                  series:[{
                    itemStyle:{
                      normal: {
                        borderWidth: 3,
                        borderColor: '#f0f0f0'
                      },
                      emphasis: {
                          shadowBlur: 10,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    },
                  }],
                  // visualMap: {
                  //     show: true,
                  //     min: 0,
                  //     max: 50,
                  //     inRange: {
                  //       color: [
                  //           "#f89898",
                      
                  //           "#d9ecff",
                  //           "#c6e2ff",
                  //           "#a0cfff",
                  //           "#79bbff"
                  //       ]
                  //     },

                  //   },
                  xAxis: {

                    boundaryGap: true  // 设置边界为true
                  },
                  yAxis: {

                    boundaryGap: true  // 设置边界为true
                  }
                })
                
            })
            

        })

        return{
            getData, data, getOptions, options: toRefs(options)
        }
    },

    data(){
        return({
           
        })
    }
}
</script>

<style lang="less" scoped>

.item{
    height: 410px;
    border: 1px solid rgb(189, 188, 185);
    background-color:#f4f4f5;
    margin:  5px 0;
    padding: 10px;
    // background-color: rgba(12, 130, 255, .85);
    .heatmap{
      height: 100%;
      padding: 1px 4px;
      h1{
        font-size: 20px;
      }
      .charts{
        height: 100%;
        width: 350px;
        canvas{
          margin-left: 1000px !important;
          padding: 20px !important;
        }
        // border: 1px solid rgb(189, 188, 185);
      }
    }
}

</style>