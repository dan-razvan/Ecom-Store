import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

// we need this to implement storing users inside cloud store
// doc we need to get a document while getDoc is for getting a document data
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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

//instantiating firestore
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return
  //getting the user document refference from the database. If there is no user in the database, google will generate it for us in order to set data there
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  //  userSnapshot allows us to access the data  from database, data that either exists or, if it's a new user, doesn't exit.
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
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)


export const onAuthStateChangedListener = (callback) =>
// whenever auth changes onAuthStateChanged will invoke out called. (on signin/signout)
  onAuthStateChanged(auth, callback)
