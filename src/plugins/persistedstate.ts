import createPersistedState from 'vuex-persistedstate'
import { Context } from '@nuxt/vue-app'

export default (context: Context) => {
  // @ts-ignore
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['user']
    })(context.store)
  })
}
