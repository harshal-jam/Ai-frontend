import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Chatbot from "../pages/chatbot";
import Calendar from "./componentPages/calendar";
export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/chatbot" element={<Chatbot/>}/>
    <Route path="/calendar" element={<Calendar/>}/>
  </Routes>
  </BrowserRouter>
  );
}
