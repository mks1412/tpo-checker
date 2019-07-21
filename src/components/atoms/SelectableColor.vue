<template lang="pug">
  .f-selectable-color(:style="styles")
    .f-selectable-color__cell(v-for="color in colors" :key="color.value")
      input.f-selectable-color__input(
        type="radio"
        name="color"
        :value="color.value"
        :id="color.value"
        v-model="picked"
      )
      label.f-selectable-color__label(:for="color.value")
        template(v-if="color.value === 'other'")
          .bg
            span.other ？
        template(v-else)
          .bg(:style="`background:${color.value};`")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ItemColors } from '@/constants/ItemColor'
import { SelectableOption } from '@/entities/User'

@Component({})
export default class SelectableColor extends Vue {
  @Prop({ type: Object, required: true }) value!: SelectableOption

  private colors = ItemColors()

  get styles(): { [key: string]: string } {
    return {
      '--color': this.value.value as string
    }
  }

  get picked() {
    return this.value.value as string
  }

  set picked(value: string) {
    this.$emit('input', this.colors.find((c) => c.value === value))
  }
}
</script>

<style lang="scss" scoped>
.f-selectable-color {
  --color: #6fcf97;

  display: flex;
  flex-wrap: wrap;
  width: 100%;

  &__cell {
    width: 25%;
    max-width: 120px;
    padding: 8px;
    border-radius: 50%;
  }

  &__input {
    display: none;
    &:checked + label {
      background: #19af64;

      .other {
        color: #19af64;
      }
    }
  }

  &__label {
    background: #eee;
    border-radius: 50%;
    display: block;
    position: relative;
    padding: 3px;
    width: 100%;

    .bg {
      background: #eee;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-radius: 50%;
    }

    .other {
      color: #fff;
      font-size: 28px;
      font-weight: 700;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
