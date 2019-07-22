<template lang="pug">
  .items-dashboard.py-4.px-2
    item-category-chart
    item-color-chart.mt-4
    item-purchase-chart.mt-4
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Loader from '@/components/atoms/Loader.vue'
import EmptyState from '@/components/atoms/EmptyState.vue'
import ItemCategoryChart from '@/components/molecules/ItemCategoryChart.vue'
import ItemColorChart from '@/components/molecules/ItemColorChart.vue'
import ItemPurchaseChart from '@/components/molecules/ItemPurchaseChart.vue'

@Component({
  components: {
    Loader,
    EmptyState,
    ItemCategoryChart,
    ItemColorChart,
    ItemPurchaseChart
  }
})
export default class ItemsDashboard extends Vue {
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
