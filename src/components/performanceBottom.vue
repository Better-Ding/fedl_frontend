<template>
  <div class="item3">
    <div class="performance">
      <h1>
        Model Performance
      </h1>

    </div>
    <perChat />
    <!-- <div id="70083d2a461840d2ad0e35817d404160" class="chart-container"></div> -->
  </div>
</template>

<script>

import {inject, onMounted,reactive, toRefs} from "vue";
import { ref } from 'vue'
import perChat from "./perChat.vue";
const value = ref('')
const options = [
  {
    value: 'Precision',
    label: 'Precision',
  },
  {
    value: 'Recall',
    label: 'Recall',
  },
  {
    value: 'F1 Score',
    label: 'F1 Score',
  },

]

export default {

    setup(){
        let data = reactive({})
        let $echarts = inject("echarts")
        let $axios = inject("axios")
        let figureOptions = reactive({})

        function getOptions(){

            figureOptions.value = data
            // figureOptions.value.
            console.log(figureOptions.value)
            
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
                myChart.setOption(figureOptions.value)
            })
            

        })

        return{
            getData, data, getOptions, figureOptions: toRefs(figureOptions)
        }
    },
    components:{
      perChat
    },
    data(){
      return({    
        value: value,
        options: options
      })
    }
}
</script>

<style lang="less" scoped>

.item3{
    width: 100%;
    background-color:#f4f4f5 ;
    border: 1px solid rgb(189, 188, 185);
    margin:  5px auto;
    padding: 10px;
    // background-color: rgba(12, 130, 255, .85);

    .performance{
      position: relative;
      display: flex;
      padding: 1px 4px;
      h1{
        font-size: 20px;
      }
      div{
        margin-left: 8px;
      }

    }

    .charts{
        // position: absolute;
        height: 100px;
        margin-top: 10px;
        border: 1px solid rgb(189, 188, 185);
      }
}

</style>