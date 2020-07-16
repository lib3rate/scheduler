import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transiting to the next visual mode of the interview card

  function transition(current, replace = false) {
    setMode(current);
    if (replace === true) {
      history[history.length - 1] = current;
    } else {
      history.push(current);
    }
    // return;
  }

  // Returning to the previous visual mode of the interview card

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