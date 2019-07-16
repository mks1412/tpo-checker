<template lang="pug">
  form.user-profile-form(@submit.prevent="onSubmit")
    text-field(
      v-model="name"
      placeholder="ユーザー名"
      required
      hideDetails
      box
    )
    segmented-control.mt-4(
      v-model="gender"
      :options="genders"
      name="gender"
      round
    )
    text-field.mt-4(
      v-model="age"
      type="number"
      placeholder="年齢"
      suffix="歳"
      min="0"
      max="150"
      box
    )
    .flex.mt-4
      text-field.mr-2(
        v-model="height"
        type="number"
        placeholder="身長"
        suffix="cm"
        min="0"
        max="300"
        box
      )
      text-field(
        v-model="weight"
        type="number"
        placeholder="体重"
        suffix="kg"
        min="0"
        max="300"
        box
      )
    base-button.mt-6(
      type="submit"
      :label="buttonLabel"
      :disabled="!isProfileValid"
      small
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import TextField from '@/components/atoms/TextField.vue'
import SelectBox from '@/components/atoms/SelectBox.vue'
import SegmentedControl from '@/components/atoms/SegmentedControl.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { SelectableOption } from '@/components/atoms/BaseInput.vue'
import { Gender } from '@/entities/User'

export interface UserProfileFormParams {
  name: string
  gender: Gender
  age: number
  height: number | null
  weight: number | null
}

interface UserProfileDiff {
  name?: string
  gender?: Gender
  age?: number
  height?: number | null
  weight?: number | null
}

@Component({
  components: {
    TextField,
    SegmentedControl,
    SelectBox,
    BaseButton
  }
})
export default class UserProfileForm extends Vue {
  @Prop({ type: Object, required: true }) value!: UserProfileFormParams
  @Prop({ type: String, required: true }) buttonLabel!: string

  private genders: SelectableOption[] = [{ label: 'MEN', value: Gender.male }, { label: 'WOMEN', value: Gender.female }]

  get name() {
    return this.value.name
  }

  set name(name: string) {
    this.updateValue({ name })
  }

  get gender() {
    return this.value.gender
  }

  set gender(gender: Gender) {
    this.updateValue({ gender })
  }

  get age() {
    return this.value.age
  }

  set age(age: number) {
    this.updateValue({ age })
  }

  get height() {
    return this.value.height
  }

  set height(height: number | null) {
    this.updateValue({ height })
  }

  get weight() {
    return this.value.weight
  }

  set weight(weight: number | null) {
    this.updateValue({ weight })
  }

  get isProfileValid(): boolean {
    return !!this.name
  }

  private updateValue(diff: UserProfileDiff) {
    this.$emit('input', { ...this.value, ...diff })
  }

  private onSubmit() {
    this.$emit('submit')
  }
}
</script>
