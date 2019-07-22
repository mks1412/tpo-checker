<template lang="pug">
  .item-category-chart.shadow.py-2
    transition(name="fade")
      .loader-wrapper(v-show="loading")
        loader(color="#08d9d6")
    chart(:options="chartOptions")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Chart } from 'highcharts-vue'
import * as Highcharts from 'highcharts'
import Loader from '@/components/atoms/Loader.vue'

@Component({ components: { Loader, Chart } })
export default class ItemCategoryChart extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: number[]
  @Prop({ type: Boolean, default: false }) loading!: boolean

  get chartOptions(): Highcharts.Options {
    return {
      title: {
        text: 'カテゴリ内訳',
        style: { color: '#333333', fontSize: '18px', fontWeight: 'bold' }
      },
      chart: {
        type: 'pie'
      },
      credits: {
        enabled: false
      },
      legend: {
        verticalAlign: 'bottom',
        floating: false,
        layout: 'horizontal',
        itemMarginBottom: 5
      },
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25CF</span>{point.key}: ',
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          size: '100%'
        }
      },
      series: [
        {
          type: 'pie',
          name: 'カテゴリ',
          innerSize: '50%',
          data: this.data
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.item-category-chart {
  position: relative;

  .loader-wrapper {
    position: absolute;
    background: #fff;
    width: 100%;
    height: calc(100% - 35px);
    align-items: center;
    display: flex;
    bottom: 0;
    z-index: 1;
  }
}
</style>
