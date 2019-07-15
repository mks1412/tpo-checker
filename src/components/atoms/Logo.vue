<template lang="pug">
  .f-logo(:style="styles")
    include ../svg/logo.svg
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Logo extends Vue {
  @Prop({ type: String, default: '#fff' }) color!: string

  get styles(): { [key: string]: string } {
    return {
      '--logo-color': this.color
    }
  }
}
</script>

<style lang="scss" scoped>
.f-logo {
  --logo-color: #fff;

  svg {
    width: 100%;
    height: auto;
  }

  path {
    fill: var(--logo-color);
  }
}
</style>
