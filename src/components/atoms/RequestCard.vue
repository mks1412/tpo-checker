<template lang="pug">
  .f-request-card.w-full.shadow.px-4.py-2(:style="styles")
    .flex.items-center
      p.font-bold.mr-2.text-md.text-gray-900 {{ request.fashionType.label }}
      p.mr-4.text-sm.text-gray-80(v-if="request.situation") @{{ request.situation }}
    .flex.justify-between.items-center.mt-2
      p.text-sm.text-gray-800 予算範囲: {{ budget }}
      p.text-xs.status-label(class="text-xs") {{ request.status.label }}

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { RequestEntity } from '@/entities/Request'

@Component({})
export default class ItemCard extends Vue {
  @Prop({ type: Object, required: true }) request!: RequestEntity

  get budget(): string {
    const min = (this.request.budgetMin || 0).toLocaleString()
    const max = this.request.budgetMax ? this.request.budgetMax.toLocaleString() : ''
    return `￥${min}〜${max}`
  }

  get styles() {
    const colors = ['#ECC94B', '#4299E1', '#48bb78']
    return {
      '--status-color': colors[this.request.status.value]
    }
  }
}
</script>

<style lang="scss" scoped>
.f-request-card {
  --status-color: #48bb78;

  .status-label {
    background: var(--status-color);
    border-radius: 10px;
    color: #fff;
    width: 60px;
    font-weight: bold;
    padding: 1px 5px;
    text-align: center;
  }
}
</style>
