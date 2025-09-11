import { useState, useEffect } from "react";
import type { Riddle } from "../interface/RiddleType";
import { getAllRiddles } from "../services/RiddlesServices";
import "../style/ReadRiddlePage.css";
import { useNavigate } from "react-router";

export default function ReadRiddlePage() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [idRiddle, setIdRiddle] = useState<string>("");
  const [filteredRiddles, setFilteredRiddles] = useState<Riddle[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllRiddles(token || "");
        if (data) {
          setRiddles(data);
          setFilteredRiddles(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdRiddle(value);

    if (!value) {
      setFilteredRiddles(riddles);
    } else {
      setFilteredRiddles(
        riddles.filter((r) => r.id.toString().includes(value))
      );
    }
  };

  return (
    <div className="container-game">
      <div className="form-read">
        <input
          id="idriddle"
          name="idriddle"
          type="text"
          value={idRiddle}
          onChange={handleChange}
          placeholder="Enter id of the riddle or leave empty to see all"
        />
      </div>

      <div className="container-riddles">
        {filteredRiddles.map((riddle) => (
          <div
            onClick={() =>
              navigate(`/manage-riddles/edit/${riddle.id}`, {
                state: { riddle },
              })
            }
            className="read-riddle"
            key={riddle.id}
          >
            <p>Name: {riddle.name}</p>
            <p>Description: {riddle.taskDescription}</p>
            <p>Answer: {riddle.correctAnswer}</p>
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
