<template lang="pug">
  .f-item-card.w-full.shadow.flex
    .f-item-card__thumbnail(class="w-1/4 p-2")
      template(v-if="imageExists")
        .f-item-card__image(:style="`background-image:url('${item.image}')`")
      template(v-else)
        .f-item-card__image.noimage
    .f-item-card__content(class="w-3/4 p-2 flex flex-wrap content-between")
      .w-full
        p(v-if="item.brand" class="text-xs text-gray-700") {{ item.brand }}
        p(class="text-sm text-gray-900") {{ item.name }}
      .w-full.flex.justify-between
        .flex
          p(class="text-xs text-gray-700 mr-3") サイズ: {{ item.size || 'ー' }}
          p(class="text-xs text-gray-700") 購入時期: {{ puchasedAt }}
        nuxt-link.edit-btn(:to="`/items/edit/${item.id}`")
          include ../svg/edit.svg
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ItemEntity } from '@/entities/Item'

@Component({})
export default class ItemCard extends Vue {
  @Prop({ type: Object, required: true }) item!: ItemEntity
  @Prop({ type: Boolean, default: false }) depressed!: boolean

  get classes(): { [key: string]: boolean } {
    return {
      'f-item-card--depressed': this.depressed
    }
  }

  get imageExists(): boolean {
    return !!this.item.image
  }

  get puchasedAt(): string {
    return `${this.item.purchasedYear || 'ー'}/${this.item.purchasedMonth || 'ー'}`
  }
}
</script>

<style lang="scss" scoped>
.f-item-card {
  --text-color: #fff;
  --background-color: #08d9d6;

  &__image {
    background-position: center;
    background-size: contain;
    border: solid 1px #eee;
    border-radius: 999px;
    display: block;
    height: 0;
    width: 100%;
    max-width: 240px;
    padding-bottom: 100%;

    img {
      border-radius: 999px;
    }

    &.noimage {
      background-image: url('~assets/images/noimage.jpg');
    }
  }

  .edit-btn {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
}
</style>
