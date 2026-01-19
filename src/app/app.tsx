import { Global } from '@emotion/react'
import { globalStyles } from '../globalStyles'
import AppRoutes from './router'

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <AppRoutes />
    </>
  )
}

export default App
