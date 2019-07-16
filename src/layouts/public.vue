<template lang="pug">
  div
    transition(name="fade")
      .h-screen.absolute.top.inset-0.bg-white.flex.items-center(v-show="loading")
        loader(color="#08d9d6")
    nuxt
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Loader from '@/components/atoms/Loader.vue'
import { userModule } from '@/store/user/const'

@Component({
  components: {
    Loader
  }
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
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
