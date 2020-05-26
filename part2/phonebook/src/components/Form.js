import React from 'react'

export default function Form({ name, number, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onChange('name')} />
      </div>
      <div>
        number: <input value={number} onChange={onChange('number')} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
