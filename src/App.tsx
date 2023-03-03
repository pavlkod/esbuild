import { useState } from "react";
import "./App.css";

import pnglogo from "./logo512.png";
import svglogo from "./logo.svg";

const App = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      App
      <img src={pnglogo} alt="" />
      <img src={svglogo} alt="" />
      <button onClick={() => setCount(v => v + 1)}>+</button>
      {count}
      <button onClick={() => setCount(v => v - 1)}>-</button>
    </div>
  );
};

export default App;
