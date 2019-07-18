<template lang="pug">
  .f-empty-state.flex.flex-wrap.justify-center.w-full
    .f-empty-state__image-container
      img.w-full(:src="src")
    h2.text-4xl.text-gray-lighten {{ title }}
    p.text-sm.text-gray-lighten(v-if="caption") {{ caption }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Logo extends Vue {
  @Prop({ type: String, required: true }) src!: string
  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: String }) caption!: string
}
</script>

<style lang="scss" scoped>
.f-empty-state {
  &__image-container {
    max-width: 200px;
    width: 100%;
    height: auto;
  }
}
</style>
