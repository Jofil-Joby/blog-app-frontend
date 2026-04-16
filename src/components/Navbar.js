import { Link } from 'react-router-dom'

const styles = {
  nav: {
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px'
  },
  brand: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#4f46e5'
  },
  newBtn: {
    background: '#4f46e5',
    color: '#fff',
    padding: '8px 18px',
    borderRadius: '6px',
    fontSize: '14px'
  }
}

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>MyBlog</Link>
      <Link to="/new">
        <button style={styles.newBtn}>+ New Post</button>
      </Link>
    </nav>
  )
}