<template lang="pug">
  form.user-auth-form(@submit.prevent="onSubmit")
    text-field(
      v-model="email"
      type="email"
      placeholder="メールアドレス"
      box
      required
      hideDetails
    )
    text-field.-mt-8(
      v-model="password"
      type="password"
      placeholder="パスワード"
      minlength="8"
      box
      required
      hideDetails
    )
    base-button(
      type="submit"
      :label="buttonLabel"
      :disabled="!isAuthInfoValid"
      small
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { UserAuthInfo } from '@/entities/User'
import TextField from '@/components/atoms/TextField.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'

interface UserAuthDiff {
  email?: string
  password?: string
}

@Component({
  components: {
    TextField,
    BaseButton
  }
})
export default class UserProfileForm extends Vue {
  @Prop({ type: Object, required: true }) value!: UserAuthInfo
  @Prop({ type: String, required: true }) buttonLabel!: string

  get isAuthInfoValid(): boolean {
    return !!this.email && !!this.password
  }

  get email() {
    return this.value.email
  }

  set email(email: string) {
    this.updateValue({ email })
  }

  get password() {
    return this.value.password
  }

  set password(password: string) {
    this.updateValue({ password })
  }

  private updateValue(diff: UserAuthDiff) {
    this.$emit('input', { ...this.value, ...diff })
  }

  private onSubmit() {
    this.$emit('submit')
  }
}
</script>
