<template lang="pug">
  .signin.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .signin__content.w-full.px-8
      nuxt-link(to="/")
        logo.w-48.m-auto(color="#828282")
      form.mt-6(@submit.prevent="onSubmit")
        error-message(:message="errorMessage")
        base-button.mt-6(label="Googleでログイン" round small @click="signinWithGoogle")
        user-auth-form.mt-4(v-model="authInfo" buttonLabel="ログイン" @submit="signin")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseButton from '@/components/atoms/BaseButton.vue'
import TextField from '@/components/atoms/TextField.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import Logo from '@/components/atoms/Logo.vue'
import UserAuthForm from '@/components/molecules/UserAuthForm.vue'
import { auth, googleProvider } from '@/lib/firebase'

@Component({
  components: {
    Logo,
    BaseButton,
    TextField,
    ErrorMessage,
    UserAuthForm
  },
  layout: 'public'
})
export default class Index extends Vue {
  private errorMessage: string = ''
  private authInfo = {
    email: '',
    password: ''
  }

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('user/signin', user)
        this.$router.push('/home')
      }
    })
  }

  private signinWithGoogle() {
    auth.signInWithRedirect(googleProvider)
  }

  private signin() {
    auth.signInWithEmailAndPassword(this.authInfo.email, this.authInfo.password).catch((e) => {
      if (e.code === 'auth/user-not-found') {
        this.errorMessage = 'メールアドレスは未登録です'
      } else if (e.code === 'auth/wrong-password') {
        this.errorMessage = 'パスワードが間違っています'
      } else {
        this.errorMessage = 'エラーが発生しました'
      }
    })
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
