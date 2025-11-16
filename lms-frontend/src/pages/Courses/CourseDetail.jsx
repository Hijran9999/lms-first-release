// src/pages/Courses/CourseDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const load = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [id]);

  const handleDelete = async () => {
    if (!confirm('Delete this course?')) return;
    try {
      await api.delete(`/courses/${id}`);
      nav('/courses');
    } catch (err) {
      alert('Delete failed');
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title} — {course.code}</h2>
      <p>{course.description}</p>
      <div>Instructor: {course.instructor?.fullName}</div>
      <div>Dates: {course.startDate ? new Date(course.startDate).toLocaleDateString() : '-'} - {course.endDate ? new Date(course.endDate).toLocaleDateString() : '-'}</div>

      {user && (user.role === 'instructor' || user.role === 'admin') && (
        <>
          <Link to={`/courses/${id}/edit`}><button style={{ marginTop: 8 }}>Edit</button></Link>
          <button onClick={handleDelete} style={{ marginLeft: 8 }}>Delete</button>
        </>
      )}
    </div>
  );
}
