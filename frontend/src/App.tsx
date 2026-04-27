import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/ProfilePage";
import NotePage from "./pages/NoteViewPage";
import NoteEditor from "./pages/NoteEditorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/note/:id" element={<NotePage />} />
        <Route path="/note/new" element={<NoteEditor mode="create" />} />
        <Route path="/note/:id/edit" element={<NoteEditor mode="edit" />} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
