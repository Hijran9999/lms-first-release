// src/pages/Courses/CourseList.jsx
import React, { useEffect, useState, useContext } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function CourseList({ showCreateShort }) {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  const load = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Courses</h2>
        { (user && (user.role === 'instructor' || user.role === 'admin')) && (
          <Link to="/courses/new"><button>Create Course</button></Link>
        )}
      </div>

      <ul>
        {courses.map(c => (
          <li key={c._id} style={{ marginBottom: 8 }}>
            <Link to={`/courses/${c._id}`}><strong>{c.title}</strong> — {c.code}</Link>
            <div><small>Instructor: {c.instructor?.fullName || 'Unknown'}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
