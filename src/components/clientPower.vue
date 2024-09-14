<template>
    <div class="item">
      <div class="clientPower">
        <h1>
          Client Training Dataset Ratio
        </h1>
        <div class="charts" ref="chart"></div>
      </div>
      
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, reactive} from 'vue'
  import * as echarts from 'echarts'
  import emitter from "../mitt/index.js";

  export default {
    setup() {
      let myData = reactive({})
      const chart = ref(null)
      let myChart = null
      const symbolSize = 20
      const data = [['Client 1', 0.3], ['Client 2', 0.1], ['Client 3', 0.2], ['Client 4', 0.3], ['Client 5', 0.1]]
      let originalX = null // 记录 circle 拖动前的 x 坐标
      const drawChart = () => {
        myChart = echarts.init(chart.value)
  
        const option = {
          color:['#79bbff'],
          label: {
            show: true,
            position: 'top'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            },
          },
          grid: {
            top: '8%',
            bottom: '12%'
          },
          xAxis: {
            data: ['Client 1','Client 2', 'Client 3','Client 4', 'Client 5'],
            type: 'category',
            // axisLine: { onZero: false }
          },
          yAxis: {
            min: 0,
            max: 1,
            type: 'value',
            // axisLine: { onZero: false }
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              filterMode: 'none'
            },

            {
              type: 'inside',
              xAxisIndex: 0,
              filterMode: 'none'
            },
            {
              type: 'inside',
              yAxisIndex: 0,
              filterMode: 'none'
            }
          ],
          series: [
            {
              id: 'a',
              type: 'bar',
              symbolSize: symbolSize,
              data: data
            }
          ]
        }
  
        setTimeout(() => {
          // Add shadow circles (which is not visible) to enable drag.
          myChart.setOption({
            graphic: data.map(function (item, dataIndex) {
              return {
                type: 'circle',
                position: myChart.convertToPixel('grid', item),
                shape: {
                  cx: 0,
                  cy: 0,
                  r: symbolSize
                },
                style: {
                fill: 'blue',    // 填充颜色
                stroke: '#000',  // 边框颜色
                lineWidth: 1     // 边框宽度
              },
                invisible: true,
                draggable: true,

                ondragstart: function () {
                  
                  originalX = this.position[0] // 记录拖动前的 x 坐标
                  console.log(originalX)
                },
                //鼠标拖动
                ondrag: function () {
                  // const roundedNum = parseFloat(this.y.toFixed(2));
                  onPointDragging(dataIndex, [originalX, this.y])
                },
                // 鼠标移动
                onmousemove: function () {

                  showTooltip(dataIndex)
                },
                // 鼠标离开
                onmouseout: function () {

                  hideTooltip(dataIndex)
                },
                z: 100,
                dataIndex: dataIndex
              }
            })
          })
        }, 0)
        window.addEventListener('resize', updatePosition)
        myChart.on('dataZoom', updatePosition)
        myChart.setOption(option)
      }
  
      const updatePosition = () => {
        myChart.setOption({
          graphic: data.map(function (item) {
            return {
              position: myChart.convertToPixel('grid', item)
            }
          })
        })
      }
  
      const showTooltip = (dataIndex) => {
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        })
      }
  
      const hideTooltip = () => {
        myChart.dispatchAction({
          type: 'hideTip'
        })
      }
  
      const onPointDragging = (dataIndex, pos) => {
        // temp=[]
        
        data[dataIndex][1] = myChart.convertFromPixel('grid', pos)[1]
        const graphic = myChart.getOption().graphic[0].elements;
        const circle = graphic[dataIndex];
        
        const newCircle = Object.assign({}, circle);
        newCircle.position = pos;
        // console.log(newCircle)
        graphic.splice(graphic.indexOf(circle), 1, newCircle);
        const num =  data[dataIndex][1]
        const roundedNum = parseFloat(num.toFixed(2));
        data[dataIndex][1] = roundedNum
        myData = data[dataIndex]
        // Update data
        myChart.setOption({
          series: [
            {
              id: 'a',
              data: data
            }
          ],
          graphic:graphic
          
        })
      }
      
      
  

      onMounted(() => {
        drawChart()
        // console.log(myChart)
        emitter.on('test', () => {
              myData =  myChart.getOption().series[0].data
              console.log(myData)
              emitter.emit('pushData', myData)
          });
        
      })
  
      onUnmounted(() => {
        window.removeEventListener('resize', updatePosition)
        myChart.dispose()
        myChart = null
      })
  
      return {
        chart, originalX
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  
  .item{
      height: 415px;
      border: 1px solid rgb(189, 188, 185);
      background-color:#f4f4f5;
      margin:  5px 0;
      padding: 10px;
      // background-color: rgba(12, 130, 255, .85);
      .clientPower{
        height: 100%;
        padding: 1px 4px;
        h1{
          font-size: 20px;
        }
        .charts{
            height: 370px;
            width: 390px;

        }
      }
  }
  
  </style>