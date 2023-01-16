import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import cat from "./svg/cat.svg";
import bird from "./svg/bird.svg";
import dog from "./svg/dog.svg";
import cow from "./svg/cow.svg";
import horse from "./svg/horse.svg";
import gator from "./svg/gator.svg";
import heart from "./svg/heart.svg";

const svgImgs = {
  cat,
  bird,
  horse,
  cow,
  gator,
  dog,
};

const animalArray = ["cat", "dog", "horse", "cow", "gator", "bird"];
function App() {
  const [num, setNum] = useState(Math.ceil(Math.random() * 10));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);
  const winScore = 10;
  const [animalSelect, setAnimalSelect] = useState(
    animalArray[Math.floor(Math.random() * animalArray.length)]
  );

  const [animalClick, setAnimalClick] = useState(0);

  const onClickAnimalHandler = () => {
    console.log("clicked", animalClick);
    setAnimalClick((prev) => prev + 1);
  };

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
            <h3>You got a present.</h3>
            <div className="gift" onClick={onClickAnimalHandler}>
              <img
                className="animals"
                src={svgImgs[animalSelect]}
                alt="animal"
              />
              <img
                className="heart"
                src={heart}
                alt="heart"
                style={{
                  width: animalClick * 4 + `px`,
                  height: animalClick * 4 + `px`,
                }}
              />
            </div>

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
