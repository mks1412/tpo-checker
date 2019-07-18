<template lang="pug">
  p.font-bold.text-gray-lighten(:class="classes") {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FormLargeLabel extends Vue {
  @Prop({ type: String, required: true }) text!: string
  @Prop({ type: String, default: 'center' }) align!: 'center' | 'left' | 'right'

  private get classes() {
    return `text-${this.align}`
  }
}
</script>
