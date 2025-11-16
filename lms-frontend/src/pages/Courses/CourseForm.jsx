// src/pages/Courses/CourseForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function CourseForm({ edit }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({ title: '', code: '', description: '', startDate: '', endDate: '' });
  const [err, setErr] = useState('');

  useEffect(() => {
    if (edit && id) {
      api.get(`/courses/${id}`).then(res => {
        const c = res.data;
        setForm({
          title: c.title || '',
          code: c.code || '',
          description: c.description || '',
          startDate: c.startDate ? c.startDate.split('T')[0] : '',
          endDate: c.endDate ? c.endDate.split('T')[0] : '',
        });
      }).catch(()=>setErr('Load failed'));
    }
  }, [edit, id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await api.put(`/courses/${id}`, form);
      } else {
        await api.post('/courses', form);
      }
      nav('/courses');
    } catch (error) {
      setErr(error?.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>{edit ? 'Edit Course' : 'Create Course'}</h2>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={submit}>
        <div>
          <label>Title</label><br />
          <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required />
        </div>
        <div>
          <label>Code</label><br />
          <input value={form.code} onChange={e=>setForm({...form, code: e.target.value})} required />
        </div>
        <div>
          <label>Description</label><br />
          <textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} />
        </div>
        <div>
          <label>Start Date</label><br />
          <input type="date" value={form.startDate} onChange={e=>setForm({...form, startDate: e.target.value})} />
        </div>
        <div>
          <label>End Date</label><br />
          <input type="date" value={form.endDate} onChange={e=>setForm({...form, endDate: e.target.value})} />
        </div>

        <button type="submit" style={{ marginTop: 8 }}>{edit ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
}
