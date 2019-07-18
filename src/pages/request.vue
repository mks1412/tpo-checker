<template lang="pug">
  .request.h-screen.bg-gray-lightest.overflow-auto.flex.items-center
    .request__content.w-full.px-6
      logo.w-48.m-auto(color="#828282")
      .request__content
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserProfileEntity } from '@/entities/User'
import BaseButton from '@/components/atoms/BaseButton.vue'
import Logo from '@/components/atoms/Logo.vue'
import { userModule } from '@/store/user/const'

@Component({
  components: {
    BaseButton,
    Logo
  }
})
export default class Request extends Vue {
  @userModule.State('profile')
  private profile!: UserProfileEntity
}
</script>
