import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookDetails from './pages/BookDetails'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import AdminBooks from './pages/admin/Books'
import AdminOrders from './pages/admin/Orders'
import './index.css'
import BookDetail from './components/BookDetail';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="books/:id" element={<BookDetails />} />
            
            {/* HERE IS YOUR NEW ROUTE! */}
            <Route path="book/:id" element={<BookDetail />} />
            
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="admin/books" element={<AdminBooks />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)