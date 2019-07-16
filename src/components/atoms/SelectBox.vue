<template lang="pug">
  BaseInput(:inputState="inputState" :message="errorMessage || hint")
    .f-input__slot(slot="label" v-if="hasLabel")
      label {{ label }}
    .f-input__slot.f-input__slot--select-wrapper(slot="field" :class="classes")
      select.f-input__select-box(
        v-model="selected"
        :required="required"
        @focus="onFocus"
        @blur="onBlur"
      )
        option(v-if="placeholder" value="" style="display:none;") {{ placeholder }}
        option(
          v-for="option in options"
          :value="option.value"
          :key="option.value"
        )
          | {{ option.label }}
    .f-input__slot(slot="details" v-if="hasDetail")
      .error(v-if="hasError") {{ errorMessage }}
      .hint(v-else) {{ hint }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BaseInput, { SelectableOption } from '@/components/atoms/BaseInput.vue'

@Component({ components: { BaseInput } })
export default class SelectBox extends Vue {
  @Prop({ type: Array, required: true }) options!: SelectableOption[]
  @Prop({ type: Boolean, default: false }) box!: boolean
  @Prop({ type: String }) hint!: string
  @Prop({ type: String }) label!: string
  @Prop({ type: String }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: [String, Number] }) value!: string | number

  isActive: boolean = false
  errorMessage: string = ''

  get classes(): { [key: string]: boolean } {
    return { 'f-input__slot--box': this.box }
  }

  get hasLabel(): boolean {
    return !!this.label
  }

  get hasHint(): boolean {
    return !!this.hint
  }

  get hasError(): boolean {
    return !!this.errorMessage
  }

  get hasDetail(): boolean {
    return this.hasError || this.hasHint
  }

  get inputState(): string {
    if (this.isActive) return 'active'
    if (this.hasError) return 'error'
    return 'inactive'
  }

  get selected(): string | number {
    return this.value
  }

  set selected(value: string | number) {
    this.$emit('input', value)
  }

  private onFocus() {
    this.isActive = true
  }

  private onBlur() {
    this.isActive = false
    if (this.required && !this.selected) {
      this.errorMessage = '必須項目です'
    } else {
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.f-input__slot {
  .f-input__select-box {
    background-color: transparent;
    border: none;
    flex: 1 1 auto;
    line-height: 20px;
    min-width: 0px;
    max-width: 100%;
    outline: none;
    padding: 8px 0 8px;
    width: 100%;
  }
}
</style>
