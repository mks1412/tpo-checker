import { Context } from '@nuxt/vue-app'
import { auth } from '@/lib/firebase'

export default (context: Context) => {
  // StoreにユーザデータがあればOK
  if (context.store.getters['user/isAuthenticated']) return

  // Storeにユーザデータがなければ、Firebase Authenticationをチェック(ローディング画面を表示)
  context.store.dispatch('user/startLoading')
  auth.onAuthStateChanged((user) => {
    if (user) {
      context.store.dispatch('user/signin', user)
    } else {
      context.redirect('/')
    }
    context.store.dispatch('user/endLoading')
  })
}
