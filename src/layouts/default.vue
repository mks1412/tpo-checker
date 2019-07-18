<template lang="pug">
  .w-full.h-full
    transition(name="fade")
      .h-screen.absolute.top.inset-0.bg-white.flex.items-center.z-50(v-show="loading")
        loader(color="#08d9d6")
    .contents
      global-header
      .wrapper
        nuxt
    navigation-footer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Loader from '@/components/atoms/Loader.vue'
import GlobalHeader from '@/components/molecules/GlobalHeader.vue'
import NavigationFooter from '@/components/molecules/NavigationFooter.vue'
import { userModule } from '@/store/user/const'

@Component({
  components: {
    Loader,
    GlobalHeader,
    NavigationFooter
  },
  middleware: ['authenticated']
})
export default class DefaultLayout extends Vue {
  @userModule.State('loading')
  private loading!: boolean
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

.contents {
  position: relative;
  padding-bottom: 45px;
  margin-top: constant(safe-area-inset-top);
  margin-top: env(safe-area-inset-top);
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding: 0 0 calc(env(safe-area-inset-bottom) + 45px);
  padding: 0 0 calc(constant(safe-area-inset-bottom) + 45px);
}

.wrapper {
  padding-top: 50px;
  padding-bottom: 45px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
