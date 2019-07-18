<template lang="pug">
  .items.flex.items-center.py-4
    .items__content.w-full.px-6
      form-large-label(text="アイテム登録" align="left")
      item-data-form.mt-4(v-model="item" buttonLabel="登録" @submit="submit")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ItemParams } from '@/entities/Item'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import ItemDataForm from '@/components/molecules/ItemDataForm.vue'
import { itemModule } from '@/store/item/const'

@Component({
  components: { FormLargeLabel, ItemDataForm }
})
export default class NewItem extends Vue {
  @itemModule.Action('add')
  private add!: (item: ItemParams) => Promise<void>

  private item: ItemParams = {
    name: '',
    brand: '',
    size: '',
    color: '',
    memo: '',
    image: '',
    purchasedYear: new Date().getFullYear(),
    purchasedMonth: new Date().getMonth() + 1,
    category: null,
    subcategory: null
  }

  private submit() {
    const category = this.item.category!.value as string
    this.add(this.item)
      .then(() => this.$router.push({ name: 'items', query: { category } }))
      .catch((e) => console.log(e))
  }
}
</script>
