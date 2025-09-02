import "./App.css";
import ConnectPage from "./pages/ConnectPage";
import { BrowserRouter, Routes, Route } from "react-router";
import MainMenuPage from "./pages/MainMenuPage.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectPage />} />
        <Route path="/main-menu" element={<MainMenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}
