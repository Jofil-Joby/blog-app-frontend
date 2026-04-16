import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPost, deletePost } from '../api'

const s = {
  page: { maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
  card: { background: '#fff', borderRadius: '10px', padding: '32px', border: '1px solid #e0e0e0' },
  title: { fontSize: '28px', fontWeight: '700', marginBottom: '10px' },
  meta: { fontSize: '13px', color: '#888', marginBottom: '24px' },
  content: { fontSize: '16px', lineHeight: '1.8', color: '#444', marginBottom: '32px' },
  actions: { display: 'flex', gap: '10px' },
  editBtn: { background: '#4f46e5', color: '#fff' },
  deleteBtn: { background: '#ef4444', color: '#fff' },
  backLink: { display: 'inline-block', marginBottom: '20px', color: '#888', fontSize: '14px' }
}

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPost(id)
      .then(res => setPost(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return
    await deletePost(id)
    navigate('/')
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Loading...</p>
  if (!post) return <p style={{ textAlign: 'center', marginTop: '60px' }}>Post not found.</p>

  return (
    <div style={s.page}>
      <Link to="/" style={s.backLink}>← Back to all posts</Link>
      <div style={s.card}>
        <h1 style={s.title}>{post.title}</h1>
        <p style={s.meta}>By {post.author} · {new Date(post.createdAt).toLocaleDateString()}</p>
        <p style={s.content}>{post.content}</p>
        <div style={s.actions}>
          <Link to={`/edit/${post._id}`}>
            <button style={s.editBtn}>Edit</button>
          </Link>
          <button style={s.deleteBtn} onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}