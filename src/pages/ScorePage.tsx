import { useContext, useEffect, useState, type FormEvent } from "react";
import { RoleContext } from "../contexts/Player.context";
import { getLeaderboard } from "../services/PlayerService";
import type { PlayerScore } from "../interface/PlayerScoreTypre";
import "../style/ScorePage.css";

export default function ScorePage() {
  const [count, setCount] = useState("");
  const context = useContext(RoleContext);
  const [playersScore, setPlayersScore] = useState<PlayerScore[]>([]);

  const { player } = context;

  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await getLeaderboard(Number(count), token || "");
      setPlayersScore(data);
    } catch (err) {
      console.error("Error fetching riddles:", err);
    }
  };
  useEffect(() => {
    if (!count) return;

    const timer = setTimeout(async () => {
      try {
        const data = await getLeaderboard(Number(count), token || "");
        setPlayersScore(data);
      } catch (err) {
        console.error("Error fetching riddles:", err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="container-game">
      <h2>Score Page</h2>
      <form className="score-form">
        <div>
          <label htmlFor="countriddle"></label>
          <input
            id="countriddle"
            name="countriddle"
            type="number"
            min={1}
            value={count}
            onChange={handleChange}
            onBlur={handleSubmit}
            placeholder="Type a number of players"
          />
        </div>
      </form>
      {playersScore.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {playersScore.map((p, index) => (
              <tr
                key={index}
                className={
                  player?.name === p.name ? "current-player" : "player"
                }
              >
                <td>{p.name}</td>
                <td>{p.lowestTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
