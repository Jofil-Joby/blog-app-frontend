import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../api'

const s = {
  page: { maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
  heading: { fontSize: '26px', fontWeight: '600', marginBottom: '24px' },
  card: {
    background: '#fff', borderRadius: '10px', padding: '20px 24px',
    marginBottom: '16px', border: '1px solid #e0e0e0'
  },
  title: { fontSize: '18px', fontWeight: '600', marginBottom: '6px', color: '#4f46e5' },
  meta: { fontSize: '13px', color: '#888', marginBottom: '10px' },
  excerpt: { fontSize: '14px', color: '#555', marginBottom: '14px' },
  readMore: {
    fontSize: '13px', color: '#4f46e5', fontWeight: '500',
    border: '1px solid #4f46e5', padding: '5px 14px',
    borderRadius: '5px', display: 'inline-block'
  },
  empty: { textAlign: 'center', color: '#888', marginTop: '60px', fontSize: '15px' }
}

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p style={s.empty}>Loading posts...</p>

  return (
    <div style={s.page}>
      <h1 style={s.heading}>All Posts</h1>
      {posts.length === 0 && (
        <p style={s.empty}>No posts yet. Create your first one!</p>
      )}
      {posts.map(post => (
        <div key={post._id} style={s.card}>
          <p style={s.title}>{post.title}</p>
          <p style={s.meta}>By {post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
          <p style={s.excerpt}>{post.content.slice(0, 120)}...</p>
          <Link to={`/post/${post._id}`} style={s.readMore}>Read more</Link>
        </div>
      ))}
    </div>
  )
}