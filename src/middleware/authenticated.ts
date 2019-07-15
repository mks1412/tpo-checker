import { Context } from '@nuxt/vue-app'
import { auth } from '@/lib/firebase'

export default (context: Context) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      context.store.dispatch('user/signin', user)
    }
  })
}
