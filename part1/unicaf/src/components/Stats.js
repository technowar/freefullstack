import React, { useEffect, useState } from 'react'
import Stat from './Stat'

export default function Stats({ states }) {
  const [total, setTotal] = useState(0);
  const values = {
    ...states,
    total,
    average: ((states.good * 1) + (states.neutral * 0) + (states.bad * -1)) / total,
    positive: states.good / total * 100,
  };

  useEffect(() => setTotal(Object.values(states).reduce((acc, curr) => (acc + curr), 0)), [states]);

  return (states.bad === 0 && states.good === 0 && states.neutral === 0) ? (
    <span>No feedback given</span>
  ) : (
    <table>
      <tbody>
        {Object.keys(values).map((value) => (
          <Stat key={value} text={value} values={values} />
        ))}
      </tbody>
    </table>
  );
};
