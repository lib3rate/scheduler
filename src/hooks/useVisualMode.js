import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(current) {
    setMode(current);
    history.push(current);
    return;
  }

  function back() {
    const previous = history.pop();
    setMode(history[history.length - 1]);
    return;
  };

  return {
    mode,
    history,
    transition,
    back
  };
}