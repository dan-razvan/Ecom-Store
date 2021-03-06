import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { UserProvider } from './contexts/user.context'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    {/* because I wrapped the app inside the <BrowserRouter> now I have access to different features that come with react router */}
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
