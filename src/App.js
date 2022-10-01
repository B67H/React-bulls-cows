import { useEffect, useState } from "react";
import "./App.css";
import { generateRandomNum } from "./random";

function App() {
  const [randomNum, setRandomNum] = useState(generateRandomNum());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log(randomNum);
  }, [randomNum]);

  const handleAnswerChanged = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const answers = answer.split("").map((item) => Number(item));

    if (answers.some((number) => isNaN(number))) {
      alert("숫자만 입력해주세요");
      setAnswer("")
      return;
    }

    if (answers.length !== 4) {
      alert("네자리 숫자만 입력해주세요");
      setAnswer("")
      return;
    }

    const isDuplicated = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicated) {
      alert("입력값에 중복이 있습니다");
      setAnswer("")
      return;
    }

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

    if (strike === 4) {
      alert("축하합니다. 정답입니다!");
      setLogs([...logs, "정답!"]);
      setIsSuccess(true);
      return;
    }

    setLogs([...logs, `${answer} (strike : ${strike}, ball : ${ball})`]);
  };

  const handleRetry = () => {
    setRandomNum(generateRandomNum());
    setAnswer("");
    setLogs([]);
    setIsSuccess(false);
  };
  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답 : ${answer}` : "????"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChanged}
          disabled={isSuccess}
        />
        {isSuccess ? (
          <button onClick={handleRetry}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>맞춰보기</button>
        )}
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
