<template lang="pug">
  .signin.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .signin__content.w-full.px-8
      nuxt-link(to="/")
        logo.w-48.m-auto(color="#828282")
      base-button.mt-6(label="Googleアカウントで作成" round small @click="signupWithGoogle")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseButton from '@/components/atoms/BaseButton.vue'
import Logo from '@/components/atoms/Logo.vue'
import { auth, googleProvider } from '@/lib/firebase'

@Component({
  components: {
    BaseButton,
    Logo
  },
  layout: 'public'
})
export default class Index extends Vue {
  private errorMessage: string = ''

  mounted() {
    auth.onAuthStateChanged((_) => {
      const user = auth.currentUser
      if (user) {
        this.$store.dispatch('user/signup', {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        })
        this.$router.push('/user_registration')
      } else {
        this.errorMessage = 'OAuth認証に失敗しました。'
      }
    })
  }

  private signupWithGoogle() {
    auth.signInWithRedirect(googleProvider)
  }
}
</script>

<style lang="scss" scoped>
.signin {
  &__content {
    height: fit-content;
  }
}
</style>
