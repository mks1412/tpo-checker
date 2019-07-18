<template lang="pug">
  .global-header
    .global-header__content
      logo.w-24(color="#828282")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/atoms/Logo.vue'

@Component({
  components: { Logo }
})
export default class GlobalHeader extends Vue {}
</script>

<style lang="scss" scoped>
.global-header {
  background-color: #fff;
  border-bottom: 0.5px solid #dfe0e4;
  height: 50px;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  width: 100%;
  z-index: 100;

  &__content {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 20px;
  }
}
</style>
