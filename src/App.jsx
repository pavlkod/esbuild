import React, { useState } from "react"
import './App.css'
const App = () => {
    const [count, setCount] = useState(0)
  return (
      <div>App
          <button onClick={() => setCount(v => v+1)}>+</button>
          {count}
          <button onClick={() => setCount(v => v-1)}>-</button>
    </div>
  )
}

export default App