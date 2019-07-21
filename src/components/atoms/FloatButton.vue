<template lang="pug">
  button.f-float-btn(
    :class="classes"
    :style="styles"
    @click="onClick"
  )
    i.material-icons.text-white {{ icon }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FloatButton extends Vue {
  @Prop({ type: String, required: true }) icon!: string
  @Prop({ type: String, default: '#08d9d6' }) backgroundColor!: string
  @Prop({ type: Boolean, default: false }) depressed!: boolean
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: Boolean, default: false }) small!: boolean
  @Prop({ type: String, default: 'right' }) position!: 'left' | 'right'
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
      '--text-color': this.textColor,
      '--left-position': this.position === 'left' ? '15px' : 'none',
      '--right-position': this.position === 'right' ? '15px' : 'none'
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
  --left-position: none;
  --right-position: 15px;

  background-color: var(--background-color);
  border: none;
  border-radius: 999px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  position: fixed;
  right: var(--right-position);
  left: var(--left-position);
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
}
</style>
