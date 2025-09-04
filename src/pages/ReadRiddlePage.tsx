import { useState } from "react";
import type { Riddle } from "../interface/RiddleType";
import { getAllRiddles, getRiddleById } from "../services/RiddlesServices";
import "../style/ReadRiddlePage.css";

export default function ReadRiddlePage() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [idRiddle, setIdRiddle] = useState<string>("");
  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdRiddle(e.target.value);
  };

  const handleFetch = async () => {
    try {
      if (idRiddle) {
        const data = await getRiddleById(Number(idRiddle), token || "");
        if (data) {
          setRiddles([data]);
        }
      } else {
        const data = await getAllRiddles(token || "");
        if (data) {
          setRiddles(data);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-game">
      <div className="form-read">
        <label htmlFor="idriddle"></label>
        <input
          id="idriddle"
          name="idriddle"
          type="text"
          value={idRiddle}
          onChange={handleChange}
          placeholder="Enter id of the riddle or empty to all "
        />
        <button onClick={handleFetch}>Sumbit</button>
      </div>

      <div className="container-riddles">
        {riddles.map((riddle) => (
          <div className="read-riddle" key={riddle.id}>
            <p>Name : {riddle.name}</p>
            <p>Description : {riddle.taskDescription}</p>
            <p>Answer :{riddle.correctAnswer}</p>
            <ul>
              {riddle.choices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
