<template lang="pug">
  .lp.h-screen.bg-base.overflow-auto
    .lp__logo(class="w-4/5 max-w-md m-auto")
      logo
    .lp__catch-copy(class="w-4/5 max-w-md m-auto")
      | オンラインでお気に入りの
      br
      | コーデを見つけよう
    .lp__illust(class="w-full max-w-md m-auto mt-10")
      img(src="@/assets/images/lp_illust.png")
    .lp__auth-area(class="w-4/5 max-w-md m-auto mt-10")
      base-button(label="アカウント作成" backgroundColor="#fff" textColor="#08d9d6" to="/signup" round)
      base-button.mt-4(label="ログイン" to="/signin" flat)
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseButton from '@/components/atoms/BaseButton.vue'
import Logo from '@/components/atoms/Logo.vue'

@Component({
  components: {
    BaseButton,
    Logo
  }
})
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
.lp {
  padding-top: 10vh;

  &__catch-copy {
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    margin-top: 15vh;
  }
}
</style>
