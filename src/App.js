import { Routes, Route } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import Shop from './pages/shop/shop-page.component'
import Authentication from './routes/authentication/authentication.component'

const App = () => {
  return (
    // what routes does is it allows the application to register thi route level components that will then render a specific component when it matches the specific route that I'm looking for.
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* index means that the base component which is home is also at path "/". We do index so we don't need to have path "home" */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App
