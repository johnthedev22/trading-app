import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './features/navigation/NavBar'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute'
import { useTheme } from './hooks/useTheme'

const Trading = lazy(()=>import('./pages/Trading'))

function App() {
  const { state } = useTheme()
  return (
  <div className={`dark h-screen ${state.theme} overflow-hidden`}>
    <BrowserRouter>      
      <Navbar/>           
      <Routes>
        <Route path="/*" element={<LoginPage/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Trading/>        
            </Suspense>
          }/>
          <Route path="/profile" element={<>under construction</>} />
          <Route path="/accounts" element={<>under construction</>} />
        </Route>      
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
