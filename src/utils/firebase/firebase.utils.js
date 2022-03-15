import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBShrySKw89QKKcwtcea9w94q5GfQEGRiw',
  authDomain: 'crwn-store-db-a903e.firebaseapp.com',
  projectId: 'crwn-store-db-a903e',
  storageBucket: 'crwn-store-db-a903e.appspot.com',
  messagingSenderId: '439125460908',
  appId: '1:439125460908:web:49bdfacb25cbd2c8f79c09',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  //  userSnapshot allows us to access the data  from userDocRef, data that either exists or, if it's a new user, doesn't exit.
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  // if the user data doesn't exist we can use the userDocRef to create a new document
  if (!userSnapshot.exists()) {
    // userAuth is the user object from the response object that we are getting from google when the user signs in with google
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}
