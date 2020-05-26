import React from 'react'
import Content from './Content';
import Header from './Header';
import Total from './Total';

export default function Course({ course }) {
  const { name, parts } = course;

  return (
    <>
      <Header title={name} />
      <Content courses={parts} />
      <Total parts={parts} />
    </>
  );
};
