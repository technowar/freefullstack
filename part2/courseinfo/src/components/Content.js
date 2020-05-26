import React from 'react'
import Part from './Part'

export default function Content({ courses }) {
  return courses.map(course => (
    <Part
      key={course.name}
      name={course.name}
      exercises={course.exercises}
    />
  ));
};
