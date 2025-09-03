import { useContext } from "react";
import { RoleContext } from "../contexts/Player.context";
import { useNavigate } from "react-router";
import "../style/MainMenu.css";

export default function MainMenuPage() {
  const context = useContext(RoleContext);
  const navigate = useNavigate();
  const { player } = context;

  function handleSubmit(destination: string) {
    navigate(`/${destination}`);
  }

  return (
    <>
      <div>MainMenuPage</div>
      <h2>Welcome {player?.name}</h2>
      {player?.lowestTime && <p>your lowest time is {player.lowestTime}</p>}
      <button onClick={() => handleSubmit("play")}>To Play</button>
      <button onClick={() => handleSubmit("score")}>Scores</button>

      {(player?.role === "user" || player?.role === "admin") && (
        <button onClick={() => handleSubmit("manage-riddles")}>
          Manage Riddles
        </button>
      )}

      {player?.role === "admin" && (
        <button onClick={() => handleSubmit("manage-players")}>
          Manage Players
        </button>
      )}
    </>
  );
}
