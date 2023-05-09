// 1
import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // 2
  const textRef = useRef("");
  // 3
  const [text, setText] = useState("");
  // 4
  useEffect(() => {
    setText("Hi");
    console.log("once");
  }, []);
  // 5
  useEffect(() => {
    console.log(textRef.current);
  }, [text]);
  // 6
  const onTextStateChangeHandler = (e) => {
    const msg = e.target.value;
    setText(msg);
  };
  return (
    // 7
    <div className="App">
      <input
        ref={textRef}
        className="text-input"
        type="text"
        value={text}
        onChange={onTextStateChangeHandler}
        placeholder="Enter your message"
      />
      <div>Message: {text}</div>
    </div>
  );
}

export default App;
