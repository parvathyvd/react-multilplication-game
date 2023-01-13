import { useEffect, useState } from "react";
import Confetti from "react-confetti";

function App() {
  const [num, setNum] = useState(Math.ceil(Math.random() * 10));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);
  const winScore = 2;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (answer === "") {
      setError(true);
      return;
    }
    console.log("details...", num, num2);
    if (+answer === num * num2) {
      console.log("correct");
      setScore((prev) => prev + 1);
    } else {
      console.log("no correct", +answer);
      setScore((prev) => prev - 1);
    }
    setAnswer("");
    setError(false);
  };
  useEffect(() => {
    if (score < winScore) {
      console.log("score is", score, winScore);
      setNum(Math.ceil(Math.random() * 10));
      setNum2(Math.ceil(Math.random() * 10));
    }
  }, [score]);
  const onRestart = () => {
    setScore(0);
  };
  return (
    <>
      <h1>Mutliplication Game</h1>
      <main>
        <h2>
          What is {num} mul by {num2}
        </h2>
        <h3>
          Your Score : {score} {score >= winScore && " - You Win!!"}
        </h3>
        <form onSubmit={onSubmitHandler}>
          <input
            type="number"
            placeholder="Please type your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="answer"
          />
          {error && <span className="error">Answer can't be empty</span>}
          <button type="submit" disabled={score >= winScore}>
            Submit
          </button>
        </form>
        {score >= winScore && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
            <button className="restart" onClick={onRestart}>
              Restart
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default App;
