import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="container">
        <nav className="card" style={{ marginBottom: 16, padding: '12px 16px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/" style={{ fontWeight: 'bold', fontSize: 18 }}>📚 Ink and Bind</Link>
            <span style={{ marginLeft: 'auto' }}>Loading...</span>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="container">
      <nav className="card" style={{ marginBottom: 16, padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 18 }}>📚 Ink and Bind</Link>
          {user ? (
            <>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/books">Admin: Books</Link>
                  <Link to="/admin/orders">Admin: Orders</Link>
                </>
              )}
              <span style={{ marginLeft: 'auto', color: '#6b7280' }}>Hi, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
