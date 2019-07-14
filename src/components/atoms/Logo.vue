<template lang="pug">
  .f-logo
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
  --loog-color: #fff;

  path {
    fill: var(--loog-color);
  }
}
</style>
