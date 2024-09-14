<template>
  <div class="item">
    <div class="polarChart2">
      <div style="display: flex;">
        <h1>
          Update Parameter 
        </h1>
        <div class="selection">
          <el-select @change="handleSelect" v-model="value" placeholder="Select">
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

  
      <div class="charts" >
        <iframe
        id="myFrame"
         :src="htmlUrl" 
         scrolling="no" 
         class="network"
         height="470px"
         width="450px">

        </iframe>
      </div>
      <my-content/>
    </div>
    
    <!-- <div id="70083d2a461840d2ad0e35817d404160" class="chart-container"></div> -->
  </div>
</template>

<script>

import {inject, reactive, ref} from "vue";

export default {

    setup(){
        

        const options = [
        {
          value: '1',
          label: 'Epoch 1',
        },
        {
          value: '2',
          label: 'Epoch 2',
        },
        {
          value: '3',
          label: 'Epoch 3',
        },
        {
          value: '4',
          label: 'Epoch 4',
        },
        {
          value: '5',
          label: 'Epoch 5',
        },
        {
          value: '6',
          label: 'Epoch 6',
        },
        {
          value: '7',
          label: 'Epoch 7',
        },
        {
          value: '8',
          label: 'Epoch 8',
        },
        {
          value: '9',
          label: 'Epoch 9',
        },
        {
          value: '10',
          label: 'Epoch 10',
        },
        {
          value: '11',
          label: 'Epoch 11',
        },
        {
          value: '12',
          label: 'Epoch 12',
        },
        {
          value: '13',
          label: 'Epoch 13',
        },
        {
          value: '14',
          label: 'Epoch 14',
        },
        {
          value: '15',
          label: 'Epoch 15',
        },

        ]
        const value = ref(options[0].value)
        let data = reactive({htmlData: ''})
        let $axios = inject("axios")
        // 请求后端的数据
        async function getData(ecValue){

            try {
                await $axios.post("/clientParam", {
                  epoch :ecValue
                }).then( ()=>{
                  // let iframe = ref.myFrame
                  // iframe.src = ''
                  document.getElementById('myFrame').src = 'http://localhost:5000/clientParam/' + ecValue
                  // console.log(data.htmlData)
                })
                
            } catch (error) {
                console.error(error)
            }
        }

        const handleSelect = value => {
          getData(value)
        }
        // 项目刚挂载的时候运行

        return{
            handleSelect, getData, htmlContent: reactive({ content: data.htmlData }).content, value, options
        }
    },
    data(){
      return{
        htmlUrl:'http://localhost:5000/clientParam'
      }
      
    }

}
</script>

<style lang="less" scoped>

.item{
   
    height: 370px;
    border: 1px solid rgb(189, 188, 185);
    // color: #cd8184;
    background-color:#f4f4f5 ;
    margin:  5px 0;
    padding: 10px;
    // background-color: rgba(12, 130, 255, .85);
    .polarChart2{
      position: relative;
      height: 100%;
      width: 100%;
      // margin-right: 100px;
      padding: 1px 4px;
      h1{
        font-size: 20px;
      }
      .charts{
        z-index: 10;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;
        // margin-right: 1000px;
        height: 100%;
        width: 100%;
        // border: 1px solid rgb(189, 188, 185);
      }
    }
}

.network{
  // display: none;
  // width: 100%;
  // height: 100%;
  // margin-top: 50px;
  transform: scale(0.85);
  border:none; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0 auto;

  // background-color: blue;
}

.selection{
  position: absolute;
  right: 10px;
  z-index: 1000;

}

</style>