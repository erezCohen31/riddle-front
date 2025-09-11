import { useNavigate } from "react-router";
import "../style/Header.css";
import { useContext } from "react";
import { RoleContext } from "../contexts/Player.context";
export default function Header() {
  const navigate = useNavigate();
  const { player, setPlayer } = useContext(RoleContext);
  return (
    <div className="header">
      <img
        className="logo-image"
        src="../src/assets/logoriddle.png"
        alt="riddle logo"
      />
      <h1>Riddle Game</h1>
      {player && (
        <button
          onClick={() => {
            setPlayer(null);
            localStorage.clear();
            navigate("/");
          }}
        >
          exit
        </button>
      )}
    </div>
  );
}
