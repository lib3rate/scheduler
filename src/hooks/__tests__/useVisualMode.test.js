import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  console.log('THIS IS CURRENT MODE AFTER TRANSITION TO SECOND:', result.current.mode);
  console.log('THIS IS HISTORY AFTER TRANSITION TO SECOND:', result.current.history);

  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  console.log('THIS IS CURRENT MODE AFTER TRANSITION TO THIRD:', result.current.mode);
  console.log('THIS IS HISTORY AFTER TRANSITION TO THIRD:', result.current.history);

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  console.log('THIS IS CURRENT MODE AFTER GOING BACK TO SECOND:', result.current.mode);
  console.log('THIS IS HISTORY AFTER GOING BACK TO SECOND:', result.current.history);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
  console.log('THIS IS CURRENT MODE AFTER GOING BACK TO FIRST:', result.current.mode);
  console.log('THIS IS HISTORY AFTER GOING BACK TO FIRST:', result.current.history);
});