import SignUpform from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'
import './authentication.styles.scss'

const Authentication = () => {
  // run when the component mounts for the first time
  // this is the sign in with google redirect method
  // useEffect(async () => {
  //   const response = await getRedirectResult(auth)
  //   if (response) {
  //     const userDocRef = await createUserDocumentFromAuth(response.user)
  //   }
  // }, [])

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpform />
    </div>
  )
}

export default Authentication
