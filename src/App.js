import { use, useState } from "react";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      try {
        setResult(eval(calc + value).toString());
      } catch {
        setResult("");
      }
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }

    return digits;
  };

  const calculate = () => {
    try {
      setCalc(eval(calc).toString());
    } catch {
      setCalc("Error");
    }
  };

  const deleteLast = () => {
    if (calc === "") return;

    const value = calc.slice(0, -1);
    setCalc(value);

    if (!ops.includes(value.slice(-1)) && value !== "") {
      try {
        setResult(eval(value).toString());
      } catch {
        setResult("");
      }
    } else {
      setResult("");
    }
  };

  const clear = () => {
    setCalc("");
    setResult("");
  };

  const insertParens = () => {
    const openCount = (calc.match(/\(/g) || []).length;
    const closeCount = (calc.match(/\)/g) || []).length;

    if (openCount > closeCount) {
      setCalc(calc + ")");
    } else {
      setCalc(calc + "(");
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}
          &nbsp;
          {calc || "0"}
        </div>

        <div className="button-container">
          <div className="digits">
            <button className onClick={clear}>AC</button>
            <button onClick={insertParens}>()</button>
            <button onClick={() => updateCalc("%")}>%</button>
            {createDigits()}
            <button onClick={() => updateCalc("0")}>0</button>
            <button onClick={() => updateCalc(".")}>.</button>
            <button onClick={calculate}>=</button>
          </div>
          <div className="operators">
            <button onClick={() => updateCalc("/")}>/</button>
            <button onClick={() => updateCalc("*")}>*</button>
            <button onClick={() => updateCalc("+")}>+</button>
            <button onClick={() => updateCalc("-")}>-</button>
            <button onClick={deleteLast}>DEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
