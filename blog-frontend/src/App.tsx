import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/layout/Layout'
import { Loading } from './components/common/Loading'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'
import NotFound from './pages/NotFound'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
        
    document.documentElement.classList.toggle('dark', isDark)
    setLoading(false)
  }, [])

  if (loading) {
    return <Loading />
  }

    return (
      <AuthProvider>
          <Router>
              <Layout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/create" element={<CreatePost />} />
                      <Route path="/edit/:id" element={<EditPost />} />
                      <Route path="/post/:id" element={<PostDetail />} />
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </Layout>
          </Router>
      </AuthProvider>
  )
}

export default App