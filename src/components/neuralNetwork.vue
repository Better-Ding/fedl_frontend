<template>
  <div class="item">
    <div class="heatmap">
      <h1>
        Model Neural Network
      </h1>
      <div class="charts" >
        <iframe
         :src="htmlUrl" 
         scrolling="no" 
         class="network"
         height="700px"
         width="1000px">

        </iframe>
      </div>
      <my-content/>
    </div>
    
    <!-- <div id="70083d2a461840d2ad0e35817d404160" class="chart-container"></div> -->
  </div>
</template>

<script>

import {inject, onMounted,reactive} from "vue";

export default {

    setup(){
        let data = reactive({htmlData: ''})
        let $axios = inject("axios")
        // 请求后端的数据
        async function getData(){
            try {
                await $axios({url:"/neuronView"}).then(response=>{
                  data.htmlData = response.data
                  console.log(data.htmlData)
                })
                
            } catch (error) {
                console.error(error)
            }
        }

        // 项目刚挂载的时候运行
        onMounted(()=>{
           
            // getData()
            

        })

        return{
            getData, htmlContent: reactive({ content: data.htmlData }).content,
        }
    },
    data(){
      return{
        htmlUrl:'http://localhost:5000/neuronView'
      }
      
    }

}
</script>

<style lang="less" scoped>

.item{
    height: 737px;
    border: 1px solid rgb(189, 188, 185);
    // color: #cd8184;
    background-color:#f4f4f5 ;
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
        // width: 300px;
        canvas{
          // margin-left: 1000px !important;
          padding: 20px !important;
        }
        // border: 1px solid rgb(189, 188, 185);
      }
    }
}

.network{
  // display: none;
  // width: 100%;
  // height: 100%;
  margin-top: -10px;
  transform: scale(0.95);
  border:none; 
  // background-color: blue;
}

</style>