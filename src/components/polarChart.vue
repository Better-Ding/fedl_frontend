<template>
  <div class="item">
    <div class="lineChart">
      <div style="display: flex;">
        <h1>
          Client Updates Contribution
        </h1>
        <div class="selection">
            <el-select v-model="value" placeholder="Select" > 
              <el-option
                v-for="item in dataOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
        </div>
      </div>

      <div class="charts" id="haChart">
        图表
      </div>
    </div>
    
    <!-- <div id="70083d2a461840d2ad0e35817d404160" class="chart-container"></div> -->
  </div>
</template>

<script>

import {inject, onMounted,reactive, toRefs, ref} from "vue";

export default {

    setup(){
        const value = ref('Epoch 1 - 5')
        const dataOptions = [
        {
          value: 'Epoch 1',
          label: 'Epoch 1 - 5',
        },
        {
          value: 'Epoch 2',
          label: 'Epoch 5 - 10',
        },
        {
          value: 'Epoch 3',
          label: 'Epoch 10 - 15',
        },
        {
          value: 'Epoch 4',
          label: 'Epoch 15 - 20',
        },

        ]
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
                const response = await $axios({url:"/clientUpdate"})
                data = response.data
                console.log(data)
                getOptions()
            } catch (error) {
                console.error(error)
            }
        }

        // 项目刚挂载的时候运行
        onMounted(()=>{
            let myChart = $echarts.init(document.getElementById("haChart"), 'white')
            getData().then(()=>{
                // getOptions()
                myChart.setOption(options.value)
                myChart.setOption({
                  color: ['#85bedb','#de6e6a','#f2ca6b','rgb(158,202,127)', '#79bbff'],
                  tooltip: {},
                  grid: {
                    left: '15%',   // 左侧留白距离为 10%
                    right: '5%',  // 右侧留白距离为 10%
                    top: '5%',
                    bottom: '10%', // 底部留白距离为 10%
                    containLabel: true // 绘制区域包含坐标轴标签
                  },
                  legend: {
                      orient: 'vertical',
                      right: 10,
                      top: 100,
                      bottom: 20,
                      margin: '60px',
                      // data: ['Series 1', 'Series 2', 'Series 3']
                  },
                })
                
            })
            

        })

        return{
            getData, data, getOptions, options: toRefs(options), dataOptions, value
        }
    },

}
</script>

<style lang="less" scoped>

.item{
    height: 370px;
    border: 1px solid rgb(189, 188, 185);
    background-color:#f4f4f5;
    // margin:  5px 0;
    padding: 10px;
    // background-color: rgba(12, 130, 255, .85);
    .lineChart{
      position: relative;
      height: 100%;
      padding: 1px 4px;
      h1{
        font-size: 20px;
      }
      .charts{
        height: 100%;
        width: 500px;
        // border: 1px solid rgb(189, 188, 185);
      }
    }
}

.selection{
  position: absolute;
  right: 10px;
  // top: 40px;

}

</style>