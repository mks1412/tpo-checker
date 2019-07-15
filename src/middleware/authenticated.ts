import { Context } from '@nuxt/vue-app'
import { auth } from '@/plugins/firebase'

export default (context: Context) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      context.store.dispatch('user/signin', user)
    } else if (context.route.name !== 'signin') context.redirect('/signin')
  })
}
