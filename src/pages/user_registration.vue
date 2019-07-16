<template lang="pug">
  .user-registration.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .user-registration__content.w-full.px-6
      logo.w-48.m-auto(color="#828282")
      .user-registration__form
        template(v-if="step === 1")
          form-large-label(text="プロフィールを入力してください")
          user-profile-form.mt-4(v-model="profile")
          base-button.mt-6(label="次へ" :disabled="!isPofileValid" small @click="nextStep")
        template(v-else)
          form-large-label(text="お好みのスタイルを選んでください")
          user-preference-form.mt-4(v-model="profile.preferences" :gender="profile.gender")
          base-button.mt-6(label="完了" small @click="onSubmit")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserParams, Gender } from '../entities/User'
import BaseButton from '@/components/atoms/BaseButton.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import Logo from '@/components/atoms/Logo.vue'
import UserProfileForm from '@/components/molecules/UserProfileForm.vue'
import UserPreferenceForm from '@/components/molecules/UserPreferenceForm.vue'
import { userModule } from '@/store/user/const'

@Component({
  components: {
    BaseButton,
    FormLargeLabel,
    Logo,
    UserProfileForm,
    UserPreferenceForm
  },
  layout: 'public'
})
export default class UserRegistration extends Vue {
  @userModule.Getter('uid')
  private userId!: string

  @userModule.Action('signup')
  private signup!: (params: UserParams) => void

  private step: number = 1

  private profile: UserParams = {
    name: '',
    gender: Gender.male,
    age: null,
    height: null,
    weight: null,
    preferences: []
  }

  get isPofileValid(): boolean {
    return !!this.profile.name && !!this.profile.age
  }

  private nextStep() {
    this.step = this.step + 1
  }

  private onSubmit() {
    this.signup(this.profile)
    this.$router.push('/mypage')
  }
}
</script>
