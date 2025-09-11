import { useContext } from "react";
import { NavLink } from "react-router";
import { RoleContext } from "../contexts/Player.context";
import "../style/Navbar.css";

export default function Navbar() {
  const { player } = useContext(RoleContext);

  return (
    <div>
      <nav>
        <NavLink
          to="/main-menu"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/play"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Play
        </NavLink>

        <NavLink
          to="/score"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Score
        </NavLink>
        {player?.role === "user" ||
          (player?.role === "admin" && (
            <NavLink
              to="/manage-riddles"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Modufy Riddle
            </NavLink>
          ))}
      </nav>
    </div>
  );
}
