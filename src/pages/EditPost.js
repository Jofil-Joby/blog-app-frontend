import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, updatePost } from '../api'

const s = {
  page: { maxWidth: '700px', margin: '40px auto', padding: '0 20px' },
  heading: { fontSize: '24px', fontWeight: '600', marginBottom: '24px' },
  card: { background: '#fff', borderRadius: '10px', padding: '28px', border: '1px solid #e0e0e0' },
  label: { display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#555' },
  input: {
    width: '100%', padding: '10px 12px', border: '1px solid #ddd',
    borderRadius: '6px', fontSize: '14px', marginBottom: '18px', outline: 'none'
  },
  textarea: {
    width: '100%', padding: '10px 12px', border: '1px solid #ddd',
    borderRadius: '6px', fontSize: '14px', marginBottom: '18px',
    outline: 'none', resize: 'vertical', minHeight: '160px'
  },
  saveBtn: { background: '#4f46e5', color: '#fff', padding: '10px 24px', fontSize: '15px' },
  error: { color: '#ef4444', fontSize: '13px', marginBottom: '12px' }
}

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', author: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getPost(id)
      .then(res => setForm({
        title: res.data.title,
        content: res.data.content,
        author: res.data.author
      }))
      .catch(() => setError('Could not load post.'))
  }, [id])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.content) return setError('Title and content are required.')
    setSubmitting(true)
    try {
      await updatePost(id, form)
      navigate(`/post/${id}`)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={s.page}>
      <h1 style={s.heading}>Edit Post</h1>
      <div style={s.card}>
        {error && <p style={s.error}>{error}</p>}
        <label style={s.label}>Title *</label>
        <input style={s.input} name="title" value={form.title} onChange={handleChange} />
        <label style={s.label}>Author</label>
        <input style={s.input} name="author" value={form.author} onChange={handleChange} />
        <label style={s.label}>Content *</label>
        <textarea style={s.textarea} name="content" value={form.content} onChange={handleChange} />
        <button style={s.saveBtn} onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}