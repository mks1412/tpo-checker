<template lang="pug">
  .items-dashboard.py-4.px-2
    item-category-chart(:data="categoryData" :loading="loading")
    item-purchase-chart.mt-4(:data="purchasedData" :loading="false")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Loader from '@/components/atoms/Loader.vue'
import EmptyState from '@/components/atoms/EmptyState.vue'
import ItemCategoryChart from '@/components/molecules/ItemCategoryChart.vue'
import ItemPurchaseChart from '@/components/molecules/ItemPurchaseChart.vue'
import { itemModule } from '@/store/item/const'
import { userModule } from '@/store/user/const'
import { Gender } from '@/entities/User'

@Component({
  components: {
    Loader,
    EmptyState,
    ItemCategoryChart,
    ItemPurchaseChart
  }
})
export default class ItemsDashboard extends Vue {
  @userModule.Getter('gender')
  private gender!: Gender

  @itemModule.Action('load')
  private load!: (params: { category: string; force?: boolean }) => Promise<void>

  private purchasedData = [3, 5, 0, 1, 10, 2, 0, 0, 4, 2, 8, 5]

  private loading = false

  private categoryData = [
    { name: 'トップス', y: 10 },
    { name: 'パンツ', y: 6 },
    { name: 'アウター', y: 3 },
    { name: 'オールインワン', y: 1 },
    { name: 'スーツ/タイ', y: 2 },
    { name: 'バッグ', y: 3 },
    { name: 'シューズ', y: 2 },
    { name: '財布/小物', y: 0 },
    { name: '時計', y: 0 },
    { name: 'アクセサリー', y: 0 },
    { name: '帽子', y: 4 }
  ]

  mounted() {
    // setTimeout(() => this.load({ category: this.activeCategory }), 0)
  }
}
</script>

<style lang="scss" scoped>
.items {
  padding-top: 40px;
  height: 1000px;

  .loader-wrapper {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    top: 0;
    z-index: 50;
  }
}
</style>
