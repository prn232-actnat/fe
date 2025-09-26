import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './contexts'
import { AppRoutes } from './hooks/AppRoutes'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
        <ToastContainer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
