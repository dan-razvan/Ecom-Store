import { useState } from 'react'

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
    } catch (error) {
      console.log(error)
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button buttonType="" type="submit">
            SIGN IN
          </Button>

          {/* the google button needs to be of type button, otherwise it will trigger the handleSubmit method, which is supposed to be triggered only be the sign in button */}
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
