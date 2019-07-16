<template lang="pug">
  p.mt-6.font-bold.text-gray-lighten.text-center {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FormLargeLabel extends Vue {
  @Prop({ type: String, required: true }) text!: string
}
</script>
