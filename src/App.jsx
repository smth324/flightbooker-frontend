import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import Notification from './components/Notification'

const Admin = lazy(() => import('./components/AdminMain'))

const App = () => {
  const notification = useSelector((state) => state.notification)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Notification msg={notification} />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </Suspense>
  )
}
export default App
