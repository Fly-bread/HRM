<template>
  <div ref="echartData" class="radar-chart" />
</template>

<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入雷达图
require('echarts/lib/chart/radar')
export default {
  data() {
    return {

    }
  },
  //   此时dom渲染完成
  mounted() {
    this.myChart = echarts.init(this.$refs.echartData)
    // this.myChart相当于定义了一个实例属性
    this.setOption()
  },
  methods: {
    setOption() {
      this.myChart.setOption({
        title: {
          text: '基础雷达图'
        },
        tooltip: {},
        legend: {
          data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '考勤', max: 100 },
            { name: '工作产出', max: 100 },
            { name: '帮助同事', max: 100 },
            { name: '培训新人', max: 100 },
            { name: '修复bug', max: 100 },
            { name: '新技术', max: 100 }
          ]
        },
        series: [{
          name: '优秀员工 VS 自己',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [100, 90, 80, 95, 99, 100],
              name: '优秀员工'
            },
            {
              value: [50, 30, 20, 10, 20, 20],
              name: '自己'
            }
          ]
        }]
      })
    }
  }
}
</script>

<style>
.radar-chart {
    width: 600px;
    height:  400px;
}
</style>
