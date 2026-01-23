import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Chatbot from "../pages/chatbot";
// import Calendar from "./componentPages/calendar";
import Service from "../pages/service";
import Popup from "../src/componentPages/popupreuse"
import Staff from "../pages/staff";
import Appointments from "../pages/appointment";
import Calendar from "../pages/calendar";
export default function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/chatbot" element={<Chatbot/>}/>
    <Route path="/calendar" element={<Calendar/>}/>
    <Route path="/service" element={<Service/>}/>
    <Route path="/popup" element={<Popup/>}/>
     <Route path="/staff" element={<Staff/>}/>
    <Route path="/appointments" element={<Appointments/>}/>
  </Routes>
  </BrowserRouter>
  );
}
