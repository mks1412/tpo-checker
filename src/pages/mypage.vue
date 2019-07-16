<template lang="pug">
  .mypage.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .user-registration__content.w-full.px-6
      logo.w-48.m-auto(color="#828282")
      .mypage__content
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserProfileEntity } from '@/entities/User'
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
  }
})
export default class UserRegistration extends Vue {
  @userModule.State('profile')
  private profile!: UserProfileEntity
}
</script>
