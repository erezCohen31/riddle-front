import "./App.css";
import ConnectPage from "./pages/ConnectPage";
import { BrowserRouter, Routes, Route } from "react-router";
import MainMenuPage from "./pages/MainMenuPage.tsx";
import { PlayerProvider } from "./contexts//Player.context.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import ScorePage from "./pages/ScorePage.tsx";
import ModifyPlayerPage from "./pages/ModifyPlayerPage.tsx";
import ModifyRiddlePage from "./pages/ModifyRiddlePage.tsx";
import CreateRiddlePage from "./pages/CreateRiddlePage.tsx";
import EditRiddlePage from "./pages/EditRiddlePage.tsx";
import DeleteRiddlePage from "./pages/DeleteRiddlePage.tsx";
import ReadRiddlePage from "./pages/ReadRiddlePage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
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
      </PlayerProvider>
    </BrowserRouter>
  );
}
