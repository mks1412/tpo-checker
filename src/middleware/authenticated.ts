import { Context } from '@nuxt/vue-app'
import { auth } from '@/lib/firebase'

export default (context: Context) => {
  if (context.store.getters.isAuthenticated) return
  context.store.dispatch('user/startLoading')
  auth.onAuthStateChanged((user) => {
    if (user) {
      context.store.dispatch('user/signin', user)
      if (['index', 'signin', 'signup', 'user_regstration'].includes(context.route.name || '')) {
        context.redirect('/mypage')
      }
    }
    context.store.dispatch('user/endLoading')
  })
}
