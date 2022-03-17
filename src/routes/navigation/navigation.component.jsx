import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import './navigation.styles.scss'

const Navigation = () => {
  // as a hook useContext tells the component to rerender whenever a value in that context updates
  const { currentUser } = useContext(UserContext)

  // console.log(currentUser)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>

        <div className="nav-links-container">
          <Link className="nav-links" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-links" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-links" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation
