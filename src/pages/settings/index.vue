<template lang="pug">
  .settings.pt-4
    .settings__profile(class="w-1/2 m-auto")
      .settings-thumbnail-container(class="w-3/4 m-auto")
        template(v-if="profile.photoURL")
          .settings-thumbnail-container__image(:style="`background-image:url('${profile.photoURL}')`")
        template(v-else)
          .settings-thumbnail-container__image.noimage
      p.font-bold.mt-4.text-center.text-lg {{ profile.name || 'ユーザー名未設定' }}
      nuxt-link.block.mt-2.text-base.text-center(to="/settings/edit") プロフィール編集
    .settings__link-list.w-full.mt-6.px-4
      ul
        li
          nuxt-link(to="#") お知らせ
        li
          nuxt-link(to="#") 利用規約
        li
          nuxt-link(to="#") プライバシーポリシー
        li
          nuxt-link(to="#") バージョン
        li
          a
            p(@click="onSignoutButtonClicked") ログアウト
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { UserProfileEntity } from '@/entities/User'
import BaseButton from '@/components/atoms/BaseButton.vue'
import FormLargeLabel from '@/components/atoms/FormLargeLabel.vue'
import Logo from '@/components/atoms/Logo.vue'
import { userModule } from '@/store/user/const'
import ImageUploader from '@/components/molecules/ImageUploader.vue'

@Component({
  components: {
    BaseButton,
    FormLargeLabel,
    Logo,
    ImageUploader
  }
})
export default class Settings extends Vue {
  @userModule.State('profile')
  private profile!: UserProfileEntity

  @userModule.Action('load')
  private load!: () => void

  @userModule.Action('signout')
  private signout!: () => void

  mounted() {
    this.load()
  }

  private onSignoutButtonClicked() {
    this.signout()
  }
}
</script>

<style lang="scss" scoped>
.settings {
  &__profile {
    .settings-thumbnail-container__image {
      background-position: center;
      background-size: contain;
      border: solid 1px #eee;
      border-radius: 999px;
      display: block;
      height: 0;
      width: 100%;
      padding-bottom: 100%;

      img {
        border-radius: 999px;
      }

      &.noimage {
        background-image: url('~assets/images/noimage.jpg');
      }
    }
  }

  &__link-list {
    a {
      display: block;
      position: relative;
      padding: 15px 20px;
      line-height: 1.6rem;
      font-weight: 400;
      color: #111;
      border-bottom: solid 1px #eee;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        margin: auto;
        width: 10px;
        height: 10px;
        border-top: 2px solid #999;
        border-right: 2px solid #999;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
