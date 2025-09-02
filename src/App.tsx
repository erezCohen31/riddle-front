import "./App.css";
import ConnectPage from "./pages/ConnectPage";
import { BrowserRouter, Routes, Route } from "react-router";
import MainMenuPage from "./pages/MainMenuPage.tsx";
import { RoleProvider } from "./contexts/Role.context.tsx";
import PlayPage from "./pages/PlayPage.tsx";
import ScorePage from "./pages/ScorePage.tsx";
import ModifyPlayerPage from "./pages/ModifyPlayerPage.tsx";
import ModifyRiddlePage from "./pages/ModifyRiddlePage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <Routes>
          <Route path="/" element={<ConnectPage />} />
          <Route path="/main-menu" element={<MainMenuPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/manage-riddles" element={<ModifyRiddlePage />} />
          <Route path="/manage-players" element={<ModifyPlayerPage />} />
        </Routes>
      </RoleProvider>
    </BrowserRouter>
  );
}
