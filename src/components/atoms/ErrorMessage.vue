<template lang="pug">
  .f-error-message(v-show="message")
    p.text-red-600.text-center.border.border-red-600.p-2.rounded {{ message }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ErrorMessage extends Vue {
  @Prop({ type: String, required: true }) message!: string
}
</script>
