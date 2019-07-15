import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import { environments } from './environments'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: environments.FIREBASE_API_KEY,
    authDomain: environments.FIREBASE_AUTH_DOMAIN,
    databaseURL: environments.FIREBASE_DATABASE_URL,
    projectId: environments.FIREBASE_PROJECT_ID,
    storageBucket: environments.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environments.FIREBASE_MESSAGING_SENDER_ID
  })
}

const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const googleProvider = new firebase.auth.GoogleAuthProvider()

export default firebase
export { firestore, auth, storage, googleProvider }
