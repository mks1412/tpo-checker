<template lang="pug">
  .request
    .request__content.w-full.p-6
      form-large-label(text="コーディネート依頼" align="left")
      form.request-form.mt-4(@submit.prevent="onSubmit")
        select-box.mr-2(v-model="fashionTypeId" :options="fashionTypeOptions" label="ファッション系統" required)
        text-field(v-model="request.situation" label="シチュエーション")
        .flex.-mt-6
          text-field.mr-2(v-model="request.budgetMin" type="number" label="予算下限" suffix="円" min="0" class="w-1/2")
          text-field(v-model="request.budgetMax" type="number" label="予算上限" suffix="円" min="0" class="w-1/2")
        text-field(v-model="request.remarks" label="その他要望・備考")
        base-button.mt-6(type="submit" label="依頼" :disabled="!isRequestValid" :loading="isLoading" small)
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Gender } from '@/entities/User'
import { RequestParams, Status } from '@/entities/Request'
import { requestModule } from '@/store/request/const'
import { FashionTypes } from '@/constants/FashionType'
import { userModule } from '@/store/user/const'
import TextField from '@/components/atoms/TextField.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'

@Component({
  components: {
    TextField,
    SelectBox,
    BaseButton,
    FormLargeLabel
  }
})
export default class NewRequest extends Vue {
  @userModule.Getter('gender')
  private gender!: Gender

  @requestModule.Action('add')
  private add!: (request: RequestParams) => Promise<void>

  @requestModule.State('loading')
  private isLoading!: boolean

  private fashionTypeId: string = ''
  private fashionTypeOptions = FashionTypes(this.gender)

  @Watch('fashionTypeId')
  onCategoryChanged(val: string) {
    const type = this.fashionTypeOptions.find((f) => f.value === val)
    if (type) {
      this.request.fashionType = type
    } else {
      this.request.fashionType = null
    }
  }

  get isRequestValid(): boolean {
    return !!this.request.fashionType
  }

  private request: RequestParams = {
    situation: '',
    remarks: '',
    budgetMax: null,
    budgetMin: null,
    fashionType: null,
    status: { value: Status.requested, label: '未対応' }
  }

  private onSubmit() {
    this.add(this.request).then(() => this.$router.push('/requests'))
  }
}
</script>
