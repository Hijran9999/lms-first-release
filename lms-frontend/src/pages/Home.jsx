// src/pages/Home.jsx
import React from 'react';
import CourseList from './Courses/CourseList';

export default function Home() {
  return (
    <div>
      <header style={{ marginBottom: 16 }}>
        <h1>LMS - Learning Management System</h1>
        <p>Welcome — view available courses below.</p>
      </header>

      <CourseList showCreateShort />
    </div>
  );
}
