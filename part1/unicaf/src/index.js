import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './components/Button'
import Stats from './components/Stats'
import './index.css'

const App = () => {
  const initialStates = { good: 0, neutral: 0, bad: 0 };
  const [states, setStates] = useState(initialStates);
  const onClick = (type) => setStates((state) => ({ ...state, [type]: states[type] + 1 }));

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => onClick('good')} />
      <Button text="neutral" onClick={() => onClick('neutral')} />
      <Button text="bad" onClick={() => onClick('bad')} />
      <h1>statistics</h1>
      <Stats states={states} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
