import { useContext, useEffect, useRef, useState, type FormEvent } from "react";
import "../style/PlayPage.css";
import { useNavigate } from "react-router";
import { getNumOfRiddles } from "../services/RiddlesServices";
import type { Riddle } from "../interface/RiddleType";
import { RoleContext } from "../contexts/Player.context";
import { updateTime } from "../services/PlayerService";

export default function PlayPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [count, setCount] = useState("");
  const [enterCount, setEnterCount] = useState(false);
  const [loading, setLoading] = useState(false);

  const startTimeRef = useRef<number | null>(null);

  const context = useContext(RoleContext);
  const { player } = context;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getNumOfRiddles(Number(count), token || "");
      if (data && data.length > 0) {
        setRiddles(data);
        setEnterCount(true);
      }
    } catch (err) {
      console.error("Error fetching riddles:", err);
    }
  };

  const handleAnswer = (choice: string) => {
    const currentRiddle = riddles[currentIndex];

    if (choice !== currentRiddle.correctAnswer) {
      setCorrect(false);
    } else {
      setCorrect(true);

      if (currentIndex === riddles.length - 1) {
        setFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (riddles.length > 0) {
      startTimeRef.current = Date.now();
      console.log("go");
    }
  }, [riddles]);

  useEffect(() => {
    if (finished && startTimeRef.current !== null) {
      const sendTime = async () => {
        const elapsed = (Date.now() - startTimeRef.current!) / 1000;
        const average = elapsed / riddles.length;
        const intValue = Math.round(average);
        setTimeout(() => navigate("/main-menu"), 3000);
        if (player && intValue < player.lowestTime) {
          player.lowestTime = intValue;
        }
        await updateTime(Number(player?.id), intValue, token || "");
      };
      sendTime();
    }
  }, [finished]);

  if (finished) {
    return (
      <div>
        <h2>Finished</h2>
      </div>
    );
  }

  return (
    <div className="container-game">
      {!enterCount ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="countriddle"></label>
            <input
              id="countriddle"
              name="countriddle"
              type="number"
              min={1}
              value={count}
              onChange={handleChange}
              placeholder="Enter count of riddles"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>{" "}
        </form>
      ) : (
        <>
          <h2>Question {currentIndex + 1}</h2>
          <p>{riddles[currentIndex].taskDescription}</p>
          <div className="container-riddle">
            {riddles[currentIndex].choices.map((choice) => (
              <button key={choice} onClick={() => handleAnswer(choice)}>
                {choice}
              </button>
            ))}
          </div>
          {!correct && <p>Wrong answer </p>}
        </>
      )}
    </div>
  );
}
