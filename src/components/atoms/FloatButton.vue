<template lang="pug">
  button.f-float-btn(
    :class="classes"
    :style="styles"
    @click="onClick"
  )
    .f-float-btn__content
      include ../svg/plus.svg
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FloatButton extends Vue {
  @Prop({ type: String, default: '#08d9d6' }) backgroundColor!: string
  @Prop({ type: Boolean, default: false }) depressed!: boolean
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) small!: boolean
  @Prop({ type: String, default: '#fff' }) textColor!: string
  @Prop({ type: String }) to!: string

  get classes(): { [key: string]: boolean } {
    return {
      'f-float-btn--depressed': this.depressed,
      'f-float-btn--small': this.small
    }
  }

  get styles(): { [key: string]: string } {
    return {
      '--background-color': this.backgroundColor,
      '--text-color': this.textColor
    }
  }

  private onClick() {
    if (this.to) return this.$router.push(this.to)
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.f-float-btn {
  --background-color: #08d9d6;

  background-color: var(--background-color);
  border: none;
  border-radius: 999px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  width: 45px;
  height: 45px;
  position: fixed;
  right: 15px;
  bottom: 60px;
  outline: 0;
  margin-bottom: constant(safe-area-inset-bottom);
  margin-bottom: env(safe-area-inset-bottom);
  z-index: 100;

  &--small {
    width: 35px;
    height: 35px;
  }

  &--depressed {
    box-shadow: none;
  }

  &__content {
    width: 75%;
    margin: auto;
  }
}
</style>
