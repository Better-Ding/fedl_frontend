<template>
    <div class="centerPanel">
      <distributionChat/>
      <neuralNetwork/>

    </div>
  </template>


  <script>
  import neuralNetwork from "@/components/neuralNetwork.vue"
  import distributionChat from "@/components/distributionChat.vue"
  export default {
    components:{
      neuralNetwork,
      distributionChat
    }
  }
  </script>
  
  <style lang="less" scoped>
  .centerPanel{
    // margin: 0 20px;
    // border: 1px solid rgb(189, 188, 185);
    // padding: 10px;
    h1{
      font-size: 15px;
      padding: 1px 4px;
    }

  }
  
  </style>