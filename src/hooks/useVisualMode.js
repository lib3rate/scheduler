import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(current, replace = false) {
    setMode(current);
    if (replace === true) {
      history[history.length - 1] = current;
    } else {
      history.push(current);
    }
    // return;
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    return;
  };

  return {
    mode,
    history,
    transition,
    back
  };
};