<template lang="pug">
  form.user-profile-form(@submit.prevent="onSubmit")
    .flex.justify-center
      .flex.justify-center(class="w-1/2")
        image-uploader(v-model="image" :path="uploadPath")
    text-field.mt-2(v-model="name" label="名称" required)
    text-field.mt-2(v-model="brand" label="ブランド")
    select-box.mr-2(v-model="categoryId" :options="categories" label="カテゴリ" required)
    .flex.mt-2
      text-field.mr-2(v-model="size" label="サイズ" class="w-1/2")
      text-field(v-model="color" label="色" class="w-1/2")
    .flex.mt-2
      select-box.mr-2(v-model="purchasedYear" :options="yearOptions" type="number" label="購入時期" class="w-1/2" nullable)
      select-box(v-model="purchasedMonth" :options="monthOptions" type="number" class="w-1/2" nullable)
    base-button.mt-6(type="submit" :label="buttonLabel" :disabled="!isItemValid" small)
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { ItemParams } from '@/entities/Item'
import TextField from '@/components/atoms/TextField.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import ImageUploader from '@/components/molecules/ImageUploader.vue'
import { SelectableOption, Gender } from '@/entities/User'
import { ItemCategories } from '@/constants/ItemCategory'
import { YearOptions, MonthOptions } from '@/constants/Date'
import { userModule } from '@/store/user/const'

interface ItemParamsDiff {
  name?: string
  brand?: string
  size?: string
  color?: string
  memo?: string
  image?: string
  purchasedYear?: number | null
  purchasedMonth?: number | null
  category?: SelectableOption | null
  subcategory?: SelectableOption | null
}

@Component({
  components: {
    TextField,
    SelectBox,
    BaseButton,
    ImageUploader
  }
})
export default class ItemDataForm extends Vue {
  @Prop({ type: Object, required: true }) value!: ItemParams
  @Prop({ type: String, required: true }) buttonLabel!: string

  @userModule.Getter('gender')
  private gender!: Gender

  @userModule.Getter('uid')
  private userId!: string

  private categories: SelectableOption[] = ItemCategories(this.gender)
  private yearOptions = YearOptions()
  private monthOptions = MonthOptions()
  private categoryId: string = ''

  @Watch('categoryId')
  onCategoryChanged(val: string) {
    const category = this.categories.find((c) => c.value === val)
    if (category) {
      this.updateValue({ category })
    } else {
      this.updateValue({ category: null })
    }
  }

  mounted() {
    if (this.value.category && this.value.category.value) {
      this.categoryId = this.value.category.value as string
    }
  }

  get uploadPath() {
    return `users/${this.userId}/items/hoge`
  }

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

  get memo() {
    return this.value.memo
  }

  set memo(memo: string) {
    this.updateValue({ memo })
  }

  get image() {
    return this.value.image
  }

  set image(image: string) {
    this.updateValue({ image })
  }

  get purchasedYear() {
    return this.value.purchasedYear
  }

  set purchasedYear(purchasedYear: number | null) {
    this.updateValue({ purchasedYear })
  }

  get purchasedMonth() {
    return this.value.purchasedMonth
  }

  set purchasedMonth(purchasedMonth: number | null) {
    this.updateValue({ purchasedMonth })
  }

  get isItemValid(): boolean {
    return !!this.name && !!this.value.category
  }

  private updateValue(diff: ItemParamsDiff) {
    this.$emit('input', { ...this.value, ...diff })
  }

  private onSubmit() {
    this.$emit('submit')
  }
}
</script>
