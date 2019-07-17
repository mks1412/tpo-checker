<template lang="pug">
  .f-segmented-control(:style="styles" :class="classes")
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
import { SelectableOption } from '@/entities/User'

@Component({})
export default class SegmentedControl extends Vue {
  @Prop({ type: String, required: true }) name!: string
  @Prop({ type: Array, required: true }) options!: SelectableOption[]
  @Prop({ type: [String, Number], required: true }) value!: string | number
  @Prop({ type: String }) color!: string
  @Prop({ type: Boolean, default: false }) round!: boolean

  get classes(): { [key: string]: boolean } {
    return {
      'f-segmented-control--round': this.round
    }
  }

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

  background-color: #fff;
  color: #828282;
  display: flex;
  font-size: 13px;
  position: relative;
  user-select: none;
  width: 100%;

  &--round {
    border-radius: 5px;

    .f-segmented-control__label {
      border-radius: 5px;
    }
  }

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
  }
}
</style>
