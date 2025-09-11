import "./App.css";
import ConnectPage from "./pages/ConnectPage";
import { BrowserRouter, Routes, Route } from "react-router";
import MainMenuPage from "./pages/MainMenuPage.tsx";
import { RoleContext } from "./contexts//Player.context.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import ScorePage from "./pages/ScorePage.tsx";
import ModifyPlayerPage from "./pages/ModifyPlayerPage.tsx";
import ModifyRiddlePage from "./pages/ModifyRiddlePage.tsx";
import CreateRiddlePage from "./pages/CreateRiddlePage.tsx";
import EditRiddlePage from "./pages/EditRiddlePage.tsx";
import DeleteRiddlePage from "./pages/DeleteRiddlePage.tsx";
import ReadRiddlePage from "./pages/ReadRiddlePage.tsx";
import Header from "./components/Header.tsx";
import Navbar from "./components/Navbar.tsx";
import { useContext } from "react";

export default function App() {
  const { player } = useContext(RoleContext);

  return (
    <BrowserRouter>
      <Header />
      {player && <Navbar />}
      <Routes>
        <Route path="/" element={<ConnectPage />} />
        <Route path="/main-menu" element={<MainMenuPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/manage-riddles" element={<ModifyRiddlePage />}>
          <Route path="edit" element={<EditRiddlePage />} />
          <Route path="add" element={<CreateRiddlePage />} />
          <Route path="delete" element={<DeleteRiddlePage />} />
          <Route path="read" element={<ReadRiddlePage />} />
        </Route>
        <Route path="/manage-players" element={<ModifyPlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
