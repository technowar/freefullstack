import React from 'react'

export default function Total({ parts }) {
  const totalExercises = parts.reduce((acc, curr) => (acc + curr.exercises), 0);

  return <p>total of {totalExercises} exercises</p>
};
