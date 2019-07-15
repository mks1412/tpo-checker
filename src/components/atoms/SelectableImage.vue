<template lang="pug">
  .f-selectable-image(:style="styles" :class="classes" @click="select")
    .f-selectable-image__content
      img(:src="src")
      .f-selectable-image__check(v-if="selected")
        include ../svg/checkmark.svg
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class BaseButton extends Vue {
  @Prop({ type: String }) color!: string
  @Prop({ type: Boolean, default: false }) round!: boolean
  @Prop({ type: Boolean, default: false }) selected!: boolean
  @Prop({ type: String, required: true }) src!: string
  @Prop({ type: [String, Number], required: true }) value!: string | number

  get classes(): { [key: string]: boolean } {
    return {
      'f-selectable-image--round': this.round,
      'f-selectable-image--selected': this.selected
    }
  }

  get styles(): { [key: string]: string } {
    return {
      '--active-color': this.color
    }
  }

  private select() {
    this.$emit('input', this.value)
  }
}
</script>

<style lang="scss" scoped>
.f-selectable-image {
  --active-color: #6fcf97;

  border: solid 3px transparent;
  width: 100%;

  &__content {
    border: solid 3px transparent;
    position: relative;
  }

  &__check {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 25%;

    svg {
      width: 100%;
      height: auto;
    }

    .colored-area {
      fill: var(--active-color);
    }
  }

  &--round {
    .f-selectable-image__content {
      border-radius: 8px;
    }

    img {
      border-radius: 5px;
    }
  }

  &--selected {
    .f-selectable-image__content {
      border-color: var(--active-color);
    }
  }
}
</style>
