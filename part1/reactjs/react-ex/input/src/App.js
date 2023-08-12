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
  
  useEffect(() => {
    console.log(textRef.current);
  }, [text]);
  
  const onTextStateChangeHandler = (e) => {
    const msg = e.target.value;
    setText(msg);
  };
  return (
    // 5
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

