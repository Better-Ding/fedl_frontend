<template>
    <div>
      <div class="parameterTune">
          <h1>
            Model Parameter
          </h1>

          <div class="slider-demo-block">
            <h3>Learning Rate</h3>
            <div>
              <el-slider v-model="learningRate"  :min="0" :max="0.0001" :step="0.00001"/>
            </div>
            <h4>{{ learningRate }}</h4>
          </div>
          <div class="slider-demo-block">
            <h3>Iteration Num</h3>
            <div>
              <el-slider v-model="iterationNum" :min="0" :max="500" :step="1"/>
            </div>
            <h4>{{ iterationNum }}</h4>
          </div>
          <div class="slider-demo-block">
            <h3>Batch Size</h3>
            <div>
              <el-slider 
              v-model="batchsize" 
              :min="0" 
              :max="128" 
              :step="16"
              show-stops 
              />
            </div>
            <h4>{{ batchsize }}</h4>
          </div>
  
          <div class="buttons">
            <el-button type="primary" class="button" @click="startRun" :element-loading-spinner="svg">Run</el-button>
            <el-button type="warning"  class="button">Stop</el-button>
          </div>
  
      </div>
  
    </div>
  </template>
  
  <script>
  import { ref,inject,onMounted} from 'vue'
  import { ElLoading } from 'element-plus'
  import emitter from "../mitt/index.js";
  // 滑动条数值
  
  export default {

    setup(){
      let $axios = inject("axios")
      let dataset = inject("dataset")._value
      let paramData = null;
      const learningRate = ref(0.00001)
      const iterationNum = ref(100)
      const batchsize = ref(32)

      const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `  
      const startRun = () => {
        emitter.emit('test');
        // appContext.config.globalProperties.$mitt.emit('updateValue');

        postData().then(()=>{
        })
        console.log(learningRate.value)
        const loading = ElLoading.service({
          lock: true,
          text: 'Requesting....',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
      }

      async function postData(){
            try {
              const response = await $axios.post('/obtainParam',{
                learningRate: learningRate.value,
                iterationNum: iterationNum.value,
                batchsize : batchsize.value,
                paramData: paramData,
                dataset:dataset
              })
              console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }

      onMounted(()=>{

        emitter.on('pushData', (value) => {
              paramData = value 
          });
      })

      return {
        postData,
        learningRate,
        iterationNum,
        batchsize,
        startRun,
        svg,
      };
    },

  
  }
  </script>
  
  <style lang="less" scoped>
  .parameterTune{
    margin-top: 5px;
    border: 1px solid rgb(189, 188, 185);
    background-color:#f4f4f5 ;
    padding: 10px;
    position: relative;
    // display: flex;
    // flex-direction: column;
    h1{
      font-size: 18px;
      padding: 1px 4px;
    }
  
  }
  .slider-demo-block {
    margin-top: 15px;
    display: flex;
    align-items: center;
    div{
      width: 90%;
    }
    h3{
      width: 150px;
      font-size: 15px;
      padding: 1px 4px;
    }
    .el-slider {
      width: 200px;
      margin-top: 0;
      margin-left: 10px;
    }
  }
  
  .buttons{
    padding-top: 20px;
    width: 100%;
    display: flex;
    .button{
      margin: 0 auto;
    }
  
  
  }
  
  h4{
    position: absolute;
    right: 15px;
  }
  
  </style>