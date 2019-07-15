<template lang="pug">
  .f-segmented-control(:style="styles")
    template(v-for="option in options")
      input.f-segmented-control__input(
        type="radio"
        :name="name"
        :value="option.value"
        :id="option.value"
        v-model="picked"
      )
      label.f-segmented-control__label(:for="option.value") {{ option.label }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SelectableOption } from '@/components/atoms/BaseInput.vue'

@Component({})
export default class SegmentedControl extends Vue {
  @Prop({ type: String, required: true }) name!: string
  @Prop({ type: Array, required: true }) options!: SelectableOption[]
  @Prop({ type: [String, Number], required: true }) value!: string | number
  @Prop({ type: String }) color!: string

  get styles() {
    return {
      '--active-color': this.color
    }
  }

  get picked() {
    return this.value
  }

  set picked(value: string | number) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" scoped>
.f-segmented-control {
  --active-color: #08d9d6;

  border: 1px solid var(--active-color);
  color: var(--active-color);
  display: flex;
  font-size: 13px;
  position: relative;
  user-select: none;
  width: 100%;

  &__input {
    display: none;
    &:checked + label {
      color: #fff;
      background: var(--active-color);
    }
  }

  &__label {
    cursor: pointer;
    flex: 1;
    overflow: hidden;
    padding: 10px 3px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:not(:last-child) {
      border-right: 1px solid var(--active-color);
    }
  }
}
</style>
