<template lang="pug">
  form.user-profile-form(@submit.prevent="onSubmit")
    text-field(v-model="name" placeholder="名称" required box)
    text-field.mt-4(v-model="brand" placeholder="ブランド" box)
    .flex.mt-4
      select-box.mr-2(v-model="category" placeholder="カテゴリ" box)
      select-box.mr-2(v-model="subcategory" placeholder="サブカテゴリ" box)
    base-button.mt-6(type="submit" :label="buttonLabel" :disabled="!isItemValid" small)
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ItemDocument, ItemCategory } from '@/entities/Item'
import TextField from '@/components/atoms/TextField.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { SelectableOption } from '@/components/atoms/BaseInput.vue'
import { Gender } from '@/entities/User'

interface ItemDocumentDiff {
  name?: string
  brand?: string
  size?: string
  color?: string
  memo?: string
  purchasedAt?: Date
  category?: ItemCategory
  subcategory?: ItemCategory
}

@Component({
  components: {
    TextField,
    SelectBox,
    BaseButton
  }
})
export default class ItemDataForm extends Vue {
  @Prop({ type: Object, required: true }) value!: ItemDocument
  @Prop({ type: String, required: true }) buttonLabel!: string

  get name() {
    return this.value.name
  }

  set name(name: string) {
    this.updateValue({ name })
  }

  get brand() {
    return this.value.brand
  }

  set brand(brand: string) {
    this.updateValue({ brand })
  }

  get size() {
    return this.value.size
  }

  set size(size: string) {
    this.updateValue({ size })
  }

  get color() {
    return this.value.color
  }

  set color(color: string) {
    this.updateValue({ color })
  }

  get category() {
    return this.value.category
  }

  set category(category: ItemCategory) {
    this.updateValue({ category })
  }

  get subcategory() {
    return this.value.subcategory
  }

  set subcategory(subcategory: ItemCategory) {
    this.updateValue({ subcategory })
  }

  get memo() {
    return this.value.memo
  }

  set memo(memo: string) {
    this.updateValue({ memo })
  }

  get purchasedAt() {
    return this.value.purchasedAt
  }

  set purchasedAt(purchasedAt: Date) {
    this.updateValue({ purchasedAt })
  }

  get isItemValid(): boolean {
    return !!this.name && !!this.category
  }

  private updateValue(diff: ItemDocumentDiff) {
    this.$emit('input', { ...this.value, ...diff })
  }

  private onSubmit() {
    this.$emit('submit')
  }
}
</script>
