<template lang="pug">
  .signup.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .signup__content.w-full.px-6
      logo.w-48.m-auto(color="#828282")
      error-message.mt-4(:message="errorMessage")
      .signup__form
        template(v-if="step === 1")
          form-large-label.mt-6(text="Step1. 認証情報を入力してください")
          user-auth-form.mt-4(v-model="authInfo" buttonLabel="次へ" @submit="nextStep")
        template(v-else-if="step === 2")
          form-large-label.mt-6(text="Step2. プロフィールを入力してください")
          user-profile-form.mt-4(v-model="profile" buttonLabel="次へ" @submit="nextStep")
        template(v-else)
          form-large-label.mt-6(text="Step3. お好みのスタイルを選んでください")
          user-preference-form.mt-4(v-model="profile.preferences" :gender="profile.gender")
          base-button.mt-6(label="完了" small @click="onSubmit")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserParams, Gender, UserProfileEntity } from '../entities/User'
import { auth } from '../lib/firebase'
import BaseButton from '@/components/atoms/BaseButton.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import Logo from '@/components/atoms/Logo.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import UserAuthForm from '@/components/molecules/UserAuthForm.vue'
import UserProfileForm from '@/components/molecules/UserProfileForm.vue'
import UserPreferenceForm from '@/components/molecules/UserPreferenceForm.vue'
import { userModule } from '@/store/user/const'

@Component({
  components: {
    BaseButton,
    FormLargeLabel,
    Logo,
    ErrorMessage,
    UserAuthForm,
    UserProfileForm,
    UserPreferenceForm
  },
  layout: 'public'
})
export default class Signup extends Vue {
  @userModule.Getter('uid')
  private userId!: string

  @userModule.Action('signup')
  private signup!: (params: UserParams) => void

  @userModule.Action('startLoading')
  private startLoading!: () => void

  @userModule.Action('endLoading')
  private endLoading!: () => void

  private errorMessage: string = ''

  private step: number = 1

  private authInfo = {
    email: '',
    password: ''
  }

  private profile: UserProfileEntity = {
    id: '',
    email: '',
    photoURL: '',
    name: '',
    gender: Gender.male,
    age: null,
    height: null,
    weight: null,
    preferences: []
  }

  private nextStep() {
    this.step = this.step + 1
  }

  private async onSubmit() {
    this.startLoading()
    try {
      await auth.createUserWithEmailAndPassword(this.authInfo.email, this.authInfo.password)
      const user = auth.currentUser
      if (user) {
        this.signup({ ...this.profile, id: user.uid, email: this.authInfo.email })
      }
      this.$router.push('/mypage')
    } catch (e) {
      this.errorMessage = 'エラーが発生しました'
    } finally {
      this.endLoading()
    }
  }
}
</script>
