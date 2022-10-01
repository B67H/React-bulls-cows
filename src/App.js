import { useEffect, useState } from "react";
import "./App.css";
import { generateRandomNum } from "./random";

function App() {
  const [randomNum] = useState(generateRandomNum());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    console.log(randomNum);
  }, [randomNum]);

  const handleAnswerChanged = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    const { strike, ball } = randomNum.reduce(
      (prev, cur, index) => {
        if (answers[index] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }

        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }
        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );

    if(strike === 4) {
      alert('축하합니다. 정답입니다!')
      setLogs([...logs, `${answer} (정답!)`]);

      return
    }

    setLogs([...logs, `${answer} (strike : ${strike}, ball : ${ball})`]);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">????</header>
      <section>
        <input type="text" value={answer} onChange={handleAnswerChanged} />
        <button onClick={handleSubmit}>맞춰보기</button>
      </section>
      <h2>기록</h2>
      <ol>
        {logs.map((log, index) => {
          return <li key={`${log}_${index}`}>{log}</li>;
        })}
      </ol>
    </div>
  );
}

export default App;
