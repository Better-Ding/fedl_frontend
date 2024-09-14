<template>
  <div class="mainContainer">
    <!-- <header>
        <h1> Federated Learning Visualization </h1>
    </header> -->

    <section class="container">
      <!-- 左容器 -->
      <section class="itemLeft">
        <leftPanel/>
      </section>

      <!-- 中容器 -->
      <section class="itemCenter">
        <centerPanel/>
      </section>

      <!-- 右容器 -->
      <section class="itemRight">
        <rightPanel/>
      </section>

    </section>

   
  </div>
</template>

<script>
import rightPanel from './RightPanel/rightPanel.vue'
import leftPanel from './LeftPanel/leftPanel.vue'
import centerPanel from './CenterPanel/centerPanel.vue'

import {inject} from "vue"

export default {
    components:{
      rightPanel,
      leftPanel,
      centerPanel,

    },
    setup(){
      // let $echarts = inject("echarts")
      let $http = inject("axios")
      console.log($http)
    }
}
</script>

<style lang="less" scoped>

.mainContainer{
  // position: relative;
  background-color: #c8c9cc;
  max-height: 100vh;
  width: 100vw;
  padding: 10px;
  box-sizing: border-box;
  // overflow: hidden;
  .container{
  box-sizing: border-box;

  padding: .125rem;
  display: flex;
  justify-content: space-between; /* 左右子元素沿父元素两侧分布 */

  .itemLeft{
    flex: 0.7;
    
  }
  .itemRight{
    flex: 1;
    margin-left: 10px;
  }
  .itemCenter{
    flex: 1.5;
    margin-left: 10px;
  }
}

}

// 大容器样式设置




</style>   