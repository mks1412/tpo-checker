<template lang="pug">
  .profile-edit.overflow-auto
    .profile-edit__content.w-full.px-6
      error-message.mt-4(:message="errorMessage")
      .profile-edit__form
        form-large-label.mt-6(text="プロフィール編集" align="left")
        .flex.justify-center
          .mt-4(class="w-1/2")
            image-uploader(v-model="profile.photoURL" :path="uploadPath" circle)
        user-profile-form.mt-4(v-model="profile" buttonLabel="保存" @submit="onSubmit")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BaseButton from '@/components/atoms/BaseButton.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import ErrorMessage from '@/components/atoms/ErrorMessage.vue'
import UserProfileForm from '@/components/molecules/UserProfileForm.vue'
import ImageUploader from '@/components/molecules/ImageUploader.vue'
import { userModule } from '@/store/user/const'
import { UserParams, UserProfileEntity, Gender } from '@/entities/User'

@Component({
  components: {
    BaseButton,
    FormLargeLabel,
    ErrorMessage,
    UserProfileForm,
    ImageUploader
  }
})
export default class SettingsEdit extends Vue {
  @userModule.State('profile')
  private _profile!: UserProfileEntity

  @userModule.Action('update')
  private update!: (params: UserParams) => void

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

  private errorMessage: string = ''

  created() {
    this.profile = { ...this._profile }
  }

  get uploadPath() {
    return `users/${this.profile.id}/profile`
  }

  private async onSubmit() {
    await this.update(this.profile)
    this.$router.push('/settings')
  }
}
</script>
