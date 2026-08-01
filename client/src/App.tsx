import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import BookList from './components/BookList' // 1. Import your new component

export default function App() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() // 2. Grab the current URL path

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  // Loading state remains exactly as you had it
  if (loading) {
    return (
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
        <nav className="card" style={{ marginBottom: 16, padding: '12px 16px', borderBottom: '2px solid #eee' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/" style={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'none', color: '#2c3e50' }}>📚 Ink and Bind</Link>
            <span style={{ marginLeft: 'auto' }}>Loading user data...</span>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* 3. Your existing Navigation, slightly polished */}
      <nav className="card" style={{ marginBottom: 24, padding: '16px 20px', borderBottom: '2px solid #eee' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          
          <Link to="/" style={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'none', color: '#2c3e50' }}>
            📚 Ink and Bind
          </Link>
          
          {user ? (
            <>
              <Link to="/cart" style={{ textDecoration: 'none', color: '#34495e', fontWeight: 500 }}>Cart</Link>
              <Link to="/orders" style={{ textDecoration: 'none', color: '#34495e', fontWeight: 500 }}>Orders</Link>
              
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/books" style={{ textDecoration: 'none', color: '#e74c3c', fontWeight: 'bold' }}>Admin: Books</Link>
                  <Link to="/admin/orders" style={{ textDecoration: 'none', color: '#e74c3c', fontWeight: 'bold' }}>Admin: Orders</Link>
                </>
              )}
              
              <span style={{ marginLeft: 'auto', color: '#6b7280', fontStyle: 'italic' }}>Hi, {user.name}</span>
              
              <button 
                onClick={handleLogout}
                style={{ padding: '6px 12px', cursor: 'pointer', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginLeft: 'auto', textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Login</Link>
              <Link to="/signup" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>Signup</Link>
            </>
          )}
        </div>
      </nav>

      <main style={{ padding: '0 20px' }}>
        {/* 4. Show BookList ONLY on the home page */}
        {location.pathname === '/' && (
          <div>
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d', fontSize: '1.1rem' }}>
                Your full-stack library is live!
              </p>
            </header>
            <BookList />
          </div>
        )}

        {/* 5. Render other routed pages (Cart, Login, Admin) here */}
        <Outlet />
      </main>
    </div>
  )
}