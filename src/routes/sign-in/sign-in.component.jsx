import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpform from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  // run when the component mounts for the first time
  // this is the sign in with google redirect method
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth)
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
    console.log(user)
  }

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpform />
    </div>
  )
}

export default SignIn
