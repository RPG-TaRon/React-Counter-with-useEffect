import { useEffect, useState } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [step, setStep] = useState(1);

  function increment() {
    setCount((prevCount) => prevCount + step);
  }

  function decrement() {
    setCount((prevCount) => prevCount - step);
  }

  function resetCounter() {
    setCount(0);
    setHistory([0]);
  }

  function handleStepChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newStep = Number(event.target.value);

    if (newStep >= 1) {
      setStep(newStep);
    }
  }
  useEffect(() => {
    setHistory((prevHistory) => {
      const lastValue = prevHistory[prevHistory.length - 1];

      if (lastValue === count) {
        return prevHistory;
      }

      return [...prevHistory, count];
    });
  }, [count]);

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      localStorage.setItem("count", count.toString());
    }, 500);

    return () => {
      clearTimeout(saveTimer);
    };
  }, [count]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp") {
        setCount((prevCount) => prevCount + step);
      }

      if (event.key === "ArrowDown") {
        setCount((prevCount) => prevCount - step);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  return (
    <div className="counter-container">
      <h1>Advanced Counter</h1>

      <h2>Current Count: {count}</h2>

      <label>
        Step Value:
        <input
          type="number"
          min="1"
          value={step}
          onChange={handleStepChange}
        />
      </label>

      <div className="button-group">
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
        <button onClick={resetCounter}>Reset</button>
      </div>

      <p>Use ArrowUp to increment and ArrowDown to decrement.</p>

      <h3>Previous Counts:</h3>
      <p>{history.join(", ")}</p>
    </div>
  );
}

export default AdvancedCounter;