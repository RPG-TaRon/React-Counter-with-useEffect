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
