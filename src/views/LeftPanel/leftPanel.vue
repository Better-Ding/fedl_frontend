<template>
    <div>
      <div class="dataSelect">
        <h1>
          Data Channels
        </h1>
        <div>
          <el-select v-model="value" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </div>

      </div>

      <parameterTune />
      
      <clientPower />

      <heatMap/>
      
    </div>
  </template>
  
  <script>
  import parameterTune from '@/components/parameterTune.vue';
  import heatMap from '@/components/heatMap.vue';
  import clientPower from '@/components/clientPower.vue';
  import { provide, ref } from 'vue'
  
  export default {

    setup(){
      const value = ref('Conll2003')
      const options = [
      {
        value: 'IMDb',
        label: 'IMDb',
      },
      {
        value: 'Conll2003',
        label: 'Conll2003',
      },
      {
        value: 'Amazon Review',
        label: 'Amazon Review',
      },
      {
        value: 'Amazon Fine Food Reviews',
        label: 'Amazon Fine Food Reviews',
      },

      ]
      provide("dataset", value )
      return{
        value, options
      }
    },
    components:{
        heatMap,
        parameterTune,
        clientPower
    },

  }
  </script>
  
  <style lang="less">
  .dataSelect{
    border: 1px solid rgb(189, 188, 185);
    background-color:#f4f4f5 ;
    padding: 10px;
    h1{
      font-size: 20px;
      padding: 1px 4px;
    }
    div{
      margin-top: 2px;
    }
  }

  

  

  </style>