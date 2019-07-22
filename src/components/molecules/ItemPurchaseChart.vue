<template lang="pug">
  .item-purchase-chart.shadow.py-2
    button.item-purchase-chart__control.item-purchase-chart__control--left(v-if="prevEnabled" @click="prevYear" :disabled="analytics.loading")
      i.material-icons chevron_left
    button.item-purchase-chart__control.item-purchase-chart__control--right(v-if="nextEnabled" @click="nextYear" :disabled="analytics.loading")
      i.material-icons chevron_right
    transition(name="fade")
      .loader-wrapper(v-show="analytics.loading")
        loader(color="#08d9d6")
    chart(:options="chartOptions")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Chart } from 'highcharts-vue'
import * as Highcharts from 'highcharts'
import Loader from '@/components/atoms/Loader.vue'
import { analyticsModule } from '@/store/analytics/const'
import { PurchaseHistoryEntity } from '@/entities/ItemAnalytics'

@Component({ components: { Loader, Chart } })
export default class ItemPurchaseChart extends Vue {
  @analyticsModule.State('byPurchasedAt')
  private analytics!: { loading: boolean; entity: PurchaseHistoryEntity }

  @analyticsModule.Action('loadByPurchasedAt')
  private load!: (year: number) => Promise<void>

  mounted() {
    setTimeout(() => this.load(this.year), 0)
  }

  private year: number = new Date().getFullYear()

  get prevEnabled(): boolean {
    return this.year >= 1970
  }

  get nextEnabled(): boolean {
    return this.year < new Date().getFullYear()
  }

  get chartOptions(): Highcharts.Options {
    return {
      title: {
        text: '購入数推移',
        style: { color: '#333333', fontSize: '18px', fontWeight: 'bold' }
      },
      subtitle: {
        text: `${this.year}年`
      },
      chart: {
        type: 'column'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        softMax: 10,
        min: 0,
        title: {
          text: ''
        },
        allowDecimals: false
      },
      plotOptions: {
        column: {
          borderRadius: 5,
          pointWidth: 10
        }
      },
      tooltip: {
        valueSuffix: '点'
      },
      series: [
        {
          type: 'column',
          name: `${this.year}年`,
          data: this.analytics.entity.data
        }
      ]
    }
  }

  private nextYear() {
    this.year = this.year + 1
    this.load(this.year)
  }

  private prevYear() {
    this.year = this.year - 1
    this.load(this.year)
  }
}
</script>

<style lang="scss" scoped>
.item-purchase-chart {
  position: relative;

  &__control {
    position: absolute;
    top: 4%;
    z-index: 10;
    outline: 0;
    height: 32px;

    .material-icons {
      font-size: 32px;
      color: #555;
    }

    &--left {
      left: 5%;
    }

    &--right {
      right: 5%;
    }
  }

  .loader-wrapper {
    position: absolute;
    background: #fff;
    width: 100%;
    height: calc(100% - 55px);
    align-items: center;
    display: flex;
    bottom: 0;
    z-index: 1;
  }
}
</style>
