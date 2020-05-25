import React from 'react'

export default function Stat({ text, values }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{values[text]}{text === 'positive' && '%'}</td>
    </tr>
  );
};
